// Arcade CRT Style Tokens
import { createStyleTokens } from "./token-defaults";

export const arcadeCrtTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-[#39ff14]/40",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(57,255,20,0.3)]",
    md: "shadow-[0_0_20px_rgba(57,255,20,0.5)]",
    lg: "shadow-[0_0_40px_rgba(57,255,20,0.8)]",
    none: "shadow-none",
    hover: "shadow-[0_0_30px_rgba(57,255,20,0.6)]",
    focus: "shadow-[0_0_15px_rgba(57,255,20,0.5)]",
    colored: {
      green: "shadow-[0_0_20px_rgba(57,255,20,0.5)]",
      magenta: "shadow-[0_0_20px_rgba(255,0,255,0.5)]",
      cyan: "shadow-[0_0_20px_rgba(0,255,255,0.5)]",
      red: "shadow-[0_0_20px_rgba(255,42,42,0.5)]",
      yellow: "shadow-[0_0_20px_rgba(255,255,0,0.5)]",
    },
  },

  interaction: {
    hoverScale: "hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] hover:border-[#39ff14]",
    transition: "transition-all duration-200",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-mono font-bold uppercase tracking-[0.15em]",
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
      primary: "bg-[#050505]",
      secondary: "bg-[#0a0a0a]",
      accent: ["bg-[#39ff14]/10", "bg-[#ff00ff]/10", "bg-[#00ffff]/10"],
    },
    text: {
      primary: "text-[#39ff14]",
      secondary: "text-[#00ffff]",
      muted: "text-[#39ff14]/50",
    },
    button: {
      primary: "bg-[#39ff14] text-black",
      secondary: "bg-transparent text-[#00ffff] border-2 border-[#00ffff]",
      danger: "bg-[#ff2a2a] text-white shadow-[0_0_15px_rgba(255,42,42,0.5)]",
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
      "font-serif",
      "font-sans",
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
      "bg-white": "CRT aesthetic requires near-black backgrounds only",
      "shadow-md": "Use neon glow shadows: shadow-[0_0_20px_rgba(57,255,20,0.5)]",
      "rounded-2xl": "CRT screens have sharp edges (rounded-none)",
      "font-sans": "Use monospace fonts only for CRT terminal aesthetic",
      "font-serif": "Use monospace fonts only for CRT terminal aesthetic",
    },
  },

  required: {
    button: [
      "font-mono",
      "uppercase",
      "tracking-[0.2em]",
      "border-2",
      "transition-all duration-200",
    ],
    card: [
      "bg-[#0a0a0a]",
      "border-2",
    ],
    input: [
      "bg-black",
      "border-2",
      "text-[#39ff14]",
      "font-mono",
      "focus:border-[#39ff14]",
      "focus:shadow-[0_0_15px_rgba(57,255,20,0.3)]",
    ],
  },
});
