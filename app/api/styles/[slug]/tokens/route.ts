import { trackStyleUsage } from "@/lib/analytics";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { after, NextResponse } from "next/server";

function trackStyleUsageNonBlocking(slug: string): void {
  try {
    after(() => {
      trackStyleUsage(slug, "api");
    });
  } catch {
    trackStyleUsage(slug, "api");
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const resolved = await resolveStyleBySlug(slug);
  const tokens = resolved?.tokens;

  if (!tokens) {
    return NextResponse.json(
      { error: "Tokens not found for this style" },
      { status: 404 }
    );
  }
  trackStyleUsageNonBlocking(resolved.style.slug);

  return NextResponse.json({
    styleSlug: slug,
    tokens,
  });
}
