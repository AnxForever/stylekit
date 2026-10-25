// Quantized Line Field Style Tokens
import type { StyleTokens } from "./tokens";

export const quantizedLineFieldTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#d9dbd5]",
    radius: "rounded-md",
    style: "border-solid",
  },
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-sm",
    focus: "focus:ring-2 focus:ring-[#267dff]/30",
  },
  interaction: {
    transition: "transition-colors duration-200",
    hoverOpacity: "hover:opacity-85",
    active: "active:translate-y-px",
  },
  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-sans",
    sizes: {
      hero: "text-5xl md:text-7xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },
  spacing: {
    section: "py-12 md:py-24",
    container: "px-4 md:px-8",
    card: "p-5 md:p-6",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },
  colors: {
    background: {
      primary: "bg-[#fafaf8]",
      secondary: "bg-[#202220]",
      accent: ["bg-[#2152e7]", "bg-[#c2dcff]", "bg-[#ec353e]", "bg-[#267dff]"],
    },
    text: {
      primary: "text-[#202220]",
      secondary: "text-[#267dff]",
      muted: "text-[#6b7068]",
    },
    button: {
      primary: "bg-[#202220] text-[#fafaf8]",
      secondary: "bg-[#fafaf8] text-[#202220]",
      danger: "bg-[#ec353e] text-white",
    },
  },
  forbidden: {
    classes: [],
    patterns: [],
    reasons: {},
  },
  required: {
    button: [
      "rounded-md",
      "border",
      "font-medium",
    ],
    card: ["rounded-md", "border", "bg-[#fafaf8]"],
    input: [
      "rounded-md",
      "border",
      "bg-[#fafaf8]",
      "focus:outline-none",
      "focus:border-[#267dff]",
    ],
  },
};
