/**
 * Smart Recommender Engine
 *
 * Advanced multi-dimensional recommendation system with:
 * - Confidence scoring for each recommendation
 * - Context-aware adjustments (device, audience, industry)
 * - Explanation generation for recommendations
 * - Alternative comparison
 * - Style compatibility scoring
 */

import { searchProducts, getProductByType, productRecommendations } from "./products";
import { searchColors, colorPalettes } from "./colors";
import { searchTypography, fontPairings } from "./typography";
import { searchLandingPatterns, landingPatterns } from "./landing-patterns";
import { searchUXGuidelines } from "./ux-guidelines";
import { getReasoningForProduct, reasoningRules } from "./reasoning";
import { styles, getStyleBySlug } from "../styles";
import { getStyleTokens } from "../styles/tokens-registry";
import type { ProductRecommendation, ColorPalette, FontPairing, LandingPattern, ReasoningRule } from "./types";

// ============ TYPES ============

export interface RecommendationContext {
  // User context
  targetAudience?: "consumer" | "enterprise" | "developer" | "creative";
  ageGroup?: "young" | "adult" | "senior" | "all";
  techLevel?: "beginner" | "intermediate" | "advanced";

  // Device context
  primaryDevice?: "desktop" | "mobile" | "tablet" | "all";
  screenDensity?: "low" | "high" | "retina";

  // Brand context
  brandMood?: "playful" | "professional" | "luxury" | "minimal" | "bold";
  industry?: string;

  // Preferences
  darkModePreferred?: boolean;
  accessibilityPriority?: boolean;
  performancePriority?: boolean;
}

export interface ScoredRecommendation<T> {
  item: T;
  score: number;          // 0-100 confidence score
  reasons: string[];      // Why this was recommended
  alternatives: T[];      // Other options considered
}

export interface StyleScore {
  slug: string;
  name: string;
  score: number;
  matches: {
    productType: number;
    brandMood: number;
    audience: number;
    device: number;
    accessibility: number;
  };
  reasons: string[];
}

export interface SmartRecommendation {
  // Core recommendations with scores
  style: ScoredRecommendation<{ slug: string; name: string; philosophy: string }>;
  colors: ScoredRecommendation<ColorPalette>;
  typography: ScoredRecommendation<FontPairing>;
  landingPattern: ScoredRecommendation<LandingPattern> | null;

  // Style scores for all styles
  styleScores: StyleScore[];

  // Compatibility matrix
  compatibility: {
    styleColorScore: number;
    styleTypographyScore: number;
    overallHarmony: number;
  };

  // Context adjustments applied
  contextAdjustments: string[];

  // Summary
  summary: {
    confidence: number;
    headline: string;
    keyDecisions: string[];
  };
}

// ============ SCORING FUNCTIONS ============

/**
 * Calculate base style score from product type match
 */
function calculateProductTypeScore(styleSlug: string, productType: string): number {
  const product = productRecommendations.find(
    (p) => p.type.toLowerCase() === productType.toLowerCase()
  );

  if (!product) return 50; // Neutral score if no match

  // Check primary style
  if (product.primaryStyle.toLowerCase().includes(styleSlug.replace("-", " "))) {
    return 95;
  }

  // Check secondary styles
  if (product.secondaryStyles.some((s) => s.toLowerCase().includes(styleSlug.replace("-", " ")))) {
    return 80;
  }

  // Check reasoning rules
  const reasoning = reasoningRules.find(
    (r) => r.category.toLowerCase() === productType.toLowerCase()
  );
  if (reasoning) {
    const index = reasoning.stylePriority.findIndex(
      (s) => s.toLowerCase().includes(styleSlug.replace("-", " "))
    );
    if (index !== -1) {
      return 90 - index * 10; // First priority = 90, second = 80, etc.
    }
  }

  return 40; // Low score for non-recommended styles
}

/**
 * Calculate brand mood compatibility score
 */
