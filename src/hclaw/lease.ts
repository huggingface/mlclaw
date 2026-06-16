import type { HubApi } from "./hub-api.js";
import type { GatewayLocation } from "./gateway-location.js";

export const RUNTIME_STATUS_PATH = "openclaw-state/runtime/status.json";
export const DEFAULT_LEASE_TTL_MS = 3 * 60 * 1000;

export type RuntimeLease = {
  schemaVersion: 1;
  agent: string;
  runtimeId: string;
  gatewayLocation: GatewayLocation;
  runtimeImage: string;
  startedAt: string;
  lastHeartbeatAt: string;
  lastSnapshotId?: string;
};

export async function readRuntimeLease(hub: HubApi, bucket: string): Promise<RuntimeLease | null> {
  const blob = await hub.bucket(bucket).downloadFile(RUNTIME_STATUS_PATH);
  if (!blob) {
    return null;
  }
  return JSON.parse(await blob.text()) as RuntimeLease;
}

export async function writeRuntimeLease(hub: HubApi, bucket: string, lease: RuntimeLease): Promise<void> {
  await hub.bucket(bucket).uploadFiles([
    {
      path: RUNTIME_STATUS_PATH,
      content: new Blob([JSON.stringify(lease, null, 2) + "\n"], { type: "application/json" }),
    },
  ]);
}

export function runtimeLeaseIsLive(lease: RuntimeLease, now = new Date(), ttlMs = DEFAULT_LEASE_TTL_MS): boolean {
  const last = Date.parse(lease.lastHeartbeatAt);
  return Number.isFinite(last) && now.getTime() - last < ttlMs;
}

export async function assertNoLiveForeignLease(params: {
  hub: HubApi;
  bucket: string;
  runtimeId: string;
  takeover?: boolean;
}): Promise<void> {
  const lease = await readRuntimeLease(params.hub, params.bucket);
  if (!lease || lease.runtimeId === params.runtimeId || !runtimeLeaseIsLive(lease) || params.takeover) {
    return;
  }
  throw new Error(
    `another gateway appears active (${lease.gatewayLocation}, ${lease.runtimeId}, heartbeat ${lease.lastHeartbeatAt}); pass --takeover to replace it`,
  );
}
