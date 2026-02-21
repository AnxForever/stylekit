import type { GeneratedStyle } from "./style-generator";
import type { ValidatedWizardFormData } from "@/lib/submit/validator";
import type { DesignStyle } from "@/lib/styles";
import { styles } from "@/lib/styles";
import { extractHexFromClass, interpolateHexColors } from "@/lib/styles/color-interpolation";

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const TEXT_SIZE_TO_REM: Record<string, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};
const RADIUS_CLASS_TO_VALUE: Array<[string, string]> = [
  ["rounded-none", "0"],
  ["rounded-sm", "0.125rem"],
  ["rounded-md", "0.375rem"],
  ["rounded-lg", "0.5rem"],
  ["rounded-xl", "0.75rem"],
  ["rounded-2xl", "1rem"],
  ["rounded-3xl", "1.5rem"],
  ["rounded-full", "9999px"],
];

const DEFAULT_PRIMARY = "#2563eb";
const DEFAULT_SECONDARY = "#f8fafc";
const DEFAULT_ACCENT = "#14b8a6";
const DEFAULT_FOREGROUND = "#0f172a";
const DEFAULT_MUTED = "#64748b";

interface BuildSubmissionFormOptions {
  existingSlugs?: Iterable<string>;
}

interface SourceStyleEntry {
  slug: string;
  weight: number;
  style: DesignStyle;
}

function slugify(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "community-style";
}

function ensureHexColor(value: string, fallback: string): string {
  const normalized = value.trim();
  if (HEX_RE.test(normalized)) {
    return normalized.toLowerCase();
  }
  return fallback;
}

function extractWeightedSourceStyles(
  result: GeneratedStyle
): SourceStyleEntry[] {
  return result.sourceStyles
    .map((item) => {
      const style = styles.find((candidate) => candidate.slug === item.slug);
      if (!style) {
        return null;
      }
      return {
        slug: item.slug,
        weight: item.weight > 0 ? item.weight : 0.001,
        style,
      };
    })
    .filter((entry): entry is SourceStyleEntry => entry !== null)
    .sort((a, b) => b.weight - a.weight);
}

function blendSourceColor(
  sourceEntries: SourceStyleEntry[],
  pick: (style: DesignStyle) => string,
  fallback: string
): string {
  const weighted = sourceEntries
    .map((entry) => {
      const color = pick(entry.style);
      if (!HEX_RE.test(color)) {
        return null;
      }
      return {
        hex: color,
        weight: entry.weight,
      };
    })
    .filter((entry): entry is { hex: string; weight: number } => entry !== null);

  if (weighted.length === 0) {
    return fallback;
  }

  return interpolateHexColors(weighted);
}

function buildAccentPalette(
  sourceEntries: SourceStyleEntry[],
  fallback: string
): string[] {
  const seen = new Set<string>();
  const accents: string[] = [];

  for (const entry of sourceEntries) {
    for (const color of entry.style.colors.accent) {
      if (!HEX_RE.test(color)) {
        continue;
      }
      const normalized = color.toLowerCase();
      if (seen.has(normalized)) {
        continue;
      }
      seen.add(normalized);
      accents.push(normalized);
      if (accents.length >= 3) {
        return accents;
      }
    }
  }

  if (accents.length === 0) {
    return [fallback];
  }

  return accents;
}

function deriveRadiusValue(className: string, fallback: string): string {
  for (const [token, value] of RADIUS_CLASS_TO_VALUE) {
    if (className.includes(token)) {
      return value;
    }
  }
  return fallback;
}

function deriveTextSizeValue(className: string, fallback: string): string {
  const matched = className.match(/\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/);
  if (!matched) {
    return fallback;
  }
  return TEXT_SIZE_TO_REM[matched[1]] ?? fallback;
}

function deriveWeightValue(className: string, fallback: string): string {
  if (className.includes("font-thin")) return "100";
  if (className.includes("font-extralight")) return "200";
  if (className.includes("font-light")) return "300";
  if (className.includes("font-normal")) return "400";
  if (className.includes("font-medium")) return "500";
  if (className.includes("font-semibold")) return "600";
  if (className.includes("font-bold")) return "700";
  if (className.includes("font-extrabold")) return "800";
  if (className.includes("font-black")) return "900";
  return fallback;
}

