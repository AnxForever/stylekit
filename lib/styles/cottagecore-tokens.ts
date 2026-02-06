// Cottagecore Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const cottagecoreTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#d4a0a0]/40",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-lg",
    focus: "focus:shadow-[0_0_12px_rgba(90,143,90,0.2)]",
    colored: {
      green: "shadow-[0_4px_12px_rgba(90,143,90,0.2)]",
      pink: "shadow-[0_4px_12px_rgba(212,160,160,0.3)]",
      brown: "shadow-[0_4px_12px_rgba(139,115,85,0.2)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-serif text-[#8b7355]",
    body: "font-serif",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
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
      primary: "bg-[#faf6f0]",
      secondary: "bg-[#f5d75f]/10",
      accent: ["bg-[#5a8f5a]", "bg-[#f5d75f]", "bg-[#8b7355]", "bg-[#d4a0a0]"],
    },
    text: {
      primary: "text-[#8b7355]",
      secondary: "text-[#5a8f5a]",
      muted: "text-[#8b7355]/60",
    },
    button: {
      primary: "bg-[#5a8f5a] text-white",
      secondary: "bg-[#f5d75f]/20 text-[#8b7355] border border-[#8b7355]/40",
      danger: "bg-[#d4a0a0] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "bg-[#0a0a1a]", "bg-[#0a0a0f]", "bg-black",
      "text-[#00ffff]", "text-[#ff00ff]",
      "border-[#ff00ff]", "border-[#00ffff]",
      "shadow-[0_0_16px_rgba(255,0,255", "shadow-[0_0_20px_rgba(0,255,255",
      "font-mono",
      "tracking-widest", "uppercase",
    ],
    patterns: [
      "^bg-(?:black|\\[#0[0-9a-f]{5}\\])",
      "^text-(?:\\[#(?:00ffff|ff00ff)\\])",
      "^shadow-\\[0_0_\\d+px_rgba\\((?:255,0,255|0,255,255)",
    ],
    reasons: {
      "rounded-none": "Cottagecore uses soft, rounded shapes (rounded-2xl, rounded-full)",
      "bg-black": "Cottagecore uses warm cream/linen backgrounds, not dark ones",
      "font-mono": "Cottagecore uses serif fonts for a classical feel",
      "uppercase": "Cottagecore prefers natural case text, not industrial uppercase",
    },
  },

  required: {
    button: [
      "rounded-full",
      "font-serif",
      "shadow-md",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-2xl",
      "bg-[#faf6f0]",
      "border border-[#d4a0a0]/40",
      "shadow-md",
    ],
    input: [
      "rounded-xl",
      "border border-[#8b7355]/30",
      "bg-[#faf6f0]",
      "text-[#8b7355]",
      "font-serif",
      "focus:outline-none",
    ],
  },
};
