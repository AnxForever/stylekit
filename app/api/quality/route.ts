import { NextRequest, NextResponse } from "next/server";
import {
  scoreStyleQuality,
  generateQualityReport,
} from "@/lib/quality/scorer";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit({
    namespace: "quality",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    const score = scoreStyleQuality(slug);
    if (!score) {
      return NextResponse.json(
        { error: `Style "${slug}" not found` },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: score });
  }

  const report = generateQualityReport();
  return NextResponse.json({ success: true, data: report });
}
