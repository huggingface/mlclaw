import { spawn, type ChildProcess } from "node:child_process";
import { randomBytes } from "node:crypto";
import http from "node:http";
import type net from "node:net";
import { Readable } from "node:stream";
import type { Hono } from "hono";
import { createSpaceRuntimeApp } from "./app.js";
import { CodexCredentialStore } from "./codex-credentials.js";
import { DEFAULT_OPENAI_MODEL_REF, LEGACY_CODEX_MODEL_REF } from "./openai-models.js";
import { integrationCredentialSlot, type SpaceRuntimeConfig } from "./config.js";
import { McpCredentialStore } from "./mcp-credentials.js";
import { McpIntegrationServer } from "./mcp-integrations.js";
import { configureOpenClawGateway, managedMcpServerStatus } from "./openclaw-config.js";
import { syncOpenAiOAuthProfile } from "./openclaw-oauth-profile.js";
import { migrateLegacyOpenAiSessionRefs } from "./openclaw-state-migration.js";
import { loadOpenAiCredentialFile, openAiConfigured, OpenAiCredentialStore } from "./openai-credentials.js";
import { loginPage, templatePage, unauthorizedPage } from "./pages.js";
import { proxyHttp, proxyWebSocket, rejectWebSocket } from "./proxy.js";
import { normalizeNext, readSession } from "./session.js";

type SpaceRuntimeServerOptions = {
  exitProcess?: (code: number) => void;
  syncOAuthProfile?: typeof syncOpenAiOAuthProfile;
};

export class SpaceRuntimeServer {
  private openclaw: ChildProcess | undefined;
  private telegramBotMux: ChildProcess | undefined;
  private unyoloTelegram: ChildProcess | undefined;
  private readonly openclawGatewayPassword = randomBytes(48).toString("base64url");
  private openclawStarting = false;
  private openclawStopping = false;
  private telegramBotMuxStopping = false;
  private unyoloTelegramStopping = false;
  private readonly app: Hono;
  private readonly exitProcess: (code: number) => void;
  private readonly syncOAuthProfile: typeof syncOpenAiOAuthProfile;
  private readonly mcpCredentials: McpCredentialStore;
  private readonly mcpIntegrations: McpIntegrationServer;
  private readonly openAiCredentials: OpenAiCredentialStore;
  private readonly codexCredentials: CodexCredentialStore;

  constructor(
    private readonly config: SpaceRuntimeConfig,
    options: SpaceRuntimeServerOptions = {},
  ) {
    this.exitProcess = options.exitProcess ?? ((code) => process.exit(code));
    this.syncOAuthProfile = options.syncOAuthProfile ?? syncOpenAiOAuthProfile;
    this.mcpCredentials = new McpCredentialStore({
      file: config.mcpCredentialFile,
      secret: config.credentialKey,
      providerUrl: config.providerUrl,
      ...(config.oauthClientId ? { clientId: config.oauthClientId } : {}),
      ...(config.oauthClientSecret ? { clientSecret: config.oauthClientSecret } : {}),
    });
    this.openAiCredentials = new OpenAiCredentialStore(config.openaiCredentialStoreFile, config.credentialKey);
    this.codexCredentials = new CodexCredentialStore(config);
    this.mcpIntegrations = new McpIntegrationServer(config, this.mcpCredentials);
    const credentialSlot = integrationCredentialSlot(config);
    this.app = createSpaceRuntimeApp(config, {
      openclawRunning: () => Boolean(this.openclaw && !this.openclaw.killed),
      openAiConfigured: async () =>
        openAiConfigured() ||
        Boolean(await loadOpenAiCredentialFile(this.config.openaiCredentialFile)) ||
        Boolean(await this.openAiCredentials.load()),
      restartOpenClawWithOpenAi: (apiKey) => this.restartOpenClawWithOpenAi(apiKey),
      restartOpenClaw: () => this.restartOpenClaw(),
      setModelSettings: (model, choices) => {
        this.config.model = model;
        this.config.modelChoices = choices;
      },
      saveMcpCredentials: async (identity) => {
        if (!credentialSlot) {
          throw new Error("ML Claw has no integration administrator");
        }
        await this.mcpCredentials.save(identity, credentialSlot);
      },
      clearMcpCredentials: (slot) => this.mcpCredentials.clear(slot),
      mcpCredentialStatus: (slot) => this.mcpCredentials.status(slot),
      mcpServerStatus: () => managedMcpServerStatus(this.config),
    });
  }

