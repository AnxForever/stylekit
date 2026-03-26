import { stylesMeta } from "@/lib/styles/meta";

export type DashboardRange = "24h" | "7d" | "30d" | "90d";

export interface DashboardEventRow {
  style_slug: string | null;
  event_type: string | null;
  event_data?: Record<string, unknown> | null;
  created_at: string;
  session_id: string | null;
}

export interface DashboardContentSummary {
  comments: number;
  ratings: number;
  favorites: number;
  submissionsTotal: number;
  submissionsPending: number;
  submissionsApproved: number;
  submissionsRejected: number;
  adminActions: number;
}

export interface DashboardContentTrendPoint {
  date: string;
  comments: number;
  ratings: number;
  favorites: number;
}

export interface DashboardData {
  totalEvents: number;
  totalStyles: number;
  uniqueSessions: number;
  pageViews: number;
  visitors: number;
  bounceRate: number | null;
  avgEventsPerDay: number;
  topStyles: { slug: string; count: number; category: string | null }[];
  topCategories: { category: string; count: number }[];
  eventsByType: { type: string; count: number }[];
  recentActivity: { date: string; count: number }[];
  peakDay: { date: string | null; count: number };
  trend: {
    currentTotal: number;
    previousTotal: number;
    deltaPct: number | null;
    windowLabel: string;
  };
  activityBreakdown: {
    views: number;
    exports: number;
    copies: number;
    interactions: number;
  };
  trafficSeries: Array<{
    key: string;
    label: string;
    pageViews: number;
    visitors: number;
  }>;
  topPages: Array<{ path: string; count: number }>;
  topReferrers: Array<{
    source: string;
    type: "direct" | "search" | "social" | "external" | "internal";
    count: number;
  }>;
  topBrowsers: Array<{ name: string; count: number }>;
  topDevices: Array<{ name: string; count: number }>;
  topOperatingSystems: Array<{ name: string; count: number }>;
  topCountries: Array<{ name: string; count: number }>;
  contentSummary: DashboardContentSummary;
  contentTrends: DashboardContentTrendPoint[];
}

const STYLE_CATEGORY_BY_SLUG = new Map(stylesMeta.map((style) => [style.slug, style.category]));

function getDisplayWindowDays(range: DashboardRange): number {
  if (range === "24h") return 1;
  if (range === "7d") return 7;
  if (range === "30d") return 30;
  return 90;
}

function getTrendWindowDays(range: DashboardRange): number {
  if (range === "24h") return 1;
  if (range === "7d") return 7;
  if (range === "30d") return 30;
  return 90;
}

function getTrendWindowLabel(range: DashboardRange): string {
  if (range === "24h") return "vs previous 24 hours";
  if (range === "7d") return "vs previous 7 days";
  if (range === "30d") return "vs previous 30 days";
  return "vs previous 90 days";
}

function isAdminEvent(eventType: string | null): boolean {
  return typeof eventType === "string" && eventType.startsWith("admin_");
}

function round(value: number, digits = 1): number {
  const power = 10 ** digits;
  return Math.round(value * power) / power;
}

