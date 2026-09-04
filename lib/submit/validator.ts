import { z } from "zod";
import { STYLE_CATEGORIES, STYLE_TAGS, STYLE_TYPES } from "@/lib/styles/meta-types";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

const hexColor = z.string().regex(HEX_RE, "Must be a valid hex color (e.g. #ff0000)");


export const wizardFormSchema = z.object({
  name: z.string(),
  nameEn: z.string(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(SLUG_RE, "Slug must be lowercase letters, numbers, and hyphens"),
  description: z.string(),
  category: z.enum(STYLE_CATEGORIES),
  styleType: z.enum(STYLE_TYPES),
  // Read from the tag vocabulary directly. This list used to be restated here
  // and drifted: it still accepted `modern`, `minimal` and `expressive` after
  // the tag revamp retired them, so submissions passed validation and then had
  // their tags silently dropped by the catalog.
  // Tags aid discovery but a style is valid without them; reviewers can add
  // them during curation.
  tags: z.array(z.enum(STYLE_TAGS)).default([]),

  // Colors
  primaryColor: hexColor,
  secondaryColor: hexColor,
  // Falls back to the primary color at the adapter layer when unset.
  accentColors: z.array(hexColor).default([]),
  background: hexColor,
  foreground: hexColor,
  // A neutral mid-grey reads correctly against both light and dark grounds.
  muted: hexColor.default("#6b7280"),

  // Keywords and philosophy
  keywords: z.array(z.string()).default([]),
  philosophy: z.string().default(""),

  // Typography. Defaulted rather than required: a contributor describes a
  // style through its palette and rules, and a submission that leaves the
  // scale unstated wants sensible neutral values, not a rejection. Anything
  // supplied still wins.
  headingFont: z.string().default("system-ui, sans-serif"),
  bodyFont: z.string().default("system-ui, sans-serif"),
  fontSizeBase: z.string().default("1rem"),
  fontSizeHeading: z.string().default("2rem"),
  fontSizeSmall: z.string().default("0.875rem"),
  fontWeightNormal: z.string().default("400"),
  fontWeightBold: z.string().default("700"),
  lineHeightNormal: z.string().default("1.6"),
  lineHeightTight: z.string().default("1.2"),

  // Spacing and border, defaulted for the same reason.
  borderRadius: z.string().default("0.5rem"),
  spacingSm: z.string().default("0.5rem"),
  spacingMd: z.string().default("1rem"),
  spacingLg: z.string().default("2rem"),

  // Rules
  doList: z.array(z.string()).default([]),
  dontList: z.array(z.string()).default([]),
  aiRules: z.array(z.string()),

  // Components are optional in a prompt-first submission; community-runtime
  // synthesises previews from tokens when none are given.
  buttonCode: z.string().default(""),
  cardCode: z.string().default(""),
  inputCode: z.string().default(""),
  previewModule: z.string().optional(),
  navCode: z.string().optional(),
  heroCode: z.string().optional(),
  footerCode: z.string().optional(),
}).refine(
  (d) => d.name.trim().length > 0 || d.nameEn.trim().length > 0,
  { message: "At least one style name (name or nameEn) is required", path: ["name"] }
);

export type ValidatedWizardFormData = z.infer<typeof wizardFormSchema>;
