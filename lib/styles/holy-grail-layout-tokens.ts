// Holy Grail Layout Style Tokens - Classic web, balanced, professional, standard spacing
import type { StyleTokens } from "./tokens";

export const holyGrailLayoutTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-gray-200",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-sm",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:shadow-sm",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-colors duration-200",
  },

  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-2xl md:text-3xl",
      h1: "text-xl md:text-2xl",
      h2: "text-lg md:text-xl",
      h3: "text-base md:text-lg",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-4 md:py-6",
    container: "px-4 md:px-6",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-3 md:gap-4",
      lg: "gap-4 md:gap-6",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f1f5f9]",
      secondary: "bg-white",
      accent: ["bg-[#3b82f6]", "bg-[#10b981]", "bg-[#f59e0b]", "bg-[#ef4444]"],
    },
    text: {
      primary: "text-[#1e293b]",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#3b82f6] text-white",
      secondary: "bg-gray-100 text-gray-700",
      danger: "bg-[#ef4444] text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "shadow-2xl",
      "font-black", "font-extrabold",
      "text-5xl", "text-6xl", "text-7xl", "text-8xl",
    ],
    patterns: [
      "^rounded-none$",
      "^shadow-2xl",
      "^text-[5-8]xl",
    ],
    reasons: {
      "rounded-none": "Holy Grail Layout uses moderate rounding (rounded-xl) for a professional look",
      "shadow-2xl": "Holy Grail Layout uses subtle shadows befitting a standard web layout",
      "text-6xl": "Holy Grail Layout uses moderate type sizes for balanced three-column reading",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-medium text-sm",
      "transition-colors",
    ],
    card: [
      "bg-white",
      "rounded-xl",
      "shadow-sm",
      "border border-gray-100",
    ],
    input: [
      "bg-gray-50",
      "border border-gray-200",
      "rounded-lg",
      "text-sm",
      "focus:outline-none",
      "focus:ring-2 focus:ring-[#3b82f6]/20 focus:border-[#3b82f6]",
      "transition-all",
    ],
  },
};
