// Y2K Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const y2kTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#c0c0c0]",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(255,105,180,0.3)] md:shadow-[0_4px_12px_rgba(255,105,180,0.3)]",
    md: "shadow-[0_4px_16px_rgba(255,105,180,0.4)] md:shadow-[0_6px_24px_rgba(255,105,180,0.4)]",
    lg: "shadow-[0_8px_32px_rgba(255,105,180,0.5)] md:shadow-[0_12px_48px_rgba(255,105,180,0.5)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_32px_rgba(192,192,192,0.6)]",
    focus: "focus:shadow-[0_4px_20px_rgba(255,105,180,0.5)]",
    colored: {
      pink: "shadow-[0_4px_20px_rgba(255,105,180,0.5)]",
      silver: "shadow-[0_4px_20px_rgba(192,192,192,0.5)]",
      blue: "shadow-[0_4px_20px_rgba(0,191,255,0.5)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-wide",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-10 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-7",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5]",
      secondary: "bg-[#c0c0c0]",
      accent: ["bg-[#ff69b4]", "bg-[#00bfff]", "bg-[#c0c0c0]", "bg-[#ff6ec7]"],
    },
    text: {
      primary: "text-[#333333]",
      secondary: "text-[#ff69b4]",
      muted: "text-[#808080]",
    },
    button: {
      primary: "bg-gradient-to-r from-[#ff69b4] to-[#ff6ec7] text-white",
      secondary: "bg-gradient-to-b from-[#e8e8e8] to-[#c0c0c0] text-[#333333]",
      danger: "bg-red-500 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none", "rounded-sm",
      "border-black", "border-4",
      "bg-[#1a1a2e]", "bg-black",
      "text-black",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px",
      "font-black", "font-mono",
      "bg-amber-", "bg-stone-", "bg-yellow-900",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^bg-amber-",
      "^bg-stone-",
      "^bg-yellow-(?:[7-9])",
      "^text-amber-",
    ],
    reasons: {
      "rounded-none": "Y2K uses bubble-like rounded shapes (rounded-2xl or rounded-full)",
      "border-black": "Y2K uses metallic silver borders, not solid black",
      "shadow-[4px_4px_0px": "Y2K uses soft metallic/pink glowing shadows, not hard-edge",
      "bg-amber-700": "Y2K avoids muted earth tones, uses pinks and silvers",
    },
  },

  required: {
    button: [
      "rounded-2xl",
      "border-2 border-[#c0c0c0]",
      "shadow-[0_4px_16px_rgba(255,105,180,0.4)]",
      "hover:scale-105",
      "transition-all duration-300 ease-out",
      "font-bold",
    ],
    card: [
      "rounded-2xl",
      "border-2 border-[#c0c0c0]",
      "shadow-[0_4px_16px_rgba(255,105,180,0.4)]",
      "bg-white/80",
    ],
    input: [
      "rounded-2xl",
      "border-2 border-[#c0c0c0]",
      "bg-white",
      "focus:shadow-[0_4px_20px_rgba(255,105,180,0.5)]",
      "focus:outline-none",
    ],
  },
};
