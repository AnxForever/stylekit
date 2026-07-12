import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { getUsageStats, getTopStyles } from "@/lib/analytics";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  buildAnalyticsDashboard,
  type DashboardContentSummary,
  type DashboardContentTrendPoint,
  type DashboardEventRow,
  type DashboardRegistrationInput,
  type DashboardRange,
} from "@/lib/admin/analytics-dashboard";

const ANALYTICS_PAGE_SIZE = 1_000;
const ANALYTICS_MAX_PAGES = 100;
const AUTH_USERS_PAGE_SIZE = 1_000;
const AUTH_USERS_MAX_PAGES = 20;

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawRange = searchParams.get("range");
  const range: DashboardRange =
    rawRange === "24h" || rawRange === "30d" || rawRange === "90d" ? rawRange : "7d";

  // When Supabase is configured, use it for rich analytics
  if (isSupabaseConfigured()) {
    return getSupabaseDashboard(range);
  }

  // Fallback to in-memory file-based analytics
  const stats = getUsageStats();
  const topStyles = getTopStyles(20);

  // Aggregate totals from per-style counters
  let totalApi = 0;
  let totalPage = 0;
  for (const style of Object.values(stats.styles)) {
    totalApi += style.apiCalls;
    totalPage += style.pageViews;
  }
  const totalEvents = totalApi + totalPage;

  // Build event type breakdown
  const eventsByType: { type: string; count: number }[] = [];
  if (totalPage > 0) eventsByType.push({ type: "page_view", count: totalPage });
  if (totalApi > 0) eventsByType.push({ type: "api_call", count: totalApi });

  // Generate simple recent activity from available data
  // File-based tracker doesn't store per-day history, so show empty
  const recentActivity: { date: string; count: number }[] = [];

  const contentSummary: DashboardContentSummary = {
    comments: 0,
    ratings: 0,
    favorites: 0,
    submissionsTotal: 0,
    submissionsPending: 0,
    submissionsApproved: 0,
    submissionsRejected: 0,
    adminActions: 0,
  };

  return NextResponse.json({
    totalEvents,
    totalStyles: Object.keys(stats.styles).length,
    uniqueSessions: 0,
    pageViews: totalPage,
    visitors: 0,
    engagedVisitors: 0,
    bounceRate: null,
    avgEventsPerDay: 0,
    topStyles: topStyles.map((s) => ({
      slug: s.slug,
      count: s.total,
      category: null,
    })),
    topCategories: [],
    eventsByType,
    recentActivity,
    peakDay: { date: null, count: 0 },
    trend: {
      currentTotal: 0,
      previousTotal: 0,
      deltaPct: null,
      windowLabel:
        range === "24h"
          ? "vs previous 24 hours"
          : range === "30d"
            ? "vs previous 30 days"
            : range === "90d"
              ? "vs previous 90 days"
              : "vs previous 7 days",
    },
    activityBreakdown: {
      views: totalPage,
      exports: 0,
      copies: 0,
      interactions: totalApi,
    },
    trafficSeries: [],
    topPages: [],
    topTransitions: [],
    topReferrers: [],
    topBrowsers: [],
    topDevices: [],
    topOperatingSystems: [],
    topCountries: [],
    registrations: {
      totalUsers: 0,
      inRange: 0,
      visitorRatio: null,
      series: [],
    },
    dataQuality: {
      eventsTruncated: false,
      registrationsTruncated: false,
      registrationsAvailable: false,
    },
    contentSummary,
    contentTrends: [],
  });
}

