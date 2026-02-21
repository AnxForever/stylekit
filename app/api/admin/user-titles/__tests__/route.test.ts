import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET } from "@/app/api/admin/user-titles/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/user-titles", () => {
  it("returns auth error when access is denied", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/user-titles"));

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
  });

  it("returns paged title rules", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });

    const range = vi.fn().mockResolvedValue({
      data: [
        {
          user_id: "11111111-1111-4111-8111-111111111111",
          custom_title: "VIP",
          title_color: "#ff5500",
          title_icon_path: "M0 0 L10 10 Z",
          is_owner: false,
          title_enabled: true,
          updated_at: "2026-02-21T00:00:00.000Z",
          updated_by: "admin",
        },
      ],
      count: 1,
      error: null,
    });
    const order = vi.fn().mockReturnValue({ range });
    const select = vi.fn().mockReturnValue({ order });

    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ select }),
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/user-titles?limit=10&offset=0")
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      items: [
        {
          userId: "11111111-1111-4111-8111-111111111111",
          customTitle: "VIP",
          titleColor: "#ff5500",
          titleIconPath: "M0 0 L10 10 Z",
          isOwner: false,
          titleEnabled: true,
          updatedAt: "2026-02-21T00:00:00.000Z",
          updatedBy: "admin",
        },
      ],
      total: 1,
      limit: 10,
      offset: 0,
    });
  });
});
