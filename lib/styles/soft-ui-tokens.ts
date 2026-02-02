// Soft UI Style Tokens
import type { StyleTokens } from "./tokens";

export const softUITokens: StyleTokens = {
  border: {
    width: "border-0",
    color: "border-transparent",
    radius: "rounded-2xl",
    style: "border-none",
  },

  shadow: {
    sm: "shadow-md shadow-gray-200/50",
    md: "shadow-lg shadow-gray-200/50",
    lg: "shadow-xl shadow-gray-200/50",
    none: "shadow-none",
    hover: "shadow-xl shadow-indigo-500/20",
    focus: "ring-2 ring-indigo-500/50",
    colored: {
      indigo: "shadow-lg shadow-indigo-500/30",
      pink: "shadow-lg shadow-pink-500/30",
      green: "shadow-lg shadow-emerald-500/30",
    },
  },

  interaction: {
    hoverScale: "hover:-translate-y-0.5",
    hoverOpacity: "hover:shadow-xl",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-semibold",
    body: "font-normal",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-slate-50",
      secondary: "bg-white",
      accent: ["bg-indigo-500", "bg-pink-500", "bg-emerald-500"],
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      // Using indigo-600 for better WCAG AA contrast (5.14:1 vs 4.47:1)
      primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30",
      secondary: "bg-white text-gray-700 shadow-lg shadow-gray-200/50",
      danger: "bg-red-600 text-white shadow-lg shadow-red-600/30",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "rounded-sm",
      "border-2",
      "border-4",
      "border-black",
      "shadow-[",
      "bg-black",
    ],
    patterns: [
      "^rounded-none",
      "^rounded-sm$",
      "^border-[24]",
      "^border-black",
    ],
    reasons: {
      "rounded-none": "Soft UI requires large rounded corners (rounded-2xl+)",
      "border-2": "Soft UI avoids visible borders, uses shadows instead",
      "border-black": "Soft UI uses soft colors, never hard black borders",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-2xl",
      "font-medium",
      "shadow-lg",
      "hover:-translate-y-0.5",
      "hover:shadow-xl",
      "transition-all duration-200",
    ],
    card: [
      "bg-white",
      "rounded-3xl",
      "shadow-xl shadow-gray-200/50",
      "hover:shadow-2xl",
      "hover:-translate-y-1",
      "transition-all duration-300",
    ],
    input: [
      "px-5 py-3.5",
      "bg-gray-50",
      "border-0",
      "rounded-2xl",
      "focus:ring-2 focus:ring-indigo-500/50",
      "focus:bg-white",
      "transition-all duration-200",
    ],
  },
};