  async start(): Promise<http.Server> {
    if (this.config.mode === "app") {
      await this.mcpIntegrations.start();
      try {
        await this.startTelegramBotMux();
        await this.startUnyoloTelegram();
        await this.startOpenClaw();
      } catch (err) {
        await this.stop();
        throw err;
      }
    }

    const server = http.createServer((req, res) => {
      this.handle(req, res).catch((err) => {
        if (res.destroyed && err instanceof Error && err.name === "AbortError") {
          return;
        }
        process.stderr.write(`[mlclaw] request failed: ${formatError(err)}\n`);
        if (!res.headersSent) {
          res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        }
        res.end("Internal server error\n");
      });
    });
    server.on("upgrade", (req, socket, head) => {
      const netSocket = socket as net.Socket;
      try {
        const session = readSession(req.headers.cookie, this.config.sessionSecret, this.config.sessionCookieName);
        if (!session || !this.isAllowed(session.username)) {
          rejectWebSocket(netSocket);
          return;
        }
        proxyWebSocket(req, netSocket, head, this.config, { username: session.username });
      } catch (err) {
        process.stderr.write(`[mlclaw] websocket upgrade failed: ${formatError(err)}\n`);
        rejectWebSocket(netSocket);
      }
    });

    try {
      await new Promise<void>((resolve, reject) => {
        const onError = (err: Error) => {
          server.off("listening", onListening);
          reject(err);
        };
        const onListening = () => {
          server.off("error", onError);
          resolve();
        };
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(this.config.port, "0.0.0.0");
      });
    } catch (err) {
      await this.stop();
      server.close();
      throw err;
    }
    process.stdout.write(`[mlclaw] listening on ${this.config.port} in ${this.config.mode} mode\n`);
    return server;
  }

  async stop(): Promise<void> {
    await this.stopOpenClaw();
    await this.stopUnyoloTelegram();
    await this.stopTelegramBotMux();
    await this.mcpIntegrations.stop();
  }

  private async startTelegramBotMux(): Promise<void> {
    const configPath = this.config.telegramBotMuxConfigPath;
    if (!configPath || this.telegramBotMux) return;
    const command = this.config.telegramBotMuxCommand ?? "/usr/sbin/gosu";
    const args = this.config.telegramBotMuxArgs ?? [
      "telegram-bot-mux",
      "/usr/local/bin/telegram-bot-mux",
      "serve",
      "--config",
      configPath,
    ];
    try {
      await spawnSidecar(
        command,
        args,
        telegramBotMuxEnvironment(process.env),
        "telegram-bot-mux",
        (child) => {
          this.telegramBotMux = child;
        },
        (child, code) => {
          if (this.telegramBotMux === child) this.telegramBotMux = undefined;
          if (!this.telegramBotMuxStopping) this.exitProcess(code);
        },
      );
    } catch (error) {
      this.telegramBotMux = undefined;
      throw error;
    }
    if (this.config.telegramBotMuxReadyUrl) {
      await waitForSidecarReady(this.telegramBotMux, this.config.telegramBotMuxReadyUrl, "telegram-bot-mux");
    }
    process.stdout.write("[telegram-bot-mux] shared Telegram poller started\n");
  }

  private async stopTelegramBotMux(): Promise<void> {
    this.telegramBotMuxStopping = true;
    await stopSidecar(this.telegramBotMux);
    this.telegramBotMux = undefined;
    this.telegramBotMuxStopping = false;
  }

