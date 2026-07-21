import { AnalyticsPage, createAnalyticsMetadata } from "../_page";
import { analyticsRangeSchema } from "@/lib/admin/analytics-api-contract";
import { getContentSnapshot, getEventsSnapshot } from "@/lib/admin/analytics-snapshots-server";

export const metadata = createAnalyticsMetadata("content");

export default async function AdminContentAnalyticsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  const params = await searchParams;
  const parsed = analyticsRangeSchema.safeParse(params.range ?? "7d");
  const range = parsed.success ? parsed.data : "7d";
  const [content, events] = await Promise.all([getContentSnapshot(range), getEventsSnapshot(range)]);
  return <AnalyticsPage view="content" initialRange={range} initialContent={content ?? undefined} initialEvents={events ?? undefined} />;
}
