// Spacing & Grid — an 8-point spacing scale and layout-grid utilities.
//
// Self-contained (mirrors lib/type-scale): this module is about SPACE
// relationships — the consistent rhythm that padding, margin, and gaps share.
//
// Every value snaps to a base unit (8px, with a 4px half-step), so spacing reads
// as one system instead of arbitrary pixels. Multiples of 8 also render
// pixel-perfect across the common screen densities (1x, 1.5x, 2x, 3x).

export interface SpacingValue {
  key: string;
  px: number;
}

export interface SpacingPreset {
  id: string;
  name: string;
  base: number;
  hint: string;
  values: SpacingValue[];
}

export const SPACING_PRESETS: SpacingPreset[] = [
  {
    id: "8pt",
    name: "8-point",
    base: 8,
    hint: "Industry standard (Material, Carbon) — pixel-perfect across densities",
    values: [
      { key: "0", px: 0 },
      { key: "xs", px: 4 },
      { key: "sm", px: 8 },
      { key: "md", px: 16 },
      { key: "lg", px: 24 },
      { key: "xl", px: 32 },
      { key: "2xl", px: 48 },
      { key: "3xl", px: 64 },
      { key: "4xl", px: 96 },
      { key: "5xl", px: 128 },
    ],
  },
  {
    id: "4pt",
    name: "4-point",
    base: 4,
    hint: "Finer control for dense UIs — dashboards, data tables, IDEs",
    values: [
      { key: "0", px: 0 },
      { key: "xs", px: 4 },
      { key: "sm", px: 8 },
      { key: "md", px: 12 },
      { key: "lg", px: 16 },
      { key: "xl", px: 24 },
      { key: "2xl", px: 32 },
      { key: "3xl", px: 48 },
      { key: "4xl", px: 64 },
      { key: "5xl", px: 96 },
    ],
  },
];

export interface SpacingToken {
  key: string;
  px: number;
  rem: number;
}

export function spacingTokens(preset: SpacingPreset): SpacingToken[] {
  return preset.values.map((v) => ({ key: v.key, px: v.px, rem: v.px / 16 }));
}

/** True when a pixel value lands on the base grid (a non-negative multiple). */
export function isOnGrid(px: number, base: number): boolean {
  return Number.isFinite(px) && px >= 0 && px % base === 0;
}

/** Nearest on-grid value — what an off-grid number should snap to. */
export function snapToGrid(px: number, base: number): number {
  return Math.max(0, Math.round(px / base) * base);
}

export function generateSpacingCSS(preset: SpacingPreset): string {
  const lines = preset.values.map(
    (v) => `  --space-${v.key}: ${v.px / 16}rem; /* ${v.px}px */`,
  );
  return [":root {", ...lines, "}"].join("\n");
}

export function generateSpacingTailwind(preset: SpacingPreset): string {
  const lines = preset.values.map((v) => `  --spacing-${v.key}: ${v.px / 16}rem;`);
  return ["@theme {", ...lines, "}"].join("\n");
}

// ---------------------------------------------------------------------------
// Layout grid
//
// A 12-column grid is the convention because 12 divides evenly into 2, 3, 4 and
// 6 — halves, thirds, quarters, sixths all snap without remainder. Gutters and
// margins are themselves spacing tokens, so the grid shares the page's rhythm.
// ---------------------------------------------------------------------------

export interface GridPreset {
  id: string;
  label: string;
  columns: number;
  gutter: number;
  margin: number;
  maxWidth: number;
}

export const GRID_PRESETS: GridPreset[] = [
  { id: "mobile", label: "Mobile", columns: 4, gutter: 16, margin: 16, maxWidth: 480 },
  { id: "tablet", label: "Tablet", columns: 8, gutter: 24, margin: 24, maxWidth: 768 },
  { id: "desktop", label: "Desktop", columns: 12, gutter: 32, margin: 24, maxWidth: 1280 },
];
