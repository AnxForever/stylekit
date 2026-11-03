import type { PromptCopyAnalytics } from "@/lib/admin/prompt-copy-analytics";

export interface PromptCopyStyleLabel {
  slug: string;
  name: string;
  nameEn: string;
}

export interface PromptCopyReportRow extends PromptCopyStyleLabel {
  copies: number;
  sessions: number;
  hard: number;
  soft: number;
  designSpec: number;
  creativeBrief: number;
  examples: number;
  projectBrief: number;
  recipes: number;
}

export function buildPromptCopyReportRows(
  styles: PromptCopyStyleLabel[],
  report?: PromptCopyAnalytics,
): PromptCopyReportRow[] {
  const labelsBySlug = new Map(styles.map((style) => [style.slug, style]));
  for (const style of report?.styles ?? []) {
    if (!labelsBySlug.has(style.slug)) {
      labelsBySlug.set(style.slug, {
        slug: style.slug,
        name: style.slug,
        nameEn: style.slug,
      });
    }
  }
  const countsBySlug = new Map(report?.styles.map((style) => [style.slug, style]) ?? []);

  return [...labelsBySlug.values()]
    .map((style) => {
      const counts = countsBySlug.get(style.slug);
      return {
        ...style,
        copies: counts?.copies ?? 0,
        sessions: counts?.sessions ?? 0,
        hard: counts?.hard ?? 0,
        soft: counts?.soft ?? 0,
        designSpec: counts?.designSpec ?? 0,
        creativeBrief: counts?.creativeBrief ?? 0,
        examples: counts?.examples ?? 0,
        projectBrief: counts?.projectBrief ?? 0,
        recipes: counts?.recipes ?? 0,
      };
    })
    .sort((a, b) => b.copies - a.copies || a.slug.localeCompare(b.slug));
}

export function createPromptCopyCsv(rows: PromptCopyReportRow[]): string {
  const columns: Array<[string, (row: PromptCopyReportRow) => string | number]> = [
    ["style_slug", (row) => row.slug],
    ["style_name_zh", (row) => row.name],
    ["style_name_en", (row) => row.nameEn],
    ["successful_copies", (row) => row.copies],
    ["tab_sessions", (row) => row.sessions],
    ["hard_prompt", (row) => row.hard],
    ["soft_prompt", (row) => row.soft],
    ["design_spec", (row) => row.designSpec],
    ["creative_brief", (row) => row.creativeBrief],
    ["example_prompts", (row) => row.examples],
    ["recipe_prompt", (row) => row.recipes],
    ["project_brief", (row) => row.projectBrief],
  ];
  const escape = (value: string | number) => {
    const text = typeof value === "string" && /^\s*[=+\-@]/.test(value)
      ? `'${value}`
      : String(value);
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };

  return [
    columns.map(([heading]) => escape(heading)).join(","),
    ...rows.map((row) => columns.map(([, value]) => escape(value(row))).join(",")),
  ].join("\r\n");
}
