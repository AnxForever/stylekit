// AI Style Generator Engine
// Parses natural language descriptions into style attribute vectors,
// finds the closest existing styles, and interpolates their tokens.

import type { StyleTokens } from "../styles/tokens";
import { getStyleTokens } from "../styles/tokens-registry";
import { styles } from "../styles/index";

// ============ TYPES ============

export interface GenerationRequest {
  description: string;
  baseStyle?: string;
}

export interface GenerationInsights {
  baseStyle: string | null;
  detectedStyles: string[];
  avoidedStyles: string[];
  matchedKeywords: string[];
  negativeKeywords: string[];
}

export interface GeneratedStyle {
  name: string;
  description: string;
  tokens: StyleTokens;
  sourceStyles: { slug: string; weight: number }[];
  confidence: number;
  reasoning?: string[];
  insights?: GenerationInsights;
}

// ============ KEYWORD MAPPINGS ============

/** Maps descriptive keywords to style slugs that embody this mood */
const MOOD_KEYWORDS: Record<string, string[]> = {
  warm: ["cottagecore", "natural-organic", "art-nouveau"],
  cold: ["glassmorphism", "minimalist-flat", "corporate-clean"],
  cool: ["glassmorphism", "minimalist-flat", "swiss-style"],
  playful: ["neo-brutalist-playful", "memphis", "pop-art", "comic-style"],
  professional: ["corporate-clean", "stripe-style", "notion-style"],
  elegant: ["editorial", "art-deco", "apple-style"],
  bold: ["neo-brutalist", "geometric-bold", "swiss-poster"],
  minimal: ["minimalist-flat", "apple-style", "notion-style"],
  minimalist: ["minimalist-flat", "apple-style", "notion-style"],
  dark: ["dark-mode", "cyberpunk-neon", "dark-academia"],
  retro: ["retro-vintage", "vaporwave", "synthwave", "y2k"],
  vintage: ["retro-vintage", "art-deco", "art-nouveau"],
  futuristic: ["cyberpunk-neon", "outrun", "mecha"],
  organic: ["natural-organic", "watercolor-style", "cottagecore"],
  natural: ["natural-organic", "watercolor-style", "cottagecore"],
  geometric: ["geometric-bold", "bauhaus", "swiss-style"],
  soft: ["soft-ui", "neumorphism", "neo-brutalist-soft"],
  luxury: ["art-deco", "dark-academia", "editorial"],
  luxurious: ["art-deco", "dark-academia", "editorial"],
  cute: ["cottagecore", "shoujo-manga", "pixel-anime"],
  kawaii: ["shoujo-manga", "pixel-anime", "cottagecore"],
  edgy: ["glitch-art", "cyberpunk-neon", "acid-graphics"],
  clean: ["minimalist-flat", "stripe-style", "apple-style"],
  colorful: ["memphis", "pop-art", "vaporwave", "y2k"],
  vibrant: ["memphis", "pop-art", "vaporwave", "cyberpunk-neon"],
  japanese: ["japanese-fresh", "cyber-wafuu", "ukiyo-e-digital"],
  anime: ["cyber-anime", "shoujo-manga", "pixel-anime", "visual-novel"],
  gothic: ["gothic", "gothic-lolita", "dark-academia"],
  steampunk: ["steampunk"],
  neon: ["cyberpunk-neon", "synthwave", "outrun", "neon-samurai"],
  glassy: ["glassmorphism", "liquid-glass"],
  glass: ["glassmorphism", "liquid-glass"],
  flat: ["minimalist-flat", "material-design", "swiss-style"],
  rounded: ["soft-ui", "neumorphism", "claymorphism"],
  sharp: ["neo-brutalist", "geometric-bold", "swiss-poster"],
  modern: ["apple-style", "stripe-style", "material-design"],
  classic: ["editorial", "art-deco", "swiss-style"],
  grunge: ["glitch-art", "acid-graphics", "risograph"],
  dreamy: ["vaporwave", "watercolor-style", "watercolor-art"],
  handmade: ["hand-drawn-doodle", "sketch-style", "watercolor-art"],
  sketchy: ["sketch-style", "hand-drawn-doodle"],
  pixel: ["pixel-art", "pixel-anime"],
  techy: ["cyberpunk-neon", "mecha", "material-design"],
  corporate: ["corporate-clean", "stripe-style", "notion-style"],
  academic: ["dark-academia", "editorial"],
  whimsical: ["cottagecore", "ghibli-style", "watercolor-style"],
  magical: ["magic-circle", "ghibli-style", "shoujo-manga"],
  cinematic: ["editorial", "outrun", "synthwave"],
  brutalist: ["neo-brutalist", "neo-brutalist-soft", "neo-brutalist-playful"],
  surreal: ["surrealism", "acid-graphics", "glitch-art"],
  chinese: ["cyber-chinese"],
  apple: ["apple-style"],
  notion: ["notion-style"],
  stripe: ["stripe-style"],
  ghibli: ["ghibli-style"],
};

