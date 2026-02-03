// Apple Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const appleStyleTokens: StyleTokens = {
  border: {
    width: "border-0",
    color: "border-gray-200",
    radius: "rounded-2xl",
    style: "border-none",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
    md: "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
    lg: "shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
    focus: "focus:shadow-[0_0_0_4px_rgba(0,113,227,0.3)]",
  },

  interaction: {
    hoverOpacity: "hover:opacity-80",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-semibold tracking-tight text-black",
    body: "text-gray-600",
    mono: "font-mono text-sm",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-base md:text-lg",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-20 md:py-32",
    container: "px-6 md:px-8",
    card: "p-8 md:p-12",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f5f5f7]",
      accent: ["bg-black", "bg-[#0071e3]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-gray-500",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#0071e3] text-white",
      secondary: "bg-black text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r",
      "bg-gradient-to-br",
      "shadow-2xl",
      "shadow-inner",
      "border-2",
      "border-4",
    ],
    patterns: [
      "^bg-gradient",
      "^shadow-(?:2xl|inner)",
      "^border-(?:2|4|8)",
    ],
    reasons: {
      "bg-gradient-to-r": "Apple style uses solid colors, not gradients",
      "shadow-2xl": "Apple style uses subtle, refined shadows",
      "border-2": "Apple style uses minimal or no borders",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "bg-[#0071e3]",
      "rounded-full",
      "text-white font-medium",
      "hover:bg-[#0077ed]",
      "transition-colors duration-200",
    ],
    card: [
      "bg-white",
      "rounded-2xl",
      "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
    ],
    input: [
      "bg-[#f5f5f7]",
      "rounded-xl",
      "text-black placeholder-gray-400",
      "focus:outline-none focus:ring-2 focus:ring-[#0071e3]",
      "transition-all",
    ],
  },
};
