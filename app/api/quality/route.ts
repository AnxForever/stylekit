import { NextRequest, NextResponse } from "next/server";
import {
  scoreStyleQuality,
  generateQualityReport,
} from "@/lib/quality/scorer";

export async function GET(request: NextRequest) {
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
