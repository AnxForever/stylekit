// Steampunk Style Tokens
import type { StyleTokens } from "./tokens";

export const steampunkTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#b87333]/40",
    radius: "rounded",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_8px_rgba(181,166,66,0.2)]",
    md: "shadow-[0_0_15px_rgba(181,166,66,0.3)]",
    lg: "shadow-[0_0_25px_rgba(181,166,66,0.4)]",
    none: "shadow-none",
    hover: "shadow-[0_0_20px_rgba(184,115,51,0.4)]",
    focus: "shadow-[0_0_12px_rgba(181,166,66,0.25)]",
    colored: {
      brass: "shadow-[0_0_15px_rgba(181,166,66,0.3)]",
      copper: "shadow-[0_0_15px_rgba(184,115,51,0.3)]",
      iron: "shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
    },
  },

  interaction: {
    hoverScale: "hover:shadow-[0_0_25px_rgba(181,166,66,0.5)]",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-serif font-bold",
    body: "font-serif",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#2a1f15]",
      secondary: "bg-[#3d2b1f]",
      accent: ["bg-[#b5a642]", "bg-[#b87333]", "bg-[#4a4a4a]"],
    },
    text: {
      primary: "text-[#f5f0e1]",
      secondary: "text-[#b5a642]",
      muted: "text-[#b87333]/70",
    },
    button: {
      primary: "bg-gradient-to-b from-[#b5a642] to-[#8a7d32] text-[#2a1f15]",
      secondary: "bg-transparent text-[#b87333] border-2 border-[#b87333]",
      danger: "bg-gradient-to-b from-[#8b2500] to-[#5a1800] text-[#f5f0e1] shadow-[0_0_10px_rgba(139,37,0,0.3)]",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-slate-50",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "text-cyan-400",
      "text-fuchsia-500",
      "rounded-2xl",
      "rounded-3xl",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^bg-slate-[1-3]",
      "^shadow-(?!\\[)",
      "^rounded-[23]xl",
      "^text-cyan",
      "^text-fuchsia",
      "^bg-cyan",
      "^bg-fuchsia",
    ],
    reasons: {
      "bg-white": "Steampunk uses dark brown backgrounds only",
      "shadow-md": "Use warm brass glow shadows: shadow-[0_0_15px_rgba(181,166,66,0.3)]",
      "rounded-2xl": "Keep corners subtle (rounded or rounded-lg max)",
      "text-cyan-400": "Use warm brass/copper tones, not neon colors",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded",
      "font-serif",
      "uppercase tracking-wider",
      "transition-all duration-300",
    ],
    card: [
      "bg-[#2a1f15]",
      "border-2 border-[#b87333]/40",
      "rounded",
    ],
    input: [
      "bg-[#2a1f15]",
      "border-2 border-[#b87333]/30",
      "rounded",
      "text-[#f5f0e1]",
      "font-serif",
      "focus:border-[#b5a642]",
      "focus:shadow-[0_0_12px_rgba(181,166,66,0.25)]",
    ],
  },
};
