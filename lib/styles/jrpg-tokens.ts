// JRPG Style Tokens
import type { StyleTokens } from "./tokens";

export const jrpgTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-blue-700",
    radius: "rounded-md",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.3)]",
    md: "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)]",
    lg: "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.6)]",
    none: "shadow-none",
    hover: "shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.4)]",
    focus: "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_0_2px_rgba(30,64,175,0.4)]",
    colored: {
      gold: "shadow-[0_0_8px_rgba(251,191,36,0.3)]",
      blue: "shadow-[0_0_8px_rgba(30,64,175,0.4)]",
      green: "shadow-[0_0_6px_rgba(34,197,94,0.4)]",
    },
  },

  interaction: {
    hoverScale: "hover:brightness-110",
    transition: "transition-all duration-200",
    active: "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]",
  },

  typography: {
    heading: "font-bold",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-7xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20",
    container: "px-4 md:px-8",
    card: "p-4 md:p-6",
    gap: {
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
    },
  },

  colors: {
    background: {
      primary: "bg-[#0f172a]",
      secondary: "bg-slate-900",
      accent: ["bg-[#1e40af]", "bg-[#fbbf24]", "bg-[#22c55e]"],
    },
    text: {
      primary: "text-[#f0f9ff]",
      secondary: "text-[#fbbf24]",
      muted: "text-blue-300/60",
    },
    button: {
      primary: "bg-gradient-to-b from-blue-700 to-blue-900 text-[#f0f9ff]",
      secondary: "bg-slate-900/80 text-blue-300 border-2 border-blue-400/60",
      danger: "bg-gradient-to-b from-red-700 to-red-900 text-white",
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
      "rounded-full",
      "rounded-3xl",
      "border-0",
    ],
    patterns: [
      "^bg-white",
      "^bg-gray-[1-3]",
      "^bg-slate-[1-3]",
      "^shadow-(?!\\[)",
      "^rounded-full",
      "^rounded-3xl",
    ],
    reasons: {
      "bg-white": "JRPG uses dark navy backgrounds only",
      "shadow-md": "Use inset/beveled shadows: shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
      "rounded-full": "RPG buttons use subtle rounding (rounded-md max)",
      "border-0": "JRPG panels require visible borders for the menu box aesthetic",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-md",
      "font-bold",
      "tracking-wide",
      "border-2",
      "transition-all duration-200",
    ],
    card: [
      "bg-gradient-to-b from-slate-800 to-slate-900",
      "border-2 border-blue-700",
      "rounded-md",
      "ring-1 ring-blue-400/20",
    ],
    input: [
      "bg-slate-900",
      "border-2 border-blue-700",
      "rounded-md",
      "text-[#f0f9ff]",
      "focus:border-blue-400",
      "focus:ring-1 focus:ring-blue-400/30",
      "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
    ],
  },
};
