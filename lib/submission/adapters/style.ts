/**
 * Projects a submission manifest onto StyleKit's own data shapes.
 *
 * The manifest (schema 1.0.0) is a flat form payload; StyleKit renders and
 * scores styles from `DesignStyle` plus `StyleTokens`. This module is the only
 * place that bridge lives, so gates, previews and publication all agree on what
 * a submission means.
 *
 * Note the manifest carries no tokens of its own, and it does not need to:
 * `lib/scaffold/style-scaffold.ts` already derives a token file from the same
 * fields at publication time. Deriving here keeps scoring and previews
 * consistent with what publication would eventually write.
 */

import type { StyleTokens } from "@/lib/styles/tokens";
import type { ComponentTemplate, DesignStyle } from "@/lib/styles/types";
import type { ValidatedWizardFormData } from "@/lib/submit/validator";

type FormData = ValidatedWizardFormData;

const HEX_IN_CODE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;

const COMPONENT_FIELDS = [
  "buttonCode",
  "cardCode",
  "inputCode",
  "navCode",
  "heroCode",
  "footerCode",
] as const;

export function deriveStyleColors(form: FormData): {
  primary: string;
  secondary: string;
  accent: string[];
} {
  return {
    primary: form.primaryColor,
    secondary: form.secondaryColor,
    accent: form.accentColors,
  };
}

/**
 * Build the token subset that scoring and linting actually read.
 *
 * Only the fields the manifest genuinely determines are filled from it. The rest
 * mirror `generateTokensFile` in the scaffold so a submission scores the same
 * before and after publication.
 */
export function deriveStyleTokens(form: FormData): StyleTokens {
  const bgPrimary = `bg-[${form.background}]`;
  const bgSecondary = `bg-[${form.primaryColor}]`;

  return {
    border: {
      width: "border",
      color: `border-[${form.primaryColor}]`,
      radius: `rounded-[${form.borderRadius}]`,
      style: "border-solid",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      none: "shadow-none",
      hover: "hover:shadow-md",
      focus: "focus:shadow-md",
    },
    interaction: {
      transition: "transition-all duration-200",
      hoverOpacity: "hover:opacity-90",
      active: "active:scale-[0.98]",
    },
    typography: {
      heading: form.headingFont,
      body: form.bodyFont,
      sizes: {
        hero: form.fontSizeHeading,
        h1: form.fontSizeHeading,
        h2: form.fontSizeHeading,
        h3: form.fontSizeBase,
        body: form.fontSizeBase,
        small: form.fontSizeSmall,
      },
    },
    spacing: {
      section: `py-[${form.spacingLg}]`,
      container: `px-[${form.spacingMd}]`,
      card: `p-[${form.spacingMd}]`,
      gap: {
        sm: `gap-[${form.spacingSm}]`,
        md: `gap-[${form.spacingMd}]`,
        lg: `gap-[${form.spacingLg}]`,
      },
    },
    colors: {
      background: {
        primary: bgPrimary,
        secondary: `bg-[${form.secondaryColor}]`,
        accent: form.accentColors.map((color) => `bg-[${color}]`),
      },
      text: {
        primary: `text-[${form.foreground}]`,
        secondary: `text-[${form.primaryColor}]`,
        muted: `text-[${form.muted}]`,
      },
      button: {
        primary: `${bgSecondary} text-[${form.secondaryColor}]`,
        secondary: `${bgPrimary} text-[${form.primaryColor}]`,
      },
    },
    // A submission declares no bans of its own, so there is nothing to forbid.
    // Kept explicit rather than omitted: an empty ban list is a fact about
    // submissions, not an oversight, and the linter reads these keys directly.
    forbidden: { classes: [], patterns: [], reasons: {} },
    required: { button: [], card: [], input: [] },
  };
}

/**
 * Project a manifest onto the `DesignStyle` shape the catalog renders from.
 *
 * Stored alongside the submission so the community layer renders the style the
 * reviewer approved, rather than re-deriving it from form fields on every read.
 */
export function deriveDesignStyle(form: FormData, coverSvg: string): DesignStyle {
  const component = (
    name: string,
    description: string,
    code: string,
  ): ComponentTemplate => ({ name, description, code });

  const optional = (
    name: string,
    description: string,
    code: string | undefined,
  ): ComponentTemplate | undefined =>
    code && code.trim() ? component(name, description, code) : undefined;

  const nav = optional("Nav", "Navigation bar", form.navCode);
  const hero = optional("Hero", "Hero section", form.heroCode);
  const footer = optional("Footer", "Footer section", form.footerCode);

  return {
    slug: form.slug,
    name: form.name || form.nameEn,
    nameEn: form.nameEn || form.name,
    description: form.description,
    // Submissions have no file on disk, so the cover travels inline.
    cover: `data:image/svg+xml;utf8,${encodeURIComponent(coverSvg)}`,
    styleType: form.styleType,
    tags: form.tags,
    category: form.category,
    colors: deriveStyleColors(form),
    keywords: form.keywords,
    philosophy: form.philosophy,
    doList: form.doList,
    dontList: form.dontList,
    components: {
      button: component("Button", "Primary button", form.buttonCode),
      card: component("Card", "Content card", form.cardCode),
      input: component("Input", "Text input", form.inputCode),
      ...(nav ? { nav } : {}),
      ...(hero ? { hero } : {}),
      ...(footer ? { footer } : {}),
    },
    globalCss: "",
    aiRules: form.aiRules.filter((rule) => rule.trim()).join("\n"),
  };
}

export interface PaletteConsistency {
  /** Normalized 6-digit hex values used in component code but not declared. */
  extraColors: string[];
  /** True when at least one declared color appears in the component code. */
  referencesPalette: boolean;
}

/**
 * Compares colors used in component code against the declared palette.
 *
 * Advisory only. Measured against the library: 89 of 146 styles use colors
 * outside their palette (hover shades, neutral surfaces) and 27 never name a
 * palette color at all, so neither finding can block a submission.
 */
export function paletteConsistency(form: FormData): PaletteConsistency {
  const declared = new Set(
    [
      form.primaryColor,
      form.secondaryColor,
      form.background,
      form.foreground,
      form.muted,
      ...form.accentColors,
    ].map(normalizeHex),
  );

  const code = COMPONENT_FIELDS.map((field) => {
    const value = (form as unknown as Record<string, unknown>)[field];
    return typeof value === "string" ? value : "";
  }).join("\n");

  const used = new Set((code.match(HEX_IN_CODE) ?? []).map(normalizeHex));
  const usesCssVars = /var\(--/.test(code);

  return {
    extraColors: [...used].filter((hex) => !declared.has(hex)).map((hex) => `#${hex}`),
    referencesPalette: usesCssVars || [...used].some((hex) => declared.has(hex)),
  };
}

/** Collapse shorthand, alpha and casing so hex values compare reliably. */
function normalizeHex(value: string): string {
  let hex = value.replace("#", "").toLowerCase();
  if (hex.length === 3) hex = hex.replace(/./g, (char) => char + char);
  else if (hex.length === 4) hex = hex.slice(0, 3).replace(/./g, (char) => char + char);
  else if (hex.length === 8) hex = hex.slice(0, 6);
  return hex;
}
