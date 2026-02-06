// Geometric Bold Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const geometricBoldTokens: StyleTokens = {
  border: {
    width: "border-4",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "shadow-none",
    colored: {},
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-colors duration-200",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-black uppercase tracking-tight",
    body: "font-sans font-medium",
    mono: "font-mono",
    sizes: {
      hero: "text-6xl md:text-8xl lg:text-[10rem]",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-24 lg:py-32",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-black",
      accent: ["bg-red-500", "bg-blue-600", "bg-yellow-400"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-gray-600",
    },
    button: {
      primary: "bg-black text-white",
      secondary: "bg-white text-black border-4 border-black",
      danger: "bg-red-500 text-white",
    },
  },

  forbidden: {
    classes: [
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-l",
      "rounded-lg", "rounded-xl", "rounded-2xl",
      "text-gray-300", "text-gray-400", "bg-gray-100", "bg-gray-200",
      "opacity-50", "opacity-60", "opacity-70",
      "font-light", "font-normal", "font-thin",
    ],
    patterns: [
      "^shadow-(?!none)",
      "^bg-gradient-",
      "^rounded-(?:sm|md|lg|xl|2xl|3xl)$",
      "^opacity-(?:[1-6]0)$",
      "^font-(?:light|thin|normal)$",
    ],
    reasons: {
      "shadow-md": "Geometric Bold uses no shadows - pure flat shapes only",
      "bg-gradient-to-r": "Geometric Bold uses solid color blocks, no gradients",
      "rounded-lg": "Geometric Bold uses sharp corners (rounded-none) or full circles (rounded-full)",
      "opacity-50": "Geometric Bold uses full-opacity bold colors for maximum contrast",
      "font-light": "Geometric Bold uses heavy font weights (font-bold, font-black)",
    },
  },

  required: {
    button: [
      "font-bold uppercase tracking-widest",
      "transition-colors duration-200",
    ],
    card: [
      "border-4 border-black",
      "bg-white",
    ],
    input: [
      "border-4 border-black",
      "bg-white",
      "font-medium",
      "focus:outline-none",
      "focus:bg-yellow-300",
      "transition-colors duration-200",
    ],
  },
};
