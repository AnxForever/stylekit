import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/admin/audit/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getAdminAuditEvents, type AdminAuditEvent } from "@/lib/admin/audit-log";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  getAdminAuditEvents: vi.fn(),
}));

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetAdminAuditEvents = vi.mocked(getAdminAuditEvents);
const ORIGINAL_EXPORT_MAX_ROWS = process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS;

afterEach(() => {
  mockedCheckAdminApiAccess.mockReset();
  mockedGetAdminAuditEvents.mockReset();

  if (ORIGINAL_EXPORT_MAX_ROWS === undefined) {
    delete process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS;
  } else {
    process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS = ORIGINAL_EXPORT_MAX_ROWS;
  }
});

describe("GET /api/admin/audit", () => {
  it("returns auth error when caller is not authorized", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      error: "Forbidden",
      status: 403,
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/audit"));
    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
    expect(mockedGetAdminAuditEvents).not.toHaveBeenCalled();
  });

  it("passes query filters to audit reader for JSON response", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "dev-bypass", id: "dev-bypass" },
    });

    const expected = {
      events: [createEvent("evt-1")],
      total: 1,
      limit: 15,
      offset: 5,
      hasMore: false,
      nextOffset: null,
    };
    mockedGetAdminAuditEvents.mockResolvedValue(expected);

    const response = await GET(
      new Request(
        "https://stylekit.top/api/admin/audit?limit=15&offset=5&days=7&action=submission.approve&search=modern"
      )
    );

    expect(mockedGetAdminAuditEvents).toHaveBeenCalledTimes(1);
    expect(mockedGetAdminAuditEvents).toHaveBeenCalledWith({
      limit: 15,
      offset: 5,
      days: 7,
      action: "submission.approve",
      search: "modern",
    });
    await expect(response.json()).resolves.toEqual(expected);
  });

  it("exports CSV with truncation headers when export cap is reached", async () => {
    process.env.ADMIN_AUDIT_EXPORT_MAX_ROWS = "100";
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "dev-bypass", id: "dev-bypass" },
    });

    const firstPageEvents = createEvents(80, 1);
    const secondPageEvents = createEvents(30, 81);

    mockedGetAdminAuditEvents
      .mockResolvedValueOnce({
        events: firstPageEvents,
        total: 110,
        limit: 100,
        offset: 0,
        hasMore: true,
        nextOffset: 80,
      })
      .mockResolvedValueOnce({
        events: secondPageEvents,
        total: 110,
        limit: 100,
        offset: 80,
        hasMore: false,
        nextOffset: null,
      });

    const response = await GET(
      new Request(
        "https://stylekit.top/api/admin/audit?format=csv&action=submission.approve"
      )
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");
    expect(response.headers.get("x-export-limit")).toBe("100");
    expect(response.headers.get("x-export-truncated")).toBe("true");
    expect(mockedGetAdminAuditEvents).toHaveBeenCalledTimes(2);
    expect(mockedGetAdminAuditEvents).toHaveBeenNthCalledWith(1, {
      action: "submission.approve",
      search: null,
      days: null,
      limit: 100,
      offset: 0,
    });
    expect(mockedGetAdminAuditEvents).toHaveBeenNthCalledWith(2, {
      action: "submission.approve",
      search: null,
      days: null,
      limit: 100,
      offset: 80,
    });

    const csv = await response.text();
    expect(csv.split("\n")).toHaveLength(101);
    expect(csv).toContain("evt-1");
    expect(csv).toContain("evt-100");
    expect(csv).not.toContain("evt-101");
  });
});

function createEvent(id: string): AdminAuditEvent {
  return {
    id,
    action: "submission.approve",
    targetType: "submission",
    targetId: `target-${id}`,
    actor: { type: "user", id: "admin-1" },
    ipAddress: "127.0.0.1",
    userAgent: "test-agent",
    metadata: { slug: "modern-minimal" },
    createdAt: "2026-02-17T00:00:00.000Z",
  };
}

function createEvents(count: number, startIndex: number): AdminAuditEvent[] {
  return Array.from({ length: count }, (_, index) =>
    createEvent(`evt-${startIndex + index}`)
  );
}
