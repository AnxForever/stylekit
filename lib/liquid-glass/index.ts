// Liquid Glass — Apple-style refraction material built on SVG displacement filters.
//
// The pipeline encodes a lens-shaped vector field into an RGBA displacement map
// (R = horizontal offset, G = vertical offset, 128 = rest). feDisplacementMap
// bends the backdrop through that map once per RGB channel at slightly
// different scales, producing chromatic dispersion at the rim. An feTurbulence
// pass adds a liquid wobble and feGaussianBlur frosts the result.
//
// Everything in this module is pure math so it can run in unit tests without a
// DOM; the canvas/PNG encoding lives in components/liquid-glass.

export interface LiquidGlassSettings {
  /** Specular highlight intensity along the glass rim (0-100). */
  light: number;
  /** Overall displacement strength — how hard the backdrop bends (0-100). */
  refraction: number;
  /** Virtual lens thickness: reach and magnification of the bend (0-100). */
  depth: number;
  /** Chromatic dispersion — RGB separation at the rim (0-100). */
  dispersion: number;
  /** Frost blur over the refracted backdrop (0-100). */
  frost: number;
  /** Width of the rim falloff band; distortion fades toward the center (0-100). */
  spread: number;
}

export const DEFAULT_LIQUID_GLASS_SETTINGS: LiquidGlassSettings = {
  light: 55,
  refraction: 60,
  depth: 55,
  dispersion: 45,
  frost: 10,
  spread: 50,
};

export function resolveLiquidGlassSettings(
  partial?: Partial<LiquidGlassSettings>
): LiquidGlassSettings {
  return { ...DEFAULT_LIQUID_GLASS_SETTINGS, ...(partial ?? {}) };
}

/** Largest dimension of the generated displacement map, in map pixels. */
export const MAP_MAX_DIMENSION = 400;

export interface DisplacementMapGeometry {
  width: number;
  height: number;
  radius: number;
  /** Map pixels per element pixel (1 when the element is small enough). */
  scale: number;
}

/**
 * Downscales the element box to the map resolution. feImage stretches the map
 * back over the element, so displacement stays visually identical while the
 * per-pixel generation cost stays bounded.
 */
export function resolveMapGeometry(
  elementWidth: number,
  elementHeight: number,
  cornerRadius: number
): DisplacementMapGeometry {
  const safeWidth = Math.max(2, Math.round(elementWidth));
  const safeHeight = Math.max(2, Math.round(elementHeight));
  const scale = Math.min(1, MAP_MAX_DIMENSION / Math.max(safeWidth, safeHeight));
  const width = Math.max(2, Math.round(safeWidth * scale));
  const height = Math.max(2, Math.round(safeHeight * scale));
  const radius = Math.min(
    Math.max(0, cornerRadius) * scale,
    Math.min(width, height) / 2
  );
  return { width, height, radius, scale };
}

/**
 * Signed distance from a point to a rounded rectangle spanning
 * (0,0)-(width,height). Negative inside, positive outside, 0 on the border.
 */
export function sdRoundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): number {
  const r = Math.min(Math.max(0, radius), Math.min(width, height) / 2);
  const qx = Math.abs(x - width / 2) - (width / 2 - r);
  const qy = Math.abs(y - height / 2) - (height / 2 - r);
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  return Math.min(Math.max(qx, qy), 0) + outside - r;
}

export interface DisplacementMapOptions {
  width: number;
  height: number;
  radius: number;
  /** Lens thickness (0-100): bend reach and center magnification. */
  depth: number;
  /** Rim falloff band width (0-100), as a share of the half min dimension. */
  spread: number;
}

const NEUTRAL = 127.5;

/**
 * Builds the RGBA pixels of the lens displacement map.
 *
 * Each pixel stores an offset vector: R encodes x, G encodes y, and 128 means
 * "sample in place". The vector points toward the interior and its magnitude
 * ramps up near the border (water-droplet refraction: strongest at the rim,
 * near-neutral at the center), plus a gentle whole-surface magnification that
 * grows with depth.
 */
export function buildDisplacementPixels(
  options: DisplacementMapOptions
): Uint8ClampedArray<ArrayBuffer> {
  const { width, height, radius } = options;
  const depth = clamp01(options.depth / 100);
  const spread = clamp01(options.spread / 100);

  const data = new Uint8ClampedArray(width * height * 4);
  const halfMin = Math.min(width, height) / 2;
  const band = Math.max(2, spread * halfMin);
  // Thin glass hugs the rim (steep falloff); thick glass bends deep inward.
  const falloffExponent = 4 - depth * 2.8;
  const magnification = depth * 0.14;
  const centerX = width / 2;
  const centerY = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const sd = sdRoundedRect(px, py, width, height, radius);
      let vx = 0;
      let vy = 0;

      if (sd < 0) {
        const rimDistance = -sd;
        const t = Math.min(rimDistance / band, 1);
        const falloff = Math.pow(1 - t, falloffExponent);

        if (falloff > 0.001) {
          const gx =
            sdRoundedRect(px + 1, py, width, height, radius) -
            sdRoundedRect(px - 1, py, width, height, radius);
          const gy =
            sdRoundedRect(px, py + 1, width, height, radius) -
            sdRoundedRect(px, py - 1, width, height, radius);
          const length = Math.hypot(gx, gy) || 1;
          // Sample toward the interior so the rim wraps content like a lens.
          vx = (-gx / length) * falloff;
          vy = (-gy / length) * falloff;
        }

        vx += ((centerX - px) / halfMin) * magnification;
        vy += ((centerY - py) / halfMin) * magnification;
      }

      const index = (y * width + x) * 4;
      data[index] = NEUTRAL + NEUTRAL * clampUnit(vx);
      data[index + 1] = NEUTRAL + NEUTRAL * clampUnit(vy);
      data[index + 2] = NEUTRAL;
      data[index + 3] = 255;
    }
  }

  return data;
}

export interface LiquidGlassFilterParams {
  /** feDisplacementMap scale per channel; blue bends hardest like real glass. */
  scaleR: number;
  scaleG: number;
  scaleB: number;
  /** feGaussianBlur stdDeviation in px. */
  blurPx: number;
  /** feTurbulence wobble displacement scale in px. */
  wobblePx: number;
  /** Opacity of the specular rim highlight (0-1). */
  specularOpacity: number;
  /** Output saturation multiplier for feColorMatrix type="saturate". */
  saturation: number;
}

/** Maps the 0-100 user settings onto concrete SVG filter primitive values. */
export function deriveFilterParams(
  settings: LiquidGlassSettings
): LiquidGlassFilterParams {
  const refraction = clamp01(settings.refraction / 100);
  const depth = clamp01(settings.depth / 100);
  const dispersion = clamp01(settings.dispersion / 100);
  const frost = clamp01(settings.frost / 100);
  const light = clamp01(settings.light / 100);

  const base = refraction * 280 * (0.55 + depth * 0.75);
  const split = dispersion * 0.35;

  return {
    scaleR: base * (1 - split),
    scaleG: base,
    scaleB: base * (1 + split),
    blurPx: frost * 16,
    wobblePx: refraction === 0 ? 0 : 1.5 + refraction * 9,
    specularOpacity: light,
    saturation: 1 + light * 0.35,
  };
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function clampUnit(value: number): number {
  return Math.min(1, Math.max(-1, value));
}
