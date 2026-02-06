// Retro Vintage Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const retroVintageTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#8b4513]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_4px_rgba(139,69,19,0.1)]",
    md: "shadow-[0_4px_8px_rgba(139,69,19,0.15)]",
    lg: "shadow-[0_8px_16px_rgba(139,69,19,0.2)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_4px_12px_rgba(139,69,19,0.2)]",
    focus: "focus:shadow-[0_2px_8px_rgba(139,69,19,0.15)]",
    colored: {
      brown: "shadow-[0_4px_12px_rgba(139,69,19,0.2)]",
      rust: "shadow-[0_4px_12px_rgba(201,76,76,0.2)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-85",
    transition: "transition-colors duration-200",
    active: "active:opacity-75",
  },

  typography: {
    heading: "font-serif uppercase tracking-widest",
    body: "font-serif",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-14 md:py-24 lg:py-32",
    container: "px-6 md:px-10 lg:px-16",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-5",
      md: "gap-5 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5e6d3]",
      secondary: "bg-[#e8d5c0]",
      accent: ["bg-[#c94c4c]", "bg-[#2e4a3f]", "bg-[#d4a373]"],
    },
    text: {
      primary: "text-[#8b4513]",
      secondary: "text-[#f5e6d3]",
      muted: "text-[#8b4513]/60",
    },
    button: {
      primary: "bg-[#8b4513] text-[#f5e6d3]",
      secondary: "bg-transparent text-[#8b4513] border-2 border-[#8b4513]",
      danger: "bg-[#c94c4c] text-[#f5e6d3]",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-l",
      "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-[#ff00ff]", "bg-[#00ffff]", "bg-[#ff71ce]",
      "text-[#ff00ff]", "text-[#00ffff]",
      "shadow-[0_0_", "backdrop-blur",
      "font-sans",
      "bg-white",
    ],
    patterns: [
      "^bg-gradient-",
      "^rounded-(?:xl|2xl|3xl|full)$",
      "^bg-(?:pink|cyan|violet|fuchsia)-",
      "^text-(?:pink|cyan|violet|fuchsia)-",
      "^shadow-\\[0_0_",
      "^backdrop-blur",
    ],
    reasons: {
      "bg-gradient-to-r": "Retro Vintage uses solid vintage tones, not modern gradients",
      "rounded-xl": "Retro Vintage uses minimal rounding to maintain classic feel",
      "bg-[#ff00ff]": "Retro Vintage uses warm brown/cream palette, not neon colors",
      "shadow-[0_0_": "Retro Vintage avoids neon glow shadows",
      "font-sans": "Retro Vintage uses serif typography (font-serif)",
      "bg-white": "Retro Vintage uses cream/parchment (#f5e6d3), not pure white",
    },
  },

  required: {
    button: [
      "font-serif uppercase tracking-widest",
      "transition-colors duration-200",
    ],
    card: [
      "border-2 border-[#8b4513]",
      "bg-[#f5e6d3]",
      "font-serif",
    ],
    input: [
      "border-2 border-[#8b4513]",
      "bg-transparent",
      "text-[#8b4513]",
      "font-serif",
      "focus:outline-none",
      "focus:bg-[#8b4513]/5",
      "transition-colors duration-200",
    ],
  },
};
