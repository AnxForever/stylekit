// Cyber Chinese Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const cyberChineseTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#d4553a]/40",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(212,85,58,0.3)] md:shadow-[0_0_12px_rgba(212,85,58,0.3)]",
    md: "shadow-[0_0_16px_rgba(212,85,58,0.4)] md:shadow-[0_0_20px_rgba(212,85,58,0.4)]",
    lg: "shadow-[0_0_24px_rgba(212,85,58,0.5)] md:shadow-[0_0_36px_rgba(212,85,58,0.5)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_24px_rgba(201,162,39,0.6)]",
    focus: "focus:shadow-[0_0_16px_rgba(0,212,255,0.5)]",
    colored: {
      vermilion: "shadow-[0_0_20px_rgba(212,85,58,0.5)]",
      gold: "shadow-[0_0_20px_rgba(201,162,39,0.5)]",
      neonBlue: "shadow-[0_0_20px_rgba(0,212,255,0.5)]",
      neonPurple: "shadow-[0_0_20px_rgba(160,32,240,0.5)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-wider",
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
      primary: "bg-[#0a0a0a]",
      secondary: "bg-[#0a0a0a]/90",
      accent: ["bg-[#d4553a]", "bg-[#c9a227]", "bg-[#00d4ff]", "bg-[#a020f0]"],
    },
    text: {
      primary: "text-[#c9a227]",
      secondary: "text-[#00d4ff]",
      muted: "text-[#d4553a]/70",
    },
    button: {
      primary: "bg-[#d4553a] text-white border border-[#c9a227]",
      secondary: "bg-[#0a0a0a] text-[#00d4ff] border border-[#00d4ff]/50",
      danger: "bg-[#a020f0] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "bg-white", "bg-gray-50", "bg-gray-100",
      "text-black",
      "bg-pink-", "bg-green-", "bg-amber-",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|3xl|full)$",
      "^bg-(?:white|gray-[1-3]|pink-|green-|amber-)",
      "^text-(?:black|gray-(?:[7-9]))",
      "^shadow-\\[\\d+px_\\d+px_0px",
    ],
    reasons: {
      "rounded-lg": "Cyber Chinese uses sharp angular corners (rounded-none) for a futuristic feel",
      "rounded-full": "Cyber Chinese avoids soft round shapes in favor of angular design",
      "bg-white": "Cyber Chinese uses dark backgrounds with neon and vermilion accents",
      "text-black": "Cyber Chinese uses colored neon text on dark backgrounds",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border border-[#c9a227]",
      "shadow-[0_0_16px_rgba(212,85,58,0.5)]",
      "transition-all duration-300 ease-in-out",
      "font-bold",
    ],
    card: [
      "rounded-none",
      "bg-[#0a0a0a]/90",
      "border border-[#d4553a]/40",
      "shadow-[0_0_16px_rgba(212,85,58,0.3)]",
    ],
    input: [
      "rounded-none",
      "border border-[#c9a227]/40",
      "bg-[#0a0a0a]/80",
      "text-[#00d4ff]",
      "focus:shadow-[0_0_16px_rgba(0,212,255,0.5)]",
      "focus:outline-none",
    ],
  },
};
