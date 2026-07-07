// Warm Organic Tokens - Precise class mappings for AI
import { createStyleTokens } from "./token-defaults";

export const warmOrganicTokens = createStyleTokens({
  border: {
    width: "border",
    color: "border-[#D4BFA5]",
    radius: "rounded-lg",
    style: "border-solid",
  },

  shadow: {
    sm: "shadow-[0_2px_8px_-2px_rgba(45,42,36,0.08)]",
    md: "shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]",
    lg: "shadow-[0_8px_30px_-6px_rgba(45,42,36,0.12)]",
    none: "shadow-none",
    hover: "hover:shadow-[0_8px_30px_-6px_rgba(45,42,36,0.15)]",
    focus: "focus:shadow-[0_0_0_3px_rgba(200,106,74,0.15)]",
  },

  interaction: {
    hoverOpacity: "hover:bg-[#E8DED1]",
    transition: "transition-all duration-200",
    active: "active:scale-[0.98]",
  },

  typography: {
    heading: "font-serif font-medium text-[#2D2A24] tracking-tight",
    subtitle: "font-sans font-light tracking-wide text-[#2D2A24]",
    body: "font-sans text-[#2D2A24] leading-relaxed",
    mono: "font-mono text-[#2D2A24]/60 text-sm",
    sizes: {
      hero: "text-3xl md:text-5xl lg:text-6xl",
      h1: "text-3xl md:text-4xl lg:text-5xl",
      h2: "text-2xl md:text-3xl lg:text-4xl",
      h3: "text-lg md:text-xl lg:text-2xl",
      body: "text-sm md:text-base",
      small: "text-xs md:text-sm",
    },
  },

  spacing: {
    section: "py-16 md:py-24",
    container: "px-4 md:px-8 lg:px-12",
    card: "p-5 md:p-6",
    gap: {
      sm: "gap-3",
      md: "gap-6",
      lg: "gap-8 md:gap-10",
    },
  },

  colors: {
    background: {
      primary: "bg-[#F5F0EB]",
      secondary: "bg-[#E8DED1]",
      accent: ["bg-[#C86A4A]", "bg-[#7A8B5E]", "bg-[#D4BFA5]", "bg-[#F5F0EB]"],
    },
    text: {
      primary: "text-[#2D2A24]",
      secondary: "text-[#2D2A24]/65",
      muted: "text-[#2D2A24]/40",
    },
    button: {
      primary: "bg-[#C86A4A] text-white",
      secondary: "bg-transparent text-[#2D2A24] border border-[#D4BFA5]",
    },
  },

  forbidden: {
    classes: [
      "rounded-none",
      "rounded-sm",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "shadow-black",
      "bg-gray-50",
      "bg-gray-100",
      "bg-gray-200",
      "bg-gray-300",
      "text-gray-500",
      "text-gray-600",
      "text-gray-700",
      "text-gray-800",
      "text-gray-900",
      "border-gray-200",
      "border-gray-300",
      "backdrop-blur",
      "bg-gradient-to-r",
      "bg-gradient-to-br",
      "bg-gradient-to-b",
    ],
    patterns: [
      "^rounded-(?:none|sm|xl|2xl|3xl|full)$",
      "^shadow-(?:md|lg|xl|2xl|inner)$",
      "^bg-gray-",
      "^text-gray-",
      "^border-gray-",
      "^backdrop-blur",
    ],
    reasons: {
      "rounded-none": "Warm Organic uses rounded-lg for organic warmth; sharp corners feel industrial and cold",
      "rounded-sm": "Warm Organic needs rounded-lg or rounded-md; tiny radii feel sterile",
      "rounded-xl": "Warm Organic caps radii at rounded-lg; larger radii read as artificial bubbles",
      "rounded-2xl": "Warm Organic caps radii at rounded-lg; larger radii read as artificial bubbles",
      "rounded-full": "Warm Organic uses rounded-full only for tiny decorative dots, never for containers or buttons",
      "bg-gray-50": "Cool grays are forbidden; use warm neutrals like bg-[#F5F0EB] or bg-[#E8DED1] instead",
      "text-gray-500": "Cool grays are forbidden; use warm brown text-[#2D2A24] with opacity instead",
      "backdrop-blur": "Glassmorphism is forbidden; organic warmth comes from layered warm colors and soft shadows, not frosted glass",
    },
  },

  required: {
    button: [
      "rounded-lg",
      "text-sm font-medium",
      "transition-all duration-200",
    ],
    card: [
      "bg-[#E8DED1]",
      "rounded-lg",
      "shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]",
    ],
    input: [
      "bg-[#E8DED1]/40",
      "border border-[#D4BFA5]",
      "rounded-lg",
      "focus:outline-none focus:border-[#C86A4A] focus:ring-1 focus:ring-[#C86A4A]/20",
    ],
  },
});
