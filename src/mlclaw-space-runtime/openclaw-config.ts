import fs from "node:fs/promises";
import path from "node:path";
import type { SpaceRuntimeConfig } from "./config.js";
import { DEFAULT_OPENAI_MODEL_REF, LEGACY_CODEX_MODEL_REF } from "./openai-models.js";
import { OPENAI_OAUTH_PROFILE_ID } from "./openclaw-oauth-profile.js";
import { managedMcpServerConfig } from "./mcp-integrations.js";
import { displayNameFromModelId, parseOpenClawModelRef, type ModelChoice } from "./model-choices.js";

export const BROKER_MCP_CONNECTION_TIMEOUT_MS = 10_000;
export const BROKER_MCP_REQUEST_TIMEOUT_MS = 45_000;
export const BROKER_SECRET_PROVIDER = "mlclaw_hf_broker";
// OpenClaw has no disabled reset mode. This valid idle window is over 4,000 years.
export const AUTOMATIC_SESSION_RESET_DISABLED_MINUTES = 2_147_483_647;

export async function prepareUnyoloConfig(configPath: string): Promise<void> {
  const parsed = objectValue(JSON.parse(await fs.readFile(configPath, "utf8")));
  if (!parsed) throw new Error("OpenClaw configuration must be an object");
  removeSupersededPluginConfig(parsed);
  await fs.writeFile(configPath, `${JSON.stringify(parsed, null, 2)}\n`, { mode: 0o600 });
  await fs.chmod(configPath, 0o600);
}

export async function configureOpenClawGateway(
  config: SpaceRuntimeConfig,
  options: { codexConfigured?: boolean; openAiConfigured?: boolean } = {},
): Promise<void> {
  const raw = await fs.readFile(config.openclawConfigPath, "utf8");
  const openclawConfig = migrateLegacyCodexModelRefs(JSON.parse(raw)) as Record<string, unknown>;
  const gateway = object(openclawConfig, "gateway");
  gateway.mode = "local";
  gateway.bind = "loopback";
  gateway.port = config.openclawPort;
  gateway.auth = {
    mode: "trusted-proxy",
    trustedProxy: {
      userHeader: "x-forwarded-user",
      requiredHeaders: ["x-forwarded-proto", "x-forwarded-host"],
      allowLoopback: true,
    },
  };
  gateway.trustedProxies = ["127.0.0.1", "::1"];
  gateway.controlUi = {
    ...(typeof gateway.controlUi === "object" && gateway.controlUi ? gateway.controlUi : {}),
    dangerouslyDisableDeviceAuth: true,
    allowedOrigins: config.accessOrigins,
    embedSandbox: "scripts",
  };
  const codexConfigured = Boolean(options.codexConfigured);
  const openAiConfigured = Boolean(options.openAiConfigured);
  configureOpenClawModels(openclawConfig, config, codexConfigured, openAiConfigured);
  configureOpenAiAuthMetadata(openclawConfig, codexConfigured);
  configureCodexRuntimePlugin(openclawConfig, codexConfigured || openAiConfigured);
  disableAutomaticSessionResets(openclawConfig);
  configureManagedMcpServers(openclawConfig, config);
  configureBrokerMcpServer(openclawConfig, config);
  configureUnyoloPlugin(openclawConfig, config);

  await fs.mkdir(path.dirname(config.openclawConfigPath), { recursive: true });
  await fs.writeFile(config.openclawConfigPath, `${JSON.stringify(openclawConfig, null, 2)}\n`, { mode: 0o600 });
  await fs.chmod(config.openclawConfigPath, 0o600);
  if (process.getuid?.() === 0) {
    await fs.chown(config.openclawConfigPath, config.openclawUid, config.openclawGid);
  }
}

function disableAutomaticSessionResets(openclawConfig: Record<string, unknown>): void {
  const session = object(openclawConfig, "session");
  session.reset = {
    mode: "idle",
    idleMinutes: AUTOMATIC_SESSION_RESET_DISABLED_MINUTES,
  };
  delete session.idleMinutes;
  delete session.resetByType;
  delete session.resetByChannel;

  const maintenance = object(session, "maintenance");
  maintenance.resetArchiveRetention = false;
}

