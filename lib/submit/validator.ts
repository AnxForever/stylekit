import { z } from "zod";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

const hexColor = z.string().regex(HEX_RE, "Must be a valid hex color (e.g. #ff0000)");

const nonEmptyStringList = z
  .array(z.string())
  .refine((arr) => arr.some((s) => s.trim().length > 0), {
    message: "Must contain at least one non-empty entry",
  });

export const wizardFormSchema = z.object({
  name: z.string(),
  nameEn: z.string(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(SLUG_RE, "Slug must be lowercase letters, numbers, and hyphens"),
  description: z.string(),
  category: z.enum(["modern", "retro", "minimal", "expressive"]),
  styleType: z.enum(["visual", "layout"]),
  tags: z.array(
    z.enum([
      "modern",
      "retro",
      "minimal",
      "expressive",
      "high-contrast",
      "responsive",
      "brand-inspired",
    ])
  ),

  // Colors
  primaryColor: hexColor,
  secondaryColor: hexColor,
  accentColors: z.array(hexColor).min(1, "At least one accent color is required"),
  background: hexColor,
  foreground: hexColor,
  muted: hexColor,

  // Keywords and philosophy
  keywords: z.array(z.string()),
  philosophy: z.string(),

  // Typography
  headingFont: z.string(),
  bodyFont: z.string(),
  fontSizeBase: z.string(),
  fontSizeHeading: z.string(),
  fontSizeSmall: z.string(),
  fontWeightNormal: z.string(),
  fontWeightBold: z.string(),
  lineHeightNormal: z.string(),
  lineHeightTight: z.string(),

  // Spacing and border
  borderRadius: z.string(),
  spacingSm: z.string(),
  spacingMd: z.string(),
  spacingLg: z.string(),

  // Rules
  doList: nonEmptyStringList,
  dontList: z.array(z.string()),
  aiRules: z.array(z.string()),

  // Components
  buttonCode: z.string(),
  cardCode: z.string(),
  inputCode: z.string(),
  navCode: z.string().optional(),
  heroCode: z.string().optional(),
  footerCode: z.string().optional(),
}).refine(
  (d) => d.name.trim().length > 0 || d.nameEn.trim().length > 0,
  { message: "At least one style name (name or nameEn) is required", path: ["name"] }
);

export type ValidatedWizardFormData = z.infer<typeof wizardFormSchema>;

/* ---------- DESIGN.md submission (Phase 1) ---------- */
// A lighter-weight submission path: the user pastes a DESIGN.md document
// (Google Stitch / getdesign.md format). We keep only the bare essentials
// for the submissions table (slug + name + category) and store the full
// markdown inside form_data. Quality assessment happens downstream.

export const designMdSubmissionSchema = z.object({
  source: z.literal("design-md"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(SLUG_RE, "Slug must be lowercase letters, numbers, and hyphens"),
  name: z.string().trim().min(1, "Name is required"),
  nameEn: z.string().trim().optional().default(""),
  category: z.enum(["modern", "retro", "minimal", "expressive"]).optional(),
  description: z.string().trim().max(300).optional(),
  design_md: z
    .string()
    .trim()
    .min(200, "DESIGN.md content should be at least 200 characters"),
  coverSvg: z.string().optional(),
});

export type ValidatedDesignMdSubmission = z.infer<typeof designMdSubmissionSchema>;

export function isDesignMdSubmissionPayload(body: unknown): boolean {
  return (
    typeof body === "object" &&
    body !== null &&
    !Array.isArray(body) &&
    (body as { source?: unknown }).source === "design-md"
  );
}