async function getSupabaseDashboard(range: DashboardRange) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const now = new Date();
  const dateFilter = getDateFilter(range);
  const [eventsResult, contentSummary, contentTrends, registrations, previousPageViews] =
    await Promise.all([
      loadAnalyticsEvents(sb, dateFilter),
      loadContentSummary(sb),
      loadContentTrends(sb, range, now),
      loadRegistrations(sb),
      countPreviousWindowPageViews(sb, range, now),
    ]);

  if (eventsResult.error) {
    return NextResponse.json(
      { error: "Failed to load analytics data" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    buildAnalyticsDashboard(
      eventsResult.rows,
      range,
      contentSummary,
      contentTrends,
      now,
      registrations,
      eventsResult.truncated,
      previousPageViews
    )
  );
}

async function countPreviousWindowPageViews(
  sb: SupabaseClient,
  range: DashboardRange,
  now: Date
): Promise<number | null> {
  const windowDays =
    range === "24h" ? 1 : range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const windowMs = windowDays * 24 * 60 * 60 * 1000;
  const currentStart = new Date(now.getTime() - windowMs).toISOString();
  const previousStart = new Date(now.getTime() - windowMs * 2).toISOString();

  const { count, error } = await sb
    .from("analytics_events")
    .select("id", { head: true, count: "exact" })
    .eq("event_type", "page_view")
    .gte("created_at", previousStart)
    .lt("created_at", currentStart);

  if (error) return null;
  return count ?? 0;
}

async function loadAnalyticsEvents(
  sb: SupabaseClient,
  dateFilter: string | null
): Promise<{
  rows: DashboardEventRow[];
  truncated: boolean;
  error: boolean;
}> {
  const rows: DashboardEventRow[] = [];

  for (let page = 0; page < ANALYTICS_MAX_PAGES; page += 1) {
    const from = page * ANALYTICS_PAGE_SIZE;
    const to = from + ANALYTICS_PAGE_SIZE - 1;
    let query = sb
      .from("analytics_events")
      .select("style_slug,event_type,event_data,created_at,session_id")
      .order("created_at", { ascending: true })
      .range(from, to);

    if (dateFilter) {
      query = query.gte("created_at", dateFilter);
    }

    const { data, error } = await query;
    if (error) {
      return { rows: [], truncated: false, error: true };
    }

    const pageRows = (data ?? []) as DashboardEventRow[];
    rows.push(...pageRows);
    if (pageRows.length < ANALYTICS_PAGE_SIZE) {
      return { rows, truncated: false, error: false };
    }
  }

  return { rows, truncated: true, error: false };
}

async function loadRegistrations(
  sb: SupabaseClient
): Promise<DashboardRegistrationInput> {
  const createdAt: string[] = [];
  let totalUsers = 0;

  for (let page = 1; page <= AUTH_USERS_MAX_PAGES; page += 1) {
    let result;
    try {
      result = await sb.auth.admin.listUsers({
        page,
        perPage: AUTH_USERS_PAGE_SIZE,
      });
    } catch {
      return {
        totalUsers,
        createdAt,
        truncated: false,
        available: false,
      };
    }

    if (result.error) {
      return {
        totalUsers,
        createdAt,
        truncated: false,
        available: false,
      };
    }

    const users = result.data?.users ?? [];
    totalUsers += users.length;
    for (const user of users) {
      if (typeof user.created_at === "string") {
        createdAt.push(user.created_at);
      }
    }

    if (users.length < AUTH_USERS_PAGE_SIZE) {
      return {
        totalUsers,
        createdAt,
        truncated: false,
        available: true,
      };
    }
  }

  return {
    totalUsers,
    createdAt,
    truncated: true,
    available: true,
  };
}

async function loadContentSummary(sb: SupabaseClient): Promise<DashboardContentSummary> {
  const [comments, ratings, favorites, submissionsTotal, submissionsPending, submissionsApproved, submissionsRejected, adminActions] =
    await Promise.all([
      getExactCount(sb, "style_comments"),
      getExactCount(sb, "style_ratings"),
      getCountFromCandidates(sb, ["user_favorites", "style_favorites"]),
      getCountFromCandidates(sb, ["submissions", "style_submissions"]),
      getCountFromCandidates(sb, ["submissions", "style_submissions"], {
        column: "status",
        value: "pending",
      }),
      getCountFromCandidates(sb, ["submissions", "style_submissions"], {
        column: "status",
        value: "approved",
      }),
      getCountFromCandidates(sb, ["submissions", "style_submissions"], {
        column: "status",
        value: "rejected",
      }),
      getExactCount(sb, "analytics_events", {
        filter: { column: "event_type", op: "like", value: "admin_%" },
      }),
    ]);

  return {
    comments,
    ratings,
    favorites,
    submissionsTotal,
    submissionsPending,
    submissionsApproved,
    submissionsRejected,
    adminActions,
  };
}

async function loadContentTrends(
  sb: SupabaseClient,
  range: DashboardRange,
  now: Date = new Date()
): Promise<DashboardContentTrendPoint[]> {
  const windowDays = range === "24h" ? 1 : range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (windowDays - 1));
  const startIso = start.toISOString();

  const [commentsRows, ratingsRows, favoritesRows] = await Promise.all([
    getCreatedAtRows(sb, "style_comments", startIso),
    getCreatedAtRows(sb, "style_ratings", startIso),
    getCreatedAtRowsFromCandidates(sb, ["user_favorites", "style_favorites"], startIso),
  ]);

  const commentCounts = countRowsByDate(commentsRows);
  const ratingCounts = countRowsByDate(ratingsRows);
  const favoriteCounts = countRowsByDate(favoritesRows);

  const points: DashboardContentTrendPoint[] = [];
  for (let index = 0; index < windowDays; index += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    const key = day.toISOString().slice(0, 10);
    points.push({
      date: key,
      comments: commentCounts.get(key) ?? 0,
      ratings: ratingCounts.get(key) ?? 0,
      favorites: favoriteCounts.get(key) ?? 0,
    });
  }

  return points;
}

