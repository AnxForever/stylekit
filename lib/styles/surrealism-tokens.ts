// Surrealism Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const surrealismTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#d4a574]/30",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-md",
    md: "shadow-lg",
    lg: "shadow-xl",
    none: "shadow-none",
    hover: "hover:shadow-[0_12px_40px_rgba(26,26,62,0.2)]",
    focus: "focus:shadow-[0_0_16px_rgba(195,141,148,0.3)]",
    colored: {
      midnight: "shadow-[0_8px_30px_rgba(26,26,62,0.3)]",
      rose: "shadow-[0_8px_30px_rgba(195,141,148,0.3)]",
      gold: "shadow-[0_8px_30px_rgba(212,165,116,0.3)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105",
    hoverTranslate: "hover:-translate-y-1",
    transition: "transition-all duration-500 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-serif italic",
    body: "font-serif",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
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
      primary: "bg-[#f0ece4]",
      secondary: "bg-[#1a1a3e]",
      accent: ["bg-[#d4a574]", "bg-[#c38d94]", "bg-[#4a3f6b]"],
    },
    text: {
      primary: "text-[#1a1a3e]",
      secondary: "text-[#d4a574]",
      muted: "text-[#1a1a3e]/60",
    },
    button: {
      primary: "bg-gradient-to-r from-[#1a1a3e] to-[#c38d94] text-[#f0ece4]",
      secondary: "bg-[#d4a574]/20 text-[#1a1a3e] border border-[#1a1a3e]/30",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "bg-white", "bg-gray-50",
      "shadow-[0_0_16px_rgba(255,0,255",
      "text-[#ff00ff]", "text-[#00ffff]",
      "border-[#ff00ff]",
      "uppercase tracking-widest",
      "font-bold",
    ],
    patterns: [
      "^bg-(?:white|gray-5)",
      "^text-\\[#(?:ff00ff|00ffff|00ff00)",
      "^shadow-\\[0_0_\\d+px_rgba\\((?:255,0,255|0,255,255)",
    ],
    reasons: {
      "bg-white": "Surrealism uses warm cream tones, not pure white",
      "text-[#ff00ff]": "Surrealism uses muted, dreamlike tones, not neon",
      "rounded-none": "Surrealism uses soft, organic shapes",
      "font-bold": "Surrealism prefers elegant serif italic over bold text",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "font-serif italic",
      "shadow-lg",
      "transition-all duration-500 ease-in-out",
    ],
    card: [
      "rounded-2xl",
      "bg-gradient-to-br from-[#f0ece4] to-[#f0ece4]/80",
      "border border-[#d4a574]/30",
      "shadow-lg",
    ],
    input: [
      "rounded-lg",
      "border border-[#d4a574]/40",
      "bg-[#f0ece4]",
      "text-[#1a1a3e]",
      "focus:border-[#c38d94]",
      "focus:outline-none",
    ],
  },
};
