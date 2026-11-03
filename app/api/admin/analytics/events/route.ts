import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { analyticsEventsSchema, analyticsRangeSchema, getAnalyticsWindow } from "@/lib/admin/analytics-api-contract";
import {
  type AnalyticsRpcResult,
  coalesceAnalyticsRequest,
  readAnalyticsCache,
  writeAnalyticsCache,
} from "@/lib/admin/analytics-response-cache";
import { writePersistentAnalyticsSnapshot } from "@/lib/admin/analytics-persistent-snapshot";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const RESPONSE_HEADERS = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) return NextResponse.json({ error: access.error }, { status: access.status ?? 403, headers: RESPONSE_HEADERS });
  const url = new URL(request.url);
  const parsedRange = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  if (!parsedRange.success) return NextResponse.json({ error: "Invalid analytics range." }, { status: 400, headers: RESPONSE_HEADERS });
  const cacheKey = `events:${parsedRange.data}:20`;
  const cached = readAnalyticsCache(cacheKey);
  if (cached) return NextResponse.json(cached, { headers: { ...RESPONSE_HEADERS, "X-StyleKit-Analytics-Cache": "HIT" } });
  const client = getSupabaseAdmin();
  if (!client) return NextResponse.json({ error: "Analytics storage is not configured." }, { status: 503, headers: RESPONSE_HEADERS });
  const window = getAnalyticsWindow(parsedRange.data);
  const { data, error } = await coalesceAnalyticsRequest<AnalyticsRpcResult>(`rpc:${cacheKey}`, async () => {
    const recent = readAnalyticsCache<unknown>(cacheKey);
    if (recent) return { data: recent, error: null };
    return await client.rpc("admin_analytics_events", { p_start: window.start, p_end: window.end, p_limit: 20 });
  });
  if (error) return NextResponse.json({ error: "Failed to load custom events." }, { status: 503, headers: RESPONSE_HEADERS });
  const result = analyticsEventsSchema.safeParse(data);
  if (!result.success) return NextResponse.json({ error: "Invalid custom event payload." }, { status: 502, headers: RESPONSE_HEADERS });
  writeAnalyticsCache(cacheKey, result.data);
  void writePersistentAnalyticsSnapshot(cacheKey, result.data);
  return NextResponse.json(result.data, { headers: { ...RESPONSE_HEADERS, "X-StyleKit-Analytics-Cache": "MISS" } });
}
