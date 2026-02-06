// Impressionist Oil Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const impressionistOilTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#e8a87c]/25",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_0_rgba(192,57,43,0.10),0_3px_8px_rgba(232,168,124,0.15)]",
    md: "shadow-[0_3px_0_rgba(192,57,43,0.12),0_5px_16px_rgba(232,168,124,0.20)]",
    lg: "shadow-[0_4px_0_rgba(192,57,43,0.15),0_8px_24px_rgba(44,62,80,0.12)]",
    none: "shadow-none",
    hover:
      "hover:shadow-[0_4px_0_rgba(192,57,43,0.15),0_10px_28px_rgba(44,62,80,0.12)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(232,168,124,0.12)]",
    colored: {
      orange:
        "shadow-[0_4px_0_#c0392b,0_6px_16px_rgba(232,168,124,0.30)]",
      vermillion:
        "shadow-[0_4px_0_#2c3e50,0_6px_16px_rgba(192,57,43,0.30)]",
      blue: "shadow-[0_4px_0_#1abc9c,0_6px_16px_rgba(44,62,80,0.30)]",
      turquoise:
        "shadow-[0_3px_0_rgba(26,188,156,0.15),0_6px_16px_rgba(26,188,156,0.10)]",
    },
  },

  interaction: {
    hoverScale: "hover:brightness-110",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:translate-y-[2px]",
  },

  typography: {
    heading: "font-serif font-bold tracking-wide",
    body: "font-serif",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-14 md:py-20 lg:py-28",
    container: "px-6 md:px-10 lg:px-14",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4 md:gap-5",
      md: "gap-5 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f0e1]",
      secondary: "bg-[#ede5d0]",
      accent: [
        "bg-[#e8a87c]/15",
        "bg-[#c0392b]/10",
        "bg-[#1abc9c]/10",
        "bg-[#f5d88a]/10",
      ],
    },
    text: {
      primary: "text-[#2c3e50]",
      secondary: "text-[#e8a87c]",
      muted: "text-[#2c3e50]/45",
    },
    button: {
      primary:
        "text-[#2c3e50] shadow-[0_4px_0_#c0392b,0_6px_16px_rgba(232,168,124,0.30)]",
      secondary:
        "text-[#f5f0e1] shadow-[0_4px_0_#1abc9c,0_6px_16px_rgba(44,62,80,0.30)]",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "rounded-sm",
      "shadow-[2px_2px_0px",
      "shadow-[3px_3px_0px",
      "shadow-[4px_4px_0px",
      "font-mono",
      "bg-black",
      "bg-[#0a0a1a]",
      "uppercase",
      "rounded-full",
    ],
    patterns: [
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^font-mono$",
      "^bg-black$",
      "^uppercase$",
      "^rounded-full$",
    ],
    reasons: {
      "font-mono":
        "Impressionist Oil uses serif fonts for artistic painterly feel",
      "bg-black":
        "Impressionist Oil uses warm canvas backgrounds (#f5f0e1), never dark",
      "rounded-none":
        "Impressionist Oil uses rounded-lg for soft painterly edges",
      uppercase:
        "Impressionist Oil uses elegant mixed-case serif, never aggressive uppercase",
      "rounded-full":
        "Impressionist Oil uses rounded-lg, not fully circular shapes",
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
      "border border-[#e8a87c]/25",
    ],
    input: [
      "rounded-lg",
      "border-2 border-[#e8a87c]/25",
      "bg-[#f5f0e1]",
      "font-serif",
      "focus:outline-none",
    ],
  },
};
