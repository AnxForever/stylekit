import type { Hsl } from "./convert";

export type HarmonyType =
  | "complementary"
  | "splitComplementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "monochromatic";

export const HARMONY_TYPES: HarmonyType[] = [
  "complementary",
  "splitComplementary",
  "analogous",
  "triadic",
  "tetradic",
  "monochromatic",
];

function rotate(h: number, deg: number): number {
  return (((h + deg) % 360) + 360) % 360;
}

function clampL(l: number): number {
  return Math.min(95, Math.max(5, l));
}

/**
 * Build a color-harmony palette from a base color. Hue rotations follow the
 * classic color-wheel relationships; monochromatic varies lightness instead.
 */
export function generateHarmony(base: Hsl, type: HarmonyType): Hsl[] {
  const { h, s, l } = base;
  switch (type) {
    case "complementary":
      return [base, { h: rotate(h, 180), s, l }];
    case "splitComplementary":
      return [base, { h: rotate(h, 150), s, l }, { h: rotate(h, 210), s, l }];
    case "analogous":
      return [{ h: rotate(h, -30), s, l }, base, { h: rotate(h, 30), s, l }];
    case "triadic":
      return [base, { h: rotate(h, 120), s, l }, { h: rotate(h, 240), s, l }];
    case "tetradic":
      return [
        base,
        { h: rotate(h, 90), s, l },
        { h: rotate(h, 180), s, l },
        { h: rotate(h, 270), s, l },
      ];
    case "monochromatic":
      return [
        { h, s, l: clampL(l - 30) },
        { h, s, l: clampL(l - 15) },
        base,
        { h, s, l: clampL(l + 15) },
        { h, s, l: clampL(l + 30) },
      ];
  }
}
