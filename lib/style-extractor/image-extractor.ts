/**
 * Client-side image color extraction for the screenshot-to-style feature.
 * Uses the Canvas API to sample pixel colors and extract a dominant palette.
 * This module runs in the browser only.
 */

import type { CustomStyleDefinition } from "@/lib/style-creator/types";

export interface ImageExtractionResult {
  /** Hex colors sorted by frequency (most frequent first) */
  dominantColors: string[];
  /** Suggested partial style tokens based on extracted colors */
  suggestedTokens: Partial<CustomStyleDefinition>;
  /** Palette entries with role assignment, color, and frequency */
  palette: { role: string; color: string; frequency: number }[];
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

interface QuantizedColor {
  hex: string;
  rgb: RgbColor;
  count: number;
  hue: number;
  saturation: number;
  lightness: number;
}

/**
 * Extract dominant colors from ImageData (canvas pixel data).
 * Samples every Nth pixel for performance, quantizes colors to reduce the
 * color space, then ranks by frequency and assigns design token roles.
 *
 * @param imageData - The ImageData from a canvas context (getImageData)
 * @param maxColors - Maximum number of dominant colors to return (default 8)
 */
export function extractColorsFromImage(
  imageData: ImageData,
  maxColors: number = 8
): ImageExtractionResult {
  const colors = quantizePixels(imageData);
  const topColors = colors.slice(0, maxColors);

  if (topColors.length === 0) {
    return {
      dominantColors: [],
      suggestedTokens: {},
      palette: [],
    };
  }

  const palette = assignRoles(topColors);
  const suggestedTokens = buildSuggestedTokens(palette);

  return {
    dominantColors: topColors.map((c) => c.hex),
    suggestedTokens,
    palette: palette.map((entry) => ({
      role: entry.role,
      color: entry.color.hex,
      frequency: entry.color.count,
    })),
  };
}

/**
 * Load an image from a base64 data URL or object URL, draw it on a temporary
 * canvas, and extract colors. This is a convenience wrapper for use in components.
 *
 * @param src - Image source (base64 data URL or blob URL)
 * @param maxDimension - Maximum canvas dimension (default 200 for performance)
 */
export async function extractColorsFromImageSrc(
  src: string,
  maxDimension: number = 200
): Promise<ImageExtractionResult> {
  const img = await loadImage(src);
  const { width, height } = scaleToFit(img.width, img.height, maxDimension);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return { dominantColors: [], suggestedTokens: {}, palette: [] };
  }

  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);

  return extractColorsFromImage(imageData);
}

// -- Internal helpers --

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function scaleToFit(
  width: number,
  height: number,
  maxDim: number
): { width: number; height: number } {
  if (width <= maxDim && height <= maxDim) return { width, height };
  const ratio = Math.min(maxDim / width, maxDim / height);
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  };
}

/**
 * Sample pixels from ImageData, quantize RGB values to reduce the color space,
 * count frequencies, and return sorted color entries.
 */
function quantizePixels(imageData: ImageData): QuantizedColor[] {
  const { data, width, height } = imageData;
  const totalPixels = width * height;

  // Sample every Nth pixel. For a 200x200 image (40k pixels), step=1 is fine.
  // For larger images, increase step to keep it under ~50k samples.
  const step = Math.max(1, Math.floor(totalPixels / 50000));
  const counts = new Map<string, { rgb: RgbColor; count: number }>();

  // Quantization granularity: round to nearest 16 (0-255 maps to 16 buckets)
  const QUANT = 16;

  for (let i = 0; i < totalPixels; i += step) {
    const offset = i * 4;
    const a = data[offset + 3];
    // Skip fully transparent pixels
    if (a !== undefined && a < 128) continue;

    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    if (r === undefined || g === undefined || b === undefined) continue;

    const qr = Math.round(r / QUANT) * QUANT;
    const qg = Math.round(g / QUANT) * QUANT;
    const qb = Math.round(b / QUANT) * QUANT;

    const key = `${qr},${qg},${qb}`;
    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { rgb: { r: qr, g: qg, b: qb }, count: 1 });
    }
  }

  const entries: QuantizedColor[] = [];
  for (const [, entry] of counts) {
    const { h, s, l } = rgbToHsl(entry.rgb.r, entry.rgb.g, entry.rgb.b);
    entries.push({
      hex: rgbToHex(entry.rgb),
      rgb: entry.rgb,
      count: entry.count,
      hue: h,
      saturation: s,
      lightness: l,
    });
  }

  entries.sort((a, b) => b.count - a.count);
  return entries;
}

