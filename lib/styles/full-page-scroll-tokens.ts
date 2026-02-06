// Full Page Scroll Style Tokens - Immersive full-viewport section layout
import type { StyleTokens } from "./tokens";

export const fullPageScrollTokens: StyleTokens = {
  border: {
    width: "border-0",
    color: "border-white/20",
    radius: "rounded-full",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-5xl lg:text-7xl",
      h3: "text-2xl md:text-3xl",
      body: "text-lg md:text-xl lg:text-2xl",
      small: "text-sm md:text-base",
    },
  },

  spacing: {
    section: "py-0",
    container: "px-6 md:px-8 lg:px-12",
    card: "p-8 md:p-12",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-black",
      secondary: "bg-zinc-900",
      accent: ["bg-gradient-to-br from-indigo-600 to-purple-700", "bg-gradient-to-br from-cyan-600 to-blue-600", "bg-gradient-to-br from-purple-600 to-pink-600", "bg-gradient-to-br from-emerald-600 to-teal-600"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-white text-black",
      secondary: "bg-transparent text-white border-2 border-white",
    },
  },

  forbidden: {
    classes: [
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "border-gray-200", "border-gray-300",
      "text-zinc-900", "text-black",
    ],
    patterns: [
      "^shadow-(?!none)",
      "^border-gray-",
    ],
    reasons: {
      "shadow-lg": "Full Page Scroll uses bold color backgrounds instead of shadows for depth",
      "border-gray-200": "Full Page Scroll uses white/transparent borders for dark backgrounds",
      "text-black": "Full Page Scroll uses white text on dark/gradient backgrounds",
    },
  },

  required: {
    button: [
      "px-8 md:px-12 py-4 md:py-5",
      "font-semibold text-lg",
      "transition-colors",
    ],
    card: [
      "min-h-screen",
      "snap-start",
      "flex items-center justify-center",
    ],
    input: [
      "bg-transparent",
      "border-b border-white/30",
      "text-white text-lg",
      "placeholder-white/50",
      "focus:outline-none focus:border-white",
      "transition-colors",
    ],
  },
};
