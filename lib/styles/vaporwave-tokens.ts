// Vaporwave Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const vaporwaveTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#ff71ce]/50",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(255,113,206,0.4)] md:shadow-[0_0_12px_rgba(255,113,206,0.4)]",
    md: "shadow-[0_0_16px_rgba(255,113,206,0.5)] md:shadow-[0_0_24px_rgba(255,113,206,0.5)]",
    lg: "shadow-[0_0_24px_rgba(255,113,206,0.6)] md:shadow-[0_0_40px_rgba(255,113,206,0.6)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_32px_rgba(1,205,254,0.7)]",
    focus: "focus:shadow-[0_0_20px_rgba(1,205,254,0.6)]",
    colored: {
      pink: "shadow-[0_0_20px_rgba(255,113,206,0.6)]",
      cyan: "shadow-[0_0_20px_rgba(1,205,254,0.6)]",
      purple: "shadow-[0_0_20px_rgba(185,103,255,0.6)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-wide",
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
      primary: "bg-[#1a0a2e]",
      secondary: "bg-[#16082a]",
      accent: ["bg-[#ff71ce]", "bg-[#01cdfe]", "bg-[#b967ff]", "bg-[#05ffa1]"],
    },
    text: {
      primary: "text-[#ff71ce]",
      secondary: "text-[#01cdfe]",
      muted: "text-[#b967ff]/70",
    },
    button: {
      primary: "bg-gradient-to-r from-[#ff71ce] to-[#b967ff] text-white",
      secondary: "bg-[#01cdfe]/20 text-[#01cdfe] border border-[#01cdfe]/50",
      danger: "bg-red-500/80 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "border-black", "border-2", "border-4",
      "bg-white", "bg-gray-50", "bg-gray-100",
      "text-black", "text-gray-900", "text-gray-800",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px", "shadow-[8px_8px_0px",
      "font-black",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^bg-gray-(?:[1-4])",
      "^text-gray-(?:[7-9])",
    ],
    reasons: {
      "rounded-none": "Vaporwave uses soft rounded shapes (rounded-xl or higher)",
      "border-black": "Vaporwave uses neon-colored translucent borders, not solid black",
      "shadow-[4px_4px_0px_0px": "Vaporwave uses glow shadows (0_0_Xpx_rgba), not hard-edge",
      "bg-white": "Vaporwave uses dark backgrounds with neon accents",
    },
  },

  required: {
    button: [
      "rounded-xl",
      "shadow-[0_0_16px_rgba(255,113,206,0.5)]",
      "hover:shadow-[0_0_32px_rgba(1,205,254,0.7)]",
      "transition-all duration-300 ease-in-out",
      "font-bold",
    ],
    card: [
      "rounded-xl",
      "bg-[#1a0a2e]/80",
      "border border-[#ff71ce]/50",
      "shadow-[0_0_16px_rgba(255,113,206,0.5)]",
    ],
    input: [
      "rounded-xl",
      "border border-[#b967ff]/50",
      "bg-[#1a0a2e]/60",
      "text-[#01cdfe]",
      "focus:shadow-[0_0_20px_rgba(1,205,254,0.6)]",
      "focus:outline-none",
    ],
  },
};
