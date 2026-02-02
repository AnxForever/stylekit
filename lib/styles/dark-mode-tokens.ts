// Dark Mode Style Tokens
import type { StyleTokens } from "./tokens";

export const darkModeTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-slate-700",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-lg shadow-black/20",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "ring-1 ring-blue-500",
  },

  interaction: {
    hoverOpacity: "hover:bg-slate-700",
    transition: "transition-colors duration-200",
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
    section: "py-12 md:py-16 lg:py-20",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-slate-900",
      secondary: "bg-slate-800",
      accent: ["bg-blue-600", "bg-green-500", "bg-amber-500"],
    },
    text: {
      primary: "text-slate-100",
      secondary: "text-slate-300",
      muted: "text-slate-400",
    },
    button: {
      primary: "bg-blue-600 text-white hover:bg-blue-500",
      secondary: "bg-slate-700 text-slate-200 hover:bg-slate-600",
      danger: "bg-red-600/20 text-red-400 border border-red-500/30",
    },
  },

  forbidden: {
    classes: [
      "text-white",
      "bg-white",
      "bg-gray-50",
      "border-black",
      "shadow-white",
      "bg-black",
    ],
    patterns: [
      "^text-white$",
      "^bg-white",
      "^bg-gray-[1-3]00",
      "^bg-black$",
    ],
    reasons: {
      "text-white": "Use text-slate-100 for softer contrast",
      "bg-white": "Dark mode uses dark backgrounds",
      "bg-black": "Use bg-slate-900 for better depth",
    },
  },

  required: {
    button: [
      "px-4 py-2",
      "rounded-lg",
      "font-medium",
      "transition-colors duration-200",
    ],
    card: [
      "bg-slate-800",
      "border border-slate-700",
      "rounded-xl",
    ],
    input: [
      "bg-slate-800",
      "border border-slate-700",
      "rounded-lg",
      "text-slate-100",
      "placeholder:text-slate-500",
      "focus:border-blue-500",
      "focus:ring-1 focus:ring-blue-500",
    ],
  },
};
