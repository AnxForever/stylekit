import { NextResponse } from "next/server";
import { searchKnowledge, getDomains } from "@/lib/knowledge";
import type { SearchDomain } from "@/lib/knowledge/types";

// Valid domains for runtime validation
const VALID_DOMAINS = getDomains();

/**
 * GET /api/knowledge/search
 *
 * Unified search across all knowledge domains
 *
 * Query params:
 * - q: search query (required)
 * - domain: specific domain to search (optional, auto-detected if not provided)
 * - limit: max results (default: 5)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const domainParam = searchParams.get("domain");
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  if (!query) {
    return NextResponse.json(
      { error: "Missing required query parameter: q" },
      { status: 400 }
    );
  }

  // Runtime validation of domain parameter
  if (domainParam && !VALID_DOMAINS.includes(domainParam as SearchDomain)) {
    return NextResponse.json(
      { error: `Invalid domain: ${domainParam}. Valid domains: ${VALID_DOMAINS.join(", ")}` },
      { status: 400 }
    );
  }

  // Use the unified searchKnowledge function from lib/knowledge
  const result = searchKnowledge(
    query,
    domainParam as SearchDomain | undefined,
    limit
  );

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
