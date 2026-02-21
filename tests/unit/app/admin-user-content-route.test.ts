import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  recordAdminAuditEvent: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { DELETE } from "@/app/api/admin/users/[userId]/content/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

afterEach(() => {
  vi.clearAllMocks();
});

describe("DELETE /api/admin/users/[userId]/content", () => {
  it("returns auth error when admin access is denied", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/users/u1/content", {
        method: "DELETE",
        body: JSON.stringify({ types: ["comments"] }),
      }),
      { params: Promise.resolve({ userId: "u1" }) }
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("falls back to legacy session delete when user_id path is unavailable", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin-user" },
    });
    mockedRecordAdminAuditEvent.mockResolvedValue();

    const fromMock = vi.fn((tableName: string) => ({
      delete: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({
          count: null,
          error: {
            code: "PGRST204",
            message: "column user_id does not exist",
          },
        }),
        in: vi.fn().mockResolvedValue({
          count: tableName === "style_comments" ? 2 : 1,
          error: null,
        }),
      })),
    }));

    mockedGetSupabaseAdmin.mockReturnValue({
      from: fromMock,
    } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/users/u1/content", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ types: ["comments", "ratings"] }),
      }),
      { params: Promise.resolve({ userId: "u1" }) }
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      deleted: true,
      types: ["comments", "ratings"],
      deletedCounts: {
        comments: 2,
        ratings: 1,
      },
    });

    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledTimes(1);
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledWith(
      expect.any(Request),
      expect.objectContaining({
        action: "user.content.delete",
        targetType: "user",
        targetId: "u1",
        metadata: {
          types: ["comments", "ratings"],
          deletedCounts: {
            comments: 2,
            ratings: 1,
          },
        },
      })
    );
  });
});
