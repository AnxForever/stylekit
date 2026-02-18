/**
 * Project Style Inference Engine
 *
 * Analyzes component code to detect which StyleKit design style it most
 * closely matches. Uses class extraction, lint rules, token data, and
 * pattern detection to produce ranked confidence scores for every
 * registered style.
 *
 * Used by:
 * - API: /api/analyze-style endpoint
 * - MCP: analyze_project_style tool
 * - UI:  /analyze page
 */

import { extractClasses } from "@/lib/linter/class-extractor";
import { styles } from "@/lib/styles";
import {
  styleLintRules,
  type StyleLintRule,
} from "@/lib/styles/lint-rules";
import { styleTokensRegistry } from "@/lib/styles/tokens-registry";
import type { StyleTokens } from "@/lib/styles/tokens";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface StyleMatch {
  slug: string;
  name: string;
  confidence: number; // 0-100
  matchDetails: {
    classOverlap: number; // % of project classes matching recommended patterns
    forbiddenViolations: number; // count of forbidden classes used
    requiredPresence: number; // % of required classes present
    patternScore: number; // score from dominant-pattern heuristics
    environmentScore: number; // score from package.json / tailwind config context
  };
  explanation: string;
}

export interface AnalysisInput {
  code: string;
  packageJson?: string;
  tailwindConfig?: string;
}

export interface AnalysisResult {
  topMatches: StyleMatch[];
  classesFound: string[];
  dominantPatterns: string[];
  environmentHints?: string[];
}

// ---------------------------------------------------------------------------
// Pattern definitions
// ---------------------------------------------------------------------------

interface PatternDef {
  name: string;
  test: (cls: string) => boolean;
  /** Style slugs that are positively correlated with this pattern */
  positive: string[];
  /** Style slugs that are negatively correlated with this pattern */
  negative: string[];
}

