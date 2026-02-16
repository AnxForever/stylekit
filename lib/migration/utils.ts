// Shared utilities for theme importers

/**
 * Convert a pixel value to the closest Tailwind border-radius class.
 */
export function pxToRadiusClass(px: number): string {
  if (px <= 0) return "rounded-none";
  if (px <= 2) return "rounded-sm";
  if (px <= 4) return "rounded";
  if (px <= 6) return "rounded-md";
  if (px <= 8) return "rounded-lg";
  if (px <= 12) return "rounded-xl";
  if (px <= 16) return "rounded-2xl";
  if (px <= 24) return "rounded-3xl";
  return "rounded-full";
}

/**
 * Convert a pixel font size to the closest Tailwind text-size class.
 */
export function pxToTextClass(px: number): string {
  if (px <= 12) return "text-xs";
  if (px <= 14) return "text-sm";
  if (px <= 16) return "text-base";
  if (px <= 18) return "text-lg";
  if (px <= 20) return "text-xl";
  if (px <= 24) return "text-2xl";
  if (px <= 30) return "text-3xl";
  if (px <= 36) return "text-4xl";
  if (px <= 48) return "text-5xl";
  return "text-6xl";
}

/**
 * Convert a rem font size string (e.g. "2rem", "1.5rem") to a Tailwind text-size class.
 */
export function remToTextClass(rem: string): string {
  const value = parseFloat(rem);
  if (Number.isNaN(value)) return "text-base";
  return pxToTextClass(value * 16);
}

/**
 * Parse a font size string that could be px or rem.
 */
export function fontSizeToTextClass(value: string): string {
  const trimmed = value.trim().toLowerCase();
  if (trimmed.endsWith("rem")) return remToTextClass(trimmed);
  if (trimmed.endsWith("px")) return pxToTextClass(parseFloat(trimmed));
  // Try numeric (assume px)
  const num = parseFloat(trimmed);
  if (!Number.isNaN(num)) return pxToTextClass(num);
  return "text-base";
}

/**
 * Build a Tailwind bg-[color] class from a hex/color string.
 */
export function colorToBgClass(color: string): string {
  return `bg-[${color}]`;
}

/**
 * Build a Tailwind text-[color] class from a hex/color string.
 */
export function colorToTextClass(color: string): string {
  return `text-[${color}]`;
}

/**
 * Wrap a raw CSS shadow value into Tailwind arbitrary shadow.
 */
export function shadowToClass(shadow: string): string {
  const trimmed = shadow.trim();
  if (!trimmed || trimmed === "none") return "shadow-none";
  return `shadow-[${trimmed.replace(/\s+/g, "_")}]`;
}

/**
 * Convert a spacing number (px) to the closest Tailwind spacing unit.
 */
export function pxToSpacingClass(px: number, prefix: string): string {
  const unit = Math.round(px / 4);
  if (unit <= 0) return `${prefix}-0`;
  if (unit <= 1) return `${prefix}-1`;
  if (unit <= 2) return `${prefix}-2`;
  if (unit <= 3) return `${prefix}-3`;
  if (unit <= 4) return `${prefix}-4`;
  if (unit <= 5) return `${prefix}-5`;
  if (unit <= 6) return `${prefix}-6`;
  if (unit <= 8) return `${prefix}-8`;
  if (unit <= 10) return `${prefix}-10`;
  if (unit <= 12) return `${prefix}-12`;
  return `${prefix}-16`;
}

/**
 * Safely parse JSON, returning null on failure.
 */
export function safeJsonParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/**
 * Count the total number of defined properties in an object (shallow keys with non-undefined values).
 */
export function countDefinedProperties(obj: Record<string, unknown>): number {
  return Object.values(obj).filter((v) => v !== undefined && v !== null).length;
}
