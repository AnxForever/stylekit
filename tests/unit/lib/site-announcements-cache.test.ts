import { afterEach, describe, expect, it, vi } from "vitest";

// `server-only` is a compile-time boundary supplied by Next.js. Vitest runs
// the module in Node, where the marker has no runtime behavior.
vi.mock("server-only", () => ({}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import {
  clearSiteAnnouncementCache,
  getSiteAnnouncement,
} from "@/lib/site-announcements";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

type Locale = "zh-CN" | "en";

function makeRow(locale: Locale) {
  return {
    locale,
    enabled: true,
    title: locale === "en" ? "Fresh update" : "最新更新",
    body: locale === "en" ? "A fresh update is live." : "新内容已上线。",
    cta_label: null,
    cta_href: null,
    starts_at: null,
    ends_at: null,
    updated_at: "2026-08-10T00:00:00.000Z",
  };
}

function configureSupabase(options?: {
  reject?: boolean;
  error?: boolean;
}) {
  const queries: Array<{
    maybeSingle: ReturnType<typeof vi.fn>;
    locale?: Locale;
  }> = [];

  const from = vi.fn(() => {
    const query = {
      locale: undefined as Locale | undefined,
      select: vi.fn().mockReturnThis(),
      eq: vi.fn((_column: string, value: Locale) => {
        query.locale = value;
        return query;
      }),
      maybeSingle: vi.fn(async () => {
        if (options?.reject) throw new Error("temporary Supabase outage");
        return {
          data: options?.error ? null : makeRow(query.locale ?? "en"),
          error: options?.error ? { message: "database unavailable" } : null,
        };
      }),
    };
    queries.push(query);
    return query;
  });

  mockedGetSupabaseAdmin.mockReturnValue({ from } as never);
  return { from, queries };
}

afterEach(() => {
  clearSiteAnnouncementCache();
  vi.clearAllMocks();
});

describe("site announcement cache", () => {
  it("deduplicates sequential and concurrent reads for one locale", async () => {
    const { queries } = configureSupabase();

    const [first, concurrent] = await Promise.all([
      getSiteAnnouncement("en"),
      getSiteAnnouncement("en"),
    ]);
    const later = await getSiteAnnouncement("en");

    expect(first?.title).toBe("Fresh update");
    expect(concurrent).toEqual(first);
    expect(later).toEqual(first);
    expect(queries).toHaveLength(1);
    expect(queries[0]?.maybeSingle).toHaveBeenCalledTimes(1);
  });

  it("keeps Chinese and English entries in separate cache slots", async () => {
    const { queries } = configureSupabase();

    const [english, chinese] = await Promise.all([
      getSiteAnnouncement("en"),
      getSiteAnnouncement("zh-CN"),
    ]);

    expect(english?.locale).toBe("en");
    expect(chinese?.locale).toBe("zh-CN");
    expect(queries).toHaveLength(2);
    expect(queries.map((query) => query.locale)).toEqual(["en", "zh-CN"]);
  });

  it("allows an updated locale to invalidate its cached value", async () => {
    const { queries } = configureSupabase();

    await getSiteAnnouncement("en");
    clearSiteAnnouncementCache("en");
    await getSiteAnnouncement("en");

    expect(queries).toHaveLength(2);
  });

  it("falls back to the bundled changelog when Supabase fails", async () => {
    configureSupabase({ reject: true });

    const announcement = await getSiteAnnouncement("en");

    expect(announcement?.id).toMatch(/^changelog:/);
    expect(announcement?.enabled).toBe(true);
    expect(announcement?.ctaHref).toBe("/en/changelog");
  });
});
