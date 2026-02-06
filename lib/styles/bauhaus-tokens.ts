// Bauhaus Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const bauhausTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "hover:shadow-none",
    focus: "focus:shadow-none",
  },

  interaction: {
    hoverOpacity: "hover:opacity-80",
    transition: "transition-opacity duration-200",
    active: "active:opacity-70",
  },

  typography: {
    heading: "font-sans font-bold uppercase tracking-widest",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-24 lg:py-32",
    container: "px-4 md:px-8 lg:px-16",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-black",
      accent: ["bg-[#dd0000]", "bg-[#ffd700]", "bg-[#0057b8]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-gray-600",
    },
    button: {
      primary: "bg-[#dd0000] text-white",
      secondary: "bg-black text-white",
      danger: "bg-[#dd0000] text-white",
    },
  },

  forbidden: {
    classes: [
      "font-serif",
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-b", "bg-gradient-to-t",
      "border-dashed", "border-dotted",
      "italic",
    ],
    patterns: [
      "^font-serif",
      "^rounded-(?!none)",
      "^shadow-(?!none)",
      "^bg-gradient-",
      "^border-(?:dashed|dotted)",
    ],
    reasons: {
      "font-serif": "Bauhaus uses geometric sans-serif typography only (font-sans)",
      "rounded-xl": "Bauhaus uses strict geometric forms with sharp angles (rounded-none)",
      "shadow-lg": "Bauhaus rejects decorative shadows; form follows function",
      "bg-gradient-to-r": "Bauhaus uses flat solid primary colors (red, yellow, blue), no gradients",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-2 border-black",
      "font-sans font-bold uppercase",
      "transition-opacity duration-200",
    ],
    card: [
      "rounded-none",
      "border-2 border-black",
      "bg-white",
    ],
    input: [
      "rounded-none",
      "border-2 border-black",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
