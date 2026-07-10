import http from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { HfBrokerOperatorClient } from "../src/mlclaw-space-runtime/hf-broker.js";

const cleanups: Array<() => Promise<void>> = [];

afterEach(async () => {
  await Promise.all(cleanups.splice(0).map((cleanup) => cleanup()));
});

describe("HF Broker operator client", () => {
  it("uses only fixed operator routes with the operator bearer token", async () => {
    const requests: Array<{ method: string; url: string; authorization?: string; body: string }> = [];
    const server = http.createServer(async (req, res) => {
      let body = "";
      for await (const chunk of req) {
        body += String(chunk);
      }
      requests.push({
        method: req.method ?? "",
        url: req.url ?? "",
        ...(req.headers.authorization ? { authorization: req.headers.authorization } : {}),
        body,
      });
      res.writeHead(200, { "content-type": "application/json" });
      if (req.url?.includes("/approve")) {
        res.end(JSON.stringify({ id: "grant-1", revision: 2, status: "active" }));
      } else {
        res.end(JSON.stringify({ items: [], has_more: false }));
      }
    });
    const port = await listen(server);
    cleanups.push(() => close(server));
    const client = new HfBrokerOperatorClient({
      baseUrl: `http://127.0.0.1:${port}`,
      token: "operator-secret",
    });

    await client.list({ status: "pending", limit: 50 });
    await client.decide("grant-1", "approve", {
      expectedRevision: 1,
      expectedStatus: "pending",
      durationSeconds: 300,
      maxUses: 1,
    });

    expect(requests).toEqual([
      {
        method: "GET",
        url: "/api/grants?status=pending&limit=50",
        authorization: "Bearer operator-secret",
        body: "",
      },
      {
        method: "POST",
        url: "/api/grants/grant-1/approve",
        authorization: "Bearer operator-secret",
        body: JSON.stringify({
          expected_revision: 1,
          expected_status: "pending",
          duration_seconds: 300,
          max_uses: 1,
        }),
      },
    ]);
  });

  it("rejects path-like request identifiers before sending", async () => {
    const client = new HfBrokerOperatorClient({
      baseUrl: "http://127.0.0.1:1",
      token: "operator-secret",
    });
    expect(() => client.get("../healthz")).toThrow("invalid approval request id");
  });
});

async function listen(server: http.Server): Promise<number> {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("missing test server address");
  }
  return address.port;
}

async function close(server: http.Server): Promise<void> {
  await new Promise<void>((resolve) => server.close(() => resolve()));
}
