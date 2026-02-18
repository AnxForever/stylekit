// GitHub Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const githubStyleTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#d0d7de]",
    radius: "rounded-md",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_1px_0_rgba(27,31,36,0.04)]",
    md: "shadow-[0_1px_3px_rgba(27,31,36,0.12)]",
    lg: "shadow-[0_3px_6px_rgba(140,149,159,0.15)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_1px_3px_rgba(27,31,36,0.12)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)]",
    colored: {
      blue: "shadow-[0_0_0_3px_rgba(9,105,218,0.3)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-[#f6f8fa]",
    transition: "transition-colors duration-150",
    active: "active:bg-[#e8e8e8]",
  },

  typography: {
    heading: "font-semibold text-[#1f2328]",
    body: "text-sm text-[#1f2328]",
    mono: "font-mono text-sm text-[#1f2328]",
    sizes: {
      hero: "text-3xl md:text-4xl",
      h1: "text-2xl md:text-3xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-6 md:py-8",
    container: "px-4 md:px-6",
    card: "p-3 md:p-4",
    gap: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#f6f8fa]",
      accent: ["bg-[#0969da]", "bg-[#1f883d]", "bg-[#cf222e]"],
    },
    text: {
      primary: "text-[#1f2328]",
      secondary: "text-[#656d76]",
      muted: "text-[#8b949e]",
    },
    button: {
      primary: "bg-[#1f883d] text-white border border-[#1b7f37]",
      secondary: "bg-[#f6f8fa] text-[#1f2328] border border-[#d0d7de]",
    },
  },

  forbidden: {
    classes: [
      "rounded-2xl", "rounded-3xl", "rounded-full",
      "bg-gradient-to-r", "bg-gradient-to-br", "bg-gradient-to-b",
      "shadow-lg", "shadow-xl", "shadow-2xl",
      "font-serif",
      "text-4xl", "text-5xl", "text-6xl", "text-7xl",
      "blur-sm", "blur-md", "blur-lg",
    ],
    patterns: [
      "^rounded-(?:2xl|3xl|full)",
      "^bg-gradient",
      "^shadow-(?:lg|xl|2xl)",
      "^text-(?:[4-9]xl)",
      "^blur-",
    ],
    reasons: {
      "rounded-2xl": "GitHub uses consistent rounded-md (6px) corners",
      "rounded-full": "GitHub reserves rounded-full for avatars and labels only",
      "bg-gradient-to-r": "GitHub uses flat, solid colors without gradients",
      "shadow-lg": "GitHub uses minimal shadows; heavy shadows break the clean aesthetic",
      "font-serif": "GitHub uses system sans-serif and monospace fonts only",
      "blur-sm": "GitHub does not use blur effects; keep everything crisp",
    },
  },

  required: {
    button: [
      "rounded-md",
      "text-sm font-semibold",
      "border",
      "shadow-[0_1px_0_rgba(27,31,36,0.04)]",
      "transition-colors duration-150",
    ],
    card: [
      "bg-white",
      "border border-[#d0d7de]",
      "rounded-md",
    ],
    input: [
      "bg-[#f6f8fa]",
      "border border-[#d0d7de]",
      "rounded-md",
      "text-sm text-[#1f2328]",
      "focus:bg-white",
      "focus:border-[#0969da]",
      "focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)]",
      "focus:outline-none",
    ],
  },
});
