import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { normalizeModelRef, normalizeModelChoices, type ModelChoice } from "./model-choices.js";

const RUNTIME_SETTINGS_VERSION = 1;
const MAX_RUNTIME_SETTINGS_BYTES = 256 * 1024;
const RUNTIME_SETTINGS_KEYS = new Set(["version", "generation", "model", "modelChoices", "updatedAt"]);
const PROCESS_LOCK_ID = randomUUID();
const INCOMPLETE_LOCK_STALE_MS = 5_000;

export type RuntimeSettingsDocument = {
  version: 1;
  generation: number;
  model: string;
  modelChoices: ModelChoice[];
  updatedAt: string;
};

export class RuntimeSettingsConflictError extends Error {
  constructor() {
    super("runtime settings changed; refresh before saving");
    this.name = "RuntimeSettingsConflictError";
  }
}

export function readRuntimeSettingsFile(file: string): RuntimeSettingsDocument | undefined {
  let raw: string;
  try {
    raw = readFileSync(file, "utf8");
  } catch (error) {
    if (isNodeError(error, "ENOENT")) return undefined;
    throw new Error("runtime settings are unavailable", { cause: error });
  }
  if (Buffer.byteLength(raw) > MAX_RUNTIME_SETTINGS_BYTES) {
    throw new Error("runtime settings exceed the size limit");
  }
  return parseRuntimeSettings(raw);
}

export async function initializeRuntimeSettingsFile(params: {
  file: string;
  model: string;
  modelChoices: readonly ModelChoice[];
  bootstrapUpdatedAt?: string;
  now?: () => Date;
}): Promise<RuntimeSettingsDocument> {
  const current = readRuntimeSettingsFile(params.file);
  if (current && !bootstrapSupersedes(current, params.model, params.bootstrapUpdatedAt)) return current;
  return writeInitialRuntimeSettings(params, current?.generation ?? 0);
}

async function writeInitialRuntimeSettings(
  params: {
    file: string;
    model: string;
    modelChoices: readonly ModelChoice[];
    now?: () => Date;
  },
  expectedGeneration: number,
): Promise<RuntimeSettingsDocument> {
  try {
    return await writeRuntimeSettingsFile({
      file: params.file,
      model: params.model,
      modelChoices: params.modelChoices,
      expectedGeneration,
      ...(params.now ? { now: params.now } : {}),
    });
  } catch (error) {
    if (error instanceof RuntimeSettingsConflictError) {
      const winner = readRuntimeSettingsFile(params.file);
      if (winner) return winner;
    }
    throw error;
  }
}

function bootstrapSupersedes(
  current: RuntimeSettingsDocument,
  bootstrapModel: string,
  bootstrapUpdatedAt: string | undefined,
): boolean {
  return (
    current.model !== bootstrapModel &&
    typeof bootstrapUpdatedAt === "string" &&
    validTimestamp(bootstrapUpdatedAt) &&
    Date.parse(bootstrapUpdatedAt) > Date.parse(current.updatedAt)
  );
}

export async function writeRuntimeSettingsFile(params: {
  file: string;
  model: string;
  modelChoices: readonly ModelChoice[];
  expectedGeneration: number;
  now?: () => Date;
}): Promise<RuntimeSettingsDocument> {
  await fs.mkdir(path.dirname(params.file), { recursive: true, mode: 0o700 });
  const lockFile = `${params.file}.lock`;
  const lock = await acquireRuntimeSettingsLock(lockFile);
  try {
    const current = readRuntimeSettingsFile(params.file);
    if ((current?.generation ?? 0) !== params.expectedGeneration) throw new RuntimeSettingsConflictError();
    const document = buildRuntimeSettings({
      model: params.model,
      modelChoices: params.modelChoices,
      generation: params.expectedGeneration + 1,
      now: params.now ?? (() => new Date()),
    });
    const temporary = `${params.file}.${randomUUID()}.tmp`;
    try {
      await fs.writeFile(temporary, `${JSON.stringify(document, null, 2)}\n`, { mode: 0o600, flag: "wx" });
      await fs.rename(temporary, params.file);
      await fs.chmod(params.file, 0o600);
    } finally {
      await fs.rm(temporary, { force: true });
    }
    return document;
  } finally {
    await lock.close();
    await fs.rm(lockFile, { force: true });
  }
}

