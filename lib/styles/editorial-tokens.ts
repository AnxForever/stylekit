// Editorial Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const editorialTokens: StyleTokens = {
  border: {
    width: "border",
    color: "border-border",
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
    hoverOpacity: "hover:opacity-90",
    transition: "transition-colors duration-200",
  },

  typography: {
    heading: "font-serif tracking-tight",
    body: "font-sans",
    mono: "font-mono",
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
    section: "py-16 md:py-24 lg:py-32",
    container: "px-6 md:px-12",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-background",
      secondary: "bg-foreground",
      accent: ["bg-[#e63946]"],
    },
    text: {
      primary: "text-foreground",
      secondary: "text-background",
      muted: "text-muted",
    },
    button: {
      primary: "bg-foreground text-background",
      secondary: "bg-transparent text-foreground",
    },
  },

  forbidden: {
    classes: [
      // No rounded corners
      "rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
      // No shadows
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl",
      // No thick borders
      "border-2", "border-4", "border-8",
      // No bright colors
      "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500",
      // No gradients
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b",
      // No bold headings (Editorial uses font-normal for serif)
      "font-black", "font-extrabold",
    ],
    patterns: [
      "^rounded-(?!none)",           // Any rounded except rounded-none
      "^shadow-(?!none)",            // Any shadow
      "^border-[248]",               // Thick borders
      "^bg-gradient-",               // Any gradient
    ],
    reasons: {
      "rounded-lg": "Editorial uses sharp corners only (rounded-none)",
      "shadow-lg": "Editorial avoids shadows completely",
      "border-4": "Editorial uses thin borders only (border)",
      "bg-gradient-to-r": "Editorial uses solid colors, no gradients",
      "font-black": "Editorial headings use font-serif with normal weight, not bold",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "text-sm tracking-wide",
      "transition-colors",
    ],
    card: [
      "border border-border",
      "hover:border-foreground",
      "transition-colors",
    ],
    input: [
      "border border-border",
      "text-sm",
      "focus:outline-none",
      "focus:border-foreground",
      "transition-colors",
      "placeholder:text-muted",
    ],
  },
};
