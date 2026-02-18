// Blueprint Style Tokens
import { createStyleTokens } from "./token-defaults";

export const blueprintTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/30",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
    none: "shadow-none",
    hover: "hover:bg-white/5",
    focus: "focus:border-[#4a90d9]",
    colored: {
      orange: "shadow-[0_0_0_1px_rgba(255,107,53,0.4)]",
      blue: "shadow-[0_0_0_1px_rgba(74,144,217,0.4)]",
    },
  },

  interaction: {
    hoverScale: "hover:bg-white/10",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-mono tracking-wider uppercase",
    body: "font-mono",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-7xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-3xl",
      h3: "text-lg md:text-xl",
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
      primary: "bg-[#1e3a5f]",
      secondary: "bg-[#1e3a5f]/60",
      accent: ["bg-white", "bg-[#4a90d9]", "bg-[#ff6b35]"],
    },
    text: {
      primary: "text-white",
      secondary: "text-[#a0c4e8]",
      muted: "text-white/40",
    },
    button: {
      primary: "bg-transparent text-white border border-white/60",
      secondary: "bg-white text-[#1e3a5f]",
      danger: "bg-transparent text-[#ff6b35] border border-[#ff6b35]/60",
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
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "font-serif",
      "bg-gradient-",
    ],
    patterns: [
      "^bg-(?:white|gray-[1-3]|slate-[1-3])",
      "^shadow-(?:sm|md|lg|xl|2xl)",
      "^rounded-(?:xl|2xl|3xl|full)",
      "^font-serif",
      "^bg-gradient-",
    ],
    reasons: {
      "bg-white": "Blueprint uses deep blue backgrounds, not white",
      "shadow-md": "Blueprint uses minimal shadows; rely on borders and lines",
      "rounded-xl": "Blueprint uses sharp corners for technical precision",
      "font-serif": "Blueprint uses monospace fonts for engineering feel",
      "bg-gradient-": "Blueprint uses flat colors, not gradients",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "font-mono",
      "uppercase tracking-widest",
      "text-sm",
      "transition-all duration-200",
    ],
    card: [
      "bg-[#1e3a5f]/60",
      "border border-white/20",
    ],
    input: [
      "bg-transparent",
      "border border-white/30",
      "text-white",
      "font-mono",
      "focus:border-[#4a90d9]",
      "focus:outline-none",
    ],
  },
});
