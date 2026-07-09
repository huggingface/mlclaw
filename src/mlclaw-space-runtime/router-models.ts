import {
  choiceKey,
  dedupeModelChoices,
  displayNameFromModelId,
  formatOpenClawModelRef,
  PRESET_MODEL_CHOICES,
  type ModelChoice,
} from "./model-choices.js";

const DEFAULT_ROUTER_MODELS_URL = "https://router.huggingface.co/v1/models";
const CACHE_TTL_MS = 10 * 60 * 1000;

type FetchImpl = typeof fetch;

type RouterModelsCache = {
  expiresAt: number;
  models: ModelChoice[];
};

let cache: RouterModelsCache | undefined;

export type RouterModelsResult = {
  ok: boolean;
  models: ModelChoice[];
  fetchedAt: string | null;
  error?: string;
};

export async function loadRouterModelChoices(params: {
  url?: string;
  fetchImpl?: FetchImpl;
  now?: number;
  force?: boolean;
} = {}): Promise<RouterModelsResult> {
  const now = params.now ?? Date.now();
  if (!params.force && cache && cache.expiresAt > now) {
    return { ok: true, models: cache.models, fetchedAt: new Date(now).toISOString() };
  }

  try {
    const response = await (params.fetchImpl ?? fetch)(params.url ?? DEFAULT_ROUTER_MODELS_URL, {
      headers: { accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Router model catalog failed with HTTP ${response.status}`);
    }
    const payload = await response.json();
    const models = mergePresets(normalizeRouterModelsPayload(payload));
    cache = {
      models,
      expiresAt: now + CACHE_TTL_MS,
    };
    return { ok: true, models, fetchedAt: new Date(now).toISOString() };
  } catch (err) {
    return {
      ok: false,
      models: PRESET_MODEL_CHOICES,
      fetchedAt: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export function normalizeRouterModelsPayload(payload: unknown): ModelChoice[] {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return [];
  }
  const data = (payload as { data?: unknown }).data;
  if (!Array.isArray(data)) {
    return [];
  }
  const choices: ModelChoice[] = [];
  for (const model of data) {
    if (!model || typeof model !== "object" || Array.isArray(model)) {
      continue;
    }
    const record = model as Record<string, unknown>;
    const modelId = stringValue(record.id);
    if (!modelId || !modelId.includes("/")) {
      continue;
    }
    const architecture = record.architecture && typeof record.architecture === "object"
      ? record.architecture as Record<string, unknown>
      : {};
    const inputModalities = normalizeModalities(architecture.input_modalities);
    const outputModalities = normalizeModalities(architecture.output_modalities);
    if (outputModalities && !outputModalities.includes("text")) {
      continue;
    }
    const providers = Array.isArray(record.providers) ? record.providers : [];
    for (const provider of providers) {
      const normalized = normalizeProviderChoice({
        modelId,
        provider,
        ...(inputModalities ? { inputModalities } : {}),
        ...(outputModalities ? { outputModalities } : {}),
      });
      if (normalized) {
        choices.push(normalized);
      }
    }
  }
  return choices.sort(compareChoices);
}

function normalizeProviderChoice(params: {
  modelId: string;
  provider: unknown;
  inputModalities?: string[];
  outputModalities?: string[];
}): ModelChoice | undefined {
  if (!params.provider || typeof params.provider !== "object" || Array.isArray(params.provider)) {
    return undefined;
  }
  const provider = params.provider as Record<string, unknown>;
  const providerId = stringValue(provider.provider);
  if (!providerId || !/^[a-z0-9][a-z0-9._-]{0,63}$/i.test(providerId)) {
    return undefined;
  }
  const status = stringValue(provider.status) ?? "live";
  if (status !== "live") {
    return undefined;
  }
  const pricing = provider.pricing && typeof provider.pricing === "object" && !Array.isArray(provider.pricing)
    ? provider.pricing as Record<string, unknown>
    : undefined;
  const normalizedProvider = providerId.toLowerCase();
  const modelId = params.modelId.trim();
  const pricingValue = pricingForProvider(pricing);
  return {
    key: choiceKey(modelId, normalizedProvider),
    modelId,
    provider: normalizedProvider,
    openclawModel: formatOpenClawModelRef(modelId, normalizedProvider),
    label: displayNameFromModelId(modelId),
    ...optional("contextLength", positiveInteger(provider.context_length)),
    ...optional("pricing", pricingValue),
    ...optional("supportsTools", optionalBoolean(provider.supports_tools)),
    ...optional("supportsStructuredOutput", optionalBoolean(provider.supports_structured_output)),
    ...optional("firstTokenLatencyMs", positiveNumber(provider.first_token_latency_ms)),
    ...optional("throughput", positiveNumber(provider.throughput)),
    status,
    ...(params.inputModalities ? { inputModalities: params.inputModalities } : {}),
    ...(params.outputModalities ? { outputModalities: params.outputModalities } : {}),
  };
}

function mergePresets(dynamicChoices: ModelChoice[]): ModelChoice[] {
  const dynamicByKey = new Map(dynamicChoices.map((choice) => [choice.key, choice]));
  const presets = PRESET_MODEL_CHOICES.map((preset) => ({
    ...preset,
    ...(dynamicByKey.get(preset.key) ?? {}),
    preset: true,
    label: preset.label,
    ...(preset.note ? { note: preset.note } : {}),
  }));
  return dedupeModelChoices([...presets, ...dynamicChoices]).sort(compareChoices);
}

function compareChoices(left: ModelChoice, right: ModelChoice): number {
  if (left.preset !== right.preset) {
    return left.preset ? -1 : 1;
  }
  const leftPrice = left.pricing?.input ?? Number.POSITIVE_INFINITY;
  const rightPrice = right.pricing?.input ?? Number.POSITIVE_INFINITY;
  if (leftPrice !== rightPrice) {
    return leftPrice - rightPrice;
  }
  return left.openclawModel.localeCompare(right.openclawModel);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeModalities(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const modalities = [...new Set(value.flatMap((item) => {
    const normalized = typeof item === "string" ? item.trim().toLowerCase() : "";
    return normalized ? [normalized] : [];
  }))];
  return modalities.length > 0 ? modalities : undefined;
}

function optionalBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function pricingForProvider(pricing: Record<string, unknown> | undefined): { input?: number; output?: number } | undefined {
  if (!pricing) {
    return undefined;
  }
  const input = positiveNumber(pricing.input);
  const output = positiveNumber(pricing.output);
  if (input === undefined && output === undefined) {
    return undefined;
  }
  return {
    ...(input !== undefined ? { input } : {}),
    ...(output !== undefined ? { output } : {}),
  };
}

function optional<K extends string, T>(key: K, value: T | undefined): Record<K, T> | {} {
  return value === undefined ? {} : { [key]: value } as Record<K, T>;
}

function positiveInteger(value: unknown): number | undefined {
  const parsed = positiveNumber(value);
  return parsed === undefined ? undefined : Math.trunc(parsed);
}

function positiveNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined;
}
