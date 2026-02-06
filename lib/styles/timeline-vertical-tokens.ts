// Timeline Vertical Style Tokens - Sequential connected elements with indigo accents
import type { StyleTokens } from "./tokens";

export const timelineVerticalTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-zinc-100",
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
    hoverTranslate: "hover:-translate-y-0.5",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-semibold tracking-tight",
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
    section: "py-12 md:py-16 lg:py-20",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-6",
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
      accent: ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-red-500"],
    },
    text: {
      primary: "text-zinc-900",
      secondary: "text-zinc-600",
      muted: "text-zinc-400",
    },
    button: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-zinc-100 text-zinc-700",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "border-4", "border-8",
      "shadow-2xl",
      "font-black",
    ],
    patterns: [
      "^border-[48]",
      "^shadow-2xl",
    ],
    reasons: {
      "rounded-none": "Timeline Vertical uses soft rounded corners (rounded-xl) for cards",
      "border-4": "Timeline Vertical uses subtle thin borders (border)",
      "shadow-2xl": "Timeline Vertical uses subtle shadows, not dramatic ones",
    },
  },

  required: {
    button: [
      "inline-flex items-center gap-2",
      "text-sm font-medium",
      "text-blue-600",
      "transition-colors",
    ],
    card: [
      "relative",
      "bg-white",
      "rounded-xl",
      "shadow-sm",
      "border border-zinc-100",
    ],
    input: [
      "border border-zinc-200",
      "rounded-lg",
      "text-zinc-900",
      "focus:outline-none",
      "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
    ],
  },
};
