import { createHmac } from "node:crypto";
import type { ModelChoice } from "./model-choices.js";

export const CODEX_PROVIDER_ID = "mlclaw-codex";
export const CODEX_MODEL_ID = "gpt-5.4";
export const CODEX_MODEL_REF = `${CODEX_PROVIDER_ID}/${CODEX_MODEL_ID}`;
export const CODEX_PROXY_BASE_PATH = "/backend-api/codex";
export const CODEX_RESPONSES_PATH = `${CODEX_PROXY_BASE_PATH}/responses`;
export const CODEX_RESPONSES_URL = "https://chatgpt.com/backend-api/codex/responses";

export const CODEX_MODEL_CHOICE: ModelChoice = Object.freeze({
  key: CODEX_MODEL_REF,
  modelId: CODEX_MODEL_ID,
  provider: CODEX_PROVIDER_ID,
  openclawModel: CODEX_MODEL_REF,
  label: "GPT-5.4 (Codex)",
  note: "Connected ChatGPT account",
  contextLength: 272000,
  pricing: { input: 2.5, output: 15 },
  supportsTools: true,
  supportsStructuredOutput: true,
  status: "live",
  inputModalities: ["text", "image"],
  outputModalities: ["text"],
});

export function deriveCodexProviderToken(secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" }), "utf8").toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: "mlclaw",
      "https://api.openai.com/auth": { chatgpt_account_id: "mlclaw-proxy" },
    }),
    "utf8",
  ).toString("base64url");
  const signature = createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${signature}`;
}
