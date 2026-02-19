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

export interface ManifestFieldStatus {
  field: string;
  ok: boolean;
  detail: string;
}

export interface ManifestDetailedResult {
  ok: boolean;
  fields: ManifestFieldStatus[];
  issues: ManifestValidationIssue[];
}

const HEX_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateManifestDetailed(input: unknown): ManifestDetailedResult {
  const base = validateStyleSubmissionManifest(input);
  const fields: ManifestFieldStatus[] = [];

  const root =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : ({} as Record<string, unknown>);

  const formData =
    root.formData && typeof root.formData === "object" && !Array.isArray(root.formData)
      ? (root.formData as Record<string, unknown>)
      : ({} as Record<string, unknown>);

  // schemaVersion
  fields.push({
    field: "schemaVersion",
    ok: root.schemaVersion === "1.0.0",
    detail: root.schemaVersion === "1.0.0" ? "1.0.0" : String(root.schemaVersion ?? "missing"),
  });

  // slug
  const slug = typeof formData.slug === "string" ? formData.slug : "";
  fields.push({
    field: "slug",
    ok: SLUG_RE.test(slug),
    detail: SLUG_RE.test(slug) ? slug : slug ? "invalid format" : "missing",
  });

  // colors
  const colors = [
    typeof formData.primaryColor === "string" ? formData.primaryColor : "",
    typeof formData.secondaryColor === "string" ? formData.secondaryColor : "",
    ...(Array.isArray(formData.accentColors)
      ? formData.accentColors.filter((c): c is string => typeof c === "string")
      : []),
  ];
  const validColors = colors.filter((c) => HEX_RE.test(c));
  fields.push({
    field: "colors",
    ok: validColors.length >= 2,
    detail: `${validColors.length} valid hex values`,
  });

  // doList
  const doList = Array.isArray(formData.doList) ? formData.doList : [];
  const doFilled = doList.filter((d) => typeof d === "string" && d.trim()).length;
  fields.push({
    field: "doList",
    ok: doFilled > 0,
    detail: doFilled > 0 ? `${doFilled} entries` : "empty - at least 1 entry required",
  });

  // dontList
  const dontList = Array.isArray(formData.dontList) ? formData.dontList : [];
  const dontFilled = dontList.filter((d) => typeof d === "string" && d.trim()).length;
  fields.push({
    field: "dontList",
    ok: true,
    detail: dontFilled > 0 ? `${dontFilled} entries` : "empty (optional)",
  });

  // buttonCode
  const buttonCode = typeof formData.buttonCode === "string" ? formData.buttonCode.trim() : "";
  fields.push({
    field: "buttonCode",
    ok: buttonCode.length > 0,
    detail: buttonCode.length > 0 ? "present" : "not provided",
  });

  // cardCode
  const cardCode = typeof formData.cardCode === "string" ? formData.cardCode.trim() : "";
  fields.push({
    field: "cardCode",
    ok: cardCode.length > 0,
    detail: cardCode.length > 0 ? "present" : "not provided",
  });

  // inputCode
  const inputCode = typeof formData.inputCode === "string" ? formData.inputCode.trim() : "";
  fields.push({
    field: "inputCode",
    ok: inputCode.length > 0,
    detail: inputCode.length > 0 ? "present" : "not provided",
  });

  // coverSvg
  const assets =
    root.assets && typeof root.assets === "object" && !Array.isArray(root.assets)
      ? (root.assets as Record<string, unknown>)
      : ({} as Record<string, unknown>);
  const coverSvg = typeof assets.coverSvg === "string" ? assets.coverSvg : "";
  const hasSvg = coverSvg.includes("<svg");
  fields.push({
    field: "coverSvg",
    ok: hasSvg,
    detail: hasSvg ? "valid SVG detected" : coverSvg ? "no SVG content" : "missing",
  });

  return {
    ok: base.ok,
    fields,
    issues: base.ok ? [] : base.issues,
  };
}
