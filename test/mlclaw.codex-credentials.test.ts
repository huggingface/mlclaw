import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  codexAuthContext,
  encodeCodexAuthDocument,
  readEncryptedCodexAuthFile,
  writeEncryptedCodexAuthFile,
} from "../src/mlclaw/codex-auth.js";
import { codexAuthJsonFromOAuthCredential } from "../src/mlclaw/openai-codex-device-auth.js";
import { CodexCredentialStore } from "../src/mlclaw-space-runtime/codex-credentials.js";
import { loadConfig, type SpaceRuntimeConfig } from "../src/mlclaw-space-runtime/config.js";

const roots: string[] = [];

function accessToken(accountId: string, expiresMs: number): string {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Math.floor(expiresMs / 1000),
      "https://api.openai.com/auth": { chatgpt_account_id: accountId },
    }),
    "utf8",
  ).toString("base64url");
  return `header.${payload}.signature`;
}

async function fixture(now = new Date("2026-07-27T10:00:00.000Z")): Promise<{
  config: SpaceRuntimeConfig;
  store: CodexCredentialStore;
  now: Date;
}> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-codex-credentials-"));
  roots.push(root);
  const config = loadConfig({
    SPACE_ID: "alice/research",
    MLCLAW_SESSION_SECRET: "s".repeat(48),
    MLCLAW_CREDENTIAL_KEY: "k".repeat(48),
    MLCLAW_STATE_MOUNT_DIR: root,
    OPENCLAW_HF_STATE_BUCKET: "alice/research-data",
    OPENCLAW_HF_STATE_PREFIX: "openclaw-state",
    MLCLAW_DEPLOYMENT_ID: "00000000-0000-4000-8000-000000000001",
  });
  return { config, store: new CodexCredentialStore(config, () => now), now };
}

async function writeCredential(
  config: SpaceRuntimeConfig,
  params: { access: string; refresh: string; expires: number; accountId: string },
  now: Date,
): Promise<void> {
  await writeEncryptedCodexAuthFile({
    file: config.codexAuthStoreFile,
    document: encodeCodexAuthDocument({
      authJson: codexAuthJsonFromOAuthCredential(params, now),
      now,
    }),
    secret: config.credentialKey,
    context: credentialContext(config),
  });
}

