import { describe, expect, it } from "vitest";
import type { StyleInsights } from "@/lib/admin/style-insights";
import {
  buildStyleInsightRows,
  createStyleInsightsCsv,
  type StyleInsightLabel,
} from "@/lib/admin/style-insights-report";

const styles: StyleInsightLabel[] = [
  { slug: "quiet-luxury", name: "静谧奢华", nameEn: "Quiet Luxury" },
  { slug: "other-style", name: "其他风格", nameEn: "Other Style" },
];

const countedStyle: StyleInsights["styles"][number] = {
  slug: "quiet-luxury",
  impressions: 100,
  exposedVisitors: 20,
  clicks: 50,
  clickVisitors: 10,
  detailViews: 24,
  detailVisitors: 6,
  showcaseViews: 8,
  showcaseVisitors: 4,
  viewVisitors: 8,
  copies: 14,
  copyVisitors: 6,
  exports: 2,
  exportVisitors: 1,
  favoriteAdds: 3,
  favoriteRemoves: 1,
  favoriteVisitors: 2,
  accountFavoriteAdds: 1,
  localFavoriteAdds: 2,
  activeMs: 60_000,
  engagedVisitors: 2,
  maxScrollPercent: 75,
  matchedClickVisitors: 5,
  matchedUseVisitors: 2,
  unidentifiedEvents: 3,
};

const report: StyleInsights = {
  version: 2,
  source: "first_party",
  retentionDays: 90,
  range: {
    start: "2026-11-07T00:00:00.000Z",
    end: "2026-11-14T00:00:00.000Z",
    timezone: "Asia/Shanghai",
  },
  generatedAt: "2026-11-14T00:00:01.000Z",
  firstCollectedAt: "2026-11-13T00:00:00.000Z",
  traffic: { pageViews: 40, visitors: 10, visits: 20, unidentifiedPageViews: 5 },
  styles: [countedStyle],
  sources: [],
};

describe("style insights reporting", () => {
  it("does not fabricate zero traffic if the report failed to load", () => {
    expect(buildStyleInsightRows(styles)).toEqual([]);
    const rows = buildStyleInsightRows(styles, { ...report, styles: [] });
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ impressions: 0, viewVisitors: 0, ctr: null, useRate: null });
  });

  it("uses ordered matched visitors for both rates and does not sum stage visitors", () => {
    const [row] = buildStyleInsightRows(styles, report);
    expect(row).toMatchObject({ ctr: 25, useRate: 25, viewVisitors: 8 });
    expect(row.ctr).not.toBe(countedStyle.clicks / countedStyle.impressions * 100);
    expect(row.useRate).not.toBe((countedStyle.copyVisitors + countedStyle.exportVisitors) / countedStyle.viewVisitors * 100);
  });

  it("returns null rather than a misleading zero or clamped rate for invalid denominators", () => {
    const [row] = buildStyleInsightRows(styles, {
      ...report,
      styles: [{ ...countedStyle, exposedVisitors: 0, matchedUseVisitors: 9 }],
    });
    expect(row.ctr).toBeNull();
    expect(row.useRate).toBeNull();
  });

  it("preserves observed community styles and fills only missing catalog styles", () => {
    const rows = buildStyleInsightRows(styles, {
      ...report,
      styles: [...report.styles, { ...countedStyle, slug: "community-style", copies: 20 }],
    });
    expect(rows.map((row) => row.slug)).toEqual(["community-style", "quiet-luxury", "other-style"]);
    expect(rows[0]).toMatchObject({ name: "community-style", nameEn: "community-style", copies: 20 });
    expect(rows[2]).toMatchObject({ name: "其他风格", copies: 0, unidentifiedEvents: 0, favoriteAdds: 0, favoriteRemoves: 0, favoriteVisitors: 0, accountFavoriteAdds: 0, localFavoriteAdds: 0 });
  });

  it("sorts by the selected metric without changing the original report", () => {
    const other = { ...countedStyle, slug: "other-style", copies: 0, exports: 0, viewVisitors: 15, matchedClickVisitors: 10 };
    const data = { ...report, styles: [countedStyle, other] };
    expect(buildStyleInsightRows(styles, data, "views")[0].slug).toBe("other-style");
    expect(buildStyleInsightRows(styles, data, "ctr")[0].slug).toBe("other-style");
    expect(buildStyleInsightRows(styles, data, "uses")[0].slug).toBe("quiet-luxury");
    expect(data.styles.map((row) => row.slug)).toEqual(["quiet-luxury", "other-style"]);
  });

  it("keeps an identifiable zero conversion distinct from an unknown rate", () => {
    const rows = buildStyleInsightRows(styles, {
      ...report,
      styles: [{ ...countedStyle, matchedClickVisitors: 0, matchedUseVisitors: 0 }],
    }, "ctr");
    expect(rows[0]).toMatchObject({ slug: "quiet-luxury", ctr: 0, useRate: 0 });
    expect(rows[1]).toMatchObject({ slug: "other-style", ctr: null, useRate: null });
  });

  it("exports range provenance and every event/visitor count without losing unknown rates", () => {
    const rows = buildStyleInsightRows(styles, report);
    const csv = createStyleInsightsCsv(rows, report);
    expect(csv.split("\r\n")).toHaveLength(3);
    expect(csv).toContain("measurement_version,source,range_start,range_end,timezone,generated_at,first_collected_at");
    expect(csv).toContain("2,first_party,2026-11-07T00:00:00.000Z,2026-11-14T00:00:00.000Z,Asia/Shanghai");
    expect(csv).toContain("matched_click_visitors,click_rate_percent,matched_use_visitors,use_rate_percent,unidentified_events");
    expect(csv).toContain("retention_days");
    expect(csv).toContain("favorite_adds,favorite_removes,favorite_visitors,account_favorite_adds,local_favorite_adds");
    expect(csv.split("\r\n")[2]).toMatch(/,0,,0,,0$/);
  });

  it("neutralizes formulas after leading whitespace and controls and quotes commas/newlines", () => {
    const dangerousLabels = [
      { slug: "=slug", name: "\t\u0000=SUM(1,2)", nameEn: " +1" },
      { slug: "line", name: '名字, "引号"', nameEn: "Name\ncontinued" },
    ];
    const csv = createStyleInsightsCsv(buildStyleInsightRows(dangerousLabels, { ...report, styles: [] }), report);
    expect(csv).toContain("'=slug");
    expect(csv).toContain("\"'\t\u0000=SUM(1,2)\"");
    expect(csv).toContain("' +1");
    expect(csv).toContain('"名字, ""引号"""');
    expect(csv).toContain('"Name\ncontinued"');
  });
});
