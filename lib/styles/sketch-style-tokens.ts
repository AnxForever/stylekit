// Sketch Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const sketchStyleTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#2c2c2c]",
    radius: "rounded-sm",
    style: "border-dashed",
  },

  shadow: {
    sm: "shadow-[1px_1px_0px_rgba(44,44,44,0.3)]",
    md: "shadow-[2px_2px_0px_rgba(44,44,44,0.3)]",
    lg: "shadow-[3px_3px_0px_rgba(44,44,44,0.3)]",
    none: "shadow-none",
    hover: "hover:shadow-[2px_2px_0px_rgba(44,44,44,0.5)]",
    focus: "focus:shadow-[2px_2px_0px_rgba(44,44,44,0.4)]",
    colored: {
      pencil: "shadow-[2px_2px_0px_rgba(44,44,44,0.3)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-opacity duration-200",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-sans font-semibold tracking-normal",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-10 md:py-16 lg:py-24",
    container: "px-4 md:px-6 lg:px-10",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-2 md:gap-3",
      md: "gap-3 md:gap-5",
      lg: "gap-5 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f0e8]",
      secondary: "bg-[#e8e2d8]",
      accent: ["bg-[#2c2c2c]", "bg-[#6b6b6b]", "bg-[#a0a0a0]"],
    },
    text: {
      primary: "text-[#2c2c2c]",
      secondary: "text-[#5a5a5a]",
      muted: "text-[#8a8a8a]",
    },
    button: {
      primary: "bg-[#2c2c2c] text-[#f5f0e8]",
      secondary: "bg-transparent text-[#2c2c2c] border-2 border-dashed border-[#2c2c2c]",
      danger: "bg-[#8b3a3a] text-[#f5f0e8]",
    },
  },

  forbidden: {
    classes: [
      "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-lg", "shadow-xl", "shadow-2xl",
      "bg-[#ff71ce]", "bg-[#01cdfe]", "bg-[#ff006e]", "bg-[#00ff00]",
      "text-[#ff71ce]", "text-[#01cdfe]", "text-[#ff006e]",
      "border-4",
      "font-black",
      "bg-gradient-to-r", "bg-gradient-to-l",
    ],
    patterns: [
      "^rounded-(?:xl|2xl|3xl|full)$",
      "^shadow-(?:lg|xl|2xl)$",
      "^bg-(?:\\[#ff|\\[#01cd|\\[#00ff)",
      "^bg-gradient-",
    ],
    reasons: {
      "rounded-xl": "Sketch style uses minimal rounding (rounded-sm) for a hand-drawn feel",
      "shadow-xl": "Sketch style uses very subtle pencil-like shadows, not heavy shadows",
      "bg-[#ff71ce]": "Sketch style uses pencil tones (grays, cream), not neon colors",
      "bg-gradient-to-r": "Sketch style uses flat paper-like surfaces, not gradients",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "border-2 border-dashed border-[#2c2c2c]",
      "transition-opacity duration-200",
      "font-semibold",
    ],
    card: [
      "rounded-sm",
      "border-2 border-dashed border-[#2c2c2c]",
      "bg-[#f5f0e8]",
      "shadow-[2px_2px_0px_rgba(44,44,44,0.3)]",
    ],
    input: [
      "rounded-sm",
      "border-2 border-dashed border-[#2c2c2c]",
      "bg-[#faf5ed]",
      "font-sans",
      "focus:shadow-[2px_2px_0px_rgba(44,44,44,0.4)]",
      "focus:outline-none",
    ],
  },
};
