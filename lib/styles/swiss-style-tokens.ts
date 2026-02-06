// Swiss Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const swissStyleTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:opacity-80",
    transition: "transition-opacity duration-150",
    active: "active:opacity-70",
  },

  typography: {
    heading: "font-sans font-bold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-24 lg:py-32",
    container: "px-4 md:px-8 lg:px-16",
    card: "p-4 md:p-6",
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
      accent: ["bg-[#ff0000]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-gray-600",
    },
    button: {
      primary: "bg-black text-white",
      secondary: "bg-white text-black border border-black",
      danger: "bg-[#ff0000] text-white",
    },
  },

  forbidden: {
    classes: [
      "font-serif", "font-mono",
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-b", "bg-gradient-to-t",
      "italic",
      "border-dashed", "border-dotted",
    ],
    patterns: [
      "^font-(?:serif|mono)$",
      "^rounded-(?!none)",
      "^shadow-(?!none)",
      "^bg-gradient-",
      "^italic$",
    ],
    reasons: {
      "font-serif": "Swiss Style uses Helvetica-style sans-serif only (font-sans)",
      "rounded-xl": "Swiss Style uses sharp geometric corners for grid alignment (rounded-none)",
      "shadow-lg": "Swiss Style avoids decorative shadows; focus on typography and grid",
      "bg-gradient-to-r": "Swiss Style uses flat solid colors only, no gradients",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-sans font-bold",
      "transition-opacity duration-150",
    ],
    card: [
      "rounded-none",
      "border border-black",
      "bg-white",
    ],
    input: [
      "rounded-none",
      "border border-black",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
