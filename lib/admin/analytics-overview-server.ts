import "server-only";

import type { AnalyticsOverview, AnalyticsRange } from "./analytics-api-contract";
import {
  analyticsOverviewSchema,
  getAnalyticsWindow,
} from "./analytics-api-contract";
import {
  coalesceAnalyticsRequest,
  type AnalyticsRpcResult,
  readAnalyticsCache,
  writeAnalyticsCache,
} from "./analytics-response-cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { readPersistentAnalyticsSnapshot, writePersistentAnalyticsSnapshot } from "./analytics-persistent-snapshot";

const TIMEZONE = "Asia/Shanghai";

export interface AnalyticsOverviewSnapshotResult {
  data: AnalyticsOverview | null;
  source: "memory" | "umami" | "database" | "persistent_fallback" | "unavailable";
}

/**
 * Read the range overview from the configured Umami snapshot, keeping SSR and
 * API requests on the same source. Internal events can differ in collection
 * coverage and metric definitions; neither source establishes human identity.
 * Returns null when the snapshot is unavailable so the shared loader can try
 * internal aggregation (for example local dev without the insights URL).
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
    if (!parsed.success) return null;
    const age = Date.now() - Date.parse(parsed.data.quality.generatedAt);
    return {
      ...parsed.data,
      measurement: { collector: "umami", visitorMetric: "umami_identifier", fallback: false },
      quality: {
        ...parsed.data.quality,
        status: !Number.isFinite(age) || age > 30 * 60_000 || age < -60_000
          ? "stale"
          : parsed.data.quality.status,
      },
    };
  } catch {
    return null;
  }
}

export async function getAnalyticsOverviewSnapshot(
  range: AnalyticsRange
): Promise<AnalyticsOverview | null> {
  return (await getAnalyticsOverviewSnapshotResult(range)).data;
}

export async function getAnalyticsOverviewSnapshotResult(
  range: AnalyticsRange,
): Promise<AnalyticsOverviewSnapshotResult> {
  const cacheKey = `overview:${range}`;
  const cached = readAnalyticsCache<AnalyticsOverview>(cacheKey);
  if (cached) return { data: cached, source: "memory" };

  return coalesceAnalyticsRequest(`snapshot:${cacheKey}`, async () => {
    const recent = readAnalyticsCache<AnalyticsOverview>(cacheKey);
    if (recent) return { data: recent, source: "memory" };

    // Preserve the configured Umami source. Fall through to the internal RPC only
    // when Umami is unavailable.
    const umami = await readUmamiOverview(range);
    if (umami) {
      writeAnalyticsCache(cacheKey, umami);
      void writePersistentAnalyticsSnapshot(cacheKey, umami);
      return { data: umami, source: "umami" };
    }

    const client = getSupabaseAdmin();
    if (client) {
      try {
        const { data, error } = await coalesceAnalyticsRequest<AnalyticsRpcResult>(`rpc:${cacheKey}`, async () => {
          const recent = readAnalyticsCache<AnalyticsOverview>(cacheKey);
          if (recent) return { data: recent, error: null };
          const window = getAnalyticsWindow(range);
          return await client.rpc("admin_analytics_overview", {
            p_start: window.start,
            p_end: window.end,
            p_timezone: TIMEZONE,
          });
        });
        if (!error) {
          const parsed = analyticsOverviewSchema.safeParse(data);
          if (parsed.success) {
            const measured: AnalyticsOverview = {
              ...parsed.data,
              measurement: { collector: "internal_legacy", visitorMetric: "tab_session", fallback: false },
            };
            writeAnalyticsCache(cacheKey, measured);
            void writePersistentAnalyticsSnapshot(cacheKey, measured);
            return { data: measured, source: "database" };
          }
        }
      } catch {
        // The durable snapshot below remains available if the live query fails.
      }
    }

    // Only use a persisted value after the live sources fail. Keep its original
    // generatedAt, and do not put it back in the fresh response cache.
    const persisted = await readPersistentAnalyticsSnapshot<unknown>(cacheKey);
    if (persisted === null) return { data: null, source: "unavailable" };
    const parsed = analyticsOverviewSchema.safeParse(persisted);
    if (!parsed.success) return { data: null, source: "unavailable" };
    return {
      data: {
        ...parsed.data,
        measurement: {
          collector: parsed.data.measurement?.collector ?? "unknown",
          visitorMetric: parsed.data.measurement?.visitorMetric ?? "unknown",
          fallback: true,
        },
        quality: { ...parsed.data.quality, status: "stale" },
      },
      source: "persistent_fallback",
    };
  });
}