const PATTERN_DEFS: PatternDef[] = [
  {
    name: "rounded corners (large)",
    test: (c) => /^rounded-(xl|2xl|3xl|full)$/.test(c),
    positive: [
      "soft-ui", "glassmorphism", "neumorphism", "bento-grid", "claymorphism",
      "material-design", "fluent-design",
    ],
    negative: ["neo-brutalist", "minimalist-flat", "editorial"],
  },
  {
    name: "sharp corners",
    test: (c) => c === "rounded-none",
    positive: [
      "neo-brutalist", "minimalist-flat", "editorial",
      "swiss-style", "bauhaus",
    ],
    negative: [
      "soft-ui", "glassmorphism", "neumorphism", "bento-grid",
    ],
  },
  {
    name: "gradients",
    test: (c) => /^bg-gradient/.test(c) || /^from-/.test(c) || /^to-/.test(c),
    positive: [
      "modern-gradient", "neon-gradient", "glassmorphism", "vaporwave",
      "synthwave", "outrun",
    ],
    negative: [
      "neo-brutalist", "minimalist-flat", "editorial",
      "corporate-clean",
    ],
  },
  {
    name: "heavy shadows",
    test: (c) => /^shadow-(lg|xl|2xl)$/.test(c),
    positive: ["neumorphism", "soft-ui", "skeuomorphism"],
    negative: ["minimalist-flat", "editorial"],
  },
  {
    name: "hard offset shadows",
    test: (c) => /^shadow-\[\d+px_\d+px_0/.test(c),
    positive: ["neo-brutalist", "neo-brutalist-playful", "neo-brutalist-soft"],
    negative: ["neumorphism", "soft-ui", "glassmorphism", "corporate-clean"],
  },
  {
    name: "no shadows",
    test: (c) => c === "shadow-none",
    positive: ["minimalist-flat", "editorial"],
    negative: ["neumorphism", "soft-ui"],
  },
  {
    name: "backdrop blur",
    test: (c) => /^backdrop-blur/.test(c),
    positive: ["glassmorphism", "modern-gradient", "liquid-glass", "fluent-design"],
    negative: ["neo-brutalist", "minimalist-flat", "editorial"],
  },
  {
    name: "thick borders",
    test: (c) => /^border-(2|4|\[3px\]|\[4px\])$/.test(c) || /^border-\[\dpx\]$/.test(c),
    positive: [
      "neo-brutalist", "neubrutalism", "neo-brutalist-playful",
      "minimalist-flat", "comic-style",
    ],
    negative: ["neumorphism", "soft-ui", "glassmorphism"],
  },
  {
    name: "dark backgrounds",
    test: (c) =>
      /^bg-(gray|slate|zinc|neutral)-(800|900|950)$/.test(c) || c === "bg-black",
    positive: [
      "dark-mode", "cyberpunk-neon", "synthwave", "outrun", "neon-gradient",
      "modern-gradient",
    ],
    negative: ["corporate-clean", "soft-ui", "natural-organic"],
  },
  {
    name: "neon glow shadows",
    test: (c) => /^shadow-\[0_0_\d+px/.test(c),
    positive: ["cyberpunk-neon", "synthwave", "outrun", "neon-samurai", "neon-gradient"],
    negative: ["corporate-clean", "editorial", "minimalist-flat"],
  },
  {
    name: "serif fonts",
    test: (c) => c === "font-serif",
    positive: ["editorial", "retro-vintage", "art-nouveau", "dark-academia", "gothic"],
    negative: ["neo-brutalist", "cyberpunk-neon", "material-design"],
  },
  {
    name: "monospace fonts",
    test: (c) => c === "font-mono",
    positive: ["neo-brutalist", "cyberpunk-neon", "pixel-art", "pixel-anime"],
    negative: ["editorial", "retro-vintage", "natural-organic"],
  },
  {
    name: "translucent backgrounds",
    test: (c) => /^bg-white\/\d+$/.test(c) || /^bg-black\/\d+$/.test(c),
    positive: ["glassmorphism", "modern-gradient", "liquid-glass"],
    negative: ["neo-brutalist", "minimalist-flat"],
  },
  {
    name: "earth tone colors",
    test: (c) => /^(bg|text|border)-(stone|amber|orange|warm)/.test(c),
    positive: ["natural-organic", "retro-vintage", "cottagecore", "dark-academia"],
    negative: ["cyberpunk-neon", "synthwave", "vaporwave"],
  },
  {
    name: "grid layout",
    test: (c) => c === "grid" || /^grid-cols-/.test(c),
    positive: ["bento-grid", "dashboard-layout", "magazine-grid", "masonry-flow"],
    negative: [],
  },
];

const STYLE_SLUG_SET = new Set(styles.map((style) => style.slug));

interface EnvironmentContext {
  styleBoosts: Record<string, number>;
  styleReasons: Record<string, string[]>;
  hints: string[];
}

function addEnvironmentBoost(
  ctx: EnvironmentContext,
  slugs: string[],
  amount: number,
  reason: string,
) {
  for (const slug of slugs) {
    if (!STYLE_SLUG_SET.has(slug)) continue;
    ctx.styleBoosts[slug] = (ctx.styleBoosts[slug] ?? 0) + amount;
    const reasons = ctx.styleReasons[slug] ?? [];
    if (!reasons.includes(reason)) {
      reasons.push(reason);
      ctx.styleReasons[slug] = reasons;
    }
  }
}

function addEnvironmentHint(ctx: EnvironmentContext, hint: string) {
  if (!ctx.hints.includes(hint)) {
    ctx.hints.push(hint);
  }
}

function readDependencies(packageJson?: string): Set<string> {
  if (!packageJson) return new Set();

  try {
    const parsed = JSON.parse(packageJson) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };
    const all = {
      ...(parsed.dependencies ?? {}),
      ...(parsed.devDependencies ?? {}),
      ...(parsed.peerDependencies ?? {}),
    };
    return new Set(Object.keys(all).map((name) => name.toLowerCase()));
  } catch {
    return new Set();
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(cleaned)) return null;

  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : cleaned;

  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
}

function luminance({ r, g, b }: { r: number; g: number; b: number }): number {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function buildEnvironmentContext(input: AnalysisInput): EnvironmentContext {
  const ctx: EnvironmentContext = {
    styleBoosts: {},
    styleReasons: {},
    hints: [],
  };

  const deps = readDependencies(input.packageJson);

  if (deps.has("@mui/material") || deps.has("@mui/system")) {
    addEnvironmentBoost(
      ctx,
      ["material-design", "fluent-design", "corporate-clean"],
      18,
      "Detected Material UI dependencies",
    );
    addEnvironmentHint(ctx, "Material UI dependencies detected");
  }

  if (deps.has("antd")) {
    addEnvironmentBoost(
      ctx,
      ["corporate-clean", "stripe-style", "notion-style"],
      16,
      "Detected Ant Design dependency",
    );
    addEnvironmentHint(ctx, "Ant Design dependency detected");
  }

  if (deps.has("@chakra-ui/react")) {
    addEnvironmentBoost(
      ctx,
      ["soft-ui", "neumorphism", "corporate-clean"],
      14,
      "Detected Chakra UI dependency",
    );
    addEnvironmentHint(ctx, "Chakra UI dependency detected");
  }

  if (deps.has("framer-motion") || deps.has("gsap")) {
    addEnvironmentBoost(
      ctx,
      ["modern-gradient", "glassmorphism", "neon-gradient"],
      12,
      "Animation-focused dependencies suggest motion-rich UI",
    );
    addEnvironmentHint(ctx, "Animation libraries detected");
  }

  if (
    deps.has("three") ||
    deps.has("@react-three/fiber") ||
    deps.has("@react-three/drei")
  ) {
    addEnvironmentBoost(
      ctx,
      ["sci-fi-hud", "cyberpunk-neon", "holographic"],
      14,
      "3D rendering dependencies suggest futuristic visual direction",
    );
    addEnvironmentHint(ctx, "3D rendering dependencies detected");
  }

  if (
    deps.has("nextra") ||
    deps.has("@docusaurus/core") ||
    deps.has("vitepress")
  ) {
    addEnvironmentBoost(
      ctx,
      ["notion-style", "editorial", "minimalist-flat"],
      12,
      "Documentation-oriented stack detected",
    );
    addEnvironmentHint(ctx, "Documentation stack dependency detected");
  }

  if (input.tailwindConfig) {
    const hexMatches =
      input.tailwindConfig.match(/#[0-9a-fA-F]{3,6}/g)?.slice(0, 100) ?? [];
    const rgbColors = hexMatches
      .map((hex) => hexToRgb(hex))
      .filter((color): color is { r: number; g: number; b: number } => color !== null);

    if (rgbColors.length > 0) {
      const darkRatio =
        rgbColors.filter((color) => luminance(color) < 0.28).length /
        rgbColors.length;
      const pastelRatio =
        rgbColors.filter((color) => {
          const max = Math.max(color.r, color.g, color.b);
          const min = Math.min(color.r, color.g, color.b);
          const lightness = (max + min) / 2;
          return lightness > 180 && max - min < 110;
        }).length / rgbColors.length;

      if (darkRatio >= 0.55) {
        addEnvironmentBoost(
          ctx,
          ["dark-mode", "cyberpunk-neon", "sci-fi-hud"],
          14,
          "Tailwind config uses predominantly dark palette tokens",
        );
        addEnvironmentHint(ctx, "Tailwind config indicates dark palette preference");
      }

      if (pastelRatio >= 0.5) {
        addEnvironmentBoost(
          ctx,
          ["soft-ui", "kawaii-minimal", "watercolor-style"],
          12,
          "Tailwind config contains mostly soft pastel colors",
        );
        addEnvironmentHint(ctx, "Tailwind config indicates pastel palette preference");
      }
    }

    const hasRoundedNone = /borderRadius[\s\S]*?(0px|['"]0['"]|rounded-none)/i.test(
      input.tailwindConfig,
    );
    const hasRoundedFull = /borderRadius[\s\S]*?(9999px|full|pill)/i.test(
      input.tailwindConfig,
    );
    const hasBackdropBlur =
      /backdropBlur|blur\(/i.test(input.tailwindConfig);

    if (hasRoundedNone) {
      addEnvironmentBoost(
        ctx,
        ["neo-brutalist", "minimalist-flat"],
        10,
        "Tailwind config includes sharp border radius settings",
      );
      addEnvironmentHint(ctx, "Tailwind border radius leans sharp");
    }

    if (hasRoundedFull) {
      addEnvironmentBoost(
        ctx,
        ["soft-ui", "glassmorphism", "neumorphism"],
        10,
        "Tailwind config includes full/round border radius settings",
      );
      addEnvironmentHint(ctx, "Tailwind border radius leans rounded");
    }

    if (hasBackdropBlur) {
      addEnvironmentBoost(
        ctx,
        ["glassmorphism", "liquid-glass", "holographic"],
        10,
        "Tailwind config includes blur/backdrop token settings",
      );
      addEnvironmentHint(ctx, "Tailwind config includes blur-related tokens");
    }
  }

  return ctx;
}

function calculateEnvironmentScore(
  styleSlug: string,
  ctx: EnvironmentContext,
): number {
  const boost = ctx.styleBoosts[styleSlug] ?? 0;
  return Math.max(0, Math.min(100, 50 + boost));
}

// ---------------------------------------------------------------------------
// Core analysis
// ---------------------------------------------------------------------------

/**
 * Analyze code to infer which StyleKit design style best matches.
 *
 * Algorithm outline:
 * 1. Extract all Tailwind CSS classes from the input code.
 * 2. For each registered style:
 *    a. Score based on forbidden-class violations (penalty).
 *    b. Score based on required-class presence (reward).
 *    c. Score based on recommended-class overlap (reward).
 *    d. Score based on pattern heuristics (positive/negative correlation).
 *    e. Apply environment context hints from package.json / tailwind config.
 * 3. Combine into a composite confidence score (0-100).
 * 4. Sort descending, return top 5 with explanations.
 */
export function analyzeProjectStyle(input: AnalysisInput): AnalysisResult {
  const extracted = extractClasses(input.code);
  const classesFound = [...new Set(extracted.map((e) => e.class))];

  if (classesFound.length === 0) {
    return { topMatches: [], classesFound: [], dominantPatterns: [] };
  }

  const dominantPatterns = detectDominantPatterns(classesFound);
  const environmentContext = buildEnvironmentContext(input);

  const scored: StyleMatch[] = [];

  for (const style of styles) {
    const slug = style.slug;
    const rules = styleLintRules[slug] as StyleLintRule | undefined;
    const tokens = styleTokensRegistry[slug] as StyleTokens | undefined;

    // If neither rules nor tokens exist we can still score by patterns
    const forbiddenViolations = countForbiddenViolations(classesFound, rules, tokens);
    const requiredPresence = calculateRequiredPresence(classesFound, rules);
    const classOverlap = calculateClassOverlap(classesFound, rules, tokens);
    const patternScore = calculatePatternScore(classesFound, slug);
    const environmentScore = calculateEnvironmentScore(slug, environmentContext);

    // Weighted composite with context adjustments
    const forbiddenPenalty =
      classesFound.length > 0
        ? Math.min(100, (forbiddenViolations / classesFound.length) * 200)
        : 0;

    const raw =
      classOverlap * 0.3 +
      requiredPresence * 0.23 +
      patternScore * 0.3 -
      forbiddenPenalty * 0.15 +
      (environmentScore - 50) * 0.18;

    const confidence = Math.max(0, Math.min(100, Math.round(raw)));

    scored.push({
      slug,
      name: style.nameEn,
      confidence,
      matchDetails: {
        classOverlap: Math.round(classOverlap),
        forbiddenViolations,
        requiredPresence: Math.round(requiredPresence),
        patternScore: Math.round(patternScore),
        environmentScore: Math.round(environmentScore),
      },
      explanation: "", // filled below for top matches
    });
  }

  scored.sort((a, b) => b.confidence - a.confidence);

  // Generate explanations only for top 5 (expensive string work)
  const top5 = scored.slice(0, 5).map((m) => ({
    ...m,
    explanation: generateExplanation(
      m.slug,
      m.matchDetails,
      dominantPatterns,
      environmentContext.styleReasons[m.slug] ?? [],
    ),
  }));

  return {
    topMatches: top5,
    classesFound,
    dominantPatterns,
    ...(environmentContext.hints.length > 0
      ? { environmentHints: environmentContext.hints }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// Scoring helpers
// ---------------------------------------------------------------------------

function countForbiddenViolations(
  classes: string[],
  rules: StyleLintRule | undefined,
  tokens: StyleTokens | undefined,
): number {
  let count = 0;

  for (const cls of classes) {
    // Check lint rules
    if (rules) {
      if (rules.forbidden.classes.includes(cls)) {
        count++;
        continue;
      }
      if (rules.forbidden.patterns.some((p) => p.test(cls))) {
        count++;
        continue;
      }
    }

    // Check tokens
    if (tokens) {
      if (tokens.forbidden.classes.includes(cls)) {
        count++;
        continue;
      }
      if (tokens.forbidden.patterns.some((p) => new RegExp(p).test(cls))) {
        count++;
      }
    }
  }

  return count;
}

function calculateRequiredPresence(
  classes: string[],
  rules: StyleLintRule | undefined,
): number {
  if (!rules) return 50; // neutral when no rules
  const required = rules.required;
  if (!required) return 50;

  let totalParts = 0;
  let matchedParts = 0;

  for (const compClasses of Object.values(required)) {
    if (!compClasses || !Array.isArray(compClasses)) continue;
    for (const reqStr of compClasses) {
      const parts = reqStr.split(/\s+/).filter(Boolean);
      for (const part of parts) {
        totalParts++;
        if (classes.some((c) => c === part || c.includes(part))) {
          matchedParts++;
        }
      }
    }
  }

  if (totalParts === 0) return 50;
  return (matchedParts / totalParts) * 100;
}

function calculateClassOverlap(
  classes: string[],
  rules: StyleLintRule | undefined,
  tokens: StyleTokens | undefined,
): number {
  if (!rules && !tokens) return 0;

  // Build a set of "recommended" class fragments for this style
  const recommended = new Set<string>();

  if (rules) {
    const rec = rules.recommended;
    for (const val of [rec.borderRadius, rec.shadow, rec.transition, rec.spacing]) {
      if (val) {
        for (const part of val.split(/\s+/)) {
          if (part && !part.includes("or") && !part.includes("(")) {
            recommended.add(part);
          }
        }
      }
    }

    // Add required classes as recommended
    for (const compClasses of Object.values(rules.required || {})) {
      if (!compClasses || !Array.isArray(compClasses)) continue;
      for (const reqStr of compClasses) {
        for (const part of reqStr.split(/\s+/).filter(Boolean)) {
          recommended.add(part);
        }
      }
    }
  }

  if (tokens) {
    // Add token-specific classes
    for (const val of [
      tokens.border.radius,
      tokens.border.width,
      tokens.border.color,
      tokens.shadow.md,
      tokens.shadow.hover,
      tokens.interaction.transition,
      tokens.interaction.hoverTranslate,
      tokens.interaction.hoverScale,
      tokens.typography.heading,
      tokens.typography.body,
    ]) {
      if (val) {
        for (const part of val.split(/\s+/)) {
          if (part) recommended.add(part);
        }
      }
    }

    // Required component classes from tokens
    for (const compClasses of [
      tokens.required?.button,
      tokens.required?.card,
      tokens.required?.input,
    ]) {
      if (!compClasses || !Array.isArray(compClasses)) continue;
      for (const reqStr of compClasses) {
        for (const part of reqStr.split(/\s+/).filter(Boolean)) {
          recommended.add(part);
        }
      }
    }
  }

  if (recommended.size === 0) return 0;

  let matchCount = 0;
  for (const cls of classes) {
    if (recommended.has(cls)) {
      matchCount++;
    }
  }

  return (matchCount / classes.length) * 100;
}

function calculatePatternScore(classes: string[], styleSlug: string): number {
  let score = 50; // neutral baseline

  for (const pDef of PATTERN_DEFS) {
    const matchCount = classes.filter(pDef.test).length;
    if (matchCount === 0) continue;

    const weight = Math.min(matchCount, 5); // cap influence per pattern

    if (pDef.positive.includes(styleSlug)) {
      score += weight * 4;
    }
    if (pDef.negative.includes(styleSlug)) {
      score -= weight * 4;
    }
  }

  return Math.max(0, Math.min(100, score));
}

// ---------------------------------------------------------------------------
// Pattern detection (user-facing)
// ---------------------------------------------------------------------------

export function detectDominantPatterns(classes: string[]): string[] {
  const detected: string[] = [];

  for (const pDef of PATTERN_DEFS) {
    const matchCount = classes.filter(pDef.test).length;
    if (matchCount >= 1) {
      detected.push(pDef.name);
    }
  }

  return detected;
}

// ---------------------------------------------------------------------------
// Explanation generation
// ---------------------------------------------------------------------------

export function generateExplanation(
  slug: string,
  details: StyleMatch["matchDetails"],
  patterns: string[],
  environmentReasons: string[] = [],
): string {
  const parts: string[] = [];

  if (details.classOverlap > 30) {
    parts.push(
      `${details.classOverlap}% of your classes match ${slug} recommended patterns`
    );
  }

  if (details.requiredPresence > 40) {
    parts.push(
      `${details.requiredPresence}% of required component classes are present`
    );
  }

  if (details.forbiddenViolations === 0) {
    parts.push("no forbidden classes detected");
  } else if (details.forbiddenViolations <= 2) {
    parts.push(`only ${details.forbiddenViolations} forbidden class(es) found`);
  } else {
    parts.push(`${details.forbiddenViolations} forbidden class violations`);
  }

  if (patterns.length > 0) {
    const relevantPatterns = getRelevantPatternsForStyle(slug, patterns);
    if (relevantPatterns.length > 0) {
      parts.push(
        `detected patterns: ${relevantPatterns.slice(0, 3).join(", ")}`
      );
    }
  }

  if (details.environmentScore >= 60 && environmentReasons.length > 0) {
    parts.push(environmentReasons[0]);
  }

  if (parts.length === 0) {
    return `Low similarity to ${slug} style.`;
  }

  const styleName = styles.find((s) => s.slug === slug)?.nameEn ?? slug;
  return `Your code shows characteristics of ${styleName}: ${parts.join("; ")}.`;
}

function getRelevantPatternsForStyle(slug: string, patterns: string[]): string[] {
  return patterns.filter((pName) => {
    const def = PATTERN_DEFS.find((d) => d.name === pName);
    return def?.positive.includes(slug);
  });
}
