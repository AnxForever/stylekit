import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { analyticsEventsSchema, analyticsRangeSchema, getAnalyticsWindow } from "@/lib/admin/analytics-api-contract";
import { readAnalyticsCache, writeAnalyticsCache } from "@/lib/admin/analytics-response-cache";
import { writePersistentAnalyticsSnapshot } from "@/lib/admin/analytics-persistent-snapshot";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  const url = new URL(request.url);
  const parsedRange = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  if (!parsedRange.success) return NextResponse.json({ error: "Invalid analytics range." }, { status: 400 });
  const cacheKey = `events:${parsedRange.data}:20`;
  const cached = readAnalyticsCache(cacheKey);
  if (cached) return NextResponse.json(cached, { headers: { "X-StyleKit-Analytics-Cache": "HIT" } });
  const client = getSupabaseAdmin();
  if (!client) return NextResponse.json({ error: "Analytics storage is not configured." }, { status: 503 });
  const window = getAnalyticsWindow(parsedRange.data);
  const { data, error } = await client.rpc("admin_analytics_events", { p_start: window.start, p_end: window.end, p_limit: 20 });
  if (error) return NextResponse.json({ error: "Failed to load custom events." }, { status: 503 });
  const result = analyticsEventsSchema.safeParse(data);
  if (!result.success) return NextResponse.json({ error: "Invalid custom event payload." }, { status: 502 });
  writeAnalyticsCache(cacheKey, result.data);
  await writePersistentAnalyticsSnapshot(cacheKey, result.data);
  return NextResponse.json(result.data, { headers: { "X-StyleKit-Analytics-Cache": "MISS" } });
}
