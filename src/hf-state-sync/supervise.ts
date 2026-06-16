import { type ChildProcess, spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import type { BucketHub } from "./hub.js";
import { type SyncConfig, log, logError, remotePath } from "./paths.js";
import { runSnapshot } from "./snapshot.js";

/**
 * Run OpenClaw as a child process with a periodic snapshot loop. On SIGTERM/
 * SIGINT (Space shutdown/rebuild) the signal is forwarded and a best-effort
 * final snapshot runs after the child exits, so at most one interval of state
 * is lost. If the platform hard-kills us first, the interval loop has already
 * bounded the loss the same way.
 */
export async function supervise(params: {
  config: SyncConfig;
  hub: BucketHub;
  command: string[];
}): Promise<number> {
  const { config, hub, command } = params;
  const [binary, ...args] = command;
  if (!binary) {
    throw new Error("supervise: missing child command");
  }
  const bootTime = new Date().toISOString();
  let lastSnapshotId: string | undefined;

  const writeLease = async () => {
    const status = {
      schemaVersion: 1,
      agent: config.agentName,
      runtimeId: config.runId,
      gatewayLocation: config.gatewayLocation,
      runtimeImage: config.runtimeImage,
      startedAt: bootTime,
      lastHeartbeatAt: new Date().toISOString(),
      ...(lastSnapshotId ? { lastSnapshotId } : {}),
    };
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "hf-state-lease-"));
    try {
      const file = path.join(tmpDir, "status.json");
      await fs.writeFile(file, JSON.stringify(status, null, 2) + "\n");
      await hub.upload(file, remotePath(config, "runtime/status.json"));
    } finally {
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  };

  const child: ChildProcess = spawn(binary, args, { stdio: "inherit" });
  const childExit = new Promise<number>((resolve) => {
    child.on("exit", (code, signal) => resolve(code ?? (signal ? 128 : 1)));
    child.on("error", (err) => {
      logError(`child failed to start: ${err.message}`);
      resolve(1);
    });
  });

  let stopping = false;
  let inFlight: Promise<void> | null = null;
  const runOnce = async (label: string) => {
    try {
      const outcome = await runSnapshot({ config, hub, bootTime });
      if (outcome.kind === "failed") {
        logError(`${label}: snapshot failed: ${outcome.detail}`);
      } else if (outcome.kind === "uploaded") {
        lastSnapshotId = outcome.entry.path;
      }
      await writeLease().catch((err) => {
        logError(`${label}: lease heartbeat failed: ${err instanceof Error ? err.message : String(err)}`);
      });
    } finally {
      inFlight = null;
    }
  };
  const snapshotInterval = () => {
    if (inFlight) {
      log("interval: previous snapshot still running, skipping");
      return Promise.resolve();
    }
    inFlight = runOnce("interval");
    return inFlight;
  };
  // The final snapshot must neither be skipped nor kill an in-flight upload:
  // wait the in-flight one out, then take a fresh snapshot of the quiesced
  // state before the process is allowed to exit.
  const snapshotFinal = async () => {
    if (inFlight) {
      await inFlight;
    }
    inFlight = runOnce("final");
    await inFlight;
  };

  const loop = (async () => {
    await writeLease().catch((err) => logError(`initial lease failed: ${err instanceof Error ? err.message : String(err)}`));
    while (!stopping) {
      await delay(config.intervalSeconds * 1000);
      if (stopping) {
        return;
      }
      await snapshotInterval();
    }
  })();

  const forwardSignal = (signal: NodeJS.Signals) => {
    log(`received ${signal}, shutting down`);
    stopping = true;
    child.kill(signal);
  };
  process.on("SIGTERM", forwardSignal);
  process.on("SIGINT", forwardSignal);

  const exitCode = await childExit;
  stopping = true;

  log(`child exited with code ${exitCode}, taking final snapshot`);
  await snapshotFinal();
  return exitCode;
}
