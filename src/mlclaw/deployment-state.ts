import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { BucketClient } from "../hf-bucket-client/client.js";
import { localConfigPaths, type DeploymentManifest } from "./local-config.js";

export const DEPLOYMENT_PATH = ".mlclaw/deployment.json";
export const DESIRED_STATE_PATH = ".mlclaw/desired-state.json";
export const CONTROL_LEASE_PATH = ".mlclaw/control-lease.json";
export const TOMBSTONE_PATH = ".mlclaw/tombstone.json";
const MAX_CONTROL_BYTES = 64 * 1024;

const identitySchema = z
  .object({
    schemaVersion: z.literal(1),
    deploymentId: z.string().uuid(),
    agent: z.string().min(1).max(63),
    owner: z.string().min(1).max(128),
    bucket: z.string().min(3).max(256),
    statePrefix: z.string().min(1).max(256),
    createdAt: z.string().datetime(),
  })
  .strict();

const desiredStateSchema = z
  .object({
    schemaVersion: z.literal(1),
    deploymentId: z.string().uuid(),
    generation: z.number().int().nonnegative(),
    updatedAt: z.string().datetime(),
    gateway: z
      .object({
        location: z.enum(["local", "space"]),
        port: z.number().int().min(1).max(65535),
        tailscaleMode: z.enum(["off", "direct", "serve"]),
      })
      .strict(),
    model: z.string().min(1).max(512),
    runtimeImage: z.string().min(1).max(1024),
    space: z
      .object({
        repo: z.string().min(3).max(256),
        visibility: z.enum(["private", "public"]),
        hardware: z.string().min(1).max(128).optional(),
        sleepTime: z.number().int().min(-1).optional(),
      })
      .strict(),
  })
  .strict();

const operationStateSchema = z.enum([
  "planned",
  "applying",
  "waiting_for_approval",
  "verifying",
  "rolling_back",
  "completed",
  "failed",
  "cleaned",
]);
const operationSchema = z
  .object({
    schemaVersion: z.literal(1),
    operationId: z.string().uuid(),
    deploymentId: z.string().uuid(),
    targetGeneration: z.number().int().nonnegative(),
    state: operationStateSchema,
    startedAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    detail: z.string().max(1000).optional(),
  })
  .strict();

const leaseSchema = z
  .object({
    schemaVersion: z.literal(1),
    deploymentId: z.string().uuid(),
    operationId: z.string().uuid(),
    holderId: z.string().min(1).max(256),
    fencingToken: z.string().uuid(),
    generation: z.number().int().nonnegative(),
    acquiredAt: z.string().datetime(),
    expiresAt: z.string().datetime(),
  })
  .strict();

const tombstoneSchema = z
  .object({
    schemaVersion: z.literal(1),
    deploymentId: z.string().uuid(),
    movedTo: z.string().min(3).max(256),
    tombstonedAt: z.string().datetime(),
  })
  .strict();

export type DeploymentIdentity = z.infer<typeof identitySchema>;
export type DeploymentDesiredState = z.infer<typeof desiredStateSchema>;
export type DeploymentOperation = z.infer<typeof operationSchema>;
export type DeploymentOperationState = z.infer<typeof operationStateSchema>;
export type DeploymentControlLease = z.infer<typeof leaseSchema>;
export type DeploymentTombstone = z.infer<typeof tombstoneSchema>;

export function deploymentIdentity(manifest: DeploymentManifest, statePrefix = "openclaw-state"): DeploymentIdentity {
  return identitySchema.parse({
    schemaVersion: 1,
    deploymentId: manifest.deploymentId,
    agent: manifest.agent,
    owner: manifest.owner,
    bucket: manifest.bucket,
    statePrefix,
    createdAt: manifest.createdAt,
  });
}

export function deploymentDesiredState(
  manifest: DeploymentManifest,
  visibility: "private" | "public" = manifest.spaceVisibility ?? "private",
): DeploymentDesiredState {
  return desiredStateSchema.parse({
    schemaVersion: 1,
    deploymentId: manifest.deploymentId,
    generation: manifest.desiredGeneration,
    updatedAt: manifest.updatedAt,
    gateway: {
      location: manifest.gatewayLocation,
      port: manifest.localPort ?? 7860,
      tailscaleMode:
        manifest.tailscaleMode ??
        (manifest.networkAccess?.provider === "tailscale-direct"
          ? "direct"
          : manifest.networkAccess?.provider === "tailscale-serve" && manifest.networkAccess.enabled
            ? "serve"
            : "off"),
    },
    model: manifest.model,
    runtimeImage: manifest.runtimeImage,
    space: {
      repo: manifest.space,
      visibility,
      ...(manifest.spaceHardware ? { hardware: manifest.spaceHardware } : {}),
      ...(typeof manifest.spaceSleepTime === "number" ? { sleepTime: manifest.spaceSleepTime } : {}),
    },
  });
}

