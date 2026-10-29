import { NextResponse } from "next/server";

import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getSiteBaseUrl } from "@/lib/site-url";

export const revalidate = 3600;

const CACHE_CONTROL =
  "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";

/**
 * The whole curated catalog in one request: names, descriptions, colors,
 * design tokens, and the do / don't / AI rules for every style.
 *
 * Third-party tools are the intended consumers. A single file that can be
 * fetched with one curl is easier to mirror, cite, and keep accurate than 149
 * page scrapes, which is why the catalog ships in one document rather than
 * only per-slug endpoints. Component recipes stay on their own endpoints; they
 * are large and rarely needed together.
 */
export async function GET() {
  const baseUrl = getSiteBaseUrl();

  const catalog = styles.map((style) => ({
    slug: style.slug,
    name: style.name,
    nameEn: style.nameEn,
    description: style.description,
    descriptionEn: style.descriptionEn ?? style.description,
    category: style.category,
    styleType: style.styleType,
    tags: style.tags,
    keywords: style.keywords,
    keywordsEn: style.keywordsEn ?? style.keywords,
    colors: style.colors,
    tokens: getStyleTokens(style.slug) ?? null,
    rules: {
      aiRules: style.aiRules,
      aiRulesEn: style.aiRulesEn ?? style.aiRules,
      do: style.doList,
      doEn: style.doListEn ?? style.doList,
      dont: style.dontList,
      dontEn: style.dontListEn ?? style.dontList,
    },
    urls: {
      page: `${baseUrl}/en/styles/${style.slug}`,
      pageZh: `${baseUrl}/zh/styles/${style.slug}`,
      markdown: `${baseUrl}/api/styles/${style.slug}/md`,
      recipes: `${baseUrl}/api/styles/${style.slug}/recipes`,
    },
  }));

  return NextResponse.json(
    {
      name: "StyleKit style catalog",
      source: baseUrl,
      total: catalog.length,
      license: "MIT",
      licenseUrl: "https://github.com/AnxForever/stylekit/blob/main/LICENSE",
      styles: catalog,
    },
    { headers: { "Cache-Control": CACHE_CONTROL } },
  );
}
