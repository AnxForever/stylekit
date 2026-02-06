// Cyber Anime Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const cyberAnimeTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-[#7c3aed]/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(124,58,237,0.3)]",
    md: "shadow-[0_0_15px_rgba(124,58,237,0.4)]",
    lg: "shadow-[0_0_25px_rgba(124,58,237,0.5)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]",
    focus: "focus:shadow-[0_0_15px_rgba(6,214,160,0.3)]",
    colored: {
      purple: "shadow-[0_0_20px_rgba(124,58,237,0.4)]",
      cyan: "shadow-[0_0_20px_rgba(6,214,160,0.4)]",
      pink: "shadow-[0_0_20px_rgba(255,0,110,0.4)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[1.02]",
    transition: "transition-all duration-300 ease-out",
    active: "active:scale-95",
  },

  typography: {
    heading: "font-sans font-bold uppercase tracking-widest",
    body: "font-sans text-[#e0e0ff]/80",
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
    section: "py-16 md:py-24 lg:py-32",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0f0f1a]",
      secondary: "bg-[#0f0f1a]/90",
      accent: ["bg-[#7c3aed]", "bg-[#06d6a0]", "bg-[#ff006e]", "bg-[#38bdf8]"],
    },
    text: {
      primary: "text-[#e0e0ff]",
      secondary: "text-[#06d6a0]",
      muted: "text-[#e0e0ff]/50",
    },
    button: {
      primary: "bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]",
      secondary: "bg-transparent text-[#06d6a0] border-[#06d6a0]",
      danger: "bg-[#ff006e] text-white shadow-[0_0_15px_rgba(255,0,110,0.5)]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full",
      "bg-white", "bg-[#fafaf8]", "bg-[#fffbf0]",
      "shadow-sm", "shadow-md", "shadow-lg",
      "font-serif",
      "text-[#1a1a1a]",
      "border-2",
    ],
    patterns: [
      "^rounded-full$",
      "^bg-white$",
      "^bg-\\[#f[a-f]",
      "^shadow-(?:sm|md|lg|xl)$",
      "^font-serif$",
    ],
    reasons: {
      "rounded-full": "Cyber Anime uses sharp geometric shapes, not circles",
      "bg-white": "Cyber Anime uses dark backgrounds only",
      "shadow-sm": "Cyber Anime uses neon glow shadows, not soft elevation",
      "font-serif": "Cyber Anime uses geometric sans-serif or monospace fonts only",
    },
  },

  required: {
    button: [
      "font-bold uppercase tracking-widest",
      "border border-[#06d6a0]/50",
      "shadow-[0_0_15px_rgba(124,58,237,0.5)]",
      "transition-all duration-300 ease-out",
    ],
    card: [
      "bg-[#0f0f1a]/90",
      "border border-[#7c3aed]/30",
      "backdrop-blur-sm",
    ],
    input: [
      "bg-[#0f0f1a]/80",
      "border border-[#7c3aed]/30",
      "text-[#e0e0ff]",
      "font-mono",
      "focus:outline-none",
    ],
  },
};
