import { getStyleBySlug } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    return NextResponse.json(
      { error: "Style not found" },
      { status: 404 }
    );
  }

  const tokens = getStyleTokens(slug);
  const recipes = getStyleRecipes(slug);

  return NextResponse.json({
    slug: style.slug,
    name: style.name,
    nameEn: style.nameEn,
    description: style.description,
    styleType: style.styleType,
    keywords: style.keywords,
    colors: style.colors,
    philosophy: style.philosophy,
    doList: style.doList,
    dontList: style.dontList,
    aiRules: style.aiRules,
    globalCss: style.globalCss,
    components: style.components,
    examplePrompts: style.examplePrompts,
    tokens: tokens || null,
    recipes: recipes ? {
      styleSlug: recipes.styleSlug,
      recipes: recipes.recipes,
    } : null,
    compatibleWith: style.compatibleWith,
  });
}
