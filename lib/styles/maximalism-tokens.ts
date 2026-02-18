// Maximalism Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const maximalismTokens = createStyleTokens({
  border: {
    width: "border-4",
    color: "border-[#d4145a]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[3px_3px_0px_#ffbe0b]",
    md: "shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff]",
    lg: "shadow-[6px_6px_0px_#ffbe0b,12px_12px_0px_#3a86ff]",
    none: "shadow-none",
    hover: "hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#3a86ff]",
    focus: "focus:shadow-[0_0_0_4px_rgba(212,20,90,0.3)]",
    colored: {
      pink: "shadow-[4px_4px_0px_#d4145a]",
      yellow: "shadow-[4px_4px_0px_#ffbe0b]",
      blue: "shadow-[4px_4px_0px_#3a86ff]",
      purple: "shadow-[4px_4px_0px_#8338ec]",
      emerald: "shadow-[4px_4px_0px_#06d6a0]",
    },
  },

  interaction: {
    hoverTranslate:
      "hover:translate-x-[2px] hover:translate-y-[2px]",
    transition: "transition-all duration-200",
    active:
      "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  },

  typography: {
    heading: "font-serif font-black uppercase tracking-widest",
    body: "font-sans",
    mono: "font-mono text-xs uppercase tracking-[0.3em]",
    sizes: {
      hero: "text-6xl md:text-8xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-14 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1a0a2e]",
      secondary: "bg-[#d4145a]",
      accent: [
        "bg-[#ffbe0b]",
        "bg-[#3a86ff]",
        "bg-[#8338ec]",
        "bg-[#06d6a0]",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#ffbe0b]",
      muted: "text-[#8338ec]/70",
    },
    button: {
      primary:
        "bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff]",
      secondary:
        "bg-transparent text-[#06d6a0] border-4 border-[#06d6a0] shadow-[4px_4px_0px_#06d6a0]",
      danger:
        "bg-[#d4145a] text-white border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b]",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "text-gray-300",
      "text-gray-400",
      "text-gray-500",
      "border",
      "border-[1px]",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
    ],
    patterns: [
      "^bg-(?:white|gray-(?:50|100|200))$",
      "^text-gray-[2-5]",
      "^border$",
      "^border-\\[1px\\]$",
      "^shadow-(?:sm|md|lg|xl)$",
    ],
    reasons: {
      "bg-white": "Maximalism uses deep navy #1a0a2e, never plain white backgrounds",
      "text-gray-400": "Maximalism uses saturated accent colors, not muted grays",
      "border": "Maximalism requires thick borders (border-4), never thin 1px",
      "shadow-md": "Maximalism uses hard multi-layer offset shadows, not soft blur shadows",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "font-black uppercase tracking-widest",
      "border-4",
      "transition-all duration-200",
    ],
    card: [
      "rounded-sm",
      "bg-[#1a0a2e]",
      "border-4 border-[#d4145a]",
    ],
    input: [
      "rounded-sm",
      "border-4 border-[#8338ec]",
      "bg-[#1a0a2e]",
      "text-white",
      "focus:outline-none",
    ],
  },
});
