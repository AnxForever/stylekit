import { AnalyticsPage, createAnalyticsMetadata } from "./_page";
import { analyticsRangeSchema } from "@/lib/admin/analytics-api-contract";
import { getAnalyticsOverviewSnapshot } from "@/lib/admin/analytics-overview-server";

export const metadata = createAnalyticsMetadata("overview");

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const params = await searchParams;
  const parsedRange = analyticsRangeSchema.safeParse(params.range ?? "7d");
  const range = parsedRange.success ? parsedRange.data : "7d";
  const snapshot = await getAnalyticsOverviewSnapshot(range);
  return (
    <AnalyticsPage
      view="overview"
      initialRange={range}
      initialOverview={snapshot ?? undefined}
    />
  );
}