function credentialContext(config: SpaceRuntimeConfig) {
  if (!config.deploymentId || !config.stateBucket) throw new Error("test config is incomplete");
  return codexAuthContext({
    deploymentId: config.deploymentId,
    bucket: config.stateBucket,
    ...(config.statePrefix ? { statePrefix: config.statePrefix } : {}),
  });
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe("CodexCredentialStore", () => {
  it("loads a deployment-scoped credential without exposing a Codex home", async () => {
    const { config, store, now } = await fixture();
    const expires = now.getTime() + 60 * 60_000;
    await writeCredential(
      config,
      { access: accessToken("acct_123", expires), refresh: "refresh-1", expires, accountId: "acct_123" },
      now,
    );

    await expect(store.configured()).resolves.toBe(true);
    await expect(store.credential()).resolves.toMatchObject({ refresh: "refresh-1", accountId: "acct_123" });
  });

  it("rejects a staged credential after authoritative revocation", async () => {
    const { config, store, now } = await fixture();
    const expires = now.getTime() + 60 * 60_000;
    await writeCredential(
      config,
      { access: accessToken("acct_123", expires), refresh: "refresh-1", expires, accountId: "acct_123" },
      now,
    );
    const candidate = await store.credentialForImport();
    if (!candidate) throw new Error("test credential missing");
    await fs.writeFile(path.join(path.dirname(config.codexAuthStoreFile), "codex-auth.revoked"), "revoked\n");

    await expect(store.credentialIsCurrent(candidate)).resolves.toBe(false);
    await expect(fs.stat(config.codexAuthStoreFile)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("refreshes expiring credentials and persists the rotated token", async () => {
    const { config, now } = await fixture();
    const expires = now.getTime() + 60_000;
    await writeCredential(
      config,
      { access: accessToken("acct_123", expires), refresh: "refresh-old", expires, accountId: "acct_123" },
      now,
    );
    const refreshedExpires = now.getTime() + 3_600_000;
    const store = new CodexCredentialStore(
      config,
      () => now,
      async () =>
        new Response(
          JSON.stringify({
            access_token: accessToken("acct_123", refreshedExpires),
            refresh_token: "refresh-new",
            expires_in: 3600,
          }),
        ),
    );

    await expect(store.credential()).resolves.toMatchObject({ refresh: "refresh-new", expires: refreshedExpires });
    const document = await readEncryptedCodexAuthFile({
      file: config.codexAuthStoreFile,
      secret: config.credentialKey,
      expectedContext: credentialContext(config),
    });
    expect(document?.authJson).toMatchObject({ tokens: { refresh_token: "refresh-new" } });
  });

  it("does not overwrite a newer login that arrives during refresh", async () => {
    const { config, now } = await fixture();
    const oldExpires = now.getTime() + 60_000;
    await writeCredential(
      config,
      {
        access: accessToken("acct_123", oldExpires),
        refresh: "refresh-old",
        expires: oldExpires,
        accountId: "acct_123",
      },
      now,
    );
    const newerExpires = now.getTime() + 7_200_000;
    const store = new CodexCredentialStore(
      config,
      () => now,
      async () => {
        await writeCredential(
          config,
          {
            access: accessToken("acct_123", newerExpires),
            refresh: "refresh-newer-login",
            expires: newerExpires,
            accountId: "acct_123",
          },
          new Date(now.getTime() + 1_000),
        );
        return new Response(
          JSON.stringify({
            access_token: accessToken("acct_123", now.getTime() + 3_600_000),
            refresh_token: "refresh-stale-runtime",
            expires_in: 3600,
          }),
        );
      },
    );

    await expect(store.credential()).resolves.toMatchObject({ refresh: "refresh-newer-login" });
    const encrypted = await fs.readFile(config.codexAuthStoreFile, "utf8");
    expect(encrypted).not.toContain("refresh-newer-login");
    const document = await readEncryptedCodexAuthFile({
      file: config.codexAuthStoreFile,
      secret: config.credentialKey,
      expectedContext: credentialContext(config),
    });
    expect(document?.authJson).toMatchObject({ tokens: { refresh_token: "refresh-newer-login" } });
  });

  it("does not restore a logout that arrives during refresh", async () => {
    const { config, now } = await fixture();
    const expires = now.getTime() + 60_000;
    await writeCredential(
      config,
      { access: accessToken("acct_123", expires), refresh: "refresh-old", expires, accountId: "acct_123" },
      now,
    );
    const store = new CodexCredentialStore(
      config,
      () => now,
      async () => {
        await fs.writeFile(path.join(path.dirname(config.codexAuthStoreFile), "codex-auth.revoked"), "revoked\n");
        await fs.rm(config.codexAuthStoreFile);
        return Response.json({
          access_token: accessToken("acct_123", now.getTime() + 3_600_000),
          refresh_token: "refresh-after-logout",
          expires_in: 3600,
        });
      },
    );

    await expect(store.credential()).rejects.toThrow("revoked during refresh");
    await expect(fs.access(config.codexAuthStoreFile)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("treats the revocation marker as authoritative", async () => {
    const { config, store, now } = await fixture();
    const expires = now.getTime() + 60 * 60_000;
    await writeCredential(
      config,
      { access: accessToken("acct_123", expires), refresh: "refresh-1", expires, accountId: "acct_123" },
      now,
    );
    await fs.writeFile(path.join(path.dirname(config.codexAuthStoreFile), "codex-auth.revoked"), "revoked\n");

    await expect(store.configured()).resolves.toBe(false);
    await expect(fs.access(config.codexAuthStoreFile)).rejects.toMatchObject({ code: "ENOENT" });
  });
});
