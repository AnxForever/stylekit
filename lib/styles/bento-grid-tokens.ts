// Bento Grid Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const bentoGridTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-zinc-100 dark:border-zinc-800",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-md hover:-translate-y-0.5",
    focus: "focus:shadow-md focus:ring-2 focus:ring-blue-500/20",
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-0.5",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-semibold text-zinc-900 dark:text-zinc-100",
    body: "text-zinc-600 dark:text-zinc-400",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-16 lg:py-20",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white dark:bg-zinc-900",
      secondary: "bg-zinc-50 dark:bg-zinc-800",
      accent: ["bg-gradient-to-br from-blue-500 to-purple-600", "bg-gradient-to-br from-orange-400 to-pink-500", "bg-gradient-to-br from-green-400 to-cyan-500"],
    },
    text: {
      primary: "text-zinc-900 dark:text-zinc-100",
      secondary: "text-zinc-600 dark:text-zinc-400",
      muted: "text-zinc-400 dark:text-zinc-500",
    },
    button: {
      primary: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
      secondary: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    },
  },

  forbidden: {
    classes: [
      // No sharp corners
      "rounded-none", "rounded-sm",
      // All cards same size is forbidden (documented in patterns)
      // No inconsistent gaps
      "gap-1", "gap-2", "gap-8", "gap-10", "gap-12",
    ],
    patterns: [
      "^rounded-none",                // No sharp corners
      "^rounded-sm",                  // Too small corners
    ],
    reasons: {
      "rounded-none": "Bento Grid requires rounded corners (rounded-xl, rounded-2xl, or rounded-3xl)",
      "rounded-sm": "Bento Grid uses larger rounded corners for modern look",
      "gap-1": "Bento Grid uses consistent medium gaps (gap-4 or gap-6)",
    },
  },

  required: {
    button: [
      "px-4 py-2 md:px-6 md:py-3",
      "rounded-xl",
      "font-medium",
      "transition-colors",
    ],
    card: [
      "rounded-2xl",
      "border border-zinc-100 dark:border-zinc-800",
      "shadow-sm",
      "hover:shadow-md hover:-translate-y-0.5",
      "transition-all duration-200",
    ],
    input: [
      "bg-zinc-50 dark:bg-zinc-800",
      "border border-zinc-200 dark:border-zinc-700",
      "rounded-xl",
      "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
      "focus:border-blue-500",
      "transition-all",
    ],
  },
};
