import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("runtime image Dockerfile", () => {
  it("healthchecks the HuggingClaw gateway port", async () => {
    const dockerfile = await fs.readFile("Dockerfile", "utf8");

    expect(dockerfile).toContain("ENV OPENCLAW_GATEWAY_PORT=7860");
    expect(dockerfile).toContain("EXPOSE 7860");
    expect(dockerfile).toContain("HEALTHCHECK");
    expect(dockerfile).toContain("--interval=30s");
    expect(dockerfile).toContain("--start-period=60s");
    expect(dockerfile).toContain("OPENCLAW_GATEWAY_PORT");
    expect(dockerfile).toContain("/health");
    expect(dockerfile).not.toContain("18789/healthz");
  });
});
