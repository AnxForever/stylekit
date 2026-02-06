// Card Stack Style Tokens - Layered depth effects with stacking feel
import type { StyleTokens } from "./tokens";

export const cardStackTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-zinc-200",
    radius: "rounded-2xl",
  },

  shadow: {
    sm: "shadow-md",
    md: "shadow-xl",
    lg: "shadow-2xl",
    none: "shadow-none",
    hover: "hover:shadow-2xl",
    focus: "focus:shadow-xl",
  },

  interaction: {
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    sizes: {
      hero: "text-3xl md:text-4xl lg:text-5xl",
      h1: "text-2xl md:text-3xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-20 lg:py-24",
    container: "px-4 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-gradient-to-br from-slate-900 to-slate-800",
      secondary: "bg-white",
      accent: ["bg-[#6c5ce7]", "bg-[#00cec9]", "bg-[#fd79a8]", "bg-[#ffeaa7]"],
    },
    text: {
      primary: "text-zinc-900",
      secondary: "text-zinc-600",
      muted: "text-zinc-400",
    },
    button: {
      primary: "bg-zinc-900 text-white",
      secondary: "bg-white/10 text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "shadow-none",
      "border-4", "border-8",
    ],
    patterns: [
      "^rounded-none$",
      "^border-[48]",
    ],
    reasons: {
      "rounded-none": "Card Stack uses generous rounding (rounded-2xl) for soft stacked cards",
      "shadow-none": "Card Stack requires shadows to convey depth and layering",
      "border-4": "Card Stack uses subtle or no borders, relying on shadows for definition",
    },
  },

  required: {
    button: [
      "rounded-full",
      "shadow-lg",
      "hover:shadow-xl",
      "transition-shadow",
    ],
    card: [
      "rounded-2xl",
      "shadow-xl",
      "transition-all duration-300",
      "bg-white",
    ],
    input: [
      "bg-white/80 backdrop-blur",
      "border border-zinc-200",
      "rounded-xl",
      "focus:outline-none",
      "focus:ring-2 focus:ring-purple-500/30",
      "transition-all",
    ],
  },
};
