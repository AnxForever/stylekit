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
      { error: "Style not found" },
      { status: 404 }
    );
  }
  trackStyleUsageNonBlocking(style.slug);

  const { capabilities } = delivery;
  const tokens = capabilities.tokens;
  const recipes = capabilities.recipes;

  return NextResponse.json({
    source: delivery.source,
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
    readiness: capabilities.readiness,
    accessibility: capabilities.accessibility,
    version: capabilities.versioning?.current ?? null,
    changelog: capabilities.versioning?.versions ?? [],
  });
}
