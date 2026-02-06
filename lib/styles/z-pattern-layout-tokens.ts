// Z-Pattern Layout Style Tokens - Diagonal flow, CTA-focused, gradient accents
import type { StyleTokens } from "./tokens";

export const zPatternLayoutTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-xl",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg shadow-[#6366f1]/25",
    none: "shadow-none",
    hover: "hover:shadow-xl hover:shadow-[#6366f1]/30",
    focus: "focus:shadow-md",
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-0.5",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-base md:text-lg",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-16 lg:py-20",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-6 md:p-8",
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
      accent: ["bg-[#6366f1]", "bg-[#06b6d4]", "bg-[#f59e0b]", "bg-[#ec4899]"],
    },
    text: {
      primary: "text-[#0f172a]",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/25",
      secondary: "bg-white text-[#0f172a] border border-gray-200",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "font-black",
      "border-4", "border-8",
    ],
    patterns: [
      "^rounded-none$",
      "^border-[48]",
    ],
    reasons: {
      "rounded-none": "Z-Pattern Layout uses soft rounding (rounded-xl) for modern appeal",
      "border-4": "Z-Pattern Layout uses subtle borders for clean, conversion-focused design",
    },
  },

  required: {
    button: [
      "rounded-xl",
      "font-semibold",
      "transition-all duration-300",
    ],
    card: [
      "bg-white",
      "rounded-2xl",
      "shadow-sm",
      "border border-gray-100",
      "text-center",
    ],
    input: [
      "bg-white",
      "border border-gray-200",
      "rounded-xl",
      "focus:outline-none",
      "focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1]",
      "transition-all",
    ],
  },
};
