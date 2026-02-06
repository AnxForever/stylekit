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
    hover: "hover:shadow-lg",
    focus: "focus:shadow-[0_0_12px_#6366f120]",
    colored: {
      indigo: "shadow-[0_0_15px_#6366f115]",
      pink: "shadow-[0_0_15px_#ec489915]",
      emerald: "shadow-[0_0_15px_#10b98115]",
    },
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-1",
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
      primary: "bg-[#6366f1] text-white shadow-sm hover:bg-[#6366f1]/90 hover:shadow-[0_0_15px_#6366f130]",
      secondary: "bg-white/50 text-[#4a5568] backdrop-blur-sm border border-[#6366f1]/25",
      danger: "bg-[#ec4899] text-white",
    },
  },

  forbidden: {
    classes: [
      "border-4", "border-8",
      "rounded-none",
      "font-mono",
      "shadow-[3px_0_", "shadow-[0_0_30px",
      "bg-[#0a0a0a]", "bg-black",
      "text-[#00ffff]", "text-[#ff00ff]",
      "uppercase tracking-widest",
    ],
    patterns: [
      "^border-(?:4|8)$",
      "^rounded-none$",
      "^font-mono$",
      "^shadow-\\[\\d+px_0_#",
      "^bg-(?:black|\\[#0a0a0a\\])$",
      "^text-\\[#(?:00ffff|ff00ff)\\]$",
    ],
    reasons: {
      "border-4": "Visual Novel uses subtle, thin borders for its elegant aesthetic",
      "rounded-none": "Visual Novel uses rounded-lg for soft UI panels, never sharp edges",
      "font-mono": "Visual Novel uses serif for narrative text and sans-serif for UI, not monospace",
      "bg-black": "Visual Novel uses light or semi-transparent dark backgrounds, never pure black",
      "uppercase tracking-widest": "Visual Novel uses natural case text, not terminal-style uppercase",
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
      "backdrop-blur-md",
      "border",
    ],
    input: [
      "rounded-lg",
      "border",
      "font-sans",
      "backdrop-blur-sm",
      "focus:outline-none",
    ],
  },
};
