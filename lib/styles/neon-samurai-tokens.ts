// Neon Samurai Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const neonSamuraiTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#dc2626]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(220,38,38,0.3)]",
    md: "shadow-[0_0_15px_rgba(220,38,38,0.4)]",
    lg: "shadow-[0_0_25px_rgba(220,38,38,0.5)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]",
    focus: "focus:shadow-[0_0_15px_rgba(220,38,38,0.4)]",
    colored: {
      red: "shadow-[0_0_15px_rgba(220,38,38,0.4)]",
      purple: "shadow-[0_0_15px_rgba(160,32,240,0.4)]",
      blue: "shadow-[0_0_15px_rgba(56,189,248,0.4)]",
      dualPurpleBlue: "shadow-[0_0_20px_rgba(56,189,248,0.5)]",
    },
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-1",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-sans font-bold uppercase tracking-widest",
    body: "font-sans",
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
      primary: "bg-[#080818]",
      secondary: "bg-[#111122]",
      accent: ["bg-[#dc2626]", "bg-[#a020f0]", "bg-[#38bdf8]", "bg-[#fbbf24]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#dc2626]",
      muted: "text-white/40",
    },
    button: {
      primary: "bg-[#dc2626] text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]",
      secondary: "bg-[#080818] text-[#dc2626] border-[#dc2626] shadow-[0_0_10px_rgba(220,38,38,0.3)]",
      danger: "bg-[#a020f0] text-white shadow-[0_0_15px_rgba(160,32,240,0.5)]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full", "rounded-2xl", "rounded-xl", "rounded-lg",
      "bg-white", "bg-gray-50", "bg-gray-100",
      "text-gray-900",
      "shadow-md", "shadow-lg", "shadow-xl",
      "font-serif",
      "bg-pink-100", "bg-pink-50", "bg-rose-50",
    ],
    patterns: [
      "^rounded-(?:full|2xl|xl|lg)$",
      "^bg-(?:white|gray-(?:50|100))$",
      "^bg-(?:pink|rose|sky|teal)-(?:50|100|200)$",
      "^font-serif$",
      "^shadow-(?:md|lg|xl)$",
    ],
    reasons: {
      "rounded-full": "Neon Samurai uses sharp angular geometry, no rounded shapes",
      "bg-white": "Neon Samurai requires dark navy/black backgrounds only",
      "shadow-md": "Use neon glow shadows with dual-color effects instead",
      "font-serif": "Neon Samurai uses bold geometric sans-serif only",
    },
  },

  required: {
    button: [
      "font-sans font-bold uppercase tracking-widest",
      "border border-[#dc2626]/60",
      "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "bg-[#080818]",
      "border border-[#dc2626]/30",
      "transition-all duration-300 ease-in-out",
    ],
    input: [
      "bg-[#080818]",
      "border-b-2 border-[#dc2626]/30",
      "text-white",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
