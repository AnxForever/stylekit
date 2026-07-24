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
  const style = delivery?.style;
  if (!style) {
    return NextResponse.json(
      { error: "Recipes not found for this style" },
      { status: 404 }
    );
  }
  trackStyleUsageNonBlocking(style.slug);

  const recipes = delivery.capabilities.recipes;

  if (!recipes || Object.keys(recipes.recipes).length === 0) {
    return NextResponse.json(
      { error: "Recipes not found for this style" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    styleSlug: recipes.styleSlug,
    recipes: recipes.recipes,
  });
}
