import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAnalyticsWindow, isMissingAnalyticsRpc, type AnalyticsRange } from "./analytics-api-contract";
import { coalesceAnalyticsRequest, readAnalyticsCache, writeAnalyticsCache } from "./analytics-response-cache";
import { styleInsightsSchema, type StyleInsights } from "./style-insights";

export type StyleInsightsResult =
  | { data: StyleInsights; cache: "HIT" | "MISS" }
  | { data: null; status: 502 | 503; code: string; error: string };

/** Never substitute legacy sessions, Umami data, or stale snapshots for browser UV. */
export async function getStyleInsightsSnapshot(range: AnalyticsRange): Promise<StyleInsightsResult> {
  const key = `style-insights:v2:${range}`;
  const cached = readAnalyticsCache<StyleInsights>(key);
  if (cached) return { data: cached, cache: "HIT" };

  return coalesceAnalyticsRequest(`snapshot:${key}`, async (): Promise<StyleInsightsResult> => {
    const recent = readAnalyticsCache<StyleInsights>(key);
    if (recent) return { data: recent, cache: "HIT" };
    const client = getSupabaseAdmin();
    if (!client) {
      return { data: null, status: 503, code: "ANALYTICS_UNAVAILABLE", error: "Analytics storage is not configured." };
    }

    try {
      const window = getAnalyticsWindow(range);
      const { data, error } = await client.rpc("admin_analytics_style_insights", {
        p_start: window.start,
        p_end: window.end,
      });
      if (error) {
        const missing = isMissingAnalyticsRpc(error);
        return {
          data: null,
          status: 503,
          code: missing ? "ANALYTICS_MIGRATION_REQUIRED" : "ANALYTICS_QUERY_FAILED",
          error: missing ? "Analytics accuracy migration 044 is not installed." : "Failed to load style insights.",
        };
      }
      const parsed = styleInsightsSchema.safeParse(data);
      if (!parsed.success) {
        return { data: null, status: 502, code: "ANALYTICS_INVALID_PAYLOAD", error: "Style insights returned an invalid payload." };
      }
      writeAnalyticsCache(key, parsed.data);
      return { data: parsed.data, cache: "MISS" };
    } catch {
      return { data: null, status: 503, code: "ANALYTICS_QUERY_FAILED", error: "Failed to load style insights." };
    }
  });
}
