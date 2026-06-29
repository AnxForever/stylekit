/**
 * @module lib/discovery
 *
 * High-level style discovery helpers — search, detail, shadcn install command,
 * and recipe rendering — shared by @stylekit/mcp and @stylekit/cli so the data
 * layer lives in one place. Re-exported as @stylekit/core/discovery.
 */

import { styles, getStyleBySlug } from "./styles";
import { getRecipe, getRecipeIds, renderRecipe } from "./recipes";
import { hasStyleTokens } from "./styles/tokens-registry";
import type { DesignStyle } from "./styles";

export const STYLEKIT_SITE_URL = "https://stylekit.top";

export type DiscoveryCategory = "modern" | "retro" | "minimal" | "expressive";

export interface StyleSummary {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  tags: string[];
  description: string;
}

export interface StyleDetail extends StyleSummary {
  philosophy: string;
  colors: { primary: string; secondary: string; accent: string[] };
  doList: string[];
  dontList: string[];
  hasTokens: boolean;
  recipeIds: string[];
  shadcnInstall: string;
  url: string;
}

export interface RecipeResult {
  slug: string;
  component: string;
  className: string;
  code: string;
}

export interface SearchOptions {
  query?: string;
  category?: DiscoveryCategory;
  limit?: number;
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

/** The one-line shadcn install command for a style's theme. */
export function shadcnInstallCommand(slug: string): string {
  return `npx shadcn add ${STYLEKIT_SITE_URL}/r/${slug}.json`;
}

export function knownSlug(slug: string): boolean {
  return getStyleBySlug(slug) !== undefined;
}

/**
 * Search or list styles. With no query, returns all styles (optionally filtered
 * by category) — a plain listing. With a query, matches slug/name/description/
 * tags/keywords case-insensitively. `total` is the match count before `limit`.
 */
export function searchStyles(opts: SearchOptions = {}): {
  total: number;
  results: StyleSummary[];
} {
  let pool: DesignStyle[] = opts.category
    ? styles.filter((s) => s.category === opts.category)
    : styles;
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
  const total = pool.length;
  const results = (opts.limit ? pool.slice(0, opts.limit) : pool).map(toSummary);
  return { total, results };
}

export function getStyleDetail(slug: string): StyleDetail | null {
  const s = getStyleBySlug(slug);
  if (!s) return null;
  return {
    ...toSummary(s),
    philosophy: s.philosophyEn ?? s.philosophy,
    colors: s.colors,
    doList: s.doListEn ?? s.doList,
    dontList: s.dontListEn ?? s.dontList,
    hasTokens: hasStyleTokens(slug),
    recipeIds: getRecipeIds(slug),
    shadcnInstall: shadcnInstallCommand(slug),
    url: `${STYLEKIT_SITE_URL}/styles/${slug}`,
  };
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
  return { slug, component, className: rendered.className, code: rendered.code };
}