function spacingScaleToRem(token: string): string | null {
  const bracket = token.match(/^\[([^\]]+)\]$/);
  if (bracket?.[1]) {
    return bracket[1];
  }

  const numeric = Number.parseFloat(token);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  return `${numeric * 0.25}rem`;
}

function extractSpacingValue(
  className: string,
  pattern: RegExp,
  fallback: string
): string {
  const matched = className.match(pattern);
  if (!matched?.[1]) {
    return fallback;
  }
  return spacingScaleToRem(matched[1]) ?? fallback;
}

function collectKeywords(
  result: GeneratedStyle,
  sourceEntries: SourceStyleEntry[]
): string[] {
  const keywords = new Set<string>();

  for (const keyword of result.insights?.matchedKeywords ?? []) {
    if (keyword.trim()) {
      keywords.add(keyword.trim().toLowerCase());
    }
  }

  for (const entry of sourceEntries) {
    for (const keyword of entry.style.keywords) {
      if (keyword.trim()) {
        keywords.add(keyword.trim().toLowerCase());
      }
      if (keywords.size >= 10) {
        return [...keywords];
      }
    }
  }

  return [...keywords];
}

function buildDoList(result: GeneratedStyle): string[] {
  const fromReasoning = (result.reasoning ?? [])
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .slice(0, 3);

  if (fromReasoning.length > 0) {
    return fromReasoning;
  }

  return ["Keep visual language consistent across button, card, and input components."];
}

function buildDontList(result: GeneratedStyle): string[] {
  const negatives = (result.insights?.negativeKeywords ?? [])
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword.length > 0)
    .slice(0, 3);

  if (negatives.length > 0) {
    return negatives.map((keyword) => `Avoid overusing ${keyword} patterns that conflict with this style direction.`);
  }

  return ["Do not mix unrelated design languages that dilute the generated style."];
}

function buildAiRules(
  result: GeneratedStyle,
  sourceEntries: SourceStyleEntry[]
): string[] {
  const topSource = sourceEntries[0];
  const rules: string[] = [];

  if (topSource) {
    rules.push(`Keep ${topSource.style.nameEn} as the dominant influence unless explicitly overridden.`);
  }
  rules.push("Use the generated token set as the single source of truth for spacing, typography, and colors.");
  rules.push("Ensure button, card, and input components share a coherent visual hierarchy.");
  for (const hint of result.reasoning ?? []) {
    if (hint.trim()) {
      rules.push(hint.trim());
    }
    if (rules.length >= 5) {
      break;
    }
  }

  return rules;
}

export function makeUniqueGeneratedSlug(
  baseName: string,
  existingSlugs: Iterable<string> = []
): string {
  const normalizedSet = new Set(
    [...existingSlugs].map((slug) => slug.trim().toLowerCase()).filter(Boolean)
  );
  const baseSlug = slugify(baseName);
  if (!normalizedSet.has(baseSlug)) {
    return baseSlug;
  }

  const aiBase = `${baseSlug}-ai`;
  if (!normalizedSet.has(aiBase)) {
    return aiBase;
  }

  let index = 2;
  let candidate = `${aiBase}-${index}`;
  while (normalizedSet.has(candidate)) {
    index += 1;
    candidate = `${aiBase}-${index}`;
  }

  return candidate;
}

