import { getStyleRecipes } from "@/lib/recipes";
import { scoreStyle } from "@/lib/accessibility";
import { getCurrentVersion, getChangelog } from "@/lib/versioning";
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
  const style = resolved?.style;

  if (!style) {
    return NextResponse.json(
      { error: "Style not found" },
      { status: 404 }
    );
  }

  const tokens = resolved.tokens;
  const recipes = resolved.source === "static"
    ? getStyleRecipes(slug)
    : null;

  return NextResponse.json({
    source: resolved.source,
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
    accessibility: resolved.source === "static" ? scoreStyle(slug) : null,
    version: resolved.source === "static" ? getCurrentVersion(slug) : null,
    changelog: resolved.source === "static" ? getChangelog(slug) : [],
  });
}