async function acquireRuntimeSettingsLock(lockFile: string, recoverStale = true): Promise<fs.FileHandle> {
  let lock: fs.FileHandle;
  try {
    lock = await fs.open(lockFile, "wx", 0o600);
  } catch (error) {
    if (!isNodeError(error, "EEXIST")) throw error;
    if (!recoverStale || !(await runtimeSettingsLockIsStale(lockFile))) {
      throw new RuntimeSettingsConflictError();
    }
    await fs.rm(lockFile, { force: true });
    return acquireRuntimeSettingsLock(lockFile, false);
  }
  try {
    await lock.writeFile(`${JSON.stringify({ pid: process.pid, processLockId: PROCESS_LOCK_ID })}\n`);
    return lock;
  } catch (error) {
    await lock.close();
    await fs.rm(lockFile, { force: true });
    throw error;
  }
}

async function runtimeSettingsLockIsStale(lockFile: string): Promise<boolean> {
  let owner: unknown;
  try {
    owner = JSON.parse(await fs.readFile(lockFile, "utf8"));
  } catch {
    return incompleteRuntimeSettingsLockIsStale(lockFile);
  }
  if (!isRecord(owner) || !Number.isSafeInteger(owner.pid) || typeof owner.processLockId !== "string") {
    return incompleteRuntimeSettingsLockIsStale(lockFile);
  }
  const ownerPid = Number(owner.pid);
  if (ownerPid === process.pid) return owner.processLockId !== PROCESS_LOCK_ID;
  try {
    process.kill(ownerPid, 0);
    return false;
  } catch (error) {
    return isNodeError(error, "ESRCH");
  }
}

async function incompleteRuntimeSettingsLockIsStale(lockFile: string): Promise<boolean> {
  try {
    const stat = await fs.stat(lockFile);
    return Date.now() - stat.mtimeMs >= INCOMPLETE_LOCK_STALE_MS;
  } catch {
    return false;
  }
}

export function buildRuntimeSettings(params: {
  model: string;
  modelChoices: unknown;
  generation: number;
  now: () => Date;
}): RuntimeSettingsDocument {
  const model = normalizeModelRef(params.model);
  const modelChoices = normalizeModelChoices(params.modelChoices, model ?? "");
  if (!model || !modelChoices || !Number.isSafeInteger(params.generation) || params.generation < 1) {
    throw new Error("runtime settings are invalid");
  }
  return {
    version: RUNTIME_SETTINGS_VERSION,
    generation: params.generation,
    model,
    modelChoices,
    updatedAt: params.now().toISOString(),
  };
}

export function parseRuntimeSettings(raw: string): RuntimeSettingsDocument {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error("runtime settings are invalid", { cause: error });
  }
  const fields = validatedRuntimeSettingsFields(parsed);
  return buildRuntimeSettings({
    model: fields.model,
    modelChoices: fields.modelChoices,
    generation: fields.generation,
    now: () => new Date(fields.updatedAt),
  });
}

function validatedRuntimeSettingsFields(value: unknown): {
  model: string;
  modelChoices: unknown[];
  generation: number;
  updatedAt: string;
} {
  if (!isRecord(value) || Object.keys(value).some((key) => !RUNTIME_SETTINGS_KEYS.has(key))) {
    throw new Error("runtime settings are invalid");
  }
  if (value.version !== RUNTIME_SETTINGS_VERSION) throw new Error("runtime settings are invalid");
  return {
    model: requiredRuntimeSettingsModel(value.model),
    modelChoices: requiredRuntimeSettingsChoices(value.modelChoices),
    generation: requiredRuntimeSettingsGeneration(value.generation),
    updatedAt: requiredRuntimeSettingsTimestamp(value.updatedAt),
  };
}

function requiredRuntimeSettingsModel(value: unknown): string {
  if (typeof value !== "string") throw new Error("runtime settings are invalid");
  return value;
}

function requiredRuntimeSettingsChoices(value: unknown): unknown[] {
  if (!Array.isArray(value)) throw new Error("runtime settings are invalid");
  return value;
}

function requiredRuntimeSettingsGeneration(value: unknown): number {
  if (!Number.isSafeInteger(value) || Number(value) < 1) throw new Error("runtime settings are invalid");
  return Number(value);
}

function requiredRuntimeSettingsTimestamp(value: unknown): string {
  if (typeof value !== "string" || !validTimestamp(value)) throw new Error("runtime settings are invalid");
  return value;
}

function validTimestamp(value: string): boolean {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString() === value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNodeError(error: unknown, code: string): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error && error.code === code;
}
