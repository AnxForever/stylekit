import { scoreStyle, scoreAllStyles } from "@/lib/accessibility";
import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit({
    namespace: "accessibility",
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
    const score = scoreStyle(slug);
    if (!score) {
      return NextResponse.json(
        { error: "Style not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ slug, ...score });
  }

  const scores = scoreAllStyles();
  return NextResponse.json(scores);
}
