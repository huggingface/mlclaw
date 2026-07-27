const OPENAI_AUTH_BASE_URL = "https://auth.openai.com";
const OPENAI_CODEX_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";
const OPENAI_CODEX_DEVICE_VERIFICATION_URL = `${OPENAI_AUTH_BASE_URL}/codex/device`;
const OPENAI_CODEX_DEVICE_CALLBACK_URL = `${OPENAI_AUTH_BASE_URL}/deviceauth/callback`;
const OPENAI_CODEX_DEVICE_TIMEOUT_MS = 15 * 60_000;
const DEFAULT_POLL_INTERVAL_MS = 5_000;
const MIN_POLL_INTERVAL_MS = 1_000;
const MAX_RESPONSE_BYTES = 256 * 1024;
const JWT_AUTH_CLAIM = "https://api.openai.com/auth";

export type OpenAICodexOAuthCredential = {
  access: string;
  refresh: string;
  expires: number;
  accountId: string;
  idToken?: string;
};

export type OpenAICodexDeviceVerification = {
  verificationUrl: string;
  userCode: string;
  expiresInMs: number;
};

type DeviceCode = {
  deviceAuthId: string;
  userCode: string;
  intervalMs: number;
};

type DeviceAuthorization = {
  authorizationCode: string;
  codeVerifier: string;
};

type LoginOptions = {
  fetchFn?: typeof fetch;
  signal?: AbortSignal;
  now?: () => number;
  sleep?: (milliseconds: number, signal?: AbortSignal) => Promise<void>;
  onVerification: (verification: OpenAICodexDeviceVerification) => void | Promise<void>;
};

/**
 * Runs OpenAI's Codex device-code OAuth flow directly.
 *
 * The protocol follows Pi's MIT-licensed OpenAI Codex OAuth implementation:
 * https://github.com/earendil-works/pi/tree/main/packages/ai/src/auth/oauth
 */
export async function loginOpenAICodexDeviceCode(options: LoginOptions): Promise<OpenAICodexOAuthCredential> {
  throwIfAborted(options.signal);
  const fetchFn = options.fetchFn ?? fetch;
  const now = options.now ?? Date.now;
  const sleep = options.sleep ?? abortableSleep;
  const device = await requestDeviceCode(fetchFn, options.signal);
  await options.onVerification({
    verificationUrl: OPENAI_CODEX_DEVICE_VERIFICATION_URL,
    userCode: device.userCode,
    expiresInMs: OPENAI_CODEX_DEVICE_TIMEOUT_MS,
  });
  const authorization = await pollDeviceAuthorization({
    fetchFn,
    device,
    now,
    sleep,
    ...(options.signal ? { signal: options.signal } : {}),
  });
  return await exchangeDeviceAuthorization(fetchFn, authorization, now, options.signal);
}

export function codexAuthJsonFromOAuthCredential(
  credential: OpenAICodexOAuthCredential,
  now: Date,
): Record<string, unknown> {
  return {
    auth_mode: "chatgpt",
    OPENAI_API_KEY: null,
    tokens: {
      ...(credential.idToken ? { id_token: credential.idToken } : {}),
      access_token: credential.access,
      refresh_token: credential.refresh,
      account_id: credential.accountId,
      expires_at: credential.expires,
    },
    last_refresh: now.toISOString(),
  };
}

export function openAICodexCredentialFromAuthJson(value: unknown): OpenAICodexOAuthCredential {
  const auth = objectValue(value, "Codex auth document");
  if (auth.auth_mode !== "chatgpt") {
    throw new Error("Codex auth document is not a ChatGPT login");
  }
  const tokens = objectValue(auth.tokens, "Codex auth tokens");
  const access = nonEmptyString(tokens.access_token);
  const refresh = nonEmptyString(tokens.refresh_token);
  const storedAccountId = nonEmptyString(tokens.account_id);
  if (!access || !refresh || !storedAccountId) {
    throw new Error("Codex auth document was missing OAuth credential fields");
  }
  const claims = accessTokenClaims(access);
  if (claims.accountId !== storedAccountId) {
    throw new Error("Codex auth account identity did not match the access token");
  }
  const storedExpires = finiteNonNegativeNumber(tokens.expires_at);
  const idToken = nonEmptyString(tokens.id_token);
  return {
    access,
    refresh,
    expires: storedExpires ?? claims.expires,
    accountId: claims.accountId,
    ...(idToken ? { idToken } : {}),
  };
}

