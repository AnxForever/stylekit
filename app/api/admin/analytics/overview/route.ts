import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { analyticsRangeSchema } from "@/lib/admin/analytics-api-contract";
import { getAnalyticsOverviewSnapshot } from "@/lib/admin/analytics-overview-server";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const url = new URL(request.url);
  const rangeResult = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  if (!rangeResult.success) {
    return NextResponse.json({ error: "Invalid analytics range." }, { status: 400 });
  }

  // Shares one reader with the server-rendered page, so the Umami Cloud source
  // (and its cache) is applied identically on navigation and on revalidation.
  const startedAt = performance.now();
  const overview = await getAnalyticsOverviewSnapshot(rangeResult.data);
  const durationMs = Math.round(performance.now() - startedAt);

  if (!overview) {
    return NextResponse.json(
      {
        error: "Failed to load analytics overview.",
        code: "ANALYTICS_QUERY_FAILED",
      },
      {
        status: 503,
        headers: { "Server-Timing": `analytics;dur=${durationMs}` },
      }
    );
  }

  return NextResponse.json(overview, {
    headers: {
      "Cache-Control": "private, max-age=0, stale-while-revalidate=60",
      "Server-Timing": `analytics;dur=${durationMs}`,
    },
  });
}
