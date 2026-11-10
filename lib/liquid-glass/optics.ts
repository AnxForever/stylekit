// Optical rim profile adapted from 9und30/glassy-liquid (MIT).
// Source: https://github.com/9und30/glassy-liquid/blob/2361eb1f03979703db988180028ccc6d5fc23fe5/src/core/optics.ts
// Copyright (c) 2026 thirtynine. Full notice: docs/licenses/glassy-liquid-MIT.txt.

const SAMPLE_COUNT = 256;
const profiles = new Map<number, Float32Array>();

/**
 * Trace vertical light through a curved rim into the backdrop plane.
 * The flat center has zero displacement. Depth changes the slab height,
 * while the refractive index remains that of ordinary glass.
 */
function rayOffset(t: number, thickness: number): number {
  const u = Math.min(1, Math.max(0.0001, t));
  const remaining = 1 - u;
  const height = Math.pow(1 - Math.pow(remaining, 4), 0.25);
  const slope = thickness * Math.pow(remaining, 3) / Math.max(0.00001, Math.pow(height, 3));
  const incident = Math.atan(slope);
  const transmitted = Math.asin(Math.sin(incident) / 1.5);
  return (0.45 + thickness * height) * Math.tan(incident - transmitted);
}

export function lensProfile(depth: number): Float32Array {
  const key = Math.round(Math.min(100, Math.max(0, depth)));
  const cached = profiles.get(key);
  if (cached) return cached;
  const thickness = 0.65 + key / 100 * 0.7;
  const table = new Float32Array(SAMPLE_COUNT);
  let peak = 0;
  for (let i = 0; i < SAMPLE_COUNT; i++) {
    table[i] = rayOffset((i + 0.5) / SAMPLE_COUNT, thickness);
    peak = Math.max(peak, table[i]);
  }
  if (peak > 0) {
    for (let i = 0; i < SAMPLE_COUNT; i++) table[i] /= peak;
  }
  table[SAMPLE_COUNT - 1] = 0;
  profiles.set(key, table);
  return table;
}

export function sampleLensProfile(table: Float32Array, depth: number): number {
  if (depth >= 1) return 0;
  const index = Math.max(0, depth * table.length - 0.5);
  const lower = Math.floor(index);
  const fraction = index - lower;
  return table[lower] + ((table[lower + 1] ?? 0) - table[lower]) * fraction;
}
