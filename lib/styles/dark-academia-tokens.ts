// Dark Academia Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const darkAcademiaTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#8b7355]/30",
    radius: "rounded",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "hover:shadow-md",
    focus: "focus:shadow-[0_0_8px_rgba(139,115,85,0.2)]",
  },

  interaction: {
    hoverScale: "hover:scale-[1.01]",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-serif tracking-wide",
    body: "font-serif leading-relaxed",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-7xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#f5f0e1]",
      secondary: "bg-[#3d2b1f]",
      accent: ["bg-[#2d4a3e]", "bg-[#8b7355]", "bg-[#5c4033]"],
    },
    text: {
      primary: "text-[#3d2b1f]",
      secondary: "text-[#2d4a3e]",
      muted: "text-[#8b7355]/70",
    },
    button: {
      primary: "bg-[#3d2b1f] text-[#f5f0e1] border border-[#8b7355]/60",
      secondary: "bg-[#2d4a3e] text-[#f5f0e1] border border-[#2d4a3e]/60",
    },
  },

  forbidden: {
    classes: [
      "bg-[#0a0a0a]", "bg-black",
      "text-[#ff00ff]", "text-[#00ffff]",
      "shadow-[0_0_", // no neon glow
      "bg-[#ff", "bg-[#00ff",
      "text-pink-", "text-cyan-", "text-purple-",
      "neon", "glow",
    ],
    patterns: [
      "^shadow-\\[0_0_\\d+px_rgba",
      "^bg-\\[#(?:ff|00ff)",
      "^text-(?:pink|cyan|purple)-",
    ],
    reasons: {
      "bg-black": "Dark Academia uses warm browns, not cold black",
      "text-[#ff00ff]": "Dark Academia uses muted earth tones, not neon colors",
      "shadow-[0_0_": "Dark Academia uses subtle traditional shadows, not neon glow",
    },
  },

  required: {
    button: [
      "rounded",
      "font-serif",
      "border border-[#8b7355]/60",
      "transition-all duration-300 ease-in-out",
      "shadow-sm",
    ],
    card: [
      "rounded",
      "bg-[#f5f0e1]",
      "border border-[#8b7355]/30",
      "shadow-sm",
    ],
    input: [
      "rounded",
      "border border-[#8b7355]/30",
      "bg-[#f5f0e1]/80",
      "text-[#3d2b1f]",
      "font-serif",
      "focus:border-[#8b7355]",
      "focus:outline-none",
    ],
  },
};