/** Modifier keywords that adjust token properties */
const MODIFIER_KEYWORDS: Record<string, { dimension: string; direction: "more" | "less" }> = {
  warmer: { dimension: "warmth", direction: "more" },
  cooler: { dimension: "warmth", direction: "less" },
  bolder: { dimension: "boldness", direction: "more" },
  lighter: { dimension: "boldness", direction: "less" },
  rounder: { dimension: "roundness", direction: "more" },
  sharper: { dimension: "roundness", direction: "less" },
  softer: { dimension: "softness", direction: "more" },
  harder: { dimension: "softness", direction: "less" },
  brighter: { dimension: "brightness", direction: "more" },
  darker: { dimension: "brightness", direction: "less" },
  louder: { dimension: "boldness", direction: "more" },
  quieter: { dimension: "boldness", direction: "less" },
  simpler: { dimension: "complexity", direction: "less" },
  complex: { dimension: "complexity", direction: "more" },
};

const NEGATION_WORDS = new Set([
  "not",
  "no",
  "without",
  "avoid",
  "avoiding",
  "exclude",
  "excluding",
  "except",
  "minus",
  "less",
]);

const NEGATION_SKIP_WORDS = new Set([
  "any",
  "a",
  "an",
  "the",
  "too",
  "very",
  "really",
  "much",
  "of",
  "kind",
  "kinda",
  "sort",
  "just",
]);

const SEARCH_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "app",
  "but",
  "by",
  "design",
  "feel",
  "for",
  "from",
  "in",
  "interface",
  "into",
  "look",
  "make",
  "more",
  "not",
  "of",
  "or",
  "style",
  "that",
  "the",
  "to",
  "ui",
  "ux",
  "web",
  "website",
  "with",
  "without",
]);

const MANUAL_STYLE_ALIASES: Record<string, string[]> = {
  "neo-brutalist": ["neo brutal", "neo brutalism", "brutalism", "brutalist", "brutalist ui"],
  glassmorphism: ["glass morphism", "glassmorphic", "frosted glass"],
  "minimalist-flat": ["minimal flat", "flat minimal"],
  "soft-ui": ["softui", "soft user interface"],
  "dark-mode": ["dark mode", "dark ui"],
  "art-deco": ["art deco"],
  "art-nouveau": ["art nouveau"],
  "dark-academia": ["dark academia"],
  "neo-brutalist-soft": ["soft brutalist", "soft neo brutalist"],
  "neo-brutalist-playful": ["playful brutalist", "playful neo brutalist"],
  "cyberpunk-neon": ["cyberpunk", "cyber punk"],
  "retro-vintage": ["retro vintage"],
  "material-design": ["material ui", "material"],
  "notion-style": ["notion"],
  "apple-style": ["apple ui", "apple"],
  "stripe-style": ["stripe ui", "stripe"],
};

