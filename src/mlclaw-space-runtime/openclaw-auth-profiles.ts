import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { SpaceRuntimeConfig } from "./config.js";

export const CODEX_PROXY_TOKEN_ENV = "MLCLAW_CODEX_PROXY_TOKEN";
export const CODEX_AUTH_PROFILE_ID = "openai:mlclaw";
export const OPENAI_API_KEY_PROFILE_ID = "openai:mlclaw-api-key";

const SECRET_REF_PROVIDER = "default";

type ManagedAuthProfileOptions = {
  codexConfigured: boolean;
  openAiConfigured: boolean;
};

type SecretRef = {
  source: "env";
  provider: string;
  id: string;
};

type AuthProfilePlanTarget = {
  type: "auth-profiles.token.token" | "auth-profiles.api_key.key";
  path: string;
  pathSegments: string[];
  agentId: "main";
  authProfileProvider: "openai";
  ref: SecretRef;
};

export function configureManagedOpenClawAuthProfiles(
  openclawConfig: Record<string, unknown>,
  options: ManagedAuthProfileOptions,
): void {
  const auth = object(openclawConfig, "auth");
  const profiles = object(auth, "profiles");
  if (options.codexConfigured) {
    profiles[CODEX_AUTH_PROFILE_ID] = {
      provider: "openai",
      mode: "token",
      displayName: "ChatGPT",
    };
  } else {
    delete profiles[CODEX_AUTH_PROFILE_ID];
  }
  if (options.openAiConfigured) {
    profiles[OPENAI_API_KEY_PROFILE_ID] = {
      provider: "openai",
      mode: "api_key",
      displayName: "OpenAI API key",
    };
  } else {
    delete profiles[OPENAI_API_KEY_PROFILE_ID];
  }

  const order = object(auth, "order");
  const existing = Array.isArray(order.openai)
    ? order.openai.filter((profileId): profileId is string => typeof profileId === "string")
    : [];
  const unmanaged = existing.filter(
    (profileId) => profileId !== CODEX_AUTH_PROFILE_ID && profileId !== OPENAI_API_KEY_PROFILE_ID,
  );
  const managed = [
    ...(options.codexConfigured ? [CODEX_AUTH_PROFILE_ID] : []),
    ...(options.openAiConfigured ? [OPENAI_API_KEY_PROFILE_ID] : []),
  ];
  if (managed.length > 0 || unmanaged.length > 0) order.openai = [...managed, ...unmanaged];
  else delete order.openai;
}

export function openClawAuthProfilePlan(options: ManagedAuthProfileOptions): Record<string, unknown> {
  const targets: AuthProfilePlanTarget[] = [];
  if (options.codexConfigured) {
    targets.push(
      authProfileTarget({
        type: "auth-profiles.token.token",
        profileId: CODEX_AUTH_PROFILE_ID,
        field: "token",
        env: CODEX_PROXY_TOKEN_ENV,
      }),
    );
  }
  if (options.openAiConfigured) {
    targets.push(
      authProfileTarget({
        type: "auth-profiles.api_key.key",
        profileId: OPENAI_API_KEY_PROFILE_ID,
        field: "key",
        env: "OPENAI_API_KEY",
      }),
    );
  }
  return {
    version: 1,
    protocolVersion: 1,
    generatedAt: new Date().toISOString(),
    generatedBy: "mlclaw",
    targets,
    options: {
      scrubEnv: false,
      scrubAuthProfilesForProviderTargets: false,
      scrubLegacyAuthJson: false,
    },
  };
}

export async function provisionOpenClawAuthProfiles(params: {
  config: SpaceRuntimeConfig;
  options: ManagedAuthProfileOptions;
  env: NodeJS.ProcessEnv;
}): Promise<boolean> {
  if (!params.options.codexConfigured && !params.options.openAiConfigured) return false;
  const invocation = openClawCliInvocation(params.config);
  if (!invocation) return false;

  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-openclaw-auth-"));
  const planFile = path.join(directory, "plan.json");
  try {
    await fs.writeFile(planFile, `${JSON.stringify(openClawAuthProfilePlan(params.options))}\n`, {
      mode: 0o600,
    });
    if (process.getuid?.() === 0) {
      await fs.chown(directory, params.config.openclawUid, params.config.openclawGid);
      await fs.chown(planFile, params.config.openclawUid, params.config.openclawGid);
    }
    await runOpenClawCli({
      command: invocation.command,
      args: [...invocation.prefixArgs, "secrets", "apply", "--from", planFile],
      env: params.env,
      ...(process.getuid?.() === 0 ? { uid: params.config.openclawUid, gid: params.config.openclawGid } : {}),
    });
    return true;
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
}

function authProfileTarget(params: {
  type: AuthProfilePlanTarget["type"];
  profileId: string;
  field: "key" | "token";
  env: string;
}): AuthProfilePlanTarget {
  return {
    type: params.type,
    path: `profiles.${params.profileId}.${params.field}`,
    pathSegments: ["profiles", params.profileId, params.field],
    agentId: "main",
    authProfileProvider: "openai",
    ref: { source: "env", provider: SECRET_REF_PROVIDER, id: params.env },
  };
}

function openClawCliInvocation(config: SpaceRuntimeConfig): { command: string; prefixArgs: string[] } | undefined {
  const executable = path.basename(config.openclawCommand).toLowerCase();
  if (executable.includes("openclaw")) {
    return { command: config.openclawCommand, prefixArgs: [] };
  }
  if (["node", "node.exe", "bun", "bun.exe"].includes(executable)) {
    const script = config.openclawArgs[0];
    if (script && /(?:^|[/\\])openclaw\.(?:mjs|cjs|js)$/iu.test(script)) {
      return { command: config.openclawCommand, prefixArgs: [script] };
    }
  }
  return undefined;
}

async function runOpenClawCli(params: {
  command: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  uid?: number;
  gid?: number;
}): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(params.command, params.args, {
      env: params.env,
      stdio: "ignore",
      ...(params.uid !== undefined ? { uid: params.uid } : {}),
      ...(params.gid !== undefined ? { gid: params.gid } : {}),
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`OpenClaw auth profile provisioning failed (${code ?? signal ?? "unknown"})`));
    });
  });
}

function object(parent: Record<string, unknown>, key: string): Record<string, unknown> {
  const value = parent[key];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  const created: Record<string, unknown> = {};
  parent[key] = created;
  return created;
}
