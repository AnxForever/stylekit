import { getAllStylesMeta } from "./meta";
import type { StyleCategory } from "./meta-types";

export interface StyleColorEntry {
  slug: string;
  name: string;
  nameEn: string;
  category: StyleCategory;
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  /** Every hex/color value in this palette, de-duplicated, lowercased. */
  swatches: string[];
}

/** Normalize a color token to a comparable, copy-friendly string. */
function normalizeHex(value: string): string {
  return value.trim().toLowerCase();
}

function isHexLike(value: string): boolean {
  return /^#?[0-9a-f]{3,8}$/i.test(value.trim());
}

/**
 * Aggregate every style's palette into a flat, searchable structure.
 * Powers the /colors explorer — the long-tail SEO surface for queries like
 * "#667eea", "bauhaus colors", "cyberpunk palette".
 */
export function getAllStyleColors(): StyleColorEntry[] {
  return getAllStylesMeta()
    .filter((style) => style.colors && Array.isArray(style.colors.accent))
    .map((style) => {
      const raw = [
        style.colors.primary,
        style.colors.secondary,
        ...style.colors.accent,
      ].filter((c): c is string => typeof c === "string" && c.length > 0);

      const swatches = Array.from(
        new Set(raw.filter(isHexLike).map(normalizeHex))
      );

      return {
        slug: style.slug,
        name: style.name,
        nameEn: style.nameEn,
        category: style.category,
        colors: style.colors,
        swatches,
      };
    })
    .filter((entry) => entry.swatches.length > 0)
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

/** Total distinct hex values across all styles — used in copy/metadata. */
export function getUniqueSwatchCount(): number {
  const all = new Set<string>();
  for (const entry of getAllStyleColors()) {
    for (const hex of entry.swatches) all.add(hex);
  }
  return all.size;
}
