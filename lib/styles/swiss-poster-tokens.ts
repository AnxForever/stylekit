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
    section: "py-0",
    container: "px-0",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-0",
      md: "gap-0",
      lg: "gap-0",
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
      muted: "text-[#000000]/30",
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
      "backdrop-blur", "backdrop-blur-sm",
      "font-serif",
      "font-mono",
      "border-dashed",
      "gap-4", "gap-6", "gap-8",
    ],
    patterns: [
      "^rounded-(?:md|lg|xl|2xl|full)$",
      "^bg-gradient-",
      "^shadow-(?:sm|md|lg|xl|2xl)$",
      "^backdrop-blur",
      "^font-serif$",
      "^font-mono$",
    ],
    reasons: {
      "rounded-lg": "Swiss Poster uses sharp edges only (rounded-none) - geometric precision",
      "bg-gradient-to-r": "Swiss Poster uses flat solid color blocks only, no gradients",
      "shadow-md": "Swiss Poster does not use shadows at all - relies on borders and color blocks for hierarchy",
      "backdrop-blur": "Swiss Poster is clean and opaque, no blur or glass effects",
      "font-serif": "Swiss Poster uses sans-serif only (Helvetica/Akzidenz-Grotesk tradition)",
      "font-mono": "Swiss Poster uses sans-serif only - monospace breaks the typographic tradition",
      "border-dashed": "Swiss Poster uses solid borders only - dashed lines break the clean grid aesthetic",
      "gap-4": "Swiss Poster uses gap-0 - elements butt against each other with borders as separators",
    },
  },

  required: {
    button: [
      "rounded-none",
      "font-sans font-black uppercase tracking-widest",
      "border-2 border-[#000000]",
      "transition-all duration-100 ease-out",
    ],
    card: [
      "rounded-none",
      "bg-[#ffffff]",
      "border-2 border-[#000000]",
    ],
    input: [
      "rounded-none",
      "border-0 border-b-2 border-[#000000]",
      "bg-transparent",
      "font-sans font-bold",
      "focus:outline-none",
    ],
  },
};
