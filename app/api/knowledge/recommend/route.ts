import { NextResponse } from "next/server";
import { getDesignRecommendation } from "@/lib/knowledge";
import type { StackId } from "@/lib/knowledge";

/**
 * GET /api/knowledge/recommend
 *
 * Generate a comprehensive design recommendation for a product type.
 *
 * Query params:
 * - q: product query (required, e.g. "SaaS dashboard", "e-commerce")
 * - stack: stack ID (optional, e.g. "nextjs", "react-vite")
 * - maxGuidelines: max guidelines per domain (default: 5)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const stackId = searchParams.get("stack") as StackId | null;
  const maxGuidelines = parseInt(searchParams.get("maxGuidelines") || "5", 10);

  if (!query) {
    return NextResponse.json(
      { error: "Missing required query parameter: q" },
      { status: 400 }
    );
  }

  const recommendation = getDesignRecommendation(query, {
    stackId: stackId || undefined,
    maxGuidelines,
  });

  return NextResponse.json(recommendation, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
