// Quality Scoring Engine for StyleKit styles (v2)
// Evaluates recipe coverage, CSS depth, definition quality, and color system
// Upgraded from v1: content-depth scoring replaces simple existence checks

import { styles, type DesignStyle } from "@/lib/styles";
import { getStyleRecipes } from "@/lib/recipes";

// -- Types --------------------------------------------------------------------

export interface QualityScore {
  slug: string;
  name: string;
  overall: number;
  grade: string;
  recipeScore: number;
  cssScore: number;
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

// -- Constants ----------------------------------------------------------------

const REQUIRED_RECIPE_COMPONENTS = [
  "button",
  "card",
  "input",
  "nav",
  "hero",
  "footer",
] as const;

const MAX_RECIPE = 30;
const MAX_CSS = 25;
const MAX_DEFINITION = 30;
const MAX_COLOR = 15;

// -- Scoring Functions --------------------------------------------------------

/**
 * Score recipe coverage (30 points max, was 40)
 * Each of the 6 required components is worth 5 points
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

  const pointsPerComponent = MAX_RECIPE / REQUIRED_RECIPE_COMPONENTS.length;
  return {
    score: round(found * pointsPerComponent),
    missing,
  };
}

/**
 * Score CSS quality and depth (25 points max)
 *
 * Breakdown:
 *   - globalCss line depth:        10 pts (0-5 lines=0, 6-15=3, 16-30=5, 31-60=8, 60+=10)
 *   - Utility class richness:       8 pts (count .className definitions: 0=0, 1-2=3, 3-4=6, 5+=8)
 *   - Advanced CSS techniques:      7 pts (1 pt each for CSS vars, @keyframes, pseudo-elements,
 *                                          clip-path, SVG filter, backdrop-filter, gradients; max 7)
 */
function scoreCssQuality(
  style: DesignStyle,
): { score: number; missing: string[] } {
  const missing: string[] = [];
  const css = style.globalCss || "";
  const lines = css.split("\n").filter((l) => l.trim().length > 0);
  const lineCount = lines.length;

  // 1. Line depth (10 pts)
  let depthPts = 0;
  if (lineCount >= 60) depthPts = 10;
  else if (lineCount >= 31) depthPts = 8;
  else if (lineCount >= 16) depthPts = 5;
  else if (lineCount >= 6) depthPts = 3;
  else missing.push(`css:depth(${lineCount} lines)`);

  // 2. Utility class richness (8 pts)
  const classMatches = css.match(/\.\w[\w-]*\s*\{/g) || [];
  // Also count classes defined with ::before/::after
  const pseudoClassMatches = css.match(/\.\w[\w-]*::?\w+/g) || [];
  const uniqueClasses = new Set([
    ...classMatches.map((m) => m.replace(/\s*\{/, "")),
    ...pseudoClassMatches.map((m) => m.split("::")[0].split(":")[0]),
  ]);
  const classCount = uniqueClasses.size;
  let classPts = 0;
  if (classCount >= 5) classPts = 8;
  else if (classCount >= 3) classPts = 6;
  else if (classCount >= 1) classPts = 3;
  else missing.push("css:no-utility-classes");

  // 3. Advanced CSS techniques (7 pts, 1 pt each)
  let techPts = 0;
  const techniques: [string, RegExp][] = [
    ["css-vars", /--[\w-]+\s*:/],
    ["keyframes", /@keyframes/],
    ["pseudo-elements", /::(?:before|after)/],
    ["clip-path", /clip-path/],
    ["svg-filter", /(?:filter\s*:|url\(#)/],
    ["backdrop-filter", /backdrop-filter/],
    ["gradients", /(?:linear|radial|conic)-gradient/],
  ];
  for (const [name, regex] of techniques) {
    if (regex.test(css)) {
      techPts++;
    } else {
      // Only report missing for advanced techniques if CSS is substantial
      if (lineCount >= 16) {
        missing.push(`css:technique(${name})`);
      }
    }
  }
  techPts = Math.min(techPts, 7);

  return {
    score: round(depthPts + classPts + techPts),
    missing: missing.slice(0, 5), // Limit missing items for readability
  };
}

/**
 * Score definition completeness and depth (30 points max, was 25)
 *
 * Breakdown (5 pts each):
 *   - philosophy:     depth by char count (50-150=2, 150-300=3.5, 300+=5)
 *   - doList:         count + specificity (has CSS values = bonus)
 *   - dontList:       count + specificity (has CSS values = bonus)
 *   - aiRules:        depth by char count + structure (sections/checklist bonus)
 *   - keywords:       count gradient (3-5=3, 6-8=4, 9+=5)
 *   - examplePrompts: count gradient (1=2.5, 2=4, 3+=5)
 */
function scoreDefinitionQuality(
  style: DesignStyle,
): { score: number; missing: string[] } {
  const missing: string[] = [];
  let points = 0;

  // 1. Philosophy depth (5 pts)
  const philLen = (style.philosophy || "").length;
  if (philLen >= 300) {
    points += 5;
  } else if (philLen >= 150) {
    points += 3.5;
  } else if (philLen >= 50) {
    points += 2;
  } else {
    missing.push(`def:philosophy(${philLen} chars)`);
  }

  // 2. doList quality (5 pts)
  const doCount = style.doList?.length ?? 0;
  if (doCount >= 3) {
    let doPts = doCount >= 5 ? 3 : 2;
    // Bonus for specificity: check if items contain CSS values
    if (hasCssValues(style.doList)) {
      doPts += 2;
    }
    points += Math.min(doPts, 5);
  } else {
    missing.push(`def:doList(${doCount}/3)`);
  }

  // 3. dontList quality (5 pts)
  const dontCount = style.dontList?.length ?? 0;
  if (dontCount >= 3) {
    let dontPts = dontCount >= 5 ? 3 : 2;
    if (hasCssValues(style.dontList)) {
      dontPts += 2;
    }
    points += Math.min(dontPts, 5);
  } else {
    missing.push(`def:dontList(${dontCount}/3)`);
  }

  // 4. aiRules depth (5 pts)
  const rulesLen = (style.aiRules || "").length;
  if (rulesLen >= 1000) {
    let rulesPts = 4;
    // Bonus for structure: sections, headers, checklist
    if (hasStructuredContent(style.aiRules || "")) {
      rulesPts += 1;
    }
    points += Math.min(rulesPts, 5);
  } else if (rulesLen >= 500) {
    points += 3;
  } else if (rulesLen >= 100) {
    points += 1.5;
  } else {
    missing.push("def:aiRules");
  }

  // 5. Keywords (5 pts)
  const kwCount = style.keywords?.length ?? 0;
  if (kwCount >= 9) {
    points += 5;
  } else if (kwCount >= 6) {
    points += 4;
  } else if (kwCount >= 3) {
    points += 3;
  } else {
    missing.push(`def:keywords(${kwCount}/3)`);
  }

  // 6. Example prompts (5 pts)
  const promptCount = style.examplePrompts?.length ?? 0;
  if (promptCount >= 3) {
    points += 5;
  } else if (promptCount >= 2) {
    points += 4;
  } else if (promptCount >= 1) {
    points += 2.5;
  } else {
    missing.push("def:examplePrompts(0)");
  }

  return {
    score: round(points),
    missing,
  };
}

/**
 * Score color palette system (15 points max, was 10)
 *
 * Breakdown:
 *   - primary:         3 pts
 *   - secondary:       3 pts
 *   - accent exists:   3 pts
 *   - accent richness: 3 pts (2 colors=1.5, 3=2.5, 4+=3)
 *   - variants:        3 pts (1 variant=2, 2+=3)
 */
function scoreColorSystem(
  style: DesignStyle,
): { score: number; missing: string[] } {
  const missing: string[] = [];
  let points = 0;

  // primary (3 pts)
  if (style.colors?.primary) {
    points += 3;
  } else {
    missing.push("color:primary");
  }

  // secondary (3 pts)
  if (style.colors?.secondary) {
    points += 3;
  } else {
    missing.push("color:secondary");
  }

  // accent exists (3 pts)
  const accentCount = style.colors?.accent?.length ?? 0;
  if (accentCount > 0) {
    points += 3;
  } else {
    missing.push("color:accent");
  }

  // accent richness (3 pts)
  if (accentCount >= 4) {
    points += 3;
  } else if (accentCount >= 3) {
    points += 2.5;
  } else if (accentCount >= 2) {
    points += 1.5;
  } else if (accentCount === 0) {
    missing.push("color:accent-richness");
  }

  // variants (3 pts)
  const variantCount = style.variants?.length ?? 0;
  if (variantCount >= 2) {
    points += 3;
  } else if (variantCount >= 1) {
    points += 2;
  } else {
    missing.push("color:no-variants");
  }

  return { score: round(points), missing };
}

// -- Helpers ------------------------------------------------------------------

/** Round to 1 decimal place */
function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Check if a list of strings contains specific CSS values (px, rem, %, Tailwind classes) */
function hasCssValues(items: string[] | undefined): boolean {
  if (!items || items.length === 0) return false;
  const cssPattern = /(?:\d+px|\d+rem|\d+%|#[0-9a-f]{3,8}|rgba?\(|hsla?\(|border-|bg-|text-|shadow-|rounded-|p-|m-|gap-|space-|font-|blur-|backdrop-|cubic-bezier|transition-|transform|opacity-|ring-)/i;
  const matchCount = items.filter((item) => cssPattern.test(item)).length;
  // At least 30% of items should contain specific CSS values
  return matchCount >= Math.ceil(items.length * 0.3);
}

/** Check if text has structured content (sections, headers, numbered lists, checklists) */
function hasStructuredContent(text: string): boolean {
  const lines = text.split("\n");
  let structureIndicators = 0;

  // Check for section headers (##, **, numbered headings)
  if (lines.some((l) => /^#{1,3}\s/.test(l.trim()) || /^\*\*[^*]+\*\*/.test(l.trim()))) {
    structureIndicators++;
  }

  // Check for numbered/bulleted lists (at least 3 items)
  const listItems = lines.filter(
    (l) => /^\s*[-*]\s/.test(l) || /^\s*\d+[.)]\s/.test(l),
  );
  if (listItems.length >= 3) {
    structureIndicators++;
  }

  // Check for checklist or verification items
  if (/checklist|self-check|verify|verification/i.test(text)) {
    structureIndicators++;
  }

  return structureIndicators >= 2;
}

// -- Grade Assignment ---------------------------------------------------------

function assignGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// -- Public API ---------------------------------------------------------------

/**
 * Score a single style's quality
 */
export function scoreStyleQuality(slug: string): QualityScore | null {
  const style = styles.find((s) => s.slug === slug);
  if (!style) return null;

  const recipe = scoreRecipeCoverage(slug);
  const css = scoreCssQuality(style);
  const definition = scoreDefinitionQuality(style);
  const color = scoreColorSystem(style);

  const overall = round(
    recipe.score + css.score + definition.score + color.score,
  );

  const allMissing = [
    ...recipe.missing,
    ...css.missing,
    ...definition.missing,
    ...color.missing,
  ];

  return {
    slug,
    name: style.nameEn || style.name,
    overall,
    grade: assignGrade(overall),
    recipeScore: recipe.score,
    cssScore: css.score,
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
      ? round(
          scoreList.reduce((sum, s) => sum + s.overall, 0) / totalStyles,
        )
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
