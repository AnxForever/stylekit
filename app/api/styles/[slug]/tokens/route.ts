import { trackStyleUsage } from "@/lib/analytics";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  trackStyleUsage(slug, "api");
  const resolved = await resolveStyleBySlug(slug);
  const tokens = resolved?.tokens;

  if (!tokens) {
    return NextResponse.json(
      { error: "Tokens not found for this style" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    styleSlug: slug,
    tokens,
  });
}
