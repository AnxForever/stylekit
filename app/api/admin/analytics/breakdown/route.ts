import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  analyticsBreakdownDimensionSchema,
  analyticsBreakdownSchema,
  analyticsRangeSchema,
  getAnalyticsWindow,
  isMissingAnalyticsRpc,
} from "@/lib/admin/analytics-api-contract";
import {
  readAnalyticsCache,
  writeAnalyticsCache,
} from "@/lib/admin/analytics-response-cache";
import { writePersistentAnalyticsSnapshot } from "@/lib/admin/analytics-persistent-snapshot";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const url = new URL(request.url);
  const range = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  const dimension = analyticsBreakdownDimensionSchema.safeParse(
    url.searchParams.get("dimension")
  );
  const requestedLimit = Number.parseInt(url.searchParams.get("limit") ?? "10", 10);
  const limit = Number.isFinite(requestedLimit)
    ? Math.max(1, Math.min(requestedLimit, 50))
    : 10;

  if (!range.success || !dimension.success) {
    return NextResponse.json({ error: "Invalid analytics query." }, { status: 400 });
  }

  const cacheKey = `breakdown:${range.data}:${dimension.data}:${limit}`;
  const cached = readAnalyticsCache<unknown>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { "X-StyleKit-Analytics-Cache": "HIT" },
    });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { error: "Analytics storage is not configured.", code: "ANALYTICS_UNAVAILABLE" },
      { status: 503 }
    );
  }

  const client = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const window = getAnalyticsWindow(range.data);
  const startedAt = performance.now();
  const { data, error } = await client.rpc("admin_analytics_breakdown", {
    p_start: window.start,
    p_end: window.end,
    p_dimension: dimension.data,
    p_limit: limit,
  });
  const durationMs = Math.round(performance.now() - startedAt);

  if (error) {
    const migrationMissing = isMissingAnalyticsRpc(error);
    return NextResponse.json(
      {
        error: migrationMissing
          ? "Analytics aggregation migration is not installed."
          : "Failed to load analytics breakdown.",
        code: migrationMissing ? "ANALYTICS_MIGRATION_REQUIRED" : "ANALYTICS_QUERY_FAILED",
      },
      { status: 503, headers: { "Server-Timing": `analytics;dur=${durationMs}` } }
    );
  }

  const parsed = analyticsBreakdownSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Analytics breakdown returned an invalid payload.", code: "ANALYTICS_INVALID_PAYLOAD" },
      { status: 502, headers: { "Server-Timing": `analytics;dur=${durationMs}` } }
    );
  }

  writeAnalyticsCache(cacheKey, parsed.data);
  await writePersistentAnalyticsSnapshot(cacheKey, parsed.data);
  return NextResponse.json(parsed.data, {
    headers: {
      "Server-Timing": `analytics;dur=${durationMs}`,
      "X-StyleKit-Analytics-Cache": "MISS",
    },
  });
}
