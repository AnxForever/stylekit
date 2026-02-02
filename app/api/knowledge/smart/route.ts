import { NextRequest, NextResponse } from "next/server";
import {
  getSmartRecommendation,
  compareStyles,
  suggestStyleByConstraints,
} from "@/lib/knowledge";
import type { RecommendationContext } from "@/lib/knowledge";

/**
 * POST /api/knowledge/smart
 * Get smart design recommendations with scoring and context
 *
 * Body: {
 *   productQuery: string,
 *   context?: RecommendationContext
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productQuery, context = {} } = body;

    if (!productQuery || typeof productQuery !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'productQuery' field" },
        { status: 400 }
      );
    }

    const result = getSmartRecommendation(
      productQuery,
      context as RecommendationContext
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * GET /api/knowledge/smart?action=compare&style1=X&style2=Y&product=Z
 * GET /api/knowledge/smart?action=suggest&mustHave=X,Y&priorities=Z
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "compare") {
    const style1 = searchParams.get("style1");
    const style2 = searchParams.get("style2");
    const product = searchParams.get("product");

    if (!style1 || !style2 || !product) {
      return NextResponse.json(
        { error: "Missing style1, style2, or product parameter" },
        { status: 400 }
      );
    }

    const result = compareStyles(product, style1, style2, {});
    return NextResponse.json(result);
  }

  if (action === "suggest") {
    const mustHave = searchParams.get("mustHave")?.split(",").filter(Boolean) || [];
    const mustNotHave = searchParams.get("mustNotHave")?.split(",").filter(Boolean) || [];
    const priorities = (searchParams.get("priorities")?.split(",").filter(Boolean) || []) as (
      | "performance"
      | "accessibility"
      | "visual-impact"
      | "professionalism"
    )[];

    const result = suggestStyleByConstraints({
      mustHave,
      mustNotHave,
      priorities,
    });

    return NextResponse.json({
      suggestions: result.slice(0, 10),
      count: result.length,
    });
  }

  return NextResponse.json(
    {
      error: "Invalid action. Use 'compare' or 'suggest'",
      examples: [
        "/api/knowledge/smart?action=compare&style1=neo-brutalist&style2=glassmorphism&product=portfolio",
        "/api/knowledge/smart?action=suggest&priorities=accessibility,performance",
      ],
    },
    { status: 400 }
  );
}