function calculateBrandMoodScore(styleSlug: string, mood?: string): number {
  if (!mood) return 50;

  const moodStyleMap: Record<string, string[]> = {
    playful: ["neo-brutalist-playful", "bento-grid", "soft-ui"],
    professional: ["corporate-clean", "minimalist-flat", "editorial"],
    luxury: ["glassmorphism", "editorial", "neumorphism"],
    minimal: ["minimalist-flat", "bento-grid", "corporate-clean"],
    bold: ["neo-brutalist", "cyberpunk-neon", "neo-brutalist-playful"],
  };

  const matchingStyles = moodStyleMap[mood] || [];
  if (matchingStyles.includes(styleSlug)) return 90;
  if (matchingStyles.some((s) => styleSlug.includes(s.split("-")[0]))) return 70;
  return 50;
}

/**
 * Calculate audience compatibility score
 */
function calculateAudienceScore(styleSlug: string, context: RecommendationContext): number {
  let score = 50;

  if (context.targetAudience === "developer") {
    if (["neo-brutalist", "minimalist-flat", "bento-grid"].includes(styleSlug)) score += 30;
  }
  if (context.targetAudience === "creative") {
    if (["neo-brutalist-playful", "glassmorphism", "editorial"].includes(styleSlug)) score += 30;
  }
  if (context.targetAudience === "enterprise") {
    if (["corporate-clean", "minimalist-flat", "editorial"].includes(styleSlug)) score += 30;
  }
  if (context.targetAudience === "consumer") {
    if (["soft-ui", "glassmorphism", "bento-grid"].includes(styleSlug)) score += 30;
  }

  if (context.ageGroup === "young") {
    if (["neo-brutalist-playful", "cyberpunk-neon", "bento-grid"].includes(styleSlug)) score += 15;
  }
  if (context.ageGroup === "senior") {
    if (["corporate-clean", "minimalist-flat", "soft-ui"].includes(styleSlug)) score += 15;
  }

  return Math.min(score, 100);
}

/**
 * Calculate device compatibility score
 */
function calculateDeviceScore(styleSlug: string, context: RecommendationContext): number {
  let score = 50;

  // Mobile-friendly styles
  if (context.primaryDevice === "mobile") {
    if (["soft-ui", "minimalist-flat", "corporate-clean"].includes(styleSlug)) score += 25;
    // Heavy styles penalized on mobile
    if (["glassmorphism", "neumorphism"].includes(styleSlug)) score -= 15;
  }

  // Desktop-optimized styles
  if (context.primaryDevice === "desktop") {
    if (["bento-grid", "editorial", "glassmorphism"].includes(styleSlug)) score += 20;
  }

  // Performance priority
  if (context.performancePriority) {
    if (["minimalist-flat", "neo-brutalist", "corporate-clean"].includes(styleSlug)) score += 20;
    if (["glassmorphism", "neumorphism", "cyberpunk-neon"].includes(styleSlug)) score -= 20;
  }

  return Math.min(Math.max(score, 0), 100);
}

/**
 * Calculate accessibility score
 */
function calculateAccessibilityScore(styleSlug: string, context: RecommendationContext): number {
  if (!context.accessibilityPriority) return 50;

  // High contrast styles
  if (["neo-brutalist", "corporate-clean", "minimalist-flat"].includes(styleSlug)) return 90;

  // Medium contrast
  if (["editorial", "bento-grid"].includes(styleSlug)) return 75;

  // Low contrast (need extra care)
  if (["neumorphism", "soft-ui", "glassmorphism"].includes(styleSlug)) return 50;

  return 60;
}

// ============ MAIN RECOMMENDER ============

/**
 * Generate smart recommendations with scoring and explanations
 */