function configureBrokerMcpServer(openclawConfig: Record<string, unknown>, config: SpaceRuntimeConfig): void {
  const servers = object(object(openclawConfig, "mcp"), "servers");
  if (!config.brokerAgentUrl || !config.brokerAgentSecretFile) {
    delete servers["huggingface-broker"];
    return;
  }
  const existing = objectValue(servers["huggingface-broker"]);
  servers["huggingface-broker"] = {
    ...preservedBrokerMcpFields(existing),
    command: "/usr/local/bin/hf-broker",
    args: ["mcp"],
    connectionTimeoutMs: BROKER_MCP_CONNECTION_TIMEOUT_MS,
    requestTimeoutMs: BROKER_MCP_REQUEST_TIMEOUT_MS,
    env: {
      HF_BROKER_AGENT_ENDPOINT: brokerAgentEndpoint(config.brokerAgentUrl),
      HF_BROKER_SHARED_SECRET_FILE: config.brokerAgentSecretFile,
    },
    ...(existing?.enabled === false ? { enabled: false } : { enabled: true }),
  };
}

function brokerAgentEndpoint(agentUrl: string): string {
  const parsed = new URL(agentUrl);
  if (parsed.protocol !== "http:" || !parsed.port || parsed.username || parsed.password) {
    throw new Error("HF Broker agent URL must be an unauthenticated HTTP URL with an explicit port");
  }
  return `tcp://${parsed.host}`;
}

function preservedBrokerMcpFields(existing: Record<string, unknown> | undefined): Record<string, unknown> {
  const codex = preservedBrokerCodexConfig(objectValue(existing?.codex));
  return {
    ...(existing?.toolFilter && typeof existing.toolFilter === "object" ? { toolFilter: existing.toolFilter } : {}),
    ...(typeof existing?.supportsParallelToolCalls === "boolean"
      ? { supportsParallelToolCalls: existing.supportsParallelToolCalls }
      : {}),
    ...(codex ? { codex } : {}),
  };
}

function preservedBrokerCodexConfig(
  existing: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  const agents = brokerAgentScope(existing?.agents);
  const defaultToolsApprovalMode = brokerApprovalMode(existing?.defaultToolsApprovalMode);
  const nativeApprovalMode = brokerApprovalMode(existing?.default_tools_approval_mode);
  const preserved = {
    ...(agents ? { agents } : {}),
    ...(defaultToolsApprovalMode ? { defaultToolsApprovalMode } : {}),
    ...(nativeApprovalMode ? { default_tools_approval_mode: nativeApprovalMode } : {}),
  };
  return Object.keys(preserved).length > 0 ? preserved : undefined;
}

function brokerAgentScope(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const agents = value
    .filter((agent): agent is string => typeof agent === "string" && /^[a-z0-9][a-z0-9_-]{0,63}$/iu.test(agent.trim()))
    .map((agent) => agent.trim());
  return agents.length > 0 ? agents : undefined;
}

function brokerApprovalMode(value: unknown): "auto" | "prompt" | "approve" | undefined {
  return value === "auto" || value === "prompt" || value === "approve" ? value : undefined;
}

function configureCodexRuntimePlugin(openclawConfig: Record<string, unknown>, enabled: boolean): void {
  const plugins = object(openclawConfig, "plugins");
  const entries = object(plugins, "entries");
  const existing = objectValue(entries.codex);
  if (!enabled) {
    if (existing) entries.codex = { ...existing, enabled: false };
    return;
  }
  if (plugins.allow !== undefined) {
    plugins.allow = uniqueStrings(uniqueStrings(plugins.allow, "openai"), "codex");
  }
  const existingConfig = objectValue(existing?.config);
  const existingAppServer = objectValue(existingConfig?.appServer);
  entries.codex = {
    ...existing,
    enabled: true,
    config: {
      ...existingConfig,
      appServer: {
        ...existingAppServer,
        clearEnv: uniqueStrings(existingAppServer?.clearEnv, "OPENCLAW_GATEWAY_PASSWORD"),
      },
    },
  };
}

