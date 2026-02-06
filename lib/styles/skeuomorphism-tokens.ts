// Skeuomorphism Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const skeuomorphismTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#a89880]",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]",
    md: "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
    lg: "shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]",
    focus: "focus:shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
    colored: {
      brown: "shadow-[0_3px_6px_rgba(139,115,85,0.3),0_3px_6px_rgba(139,115,85,0.2)]",
      dark: "shadow-[0_3px_6px_rgba(0,0,0,0.25),0_3px_6px_rgba(0,0,0,0.2)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-px",
    transition: "transition-all duration-200 ease-out",
    active: "active:translate-y-px",
  },

  typography: {
    heading: "font-sans font-bold",
    body: "font-sans",
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
    section: "py-10 md:py-16 lg:py-24",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-3 md:gap-5",
      lg: "gap-5 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-gradient-to-b from-[#e8dfd1] to-[#d4c4a8]",
      secondary: "bg-[#8b7355]",
      accent: ["bg-[#b8a88a]", "bg-[#6b5b45]", "bg-[#c9b896]", "bg-[#a0926e]"],
    },
    text: {
      primary: "text-[#3a2f22]",
      secondary: "text-[#6b5b45]",
      muted: "text-[#8b7355]",
    },
    button: {
      primary: "bg-gradient-to-b from-[#b8a88a] to-[#8b7355] text-white",
      secondary: "bg-gradient-to-b from-[#e8dfd1] to-[#d4c4a8] text-[#3a2f22]",
      danger: "bg-gradient-to-b from-[#c0392b] to-[#962d22] text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-white", "bg-black",
      "border-black", "border-4",
      "shadow-[2px_2px_0px", "shadow-[4px_4px_0px", "shadow-[8px_8px_0px",
      "rounded-none",
      "font-black",
    ],
    patterns: [
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^rounded-none$",
      "^bg-(?:white|black)$",
      "^border-(?:black|4)$",
    ],
    reasons: {
      "shadow-[4px_4px_0px": "Skeuomorphism uses realistic multi-layer blurred shadows, not hard-edge",
      "rounded-none": "Skeuomorphism uses moderate rounding (rounded-lg) for realistic surfaces",
      "bg-white": "Skeuomorphism uses textured gradient backgrounds, not flat colors",
      "border-black": "Skeuomorphism uses subtle tonal borders matching the surface material",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "border border-[#a89880]",
      "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
      "hover:-translate-y-px",
      "transition-all duration-200 ease-out",
      "font-bold",
    ],
    card: [
      "rounded-lg",
      "border border-[#a89880]",
      "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
      "bg-gradient-to-b from-[#e8dfd1] to-[#d4c4a8]",
    ],
    input: [
      "rounded-lg",
      "border border-[#a89880]",
      "bg-[#f5efe6]",
      "font-sans",
      "focus:shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
      "focus:outline-none",
    ],
  },
};
