// Neon Gradient Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const neonGradientTokens: StyleTokens = {
  border: {
    width: "border-4",
    color: "border-yellow-400",
    radius: "rounded-2xl",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    md: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
    lg: "shadow-[0_0_40px_rgba(168,85,247,0.6)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]",
    focus: "focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    colored: {
      purple: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      pink: "shadow-[0_0_30px_rgba(236,72,153,0.4)]",
      cyan: "shadow-[0_0_30px_rgba(34,211,238,0.4)]",
      yellow: "shadow-[0_0_15px_rgba(250,204,21,0.4)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:scale-105",
    transition: "transition-all duration-300",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-bold text-white",
    body: "text-white/80",
    mono: "font-mono text-white/90",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-7xl",
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
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3",
      md: "gap-4 md:gap-6",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0f0a1e]",
      secondary: "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500",
      accent: [
        "bg-gradient-to-br from-purple-500 to-pink-500",
        "bg-gradient-to-br from-cyan-400 via-teal-500 to-green-500",
        "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500",
        "bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400",
      ],
    },
    text: {
      primary: "text-white",
      secondary: "text-white/80",
      muted: "text-white/40",
    },
    button: {
      primary: "bg-gradient-to-r from-cyan-400 to-pink-500 text-white",
      secondary: "bg-transparent text-white border-2 border-cyan-400",
    },
  },

  forbidden: {
    classes: [
      // No light backgrounds
      "bg-white", "bg-gray-50", "bg-gray-100", "bg-slate-50",
      // No low saturation colors
      "bg-gray-500", "text-gray-500",
      // No thin borders
      "border", "border-2",
      // No small rounded corners
      "rounded-none", "rounded-sm", "rounded",
      // No muted shadows
      "shadow-sm", "shadow",
      // No emoji (use Lucide icons)
    ],
    patterns: [
      "^bg-white$",
      "^bg-gray-[0-2]00$",
      "^rounded-none$",
      "^rounded-sm$",
      "^rounded$",
      "^border$",
      "^border-2$",
    ],
    reasons: {
      "bg-white": "Neon Gradient uses dark background bg-[#0f0a1e]",
      "rounded-none": "Neon Gradient uses large rounded corners (rounded-2xl or rounded-3xl)",
      "rounded-sm": "Neon Gradient uses large rounded corners (rounded-2xl or rounded-3xl)",
      "border": "Neon Gradient uses thick borders (border-4) for visual impact",
      "border-2": "Neon Gradient uses thick borders (border-4) for visual impact",
      "shadow-sm": "Neon Gradient uses glow shadows shadow-[0_0_30px_...]",
    },
  },

  required: {
    button: [
      "px-6 py-3 md:px-8 md:py-4",
      "bg-gradient-to-r from-cyan-400 to-pink-500",
      "text-white font-bold",
      "rounded-xl",
      "border-2 border-white/20",
      "shadow-[0_0_20px_rgba(236,72,153,0.5)]",
      "hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]",
      "hover:scale-105",
      "transition-all duration-300",
    ],
    card: [
      "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500",
      "rounded-2xl md:rounded-3xl",
      "border-4 border-yellow-400",
      "p-6 md:p-8",
      "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      "hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]",
      "hover:-translate-y-2",
      "transition-all duration-300",
    ],
    input: [
      "w-full px-5 py-4",
      "bg-white/5",
      "border-2 border-purple-500/50",
      "rounded-xl",
      "text-white",
      "placeholder:text-white/40",
      "focus:outline-none",
      "focus:border-cyan-400",
      "focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]",
      "transition-all duration-300",
    ],
  },
};
