// Kawaii Minimal Style Tokens
import { createStyleTokens } from "./token-defaults";

export const kawaiiMinimalTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-pink-200",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    none: "shadow-none",
    hover: "shadow-lg",
    focus: "ring-4 ring-pink-100",
    colored: {
      pink: "shadow-[0_4px_14px_rgba(249,168,212,0.3)]",
      purple: "shadow-[0_4px_14px_rgba(167,139,250,0.3)]",
      cyan: "shadow-[0_4px_14px_rgba(103,232,249,0.3)]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-105 hover:shadow-lg",
    transition: "transition-all duration-200",
  },

  typography: {
    heading: "font-semibold",
    body: "font-medium",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
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
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#FFF7ED]",
      secondary: "bg-white",
      accent: ["bg-pink-100", "bg-purple-100", "bg-cyan-100"],
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-500",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-pink-300 text-white",
      secondary: "bg-white border-2 border-pink-200 text-pink-400",
      danger: "bg-red-300 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-gray-900", "bg-gray-950", "bg-black", "bg-slate-900",
      "rounded-none", "rounded-sm",
      "shadow-[0_0_", "text-shadow",
      "border-black", "border-gray-900",
      "font-mono",
    ],
    patterns: [
      "^bg-(?:gray-9|black|slate-9)",
      "^rounded-(?:none|sm)$",
      "^shadow-\\[0_0_.*(?:rgba|#)",
      "^border-(?:black|gray-9)",
    ],
    reasons: {
      "bg-black": "Kawaii style requires light warm backgrounds",
      "rounded-none": "Must use large rounded corners for cute aesthetic",
      "shadow-[0_0_": "Glow effects are forbidden; use soft standard shadows",
      "border-black": "Use pastel-colored light borders only",
    },
  },

  required: {
    button: ["rounded-full", "transition-all", "font-medium"],
    card: ["rounded-3xl", "shadow-md"],
    input: ["rounded-2xl", "border-2", "focus:outline-none"],
  },
});
