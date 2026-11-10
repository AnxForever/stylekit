// Liquid Glass Style Tokens — clear optical surfaces with portable CSS fallbacks.
// These classes describe the portable fallback only. Compatible environments MUST
// pair them with the shared LiquidGlass renderer for visible curved-rim refraction.
// A translucent blur alone does not implement the Liquid Glass material.
import { createStyleTokens } from "./token-defaults";

export const liquidGlassTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-white/24",
    radius: "rounded-[24px]",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_rgba(8,24,50,0.08)]",
    md: "shadow-[0_8px_22px_rgba(8,24,50,0.12)]",
    lg: "shadow-[0_12px_32px_rgba(8,24,50,0.16)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_14px_32px_rgba(8,24,50,0.16)]",
    focus: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#557b79] dark:focus-visible:ring-[#c7e4e5]",
    colored: {
      inner: "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.48)]",
      teal: "shadow-[0_8px_24px_rgba(37,65,74,0.14)]",
    },
  },

  interaction: {
    hoverOpacity: "hover:bg-[#25414a]/95",
    transition:
      "transition-[transform,background-color,border-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none",
    active:
      "active:duration-[110ms] active:scale-[0.985] active:translate-y-px motion-reduce:active:duration-0 motion-reduce:active:scale-100 motion-reduce:active:translate-y-0",
  },

  typography: {
    heading: "font-medium tracking-[-0.025em] text-[#202929]",
    subtitle: "font-medium text-[#4c5d57]",
    body: "font-sans text-[#202929]",
    mono: "font-mono tabular-nums text-[#25414a]",
    sizes: {
      hero: "text-5xl md:text-7xl lg:text-8xl",
      h1: "text-4xl md:text-5xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-xl md:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-6 md:px-8",
    card: "p-6 md:p-8",
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },

  colors: {
    background: {
      // Portable page skeletons pair these reading surfaces with dark text.
      // Dark optical scenes belong to the style palette and dedicated renderer.
      primary: "bg-[#f3f2ed]",
      secondary: "bg-[#e4efeb]",
      accent: [
        "bg-[#e4efeb]",
        "bg-white",
        "bg-[#c7e4e5]",
      ],
    },
    text: {
      primary: "text-[#202929]",
      secondary: "text-[#25414a]",
      muted: "text-[#4c5d57]",
    },
    button: {
      primary:
        "bg-[#25414a]/85 text-white border border-white/25 backdrop-blur-[10px]",
      secondary: "bg-[#25414a] text-white border border-white/24",
    },
  },

  forbidden: {
    classes: [
      "bg-[#ff2d92]",
      "bg-[#a855f7]",
      "bg-[#4ecdc4]",
      "text-[#ff2d92]",
      "text-[#a855f7]",
      "from-[#ff6b6b]",
      "via-[#4ecdc4]",
      "to-[#a855f7]",
      "backdrop-saturate-[1.8]",
      "backdrop-saturate-200",
    ],
    patterns: [
      "(?:^|:)(?:from|via|to)-\\[#(?:ff6b6b|ff2d92|a855f7|4ecdc4)",
      "^backdrop-saturate-",
      "^text-transparent$",
    ],
    reasons: {
      "bg-[#ff2d92]": "Use muted glass tints and the teal scene palette, not neon surfaces.",
      "bg-[#a855f7]": "The material uses neutral light, not purple neon surfaces.",
      "bg-[#4ecdc4]": "Keep cyan as a restrained highlight rather than a filled surface.",
      "text-[#ff2d92]": "Keep interface text neutral and readable.",
      "text-[#a855f7]": "Keep interface text neutral and readable.",
      "from-[#ff6b6b]": "Liquid Glass uses a fine neutral rim, not rainbow borders.",
      "via-[#4ecdc4]": "Liquid Glass uses a fine neutral rim, not rainbow borders.",
      "to-[#a855f7]": "Liquid Glass uses a fine neutral rim, not rainbow borders.",
      "backdrop-saturate-[1.8]": "Keep colors from the scene natural instead of boosting saturation.",
      "backdrop-saturate-200": "Keep colors from the scene natural instead of boosting saturation.",
    },
  },

  required: {
    button: [
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "min-h-[44px]",
      "min-w-[44px]",
      "rounded-full",
      "border",
      "backdrop-blur-[10px]",
      "transition-[transform,background-color,border-color,box-shadow]",
      "duration-[420ms]",
      "active:duration-[110ms]",
      "active:scale-[0.985]",
      "motion-reduce:transition-none",
    ],
    card: [
      "relative",
      "rounded-[24px]",
      "border",
      "shadow-[0_12px_32px_rgba(8,24,50,0.12)]",
      "transition-[transform,background-color,border-color,box-shadow]",
      "duration-[420ms]",
      "motion-reduce:transition-none",
    ],
    input: [
      "w-full",
      "min-h-[44px]",
      "rounded-full",
      "border",
      "backdrop-blur-[12px]",
      "focus:outline-none",
      "transition-[background-color,border-color,box-shadow]",
      "duration-[420ms]",
      "motion-reduce:transition-none",
    ],
  },
});
