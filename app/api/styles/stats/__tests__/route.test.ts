import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/analytics", () => ({
  getUsageStats: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

import { getUsageStats } from "@/lib/analytics";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { createClient } from "@supabase/supabase-js";
import type { StyleStatsPayload } from "@/lib/styles/catalog-stats";

const mockedGetUsageStats = vi.mocked(getUsageStats);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedCreateClient = vi.mocked(createClient);

const originalSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const originalServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface TableResult {
  data: unknown[] | null;
  error: { code?: string; message?: string } | null;
}

/** Awaitable stand-in for a Supabase query builder that also exposes limit(). */
function queryResult(result: TableResult) {
  return {
    limit: () => Promise.resolve(result),
    then: (resolve: (value: TableResult) => unknown) =>
      Promise.resolve(result).then(resolve),
  };
}

function supabaseStub(tables: Record<string, TableResult>) {
  return {
    from: (tableName: string) => ({
      select: () =>
        queryResult(
          tables[tableName] ?? {
            data: null,
            error: { code: "42P01", message: `relation ${tableName} does not exist` },
          }
        ),
    }),
  };
}

function usage(styles: Record<string, { pageViews: number; apiCalls: number }>) {
  return {
    styles: Object.fromEntries(
      Object.entries(styles).map(([slug, counters]) => [
        slug,
        {
          slug,
          apiCalls: counters.apiCalls,
          pageViews: counters.pageViews,
          total: counters.apiCalls + counters.pageViews,
          lastAccessed: "2026-08-17T00:00:00.000Z",
        },
      ])
    ),
    combinations: {},
    updatedAt: "2026-08-17T00:00:00.000Z",
  };
}

/** Fresh module instance so the route's TTL cache starts empty. */
async function loadRoute() {
  vi.resetModules();
  return import("@/app/api/styles/stats/route");
}

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key";
  mockedGetUsageStats.mockReturnValue(usage({}));
});

afterEach(() => {
  vi.clearAllMocks();
  if (originalSupabaseUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  } else {
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalSupabaseUrl;
  }
  if (originalServiceRoleKey === undefined) {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  } else {
    process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceRoleKey;
  }
});

describe("GET /api/styles/stats", () => {
  it("serves usage counters and flags Supabase signals as degraded when unconfigured", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedGetUsageStats.mockReturnValue(
      usage({ glassmorphism: { pageViews: 900, apiCalls: 100 } })
    );

    const { GET } = await loadRoute();
    const response = await GET();
    const body = (await response.json()) as StyleStatsPayload;

    expect(response.status).toBe(200);
    expect(body.stats.glassmorphism).toMatchObject({
      views: 900,
      usage: 1000,
      favorites: 0,
      totalRatings: 0,
    });
    expect(body.degraded).toEqual(["favorites", "ratings"]);
    expect(mockedCreateClient).not.toHaveBeenCalled();
  });

  it("aggregates favorite rows across candidate tables and merges rating summaries", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedGetUsageStats.mockReturnValue(
      usage({ editorial: { pageViews: 10, apiCalls: 5 } })
    );
    mockedCreateClient.mockReturnValue(
      supabaseStub({
        user_favorites: {
          data: [
            { style_slug: "editorial" },
            { style_slug: "editorial" },
            { style_slug: "neumorphism" },
            { style_slug: null },
          ],
          error: null,
        },
        style_favorites: {
          data: [{ style_slug: "editorial" }],
          error: null,
        },
        style_rating_summary: {
          data: [
            { style_slug: "editorial", average_rating: "5.0", total_ratings: "2" },
            { style_slug: null, average_rating: 4, total_ratings: 1 },
          ],
          error: null,
        },
      }) as never
    );

    const { GET } = await loadRoute();
    const body = (await (await GET()).json()) as StyleStatsPayload;

    expect(body.degraded).toEqual([]);
    expect(body.stats.editorial).toMatchObject({
      views: 10,
      usage: 15,
      favorites: 3,
      averageRating: 5,
      totalRatings: 2,
    });
    // A style with favorites but no usage counter still appears.
    expect(body.stats.neumorphism?.favorites).toBe(1);
    // Rows without a slug are ignored rather than creating an empty bucket.
    expect(Object.keys(body.stats)).toEqual(["editorial", "neumorphism"]);
  });

  it("degrades each signal independently when its query fails", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedCreateClient.mockReturnValue(
      supabaseStub({
        style_rating_summary: {
          data: [{ style_slug: "editorial", average_rating: 4, total_ratings: 3 }],
          error: null,
        },
      }) as never
    );

    const { GET } = await loadRoute();
    const body = (await (await GET()).json()) as StyleStatsPayload;

    expect(body.degraded).toEqual(["favorites"]);
    expect(body.stats.editorial?.averageRating).toBe(4);
  });

  it("reuses the cached payload inside the TTL", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedCreateClient.mockReturnValue(
      supabaseStub({
        user_favorites: { data: [{ style_slug: "editorial" }], error: null },
        style_rating_summary: { data: [], error: null },
      }) as never
    );

    const { GET } = await loadRoute();
    const first = (await (await GET()).json()) as StyleStatsPayload;
    const second = (await (await GET()).json()) as StyleStatsPayload;

    expect(second.generatedAt).toBe(first.generatedAt);
    expect(mockedCreateClient).toHaveBeenCalledTimes(1);
  });

  it("sets a cache header so repeat catalog visits do not re-query", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(false);

    const { GET } = await loadRoute();
    const response = await GET();

    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=60, s-maxage=300"
    );
  });
});