export async function readDeploymentIdentity(
  client: Pick<BucketClient, "downloadFile">,
): Promise<DeploymentIdentity | null> {
  return await readDocument(client, DEPLOYMENT_PATH, identitySchema);
}

export async function readDesiredState(
  client: Pick<BucketClient, "downloadFile">,
): Promise<DeploymentDesiredState | null> {
  return await readDocument(client, DESIRED_STATE_PATH, desiredStateSchema);
}

export async function readDeploymentTombstone(
  client: Pick<BucketClient, "downloadFile">,
): Promise<DeploymentTombstone | null> {
  return await readDocument(client, TOMBSTONE_PATH, tombstoneSchema);
}

export async function writeDeploymentTombstone(
  client: Pick<BucketClient, "uploadFiles">,
  deploymentId: string,
  movedTo: string,
  now: Date,
): Promise<void> {
  const tombstone = tombstoneSchema.parse({
    schemaVersion: 1,
    deploymentId,
    movedTo,
    tombstonedAt: now.toISOString(),
  });
  await client.uploadFiles([jsonBlob(TOMBSTONE_PATH, tombstone)]);
}

export async function writeCanonicalState(
  client: Pick<BucketClient, "uploadFiles">,
  identity: DeploymentIdentity,
  desired: DeploymentDesiredState,
): Promise<void> {
  await client.uploadFiles([
    jsonBlob(DEPLOYMENT_PATH, identitySchema.parse(identity)),
    jsonBlob(DESIRED_STATE_PATH, desiredStateSchema.parse(desired)),
  ]);
}

export function newOperation(manifest: DeploymentManifest, now: Date): DeploymentOperation {
  return operationSchema.parse({
    schemaVersion: 1,
    operationId: randomUUID(),
    deploymentId: manifest.deploymentId,
    targetGeneration: manifest.desiredGeneration,
    state: "planned",
    startedAt: now.toISOString(),
    updatedAt: now.toISOString(),
  });
}

export async function writeOperation(
  root: string,
  client: Pick<BucketClient, "uploadFiles">,
  operation: DeploymentOperation,
): Promise<void> {
  const parsed = operationSchema.parse(operation);
  const local = path.join(localConfigPaths(root).operationsDir, `${parsed.operationId}.json`);
  await atomicPrivateWrite(local, stringify(parsed));
  await client.uploadFiles([jsonBlob(`.mlclaw/operations/${parsed.operationId}.json`, parsed)]);
}

export async function updateOperation(
  root: string,
  client: Pick<BucketClient, "uploadFiles">,
  operation: DeploymentOperation,
  state: DeploymentOperationState,
  now: Date,
  detail?: string,
): Promise<DeploymentOperation> {
  const next = operationSchema.parse({
    ...operation,
    state,
    updatedAt: now.toISOString(),
    ...(detail ? { detail } : {}),
  });
  await writeOperation(root, client, next);
  return next;
}

export async function readResumableOperation(
  root: string,
  deploymentId: string,
  targetGeneration: number,
): Promise<DeploymentOperation | null> {
  const directory = localConfigPaths(root).operationsDir;
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const operations = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map(async (entry) => {
        const raw = await fs.readFile(path.join(directory, entry.name), "utf8");
        return operationSchema.parse(JSON.parse(raw));
      }),
  );
  return (
    operations
      .filter(
        (operation) =>
          operation.deploymentId === deploymentId &&
          operation.targetGeneration === targetGeneration &&
          (operation.state === "planned" ||
            operation.state === "applying" ||
            operation.state === "waiting_for_approval" ||
            operation.state === "verifying"),
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0] ?? null
  );
}

