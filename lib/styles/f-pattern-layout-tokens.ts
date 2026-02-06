// F-Pattern Layout Style Tokens - Scan-optimized, left-aligned, professional blue
import type { StyleTokens } from "./tokens";

export const fPatternLayoutTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-sm",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:shadow-sm",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-colors duration-200",
  },

  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-sans",
    sizes: {
      hero: "text-3xl md:text-4xl",
      h1: "text-2xl md:text-3xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-6 md:py-8 lg:py-12",
    container: "px-4 md:px-6",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f8f9fa]",
      secondary: "bg-white",
      accent: ["bg-[#e63946]", "bg-[#457b9d]", "bg-[#2a9d8f]", "bg-[#e9c46a]"],
    },
    text: {
      primary: "text-[#1a1a2e]",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#e63946] text-white",
      secondary: "bg-gray-100 text-gray-700",
    },
  },

  forbidden: {
    classes: [
      "text-center",
      "rounded-none", "rounded-2xl", "rounded-3xl",
      "shadow-2xl",
      "font-black",
    ],
    patterns: [
      "^rounded-(?:none|2xl|3xl)",
      "^shadow-2xl",
    ],
    reasons: {
      "text-center": "F-Pattern Layout uses left-aligned text to follow natural scanning patterns",
      "rounded-none": "F-Pattern Layout uses moderate rounding for professional appearance",
      "shadow-2xl": "F-Pattern Layout uses subtle shadows for clean readability",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-medium",
      "transition-colors",
    ],
    card: [
      "bg-white",
      "rounded-lg",
      "shadow-sm",
      "text-left",
    ],
    input: [
      "bg-gray-50",
      "border border-gray-200",
      "rounded-lg",
      "focus:outline-none",
      "focus:ring-2 focus:ring-[#457b9d]/20 focus:border-[#457b9d]",
      "transition-all",
    ],
  },
};