function configureUnyoloPlugin(openclawConfig: Record<string, unknown>, config: SpaceRuntimeConfig): void {
  removeSupersededPluginConfig(openclawConfig);
  const plugins = object(openclawConfig, "plugins");
  const load = object(plugins, "load");
  load.paths = uniqueStrings(load.paths, config.unyoloPluginPath);
  if (plugins.allow !== undefined) plugins.allow = uniqueStrings(plugins.allow, "unyolo");
  const entries = object(plugins, "entries");
  entries.unyolo = {
    enabled: true,
    config: {
      mode: "delegated-web",
      delegatedWeb: { basePath: "/trusted-host/api/unyolo" },
    },
  };
}

export async function managedMcpServerStatus(config: SpaceRuntimeConfig): Promise<
  Array<{
    id: string;
    name: string;
    enabled: boolean;
  }>
> {
  const raw = JSON.parse(await fs.readFile(config.openclawConfigPath, "utf8")) as Record<string, unknown>;
  const servers = object(object(raw, "mcp"), "servers");
  return [
    { id: "huggingface", name: "Hugging Face MCP" },
    { id: "research-agent", name: "Research Agent" },
  ].map((server) => ({
    ...server,
    enabled: objectValue(servers[server.id])?.enabled !== false,
  }));
}

function configureManagedMcpServers(openclawConfig: Record<string, unknown>, config: SpaceRuntimeConfig): void {
  const mcp = object(openclawConfig, "mcp");
  const servers = object(mcp, "servers");
  delete servers.codex;
  for (const [name, managed] of Object.entries(managedMcpServerConfig(config))) {
    const existing = servers[name];
    const userFields =
      existing && typeof existing === "object" && !Array.isArray(existing) ? (existing as Record<string, unknown>) : {};
    servers[name] = {
      ...userFields,
      ...managed,
      ...(userFields.enabled === false ? { enabled: false } : { enabled: true }),
      ...(userFields.toolFilter && typeof userFields.toolFilter === "object"
        ? { toolFilter: userFields.toolFilter }
        : {}),
    };
  }
}

function configureOpenClawModels(
  openclawConfig: Record<string, unknown>,
  config: SpaceRuntimeConfig,
  codexConfigured: boolean,
  openAiConfigured: boolean,
): void {
  const routerChoices = config.modelChoices;
  configureAgentModelChoices(
    object(object(openclawConfig, "agents"), "defaults"),
    config,
    routerChoices,
    codexConfigured,
    openAiConfigured,
  );
  const models = object(openclawConfig, "models");
  models.mode = "merge";
  const providers = object(models, "providers");
  configureHuggingFaceProvider(openclawConfig, object(providers, "huggingface"), config, routerChoices);
  configureNativeOpenAiProvider(providers);
}

function configureAgentModelChoices(
  defaults: Record<string, unknown>,
  config: SpaceRuntimeConfig,
  routerChoices: ModelChoice[],
  codexConfigured: boolean,
  openAiConfigured: boolean,
): void {
  const existingModel = objectValue(defaults.model) ?? {};
  const openAiAvailable = codexConfigured || openAiConfigured;
  const primary = resolvePrimaryModel({
    existing: existingModel.primary,
    requested: replaceLegacyCodexModelRef(config.model),
    openAiAvailable,
    ...(routerChoices[0]?.openclawModel ? { fallback: routerChoices[0].openclawModel } : {}),
  });
  defaults.model = {
    ...existingModel,
    ...(primary ? { primary } : {}),
  };
  defaults.models = {
    ...Object.fromEntries(routerChoices.map((choice) => [choice.openclawModel, { alias: aliasForChoice(choice) }])),
    ...(openAiAvailable ? { "openai/*": { agentRuntime: { id: "codex" } } } : {}),
  };
}

