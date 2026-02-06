// Visual Novel Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const visualNovelTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#4a5568]/10",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:shadow-[0_0_12px_#6366f120]",
    colored: {
      indigo: "shadow-[0_0_15px_#6366f115]",
      pink: "shadow-[0_0_15px_#ec489915]",
      emerald: "shadow-[0_0_15px_#10b98115]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-serif font-medium",
    body: "font-sans leading-relaxed",
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
      primary: "bg-[#f7fafc]",
      secondary: "bg-white/70",
      accent: ["bg-[#6366f1]", "bg-[#ec4899]", "bg-[#10b981]"],
    },
    text: {
      primary: "text-[#4a5568]",
      secondary: "text-[#6366f1]",
      muted: "text-[#4a5568]/50",
    },
    button: {
      primary: "bg-[#6366f1] text-white shadow-sm",
      secondary: "bg-white/80 text-[#4a5568] backdrop-blur-sm",
      danger: "bg-[#ec4899] text-white",
    },
  },

  forbidden: {
    classes: [
      "border-4", "border-8",
      "rounded-none", "rounded-sm",
      "font-mono",
      "shadow-[0_0_20px", "shadow-[0_0_30px",
      "bg-[#0a0a0a]", "bg-black",
    ],
    patterns: [
      "^border-(?:4|8)$",
      "^rounded-(?:none|sm)$",
      "^shadow-\\[0_0_(?:20|30)px",
      "^bg-(?:black|\\[#0a0a0a\\])$",
    ],
    reasons: {
      "border-4": "Visual Novel uses subtle, thin borders only",
      "rounded-none": "Visual Novel uses rounded-lg for a soft UI feel",
      "font-mono": "Visual Novel uses sans-serif for UI and serif for narrative, not monospace",
      "bg-black": "Visual Novel uses light or semi-transparent backgrounds",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-sans font-medium",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-lg",
      "bg-white/70",
      "border border-[#4a5568]/10",
      "backdrop-blur-md",
    ],
    input: [
      "rounded-lg",
      "border border-[#4a5568]/20",
      "bg-white/70",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
