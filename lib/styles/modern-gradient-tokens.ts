// Modern Gradient Style Tokens
import type { StyleTokens } from "./tokens";

export const modernGradientTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-white/20",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-lg shadow-violet-500/20",
    md: "shadow-xl shadow-violet-500/25",
    lg: "shadow-2xl shadow-violet-500/30",
    none: "shadow-none",
    hover: "shadow-2xl shadow-violet-500/40",
    focus: "ring-2 ring-violet-500/50",
    colored: {
      violet: "shadow-xl shadow-violet-500/30",
      fuchsia: "shadow-xl shadow-fuchsia-500/30",
      cyan: "shadow-xl shadow-cyan-500/30",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold",
    body: "font-normal",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-20 md:py-32",
    container: "px-4 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-16",
    },
  },

  colors: {
    background: {
      primary: "bg-slate-950",
      secondary: "bg-slate-900",
      accent: ["bg-gradient-to-r from-violet-500 to-fuchsia-500", "bg-gradient-to-r from-cyan-500 to-blue-500"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60",
    },
    button: {
      // Using violet-600/fuchsia-600 for better WCAG AA contrast (5.56:1 vs 4.23:1)
      primary: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white",
      secondary: "backdrop-blur-xl bg-white/10 border border-white/20 text-white",
      danger: "bg-gradient-to-r from-red-600 to-orange-600 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-slate-50",
      "shadow-sm",
      "shadow-md",
      "text-gray-900",
      "text-black",
      "rounded-none",
    ],
    patterns: [
      "^bg-white$",
      "^bg-gray-[1-4]00",
      "^bg-slate-[1-4]00",
      "^text-gray-[89]00",
      "^text-black",
    ],
    reasons: {
      "bg-white": "Modern Gradient uses dark backgrounds for contrast",
      "shadow-sm": "Use colored shadows: shadow-xl shadow-violet-500/30",
      "text-black": "Use text-white or text-white/80 on dark backgrounds",
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
      "backdrop-blur-xl",
      "bg-white/10",
      "border border-white/20",
      "rounded-3xl",
    ],
    input: [
      "px-5 py-3.5",
      "backdrop-blur-xl",
      "bg-white/10",
      "border border-white/20",
      "rounded-2xl",
      "text-white",
      "placeholder:text-white/40",
      "focus:border-violet-500/50",
      "focus:ring-2 focus:ring-violet-500/20",
    ],
  },
};
