import { beforeEach, describe, expect, it, vi } from "vitest";

const { checkAdminApiAccessMock, getSupabaseAdminMock, rpcMock } = vi.hoisted(() => ({
  checkAdminApiAccessMock: vi.fn(),
  getSupabaseAdminMock: vi.fn(),
  rpcMock: vi.fn(),
}));

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: checkAdminApiAccessMock,
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: getSupabaseAdminMock,
}));

vi.mock("@/lib/admin/analytics-response-cache", () => ({
  readAnalyticsCache: vi.fn(() => null),
  writeAnalyticsCache: vi.fn(),
  coalesceAnalyticsRequest: vi.fn((_key: string, load: () => Promise<unknown>) => load()),
}));

import { GET } from "@/app/api/admin/analytics/prompt-copies/route";

const payload = {
  totalCopies: 2,
  styles: [
    {
      slug: "neo-brutalist",
      copies: 2,
      sessions: 1,
      hard: 1,
      soft: 0,
      designSpec: 0,
      creativeBrief: 0,
      examples: 1,
      recipes: 0,
      projectBrief: 0,
    },
  ],
  generatedAt: "2026-10-29T08:00:00.000Z",
};

function request(range = "7d") {
  return new Request(`https://stylekit.top/api/admin/analytics/prompt-copies?range=${range}`);
}

describe("GET /api/admin/analytics/prompt-copies", () => {
  beforeEach(() => {
    checkAdminApiAccessMock.mockReset().mockResolvedValue({ allowed: true });
    getSupabaseAdminMock.mockReset().mockReturnValue({ rpc: rpcMock });
    rpcMock.mockReset();
  });

  it("requires admin access and returns no-store headers", async () => {
    checkAdminApiAccessMock.mockResolvedValue({
      allowed: false,
      status: 401,
      error: "Unauthorized",
    });

    const response = await GET(request());

    expect(response.status).toBe(401);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(rpcMock).not.toHaveBeenCalled();
  });

  it("rejects invalid ranges before querying the analytics store", async () => {
    const response = await GET(request("all-time"));

    expect(response.status).toBe(400);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(rpcMock).not.toHaveBeenCalled();
  });

  it("returns the validated aggregate from the dedicated RPC", async () => {
    rpcMock.mockResolvedValue({ data: payload, error: null });

    const response = await GET(request());

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(rpcMock).toHaveBeenCalledWith("admin_analytics_prompt_copies", {
      p_start: expect.any(String),
      p_end: expect.any(String),
    });
    expect(await response.json()).toEqual(payload);
  });

  it("reports a missing migration instead of returning an empty report", async () => {
    rpcMock.mockResolvedValue({
      data: null,
      error: { code: "PGRST202", message: "Could not find the function" },
    });

    const response = await GET(request());
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.code).toBe("ANALYTICS_MIGRATION_REQUIRED");
    expect(body.totalCopies).toBeUndefined();
  });

  it("rejects invalid RPC payloads", async () => {
    rpcMock.mockResolvedValue({ data: { totalCopies: 0, styles: [], generatedAt: "invalid" }, error: null });

    const response = await GET(request());

    expect(response.status).toBe(502);
    expect((await response.json()).code).toBe("ANALYTICS_INVALID_PAYLOAD");
  });
});
