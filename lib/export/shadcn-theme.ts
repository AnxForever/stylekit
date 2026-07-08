// shadcn/ui Theme Generator
// Derives each style's real design tokens (colors, radius, borders) into the
// raw CSS values a shadcn theme needs, so every style yields a distinct theme.
// Covers the full modern shadcn token set (surfaces, brand, charts, sidebar)
// with contrast-safe foregrounds and a per-style dark mode.

import type { DesignStyle } from "../styles";
import { getStyleTokens } from "../styles/tokens-registry";
import {
  colorToHsl,
  hslLightness,
  resolveTwColor,
  twRadiusToRem,
} from "./color-resolve";

export interface ShadcnTheme {
  name: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

// Neutral shadcn defaults, used only when a style token cannot be resolved.
const FALLBACK = {
  lightBg: "0 0% 100%",
  lightFg: "0 0% 3.9%",
  lightMuted: "0 0% 96.1%",
  lightMutedFg: "0 0% 45.1%",
  lightBorder: "0 0% 89.8%",
  darkBg: "0 0% 3.9%",
  darkFg: "0 0% 98%",
  darkMuted: "0 0% 14.9%",
  darkMutedFg: "0 0% 63.9%",
  darkBorder: "0 0% 14.9%",
  primary: "0 0% 9%",
  radius: "0.5rem",
};

/** A style is "natively dark" when its own surface is a dark color. */
const DARK_THRESHOLD = 45;
/** Minimum lightness gap for a foreground to be legible on its background. */
const CONTRAST_GAP = 35;

/** Resolve a value that may be a raw color (hex/rgba/oklch) OR a Tailwind class. */
function anyColorToHsl(input?: string): string | null {
  if (!input) return null;
  return colorToHsl(input) ?? resolveTwColor(input);
}

/** Pick a readable near-black / near-white foreground for a given HSL background. */
function readableForeground(hslBg: string): string {
  const l = hslLightness(hslBg);
  if (l === null) return "0 0% 98%";
  return l >= 55 ? "0 0% 9%" : "0 0% 98%";
}

/** Keep the style's foreground only if it contrasts with the surface; else flip. */
function ensureContrast(fg: string, bg: string): string {
  const lf = hslLightness(fg);
  const lb = hslLightness(bg);
  if (lf === null || lb === null) return fg;
  return Math.abs(lf - lb) >= CONTRAST_GAP ? fg : readableForeground(bg);
}

/** Rotate an HSL triplet's hue by `deg` degrees (used to spread chart colors). */
function rotateHue(hsl: string, deg: number): string {
  const m = hsl.match(/^(\d+) (\d+)% (\d+)%$/);
  if (!m) return hsl;
  const h = (parseInt(m[1], 10) + deg) % 360;
  return `${h} ${m[2]}% ${m[3]}%`;
}

/** Shift an HSL triplet's lightness by `delta` percentage points (clamped 0-100). */
function shiftLightness(hsl: string, delta: number): string {
  const m = hsl.match(/^(\d+) (\d+)% (\d+(?:\.\d+)?)%$/);
  if (!m) return hsl;
  const l = Math.max(0, Math.min(100, parseFloat(m[3]) + delta));
  return `${m[1]} ${m[2]}% ${Math.round(l * 10) / 10}%`;
}

/** True when two HSL colors are too close in lightness to be told apart. */
function lowContrast(a: string, b: string, minGap: number): boolean {
  const la = hslLightness(a);
  const lb = hslLightness(b);
  if (la === null || lb === null) return false;
  return Math.abs(la - lb) < minGap;
}

/**
 * Guarantee a color reads as distinct from its surface. Styles whose semantic
 * colors flatten to near-white (e.g. Glassmorphism's translucent surfaces)
 * would otherwise emit an invisible white-on-white border; nudge it toward the
 * surface's opposite so the theme is usable after `shadcn add`.
 */
function ensureVisible(color: string, bg: string, minGap: number): string {
  if (!lowContrast(color, bg, minGap)) return color;
  const lb = hslLightness(bg) ?? 100;
  return shiftLightness(bg, lb >= 50 ? -12 : 14);
}

/** Lightness gap below which a border/brand color is treated as invisible. */
const BORDER_MIN_GAP = 8;
const PRIMARY_MIN_GAP = 12;

/** Five chart colors from the style's palette, padded by hue rotation. */
function chartColors(
  style: DesignStyle,
  primary: string,
  accent: string,
): Record<string, string> {
  const palette = [
    primary,
    accent,
    ...(style.colors.accent ?? [])
      .slice(1)
      .map((c) => anyColorToHsl(c))
      .filter((c): c is string => c !== null),
  ];
  const out: Record<string, string> = {};
  for (let i = 0; i < 5; i++) {
    out[`chart-${i + 1}`] = palette[i] ?? rotateHue(primary, (i + 1) * 47);
  }
  return out;
}

interface Surface {
  bg: string;
  fg: string;
  muted: string;
  mutedFg: string;
  border: string;
  radius: string;
  primary: string;
  secondary: string;
  accent: string;
  style: DesignStyle;
}

/** Assemble the full shadcn token set for one mode. */
function buildVars(s: Surface): Record<string, string> {
  // A border must be visible against the surface, even when the style's own
  // border color flattens to the same lightness as its background.
  const border = ensureVisible(s.border, s.bg, BORDER_MIN_GAP);
  return {
    background: s.bg,
    foreground: s.fg,
    card: s.bg,
    "card-foreground": s.fg,
    popover: s.bg,
    "popover-foreground": s.fg,
    primary: s.primary,
    "primary-foreground": readableForeground(s.primary),
    secondary: s.secondary,
    "secondary-foreground": readableForeground(s.secondary),
    muted: s.muted,
    "muted-foreground": s.mutedFg,
    accent: s.accent,
    "accent-foreground": readableForeground(s.accent),
    destructive: "0 72% 51%",
    "destructive-foreground": "0 0% 98%",
    border,
    input: border,
    ring: s.primary,
    ...chartColors(s.style, s.primary, s.accent),
    // Sidebar group reuses the main surface/brand tokens for a coherent shell.
    sidebar: s.bg,
    "sidebar-foreground": s.fg,
    "sidebar-primary": s.primary,
    "sidebar-primary-foreground": readableForeground(s.primary),
    "sidebar-accent": s.accent,
    "sidebar-accent-foreground": readableForeground(s.accent),
    "sidebar-border": border,
    "sidebar-ring": s.primary,
    radius: s.radius,
  };
}

export function generateShadcnTheme(style: DesignStyle): ShadcnTheme {
  const tokens = getStyleTokens(style.slug);

  // Structural colors from the style's semantic tokens.
  const bg =
    (tokens && resolveTwColor(tokens.colors.background.primary)) ??
    FALLBACK.lightBg;
  const fg = ensureContrast(
    (tokens && resolveTwColor(tokens.colors.text.primary)) ?? FALLBACK.lightFg,
    bg,
  );
  const muted =
    (tokens && resolveTwColor(tokens.colors.background.secondary)) ??
    FALLBACK.lightMuted;
  const mutedFg = ensureContrast(
    (tokens && resolveTwColor(tokens.colors.text.muted)) ??
      FALLBACK.lightMutedFg,
    muted,
  );
  const border =
    (tokens && resolveTwColor(tokens.border.color)) ?? FALLBACK.lightBorder;
  const radius =
    (tokens && twRadiusToRem(tokens.border.radius)) ?? FALLBACK.radius;

  // Brand colors from the style palette (robust across hex / rgba / class).
  const rawPrimary = anyColorToHsl(style.colors.primary) ?? FALLBACK.primary;
  const secondary = anyColorToHsl(style.colors.secondary) ?? muted;
  const accent = anyColorToHsl(style.colors.accent?.[0]) ?? rawPrimary;

  // If the brand primary is invisible on the surface (e.g. white-on-white for
  // translucent "glass" styles), promote the most vivid accent so the primary
  // button/ring is actually usable; fall back to a strong surface shade.
  const primary = lowContrast(rawPrimary, bg, PRIMARY_MIN_GAP)
    ? !lowContrast(accent, bg, PRIMARY_MIN_GAP)
      ? accent
      : shiftLightness(bg, (hslLightness(bg) ?? 100) >= 50 ? -72 : 72)
    : rawPrimary;

  const light = buildVars({
    bg,
    fg,
    muted,
    mutedFg,
    border,
    radius,
    primary,
    secondary,
    accent,
    style,
  });

  // Dark mode: natively-dark styles keep their own identity in both modes;
  // light styles get a neutral dark skeleton with brand colors preserved.
  const nativelyDark = (hslLightness(bg) ?? 100) < DARK_THRESHOLD;
  const dark = nativelyDark
    ? buildVars({
        bg,
        fg,
        muted,
        mutedFg,
        border,
        radius,
        primary,
        secondary,
        accent,
        style,
      })
    : buildVars({
        bg: FALLBACK.darkBg,
        fg: FALLBACK.darkFg,
        muted: FALLBACK.darkMuted,
        mutedFg: FALLBACK.darkMutedFg,
        border: FALLBACK.darkBorder,
        radius,
        primary,
        secondary,
        accent,
        style,
      });

  return { name: style.slug, cssVars: { light, dark } };
}

export function generateShadcnThemeJSON(style: DesignStyle): string {
  return JSON.stringify(generateShadcnTheme(style), null, 2);
}

export function generateShadcnThemeCSS(style: DesignStyle): string {
  const theme = generateShadcnTheme(style);

  const lightVars = Object.entries(theme.cssVars.light)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join("\n");
  const darkVars = Object.entries(theme.cssVars.dark)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join("\n");

  return `/* ${style.name} (${style.nameEn}) - shadcn/ui Theme */
/* Generated by StyleKit */

@layer base {
  :root {
${lightVars}
  }

  .dark {
${darkVars}
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
}