export function getSmartRecommendation(
  productQuery: string,
  context: RecommendationContext = {}
): SmartRecommendation {
  // 1. Get product type
  const products = searchProducts(productQuery, 1);
  const product = products[0];
  const productType = product?.type || productQuery;

  // 2. Calculate scores for all styles
  const styleScores: StyleScore[] = styles.map((style) => {
    const matches = {
      productType: calculateProductTypeScore(style.slug, productType),
      brandMood: calculateBrandMoodScore(style.slug, context.brandMood),
      audience: calculateAudienceScore(style.slug, context),
      device: calculateDeviceScore(style.slug, context),
      accessibility: calculateAccessibilityScore(style.slug, context),
    };

    // Weighted average
    const weights = {
      productType: 0.35,
      brandMood: 0.2,
      audience: 0.2,
      device: 0.15,
      accessibility: context.accessibilityPriority ? 0.2 : 0.1,
    };

    // Normalize weights if accessibility priority
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const score = Object.entries(matches).reduce(
      (sum, [key, value]) => sum + value * (weights[key as keyof typeof weights] / totalWeight),
      0
    );

    // Generate reasons
    const reasons: string[] = [];
    if (matches.productType >= 80) reasons.push(`Strongly recommended for ${productType}`);
    if (matches.brandMood >= 80) reasons.push(`Matches ${context.brandMood} brand mood`);
    if (matches.accessibility >= 80) reasons.push("Excellent accessibility support");
    if (matches.device >= 70) reasons.push(`Optimized for ${context.primaryDevice || "all"} devices`);

    return {
      slug: style.slug,
      name: style.nameEn,
      score: Math.round(score),
      matches,
      reasons,
    };
  });

  // Sort by score
  styleScores.sort((a, b) => b.score - a.score);

  // 3. Get top style
  const topStyle = styleScores[0];
  const styleData = getStyleBySlug(topStyle.slug);

  // 4. Get color recommendation
  const colors = searchColors(productType, 3);
  const topColor = colors[0] || colorPalettes[0];

  // Adjust for dark mode preference
  let colorReasons = [`Recommended palette for ${productType}`];
  if (context.darkModePreferred && topColor.productType.toLowerCase().includes("dark")) {
    colorReasons.push("Matches dark mode preference");
  }

  // 5. Get typography recommendation
  const typography = searchTypography(productType, 3);
  const topTypo = typography[0] || fontPairings[0];

  const typoReasons = [`${topTypo.mood.join(", ")} typography suits ${productType}`];
  if (context.accessibilityPriority) {
    typoReasons.push("Good readability for accessibility");
  }

  // 6. Get landing pattern
  const patterns = searchLandingPatterns(productType, 3);
  const topPattern = patterns[0] || null;

  // 7. Calculate compatibility scores
  const styleColorScore = calculateColorCompatibility(topStyle.slug, topColor);
  const styleTypographyScore = calculateTypographyCompatibility(topStyle.slug, topTypo);
  const overallHarmony = Math.round((styleColorScore + styleTypographyScore + topStyle.score) / 3);

  // 8. Generate context adjustments
  const contextAdjustments: string[] = [];
  if (context.accessibilityPriority) {
    contextAdjustments.push("Prioritized high-contrast options for accessibility");
  }
  if (context.performancePriority) {
    contextAdjustments.push("Favored lightweight styles for performance");
  }
  if (context.primaryDevice === "mobile") {
    contextAdjustments.push("Optimized for mobile-first experience");
  }
  if (context.darkModePreferred) {
    contextAdjustments.push("Adjusted colors for dark mode preference");
  }

  // 9. Build result
  return {
    style: {
      item: {
        slug: topStyle.slug,
        name: topStyle.name,
        philosophy: styleData?.philosophy || "",
      },
      score: topStyle.score,
      reasons: topStyle.reasons,
      alternatives: styleScores.slice(1, 4).map((s) => ({
        slug: s.slug,
        name: s.name,
        philosophy: getStyleBySlug(s.slug)?.philosophy || "",
      })),
    },
    colors: {
      item: topColor,
      score: Math.round(styleColorScore),
      reasons: colorReasons,
      alternatives: colors.slice(1, 3),
    },
    typography: {
      item: topTypo,
      score: Math.round(styleTypographyScore),
      reasons: typoReasons,
      alternatives: typography.slice(1, 3),
    },
    landingPattern: topPattern
      ? {
          item: topPattern,
          score: 80, // Default score for patterns
          reasons: [`${topPattern.name} is effective for ${topPattern.keywords.slice(0, 3).join(", ")}`],
          alternatives: patterns.slice(1, 3),
        }
      : null,
    styleScores,
    compatibility: {
      styleColorScore,
      styleTypographyScore,
      overallHarmony,
    },
    contextAdjustments,
    summary: {
      confidence: overallHarmony,
      headline: `${topStyle.name} with ${topColor.productType} colors`,
      keyDecisions: [
        `Style: ${topStyle.name} (${topStyle.score}% match)`,
        `Colors: ${topColor.productType} (${styleColorScore}% compatible)`,
        `Typography: ${topTypo.headingFont} + ${topTypo.bodyFont}`,
        ...(contextAdjustments.length > 0
          ? [`Adjusted for: ${contextAdjustments.length} context factors`]
          : []),
      ],
    },
  };
}

