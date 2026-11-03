import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { analyticsRangeSchema } from "@/lib/admin/analytics-api-contract";
import { getAnalyticsOverviewSnapshotResult } from "@/lib/admin/analytics-overview-server";

const RESPONSE_HEADERS = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403, headers: RESPONSE_HEADERS }
    );
  }

  const url = new URL(request.url);
  const rangeResult = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  if (!rangeResult.success) {
    return NextResponse.json({ error: "Invalid analytics range." }, { status: 400, headers: RESPONSE_HEADERS });
  }

  const startedAt = performance.now();
  const result = await getAnalyticsOverviewSnapshotResult(rangeResult.data);
  const durationMs = Math.round(performance.now() - startedAt);

  if (!result.data) {
    return NextResponse.json(
      {
        error: "Analytics overview is unavailable from Umami and internal storage.",
        code: "ANALYTICS_UNAVAILABLE",
      },
      {
        status: 503,
        headers: {
          ...RESPONSE_HEADERS,
          "Server-Timing": `analytics;dur=${durationMs}`,
        },
      }
    );
  }

  return NextResponse.json(result.data, {
    headers: {
      ...RESPONSE_HEADERS,
      "Server-Timing": `analytics;dur=${durationMs}`,
      "X-StyleKit-Analytics-Cache":
        result.source === "persistent_fallback"
          ? "STALE"
          : result.source === "memory"
            ? "HIT"
            : "MISS",
    },
  });
}
