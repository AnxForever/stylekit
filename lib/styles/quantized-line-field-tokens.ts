import { createStyleTokens } from "./token-defaults";

export const quantizedLineFieldTokens = createStyleTokens({
  border: { radius: "rounded-[17px]", color: "border-[#d9dbd5]", width: "border", style: "border-solid" },
  shadow: {
    sm: "shadow-[0_12px_26px_-18px_rgba(32,34,32,0.45)]",
    md: "shadow-[0_14px_30px_-20px_rgba(32,34,32,0.5)]",
    lg: "shadow-[0_22px_44px_-24px_rgba(32,34,32,0.56)]",
    hover: "hover:shadow-[0_22px_44px_-24px_rgba(32,34,32,0.56)]",
    focus: "shadow-none",
    none: "shadow-none",
    colored: { cobalt: "shadow-[0_18px_42px_-26px_rgba(33,82,231,0.45)]" },
  },
  typography: {
    heading: "font-serif font-normal tracking-tight", body: "font-sans", mono: "font-mono",
    sizes: { hero: "text-4xl md:text-6xl", h1: "text-3xl md:text-5xl", h2: "text-2xl md:text-4xl", h3: "text-lg md:text-xl", body: "text-sm md:text-base", small: "text-xs" },
  },
  colors: {
    background: { primary: "bg-[#fafaf8]", secondary: "bg-[#eeeeeb]", accent: ["bg-[#2152e7]", "bg-[#111212]"] },
    text: { primary: "text-[#202220]", secondary: "text-[#686b64]", muted: "text-[#73766e]" },
    button: { primary: "bg-[#202220] text-[#fafaf8]", secondary: "bg-transparent text-[#202220] border border-[#d9dbd5]", danger: "bg-[#ec353e] text-[#111212]" },
  },
  spacing: { section: "py-12 md:py-20", container: "px-6 md:px-10", card: "p-7", gap: { sm: "gap-3", md: "gap-[19px]", lg: "gap-8" } },
  interaction: { transition: "transition-colors duration-200", active: "active:opacity-80", hoverOpacity: "hover:opacity-90" },
  forbidden: {
    classes: ["blur", "backdrop-blur", "shadow-lg", "shadow-xl", "rounded-none"],
    patterns: ["^blur(?:-|$)", "^backdrop-blur(?:-|$)", "^shadow-(?:lg|xl|2xl)$"],
    reasons: { blur: "Keep discrete strokes sharp.", "backdrop-blur": "Use opaque card surfaces.", "shadow-lg": "Use the tight negative-spread contact shadow instead of a wide halo.", "rounded-none": "Use 17-pixel card corners." },
  },
  required: { button: ["font-sans", "focus-visible:outline-2"], card: ["rounded-[17px]", "overflow-hidden"], input: ["border", "focus-visible:outline-2"] },
});
