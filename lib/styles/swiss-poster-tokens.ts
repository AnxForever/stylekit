// Swiss Poster Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const swissPosterTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#000000]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "shadow-none",
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-0.5",
    transition: "transition-all duration-100 ease-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-sans font-black uppercase tracking-tighter",
    body: "font-sans",
    sizes: {
      hero: "text-6xl md:text-[10rem] lg:text-[12rem]",
      h1: "text-5xl md:text-7xl lg:text-8xl",
      h2: "text-3xl md:text-5xl lg:text-6xl",
      h3: "text-xl md:text-2xl lg:text-3xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-16",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#ffffff]",
      secondary: "bg-[#f5f5f5]",
      accent: ["bg-[#ff0000]", "bg-[#0057b8]", "bg-[#ffcc00]"],
    },
    text: {
      primary: "text-[#000000]",
      secondary: "text-[#000000]/70",
      muted: "text-[#000000]/40",
    },
    button: {
      primary: "bg-[#000000] text-[#ffffff]",
      secondary: "bg-[#ff0000] text-[#ffffff]",
      danger: "bg-[#ff0000] text-[#ffffff]",
    },
  },

  forbidden: {
    classes: [
      "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-br",
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "backdrop-blur",
      "font-serif",
      "font-mono",
    ],
    patterns: [
      "^rounded-(?:md|lg|xl|2xl|full)$",
      "^bg-gradient-",
      "^shadow-(?:sm|md|lg|xl)$",
      "^backdrop-blur",
      "^font-serif$",
    ],
    reasons: {
      "rounded-lg": "Swiss Poster uses sharp edges only (rounded-none or rounded-sm)",
      "bg-gradient-to-r": "Swiss Poster uses flat solid color blocks, no gradients",
      "shadow-md": "Swiss Poster does not use shadows, relies on borders and color blocks",
      "backdrop-blur": "Swiss Poster is clean and opaque, no blur effects",
      "font-serif": "Swiss Poster uses sans-serif only (Helvetica tradition)",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-sans font-black uppercase",
      "border-2",
      "transition-all duration-100 ease-out",
    ],
    card: [
      "rounded-none",
      "bg-[#ffffff]",
      "border-2 border-[#000000]",
    ],
    input: [
      "rounded-none",
      "border-b-2 border-[#000000]",
      "bg-transparent",
      "font-sans font-bold",
      "focus:outline-none",
    ],
  },
};