/**
 * Calculate style-color compatibility
 */
function calculateColorCompatibility(styleSlug: string, color: ColorPalette): number {
  // Simplified compatibility check based on style characteristics
  const brightStyles = ["neo-brutalist", "neo-brutalist-playful", "cyberpunk-neon"];
  const mutedStyles = ["neumorphism", "soft-ui", "glassmorphism", "corporate-clean"];
  const neutralStyles = ["minimalist-flat", "bento-grid", "editorial"];

  const isBrightPalette =
    color.cta.includes("#") && parseInt(color.cta.slice(1, 3), 16) > 200;

  if (brightStyles.includes(styleSlug) && isBrightPalette) return 90;
  if (mutedStyles.includes(styleSlug) && !isBrightPalette) return 85;
  if (neutralStyles.includes(styleSlug)) return 80; // Works with most

  return 70; // Default reasonable compatibility
}

/**
 * Calculate style-typography compatibility
 */
function calculateTypographyCompatibility(styleSlug: string, typo: FontPairing): number {
  const serifFriendly = ["editorial", "minimalist-flat", "corporate-clean"];
  const sansFriendly = [
    "neo-brutalist",
    "glassmorphism",
    "neumorphism",
    "soft-ui",
    "bento-grid",
  ];
  const monoFriendly = ["neo-brutalist", "cyberpunk-neon"];

  const isSerif =
    typo.headingFont.toLowerCase().includes("serif") ||
    typo.headingFont.toLowerCase().includes("georgia");
  const isMono =
    typo.headingFont.toLowerCase().includes("mono") ||
    typo.bodyFont.toLowerCase().includes("mono");

  if (isSerif && serifFriendly.includes(styleSlug)) return 90;
  if (!isSerif && sansFriendly.includes(styleSlug)) return 85;
  if (isMono && monoFriendly.includes(styleSlug)) return 88;

  return 75; // Default reasonable compatibility
}

/**
 * Compare two styles for a product type
 */
