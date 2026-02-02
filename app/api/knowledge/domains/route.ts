import { NextResponse } from "next/server";
import { getDomains, getDomainDescription } from "@/lib/knowledge";
import type { SearchDomain } from "@/lib/knowledge";

/**
 * GET /api/knowledge/domains
 *
 * List all available knowledge domains with descriptions.
 */
export async function GET() {
  const domains = getDomains();

  const result = domains.map((domain: SearchDomain) => ({
    id: domain,
    description: getDomainDescription(domain),
  }));

  return NextResponse.json(
    {
      count: result.length,
      domains: result,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}
