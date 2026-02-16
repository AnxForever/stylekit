// Style Blending Engine
// Picks token dimensions from different styles to create hybrid token sets

import type { StyleTokens } from "./tokens";
import { getStyleTokens } from "./tokens-registry";
import { styles } from "./index";

/** Which style to source each dimension from */
export interface BlendConfig {
  colors: string;
  typography: string;
  spacing: string;
  shadows: string;
  borders: string;
  interaction: string;
}

export type BlendDimension = keyof BlendConfig;

/** All available blend dimensions with labels */
const DIMENSIONS: { key: BlendDimension; labelEn: string; labelZh: string }[] = [
  { key: "colors", labelEn: "Colors", labelZh: "Colors" },
  { key: "typography", labelEn: "Typography", labelZh: "Typography" },
  { key: "spacing", labelEn: "Spacing", labelZh: "Spacing" },
  { key: "shadows", labelEn: "Shadows", labelZh: "Shadows" },
  { key: "borders", labelEn: "Borders", labelZh: "Borders" },
  { key: "interaction", labelEn: "Interaction", labelZh: "Interaction" },
];

export function getBlendDimensions(): typeof DIMENSIONS {
  return DIMENSIONS;
}

/**
 * Creates a blended token set by picking each dimension from the specified source style.
 * Falls back to the colors style for any dimension whose source tokens are not found.
 */
export function blendTokens(config: BlendConfig): StyleTokens | null {
  const colorTokens = getStyleTokens(config.colors);
  const typographyTokens = getStyleTokens(config.typography);
  const spacingTokens = getStyleTokens(config.spacing);
  const shadowTokens = getStyleTokens(config.shadows);
  const borderTokens = getStyleTokens(config.borders);
  const interactionTokens = getStyleTokens(config.interaction);

  // Need at least the colors source to produce a valid token set
  if (!colorTokens) return null;

  return {
    colors: colorTokens.colors,
    typography: (typographyTokens ?? colorTokens).typography,
    spacing: (spacingTokens ?? colorTokens).spacing,
    shadow: (shadowTokens ?? colorTokens).shadow,
    border: (borderTokens ?? colorTokens).border,
    interaction: (interactionTokens ?? colorTokens).interaction,
    forbidden: colorTokens.forbidden,
    required: colorTokens.required,
  };
}

/**
 * Returns visual styles that are marked compatible with the given style,
 * or all visual styles if no compatibility info exists.
 */
export function getCompatibleStyles(baseSlug: string): string[] {
  const style = styles.find((s) => s.slug === baseSlug);
  if (style?.compatibleWith && style.compatibleWith.length > 0) {
    return style.compatibleWith;
  }
  // Return all visual styles as potential candidates
  return styles
    .filter((s) => s.styleType === "visual")
    .map((s) => s.slug);
}

/** Export blended tokens in different formats */
export function exportBlendedTokens(
  tokens: StyleTokens,
  format: "css" | "json" | "tailwind"
): string {
  if (format === "json") {
    return JSON.stringify(tokens, null, 2);
  }

  if (format === "css") {
    return tokensToCssVariables(tokens);
  }

  if (format === "tailwind") {
    return tokensToTailwindConfig(tokens);
  }

  return "";
}

function tokensToCssVariables(tokens: StyleTokens): string {
  const lines: string[] = [":root {"];

  // Colors
  lines.push("  /* Colors */");
  lines.push(`  --bg-primary: ${tokens.colors.background.primary};`);
  lines.push(`  --bg-secondary: ${tokens.colors.background.secondary};`);
  lines.push(`  --text-primary: ${tokens.colors.text.primary};`);
  lines.push(`  --text-secondary: ${tokens.colors.text.secondary};`);
  lines.push(`  --text-muted: ${tokens.colors.text.muted};`);
  lines.push(`  --btn-primary: ${tokens.colors.button.primary};`);
  lines.push(`  --btn-secondary: ${tokens.colors.button.secondary};`);

  // Typography
  lines.push("");
  lines.push("  /* Typography */");
  lines.push(`  --font-heading: ${tokens.typography.heading};`);
  lines.push(`  --font-body: ${tokens.typography.body};`);
  lines.push(`  --size-hero: ${tokens.typography.sizes.hero};`);
  lines.push(`  --size-h1: ${tokens.typography.sizes.h1};`);
  lines.push(`  --size-h2: ${tokens.typography.sizes.h2};`);
  lines.push(`  --size-h3: ${tokens.typography.sizes.h3};`);
  lines.push(`  --size-body: ${tokens.typography.sizes.body};`);
  lines.push(`  --size-small: ${tokens.typography.sizes.small};`);

  // Borders
  lines.push("");
  lines.push("  /* Borders */");
  lines.push(`  --border-width: ${tokens.border.width};`);
  lines.push(`  --border-color: ${tokens.border.color};`);
  lines.push(`  --border-radius: ${tokens.border.radius};`);

  // Shadows
  lines.push("");
  lines.push("  /* Shadows */");
  lines.push(`  --shadow-sm: ${tokens.shadow.sm};`);
  lines.push(`  --shadow-md: ${tokens.shadow.md};`);
  lines.push(`  --shadow-lg: ${tokens.shadow.lg};`);

  // Spacing
  lines.push("");
  lines.push("  /* Spacing */");
  lines.push(`  --spacing-section: ${tokens.spacing.section};`);
  lines.push(`  --spacing-container: ${tokens.spacing.container};`);
  lines.push(`  --spacing-card: ${tokens.spacing.card};`);

  // Interaction
  lines.push("");
  lines.push("  /* Interaction */");
  lines.push(`  --transition: ${tokens.interaction.transition};`);

  lines.push("}");
  return lines.join("\n");
}

function tokensToTailwindConfig(tokens: StyleTokens): string {
  const config = {
    theme: {
      extend: {
        colors: {
          primary: tokens.colors.background.primary,
          secondary: tokens.colors.background.secondary,
        },
        borderRadius: {
          DEFAULT: tokens.border.radius,
        },
        boxShadow: {
          sm: tokens.shadow.sm,
          DEFAULT: tokens.shadow.md,
          lg: tokens.shadow.lg,
        },
      },
    },
  };

  return `// Tailwind config extension for blended style\n// Note: These are Tailwind utility class references, not raw values.\n// Use them as className references in your components.\n\nmodule.exports = ${JSON.stringify(config, null, 2)}`;
}
