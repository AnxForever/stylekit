// Quality Scoring Engine for StyleKit styles
// Evaluates recipe coverage, token completeness, definition quality, and color palette

import { styles, type DesignStyle } from "@/lib/styles";
import { getStyleRecipes } from "@/lib/recipes";

// ── Types ────────────────────────────────────────────────────────────

export interface QualityScore {
  slug: string;
  name: string;
  overall: number;
  grade: string;
  recipeScore: number;
  tokenScore: number;
  definitionScore: number;
  colorScore: number;
  missing: string[];
}

export interface QualityReport {
  generated: string;
  totalStyles: number;
  averageScore: number;
  gradeDistribution: Record<string, number>;
  scores: QualityScore[];
  topStyles: QualityScore[];
  bottomStyles: QualityScore[];
}

// ── Constants ────────────────────────────────────────────────────────

const REQUIRED_RECIPE_COMPONENTS = [
  "button",
  "card",
  "input",
  "nav",
  "hero",
  "footer",
] as const;

const TOKEN_CATEGORIES = [
  "colors",
  "typography",
  "spacing",
  "shadows",
  "borders",
] as const;

// ── Scoring Functions ────────────────────────────────────────────────

/**
 * Score recipe coverage (40 points max)
 * Each of the 6 required components is worth ~6.67 points
 */
function scoreRecipeCoverage(
  slug: string,
): { score: number; missing: string[] } {
  const recipes = getStyleRecipes(slug);
  const missing: string[] = [];

  if (!recipes) {
    return {
      score: 0,
      missing: REQUIRED_RECIPE_COMPONENTS.map((c) => `recipe:${c}`),
    };
  }

  const recipeKeys = Object.keys(recipes.recipes);
  let found = 0;

  for (const component of REQUIRED_RECIPE_COMPONENTS) {
    if (recipeKeys.includes(component)) {
      found++;
    } else {
      missing.push(`recipe:${component}`);
    }
  }

  // 40 points total, distributed across 6 required components
  const pointsPerComponent = 40 / REQUIRED_RECIPE_COMPONENTS.length;
  return {
    score: Math.round(found * pointsPerComponent * 10) / 10,
    missing,
  };
}

/**
 * Score token completeness (25 points max)
 * Checks if the style has meaningful data in key token categories
 */
function scoreTokenCompleteness(
  style: DesignStyle,
): { score: number; missing: string[] } {
  const missing: string[] = [];
  let points = 0;
  const pointsPerCategory = 25 / TOKEN_CATEGORIES.length;

  // colors - check primary, secondary, accent
  if (style.colors?.primary && style.colors?.secondary) {
    points += pointsPerCategory;
  } else {
    missing.push("token:colors");
  }

  // typography - check keywords for typography hints or globalCss for font-related rules
  const hasTypography =
    style.globalCss?.includes("font-") ||
    style.globalCss?.includes("text-") ||
    style.globalCss?.includes("letter-spacing");
  if (hasTypography) {
    points += pointsPerCategory;
  } else {
    missing.push("token:typography");
  }

  // spacing - check globalCss for spacing/padding/margin rules
  const hasSpacing =
    style.globalCss?.includes("padding") ||
    style.globalCss?.includes("margin") ||
    style.globalCss?.includes("gap") ||
    style.globalCss?.includes("space-");
  if (hasSpacing) {
    points += pointsPerCategory;
  } else {
    missing.push("token:spacing");
  }

  // shadows - check globalCss for shadow rules
  const hasShadows =
    style.globalCss?.includes("shadow") ||
    style.globalCss?.includes("box-shadow");
  if (hasShadows) {
    points += pointsPerCategory;
  } else {
    missing.push("token:shadows");
  }

  // borders - check globalCss for border rules
  const hasBorders =
    style.globalCss?.includes("border") ||
    style.globalCss?.includes("outline") ||
    style.globalCss?.includes("ring");
  if (hasBorders) {
    points += pointsPerCategory;
  } else {
    missing.push("token:borders");
  }

  return {
    score: Math.round(points * 10) / 10,
    missing,
  };
}

/**
 * Score style definition completeness (25 points max)
 * Checks philosophy, doList (3+), dontList (3+), aiRules (3+ rules), keywords (3+), examplePrompts (2+)
 */
