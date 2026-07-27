import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterEach, describe, expect, it } from "vitest";
import { migrateLegacyOpenAiSessionRefs } from "../src/mlclaw-space-runtime/openclaw-state-migration.js";

const cleanups: Array<() => Promise<void> | void> = [];

afterEach(async () => {
  for (const cleanup of cleanups.splice(0).reverse()) await cleanup();
});

describe("native OpenAI session migration", () => {
  it("rewrites legacy JSON and SQLite session routes without changing unrelated entries", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-session-migration-"));
    cleanups.push(() => fs.rm(root, { recursive: true, force: true }));
    const stateDir = path.join(root, ".openclaw");
    const agentRoot = path.join(stateDir, "agents", "main");
    const jsonFile = path.join(agentRoot, "sessions", "sessions.json");
    const sqliteFile = path.join(agentRoot, "agent", "openclaw-agent.sqlite");
    await fs.mkdir(path.dirname(jsonFile), { recursive: true });
    await fs.mkdir(path.dirname(sqliteFile), { recursive: true });
    await fs.writeFile(
      jsonFile,
      JSON.stringify({
        legacy: {
          sessionId: "legacy-json",
          modelProvider: "mlclaw-codex",
          model: "gpt-5.4",
          modelOverride: "mlclaw-codex/gpt-5.4",
          updatedAt: 1,
        },
        untouched: { sessionId: "other", modelProvider: "huggingface", model: "model", updatedAt: 2 },
      }),
      { mode: 0o640 },
    );
    await fs.chmod(jsonFile, 0o640);
    const originalOwner = await fs.stat(jsonFile);
    const database = new DatabaseSync(sqliteFile);
    database.exec(
      "CREATE TABLE session_entries (session_key TEXT PRIMARY KEY, session_id TEXT NOT NULL, entry_json TEXT NOT NULL, updated_at INTEGER NOT NULL)",
    );
    database.prepare("INSERT INTO session_entries VALUES (?, ?, ?, ?)").run(
      "legacy",
      "legacy-sqlite",
      JSON.stringify({
        sessionId: "legacy-sqlite",
        providerOverride: "mlclaw-codex",
        modelOverride: "mlclaw-codex/gpt-5.4",
        updatedAt: 3,
      }),
      3,
    );
    database.close();

    await expect(
      migrateLegacyOpenAiSessionRefs({ openclawConfigPath: path.join(stateDir, "openclaw.json") }, () => 100),
    ).resolves.toBe(2);

    const migratedOwner = await fs.stat(jsonFile);
    expect(migratedOwner.mode & 0o777).toBe(0o640);
    expect(migratedOwner.uid).toBe(originalOwner.uid);
    expect(migratedOwner.gid).toBe(originalOwner.gid);
    const json = JSON.parse(await fs.readFile(jsonFile, "utf8"));
    expect(json.legacy).toMatchObject({
      modelProvider: "openai",
      model: "gpt-5.4",
      modelOverride: "openai/gpt-5.4",
      updatedAt: 100,
    });
    expect(json.untouched.updatedAt).toBe(2);
    const migratedDatabase = new DatabaseSync(sqliteFile, { readOnly: true });
    const row = migratedDatabase.prepare("SELECT entry_json, updated_at FROM session_entries").get() as {
      entry_json: string;
      updated_at: number;
    };
    migratedDatabase.close();
    expect(JSON.parse(row.entry_json)).toMatchObject({
      providerOverride: "openai",
      modelOverride: "openai/gpt-5.4",
      updatedAt: 100,
    });
    expect(row.updated_at).toBe(100);
  });
});
