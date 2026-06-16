export const DEFAULT_RUNTIME_IMAGE = "ghcr.io/osolmaz/huggingclaw-runtime:latest";

export function resolveRuntimeImage(value?: string, env: NodeJS.ProcessEnv = process.env): string {
  return value?.trim() || env.HUGGINGCLAW_RUNTIME_IMAGE?.trim() || DEFAULT_RUNTIME_IMAGE;
}
