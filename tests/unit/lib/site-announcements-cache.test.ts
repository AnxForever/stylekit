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
  toSiteAnnouncement,
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
    updated_at: "2026-10-21T23:00:00.000Z",
  };
}

function configureSupabase(options?: {
  reject?: boolean;
  error?: boolean;
  olderCampaign?: boolean;
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
          data: options?.error ? null : { ...makeRow(query.locale ?? "en"), ...(options?.olderCampaign ? { updated_at: "2026-08-10T00:00:00Z" } : {}) },
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
    expect(announcement?.ctaHref).toBe("/en/styles/quantized-line-field");
  });

  it("gives each publication its own dismissal identity", () => {
    const first = toSiteAnnouncement(makeRow("en"));
    const later = toSiteAnnouncement({ ...makeRow("en"), updated_at: "2026-10-21T06:22:29.000Z" });
    expect(later.id).not.toBe(first.id);
    expect(toSiteAnnouncement(makeRow("en")).id).toBe(first.id);
    const legacy = { ...makeRow("en"), updated_at: null };
    expect(toSiteAnnouncement({ ...legacy, title: "Another release" }).id).not.toBe(toSiteAnnouncement(legacy).id);
  });

  it("includes a new bundled release when the configured campaign is older", async () => {
    configureSupabase({ olderCampaign: true });
    const announcement = await getSiteAnnouncement("zh-CN");
    expect(announcement?.title).toContain("量化线场上线");
    expect(announcement?.ctaHref).toBe("/zh/styles/quantized-line-field");
  });

  it("keeps one dismissal identity for the bundled release and its matching published row", async () => {
    configureSupabase({ reject: true });
    const release = (await getSiteAnnouncement("en"))!;
    const published = toSiteAnnouncement({ ...makeRow("en"), title: release.title, body: release.body, cta_label: release.ctaLabel, cta_href: release.ctaHref });
    expect(published.id).toBe(release.id);
  });
});
