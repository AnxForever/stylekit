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

export interface GeneratedStyle {
  name: string;
  description: string;
  tokens: StyleTokens;
  sourceStyles: { slug: string; weight: number }[];
  confidence: number;
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

function interpolateNumbers(
  values: { value: number; weight: number }[]
): number {
  if (values.length === 0) return 0;
  const totalWeight = values.reduce((sum, v) => sum + v.weight, 0);
  if (totalWeight === 0) return values[0].value;
  return values.reduce((sum, v) => sum + (v.value * v.weight) / totalWeight, 0);
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
  baseStyleSlug: string | null;
  modifiers: { dimension: string; direction: "more" | "less" }[];
}

function parseDescription(description: string): ParsedDescription {
  const lower = description.toLowerCase();
  const words = lower.split(/[\s,;.!?]+/).filter(Boolean);

  // Detect "like X" patterns
  let baseStyleSlug: string | null = null;
  const likeMatch = lower.match(/like\s+(\w[\w\s-]*?)(?:\s+but|\s+with|\s+and|\s*$)/);
  if (likeMatch) {
    const target = likeMatch[1].trim();
    // Try to find a matching style
    const matchedStyle = styles.find(
      (s) =>
        s.slug === target ||
        s.nameEn.toLowerCase() === target ||
        s.name === target ||
        s.slug.replace(/-/g, " ") === target
    );
    if (matchedStyle) {
      baseStyleSlug = matchedStyle.slug;
    }
  }

  // Extract keywords that match our mood map
  const matchedKeywords: string[] = [];
  for (const word of words) {
    if (word in MOOD_KEYWORDS) {
      matchedKeywords.push(word);
    }
  }

  // Check multi-word keywords
  for (const key of Object.keys(MOOD_KEYWORDS)) {
    if (key.includes("-") || key.includes(" ")) {
      if (lower.includes(key)) {
        matchedKeywords.push(key);
      }
    }
  }

  // Extract modifiers (warmer, bolder, etc.)
  const modifiers: { dimension: string; direction: "more" | "less" }[] = [];
  for (const word of words) {
    if (word in MODIFIER_KEYWORDS) {
      modifiers.push(MODIFIER_KEYWORDS[word]);
    }
  }

  // Handle "more X" / "less X" patterns
  const moreMatch = lower.matchAll(/more\s+(\w+)/g);
  for (const m of moreMatch) {
    const trait = m[1];
    if (trait in MOOD_KEYWORDS) {
      matchedKeywords.push(trait);
    }
  }

  const lessMatch = lower.matchAll(/less\s+(\w+)/g);
  for (const m of lessMatch) {
    // "less minimal" means less of the minimal styles
    const trait = m[1];
    if (trait in MOOD_KEYWORDS) {
      // We don't add it as a keyword, but as a negative signal
      // For now, we skip these styles in scoring
    }
    void trait;
  }

  return {
    keywords: [...new Set(matchedKeywords)],
    baseStyleSlug,
    modifiers,
  };
}

// ============ STYLE SCORING ============

function scoreStyles(
  parsed: ParsedDescription,
  explicitBase?: string
): { slug: string; weight: number }[] {
  const scores: Record<string, number> = {};

  // If explicit base style provided, give it heavy weight
  const base = explicitBase || parsed.baseStyleSlug;
  if (base) {
    scores[base] = 50;
  }

  // Score based on keyword matches
  for (const keyword of parsed.keywords) {
    const matchedSlugs = MOOD_KEYWORDS[keyword] || [];
    for (const slug of matchedSlugs) {
      scores[slug] = (scores[slug] || 0) + 10;
    }
  }

  // Filter to styles that actually have tokens
  const scoredStyles = Object.entries(scores)
    .filter(([slug]) => getStyleTokens(slug) !== undefined)
    .sort(([, a], [, b]) => b - a);

  if (scoredStyles.length === 0) {
    // Fallback: return top 3 popular styles with tokens
    return [
      { slug: "apple-style", weight: 0.4 },
      { slug: "minimalist-flat", weight: 0.3 },
      { slug: "corporate-clean", weight: 0.3 },
    ];
  }

  // Normalize weights, take top 5
  const top = scoredStyles.slice(0, 5);
  const totalScore = top.reduce((sum, [, s]) => sum + s, 0);

  return top.map(([slug, score]) => ({
    slug,
    weight: totalScore > 0 ? score / totalScore : 1 / top.length,
  }));
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
  const sourceStyles = scoreStyles(parsed, request.baseStyle);

  // Fetch tokens for each source style
  const sources: { tokens: StyleTokens; weight: number }[] = [];
  for (const { slug, weight } of sourceStyles) {
    const tokens = getStyleTokens(slug);
    if (tokens) {
      sources.push({ tokens, weight });
    }
  }

  if (sources.length === 0) {
    // Ultimate fallback: use apple-style tokens
    const fallback = getStyleTokens("apple-style");
    if (fallback) {
      sources.push({ tokens: fallback, weight: 1 });
    } else {
      throw new Error("No style tokens available for generation");
    }
  }

  // Interpolate tokens
  const tokens = interpolateTokens(sources);

  // Calculate confidence based on keyword match density
  const totalKeywords = request.description
    .toLowerCase()
    .split(/[\s,;.!?]+/)
    .filter(Boolean).length;
  const matchedKeywords = parsed.keywords.length;
  const keywordRatio = totalKeywords > 0 ? matchedKeywords / totalKeywords : 0;
  const hasBase = !!(request.baseStyle || parsed.baseStyleSlug);
  const confidence = Math.min(
    Math.round((keywordRatio * 60 + (hasBase ? 30 : 0) + (sources.length > 1 ? 10 : 0)) * 100) / 100,
    100
  );

  // Generate name and description
  const name = generateName(parsed, sourceStyles);
  const sourceNames = sourceStyles
    .slice(0, 3)
    .map((s) => {
      const style = styles.find((st) => st.slug === s.slug);
      return style?.nameEn || s.slug;
    })
    .join(", ");

  const description = `Generated from: ${sourceNames}. Keywords: ${parsed.keywords.join(", ") || "general"}.`;

  return {
    name,
    description,
    tokens,
    sourceStyles,
    confidence,
  };
}

/** Get all available style slugs that have tokens */
export function getAvailableStyleSlugs(): string[] {
  return styles
    .filter((s) => s.styleType === "visual" && getStyleTokens(s.slug) !== undefined)
    .map((s) => s.slug);
}

/** Get all mood keywords for autocomplete/suggestions */
export function getMoodKeywords(): string[] {
  return Object.keys(MOOD_KEYWORDS).sort();
}
