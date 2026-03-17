// Data Dense Style Tokens
import { createStyleTokens } from "./token-defaults";

export const dataDenseTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#e2e8f0]",
    radius: "rounded",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-sm",
    lg: "shadow-sm",
    none: "shadow-none",
    hover: "hover:shadow-sm",
    focus: "ring-1 ring-[#3b82f6]",
  },

  interaction: {
    hoverScale: "hover:bg-[#f8fafc]",
    transition: "transition-colors duration-150",
  },

  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-normal",
    mono: "font-mono",
    sizes: {
      hero: "text-xl md:text-2xl",
      h1: "text-lg md:text-xl",
      h2: "text-base md:text-lg",
      h3: "text-sm md:text-base",
      body: "text-xs md:text-sm",
      small: "text-[10px]",
    },
  },

  spacing: {
    section: "py-3 md:py-4",
    container: "px-3 md:px-4",
    card: "px-3 py-2.5",
    gap: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f8fafc]",
      accent: ["bg-[#3b82f6]"],
    },
    text: {
      primary: "text-[#1e293b]",
      secondary: "text-[#64748b]",
      muted: "text-[#94a3b8]",
    },
    button: {
      primary: "bg-[#3b82f6] text-white hover:bg-[#2563eb]",
      secondary: "bg-white text-[#64748b] border border-[#e2e8f0]",
      danger: "text-[#ef4444] hover:bg-red-50",
    },
  },

  forbidden: {
    classes: [
      "rounded-xl",
      "rounded-2xl",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "p-6",
      "p-8",
      "text-lg",
      "text-xl",
      "text-2xl",
    ],
    patterns: [
      "^rounded-(xl|2xl|3xl|full)",
      "^shadow-(lg|xl|2xl)",
      "^p-[6-9]",
      "^bg-gradient-",
    ],
    reasons: {
      "rounded-xl": "Data Dense uses small rounded corners only",
      "shadow-lg": "Data Dense avoids decorative shadows",
      "p-6": "Data Dense uses compact spacing (p-3 or less)",
      "text-lg": "Data Dense uses small text sizes (text-sm or text-xs)",
    },
  },

  required: {
    button: [
      "px-2.5 py-1",
      "text-xs",
      "rounded",
      "transition-colors",
    ],
    card: [
      "bg-white",
      "border border-[#e2e8f0]",
      "rounded",
    ],
    input: [
      "px-2.5 py-1.5",
      "text-xs",
      "border border-[#e2e8f0]",
      "rounded",
      "focus:ring-1 focus:ring-[#3b82f6]",
    ],
  },
});
