// Token Diff Utility - Compare two style token sets
import type { StyleTokens } from "./tokens";

export type DiffCategory =
  | "colors"
  | "typography"
  | "spacing"
  | "shadows"
  | "borders"
  | "interaction";

export interface TokenDiffEntry {
  property: string;
  valueA: string;
  valueB: string;
  diffScore: number;
  category: DiffCategory;
}

export interface TokenDiffResult {
  entries: TokenDiffEntry[];
  summary: {
    totalProperties: number;
    differentProperties: number;
    overallScore: number;
    categoryScores: Record<DiffCategory, number>;
  };
}

/**
 * Parse a hex color string to RGB values.
 * Handles formats: #RGB, #RRGGBB, and extracts hex from Tailwind classes.
 */
function parseHexToRgb(
  value: string
): { r: number; g: number; b: number } | null {
  const hexMatch = value.match(/#([0-9a-fA-F]{3,8})/);
  if (!hexMatch) return null;

  let hex = hexMatch[1];
  // Handle shorthand #RGB
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length < 6) return null;

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

/**
 * Calculate color distance using Euclidean distance in RGB space.
 * Returns a value between 0 (identical) and 1 (maximum difference).
 */
function colorDistance(a: string, b: string): number {
  const rgbA = parseHexToRgb(a);
  const rgbB = parseHexToRgb(b);

  if (!rgbA || !rgbB) return a === b ? 0 : 1;

  const maxDist = Math.sqrt(255 * 255 * 3); // ~441.67
  const dist = Math.sqrt(
    (rgbA.r - rgbB.r) ** 2 +
      (rgbA.g - rgbB.g) ** 2 +
      (rgbA.b - rgbB.b) ** 2
  );

  return dist / maxDist;
}

/**
 * Calculate string similarity (normalized). Identical = 0, completely different = 1.
 */
function stringDiff(a: string, b: string): number {
  if (a === b) return 0;
  if (!a || !b) return 1;

  // Check if both contain hex colors and compare those
  const hasColorA = /#[0-9a-fA-F]{3,8}/.test(a);
  const hasColorB = /#[0-9a-fA-F]{3,8}/.test(b);
  if (hasColorA && hasColorB) {
    return colorDistance(a, b);
  }

  // Simple word-level diff
  const wordsA = new Set(a.split(/\s+/));
  const wordsB = new Set(b.split(/\s+/));
  const union = new Set([...wordsA, ...wordsB]);
  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }

  return union.size === 0 ? 0 : 1 - intersection / union.size;
}

function flattenTokenCategory(
  obj: Record<string, unknown>,
  prefix: string
): Array<{ key: string; value: string }> {
  const result: Array<{ key: string; value: string }> = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      result.push({ key: path, value });
    } else if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (typeof item === "string") {
          result.push({ key: `${path}[${i}]`, value: item });
        }
      });
    } else if (typeof value === "object" && value !== null) {
      result.push(
        ...flattenTokenCategory(value as Record<string, unknown>, path)
      );
    }
  }

  return result;
}

/**
 * Compare two token sets and return structured diff results.
 */
export function diffTokens(
  tokensA: StyleTokens,
  tokensB: StyleTokens
): TokenDiffResult {
  const categories: Array<{
    key: DiffCategory;
    objA: Record<string, unknown>;
    objB: Record<string, unknown>;
  }> = [
    {
      key: "colors",
      objA: tokensA.colors as unknown as Record<string, unknown>,
      objB: tokensB.colors as unknown as Record<string, unknown>,
    },
    {
      key: "typography",
      objA: tokensA.typography as unknown as Record<string, unknown>,
      objB: tokensB.typography as unknown as Record<string, unknown>,
    },
    {
      key: "spacing",
      objA: tokensA.spacing as unknown as Record<string, unknown>,
      objB: tokensB.spacing as unknown as Record<string, unknown>,
    },
    {
      key: "shadows",
      objA: tokensA.shadow as unknown as Record<string, unknown>,
      objB: tokensB.shadow as unknown as Record<string, unknown>,
    },
    {
      key: "borders",
      objA: tokensA.border as unknown as Record<string, unknown>,
      objB: tokensB.border as unknown as Record<string, unknown>,
    },
    {
      key: "interaction",
      objA: tokensA.interaction as unknown as Record<string, unknown>,
      objB: tokensB.interaction as unknown as Record<string, unknown>,
    },
  ];

  const entries: TokenDiffEntry[] = [];
  const categoryScores: Record<DiffCategory, number> = {
    colors: 0,
    typography: 0,
    spacing: 0,
    shadows: 0,
    borders: 0,
    interaction: 0,
  };

  for (const { key: category, objA, objB } of categories) {
    const flatA = flattenTokenCategory(objA, "");
    const flatB = flattenTokenCategory(objB, "");

    const mapA = new Map(flatA.map((f) => [f.key, f.value]));
    const mapB = new Map(flatB.map((f) => [f.key, f.value]));

    const allKeys = new Set([...mapA.keys(), ...mapB.keys()]);
    let catTotal = 0;
    let catDiffSum = 0;

    for (const prop of allKeys) {
      const valA = mapA.get(prop) ?? "";
      const valB = mapB.get(prop) ?? "";
      const score = stringDiff(valA, valB);

      catTotal++;
      catDiffSum += score;

      entries.push({
        property: prop,
        valueA: valA,
        valueB: valB,
        diffScore: score,
        category,
      });
    }

    categoryScores[category] = catTotal > 0 ? catDiffSum / catTotal : 0;
  }

  // Sort by diffScore descending
  entries.sort((a, b) => b.diffScore - a.diffScore);

  const differentProperties = entries.filter((e) => e.diffScore > 0).length;
  const totalProperties = entries.length;
  const overallScore =
    totalProperties > 0
      ? entries.reduce((sum, e) => sum + e.diffScore, 0) / totalProperties
      : 0;

  return {
    entries,
    summary: {
      totalProperties,
      differentProperties,
      overallScore,
      categoryScores,
    },
  };
}
