import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  analyticsRangeSchema,
  getAnalyticsWindow,
  isMissingAnalyticsRpc,
} from "@/lib/admin/analytics-api-contract";
import { promptCopyAnalyticsSchema } from "@/lib/admin/prompt-copy-analytics";
import {
  type AnalyticsRpcResult,
  coalesceAnalyticsRequest,
  readAnalyticsCache,
  writeAnalyticsCache,
} from "@/lib/admin/analytics-response-cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const RESPONSE_HEADERS = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403, headers: RESPONSE_HEADERS },
    );
  }

  const url = new URL(request.url);
  const range = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  if (!range.success) {
    return NextResponse.json(
      { error: "Invalid analytics range." },
      { status: 400, headers: RESPONSE_HEADERS },
    );
  }

  const cacheKey = `prompt-copies:${range.data}`;
  const cached = readAnalyticsCache<unknown>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { ...RESPONSE_HEADERS, "X-StyleKit-Analytics-Cache": "HIT" },
    });
  }

  const client = getSupabaseAdmin();
  if (!client) {
    return NextResponse.json(
      { error: "Analytics storage is not configured.", code: "ANALYTICS_UNAVAILABLE" },
      { status: 503, headers: RESPONSE_HEADERS },
    );
  }

  const window = getAnalyticsWindow(range.data);
  const startedAt = performance.now();
  const { data, error } = await coalesceAnalyticsRequest<AnalyticsRpcResult>(
    `rpc:${cacheKey}`,
    async () => {
      const recent = readAnalyticsCache<unknown>(cacheKey);
      if (recent) return { data: recent, error: null };
      return await client.rpc("admin_analytics_prompt_copies", {
        p_start: window.start,
        p_end: window.end,
      });
    },
  );
  const durationMs = Math.round(performance.now() - startedAt);

  if (error) {
    const migrationMissing = isMissingAnalyticsRpc(error);
    return NextResponse.json(
      {
        error: migrationMissing
          ? "Prompt copy analytics migration is not installed."
          : "Failed to load prompt copy analytics.",
        code: migrationMissing ? "ANALYTICS_MIGRATION_REQUIRED" : "ANALYTICS_QUERY_FAILED",
      },
      {
        status: 503,
        headers: {
          ...RESPONSE_HEADERS,
          "Server-Timing": `analytics;dur=${durationMs}`,
        },
      },
    );
  }

  const parsed = promptCopyAnalyticsSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Prompt copy analytics returned an invalid payload.", code: "ANALYTICS_INVALID_PAYLOAD" },
      {
        status: 502,
        headers: {
          ...RESPONSE_HEADERS,
          "Server-Timing": `analytics;dur=${durationMs}`,
        },
      },
    );
  }

  writeAnalyticsCache(cacheKey, parsed.data);
  return NextResponse.json(parsed.data, {
    headers: {
      ...RESPONSE_HEADERS,
      "Server-Timing": `analytics;dur=${durationMs}`,
      "X-StyleKit-Analytics-Cache": "MISS",
    },
  });
}
