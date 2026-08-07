import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

type TelegramConfig = {
  commands: {
    ownerAllowFrom?: string[];
    [key: string]: unknown;
  };
  channels: {
    telegram: {
      enabled?: boolean;
      botToken?: string;
      apiRoot?: string;
      allowFrom?: string[];
    };
  };
};

async function configureTelegram(config: object, apiRoot: string): Promise<TelegramConfig> {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-telegram-config-"));
  const configPath = path.join(directory, "openclaw.json");
  await fs.writeFile(configPath, JSON.stringify(config));

  await execFileAsync("node", ["scripts/configure-telegram.mjs", configPath, "42"], {
    env: { ...process.env, TELEGRAM_API_ROOT: apiRoot },
  });

  return JSON.parse(await fs.readFile(configPath, "utf8")) as TelegramConfig;
}

describe("Telegram channel config", () => {
  it("writes the managed API root for the shared-bot client", async () => {
    const config = await configureTelegram({}, "http://127.0.0.1:7865/client/openclaw");

    expect(config.channels.telegram).toMatchObject({
      enabled: true,
      botToken: "${TELEGRAM_BOT_TOKEN}",
      apiRoot: "http://127.0.0.1:7865/client/openclaw",
      allowFrom: ["42"],
    });
    expect(config.commands.ownerAllowFrom).toEqual(["telegram:42"]);
  });

  it("removes a stale managed API root when using a separate bot", async () => {
    const config = await configureTelegram(
      { channels: { telegram: { apiRoot: "http://127.0.0.1:7865/client/openclaw" } } },
      "",
    );

    expect(config.channels.telegram.apiRoot).toBeUndefined();
  });

  it("replaces managed Telegram owners while preserving unrelated command settings", async () => {
    const config = await configureTelegram(
      {
        commands: { ownerAllowFrom: ["discord:alice", "telegram:old"], custom: true },
        channels: { telegram: { allowFrom: ["old"] } },
      },
      "",
    );

    expect(config.channels.telegram.allowFrom).toEqual(["42"]);
    expect(config.commands).toMatchObject({
      ownerAllowFrom: ["discord:alice", "telegram:42"],
      custom: true,
    });
  });
});
