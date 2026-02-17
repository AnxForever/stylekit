// VHS Aesthetic Style Tokens
import { createStyleTokens } from "./token-defaults";

export const vhsAestheticTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#ff00ff]/20",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(255,0,255,0.2)]",
    md: "shadow-[0_0_20px_rgba(255,0,255,0.4)]",
    lg: "shadow-[0_0_40px_rgba(255,0,255,0.6)]",
    none: "shadow-none",
    hover: "shadow-[0_0_20px_rgba(255,0,255,0.3)]",
    focus: "shadow-[0_0_15px_rgba(0,255,255,0.4)]",
    colored: {
      green: "shadow-[0_0_20px_rgba(0,255,0,0.5)]",
      magenta: "shadow-[0_0_20px_rgba(255,0,255,0.5)]",
      cyan: "shadow-[0_0_20px_rgba(0,255,255,0.5)]",
      red: "shadow-[0_0_20px_rgba(255,0,0,0.5)]",
      yellow: "shadow-[0_0_20px_rgba(255,255,0,0.5)]",
    },
  },

  interaction: {
    hoverScale:
      "hover:shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:border-[#ff00ff]/40",
    transition: "transition-all duration-200",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-wider",
    body: "font-mono text-sm",
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
    container: "px-6 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-black",
      secondary: "bg-[#1a0a2e]",
      accent: ["bg-[#ff00ff]/10", "bg-[#00ffff]/10", "bg-[#ffff00]/10"],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#00ffff]",
      muted: "text-white/40",
    },
    button: {
      primary: "bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]",
      secondary: "bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/50",
      danger: "bg-red-600/30 text-red-400 border border-red-500",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "font-sans",
      "font-serif",
      "text-gray-900",
      "text-gray-800",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^shadow-(?!\\[)",
      "^rounded-[23]xl",
      "^rounded-full",
      "^font-serif",
      "^font-sans",
    ],
    reasons: {
      "bg-white":
        "VHS aesthetic requires dark backgrounds (black or deep purple)",
      "shadow-md":
        "Use neon glow shadows: shadow-[0_0_20px_rgba(255,0,255,0.4)]",
      "rounded-2xl": "VHS aesthetic uses sharp edges (rounded-none)",
      "font-sans":
        "Use monospace fonts only for VHS terminal/tape aesthetic",
      "font-serif":
        "Use monospace fonts only for VHS terminal/tape aesthetic",
    },
  },

  required: {
    button: [
      "font-mono",
      "uppercase",
      "tracking-widest",
      "border",
      "transition-all duration-200",
    ],
    card: ["bg-[#1a0a2e]", "border"],
    input: [
      "bg-black",
      "border",
      "text-[#00ffff]",
      "font-mono",
      "focus:border-[#00ffff]",
      "focus:shadow-[0_0_10px_rgba(0,255,255,0.3)]",
    ],
  },
});
