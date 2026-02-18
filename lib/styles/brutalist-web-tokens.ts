// Brutalist Web Style Tokens - Precise class mappings for AI
// Raw 90s HTML aesthetics: system fonts, thin borders, zero decoration
import { createStyleTokens } from "./token-defaults";

export const brutalistWebTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    none: "shadow-none",
    hover: "shadow-none",
    focus: "shadow-none",
  },

  interaction: {
    hoverTranslate: "",
    transition: "",
    active: "",
  },

  typography: {
    heading: "font-serif font-bold",
    body: "font-mono text-sm",
    mono: "font-mono",
    sizes: {
      hero: "text-3xl md:text-5xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-lg md:text-xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-6 md:py-8",
    container: "px-4",
    card: "p-4",
    gap: {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-white",
      accent: ["bg-white"],
    },
    text: {
      primary: "text-black",
      secondary: "text-black",
      muted: "text-black",
    },
    button: {
      primary: "bg-white text-black",
      secondary: "bg-white text-black",
      danger: "bg-white text-[#ff0000]",
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
      "transition",
      "transition-all",
      "transition-colors",
      "duration-100",
      "duration-150",
      "duration-200",
      "duration-300",
      "animate-pulse",
      "animate-spin",
      "animate-bounce",
    ],
    patterns: [
      "^rounded-(?!none)",
      "^shadow-(?!none)",
      "^bg-gradient-",
      "^backdrop-blur",
      "^animate-",
      "^transition-",
      "^duration-",
    ],
    reasons: {
      "rounded-lg":
        "Brutalist Web uses zero border-radius. Everything is sharp and unstyled.",
      "shadow-lg":
        "Brutalist Web uses no shadows at all. Raw HTML has no shadows.",
      "bg-gradient-to-r":
        "Brutalist Web uses flat white backgrounds only. No gradients.",
      "backdrop-blur":
        "Brutalist Web rejects all modern visual effects. Plain and raw.",
      "transition-all":
        "Brutalist Web uses no CSS transitions or animations. Static pages only.",
      "animate-pulse":
        "Brutalist Web forbids all animations. The page is static like 90s HTML.",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border",
      "border-black",
      "font-mono",
      "bg-white",
    ],
    card: [
      "rounded-none",
      "border",
      "border-black",
      "bg-white",
    ],
    input: [
      "rounded-none",
      "border",
      "border-black",
      "font-mono",
      "bg-white",
    ],
  },
});
