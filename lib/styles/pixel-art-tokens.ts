// Pixel Art Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const pixelArtTokens: StyleTokens = {
  border: {
    width: "border-4",
    color: "border-[#1a1c2c]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0_#1a1c2c]",
    md: "shadow-[4px_4px_0_#1a1c2c]",
    lg: "shadow-[6px_6px_0_#1a1c2c]",
    none: "shadow-none",
    hover: "hover:shadow-[2px_2px_0_#1a1c2c]",
    focus: "focus:shadow-[4px_4px_0_#1a1c2c]",
    colored: {
      red: "shadow-[4px_4px_0_#ff004d]",
      green: "shadow-[4px_4px_0_#00e436]",
      blue: "shadow-[4px_4px_0_#29adff]",
      yellow: "shadow-[4px_4px_0_#ffec27]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-1 hover:translate-y-1",
    transition: "transition-transform duration-100",
    active: "active:translate-x-1 active:translate-y-1 active:shadow-none",
  },

  typography: {
    heading: "font-bold uppercase tracking-wider text-[#1a1c2c]",
    body: "text-[#1a1c2c]",
    mono: "font-mono text-[#1a1c2c]",
    sizes: {
      hero: "text-3xl md:text-5xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-base",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20",
    container: "px-4 md:px-8",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f4f4f4]",
      secondary: "bg-white",
      accent: ["bg-[#ff004d]", "bg-[#00e436]", "bg-[#29adff]", "bg-[#ffec27]"],
    },
    text: {
      primary: "text-[#1a1c2c]",
      secondary: "text-[#5f574f]",
      muted: "text-[#8b8680]",
    },
    button: {
      primary: "bg-[#ff004d] text-white",
      secondary: "bg-[#29adff] text-white",
      danger: "bg-[#ff004d] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "bg-gradient-to-r",
      "bg-gradient-to-br",
    ],
    patterns: [
      "^rounded-(?:sm|md|lg|xl|2xl|3xl|full)",
      "^shadow-(?:lg|xl|2xl)",
      "^bg-gradient",
    ],
    reasons: {
      "rounded-lg": "Pixel art style requires sharp corners (rounded-none)",
      "rounded-full": "Pixel art style requires sharp corners (rounded-none)",
      "shadow-lg": "Pixel art style uses hard-edge pixel shadows",
      "bg-gradient-to-r": "Pixel art style uses solid 8-bit colors, not gradients",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "bg-[#ff004d]",
      "border-4 border-[#1a1c2c]",
      "rounded-none",
      "text-white font-bold uppercase",
      "shadow-[4px_4px_0_#1a1c2c]",
      "hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c]",
      "active:translate-x-1 active:translate-y-1 active:shadow-none",
      "transition-all duration-100",
    ],
    card: [
      "bg-white",
      "border-4 border-[#1a1c2c]",
      "rounded-none",
      "shadow-[4px_4px_0_#1a1c2c]",
    ],
    input: [
      "bg-white",
      "border-4 border-[#1a1c2c]",
      "rounded-none",
      "text-[#1a1c2c] placeholder-[#8b8680]",
      "focus:outline-none focus:shadow-[inset_0_0_0_2px_#29adff]",
      "transition-all",
    ],
  },
};