interface RoleAssignment {
  role: string;
  color: QuantizedColor;
}

/**
 * Assign design token roles to colors based on their properties:
 * - Lightest (highest lightness) -> background
 * - Darkest (lowest lightness)  -> foreground
 * - Most saturated              -> primary
 * - Second most saturated       -> accent
 * - Remaining                   -> secondary, extras
 */
function assignRoles(colors: QuantizedColor[]): RoleAssignment[] {
  if (colors.length === 0) return [];
  if (colors.length === 1) {
    return [{ role: "primary", color: colors[0] }];
  }

  const byLightness = [...colors].sort((a, b) => b.lightness - a.lightness);
  const bySaturation = [...colors].sort((a, b) => b.saturation - a.saturation);

  const background = byLightness[0];
  const foreground = byLightness[byLightness.length - 1];

  // Find the most saturated color that is not background or foreground
  const assigned = new Set([background.hex, foreground.hex]);
  const primary = bySaturation.find((c) => !assigned.has(c.hex)) ?? bySaturation[0];
  assigned.add(primary.hex);

  const secondary = bySaturation.find((c) => !assigned.has(c.hex));
  if (secondary) assigned.add(secondary.hex);

  const accent = bySaturation.find((c) => !assigned.has(c.hex));

  const roles: RoleAssignment[] = [
    { role: "background", color: background },
    { role: "foreground", color: foreground },
    { role: "primary", color: primary },
  ];

  if (secondary) roles.push({ role: "secondary", color: secondary });
  if (accent) roles.push({ role: "accent", color: accent });

  // Add remaining colors as numbered extras
  let extraIndex = 0;
  for (const color of colors) {
    if (!assigned.has(color.hex)) {
      roles.push({ role: `extra-${extraIndex}`, color });
      extraIndex += 1;
      if (extraIndex >= 3) break;
    }
  }

  return roles;
}

function buildSuggestedTokens(roles: RoleAssignment[]): Partial<CustomStyleDefinition> {
  const roleMap = new Map(roles.map((r) => [r.role, r.color.hex]));

  const primary = roleMap.get("primary") ?? "#3b82f6";
  const secondary = roleMap.get("secondary") ?? roleMap.get("background") ?? "#f1f5f9";
  const background = roleMap.get("background") ?? "#ffffff";
  const foreground = roleMap.get("foreground") ?? "#0f172a";
  const accent = roleMap.get("accent") ?? primary;

  return {
    colors: {
      primary,
      secondary,
      accent: [accent, primary, secondary].filter(
        (c, i, arr) => arr.indexOf(c) === i
      ),
      background,
      foreground,
      muted: mixColors(background, foreground, 0.7),
    },
  };
}

// -- Color conversion utilities --

function rgbToHex(color: RgbColor): string {
  const clampByte = (v: number) => Math.max(0, Math.min(255, v));
  const r = clampByte(color.r).toString(16).padStart(2, "0");
  const g = clampByte(color.g).toString(16).padStart(2, "0");
  const b = clampByte(color.b).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  if (max === rn) {
    h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  } else if (max === gn) {
    h = ((bn - rn) / d + 2) / 6;
  } else {
    h = ((rn - gn) / d + 4) / 6;
  }

  return { h: h * 360, s, l };
}

function mixColors(hex1: string, hex2: string, weight: number): string {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return hex1;

  const w = Math.max(0, Math.min(1, weight));
  return rgbToHex({
    r: Math.round(c1.r * w + c2.r * (1 - w)),
    g: Math.round(c1.g * w + c2.g * (1 - w)),
    b: Math.round(c1.b * w + c2.b * (1 - w)),
  });
}

function hexToRgb(hex: string): RgbColor | null {
  const normalized = hex.trim().toLowerCase();
  const match = normalized.match(/^#([0-9a-f]{6})$/);
  if (!match?.[1]) {
    // Handle shorthand #rgb
    const short = normalized.match(/^#([0-9a-f]{3})$/);
    if (!short?.[1]) return null;
    const r = parseInt(short[1][0] + short[1][0], 16);
    const g = parseInt(short[1][1] + short[1][1], 16);
    const b = parseInt(short[1][2] + short[1][2], 16);
    return { r, g, b };
  }
  return {
    r: parseInt(match[1].slice(0, 2), 16),
    g: parseInt(match[1].slice(2, 4), 16),
    b: parseInt(match[1].slice(4, 6), 16),
  };
}
