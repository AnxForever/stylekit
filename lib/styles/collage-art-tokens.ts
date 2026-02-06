// Collage Art Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const collageArtTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#2d2d2d]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[3px_3px_0px_#2d2d2d]",
    md: "shadow-[5px_5px_0px_#2d2d2d]",
    lg: "shadow-[7px_7px_0px_#2d2d2d]",
    none: "shadow-none",
    hover: "hover:shadow-[7px_7px_0px_#2d2d2d]",
    focus: "focus:shadow-[3px_3px_0px_#2d2d2d]",
    colored: {
      red: "shadow-[5px_5px_0px_#e74c3c]",
      blue: "shadow-[5px_5px_0px_#3498db]",
      yellow: "shadow-[5px_5px_0px_#f39c12]",
      purple: "shadow-[5px_5px_0px_#9b59b6]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[1px] hover:translate-y-[1px]",
    transition: "transition-all duration-200 ease-in-out",
    active: "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  },

  typography: {
    heading: "font-serif font-bold uppercase tracking-wider",
    body: "font-sans",
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
      primary: "bg-[#f5f0e8]",
      secondary: "bg-[#ebe4d8]",
      accent: ["bg-[#e74c3c]", "bg-[#3498db]", "bg-[#f39c12]", "bg-[#9b59b6]"],
    },
    text: {
      primary: "text-[#2d2d2d]",
      secondary: "text-[#e74c3c]",
      muted: "text-[#2d2d2d]/60",
    },
    button: {
      primary: "bg-[#e74c3c] text-white border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d]",
      secondary: "bg-[#3498db] text-white border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d]",
      danger: "bg-[#f39c12] text-[#2d2d2d] border-2 border-[#2d2d2d] shadow-[4px_4px_0px_#2d2d2d]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-br",
      "backdrop-blur", "backdrop-blur-sm", "backdrop-blur-md",
    ],
    patterns: [
      "^rounded-(?:lg|xl|2xl|full)$",
      "^bg-gradient-",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-full": "Collage Art uses sharp/no rounding for cut-paper feel",
      "rounded-lg": "Collage Art uses rounded-sm or rounded-none for cut edges",
      "bg-gradient-to-r": "Collage Art uses flat solid colors, not gradients",
      "backdrop-blur": "Collage Art is opaque and layered, not blurred",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "font-bold uppercase",
      "border-2 border-[#2d2d2d]",
      "transition-all duration-200 ease-in-out",
    ],
    card: [
      "rounded-none",
      "bg-[#f5f0e8]",
      "border-2 border-[#2d2d2d]",
      "shadow-[5px_5px_0px_#2d2d2d]",
    ],
    input: [
      "rounded-none",
      "border-2 border-[#2d2d2d]",
      "bg-[#f5f0e8]",
      "focus:outline-none",
    ],
  },
};
