"use client";

import { preload } from "swr";
import type { AnalyticsRange } from "@/lib/admin/analytics-api-contract";
import { fetcher } from "./fetcher";

const trafficDimensions = [
  ["path", 10],
  ["referrer", 10],
  ["country", 8],
  ["browser", 6],
  ["device", 6],
  ["os", 6],
  ["hostname", 6],
  ["utm_source", 8],
  ["utm_medium", 8],
  ["utm_campaign", 8],
] as const;

export function prefetchAnalyticsView(view: string, range: AnalyticsRange) {
  const keys: string[] = [];

  if (view === "overview" || view === "traffic" || view === "users") {
    keys.push(`/api/admin/analytics/overview?range=${range}`);
  }
  if (view === "traffic") {
    for (const [dimension, limit] of trafficDimensions) {
      keys.push(`/api/admin/analytics/breakdown?range=${range}&dimension=${dimension}&limit=${limit}`);
    }
  }
  if (view === "content") {
    keys.push(`/api/admin/analytics/content?range=${range}`);
    keys.push(`/api/admin/analytics/events?range=${range}`);
  }
  if (view === "users") {
    keys.push(`/api/admin/analytics/registrations?range=${range}`);
  }
  if (view === "audit") {
    keys.push("/api/admin/audit?limit=12&offset=0&days=7");
  }

  return Promise.allSettled(keys.map((key) => preload(key, fetcher)));
}

export function prefetchCommonAnalytics(range: AnalyticsRange) {
  return Promise.allSettled([
    prefetchAnalyticsView("traffic", range),
    prefetchAnalyticsView("content", range),
    prefetchAnalyticsView("users", range),
  ]);
}
