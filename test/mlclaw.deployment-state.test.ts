import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CONTROL_LEASE_PATH,
  DEPLOYMENT_PATH,
  DESIRED_STATE_PATH,
  acquireControlLease,
  deploymentDesiredState,
  deploymentIdentity,
  newOperation,
  readDeploymentIdentity,
  releaseControlLease,
  renewControlLease,
  withDeploymentLock,
  writeCanonicalState,
} from "../src/mlclaw/deployment-state.js";
import { localConfigPaths, type DeploymentManifest } from "../src/mlclaw/local-config.js";

function memoryBucket() {
  const objects = new Map<string, string>();
  return {
    objects,
    async uploadFiles(files: Array<{ path: string; content: Blob }>) {
      for (const file of files) objects.set(file.path, await file.content.text());
    },
    async downloadFile(file: string) {
      const value = objects.get(file);
      return value === undefined ? null : new Blob([value]);
    },
    async deleteFiles(files: string[]) {
      for (const file of files) objects.delete(file);
    },
  };
}

const manifest: DeploymentManifest = {
  version: 2,
  deploymentId: "11111111-1111-5111-a111-111111111111",
  desiredGeneration: 3,
  agent: "research",
  owner: "alice",
  bucket: "alice/research-data",
  space: "alice/research",
  localRuntimeId: "local-research-test",
  gatewayLocation: "local",
  model: "huggingface/example/model:provider",
  runtimeImage: "example.invalid/mlclaw:test",
  localPort: 7860,
  localGateway: { engine: "podman", podmanConnection: "local" },
  networkAccess: {
    provider: "tailscale-direct",
    enabled: true,
    ipv4: "100.100.100.100",
    port: 7860,
    accessOrigin: "http://100.100.100.100:7860",
  },
  createdAt: "2026-07-16T00:00:00.000Z",
  updatedAt: "2026-07-16T00:10:00.000Z",
};

describe("deployment state", () => {
  it("writes strict portable canonical records without host bindings", async () => {
    const bucket = memoryBucket();
    await writeCanonicalState(bucket, deploymentIdentity(manifest), deploymentDesiredState(manifest));
    expect(await readDeploymentIdentity(bucket)).toEqual(
      expect.objectContaining({ deploymentId: manifest.deploymentId }),
    );
    expect(bucket.objects.has(DEPLOYMENT_PATH)).toBe(true);
    expect(bucket.objects.has(DESIRED_STATE_PATH)).toBe(true);
    expect(bucket.objects.get(DESIRED_STATE_PATH)).not.toContain("podmanConnection");
    expect(bucket.objects.get(DESIRED_STATE_PATH)).not.toContain("100.100.100.100");
    bucket.objects.set(DEPLOYMENT_PATH, JSON.stringify({ ...deploymentIdentity(manifest), extra: true }));
    await expect(readDeploymentIdentity(bucket)).rejects.toThrow();
  });

  it("verifies lease ownership and releases only its own lease", async () => {
    const bucket = memoryBucket();
    const operation = newOperation(manifest, new Date("2026-07-16T00:00:00.000Z"));
    const lease = await acquireControlLease(bucket, manifest, operation, new Date("2026-07-16T00:00:00.000Z"));
    expect(bucket.objects.has(CONTROL_LEASE_PATH)).toBe(true);
    await releaseControlLease(bucket, { ...lease, fencingToken: "22222222-2222-5222-a222-222222222222" });
    expect(bucket.objects.has(CONTROL_LEASE_PATH)).toBe(true);
    await releaseControlLease(bucket, lease);
    expect(bucket.objects.has(CONTROL_LEASE_PATH)).toBe(false);
  });

  it("renews a lease only while its fencing token is still current", async () => {
    const bucket = memoryBucket();
    const operation = newOperation(manifest, new Date("2026-07-16T00:00:00.000Z"));
    const lease = await acquireControlLease(bucket, manifest, operation, new Date("2026-07-16T00:00:00.000Z"));
    const renewed = await renewControlLease(bucket, lease, new Date("2026-07-16T00:01:00.000Z"));
    expect(renewed.expiresAt).toBe("2026-07-16T00:03:00.000Z");
    bucket.objects.set(
      CONTROL_LEASE_PATH,
      JSON.stringify({ ...renewed, fencingToken: "22222222-2222-5222-a222-222222222222" }),
    );
    await expect(renewControlLease(bucket, renewed, new Date("2026-07-16T00:01:30.000Z"))).rejects.toThrow(
      "ownership was lost",
    );
  });

  it("prevents concurrent local reconciliation", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-lock-"));
    await withDeploymentLock(root, manifest.deploymentId, async () => {
      await expect(withDeploymentLock(root, manifest.deploymentId, async () => undefined)).rejects.toThrow(
        "already being reconciled",
      );
    });
  });

  it("reclaims a dead same-host reconciliation lock", async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-stale-lock-"));
    const lock = path.join(localConfigPaths(root).locksDir, `${manifest.deploymentId}.lock`);
    await fs.mkdir(path.dirname(lock), { recursive: true });
    await fs.writeFile(lock, JSON.stringify({ pid: 2_000_000_000, host: os.hostname() }));
    await expect(withDeploymentLock(root, manifest.deploymentId, async () => "reclaimed")).resolves.toBe("reclaimed");
  });
});
