import { getStyleRecipes } from "@/lib/recipes";
import { trackStyleUsage } from "@/lib/analytics";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  trackStyleUsage(slug, "api");
  const recipes = getStyleRecipes(slug);

  if (!recipes) {
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