function scoreDefinitionCompleteness(
  style: DesignStyle,
): { score: number; missing: string[] } {
  const missing: string[] = [];
  let points = 0;
  // 6 criteria, ~4.17 points each
  const pointsPerCriteria = 25 / 6;

  // philosophy - must be non-empty and substantial (>50 chars)
  if (style.philosophy && style.philosophy.length > 50) {
    points += pointsPerCriteria;
  } else {
    missing.push("def:philosophy");
  }

  // doList - at least 3 items
  if (style.doList && style.doList.length >= 3) {
    points += pointsPerCriteria;
  } else {
    missing.push(`def:doList(${style.doList?.length ?? 0}/3)`);
  }

  // dontList - at least 3 items
  if (style.dontList && style.dontList.length >= 3) {
    points += pointsPerCriteria;
  } else {
    missing.push(`def:dontList(${style.dontList?.length ?? 0}/3)`);
  }

  // aiRules - must be non-empty and contain at least 3 distinct rules
  const aiRulesLines = style.aiRules
    ? style.aiRules.split("\n").filter((l) => l.trim().startsWith("-") || l.trim().startsWith("*") || /^\d+\./.test(l.trim()))
    : [];
  if (style.aiRules && (style.aiRules.length > 100 || aiRulesLines.length >= 3)) {
    points += pointsPerCriteria;
  } else {
    missing.push("def:aiRules");
  }

  // keywords - at least 3
  if (style.keywords && style.keywords.length >= 3) {
    points += pointsPerCriteria;
  } else {
    missing.push(`def:keywords(${style.keywords?.length ?? 0}/3)`);
  }

  // examplePrompts - at least 2
  if (style.examplePrompts && style.examplePrompts.length >= 2) {
    points += pointsPerCriteria;
  } else {
    missing.push(`def:examplePrompts(${style.examplePrompts?.length ?? 0}/2)`);
  }

  return {
    score: Math.round(points * 10) / 10,
    missing,
  };
}

/**
 * Score color palette completeness (10 points max)
 * Checks for primary, secondary, accent, and whether accent has multiple colors
 */
function scoreColorPalette(
  style: DesignStyle,
): { score: number; missing: string[] } {
  const missing: string[] = [];
  let points = 0;

  // primary (3 points)
  if (style.colors?.primary) {
    points += 3;
  } else {
    missing.push("color:primary");
  }

  // secondary (3 points)
  if (style.colors?.secondary) {
    points += 3;
  } else {
    missing.push("color:secondary");
  }

  // accent exists (2 points)
  if (style.colors?.accent && style.colors.accent.length > 0) {
    points += 2;
  } else {
    missing.push("color:accent");
  }

  // accent has 2+ colors (2 points)
  if (style.colors?.accent && style.colors.accent.length >= 2) {
    points += 2;
  } else if (!missing.includes("color:accent")) {
    missing.push("color:accent(needs 2+)");
  }

  return { score: points, missing };
}

// ── Grade Assignment ─────────────────────────────────────────────────

function assignGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Score a single style's quality
 */
export function scoreStyleQuality(slug: string): QualityScore | null {
  const style = styles.find((s) => s.slug === slug);
  if (!style) return null;

  const recipe = scoreRecipeCoverage(slug);
  const token = scoreTokenCompleteness(style);
  const definition = scoreDefinitionCompleteness(style);
  const color = scoreColorPalette(style);

  const overall =
    Math.round(
      (recipe.score + token.score + definition.score + color.score) * 10,
    ) / 10;

  const allMissing = [
    ...recipe.missing,
    ...token.missing,
    ...definition.missing,
    ...color.missing,
  ];

  return {
    slug,
    name: style.nameEn || style.name,
    overall,
    grade: assignGrade(overall),
    recipeScore: recipe.score,
    tokenScore: token.score,
    definitionScore: definition.score,
    colorScore: color.score,
    missing: allMissing,
  };
}

/**
 * Score all registered styles
 */
export function scoreAllStyles(): Record<string, QualityScore> {
  const results: Record<string, QualityScore> = {};

  for (const style of styles) {
    const score = scoreStyleQuality(style.slug);
    if (score) {
      results[style.slug] = score;
    }
  }

  return results;
}

/**
 * Generate a full quality report with statistics
 */
export function generateQualityReport(): QualityReport {
  const allScores = scoreAllStyles();
  const scoreList = Object.values(allScores);

  const totalStyles = scoreList.length;
  const averageScore =
    totalStyles > 0
      ? Math.round(
          (scoreList.reduce((sum, s) => sum + s.overall, 0) / totalStyles) * 10,
        ) / 10
      : 0;

  const gradeDistribution: Record<string, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };
  for (const score of scoreList) {
    gradeDistribution[score.grade] = (gradeDistribution[score.grade] || 0) + 1;
  }

  const sorted = [...scoreList].sort((a, b) => b.overall - a.overall);
  const topStyles = sorted.slice(0, 5);
  const bottomStyles = sorted.slice(-5).reverse();

  return {
    generated: new Date().toISOString(),
    totalStyles,
    averageScore,
    gradeDistribution,
    scores: sorted,
    topStyles,
    bottomStyles,
  };
}
