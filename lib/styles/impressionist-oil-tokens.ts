// Impressionist Oil Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const impressionistOilTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#e8a87c]/30",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_0_#c0392b,0_3px_8px_rgba(232,168,124,0.2)]",
    md: "shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(232,168,124,0.3)]",
    lg: "shadow-[0_4px_0_#c0392b,0_6px_20px_rgba(232,168,124,0.35)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_4px_0_#c0392b,0_6px_16px_rgba(232,168,124,0.4)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(232,168,124,0.15)]",
    colored: {
      orange: "shadow-[0_3px_0_#e8a87c,0_4px_12px_rgba(232,168,124,0.3)]",
      vermillion: "shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(192,57,43,0.3)]",
      turquoise: "shadow-[0_3px_0_#1abc9c,0_4px_12px_rgba(26,188,156,0.3)]",
    },
  },

  interaction: {
    hoverScale: "hover:brightness-110",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:translate-y-[2px] active:shadow-[0_1px_0_#c0392b]",
  },

  typography: {
    heading: "font-serif font-bold tracking-wide",
    body: "font-serif",
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
    container: "px-5 md:px-10 lg:px-14",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-5 md:gap-7",
      lg: "gap-7 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f0e1]",
      secondary: "bg-[#ede5d0]",
      accent: ["bg-[#e8a87c]/15", "bg-[#c0392b]/10", "bg-[#1abc9c]/10"],
    },
    text: {
      primary: "text-[#2c3e50]",
      secondary: "text-[#e8a87c]",
      muted: "text-[#2c3e50]/50",
    },
    button: {
      primary: "bg-[#e8a87c] text-[#2c3e50] shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(232,168,124,0.3)]",
      secondary: "bg-[#2c3e50] text-[#f5f0e1] shadow-[0_3px_0_#1abc9c,0_4px_12px_rgba(44,62,80,0.3)]",
    },
  },

  forbidden: {
    classes: [
      "rounded-none", "rounded-sm",
      "shadow-[2px_2px_0px", "shadow-[3px_3px_0px", "shadow-[4px_4px_0px",
      "font-mono",
      "bg-black", "bg-[#0a0a1a]",
    ],
    patterns: [
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^font-mono$",
      "^bg-black$",
    ],
    reasons: {
      "font-mono": "Impressionist Oil uses serif fonts for artistic feel, not monospace",
      "bg-black": "Impressionist Oil uses warm canvas backgrounds, not dark ones",
      "rounded-none": "Impressionist Oil uses rounded-lg for soft painterly edges",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-serif font-bold",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-lg",
      "bg-[#f5f0e1]",
      "border border-[#e8a87c]/30",
    ],
    input: [
      "rounded-lg",
      "border-2 border-[#e8a87c]/30",
      "bg-[#f5f0e1]",
      "font-serif",
      "focus:outline-none",
    ],
  },
};
