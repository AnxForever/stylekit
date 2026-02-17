// Anti-Design Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const antiDesignTokens = createStyleTokens({
  border: {
    width: "border-4",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[4px_4px_0_#000]",
    md: "shadow-[8px_8px_0_#000]",
    lg: "shadow-[12px_12px_0_#000]",
    none: "shadow-none",
    hover: "hover:shadow-[12px_12px_0_#000]",
    focus: "focus:shadow-[4px_4px_0_#0000FF]",
    colored: {
      red: "shadow-[8px_8px_0_#FF0000]",
      blue: "shadow-[8px_8px_0_#0000FF]",
      magenta: "shadow-[8px_8px_0_#FF00FF]",
      green: "shadow-[8px_8px_0_#00FF00]",
    },
  },

  interaction: {
    hoverTranslate:
      "hover:-translate-x-1 hover:-translate-y-1",
    transition: "transition-all duration-100",
    active:
      "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000]",
  },

  typography: {
    heading: "font-black uppercase",
    body: "font-bold text-sm",
    mono: "font-mono font-bold",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-5xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-12 md:py-20 lg:py-28",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-6",
    gap: {
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6",
      lg: "gap-6 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#FFFF00]",
      accent: [
        "bg-[#FF0000]",
        "bg-[#0000FF]",
        "bg-[#FF00FF]",
        "bg-[#00FF00]",
      ],
    },
    text: {
      primary: "text-black",
      secondary: "text-black/80",
      muted: "text-gray-500",
    },
    button: {
      primary: "bg-[#FF0000] text-white",
      secondary: "bg-[#FFFF00] text-black",
      danger: "bg-black text-white",
    },
  },

  forbidden: {
    classes: [
      "rounded-sm",
      "rounded",
      "rounded-md",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-sm",
      "shadow",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "backdrop-blur",
      "backdrop-blur-sm",
      "backdrop-blur-md",
      "backdrop-blur-lg",
    ],
    patterns: [
      "^rounded-(?!none)",
      "^shadow-(?!\\[|none)",
      "^bg-gradient-",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-lg":
        "Anti-Design uses only sharp edges (rounded-none). Never round anything.",
      "shadow-lg":
        "Anti-Design uses hard offset shadows only (shadow-[Xpx_Xpx_0_#000]).",
      "bg-gradient-to-r":
        "Anti-Design uses flat high-saturation colors, no gradients.",
      "backdrop-blur":
        "Anti-Design rejects translucency. Use flat opaque colors.",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-4",
      "border-black",
      "font-black",
      "uppercase",
      "shadow-[4px_4px_0_#000]",
      "transition-all duration-100",
    ],
    card: [
      "rounded-none",
      "border-4",
      "border-black",
      "shadow-[8px_8px_0_#000]",
      "bg-white",
    ],
    input: [
      "rounded-none",
      "border-4",
      "border-black",
      "font-bold",
      "focus:outline-none",
      "focus:border-[#0000FF]",
      "focus:shadow-[4px_4px_0_#0000FF]",
    ],
  },
});
