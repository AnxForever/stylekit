import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET } from "@/app/api/admin/users/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
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

  it("merges auth users with legacy session-based social activity", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "user", id: "admin" },
    });

    const listUsers = vi.fn(
      async ({ page }: { page: number; perPage: number }) => {
        if (page === 1) {
          return {
            data: {
              users: [
                {
                  id: USER_ONE_ID,
                  email: "author@example.com",
                  created_at: "2026-02-20T01:00:00.000Z",
                  last_sign_in_at: "2026-02-20T12:00:00.000Z",
                  user_metadata: {
                    full_name: "Auth Name",
                    avatar_url: "https://cdn.example.com/avatar.png",
                  },
                },
                {
                  id: USER_TWO_ID,
                  email: "guest@example.com",
                  created_at: "2026-02-19T09:00:00.000Z",
                  last_sign_in_at: null,
                  user_metadata: {
                    name: "Guest User",
                  },
                },
              ],
            },
            error: null,
          };
        }

        return { data: { users: [] }, error: null };
      }
    );

    const tableResponses: Record<
      string,
      { data: unknown[] | null; error: { code?: string; message?: string } | null }
    > = {
      style_comments: {
        data: [
          {
            session_id: `user:${USER_ONE_ID}`,
            author_name: "Legacy Comment Name",
            created_at: "2026-02-21T00:00:00.000Z",
          },
        ],
        error: null,
      },
      style_ratings: {
        data: [
          {
            session_id: `user:${USER_ONE_ID}`,
            created_at: "2026-02-21T01:00:00.000Z",
          },
          {
            user_id: USER_THREE_ID,
            created_at: "2026-02-21T02:30:00.000Z",
          },
          {
            session_id: "user:not-a-uuid",
            created_at: "2026-02-21T02:45:00.000Z",
          },
        ],
        error: null,
      },
      user_favorites: {
        data: [
          {
            session_id: `user:${USER_ONE_ID}`,
            style_slug: "editorial",
            created_at: "2026-02-21T02:00:00.000Z",
          },
        ],
        error: null,
      },
      style_favorites: {
        data: null,
        error: {
          code: "PGRST205",
          message: "Could not find the table 'public.style_favorites' in the schema cache",
        },
      },
      submissions: {
        data: [
          {
            user_id: USER_ONE_ID,
            submitted_at: "2026-02-21T03:00:00.000Z",
          },
        ],
        error: null,
      },
      style_submissions: {
        data: null,
        error: {
          code: "PGRST205",
          message: "Could not find the table 'public.style_submissions' in the schema cache",
        },
      },
    };

    const fromMock = vi.fn((tableName: string) => ({
      select: vi
        .fn()
        .mockResolvedValue(tableResponses[tableName] ?? { data: [], error: null }),
    }));

    mockedGetSupabaseAdmin.mockReturnValue({
      from: fromMock,
      auth: {
        admin: {
          listUsers,
        },
      },
    } as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/users?limit=20&offset=0")
    );

    expect(response.status).toBe(200);
    const payload = await response.json();

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

    const secondUser = payload.users.find(
      (item: { userId: string }) => item.userId === USER_TWO_ID
    );
    expect(secondUser).toBeTruthy();
    expect(secondUser.commentCount).toBe(0);
    expect(secondUser.favoriteCount).toBe(0);

    const thirdUser = payload.users.find(
      (item: { userId: string }) => item.userId === USER_THREE_ID
    );
    expect(thirdUser).toBeTruthy();
    expect(thirdUser.authorName).toBe("User 33333333");
    expect(thirdUser.ratingCount).toBe(1);

    const hasInvalidLegacyId = payload.users.some(
      (item: { userId: string }) => item.userId === "not-a-uuid"
    );
    expect(hasInvalidLegacyId).toBe(false);

    const searchByEmailResponse = await GET(
      new Request(
        "https://stylekit.top/api/admin/users?limit=20&offset=0&search=guest@example.com"
      )
    );

    expect(searchByEmailResponse.status).toBe(200);
    const searchByEmailPayload = await searchByEmailResponse.json();
    expect(searchByEmailPayload.total).toBe(1);
    expect(searchByEmailPayload.users[0].userId).toBe(USER_TWO_ID);
  });
});
