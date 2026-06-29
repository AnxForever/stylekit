/**
 * Data access layer over @stylekit/core. Keeps all knowledge of the core API
 * in one place so the tool handlers stay thin and composable.
 */

import {
  styles,
  getStyleBySlug,
  getStyleTokens,
  hasStyleTokens,
} from "@stylekit/core/styles";
import {
  getRecipe,
  getRecipeIds,
  hasRecipes,
  renderRecipe,
} from "@stylekit/core/recipes";
import type { DesignStyle, StyleTokens } from "@stylekit/core/styles";

export const SITE_URL = "https://stylekit.top";

export type StyleCategory = "modern" | "retro" | "minimal" | "expressive";

export interface StyleSummary {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  tags: string[];
  description: string;
}

function toSummary(s: DesignStyle): StyleSummary {
  return {
    slug: s.slug,
    name: s.name,
    nameEn: s.nameEn,
    category: s.category,
    tags: s.tags,
    description: s.descriptionEn ?? s.description,
  };
}

export interface SearchOptions {
  query?: string;
  category?: StyleCategory;
  limit: number;
}

export function searchStyles(opts: SearchOptions): {
  total: number;
  results: StyleSummary[];
} {
  let pool: DesignStyle[] = styles;
  if (opts.category) {
    pool = pool.filter((s) => s.category === opts.category);
  }
  if (opts.query) {
    const q = opts.query.toLowerCase();
    pool = pool.filter(
      (s) =>
        s.slug.includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }
  return {
    total: pool.length,
    results: pool.slice(0, opts.limit).map(toSummary),
  };
}

/** The one-line shadcn install command for a style. */
export function shadcnInstallCommand(slug: string): string {
  return `npx shadcn add ${SITE_URL}/r/${slug}.json`;
}

export function knownSlug(slug: string): boolean {
  return getStyleBySlug(slug) !== undefined;
}

export interface StyleDetail {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  tags: string[];
  description: string;
  philosophy: string;
  colors: { primary: string; secondary: string; accent: string[] };
  doList: string[];
  dontList: string[];
  keywords: string[];
  hasTokens: boolean;
  hasRecipes: boolean;
  recipeIds: string[];
  shadcnInstall: string;
  url: string;
}

export function getStyleDetail(slug: string): StyleDetail | null {
  const s = getStyleBySlug(slug);
  if (!s) return null;
  return {
    slug: s.slug,
    name: s.name,
    nameEn: s.nameEn,
    category: s.category,
    tags: s.tags,
    description: s.descriptionEn ?? s.description,
    philosophy: s.philosophyEn ?? s.philosophy,
    colors: s.colors,
    doList: s.doListEn ?? s.doList,
    dontList: s.dontListEn ?? s.dontList,
    keywords: s.keywordsEn ?? s.keywords,
    hasTokens: hasStyleTokens(slug),
    hasRecipes: hasRecipes(slug),
    recipeIds: getRecipeIds(slug),
    shadcnInstall: shadcnInstallCommand(slug),
    url: `${SITE_URL}/styles/${slug}`,
  };
}

export function getTokens(slug: string): StyleTokens | null {
  return getStyleTokens(slug) ?? null;
}

export interface RecipeResult {
  slug: string;
  component: string;
  className: string;
  code: string;
}

export function getComponentRecipe(
  slug: string,
  component: string,
): RecipeResult | null {
  const recipe = getRecipe(slug, component);
  if (!recipe) return null;
  const variantId = Object.keys(recipe.variants)[0] ?? "default";
  const rendered = renderRecipe(recipe, {
    variant: variantId,
    params: {},
    slots: {},
  });
  return {
    slug,
    component,
    className: rendered.className,
    code: rendered.code,
  };
}
