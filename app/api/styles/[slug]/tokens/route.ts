import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tokens = getStyleTokens(slug);

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
