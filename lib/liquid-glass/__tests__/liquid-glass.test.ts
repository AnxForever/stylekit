import { describe, expect, it } from "vitest";
import {
  buildDisplacementPixels,
  DEFAULT_LIQUID_GLASS_SETTINGS,
  deriveFilterParams,
  MAP_MAX_DIMENSION,
  resolveLiquidGlassSettings,
  resolveMapGeometry,
  sdRoundedRect,
} from "../index";

const NEUTRAL = 128;

function pixelAt(
  data: Uint8ClampedArray,
  width: number,
  x: number,
  y: number
): [number, number, number, number] {
  const index = (y * width + x) * 4;
  return [data[index], data[index + 1], data[index + 2], data[index + 3]];
}

describe("sdRoundedRect", () => {
  it("is negative inside, positive outside, ~0 on the border", () => {
    const width = 200;
    const height = 120;
    const radius = 20;
    expect(sdRoundedRect(width / 2, height / 2, width, height, radius)).toBeLessThan(0);
    expect(sdRoundedRect(-10, height / 2, width, height, radius)).toBeGreaterThan(0);
    expect(Math.abs(sdRoundedRect(0, height / 2, width, height, radius))).toBeLessThan(0.5);
  });

  it("rounds the corner: the square corner point falls outside", () => {
    const width = 100;
    const height = 100;
    const radius = 30;
    expect(sdRoundedRect(1, 1, width, height, radius)).toBeGreaterThan(0);
  });
});

describe("buildDisplacementPixels", () => {
  const width = 200;
  const height = 140;
  const options = { width, height, radius: 24, depth: 60, spread: 45 };
  const data = buildDisplacementPixels(options);

  it("produces an RGBA buffer covering every pixel", () => {
    expect(data.length).toBe(width * height * 4);
  });

  it("keeps the center close to neutral (subtle in the middle)", () => {
    const [r, g, , a] = pixelAt(data, width, width / 2, height / 2);
    expect(Math.abs(r - NEUTRAL)).toBeLessThanOrEqual(3);
    expect(Math.abs(g - NEUTRAL)).toBeLessThanOrEqual(3);
    expect(a).toBe(255);
  });

  it("bends hardest at the rim, pointing toward the interior", () => {
    // Left rim: inward is +x, so the red channel saturates upward.
    const [leftR, leftG] = pixelAt(data, width, 2, height / 2);
    expect(leftR).toBeGreaterThan(200);
    expect(Math.abs(leftG - NEUTRAL)).toBeLessThanOrEqual(8);

    // Top rim: inward is +y, so the green channel saturates upward.
    const [topR, topG] = pixelAt(data, width, width / 2, 2);
    expect(topG).toBeGreaterThan(200);
    expect(Math.abs(topR - NEUTRAL)).toBeLessThanOrEqual(8);

    // Right rim: inward is -x, so the red channel saturates downward.
    const [rightR] = pixelAt(data, width, width - 3, height / 2);
    expect(rightR).toBeLessThan(55);
  });

  it("decays monotonically from the border toward the center", () => {
    const y = height / 2;
    const atRim = Math.abs(pixelAt(data, width, 2, y)[0] - NEUTRAL);
    const midBand = Math.abs(pixelAt(data, width, 14, y)[0] - NEUTRAL);
    const nearCenter = Math.abs(pixelAt(data, width, Math.floor(width / 2) - 6, y)[0] - NEUTRAL);
    expect(atRim).toBeGreaterThan(midBand);
    expect(midBand).toBeGreaterThan(nearCenter);
  });

  it("spread widens the falloff band", () => {
    const probeX = Math.round(Math.min(width, height) * 0.12);
    const narrow = buildDisplacementPixels({ ...options, depth: 50, spread: 20 });
    const wide = buildDisplacementPixels({ ...options, depth: 50, spread: 85 });
    const narrowOffset = Math.abs(pixelAt(narrow, width, probeX, height / 2)[0] - NEUTRAL);
    const wideOffset = Math.abs(pixelAt(wide, width, probeX, height / 2)[0] - NEUTRAL);
    expect(wideOffset).toBeGreaterThan(narrowOffset);
  });

  it("stays neutral outside the rounded corner", () => {
    const rounded = buildDisplacementPixels({ ...options, radius: 48 });
    const [r, g] = pixelAt(rounded, width, 1, 1);
    expect(r).toBe(NEUTRAL);
    expect(g).toBe(NEUTRAL);
  });
});

describe("resolveMapGeometry", () => {
  it("keeps small elements at native resolution", () => {
    const geometry = resolveMapGeometry(320, 200, 28);
    expect(geometry.width).toBe(320);
    expect(geometry.height).toBe(200);
    expect(geometry.scale).toBe(1);
    expect(geometry.radius).toBe(28);
  });

  it("caps large elements at MAP_MAX_DIMENSION preserving aspect", () => {
    const geometry = resolveMapGeometry(1600, 800, 40);
    expect(Math.max(geometry.width, geometry.height)).toBe(MAP_MAX_DIMENSION);
    expect(geometry.width / geometry.height).toBeCloseTo(2, 1);
    expect(geometry.radius).toBeCloseTo(10, 5);
  });

  it("clamps the radius to the capsule limit", () => {
    const geometry = resolveMapGeometry(240, 56, 999);
    expect(geometry.radius).toBe(Math.min(geometry.width, geometry.height) / 2);
  });
});

describe("deriveFilterParams", () => {
  it("splits RGB scales so blue bends hardest", () => {
    const params = deriveFilterParams({
      ...DEFAULT_LIQUID_GLASS_SETTINGS,
      dispersion: 80,
    });
    expect(params.scaleB).toBeGreaterThan(params.scaleG);
    expect(params.scaleG).toBeGreaterThan(params.scaleR);
  });

  it("collapses to a single scale when dispersion is zero", () => {
    const params = deriveFilterParams({
      ...DEFAULT_LIQUID_GLASS_SETTINGS,
      dispersion: 0,
    });
    expect(params.scaleR).toBeCloseTo(params.scaleG, 8);
    expect(params.scaleB).toBeCloseTo(params.scaleG, 8);
  });

  it("goes fully flat when refraction is zero", () => {
    const params = deriveFilterParams({
      ...DEFAULT_LIQUID_GLASS_SETTINGS,
      refraction: 0,
    });
    expect(params.scaleG).toBe(0);
    expect(params.wobblePx).toBe(0);
  });

  it("maps frost linearly onto the blur radius", () => {
    const clear = deriveFilterParams({ ...DEFAULT_LIQUID_GLASS_SETTINGS, frost: 0 });
    const frosted = deriveFilterParams({ ...DEFAULT_LIQUID_GLASS_SETTINGS, frost: 100 });
    expect(clear.blurPx).toBe(0);
    expect(frosted.blurPx).toBe(16);
  });
});

describe("resolveLiquidGlassSettings", () => {
  it("fills missing keys from the defaults", () => {
    const resolved = resolveLiquidGlassSettings({ refraction: 90 });
    expect(resolved.refraction).toBe(90);
    expect(resolved.frost).toBe(DEFAULT_LIQUID_GLASS_SETTINGS.frost);
  });
});
