import fs from "node:fs/promises";
import path from "node:path";
import { BucketClient } from "../hf-bucket-client/client.js";
import {
  codexAuthContext,
  codexAuthObjectPath,
  codexAuthRevocationObjectPath,
  deleteEncryptedCodexAuthFile,
  encodeCodexAuthDocument,
  readEncryptedCodexAuthFile,
  writeEncryptedCodexAuthFile,
  type CodexAuthContext,
  type CodexAuthDocument,
} from "../mlclaw/codex-auth.js";
import type { SpaceRuntimeConfig } from "./config.js";

const DEFAULT_SYNC_DEBOUNCE_MS = 1_000;

type CodexAuthRuntimeStatus = {
  configured: boolean;
  updatedAt: string | null;
};

export class CodexAuthManager {
  private watchAbort: AbortController | undefined;
  private syncTimer: NodeJS.Timeout | undefined;
  private syncTail: Promise<void> = Promise.resolve();
  private lastPersistedAuthJson = "";

  constructor(private readonly config: SpaceRuntimeConfig) {}

  async restore(): Promise<CodexAuthRuntimeStatus> {
    await this.stopSync();
    await this.ensureCodexHome();
    await this.writeCodexConfig();
    const document = await this.loadEncryptedDocument();
    if (!document) {
      await fs.rm(this.authJsonFile(), { force: true });
      this.lastPersistedAuthJson = "";
      return { configured: false, updatedAt: null };
    }
    await this.writeAuthJson(document.authJson);
    this.lastPersistedAuthJson = stableJson(document.authJson);
    return { configured: true, updatedAt: document.updatedAt };
  }

  async status(): Promise<CodexAuthRuntimeStatus> {
    const document = await this.loadEncryptedDocument();
    return document ? { configured: true, updatedAt: document.updatedAt } : { configured: false, updatedAt: null };
  }

  async hasRestoredAuth(): Promise<boolean> {
    const authoritative = await this.loadEncryptedDocument();
    if (!authoritative) {
      await this.clearRestoredAuth();
      return false;
    }
    const serialized = stableJson(authoritative.authJson);
    if (!this.lastPersistedAuthJson || serialized !== this.lastPersistedAuthJson) {
      await this.writeAuthJson(authoritative.authJson);
      this.lastPersistedAuthJson = serialized;
    }
    return Boolean(await this.readAuthJson());
  }

  async startSync(): Promise<void> {
    await this.stopSync();
    await this.ensureCodexHome();
    this.watchAbort = new AbortController();
    watchAuthFile(this.authJsonFile(), this.watchAbort.signal, () => this.schedulePersist()).catch((error) => {
      if (!(error instanceof Error && error.name === "AbortError")) {
        process.stderr.write(`[mlclaw] Codex auth watcher stopped: ${formatError(error)}\n`);
      }
    });
  }

  async stopSync(): Promise<void> {
    const pendingPersist = Boolean(this.syncTimer);
    if (this.syncTimer) {
      clearTimeout(this.syncTimer);
      this.syncTimer = undefined;
    }
    this.watchAbort?.abort();
    this.watchAbort = undefined;
    await this.syncTail;
    if (pendingPersist) {
      await this.persistCurrentAuth();
    }
  }

  private schedulePersist(): void {
    if (this.syncTimer) clearTimeout(this.syncTimer);
    this.syncTimer = setTimeout(() => {
      this.syncTimer = undefined;
      this.syncTail = this.syncTail
        .then(() => this.persistCurrentAuth())
        .catch((error) => {
          process.stderr.write(`[mlclaw] failed to persist Codex auth refresh: ${formatError(error)}\n`);
        });
    }, DEFAULT_SYNC_DEBOUNCE_MS);
  }

  private async persistCurrentAuth(): Promise<void> {
    const authoritative = await this.loadEncryptedDocument();
    if (!authoritative) {
      await this.clearRestoredAuth();
      return;
    }
    const authoritativeJson = stableJson(authoritative.authJson);
    if (authoritativeJson !== this.lastPersistedAuthJson) {
      await this.writeAuthJson(authoritative.authJson);
      this.lastPersistedAuthJson = authoritativeJson;
      return;
    }
    const authJson = await this.readAuthJson();
    if (!authJson) {
      await this.deleteEncryptedDocument();
      this.lastPersistedAuthJson = "";
      return;
    }
    const serialized = stableJson(authJson);
    if (serialized === this.lastPersistedAuthJson) return;
    const document = encodeCodexAuthDocument({ authJson, now: new Date() });
    await this.saveEncryptedDocument(document);
    this.lastPersistedAuthJson = serialized;
  }

  private async loadEncryptedDocument(): Promise<CodexAuthDocument | undefined> {
    if (await this.hasRevocationMarker()) {
      await deleteEncryptedCodexAuthFile(this.config.codexAuthStoreFile);
      return undefined;
    }
    const mountedFile = this.mountedStoreFile();
    if (mountedFile) {
      return await readEncryptedCodexAuthFile({
        file: mountedFile,
        secret: this.config.credentialKey,
        expectedContext: this.expectedContext(),
      });
    }
    if (!this.config.stateBucket || !this.config.hfToken) {
      return await readEncryptedCodexAuthFile({
        file: this.config.codexAuthStoreFile,
        secret: this.config.credentialKey,
        expectedContext: this.expectedContext(),
      });
    }
    const downloaded = await this.downloadEncryptedObject();
    if (!downloaded) {
      await deleteEncryptedCodexAuthFile(this.config.codexAuthStoreFile);
      return undefined;
    }
    await writePrivateRawFile(this.config.codexAuthStoreFile, downloaded);
    return await readEncryptedCodexAuthFile({
      file: this.config.codexAuthStoreFile,
      secret: this.config.credentialKey,
      expectedContext: this.expectedContext(),
    });
  }

