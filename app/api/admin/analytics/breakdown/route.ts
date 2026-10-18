import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  analyticsBreakdownDimensionSchema,
  analyticsRangeSchema,
} from "@/lib/admin/analytics-api-contract";
import { getBreakdownSnapshot } from "@/lib/admin/analytics-snapshots-server";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const url = new URL(request.url);
  const range = analyticsRangeSchema.safeParse(url.searchParams.get("range") ?? "7d");
  const dimension = analyticsBreakdownDimensionSchema.safeParse(
    url.searchParams.get("dimension")
  );
  const requestedLimit = Number.parseInt(url.searchParams.get("limit") ?? "10", 10);
  const limit = Number.isFinite(requestedLimit)
    ? Math.max(1, Math.min(requestedLimit, 50))
    : 10;

  if (!range.success || !dimension.success) {
    return NextResponse.json({ error: "Invalid analytics query." }, { status: 400 });
  }

  // Shares one reader with the server-rendered page so Umami Cloud drives both.
  const startedAt = performance.now();
  const breakdown = await getBreakdownSnapshot(range.data, dimension.data, limit);
  const durationMs = Math.round(performance.now() - startedAt);

  if (!breakdown) {
    return NextResponse.json(
      {
        error: "Failed to load analytics breakdown.",
        code: "ANALYTICS_QUERY_FAILED",
      },
      { status: 503, headers: { "Server-Timing": `analytics;dur=${durationMs}` } }
    );
  }

  return NextResponse.json(breakdown, {
    headers: {
      "Cache-Control": "private, max-age=0, stale-while-revalidate=60",
      "Server-Timing": `analytics;dur=${durationMs}`,
    },
  });
}
