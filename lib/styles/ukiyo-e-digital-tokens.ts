// Ukiyo-e Digital Style Tokens - Precise class mappings for AI
import type { StyleTokens } from "./tokens";

export const ukiyoEDigitalTokens: StyleTokens = {
  border: {
    width: "border-2",
    color: "border-[#1a3055]",
    radius: "rounded-sm",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[2px_2px_0px_#1a3055]",
    md: "shadow-[4px_4px_0px_#1a3055]",
    lg: "shadow-[6px_6px_0px_#1a3055]",
    none: "shadow-none",
    hover: "hover:shadow-[6px_6px_0px_#1a3055]",
    focus: "focus:shadow-[2px_2px_0px_#d4553a]",
    colored: {
      indigo: "shadow-[4px_4px_0px_#1a3055]",
      vermilion: "shadow-[4px_4px_0px_#d4553a]",
      gold: "shadow-[4px_4px_0px_#c9a227]",
    },
  },

  interaction: {
    hoverTranslate: "hover:-translate-y-0.5",
    transition: "transition-all duration-300 ease-in-out",
    active: "active:translate-y-0.5",
  },

  typography: {
    heading: "font-bold tracking-wider",
    body: "font-sans",
    mono: "font-mono",
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
      primary: "bg-[#f5f0e1]",
      secondary: "bg-[#1a3055]",
      accent: ["bg-[#d4553a]", "bg-[#c9a227]", "bg-[#2a5a8c]"],
    },
    text: {
      primary: "text-[#1a3055]",
      secondary: "text-[#d4553a]",
      muted: "text-[#1a3055]/60",
    },
    button: {
      primary: "bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055]",
      secondary: "bg-[#1a3055] text-[#f5f0e1] border-2 border-[#c9a227]",
    },
  },

  forbidden: {
    classes: [
      "rounded-full", "rounded-2xl", "rounded-xl", "rounded-lg",
      "bg-gradient-to-r", "bg-gradient-to-br",
      "backdrop-blur", "backdrop-blur-sm", "backdrop-blur-md",
      "shadow-[0_0_16px_rgba", "shadow-[0_0_20px_rgba",
      "text-[#ff00ff]", "text-[#00ffff]",
    ],
    patterns: [
      "^rounded-(?:full|2xl|xl|lg)",
      "^bg-gradient",
      "^backdrop-blur",
      "^shadow-\\[0_0_\\d+px_rgba",
    ],
    reasons: {
      "rounded-full": "Ukiyo-e uses sharp edges (rounded-sm) to emulate woodblock print",
      "bg-gradient-to-r": "Ukiyo-e uses flat solid colors, not gradients",
      "backdrop-blur": "Ukiyo-e uses flat opaque surfaces, not transparency effects",
      "shadow-[0_0_16px_rgba": "Ukiyo-e uses hard-edge block shadows, not soft glow",
    },
  },

  required: {
    button: [
      "rounded-sm",
      "border-2",
      "shadow-[3px_3px_0px_#1a3055]",
      "font-bold tracking-wider",
      "transition-all duration-300 ease-in-out",
    ],
    card: [
      "rounded-sm",
      "bg-[#f5f0e1]",
      "border-2 border-[#1a3055]",
      "shadow-[4px_4px_0px_#1a3055]",
    ],
    input: [
      "rounded-sm",
      "border-2 border-[#1a3055]/60",
      "bg-[#f5f0e1]",
      "text-[#1a3055]",
      "focus:border-[#d4553a]",
      "focus:outline-none",
    ],
  },
};
