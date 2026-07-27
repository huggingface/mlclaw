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
import {
  codexAuthJsonFromOAuthCredential,
  openAICodexCredentialFromAuthJson,
  refreshOpenAICodexCredential,
  type OpenAICodexOAuthCredential,
} from "../mlclaw/openai-codex-device-auth.js";
import type { SpaceRuntimeConfig } from "./config.js";

const REFRESH_SKEW_MS = 5 * 60_000;

export class CodexCredentialStore {
  private tail: Promise<void> = Promise.resolve();

  constructor(
    private readonly config: SpaceRuntimeConfig,
    private readonly now: () => Date = () => new Date(),
    private readonly fetchFn: typeof fetch = fetch,
  ) {}

  async configured(): Promise<boolean> {
    return Boolean(await this.loadDocument());
  }

  async credentialForImport(): Promise<OpenAICodexOAuthCredential | undefined> {
    const source = await this.loadDocument();
    return source ? openAICodexCredentialFromAuthJson(source.authJson) : undefined;
  }

  async credential(
    options: { forceRefresh?: boolean; signal?: AbortSignal } = {},
  ): Promise<OpenAICodexOAuthCredential> {
    return await this.serialized(async () => {
      const source = await this.loadDocument();
      if (!source) throw new Error("Codex account credentials are not configured for this deployment");
      const credential = openAICodexCredentialFromAuthJson(source.authJson);
      if (!options.forceRefresh && credential.expires > this.now().getTime() + REFRESH_SKEW_MS) {
        return credential;
      }
      const refreshed = await refreshOpenAICodexCredential({
        refreshToken: credential.refresh,
        fetchFn: this.fetchFn,
        now: () => this.now().getTime(),
        ...(options.signal ? { signal: options.signal } : {}),
      });
      if (refreshed.accountId !== credential.accountId) {
        throw new Error("Refreshed Codex credential changed ChatGPT account identity");
      }
      const latest = await this.loadDocument();
      if (!latest) throw new Error("Codex account credentials were revoked during refresh");
      if (stableJson(latest) !== stableJson(source)) {
        return openAICodexCredentialFromAuthJson(latest.authJson);
      }
      const document = encodeCodexAuthDocument({
        authJson: codexAuthJsonFromOAuthCredential(refreshed, this.now()),
        now: this.now(),
      });
      await this.saveDocument(document);
      return refreshed;
    });
  }

  private async serialized<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.tail.then(operation, operation);
    this.tail = result.then(
      () => undefined,
      () => undefined,
    );
    return await result;
  }

  private async loadDocument(): Promise<CodexAuthDocument | undefined> {
    if (await this.hasRevocationMarker()) {
      await deleteEncryptedCodexAuthFile(this.config.codexAuthStoreFile);
      return undefined;
    }
    if (this.config.stateMountDir) {
      return await this.readLocalDocument();
    }
    if (!this.config.stateBucket || !this.config.hfToken) {
      return await this.readLocalDocument();
    }
    const blob = await this.bucketClient().downloadFile(codexAuthObjectPath(this.config.statePrefix));
    if (!blob) {
      await deleteEncryptedCodexAuthFile(this.config.codexAuthStoreFile);
      return undefined;
    }
    await writePrivateRawFile(this.config.codexAuthStoreFile, await blob.text());
    return await this.readLocalDocument();
  }

  private async readLocalDocument(): Promise<CodexAuthDocument | undefined> {
    return await readEncryptedCodexAuthFile({
      file: this.config.codexAuthStoreFile,
      secret: this.config.credentialKey,
      expectedContext: this.expectedContext(),
    });
  }

  private async saveDocument(document: CodexAuthDocument): Promise<void> {
    if (await this.hasRevocationMarker()) {
      throw new Error("Codex account credentials were revoked during refresh");
    }
    await writeEncryptedCodexAuthFile({
      file: this.config.codexAuthStoreFile,
      document,
      secret: this.config.credentialKey,
      context: this.expectedContext(),
    });
    if (!this.config.stateMountDir && this.config.stateBucket && this.config.hfToken) {
      const encrypted = await fs.readFile(this.config.codexAuthStoreFile, "utf8");
      await this.bucketClient().uploadFiles([
        { path: codexAuthObjectPath(this.config.statePrefix), content: new Blob([encrypted]) },
      ]);
    }
  }

  private async hasRevocationMarker(): Promise<boolean> {
    if (this.config.stateMountDir || !this.config.stateBucket || !this.config.hfToken) {
      return await fileExists(path.join(path.dirname(this.config.codexAuthStoreFile), "codex-auth.revoked"));
    }
    return Boolean(await this.bucketClient().downloadFile(codexAuthRevocationObjectPath(this.config.statePrefix)));
  }

  private expectedContext(): CodexAuthContext {
    return codexAuthContext({
      ...(this.config.deploymentId ? { deploymentId: this.config.deploymentId } : {}),
      ...(this.config.stateBucket ? { bucket: this.config.stateBucket } : {}),
      ...(this.config.statePrefix ? { statePrefix: this.config.statePrefix } : {}),
    });
  }

  private bucketClient(): BucketClient {
    if (!this.config.stateBucket || !this.config.hfToken) {
      throw new Error("Hugging Face bucket credentials are not configured for Codex credentials");
    }
    return new BucketClient({
      bucket: this.config.stateBucket,
      accessToken: this.config.hfToken,
      hubUrl: this.config.hubUrl,
    });
  }
}

async function writePrivateRawFile(file: string, content: string): Promise<void> {
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temporary = `${file}.${process.pid}.${Math.random().toString(16).slice(2)}.tmp`;
  try {
    await fs.writeFile(temporary, content, { encoding: "utf8", mode: 0o600, flag: "wx" });
    await fs.chmod(temporary, 0o600);
    await fs.rename(temporary, file);
    await fs.chmod(file, 0o600);
  } finally {
    await fs.rm(temporary, { force: true });
  }
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

function stableJson(value: unknown): string {
  return JSON.stringify(value);
}
