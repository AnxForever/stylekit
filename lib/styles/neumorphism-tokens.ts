// Neumorphism Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const neumorphismTokens: StyleTokens = {
  border: {
    width: "border-0",
    color: "border-transparent",
    radius: "rounded-xl",
    style: "border-none",
  },

  shadow: {
    sm: "shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]",
    md: "shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] md:shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]",
    lg: "shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] md:shadow-[12px_12px_24px_#b8bcc2,-12px_-12px_24px_#ffffff]",
    none: "shadow-none",
    hover: "hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]",
    focus: "focus:shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]",
    colored: {
      pressed: "shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]",
      pressedLg: "shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]",
    },
  },

  interaction: {
    hoverScale: "hover:scale-[0.98]",
    transition: "transition-all duration-200",
    active: "active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]",
  },

  typography: {
    heading: "font-semibold text-gray-800",
    body: "text-gray-600",
    mono: "font-mono text-gray-700",
    sizes: {
      hero: "text-4xl md:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-12 md:py-20",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-[#e0e5ec]",
      secondary: "bg-[#f0f0f3]",
      accent: ["bg-[#6d5dfc]", "bg-[#ff6b6b]", "bg-[#4ecdc4]", "bg-[#ffe66d]"],
    },
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: "bg-[#6d5dfc] text-white",
      secondary: "bg-[#e0e5ec] text-gray-700",
    },
  },

  forbidden: {
    classes: [
      // No sharp corners
      "rounded-none", "rounded-sm",
      // No hard shadows
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      // No pure black/white backgrounds
      "bg-black", "bg-white", "bg-gray-900", "bg-gray-950",
      // No thick borders
      "border-2", "border-4", "border-8", "border",
      // No gradients
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b",
      // No high contrast
      "text-black", "text-white",
    ],
    patterns: [
      "^rounded-none",               // No sharp corners
      "^shadow-(?!\\[|none)",        // Only custom shadows allowed
      "^bg-gradient-",               // No gradients
      "^border-[248]",               // No thick borders
      "^bg-black",                   // No pure black
      "^bg-white$",                  // No pure white
    ],
    reasons: {
      "rounded-none": "Neumorphism requires rounded corners (rounded-xl or rounded-2xl)",
      "shadow-lg": "Neumorphism uses dual-shadow system, not standard shadows",
      "bg-white": "Neumorphism uses light gray backgrounds (#e0e5ec), not pure white",
      "bg-black": "Neumorphism uses light gray backgrounds, not black",
      "border-2": "Neumorphism avoids visible borders, shadows create separation",
      "bg-gradient-to-r": "Neumorphism uses solid colors, no gradients",
    },
  },

  required: {
    button: [
      "bg-[#e0e5ec]",
      "rounded-xl",
      "shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]",
      "hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]",
      "active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]",
      "transition-all duration-200",
    ],
    card: [
      "bg-[#e0e5ec]",
      "rounded-2xl",
      "shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]",
    ],
    input: [
      "bg-[#e0e5ec]",
      "rounded-xl",
      "shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]",
      "focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]",
      "focus:outline-none",
      "placeholder:text-gray-400",
      "transition-shadow duration-200",
    ],
  },
};
