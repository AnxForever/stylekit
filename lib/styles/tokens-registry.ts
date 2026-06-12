// Style Tokens Registry - Public API

import { styleTokensRegistry } from "./tokens-registry-data";
import type { StyleTokens } from "./tokens";

export { styleTokensRegistry } from "./tokens-registry-data";

// Get tokens for a style by slug
export function getStyleTokens(slug: string): StyleTokens | undefined {
  return styleTokensRegistry[slug];
}

// Check if a style has tokens defined
export function hasStyleTokens(slug: string): boolean {
  return slug in styleTokensRegistry;
}
