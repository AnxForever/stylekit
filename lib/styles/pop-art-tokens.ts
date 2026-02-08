// Pop Art Style Tokens
import type { StyleTokens } from "./tokens";

export const popArtTokens: StyleTokens = {
  border: {
    width: "border-4",
    color: "border-black",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0_#000]",
    md: "shadow-[4px_4px_0_#000]",
    lg: "shadow-[6px_6px_0_#000]",
    none: "shadow-none",
    hover: "shadow-[6px_6px_0_#000]",
    focus: "shadow-[4px_4px_0_#ff69b4]",
    colored: {
      yellow: "shadow-[4px_4px_0_#ffdd00]",
      pink: "shadow-[4px_4px_0_#ff69b4]",
      blue: "shadow-[4px_4px_0_#00bfff]",
    },
  },

  interaction: {
    hoverScale: "hover:-translate-x-0.5 hover:-translate-y-0.5",
    transition: "transition-all duration-150",
  },

  typography: {
    heading: "font-black uppercase",
    body: "font-bold",
    mono: "font-mono",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-8",
    card: "p-6",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-[#ffdd00]",
      accent: ["bg-[#ff69b4]", "bg-[#00bfff]", "bg-black"],
    },
    text: {
      primary: "text-black",
      secondary: "text-gray-800",
      muted: "text-gray-500",
    },
    button: {
      primary: "bg-[#ffdd00] text-black border-4 border-black",
      secondary: "bg-[#ff69b4] text-white border-4 border-black",
      danger: "bg-red-600 text-white border-4 border-black shadow-[4px_4px_0_#000]",
    },
  },

  forbidden: {
    classes: [
      "bg-gradient-to-r",
      "bg-gradient-to-l",
      "bg-gradient-to-b",
      "bg-gradient-to-t",
      "shadow-sm",
      "shadow-md",
      "shadow-lg",
      "shadow-xl",
      "text-gray-300",
      "text-gray-200",
      "rounded-full",
      "border",
    ],
    patterns: [
      "^bg-gradient",
      "^shadow-(?!\\[)",
      "^rounded-full",
      "^border$",
      "^text-gray-[1-3]",
    ],
    reasons: {
      "bg-gradient-to-r": "Pop Art uses flat color fills, not gradients",
      "shadow-md": "Use hard offset shadows: shadow-[4px_4px_0_#000]",
      "rounded-full": "Keep shapes angular (rounded-lg max)",
      "border": "Borders must be thick: border-2 or border-4",
    },
  },

  required: {
    button: [
      "px-6 py-3",
      "border-4 border-black",
      "rounded-lg",
      "font-black",
      "uppercase tracking-wider",
      "shadow-[4px_4px_0_#000]",
      "transition-all duration-150",
    ],
    card: [
      "bg-white",
      "border-4 border-black",
      "rounded-lg",
      "shadow-[6px_6px_0_#000]",
    ],
    input: [
      "bg-white",
      "border-4 border-black",
      "rounded-lg",
      "text-black",
      "font-bold",
      "focus:border-[#ff69b4]",
      "focus:shadow-[4px_4px_0_#ff69b4]",
    ],
  },
};
