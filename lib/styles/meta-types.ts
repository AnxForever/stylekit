export type StyleCategory = "modern" | "retro" | "minimal" | "expressive";
export type StyleType = "visual" | "layout";
export type StyleTag =
  | "retro"
  | "high-contrast"
  | "responsive"
  | "brand-inspired"
  | "dark-theme"
  | "colorful"
  | "hand-drawn"
  | "glassmorphic"
  | "gradient"
  | "geometric"
  | "game-ui"
  | "anime-aesthetic"
  | "texture-heavy";

export interface StyleMeta {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
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
