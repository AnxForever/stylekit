// Glassmorphism Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const glassmorphismTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-white/20",
    radius: "rounded-xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-md shadow-black/10",
    md: "shadow-lg shadow-black/10",
    lg: "shadow-xl shadow-black/10",
    none: "shadow-none",
    hover: "hover:shadow-xl hover:shadow-black/15",
    focus: "focus:shadow-lg focus:shadow-black/10",
  },

  interaction: {
    hoverOpacity: "hover:bg-white/30",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-semibold text-white",
    body: "text-white/80",
    mono: "font-mono text-white/90",
    sizes: {
      hero: "text-4xl md:text-6xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white/10 backdrop-blur-xl",
      secondary: "bg-white/20 backdrop-blur-md",
      accent: ["bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400", "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500", "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/50",
    },
    button: {
      primary: "bg-white/20 text-white backdrop-blur-md",
      secondary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    },
  },

  forbidden: {
    classes: [
      // No sharp corners
      "rounded-none", "rounded-sm",
      // No opaque backgrounds on glass elements
      "bg-white", "bg-black", "bg-gray-100", "bg-gray-900",
      // No hard shadows
      "shadow-[0px_0px_0px", "shadow-none",
      // No direct color borders
      "border-black", "border-gray-500",
    ],
    patterns: [
      "^rounded-none",               // No sharp corners
      "^bg-(?!white\\/|gradient|transparent)", // Only transparent or gradient backgrounds
      "^border-(?!white\\/)",        // Only white/ borders allowed
    ],
    reasons: {
      "rounded-none": "Glassmorphism requires rounded corners (rounded-xl or rounded-2xl)",
      "bg-white": "Glassmorphism uses semi-transparent backgrounds (bg-white/10 to bg-white/30)",
      "bg-black": "Glassmorphism requires semi-transparent backgrounds, not opaque colors",
      "border-black": "Glassmorphism uses subtle white borders (border-white/20)",
    },
  },

  required: {
    button: [
      "bg-white/20 backdrop-blur-md",
      "border border-white/30",
      "rounded-xl",
      "text-white",
      "shadow-lg shadow-black/10",
      "hover:bg-white/30",
      "transition-all duration-300",
    ],
    card: [
      "bg-white/20 backdrop-blur-xl",
      "border border-white/30",
      "rounded-2xl",
      "shadow-xl shadow-black/10",
    ],
    input: [
      "bg-white/10 backdrop-blur-md",
      "border border-white/20",
      "rounded-xl",
      "text-white placeholder-white/50",
      "focus:outline-none focus:border-white/40",
      "focus:bg-white/20",
      "transition-all",
    ],
  },
};
