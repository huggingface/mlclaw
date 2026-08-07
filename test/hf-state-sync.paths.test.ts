import { describe, expect, it } from "vitest";
import { resolveSyncConfig } from "../src/hf-state-sync/paths.js";

describe("resolveSyncConfig", () => {
  it("keeps stable runtime IDs separate from unique snapshot run IDs", () => {
    const config = resolveSyncConfig({
      MLCLAW_RUNTIME_ID: "space-research",
      OPENCLAW_AGENT_NAME: "research",
    });

    expect(config.runtimeId).toBe("space-research");
    expect(config.runId).toEqual(expect.any(String));
    expect(config.runId).not.toBe("space-research");
  });

  it("registers the protected broker credential file for archive scanning", () => {
    const config = resolveSyncConfig({
      MLCLAW_HF_BROKER_AGENT_SECRET_FILE: "/run/mlclaw-hf-broker/agent-secret",
    });

    expect(config.snapshotSecretFiles).toEqual(["/run/mlclaw-hf-broker/agent-secret"]);
  });
});
