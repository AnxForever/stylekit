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

import { GET as getComments } from "@/app/api/profile/comments/route";
import { GET as getRatings } from "@/app/api/profile/ratings/route";
import { GET as getSubmissions } from "@/app/api/profile/submissions/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { createClient } from "@supabase/supabase-js";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedCreateClient = vi.mocked(createClient);

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
