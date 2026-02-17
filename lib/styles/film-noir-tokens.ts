// Film Noir Style Tokens
import { createStyleTokens } from "./token-defaults";

export const filmNoirTokens = createStyleTokens({
  border: {
    width: "border-b",
    color: "border-neutral-800",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "shadow-lg",
    focus: "ring-1 ring-neutral-600",
    colored: {
      crimson: "shadow-[0_4px_20px_rgba(196,30,58,0.2)]",
      gold: "shadow-[0_4px_20px_rgba(212,175,55,0.15)]",
    },
  },

  interaction: {
    hoverScale: "hover:bg-neutral-800/80",
    transition: "transition-colors duration-500",
  },

  typography: {
    heading: "font-serif italic",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-20 md:py-32",
    container: "px-8 md:px-12",
    card: "p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0a0a0a]",
      secondary: "bg-neutral-900",
      accent: ["bg-neutral-800", "bg-[#c41e3a]"],
    },
    text: {
      primary: "text-neutral-100",
      secondary: "text-neutral-400",
      muted: "text-neutral-600",
    },
    button: {
      primary: "bg-neutral-100 text-neutral-950",
      secondary: "bg-transparent border border-neutral-500 text-neutral-300",
      danger: "bg-[#c41e3a] text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-blue-", "bg-green-", "bg-pink-", "bg-purple-", "bg-yellow-",
      "rounded-2xl", "rounded-3xl", "rounded-full",
      "shadow-[0_0_", "text-shadow",
      "bg-gradient-to-r from-pink", "bg-gradient-to-r from-blue",
      "animate-bounce", "animate-spin",
    ],
    patterns: [
      "^bg-(?:blue|green|pink|purple|yellow|cyan|teal|indigo|violet|fuchsia)-",
      "^rounded-(?:2xl|3xl|full)",
      "^shadow-\\[0_0_",
      "^animate-(?:bounce|spin|wiggle)",
    ],
    reasons: {
      "bg-blue-": "Film Noir uses grayscale only; no colored backgrounds",
      "rounded-2xl": "Film Noir uses sharp corners or minimal rounding",
      "shadow-[0_0_": "No glow effects; use directional shadows for drama",
      "animate-bounce": "Playful animations break the noir atmosphere",
    },
  },

  required: {
    button: ["font-serif", "italic", "tracking-wide", "transition-colors"],
    card: ["bg-neutral-900", "relative", "overflow-hidden"],
    input: ["bg-neutral-950", "border-b", "font-serif", "focus:outline-none"],
  },
});
