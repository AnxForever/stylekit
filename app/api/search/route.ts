import { NextRequest, NextResponse } from "next/server";

import { searchStyleSlugs } from "@/lib/retrieval/style-search-service";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

const MAX_QUERY_LENGTH = 200;

// Rankings change only with a deployment; identical queries can be shared.
const SEARCH_CACHE_CONTROL =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

/**
 * Hybrid style search: BM25 + vector + RRF over the curated catalog.
 *
 * Returns ranked slugs only. Callers already hold the catalog (from
 * `/api/styles`) and join on slug, so this stays small and cacheable. `mode`
 * says whether the vector path answered or the keyword path served alone.
 */
export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit({
    namespace: "style-search",
    key: getRequestClientKey(request),
    limit: 60,
    windowMs: 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const query = (request.nextUrl.searchParams.get("q") ?? "").trim();
  if (!query) {
    return NextResponse.json({ error: "Missing query parameter q." }, { status: 400 });
  }
  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json(
      { error: `Query must be at most ${MAX_QUERY_LENGTH} characters.` },
      { status: 400 },
    );
  }

  try {
    const result = await searchStyleSlugs(query);
    return NextResponse.json(
      { query, total: result.results.length, ...result },
      // A degraded answer is cached briefly so the vector path gets retried soon.
      {
        headers: {
          "Cache-Control": result.mode === "hybrid" ? SEARCH_CACHE_CONTROL : "public, max-age=60",
        },
      },
    );
  } catch (error) {
    console.error("[api/search] failed:", error);
    return NextResponse.json({ error: "Search is temporarily unavailable." }, { status: 503 });
  }
}
