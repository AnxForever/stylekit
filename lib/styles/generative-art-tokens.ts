// Generative Art Style Tokens
import { createStyleTokens } from "./token-defaults";

export const generativeArtTokens = createStyleTokens({
  border: {
    radius: "rounded-xl",
    width: "border",
    color: "border-neutral-800",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_10px_rgba(124,58,237,0.15)]",
    md: "shadow-[0_0_20px_rgba(124,58,237,0.25)]",
    lg: "shadow-[0_0_40px_rgba(124,58,237,0.4)]",
    none: "shadow-none",
    hover: "shadow-[0_0_25px_rgba(124,58,237,0.3)]",
    focus: "shadow-[0_0_15px_rgba(124,58,237,0.3)]",
    colored: {
      violet: "shadow-[0_0_20px_rgba(124,58,237,0.4)]",
      blue: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
      teal: "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
      rose: "shadow-[0_0_20px_rgba(244,63,94,0.4)]",
      amber: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    },
  },

  interaction: {
    hoverScale: "hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]",
    transition: "transition-all duration-300",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-mono font-bold",
    body: "font-mono text-sm",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0a0a0a]",
      secondary: "bg-neutral-900",
      accent: ["bg-violet-500/10", "bg-blue-500/10", "bg-teal-500/10"],
    },
    text: {
      primary: "text-white",
      secondary: "text-neutral-400",
      muted: "text-neutral-600",
    },
    button: {
      primary: "bg-violet-600 text-white",
      secondary: "bg-transparent text-violet-400 border border-violet-500/40",
      danger: "bg-rose-600 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "bg-slate-50",
      "font-serif",
      "font-sans",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "rounded-none",
      "text-gray-900",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^bg-slate-[1-3]",
      "^shadow-(?!\\[)",
      "^font-serif",
      "^font-sans",
    ],
    reasons: {
      "bg-white": "Generative art uses dark backgrounds only",
      "font-serif": "Use monospace fonts for code-art aesthetic",
      "font-sans": "Use monospace fonts for code-art aesthetic",
      "shadow-md": "Use algorithmic glow shadows: shadow-[0_0_20px_rgba(124,58,237,0.4)]",
      "rounded-none": "Use rounded-xl for generative art panels",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-lg",
      "font-mono",
      "text-sm",
      "transition-all duration-300",
      "border",
    ],
    card: [
      "bg-neutral-900/80",
      "backdrop-blur",
      "border border-neutral-800",
      "rounded-xl",
    ],
    input: [
      "bg-neutral-950",
      "border border-neutral-700",
      "rounded-lg",
      "text-neutral-100",
      "font-mono",
      "text-sm",
      "focus:border-violet-500",
      "focus:shadow-[0_0_10px_rgba(124,58,237,0.2)]",
    ],
  },
});