  private async saveEncryptedDocument(document: CodexAuthDocument): Promise<void> {
    const mountedFile = this.mountedStoreFile();
    const target = mountedFile ?? this.config.codexAuthStoreFile;
    await writeEncryptedCodexAuthFile({
      file: target,
      document,
      secret: this.config.credentialKey,
      context: this.expectedContext(),
    });
    if (!mountedFile) {
      await this.uploadEncryptedObject(await fs.readFile(target, "utf8"));
    }
  }

  private async deleteEncryptedDocument(): Promise<void> {
    const mountedFile = this.mountedStoreFile();
    await deleteEncryptedCodexAuthFile(mountedFile ?? this.config.codexAuthStoreFile);
    if (!mountedFile && this.config.stateBucket && this.config.hfToken) {
      await this.bucketClient().deleteFiles([codexAuthObjectPath(this.config.statePrefix)]);
    }
  }

  private mountedStoreFile(): string | undefined {
    return this.config.stateMountDir ? this.config.codexAuthStoreFile : undefined;
  }

  private async hasRevocationMarker(): Promise<boolean> {
    if (this.config.stateMountDir) {
      return await fileExists(this.localRevocationFile());
    }
    if (this.config.stateBucket && this.config.hfToken) {
      return Boolean(await this.bucketClient().downloadFile(codexAuthRevocationObjectPath(this.config.statePrefix)));
    }
    return await fileExists(this.localRevocationFile());
  }

  private localRevocationFile(): string {
    return path.join(path.dirname(this.config.codexAuthStoreFile), path.basename(codexAuthRevocationObjectPath()));
  }

  private async clearRestoredAuth(): Promise<void> {
    await fs.rm(this.authJsonFile(), { force: true });
    this.lastPersistedAuthJson = "";
  }

  private async downloadEncryptedObject(): Promise<string | undefined> {
    if (!this.config.stateBucket || !this.config.hfToken) return undefined;
    const blob = await this.bucketClient().downloadFile(codexAuthObjectPath(this.config.statePrefix));
    return blob ? await blob.text() : undefined;
  }

  private async uploadEncryptedObject(encrypted: string): Promise<void> {
    if (!this.config.stateBucket || !this.config.hfToken) return;
    await this.bucketClient().uploadFiles([
      { path: codexAuthObjectPath(this.config.statePrefix), content: new Blob([encrypted]) },
    ]);
  }

  private bucketClient(): BucketClient {
    if (!this.config.stateBucket || !this.config.hfToken) {
      throw new Error("Hugging Face bucket credentials are not configured for Codex auth sync");
    }
    return new BucketClient({
      bucket: this.config.stateBucket,
      accessToken: this.config.hfToken,
      hubUrl: this.config.hubUrl,
    });
  }

  private expectedContext(): CodexAuthContext {
    return codexAuthContext({
      ...(this.config.deploymentId ? { deploymentId: this.config.deploymentId } : {}),
      ...(this.config.stateBucket ? { bucket: this.config.stateBucket } : {}),
      ...(this.config.statePrefix ? { statePrefix: this.config.statePrefix } : {}),
    });
  }

  private async ensureCodexHome(): Promise<void> {
    await fs.mkdir(this.config.codexHome, { recursive: true, mode: 0o700 });
    await fs.chmod(this.config.codexHome, 0o700);
  }

  private async writeCodexConfig(): Promise<void> {
    const file = path.join(this.config.codexHome, "config.toml");
    await writePrivateRawFile(file, 'cli_auth_credentials_store = "file"\nforced_login_method = "chatgpt"\n');
  }

  private async readAuthJson(): Promise<Record<string, unknown> | undefined> {
    try {
      const raw = await fs.readFile(this.authJsonFile(), "utf8");
      const parsed = JSON.parse(raw) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : undefined;
    } catch (error) {
      if (isNotFound(error)) return undefined;
      throw error;
    }
  }

  private async writeAuthJson(authJson: Record<string, unknown>): Promise<void> {
    const file = this.authJsonFile();
    await writePrivateRawFile(file, `${stableJson(authJson)}\n`);
  }

  private authJsonFile(): string {
    return path.join(this.config.codexHome, "auth.json");
  }
}

async function watchAuthFile(file: string, signal: AbortSignal, onChange: () => void): Promise<void> {
  const directory = path.dirname(file);
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  for await (const event of fs.watch(directory, { signal })) {
    if (event.filename === path.basename(file)) {
      onChange();
    }
  }
}

async function writePrivateRawFile(file: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.${process.pid}.${Math.random().toString(16).slice(2)}.tmp`;
  try {
    await fs.writeFile(temporary, content, { encoding: "utf8", mode: 0o600 });
    await fs.chmod(temporary, 0o600);
    await fs.rename(temporary, file);
    await fs.chmod(file, 0o600);
  } finally {
    await fs.rm(temporary, { force: true });
  }
}

function stableJson(value: unknown): string {
  return JSON.stringify(value);
}

async function fileExists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    return true;
  } catch (error) {
    if (isNotFound(error)) return false;
    throw error;
  }
}

function isNotFound(error: unknown): boolean {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
