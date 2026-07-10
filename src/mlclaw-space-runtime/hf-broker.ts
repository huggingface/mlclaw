export type BrokerDisplayField = {
  label: string;
  value: string;
};

export type BrokerApproval = {
  id: string;
  revision: number;
  client: string;
  operation: string;
  status: string;
  requested_at: string;
  pending_expires_at: string;
  active_expires_at?: string;
  requested_duration_seconds: number;
  max_uses: number;
  used_count: number;
  reserved_count: number;
  reason?: string;
  decided_at?: string;
  decided_by?: string;
  decision_reason?: string;
  presentation: {
    risk: "unknown" | "low" | "medium" | "high" | "critical";
    title: string;
    summary?: string;
    target: string;
    fields?: BrokerDisplayField[];
    plan_hash?: string;
    audit?: BrokerDisplayField[];
  };
  presentation_unavailable?: boolean;
};

export type BrokerApprovalPage = {
  items: BrokerApproval[];
  next_cursor?: string;
  has_more: boolean;
};

export type BrokerDecision = {
  expectedRevision: number;
  expectedStatus?: string;
  reason?: string;
  durationSeconds?: number;
  maxUses?: number;
};

export type HfBrokerOperatorClientOptions = {
  baseUrl: string;
  token: string;
  fetch?: typeof fetch;
};

export class HfBrokerOperatorClient {
  private readonly fetchImpl: typeof fetch;
  private readonly baseUrl: string;

  constructor(private readonly options: HfBrokerOperatorClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.fetchImpl = options.fetch ?? fetch;
  }

  list(params: { status?: "pending" | "history"; cursor?: string; limit?: number } = {}): Promise<BrokerApprovalPage> {
    const query = new URLSearchParams();
    if (params.status) {
      query.set("status", params.status);
    }
    if (params.cursor) {
      query.set("cursor", params.cursor);
    }
    if (params.limit) {
      query.set("limit", String(params.limit));
    }
    const suffix = query.size > 0 ? `?${query}` : "";
    return this.request<BrokerApprovalPage>(`/api/grants${suffix}`);
  }

  get(id: string): Promise<BrokerApproval> {
    return this.request<BrokerApproval>(`/api/grants/${approvalId(id)}`);
  }

  decide(id: string, action: "approve" | "deny" | "revoke", decision: BrokerDecision): Promise<BrokerApproval> {
    return this.request<BrokerApproval>(`/api/grants/${approvalId(id)}/${action}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        expected_revision: decision.expectedRevision,
        ...(decision.expectedStatus ? { expected_status: decision.expectedStatus } : {}),
        ...(decision.reason ? { reason: decision.reason } : {}),
        ...(decision.durationSeconds ? { duration_seconds: decision.durationSeconds } : {}),
        ...(decision.maxUses ? { max_uses: decision.maxUses } : {}),
      }),
    });
  }

  async events(lastEventId?: string): Promise<Response> {
    const headers: Record<string, string> = {
      accept: "text/event-stream",
      authorization: `Bearer ${this.options.token}`,
    };
    if (lastEventId) {
      headers["last-event-id"] = lastEventId;
    }
    const response = await this.fetchImpl(`${this.baseUrl}/api/grants/events`, {
      headers,
      redirect: "error",
    });
    if (!response.ok) {
      throw await brokerError(response);
    }
    return response;
  }

  private async request<T>(pathname: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    headers.set("accept", "application/json");
    headers.set("authorization", `Bearer ${this.options.token}`);
    const response = await this.fetchImpl(`${this.baseUrl}${pathname}`, {
      ...init,
      headers,
      redirect: "error",
    });
    if (!response.ok) {
      throw await brokerError(response);
    }
    return await response.json() as T;
  }
}

export function brokerOperatorConfigured(config: {
  brokerOperatorUrl: string | undefined;
  brokerOperatorToken: string | undefined;
}): boolean {
  return Boolean(config.brokerOperatorUrl && config.brokerOperatorToken);
}

function approvalId(id: string): string {
  const normalized = id.trim();
  if (!normalized || normalized.length > 200 || normalized.includes("/") || normalized.includes("\\")) {
    throw new Error("invalid approval request id");
  }
  return encodeURIComponent(normalized);
}

async function brokerError(response: Response): Promise<Error> {
  const fallback = `HF Broker request failed with HTTP ${response.status}`;
  try {
    const value = await response.json() as { error?: { code?: string; message?: string } };
    const message = value.error?.message?.trim() || fallback;
    const code = value.error?.code?.trim();
    return new Error(code ? `${message} (${code})` : message);
  } catch {
    return new Error(fallback);
  }
}
