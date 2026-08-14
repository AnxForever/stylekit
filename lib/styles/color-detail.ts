// Color detail computations for the /colors/[hex] programmatic pages.
// All math is self-contained sRGB / OKLab conversions; style reverse-lookup
// reuses the aggregated palette data from ./colors.

import { hexToHsl, hslToHex } from "./color-interpolation";
import { getAllStyleColors, type StyleColorEntry } from "./colors";
import { TAILWIND_PALETTE } from "./tailwind-palette";

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface OklchColor {
  l: number;
  c: number;
  h: number;
}

export interface ContrastReading {
  /** Background the color was tested against. */
  background: string;
  ratio: number;
  passesAaNormal: boolean;
  passesAaLarge: boolean;
  passesAaaNormal: boolean;
}

export interface TailwindMatch {
  /** e.g. "blue-500" */
  token: string;
  hex: string;
  /** Perceptual OKLab distance; 0 means exact. */
  distance: number;
}

export interface StyleColorUsage {
  slug: string;
  name: string;
  nameEn: string;
  category: StyleColorEntry["category"];
  /** Role of this hex inside the style palette. */
  role: "primary" | "secondary" | "accent";
}

export interface ColorDetail {
  hex: string;
  rgb: RgbColor;
  rgbCss: string;
  hslCss: string;
  oklch: OklchColor;
  oklchCss: string;
  luminance: number;
  contrast: ContrastReading[];
  tailwind: TailwindMatch;
  tints: string[];
  shades: string[];
  usedBy: StyleColorUsage[];
  /** Nearest other swatches from the curated library, closest first. */
  neighbors: { hex: string; distance: number }[];
}

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Normalize any 3/6-digit hex (with or without #) to "#rrggbb" lowercase. */
export function normalizeHexInput(value: string): string | null {
  const match = HEX_RE.exec(value.trim());
  if (!match) return null;
  const raw = match[1].toLowerCase();
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  return `#${full}`;
}

/** Hex slug used in /colors/[hex] URLs: 6 lowercase digits, no "#". */
export function hexToSlug(hex: string): string {
  const normalized = normalizeHexInput(hex);
  return normalized ? normalized.slice(1) : "";
}

export function hexToRgb(hex: string): RgbColor | null {
  const normalized = normalizeHexInput(hex);
  if (!normalized) return null;
  return {
    r: parseInt(normalized.slice(1, 3), 16),
    g: parseInt(normalized.slice(3, 5), 16),
    b: parseInt(normalized.slice(5, 7), 16),
  };
}

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(channel: number): number {
  const c =
    channel <= 0.0031308
      ? channel * 12.92
      : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, Math.round(c * 255)));
}

/** WCAG relative luminance (0 black — 1 white). */
export function relativeLuminance(rgb: RgbColor): number {
  return (
    0.2126 * srgbToLinear(rgb.r) +
    0.7152 * srgbToLinear(rgb.g) +
    0.0722 * srgbToLinear(rgb.b)
  );
}

/** WCAG 2.x contrast ratio between two colors, 1 to 21. */
export function contrastRatio(a: RgbColor, b: RgbColor): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [lighter, darker] = la >= lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

interface OklabColor {
  l: number;
  a: number;
  b: number;
}

