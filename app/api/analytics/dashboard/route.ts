import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { getUsageStats, getTopStyles } from "@/lib/analytics";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";

interface AnalyticsEventRow {
  style_slug: string | null;
  event_type: string | null;
  created_at: string;
}

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") ?? "7d";

  // When Supabase is configured, use it for rich analytics
  if (isSupabaseConfigured()) {
    return getSupabaseDashboard(range);
  }

  // Fallback to in-memory file-based analytics
  const stats = getUsageStats();
  const topStyles = getTopStyles(20);

  // Aggregate totals from per-style counters
  let totalApi = 0;
  let totalMcp = 0;
  let totalPage = 0;
  for (const style of Object.values(stats.styles)) {
    totalApi += style.apiCalls;
    totalMcp += style.mcpCalls;
    totalPage += style.pageViews;
  }
  const totalEvents = totalApi + totalMcp + totalPage;

  // Build event type breakdown
  const eventsByType: { type: string; count: number }[] = [];
  if (totalPage > 0) eventsByType.push({ type: "page_view", count: totalPage });
  if (totalApi > 0) eventsByType.push({ type: "api_call", count: totalApi });
  if (totalMcp > 0) eventsByType.push({ type: "mcp_call", count: totalMcp });

  // Generate simple recent activity from available data
  // File-based tracker doesn't store per-day history, so show empty
  const recentActivity: { date: string; count: number }[] = [];

  return NextResponse.json({
    totalEvents,
    totalStyles: Object.keys(stats.styles).length,
    topStyles: topStyles.map((s) => ({
      slug: s.slug,
      count: s.total,
    })),
    eventsByType,
    recentActivity,
  });
}

async function getSupabaseDashboard(range: string) {
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Calculate date filter
  let eventsQuery = sb
    .from("analytics_events")
    .select("style_slug,event_type,created_at");
  const dateFilter = getDateFilter(range);
  if (dateFilter) {
    eventsQuery = eventsQuery.gte("created_at", dateFilter);
  }
  const { data: events, error } = await eventsQuery;
  if (error) {
    return NextResponse.json(
      { error: "Failed to load analytics data" },
      { status: 500 }
    );
  }

  const rows = (events ?? []) as AnalyticsEventRow[];
  const totalEvents = rows.length;

  const styleCounts = new Map<string, number>();
  const typeCounts = new Map<string, number>();
  for (const event of rows) {
    if (event.style_slug) {
      styleCounts.set(
        event.style_slug,
        (styleCounts.get(event.style_slug) || 0) + 1
      );
    }

    const eventType = event.event_type ?? "unknown";
    typeCounts.set(eventType, (typeCounts.get(eventType) || 0) + 1);
  }

  const topStyles = Array.from(styleCounts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const eventsByType = Array.from(typeCounts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  // Recent daily activity (last N days)
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 14;
  const dailyCounts = new Map<string, number>();
  for (const event of rows) {
    const key = event.created_at.slice(0, 10);
    dailyCounts.set(key, (dailyCounts.get(key) || 0) + 1);
  }

  const recentActivity: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0);
    dayStart.setDate(dayStart.getDate() - i);
    const dayKey = dayStart.toISOString().slice(0, 10);

    recentActivity.push({
      date: dayKey,
      count: dailyCounts.get(dayKey) ?? 0,
    });
  }

  return NextResponse.json({
    totalEvents,
    totalStyles: styleCounts.size,
    topStyles,
    eventsByType,
    recentActivity,
  });
}

function getDateFilter(range: string): string | null {
  if (range === "7d") {
    return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  }

  if (range === "30d") {
    return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  return null;
}
