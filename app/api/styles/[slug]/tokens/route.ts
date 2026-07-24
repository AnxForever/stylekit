import { trackStyleUsage } from "@/lib/analytics";
import { resolveStyleDelivery } from "@/lib/style-delivery";
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
  const delivery = await resolveStyleDelivery(slug);
  const tokens = delivery?.capabilities.tokens;

  if (!tokens) {
    return NextResponse.json(
      { error: "Tokens not found for this style" },
      { status: 404 }
    );
  }
  trackStyleUsageNonBlocking(delivery.style.slug);

  return NextResponse.json({
    styleSlug: slug,
    tokens,
  });
}
