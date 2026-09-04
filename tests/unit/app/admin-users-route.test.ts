import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET } from "@/app/api/admin/users/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  EARLY_USER_TITLE_TOKEN,
  SITE_OWNER_TITLE_TOKEN,
} from "@/lib/auth/user-title-policy";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

const USER_ONE_ID = "11111111-1111-4111-8111-111111111111";
const USER_TWO_ID = "22222222-2222-4222-8222-222222222222";
const USER_THREE_ID = "33333333-3333-4333-8333-333333333333";

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/admin/users", () => {
  it("returns auth error when access is denied", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/users"));

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("shapes the aggregation RPC into the admin users payload", async () => {
    // The route reads one SECURITY DEFINER aggregation (migration 036) rather
    // than joining tables in Node, so the fixture is what that function returns.
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true } as never);
    mockedGetSupabaseAdmin.mockReturnValue({
      rpc: vi.fn(async () => ({
        data: [
          {
            user_id: USER_ONE_ID,
            email: "owner@example.com",
            author_name: "Auth Name",
            avatar_url: "https://cdn.example.com/avatar.png",
            comment_count: 1,
            rating_count: 1,
            favorite_count: 1,
            submission_count: 1,
            last_active: "2026-02-21T03:00:00.000Z",
            seq_id: 3,
            custom_title: null,
            title_color: null,
            title_icon_path: null,
            is_owner: true,
            title_enabled: true,
            profile_title: null,
          },
          {
            user_id: USER_TWO_ID,
            email: "early@example.com",
            author_name: "Early Bird",
            avatar_url: null,
            comment_count: 0,
            rating_count: 2,
            favorite_count: 0,
            submission_count: 0,
            last_active: "2026-02-21T02:00:00.000Z",
            seq_id: 7,
            custom_title: null,
            title_color: null,
            title_icon_path: null,
            is_owner: false,
            title_enabled: true,
            profile_title: null,
          },
          {
            user_id: USER_THREE_ID,
            email: null,
            author_name: null,
            avatar_url: null,
            comment_count: 0,
            rating_count: 0,
            favorite_count: 0,
            submission_count: 0,
            last_active: null,
            seq_id: null,
            custom_title: null,
            title_color: null,
            title_icon_path: null,
            is_owner: false,
            title_enabled: true,
            profile_title: null,
          },
        ],
        error: null,
      })),
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/users?limit=20&offset=0"),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.total).toBe(3);
    expect(payload.users).toHaveLength(3);

    expect(payload.users[0].userId).toBe(USER_ONE_ID);
    expect(payload.users[0].authorName).toBe("Auth Name");
    expect(payload.users[0].avatarUrl).toBe("https://cdn.example.com/avatar.png");
    expect(payload.users[0].commentCount).toBe(1);
    expect(payload.users[0].ratingCount).toBe(1);
    expect(payload.users[0].favoriteCount).toBe(1);
    expect(payload.users[0].submissionCount).toBe(1);
    expect(payload.users[0].lastActive).toBe("2026-02-21T03:00:00.000Z");
    expect(payload.users[0].resolvedTitle).toBe(SITE_OWNER_TITLE_TOKEN);

    // A low seq id earns the early-user badge without any manual title.
    expect(payload.users[1].seqId).toBe(7);
    expect(payload.users[1].resolvedTitle).toBe(EARLY_USER_TITLE_TOKEN);

    // Sorted by last activity, so the row that never acted lands last and still
    // gets a readable fallback name rather than a bare uuid.
    expect(payload.users[2].userId).toBe(USER_THREE_ID);
    expect(payload.users[2].lastActive).toBe("");
    expect(payload.users[2].authorName).toBe(`User ${USER_THREE_ID.slice(0, 8)}`);
  });

  it("never leaks the email it searches on", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true } as never);
    mockedGetSupabaseAdmin.mockReturnValue({
      rpc: vi.fn(async () => ({
        data: [
          {
            user_id: USER_ONE_ID,
            email: "secret@example.com",
            author_name: null,
            avatar_url: null,
            comment_count: 0,
            rating_count: 0,
            favorite_count: 0,
            submission_count: 0,
            last_active: null,
            seq_id: null,
            custom_title: null,
            title_color: null,
            title_icon_path: null,
            is_owner: false,
            title_enabled: true,
            profile_title: null,
          },
        ],
        error: null,
      })),
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/users?search=secret"),
    );
    const payload = await response.json();

    expect(payload.total).toBe(1);
    // The address drives search server-side but must not reach the client.
    expect(JSON.stringify(payload)).not.toContain("secret@example.com");
    expect(payload.users[0].authorName).toBe("secret");
  });

  it("fails loudly when the aggregation cannot be read", async () => {
    // A blank user table would read as "no users at all", which is worse than
    // an error the console can surface.
    mockedCheckAdminApiAccess.mockResolvedValue({ allowed: true } as never);
    mockedGetSupabaseAdmin.mockReturnValue({
      rpc: vi.fn(async () => ({ data: null, error: { message: "boom" } })),
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/users"),
    );

    expect(response.status).toBe(500);
  });
});