  private async startUnyoloTelegram(): Promise<void> {
    const configPath = this.config.unyoloTelegramConfigPath;
    if (!configPath || this.unyoloTelegram) return;
    const command = this.config.unyoloTelegramCommand ?? "/usr/sbin/gosu";
    const args = this.config.unyoloTelegramArgs ?? [
      "unyolo-telegram",
      "/usr/local/bin/unyolo-telegram",
      "serve",
      "--config",
      configPath,
    ];
    try {
      await spawnSidecar(
        command,
        args,
        unyoloTelegramEnvironment(process.env),
        "unyolo-telegram",
        (child) => {
          this.unyoloTelegram = child;
        },
        (child, code) => {
          if (this.unyoloTelegram === child) this.unyoloTelegram = undefined;
          if (!this.unyoloTelegramStopping) this.exitProcess(code);
        },
      );
    } catch (error) {
      this.unyoloTelegram = undefined;
      throw error;
    }
    process.stdout.write("[unyolo-telegram] approval ingress started\n");
  }

  private async stopUnyoloTelegram(): Promise<void> {
    this.unyoloTelegramStopping = true;
    await stopSidecar(this.unyoloTelegram);
    this.unyoloTelegram = undefined;
    this.unyoloTelegramStopping = false;
  }

  private async stopOpenClaw(): Promise<void> {
    const child = this.openclaw;
    if (!child || child.killed) {
      return;
    }
    this.openclawStopping = true;
    child.kill("SIGTERM");
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        child.kill("SIGKILL");
      }, 10_000);
      child.once("exit", () => {
        clearTimeout(timer);
        resolve();
      });
    });
    this.openclawStopping = false;
  }

  private async handle(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const url = new URL(req.url ?? "/", this.config.publicUrl);
    if (this.config.mode === "template" && !isTemplateRuntimePath(url.pathname)) {
      this.sendHtml(res, templatePage(this.config));
      return;
    }
    if (this.shouldRouteToMlClaw(url.pathname)) {
      const requestAbort = new AbortController();
      const abortRequest = () => requestAbort.abort();
      res.once("close", abortRequest);
      try {
        const response = await this.app.fetch(nodeRequestToWebRequest(req, this.config.publicUrl, requestAbort.signal));
        if (!response.headers.has("x-mlclaw-fallback")) {
          await sendWebResponse(res, response);
          return;
        }
      } finally {
        res.off("close", abortRequest);
      }
    }

    const session = readSession(req.headers.cookie, this.config.sessionSecret, this.config.sessionCookieName);
    if (!session) {
      this.sendUnauthenticated(req, res, url);
      return;
    }
    if (!this.isAllowed(session.username)) {
      this.sendHtml(res, unauthorizedPage(session.username), 403);
      return;
    }
    if (
      this.isAdmin(session.username) &&
      this.config.oauthClientId &&
      this.config.oauthClientSecret &&
      isBrowserNavigation(req)
    ) {
      const integrations = await managedMcpServerStatus(this.config);
      const credentialSlot = integrationCredentialSlot(this.config);
      const authorization = credentialSlot
        ? await this.mcpCredentials.status(credentialSlot).catch(() => undefined)
        : undefined;
      if (integrations.some((integration) => integration.enabled) && !authorization?.configured) {
        const next = normalizeNext(`${url.pathname}${url.search}`);
        this.sendRedirect(res, `/oauth/login?intent=integrations&next=${encodeURIComponent(next)}`);
        return;
      }
    }
    await proxyHttp(req, res, this.config, { username: session.username });
  }

  private shouldRouteToMlClaw(pathname: string): boolean {
    return (
      pathname === "/health" ||
      pathname === "/healthz" ||
      pathname === "/favicon.svg" ||
      pathname === "/favicon-32.png" ||
      pathname === "/favicon.ico" ||
      pathname === "/apple-touch-icon.png" ||
      pathname === "/manifest.webmanifest" ||
      pathname === "/sw.js" ||
      pathname === "/assets/hf-logo.svg" ||
      pathname === "/assets/mlclaw.svg" ||
      pathname === "/assets/assistant-avatar.svg" ||
      pathname === "/assets/mlclaw-control-branding.js" ||
      pathname === "/assets/brand/logo" ||
      pathname === "/plugins/unyolo/ui" ||
      pathname.startsWith("/plugins/unyolo/ui/") ||
      pathname === "/trusted-host/api/unyolo" ||
      pathname.startsWith("/trusted-host/api/unyolo/") ||
      pathname === "/login" ||
      pathname === "/logout" ||
      pathname.startsWith("/oauth/") ||
      pathname === "/mlclaw" ||
      pathname.startsWith("/mlclaw/")
    );
  }

  private async startOpenClaw(extraEnv: Record<string, string> = {}): Promise<void> {
    if (this.openclawStarting || (this.openclaw && !this.openclaw.killed)) {
      return;
    }
    this.openclawStarting = true;
    try {
      const candidateCredential = await this.codexCredentials.credentialForImport();
      const codexCredential =
        candidateCredential && (await this.codexCredentials.credentialIsCurrent(candidateCredential))
          ? candidateCredential
          : undefined;
      const codexConfigured = Boolean(codexCredential);
      const persistedOpenAiKey =
        (await loadOpenAiCredentialFile(this.config.openaiCredentialFile)) ??
        process.env.OPENAI_API_KEY?.trim() ??
        (await this.openAiCredentials.load());
      const migratedSessions = await migrateLegacyOpenAiSessionRefs(this.config);
      if (migratedSessions > 0) {
        process.stdout.write(`[mlclaw] Migrated ${migratedSessions} native OpenAI session route(s)\n`);
      }
      if (this.config.model === LEGACY_CODEX_MODEL_REF) {
        this.config.model =
          codexConfigured || persistedOpenAiKey
            ? DEFAULT_OPENAI_MODEL_REF
            : (this.config.modelChoices[0]?.openclawModel ?? this.config.model);
      }
      await configureOpenClawGateway(this.config, {
        codexConfigured,
        openAiConfigured: Boolean(persistedOpenAiKey),
      });
      if (codexConfigured) process.stdout.write("[mlclaw] Native OpenAI OAuth enabled\n");
      const env: NodeJS.ProcessEnv = {
        ...allowedOpenClawEnvironment(process.env),
        HOME: "/home/node",
        USER: "node",
        LOGNAME: "node",
        OPENCLAW_GATEWAY_PORT: String(this.config.openclawPort),
        OPENCLAW_MODEL: this.config.model,
        ...(persistedOpenAiKey ? { OPENAI_API_KEY: persistedOpenAiKey } : {}),
        ...extraEnv,
      };
      if (this.config.brokerAgentSecret) {
        env.HF_TOKEN = this.config.brokerAgentSecret;
        env.HUGGINGFACE_HUB_TOKEN = this.config.brokerAgentSecret;
      } else if (!this.config.brokerAgentUrl && this.config.routerToken) {
        env.HF_TOKEN = this.config.routerToken;
        env.HUGGINGFACE_HUB_TOKEN = this.config.routerToken;
      }
      const profileSynced = await this.syncOAuthProfile({
        config: this.config,
        ...(codexCredential ? { credential: codexCredential } : {}),
        env,
      });
      if (codexCredential && !profileSynced) {
        throw new Error("OpenClaw command does not support native OAuth profile provisioning");
      }
      if (codexCredential && !(await this.codexCredentials.credentialIsCurrent(codexCredential))) {
        await this.syncOAuthProfile({ config: this.config, env });
        throw new Error("OpenAI OAuth credentials were revoked during native profile provisioning");
      }
      // Trusted-proxy authenticates browsers; internal loopback tools use this process-private fallback.
      env.OPENCLAW_GATEWAY_PASSWORD = this.openclawGatewayPassword;
      this.openclaw = spawn(this.config.openclawCommand, this.config.openclawArgs, {
        stdio: "inherit",
        env,
        ...(process.getuid?.() === 0 ? { uid: this.config.openclawUid, gid: this.config.openclawGid } : {}),
      });
      this.openclaw.once("exit", (code, signal) => {
        process.stdout.write(`[mlclaw] openclaw exited code=${code ?? "null"} signal=${signal ?? "null"}\n`);
        this.openclaw = undefined;
        if (!this.openclawStopping) {
          const exitCode = typeof code === "number" && code !== 0 ? code : 1;
          this.exitProcess(exitCode);
        }
      });
    } finally {
      this.openclawStarting = false;
    }
  }

  private async restartOpenClawWithOpenAi(apiKey: string): Promise<void> {
    await this.stopOpenClaw();
    await this.startOpenClaw({ OPENAI_API_KEY: apiKey });
  }

  private async restartOpenClaw(): Promise<void> {
    await this.stopOpenClaw();
    await this.startOpenClaw();
  }

  private isAllowed(username: string): boolean {
    return this.config.allowAnySignedIn || this.config.allowedUsers.includes(username);
  }

  private isAdmin(username: string): boolean {
    return this.config.adminUsers.includes(username);
  }

  private sendUnauthenticated(req: http.IncomingMessage, res: http.ServerResponse, url: URL): void {
    const next = normalizeNext(`${url.pathname}${url.search}`);
    if (this.config.gatewayLocation === "local" && isBrowserNavigation(req)) {
      this.sendRedirect(res, "/mlclaw/local-login");
      return;
    }
    if (url.pathname === "/" && (req.method === "GET" || req.method === "HEAD")) {
      this.sendHtml(res, loginPage(this.config, undefined, next));
      return;
    }
    if (isBrowserNavigation(req) && !isApiPath(url.pathname)) {
      this.sendRedirect(res, `/login?next=${encodeURIComponent(next)}`);
      return;
    }
    if (isApiPath(url.pathname)) {
      res.writeHead(401, { "content-type": "application/json; charset=utf-8" });
      res.end(`${JSON.stringify({ ok: false, error: "authentication required" })}\n`);
      return;
    }
    this.sendHtml(res, loginPage(this.config, undefined, next), 401);
  }

  private sendRedirect(res: http.ServerResponse, location: string): void {
    res.writeHead(302, { location });
    res.end();
  }

  private sendHtml(res: http.ServerResponse, body: string, status = 200): void {
    res.writeHead(status, { "content-type": "text/html; charset=utf-8" });
    res.end(body);
  }
}

