import { z } from "zod";

/**
 * DESIGN.md schema (StyleKit 11-section flavor).
 * Source of truth: docs/design-md/spec.md.
 * Frontmatter keys follow YAML snake_case convention for consistency with
 * community submissions and VoltAgent ecosystem.
 */

export const designMdFrontmatterSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case (a-z, 0-9, -)"),
  category: z
    .enum(["modern", "retro", "minimal", "expressive"])
    .optional(),
  style_type: z.enum(["visual", "layout"]).optional(),
  inspired_by: z.union([z.string().url(), z.literal("")]).optional(),
  tags: z.array(z.string().trim().min(1)).default([]),
  version: z.string().trim().optional(),
  author: z.string().trim().optional(),
  license: z.string().trim().optional(),
});

export type DesignMdFrontmatter = z.infer<typeof designMdFrontmatterSchema>;

/* ---------- Block primitives ---------- */

export const designMdParagraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string(),
});

export const designMdBulletListBlockSchema = z.object({
  type: z.literal("bullet-list"),
  items: z.array(z.string()),
});

export const designMdCodeBlockSchema = z.object({
  type: z.literal("code"),
  language: z.string().default(""),
  code: z.string(),
});

export const designMdSubHeadingBlockSchema = z.object({
  type: z.literal("sub-heading"),
  level: z.number().int().min(3).max(6),
  text: z.string(),
});

export const designMdTableBlockSchema = z.object({
  type: z.literal("table"),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

export const designMdBlockSchema = z.discriminatedUnion("type", [
  designMdParagraphBlockSchema,
  designMdBulletListBlockSchema,
  designMdCodeBlockSchema,
  designMdSubHeadingBlockSchema,
  designMdTableBlockSchema,
]);

export type DesignMdBlock = z.infer<typeof designMdBlockSchema>;

/* ---------- Section ---------- */

export const designMdSectionSchema = z.object({
  number: z.number().int().positive().nullable(),
  title: z.string(),
  rawBody: z.string(),
  blocks: z.array(designMdBlockSchema),
});

export type DesignMdSection = z.infer<typeof designMdSectionSchema>;

/* ---------- Document ---------- */

export const designMdDocumentSchema = z.object({
  frontmatter: designMdFrontmatterSchema.nullable(),
  title: z.string().nullable(),
  sections: z.array(designMdSectionSchema),
  rawBody: z.string(),
});

export type DesignMdDocument = z.infer<typeof designMdDocumentSchema>;

/* ---------- Validation helpers ---------- */

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; issues: z.ZodIssue[] };

export function validateDesignMdFrontmatter(
  input: unknown
): ValidationResult<DesignMdFrontmatter> {
  const result = designMdFrontmatterSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, issues: result.error.issues };
}

export function validateDesignMdDocument(
  input: unknown
): ValidationResult<DesignMdDocument> {
  const result = designMdDocumentSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, issues: result.error.issues };
}

/* ---------- Quality assessment (StyleKit 11-section target) ---------- */

export const REQUIRED_SECTION_TITLES = [
  "Overview",
  "Visual Theme & Atmosphere",
  "Color Palette & Roles",
  "Typography Rules",
  "Component Stylings",
] as const;

export const RECOMMENDED_SECTION_TITLES = [
  ...REQUIRED_SECTION_TITLES,
  "Layout Principles",
  "Spacing Scale",
  "Elevation & Depth",
  "Do's & Don'ts",
  "AI Rules",
  "Responsive Breakpoints",
] as const;

export type RequiredSectionTitle = (typeof REQUIRED_SECTION_TITLES)[number];
export type RecommendedSectionTitle = (typeof RECOMMENDED_SECTION_TITLES)[number];

export interface DesignMdQualityReport {
  missingRequired: RequiredSectionTitle[];
  missingRecommended: RecommendedSectionTitle[];
  hasFrontmatter: boolean;
  wordCount: number;
  level: "minimum" | "standard" | "excellent";
}

function normalizeTitle(input: string): string {
  return input.trim().toLowerCase();
}

function hasSectionMatching(sections: DesignMdSection[], target: string): boolean {
  const needle = normalizeTitle(target);
  return sections.some((section) => normalizeTitle(section.title).includes(needle));
}

export function assessDesignMdQuality(doc: DesignMdDocument): DesignMdQualityReport {
  const missingRequired = REQUIRED_SECTION_TITLES.filter(
    (title) => !hasSectionMatching(doc.sections, title)
  );
  const missingRecommended = RECOMMENDED_SECTION_TITLES.filter(
    (title) => !hasSectionMatching(doc.sections, title)
  );
  const wordCount = doc.rawBody.split(/\s+/).filter(Boolean).length;

  const level: DesignMdQualityReport["level"] =
    missingRequired.length > 0
      ? "minimum"
      : missingRecommended.length > 3
        ? "standard"
        : "excellent";

  return {
    missingRequired,
    missingRecommended,
    hasFrontmatter: doc.frontmatter !== null,
    wordCount,
    level,
  };
}