function resolvePrimaryModel(params: {
  existing: unknown;
  requested: string;
  openAiAvailable: boolean;
  fallback?: string;
}): string | undefined {
  const existing = typeof params.existing === "string" ? params.existing.trim() : undefined;
  if (params.openAiAvailable && existing?.startsWith("openai/")) return existing;
  if (!params.openAiAvailable && params.requested.startsWith("openai/")) return params.fallback;
  return params.requested;
}

function configureHuggingFaceProvider(
  openclawConfig: Record<string, unknown>,
  huggingface: Record<string, unknown>,
  config: SpaceRuntimeConfig,
  routerChoices: ModelChoice[],
): void {
  huggingface.baseUrl = config.brokerAgentUrl
    ? `${config.brokerAgentUrl.replace(/\/+$/, "")}/v1`
    : "https://router.huggingface.co/v1";
  configureBrokerSecretReference(openclawConfig, huggingface, config);
  huggingface.api = "openai-completions";
  huggingface.models = routerChoices.map(modelDefinitionFromChoice);
}

function configureBrokerSecretReference(
  openclawConfig: Record<string, unknown>,
  huggingface: Record<string, unknown>,
  config: SpaceRuntimeConfig,
): void {
  const secrets = object(openclawConfig, "secrets");
  const providers = object(secrets, "providers");
  if (config.brokerAgentUrl && config.brokerAgentSecretFile) {
    providers[BROKER_SECRET_PROVIDER] = {
      source: "file",
      path: config.brokerAgentSecretFile,
      mode: "singleValue",
    };
    huggingface.apiKey = { source: "file", provider: BROKER_SECRET_PROVIDER, id: "value" };
    return;
  }
  delete providers[BROKER_SECRET_PROVIDER];
  delete huggingface.apiKey;
  if (Object.keys(providers).length === 0) delete secrets.providers;
  if (Object.keys(secrets).length === 0) delete openclawConfig.secrets;
}

function configureNativeOpenAiProvider(providers: Record<string, unknown>): void {
  delete providers["mlclaw-codex"];
  const existing = objectValue(providers.openai);
  const params = objectValue(existing?.params);
  if (!params || !("codexProxyBaseUrl" in params)) return;
  const nextParams = { ...params };
  delete nextParams.codexProxyBaseUrl;
  if (existing) {
    if (Object.keys(nextParams).length > 0) existing.params = nextParams;
    else delete existing.params;
  }
}

function configureOpenAiAuthMetadata(openclawConfig: Record<string, unknown>, configured: boolean): void {
  const auth = object(openclawConfig, "auth");
  const profiles = object(auth, "profiles");
  const order = object(auth, "order");
  const existingOrder = Array.isArray(order.openai)
    ? order.openai.filter((value): value is string => typeof value === "string" && value !== OPENAI_OAUTH_PROFILE_ID)
    : [];
  if (configured) {
    profiles[OPENAI_OAUTH_PROFILE_ID] = {
      provider: "openai",
      mode: "oauth",
      displayName: "MLClaw ChatGPT",
    };
    order.openai = [OPENAI_OAUTH_PROFILE_ID, ...existingOrder];
  } else {
    delete profiles[OPENAI_OAUTH_PROFILE_ID];
    if (existingOrder.length > 0) order.openai = existingOrder;
    else delete order.openai;
  }
  if (Object.keys(profiles).length === 0) delete auth.profiles;
  if (Object.keys(order).length === 0) delete auth.order;
}

function replaceLegacyCodexModelRef(value: string): string {
  return value === LEGACY_CODEX_MODEL_REF ? DEFAULT_OPENAI_MODEL_REF : value;
}

function migrateLegacyCodexModelRefs(value: unknown): unknown {
  if (typeof value === "string") return replaceLegacyCodexModelRef(value);
  if (Array.isArray(value)) return value.map(migrateLegacyCodexModelRefs);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [replaceLegacyCodexModelRef(key), migrateLegacyCodexModelRefs(entry)]),
  );
}

