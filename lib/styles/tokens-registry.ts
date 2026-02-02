// Style Tokens Registry
// Maps style slugs to their token definitions

import type { StyleTokens } from "./tokens";
import { neoBrutalistTokens } from "./neo-brutalist-tokens";
import { editorialTokens } from "./editorial-tokens";
import { neumorphismTokens } from "./neumorphism-tokens";
import { glassmorphismTokens } from "./glassmorphism-tokens";
import { bentoGridTokens } from "./bento-grid-tokens";

// Registry of all style tokens
export const styleTokensRegistry: Record<string, StyleTokens> = {
  "neo-brutalist": neoBrutalistTokens,
  "neo-brutalist-soft": neoBrutalistTokens,      // 使用相同的 tokens
  "neo-brutalist-playful": neoBrutalistTokens,   // 使用相同的 tokens
  "editorial": editorialTokens,
  "neumorphism": neumorphismTokens,
  "glassmorphism": glassmorphismTokens,
  "bento-grid": bentoGridTokens,
};

// Get tokens for a style by slug
export function getStyleTokens(slug: string): StyleTokens | undefined {
  return styleTokensRegistry[slug];
}

// Check if a style has tokens defined
export function hasStyleTokens(slug: string): boolean {
  return slug in styleTokensRegistry;
}
