import type { StyleInsights } from "@/lib/admin/style-insights";

export interface StyleInsightLabel {
  slug: string;
  name: string;
  nameEn: string;
}

export type StyleInsightReportRow = StyleInsights["styles"][number] &
  StyleInsightLabel & {
    ctr: number | null;
    useRate: number | null;
  };

export type StyleInsightSort = "views" | "uses" | "exposure" | "ctr" | "useRate";

const EMPTY_COUNTS: Omit<StyleInsights["styles"][number], "slug"> = {
  impressions: 0,
  exposedVisitors: 0,
  clicks: 0,
  clickVisitors: 0,
  detailViews: 0,
  detailVisitors: 0,
  showcaseViews: 0,
  showcaseVisitors: 0,
  viewVisitors: 0,
  copies: 0,
  copyVisitors: 0,
  exports: 0,
  exportVisitors: 0,
  favoriteAdds: 0,
  favoriteRemoves: 0,
  favoriteVisitors: 0,
  accountFavoriteAdds: 0,
  localFavoriteAdds: 0,
  activeMs: 0,
  engagedVisitors: 0,
  maxScrollPercent: 0,
  matchedClickVisitors: 0,
  matchedUseVisitors: 0,
  unidentifiedEvents: 0,
};

/** Only matched, ordered visitors belong in the numerator of these rates. */
function matchedRate(matched: number, eligible: number): number | null {
  if (
    !Number.isFinite(matched) || !Number.isFinite(eligible) ||
    eligible <= 0 || matched < 0 || matched > eligible
  ) return null;
  return (matched / eligible) * 100;
}

function sortValue(row: StyleInsightReportRow, sort: StyleInsightSort): number {
  switch (sort) {
    case "views": return row.viewVisitors;
    case "uses": return row.copies + row.exports;
    case "exposure": return row.impressions;
    case "ctr": return row.ctr ?? -1;
    case "useRate": return row.useRate ?? -1;
  }
}

export function buildStyleInsightRows(
  styles: StyleInsightLabel[],
  report?: StyleInsights,
  sort: StyleInsightSort = "uses",
): StyleInsightReportRow[] {
  // An unavailable backend is not evidence that every style has zero traffic.
  if (!report) return [];

  const labelsBySlug = new Map(styles.map((style) => [style.slug, style]));
  const countsBySlug = new Map(report.styles.map((style) => [style.slug, style]));
  for (const { slug } of report.styles) {
    if (!labelsBySlug.has(slug)) {
      labelsBySlug.set(slug, { slug, name: slug, nameEn: slug });
    }
  }

  return [...labelsBySlug.values()].map((label) => {
    const counts = countsBySlug.get(label.slug) ?? EMPTY_COUNTS;
    return {
      ...counts,
      ...label,
      ctr: matchedRate(counts.matchedClickVisitors, counts.exposedVisitors),
      useRate: matchedRate(counts.matchedUseVisitors, counts.viewVisitors),
    };
  }).sort((a, b) => sortValue(b, sort) - sortValue(a, sort) || a.slug.localeCompare(b.slug));
}

type CsvValue = string | number | null;

function escapeCsv(value: CsvValue): string {
  if (value === null) return "";
  // Spreadsheets may trim whitespace/control characters before interpreting a
  // formula. Prefix an apostrophe before that entire string, not just '='.
  let start = 0;
  if (typeof value === "string") {
    while (start < value.length && (value.charCodeAt(start) <= 32 || /\s/.test(value[start]))) {
      start += 1;
    }
  }
  const text = typeof value === "string" && /^[=+\-@]/.test(value.slice(start))
    ? `'${value}`
    : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function createStyleInsightsCsv(
  rows: StyleInsightReportRow[],
  report: StyleInsights,
): string {
  const columns: Array<[string, (row: StyleInsightReportRow) => CsvValue]> = [
    ["measurement_version", () => report.version],
    ["source", () => report.source],
    ["range_start", () => report.range.start],
    ["range_end", () => report.range.end],
    ["timezone", () => report.range.timezone],
    ["generated_at", () => report.generatedAt],
    ["first_collected_at", () => report.firstCollectedAt],
    ["retention_days", () => report.retentionDays],
    ["style_slug", (row) => row.slug],
    ["style_name_zh", (row) => row.name],
    ["style_name_en", (row) => row.nameEn],
    ["impressions", (row) => row.impressions],
    ["exposed_visitors", (row) => row.exposedVisitors],
    ["clicks", (row) => row.clicks],
    ["click_visitors", (row) => row.clickVisitors],
    ["detail_views", (row) => row.detailViews],
    ["detail_visitors", (row) => row.detailVisitors],
    ["showcase_views", (row) => row.showcaseViews],
    ["showcase_visitors", (row) => row.showcaseVisitors],
    ["view_visitors", (row) => row.viewVisitors],
    ["successful_copies", (row) => row.copies],
    ["copy_visitors", (row) => row.copyVisitors],
    ["exports", (row) => row.exports],
    ["export_visitors", (row) => row.exportVisitors],
    ["favorite_adds", (row) => row.favoriteAdds],
    ["favorite_removes", (row) => row.favoriteRemoves],
    ["favorite_visitors", (row) => row.favoriteVisitors],
    ["account_favorite_adds", (row) => row.accountFavoriteAdds],
    ["local_favorite_adds", (row) => row.localFavoriteAdds],
    ["active_ms", (row) => row.activeMs],
    ["engaged_visitors", (row) => row.engagedVisitors],
    ["max_scroll_percent", (row) => row.maxScrollPercent],
    ["matched_click_visitors", (row) => row.matchedClickVisitors],
    ["click_rate_percent", (row) => row.ctr],
    ["matched_use_visitors", (row) => row.matchedUseVisitors],
    ["use_rate_percent", (row) => row.useRate],
    ["unidentified_events", (row) => row.unidentifiedEvents],
  ];
  return [
    columns.map(([name]) => escapeCsv(name)).join(","),
    ...rows.map((row) => columns.map(([, getValue]) => escapeCsv(getValue(row))).join(",")),
  ].join("\r\n");
}
