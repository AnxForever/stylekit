import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  analyticsOverviewSchema,
  analyticsRangeSchema,
  getAnalyticsWindow,
  isMissingAnalyticsRpc,
} from "@/lib/admin/analytics-api-contract";
import {
  readAnalyticsCache,
  writeAnalyticsCache,
} from "@/lib/admin/analytics-response-cache";
import { writePersistentAnalyticsSnapshot } from "@/lib/admin/analytics-persistent-snapshot";

const TIMEZONE = "Asia/Shanghai";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const url = new URL(request.url);
  const rangeResult = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  if (!rangeResult.success) {
    return NextResponse.json({ error: "Invalid analytics range." }, { status: 400 });
  }

  const cacheKey = `overview:${rangeResult.data}`;
  const cached = readAnalyticsCache<unknown>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": "private, max-age=0, stale-while-revalidate=60",
        "X-StyleKit-Analytics-Cache": "HIT",
      },
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
  const window = getAnalyticsWindow(rangeResult.data);
  const startedAt = performance.now();
  const { data, error } = await client.rpc("admin_analytics_overview", {
    p_start: window.start,
    p_end: window.end,
    p_timezone: TIMEZONE,
  });
  const durationMs = Math.round(performance.now() - startedAt);

  if (error) {
    const migrationMissing = isMissingAnalyticsRpc(error);
    return NextResponse.json(
      {
        error: migrationMissing
          ? "Analytics aggregation migration is not installed."
          : "Failed to load analytics overview.",
        code: migrationMissing ? "ANALYTICS_MIGRATION_REQUIRED" : "ANALYTICS_QUERY_FAILED",
      },
      {
        status: 503,
        headers: { "Server-Timing": `analytics;dur=${durationMs}` },
      }
    );
  }

  const parsed = analyticsOverviewSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Analytics overview returned an invalid payload.", code: "ANALYTICS_INVALID_PAYLOAD" },
      { status: 502, headers: { "Server-Timing": `analytics;dur=${durationMs}` } }
    );
  }

  writeAnalyticsCache(cacheKey, parsed.data);
  await writePersistentAnalyticsSnapshot(cacheKey, parsed.data);
  return NextResponse.json(parsed.data, {
    headers: {
      "Cache-Control": "private, max-age=0, stale-while-revalidate=60",
      "Server-Timing": `analytics;dur=${durationMs}`,
      "X-StyleKit-Analytics-Cache": "MISS",
    },
  });
}
