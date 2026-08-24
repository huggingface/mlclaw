import { execFile as execFileCallback, spawn } from "node:child_process";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { afterEach, describe, expect, it } from "vitest";
import { configureOpenClawGateway } from "../src/mlclaw-space-runtime/openclaw-config.js";
import { loadConfig } from "../src/mlclaw-space-runtime/config.js";

const execFile = promisify(execFileCallback);
const openclawPackageDir = process.env.MLCLAW_OPENCLAW_PACKAGE_DIR;
const cleanups: Array<() => Promise<void> | void> = [];
const ownerOnlyTools = [
  "automations",
  "computer",
  "conversations_list",
  "conversations_send",
  "conversations_turn",
  "gateway",
  "mobile_ui",
  "nodes",
  "openclaw",
  "portal",
  "sessions",
  "terminal",
].sort();

afterEach(async () => {
  for (const cleanup of cleanups.splice(0).reverse()) await cleanup();
});

describe.runIf(openclawPackageDir)("pinned OpenClaw integration", () => {
  it("resolves the generated file-backed broker SecretRef for inference", async () => {
    const packageDir = requirePackageDir();
    await assertPinnedVersion(packageDir);
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-openclaw-secret-ref-"));
    cleanups.push(() => fs.rm(root, { recursive: true, force: true }));
    const secretFile = path.join(root, "broker-secret");
    const configFile = path.join(root, "openclaw.json");
    const secret = "broker-secret-used-only-from-file";
    await fs.writeFile(secretFile, `${secret}\n`, { mode: 0o600 });
    await fs.writeFile(configFile, "{}\n", { mode: 0o600 });

    let observedAuthorization: string | undefined;
    const observedRequests: string[] = [];
    let observedModel: string | undefined;
    const upstream = http.createServer(async (request, response) => {
      observedRequests.push(`${request.method ?? ""} ${request.url ?? ""}`);
      observedAuthorization = request.headers.authorization;
      let body = "";
      for await (const chunk of request) body += String(chunk);
      const requestBody = jsonObject(JSON.parse(body), "OpenClaw inference request");
      observedModel = stringField(requestBody, "model");
      response.setHeader("content-type", "text/event-stream");
      const model = stringField(requestBody, "model");
      response.write(
        `data: ${JSON.stringify({
          id: "chatcmpl-mlclaw",
          object: "chat.completion.chunk",
          created: 1,
          model,
          choices: [{ index: 0, delta: { role: "assistant", content: "secret-ref-ok" }, finish_reason: null }],
        })}\n\n`,
      );
      response.write(
        `data: ${JSON.stringify({
          id: "chatcmpl-mlclaw",
          object: "chat.completion.chunk",
          created: 1,
          model,
          choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        })}\n\n`,
      );
      response.end("data: [DONE]\n\n");
    });
    await listen(upstream);
    cleanups.push(() => closeServer(upstream));
    const address = upstream.address();
    if (!address || typeof address === "string") throw new Error("test upstream did not bind a TCP port");

    const config = loadConfig({
      MLCLAW_HF_BROKER_URL: `http://127.0.0.1:${address.port}`,
      MLCLAW_HF_BROKER_AGENT_SECRET_FILE: secretFile,
      MLCLAW_CREDENTIAL_KEY: "integration-credential-key-integration-credential-key",
      OPENCLAW_CONFIG_PATH: configFile,
      MLCLAW_UNYOLO_PLUGIN_PATH: path.join(root, "unused-unyolo-plugin"),
      MLCLAW_OPENCLAW_UID: String(process.getuid?.() ?? 1000),
      MLCLAW_OPENCLAW_GID: String(process.getgid?.() ?? 1000),
    });
    await configureOpenClawGateway(config);
    const generated = jsonObject(JSON.parse(await fs.readFile(configFile, "utf8")), "generated OpenClaw config");
    const providerModels = nestedObject(generated, ["models", "providers", "huggingface"]).models;
    if (!Array.isArray(providerModels) || !objectValue(providerModels[1])) {
      throw new Error("generated Hugging Face provider omitted its non-reasoning test model");
    }
    const selectedModel = objectValue(providerModels[1]) ?? {};
    const testModelId = stringField(selectedModel, "id");
    selectedModel.compat = { supportsTools: false, supportsStrictMode: false };
    nestedObject(generated, ["agents", "defaults", "model"]).primary = `huggingface/${testModelId}`;
    delete generated.mcp;
    delete generated.plugins;
    delete generated.gateway;
    await fs.writeFile(configFile, `${JSON.stringify(generated, null, 2)}\n`, { mode: 0o600 });

    const result = await runOpenClawAgent({ packageDir, root, configFile });
    expect(result.code, result.stderr).toBe(0);
    expect(observedRequests).toEqual(["POST /v1/chat/completions"]);
    expect(observedModel).toBe(testModelId);
    expect(observedAuthorization).toBe(`Bearer ${secret}`);
    expect(result.stderr).not.toContain(secret);
  }, 30_000);

  it("preserves Telegram owner authentication and all owner-only tools", async () => {
    const packageDir = requirePackageDir();
    await assertPinnedVersion(packageDir);
    const root = await fs.mkdtemp(path.join(os.tmpdir(), "mlclaw-openclaw-owner-"));
    cleanups.push(() => fs.rm(root, { recursive: true, force: true }));
    const configFile = path.join(root, "openclaw.json");
    await fs.writeFile(configFile, "{}\n", { mode: 0o600 });
    await execFile(process.execPath, [path.resolve("scripts/configure-telegram.mjs"), configFile, "1234567890"]);
    const config = jsonObject(JSON.parse(await fs.readFile(configFile, "utf8")), "Telegram OpenClaw config");

    const telegramEntry = await loadTelegramEntry(packageDir);
    Reflect.set(globalThis, Symbol.for("openclaw.pluginRegistryState"), {
      activeRegistry: { channels: [{ plugin: telegramEntry }] },
      activeVersion: 1,
      channel: { registry: null, version: 0 },
    });
    cleanups.push(() => {
      Reflect.deleteProperty(globalThis, Symbol.for("openclaw.pluginRegistryState"));
    });

    const commandAuth = await importPackageModule(packageDir, "dist/plugin-sdk/command-auth.js");
    const resolveAuthorization = functionField(commandAuth, "resolveCommandAuthorization");
    const ownerAuthorization = authorizationResult(
      resolveAuthorization({
        ctx: telegramContext("1234567890"),
        cfg: config,
        commandAuthorized: true,
      }),
    );
    expect(ownerAuthorization).toMatchObject({ senderIsOwner: true, isAuthorizedSender: true });

    const strangerAuthorization = authorizationResult(
      resolveAuthorization({
        ctx: telegramContext("9999999999"),
        cfg: config,
        commandAuthorized: false,
      }),
    );
    expect(strangerAuthorization).toMatchObject({ senderIsOwner: false, isAuthorizedSender: false });

    const resolveTools = await loadToolResolver(packageDir);
    const ownerTools = toolNames(resolveTools(toolResolutionParams(config, root, true)));
    const strangerTools = toolNames(resolveTools(toolResolutionParams(config, root, false)));
    expect(ownerOnlyTools.filter((name) => ownerTools.includes(name))).toEqual(ownerOnlyTools);
    expect(ownerOnlyTools.filter((name) => strangerTools.includes(name))).toEqual([]);
    expect(ownerTools.filter((name) => !strangerTools.includes(name)).sort()).toEqual(ownerOnlyTools);

    const browserAuthorization = authorizationResult(
      resolveAuthorization({
        ctx: { Provider: "webchat", Surface: "webchat", GatewayClientScopes: ["operator.admin"] },
        cfg: config,
        commandAuthorized: true,
      }),
    );
    expect(browserAuthorization.senderIsOwner).toBe(true);
  }, 30_000);
});

