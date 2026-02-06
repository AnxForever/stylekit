// Magazine Grid Style Tokens - Editorial with serif headings, thin borders, elegant
import type { StyleTokens } from "./tokens";

export const magazineGridTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-zinc-200",
    radius: "rounded-lg",
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
    hoverScale: "hover:scale-105",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-4xl lg:text-5xl",
      h1: "text-2xl md:text-3xl lg:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-8 md:py-12 lg:py-16",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-zinc-50",
      accent: ["bg-[#e63946]", "bg-[#2a9d8f]", "bg-[#e9c46a]", "bg-[#264653]"],
    },
    text: {
      primary: "text-zinc-900",
      secondary: "text-zinc-600",
      muted: "text-zinc-500",
    },
    button: {
      primary: "bg-[#e63946] text-white",
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
      "rounded-none": "Magazine Grid uses soft rounded corners for a polished editorial feel",
      "border-4": "Magazine Grid uses thin subtle borders for elegant separation",
      "shadow-2xl": "Magazine Grid uses subtle shadows, relying on layout for visual hierarchy",
    },
  },

  required: {
    button: [
      "text-xs font-semibold uppercase tracking-wider",
      "rounded",
    ],
    card: [
      "rounded-lg",
      "overflow-hidden",
      "group",
    ],
    input: [
      "bg-zinc-100",
      "border-0",
      "rounded-lg",
      "focus:outline-none",
      "focus:ring-2 focus:ring-red-500/30",
    ],
  },
};
