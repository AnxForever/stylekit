// Minimalist Flat Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const minimalistFlatTokens: StyleTokens = {
  border: {
    width: "border-2",
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
    hoverOpacity: "hover:opacity-90",
    transition: "transition-colors duration-200",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24 lg:py-32",
    container: "px-4 md:px-8 lg:px-16",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4 md:gap-6",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-black",
      accent: ["bg-[#ff3366]", "bg-[#00d4aa]", "bg-[#ffcc00]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-gray-500",
    },
    button: {
      primary: "bg-black text-white border-2 border-black",
      secondary: "bg-white text-black border-2 border-black",
      danger: "bg-[#ff3366] text-white border-2 border-[#ff3366]",
    },
  },

  forbidden: {
    classes: [
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-l", "bg-gradient-to-t",
      "rounded-lg", "rounded-xl", "rounded-2xl",
      "bg-gray-50", "bg-gray-100", "bg-gray-200",
      "text-gray-300", "text-gray-400",
      "backdrop-blur", "backdrop-blur-lg",
    ],
    patterns: [
      "^shadow-(?!none)",
      "^bg-gradient-",
      "^rounded-(?:sm|md|lg|xl|2xl|3xl)$",
      "^backdrop-blur",
      "^bg-gray-(?:[1-3])",
    ],
    reasons: {
      "shadow-md": "Minimalist Flat uses zero shadows - flat design only",
      "bg-gradient-to-r": "Minimalist Flat uses solid pure colors, no gradients",
      "rounded-lg": "Minimalist Flat uses consistent corners: all rounded-none or all rounded-full",
      "bg-gray-100": "Minimalist Flat uses pure black/white, not grays for backgrounds",
      "backdrop-blur": "Minimalist Flat avoids glass/blur effects - pure flat surfaces only",
    },
  },

  required: {
    button: [
      "border-2 border-black",
      "font-medium",
      "hover:bg-black hover:text-white",
      "transition-colors duration-200",
    ],
    card: [
      "border-2 border-black",
      "hover:bg-black hover:text-white",
      "transition-colors duration-200",
    ],
    input: [
      "border-0 border-b-2 border-black",
      "bg-transparent",
      "focus:outline-none",
      "focus:border-[#ff3366]",
      "transition-colors duration-200",
    ],
  },
};
