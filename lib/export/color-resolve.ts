/**
 * @module lib/export/color-resolve
 *
 * Resolves the color/radius values that StyleKit stores as Tailwind utility
 * classes (e.g. "bg-slate-900", "border-black", "rounded-xl", "bg-[#ff006e]")
 * into the raw CSS values a shadcn theme needs (bare HSL triplets, rem radii).
 *
 * Tailwind v4 ships its palette as oklch, so named colors are converted
 * oklch -> sRGB -> HSL via the Björn Ottosson transform.
 */

import twColors from "tailwindcss/colors";

interface Rgb {
  r: number;
  g: number;
  b: number;
}
interface Hsl {
  h: number;
  s: number;
  l: number;
}

const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

/** Parse #rgb, #rrggbb, or #rrggbbaa into 0-255 channels. */
function hexToRgb(hex: string): Rgb | null {
  let c = hex.replace(/^#/, "").trim();
  if (c.length === 3) {
    c = c
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  if (c.length !== 6 && c.length !== 8) return null;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  return { r, g, b };
}

/** Parse "rgb(r,g,b)" / "rgba(r,g,b,a)" into 0-255 channels (alpha ignored). */
function rgbStringToRgb(input: string): Rgb | null {
  const m = input.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  if (parts.length < 3 || parts.some((n, i) => i < 3 && Number.isNaN(n))) {
    return null;
  }
  return { r: parts[0], g: parts[1], b: parts[2] };
}

/** Parse "oklch(20.8% 0.042 265.755)" into L(0-1), C, H(deg). */
function parseOklch(input: string): { L: number; C: number; H: number } | null {
  const m = input.match(/oklch\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].trim().split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const L = parts[0].endsWith("%")
    ? parseFloat(parts[0]) / 100
    : parseFloat(parts[0]);
  const C = parseFloat(parts[1]);
  const H = parseFloat(parts[2]);
  if ([L, C, H].some((n) => Number.isNaN(n))) return null;
  return { L, C, H };
}

/** oklch -> linear sRGB -> gamma sRGB (0-255), via Ottosson's transform. */
function oklchToRgb({ L, C, H }: { L: number; C: number; H: number }): Rgb {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const toGamma = (x: number): number =>
    clamp01(x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);

  return {
    r: Math.round(toGamma(lr) * 255),
    g: Math.round(toGamma(lg) * 255),
    b: Math.round(toGamma(lb) * 255),
  };
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: h * 360, s, l };
}

function formatHsl({ h, s, l }: Hsl): string {
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/** Expose the perceptual lightness (0-100) of a bare HSL triplet string. */
export function hslLightness(triplet: string): number | null {
  const m = triplet.match(/^\d{1,3}(?:\.\d+)?\s+\d{1,3}(?:\.\d+)?%\s+(\d{1,3}(?:\.\d+)?)%$/);
  return m ? parseFloat(m[1]) : null;
}

/** Convert any supported raw color string (hex/rgb/rgba/oklch) to a bare HSL triplet. */
export function colorToHsl(input: string): string | null {
  const v = input.trim().toLowerCase();
  if (v === "white" || v === "#fff" || v === "#ffffff") return "0 0% 100%";
  if (v === "black" || v === "#000" || v === "#000000") return "0 0% 0%";
  if (v === "transparent" || v === "currentcolor" || v === "inherit") return null;

  let rgb: Rgb | null = null;
  if (v.startsWith("#")) rgb = hexToRgb(v);
  else if (v.startsWith("oklch(")) {
    const ok = parseOklch(v);
    rgb = ok ? oklchToRgb(ok) : null;
  } else if (v.startsWith("rgb")) rgb = rgbStringToRgb(v);

  return rgb ? formatHsl(rgbToHsl(rgb)) : null;
}

const COLOR_PREFIXES = [
  "bg-",
  "text-",
  "border-",
  "ring-",
  "from-",
  "to-",
  "via-",
  "fill-",
  "stroke-",
  "decoration-",
  "outline-",
  "shadow-",
];

/**
 * Resolve a Tailwind color utility class to a bare HSL triplet.
 * Handles arbitrary values (bg-[#ff006e], bg-[oklch(...)]), white/black, and
 * named palette colors with a shade (bg-slate-900, text-gray-50).
 * Returns null when the class carries no resolvable color.
 */
export function resolveTwColor(className: string): string | null {
  // A token may be a multi-class string — a gradient ("bg-gradient-to-b
  // from-sky-300 ...") or a blurred glass surface ("bg-white/12 backdrop-blur").
  // Return the first token that resolves to a concrete color.
  for (const token of className.trim().split(/\s+/)) {
    const hsl = resolveSingleColorClass(token);
    if (hsl) return hsl;
  }
  return null;
}

function resolveSingleColorClass(raw: string): string | null {
  let token = raw.trim();
  for (const p of COLOR_PREFIXES) {
    if (token.startsWith(p)) {
      token = token.slice(p.length);
      break;
    }
  }
  // Strip an opacity modifier: white/12, cyan-400/30, [#fff]/50.
  token = token.replace(/\/\d{1,3}$/, "");

  // Arbitrary value: [#ff006e], [oklch(...)], [rgb(...)]
  const arb = token.match(/^\[(.+)\]$/);
  if (arb) return colorToHsl(arb[1].replace(/_/g, " "));

  if (token === "white") return "0 0% 100%";
  if (token === "black") return "0 0% 0%";
  if (token === "transparent" || token === "current" || token === "inherit") {
    return null;
  }

  // Named palette: "slate-900", "gray-50", or bare "slate" (default shade 500).
  const dash = token.lastIndexOf("-");
  const family = dash === -1 ? token : token.slice(0, dash);
  const shade = dash === -1 ? "500" : token.slice(dash + 1);
  const palette = (twColors as Record<string, unknown>)[family];
  if (palette && typeof palette === "object") {
    const value = (palette as Record<string, string>)[shade];
    if (typeof value === "string") return colorToHsl(value);
  }
  return null;
}

const RADIUS_REM: Record<string, string> = {
  none: "0rem",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

/**
 * Resolve a Tailwind radius utility class (e.g. "rounded-none", "rounded-xl",
 * "rounded-[20px]") to a CSS radius value. Returns null if not a radius class.
 */
export function twRadiusToRem(className: string): string | null {
  const token = className.trim();
  if (token === "rounded") return RADIUS_REM.DEFAULT;
  const m = token.match(/^rounded-(.+)$/);
  if (!m) return null;
  const suffix = m[1];
  const arb = suffix.match(/^\[(.+)\]$/);
  if (arb) return arb[1];
  return RADIUS_REM[suffix] ?? null;
}