const DEFAULT_FALLBACK_STYLES = [
  "apple-style",
  "minimalist-flat",
  "corporate-clean",
] as const;

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/[^a-z0-9\s-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAsciiTerms(value: string): string[] {
  const matches = normalizeText(value).match(/[a-z0-9]+/g) ?? [];
  return matches.filter((term) => term.length >= 3 && !SEARCH_STOP_WORDS.has(term));
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const AVAILABLE_VISUAL_STYLES = styles.filter(
  (style) => style.styleType === "visual" && getStyleTokens(style.slug) !== undefined
);
const AVAILABLE_STYLE_SLUGS = new Set(AVAILABLE_VISUAL_STYLES.map((style) => style.slug));

function buildStyleAliasEntries(): { alias: string; slug: string; pattern: RegExp }[] {
  const aliasToSlug = new Map<string, string>();

  const register = (slug: string, alias: string) => {
    if (!AVAILABLE_STYLE_SLUGS.has(slug)) return;
    const normalized = normalizeText(alias);
    if (!normalized) return;
    if (!aliasToSlug.has(normalized)) {
      aliasToSlug.set(normalized, slug);
    }
  };

  for (const style of AVAILABLE_VISUAL_STYLES) {
    register(style.slug, style.slug);
    register(style.slug, style.slug.replace(/-/g, " "));
    register(style.slug, style.nameEn);
    register(style.slug, style.nameEn.replace(/-/g, " "));
    register(style.slug, style.nameEn.replace(/\bstyle\b/gi, ""));
  }

  for (const [slug, aliases] of Object.entries(MANUAL_STYLE_ALIASES)) {
    for (const alias of aliases) {
      register(slug, alias);
    }
  }

  return [...aliasToSlug.entries()]
    .map(([alias, slug]) => ({
      alias,
      slug,
      pattern: new RegExp(`\\b${escapeRegex(alias).replace(/\\ /g, "\\s+")}\\b`, "g"),
    }))
    .sort((a, b) => b.alias.length - a.alias.length);
}

const STYLE_ALIAS_ENTRIES = buildStyleAliasEntries();
const STYLE_ALIAS_LOOKUP = new Map(STYLE_ALIAS_ENTRIES.map((entry) => [entry.alias, entry.slug]));

const STYLE_TERM_INDEX = new Map<string, Set<string>>(
  AVAILABLE_VISUAL_STYLES.map((style) => {
    const terms = new Set<string>();
    const sourceParts: string[] = [
      style.slug,
      style.slug.replace(/-/g, " "),
      style.nameEn,
      style.category,
      style.description,
      ...style.tags,
      ...style.keywords,
    ];

    for (const part of sourceParts) {
      for (const term of extractAsciiTerms(part)) {
        terms.add(term);
      }
    }

    return [style.slug, terms];
  })
);

function resolveStyleSlug(value?: string | null): string | null {
  if (!value) return null;
  const normalized = normalizeText(value);
  if (!normalized) return null;
  if (AVAILABLE_STYLE_SLUGS.has(normalized)) return normalized;
  const direct = STYLE_ALIAS_LOOKUP.get(normalized);
  if (direct) return direct;

  for (const entry of STYLE_ALIAS_ENTRIES) {
    if (normalized.includes(entry.alias)) {
      return entry.slug;
    }
  }

  return null;
}

// ============ COLOR INTERPOLATION ============

function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6 && cleaned.length !== 3) return null;

  const fullHex =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;

  const r = parseInt(fullHex.slice(0, 2), 16) / 255;
  const g = parseInt(fullHex.slice(2, 4), 16) / 255;
  const b = parseInt(fullHex.slice(4, 6), 16) / 255;

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return { h: h * 360, s, l };
}

