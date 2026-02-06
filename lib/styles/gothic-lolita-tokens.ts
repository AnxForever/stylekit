// Gothic Lolita Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const gothicLolitaTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#4a1a4a]/50",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_6px_rgba(74,26,74,0.3)] md:shadow-[0_2px_8px_rgba(74,26,74,0.3)]",
    md: "shadow-[0_4px_12px_rgba(74,26,74,0.4)] md:shadow-[0_4px_16px_rgba(74,26,74,0.4)]",
    lg: "shadow-[0_8px_20px_rgba(139,26,42,0.4)] md:shadow-[0_8px_28px_rgba(139,26,42,0.4)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_24px_rgba(139,26,42,0.5)]",
    focus: "focus:shadow-[0_0_12px_rgba(139,26,42,0.4)]",
    colored: {
      purple: "shadow-[0_4px_16px_rgba(74,26,74,0.5)]",
      red: "shadow-[0_4px_16px_rgba(139,26,42,0.5)]",
      silver: "shadow-[0_4px_16px_rgba(229,229,229,0.15)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-serif tracking-wide",
    body: "font-serif",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
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
      primary: "bg-[#0a0a0a]",
      secondary: "bg-[#1a0a1a]",
      accent: ["bg-[#4a1a4a]", "bg-[#8b1a2a]", "bg-[#6b2d5b]"],
    },
    text: {
      primary: "text-[#e5e5e5]",
      secondary: "text-[#e5e5e5]/70",
      muted: "text-[#4a1a4a]/70",
    },
    button: {
      primary: "bg-[#4a1a4a] text-[#e5e5e5] border border-[#8b1a2a]/60",
      secondary: "bg-[#0a0a0a] text-[#e5e5e5] border border-[#4a1a4a]/60",
      danger: "bg-[#8b1a2a] text-[#e5e5e5]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full", "rounded-xl", "rounded-2xl", "rounded-3xl",
      "bg-white", "bg-gray-50", "bg-gray-100",
      "text-black",
      "bg-pink-", "bg-yellow-", "bg-green-", "bg-blue-",
      "text-pink-", "text-yellow-", "text-green-",
      "shadow-[0_0_", "neon",
    ],
    patterns: [
      "^rounded-(?:full|xl|2xl|3xl)$",
      "^bg-(?:white|gray-[1-3]|pink-|yellow-|green-|blue-)",
      "^text-(?:black|pink-|yellow-|green-)",
    ],
    reasons: {
      "rounded-full": "Gothic Lolita uses sharp corners (rounded-sm) for a Victorian architectural feel",
      "bg-white": "Gothic Lolita uses dark backgrounds with deep purple and red accents",
      "text-black": "Gothic Lolita uses silver-white text on dark backgrounds",
      "bg-pink-": "Gothic Lolita uses muted blood-red, not bright pink",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "border border-[#8b1a2a]/60",
      "font-serif",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-sm",
      "bg-[#0a0a0a]/90",
      "border border-[#4a1a4a]/50",
      "shadow-[0_4px_16px_rgba(74,26,74,0.4)]",
    ],
    input: [
      "rounded-sm",
      "border border-[#4a1a4a]/50",
      "bg-[#0a0a0a]/80",
      "text-[#e5e5e5]",
      "font-serif",
      "focus:shadow-[0_0_12px_rgba(139,26,42,0.4)]",
      "focus:outline-none",
    ],
  },
};
