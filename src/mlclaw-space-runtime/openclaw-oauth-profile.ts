import { constants as fsConstants } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import type { OpenAICodexOAuthCredential } from "../mlclaw/openai-codex-device-auth.js";
import type { SpaceRuntimeConfig } from "./config.js";

export const OPENAI_OAUTH_PROFILE_ID = "openai:mlclaw";

const MAX_HELPER_OUTPUT_BYTES = 64 * 1024;

const PROFILE_HELPER_SCRIPT = String.raw`
import fs from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const input = fs.readFileSync(0, "utf8");
const payload = JSON.parse(input);
const require = createRequire(pathToFileURL(payload.openclawEntry));
const sdkPath = require.resolve("openclaw/plugin-sdk/provider-auth");
const { updateAuthProfileStoreWithLock } = await import(pathToFileURL(sdkPath).href);

const result = await updateAuthProfileStoreWithLock({
  agentDir: payload.agentDir,
  saveOptions: { filterExternalAuthProfiles: false, syncExternalCli: false },
  updater(store) {
    const profileId = payload.profileId;
    const existing = store.profiles[profileId];
    if (payload.operation === "remove") {
      let changed = false;
      if (existing) {
        delete store.profiles[profileId];
        changed = true;
      }
      if (store.usageStats?.[profileId]) {
        delete store.usageStats[profileId];
        changed = true;
      }
      if (store.lastGood) {
        for (const [provider, value] of Object.entries(store.lastGood)) {
          if (value === profileId) {
            delete store.lastGood[provider];
            changed = true;
          }
        }
      }
      if (store.order) {
        for (const [provider, order] of Object.entries(store.order)) {
          const next = Array.isArray(order) ? order.filter((value) => value !== profileId) : order;
          if (Array.isArray(order) && next.length !== order.length) {
            changed = true;
            if (next.length > 0) store.order[provider] = next;
            else delete store.order[provider];
          }
        }
      }
      return changed;
    }

    const incoming = payload.credential;
    if (
      existing?.type === "oauth" &&
      existing.provider === "openai" &&
      existing.accountId === incoming.accountId &&
      Number(existing.expires) >= Number(incoming.expires)
    ) {
      return false;
    }
    store.profiles[profileId] = incoming;
    const currentOrder = Array.isArray(store.order?.openai) ? store.order.openai : [];
    store.order = {
      ...store.order,
      openai: [profileId, ...currentOrder.filter((value) => value !== profileId)],
    };
    return true;
  },
});

if (!result) throw new Error("OpenClaw auth profile store was unavailable");
process.stdout.write(JSON.stringify({ ok: true }) + "\n");
`;

export async function syncOpenAiOAuthProfile(params: {
  config: SpaceRuntimeConfig;
  credential?: OpenAICodexOAuthCredential;
  env: NodeJS.ProcessEnv;
}): Promise<boolean> {
  const openclawEntry = await resolveOpenClawEntry(params.config.openclawCommand, params.env.PATH);
  if (!openclawEntry) return false;
  const agentDir = path.join(path.dirname(params.config.openclawConfigPath), "agents", "main", "agent");
  const credential = params.credential
    ? {
        type: "oauth" as const,
        provider: "openai",
        access: params.credential.access,
        refresh: params.credential.refresh,
        expires: params.credential.expires,
        accountId: params.credential.accountId,
        ...(params.credential.idToken ? { idToken: params.credential.idToken } : {}),
        displayName: "MLClaw ChatGPT",
      }
    : undefined;
  await runProfileHelper({
    openclawEntry,
    agentDir,
    env: params.env,
    payload: {
      operation: credential ? "upsert" : "remove",
      profileId: OPENAI_OAUTH_PROFILE_ID,
      ...(credential ? { credential } : {}),
    },
    ...(process.getuid?.() === 0 ? { uid: params.config.openclawUid, gid: params.config.openclawGid } : {}),
  });
  return true;
}

async function resolveOpenClawEntry(command: string, pathValue: string | undefined): Promise<string | undefined> {
  const candidate = command.includes(path.sep) ? path.resolve(command) : await findOnPath(command, pathValue);
  if (!candidate) return undefined;
  try {
    const real = await fs.realpath(candidate);
    if (path.basename(real) !== "openclaw.mjs") return undefined;
    return real;
  } catch {
    return undefined;
  }
}

async function findOnPath(command: string, pathValue: string | undefined): Promise<string | undefined> {
  for (const directory of (pathValue ?? "").split(path.delimiter)) {
    if (!directory) continue;
    const candidate = path.join(directory, command);
    try {
      await fs.access(candidate, fsConstants.X_OK);
      return candidate;
    } catch {
      // Continue searching PATH.
    }
  }
  return undefined;
}

async function runProfileHelper(params: {
  openclawEntry: string;
  agentDir: string;
  env: NodeJS.ProcessEnv;
  payload: Record<string, unknown>;
  uid?: number;
  gid?: number;
}): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, ["--input-type=module", "--eval", PROFILE_HELPER_SCRIPT], {
      stdio: ["pipe", "pipe", "pipe"],
      env: params.env,
      ...(params.uid !== undefined ? { uid: params.uid } : {}),
      ...(params.gid !== undefined ? { gid: params.gid } : {}),
    });
    let stdout = "";
    let stderr = "";
    const append = (current: string, chunk: Buffer): string =>
      `${current}${chunk.toString("utf8")}`.slice(-MAX_HELPER_OUTPUT_BYTES);
    child.stdout.on("data", (chunk: Buffer) => {
      stdout = append(stdout, chunk);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr = append(stderr, chunk);
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0 && stdout.includes('"ok":true')) {
        resolve();
        return;
      }
      reject(
        new Error(
          `OpenClaw OAuth profile update failed (code=${code ?? "null"}, signal=${signal ?? "null"}): ${sanitizeHelperError(stderr)}`,
        ),
      );
    });
    child.stdin.end(
      JSON.stringify({
        ...params.payload,
        openclawEntry: params.openclawEntry,
        agentDir: params.agentDir,
      }),
    );
  });
}

function sanitizeHelperError(value: string): string {
  return (
    value
      .replace(/[\r\n\t]+/gu, " ")
      .trim()
      .slice(0, 512) || "unknown error"
  );
}
