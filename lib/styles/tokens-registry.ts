// Style Tokens Registry
// Maps style slugs to their token definitions

import type { StyleTokens } from "./tokens";
import { neoBrutalistTokens } from "./neo-brutalist-tokens";
import { editorialTokens } from "./editorial-tokens";
import { neumorphismTokens } from "./neumorphism-tokens";
import { glassmorphismTokens } from "./glassmorphism-tokens";
import { bentoGridTokens } from "./bento-grid-tokens";
// New style tokens
import { corporateCleanTokens } from "./corporate-clean-tokens";
import { cyberpunkNeonTokens } from "./cyberpunk-neon-tokens";
import { darkModeTokens } from "./dark-mode-tokens";
import { softUITokens } from "./soft-ui-tokens";
import { modernGradientTokens } from "./modern-gradient-tokens";
import { naturalOrganicTokens } from "./natural-organic-tokens";
// New visual style tokens
import { claymorphismTokens } from "./claymorphism-tokens";
import { notionStyleTokens } from "./notion-style-tokens";
import { stripeStyleTokens } from "./stripe-style-tokens";
import { appleStyleTokens } from "./apple-style-tokens";
import { pixelArtTokens } from "./pixel-art-tokens";

// Registry of all style tokens
export const styleTokensRegistry: Record<string, StyleTokens> = {
  "neo-brutalist": neoBrutalistTokens,
  "neo-brutalist-soft": neoBrutalistTokens,      // 使用相同的 tokens
  "neo-brutalist-playful": neoBrutalistTokens,   // 使用相同的 tokens
  "editorial": editorialTokens,
  "neumorphism": neumorphismTokens,
  "glassmorphism": glassmorphismTokens,
  "bento-grid": bentoGridTokens,
  // New styles
  "corporate-clean": corporateCleanTokens,
  "minimalist-flat": editorialTokens,            // Similar constraints
  "soft-ui": softUITokens,
  "cyberpunk-neon": cyberpunkNeonTokens,
  "natural-organic": naturalOrganicTokens,
  "modern-gradient": modernGradientTokens,
  "retro-vintage": editorialTokens,              // Similar typography focus
  "dark-mode": darkModeTokens,
  "geometric-bold": neoBrutalistTokens,          // Similar bold approach
  // New visual styles
  "claymorphism": claymorphismTokens,
  "notion-style": notionStyleTokens,
  "stripe-style": stripeStyleTokens,
  "apple-style": appleStyleTokens,
  "pixel-art": pixelArtTokens,
};

// Get tokens for a style by slug
export function getStyleTokens(slug: string): StyleTokens | undefined {
  return styleTokensRegistry[slug];
}

// Check if a style has tokens defined
export function hasStyleTokens(slug: string): boolean {
  return slug in styleTokensRegistry;
}
