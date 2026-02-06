// Masonry Flow Style Tokens - Pinterest-style layout with clean modern aesthetics
import type { StyleTokens } from "./tokens";

export const masonryFlowTokens: StyleTokens = {
  border: {
    width: "border-0",
    color: "border-zinc-200",
    radius: "rounded-xl",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-lg",
    focus: "focus:shadow-md",
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    hoverTranslate: "hover:-translate-y-1",
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
    section: "py-8 md:py-12 lg:py-16",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-4 md:p-5",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-zinc-50",
      secondary: "bg-white",
      accent: ["bg-[#e94560]", "bg-[#16c79a]", "bg-[#ffd460]", "bg-[#7579e7]"],
    },
    text: {
      primary: "text-zinc-900",
      secondary: "text-zinc-600",
      muted: "text-zinc-400",
    },
    button: {
      primary: "bg-zinc-900 text-white",
      secondary: "bg-zinc-100 text-zinc-700",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "border-2", "border-4", "border-8",
      "shadow-[", "font-black",
    ],
    patterns: [
      "^border-[248]",
      "^shadow-\\[",
    ],
    reasons: {
      "rounded-none": "Masonry Flow uses rounded corners (rounded-xl) for soft card aesthetics",
      "border-4": "Masonry Flow uses borderless or very subtle borders",
      "font-black": "Masonry Flow uses semibold weight, not black",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-medium text-sm",
      "transition-colors",
    ],
    card: [
      "break-inside-avoid",
      "rounded-xl",
      "overflow-hidden",
      "bg-white",
    ],
    input: [
      "rounded-full",
      "bg-zinc-100",
      "border-0",
      "focus:outline-none",
      "focus:ring-2 focus:ring-zinc-900/10",
      "transition-all",
    ],
  },
};
