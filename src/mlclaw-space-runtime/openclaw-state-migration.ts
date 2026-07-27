import { existsSync, type Stats } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { SpaceRuntimeConfig } from "./config.js";
import { DEFAULT_OPENAI_MODEL_REF, LEGACY_CODEX_MODEL_REF } from "./openai-models.js";

const LEGACY_PROVIDER_ID = "mlclaw-codex";
const NATIVE_PROVIDER_ID = "openai";
const MAX_SESSION_STORE_BYTES = 64 * 1024 * 1024;

export async function migrateLegacyOpenAiSessionRefs(
  config: Pick<SpaceRuntimeConfig, "openclawConfigPath">,
  now: () => number = Date.now,
): Promise<number> {
  const stateDir = path.dirname(config.openclawConfigPath);
  const agentsDir = path.join(stateDir, "agents");
  let changed = 0;
  for (const agentId of await directoryNames(agentsDir)) {
    const agentRoot = path.join(agentsDir, agentId);
    changed += await migrateJsonSessionStore(path.join(agentRoot, "sessions", "sessions.json"), now);
    changed += migrateSqliteSessionStore(path.join(agentRoot, "agent", "openclaw-agent.sqlite"), now);
  }
  return changed;
}

function migrateSqliteSessionStore(file: string, now: () => number): number {
  if (!existsSync(file)) return 0;
  const database = new DatabaseSync(file);
  try {
    if (!hasSessionEntriesTable(database)) return 0;
    const updates = collectSqliteUpdates(database, now);
    if (updates.length === 0) return 0;
    applySqliteUpdates(database, updates);
    return updates.length;
  } finally {
    database.close();
  }
}

function hasSessionEntriesTable(database: DatabaseSync): boolean {
  return Boolean(
    database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'session_entries'").get(),
  );
}

function collectSqliteUpdates(
  database: DatabaseSync,
  now: () => number,
): Array<{ sessionKey: string; entryJson: string; updatedAt: number }> {
  const rows = database.prepare("SELECT session_key, entry_json FROM session_entries").all() as Array<{
    session_key: string;
    entry_json: string;
  }>;
  return rows.flatMap((row) => {
    const migrated = migrateSerializedEntry(row.entry_json, now);
    return migrated ? [{ sessionKey: row.session_key, entryJson: migrated, updatedAt: now() }] : [];
  });
}

function applySqliteUpdates(
  database: DatabaseSync,
  updates: Array<{ sessionKey: string; entryJson: string; updatedAt: number }>,
): void {
  const update = database.prepare("UPDATE session_entries SET entry_json = ?, updated_at = ? WHERE session_key = ?");
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const item of updates) update.run(item.entryJson, item.updatedAt, item.sessionKey);
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

async function migrateJsonSessionStore(file: string, now: () => number): Promise<number> {
  const stat = await optionalStat(file);
  if (!stat?.isFile()) return 0;
  if (stat.size > MAX_SESSION_STORE_BYTES) {
    throw new Error(`OpenClaw session store exceeds ${MAX_SESSION_STORE_BYTES} bytes: ${file}`);
  }
  const value = parseSessionStore(await fs.readFile(file, "utf8"), file);
  const result = migrateSessionStore(value, now);
  if (result.changed === 0) return 0;
  await writeJsonAtomic(file, result.value, {
    mode: stat.mode & 0o777,
    uid: stat.uid,
    gid: stat.gid,
  });
  return result.changed;
}

async function optionalStat(file: string): Promise<Stats | undefined> {
  try {
    return await fs.stat(file);
  } catch (error) {
    if (isNotFound(error)) return undefined;
    throw error;
  }
}

function parseSessionStore(raw: string, file: string): Record<string, unknown> {
  const value = JSON.parse(raw) as unknown;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`OpenClaw session store must be a JSON object: ${file}`);
  }
  return value as Record<string, unknown>;
}

function migrateSessionStore(
  store: Record<string, unknown>,
  now: () => number,
): { value: Record<string, unknown>; changed: number } {
  let changed = 0;
  const value = Object.fromEntries(
    Object.entries(store).map(([key, entry]) => {
      const result = migrateValue(entry);
      if (result.changed) changed += 1;
      if (result.changed && isMutableRecord(result.value)) result.value.updatedAt = now();
      return [key, result.value];
    }),
  );
  return { value, changed };
}

function migrateSerializedEntry(raw: string, now: () => number): string | undefined {
  let value: unknown;
  try {
    value = JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
  const result = migrateValue(value);
  if (!result.changed) return undefined;
  if (result.value && typeof result.value === "object" && !Array.isArray(result.value)) {
    (result.value as Record<string, unknown>).updatedAt = now();
  }
  return JSON.stringify(result.value);
}

function migrateValue(value: unknown): { value: unknown; changed: boolean } {
  if (typeof value === "string") return migrateString(value);
  if (Array.isArray(value)) return migrateArray(value);
  if (isMutableRecord(value)) return migrateRecord(value);
  return { value, changed: false };
}

function migrateString(value: string): { value: string; changed: boolean } {
  if (value === LEGACY_CODEX_MODEL_REF) return { value: DEFAULT_OPENAI_MODEL_REF, changed: true };
  if (value === LEGACY_PROVIDER_ID) return { value: NATIVE_PROVIDER_ID, changed: true };
  return { value, changed: false };
}

function migrateArray(value: unknown[]): { value: unknown; changed: boolean } {
  let changed = false;
  const migrated = value.map((entry) => {
    const result = migrateValue(entry);
    changed ||= result.changed;
    return result.value;
  });
  return { value: changed ? migrated : value, changed };
}

function migrateRecord(value: Record<string, unknown>): { value: unknown; changed: boolean } {
  let changed = false;
  const migrated = Object.fromEntries(
    Object.entries(value).map(([key, entry]) => {
      const migratedKey = key === LEGACY_CODEX_MODEL_REF ? DEFAULT_OPENAI_MODEL_REF : key;
      const result = migrateValue(entry);
      changed ||= migratedKey !== key || result.changed;
      return [migratedKey, result.value];
    }),
  );
  return { value: changed ? migrated : value, changed };
}

function isMutableRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

async function directoryNames(directory: string): Promise<string[]> {
  try {
    return (await fs.readdir(directory, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }
}

async function writeJsonAtomic(
  file: string,
  value: unknown,
  ownership: { mode: number; uid: number; gid: number },
): Promise<void> {
  const temporary = `${file}.${process.pid}.${Math.random().toString(16).slice(2)}.tmp`;
  try {
    await fs.writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, {
      mode: ownership.mode,
      flag: "wx",
    });
    if (process.getuid?.() === 0) await fs.chown(temporary, ownership.uid, ownership.gid);
    await fs.rename(temporary, file);
    await fs.chmod(file, ownership.mode);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

function isNotFound(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
