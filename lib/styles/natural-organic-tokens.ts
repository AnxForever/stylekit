// Natural Organic Style Tokens
import type { StyleTokens } from "./tokens";

export const naturalOrganicTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-stone-200",
    radius: "rounded-full",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-sm",
    lg: "shadow-md",
    none: "shadow-none",
    hover: "shadow-md",
    focus: "ring-2 ring-stone-300",
  },

  interaction: {
    hoverOpacity: "hover:bg-stone-100",
    transition: "transition-colors duration-300",
  },

  typography: {
    heading: "font-serif",
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
      primary: "bg-[#faf6f1]",
      secondary: "bg-white",
      accent: ["bg-[#8b9d77]", "bg-[#d4a373]", "bg-stone-800"],
    },
    text: {
      primary: "text-stone-800",
      secondary: "text-stone-600",
      // Using stone-600 for WCAG AA compliance (7.22:1)
      muted: "text-stone-600",
    },
    button: {
      primary: "bg-stone-800 text-stone-50",
      secondary: "bg-transparent text-stone-800 border border-stone-300",
      danger: "bg-red-700 text-white",
    },
  },

  forbidden: {
    classes: [
      "bg-blue-500",
      "bg-purple-500",
      "bg-cyan-500",
      "text-black",
      "rounded-none",
      "rounded-sm",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "bg-gradient-to-r",
    ],
    patterns: [
      "^bg-blue-",
      "^bg-purple-",
      "^bg-cyan-",
      "^bg-gradient-",
      "^shadow-[lx2]",
    ],
    reasons: {
      "bg-blue-500": "Natural Organic uses warm earth tones, not cool colors",
      "rounded-none": "Natural Organic uses organic shapes (rounded-full, rounded-[2rem])",
      "shadow-xl": "Natural Organic avoids heavy shadows, keep it subtle",
      "bg-gradient-to-r": "Natural Organic uses solid, natural colors",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "rounded-full",
      "font-medium",
      "transition-colors duration-300",
    ],
    card: [
      "bg-[#faf6f1]",
      "rounded-[2rem]",
      "border border-stone-200",
    ],
    input: [
      "px-5 py-3",
      "bg-white",
      "border border-stone-200",
      "rounded-full",
      "text-stone-800",
      "placeholder:text-stone-400",
      "focus:border-stone-400",
      "focus:ring-2 focus:ring-stone-200",
      "transition-all duration-300",
    ],
  },
};
