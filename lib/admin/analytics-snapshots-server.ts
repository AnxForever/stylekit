import "server-only";

import type {
  AnalyticsBreakdown,
  AnalyticsBreakdownDimension,
  AnalyticsContent,
  AnalyticsEvents,
  AnalyticsRange,
  AnalyticsRegistrations,
} from "./analytics-api-contract";
import {
  analyticsBreakdownSchema,
  analyticsContentSchema,
  analyticsEventsSchema,
  analyticsRegistrationsSchema,
  getAnalyticsWindow,
} from "./analytics-api-contract";
import {
  type AnalyticsRpcResult,
  coalesceAnalyticsRequest,
  readAnalyticsCache,
  writeAnalyticsCache,
} from "./analytics-response-cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { readPersistentAnalyticsSnapshot, writePersistentAnalyticsSnapshot } from "./analytics-persistent-snapshot";
import { promptCopyAnalyticsSchema, type PromptCopyAnalytics } from "./prompt-copy-analytics";

const TIMEZONE = "Asia/Shanghai";

async function rpcSnapshot<T>(
  cacheKey: string,
  rpc: string,
  params: Record<string, unknown>,
  parse: (value: unknown) => T | null
): Promise<T | null> {
  const cached = readAnalyticsCache<T>(cacheKey);
  if (cached) return cached;

  const client = getSupabaseAdmin();
  if (client) {
    try {
      const response = await coalesceAnalyticsRequest<AnalyticsRpcResult>(`rpc:${cacheKey}`, async () => {
        const recent = readAnalyticsCache<T>(cacheKey);
        if (recent) return { data: recent, error: null };
        return await client.rpc(rpc, params);
      });
      if (response.error === null && response.data !== null) {
        const parsed = parse(response.data);
        if (!parsed) return null;
        writeAnalyticsCache(cacheKey, parsed);
        void writePersistentAnalyticsSnapshot(cacheKey, parsed);
        return parsed;
      }
      if (response.error === null) {
        return null;
      }
    } catch {
      // The persistent snapshot below is a last-resort display fallback.
    }
  }

  // Disk snapshots preserve the original generatedAt value and are never
  // inserted into the fresh response cache. A later request rechecks the DB.
  const persisted = await readPersistentAnalyticsSnapshot<unknown>(cacheKey);
  return persisted === null ? null : parse(persisted);
}

export function getBreakdownSnapshot(
  range: AnalyticsRange,
  dimension: AnalyticsBreakdownDimension,
  limit: number
) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsBreakdown>(
    `breakdown:${range}:${dimension}:${limit}`,
    "admin_analytics_breakdown",
    { p_start: window.start, p_end: window.end, p_dimension: dimension, p_limit: limit },
    (value) => {
      const result = analyticsBreakdownSchema.safeParse(value);
      return result.success ? result.data : null;
    }
  );
}

export function getContentSnapshot(range: AnalyticsRange) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsContent>(
    `content:${range}`,
    "admin_analytics_content",
    { p_start: window.start, p_end: window.end, p_timezone: TIMEZONE },
    (value) => {
      const result = analyticsContentSchema.safeParse(value);
      return result.success ? result.data : null;
    }
  );
}

export function getRegistrationsSnapshot(range: AnalyticsRange) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsRegistrations>(
    `registrations:${range}`,
    "admin_analytics_registrations",
    { p_start: window.start, p_end: window.end, p_timezone: TIMEZONE },
    (value) => {
      const result = analyticsRegistrationsSchema.safeParse(value);
      return result.success ? result.data : null;
    }
  );
}

export function getEventsSnapshot(range: AnalyticsRange) {
  const window = getAnalyticsWindow(range);
  return rpcSnapshot<AnalyticsEvents>(
    `events:${range}:20`,
    "admin_analytics_events",
    { p_start: window.start, p_end: window.end, p_limit: 20 },
    (value) => {
      const result = analyticsEventsSchema.safeParse(value);
      return result.success ? result.data : null;
    }
  );
}

export function getPromptCopySnapshot(range: AnalyticsRange): Promise<PromptCopyAnalytics | null> {
  const cacheKey = `prompt-copies:${range}`;
  const cached = readAnalyticsCache<PromptCopyAnalytics>(cacheKey);
  if (cached) return Promise.resolve(cached);

  return coalesceAnalyticsRequest(`snapshot:${cacheKey}`, async () => {
    const recent = readAnalyticsCache<PromptCopyAnalytics>(cacheKey);
    if (recent) return recent;

    const client = getSupabaseAdmin();
    if (!client) return null;
    const window = getAnalyticsWindow(range);
    const { data, error } = await coalesceAnalyticsRequest<AnalyticsRpcResult>(`rpc:${cacheKey}`, async () => {
      const recent = readAnalyticsCache<PromptCopyAnalytics>(cacheKey);
      if (recent) return { data: recent, error: null };
      return await client.rpc("admin_analytics_prompt_copies", {
        p_start: window.start,
        p_end: window.end,
      });
    });
    if (error) return null;

    const parsed = promptCopyAnalyticsSchema.safeParse(data);
    if (!parsed.success) return null;
    writeAnalyticsCache(cacheKey, parsed.data);
    return parsed.data;
  }).catch(() => null);
}
