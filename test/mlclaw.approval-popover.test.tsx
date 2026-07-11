// @vitest-environment jsdom

import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApprovalCenter } from "../src/mlclaw-control-ui/src/main.js";

class MockEventSource {
  onmessage: (() => void) | null = null;

  addEventListener(): void {}

  close(): void {}
}

const approval = {
  id: "request-1",
  revision: 3,
  client: "openclaw",
  operation: "repo.write",
  status: "pending",
  requested_at: "2026-07-11T04:00:00.000Z",
  pending_expires_at: "2026-07-11T05:00:00.000Z",
  requested_duration_seconds: 900,
  max_uses: 1,
  used_count: 0,
  presentation: {
    risk: "high",
    title: "Update repository",
    summary: "Writes a configuration file.",
    target: "osolmaz/mlclaw",
    fields: [{ label: "Path", value: "settings.json" }],
    plan_hash: "sha256:1234",
  },
};

describe("ApprovalCenter", () => {
  const requests: Array<{ url: string; init?: RequestInit }> = [];

  beforeEach(() => {
    requests.length = 0;
    vi.stubGlobal("EventSource", MockEventSource);
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe(): void {}
        unobserve(): void {}
        disconnect(): void {}
      },
    );
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input);
        requests.push({ url, init });
        if (url.endsWith("/mlclaw/api/approvals/brokers")) {
          return Response.json({ brokers: [{ id: "hf-broker", label: "Hugging Face" }] });
        }
        if (url.includes("/mlclaw/api/approvals?")) {
          return Response.json({ broker: { id: "hf-broker", label: "Hugging Face" }, items: [approval] });
        }
        if (init?.method === "POST") {
          return Response.json({ ok: true });
        }
        return Response.json({ error: "not found" }, { status: 404 });
      }),
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("opens from the bell and submits a denial through a confirmation dialog", async () => {
    const user = userEvent.setup();
    render(<ApprovalCenter session={{ user: "alice", admin: true, csrfToken: "csrf-token" }} />);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    await user.click(screen.getByRole("button", { name: "Approval requests" }));
    expect(await screen.findByRole("region", { name: "Approval requests" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /Update repository/ }));
    expect(screen.getByText("Writes a configuration file.")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Deny" }));
    expect(screen.getByRole("dialog", { name: "Deny request" })).toBeTruthy();

    await user.type(screen.getByLabelText("Reason"), "Not approved for production");
    await user.click(screen.getByRole("button", { name: "Deny request" }));

    await waitFor(() => {
      const decision = requests.find((request) => request.url.endsWith("/hf-broker/request-1/deny"));
      expect(decision?.init?.headers).toMatchObject({ "x-mlclaw-csrf": "csrf-token" });
      expect(JSON.parse(String(decision?.init?.body))).toMatchObject({
        expectedRevision: 3,
        expectedStatus: "pending",
        reason: "Not approved for production",
      });
    });
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Deny request" })).toBeNull());
  });

  it("closes the embedded surface on Escape without making a decision", async () => {
    const postMessage = vi.spyOn(window.parent, "postMessage");
    const user = userEvent.setup();
    render(<ApprovalCenter session={{ user: "alice", admin: true, csrfToken: "csrf-token" }} embedded />);

    await user.keyboard("{Escape}");

    expect(postMessage).toHaveBeenCalledWith({ type: "mlclaw-approvals-close" }, window.location.origin);
    expect(requests.every((request) => request.init?.method !== "POST")).toBe(true);
    postMessage.mockRestore();
  });
});