function readEventString(
  row: DashboardEventRow,
  key: string
): string | null {
  const value = row.event_data?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

export function buildAnalyticsDashboard(
  rows: DashboardEventRow[],
  range: DashboardRange,
  contentSummary: DashboardContentSummary,
  contentTrends: DashboardContentTrendPoint[] = [],
  now: Date = new Date()
): DashboardData {
  const usageRows = rows.filter((row) => !isAdminEvent(row.event_type));
  const pageViewRows = usageRows.filter((row) => row.event_type === "page_view");
  const totalEvents = usageRows.length;
  const totalStyles = new Set(
    usageRows.map((row) => row.style_slug).filter((slug): slug is string => Boolean(slug))
  ).size;
  const uniqueSessions = new Set(
    usageRows
      .map((row) => row.session_id)
      .filter((sessionId): sessionId is string => Boolean(sessionId))
  ).size;
  const visitors = new Set(
    pageViewRows
      .map((row) => row.session_id)
      .filter((sessionId): sessionId is string => Boolean(sessionId))
  ).size;
  const pageViews = pageViewRows.length;

  const styleCounts = new Map<string, number>();
  const categoryCounts = new Map<string, number>();
  const typeCounts = new Map<string, number>();
  const dailyCounts = new Map<string, number>();
  const pageCounts = new Map<string, number>();
  const referrerCounts = new Map<string, { source: string; type: DashboardData["topReferrers"][number]["type"]; count: number }>();
  const browserCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  const osCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();

  let views = 0;
  let exports = 0;
  let copies = 0;

  for (const row of usageRows) {
    if (row.style_slug) {
      styleCounts.set(row.style_slug, (styleCounts.get(row.style_slug) ?? 0) + 1);

      const category = STYLE_CATEGORY_BY_SLUG.get(row.style_slug);
      if (category) {
        categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
      }
    }

    const eventType = row.event_type ?? "unknown";
    typeCounts.set(eventType, (typeCounts.get(eventType) ?? 0) + 1);

    if (eventType === "style_view") views += 1;
    if (eventType === "style_export") exports += 1;
    if (eventType === "code_copy") copies += 1;

    const dayKey = row.created_at.slice(0, 10);
    dailyCounts.set(dayKey, (dailyCounts.get(dayKey) ?? 0) + 1);
  }

  const trafficSeries = buildTrafficSeries(pageViewRows, range, now);

  for (const row of pageViewRows) {
    const path = readEventString(row, "path") ?? "/";
    pageCounts.set(path, (pageCounts.get(path) ?? 0) + 1);

    const referrerDomain = readEventString(row, "referrerDomain");
    const referrerType =
      (readEventString(row, "referrerType") as DashboardData["topReferrers"][number]["type"] | null) ??
      "direct";
    const referrerSource = referrerDomain ?? "Direct";
    const referrerKey = `${referrerType}:${referrerSource}`;
    const currentReferrer = referrerCounts.get(referrerKey) ?? {
      source: referrerSource,
      type: referrerType,
      count: 0,
    };
    currentReferrer.count += 1;
    referrerCounts.set(referrerKey, currentReferrer);

    const browser = readEventString(row, "browser") ?? "Unknown";
    browserCounts.set(browser, (browserCounts.get(browser) ?? 0) + 1);

    const device = readEventString(row, "deviceType") ?? "Unknown";
    deviceCounts.set(device, (deviceCounts.get(device) ?? 0) + 1);

    const os = readEventString(row, "os") ?? "Unknown";
    osCounts.set(os, (osCounts.get(os) ?? 0) + 1);

    const country = readEventString(row, "country");
    if (country) {
      countryCounts.set(country, (countryCounts.get(country) ?? 0) + 1);
    }
  }

  const topStyles = Array.from(styleCounts.entries())
    .map(([slug, count]) => ({
      slug,
      count,
      category: STYLE_CATEGORY_BY_SLUG.get(slug) ?? null,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  const topCategories = Array.from(categoryCounts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const eventsByType = Array.from(typeCounts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
  const topPages = Array.from(pageCounts.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const topReferrers = Array.from(referrerCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  const topBrowsers = Array.from(browserCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const topDevices = Array.from(deviceCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const topOperatingSystems = Array.from(osCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const topCountries = Array.from(countryCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const displayWindowDays = getDisplayWindowDays(range);
  const displayStart = new Date(now);
  displayStart.setHours(0, 0, 0, 0);

  const recentActivity: { date: string; count: number }[] = [];
  const normalizedContentTrends: DashboardContentTrendPoint[] = [];
  for (let index = displayWindowDays - 1; index >= 0; index -= 1) {
    const day = new Date(displayStart);
    day.setDate(displayStart.getDate() - index);
    const key = day.toISOString().slice(0, 10);
    recentActivity.push({
      date: key,
      count: dailyCounts.get(key) ?? 0,
    });
    const contentPoint = contentTrends.find((point) => point.date === key);
    normalizedContentTrends.push(
      contentPoint ?? {
        date: key,
        comments: 0,
        ratings: 0,
        favorites: 0,
      }
    );
  }

  const peakDay =
    recentActivity.length === 0
      ? { date: null, count: 0 }
      : recentActivity.reduce<{ date: string | null; count: number }>(
          (peak, point) =>
            point.count > peak.count ||
            (point.count === peak.count &&
              point.count > 0 &&
              point.date > (peak.date ?? ""))
              ? point
              : peak,
          { date: recentActivity[0]?.date ?? null, count: recentActivity[0]?.count ?? 0 }
        );

  const avgEventsPerDay =
    recentActivity.length === 0
      ? 0
      : round(
          recentActivity.reduce((sum, point) => sum + point.count, 0) / recentActivity.length
        );

  const trendWindowDays = getTrendWindowDays(range);
  const currentWindowStart = new Date(now.getTime() - trendWindowDays * 24 * 60 * 60 * 1000);
  const previousWindowStart = new Date(
    now.getTime() - trendWindowDays * 2 * 24 * 60 * 60 * 1000
  );

  let currentTotal = 0;
  let previousTotal = 0;
  for (const row of usageRows) {
    const createdAtMs = new Date(row.created_at).getTime();
    if (!Number.isFinite(createdAtMs)) continue;

    if (createdAtMs >= currentWindowStart.getTime()) {
      currentTotal += 1;
      continue;
    }

    if (createdAtMs >= previousWindowStart.getTime()) {
      previousTotal += 1;
    }
  }

  const deltaPct =
    previousTotal === 0
      ? currentTotal > 0
        ? 100
        : null
      : round(((currentTotal - previousTotal) / previousTotal) * 100, 1);

  const pageViewsBySession = new Map<string, number>();
  for (const row of pageViewRows) {
    if (!row.session_id) continue;
    pageViewsBySession.set(row.session_id, (pageViewsBySession.get(row.session_id) ?? 0) + 1);
  }
  const singlePageSessions = Array.from(pageViewsBySession.values()).filter((count) => count === 1).length;
  const bounceRate =
    pageViewsBySession.size > 0 ? round((singlePageSessions / pageViewsBySession.size) * 100, 1) : null;

  return {
    totalEvents,
    totalStyles,
    uniqueSessions,
    pageViews,
    visitors,
    bounceRate,
    avgEventsPerDay,
    topStyles,
    topCategories,
    eventsByType,
    recentActivity,
    peakDay,
    trend: {
      currentTotal,
      previousTotal,
      deltaPct,
      windowLabel: getTrendWindowLabel(range),
    },
    activityBreakdown: {
      views,
      exports,
      copies,
      interactions: Math.max(totalEvents - views, 0),
    },
    trafficSeries,
    topPages,
    topReferrers,
    topBrowsers,
    topDevices,
    topOperatingSystems,
    topCountries,
    contentSummary,
    contentTrends: normalizedContentTrends,
  };
}

function buildTrafficSeries(
  rows: DashboardEventRow[],
  range: DashboardRange,
  now: Date
): DashboardData["trafficSeries"] {
  const isHourly = range === "24h";
  const bucketMap = new Map<string, { key: string; label: string; pageViews: number; sessions: Set<string> }>();

  if (isHourly) {
    const end = new Date(now);
    end.setMinutes(0, 0, 0);
    for (let index = 23; index >= 0; index -= 1) {
      const bucket = new Date(end);
      bucket.setHours(end.getHours() - index);
      const key = bucket.toISOString().slice(0, 13);
      bucketMap.set(key, {
        key,
        label: `${String(bucket.getHours()).padStart(2, "0")}:00`,
        pageViews: 0,
        sessions: new Set<string>(),
      });
    }
  } else {
    const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (days - 1));
    for (let index = 0; index < days; index += 1) {
      const bucket = new Date(start);
      bucket.setDate(start.getDate() + index);
      const key = bucket.toISOString().slice(0, 10);
      bucketMap.set(key, {
        key,
        label: `${bucket.getMonth() + 1}/${bucket.getDate()}`,
        pageViews: 0,
        sessions: new Set<string>(),
      });
    }
  }

  for (const row of rows) {
    const key = isHourly ? row.created_at.slice(0, 13) : row.created_at.slice(0, 10);
    const bucket = bucketMap.get(key);
    if (!bucket) continue;
    bucket.pageViews += 1;
    if (row.session_id) bucket.sessions.add(row.session_id);
  }

  return Array.from(bucketMap.values()).map((bucket) => ({
    key: bucket.key,
    label: bucket.label,
    pageViews: bucket.pageViews,
    visitors: bucket.sessions.size,
  }));
}
