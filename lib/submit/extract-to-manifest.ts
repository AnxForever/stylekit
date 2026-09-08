import { STYLE_CATEGORIES, STYLE_TYPES } from "@/lib/styles/meta-types";
import type { StyleCategory, StyleType } from "@/lib/styles/meta";
import type { ValidatedWizardFormData } from "./validator";
import { parsePreviewAssets, PREVIEW_COMPONENT_KEYS, type PreviewAssets, type PreviewFontFace } from "@/lib/style-preview/preview-assets";
import {
  componentSampleCode,
  componentSampleRules,
  measuredValue,
  normalizeExtractedColor,
  selectComponentSamples,
  type ComponentSamples,
  type ExtractedComponents,
  type ExtractedComponent,
} from "./extracted-design";

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
  lineHeight?: Record<string, string>;
}

export interface ExtractedStyle {
  id?: string;
  name?: string;
  description?: string;
  source?: { url?: string; extractedAt?: string };
  tokens?: {
    colors?: ExtractedColors;
    typography?: ExtractedTypography;
    spacing?: Record<string, string>;
  };
  components?: ExtractedComponents;
  /** Page ground and inherited type measured before the extractor scrolls. */
  page?: ExtractedComponent;
  fonts?: PreviewFontFace[];
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
    } & Partial<Pick<ValidatedWizardFormData,
      "headingFont" | "bodyFont" | "fontSizeBase" | "fontSizeHeading" | "fontSizeSmall" |
      "fontWeightNormal" | "fontWeightBold" | "lineHeightNormal" | "lineHeightTight" |
      "borderRadius" | "spacingSm" | "spacingMd" | "spacingLg" |
      "buttonCode" | "cardCode" | "inputCode" | "previewAssets"
    >>;
    source: { assistant: "other"; model: string; notes?: string };
  };
  /** Fields the contributor should review before submitting. */
  needsReview: string[];
}

