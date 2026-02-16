// Accessibility Scoring Engine
// Analyzes design styles for WCAG 2.1 compliance

import { getStyleBySlug, styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import type { StyleTokens } from "@/lib/styles/tokens";
import {
  contrastRatio,
  meetsAA,
  meetsAAA,
  extractHexFromClass,
} from "./wcag";

export interface ColorPair {
  fg: string;
  bg: string;
  ratio: number;
  aa: boolean;
  aaa: boolean;
  context: string;
}

export interface ContrastScore {
  score: number;
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  pairs: ColorPair[];
}

export interface ReadabilityScore {
  score: number;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

export interface AccessibilityScore {
  overall: number;
  contrast: ContrastScore;
  readability: ReadabilityScore;
  grade: "A" | "B" | "C" | "D" | "F";
}

/**
 * Extract color pairs to check from style colors and tokens.
 * Returns pairs of foreground/background hex colors with context labels.
 */
function extractColorPairs(
  styleColors: { primary: string; secondary: string; accent: string[] },
  tokens: StyleTokens | undefined
): Array<{ fg: string; bg: string; context: string }> {
  const pairs: Array<{ fg: string; bg: string; context: string }> = [];

  if (tokens) {
    // Token-based extraction (more precise)
    const bgPrimary = extractHexFromClass(tokens.colors.background.primary);
    const bgSecondary = extractHexFromClass(tokens.colors.background.secondary);
    const textPrimary = extractHexFromClass(tokens.colors.text.primary);
    const textSecondary = extractHexFromClass(tokens.colors.text.secondary);
    const textMuted = extractHexFromClass(tokens.colors.text.muted);

    // Primary text on primary background
    if (textPrimary && bgPrimary) {
      pairs.push({ fg: textPrimary, bg: bgPrimary, context: "Text on background" });
    }

    // Secondary text on primary background
    if (textSecondary && bgPrimary) {
      pairs.push({ fg: textSecondary, bg: bgPrimary, context: "Secondary text on background" });
    }

    // Muted text on primary background
    if (textMuted && bgPrimary) {
      pairs.push({ fg: textMuted, bg: bgPrimary, context: "Muted text on background" });
    }

    // Primary text on secondary background
    if (textPrimary && bgSecondary) {
      pairs.push({ fg: textPrimary, bg: bgSecondary, context: "Text on secondary background" });
    }

    // Secondary text on secondary background
    if (textSecondary && bgSecondary) {
      pairs.push({ fg: textSecondary, bg: bgSecondary, context: "Secondary text on secondary" });
    }

    // Button text colors
    const buttonPrimary = tokens.colors.button.primary;
    const btnBgMatch = extractHexFromClass(buttonPrimary.split(" ")[0] || "");
    const btnTextMatch = extractHexFromClass(buttonPrimary.split(" ").find(c => c.startsWith("text-")) || "");
    if (btnBgMatch && btnTextMatch) {
      pairs.push({ fg: btnTextMatch, bg: btnBgMatch, context: "Button primary" });
    }

    // Accent colors on primary background
    for (let i = 0; i < tokens.colors.background.accent.length; i++) {
      const accentHex = extractHexFromClass(tokens.colors.background.accent[i]);
      if (accentHex && textPrimary) {
        pairs.push({ fg: textPrimary, bg: accentHex, context: `Text on accent ${i + 1}` });
      }
      if (accentHex && textSecondary) {
        pairs.push({ fg: textSecondary, bg: accentHex, context: `Alt text on accent ${i + 1}` });
      }
    }
  } else {
    // Fallback: use style-level colors
    pairs.push({
      fg: styleColors.primary,
      bg: styleColors.secondary,
      context: "Primary on secondary",
    });
    pairs.push({
      fg: styleColors.secondary,
      bg: styleColors.primary,
      context: "Secondary on primary",
    });
    for (let i = 0; i < styleColors.accent.length; i++) {
      pairs.push({
        fg: styleColors.primary,
        bg: styleColors.accent[i],
        context: `Primary on accent ${i + 1}`,
      });
    }
  }

  return pairs;
}

/**
 * Score contrast for all color pairs.
 * Returns a 0-100 score based on how many pairs meet WCAG criteria.
 */
function scoreContrast(pairs: Array<{ fg: string; bg: string; context: string }>): ContrastScore {
  if (pairs.length === 0) {
    return { score: 50, ratio: 0, meetsAA: false, meetsAAA: false, pairs: [] };
  }

  const evaluatedPairs: ColorPair[] = pairs.map((pair) => {
    const ratio = contrastRatio(pair.fg, pair.bg);
    return {
      fg: pair.fg,
      bg: pair.bg,
      ratio: Math.round(ratio * 100) / 100,
      aa: meetsAA(ratio),
      aaa: meetsAAA(ratio),
      context: pair.context,
    };
  });

  const avgRatio = evaluatedPairs.reduce((sum, p) => sum + p.ratio, 0) / evaluatedPairs.length;
  const aaCount = evaluatedPairs.filter((p) => p.aa).length;
  const aaaCount = evaluatedPairs.filter((p) => p.aaa).length;
  const total = evaluatedPairs.length;

  // Score: weighted combination
  // 60% based on AA pass rate, 25% based on AAA pass rate, 15% based on average ratio
  const aaScore = (aaCount / total) * 60;
  const aaaScore = (aaaCount / total) * 25;
  const ratioScore = Math.min((avgRatio / 7) * 15, 15);

  return {
    score: Math.round(aaScore + aaaScore + ratioScore),
    ratio: Math.round(avgRatio * 100) / 100,
    meetsAA: aaCount === total,
    meetsAAA: aaaCount === total,
    pairs: evaluatedPairs,
  };
}

/**
 * Score readability based on typography tokens.
 * Evaluates font size, weight, and line height for reading comfort.
 */
function scoreReadability(tokens: StyleTokens | undefined): ReadabilityScore {
  if (!tokens) {
    return { score: 50, fontSize: "unknown", fontWeight: "unknown", lineHeight: "unknown" };
  }

  let score = 0;

  // Check body font size (text-sm = smaller, text-base = good, text-lg = great)
  const bodySize = tokens.typography.sizes.body;
  const fontSize = bodySize;
  if (bodySize.includes("text-lg") || bodySize.includes("text-base")) {
    score += 30;
  } else if (bodySize.includes("text-sm")) {
    score += 20;
  } else {
    score += 10;
  }

  // Check heading font weight
  const heading = tokens.typography.heading;
  const fontWeight = heading;
  if (heading.includes("font-black") || heading.includes("font-bold") || heading.includes("font-extrabold")) {
    score += 25;
  } else if (heading.includes("font-semibold") || heading.includes("font-medium")) {
    score += 20;
  } else {
    score += 15;
  }

  // Check size scale - hero should be significantly larger than body
  const heroSize = tokens.typography.sizes.hero;
  if (heroSize.includes("text-6xl") || heroSize.includes("text-7xl") || heroSize.includes("text-8xl")) {
    score += 20;
  } else if (heroSize.includes("text-4xl") || heroSize.includes("text-5xl")) {
    score += 15;
  } else {
    score += 10;
  }

  // Check spacing (good spacing improves readability)
  const sectionSpacing = tokens.spacing.section;
  if (sectionSpacing.includes("py-24") || sectionSpacing.includes("py-32")) {
    score += 15;
  } else if (sectionSpacing.includes("py-16") || sectionSpacing.includes("py-20")) {
    score += 12;
  } else {
    score += 8;
  }

  // Check if mono font is used for body (generally lower readability)
  const body = tokens.typography.body;
  if (body.includes("font-mono")) {
    score -= 5;
  }

  // Bonus for subtitle token existing (good hierarchy)
  if (tokens.typography.subtitle) {
    score += 10;
  }

  return {
    score: Math.min(Math.max(score, 0), 100),
    fontSize,
    fontWeight,
    lineHeight: sectionSpacing.includes("leading-") ? "defined" : "default",
  };
}

/**
 * Compute overall grade from a 0-100 score.
 */
function computeGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

/**
 * Score a single style by slug.
 * Returns null if the style is not found.
 */
export function scoreStyle(slug: string): AccessibilityScore | null {
  const style = getStyleBySlug(slug);
  if (!style) return null;

  const tokens = getStyleTokens(slug);
  const colorPairs = extractColorPairs(style.colors, tokens);
  const contrast = scoreContrast(colorPairs);
  const readability = scoreReadability(tokens);

  // Overall: 70% contrast, 30% readability
  const overall = Math.round(contrast.score * 0.7 + readability.score * 0.3);

  return {
    overall,
    contrast,
    readability,
    grade: computeGrade(overall),
  };
}

/**
 * Score all registered styles.
 */
export function scoreAllStyles(): Record<string, AccessibilityScore> {
  const result: Record<string, AccessibilityScore> = {};
  for (const style of styles) {
    const score = scoreStyle(style.slug);
    if (score) {
      result[style.slug] = score;
    }
  }
  return result;
}
