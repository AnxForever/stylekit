// Hand-Drawn Doodle Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const handDrawnDoodleTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#2c2c2c]",
    radius: "rounded-sm",
    style: "border-dashed",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_#4ecdc4]",
    md: "shadow-[3px_3px_0px_#4ecdc4]",
    lg: "shadow-[4px_4px_0px_#4ecdc4]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_6px_0px_#4ecdc4]",
    focus: "focus:shadow-[2px_2px_0px_#ffd93d]",
    colored: {
      red: "shadow-[4px_4px_0px_#ff6b6b]",
      teal: "shadow-[4px_4px_0px_#4ecdc4]",
      yellow: "shadow-[4px_4px_0px_#ffd93d]",
    },
  },

  interaction: {
    hoverTranslate: "hover:translate-x-[1px] hover:translate-y-[1px]",
    transition: "transition-all duration-200 ease-in-out",
    active: "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  },

  typography: {
    heading: "font-sans font-bold",
    body: "font-sans",
    sizes: {
      hero: "text-4xl md:text-6xl lg:text-8xl",
      h1: "text-3xl md:text-5xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-8",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#fffef5]",
      secondary: "bg-[#f8f7f0]",
      accent: ["bg-[#ff6b6b]", "bg-[#4ecdc4]", "bg-[#ffd93d]"],
    },
    text: {
      primary: "text-[#2c2c2c]",
      secondary: "text-[#ff6b6b]",
      muted: "text-[#2c2c2c]/50",
    },
    button: {
      primary: "bg-[#2c2c2c] text-[#fffef5] shadow-[3px_3px_0px_#ff6b6b]",
      secondary: "bg-[#ff6b6b] text-[#fffef5] shadow-[3px_3px_0px_#4ecdc4]",
      danger: "bg-[#ff6b6b] text-[#fffef5]",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r", "bg-gradient-to-b", "bg-gradient-to-br",
      "shadow-md", "shadow-lg", "shadow-xl",
      "font-mono",
      "backdrop-blur",
      "rounded-none",
    ],
    patterns: [
      "^bg-gradient-",
      "^shadow-(?:md|lg|xl)$",
      "^font-mono$",
      "^backdrop-blur",
    ],
    reasons: {
      "bg-gradient-to-r": "Hand-Drawn Doodle uses flat marker colors, no gradients",
      "shadow-md": "Hand-Drawn Doodle uses hard offset shadows only",
      "font-mono": "Hand-Drawn Doodle uses casual sans-serif, not monospace",
      "backdrop-blur": "Hand-Drawn Doodle style is opaque paper, no blur/glass effects",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "font-sans font-semibold",
      "border-2 border-dashed",
      "transition-all duration-200 ease-in-out",
    ],
    card: [
      "rounded-sm",
      "bg-[#fffef5]",
      "border-2 border-dashed border-[#2c2c2c]",
      "shadow-[4px_4px_0px_#4ecdc4]",
    ],
    input: [
      "rounded-sm",
      "border-2 border-dashed border-[#2c2c2c]",
      "bg-[#fffef5]",
      "font-sans",
      "focus:outline-none",
    ],
  },
};
