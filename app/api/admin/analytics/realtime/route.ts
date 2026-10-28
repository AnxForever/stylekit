import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getAnalyticsRealtime } from "@/lib/admin/analytics-realtime-server";

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const startedAt = performance.now();
  const data = await getAnalyticsRealtime();
  const durationMs = Math.round(performance.now() - startedAt);

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "private, max-age=0, stale-while-revalidate=15",
      "Server-Timing": `analytics;dur=${durationMs}`,
    },
  });
}
