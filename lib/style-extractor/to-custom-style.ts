import type { CustomStyleDefinition } from "@/lib/style-creator/types";
import type { ExtractedStyleDraft } from "@/lib/style-extractor/adapter";

const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const DEFAULT_ACCENTS = ["#3b82f6", "#8b5cf6", "#ec4899"] as const;

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface ExtractedEvidenceSnapshot {
  hasAnimation?: boolean;
  hasGlassEffect?: boolean;
  hasNeonEffect?: boolean;
}

export function applyExtractedDraftToCustomStyle(
  draft: ExtractedStyleDraft,
  base: CustomStyleDefinition,
  evidence?: ExtractedEvidenceSnapshot
): CustomStyleDefinition {
  const primary = normalizeHexColor(draft.primaryColor) ?? base.colors.primary;
  const secondary = normalizeHexColor(draft.secondaryColor) ?? base.colors.secondary;

  const accentPalette = buildAccentPalette(draft.accentColors, [
    primary,
    secondary,
    ...base.colors.accent,
  ]);

  const background = pickBackgroundColor(secondary, primary, base.colors.background);
  const foreground = pickForegroundColor(background, base.colors.foreground);
  const muted =
    mixHex(background, foreground, 0.72) ?? pickForegroundColor(background, base.colors.muted);

  const inferredShadows = inferShadows(primary, draft, evidence, base.shadows);
  const shadows = applyShadowsFromDraft(draft, inferredShadows);

  return {
    ...base,
    colors: {
      ...base.colors,
      primary,
      secondary,
      accent: accentPalette,
      background,
      foreground,
      muted,
    },
    typography: {
      ...base.typography,
      headingFont: draft.headingFont?.trim() || base.typography.headingFont,
      bodyFont: draft.bodyFont?.trim() || base.typography.bodyFont,
    },
    borders: {
      ...base.borders,
      radius: draft.borderRadius?.trim() || inferRadius(draft, evidence, base.borders.radius),
      width: draft.borderWidth?.trim() || base.borders.width,
    },
    shadows,
  };
}

function applyShadowsFromDraft(
  draft: ExtractedStyleDraft,
  inferred: CustomStyleDefinition["shadows"]
): CustomStyleDefinition["shadows"] {
  const sm = draft.shadowSm?.trim();
  const md = draft.shadowMd?.trim();
  const lg = draft.shadowLg?.trim();

  if (!sm && !md && !lg) return inferred;

  return {
    sm: sm || inferred.sm,
    md: md || inferred.md,
    lg: lg || inferred.lg,
  };
}

function buildAccentPalette(accentColors: unknown, fallback: string[]): string[] {
  const normalizedAccents = Array.isArray(accentColors)
    ? accentColors
        .map((color) => (typeof color === "string" ? normalizeHexColor(color) : undefined))
        .filter((color): color is string => Boolean(color))
    : [];

  const candidatePool = dedupe(
    [...normalizedAccents, ...fallback.map((color) => normalizeHexColor(color)).filter(Boolean)]
      .filter((color): color is string => Boolean(color))
      .map((color) => color.toLowerCase())
  );

  const pool = candidatePool.length > 0 ? candidatePool : [...DEFAULT_ACCENTS];

  return [pool[0], pool[1] ?? pool[0], pool[2] ?? pool[0]];
}

function pickBackgroundColor(secondary: string, primary: string, fallback: string): string {
  const normalizedFallback = normalizeHexColor(fallback) ?? "#ffffff";
  const normalizedSecondary = normalizeHexColor(secondary);
  if (normalizedSecondary) return normalizedSecondary;

  const normalizedPrimary = normalizeHexColor(primary) ?? normalizedFallback;
  return isDarkColor(normalizedPrimary) ? "#0f172a" : "#ffffff";
}

function pickForegroundColor(background: string, fallback: string): string {
  const normalizedBackground = normalizeHexColor(background);
  if (!normalizedBackground) return normalizeHexColor(fallback) ?? "#0f172a";

  return isDarkColor(normalizedBackground) ? "#f8fafc" : "#0f172a";
}

function inferRadius(
  draft: ExtractedStyleDraft,
  evidence: ExtractedEvidenceSnapshot | undefined,
  fallback: string
): string {
  if (evidence?.hasGlassEffect) return "1rem";
  if (draft.styleType === "animation" || evidence?.hasAnimation) return "0.75rem";
  if (draft.category === "minimal") return "0.375rem";
  if (draft.category === "retro") return "0.25rem";
  return fallback;
}

function inferShadows(
  primary: string,
  draft: ExtractedStyleDraft,
  evidence: ExtractedEvidenceSnapshot | undefined,
  fallback: CustomStyleDefinition["shadows"]
): CustomStyleDefinition["shadows"] {
  const accentGlow = toRgba(primary, 0.34);

  if (evidence?.hasNeonEffect || draft.category === "expressive") {
    return {
      sm: `0 2px 8px ${toRgba(primary, 0.2)}`,
      md: `0 10px 24px ${toRgba(primary, 0.26)}`,
      lg: `0 20px 48px ${accentGlow}`,
    };
  }

  if (evidence?.hasGlassEffect) {
    return {
      sm: "0 2px 8px rgb(15 23 42 / 0.08)",
      md: "0 12px 32px rgb(15 23 42 / 0.12)",
      lg: "0 20px 48px rgb(15 23 42 / 0.18)",
    };
  }

  if (draft.category === "minimal") {
    return {
      sm: "0 1px 2px rgb(2 6 23 / 0.06)",
      md: "0 6px 18px rgb(2 6 23 / 0.08)",
      lg: "0 14px 30px rgb(2 6 23 / 0.1)",
    };
  }

  return fallback;
}

function normalizeHexColor(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!HEX_COLOR_PATTERN.test(normalized)) return undefined;
  if (normalized.length === 4) {
    return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
  }
  return normalized;
}

function toRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex) ?? { r: 59, g: 130, b: 246 };
  const clampedAlpha = clamp(alpha, 0, 1);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampedAlpha.toFixed(2)})`;
}

function mixHex(baseHex: string, overlayHex: string, baseWeight: number): string | undefined {
  const base = hexToRgb(baseHex);
  const overlay = hexToRgb(overlayHex);
  if (!base || !overlay) return undefined;

  const weight = clamp(baseWeight, 0, 1);
  const r = Math.round(base.r * weight + overlay.r * (1 - weight));
  const g = Math.round(base.g * weight + overlay.g * (1 - weight));
  const b = Math.round(base.b * weight + overlay.b * (1 - weight));

  return rgbToHex({ r, g, b });
}

function isDarkColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;

  const luminance =
    (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;

  return luminance < 0.5;
}

function hexToRgb(hex: string): RgbColor | null {
  const normalized = normalizeHexColor(hex);
  if (!normalized) return null;

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

function rgbToHex(color: RgbColor): string {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function dedupe<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}