export async function refreshOpenAICodexCredential(options: {
  refreshToken: string;
  fetchFn?: typeof fetch;
  signal?: AbortSignal;
  now?: () => number;
}): Promise<OpenAICodexOAuthCredential> {
  throwIfAborted(options.signal);
  const fetchFn = options.fetchFn ?? fetch;
  const response = await fetchFn(`${OPENAI_AUTH_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: requestHeaders("application/x-www-form-urlencoded"),
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: options.refreshToken,
      client_id: OPENAI_CODEX_CLIENT_ID,
    }),
    ...(options.signal ? { signal: options.signal } : {}),
  });
  const body = await readJsonObject(response);
  if (!response.ok) {
    throw responseError("OpenAI token refresh failed", response, body);
  }
  return credentialFromTokenResponse(body, options.now ?? Date.now);
}

async function requestDeviceCode(fetchFn: typeof fetch, signal?: AbortSignal): Promise<DeviceCode> {
  const response = await fetchFn(`${OPENAI_AUTH_BASE_URL}/api/accounts/deviceauth/usercode`, {
    method: "POST",
    headers: requestHeaders("application/json"),
    body: JSON.stringify({ client_id: OPENAI_CODEX_CLIENT_ID }),
    ...(signal ? { signal } : {}),
  });
  const body = await readJsonObject(response);
  if (!response.ok) {
    throw responseError("OpenAI device code request failed", response, body);
  }
  const deviceAuthId = nonEmptyString(body.device_auth_id);
  const userCode = nonEmptyString(body.user_code) ?? nonEmptyString(body.usercode);
  const intervalMs = secondsToSafeMilliseconds(body.interval);
  if (!deviceAuthId || !userCode) {
    throw new Error("OpenAI device code response was missing required fields");
  }
  return {
    deviceAuthId,
    userCode,
    intervalMs: Math.min(
      OPENAI_CODEX_DEVICE_TIMEOUT_MS,
      Math.max(MIN_POLL_INTERVAL_MS, intervalMs ?? DEFAULT_POLL_INTERVAL_MS),
    ),
  };
}

async function pollDeviceAuthorization(params: {
  fetchFn: typeof fetch;
  device: DeviceCode;
  now: () => number;
  sleep: (milliseconds: number, signal?: AbortSignal) => Promise<void>;
  signal?: AbortSignal;
}): Promise<DeviceAuthorization> {
  const deadline = params.now() + OPENAI_CODEX_DEVICE_TIMEOUT_MS;
  let intervalMs = params.device.intervalMs;
  while (params.now() < deadline) {
    throwIfAborted(params.signal);
    const response = await params.fetchFn(`${OPENAI_AUTH_BASE_URL}/api/accounts/deviceauth/token`, {
      method: "POST",
      headers: requestHeaders("application/json"),
      body: JSON.stringify({
        device_auth_id: params.device.deviceAuthId,
        user_code: params.device.userCode,
      }),
      ...(params.signal ? { signal: params.signal } : {}),
    });
    const body = await readJsonObject(response);
    if (response.ok) {
      const authorizationCode = nonEmptyString(body.authorization_code);
      const codeVerifier = nonEmptyString(body.code_verifier);
      if (!authorizationCode || !codeVerifier) {
        throw new Error("OpenAI device authorization response was missing required fields");
      }
      return { authorizationCode, codeVerifier };
    }
    const errorCode = oauthErrorCode(body);
    if (response.status === 403 || response.status === 404 || errorCode === "deviceauth_authorization_pending") {
      await params.sleep(Math.min(intervalMs, Math.max(0, deadline - params.now())), params.signal);
      continue;
    }
    if (errorCode === "slow_down") {
      intervalMs += 5_000;
      await params.sleep(Math.min(intervalMs, Math.max(0, deadline - params.now())), params.signal);
      continue;
    }
    throw responseError("OpenAI device authorization failed", response, body);
  }
  throw new Error("OpenAI device authorization timed out after 15 minutes");
}

async function exchangeDeviceAuthorization(
  fetchFn: typeof fetch,
  authorization: DeviceAuthorization,
  now: () => number,
  signal?: AbortSignal,
): Promise<OpenAICodexOAuthCredential> {
  const response = await fetchFn(`${OPENAI_AUTH_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: requestHeaders("application/x-www-form-urlencoded"),
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: OPENAI_CODEX_CLIENT_ID,
      code: authorization.authorizationCode,
      code_verifier: authorization.codeVerifier,
      redirect_uri: OPENAI_CODEX_DEVICE_CALLBACK_URL,
    }),
    ...(signal ? { signal } : {}),
  });
  const body = await readJsonObject(response);
  if (!response.ok) {
    throw responseError("OpenAI device token exchange failed", response, body);
  }
  return credentialFromTokenResponse(body, now);
}

