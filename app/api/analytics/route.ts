import { getUsageStats, getTopStyles, getPopularCombinations } from "@/lib/analytics";
import { NextResponse } from "next/server";

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
