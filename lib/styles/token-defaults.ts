// Token Defaults - Reduces duplication across *-tokens.ts files
// Provides sensible defaults and deep-merges style-specific overrides

import type { StyleTokens } from "./tokens";

// DeepPartial utility: makes all nested properties optional
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? U[]
    : T[P] extends Record<string, unknown>
      ? DeepPartial<T[P]>
      : T[P];
};

// Deep merge: overrides win, arrays are replaced (not merged)
function deepMerge<T extends object>(
  base: T,
  overrides: DeepPartial<T>
): T {
  const result = { ...base } as Record<string, unknown>;

  for (const key of Object.keys(overrides) as (keyof T & string)[]) {
    const overrideVal = overrides[key];
    const baseVal = base[key];

    if (overrideVal === undefined) continue;

    if (
      Array.isArray(overrideVal) ||
      typeof overrideVal !== "object" ||
      overrideVal === null
    ) {
      result[key] = overrideVal;
    } else if (
      typeof baseVal === "object" &&
      baseVal !== null &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as DeepPartial<Record<string, unknown>>
      );
    } else {
      result[key] = overrideVal;
    }
  }

  return result as T;
}

const DEFAULT_TOKENS: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-lg",
    focus: "focus:shadow-md",
    colored: {},
  },

  interaction: {
    transition: "transition-all duration-200",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-gray-50",
      accent: ["bg-blue-500"],
    },
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-gray-800",
    },
  },

  forbidden: {
    classes: [],
    patterns: [],
    reasons: {},
  },

  required: {
    button: [],
    card: [],
    input: [],
  },
};

/**
 * Creates a complete StyleTokens object by deep-merging overrides on top of
 * sensible defaults. This eliminates boilerplate for spacing, typography sizes,
 * and other fields that are nearly identical across styles.
 *
 * Usage:
 *   export const myTokens = createStyleTokens({
 *     colors: { background: { primary: "bg-black" } },
 *     // ...only the fields that differ from defaults
 *   });
 */
export function createStyleTokens(
  overrides: DeepPartial<StyleTokens>
): StyleTokens {
  return deepMerge(DEFAULT_TOKENS, overrides);
}

export type { DeepPartial };
