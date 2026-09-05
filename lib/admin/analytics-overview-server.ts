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

/**
 * Read the range overview from the Umami snapshot — the source of truth for
 * traffic. The self-built analytics_events table undercounts badly because ad
 * blockers strip requests to `/api/analytics`; Umami is served from a `/umami`
 * path that evades blockers, so its numbers are the real ones. Returns null
 * when the snapshot isn't configured or reachable, so callers fall back to the
 * self-built data (e.g. local dev without the insights URL).
 *
 * Reads a server-runtime env (UMAMI_INSIGHTS_URL) rather than a build-inlined
 * NEXT_PUBLIC_ var, so the URL is set via .env.production + restart (no rebuild)
 * and never ships to the client bundle. Falls back to the public var if that's
 * how a deployment happens to be configured.
 */
async function readUmamiOverview(range: AnalyticsRange): Promise<AnalyticsOverview | null> {
  const url =
    process.env.UMAMI_INSIGHTS_URL ?? process.env.NEXT_PUBLIC_UMAMI_INSIGHTS_URL ?? "";
  if (!url) return null;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { overview?: Record<string, unknown> };
    const raw = data.overview?.[range];
    if (!raw) return null;
    const parsed = analyticsOverviewSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function getAnalyticsOverviewSnapshot(
  range: AnalyticsRange
): Promise<AnalyticsOverview | null> {
  const cacheKey = `overview:${range}`;
  const cached = readAnalyticsCache<AnalyticsOverview>(cacheKey);
  if (cached) return cached;

  // Umami first — real visitors. Falls through to the self-built snapshot/RPC
  // only when Umami is unreachable.
  const umami = await readUmamiOverview(range);
  if (umami) {
    writeAnalyticsCache(cacheKey, umami);
    await writePersistentAnalyticsSnapshot(cacheKey, umami);
    return umami;
  }

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
