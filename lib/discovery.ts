/**
 * @module lib/discovery
 *
 * High-level style discovery helpers — search, detail, registry URL/install
 * command, token lookup, and recipe rendering — shared by @stylekit/mcp and
 * @stylekit/cli so the data layer lives in one place. Re-exported as
 * @stylekit/core/discovery.
 */

import { styles, getStyleBySlug } from "./styles";
import { getRecipe, getRecipeIds, hasRecipes, renderRecipe } from "./recipes";
import { getStyleTokens, hasStyleTokens } from "./styles/tokens-registry";
import { expandQueryTerms, colorIntentMatches } from "./search/synonyms";
import type { DesignStyle } from "./styles";
import type { StyleTokens } from "./styles/tokens";
import type { StyleCategory } from "./styles/meta";

/** Canonical host (matches the site's www canonical to avoid a 301 redirect). */
export const STYLEKIT_SITE_URL = "https://www.stylekit.top";

/** Reuse the canonical style category union so it can't drift. */
export type DiscoveryCategory = StyleCategory;

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
  keywords: string[];
  hasTokens: boolean;
  hasRecipes: boolean;
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

/** The registry-item URL for a style (canonical host). */
export function registryUrl(slug: string): string {
  return `${STYLEKIT_SITE_URL}/r/${slug}.json`;
}

/** The one-line shadcn install command for a style's theme. */
export function shadcnInstallCommand(slug: string): string {
  return `npx shadcn add ${registryUrl(slug)}`;
}

export function knownSlug(slug: string): boolean {
  return getStyleBySlug(slug) !== undefined;
}

/** Design tokens for a style, or null if none are registered. */
export function getTokens(slug: string): StyleTokens | null {
  return getStyleTokens(slug) ?? null;
}

/**
 * Relevance score for a style against a query, or 0 for no match. Higher wins.
 * Matches the raw query first (name/slug/tag/keyword/description), then falls
 * back to bilingual synonym expansion and palette colour intent so meaning-based
 * queries ("professional", "dark", "blue") match even when the word is absent.
 */
function scoreStyle(s: DesignStyle, q: string, terms: string[]): number {
  const name = s.nameEn.toLowerCase();
  const zhName = s.name.toLowerCase();
  const slug = s.slug.toLowerCase();
  const desc = `${s.description} ${s.descriptionEn ?? ""}`.toLowerCase();
  const tags = s.tags.map((t) => t.toLowerCase());
  const keywords = s.keywords.map((k) => k.toLowerCase());

  if (slug === q || name === q || zhName === q) return 100;
  if (name.includes(q) || zhName.includes(q) || slug.includes(q)) return 80;
  if (tags.some((t) => t.includes(q))) return 60;
  if (keywords.some((k) => k.includes(q))) return 55;
  if (desc.includes(q)) return 40;

  // Bilingual synonym expansion against the full haystack.
  const hay = [name, zhName, slug, desc, ...tags, ...keywords].join(" ");
  for (const t of terms) {
    if (t !== q && t.length > 1 && hay.includes(t)) return 30;
  }

  // Palette colour intent ("blue" -> styles with a blue in their palette).
  const palette = [s.colors.primary, s.colors.secondary, ...(s.colors.accent ?? [])];
  if (colorIntentMatches(q, palette)) return 20;

  return 0;
}

/**
 * Search or list styles. With no query, returns all styles (optionally filtered
 * by category) — a plain listing. With a query, ranks styles by relevance using
 * bilingual synonym expansion and palette colour intent. `total` is the match
 * count before `limit`.
 */
export function searchStyles(opts: SearchOptions = {}): {
  total: number;
  results: StyleSummary[];
} {
  let pool: DesignStyle[] = opts.category
    ? styles.filter((s) => s.category === opts.category)
    : styles;
  if (opts.query) {
    const q = opts.query.trim().toLowerCase();
    const terms = expandQueryTerms(q);
    pool = pool
      .map((s) => ({ s, score: scoreStyle(s, q, terms) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.s.nameEn.localeCompare(b.s.nameEn))
      .map((x) => x.s);
  }
  const total = pool.length;
  const limited =
    typeof opts.limit === "number" && opts.limit > 0
      ? pool.slice(0, opts.limit)
      : pool;
  return { total, results: limited.map(toSummary) };
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
    keywords: s.keywordsEn ?? s.keywords,
    hasTokens: hasStyleTokens(slug),
    hasRecipes: hasRecipes(slug),
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
