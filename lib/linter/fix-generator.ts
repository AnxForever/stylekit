// Fix suggestion generator for Style Linter

import type { StyleTokens } from "@/lib/styles/tokens";

export interface Suggestion {
  original: string;
  replacement: string;
  description: string;
}

/**
 * Generate fix suggestions for a forbidden class based on the style tokens
 */
export function generateSuggestion(
  tokens: StyleTokens,
  forbiddenClass: string
): Suggestion | null {
  // Rounded classes → use the style's border radius
  if (forbiddenClass.match(/^rounded-(?!none)/)) {
    return {
      original: forbiddenClass,
      replacement: tokens.border.radius,
      description: `Replace with ${tokens.border.radius} to match style`,
    };
  }

  // Shadow classes → use the style's shadow
  if (forbiddenClass.match(/^shadow-(?!\[|none)/) && !forbiddenClass.startsWith("shadow-[")) {
    return {
      original: forbiddenClass,
      replacement: tokens.shadow.md,
      description: `Replace with style-specific shadow`,
    };
  }

  // Gradient backgrounds → use accent color
  if (forbiddenClass.match(/^bg-gradient-/)) {
    const accent = tokens.colors.background.accent[0] || tokens.colors.background.primary;
    return {
      original: forbiddenClass,
      replacement: accent,
      description: `Replace gradient with solid accent color`,
    };
  }

  // Gray borders → use the style's border color
  if (forbiddenClass.match(/^border-(gray|slate|zinc|neutral)-/)) {
    return {
      original: forbiddenClass,
      replacement: tokens.border.color,
      description: `Replace with ${tokens.border.color} to match style`,
    };
  }

  // Opacity → remove or suggest full opacity
  if (forbiddenClass.match(/^opacity-/)) {
    return {
      original: forbiddenClass,
      replacement: "",
      description: `Remove opacity — use solid colors instead`,
    };
  }

  return null;
}

/**
 * Generate a fix prompt that users can send to AI tools
 */
export function generateFixPrompt(
  styleName: string,
  code: string,
  suggestions: Suggestion[]
): string {
  if (suggestions.length === 0) return "";

  const fixes = suggestions
    .map((s, i) => {
      if (s.replacement) {
        return `${i + 1}. Replace \`${s.original}\` with \`${s.replacement}\` — ${s.description}`;
      }
      return `${i + 1}. Remove \`${s.original}\` — ${s.description}`;
    })
    .join("\n");

  return `Please fix the following code to comply with ${styleName} style rules:

\`\`\`
${code}
\`\`\`

Required changes:
${fixes}

Make sure all components follow ${styleName} design tokens.`;
}