function modelDefinitionFromChoice(choice: ModelChoice): Record<string, unknown> {
  const providerModelId = providerModelIdFromChoice(choice);
  const reasoning = isReasoningModel(choice.modelId);
  return {
    id: providerModelId,
    name: `${choice.label} (${choice.provider})`,
    input: inputModalitiesForChoice(choice),
    contextWindow: choice.contextLength ?? contextWindowForModel(choice.modelId),
    // Reasoning models need budget for both the thinking phase and the answer;
    // a short cap truncates the turn before any reply content exists.
    maxTokens: reasoning ? 32768 : 8192,
    reasoning,
    cost: modelCostFromChoice(choice),
    api: "openai-completions",
    compat: modelCompatibilityFromChoice(choice),
  };
}

function modelCostFromChoice(choice: ModelChoice): Record<string, number> {
  return {
    input: choice.pricing?.input ?? 0,
    output: choice.pricing?.output ?? 0,
    cacheRead: 0,
    cacheWrite: 0,
  };
}

function modelCompatibilityFromChoice(choice: ModelChoice): Record<string, boolean> {
  return {
    supportsTools: choice.supportsTools ?? true,
    supportsStrictMode: choice.supportsStructuredOutput ?? false,
  };
}

function providerModelIdFromChoice(choice: ModelChoice): string {
  const parsed = parseOpenClawModelRef(choice.openclawModel);
  return parsed ? `${parsed.modelId}:${parsed.provider}` : `${choice.modelId}:${choice.provider}`;
}

function inputModalitiesForChoice(choice: ModelChoice): string[] {
  if (choice.inputModalities?.length) {
    return choice.inputModalities.filter((item) => item === "text" || item === "image");
  }
  return isLikelyImageModel(choice.modelId) ? ["text", "image"] : ["text"];
}

function aliasForChoice(choice: ModelChoice): string {
  const base =
    displayNameFromModelId(choice.modelId)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "model";
  return `${base}-${choice.provider}`.slice(0, 64);
}

function isLikelyImageModel(id: string): boolean {
  const lower = id.toLowerCase();
  return (
    lower.includes("-vl") ||
    lower.includes("vision") ||
    lower.includes("multimodal") ||
    lower.includes("gemma-3") ||
    lower.includes("gemma-4") ||
    lower.includes("llama-4") ||
    lower.includes("qwen3.6")
  );
}

function contextWindowForModel(id: string): number {
  const lower = id.toLowerCase();
  if (lower.includes("gemma-4") || lower.includes("qwen3.6")) {
    return 262144;
  }
  if (lower.includes("qwen3-8b") || lower.includes("qwen3-14b")) {
    return 40960;
  }
  return 131072;
}

function isReasoningModel(id: string): boolean {
  // Kimi thinking models (K3, K2.6, K2.7) reason by default without carrying
  // any of the generic reasoning markers.
  return /r1|reason|thinking|reasoner|qwq|qwen|kimi-k3|kimi-k2\.6|kimi-k2\.7/i.test(id);
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

function objectValue(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function uniqueStrings(value: unknown, required: string): string[] {
  const current = Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  return [...new Set([...current, required])];
}

function removeSupersededPluginConfig(openclawConfig: Record<string, unknown>): void {
  const plugins = objectValue(openclawConfig.plugins);
  if (!plugins) return;
  const load = objectValue(plugins.load);
  if (load?.paths !== undefined) {
    load.paths = withoutString(load.paths, "/opt/openclaw-plugins/node_modules/openclaw-brokerkit");
  }
  if (plugins.allow !== undefined) plugins.allow = withoutString(plugins.allow, "brokerkit");
  const entries = objectValue(plugins.entries);
  if (entries) delete entries.brokerkit;
}

function withoutString(value: unknown, removed: string): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item !== removed)
    : [];
}
