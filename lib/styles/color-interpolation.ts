// Shared color interpolation utilities
// Used by both blend-engine and ai-generator for HSL-space color blending

/** Convert hex color to HSL */
export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6 && cleaned.length !== 3) return null;

  const fullHex =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;

  const r = parseInt(fullHex.slice(0, 2), 16) / 255;
  const g = parseInt(fullHex.slice(2, 4), 16) / 255;
  const b = parseInt(fullHex.slice(4, 6), 16) / 255;

  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return { h: h * 360, s, l };
}

/** Convert HSL to hex color */
export function hslToHex(h: number, s: number, l: number): string {
  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const hNorm = (((h % 360) + 360) % 360) / 360;

  if (s === 0) {
    const v = Math.round(l * 255);
    return `#${v.toString(16).padStart(2, "0")}${v.toString(16).padStart(2, "0")}${v.toString(16).padStart(2, "0")}`;
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/** Extract hex color from a Tailwind class like "bg-[#ff006e]" or "text-[#333]" */
export function extractHexFromClass(cls: string): string | null {
  const match = cls.match(/#[0-9a-fA-F]{3,6}/);
  return match ? match[0] : null;
}

/** Weighted interpolation of hex colors in HSL space */
export function interpolateHexColors(
  colors: { hex: string; weight: number }[]
): string {
  if (colors.length === 0) return "#888888";
  if (colors.length === 1) return colors[0].hex;

  const totalWeight = colors.reduce((sum, c) => sum + c.weight, 0);
  if (totalWeight === 0) return colors[0].hex;

  let hSum = 0;
  let sSum = 0;
  let lSum = 0;

  for (const { hex, weight } of colors) {
    const hsl = hexToHsl(hex);
    if (!hsl) continue;
    const w = weight / totalWeight;
    hSum += hsl.h * w;
    sSum += hsl.s * w;
    lSum += hsl.l * w;
  }

  return hslToHex(hSum, sSum, lSum);
}

/**
 * Interpolate a Tailwind color class by extracting hex, blending, and rebuilding.
 * Example: interpolateColorClass("bg-[#ff006e]", "bg-[#3366ff]", 0.6, "bg")
 * with weight=0.6 towards classA → blended result as "bg-[#blended]"
 */
export function interpolateColorClass(
  classA: string,
  classB: string,
  weightA: number,
  prefix: string
): string {
  const hexA = extractHexFromClass(classA);
  const hexB = extractHexFromClass(classB);

  if (hexA && hexB) {
    const blended = interpolateHexColors([
      { hex: hexA, weight: weightA },
      { hex: hexB, weight: 1 - weightA },
    ]);
    return `${prefix}-[${blended}]`;
  }

  // Fallback: pick from higher-weighted source
  return weightA >= 0.5 ? classA : classB;
}

/**
 * Extract a numeric value from a Tailwind class.
 * E.g., "rounded-xl" → 12, "shadow-lg" → 3, "p-6" → 6, "text-2xl" → 24
 */
export function extractNumericFromClass(cls: string): number | null {
  // Direct number: p-4, gap-6, etc.
  const directMatch = cls.match(/[-:](\d+(?:\.\d+)?)$/);
  if (directMatch) return parseFloat(directMatch[1]);

  // Named sizes: sm=1, md=2, lg=3, xl=4, 2xl=5, 3xl=6
  const sizeMap: Record<string, number> = {
    xs: 0.5,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    "2xl": 5,
    "3xl": 6,
    "4xl": 7,
    "5xl": 8,
    "6xl": 9,
    "7xl": 10,
    "8xl": 11,
    "9xl": 12,
    none: 0,
    full: 999,
  };

  for (const [name, value] of Object.entries(sizeMap)) {
    if (cls.endsWith(`-${name}`)) return value;
  }

  return null;
}

/**
 * Find the closest Tailwind class for an interpolated numeric value.
 * Given a prefix and numeric value, returns the nearest standard class.
 */
export function numericToClass(prefix: string, value: number): string {
  // Standard Tailwind scale
  const scale = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
  const closest = scale.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  return `${prefix}-${closest}`;
}
