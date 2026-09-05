import { STYLE_CATEGORIES, STYLE_TYPES } from "@/lib/styles/meta-types";
import type { StyleCategory, StyleType } from "@/lib/styles/meta";

/**
 * Turn a style-extractor `normalized` payload into a submission manifest.
 *
 * The extractor reads a live site's computed styles and emits a rich StyleKit
 * object (tokens, components, a design-system prompt). A submission only needs
 * a small, honest core: identity, a four-colour palette, and the rules an
 * assistant follows. This maps the machine-derivable half — colours,
 * typography, and rules synthesised from real tokens — and leaves the fields a
 * machine cannot know (name, description, category) as sensible drafts the
 * contributor confirms. It is deliberately dependency-free and browser-free so
 * a CLI, a service, or a test can all call it.
 */

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export interface ExtractedColorEntry {
  value?: string;
  usage?: string[];
  confidence?: "high" | "medium" | "low" | string;
}

export interface ExtractedColors {
  semantic?: Record<string, string>;
  palette?: Record<string, ExtractedColorEntry>;
}

export interface ExtractedTypography {
  fontFamily?: { primary?: string; secondary?: string; mono?: string };
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, string>;
}

export interface ExtractedStyle {
  id?: string;
  name?: string;
  description?: string;
  source?: { url?: string; extractedAt?: string };
  tokens?: {
    colors?: ExtractedColors;
    typography?: ExtractedTypography;
  };
}

export interface ExtractToManifestOptions {
  /** Source URL, used for the slug/name draft and the manifest source notes. */
  url?: string;
  /** Explicit overrides for the fields a machine cannot infer well. */
  name?: string;
  nameEn?: string;
  slug?: string;
  description?: string;
  category?: StyleCategory;
  styleType?: StyleType;
}

export interface ExtractToManifestResult {
  manifest: {
    schemaVersion: "1.0.0";
    formData: {
      name: string;
      nameEn: string;
      slug: string;
      description: string;
      category: StyleCategory;
      styleType: StyleType;
      primaryColor: string;
      secondaryColor: string;
      background: string;
      foreground: string;
      accentColors: string[];
      keywords: string[];
      aiRules: string[];
    };
    source: { assistant: "other"; model: string; notes?: string };
  };
  /** Fields the contributor should review before submitting. */
  needsReview: string[];
}

function normalizeHex(value: string | undefined | null): string | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim().toLowerCase();
  if (!HEX_RE.test(trimmed)) return null;
  // Expand #abc to #aabbcc so downstream hex comparisons are uniform.
  if (trimmed.length === 4) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }
  return trimmed;
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Site titles are usually "Name – tagline"; keep the name, drop the tagline. */
function cleanName(raw: string | undefined, host: string): string {
  const base = (raw ?? "").split(/[–—|:·]/)[0].trim();
  if (base) return base.slice(0, 60);
  return host.replace(/^www\./, "").split(".")[0] || "Extracted style";
}

