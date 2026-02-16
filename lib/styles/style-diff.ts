// Style Diff Engine
// Compare extracted tokens against registered StyleKit styles
// to find the closest match and show per-field differences

import type { StyleTokens } from "./tokens";
import { styleTokensRegistry } from "./tokens-registry";

// --- Color distance (simple hex-based) ---

function hexToRgb(hex: string): [number, number, number] | null {
  // Extract hex from Tailwind arbitrary class like "bg-[#ff0000]"
  const match = hex.match(/#([0-9a-fA-F]{6})/);
  if (!match) return null;
  const h = match[1];
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function colorDistance(classA: string, classB: string): number {
  const rgbA = hexToRgb(classA);
  const rgbB = hexToRgb(classB);
  if (!rgbA || !rgbB) {
    // Fallback: exact string match = 0, else 100
    return classA === classB ? 0 : 100;
  }
  // Euclidean distance in RGB space (0-441)
  const d = Math.sqrt(
    (rgbA[0] - rgbB[0]) ** 2 +
    (rgbA[1] - rgbB[1]) ** 2 +
    (rgbA[2] - rgbB[2]) ** 2
  );
  // Normalize to 0-100
  return Math.round((d / 441) * 100);
}

// --- String similarity (for class strings) ---

function classSimilarity(a: string, b: string): number {
  if (a === b) return 100;
  if (!a || !b) return 0;
  const setA = new Set(a.split(/\s+/));
  const setB = new Set(b.split(/\s+/));
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? Math.round((intersection / union) * 100) : 0;
}

// --- Per-field diff ---

export interface TokenFieldDiff {
  field: string;
  extracted: string;
  stylekit: string;
  similarity: number; // 0-100
}

export interface StyleDiffResult {
  slug: string;
  name?: string;
  overallSimilarity: number; // 0-100
  fieldDiffs: TokenFieldDiff[];
}

function diffSingleField(
  field: string,
  extracted: string | undefined,
  stylekit: string | undefined
): TokenFieldDiff | null {
  if (!extracted && !stylekit) return null;
  const a = extracted || "";
  const b = stylekit || "";

  // Use color distance for color fields
  const isColor = field.includes("color") || field.includes("bg") || field.includes("text.");
  const similarity = isColor ? 100 - colorDistance(a, b) : classSimilarity(a, b);

  return { field, extracted: a, stylekit: b, similarity };
}

export function diffTokens(
  extracted: Partial<StyleTokens>,
  reference: StyleTokens
): TokenFieldDiff[] {
  const diffs: TokenFieldDiff[] = [];

  const push = (field: string, a: string | undefined, b: string | undefined) => {
    const d = diffSingleField(field, a, b);
    if (d) diffs.push(d);
  };

  // Colors
  push("colors.background.primary", extracted.colors?.background?.primary, reference.colors.background.primary);
  push("colors.background.secondary", extracted.colors?.background?.secondary, reference.colors.background.secondary);
  push("colors.text.primary", extracted.colors?.text?.primary, reference.colors.text.primary);
  push("colors.text.secondary", extracted.colors?.text?.secondary, reference.colors.text.secondary);
  push("colors.text.muted", extracted.colors?.text?.muted, reference.colors.text.muted);
  push("colors.button.primary", extracted.colors?.button?.primary, reference.colors.button.primary);
  push("colors.button.secondary", extracted.colors?.button?.secondary, reference.colors.button.secondary);

  // Typography
  push("typography.heading", extracted.typography?.heading, reference.typography.heading);
  push("typography.body", extracted.typography?.body, reference.typography.body);
  push("typography.sizes.hero", extracted.typography?.sizes?.hero, reference.typography.sizes.hero);
  push("typography.sizes.body", extracted.typography?.sizes?.body, reference.typography.sizes.body);

  // Border
  push("border.width", extracted.border?.width, reference.border.width);
  push("border.radius", extracted.border?.radius, reference.border.radius);
  push("border.color", extracted.border?.color, reference.border.color);

  // Shadow
  push("shadow.md", extracted.shadow?.md, reference.shadow.md);
  push("shadow.hover", extracted.shadow?.hover, reference.shadow.hover);

  // Interaction
  push("interaction.transition", extracted.interaction?.transition, reference.interaction.transition);

  // Spacing
  push("spacing.section", extracted.spacing?.section, reference.spacing.section);
  push("spacing.card", extracted.spacing?.card, reference.spacing.card);

  return diffs;
}

export function findClosestStyles(
  extracted: Partial<StyleTokens>,
  limit = 5
): StyleDiffResult[] {
  const results: StyleDiffResult[] = [];

  for (const [slug, tokens] of Object.entries(styleTokensRegistry)) {
    const fieldDiffs = diffTokens(extracted, tokens);
    const validDiffs = fieldDiffs.filter((d) => d.extracted || d.stylekit);
    const overallSimilarity =
      validDiffs.length > 0
        ? Math.round(
            validDiffs.reduce((sum, d) => sum + d.similarity, 0) / validDiffs.length
          )
        : 0;

    results.push({ slug, overallSimilarity, fieldDiffs });
  }

  results.sort((a, b) => b.overallSimilarity - a.overallSimilarity);
  return results.slice(0, limit);
}
