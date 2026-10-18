/**
 * Self-hosted Umami API client.
 *
 * Official docs: https://docs.umami.is/docs/api
 *
 * The instance lives under a subpath (`https://www.stylekit.top/umami`), so its
 * read API is `https://www.stylekit.top/umami/api`. Authentication differs from
 * Cloud: exchange the admin username and password for a Bearer token, then use
 * that token. Cloud's API-key route requires a paid plan, which is why this
 * deployment is self-hosted.
 *
 * Configuration is server-runtime only. Credentials must never reach the
 * browser, so nothing here is read through a NEXT_PUBLIC_ variable.
 */

import "server-only";

import { z } from "zod";
import type { AnalyticsRange } from "@/lib/admin/analytics-api-contract";
import { UMAMI_HOST, UMAMI_SCRIPT_URL } from "./umami-constants";

export { UMAMI_HOST, UMAMI_SCRIPT_URL };

/** Asia/Shanghai matches every other date bucket the admin surfaces render. */
export const UMAMI_TIMEZONE = "Asia/Shanghai";

export const UMAMI_API_BASE_URL = `https://${UMAMI_HOST}/umami/api`;

const RANGE_MS: Record<AnalyticsRange, number> = {
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  "90d": 90 * 24 * 60 * 60 * 1000,
};

const REQUEST_TIMEOUT_MS = 8_000;

// ── Configuration ───────────────────────────────────────────

export interface UmamiConfig {
  username: string;
  password: string;
  websiteId: string;
  /** `https://www.stylekit.top/umami/api`. */
  baseUrl: string;
}

function readEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

/**
 * Resolve credentials from the environment. Returns null when the username,
 * password, or website ID is missing, which is the signal for callers to fall
 * back to the self-built snapshot instead of failing the page.
 */
export function getUmamiConfig(): UmamiConfig | null {
  const username = readEnv("UMAMI_USERNAME");
  const password = readEnv("UMAMI_PASSWORD");
  const websiteId = readEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID");
  if (!username || !password || !websiteId) return null;

  // Trailing slashes would double up against the `/websites/...` suffix.
  const baseUrl = (
    readEnv("UMAMI_API_BASE_URL") || UMAMI_API_BASE_URL
  ).replace(/\/+$/, "");
  return { username, password, websiteId, baseUrl };
}

// ── Query helpers ───────────────────────────────────────────

export interface UmamiWindow {
  /** Unix milliseconds. */
  startAt: number;
  /** Unix milliseconds. */
  endAt: number;
  /** `day` for multi-day ranges, `hour` for the 24-hour view. */
  unit: "hour" | "day";
}

export function getUmamiWindow(
  range: AnalyticsRange,
  now: Date = new Date()
): UmamiWindow {
  const endAt = now.getTime();
  return {
    startAt: endAt - RANGE_MS[range],
    endAt,
    unit: range === "24h" ? "hour" : "day",
  };
}

// ── Response shapes ─────────────────────────────────────────

export const umamiStatsSchema = z.object({
  pageviews: z.number(),
  visitors: z.number(),
  visits: z.number(),
  bounces: z.number(),
  totaltime: z.number(),
  comparison: z
    .object({
      pageviews: z.number(),
      visitors: z.number(),
      visits: z.number(),
      bounces: z.number(),
      totaltime: z.number(),
    })
    .optional(),
});

export type UmamiStats = z.infer<typeof umamiStatsSchema>;

const timeSeriesPointSchema = z.object({ x: z.string(), y: z.number() });

export const umamiPageviewsSchema = z.object({
  pageviews: z.array(timeSeriesPointSchema),
  sessions: z.array(timeSeriesPointSchema),
  comparison: z
    .object({
      pageviews: z.array(timeSeriesPointSchema),
      sessions: z.array(timeSeriesPointSchema),
    })
    .optional(),
});

export type UmamiPageviews = z.infer<typeof umamiPageviewsSchema>;

/**
 * Metrics rows. `x` is the dimension value and `y` the count; `t` is an
 * optional display label and is not always present.
 */
export const umamiMetricRowSchema = z.object({
  x: z.string(),
  y: z.number(),
  t: z.string().nullish(),
});

export type UmamiMetricRow = z.infer<typeof umamiMetricRowSchema>;

export const umamiMetricsSchema = z.array(umamiMetricRowSchema);