function hostFromUrl(url: string | undefined): string {
  if (!url) return "";
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

const CONFIDENCE_RANK: Record<string, number> = { high: 3, medium: 2, low: 1 };

function rankedPalette(
  palette: Record<string, ExtractedColorEntry> | undefined,
): { hex: string; usage: string[]; rank: number }[] {
  if (!palette) return [];
  const seen = new Set<string>();
  const out: { hex: string; usage: string[]; rank: number }[] = [];
  for (const entry of Object.values(palette)) {
    const hex = normalizeHex(entry.value);
    if (!hex || seen.has(hex)) continue;
    seen.add(hex);
    out.push({
      hex,
      usage: Array.isArray(entry.usage) ? entry.usage : [],
      rank: CONFIDENCE_RANK[String(entry.confidence)] ?? 0,
    });
  }
  return out.sort((a, b) => b.rank - a.rank);
}

/**
 * Pick the four core colours. Semantic roles win when present; otherwise fall
 * back to the highest-confidence palette entries, and finally to safe neutrals
 * so the result always satisfies the hex-required schema.
 */
function pickColors(colors: ExtractedColors | undefined): {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accents: string[];
  low: boolean;
} {
  const semantic = colors?.semantic ?? {};
  const ranked = rankedPalette(colors?.palette);
  const usedFor = (role: string) =>
    ranked.find((c) => c.usage.some((u) => u.toLowerCase().includes(role)))?.hex;

  const background =
    normalizeHex(semantic.background) ?? usedFor("background") ?? "#ffffff";
  const foreground =
    normalizeHex(semantic.text) ?? usedFor("text") ?? "#0f172a";

  const taken = new Set([background, foreground]);
  const remaining = ranked.map((c) => c.hex).filter((hex) => !taken.has(hex));

  const primary =
    normalizeHex(semantic.primary) ??
    normalizeHex(semantic.accent) ??
    remaining[0] ??
    background;
  taken.add(primary);

  const secondary =
    remaining.find((hex) => !taken.has(hex)) ??
    (foreground === "#0f172a" ? "#ffffff" : "#ffffff");
  taken.add(secondary);

  const accents = remaining.filter((hex) => !taken.has(hex)).slice(0, 4);

  // Flag a low-signal extraction: no semantic roles and no confident palette.
  const low =
    !normalizeHex(semantic.background) &&
    !normalizeHex(semantic.text) &&
    ranked.every((c) => c.rank <= 1);

  return { primary, secondary, background, foreground, accents, low };
}

function synthesizeAiRules(
  colors: { primary: string; secondary: string; background: string; foreground: string; accents: string[] },
  typography: ExtractedTypography | undefined,
): string[] {
  const rules: string[] = [
    `Use ${colors.primary} for primary actions and emphasis.`,
    `Body text is ${colors.foreground} on a ${colors.background} background.`,
    `Use ${colors.secondary} for secondary surfaces and cards.`,
  ];
  if (colors.accents.length) {
    rules.push(`Reserve accent colors (${colors.accents.join(", ")}) for highlights, not large areas.`);
  }
  const primaryFont = typography?.fontFamily?.primary;
  if (primaryFont) {
    rules.push(`Primary typeface is ${primaryFont.replace(/["']/g, "").split(",")[0].trim()}.`);
  }
  const base = typography?.fontSize?.base;
  const largest =
    typography?.fontSize?.["4xl"] ??
    typography?.fontSize?.["3xl"] ??
    typography?.fontSize?.["2xl"] ??
    typography?.fontSize?.xl;
  if (base && largest) {
    rules.push(`Base font size is ${base}; headings scale up to ${largest}.`);
  }
  return rules;
}

export function extractedStyleToManifest(
  extracted: ExtractedStyle,
  options: ExtractToManifestOptions = {},
): ExtractToManifestResult {
  const url = options.url ?? extracted.source?.url ?? "";
  const host = hostFromUrl(url);
  const needsReview: string[] = [];

  const name = options.name ?? cleanName(extracted.name, host);
  const nameEn = options.nameEn ?? name;
  const slug = slugify(options.slug ?? (name || host || "extracted-style"));

  const colors = pickColors(extracted.tokens?.colors);
  if (colors.low) needsReview.push("colors");

  const description =
    options.description ??
    `A ${name} design style extracted from ${host || "a live site"}, ready to refine.`;

  // Category and style type cannot be inferred from computed styles; default
  // and flag for review rather than guess.
  const category: StyleCategory =
    options.category && STYLE_CATEGORIES.includes(options.category)
      ? options.category
      : "modern";
  const styleType: StyleType =
    options.styleType && STYLE_TYPES.includes(options.styleType)
      ? options.styleType
      : "visual";
  if (!options.category) needsReview.push("category");
  if (!options.name) needsReview.push("name");
  if (!options.description) needsReview.push("description");

  const aiRules = synthesizeAiRules(colors, extracted.tokens?.typography);

  return {
    manifest: {
      schemaVersion: "1.0.0",
      formData: {
        name,
        nameEn,
        slug,
        description,
        category,
        styleType,
        primaryColor: colors.primary,
        secondaryColor: colors.secondary,
        background: colors.background,
        foreground: colors.foreground,
        accentColors: colors.accents,
        keywords: [],
        aiRules,
      },
      source: {
        assistant: "other",
        model: "style-extractor",
        notes: url ? `Extracted from ${url}` : undefined,
      },
    },
    needsReview,
  };
}