function requirePackageDir(): string {
  if (!openclawPackageDir) throw new Error("MLCLAW_OPENCLAW_PACKAGE_DIR is required");
  return openclawPackageDir;
}

async function assertPinnedVersion(packageDir: string): Promise<void> {
  const actual = jsonObject(
    JSON.parse(await fs.readFile(path.join(packageDir, "package.json"), "utf8")),
    "OpenClaw package",
  );
  const expected = jsonObject(JSON.parse(await fs.readFile("package.json", "utf8")), "MLClaw package");
  expect(actual.version).toBe(nestedObject(expected, ["config"]).openclawVersion);
}

async function runOpenClawAgent(params: {
  packageDir: string;
  root: string;
  configFile: string;
}): Promise<{ code: number | null; stdout: string; stderr: string }> {
  const executable = path.join(params.packageDir, "openclaw.mjs");
  const child = spawn(
    process.execPath,
    [
      executable,
      "agent",
      "--local",
      "--agent",
      "main",
      "--message",
      "Reply exactly secret-ref-ok",
      "--json",
      "--timeout",
      "20",
    ],
    {
      env: cleanOpenClawEnvironment(params.root, params.configFile),
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8").on("data", (chunk: string) => (stdout += chunk));
  child.stderr.setEncoding("utf8").on("data", (chunk: string) => (stderr += chunk));
  const code = await new Promise<number | null>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", resolve);
  });
  return { code, stdout, stderr };
}

