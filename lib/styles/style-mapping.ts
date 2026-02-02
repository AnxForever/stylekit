/**
 * Style Mapping Utilities
 *
 * Shared functions for mapping style recommendations to style slugs.
 * Used by both the API generate endpoint and the MCP server.
 */

/**
 * Map a style recommendation name to an actual style slug.
 *
 * @param stylePriority - Style name from knowledge base (e.g. "Minimalism", "Corporate")
 * @param colorScheme - Color scheme preference ("light" | "dark" | "auto")
 * @returns A valid style slug
 */
export function mapStyleToSlug(
  stylePriority: string,
  colorScheme: string = "auto"
): string {
  const normalized = stylePriority.toLowerCase();

  const map: Record<string, string> = {
    minimalism: "minimalist-flat",
    corporate: "corporate-clean",
    "neo-brutalism": "neo-brutalist",
    neumorphism: "neumorphism",
    glassmorphism: "glassmorphism",
    editorial: "editorial",
    modern: colorScheme === "dark" ? "dark-mode" : "corporate-clean",
    playful: "neo-brutalist-playful",
    futuristic: "cyberpunk-neon",
    organic: "natural-organic",
    gradient: "modern-gradient",
    retro: "retro-vintage",
    dark: "dark-mode",
    bold: "geometric-bold",
    soft: "soft-ui",
    bento: "bento-grid",
  };

  return map[normalized] || "corporate-clean";
}

/**
 * Determine if a style slug implies a dark color scheme.
 */
export function isDarkStyle(slug: string): boolean {
  return slug.includes("dark") || slug.includes("cyberpunk");
}

/**
 * Resolve effective color scheme based on style and user preference.
 */
export function resolveColorScheme(
  colorScheme: string,
  styleSlug: string
): "light" | "dark" {
  if (colorScheme === "auto") {
    return isDarkStyle(styleSlug) ? "dark" : "light";
  }
  return colorScheme as "light" | "dark";
}