export function buildSubmissionFormFromGeneratedStyle(
  result: GeneratedStyle,
  options: BuildSubmissionFormOptions = {}
): ValidatedWizardFormData {
  const sourceEntries = extractWeightedSourceStyles(result);
  const dominant = sourceEntries[0]?.style;

  const blendedPrimary = blendSourceColor(
    sourceEntries,
    (style) => style.colors.primary,
    DEFAULT_PRIMARY
  );
  const blendedSecondary = blendSourceColor(
    sourceEntries,
    (style) => style.colors.secondary,
    DEFAULT_SECONDARY
  );
  const accentColors = buildAccentPalette(
    sourceEntries,
    blendedPrimary || DEFAULT_ACCENT
  );

  const tokenBackground = extractHexFromClass(result.tokens.colors.background.primary);
  const tokenForeground = extractHexFromClass(result.tokens.colors.text.primary);
  const tokenMuted = extractHexFromClass(result.tokens.colors.text.muted);

  const primaryColor = ensureHexColor(blendedPrimary, DEFAULT_PRIMARY);
  const secondaryColor = ensureHexColor(blendedSecondary, DEFAULT_SECONDARY);
  const background = ensureHexColor(
    tokenBackground ?? secondaryColor,
    DEFAULT_SECONDARY
  );
  const foreground = ensureHexColor(
    tokenForeground ?? dominant?.colors.primary ?? DEFAULT_FOREGROUND,
    DEFAULT_FOREGROUND
  );
  const muted = ensureHexColor(tokenMuted ?? DEFAULT_MUTED, DEFAULT_MUTED);

  const name = result.name.trim() || "AI Generated Style";
  const description =
    result.description.trim() ||
    `${name} generated from StyleKit AI Generator.`;
  const slug = makeUniqueGeneratedSlug(name, options.existingSlugs);

  const category = dominant?.category ?? "modern";
  const styleType = dominant?.styleType ?? "visual";
  const tags =
    dominant?.tags && dominant.tags.length > 0
      ? dominant.tags.slice(0, 4)
      : [category];

  const borderRadius = deriveRadiusValue(
    result.tokens.border.radius,
    "0.75rem"
  );
  const spacingSm = extractSpacingValue(result.tokens.spacing.gap.sm, /gap-([^\s]+)/, "0.5rem");
  const spacingMd = extractSpacingValue(result.tokens.spacing.gap.md, /gap-([^\s]+)/, "1rem");
  const spacingLg = extractSpacingValue(result.tokens.spacing.gap.lg, /gap-([^\s]+)/, "1.5rem");

  const fontSizeBase = deriveTextSizeValue(result.tokens.typography.sizes.body, "1rem");
  const fontSizeHeading = deriveTextSizeValue(result.tokens.typography.sizes.h1, "2rem");
  const fontSizeSmall = deriveTextSizeValue(result.tokens.typography.sizes.small, "0.875rem");

  const fontWeightNormal = deriveWeightValue(result.tokens.typography.body, "400");
  const fontWeightBold = deriveWeightValue(result.tokens.typography.heading, "700");

  const doList = buildDoList(result);
  const dontList = buildDontList(result);
  const aiRules = buildAiRules(result, sourceEntries);
  const keywords = collectKeywords(result, sourceEntries);

  const buttonCode = `<button className="inline-flex items-center justify-center px-4 py-2 ${result.tokens.colors.button.primary} ${result.tokens.border.width} ${result.tokens.border.color} ${result.tokens.border.radius} ${result.tokens.shadow.sm} ${result.tokens.interaction.transition} ${result.tokens.interaction.hoverScale ?? ""} ${result.tokens.interaction.active ?? ""}">
  Primary Action
</button>`;

  const cardCode = `<div className="${result.tokens.colors.background.secondary} ${result.tokens.border.width} ${result.tokens.border.color} ${result.tokens.border.radius} ${result.tokens.shadow.md} ${result.tokens.spacing.card}">
  <h3 className="${result.tokens.typography.heading} ${result.tokens.typography.sizes.h3} ${result.tokens.colors.text.primary} mb-2">Card Title</h3>
  <p className="${result.tokens.typography.body} ${result.tokens.typography.sizes.body} ${result.tokens.colors.text.secondary}">Card content for preview.</p>
</div>`;

  const inputCode = `<input className="w-full px-3 py-2 ${result.tokens.colors.background.primary} ${result.tokens.colors.text.primary} ${result.tokens.border.width} ${result.tokens.border.color} ${result.tokens.border.radius} ${result.tokens.interaction.transition} ${result.tokens.shadow.focus}" placeholder="Type here..." />`;

  return {
    name,
    nameEn: name,
    slug,
    description,
    category,
    styleType,
    tags,
    primaryColor,
    secondaryColor,
    accentColors: accentColors.map((color) => ensureHexColor(color, DEFAULT_ACCENT)),
    background,
    foreground,
    muted,
    keywords,
    philosophy: description,
    headingFont: result.tokens.typography.heading || "system-ui, -apple-system, sans-serif",
    bodyFont: result.tokens.typography.body || "system-ui, -apple-system, sans-serif",
    fontSizeBase,
    fontSizeHeading,
    fontSizeSmall,
    fontWeightNormal,
    fontWeightBold,
    lineHeightNormal: "1.5",
    lineHeightTight: "1.25",
    borderRadius,
    spacingSm,
    spacingMd,
    spacingLg,
    doList,
    dontList,
    aiRules,
    buttonCode,
    cardCode,
    inputCode,
  };
}
