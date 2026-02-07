// Parallax Sections Layout Tokens - Fixed backgrounds, depth, scroll-driven immersion
import type { StyleTokens } from "./tokens";

export const parallaxSectionsTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-white/20",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-lg",
    md: "shadow-xl",
    lg: "shadow-2xl",
    none: "shadow-none",
    hover: "hover:shadow-2xl",
    focus: "focus:shadow-xl",
  },

  interaction: {
    hoverOpacity: "hover:opacity-100",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold tracking-tight",
    body: "font-sans leading-relaxed",
    mono: "font-mono",
    sizes: {
      hero: "text-6xl md:text-8xl",
      h1: "text-5xl md:text-7xl",
      h2: "text-4xl md:text-5xl",
      h3: "text-2xl md:text-3xl",
      body: "text-lg md:text-xl",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-0",
    container: "px-6 md:px-12",
    card: "p-8 md:p-12",
    gap: {
      sm: "gap-4",
      md: "gap-8",
      lg: "gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1e3a5f]",
      secondary: "bg-white/90",
      accent: ["bg-[#3b82f6]", "bg-[#93c5fd]", "bg-[#0ea5e9]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#1e3a5f]",
      muted: "text-white/60",
    },
    button: {
      primary: "bg-white/20 backdrop-blur-md text-white border border-white/30",
      secondary: "bg-[#1e3a5f] text-white",
      danger: "bg-red-500/80 backdrop-blur-md text-white",
    },
  },

  required: {
    button: ["backdrop-blur-md", "rounded-full"],
    card: ["backdrop-blur-sm", "rounded-2xl"],
    input: ["backdrop-blur-md", "rounded-full"],
  },

  forbidden: {
    classes: [
      "bg-scroll",
      "rounded-none",
      "shadow-none",
    ],
    patterns: [
      "^bg-scroll",
    ],
    reasons: {
      "bg-scroll": "Parallax Sections requires fixed backgrounds for depth effect",
    },
  },
};