function cleanOpenClawEnvironment(root: string, configFile: string): NodeJS.ProcessEnv {
  const {
    HF_TOKEN: _hfToken,
    HUGGINGFACE_HUB_TOKEN: _hubToken,
    MLCLAW_BROKER_HF_TOKEN: _brokerToken,
    HF_BROKER_SHARED_SECRET: _sharedSecret,
    ...safeEnvironment
  } = process.env;
  return { ...safeEnvironment, HOME: root, OPENCLAW_STATE_DIR: root, OPENCLAW_CONFIG_PATH: configFile };
}

async function loadTelegramEntry(packageDir: string): Promise<Record<string, unknown>> {
  const extension = await importPackageModule(packageDir, "dist/extensions/telegram/index.js");
  const entry = objectValue(extension.default);
  if (!entry) throw new Error("pinned OpenClaw Telegram entry is missing");
  const loadChannelPlugin = functionField(entry, "loadChannelPlugin");
  return jsonObject(await loadChannelPlugin(), "pinned OpenClaw Telegram plugin");
}

async function loadToolResolver(
  packageDir: string,
): Promise<(params: Record<string, unknown>) => Record<string, unknown>> {
  const dist = path.join(packageDir, "dist");
  const matches = (await fs.readdir(dist)).filter((name) => /^tool-resolution-.*\.js$/u.test(name));
  if (matches.length !== 1) throw new Error(`expected one pinned OpenClaw tool resolver, found ${matches.length}`);
  const module = await importPackageModule(packageDir, `dist/${matches[0]}`);
  const resolver = Object.values(module).find((value) => typeof value === "function");
  if (typeof resolver !== "function") throw new Error("pinned OpenClaw tool resolver export is missing");
  return (params) => jsonObject(resolver(params), "pinned OpenClaw tool resolution");
}

function toolResolutionParams(
  config: Record<string, unknown>,
  workspaceDir: string,
  senderIsOwner: boolean,
): Record<string, unknown> {
  return {
    cfg: config,
    sessionKey: "agent:main:telegram:direct:1234567890",
    messageProvider: "telegram",
    surface: "loopback",
    workspaceDir,
    senderIsOwner,
  };
}

function toolNames(resolution: Record<string, unknown>): string[] {
  const tools = resolution.tools;
  if (!Array.isArray(tools)) throw new Error("pinned OpenClaw tool resolution omitted tools");
  return tools.map((tool) => stringField(jsonObject(tool, "OpenClaw tool"), "name"));
}

function telegramContext(senderId: string): Record<string, unknown> {
  return {
    Provider: "telegram",
    Surface: "telegram",
    ChatType: "direct",
    From: `telegram:${senderId}`,
    SenderId: senderId,
  };
}

function authorizationResult(value: unknown): Record<string, unknown> {
  return jsonObject(value, "OpenClaw command authorization");
}

async function importPackageModule(packageDir: string, relativePath: string): Promise<Record<string, unknown>> {
  return jsonObject(await import(pathToFileURL(path.join(packageDir, relativePath)).href), relativePath);
}

function functionField(object: Record<string, unknown>, key: string): (...args: unknown[]) => unknown {
  const value = object[key];
  if (typeof value !== "function") throw new Error(`${key} must be a function`);
  return (...args) => Reflect.apply(value, undefined, args);
}

function nestedObject(object: Record<string, unknown>, keys: string[]): Record<string, unknown> {
  return keys.reduce((current, key) => {
    const value = objectValue(current[key]);
    if (!value) throw new Error(`${keys.join(".")} must be an object`);
    return value;
  }, object);
}

function jsonObject(value: unknown, label: string): Record<string, unknown> {
  const object = objectValue(value);
  if (!object) throw new Error(`${label} must be an object`);
  return object;
}

function objectValue(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function stringField(object: Record<string, unknown>, key: string): string {
  const value = object[key];
  if (typeof value !== "string") throw new Error(`${key} must be a string`);
  return value;
}

async function listen(server: http.Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
}

async function closeServer(server: http.Server): Promise<void> {
  if (!server.listening) return;
  await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}
