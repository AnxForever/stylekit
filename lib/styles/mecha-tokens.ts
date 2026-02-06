// Mecha Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const mechaTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#4a5c3a]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_rgba(251,191,36,0.3)]",
    md: "shadow-[4px_4px_0px_rgba(251,191,36,0.3)]",
    lg: "shadow-[6px_6px_0px_rgba(251,191,36,0.4)]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_6px_0px_rgba(251,191,36,0.5)]",
    focus: "focus:shadow-[0_0_8px_rgba(251,191,36,0.4)]",
    colored: {
      yellow: "shadow-[4px_4px_0px_rgba(251,191,36,0.4)]",
      red: "shadow-[4px_4px_0px_rgba(239,68,68,0.4)]",
      green: "shadow-[4px_4px_0px_rgba(74,92,58,0.4)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-200 ease-in-out",
    active: "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-widest",
    body: "font-mono",
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
      primary: "bg-[#1a2744]",
      secondary: "bg-[#4a5c3a]",
      accent: ["bg-[#fbbf24]", "bg-[#ef4444]"],
    },
    text: {
      primary: "text-[#fbbf24]",
      secondary: "text-[#4a5c3a]",
      muted: "text-[#4a5c3a]/70",
    },
    button: {
      primary: "bg-[#fbbf24] text-[#1a2744] border-2 border-[#1a2744]",
      secondary: "bg-[#4a5c3a] text-[#fbbf24] border-2 border-[#fbbf24]/50",
      danger: "bg-[#ef4444] text-white border-2 border-[#ef4444]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-white", "bg-[#faf6f0]", "bg-[#fffbf0]",
      "font-serif",
      "text-[#ff00ff]", "text-[#00ffff]",
      "shadow-md", "shadow-lg",
      "backdrop-blur",
      "bg-pink-", "bg-rose-", "text-pink-",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|full)$",
      "^bg-(?:white|pink-|rose-)",
      "^font-serif$",
      "^shadow-(?:md|lg|xl)$",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-lg": "Mecha uses sharp angular shapes (rounded-none) for an industrial feel",
      "bg-white": "Mecha uses dark backgrounds (navy, green) for a military aesthetic",
      "font-serif": "Mecha uses monospace fonts for a technical/military look",
      "shadow-md": "Mecha uses hard-edge offset shadows, not soft ones",
      "backdrop-blur": "Mecha style is opaque and solid, no transparency effects",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-mono font-bold uppercase tracking-widest",
      "border-2",
      "transition-all duration-200 ease-in-out",
    ],
    card: [
      "rounded-none",
      "bg-[#1a2744]",
      "border-2 border-[#4a5c3a]",
      "shadow-[4px_4px_0px_rgba(251,191,36,0.3)]",
    ],
    input: [
      "rounded-none",
      "border-2 border-[#4a5c3a]",
      "bg-[#1a2744]/80",
      "text-[#fbbf24]",
      "font-mono",
      "focus:outline-none",
    ],
  },
};
