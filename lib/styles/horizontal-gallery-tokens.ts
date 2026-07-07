// Horizontal Gallery Style Tokens
import { createStyleTokens } from "./token-defaults";

export const horizontalGalleryTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#E8E6E1]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "ring-1 ring-[#1A1A1A]",
  },

  interaction: {
    hoverScale: "hover:opacity-80",
    transition: "transition-colors duration-300",
    active: "active:opacity-60",
  },

  typography: {
    heading: "font-serif font-light tracking-wide",
    body: "font-sans font-light",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-6xl lg:text-7xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-20 md:py-28 lg:py-36",
    container: "px-6 md:px-12 lg:px-20",
    card: "p-0",
    gap: {
      sm: "gap-8",
      md: "gap-12 md:gap-16",
      lg: "gap-16 md:gap-24",
    },
  },

  colors: {
    background: {
      primary: "bg-[#FCFCFA]",
      secondary: "bg-[#E8E6E1]",
      accent: ["bg-[#A85A3A]", "bg-[#1A1A1A]"],
    },
    text: {
      primary: "text-[#1A1A1A]",
      secondary: "text-[#2E2E2C]",
      muted: "text-[#8A8A85]",
    },
    button: {
      primary: "bg-[#1A1A1A] text-[#FCFCFA] hover:bg-[#2E2E2C]",
      secondary: "bg-transparent text-[#1A1A1A] border border-[#1A1A1A]",
      danger: "bg-[#A85A3A] text-[#FCFCFA] hover:bg-[#8F4A2E]",
    },
  },

  forbidden: {
    classes: [
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "border-2",
      "border-4",
      "bg-gradient-to-r",
      "bg-gradient-to-br",
    ],
    patterns: [
      "^rounded-(sm|md|lg|xl|2xl|3xl|full)$",
      "^shadow-(sm|md|lg|xl|2xl)$",
      "^border-[248]$",
      "^bg-gradient-",
    ],
    reasons: {
      "rounded-lg": "Horizontal Gallery hangs works flush on the wall; every corner stays rounded-none",
      "shadow-md": "Artwork and cards must cast no shadow on the gallery wall",
      "border-2": "All lines are 1px hairlines in #E8E6E1; heavy frames are forbidden",
      "bg-gradient-to-r": "The wall stays gallery white #FCFCFA; no gradient or textured backgrounds",
    },
  },

  required: {
    button: [
      "rounded-none",
      "uppercase",
      "tracking-[0.2em]",
      "transition-colors duration-300",
    ],
    card: [
      "rounded-none",
      "shadow-none",
    ],
    input: [
      "rounded-none",
      "bg-transparent",
      "border-b border-[#E8E6E1]",
      "focus:border-[#1A1A1A]",
    ],
  },
});
