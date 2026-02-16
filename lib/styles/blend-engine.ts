// Style Blending Engine
// Supports two modes:
// 1. Dimension-picking: select which style provides each token category
// 2. Weighted interpolation: blend two styles with per-dimension weights (0-100%)

import type { StyleTokens } from "./tokens";
import { getStyleTokens } from "./tokens-registry";
import { styles } from "./index";
import {
  interpolateColorClass,
  extractHexFromClass,
  interpolateHexColors,
} from "./color-interpolation";

// ============ TYPES ============

/** Dimension-picking config (legacy mode) */
export interface BlendConfig {
  colors: string;
  typography: string;
  spacing: string;
  shadows: string;
  borders: string;
  interaction: string;
}

/** Weighted interpolation config between two styles */
export interface WeightedBlendConfig {
  styleA: string;
  styleB: string;
  weights: BlendWeights;
}

/** Per-dimension weights: 0 = fully styleB, 100 = fully styleA */
export interface BlendWeights {
  colors: number;
  typography: number;
  spacing: number;
  shadows: number;
  borders: number;
  interaction: number;
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

// ============ DIMENSION-PICKING (existing mode) ============

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

// ============ WEIGHTED INTERPOLATION (new mode) ============

/** Default weights: 50/50 split */
export function defaultWeights(): BlendWeights {
  return {
    colors: 50,
    typography: 50,
    spacing: 50,
    shadows: 50,
    borders: 50,
    interaction: 50,
  };
}

/**
 * Interpolate a string value between two sources.
 * For color classes: HSL interpolation.
 * For other strings: pick from the dominant source.
 */
function interpolateString(
  valueA: string,
  valueB: string,
  weightA: number, // 0..1
  prefix?: string
): string {
  // Try color interpolation if both contain hex values
  const hexA = extractHexFromClass(valueA);
  const hexB = extractHexFromClass(valueB);

  if (hexA && hexB && prefix) {
    return interpolateColorClass(valueA, valueB, weightA, prefix);
  }

  // For non-color strings, pick from the dominant source
  return weightA >= 0.5 ? valueA : valueB;
}

/** Interpolate string arrays (accent colors, etc.) */
function interpolateStringArray(
  arrA: string[],
  arrB: string[],
  weightA: number
): string[] {
  if (weightA >= 0.7) return arrA;
  if (weightA <= 0.3) return arrB;

  // Mix: take weighted proportion from each
  const countA = Math.max(1, Math.round(arrA.length * weightA));
  const countB = Math.max(1, Math.round(arrB.length * (1 - weightA)));
  return [...arrA.slice(0, countA), ...arrB.slice(0, countB)];
}

/** Interpolate colored shadow maps */
function interpolateColoredShadows(
  mapA: Record<string, string> | undefined,
  mapB: Record<string, string> | undefined,
  weightA: number
): Record<string, string> | undefined {
  if (!mapA && !mapB) return undefined;
  if (!mapA) return mapB;
  if (!mapB) return mapA;

  const result: Record<string, string> = {};
  const allKeys = new Set([...Object.keys(mapA), ...Object.keys(mapB)]);

  for (const key of allKeys) {
    const a = mapA[key];
    const b = mapB[key];
    if (a && b) {
      // Both have this key - try to interpolate hex within the shadow value
      const hexA = extractHexFromClass(a);
      const hexB = extractHexFromClass(b);
      if (hexA && hexB) {
        const blended = interpolateHexColors([
          { hex: hexA, weight: weightA },
          { hex: hexB, weight: 1 - weightA },
        ]);
        result[key] = a.replace(/#[0-9a-fA-F]{3,6}/, blended);
      } else {
        result[key] = weightA >= 0.5 ? a : b;
      }
    } else {
      result[key] = (a ?? b)!;
    }
  }

  return result;
}

/**
 * Creates a blended token set by mathematically interpolating between two styles.
 *
 * - Colors: HSL-space interpolation of hex values
 * - Strings without hex: threshold-based picking (dominant source wins)
 * - Arrays: proportional mixing based on weight
 */
export function blendTokensWeighted(config: WeightedBlendConfig): StyleTokens | null {
  const tokensA = getStyleTokens(config.styleA);
  const tokensB = getStyleTokens(config.styleB);

  if (!tokensA || !tokensB) return null;

  const w = config.weights;

  // Normalize weights from 0-100 to 0-1
  const wColors = w.colors / 100;
  const wTypo = w.typography / 100;
  const wSpace = w.spacing / 100;
  const wShadow = w.shadows / 100;
  const wBorder = w.borders / 100;
  const wInteract = w.interaction / 100;

  return {
    colors: {
      background: {
        primary: interpolateString(
          tokensA.colors.background.primary,
          tokensB.colors.background.primary,
          wColors,
          "bg"
        ),
        secondary: interpolateString(
          tokensA.colors.background.secondary,
          tokensB.colors.background.secondary,
          wColors,
          "bg"
        ),
        accent: interpolateStringArray(
          tokensA.colors.background.accent,
          tokensB.colors.background.accent,
          wColors
        ),
      },
      text: {
        primary: interpolateString(
          tokensA.colors.text.primary,
          tokensB.colors.text.primary,
          wColors,
          "text"
        ),
        secondary: interpolateString(
          tokensA.colors.text.secondary,
          tokensB.colors.text.secondary,
          wColors,
          "text"
        ),
        muted: interpolateString(
          tokensA.colors.text.muted,
          tokensB.colors.text.muted,
          wColors,
          "text"
        ),
      },
      button: {
        primary: interpolateString(
          tokensA.colors.button.primary,
          tokensB.colors.button.primary,
          wColors
        ),
        secondary: interpolateString(
          tokensA.colors.button.secondary,
          tokensB.colors.button.secondary,
          wColors
        ),
      },
    },

    typography: {
      heading: interpolateString(tokensA.typography.heading, tokensB.typography.heading, wTypo),
      body: interpolateString(tokensA.typography.body, tokensB.typography.body, wTypo),
      mono: interpolateString(
        tokensA.typography.mono ?? "font-mono",
        tokensB.typography.mono ?? "font-mono",
        wTypo
      ),
      sizes: {
        hero: interpolateString(tokensA.typography.sizes.hero, tokensB.typography.sizes.hero, wTypo),
        h1: interpolateString(tokensA.typography.sizes.h1, tokensB.typography.sizes.h1, wTypo),
        h2: interpolateString(tokensA.typography.sizes.h2, tokensB.typography.sizes.h2, wTypo),
        h3: interpolateString(tokensA.typography.sizes.h3, tokensB.typography.sizes.h3, wTypo),
        body: interpolateString(tokensA.typography.sizes.body, tokensB.typography.sizes.body, wTypo),
        small: interpolateString(tokensA.typography.sizes.small, tokensB.typography.sizes.small, wTypo),
      },
    },

    spacing: {
      section: interpolateString(tokensA.spacing.section, tokensB.spacing.section, wSpace),
      container: interpolateString(tokensA.spacing.container, tokensB.spacing.container, wSpace),
      card: interpolateString(tokensA.spacing.card, tokensB.spacing.card, wSpace),
      gap: {
        sm: interpolateString(tokensA.spacing.gap.sm, tokensB.spacing.gap.sm, wSpace),
        md: interpolateString(tokensA.spacing.gap.md, tokensB.spacing.gap.md, wSpace),
        lg: interpolateString(tokensA.spacing.gap.lg, tokensB.spacing.gap.lg, wSpace),
      },
    },

    border: {
      width: interpolateString(tokensA.border.width, tokensB.border.width, wBorder),
      color: interpolateString(tokensA.border.color, tokensB.border.color, wBorder),
      radius: interpolateString(tokensA.border.radius, tokensB.border.radius, wBorder),
      style: interpolateString(
        tokensA.border.style ?? "border-solid",
        tokensB.border.style ?? "border-solid",
        wBorder
      ),
    },

    shadow: {
      sm: interpolateString(tokensA.shadow.sm, tokensB.shadow.sm, wShadow),
      md: interpolateString(tokensA.shadow.md, tokensB.shadow.md, wShadow),
      lg: interpolateString(tokensA.shadow.lg, tokensB.shadow.lg, wShadow),
      none: interpolateString(tokensA.shadow.none, tokensB.shadow.none, wShadow),
      hover: interpolateString(tokensA.shadow.hover, tokensB.shadow.hover, wShadow),
      focus: interpolateString(tokensA.shadow.focus, tokensB.shadow.focus, wShadow),
      colored: interpolateColoredShadows(
        tokensA.shadow.colored,
        tokensB.shadow.colored,
        wShadow
      ),
    },

    interaction: {
      transition: interpolateString(
        tokensA.interaction.transition,
        tokensB.interaction.transition,
        wInteract
      ),
      hoverScale: interpolateString(
        tokensA.interaction.hoverScale ?? "",
        tokensB.interaction.hoverScale ?? "",
        wInteract
      ),
      hoverTranslate: interpolateString(
        tokensA.interaction.hoverTranslate ?? "",
        tokensB.interaction.hoverTranslate ?? "",
        wInteract
      ),
      active: interpolateString(
        tokensA.interaction.active ?? "",
        tokensB.interaction.active ?? "",
        wInteract
      ),
    },

    // Rules: merge from both (union of forbidden, intersection of required)
    forbidden: {
      classes: [...new Set([...tokensA.forbidden.classes, ...tokensB.forbidden.classes])],
      patterns: [...new Set([...tokensA.forbidden.patterns, ...tokensB.forbidden.patterns])],
      reasons: { ...tokensB.forbidden.reasons, ...tokensA.forbidden.reasons },
    },
    required: {
      button: wColors >= 0.5 ? tokensA.required.button : tokensB.required.button,
      card: wColors >= 0.5 ? tokensA.required.card : tokensB.required.card,
      input: wColors >= 0.5 ? tokensA.required.input : tokensB.required.input,
    },
  };
}

// ============ PRESETS ============

export interface BlendPreset {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  mode: "pick" | "interpolate";
  config?: BlendConfig;
  styleA?: string;
  styleB?: string;
  weights?: Partial<BlendWeights>;
}

const BLEND_PRESETS: BlendPreset[] = [
  {
    id: "brutal-glass",
    name: "Brutal Glass",
    nameZh: "粗犷玻璃",
    description: "Neo-brutalist borders with glassmorphism colors",
    mode: "pick",
    config: {
      colors: "glassmorphism",
      typography: "neo-brutalist",
      spacing: "neo-brutalist",
      shadows: "glassmorphism",
      borders: "neo-brutalist",
      interaction: "glassmorphism",
    },
  },
  {
    id: "warm-minimal",
    name: "Warm Minimal",
    nameZh: "温暖极简",
    description: "Minimalist layout with warm editorial typography",
    mode: "pick",
    config: {
      colors: "warm-minimalist",
      typography: "editorial",
      spacing: "minimalist",
      shadows: "minimalist",
      borders: "minimalist",
      interaction: "warm-minimalist",
    },
  },
  {
    id: "cyber-retro",
    name: "Cyber Retro",
    nameZh: "赛博复古",
    description: "Cyberpunk colors blended with retro typography",
    mode: "interpolate",
    styleA: "cyberpunk",
    styleB: "retro-pop",
    weights: { colors: 70, typography: 30, shadows: 60 },
  },
  {
    id: "soft-corporate",
    name: "Soft Corporate",
    nameZh: "柔和商务",
    description: "Corporate structure with soft rounded aesthetics",
    mode: "interpolate",
    styleA: "corporate-clean",
    styleB: "soft-ui",
    weights: { colors: 40, borders: 30, shadows: 25 },
  },
];

export function getBlendPresets(): BlendPreset[] {
  return BLEND_PRESETS;
}

// ============ COMPATIBILITY ============

/**
 * Returns visual styles that are marked compatible with the given style,
 * or all visual styles if no compatibility info exists.
 */
export function getCompatibleStyles(baseSlug: string): string[] {
  const style = styles.find((s) => s.slug === baseSlug);
  if (style?.compatibleWith && style.compatibleWith.length > 0) {
    return style.compatibleWith;
  }
  return styles
    .filter((s) => s.styleType === "visual")
    .map((s) => s.slug);
}

// ============ EXPORT ============

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

/** Export blended tokens as a full StyleKit style definition */
export function exportAsStyleDefinition(
  tokens: StyleTokens,
  name: string = "Custom Blend"
): string {
  return JSON.stringify(
    {
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      styleType: "visual",
      tokens,
      meta: {
        generated: true,
        source: "stylekit-blend",
        timestamp: new Date().toISOString(),
      },
    },
    null,
    2
  );
}

function tokensToCssVariables(tokens: StyleTokens): string {
  const lines: string[] = [":root {"];

  lines.push("  /* Colors */");
  lines.push(`  --bg-primary: ${tokens.colors.background.primary};`);
  lines.push(`  --bg-secondary: ${tokens.colors.background.secondary};`);
  lines.push(`  --text-primary: ${tokens.colors.text.primary};`);
  lines.push(`  --text-secondary: ${tokens.colors.text.secondary};`);
  lines.push(`  --text-muted: ${tokens.colors.text.muted};`);
  lines.push(`  --btn-primary: ${tokens.colors.button.primary};`);
  lines.push(`  --btn-secondary: ${tokens.colors.button.secondary};`);

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

  lines.push("");
  lines.push("  /* Borders */");
  lines.push(`  --border-width: ${tokens.border.width};`);
  lines.push(`  --border-color: ${tokens.border.color};`);
  lines.push(`  --border-radius: ${tokens.border.radius};`);

  lines.push("");
  lines.push("  /* Shadows */");
  lines.push(`  --shadow-sm: ${tokens.shadow.sm};`);
  lines.push(`  --shadow-md: ${tokens.shadow.md};`);
  lines.push(`  --shadow-lg: ${tokens.shadow.lg};`);

  lines.push("");
  lines.push("  /* Spacing */");
  lines.push(`  --spacing-section: ${tokens.spacing.section};`);
  lines.push(`  --spacing-container: ${tokens.spacing.container};`);
  lines.push(`  --spacing-card: ${tokens.spacing.card};`);

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
