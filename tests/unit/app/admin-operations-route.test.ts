import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  getAdminAuditEvents: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET } from "@/app/api/admin/operations/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getAdminAuditEvents } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetAdminAuditEvents = vi.mocked(getAdminAuditEvents);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/operations", () => {
  it("rejects unauthenticated requests before querying operational data", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/operations"));

    expect(response.status).toBe(403);
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("does not turn old interactions into queue items when the recent counts are empty", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });
    mockedGetAdminAuditEvents.mockResolvedValue({
      events: [],
      total: 0,
      limit: 5,
      offset: 0,
      hasMore: false,
      nextOffset: null,
    });

    const from = vi.fn((table: string) => {
      const query: Record<string, unknown> & { then?: Promise<unknown>["then"] } = {
        select: vi.fn(() => query),
        eq: vi.fn(() => query),
        gte: vi.fn(() => query),
        order: vi.fn(() => query),
        limit: vi.fn(() => query),
      };
      query.then = (resolve, reject) =>
        Promise.resolve({ data: [], count: 0, error: null, table }).then(resolve, reject);
      return query;
    });
    mockedGetSupabaseAdmin.mockReturnValue({ from } as never);

    const response = await GET(new Request("https://stylekit.top/api/admin/operations"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.queue.items).toEqual([]);
    expect(payload.signals.recentComments).toBe(0);
    expect(payload.signals.recentRatings).toBe(0);
    expect(from.mock.calls.filter(([table]) => table === "style_comments")).toHaveLength(1);
    expect(from.mock.calls.filter(([table]) => table === "style_ratings")).toHaveLength(1);
    expect(from.mock.calls.filter(([table]) => table === "submissions")).toHaveLength(1);
  });
});
