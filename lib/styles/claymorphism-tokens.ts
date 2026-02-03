// Claymorphism Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const claymorphismTokens: StyleTokens = {
  border: {
    width: "border-0",
    color: "border-transparent",
    radius: "rounded-3xl",
    style: "border-none",
  },

  shadow: {
    sm: "shadow-[4px_4px_8px_rgba(0,0,0,0.08),inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-1px_-1px_2px_rgba(0,0,0,0.05)]",
    md: "shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]",
    lg: "shadow-[12px_12px_24px_rgba(0,0,0,0.12),inset_6px_6px_12px_rgba(255,255,255,0.5),inset_-3px_-3px_6px_rgba(0,0,0,0.1)]",
    none: "shadow-none",
    hover: "hover:shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]",
    focus: "focus:shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1),0_0_0_4px_rgba(248,180,217,0.3)]",
  },

  interaction: {
    hoverTranslate: "hover:translate-y-1",
    transition: "transition-all duration-200",
    active: "active:translate-y-2",
  },

  typography: {
    heading: "font-bold text-pink-700",
    body: "text-pink-600",
    mono: "font-mono text-pink-500",
    sizes: {
      hero: "text-4xl md:text-6xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-base",
      small: "text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-gradient-to-br from-amber-100 via-pink-100 to-purple-100",
      secondary: "bg-gradient-to-br from-white to-pink-50",
      accent: [
        "bg-gradient-to-b from-pink-300 to-pink-400",
        "bg-gradient-to-b from-green-200 to-green-300",
        "bg-gradient-to-b from-purple-200 to-purple-300",
        "bg-gradient-to-b from-yellow-200 to-yellow-300",
      ],
    },
    text: {
      primary: "text-pink-700",
      secondary: "text-pink-600",
      muted: "text-pink-400",
    },
    button: {
      primary: "bg-gradient-to-b from-pink-300 to-pink-400 text-white",
      secondary: "bg-gradient-to-b from-amber-200 to-amber-300 text-amber-800",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "rounded-sm",
      "rounded",
      "shadow-none",
      "bg-black",
      "text-black",
      "border-black",
    ],
    patterns: [
      "^rounded-(?:none|sm|md)$",
      "^shadow-\\[\\d+px_\\d+px_0px",
      "^bg-(?:black|gray-900|slate-900)",
    ],
    reasons: {
      "rounded-none": "Claymorphism requires large rounded corners (rounded-3xl or larger)",
      "rounded-sm": "Claymorphism requires large rounded corners (rounded-3xl or larger)",
      "shadow-none": "Claymorphism requires combined inner and outer shadows for 3D effect",
      "bg-black": "Claymorphism uses soft, candy-colored backgrounds",
      "text-black": "Claymorphism uses soft colored text, not pure black",
    },
  },

  required: {
    button: [
      "bg-gradient-to-b from-pink-300 to-pink-400",
      "rounded-full",
      "text-white font-bold",
      "shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)]",
      "hover:translate-y-1",
      "transition-all duration-200",
    ],
    card: [
      "bg-gradient-to-br from-white to-pink-50",
      "rounded-[32px]",
      "shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]",
    ],
    input: [
      "bg-gradient-to-b from-gray-100 to-gray-200",
      "rounded-2xl",
      "shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]",
      "focus:outline-none",
      "transition-all",
    ],
  },
};