async function spawnSidecar(
  command: string,
  args: string[],
  env: NodeJS.ProcessEnv,
  label: string,
  assign: (child: ChildProcess) => void,
  onUnexpectedExit: (child: ChildProcess, code: number) => void,
): Promise<void> {
  const child = spawn(command, args, { stdio: "inherit", env });
  assign(child);
  let started = false;
  const spawned = new Promise<void>((resolve, reject) => {
    child.once("spawn", () => {
      started = true;
      resolve();
    });
    child.once("error", reject);
  });
  child.once("exit", (code, signal) => {
    process.stdout.write(`[${label}] exited code=${code ?? "null"} signal=${signal ?? "null"}\n`);
    if (started) onUnexpectedExit(child, typeof code === "number" && code !== 0 ? code : 1);
  });
  await spawned;
}

async function stopSidecar(child: ChildProcess | undefined): Promise<void> {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  child.kill("SIGTERM");
  await new Promise<void>((resolve) => {
    const timer = setTimeout(() => child.kill("SIGKILL"), 10_000);
    child.once("exit", () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

async function waitForSidecarReady(child: ChildProcess | undefined, readyUrl: string, label: string): Promise<void> {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    if (!child || child.exitCode !== null || child.signalCode !== null) {
      throw new Error(`${label} exited before readiness`);
    }
    try {
      const response = await fetch(readyUrl, { signal: AbortSignal.timeout(500) });
      if (response.ok) return;
    } catch {
      // Readiness retries are bounded below.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`${label} readiness timed out`);
}

const SIDECAR_ENV_ALLOWLIST = [
  "PATH",
  "TZ",
  "LANG",
  "LC_ALL",
  "SSL_CERT_FILE",
  "SSL_CERT_DIR",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "no_proxy",
] as const;

function telegramBotMuxEnvironment(source: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  return sidecarEnvironment(source, "/var/lib/telegram-bot-mux", "telegram-bot-mux");
}

function unyoloTelegramEnvironment(source: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  return sidecarEnvironment(source, "/var/lib/unyolo-telegram", "unyolo-telegram");
}

function sidecarEnvironment(source: NodeJS.ProcessEnv, home: string, identity: string): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { HOME: home, USER: identity, LOGNAME: identity };
  for (const key of SIDECAR_ENV_ALLOWLIST) {
    if (source[key] !== undefined) env[key] = source[key];
  }
  return env;
}

const OPENCLAW_ENV_ALLOWLIST = [
  "PATH",
  "NODE_ENV",
  "TZ",
  "LANG",
  "LC_ALL",
  "OPENCLAW_AGENT_NAME",
  "OPENCLAW_CONFIG_PATH",
  "OPENCLAW_DISABLE_BONJOUR",
  "OPENCLAW_LIVE_DIR",
  "OPENCLAW_STATE_DIR",
  "OPENCLAW_WORKSPACE_DIR",
  "MLCLAW_HF_BROKER_URL",
  "MLCLAW_HF_BROKER_AGENT_SECRET_FILE",
  "TELEGRAM_ALLOWED_USERS",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_API_ROOT",
] as const;

function allowedOpenClawEnvironment(source: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const key of OPENCLAW_ENV_ALLOWLIST) {
    if (source[key] !== undefined) {
      env[key] = source[key];
    }
  }
  return env;
}

function nodeRequestToWebRequest(req: http.IncomingMessage, publicUrl: string, signal: AbortSignal): Request {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }
  const init: RequestInit & { duplex?: "half" } = {
    method: req.method ?? "GET",
    headers,
    signal,
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable.toWeb(req) as ReadableStream<Uint8Array>;
    init.duplex = "half";
  }
  return new Request(new URL(req.url ?? "/", publicUrl).toString(), init);
}

async function sendWebResponse(res: http.ServerResponse, response: Response): Promise<void> {
  const headers: http.OutgoingHttpHeaders = {};
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      headers[key] = value;
    }
  });
  const setCookies =
    (response.headers as Headers & { getSetCookie?: () => string[] }).getSetCookie?.() ??
    (response.headers.get("set-cookie") ? [response.headers.get("set-cookie") as string] : []);
  if (setCookies.length > 0) {
    headers["set-cookie"] = setCookies;
  }
  res.writeHead(response.status, headers);
  if (!response.body) {
    res.end();
    return;
  }
  const reader = response.body.getReader();
  try {
    while (!res.destroyed) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (!res.write(Buffer.from(value))) {
        await waitForDrainOrClose(res);
      }
    }
  } finally {
    if (res.destroyed) {
      void reader.cancel().catch(() => undefined);
    }
  }
  if (!res.destroyed && !res.writableEnded) {
    res.end();
  }
}

async function waitForDrainOrClose(res: http.ServerResponse): Promise<void> {
  await new Promise<void>((resolve) => {
    const done = () => {
      res.off("drain", done);
      res.off("close", done);
      resolve();
    };
    res.once("drain", done);
    res.once("close", done);
  });
}

function isBrowserNavigation(req: http.IncomingMessage): boolean {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return false;
  }
  return String(req.headers.accept ?? "").includes("text/html");
}

function isApiPath(pathname: string): boolean {
  return pathname.startsWith("/mlclaw/api/");
}

function isTemplateRuntimePath(pathname: string): boolean {
  return (
    pathname === "/health" ||
    pathname === "/healthz" ||
    pathname === "/favicon.svg" ||
    pathname === "/favicon-32.png" ||
    pathname === "/favicon.ico" ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/assets/hf-logo.svg" ||
    pathname === "/assets/mlclaw.svg" ||
    pathname === "/assets/assistant-avatar.svg" ||
    pathname === "/assets/brand/logo"
  );
}

function formatError(err: unknown): string {
  return err instanceof Error ? (err.stack ?? err.message) : String(err);
}
