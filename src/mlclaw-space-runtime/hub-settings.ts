import type { SpaceRuntimeConfig } from "./config.js";
import type { PublicBranding } from "./branding.js";
import { publicBranding } from "./branding.js";
import { normalizeModelRef, PRESET_MODEL_CHOICES, type ModelChoice } from "./model-choices.js";

export type RuntimeSettings = {
  agentName: string | null;
  model: string;
  stateBucket: string | null;
  statePrefix: string | null;
  gatewayLocation: string | null;
  runtimeImage: string | null;
  runtimeId: string | null;
  templateRev: string | null;
  allowedUsers: string[];
  adminUsers: string[];
  modelChoices: ModelChoice[];
  presetModels: ModelChoice[];
  branding: PublicBranding;
};

export function runtimeSettings(config: SpaceRuntimeConfig): RuntimeSettings {
  return {
    agentName: config.agentName ?? null,
    model: config.model,
    stateBucket: config.stateBucket ?? null,
    statePrefix: config.statePrefix ?? null,
    gatewayLocation: config.gatewayLocation ?? null,
    runtimeImage: config.runtimeImage ?? null,
    runtimeId: config.runtimeId ?? null,
    templateRev: config.templateRev ?? null,
    allowedUsers: config.allowedUsers,
    adminUsers: config.adminUsers,
    modelChoices: config.modelChoices,
    presetModels: PRESET_MODEL_CHOICES,
    branding: publicBranding(config.branding),
  };
}

export function normalizeModel(value: unknown): string | undefined {
  return normalizeModelRef(value);
}

export async function setCurrentSpaceVariable(
  config: SpaceRuntimeConfig,
  key: string,
  value: string,
): Promise<void> {
  if (!config.spaceId || !config.hfToken) {
    throw new Error("Space mutation requires SPACE_ID and HF_TOKEN");
  }
  await hubRequest(config, `/api/spaces/${config.spaceId}/variables`, {
    method: "POST",
    body: JSON.stringify({ key, value }),
    headers: { "content-type": "application/json" },
  });
}

export async function setCurrentSpaceSecret(
  config: SpaceRuntimeConfig,
  key: string,
  value: string,
): Promise<void> {
  if (!config.spaceId || !config.hfToken) {
    throw new Error("Space mutation requires SPACE_ID and HF_TOKEN");
  }
  await hubRequest(config, `/api/spaces/${config.spaceId}/secrets`, {
    method: "POST",
    body: JSON.stringify({ key, value }),
    headers: { "content-type": "application/json" },
  });
}

export async function restartCurrentSpace(config: SpaceRuntimeConfig): Promise<boolean> {
  if (!config.spaceId || !config.hfToken) {
    return false;
  }
  await hubRequest(config, `/api/spaces/${config.spaceId}/restart`, {
    method: "POST",
    body: JSON.stringify({ factoryReboot: false }),
    headers: { "content-type": "application/json" },
  });
  return true;
}

async function hubRequest(config: SpaceRuntimeConfig, path: string, init: RequestInit): Promise<Response> {
  const response = await fetch(`${config.hubUrl.replace(/\/+$/, "")}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${config.hfToken}`,
      ...init.headers,
    },
  });
  if (!response.ok) {
    throw new Error(`Hub request failed: ${response.status} ${await response.text()}`);
  }
  return response;
}