function hslToHex(h: number, s: number, l: number): string {
  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const hNorm = ((h % 360) + 360) % 360 / 360;

  if (s === 0) {
    const v = Math.round(l * 255);
    return `#${v.toString(16).padStart(2, "0")}${v.toString(16).padStart(2, "0")}${v.toString(16).padStart(2, "0")}`;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/** Extract hex color from a Tailwind class like "bg-[#ff006e]" or "text-[#333]" */
function extractHexFromClass(cls: string): string | null {
  const match = cls.match(/#[0-9a-fA-F]{3,6}/);
  return match ? match[0] : null;
}

function interpolateColors(
  colors: { hex: string; weight: number }[]
): string {
  if (colors.length === 0) return "#888888";
  if (colors.length === 1) return colors[0].hex;

  const totalWeight = colors.reduce((sum, c) => sum + c.weight, 0);
  if (totalWeight === 0) return colors[0].hex;

  let hSum = 0;
  let sSum = 0;
  let lSum = 0;

  for (const { hex, weight } of colors) {
    const hsl = hexToHsl(hex);
    if (!hsl) continue;
    const w = weight / totalWeight;
    hSum += hsl.h * w;
    sSum += hsl.s * w;
    lSum += hsl.l * w;
  }

  return hslToHex(hSum, sSum, lSum);
}

// ============ TOKEN INTERPOLATION ============

/** Pick a string value from the highest-weighted source */
function pickString(
  sources: { tokens: StyleTokens; weight: number }[],
  accessor: (t: StyleTokens) => string
): string {
  if (sources.length === 0) return "";
  const sorted = [...sources].sort((a, b) => b.weight - a.weight);
  return accessor(sorted[0].tokens);
}

/** Pick a string array from the highest-weighted source */
function pickStringArray(
  sources: { tokens: StyleTokens; weight: number }[],
  accessor: (t: StyleTokens) => string[]
): string[] {
  if (sources.length === 0) return [];
  const sorted = [...sources].sort((a, b) => b.weight - a.weight);
  return accessor(sorted[0].tokens);
}

/** Interpolate color classes by extracting hex, blending, and rebuilding */
function interpolateColorClass(
  sources: { tokens: StyleTokens; weight: number }[],
  accessor: (t: StyleTokens) => string,
  prefix: string
): string {
  const hexColors: { hex: string; weight: number }[] = [];
  let fallback = "";

  for (const source of sources) {
    const cls = accessor(source.tokens);
    const hex = extractHexFromClass(cls);
    if (hex) {
      hexColors.push({ hex, weight: source.weight });
    }
    if (!fallback) fallback = cls;
  }

  if (hexColors.length >= 2) {
    const blended = interpolateColors(hexColors);
    return `${prefix}-[${blended}]`;
  }

  return fallback;
}

function interpolateTokens(
  sources: { tokens: StyleTokens; weight: number }[]
): StyleTokens {
  if (sources.length === 0) {
    throw new Error("No source tokens provided");
  }
  if (sources.length === 1) {
    return { ...sources[0].tokens };
  }

  // For complex nested objects, pick from highest-weighted source
  // For colors with hex values, attempt interpolation
  const primary = [...sources].sort((a, b) => b.weight - a.weight)[0];

  return {
    colors: {
      background: {
        primary: interpolateColorClass(sources, (t) => t.colors.background.primary, "bg"),
        secondary: interpolateColorClass(sources, (t) => t.colors.background.secondary, "bg"),
        accent: pickStringArray(sources, (t) => t.colors.background.accent),
      },
      text: {
        primary: interpolateColorClass(sources, (t) => t.colors.text.primary, "text"),
        secondary: interpolateColorClass(sources, (t) => t.colors.text.secondary, "text"),
        muted: interpolateColorClass(sources, (t) => t.colors.text.muted, "text"),
      },
      button: {
        primary: pickString(sources, (t) => t.colors.button.primary),
        secondary: pickString(sources, (t) => t.colors.button.secondary),
      },
    },
    typography: {
      heading: pickString(sources, (t) => t.typography.heading),
      body: pickString(sources, (t) => t.typography.body),
      mono: pickString(sources, (t) => t.typography.mono ?? "font-mono"),
      sizes: {
        hero: pickString(sources, (t) => t.typography.sizes.hero),
        h1: pickString(sources, (t) => t.typography.sizes.h1),
        h2: pickString(sources, (t) => t.typography.sizes.h2),
        h3: pickString(sources, (t) => t.typography.sizes.h3),
        body: pickString(sources, (t) => t.typography.sizes.body),
        small: pickString(sources, (t) => t.typography.sizes.small),
      },
    },
    spacing: {
      section: pickString(sources, (t) => t.spacing.section),
      container: pickString(sources, (t) => t.spacing.container),
      card: pickString(sources, (t) => t.spacing.card),
      gap: {
        sm: pickString(sources, (t) => t.spacing.gap.sm),
        md: pickString(sources, (t) => t.spacing.gap.md),
        lg: pickString(sources, (t) => t.spacing.gap.lg),
      },
    },
    border: {
      width: pickString(sources, (t) => t.border.width),
      color: pickString(sources, (t) => t.border.color),
      radius: pickString(sources, (t) => t.border.radius),
      style: pickString(sources, (t) => t.border.style ?? "border-solid"),
    },
    shadow: {
      sm: pickString(sources, (t) => t.shadow.sm),
      md: pickString(sources, (t) => t.shadow.md),
      lg: pickString(sources, (t) => t.shadow.lg),
      none: pickString(sources, (t) => t.shadow.none),
      hover: pickString(sources, (t) => t.shadow.hover),
      focus: pickString(sources, (t) => t.shadow.focus),
      colored: primary.tokens.shadow.colored,
    },
    interaction: {
      transition: pickString(sources, (t) => t.interaction.transition),
      hoverScale: pickString(sources, (t) => t.interaction.hoverScale ?? ""),
      hoverTranslate: pickString(sources, (t) => t.interaction.hoverTranslate ?? ""),
      active: pickString(sources, (t) => t.interaction.active ?? ""),
    },
    forbidden: primary.tokens.forbidden,
    required: primary.tokens.required,
  };
}

// ============ NLP PARSING ============

interface ParsedDescription {
  keywords: string[];
  negativeKeywords: string[];
  explicitMentions: string[];
  explicitAvoids: string[];
  queryTerms: string[];
  baseStyleSlug: string | null;
  modifiers: { dimension: string; direction: "more" | "less" }[];
}

function parseDescription(description: string): ParsedDescription {
  const normalized = normalizeText(description);
  const words = normalized.split(/\s+/).filter(Boolean);

  const matchedKeywords = new Set<string>();
  const negativeKeywords = new Set<string>();
  const explicitMentions = new Set<string>();
  const explicitAvoids = new Set<string>();

  // Detect "like X" / "inspired by X" patterns
  let baseStyleSlug: string | null = null;
  const basePatterns = [
    /(?:^|\b)(?:like|similar to|inspired by)\s+([a-z0-9][a-z0-9\s-]{1,60}?)(?:\s+but|\s+with|\s+and|\s+without|\s*$)/,
    /(?:^|\b)in\s+the\s+([a-z0-9][a-z0-9\s-]{1,60}?)\s+style(?:\s+but|\s+with|\s+and|\s+without|\s*$)/,
  ];

  for (const pattern of basePatterns) {
    const match = normalized.match(pattern);
    if (!match) continue;
    const resolved = resolveStyleSlug(match[1]?.trim());
    if (resolved) {
      baseStyleSlug = resolved;
      break;
    }
  }

  // Detect direct style mentions and explicit avoidance signals
  for (const entry of STYLE_ALIAS_ENTRIES) {
    entry.pattern.lastIndex = 0;
    let match: RegExpExecArray | null = entry.pattern.exec(normalized);
    while (match) {
      const start = match.index;
      const prefix = normalized.slice(Math.max(0, start - 36), start).trim();
      if (/\b(?:not|no|without|avoid|avoiding|exclude|excluding|except|minus|less)\s*$/.test(prefix)) {
        explicitAvoids.add(entry.slug);
      } else {
        explicitMentions.add(entry.slug);
      }
      match = entry.pattern.exec(normalized);
    }
  }

  // Extract mood keywords and modifiers
  for (const word of words) {
    if (word in MOOD_KEYWORDS) {
      matchedKeywords.add(word);
    }
    if (word in MODIFIER_KEYWORDS) {
      // handled below to preserve ordering
    }
  }

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];

    if (NEGATION_WORDS.has(word)) {
      let cursor = i + 1;
      while (cursor < words.length && NEGATION_SKIP_WORDS.has(words[cursor])) {
        cursor += 1;
      }
      const candidate = words[cursor];
      if (candidate && candidate in MOOD_KEYWORDS) {
        negativeKeywords.add(candidate);
      }
    }

    if (word in MODIFIER_KEYWORDS) {
      // Keep raw order; duplicate modifiers are useful when users emphasize
    }
  }

  for (const match of normalized.matchAll(/\b(more|less)\s+([a-z][a-z-]*)\b/g)) {
    const direction = match[1];
    const trait = match[2];
    if (!(trait in MOOD_KEYWORDS)) continue;
    if (direction === "more") {
      matchedKeywords.add(trait);
    } else {
      negativeKeywords.add(trait);
    }
  }

  const modifiers = words
    .filter((word) => word in MODIFIER_KEYWORDS)
    .map((word) => MODIFIER_KEYWORDS[word]);

  for (const keyword of negativeKeywords) {
    matchedKeywords.delete(keyword);
  }

  for (const slug of explicitAvoids) {
    explicitMentions.delete(slug);
  }

  return {
    keywords: [...matchedKeywords],
    negativeKeywords: [...negativeKeywords],
    explicitMentions: [...explicitMentions],
    explicitAvoids: [...explicitAvoids],
    queryTerms: extractAsciiTerms(description),
    baseStyleSlug,
    modifiers,
  };
}

// ============ STYLE SCORING ============

interface ScoringResult {
  sourceStyles: { slug: string; weight: number }[];
  rankedScores: { slug: string; score: number }[];
  resolvedBaseStyle: string | null;
  excludedStyles: string[];
  baseSuppressed: boolean;
}

function collectExcludedStyles(parsed: ParsedDescription): Set<string> {
  const excluded = new Set<string>(parsed.explicitAvoids);

  for (const keyword of parsed.negativeKeywords) {
    const matchedSlugs = MOOD_KEYWORDS[keyword] || [];
    for (const slug of matchedSlugs) {
      if (AVAILABLE_STYLE_SLUGS.has(slug)) {
        excluded.add(slug);
      }
    }
  }

  return excluded;
}

function buildFallbackSourceStyles(excludedStyles: Set<string>): {
  sourceStyles: { slug: string; weight: number }[];
  rankedScores: { slug: string; score: number }[];
} {
  const candidates = DEFAULT_FALLBACK_STYLES.filter(
    (slug) => AVAILABLE_STYLE_SLUGS.has(slug) && !excludedStyles.has(slug)
  );

  if (candidates.length === 0) {
    const single =
      AVAILABLE_VISUAL_STYLES.find((style) => !excludedStyles.has(style.slug))?.slug ||
      AVAILABLE_VISUAL_STYLES[0]?.slug;

    if (!single) {
      return { sourceStyles: [], rankedScores: [] };
    }

    return {
      sourceStyles: [{ slug: single, weight: 1 }],
      rankedScores: [{ slug: single, score: 1 }],
    };
  }

  const selected = candidates.slice(0, 3);
  const baseWeights = [0.4, 0.3, 0.3];
  const total = selected.reduce((sum, _, index) => sum + baseWeights[index], 0);

  const sourceStyles = selected.map((slug, index) => ({
    slug,
    weight: total > 0 ? baseWeights[index] / total : 1 / selected.length,
  }));

  return {
    sourceStyles,
    rankedScores: sourceStyles.map((item) => ({
      slug: item.slug,
      score: item.weight,
    })),
  };
}

function scoreStyles(
  parsed: ParsedDescription,
  explicitBase?: string
): ScoringResult {
  const scores = new Map<string, number>();
  const queryTerms = new Set(parsed.queryTerms);
  const excludedStyles = collectExcludedStyles(parsed);

  const addScore = (slug: string, delta: number) => {
    if (!AVAILABLE_STYLE_SLUGS.has(slug)) return;
    scores.set(slug, (scores.get(slug) ?? 0) + delta);
  };

  // Explicit base style should dominate blending
  let resolvedBaseStyle = resolveStyleSlug(explicitBase) ?? parsed.baseStyleSlug;
  const baseSuppressed = !!(resolvedBaseStyle && excludedStyles.has(resolvedBaseStyle));
  if (baseSuppressed) {
    resolvedBaseStyle = null;
  }

  if (resolvedBaseStyle) {
    addScore(resolvedBaseStyle, 50);
  }

  for (const slug of parsed.explicitMentions) {
    addScore(slug, 24);
  }

  // Score based on mood keyword matches
  for (const keyword of parsed.keywords) {
    const matchedSlugs = MOOD_KEYWORDS[keyword] || [];
    for (const slug of matchedSlugs) {
      addScore(slug, 10);
    }
  }

  // Metadata overlap fallback (slug/name/tags/keywords)
  if (queryTerms.size > 0) {
    for (const slug of AVAILABLE_STYLE_SLUGS) {
      const terms = STYLE_TERM_INDEX.get(slug);
      if (!terms || terms.size === 0) continue;
      let overlap = 0;
      for (const term of queryTerms) {
        if (terms.has(term)) overlap += 1;
      }
      if (overlap > 0) {
        addScore(slug, Math.min(14, overlap * 2.5));
      }
    }
  }

  // Negative constraints reduce score
  for (const keyword of parsed.negativeKeywords) {
    const matchedSlugs = MOOD_KEYWORDS[keyword] || [];
    for (const slug of matchedSlugs) {
      addScore(slug, -20);
    }
  }

  for (const slug of parsed.explicitAvoids) {
    addScore(slug, -32);
  }

  const rankedScores = [...scores.entries()]
    .filter(([slug, score]) => AVAILABLE_STYLE_SLUGS.has(slug) && Number.isFinite(score))
    .map(([slug, score]) => ({ slug, score }))
    .sort((a, b) => b.score - a.score);

  const positiveRanked = rankedScores.filter(
    (item) => item.score > 0 && !excludedStyles.has(item.slug)
  );
  if (positiveRanked.length === 0) {
    const fallback = buildFallbackSourceStyles(excludedStyles);
    return {
      sourceStyles: fallback.sourceStyles,
      rankedScores: fallback.rankedScores,
      resolvedBaseStyle,
      excludedStyles: [...excludedStyles],
      baseSuppressed,
    };
  }

  // Normalize weights, keep strongest influences only
  const top = positiveRanked.slice(0, 5);
  const totalScore = top.reduce((sum, item) => sum + item.score, 0);

  return {
    sourceStyles: top.map(({ slug, score }) => ({
      slug,
      weight: totalScore > 0 ? score / totalScore : 1 / top.length,
    })),
    rankedScores,
    resolvedBaseStyle,
    excludedStyles: [...excludedStyles],
    baseSuppressed,
  };
}

function getStyleDisplayName(slug: string): string {
  return styles.find((style) => style.slug === slug)?.nameEn ?? slug;
}

function calculateConfidence(
  parsed: ParsedDescription,
  scoring: ScoringResult
): number {
  const topWeight = scoring.sourceStyles[0]?.weight ?? 0;
  const topScore = scoring.rankedScores[0]?.score ?? 0;
  const secondScore = scoring.rankedScores[1]?.score ?? 0;
  const separation = Math.max(0, topScore - secondScore);

  const baseSignal = scoring.resolvedBaseStyle ? 24 : 0;
  const keywordSignal = Math.min(parsed.keywords.length, 4) * 8;
  const mentionSignal = Math.min(parsed.explicitMentions.length, 3) * 9;
  const intentSignal = Math.min(parsed.queryTerms.length, 8) * 1.5;
  const weightSignal = Math.round(topWeight * 18);
  const separationSignal = Math.min(10, separation * 0.7);
  const penalty = Math.min(
    parsed.negativeKeywords.length * 3 + parsed.explicitAvoids.length * 4,
    14
  );
  const contradictionPenalty = scoring.baseSuppressed ? 10 : 0;

  const raw =
    18 +
    baseSignal +
    keywordSignal +
    mentionSignal +
    intentSignal +
    weightSignal +
    separationSignal -
    penalty -
    contradictionPenalty;

  return Math.max(12, Math.min(98, Math.round(raw)));
}

function buildReasoning(parsed: ParsedDescription, scoring: ScoringResult): string[] {
  const hints: string[] = [];

  if (scoring.resolvedBaseStyle) {
    hints.push(`Anchored to ${getStyleDisplayName(scoring.resolvedBaseStyle)}.`);
  } else if (scoring.baseSuppressed) {
    hints.push("Ignored requested base style because it was explicitly excluded.");
  }

  if (parsed.explicitMentions.length > 0) {
    const topMentions = parsed.explicitMentions.slice(0, 2).map(getStyleDisplayName);
    hints.push(`Detected direct style references: ${topMentions.join(", ")}.`);
  }

  if (parsed.keywords.length > 0) {
    hints.push(`Matched mood keywords: ${parsed.keywords.slice(0, 4).join(", ")}.`);
  }

  if (parsed.negativeKeywords.length > 0 || parsed.explicitAvoids.length > 0) {
    const avoided = [
      ...parsed.negativeKeywords,
      ...parsed.explicitAvoids.slice(0, 3).map(getStyleDisplayName),
    ];
    hints.push(`Applied negative constraints: ${avoided.slice(0, 4).join(", ")}.`);
  }

  if (scoring.sourceStyles[0]) {
    hints.push(
      `Primary influence: ${getStyleDisplayName(scoring.sourceStyles[0].slug)} (${Math.round(
        scoring.sourceStyles[0].weight * 100
      )}%).`
    );
  }

  return hints.slice(0, 4);
}

function buildDescription(parsed: ParsedDescription, scoring: ScoringResult): string {
  const sourceNames = scoring.sourceStyles
    .slice(0, 3)
    .map((source) => getStyleDisplayName(source.slug))
    .join(", ");

  const keywordPart = parsed.keywords.length > 0 ? parsed.keywords.join(", ") : "general";
  const avoidList = [
    ...parsed.negativeKeywords,
    ...scoring.excludedStyles.map(getStyleDisplayName),
  ];
  const uniqueAvoidList = [...new Set(avoidList)];

  if (uniqueAvoidList.length > 0) {
    return `Generated from: ${sourceNames}. Keywords: ${keywordPart}. Avoided: ${uniqueAvoidList.slice(0, 4).join(", ")}.`;
  }

  return `Generated from: ${sourceNames}. Keywords: ${keywordPart}.`;
}

function buildInsights(parsed: ParsedDescription, scoring: ScoringResult): GenerationInsights {
  return {
    baseStyle: scoring.resolvedBaseStyle,
    detectedStyles: parsed.explicitMentions,
    avoidedStyles: scoring.excludedStyles,
    matchedKeywords: parsed.keywords,
    negativeKeywords: parsed.negativeKeywords,
  };
}

// ============ NAME GENERATION ============

function generateName(parsed: ParsedDescription, sourceStyles: { slug: string; weight: number }[]): string {
  const parts: string[] = [];

  // Use top keywords for the name
  const topKeywords = parsed.keywords.slice(0, 2);
  if (topKeywords.length > 0) {
    parts.push(...topKeywords.map((k) => k.charAt(0).toUpperCase() + k.slice(1)));
  }

  // Add modifier flavor
  for (const mod of parsed.modifiers.slice(0, 1)) {
    parts.push(mod.direction === "more" ? "Enhanced" : "Subtle");
  }

  if (parts.length === 0) {
    // Use source style names
    const topStyle = styles.find((s) => s.slug === sourceStyles[0]?.slug);
    if (topStyle) {
      parts.push(topStyle.nameEn);
      parts.push("Blend");
    } else {
      parts.push("Custom Style");
    }
  } else {
    parts.push("Fusion");
  }

  return parts.join(" ");
}

// ============ MAIN GENERATOR ============

export function generateStyleFromDescription(
  request: GenerationRequest
): GeneratedStyle {
  const parsed = parseDescription(request.description);
  const scoring = scoreStyles(parsed, request.baseStyle);
  const sourceStyles = scoring.sourceStyles;

  // Fetch tokens for each source style
  const sources: { tokens: StyleTokens; weight: number }[] = [];
  for (const { slug, weight } of sourceStyles) {
    const tokens = getStyleTokens(slug);
    if (tokens) {
      sources.push({ tokens, weight });
    }
  }

  if (sources.length === 0) {
    // Ultimate fallback: use first available visual style tokens.
    const fallbackSlug = sourceStyles[0]?.slug || AVAILABLE_VISUAL_STYLES[0]?.slug;
    const fallback = fallbackSlug ? getStyleTokens(fallbackSlug) : undefined;
    if (fallback) {
      sources.push({ tokens: fallback, weight: 1 });
    } else {
      throw new Error("No style tokens available for generation");
    }
  }

  // Interpolate tokens
  const tokens = interpolateTokens(sources);

  // Confidence is based on multiple NLP and scoring signals.
  const confidence = calculateConfidence(parsed, scoring);

  // Generate name and description
  const name = generateName(parsed, sourceStyles);
  const description = buildDescription(parsed, scoring);
  const reasoning = buildReasoning(parsed, scoring);
  const insights = buildInsights(parsed, scoring);

  return {
    name,
    description,
    tokens,
    sourceStyles,
    confidence,
    reasoning,
    insights,
  };
}

/** Get all available style slugs that have tokens */
export function getAvailableStyleSlugs(): string[] {
  return AVAILABLE_VISUAL_STYLES.map((s) => s.slug);
}

/** Get all mood keywords for autocomplete/suggestions */
export function getMoodKeywords(): string[] {
  return Object.keys(MOOD_KEYWORDS).sort();
}
