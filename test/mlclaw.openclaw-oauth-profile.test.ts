import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { loadConfig } from "../src/mlclaw-space-runtime/config.js";
import { OPENAI_OAUTH_PROFILE_ID, syncOpenAiOAuthProfile } from "../src/mlclaw-space-runtime/openclaw-oauth-profile.js";

const cleanups: Array<() => Promise<void> | void> = [];

afterEach(async () => {
  for (const cleanup of cleanups.splice(0).reverse()) await cleanup();
});

describe("native OpenClaw OAuth profile provisioning", () => {
  it("upserts only a newer managed profile and removes only that profile", async () => {
    const fixture = await fakeOpenClawPackage();
    const config = loadConfig({
      SPACE_ID: "alice/direct-openai",
      MLCLAW_SESSION_SECRET: "s".repeat(48),
      MLCLAW_CREDENTIAL_KEY: "k".repeat(48),
      MLCLAW_OPENCLAW_COMMAND: fixture.command,
      OPENCLAW_CONFIG_PATH: path.join(fixture.stateDir, "openclaw.json"),
      OPENCLAW_STATE_DIR: fixture.stateDir,
      MLCLAW_OPENCLAW_UID: String(process.getuid?.() ?? 1_000),
      MLCLAW_OPENCLAW_GID: String(process.getgid?.() ?? 1_000),
    });
    const env = {
      PATH: process.env.PATH,
      HOME: fixture.root,
      OPENCLAW_STATE_DIR: fixture.stateDir,
      OPENCLAW_CONFIG_PATH: config.openclawConfigPath,
    };
    await fs.mkdir(path.dirname(config.openclawConfigPath), { recursive: true });

    await expect(
      syncOpenAiOAuthProfile({
        config,
        credential: oauthCredential("access-new", "refresh-new", 2_000),
        env,
      }),
    ).resolves.toBe(true);
    await expect(
      syncOpenAiOAuthProfile({
        config,
        credential: oauthCredential("access-old", "refresh-old", 1_000),
        env,
      }),
    ).resolves.toBe(true);

    const storeFile = path.join(fixture.stateDir, "agents", "main", "agent", "store.json");
    const stored = JSON.parse(await fs.readFile(storeFile, "utf8"));
    expect(stored.profiles[OPENAI_OAUTH_PROFILE_ID]).toMatchObject({
      type: "oauth",
      provider: "openai",
      access: "access-new",
      refresh: "refresh-new",
      expires: 2_000,
      accountId: "acct_test",
    });
    expect(stored.profiles["openai:api"]).toEqual({
      type: "api_key",
      provider: "openai",
      key: "sk-preserved",
    });
    expect(stored.order.openai).toEqual([OPENAI_OAUTH_PROFILE_ID, "openai:api"]);

    await expect(syncOpenAiOAuthProfile({ config, env })).resolves.toBe(true);
    const removed = JSON.parse(await fs.readFile(storeFile, "utf8"));
    expect(removed.profiles[OPENAI_OAUTH_PROFILE_ID]).toBeUndefined();
    expect(removed.profiles["openai:api"]).toBeDefined();
    expect(removed.order.openai).toEqual(["openai:api"]);
  });

  it("returns false for commands that are not an OpenClaw package entry", async () => {
    const root = await temporaryDirectory();
    const config = loadConfig({
      SPACE_ID: "alice/direct-openai",
      MLCLAW_SESSION_SECRET: "s".repeat(48),
      MLCLAW_CREDENTIAL_KEY: "k".repeat(48),
      MLCLAW_OPENCLAW_COMMAND: process.execPath,
      OPENCLAW_CONFIG_PATH: path.join(root, "openclaw.json"),
    });

    await expect(
      syncOpenAiOAuthProfile({ config, credential: oauthCredential("a", "r", 1), env: process.env }),
    ).resolves.toBe(false);
  });
});

function oauthCredential(access: string, refresh: string, expires: number) {
  return { access, refresh, expires, accountId: "acct_test" };
}

async function fakeOpenClawPackage(): Promise<{
  root: string;
  stateDir: string;
  command: string;
}> {
  const root = await temporaryDirectory();
  const packageDir = path.join(root, "openclaw");
  const binDir = path.join(root, "bin");
  const stateDir = path.join(root, "state");
  const entry = path.join(packageDir, "openclaw.mjs");
  const sdk = path.join(packageDir, "provider-auth.js");
  const command = path.join(binDir, "openclaw");
  await fs.mkdir(binDir, { recursive: true });
  await fs.mkdir(packageDir, { recursive: true });
  await fs.writeFile(entry, "// fake OpenClaw entry\n", { mode: 0o755 });
  await fs.writeFile(
    path.join(packageDir, "package.json"),
    JSON.stringify({
      name: "openclaw",
      type: "module",
      exports: { "./plugin-sdk/provider-auth": "./provider-auth.js" },
    }),
  );
  await fs.writeFile(
    sdk,
    `import fs from "node:fs";import path from "node:path";
export async function updateAuthProfileStoreWithLock({agentDir,updater}) {
  fs.mkdirSync(agentDir,{recursive:true});
  const file=path.join(agentDir,"store.json");
  const initial=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,"utf8")):{version:1,profiles:{"openai:api":{type:"api_key",provider:"openai",key:"sk-preserved"}},order:{openai:["openai:api"]},lastGood:{openai:"openai:api"},usageStats:{}};
  if(updater(initial)) fs.writeFileSync(file,JSON.stringify(initial),{mode:0o600});
  return initial;
}
`,
  );
  await fs.symlink(entry, command);
  return { root, stateDir, command };
}

async function temporaryDirectory(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-openclaw-oauth-test-"));
  cleanups.push(() => fs.rm(root, { recursive: true, force: true }));
  return root;
}
