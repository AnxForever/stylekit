// WCAG 2.1 Accessibility Utilities
// Pure functions for color contrast and compliance calculations

/**
 * Parse a hex color string to RGB components.
 * Supports both 3-digit (#abc) and 6-digit (#aabbcc) hex formats.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleaned = hex.replace("#", "");

  if (cleaned.length === 3) {
    cleaned = cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2];
  }

  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Convert an sRGB component (0-255) to its linear value.
 * Per WCAG 2.1: if sRGB <= 0.04045, C = sRGB/12.92
 * else C = ((sRGB + 0.055) / 1.055) ^ 2.4
 */
function linearize(value: number): number {
  const srgb = value / 255;
  return srgb <= 0.04045
    ? srgb / 12.92
    : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

/**
 * Calculate relative luminance per WCAG 2.1.
 * L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Calculate WCAG contrast ratio between two hex colors.
 * CR = (L1 + 0.05) / (L2 + 0.05) where L1 >= L2
 * Result range: 1:1 to 21:1
 */
export function contrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const l1 = relativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = relativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG AA compliance.
 * Normal text: 4.5:1 minimum
 * Large text (18pt+ or 14pt+ bold): 3:1 minimum
 */
export function meetsAA(ratio: number, isLargeText = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check WCAG AAA compliance.
 * Normal text: 7:1 minimum
 * Large text (18pt+ or 14pt+ bold): 4.5:1 minimum
 */
export function meetsAAA(ratio: number, isLargeText = false): boolean {
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Try to extract a hex color from a Tailwind class string.
 * Handles patterns like "bg-[#ff006e]", "text-[#000000]", "bg-white", "text-black", etc.
 */
export function extractHexFromClass(cls: string): string | null {
  // Match explicit hex in brackets: bg-[#ff006e], text-[#aabb00]
  const bracketMatch = cls.match(/#[0-9a-fA-F]{3,6}/);
  if (bracketMatch) return bracketMatch[0];

  // Map common Tailwind color names to hex
  const tailwindColors: Record<string, string> = {
    "white": "#ffffff",
    "black": "#000000",
    "red-500": "#ef4444",
    "red-600": "#dc2626",
    "green-500": "#22c55e",
    "green-600": "#16a34a",
    "blue-500": "#3b82f6",
    "blue-600": "#2563eb",
    "gray-700": "#374151",
    "gray-600": "#4b5563",
    "gray-500": "#6b7280",
    "gray-400": "#9ca3af",
    "gray-300": "#d1d5db",
    "gray-200": "#e5e7eb",
    "gray-100": "#f3f4f6",
    "gray-50": "#f9fafb",
    "zinc-100": "#f4f4f5",
    "zinc-200": "#e4e4e7",
    "zinc-700": "#3f3f46",
    "zinc-800": "#27272a",
    "zinc-900": "#18181b",
    "slate-100": "#f1f5f9",
    "slate-200": "#e2e8f0",
    "slate-700": "#334155",
    "slate-800": "#1e293b",
    "slate-900": "#0f172a",
    "amber-500": "#f59e0b",
    "yellow-500": "#eab308",
    "orange-500": "#f97316",
    "purple-500": "#a855f7",
    "pink-500": "#ec4899",
    "indigo-500": "#6366f1",
    "cyan-500": "#06b6d4",
    "teal-500": "#14b8a6",
    "emerald-500": "#10b981",
  };

  // Extract the color portion from bg-{color} or text-{color}
  const colorMatch = cls.match(/(?:bg|text)-(.+)/);
  if (colorMatch && tailwindColors[colorMatch[1]]) {
    return tailwindColors[colorMatch[1]];
  }

  return null;
}
