import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { normalizeBucketPrefix } from "../hf-state-sync/paths.js";

export const CODEX_AUTH_OBJECT_BASENAME = ".mlclaw/codex-auth.enc";
export const CODEX_AUTH_REVOCATION_BASENAME = ".mlclaw/codex-auth.revoked";

export type CodexAuthContext = {
  deploymentId?: string;
  bucket?: string;
  statePrefix?: string;
};

export type CodexAuthDocument = {
  version: 1;
  kind: "codex-auth";
  authJson: Record<string, unknown>;
  updatedAt: string;
};

type EncryptedCodexAuthEnvelope = {
  version: 1;
  kind: "codex-auth";
  algorithm: "aes-256-gcm";
  context: CodexAuthContext;
  iv: string;
  tag: string;
  ciphertext: string;
};

export function codexAuthObjectPath(statePrefix?: string): string {
  return `${normalizeBucketPrefix(statePrefix)}/${CODEX_AUTH_OBJECT_BASENAME}`;
}

export function codexAuthRevocationObjectPath(statePrefix?: string): string {
  return `${normalizeBucketPrefix(statePrefix)}/${CODEX_AUTH_REVOCATION_BASENAME}`;
}

export function codexAuthContext(params: {
  deploymentId?: string;
  bucket?: string;
  statePrefix?: string;
}): CodexAuthContext {
  return compactContext({
    ...(params.deploymentId ? { deploymentId: params.deploymentId } : {}),
    ...(params.bucket ? { bucket: params.bucket } : {}),
    statePrefix: normalizeBucketPrefix(params.statePrefix),
  });
}

export function encodeCodexAuthDocument(params: { authJson: unknown; now: Date }): CodexAuthDocument {
  if (!params.authJson || typeof params.authJson !== "object" || Array.isArray(params.authJson)) {
    throw new Error("Codex auth.json must contain a JSON object");
  }
  const authJson = params.authJson as Record<string, unknown>;
  const authMode = typeof authJson.auth_mode === "string" ? authJson.auth_mode : undefined;
  if (authMode && authMode !== "chatgpt") {
    throw new Error("Codex auth.json is not a ChatGPT account login");
  }
  if (!authMode && !("tokens" in authJson)) {
    throw new Error("Codex auth.json does not look like account credentials");
  }
  return {
    version: 1,
    kind: "codex-auth",
    authJson,
    updatedAt: params.now.toISOString(),
  };
}

export function encryptCodexAuthDocument(params: {
  document: CodexAuthDocument;
  secret: string;
  context: CodexAuthContext;
}): string {
  const context = compactContext(params.context);
  const key = deriveCodexAuthKey(params.secret);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  cipher.setAAD(contextAad(context));
  const plaintext = Buffer.from(JSON.stringify(params.document), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const envelope: EncryptedCodexAuthEnvelope = {
    version: 1,
    kind: "codex-auth",
    algorithm: "aes-256-gcm",
    context,
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    ciphertext: ciphertext.toString("base64url"),
  };
  return `${JSON.stringify(envelope)}\n`;
}

export function decryptCodexAuthDocument(params: {
  encrypted: string;
  secret: string;
  expectedContext?: CodexAuthContext;
}): CodexAuthDocument {
  const envelope = JSON.parse(params.encrypted) as Partial<EncryptedCodexAuthEnvelope>;
  if (
    envelope.version !== 1 ||
    envelope.kind !== "codex-auth" ||
    envelope.algorithm !== "aes-256-gcm" ||
    !envelope.context ||
    typeof envelope.context !== "object" ||
    !envelope.iv ||
    !envelope.tag ||
    !envelope.ciphertext
  ) {
    throw new Error("invalid Codex auth envelope");
  }
  const context = compactContext(envelope.context);
  assertContextMatches(context, params.expectedContext);
  const key = deriveCodexAuthKey(params.secret);
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(envelope.iv, "base64url"));
  decipher.setAAD(contextAad(context));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64url"));
  const plaintext = Buffer.concat([decipher.update(Buffer.from(envelope.ciphertext, "base64url")), decipher.final()]);
  return decodeCodexAuthDocument(JSON.parse(plaintext.toString("utf8")));
}

export async function readEncryptedCodexAuthFile(params: {
  file: string;
  secret: string;
  expectedContext?: CodexAuthContext;
}): Promise<CodexAuthDocument | undefined> {
  let encrypted: string;
  try {
    encrypted = await fs.readFile(params.file, "utf8");
  } catch (error) {
    if (isNotFound(error)) return undefined;
    throw new Error("Could not read encrypted Codex credentials");
  }
  try {
    return decryptCodexAuthDocument({
      encrypted,
      secret: params.secret,
      ...(params.expectedContext ? { expectedContext: params.expectedContext } : {}),
    });
  } catch {
    throw new Error("Encrypted Codex credentials are invalid or cannot be decrypted");
  }
}

export async function writeEncryptedCodexAuthFile(params: {
  file: string;
  document: CodexAuthDocument;
  secret: string;
  context: CodexAuthContext;
}): Promise<void> {
  const encrypted = encryptCodexAuthDocument({
    document: params.document,
    secret: params.secret,
    context: params.context,
  });
  await writePrivateFile(params.file, encrypted);
}

export async function deleteEncryptedCodexAuthFile(file: string): Promise<void> {
  await fs.rm(file, { force: true });
}

export function decodeCodexAuthDocument(value: unknown): CodexAuthDocument {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("invalid Codex auth document");
  }
  const record = value as Record<string, unknown>;
  if (record.version !== 1 || record.kind !== "codex-auth") {
    throw new Error("invalid Codex auth document");
  }
  if (!record.authJson || typeof record.authJson !== "object" || Array.isArray(record.authJson)) {
    throw new Error("invalid Codex auth document");
  }
  const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : undefined;
  if (!updatedAt || Number.isNaN(Date.parse(updatedAt))) {
    throw new Error("invalid Codex auth document");
  }
  return {
    version: 1,
    kind: "codex-auth",
    authJson: record.authJson as Record<string, unknown>,
    updatedAt,
  };
}

function deriveCodexAuthKey(secret: string): Buffer {
  return Buffer.from(
    hkdfSync("sha256", Buffer.from(secret, "utf8"), Buffer.alloc(0), Buffer.from("mlclaw:codex-auth:v1"), 32),
  );
}

function compactContext(context: CodexAuthContext): CodexAuthContext {
  const statePrefix = normalizeBucketPrefix(context.statePrefix);
  return {
    ...(context.deploymentId ? { deploymentId: context.deploymentId } : {}),
    ...(context.bucket ? { bucket: context.bucket } : {}),
    statePrefix,
  };
}

function assertContextMatches(observed: CodexAuthContext, expected: CodexAuthContext | undefined): void {
  if (!expected) return;
  const normalized = compactContext(expected);
  for (const key of ["deploymentId", "bucket", "statePrefix"] as const) {
    if (normalized[key] && observed[key] !== normalized[key]) {
      throw new Error("Codex auth context does not match this deployment");
    }
  }
}

function contextAad(context: CodexAuthContext): Buffer {
  return Buffer.from(JSON.stringify(compactContext(context)), "utf8");
}

async function writePrivateFile(file: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  try {
    await fs.writeFile(temporary, content, { encoding: "utf8", mode: 0o600, flag: "wx" });
    await fs.chmod(temporary, 0o600);
    await fs.rename(temporary, file);
    await fs.chmod(file, 0o600);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

function isNotFound(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
