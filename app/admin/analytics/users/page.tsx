import { AnalyticsPage, createAnalyticsMetadata } from "../_page";
import { analyticsRangeSchema } from "@/lib/admin/analytics-api-contract";
import { getAnalyticsOverviewSnapshot } from "@/lib/admin/analytics-overview-server";
import { getRegistrationsSnapshot } from "@/lib/admin/analytics-snapshots-server";

export const metadata = createAnalyticsMetadata("users");

export default async function AdminUserAnalyticsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const params = await searchParams;
  const parsed = analyticsRangeSchema.safeParse(params.range ?? "7d");
  const range = parsed.success ? parsed.data : "7d";
  const [overview, registrations] = await Promise.all([
    getAnalyticsOverviewSnapshot(range),
    getRegistrationsSnapshot(range),
  ]);
  return <AnalyticsPage view="users" initialRange={range} initialOverview={overview ?? undefined} initialRegistrations={registrations ?? undefined} />;
}
