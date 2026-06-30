// Type Scale — modular scale + fluid (Utopia) typography utilities.
//
// Self-contained on purpose (mirrors lib/color): no coupling to lib/typography,
// which is the font-pairing library. This module is about SIZE relationships.
//
// A modular scale derives every size from one base by repeatedly multiplying by
// a ratio: size = base * ratio^step. Picking a ratio instead of guessing pixels
// gives the whole system a single mathematical relationship.

export interface ScaleRatio {
  value: number;
  /** Musical-interval name, per Modularscale / Utopia convention. */
  name: string;
  /** Density signal + where it fits, shown in the picker. */
  hint: string;
}

// Named ratios and where each fits, per the industry consensus
// (Modularscale, Utopia, and the Tailwind/Material/Stripe convergence).
export const SCALE_RATIOS: ScaleRatio[] = [
  { value: 1.067, name: "Minor Second", hint: "Very tight — dense data UIs" },
  { value: 1.125, name: "Major Second", hint: "Tight — SaaS dashboards (Vercel/Geist)" },
  { value: 1.2, name: "Minor Third", hint: "Compact — Tailwind default" },
  { value: 1.25, name: "Major Third", hint: "Standard — most products (Stripe/Material)" },
  { value: 1.333, name: "Perfect Fourth", hint: "Generous — editorial, marketing" },
  { value: 1.414, name: "Augmented Fourth", hint: "Wide — expressive, display-heavy" },
  { value: 1.5, name: "Perfect Fifth", hint: "Dramatic — landing & brand sites" },
  { value: 1.618, name: "Golden Ratio", hint: "Maximum — display only" },
];

// Semantic step keys (Tailwind-style), small to large. step 0 = base (1rem).
const STEP_KEYS: { key: string; step: number }[] = [
  { key: "xs", step: -2 },
  { key: "sm", step: -1 },
  { key: "base", step: 0 },
  { key: "lg", step: 1 },
  { key: "xl", step: 2 },
  { key: "2xl", step: 3 },
  { key: "3xl", step: 4 },
  { key: "4xl", step: 5 },
  { key: "5xl", step: 6 },
];

export interface ScaleStep {
  key: string;
  step: number;
  px: number;
  rem: number;
}

const round = (n: number, dp = 2): number => {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
};

/** Static modular scale: size = base * ratio^step, for every semantic step. */
export function generateScale(base: number, ratio: number): ScaleStep[] {
  return STEP_KEYS.map(({ key, step }) => {
    const px = base * Math.pow(ratio, step);
    return { key, step, px: round(px, 2), rem: round(px / 16, 4) };
  });
}

// ---------------------------------------------------------------------------
// Fluid (Utopia) scale
//
// Interpolate each step between a min scale (small viewport) and a max scale
// (large viewport) with clamp() and NO media query. Per Utopia:
//   slope         = (maxSize - minSize) / (maxVw - minVw)
//   yIntersection = -minVw * slope + minSize
//   font-size: clamp(minRem, yIntersectionRem + slope*100vw, maxRem)
// All sizes/viewports in px; the rem values divide by a 16px root.
// ---------------------------------------------------------------------------

export interface FluidConfig {
  minViewport: number; // px, e.g. 360
  maxViewport: number; // px, e.g. 1240
  minBase: number; // px base at min viewport, e.g. 16
  maxBase: number; // px base at max viewport, e.g. 20
  minRatio: number; // ratio at min viewport
  maxRatio: number; // ratio at max viewport
}

export interface FluidStep {
  key: string;
  step: number;
  minPx: number;
  maxPx: number;
  /** Full clamp(...) value in rem + vw, ready to paste. */
  clamp: string;
}

export function generateFluidScale(cfg: FluidConfig): FluidStep[] {
  const { minViewport, maxViewport, minBase, maxBase, minRatio, maxRatio } = cfg;
  return STEP_KEYS.map(({ key, step }) => {
    const minPx = minBase * Math.pow(minRatio, step);
    const maxPx = maxBase * Math.pow(maxRatio, step);
    const minRem = minPx / 16;
    const maxRem = maxPx / 16;
    const slope = (maxPx - minPx) / (maxViewport - minViewport); // px per px
    const yIntersection = -minViewport * slope + minPx; // px
    const yInterRem = yIntersection / 16;
    const slopeVw = round(slope * 100, 4); // the vw coefficient
    const clamp = `clamp(${round(minRem, 4)}rem, ${round(yInterRem, 4)}rem + ${slopeVw}vw, ${round(maxRem, 4)}rem)`;
    return { key, step, minPx: round(minPx, 2), maxPx: round(maxPx, 2), clamp };
  });
}

// ---------------------------------------------------------------------------
// Code generation
// ---------------------------------------------------------------------------

/** Plain CSS custom properties for a static scale. */
export function generateScaleCSS(scale: ScaleStep[]): string {
  const lines = scale.map((s) => `  --text-${s.key}: ${s.rem}rem; /* ${s.px}px */`);
  return [":root {", ...lines, "}"].join("\n");
}

/** CSS custom properties for a fluid scale (clamp values). */
export function generateFluidCSS(scale: FluidStep[]): string {
  const lines = scale.map((s) => `  --text-${s.key}: ${s.clamp};`);
  return [":root {", ...lines, "}"].join("\n");
}

/**
 * Tailwind v4 @theme block (this project uses CSS-based config, no JS config),
 * so the steps register as --text-* and become text-<key> utilities.
 */
export function generateScaleTailwind(scale: ScaleStep[]): string {
  const lines = scale.map((s) => `  --text-${s.key}: ${s.rem}rem;`);
  return ["@theme {", ...lines, "}"].join("\n");
}
