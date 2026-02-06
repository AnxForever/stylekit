// Watercolor Art Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const watercolorArtTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#d4a0a0]/20",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_8px_rgba(212,160,160,0.15)]",
    md: "shadow-[0_2px_12px_rgba(212,160,160,0.2)]",
    lg: "shadow-[0_4px_24px_rgba(212,160,160,0.25)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_6px_24px_rgba(212,160,160,0.3)]",
    focus: "focus:shadow-[0_0_12px_rgba(212,160,160,0.2)]",
    colored: {
      blush: "shadow-[0_2px_16px_rgba(212,160,160,0.2)]",
      sky: "shadow-[0_2px_16px_rgba(135,206,235,0.2)]",
      mint: "shadow-[0_2px_16px_rgba(152,216,200,0.2)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300 ease-in-out",
  },

  typography: {
    heading: "font-serif font-semibold tracking-wide",
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
    container: "px-5 md:px-10 lg:px-16",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-5 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#faf8f5]",
      secondary: "bg-[#f5f0eb]",
      accent: ["bg-[#d4a0a0]/20", "bg-[#87ceeb]/20", "bg-[#98d8c8]/20", "bg-[#c3b1e1]/20"],
    },
    text: {
      primary: "text-[#4a3535]",
      secondary: "text-[#d4a0a0]",
      muted: "text-[#4a3535]/50",
    },
    button: {
      primary: "bg-[#d4a0a0]/70 text-[#4a3535] shadow-[0_2px_12px_rgba(212,160,160,0.3)]",
      secondary: "bg-[#87ceeb]/50 text-[#2a4a5a] shadow-[0_2px_12px_rgba(135,206,235,0.3)]",
    },
  },

  forbidden: {
    classes: [
      "rounded-none", "rounded-sm",
      "shadow-[2px_2px_0px", "shadow-[3px_3px_0px", "shadow-[4px_4px_0px",
      "font-mono",
      "bg-black", "bg-[#0a0a1a]",
      "border-2", "border-4",
      "uppercase",
    ],
    patterns: [
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^font-mono$",
      "^bg-black$",
      "^border-[2-4]$",
    ],
    reasons: {
      "font-mono": "Watercolor Art uses serif fonts for elegance, not monospace",
      "bg-black": "Watercolor Art uses warm paper backgrounds, not dark ones",
      "rounded-none": "Watercolor Art uses soft rounded corners (xl/2xl), not sharp edges",
      "uppercase": "Watercolor Art uses elegant case, not aggressive uppercase",
    },
  },

  required: {
    button: [
      "rounded-xl",
      "font-serif",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-2xl",
      "bg-[#faf8f5]",
      "border border-[#d4a0a0]/20",
    ],
    input: [
      "rounded-xl",
      "border border-[#d4a0a0]/30",
      "bg-[#faf8f5]",
      "font-serif",
      "focus:outline-none",
    ],
  },
};
