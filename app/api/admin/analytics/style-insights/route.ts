import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { analyticsRangeSchema } from "@/lib/admin/analytics-api-contract";
import { getStyleInsightsSnapshot } from "@/lib/admin/style-insights-server";

const RESPONSE_HEADERS = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, {
      status: access.status ?? 403, headers: RESPONSE_HEADERS,
    });
  }

  const range = analyticsRangeSchema.safeParse(new URL(request.url).searchParams.get("range") ?? "7d");
  if (!range.success) {
    return NextResponse.json({ error: "Invalid analytics range." }, { status: 400, headers: RESPONSE_HEADERS });
  }
  const startedAt = performance.now();
  const result = await getStyleInsightsSnapshot(range.data);
  const headers = { ...RESPONSE_HEADERS, "Server-Timing": `analytics;dur=${Math.round(performance.now() - startedAt)}` };
  if (!result.data) {
    return NextResponse.json({ error: result.error, code: result.code }, { status: result.status, headers });
  }
  return NextResponse.json(result.data, {
    headers: { ...headers, "X-StyleKit-Analytics-Cache": result.cache },
  });
}
