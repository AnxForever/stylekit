import { createStyleTokens } from "./token-defaults";

export const eInkTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#bab9b0]",
    radius: "rounded-none",
    style: "border-solid",
  },
  shadow: {
    sm: "shadow-none",
    md: "shadow-none",
    lg: "shadow-none",
    hover: "hover:bg-[#e6e4da] hover:text-[#20211e]",
    focus: "focus-visible:ring-2 focus-visible:ring-[#20211e]",
    colored: {},
  },
  interaction: {
    transition: "transition-none motion-reduce:transition-none",
    active: "active:bg-[#e6e4da] active:text-[#20211e]",
  },
  typography: {
    heading: "font-semibold tracking-tight",
    body: "font-sans",
    mono: "font-mono tabular-nums",
    sizes: {
      hero: "text-3xl md:text-5xl",
      h1: "text-2xl md:text-4xl",
      h2: "text-xl md:text-2xl",
      h3: "text-base md:text-lg",
      body: "text-sm md:text-base",
      small: "text-xs",
    },
  },
  spacing: {
    section: "py-10 md:py-16",
    container: "px-4 md:px-8",
    card: "p-4 md:p-5",
    gap: { sm: "gap-2", md: "gap-4", lg: "gap-6" },
  },
  colors: {
    background: {
      primary: "bg-[#f5f3ea]",
      secondary: "bg-[#e6e4da]",
      accent: ["bg-[#bab9b0]", "bg-[#555750]", "bg-[#20211e]"],
    },
    text: {
      primary: "text-[#20211e]",
      secondary: "text-[#44453f]",
      muted: "text-[#555750]",
    },
    button: {
      primary: "rounded-none border border-[#20211e] bg-[#20211e] text-[#f5f3ea]",
      secondary: "rounded-none border border-[#555750] bg-[#f5f3ea] text-[#20211e]",
    },
  },
  forbidden: {
    classes: [
      "rounded-full",
      "shadow-lg",
      "shadow-xl",
      "shadow-2xl",
      "animate-pulse",
      "animate-bounce",
      "backdrop-blur",
      "bg-gradient-to-r",
      "bg-gradient-to-l",
      "bg-gradient-to-t",
      "bg-gradient-to-b",
    ],
    patterns: [
      "^bg-(?:red|blue|green|yellow|orange|purple|pink|indigo|cyan|teal|lime|violet|fuchsia|emerald|rose)-",
      "^text-(?:red|blue|green|yellow|orange|purple|pink|indigo|cyan|teal|lime|violet|fuchsia|emerald|rose)-",
      "^border-(?:red|blue|green|yellow|orange|purple|pink|indigo|cyan|teal|lime|violet|fuchsia|emerald|rose)-",
      "^rounded-full$",
      "^shadow-(?:lg|xl|2xl)$",
      "^animate-(?:pulse|bounce|spin)$",
      "^bg-gradient-",
    ],
    reasons: {
      "rounded-full": "E-Ink uses square interfaces, not hardware-shaped pills.",
      "shadow-lg": "Strong shadows lower contrast in limited grayscale.",
      "animate-pulse": "Continuous motion creates an unsettled reading surface.",
      "bg-gradient-to-r": "Use flat paper and ink values; broad gradients are not reliable across display tiers.",
      "bg-red-500": "State colors need explicit labels and grayscale-safe contrast.",
    },
  },
  required: {
    button: ["rounded-none", "font-mono", "focus-visible:ring-2"],
    card: ["rounded-none", "border"],
    input: ["rounded-none", "border", "focus-visible:ring-2"],
  },
});
