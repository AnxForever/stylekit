// Watercolor Art Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const watercolorArtTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#d4a0a0]/15",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_12px_rgba(212,160,160,0.08)]",
    md: "shadow-[0_4px_20px_rgba(212,160,160,0.12)]",
    lg: "shadow-[0_8px_32px_rgba(212,160,160,0.18)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_32px_rgba(212,160,160,0.18)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(212,160,160,0.10)]",
    colored: {
      rose: "shadow-[0_4px_20px_rgba(212,160,160,0.15)]",
      cerulean: "shadow-[0_4px_20px_rgba(123,184,212,0.15)]",
      sage: "shadow-[0_4px_20px_rgba(140,197,168,0.15)]",
      lavender: "shadow-[0_4px_20px_rgba(195,160,212,0.15)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-500 ease-in-out",
  },

  typography: {
    heading: "font-serif font-semibold tracking-wide",
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
    section: "py-16 md:py-24 lg:py-32",
    container: "px-6 md:px-12 lg:px-16",
    card: "p-6 md:p-8 lg:p-10",
    gap: {
      sm: "gap-4 md:gap-5",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#faf6f0]",
      secondary: "bg-[#f3ede4]",
      accent: [
        "bg-[#d4a0a0]/15",
        "bg-[#7bb8d4]/15",
        "bg-[#8cc5a8]/15",
        "bg-[#c3a0d4]/15",
      ],
    },
    text: {
      primary: "text-[#5a3e3e]",
      secondary: "text-[#d4a0a0]",
      muted: "text-[#5a3e3e]/40",
    },
    button: {
      primary:
        "bg-[#d4a0a0] text-[#5a3e3e] shadow-[0_4px_20px_rgba(212,160,160,0.25)]",
      secondary:
        "bg-[#7bb8d4]/70 text-[#2a4a5a] shadow-[0_4px_20px_rgba(123,184,212,0.20)]",
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
      "border-2",
      "border-4",
      "uppercase",
    ],
    patterns: [
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^font-mono$",
      "^bg-black$",
      "^border-[2-4]$",
      "^uppercase$",
    ],
    reasons: {
      "font-mono":
        "Watercolor Art uses serif fonts for elegance, not monospace",
      "bg-black":
        "Watercolor Art uses warm paper backgrounds (#faf6f0), never dark",
      "rounded-none":
        "Watercolor Art uses soft organic corners (2xl/3xl), never sharp edges",
      uppercase:
        "Watercolor Art uses elegant mixed-case, never aggressive uppercase",
      "border-2":
        "Watercolor Art uses delicate single-pixel borders with low opacity",
    },
  },

  required: {
    button: [
      "rounded-2xl",
      "font-serif",
      "transition-all duration-500 ease-in-out",
    ],
    card: [
      "rounded-3xl",
      "bg-[#faf6f0]",
      "border border-[#d4a0a0]/15",
    ],
    input: [
      "rounded-2xl",
      "border border-[#d4a0a0]/20",
      "bg-[#faf6f0]",
      "font-serif",
      "focus:outline-none",
    ],
  },
};
