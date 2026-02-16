import { scoreStyle, scoreAllStyles } from "@/lib/accessibility";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
