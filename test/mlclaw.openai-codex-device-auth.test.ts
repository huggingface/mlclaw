import { describe, expect, it, vi } from "vitest";
import {
  codexAuthJsonFromOAuthCredential,
  loginOpenAICodexDeviceCode,
} from "../src/mlclaw/openai-codex-device-auth.js";

function accessToken(accountId = "acct_123"): string {
  const payload = Buffer.from(
    JSON.stringify({ "https://api.openai.com/auth": { chatgpt_account_id: accountId } }),
    "utf8",
  ).toString("base64url");
  return `header.${payload}.signature`;
}

describe("OpenAI Codex device authentication", () => {
  it("completes the device-code flow without a Codex binary", async () => {
    const requests: Array<{ url: string; init: RequestInit }> = [];
    const responses = [
      new Response(JSON.stringify({ device_auth_id: "device-1", user_code: "ABCD-EFGH", interval: 0 }), {
        status: 200,
      }),
      new Response(JSON.stringify({ error: "deviceauth_authorization_pending" }), { status: 403 }),
      new Response(JSON.stringify({ authorization_code: "authorization-1", code_verifier: "verifier-1" }), {
        status: 200,
      }),
      new Response(
        JSON.stringify({
          access_token: accessToken(),
          refresh_token: "refresh-1",
          id_token: "id-1",
          expires_in: 3600,
        }),
        { status: 200 },
      ),
    ];
    const fetchFn = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      requests.push({ url: String(input), init: init ?? {} });
      const response = responses.shift();
      if (!response) throw new Error("unexpected request");
      return response;
    });
    let now = 1_000;
    const onVerification = vi.fn();

    const credential = await loginOpenAICodexDeviceCode({
      fetchFn,
      now: () => now,
      sleep: async (milliseconds) => {
        now += milliseconds;
      },
      onVerification,
    });

    expect(onVerification).toHaveBeenCalledWith({
      verificationUrl: "https://auth.openai.com/codex/device",
      userCode: "ABCD-EFGH",
      expiresInMs: 15 * 60_000,
    });
    expect(credential).toEqual({
      access: accessToken(),
      refresh: "refresh-1",
      expires: now + 3_600_000,
      accountId: "acct_123",
      idToken: "id-1",
    });
    expect(requests.map((request) => request.url)).toEqual([
      "https://auth.openai.com/api/accounts/deviceauth/usercode",
      "https://auth.openai.com/api/accounts/deviceauth/token",
      "https://auth.openai.com/api/accounts/deviceauth/token",
      "https://auth.openai.com/oauth/token",
    ]);
    expect(String(requests[3]?.init.body)).toContain("code_verifier=verifier-1");
    expect(JSON.stringify(requests)).not.toContain("refresh-1");
  });

  it("backs off when OpenAI asks the device poller to slow down", async () => {
    const responses = [
      new Response(JSON.stringify({ device_auth_id: "device-1", user_code: "ABCD-EFGH", interval: 1 })),
      new Response(JSON.stringify({ error: "slow_down" }), { status: 400 }),
      new Response(JSON.stringify({ authorization_code: "authorization-1", code_verifier: "verifier-1" })),
      new Response(JSON.stringify({ access_token: accessToken(), refresh_token: "refresh-1", expires_in: 3600 })),
    ];
    const sleeps: number[] = [];
    let now = 0;

    await loginOpenAICodexDeviceCode({
      fetchFn: async () => responses.shift() as Response,
      now: () => now,
      sleep: async (milliseconds) => {
        sleeps.push(milliseconds);
        now += milliseconds;
      },
      onVerification: () => undefined,
    });

    expect(sleeps).toEqual([6_000]);
  });

  it("does not contact OpenAI when login is already cancelled", async () => {
    const controller = new AbortController();
    controller.abort();
    const fetchFn = vi.fn();

    await expect(
      loginOpenAICodexDeviceCode({ fetchFn, signal: controller.signal, onVerification: () => undefined }),
    ).rejects.toThrow("cancelled");
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it("rejects oversized OAuth responses", async () => {
    await expect(
      loginOpenAICodexDeviceCode({
        fetchFn: async () => new Response("x".repeat(256 * 1024 + 1)),
        onVerification: () => undefined,
      }),
    ).rejects.toThrow("exceeded the size limit");
  });

  it("rejects token responses without a ChatGPT account identity", async () => {
    const responses = [
      new Response(JSON.stringify({ device_auth_id: "device-1", user_code: "ABCD-EFGH", interval: 0 })),
      new Response(JSON.stringify({ authorization_code: "authorization-1", code_verifier: "verifier-1" })),
      new Response(
        JSON.stringify({
          access_token: "header.e30.signature",
          refresh_token: "refresh-1",
          expires_in: 3600,
        }),
      ),
    ];

    await expect(
      loginOpenAICodexDeviceCode({
        fetchFn: async () => responses.shift() as Response,
        sleep: async () => undefined,
        onVerification: () => undefined,
      }),
    ).rejects.toThrow("did not contain a ChatGPT account ID");
  });

  it("converts OAuth credentials into the encrypted account document shape", () => {
    expect(
      codexAuthJsonFromOAuthCredential(
        {
          access: "access-1",
          refresh: "refresh-1",
          expires: 123,
          accountId: "acct_123",
          idToken: "id-1",
        },
        new Date("2026-07-27T08:00:00.000Z"),
      ),
    ).toEqual({
      auth_mode: "chatgpt",
      OPENAI_API_KEY: null,
      tokens: {
        id_token: "id-1",
        access_token: "access-1",
        refresh_token: "refresh-1",
        account_id: "acct_123",
      },
      last_refresh: "2026-07-27T08:00:00.000Z",
    });
  });
});