export function compareStyles(
  productQuery: string,
  style1: string,
  style2: string,
  context: RecommendationContext = {}
): {
  winner: string;
  comparison: {
    category: string;
    style1Score: number;
    style2Score: number;
    winner: string;
  }[];
  recommendation: string;
} {
  const products = searchProducts(productQuery, 1);
  const productType = products[0]?.type || productQuery;

  const categories = ["productType", "brandMood", "audience", "device", "accessibility"] as const;

  const style1Scores = {
    productType: calculateProductTypeScore(style1, productType),
    brandMood: calculateBrandMoodScore(style1, context.brandMood),
    audience: calculateAudienceScore(style1, context),
    device: calculateDeviceScore(style1, context),
    accessibility: calculateAccessibilityScore(style1, context),
  };

  const style2Scores = {
    productType: calculateProductTypeScore(style2, productType),
    brandMood: calculateBrandMoodScore(style2, context.brandMood),
    audience: calculateAudienceScore(style2, context),
    device: calculateDeviceScore(style2, context),
    accessibility: calculateAccessibilityScore(style2, context),
  };

  const comparison = categories.map((cat) => ({
    category: cat,
    style1Score: style1Scores[cat],
    style2Score: style2Scores[cat],
    winner: style1Scores[cat] > style2Scores[cat] ? style1 : style2,
  }));

  const total1 = Object.values(style1Scores).reduce((a, b) => a + b, 0);
  const total2 = Object.values(style2Scores).reduce((a, b) => a + b, 0);
  const winner = total1 > total2 ? style1 : style2;

  return {
    winner,
    comparison,
    recommendation:
      total1 === total2
        ? `Both styles are equally suitable. Choose based on personal preference.`
        : `${winner} is recommended with ${Math.round(
            ((Math.max(total1, total2) - Math.min(total1, total2)) / Math.max(total1, total2)) *
              100
          )}% better fit.`,
  };
}

/**
 * Get style suggestions based on constraints
 */
export function suggestStyleByConstraints(constraints: {
  mustHave?: string[];  // Features that must be present
  mustNotHave?: string[];  // Features to avoid
  priorities?: ("performance" | "accessibility" | "visual-impact" | "professionalism")[];
}): StyleScore[] {
  const featureMap: Record<string, string[]> = {
    // Features
    "high-contrast": ["neo-brutalist", "corporate-clean", "minimalist-flat"],
    "rounded-corners": ["soft-ui", "bento-grid", "glassmorphism", "neumorphism"],
    "sharp-corners": ["neo-brutalist", "neo-brutalist-soft", "neo-brutalist-playful"],
    "gradients": ["glassmorphism", "cyberpunk-neon", "modern-gradient"],
    "shadows": ["neumorphism", "soft-ui", "bento-grid"],
    "minimal": ["minimalist-flat", "corporate-clean"],
    "bold": ["neo-brutalist", "neo-brutalist-playful", "cyberpunk-neon"],
    "elegant": ["editorial", "glassmorphism"],
    // Anti-features
    "no-animations": ["minimalist-flat", "corporate-clean"],
    "no-blur": ["neo-brutalist", "minimalist-flat", "editorial"],
    "no-shadows": ["minimalist-flat"],
  };

  const priorityMap: Record<string, string[]> = {
    performance: ["minimalist-flat", "neo-brutalist", "corporate-clean"],
    accessibility: ["neo-brutalist", "corporate-clean", "minimalist-flat"],
    "visual-impact": ["glassmorphism", "neo-brutalist-playful", "cyberpunk-neon"],
    professionalism: ["corporate-clean", "editorial", "minimalist-flat"],
  };

  return styles.map((style) => {
    let score = 50;
    const reasons: string[] = [];

    // Must have features
    if (constraints.mustHave) {
      for (const feature of constraints.mustHave) {
        if (featureMap[feature]?.includes(style.slug)) {
          score += 15;
          reasons.push(`Has ${feature}`);
        }
      }
    }

    // Must not have features
    if (constraints.mustNotHave) {
      for (const feature of constraints.mustNotHave) {
        if (!featureMap[feature]?.includes(style.slug)) {
          score += 10;
          reasons.push(`Avoids ${feature}`);
        } else {
          score -= 20;
        }
      }
    }

    // Priority matching
    if (constraints.priorities) {
      for (let i = 0; i < constraints.priorities.length; i++) {
        const priority = constraints.priorities[i];
        if (priorityMap[priority]?.includes(style.slug)) {
          score += 20 - i * 5; // First priority worth more
          reasons.push(`Matches ${priority} priority`);
        }
      }
    }

    return {
      slug: style.slug,
      name: style.nameEn,
      score: Math.min(Math.max(score, 0), 100),
      matches: { productType: 0, brandMood: 0, audience: 0, device: 0, accessibility: 0 },
      reasons,
    };
  }).sort((a, b) => b.score - a.score);
}
