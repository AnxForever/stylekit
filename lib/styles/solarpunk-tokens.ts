// Solarpunk Style Tokens
import type { StyleTokens } from "./tokens";

export const solarpunkTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-green-200",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-md shadow-green-100/40",
    md: "shadow-lg shadow-green-200/40",
    lg: "shadow-xl shadow-green-200/50",
    none: "shadow-none",
    hover: "shadow-xl shadow-green-300/50",
    focus: "shadow-lg shadow-green-200/40",
    colored: {
      green: "shadow-lg shadow-green-300/50",
      amber: "shadow-lg shadow-amber-300/50",
      sky: "shadow-lg shadow-sky-300/50",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f0fdf4]",
      secondary: "bg-[#fef3c7]",
      accent: ["bg-green-400", "bg-amber-400", "bg-sky-400"],
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-green-700",
      muted: "text-gray-500",
    },
    button: {
      primary: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
      secondary: "bg-transparent text-green-600 border-2 border-green-400",
      danger: "bg-red-400 text-white shadow-lg shadow-red-200/50",
    },
  },

  forbidden: {
    classes: [
      "bg-black",
      "bg-gray-950",
      "bg-gray-900",
      "bg-[#0a0a0f]",
      "rounded-none",
      "rounded-sm",
      "text-cyan-400",
      "shadow-[0_0_20px",
    ],
    patterns: [
      "^bg-gray-9",
      "^bg-black",
      "^rounded-none",
      "^rounded-sm$",
      "shadow-\\[0_0_\\d+px_rgba",
    ],
    reasons: {
      "bg-black": "Solarpunk uses warm, light backgrounds only",
      "bg-gray-950": "Dark backgrounds violate the optimistic eco aesthetic",
      "rounded-none": "Use organic rounded corners (rounded-2xl or rounded-3xl)",
      "rounded-sm": "Corners too sharp for organic Solarpunk style",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-2xl",
      "font-medium",
      "transition-all duration-300",
    ],
    card: [
      "bg-white/80",
      "border border-green-200",
      "rounded-3xl",
    ],
    input: [
      "bg-white/80",
      "border border-green-200",
      "rounded-2xl",
      "text-gray-800",
      "focus:border-green-400",
      "focus:shadow-lg focus:shadow-green-200/40",
    ],
  },
};
