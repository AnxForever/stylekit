import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

vi.mock("@/lib/admin/audit-log", () => ({
  recordAdminAuditEvent: vi.fn(),
}));

import { DELETE, PUT } from "@/app/api/admin/user-titles/[userId]/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);
const mockedRecordAdminAuditEvent = vi.mocked(recordAdminAuditEvent);

const params = (userId: string) => Promise.resolve({ userId });

afterEach(() => {
  vi.clearAllMocks();
});

describe("admin user titles [userId] route", () => {
  it("PUT rejects unauthorized access", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await PUT(
      new Request("https://stylekit.top/api/admin/user-titles/11111111-1111-4111-8111-111111111111", {
        method: "PUT",
        body: JSON.stringify({ customTitle: "站主" }),
      }),
      { params: params("11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
  });

  it("PUT upserts title config", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin-1" },
    });
    mockedRecordAdminAuditEvent.mockResolvedValue();

    const single = vi.fn().mockResolvedValue({
      data: {
        user_id: "11111111-1111-4111-8111-111111111111",
        custom_title: "VIP",
        title_color: "#ff5500",
        title_icon_path: "M0 0 L10 10 Z",
        is_owner: false,
        title_enabled: true,
        updated_at: "2026-02-21T00:00:00.000Z",
        updated_by: "admin-1",
      },
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const upsert = vi.fn().mockReturnValue({ select });

    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ upsert }),
    } as never);

    const response = await PUT(
      new Request("https://stylekit.top/api/admin/user-titles/11111111-1111-4111-8111-111111111111", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customTitle: "VIP",
          titleColor: "#FF5500",
          titleIconPath: "M0 0 L10 10 Z",
          isOwner: false,
          titleEnabled: true,
        }),
      }),
      { params: params("11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(200);
    expect(upsert).toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      success: true,
      rule: {
        userId: "11111111-1111-4111-8111-111111111111",
        customTitle: "VIP",
        titleColor: "#ff5500",
        titleIconPath: "M0 0 L10 10 Z",
        isOwner: false,
        titleEnabled: true,
        updatedAt: "2026-02-21T00:00:00.000Z",
        updatedBy: "admin-1",
      },
    });
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledTimes(1);
  });

  it("PUT rejects invalid title color", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin-1" },
    });

    const response = await PUT(
      new Request("https://stylekit.top/api/admin/user-titles/11111111-1111-4111-8111-111111111111", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titleColor: "red" }),
      }),
      { params: params("11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "titleColor must be a valid hex color like #ff5a7a.",
    });
  });

  it("PUT rejects invalid title icon path", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin-1" },
    });

    const response = await PUT(
      new Request("https://stylekit.top/api/admin/user-titles/11111111-1111-4111-8111-111111111111", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titleIconPath: "<svg>" }),
      }),
      { params: params("11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: "titleIconPath contains invalid characters. Use SVG path data only.",
    });
  });

  it("DELETE clears title config", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin-1" },
    });
    mockedRecordAdminAuditEvent.mockResolvedValue();

    const eq = vi.fn().mockResolvedValue({ error: null, count: 1 });
    const deleteFn = vi.fn().mockReturnValue({ eq });

    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ delete: deleteFn }),
    } as never);

    const response = await DELETE(
      new Request("https://stylekit.top/api/admin/user-titles/11111111-1111-4111-8111-111111111111", {
        method: "DELETE",
      }),
      { params: params("11111111-1111-4111-8111-111111111111") }
    );

    expect(response.status).toBe(200);
    expect(deleteFn).toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      success: true,
      deleted: 1,
    });
    expect(mockedRecordAdminAuditEvent).toHaveBeenCalledTimes(1);
  });
});
