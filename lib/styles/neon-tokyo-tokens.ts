// Neon Tokyo Style Tokens
import { createStyleTokens } from "./token-defaults";

export const neonTokyoTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#ff1493]/30",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(255,20,147,0.2)]",
    md: "shadow-[0_0_15px_rgba(255,20,147,0.3)]",
    lg: "shadow-[0_0_25px_rgba(255,20,147,0.4)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_30px_rgba(255,20,147,0.5)]",
    focus: "focus:shadow-[0_0_20px_rgba(255,20,147,0.4)]",
    colored: {
      pink: "shadow-[0_0_20px_rgba(255,20,147,0.5)]",
      cyan: "shadow-[0_0_20px_rgba(0,240,255,0.5)]",
      orange: "shadow-[0_0_20px_rgba(255,107,0,0.5)]",
      purple: "shadow-[0_0_20px_rgba(188,19,254,0.5)]",
    },
  },

  interaction: {
    hoverScale: "hover:shadow-[0_0_30px_rgba(255,20,147,0.5)]",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold",
    body: "font-sans",
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
      primary: "bg-[#0a0a1a]",
      secondary: "bg-[#0a0a1a]/80",
      accent: ["bg-[#ff1493]", "bg-[#00f0ff]", "bg-[#ff6b00]", "bg-[#bc13fe]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#ff1493]",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-transparent text-[#ff1493] border-2 border-[#ff1493]",
      secondary: "bg-[#00f0ff] text-[#0a0a1a]",
      danger: "bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,0,0.5)]",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "text-gray-900",
      "rounded-2xl",
      "rounded-3xl",
    ],
    patterns: [
      "^bg-(?:white|gray-[1-3]|slate-[1-3])",
      "^shadow-(?!\\[|none)",
      "^rounded-(?:2xl|3xl)",
    ],
    reasons: {
      "bg-white": "Neon Tokyo uses dark night-sky backgrounds only",
      "shadow-md": "Use colored neon glow: shadow-[0_0_20px_rgba(255,20,147,0.5)]",
      "rounded-2xl": "Keep corners minimal (rounded-sm max)",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "font-bold",
      "uppercase tracking-wider",
      "transition-all duration-300",
      "rounded-sm",
    ],
    card: [
      "bg-[#0a0a1a]/80",
      "backdrop-blur-md",
      "border border-[#ff1493]/30",
      "rounded-sm",
    ],
    input: [
      "bg-[#0a0a1a]/80",
      "border border-[#ff1493]/30",
      "rounded-sm",
      "text-white",
      "focus:border-[#ff1493]",
      "focus:shadow-[0_0_15px_rgba(255,20,147,0.3)]",
      "focus:outline-none",
    ],
  },
});
