export type StyleCategory = "modern" | "retro" | "minimal" | "expressive";
export type StyleType = "visual" | "layout";

/**
 * Single source of truth for the tag vocabulary.
 *
 * Tags describe visual attributes only. The three tags that once duplicated
 * category names (`modern`, `minimal`, `expressive`) were retired in the tag
 * revamp; anything validating tags must read this list rather than restate it,
 * or it will keep accepting values the catalog silently drops.
 */
export const STYLE_TAGS = [
  "retro",
  "high-contrast",
  "responsive",
  "brand-inspired",
  "dark-theme",
  "colorful",
  "hand-drawn",
  "glassmorphic",
  "gradient",
  "geometric",
  "game-ui",
  "anime-aesthetic",
  "texture-heavy",
] as const;

export type StyleTag = (typeof STYLE_TAGS)[number];

export const STYLE_CATEGORIES = ["modern", "retro", "minimal", "expressive"] as const;
export const STYLE_TYPES = ["visual", "layout"] as const;

export interface StyleMeta {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  cover: string;
  category: StyleCategory;
  styleType: StyleType;
  tags: StyleTag[];
  compatibleWith?: string[];
  keywords: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
}