/** Colorfulness 0-1 (max-min RGB over 255); ~0 for grays, high for brand hues. */
function chroma(hex: string): number {
  const n = hex.replace("#", "");
  if (n.length !== 6) return 0;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
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
  const title = (raw ?? "").trim();
  if (title) {
    // Split on title/tagline separators. A plain hyphen counts only when
    // space-padded (" - "), so in-word hyphens like "Neo-Brutalist" survive.
    const parts = title
      .split(/\s+[–—|·]\s+|\s+-\s+|[–—|]|:\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length) {
      // The brand name is usually the shortest segment: "Linear" over its
      // tagline, "Vercel" over "Agentic Infrastructure".
      const shortest = parts.reduce((a, b) => (b.length < a.length ? b : a));
      return shortest.slice(0, 60);
    }
  }
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
    const hex = normalizeExtractedColor(entry.value);
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
 * Prefer rendered page and component styles, then inferred semantic roles and
 * confidence-ranked palette entries, and finally safe neutrals
 * so the result always satisfies the hex-required schema.
 */
function pickColors(
  colors: ExtractedColors | undefined,
  components: ExtractedComponents | undefined,
  page: ExtractedComponent | undefined,
): {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  accents: string[];
  low: boolean;
  samples: ComponentSamples;
} {
  const semantic = colors?.semantic ?? {};
  const ranked = rankedPalette(colors?.palette);
  const usedFor = (role: string) =>
    ranked.find((c) => c.usage.some((u) => u.toLowerCase().includes(role)))?.hex;

  const background =
    normalizeExtractedColor(page?.styles?.backgroundColor) ??
    normalizeExtractedColor(semantic.background) ?? usedFor("background") ?? "#ffffff";
  const foreground =
    normalizeExtractedColor(page?.styles?.color, background) ??
    normalizeExtractedColor(semantic.text) ?? usedFor("text") ?? "#0f172a";

  const samples = selectComponentSamples(components, background);
  const buttonFill = normalizeExtractedColor(samples.button?.styles?.backgroundColor, background);
  const actionColor = buttonFill !== background ? buttonFill : null;
  const cardFill = normalizeExtractedColor(samples.card?.styles?.backgroundColor, background);

  const taken = new Set([background, foreground]);
  const remaining = ranked.map((c) => c.hex).filter((hex) => !taken.has(hex));

  // Brand-color heuristic: the most chromatic hue across everything captured.
  // A grayscale "primary" usually means the real brand color was read as the
  // background (an indigo hero, say), so consider the background too and prefer
  // saturation over mere confidence rank.
  const allHues = [
    ...Object.values(semantic)
      .map((v) => normalizeExtractedColor(v))
      .filter((h): h is string => Boolean(h)),
    ...ranked.map((c) => c.hex),
  ].filter((hex) => hex !== foreground);
  const mostChromatic = [...new Set(allHues)].sort((a, b) => chroma(b) - chroma(a))[0];
  const brandHue = mostChromatic && chroma(mostChromatic) > 0.15 ? mostChromatic : undefined;

  const primary =
    actionColor ??
    normalizeExtractedColor(semantic.primary) ??
    normalizeExtractedColor(semantic.accent) ??
    usedFor("link") ??
    usedFor("button") ??
    brandHue ??
    remaining[0] ??
    foreground;
  taken.add(primary);

  const secondary = cardFill ??
    ranked.find((entry) => entry.usage.includes("background") && !taken.has(entry.hex))?.hex ??
    remaining.find((hex) => !taken.has(hex)) ?? background;
  taken.add(secondary);

  const accents = remaining.filter((hex) => !taken.has(hex)).slice(0, 4);

  // Flag a low-signal extraction: no semantic roles and no confident palette.
  const low =
    !normalizeExtractedColor(page?.styles?.backgroundColor) &&
    !normalizeExtractedColor(semantic.background) &&
    !normalizeExtractedColor(semantic.text) &&
    ranked.every((c) => c.rank <= 1) && !actionColor;

  return { primary, secondary, background, foreground, accents, low, samples };
}

function designDetails(extracted: ExtractedStyle, samples: ComponentSamples) {
  const typography = extracted.tokens?.typography;
  const body = extracted.page?.styles ?? samples.card?.styles ?? samples.input?.styles ?? samples.button?.styles;
  const heading = samples.heading?.styles;
  const sizes = Object.values(typography?.fontSize ?? {}).filter((size) => /^\d+(?:\.\d+)?(?:px|rem|em)$/.test(size));
  const sizeInPixels = (size: string) => parseFloat(size) * (/r?em$/.test(size) ? 16 : 1);
  sizes.sort((a, b) => sizeInPixels(a) - sizeInPixels(b));
  const bodyFont = measuredValue(body?.fontFamily) ?? measuredValue(typography?.fontFamily?.primary);
  const shaped = samples.card ?? samples.button ?? samples.input;
  return {
    bodyFont,
    headingFont: measuredValue(heading?.fontFamily) ?? measuredValue(typography?.fontFamily?.secondary) ?? bodyFont,
    fontSizeBase: measuredValue(body?.fontSize) ?? measuredValue(typography?.fontSize?.base),
    fontSizeHeading: measuredValue(heading?.fontSize) ?? sizes.at(-1),
    fontSizeSmall: sizes[0],
    fontWeightNormal: measuredValue(body?.fontWeight) ?? measuredValue(typography?.fontWeight?.normal),
    fontWeightBold: measuredValue(heading?.fontWeight) ?? measuredValue(typography?.fontWeight?.bold),
    lineHeightNormal: measuredValue(body?.lineHeight),
    lineHeightTight: measuredValue(heading?.lineHeight),
    borderRadius: shaped ? measuredValue(shaped.styles?.borderRadius) ?? "0px" : undefined,
    spacingSm: measuredValue(extracted.tokens?.spacing?.sm),
    spacingMd: measuredValue(extracted.tokens?.spacing?.md),
    spacingLg: measuredValue(extracted.tokens?.spacing?.lg),
  };
}

function synthesizeAiRules(
  colors: ReturnType<typeof pickColors>,
  details: ReturnType<typeof designDetails>,
): string[] {
  const rules: string[] = [
    `Use ${colors.primary} for primary actions and emphasis.`,
    `Body text is ${colors.foreground} on a ${colors.background} background.`,
    `Use ${colors.secondary} for secondary surfaces and cards.`,
  ];
  if (colors.accents.length) {
    rules.push(`Reserve accent colors (${colors.accents.join(", ")}) for highlights, not large areas.`);
  }
  if (details.bodyFont) rules.push(`Body font-family: ${details.bodyFont}.`);
  if (details.headingFont) rules.push(`Heading font-family: ${details.headingFont}.`);
  if (details.fontSizeBase && details.fontSizeHeading) {
    rules.push(`Base font size is ${details.fontSizeBase}; headings scale up to ${details.fontSizeHeading}.`);
  }
  if (details.lineHeightNormal) rules.push(`Body line-height: ${details.lineHeightNormal}.`);
  if (details.lineHeightTight) rules.push(`Heading line-height: ${details.lineHeightTight}.`);
  rules.push(...componentSampleRules(colors.samples));
  const spacing = [details.spacingSm, details.spacingMd, details.spacingLg].filter(Boolean);
  if (spacing.length) rules.push(`Observed spacing steps: ${[...new Set(spacing)].join(", ")}.`);
  return rules;
}

function assetRules(assets: PreviewAssets | undefined): string[] {
  if (!assets) return [];
  const rules: string[] = [];
  for (const font of assets.fonts ?? []) {
    const source = font.sourceUrl ? ` from ${font.sourceUrl}` : "";
    if (font.dataUrl || font.sourceUrl) rules.push(`Load font-family "${font.family}"${font.weight ? ` at weight ${font.weight}` : ""}${source}; retain the fallback stack if unavailable.`);
  }
  for (const key of PREVIEW_COMPONENT_KEYS) {
    const motion = assets.motion?.[key];
    if (!motion) continue;
    const t = motion.transition;
    if (t) rules.push(`${key} transitions: ${t.property}; duration: ${t.duration}; easing: ${t.timingFunction}; delay: ${t.delay}.`);
    for (const [state, styles] of Object.entries(motion.states ?? {})) {
      const values = Object.entries(styles).map(([property, value]) => `${property}: ${value}`).join("; ");
      if (values) rules.push(`${key} ${state} state: ${values}.`);
    }
    for (const animation of motion.animations ?? []) {
      rules.push(`${key} animation${animation.name ? ` "${animation.name}"` : ""}: ${animation.duration}ms ${animation.easing}, ${animation.iterations} iterations, ${animation.direction}; use the captured keyframes from the component sample.`);
    }
  }
  if (assets.motion && Object.keys(assets.motion).length) rules.push("Respect prefers-reduced-motion: disable these animations and transitions when reduced motion is requested.");
  return [...new Set(rules)];
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

  const colors = pickColors(extracted.tokens?.colors, extracted.components, extracted.page);
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

  const details = designDetails(extracted, colors.samples);
  const previewAssets = parsePreviewAssets({
    ...(extracted.fonts?.length ? { fonts: extracted.fonts } : {}),
    motion: Object.fromEntries(PREVIEW_COMPONENT_KEYS.flatMap((key) =>
      colors.samples[key]?.motion ? [[key, colors.samples[key]!.motion]] : [],
    )),
  });
  const hasAssets = Boolean(previewAssets?.fonts?.length || Object.keys(previewAssets?.motion ?? {}).length);
  const aiRules = [...synthesizeAiRules(colors, details), ...assetRules(previewAssets)];
  if (!details.bodyFont || !details.fontSizeBase) needsReview.push("typography");
  if (!colors.samples.button && !colors.samples.card && !colors.samples.input) needsReview.push("components");

  const result: ExtractToManifestResult = {
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
        ...details,
        ...(hasAssets ? { previewAssets } : {}),
        buttonCode: componentSampleCode("button", colors.samples.button),
        cardCode: componentSampleCode("card", colors.samples.card),
        inputCode: componentSampleCode("input", colors.samples.input),
      },
      source: {
        assistant: "other",
        model: "style-extractor",
        notes: url ? `Extracted from ${url}` : undefined,
      },
    },
    needsReview,
  };
  // Leave at least 32 KiB for form edits and the API envelope. Fonts are the
  // optional bulk: retain their source references if the full sample is large.
  const manifestBudget = 480 * 1024;
  for (const font of [...(previewAssets?.fonts ?? [])].reverse()) {
    if (new TextEncoder().encode(JSON.stringify(result.manifest)).length <= manifestBudget) break;
    delete font.dataUrl;
  }
  if (previewAssets?.fonts?.some((font) => !font.dataUrl)) needsReview.push("fonts");
  return result;
}
