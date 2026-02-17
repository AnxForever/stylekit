import {
  getUsageStats,
  getTopStyles,
  getPopularCombinations,
  trackStyleUsage,
  trackStyleCombination,
} from "@/lib/analytics";
import { NextResponse } from "next/server";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const topParam = searchParams.get("top");
  if (topParam) {
    const limit = Math.min(Math.max(parseInt(topParam, 10) || 10, 1), 50);
    return NextResponse.json({
      top: getTopStyles(limit),
    });
  }

  const combinationsParam = searchParams.get("combinations");
  if (combinationsParam === "true") {
    return NextResponse.json({
      combinations: getPopularCombinations(10),
    });
  }

  return NextResponse.json(getUsageStats());
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  try {
    const body = await request.json();
    const { slug, source, slugB } = body as {
      slug?: string;
      source?: string;
      slugB?: string;
    };

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing slug" },
        { status: 400 }
      );
    }

    if (source === "page" || source === "api" || source === "mcp") {
      trackStyleUsage(slug, source);
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid source" },
        { status: 400 }
      );
    }

    if (slugB && typeof slugB === "string") {
      trackStyleCombination(slug, slugB);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