export async function withDeploymentLock<T>(root: string, deploymentId: string, task: () => Promise<T>): Promise<T> {
  const file = path.join(localConfigPaths(root).locksDir, `${deploymentId}.lock`);
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const lock = stringify({ pid: process.pid, host: os.hostname(), createdAt: new Date().toISOString() });
  try {
    await fs.writeFile(file, lock, { flag: "wx", mode: 0o600 });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    if (!(await reclaimDeadLocalLock(file))) {
      throw new Error(`deployment ${deploymentId} is already being reconciled on this host`);
    }
    await fs.writeFile(file, lock, { flag: "wx", mode: 0o600 });
  }
  try {
    return await task();
  } finally {
    await fs.rm(file, { force: true });
  }
}

async function reclaimDeadLocalLock(file: string): Promise<boolean> {
  try {
    const value = JSON.parse(await fs.readFile(file, "utf8")) as { pid?: unknown; host?: unknown };
    if (value.host !== os.hostname() || typeof value.pid !== "number" || processIsAlive(value.pid)) return false;
    await fs.rm(file);
    return true;
  } catch {
    return false;
  }
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code !== "ESRCH";
  }
}

export async function acquireControlLease(
  client: Pick<BucketClient, "downloadFile" | "uploadFiles">,
  manifest: DeploymentManifest,
  operation: DeploymentOperation,
  now: Date,
): Promise<DeploymentControlLease> {
  const current = await readDocument(client, CONTROL_LEASE_PATH, leaseSchema);
  if (current && Date.parse(current.expiresAt) > now.getTime() && current.operationId !== operation.operationId) {
    throw new Error(`deployment is already controlled by ${current.holderId} until ${current.expiresAt}`);
  }
  const lease = leaseSchema.parse({
    schemaVersion: 1,
    deploymentId: manifest.deploymentId,
    operationId: operation.operationId,
    holderId: `${os.hostname()}:${process.pid}`,
    fencingToken: randomUUID(),
    generation: manifest.desiredGeneration,
    acquiredAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 120_000).toISOString(),
  });
  await client.uploadFiles([jsonBlob(CONTROL_LEASE_PATH, lease)]);
  const verified = await readDocument(client, CONTROL_LEASE_PATH, leaseSchema);
  if (verified?.fencingToken !== lease.fencingToken)
    throw new Error("could not verify deployment control lease ownership");
  return lease;
}

export async function releaseControlLease(
  client: Pick<BucketClient, "downloadFile" | "deleteFiles">,
  lease: DeploymentControlLease,
): Promise<void> {
  const current = await readDocument(client, CONTROL_LEASE_PATH, leaseSchema);
  if (current?.fencingToken === lease.fencingToken) await client.deleteFiles([CONTROL_LEASE_PATH]);
}

export async function assertControlLease(
  client: Pick<BucketClient, "downloadFile">,
  lease: DeploymentControlLease,
  now: Date,
): Promise<void> {
  const current = await readDocument(client, CONTROL_LEASE_PATH, leaseSchema);
  if (current?.fencingToken !== lease.fencingToken || Date.parse(current.expiresAt) <= now.getTime()) {
    throw new Error("deployment control lease ownership was lost");
  }
}

export async function renewControlLease(
  client: Pick<BucketClient, "downloadFile" | "uploadFiles">,
  lease: DeploymentControlLease,
  now: Date,
): Promise<DeploymentControlLease> {
  await assertControlLease(client, lease, now);
  const renewed = leaseSchema.parse({
    ...lease,
    expiresAt: new Date(now.getTime() + 120_000).toISOString(),
  });
  await client.uploadFiles([jsonBlob(CONTROL_LEASE_PATH, renewed)]);
  await assertControlLease(client, renewed, now);
  return renewed;
}

async function readDocument<T>(
  client: Pick<BucketClient, "downloadFile">,
  file: string,
  schema: z.ZodType<T>,
): Promise<T | null> {
  const blob = await client.downloadFile(file);
  if (!blob) return null;
  if (blob.size > MAX_CONTROL_BYTES) throw new Error(`${file} exceeds ${MAX_CONTROL_BYTES} bytes`);
  return schema.parse(JSON.parse(await blob.text()));
}

function jsonBlob(path: string, value: unknown): { path: string; content: Blob } {
  return { path, content: new Blob([stringify(value)], { type: "application/json" }) };
}

function stringify(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function atomicPrivateWrite(file: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.${process.pid}.tmp`;
  await fs.writeFile(temporary, content, { mode: 0o600, flag: "wx" });
  await fs.rename(temporary, file);
  await fs.chmod(file, 0o600);
}
