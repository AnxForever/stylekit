// Magic Circle Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const magicCircleTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#fbbf24]/15",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(251,191,36,0.1)]",
    md: "shadow-[0_0_20px_rgba(251,191,36,0.2)]",
    lg: "shadow-[0_0_30px_rgba(251,191,36,0.3)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]",
    focus: "focus:shadow-[0_0_15px_rgba(251,191,36,0.2)]",
    colored: {
      gold: "shadow-[0_0_20px_rgba(251,191,36,0.2)]",
      indigo: "shadow-[0_0_20px_rgba(129,140,248,0.2)]",
      silver: "shadow-[0_0_20px_rgba(226,232,240,0.15)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-1",
    transition: "transition-all duration-500 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-serif font-bold tracking-wide",
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
    section: "py-14 md:py-24 lg:py-32",
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
      primary: "bg-[#0a0920]",
      secondary: "bg-[#1e1b4b]",
      accent: ["bg-[#fbbf24]", "bg-[#818cf8]", "bg-[#e2e8f0]"],
    },
    text: {
      primary: "text-[#e2e8f0]",
      secondary: "text-[#fbbf24]",
      muted: "text-[#e2e8f0]/40",
    },
    button: {
      primary: "bg-[#1e1b4b] text-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.2)]",
      secondary: "bg-[#0a0920] text-[#e2e8f0] border-[#818cf8]/30 shadow-[0_0_15px_rgba(129,140,248,0.2)]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full", "rounded-2xl", "rounded-xl", "rounded-lg",
      "bg-white", "bg-gray-50",
      "border-4", "border-8",
      "shadow-md", "shadow-lg", "shadow-xl",
      "bg-[#00ff00]", "bg-[#ff00ff]",
    ],
    patterns: [
      "^rounded-(?:full|2xl|xl|lg)$",
      "^bg-(?:white|gray-(?:50|100))$",
      "^border-(?:4|8)$",
      "^shadow-(?:md|lg|xl)$",
    ],
    reasons: {
      "rounded-full": "Magic Circle uses rounded-sm only for refined elegance",
      "bg-white": "Magic Circle requires deep dark backgrounds for mystical atmosphere",
      "border-4": "Magic Circle uses thin elegant borders only",
      "shadow-md": "Use radiant glow-style shadows instead of soft drop shadows",
    },
  },

  required: {
    button: [
      "font-serif font-semibold tracking-wide",
      "border border-[#fbbf24]/30",
      "rounded-sm",
      "transition-all duration-500 ease-in-out",
    ],
    card: [
      "bg-[#0a0920]",
      "border border-[#fbbf24]/15",
      "rounded-sm",
      "transition-all duration-500 ease-in-out",
    ],
    input: [
      "bg-[#0a0920]",
      "border border-[#fbbf24]/15",
      "rounded-sm",
      "text-[#e2e8f0]",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
