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

// ── Detailed field-level validation ──────────────────────────────────

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

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function validateManifestDetailed(input: unknown): ManifestDetailedResult {
  const fields: ManifestFieldStatus[] = [];
  const root = asRecord(input);

  if (!root) {
    return {
      ok: false,
      fields: [{ field: "(root)", ok: false, detail: "Not a valid object" }],
      issues: [{ path: "(root)", message: "Not a valid object", code: "invalid_type" }],
    };
  }

  // schemaVersion
  const sv = root.schemaVersion;
  fields.push({
    field: "schemaVersion",
    ok: sv === "1.0.0",
    detail: sv === "1.0.0" ? String(sv) : sv ? `Invalid: ${String(sv)}` : "missing",
  });

  // formData checks
  const fd = asRecord(root.formData) ?? root;

  // slug
  const slug = typeof fd.slug === "string" ? fd.slug : "";
  const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  fields.push({
    field: "slug",
    ok: slugRe.test(slug),
    detail: slugRe.test(slug) ? slug : slug ? `Invalid pattern: ${slug}` : "missing",
  });

  // colors
  const colorFields = ["primaryColor", "secondaryColor", "background", "foreground", "muted"];
  const accentColors = Array.isArray(fd.accentColors) ? fd.accentColors : [];
  const allColors = colorFields
    .map((f) => (typeof fd[f] === "string" ? fd[f] as string : ""))
    .concat(accentColors.filter((c): c is string => typeof c === "string"));
  const validColors = allColors.filter((c) => HEX_RE.test(c));
  fields.push({
    field: "colors",
    ok: validColors.length > 0 && validColors.length === allColors.length,
    detail:
      validColors.length === allColors.length
        ? `${validColors.length} valid hex values`
        : `${validColors.length}/${allColors.length} valid`,
  });

  // doList
  const doList = Array.isArray(fd.doList) ? fd.doList : [];
  const hasDoEntries = doList.some(
    (item: unknown) => typeof item === "string" && item.trim().length > 0
  );
  fields.push({
    field: "doList",
    ok: hasDoEntries,
    detail: hasDoEntries ? `${doList.length} entries` : "empty -- at least 1 entry required",
  });

  // dontList
  const dontList = Array.isArray(fd.dontList) ? fd.dontList : [];
  const hasDontEntries = dontList.some(
    (item: unknown) => typeof item === "string" && item.trim().length > 0
  );
  fields.push({
    field: "dontList",
    ok: hasDontEntries,
    detail: hasDontEntries ? `${dontList.length} entries` : "empty -- at least 1 entry required",
  });

  // inputCode
  const inputCode = typeof fd.inputCode === "string" ? fd.inputCode.trim() : "";
  fields.push({
    field: "inputCode",
    ok: inputCode.length > 0,
    detail: inputCode.length > 0 ? `${inputCode.length} chars` : "missing",
  });

  // buttonCode
  const buttonCode = typeof fd.buttonCode === "string" ? fd.buttonCode.trim() : "";
  fields.push({
    field: "buttonCode",
    ok: buttonCode.length > 0,
    detail: buttonCode.length > 0 ? `${buttonCode.length} chars` : "missing",
  });

  // cardCode
  const cardCode = typeof fd.cardCode === "string" ? fd.cardCode.trim() : "";
  fields.push({
    field: "cardCode",
    ok: cardCode.length > 0,
    detail: cardCode.length > 0 ? `${cardCode.length} chars` : "missing",
  });

  // coverSvg
  const assets = asRecord(root.assets);
  const coverSvg = assets && typeof assets.coverSvg === "string" ? assets.coverSvg.trim() : "";
  const isSvg = coverSvg.includes("<svg");
  fields.push({
    field: "coverSvg",
    ok: isSvg,
    detail: isSvg ? "valid SVG detected" : coverSvg.length > 0 ? "not valid SVG" : "missing",
  });

  // Full schema validation
  const fullResult = validateStyleSubmissionManifest(input);

  return {
    ok: fullResult.ok,
    fields,
    issues: fullResult.ok ? [] : fullResult.issues,
  };
}