function requestHeaders(contentType: string): Record<string, string> {
  return {
    "Content-Type": contentType,
    originator: "mlclaw",
    "User-Agent": "mlclaw",
  };
}

async function readJsonObject(response: Response): Promise<Record<string, unknown>> {
  const text = await readResponseTextLimited(response);
  if (!text) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("OpenAI OAuth response was not valid JSON");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("OpenAI OAuth response was not a JSON object");
  }
  return parsed as Record<string, unknown>;
}

async function readResponseTextLimited(response: Response): Promise<string> {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_RESPONSE_BYTES) {
    await response.body?.cancel().catch(() => undefined);
    throw new Error("OpenAI OAuth response exceeded the size limit");
  }
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_RESPONSE_BYTES) {
        await reader.cancel().catch(() => undefined);
        throw new Error("OpenAI OAuth response exceeded the size limit");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

function responseError(prefix: string, response: Response, body: Record<string, unknown>): Error {
  const code = oauthErrorCode(body);
  const safeCode = code ? sanitizeErrorText(code) : undefined;
  return new Error(`${prefix} (HTTP ${response.status})${safeCode ? `: ${safeCode}` : ""}`);
}

function oauthErrorCode(body: Record<string, unknown>): string | undefined {
  const error = body.error;
  if (typeof error === "string") return nonEmptyString(error);
  if (error && typeof error === "object" && !Array.isArray(error)) {
    return nonEmptyString((error as Record<string, unknown>).code);
  }
  return undefined;
}

function sanitizeErrorText(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f-\u009f]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim()
    .slice(0, 500);
}

function credentialFromTokenResponse(body: Record<string, unknown>, now: () => number): OpenAICodexOAuthCredential {
  const access = nonEmptyString(body.access_token);
  const refresh = nonEmptyString(body.refresh_token);
  const expiresInMs = secondsToSafeMilliseconds(body.expires_in);
  if (!access || !refresh || expiresInMs === undefined) {
    throw new Error("OpenAI token response was missing required fields");
  }
  const claims = accessTokenClaims(access);
  const idToken = nonEmptyString(body.id_token);
  return {
    access,
    refresh,
    expires: now() + expiresInMs,
    accountId: claims.accountId,
    ...(idToken ? { idToken } : {}),
  };
}

function accessTokenClaims(accessToken: string): { accountId: string; expires: number } {
  const parts = accessToken.split(".");
  if (parts.length !== 3 || !parts[1]) {
    throw new Error("OpenAI access token was not a JWT");
  }
  let payload: Record<string, unknown>;
  try {
    payload = objectValue(JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")), "access token JWT payload");
  } catch {
    throw new Error("OpenAI access token JWT was invalid");
  }
  const claim = payload[JWT_AUTH_CLAIM];
  const accountId =
    claim && typeof claim === "object" && !Array.isArray(claim)
      ? nonEmptyString((claim as Record<string, unknown>).chatgpt_account_id)
      : undefined;
  const expiresSeconds = finiteNonNegativeNumber(payload.exp);
  if (!accountId) {
    throw new Error("OpenAI access token did not contain a ChatGPT account ID");
  }
  if (expiresSeconds === undefined || !Number.isSafeInteger(expiresSeconds * 1_000)) {
    throw new Error("OpenAI access token did not contain a valid expiry");
  }
  return { accountId, expires: expiresSeconds * 1_000 };
}

function nonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function objectValue(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} was not an object`);
  }
  return value as Record<string, unknown>;
}

function finiteNonNegativeNumber(value: unknown): number | undefined {
  const number = typeof value === "string" && value.trim() ? Number(value) : value;
  return typeof number === "number" && Number.isFinite(number) && number >= 0 ? number : undefined;
}

function secondsToSafeMilliseconds(value: unknown): number | undefined {
  const seconds = typeof value === "string" && value.trim() ? Number(value) : value;
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) return undefined;
  const milliseconds = Math.floor(seconds * 1_000);
  return Number.isSafeInteger(milliseconds) ? milliseconds : undefined;
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new Error("OpenAI device login cancelled");
}

async function abortableSleep(milliseconds: number, signal?: AbortSignal): Promise<void> {
  throwIfAborted(signal);
  await new Promise<void>((resolve, reject) => {
    const finish = () => {
      signal?.removeEventListener("abort", abort);
      resolve();
    };
    const timer = setTimeout(finish, milliseconds);
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      reject(new Error("OpenAI device login cancelled"));
    };
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
  });
}
