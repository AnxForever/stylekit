// Art Deco Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const artDecoTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#d4af37]",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_4px_rgba(212,175,55,0.15)]",
    md: "shadow-[0_4px_12px_rgba(212,175,55,0.2)]",
    lg: "shadow-[0_8px_24px_rgba(212,175,55,0.25)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_6px_20px_rgba(212,175,55,0.3)]",
    focus: "focus:shadow-[0_4px_16px_rgba(212,175,55,0.25)]",
    colored: {
      gold: "shadow-[0_4px_16px_rgba(212,175,55,0.3)]",
      navy: "shadow-[0_4px_16px_rgba(26,26,46,0.3)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-90",
    transition: "transition-all duration-400 ease-in-out",
    active: "active:opacity-80",
  },

  typography: {
    heading: "font-serif font-bold tracking-widest uppercase",
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
    section: "py-16 md:py-28 lg:py-36",
    container: "px-6 md:px-12 lg:px-20",
    card: "p-6 md:p-10",
    gap: {
      sm: "gap-3 md:gap-5",
      md: "gap-5 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#1a1a2e]",
      secondary: "bg-[#0f0f1a]",
      accent: ["bg-[#d4af37]", "bg-[#c9a832]", "bg-[#2c2c54]", "bg-[#8b6914]"],
    },
    text: {
      primary: "text-[#d4af37]",
      secondary: "text-[#f0e6d0]",
      muted: "text-[#8a7a5a]",
    },
    button: {
      primary: "bg-[#d4af37] text-[#1a1a2e]",
      secondary: "bg-transparent text-[#d4af37] border-2 border-[#d4af37]",
      danger: "bg-[#8b0000] text-[#f0e6d0]",
    },
  },

  forbidden: {
    classes: [
      "font-sans", "font-mono",
      "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "bg-[#ff71ce]", "bg-[#01cdfe]", "bg-[#ff69b4]", "bg-[#00ff00]",
      "text-[#ff71ce]", "text-[#01cdfe]", "text-[#ff69b4]",
      "border-[#ff71ce]", "border-[#01cdfe]",
    ],
    patterns: [
      "^font-(?:sans|mono)$",
      "^rounded-(?:lg|xl|2xl|3xl|full)$",
      "^bg-(?:pink|cyan|lime|green)-",
      "^text-(?:pink|cyan|lime|green)-",
    ],
    reasons: {
      "font-sans": "Art Deco uses serif typography for elegance (font-serif)",
      "rounded-xl": "Art Deco uses sharp geometric corners (rounded-none)",
      "bg-pink-500": "Art Deco uses gold, navy and deep warm tones, not bright neons",
      "text-cyan-400": "Art Deco uses gold and cream text, not neon colors",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-2 border-[#d4af37]",
      "font-serif font-bold tracking-widest uppercase",
      "transition-all duration-400 ease-in-out",
    ],
    card: [
      "rounded-none",
      "border-2 border-[#d4af37]",
      "bg-[#1a1a2e]",
      "shadow-[0_4px_12px_rgba(212,175,55,0.2)]",
    ],
    input: [
      "rounded-none",
      "border-2 border-[#d4af37]",
      "bg-[#0f0f1a]",
      "text-[#f0e6d0]",
      "font-serif",
      "focus:shadow-[0_4px_16px_rgba(212,175,55,0.25)]",
      "focus:outline-none",
    ],
  },
};
