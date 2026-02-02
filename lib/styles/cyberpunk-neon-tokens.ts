// Cyberpunk Neon Style Tokens
import type { StyleTokens } from "./tokens";

export const cyberpunkNeonTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-cyan-400/30",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(0,255,255,0.3)]",
    md: "shadow-[0_0_15px_rgba(0,255,255,0.4)]",
    lg: "shadow-[0_0_25px_rgba(0,255,255,0.5)]",
    none: "shadow-none",
    hover: "shadow-[0_0_30px_rgba(0,255,255,0.6)]",
    focus: "shadow-[0_0_20px_rgba(0,255,255,0.5)]",
    colored: {
      cyan: "shadow-[0_0_20px_rgba(0,255,255,0.5)]",
      magenta: "shadow-[0_0_20px_rgba(255,0,255,0.5)]",
      yellow: "shadow-[0_0_20px_rgba(255,255,0,0.5)]",
    },
  },

  interaction: {
    hoverScale: "hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-bold",
    body: "font-mono",
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
      primary: "bg-[#0a0a0f]",
      secondary: "bg-gray-950",
      accent: ["bg-cyan-400", "bg-fuchsia-500", "bg-yellow-400"],
    },
    text: {
      primary: "text-white",
      secondary: "text-cyan-400",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-cyan-400 text-black",
      secondary: "bg-transparent text-cyan-400 border border-cyan-400",
      danger: "bg-red-500 text-white shadow-[0_0_15px_rgba(255,0,0,0.5)]",
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
      "text-gray-900",
      "rounded-2xl",
      "rounded-3xl",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^bg-slate-[1-3]",
      "^shadow-(?!\\[)",
      "^rounded-[23]xl",
    ],
    reasons: {
      "bg-white": "Cyberpunk uses dark backgrounds only",
      "shadow-md": "Use neon glow shadows: shadow-[0_0_20px_rgba(0,255,255,0.5)]",
      "rounded-2xl": "Keep corners subtle (rounded-lg max)",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-lg",
      "font-mono",
      "uppercase tracking-wider",
      "transition-all duration-300",
    ],
    card: [
      "bg-gray-950",
      "border border-cyan-400/30",
      "rounded-lg",
    ],
    input: [
      "bg-gray-950",
      "border border-cyan-400/30",
      "rounded-lg",
      "text-cyan-400",
      "font-mono",
      "focus:border-cyan-400",
      "focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]",
    ],
  },
};
