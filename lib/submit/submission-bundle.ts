import type { StyleScaffoldInput } from "@/lib/scaffold/style-scaffold";
import { generateStyleScaffoldFiles } from "@/lib/scaffold/style-scaffold";
import { convertToDesignStyle, convertToStyleTokens } from "./converter";
import type { StyleSubmissionManifest } from "./manifest-validator";

export interface SubmissionBundleFile {
  name: string;
  content: string;
}

export function buildSubmissionBundleFiles(
  manifest: StyleSubmissionManifest
): SubmissionBundleFile[] {
  const formData = manifest.formData;
  const scaffoldInput: StyleScaffoldInput = {
    name: formData.name,
    nameEn: formData.nameEn,
    slug: formData.slug,
    description: formData.description,
    category: formData.category,
    styleType: formData.styleType,
    tags: formData.tags,
    primaryColor: formData.primaryColor,
    secondaryColor: formData.secondaryColor,
    accentColors: formData.accentColors,
    keywords: formData.keywords,
    philosophy: formData.philosophy,
    doList: formData.doList.filter((item) => item.trim()),
    dontList: formData.dontList.filter((item) => item.trim()),
    buttonCode: formData.buttonCode,
    cardCode: formData.cardCode,
    inputCode: formData.inputCode,
  };

  const scaffoldFiles = generateStyleScaffoldFiles(scaffoldInput).map((file) => ({
    name: file.name,
    content: normalizeText(file.content),
  }));

  const tokens = convertToStyleTokens(formData);
  const designStyle = convertToDesignStyle(formData);

  return [
    {
      name: "manifest.json",
      content: `${JSON.stringify(manifest, null, 2)}\n`,
    },
    {
      name: "cover.svg",
      content: ensureTrailingNewline(normalizeText(manifest.assets.coverSvg)),
    },
    {
      name: "self-check.md",
      content: buildSelfCheckMarkdown(manifest),
    },
    {
      name: "submission/form-data.json",
      content: `${JSON.stringify(formData, null, 2)}\n`,
    },
    {
      name: "submission/design-style.json",
      content: `${JSON.stringify(designStyle, null, 2)}\n`,
    },
    {
      name: "submission/style-tokens.json",
      content: `${JSON.stringify(tokens, null, 2)}\n`,
    },
    {
      name: "submission/README.md",
      content: buildBundleReadme(manifest, scaffoldFiles.map((file) => file.name)),
    },
    ...scaffoldFiles,
  ];
}

export function createSubmissionBundleFilename(slug: string): string {
  const normalized = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const safe = normalized || "style-submission";
  return `${safe}-submission-bundle.zip`;
}

function buildSelfCheckMarkdown(manifest: StyleSubmissionManifest): string {
  const requiredFiles =
    manifest.selfCheck.requiredFilesPrepared.length > 0
      ? manifest.selfCheck.requiredFilesPrepared.join(", ")
      : "(none)";
  const componentCoverage =
    manifest.selfCheck.componentCoverage.length > 0
      ? manifest.selfCheck.componentCoverage.join(", ")
      : "(none)";
  const notes = manifest.selfCheck.notes.trim() || "(No notes provided)";

  return [
    "# Self Check",
    "",
    `- schemaValid: ${manifest.selfCheck.schemaValid ? "true" : "false"}`,
    `- requiredFilesPrepared: ${requiredFiles}`,
    `- componentCoverage: ${componentCoverage}`,
    "",
    "## Notes",
    "",
    notes,
    "",
  ].join("\n");
}

function buildBundleReadme(
  manifest: StyleSubmissionManifest,
  scaffoldFileNames: string[]
): string {
  const name = manifest.formData.name.trim();
  const nameEn = manifest.formData.nameEn.trim();
  const slug = manifest.formData.slug.trim();
  const sourceLabel = `${manifest.source.assistant}:${manifest.source.model}`;

  return [
    "# Style Submission Bundle",
    "",
    "This bundle was generated from StyleKit submission manifest data.",
    "",
    "## Style Summary",
    "",
    `- Name: ${name}`,
    `- Name (EN): ${nameEn}`,
    `- Slug: ${slug}`,
    `- Category: ${manifest.formData.category}`,
    `- Type: ${manifest.formData.styleType}`,
    `- Generated At: ${manifest.generatedAt}`,
    `- Source: ${sourceLabel}`,
    "",
    "## Included Core Files",
    "",
    "- `manifest.json`",
    "- `cover.svg`",
    "- `self-check.md`",
    "- `submission/form-data.json`",
    "- `submission/design-style.json`",
    "- `submission/style-tokens.json`",
    "- `submission/README.md`",
    "",
    "## Included Scaffold Files",
    "",
    ...scaffoldFileNames.map((file) => `- \`${file}\``),
    "",
    "## Recommended Next Steps",
    "",
    "1. Validate manifest locally: `pnpm run submission:validate ./manifest.json`",
    "2. Open issue template: `.github/ISSUE_TEMPLATE/style_submission.yml`",
    "3. Paste `manifest.json`, `cover.svg`, and `self-check.md` into the issue form.",
    "",
  ].join("\n");
}

function normalizeText(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function ensureTrailingNewline(value: string): string {
  if (value.endsWith("\n")) {
    return value;
  }
  return `${value}\n`;
}
