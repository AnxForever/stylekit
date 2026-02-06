// Watercolor Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const watercolorStyleTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#4a6fa5]/20",
    radius: "rounded-2xl md:rounded-3xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_10px_rgba(74,111,165,0.1)]",
    md: "shadow-[0_4px_20px_rgba(74,111,165,0.12)]",
    lg: "shadow-[0_8px_30px_rgba(74,111,165,0.15)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_30px_rgba(74,111,165,0.2)]",
    focus: "focus:shadow-[0_4px_20px_rgba(74,111,165,0.15)]",
    colored: {
      blue: "shadow-[0_4px_20px_rgba(74,111,165,0.15)]",
      rose: "shadow-[0_4px_20px_rgba(180,120,140,0.15)]",
      sage: "shadow-[0_4px_20px_rgba(120,160,130,0.15)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    transition: "transition-all duration-400 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-serif font-light tracking-wide",
    body: "font-sans font-light",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-3xl",
      h3: "text-lg md:text-xl",
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
      primary: "bg-[#faf8f5]",
      secondary: "bg-[#f0ebe3]",
      accent: ["bg-[#4a6fa5]/20", "bg-[#b4788c]/20", "bg-[#78a082]/20", "bg-[#c9a84c]/20"],
    },
    text: {
      primary: "text-[#3a3a3a]",
      secondary: "text-[#4a6fa5]",
      muted: "text-[#8a8a8a]",
    },
    button: {
      primary: "bg-[#4a6fa5]/80 text-white",
      secondary: "bg-[#faf8f5] text-[#4a6fa5] border border-[#4a6fa5]/30",
      danger: "bg-[#b4788c]/80 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "border-black", "border-2", "border-4",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px", "shadow-[8px_8px_0px",
      "font-black", "font-bold",
      "bg-black", "bg-[#1a1a1a]",
      "text-black",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^border-(?:black|2|4)$",
      "^font-(?:black|bold)$",
      "^bg-(?:black|\\[#1a1a)",
    ],
    reasons: {
      "rounded-none": "Watercolor uses soft rounded shapes (rounded-2xl to rounded-3xl)",
      "border-4": "Watercolor uses thin delicate borders, not thick heavy borders",
      "shadow-[4px_4px_0px": "Watercolor uses soft diffused shadows, not hard-edge",
      "font-black": "Watercolor uses light/regular font weights for a delicate feel",
    },
  },

  required: {
    button: [
      "rounded-2xl",
      "shadow-[0_4px_20px_rgba(74,111,165,0.12)]",
      "hover:scale-[1.02]",
      "transition-all duration-400 ease-out",
      "font-light",
    ],
    card: [
      "rounded-2xl md:rounded-3xl",
      "border border-[#4a6fa5]/20",
      "shadow-[0_4px_20px_rgba(74,111,165,0.12)]",
      "bg-[#faf8f5]",
    ],
    input: [
      "rounded-2xl",
      "border border-[#4a6fa5]/20",
      "bg-white/60",
      "font-light",
      "focus:shadow-[0_4px_20px_rgba(74,111,165,0.15)]",
      "focus:outline-none",
    ],
  },
};
