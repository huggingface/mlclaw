import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadConfig } from "../src/mlclaw-space-runtime/config.js";
import { PRESET_MODEL_CHOICES } from "../src/mlclaw-space-runtime/model-choices.js";
import {
  RuntimeSettingsConflictError,
  initializeRuntimeSettingsFile,
  readRuntimeSettingsFile,
  writeRuntimeSettingsFile,
} from "../src/mlclaw-space-runtime/runtime-settings-file.js";

let root: string;

beforeEach(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-runtime-settings-"));
});

afterEach(async () => {
  await fs.rm(root, { recursive: true, force: true });
});

function qwenChoice() {
  const choice = PRESET_MODEL_CHOICES.find((candidate) => candidate.modelId === "Qwen/Qwen3.6-27B");
  if (!choice) throw new Error("Qwen preset is unavailable");
  return choice;
}

describe("canonical runtime settings", () => {
  it("initializes atomically and remains the only model source across restart", async () => {
    const file = path.join(root, ".mlclaw", "runtime-settings.json");
    const choice = qwenChoice();
    const initialized = await initializeRuntimeSettingsFile({
      file,
      model: choice.openclawModel,
      modelChoices: [choice],
      now: () => new Date("2026-08-07T00:00:00.000Z"),
    });

    expect(initialized.generation).toBe(1);
    expect((await fs.stat(file)).mode & 0o777).toBe(0o600);
    expect(readRuntimeSettingsFile(file)).toEqual(initialized);

    const restarted = loadConfig({
      MLCLAW_RUNTIME_SETTINGS_FILE: file,
      OPENCLAW_MODEL: "openai/stale-bootstrap-model",
      MLCLAW_SESSION_SECRET: "s".repeat(48),
      MLCLAW_CREDENTIAL_KEY: "k".repeat(48),
    });
    expect(restarted.model).toBe(choice.openclawModel);
    expect(restarted.runtimeSettingsGeneration).toBe(1);
  });

  it("applies a newer deployment bootstrap once but preserves later control UI settings", async () => {
    const file = path.join(root, ".mlclaw", "runtime-settings.json");
    const choice = qwenChoice();
    await initializeRuntimeSettingsFile({
      file,
      model: choice.openclawModel,
      modelChoices: [choice],
      now: () => new Date("2026-08-07T00:00:00.000Z"),
    });

    const deployed = await initializeRuntimeSettingsFile({
      file,
      model: "openai/gpt-5.6-sol",
      modelChoices: [choice],
      bootstrapUpdatedAt: "2026-08-07T01:00:00.000Z",
      now: () => new Date("2026-08-07T01:00:01.000Z"),
    });
    expect(deployed).toMatchObject({ model: "openai/gpt-5.6-sol", generation: 2 });

    const ui = await writeRuntimeSettingsFile({
      file,
      model: choice.openclawModel,
      modelChoices: [choice],
      expectedGeneration: 2,
      now: () => new Date("2026-08-07T02:00:00.000Z"),
    });
    const restarted = await initializeRuntimeSettingsFile({
      file,
      model: "openai/gpt-5.6-sol",
      modelChoices: [choice],
      bootstrapUpdatedAt: "2026-08-07T01:00:00.000Z",
    });
    expect(restarted).toEqual(ui);
  });

  it("recovers a lock left by a terminated runtime", async () => {
    const file = path.join(root, ".mlclaw", "runtime-settings.json");
    const choice = qwenChoice();
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(
      `${file}.lock`,
      `${JSON.stringify({ pid: 2_000_000_000, processLockId: "terminated-runtime" })}\n`,
      { mode: 0o600 },
    );

    const settings = await writeRuntimeSettingsFile({
      file,
      model: choice.openclawModel,
      modelChoices: [choice],
      expectedGeneration: 0,
    });

    expect(settings.generation).toBe(1);
    await expect(fs.access(`${file}.lock`)).rejects.toThrow();
  });

  it("allows only one writer for each expected generation", async () => {
    const file = path.join(root, ".mlclaw", "runtime-settings.json");
    const choice = qwenChoice();
    await initializeRuntimeSettingsFile({ file, model: choice.openclawModel, modelChoices: [choice] });

    const writes = await Promise.allSettled([
      writeRuntimeSettingsFile({
        file,
        model: choice.openclawModel,
        modelChoices: [choice],
        expectedGeneration: 1,
      }),
      writeRuntimeSettingsFile({
        file,
        model: choice.openclawModel,
        modelChoices: [choice],
        expectedGeneration: 1,
      }),
    ]);

    expect(writes.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    const rejected = writes.find((result) => result.status === "rejected");
    expect(rejected).toMatchObject({ reason: expect.any(RuntimeSettingsConflictError) });
    expect(readRuntimeSettingsFile(file)?.generation).toBe(2);
  });

  it("rejects malformed and extended documents instead of falling back", async () => {
    const file = path.join(root, "runtime-settings.json");
    await fs.writeFile(
      file,
      JSON.stringify({
        version: 1,
        generation: 1,
        model: qwenChoice().openclawModel,
        modelChoices: [qwenChoice()],
        updatedAt: "2026-08-07T00:00:00.000Z",
        apiKey: "must-not-be-accepted",
      }),
    );

    expect(() => readRuntimeSettingsFile(file)).toThrow("runtime settings are invalid");
  });
});