/**
 * The dimension names accepted by `GET /websites/{id}/metrics?type=`.
 * Umami uses camelCase (`utmSource`); the admin contract uses snake_case
 * (`utm_source`), so the two are mapped explicitly rather than aliased.
 */
const METRIC_TYPE_BY_DIMENSION = {
  path: "path",
  referrer: "referrer",
  country: "country",
  browser: "browser",
  os: "os",
  device: "device",
  hostname: "hostname",
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
} as const;

export type UmamiMetricDimension = keyof typeof METRIC_TYPE_BY_DIMENSION;

// ── Transport ───────────────────────────────────────────────

export class UmamiError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "UmamiError";
  }
}

/**
 * Cached Bearer token. Self-hosted Umami issues a short-lived JWT, so it is
 * refreshed on expiry or on the first 401 rather than on every request.
 */
let cachedToken: { value: string; // no expiry is exposed; refreshed on 401
} | null = null;

async function login(config: UmamiConfig): Promise<string> {
  const response = await fetch(`${config.baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      username: config.username,
      password: config.password,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new UmamiError(
      `Umami login failed with HTTP ${response.status}`,
      response.status
    );
  }

  const parsed = z.object({ token: z.string() }).safeParse(await response.json());
  if (!parsed.success) {
    throw new UmamiError("Umami login returned an unexpected payload");
  }
  return parsed.data.token;
}

async function getToken(config: UmamiConfig, forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken) return cachedToken.value;
  const value = await login(config);
  cachedToken = { value };
  return value;
}

async function umamiGet(
  config: UmamiConfig,
  path: string,
  params: Record<string, string | number>
): Promise<unknown> {
  const url = new URL(`${config.baseUrl}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const request = (token: string) =>
    fetch(url, {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      // The admin layer has its own short-lived cache; a Next.js data-cache
      // entry here would survive a range switch and serve stale numbers.
      cache: "no-store",
    });

  let response = await request(await getToken(config));
  if (response.status === 401) {
    // Token expired between requests: re-authenticate once and retry.
    response = await request(await getToken(config, true));
  }

  if (!response.ok) {
    // Never echo credentials or the body: both can carry secrets.
    throw new UmamiError(
      `Umami request failed with HTTP ${response.status}`,
      response.status
    );
  }

  return response.json();
}

function windowParams(
  window: UmamiWindow,
  extra: Record<string, string | number> = {}
): Record<string, string | number> {
  return {
    startAt: window.startAt,
    endAt: window.endAt,
    timezone: UMAMI_TIMEZONE,
    ...extra,
  };
}

// ── Public readers ──────────────────────────────────────────

/** Summary stats plus the previous-period comparison. */
export async function fetchUmamiStats(
  config: UmamiConfig,
  range: AnalyticsRange,
  now?: Date
): Promise<UmamiStats> {
  const raw = await umamiGet(
    config,
    `/websites/${encodeURIComponent(config.websiteId)}/stats`,
    windowParams(getUmamiWindow(range, now), { compare: "prev" })
  );
  return umamiStatsSchema.parse(raw);
}

/** Pageview and session time series, with the previous period when asked. */
export async function fetchUmamiPageviews(
  config: UmamiConfig,
  range: AnalyticsRange,
  options: { compare?: boolean; now?: Date } = {}
): Promise<UmamiPageviews> {
  const extra: Record<string, string | number> = {
    unit: getUmamiWindow(range, options.now).unit,
  };
  if (options.compare) extra.compare = "prev";

  const raw = await umamiGet(
    config,
    `/websites/${encodeURIComponent(config.websiteId)}/pageviews`,
    windowParams(getUmamiWindow(range, options.now), extra)
  );
  return umamiPageviewsSchema.parse(raw);
}

/** Ranked rows for one dimension. */
export async function fetchUmamiMetrics(
  config: UmamiConfig,
  dimension: UmamiMetricDimension,
  range: AnalyticsRange,
  limit: number,
  now?: Date
): Promise<UmamiMetricRow[]> {
  const raw = await umamiGet(
    config,
    `/websites/${encodeURIComponent(config.websiteId)}/metrics`,
    windowParams(getUmamiWindow(range, now), {
      type: METRIC_TYPE_BY_DIMENSION[dimension],
      limit: Math.max(1, Math.min(limit, 500)),
    })
  );
  return umamiMetricsSchema.parse(raw);
}
