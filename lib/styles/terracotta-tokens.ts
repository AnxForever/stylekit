// Terracotta Style Tokens
import { createStyleTokens } from "./token-defaults";

export const terracottaTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#d4a373]/30",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-sm shadow-[#b5654a]/5",
    md: "shadow-md shadow-[#b5654a]/10",
    lg: "shadow-lg shadow-[#b5654a]/12",
    none: "shadow-none",
    hover: "hover:shadow-lg hover:shadow-[#b5654a]/15",
    focus: "ring-2 ring-[#b5654a]/20",
  },

  interaction: {
    hoverOpacity: "hover:bg-[#d4a373]/10",
    transition: "transition-all duration-300",
  },

  typography: {
    heading: "font-semibold",
    body: "font-sans",
    mono: "font-mono",
    sizes: {
      hero: "text-4xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl",
      h2: "text-2xl md:text-3xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-12",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-[#faf5ef]",
      secondary: "bg-white",
      accent: ["bg-[#b5654a]", "bg-[#d4a373]", "bg-[#8b9d77]"],
    },
    text: {
      primary: "text-[#7a6350]",
      secondary: "text-[#7a6350]/75",
      muted: "text-[#d4a373]",
    },
    button: {
      primary: "bg-[#b5654a] text-[#faf5ef]",
      secondary: "bg-transparent text-[#b5654a] border border-[#b5654a]/40",
      danger: "bg-red-700 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-blue-500",
      "bg-purple-500",
      "bg-cyan-500",
      "bg-indigo-500",
      "text-black",
      "bg-black",
      "rounded-none",
      "rounded-sm",
      "shadow-2xl",
      "bg-gradient-to-r",
      "border-black",
      "bg-neon-green",
    ],
    patterns: [
      "^bg-blue-",
      "^bg-purple-",
      "^bg-cyan-",
      "^bg-indigo-",
      "^bg-violet-",
      "^bg-gradient-",
      "^text-blue-",
      "^text-purple-",
      "^text-cyan-",
      "^neon-",
    ],
    reasons: {
      "bg-blue-500": "Terracotta uses warm earth tones, not cool colors",
      "bg-purple-500": "Terracotta avoids cool tones; use warm earth palette instead",
      "rounded-none": "Terracotta uses rounded corners (rounded-lg) to evoke handcrafted ceramics",
      "text-black": "Terracotta uses warm dark tones (#7a6350) instead of pure black",
      "bg-gradient-to-r": "Terracotta uses solid, natural earth colors",
      "shadow-2xl": "Terracotta uses soft warm shadows, not heavy ones",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-lg",
      "font-medium",
      "transition-colors duration-300",
    ],
    card: [
      "bg-[#faf5ef]",
      "rounded-xl",
      "border border-[#d4a373]/25",
    ],
    input: [
      "px-4 py-3",
      "bg-white",
      "border border-[#d4a373]/40",
      "rounded-lg",
      "text-[#7a6350]",
      "placeholder-[#d4a373]/50",
      "focus:border-[#b5654a]",
      "focus:ring-2 focus:ring-[#b5654a]/20",
      "transition-all duration-300",
    ],
  },
});
