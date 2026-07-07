// LaTeX Paper Style Tokens
import { createStyleTokens } from "./token-defaults";

export const latexPaperTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#D4D4D0]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "focus:border-[#111111]",
  },

  interaction: {
    transition: "transition-colors duration-200",
    active: "active:bg-[#F5F5F0]",
  },

  typography: {
    heading: "font-serif tracking-tight",
    body: "font-serif",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-4xl",
      h1: "text-2xl md:text-3xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-[15px] md:text-base",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-10 md:py-14",
    container: "px-6 md:px-8",
    card: "px-6 py-5",
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#FFFFFF]",
      secondary: "bg-[#F5F5F0]",
      accent: ["bg-[#111111]", "bg-[#F5F5F0]"],
    },
    text: {
      primary: "text-[#111111]",
      secondary: "text-[#6B6B66]",
      muted: "text-[#6B6B66]",
    },
    button: {
      primary: "bg-[#111111] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#111111]",
      secondary: "bg-transparent text-[#111111] border border-[#111111] hover:bg-[#F5F5F0]",
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
      "bg-gradient-to-r",
      "font-sans",
    ],
    patterns: [
      "^rounded-(sm|md|lg|xl|2xl|3xl|full)",
      "^shadow-(sm|md|lg|xl|2xl)",
      "^bg-gradient-",
      "^divide-x",
    ],
    reasons: {
      "rounded-lg": "Paper has no rounded corners; use rounded-none",
      "shadow-md": "Paper is flat; hierarchy comes from rules and whitespace, never shadows",
      "bg-gradient-to-r": "Only flat paper white, ink black, and theorem cream are allowed",
      "font-sans": "LaTeX Paper is serif throughout; monospace only for code",
    },
  },

  required: {
    button: [
      "font-serif",
      "rounded-none",
      "transition-colors duration-200",
    ],
    card: [
      "rounded-none",
      "bg-[#F5F5F0]",
      "border-l-2 border-[#111111]",
    ],
    input: [
      "font-serif",
      "rounded-none",
      "border border-[#D4D4D0]",
      "focus:outline-none focus:border-[#111111]",
    ],
  },
});
