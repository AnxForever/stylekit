// Neo-Brutalist Playful Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const neoBrutalistPlayfulTokens: StyleTokens = {
  border: {
    width: "border-4",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    md: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    lg: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]",
    colored: {
      red: "shadow-[6px_6px_0px_0px_rgba(255,107,107,1)]",
      teal: "shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]",
      yellow: "shadow-[6px_6px_0px_0px_rgba(255,230,109,1)]",
      mint: "shadow-[6px_6px_0px_0px_rgba(149,225,211,1)]",
      coral: "shadow-[6px_6px_0px_0px_rgba(243,129,129,1)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    hoverTranslate: "hover:translate-x-[3px] hover:translate-y-[3px]",
    transition: "transition-all duration-300",
    active: "active:translate-x-[4px] active:translate-y-[4px]",
  },

  typography: {
    heading: "font-black uppercase",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-black",
      accent: ["bg-[#ff6b6b]", "bg-[#4ecdc4]", "bg-[#ffe66d]", "bg-[#95e1d3]", "bg-[#f38181]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-gray-700",
    },
    button: {
      primary: "bg-[#ff6b6b] text-white",
      secondary: "bg-[#4ecdc4] text-black",
      danger: "bg-black text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "shadow-sm", "shadow", "shadow-md", "shadow-lg",
      "bg-gradient-to-r", "bg-gradient-to-b",
      "text-gray-300", "text-gray-400", "text-gray-500",
      "bg-gray-50", "bg-gray-100",
      "font-light", "font-normal",
      "backdrop-blur",
    ],
    patterns: [
      "^rounded-(?:sm|md|lg|xl|2xl|3xl|full)$",
      "^shadow-(?:sm|md|lg|xl|2xl)$",
      "^bg-gradient-",
      "^font-(?:light|thin|normal)$",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-lg": "Neo-Brutalist Playful uses sharp corners only (rounded-none)",
      "shadow-md": "Neo-Brutalist Playful uses hard-edge offset shadows, not blurred",
      "bg-gradient-to-r": "Neo-Brutalist Playful uses solid color blocks, no gradients",
      "font-light": "Neo-Brutalist Playful uses bold/black font weights for impact",
      "bg-gray-100": "Neo-Brutalist Playful uses vibrant colors, not subtle grays",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-4 border-black",
      "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
      "hover:shadow-none",
      "hover:translate-x-[3px] hover:translate-y-[3px]",
      "transition-all",
      "font-black",
    ],
    card: [
      "rounded-none",
      "border-4 border-black",
      "bg-white",
    ],
    input: [
      "rounded-none",
      "border-4 border-black",
      "font-mono",
      "focus:outline-none",
      "focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]",
      "transition-all",
    ],
  },
};
