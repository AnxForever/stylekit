import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/auth/admin-policy", () => ({
  getAdminUserIds: vi.fn(),
}));

import { GET as getComments } from "@/app/api/profile/comments/route";
import { GET as getRatings } from "@/app/api/profile/ratings/route";
import { GET as getSubmissions } from "@/app/api/profile/submissions/route";
import { GET as getTitle } from "@/app/api/profile/title/route";
import { getAdminUserIds } from "@/lib/auth/admin-policy";
import { EMPEROR_TITLE_TOKEN } from "@/lib/auth/user-title-policy";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { createClient } from "@supabase/supabase-js";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedCreateClient = vi.mocked(createClient);
const mockedGetAdminUserIds = vi.mocked(getAdminUserIds);

function makeReadChain(result: unknown) {
  const limit = vi.fn().mockResolvedValue(result);
  const order = vi.fn().mockReturnValue({ limit });
  const eq = vi.fn().mockReturnValue({ order });
  const inFn = vi.fn().mockReturnValue({ order });
  const select = vi.fn().mockReturnValue({ eq, in: inFn });
  return { select, eq, in: inFn, order, limit };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("profile routes", () => {
  it("title endpoint requires authentication", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    const response = await getTitle();
    expect(response.status).toBe(401);
  });

  it("title endpoint resolves custom title rule", async () => {
    mockedGetAdminUserIds.mockReturnValue([]);
    mockedGetServerUser.mockResolvedValue({
      id: "user-9",
      user_metadata: { seq_id: 12, user_title: "元老用户" },
    } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const inFn = vi.fn().mockResolvedValue({
      data: [
        {
          user_id: "user-9",
          custom_title: "VIP",
          title_color: "#ff5500",
          is_owner: false,
          title_enabled: true,
          updated_at: null,
          updated_by: null,
        },
      ],
      error: null,
    });
    const select = vi.fn().mockReturnValue({ in: inFn });

    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select }),
    } as never);

    const response = await getTitle();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      title: "VIP",
      titleColor: "#ff5500",
      seqId: 12,
    });
  });

  it("title endpoint resolves built-in emperor token from seq id", async () => {
    mockedGetAdminUserIds.mockReturnValue([]);
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { seq_id: 1 },
    } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const inFn = vi.fn().mockResolvedValue({
      data: [],
      error: null,
    });
    const select = vi.fn().mockReturnValue({ in: inFn });

    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue({ select }),
    } as never);

    const response = await getTitle();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      title: EMPEROR_TITLE_TOKEN,
      titleColor: null,
      seqId: 1,
    });
  });

  it("title endpoint prefers seq id from user_seq_ids over metadata seq_id", async () => {
    mockedGetAdminUserIds.mockReturnValue([]);
    mockedGetServerUser.mockResolvedValue({
      id: "11111111-1111-4111-8111-111111111111",
      user_metadata: { seq_id: 50 },
    } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const seqMaybeSingle = vi.fn().mockResolvedValue({
      data: { seq_id: 150 },
      error: null,
    });
    const seqEq = vi.fn().mockReturnValue({ maybeSingle: seqMaybeSingle });
    const seqSelect = vi.fn().mockReturnValue({ eq: seqEq });

    const titleIn = vi.fn().mockResolvedValue({
      data: [],
      error: null,
    });
    const titleSelect = vi.fn().mockReturnValue({ in: titleIn });

    mockedCreateClient
      .mockReturnValueOnce({
        from: vi.fn().mockReturnValue({ select: seqSelect }),
      } as never)
      .mockReturnValueOnce({
        from: vi.fn().mockReturnValue({ select: titleSelect }),
      } as never);

    const response = await getTitle();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      title: null,
      titleColor: null,
      seqId: 150,
    });
  });

  it("comments endpoint requires authentication", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    const response = await getComments();
    expect(response.status).toBe(401);
  });

  it("comments endpoint returns merged user comments from user_id and legacy session", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const modernChain = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({
              data: [
                {
                  id: "c-modern",
                  style_slug: "neo-brutalist",
                  content: "modern",
                  created_at: "2026-01-03",
                },
              ],
              error: null,
            }),
          }),
        }),
      }),
    };

    const legacyChain = {
      select: vi.fn().mockReturnValue({
        in: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({
              data: [
                {
                  id: "c-legacy",
                  style_slug: "editorial",
                  content: "legacy",
                  created_at: "2026-01-02",
                },
              ],
              error: null,
            }),
          }),
        }),
      }),
    };

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce(modernChain)
        .mockReturnValueOnce(legacyChain),
    } as never);

    const response = await getComments();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      comments: [
        {
          id: "c-modern",
          style_slug: "neo-brutalist",
          content: "modern",
          created_at: "2026-01-03",
        },
        {
          id: "c-legacy",
          style_slug: "editorial",
          content: "legacy",
          created_at: "2026-01-02",
        },
      ],
    });
  });

  it("comments endpoint falls back to legacy session when user_id column is missing", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-1" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const modernChain = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({
              data: null,
              error: {
                code: "42703",
                message: "column style_comments.user_id does not exist",
              },
            }),
          }),
        }),
      }),
    };

    const legacyChain = {
      select: vi.fn().mockReturnValue({
        in: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({
              data: [
                {
                  id: "c-legacy",
                  style_slug: "editorial",
                  content: "legacy",
                  created_at: "2026-01-02",
                },
              ],
              error: null,
            }),
          }),
        }),
      }),
    };

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce(modernChain)
        .mockReturnValueOnce(legacyChain),
    } as never);

    const response = await getComments();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      comments: [
        {
          id: "c-legacy",
          style_slug: "editorial",
          content: "legacy",
          created_at: "2026-01-02",
        },
      ],
    });
  });

  it("ratings endpoint requires authentication", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    const response = await getRatings();
    expect(response.status).toBe(401);
  });

  it("ratings endpoint returns user ratings", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    const chain = makeReadChain({
      data: [{ id: "r1", style_slug: "neo-brutalist", rating: 5, created_at: "2026-01-01" }],
      error: null,
    });
    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue(chain),
    } as never);

    const response = await getRatings();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      ratings: [{ id: "r1", style_slug: "neo-brutalist", rating: 5, created_at: "2026-01-01" }],
    });
  });

  it("ratings endpoint falls back to legacy session ratings and keeps latest per style", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-2" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);

    const modernChain = {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({
              data: null,
              error: {
                code: "42703",
                message: "column style_ratings.user_id does not exist",
              },
            }),
          }),
        }),
      }),
    };

    const legacyChain = {
      select: vi.fn().mockReturnValue({
        in: vi.fn().mockReturnValue({
          order: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue({
              data: [
                { id: "r-old", style_slug: "editorial", rating: 3, created_at: "2026-01-02" },
                { id: "r-new", style_slug: "editorial", rating: 5, created_at: "2026-01-03" },
              ],
              error: null,
            }),
          }),
        }),
      }),
    };

    mockedCreateClient.mockReturnValue({
      from: vi
        .fn()
        .mockReturnValueOnce(modernChain)
        .mockReturnValueOnce(legacyChain),
    } as never);

    const response = await getRatings();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      ratings: [{ id: "r-new", style_slug: "editorial", rating: 5, created_at: "2026-01-03" }],
    });
  });

  it("submissions endpoint requires authentication", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    const response = await getSubmissions();
    expect(response.status).toBe(401);
  });

  it("submissions endpoint returns user submissions", async () => {
    mockedGetServerUser.mockResolvedValue({ id: "user-3" } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    const chain = makeReadChain({
      data: [{ id: "s1", slug: "neo-brutalist", status: "pending", submitted_at: "2026-01-01" }],
      error: null,
    });
    mockedCreateClient.mockReturnValue({
      from: vi.fn().mockReturnValue(chain),
    } as never);

    const response = await getSubmissions();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      submissions: [{ id: "s1", slug: "neo-brutalist", status: "pending", submitted_at: "2026-01-01" }],
    });
  });
});
