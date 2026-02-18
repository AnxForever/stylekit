// Op Art Style Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const opArtTokens = createStyleTokens({
  border: {
    width: "border-2",
    color: "border-black",
    radius: "rounded-none",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-none",
    md: "shadow-[4px_4px_0_#000000]",
    lg: "shadow-[6px_6px_0_#000000]",
    none: "shadow-none",
    hover: "hover:shadow-[4px_4px_0_#000000]",
    focus: "focus:shadow-[4px_4px_0_#000000]",
    colored: {
      red: "shadow-[4px_4px_0_#ff3300]",
      blue: "shadow-[4px_4px_0_#0066ff]",
    },
  },

  interaction: {
    hoverOpacity: "hover:opacity-100",
    transition: "transition-colors duration-200",
    active: "active:translate-x-[2px] active:translate-y-[2px]",
  },

  typography: {
    heading: "font-sans font-bold uppercase tracking-[0.3em]",
    body: "font-sans font-medium",
    mono: "font-mono",
    sizes: {
      hero: "text-6xl md:text-8xl lg:text-9xl",
      h1: "text-4xl md:text-6xl",
      h2: "text-2xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-28 lg:py-36",
    container: "px-6 md:px-12 lg:px-20",
    card: "p-8",
    gap: {
      sm: "gap-2 md:gap-4",
      md: "gap-4 md:gap-8",
      lg: "gap-8 md:gap-12",
    },
  },

  colors: {
    background: {
      primary: "bg-white",
      secondary: "bg-black",
      accent: ["bg-[#ff3300]", "bg-[#0066ff]", "bg-[#ffcc00]"],
    },
    text: {
      primary: "text-black",
      secondary: "text-white",
      muted: "text-black/50",
    },
    button: {
      primary: "bg-black text-white",
      secondary: "bg-white text-black border-2 border-black",
      danger: "bg-[#ff3300] text-white",
    },
  },

  forbidden: {
    classes: [
      "font-serif",
      "rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full",
      "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl",
      "bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-b", "bg-gradient-to-t",
      "backdrop-blur", "backdrop-blur-sm", "backdrop-blur-md", "backdrop-blur-lg",
      "italic",
    ],
    patterns: [
      "^font-serif$",
      "^rounded-(?!none)",
      "^shadow-(?:sm|md|lg|xl|2xl)$",
      "^bg-gradient-",
      "^backdrop-blur",
      "^opacity-(?:[1-4]\\d|50)$",
    ],
    reasons: {
      "font-serif": "Op Art uses clean geometric sans-serif typography (font-sans)",
      "rounded-lg": "Op Art demands sharp geometric edges for optical precision (rounded-none)",
      "shadow-md": "Op Art is flat and graphic; soft shadows break the 2D illusion",
      "bg-gradient-to-r": "Op Art uses hard-edge flat colors for maximum contrast",
      "backdrop-blur": "Op Art avoids blur effects that soften the precise geometric patterns",
    },
  },

  required: {
    button: [
      "rounded-none",
      "border-2 border-black",
      "font-sans font-medium uppercase tracking-[0.3em]",
      "transition-colors duration-200",
    ],
    card: [
      "rounded-none",
      "border-2 border-black",
      "bg-white",
    ],
    input: [
      "rounded-none",
      "border-2 border-black",
      "bg-white",
      "text-black",
      "font-sans font-medium uppercase tracking-wider",
      "focus:border-[#ff3300]",
      "focus:outline-none",
    ],
  },
});
