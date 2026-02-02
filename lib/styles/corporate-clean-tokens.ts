// Corporate Clean Style Tokens
import type { StyleTokens } from "./tokens";

export const corporateCleanTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "shadow-md",
    focus: "ring-2 ring-blue-500",
  },

  interaction: {
    hoverScale: "hover:shadow-md",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-normal",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-16 lg:py-20",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-slate-50",
      accent: ["bg-blue-600", "bg-blue-500"],
    },
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-700",
      muted: "text-gray-500",
    },
    button: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-white text-gray-700 border border-gray-300",
      danger: "bg-red-600 text-white hover:bg-red-700",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "shadow-2xl",
      "border-4",
      "bg-gradient-to-r",
      "text-neon",
    ],
    patterns: [
      "^shadow-2xl",
      "^bg-gradient-",
      "^border-[48]",
    ],
    reasons: {
      "rounded-none": "Corporate Clean uses rounded corners",
      "shadow-2xl": "Shadows should be subtle (shadow-sm to shadow-md)",
      "bg-gradient-to-r": "Use solid colors for professional look",
    },
  },

  required: {
    button: [
      "px-4 py-2",
      "rounded-lg",
      "font-medium",
      "transition-all duration-200",
    ],
    card: [
      "bg-white",
      "rounded-xl",
      "shadow-sm",
      "border border-gray-200",
    ],
    input: [
      "px-3 py-2",
      "border border-gray-300",
      "rounded-lg",
      "focus:ring-2 focus:ring-blue-500",
      "focus:border-blue-500",
    ],
  },
};
