/** Data access over @stylekit/core for the CLI commands. */

import {
  styles,
  getStyleBySlug,
  getStyleTokens,
  hasStyleTokens,
} from "@stylekit/core/styles";
import {
  getRecipe,
  getRecipeIds,
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

export function listStyles(
  category?: StyleCategory,
  limit?: number,
): StyleSummary[] {
  const pool = category
    ? styles.filter((s) => s.category === category)
    : styles;
  const mapped = pool.map(toSummary);
  return limit ? mapped.slice(0, limit) : mapped;
}

export function searchStyles(query: string, limit = 20): StyleSummary[] {
  const q = query.toLowerCase();
  return styles
    .filter(
      (s) =>
        s.slug.includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.keywords.some((k) => k.toLowerCase().includes(q)),
    )
    .slice(0, limit)
    .map(toSummary);
}

export function shadcnInstallCommand(slug: string): string {
  return `npx shadcn add ${SITE_URL}/r/${slug}.json`;
}

export function knownSlug(slug: string): boolean {
  return getStyleBySlug(slug) !== undefined;
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
  return { slug, component, className: rendered.className, code: rendered.code };
}
