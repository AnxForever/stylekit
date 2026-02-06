// Art Nouveau Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const artNouveauTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#c9a227]/60",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-lg",
    focus: "focus:shadow-[0_0_12px_rgba(201,162,39,0.3)]",
    colored: {
      gold: "shadow-[0_4px_20px_rgba(201,162,39,0.2)]",
      green: "shadow-[0_4px_20px_rgba(45,80,22,0.15)]",
      wisteria: "shadow-[0_4px_20px_rgba(139,109,181,0.2)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    hoverTranslate: "hover:-translate-y-1",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-serif tracking-wide",
    body: "font-serif",
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
      primary: "bg-[#f5f0e1]",
      secondary: "bg-[#e8dcc8]",
      accent: ["bg-[#2d5016]", "bg-[#c9a227]", "bg-[#8b6db5]"],
    },
    text: {
      primary: "text-[#2d5016]",
      secondary: "text-[#c9a227]",
      muted: "text-[#2d5016]/60",
    },
    button: {
      primary: "bg-[#2d5016] text-[#f5f0e1] border-2 border-[#c9a227]",
      secondary: "bg-[#f5f0e1] text-[#2d5016] border-2 border-[#2d5016]",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "bg-black", "bg-gray-900", "bg-[#0a0a1a]",
      "text-[#ff00ff]", "text-[#00ffff]",
      "shadow-[0_0_16px_rgba(255,0,255",
      "border-[#ff00ff]", "border-[#00ffff]",
      "uppercase",
      "font-bold tracking-widest",
    ],
    patterns: [
      "^bg-(?:black|gray-9|\\[#0a)",
      "^text-\\[#(?:ff00ff|00ffff)",
      "^shadow-\\[0_0_\\d+px_rgba\\((?:255,0,255|0,255,255)",
      "^border-\\[#(?:ff00ff|00ffff)",
    ],
    reasons: {
      "bg-black": "Art Nouveau uses warm ivory/cream backgrounds, not dark themes",
      "text-[#ff00ff]": "Art Nouveau uses natural greens and golds, not neon colors",
      "rounded-none": "Art Nouveau uses organic curves and rounded shapes",
      "uppercase": "Art Nouveau uses elegant serif typography, not bold uppercase",
    },
  },

  required: {
    button: [
      "rounded-full",
      "font-serif",
      "border-2 border-[#c9a227]",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-2xl",
      "bg-[#f5f0e1]",
      "border-2 border-[#c9a227]/60",
      "shadow-md",
    ],
    input: [
      "rounded-full",
      "border-2 border-[#c9a227]/40",
      "bg-[#f5f0e1]",
      "text-[#2d5016]",
      "focus:border-[#c9a227]",
      "focus:outline-none",
    ],
  },
};
