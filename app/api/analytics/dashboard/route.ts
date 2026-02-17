import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { getUsageStats, getTopStyles } from "@/lib/analytics";

export async function GET(request: Request) {
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  // Calculate date filter
  let dateFilter: string | null = null;
  if (range === "7d") {
    dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  } else if (range === "30d") {
    dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  // Total events count
  let eventsQuery = sb
    .from("analytics_events")
    .select("*", { count: "exact", head: true });
  if (dateFilter) eventsQuery = eventsQuery.gte("created_at", dateFilter);
  const { count: totalEvents } = await eventsQuery;

  // Top styles by view count
  let topQuery = sb.from("analytics_events").select("style_slug");
  if (dateFilter) topQuery = topQuery.gte("created_at", dateFilter);
  topQuery = topQuery.not("style_slug", "is", null);
  const { data: styleEvents } = await topQuery;

  const styleCounts = new Map<string, number>();
  for (const event of styleEvents ?? []) {
    if (event.style_slug) {
      styleCounts.set(
        event.style_slug,
        (styleCounts.get(event.style_slug) || 0) + 1
      );
    }
  }
  const topStyles = Array.from(styleCounts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  // Event types distribution
  let typesQuery = sb.from("analytics_events").select("event_type");
  if (dateFilter) typesQuery = typesQuery.gte("created_at", dateFilter);
  const { data: typeEvents } = await typesQuery;

  const typeCounts = new Map<string, number>();
  for (const event of typeEvents ?? []) {
    typeCounts.set(
      event.event_type,
      (typeCounts.get(event.event_type) || 0) + 1
    );
  }
  const eventsByType = Array.from(typeCounts.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  // Recent daily activity (last N days)
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 14;
  const recentActivity: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const { count } = await sb
      .from("analytics_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", dayStart.toISOString())
      .lt("created_at", dayEnd.toISOString());

    recentActivity.push({
      date: dayStart.toISOString().split("T")[0],
      count: count ?? 0,
    });
  }

  return NextResponse.json({
    totalEvents: totalEvents ?? 0,
    totalStyles: styleCounts.size,
    topStyles,
    eventsByType,
    recentActivity,
  });
}
