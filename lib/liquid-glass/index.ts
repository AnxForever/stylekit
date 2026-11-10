// Liquid Glass: curved-rim refraction with a clear, undistorted center.
import { lensProfile, sampleLensProfile } from "./optics";
//
// The pipeline encodes a lens-shaped vector field into an RGBA displacement map
// (R = horizontal offset, G = vertical offset, 128 = rest). feDisplacementMap
// bends the backdrop at the curved rim. RGB can use subtly different scales;
// the center remains neutral. Blur is a separate material/fallback choice.
//
// Everything in this module is pure math so it can run in unit tests without a
// DOM; the canvas/PNG encoding lives in components/liquid-glass.

export interface LiquidGlassSettings {
  /** Specular highlight intensity along the glass rim (0-100). */
  light: number;
  /** Overall displacement strength — how hard the backdrop bends (0-100). */
  refraction: number;
  /** Virtual lens thickness: curvature of the refracting rim (0-100). */
  depth: number;
  /** Chromatic dispersion — RGB separation at the rim (0-100). */
  dispersion: number;
  /** Frost blur over the refracted backdrop (0-100). */
  frost: number;
  /** Width of the rim falloff band; distortion fades toward the center (0-100). */
  spread: number;
}

export const DEFAULT_LIQUID_GLASS_SETTINGS: LiquidGlassSettings = {
  light: 65,
  refraction: 60,
  depth: 50,
  dispersion: 8,
  frost: 2,
  spread: 45,
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
  /** Lens thickness (0-100): height of the refracting rim. */
  depth: number;
  /** Width of the curved rim (0-100), mapped to 8-36 CSS px. */
  spread: number;
  /** Map pixels per CSS pixel, from resolveMapGeometry. Defaults to 1. */
  mapScale?: number;
}

const NEUTRAL = 127.5;

/**
 * Builds the RGBA pixels of the lens displacement map.
 *
 * Each pixel stores an offset vector: R encodes x, G encodes y, and 128 means
 * "sample in place". The vector points toward the interior and its magnitude
 * follows the refracted ray through a curved rim. Its width is independent of
 * the overall panel size. The flat interior has no radial magnification.
 */
export function buildDisplacementPixels(
  options: DisplacementMapOptions
): Uint8ClampedArray<ArrayBuffer> {
  const { width, height, radius } = options;
  const spread = clamp01(options.spread / 100);
  const profile = lensProfile(options.depth);

  const data = new Uint8ClampedArray(width * height * 4);
  const halfMin = Math.min(width, height) / 2;
  const band = Math.max(1, Math.min(halfMin * 0.8, (8 + spread * 28) * (options.mapScale ?? 1)));
  const centerX = width / 2;
  const centerY = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + 0.5;
      const py = y + 0.5;
      const sd = sdRoundedRect(px, py, width, height, radius);
      let vx = 0;
      let vy = 0;

      if (sd < 0 && -sd < band) {
        const magnitude = sampleLensProfile(profile, -sd / band);
        // Analytic rounded-rectangle normals avoid finite-difference seams.
        const dx = px - centerX;
        const dy = py - centerY;
        const qx = Math.abs(dx) - (width / 2 - radius);
        const qy = Math.abs(dy) - (height / 2 - radius);
        if (qx > 0 && qy > 0) {
          const length = Math.hypot(qx, qy);
          vx = -Math.sign(dx) * qx / length * magnitude;
          vy = -Math.sign(dy) * qy / length * magnitude;
        } else if (qx > qy) {
          vx = -Math.sign(dx) * magnitude;
        } else {
          vy = -Math.sign(dy) * magnitude;
        }
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
  /** Retained for API compatibility. Clear optics do not add turbulence. */
  wobblePx: number;
  /** Opacity of the specular rim highlight (0-1). */
  specularOpacity: number;
  /** Output saturation multiplier for feColorMatrix type="saturate". */
  saturation: number;
}

/** Maps the 0-100 user settings onto concrete SVG filter primitive values. */
export function deriveFilterParams(
  settings: LiquidGlassSettings,
  shortSide?: number
): LiquidGlassFilterParams {
  const refraction = clamp01(settings.refraction / 100);
  const depth = clamp01(settings.depth / 100);
  const dispersion = clamp01(settings.dispersion / 100);
  const frost = clamp01(settings.frost / 100);
  const light = clamp01(settings.light / 100);

  const requested = refraction * (36 + depth * 36);
  const base = shortSide === undefined ? requested : Math.min(requested, Math.max(0, shortSide) * 0.7);
  const split = dispersion * 0.12;

  return {
    scaleR: base * (1 - split),
    scaleG: base,
    scaleB: base * (1 + split),
    blurPx: frost * 16,
    wobblePx: 0,
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