async function getCountFromCandidates(
  sb: SupabaseClient,
  candidates: readonly string[],
  filter?: {
    column: string;
    value: string;
  }
): Promise<number> {
  for (const table of candidates) {
    const count = await getExactCount(sb, table, filter ? { filter: { column: filter.column, op: "eq", value: filter.value } } : undefined);
    if (count >= 0) {
      return count;
    }
  }

  return 0;
}

async function getCreatedAtRowsFromCandidates(
  sb: SupabaseClient,
  candidates: readonly string[],
  startIso: string
): Promise<Array<{ created_at: string }>> {
  for (const table of candidates) {
    const rows = await getCreatedAtRows(sb, table, startIso);
    if (rows !== null) {
      return rows;
    }
  }

  return [];
}

async function getCreatedAtRows(
  sb: SupabaseClient,
  table: string,
  startIso: string
): Promise<Array<{ created_at: string }> | null> {
  const { data, error } = await sb
    .from(table)
    .select("created_at")
    .gte("created_at", startIso);

  if (error) {
    const message = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
    if (message.includes("could not find the table") || error.code === "PGRST205") {
      return null;
    }
    return [];
  }

  return Array.isArray(data) ? data : [];
}

function countRowsByDate(
  rows: Array<{ created_at: string }> | null
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const row of rows ?? []) {
    const key = row.created_at.slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

async function getExactCount(
  sb: SupabaseClient,
  table: string,
  options?: {
    filter?: {
      column: string;
      op: "eq" | "like";
      value: string;
    };
  }
): Promise<number> {
  let query = sb.from(table).select("id", { head: true, count: "exact" });

  if (options?.filter) {
    query =
      options.filter.op === "like"
        ? query.like(options.filter.column, options.filter.value)
        : query.eq(options.filter.column, options.filter.value);
  }

  const { count, error } = await query;
  if (error) {
    const message = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
    if (message.includes("could not find the table") || error.code === "PGRST205") {
      return -1;
    }
    return 0;
  }

  return count ?? 0;
}

function getDateFilter(range: DashboardRange): string | null {
  if (range === "24h") {
    return new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  }

  if (range === "7d") {
    return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  }

  if (range === "30d") {
    return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  if (range === "90d") {
    return new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  }

  return null;
}
