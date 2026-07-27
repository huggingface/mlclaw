import { randomBytes } from "node:crypto";

export const CODEX_PROXY_BASE_PATH = "/backend-api/codex";
export const CODEX_MODELS_PATH = `${CODEX_PROXY_BASE_PATH}/models`;
export const CODEX_RESPONSES_PATH = `${CODEX_PROXY_BASE_PATH}/responses`;
export const CODEX_MODELS_URL = "https://chatgpt.com/backend-api/codex/models";
export const CODEX_RESPONSES_URL = "https://chatgpt.com/backend-api/codex/responses";
export const CODEX_PROXY_TOKEN_ENV = "OPENAI_OAUTH_TOKEN";
export const LEGACY_CODEX_MODEL_REF = "mlclaw-codex/gpt-5.4";
export const DEFAULT_CODEX_MODEL_REF = "openai/gpt-5.4";

export function generateCodexProxyCapability(): string {
  return randomBytes(48).toString("base64url");
}
