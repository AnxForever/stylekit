import { z } from "zod";
import { wizardFormSchema } from "./validator";

const sourceSchema = z.object({
  assistant: z.enum(["claude", "cursor", "chatgpt", "manual", "other"]),
  model: z.string().min(1, "Model is required"),
  notes: z.string().optional(),
});

const selfCheckSchema = z.object({
  schemaValid: z.boolean(),
  requiredFilesPrepared: z
    .array(z.enum(["manifest.json", "cover.svg", "self-check.md"]))
    .min(1),
  componentCoverage: z
    .array(z.enum(["buttonCode", "cardCode", "inputCode"]))
    .min(1),
  notes: z.string(),
});

const assetsSchema = z.object({
  coverSvg: z.string().min(1, "coverSvg is required"),
  previewImageUrl: z.string().url().optional(),
});

const generatedAtSchema = z
  .string()
  .min(1, "generatedAt is required")
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "generatedAt must be a valid ISO date-time",
  });

export const styleSubmissionManifestSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  generatedAt: generatedAtSchema,
  source: sourceSchema,
  formData: wizardFormSchema,
  assets: assetsSchema,
  selfCheck: selfCheckSchema,
});

export type StyleSubmissionManifest = z.infer<typeof styleSubmissionManifestSchema>;

export interface ManifestValidationIssue {
  path: string;
  message: string;
  code: string;
}

export type ManifestValidationResult =
  | { ok: true; data: StyleSubmissionManifest; issues: [] }
  | { ok: false; issues: ManifestValidationIssue[] };

export function validateStyleSubmissionManifest(
  input: unknown
): ManifestValidationResult {
  const parsed = styleSubmissionManifestSchema.safeParse(input);
  if (parsed.success) {
    return { ok: true, data: parsed.data, issues: [] };
  }

  const issues: ManifestValidationIssue[] = parsed.error.issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.join(".") : "(root)",
    message: issue.message,
    code: issue.code,
  }));

  return { ok: false, issues };
}

export function getManifestSummary(manifest: StyleSubmissionManifest): {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  styleType: string;
} {
  return {
    slug: manifest.formData.slug,
    name: manifest.formData.name,
    nameEn: manifest.formData.nameEn,
    category: manifest.formData.category,
    styleType: manifest.formData.styleType,
  };
}
