// Hero Fullscreen Style Tokens - Dramatic large type, overlay effects, bold contrast
import type { StyleTokens } from "./tokens";

export const heroFullscreenTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-white",
    radius: "rounded-full",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "focus:ring-2 focus:ring-white/50",
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold leading-tight",
    body: "font-sans",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-2xl md:text-3xl",
      body: "text-lg md:text-xl lg:text-2xl",
      small: "text-sm md:text-base",
    },
  },

  spacing: {
    section: "py-0",
    container: "px-4 md:px-6 lg:px-8",
    card: "p-8 md:p-10",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-black",
      secondary: "bg-black/50",
      accent: ["bg-[#ff6b6b]", "bg-[#4ecdc4]", "bg-[#ffe66d]", "bg-[#6c5ce7]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/60",
    },
    button: {
      primary: "bg-white text-black",
      secondary: "bg-transparent text-white border-2 border-white",
    },
  },

  forbidden: {
    classes: [
      "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl",
      "bg-zinc-50", "bg-gray-50", "bg-white",
      "text-zinc-900", "text-gray-900", "text-black",
      "border-gray-200", "border-zinc-200",
    ],
    patterns: [
      "^shadow-(?!none)",
      "^bg-(?:zinc|gray)-(?:50|100)",
      "^border-(?:zinc|gray)-",
    ],
    reasons: {
      "shadow-lg": "Hero Fullscreen uses overlays and contrast instead of shadows",
      "bg-white": "Hero Fullscreen uses dark backgrounds with image/video overlays",
      "text-black": "Hero Fullscreen uses white text on dark overlaid backgrounds",
    },
  },

  required: {
    button: [
      "px-8 py-4",
      "font-semibold text-lg",
      "rounded-full",
      "transition-colors",
    ],
    card: [
      "bg-white/10 backdrop-blur-sm",
      "rounded-2xl",
      "border border-white/20",
    ],
    input: [
      "bg-white/10 backdrop-blur-sm",
      "border border-white/30",
      "rounded-full",
      "text-white placeholder-white/60",
      "focus:outline-none focus:ring-2 focus:ring-white/50",
    ],
  },
};
