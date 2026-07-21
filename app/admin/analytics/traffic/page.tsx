import { AnalyticsPage, createAnalyticsMetadata } from "../_page";
import { analyticsRangeSchema } from "@/lib/admin/analytics-api-contract";
import { getAnalyticsOverviewSnapshot } from "@/lib/admin/analytics-overview-server";
import { getBreakdownSnapshot } from "@/lib/admin/analytics-snapshots-server";

export const metadata = createAnalyticsMetadata("traffic");

export default async function AdminTrafficAnalyticsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const params = await searchParams;
  const parsed = analyticsRangeSchema.safeParse(params.range ?? "7d");
  const range = parsed.success ? parsed.data : "7d";
  const [overview, path, referrer, country, browser, device, os, hostname, utm_source, utm_medium, utm_campaign] = await Promise.all([
    getAnalyticsOverviewSnapshot(range),
    getBreakdownSnapshot(range, "path", 10),
    getBreakdownSnapshot(range, "referrer", 10),
    getBreakdownSnapshot(range, "country", 8),
    getBreakdownSnapshot(range, "browser", 6),
    getBreakdownSnapshot(range, "device", 6),
    getBreakdownSnapshot(range, "os", 6),
    getBreakdownSnapshot(range, "hostname", 6),
    getBreakdownSnapshot(range, "utm_source", 8),
    getBreakdownSnapshot(range, "utm_medium", 8),
    getBreakdownSnapshot(range, "utm_campaign", 8),
  ]);
  return <AnalyticsPage view="traffic" initialRange={range} initialTraffic={{ overview: overview ?? undefined, path: path ?? undefined, referrer: referrer ?? undefined, country: country ?? undefined, browser: browser ?? undefined, device: device ?? undefined, os: os ?? undefined, hostname: hostname ?? undefined, utm_source: utm_source ?? undefined, utm_medium: utm_medium ?? undefined, utm_campaign: utm_campaign ?? undefined }} />;
}