export function rgbToOklab(rgb: RgbColor): OklabColor {
  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function rgbToOklch(rgb: RgbColor): OklchColor {
  const { l, a, b } = rgbToOklab(rgb);
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  // Hue is meaningless for achromatic colors; report 0 like most tools.
  return { l, c, h: c < 1e-4 ? 0 : h };
}

export function oklchToHex(l: number, c: number, hDeg: number): string {
  const hRad = (hDeg * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const bb = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * bb;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * bb;
  const s_ = l - 0.0894841775 * a - 1.291485548 * bb;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const toHexPair = (v: number) => linearToSrgb(v).toString(16).padStart(2, "0");
  return `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}`;
}

/** Perceptual distance between two hex colors in OKLab space. */
export function oklabDistance(hexA: string, hexB: string): number {
  const ra = hexToRgb(hexA);
  const rb = hexToRgb(hexB);
  if (!ra || !rb) return Number.POSITIVE_INFINITY;
  const a = rgbToOklab(ra);
  const b = rgbToOklab(rb);
  return Math.sqrt(
    (a.l - b.l) ** 2 + (a.a - b.a) ** 2 + (a.b - b.b) ** 2
  );
}

export function nearestTailwindToken(hex: string): TailwindMatch {
  let best: TailwindMatch = { token: "black", hex: "#000000", distance: Infinity };
  for (const [token, paletteHex] of Object.entries(TAILWIND_PALETTE)) {
    const distance = oklabDistance(hex, paletteHex);
    if (distance < best.distance) {
      best = { token, hex: paletteHex, distance };
    }
  }
  return { ...best, distance: Number(best.distance.toFixed(4)) };
}

const CONTRAST_BACKGROUNDS = [
  { label: "white", hex: "#ffffff" },
  { label: "black", hex: "#000000" },
  { label: "slate-900", hex: "#0f172a" },
  { label: "gray-100", hex: "#f3f4f6" },
] as const;

function buildContrastReadings(rgb: RgbColor): ContrastReading[] {
  return CONTRAST_BACKGROUNDS.map(({ label, hex }) => {
    const bg = hexToRgb(hex);
    const ratio = bg ? contrastRatio(rgb, bg) : 1;
    const rounded = Math.round(ratio * 100) / 100;
    return {
      background: label,
      ratio: rounded,
      passesAaNormal: ratio >= 4.5,
      passesAaLarge: ratio >= 3,
      passesAaaNormal: ratio >= 7,
    };
  });
}

/** Lightness ladder toward white (tints) or black (shades), excluding endpoints. */
function buildLadder(hex: string, direction: "tint" | "shade"): string[] {
  const hsl = hexToHsl(hex);
  if (!hsl) return [];
  const steps = [0.2, 0.4, 0.6, 0.8];
  const target = direction === "tint" ? 1 : 0;
  return steps.map((t) =>
    hslToHex(hsl.h, hsl.s, hsl.l + (target - hsl.l) * t)
  );
}

let usageIndex: Map<string, StyleColorUsage[]> | null = null;

function getUsageIndex(): Map<string, StyleColorUsage[]> {
  if (usageIndex) return usageIndex;
  const index = new Map<string, StyleColorUsage[]>();
  const push = (hex: string, usage: StyleColorUsage) => {
    const normalized = normalizeHexInput(hex);
    if (!normalized) return;
    const list = index.get(normalized) ?? [];
    if (!list.some((u) => u.slug === usage.slug)) list.push(usage);
    index.set(normalized, list);
  };

  for (const entry of getAllStyleColors()) {
    const base = {
      slug: entry.slug,
      name: entry.name,
      nameEn: entry.nameEn,
      category: entry.category,
    };
    push(entry.colors.primary, { ...base, role: "primary" });
    push(entry.colors.secondary, { ...base, role: "secondary" });
    for (const accent of entry.colors.accent) {
      push(accent, { ...base, role: "accent" });
    }
  }
  usageIndex = index;
  return index;
}

let swatchList: string[] | null = null;

/** Every unique swatch across the style library, normalized "#rrggbb". */
export function getAllDetailSwatches(): string[] {
  if (swatchList) return swatchList;
  swatchList = Array.from(getUsageIndex().keys()).sort();
  return swatchList;
}

const NEIGHBOR_COUNT = 8;

export function getColorDetail(input: string): ColorDetail | null {
  const hex = normalizeHexInput(input);
  if (!hex) return null;
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const hsl = hexToHsl(hex);
  const oklch = rgbToOklch(rgb);

  const neighbors = getAllDetailSwatches()
    .filter((swatch) => swatch !== hex)
    .map((swatch) => ({ hex: swatch, distance: oklabDistance(hex, swatch) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, NEIGHBOR_COUNT)
    .map((n) => ({ ...n, distance: Number(n.distance.toFixed(4)) }));

  return {
    hex,
    rgb,
    rgbCss: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hslCss: hsl
      ? `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`
      : "",
    oklch,
    oklchCss: `oklch(${(oklch.l * 100).toFixed(1)}% ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`,
    luminance: Number(relativeLuminance(rgb).toFixed(4)),
    contrast: buildContrastReadings(rgb),
    tailwind: nearestTailwindToken(hex),
    tints: buildLadder(hex, "tint"),
    shades: buildLadder(hex, "shade"),
    usedBy: getUsageIndex().get(hex) ?? [],
    neighbors,
  };
}

/**
 * Return detail data only for colors that are part of the published library.
 *
 * The generic getColorDetail helper intentionally supports arbitrary hex
 * values for internal color calculations. Public programmatic pages must use
 * this bounded variant so a crawler cannot create an unbounded stream of
 * dynamically rendered color pages.
 */
export function getCuratedColorDetail(input: string): ColorDetail | null {
  const normalized = normalizeHexInput(input);
  if (!normalized || !getAllDetailSwatches().includes(normalized)) return null;
  return getColorDetail(normalized);
}
