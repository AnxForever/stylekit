import "server-only";

import type { AnalyticsOverview, AnalyticsRange } from "./analytics-api-contract";
import {
  analyticsOverviewSchema,
  getAnalyticsWindow,
} from "./analytics-api-contract";
import { readAnalyticsCache, writeAnalyticsCache } from "./analytics-response-cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { readPersistentAnalyticsSnapshot, writePersistentAnalyticsSnapshot } from "./analytics-persistent-snapshot";

const TIMEZONE = "Asia/Shanghai";

export async function getAnalyticsOverviewSnapshot(
  range: AnalyticsRange
): Promise<AnalyticsOverview | null> {
  const cacheKey = `overview:${range}`;
  const cached = readAnalyticsCache<AnalyticsOverview>(cacheKey);
  if (cached) return cached;
  const persisted = await readPersistentAnalyticsSnapshot<AnalyticsOverview>(cacheKey);
  if (persisted) {
    writeAnalyticsCache(cacheKey, persisted);
    return persisted;
  }

  const client = getSupabaseAdmin();
  if (!client) return null;

  const window = getAnalyticsWindow(range);
  const { data, error } = await client.rpc("admin_analytics_overview", {
    p_start: window.start,
    p_end: window.end,
    p_timezone: TIMEZONE,
  });
  if (error) return null;

  const parsed = analyticsOverviewSchema.safeParse(data);
  if (!parsed.success) return null;
  writeAnalyticsCache(cacheKey, parsed.data);
  await writePersistentAnalyticsSnapshot(cacheKey, parsed.data);
  return parsed.data;
}
