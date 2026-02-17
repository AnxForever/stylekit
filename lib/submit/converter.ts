import type { StyleTokens } from "@/lib/styles/tokens";
import type { DesignStyle } from "@/lib/styles/index";
import type { ValidatedWizardFormData } from "./validator";

/**
 * Convert validated wizard form data into StyleTokens format.
 * Generates sensible Tailwind-class-based tokens from the raw form values.
 */
export function convertToStyleTokens(data: ValidatedWizardFormData): StyleTokens {
  return {
    border: {
      width: "border",
      color: `border-[${data.primaryColor}]`,
      radius: data.borderRadius === "0" ? "rounded-none" : `rounded-[${data.borderRadius}]`,
      style: "border-solid",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      none: "shadow-none",
      hover: "hover:shadow-lg",
      focus: "focus:shadow-md",
    },
    interaction: {
      hoverScale: "hover:scale-105",
      transition: "transition-all duration-200",
      active: "active:scale-95",
    },
    typography: {
      heading: `font-[${data.headingFont.split(",")[0].trim()}]`,
      body: `font-[${data.bodyFont.split(",")[0].trim()}]`,
      sizes: {
        hero: `text-[${data.fontSizeHeading}] md:text-[calc(${data.fontSizeHeading}*1.5)]`,
        h1: `text-[${data.fontSizeHeading}]`,
        h2: `text-[calc(${data.fontSizeHeading}*0.75)]`,
        h3: `text-[calc(${data.fontSizeHeading}*0.6)]`,
        body: `text-[${data.fontSizeBase}]`,
        small: `text-[${data.fontSizeSmall}]`,
      },
    },
    spacing: {
      section: `py-[${data.spacingLg}] md:py-[calc(${data.spacingLg}*2)]`,
      container: `px-[${data.spacingMd}] md:px-[${data.spacingLg}]`,
      card: `p-[${data.spacingMd}]`,
      gap: {
        sm: `gap-[${data.spacingSm}]`,
        md: `gap-[${data.spacingMd}]`,
        lg: `gap-[${data.spacingLg}]`,
      },
    },
    colors: {
      background: {
        primary: `bg-[${data.background}]`,
        secondary: `bg-[${data.muted}]`,
        accent: data.accentColors.map((c) => `bg-[${c}]`),
      },
      text: {
        primary: `text-[${data.foreground}]`,
        secondary: `text-[${data.muted}]`,
        muted: `text-[${data.muted}]/60`,
      },
      button: {
        primary: `bg-[${data.primaryColor}] text-[${data.background}]`,
        secondary: `bg-[${data.secondaryColor}] text-[${data.foreground}]`,
      },
    },
    forbidden: {
      classes: [],
      patterns: [],
      reasons: {},
    },
    required: {
      button: [
        `bg-[${data.primaryColor}]`,
        `text-[${data.background}]`,
        `rounded-[${data.borderRadius}]`,
        "transition-all duration-200",
      ],
      card: [
        `bg-[${data.background}]`,
        "border",
        `rounded-[${data.borderRadius}]`,
        `p-[${data.spacingMd}]`,
      ],
      input: [
        "border",
        `rounded-[${data.borderRadius}]`,
        `px-[${data.spacingSm}]`,
        `py-[${data.spacingSm}]`,
      ],
    },
  };
}

/**
 * Convert validated wizard form data into a DesignStyle-compatible object.
 * Returns a partial because some fields (globalCss, aiRules string, etc.)
 * may need further processing or generation.
 */
export function convertToDesignStyle(data: ValidatedWizardFormData): Partial<DesignStyle> {
  return {
    slug: data.slug,
    name: data.name,
    nameEn: data.nameEn,
    description: data.description,
    cover: `/styles/${data.slug}.svg`,
    styleType: data.styleType,
    tags: data.tags,
    category: data.category,
    colors: {
      primary: data.primaryColor,
      secondary: data.secondaryColor,
      accent: data.accentColors,
    },
    keywords: data.keywords,
    philosophy: data.philosophy,
    doList: data.doList.filter((s) => s.trim()),
    dontList: data.dontList.filter((s) => s.trim()),
    components: {
      button: { name: "Button", description: "Primary button", code: data.buttonCode },
      card: { name: "Card", description: "Content card", code: data.cardCode },
      input: { name: "Input", description: "Text input", code: data.inputCode },
    },
    globalCss: "",
    aiRules: data.aiRules.filter((s) => s.trim()).join("\n"),
  };
}
