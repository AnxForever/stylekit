// Indian Festive Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const indianFestiveTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#d4af37]/50",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(212,175,55,0.15)]",
    md: "shadow-[0_4px_16px_rgba(212,175,55,0.2)]",
    lg: "shadow-[0_8px_28px_rgba(212,175,55,0.3)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_28px_rgba(212,175,55,0.5)]",
    focus: "focus:shadow-[0_0_16px_rgba(212,175,55,0.4)]",
    colored: {
      gold: "shadow-[0_0_20px_rgba(212,175,55,0.4)]",
      vermillion: "shadow-[0_0_20px_rgba(230,57,70,0.4)]",
      saffron: "shadow-[0_0_20px_rgba(255,159,28,0.4)]",
      purple: "shadow-[0_0_20px_rgba(123,45,142,0.4)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-wide text-[#7b2d8e]",
    body: "font-sans",
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
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fff8e7]",
      secondary: "bg-[#fff8e7]/80",
      accent: [
        "bg-[#e63946]",
        "bg-[#ff9f1c]",
        "bg-[#7b2d8e]",
        "bg-[#2a9d8f]",
        "bg-[#d4af37]",
      ],
    },
    text: {
      primary: "text-[#7b2d8e]",
      secondary: "text-[#e63946]",
      muted: "text-[#7b2d8e]/60",
    },
    button: {
      primary: "bg-[#e63946] text-white border-2 border-[#d4af37]",
      secondary:
        "bg-[#fff8e7] text-[#7b2d8e] border-2 border-[#d4af37]/50",
      danger: "bg-[#7b2d8e] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "bg-black",
      "bg-[#000]",
      "bg-gray-100",
      "bg-gray-50",
      "bg-slate-50",
      "bg-slate-100",
      "text-[#00ffff]",
      "text-[#ff00ff]",
      "border-[#00ffff]",
      "shadow-[0_0_16px_rgba(0,255,255",
    ],
    patterns: [
      "^rounded-none$",
      "^bg-(?:black|slate-[1-2]|gray-[1-2])",
      "^text-\\[#(?:00ffff|ff00ff)\\]",
    ],
    reasons: {
      "rounded-none":
        "Indian Festive uses rounded corners (rounded-xl) for warmth",
      "bg-black":
        "Indian Festive uses warm ivory backgrounds, not dark ones",
      "bg-gray-100":
        "Indian Festive avoids cold gray tones in favor of warm whites",
      "text-[#00ffff]":
        "Indian Festive uses jewel tones, not neon cyber colors",
    },
  },

  required: {
    button: [
      "rounded-xl",
      "border-2 border-[#d4af37]",
      "shadow-[0_0_16px_rgba(212,175,55,0.4)]",
      "font-bold tracking-wide",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-xl",
      "bg-[#fff8e7]",
      "border-2 border-[#d4af37]/50",
      "shadow-[0_4px_20px_rgba(212,175,55,0.2)]",
    ],
    input: [
      "rounded-xl",
      "border-2 border-[#d4af37]/30",
      "bg-[#fff8e7]",
      "text-[#7b2d8e]",
      "focus:border-[#d4af37]",
      "focus:shadow-[0_0_16px_rgba(212,175,55,0.4)]",
      "focus:outline-none",
    ],
  },
});
