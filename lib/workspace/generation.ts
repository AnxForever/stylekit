import { createHash } from "node:crypto";
import {
  evaluateGeneratedFiles,
  generateHtmlFiles,
  generateNextjsFiles,
  generatePreviewHtml,
  generateReactFiles,
  getTemplateByType,
  sanitizeGeneratorConfig,
  validateGeneratorConfig,
  type GeneratorConfig,
  type GeneratedFile,
  type SectionConfig,
  type TemplateType,
} from "@/lib/generator";
import { getStyleBySlug } from "@/lib/styles";
import type { KnowledgeAdvisorReference } from "@/lib/knowledge";
import type { CreateWorkspaceProjectInput, WorkspaceContent } from "./schema";

export const WORKSPACE_GENERATOR_VERSION = "workspace-generator-v1" as const;
export const WORKSPACE_SUPPORTED_STYLES = [
  "neo-brutalist",
  "glassmorphism",
  "neumorphism",
  "editorial",
] as const;

type Target = "nextjs" | "react" | "html";
type SupportedStyle = (typeof WORKSPACE_SUPPORTED_STYLES)[number];

// Copy is optional for direct callers that only care about the template
// defaults; parsed project rows and revision snapshots always carry it.
type WorkspaceProjectInput = Omit<CreateWorkspaceProjectInput, "content"> & {
  content?: WorkspaceContent;
};

export class WorkspaceGenerationError extends Error {
  constructor(public readonly code: "UNSUPPORTED_CAPABILITY" | "INVALID_PROJECT_BRIEF" | "GENERATION_QUALITY_FAILED", message: string) {
    super(message);
  }
}

function templateForProject(type: CreateWorkspaceProjectInput["projectType"]): TemplateType {
  if (type === "landing" || type === "dashboard" || type === "portfolio" || type === "blog") return type;
  throw new WorkspaceGenerationError("UNSUPPORTED_CAPABILITY", `项目类型 ${type} 尚未通过真实工程生成验证。`);
}

function requireSupportedStyle(slug: string | null): { slug: SupportedStyle; style: NonNullable<ReturnType<typeof getStyleBySlug>> } {
  if (!slug || !WORKSPACE_SUPPORTED_STYLES.includes(slug as SupportedStyle)) {
    throw new WorkspaceGenerationError("UNSUPPORTED_CAPABILITY", "当前只开放 Neo Brutalist、Glassmorphism、Neumorphism 和 Editorial 四个已建立专用适配的风格。其他风格不会降级为通用模板。");
  }
  const style = getStyleBySlug(slug);
  if (!style) throw new WorkspaceGenerationError("INVALID_PROJECT_BRIEF", "所选风格不存在或已下线。");
  return { slug: slug as SupportedStyle, style };
}

function buildSections(templateType: TemplateType, content?: WorkspaceContent): SectionConfig[] {
  const template = getTemplateByType(templateType);
  if (!template) throw new WorkspaceGenerationError("UNSUPPORTED_CAPABILITY", `模板 ${templateType} 不存在。`);
  return template.sections.map((section) => ({
    id: section.id,
    name: section.name,
    nameEn: section.nameEn,
    description: section.description,
    enabled: section.defaultEnabled,
    // Saved copy wins over the template default. Unknown ids are ignored, so a
    // revision written before a template change still renders.
    content: Object.fromEntries(
      section.fields.map((field) => [
        field.id,
        content?.[section.id]?.[field.id]?.trim() || field.defaultValue,
      ])
    ),
  }));
}

function sha256(content: string): string {
  return `sha256:${createHash("sha256").update(content).digest("hex")}`;
}

// The generator config is the single input that decides what a project looks
// like. Generation and preview both build it here, so a preview can never drift
// from the code the user downloads.
function buildConfig(
  input: WorkspaceProjectInput,
  templateType: TemplateType,
  outputFormat: Target
) {
  const selected = requireSupportedStyle(input.selectedStyleSlug);
  const config: GeneratorConfig = sanitizeGeneratorConfig(
    {
      styleSlug: selected.slug,
      templateType,
      outputFormat,
      sections: buildSections(templateType, input.content),
      globalContent: {
        siteName: input.name,
        siteDescription: input.description || input.brief.primaryGoal,
      },
    },
    getTemplateByType(templateType)
  );
  const validation = validateGeneratorConfig(config, getTemplateByType(templateType));
  if (validation.errors.length > 0) {
    throw new WorkspaceGenerationError("INVALID_PROJECT_BRIEF", validation.errors.map((issue) => issue.message).join(" "));
  }
  return {
    config,
    styleSlug: selected.slug,
    style: selected.style,
    warnings: validation.warnings.map((issue) => issue.message),
  };
}

export function generateWorkspaceProject(input: WorkspaceProjectInput & {
  target: Target;
  generatedAt: string;
  knowledgeReferences?: KnowledgeAdvisorReference[];
}) {
  const templateType = templateForProject(input.projectType);
  if (templateType !== "dashboard" || input.target !== "nextjs") {
    throw new WorkspaceGenerationError(
      "UNSUPPORTED_CAPABILITY",
      "当前只开放已完成干净安装与生产构建验证的 Next.js 数据后台。其他模板和目标不会降级冒充成功。",
    );
  }
  const { config, styleSlug, style, warnings } = buildConfig(input, templateType, input.target);
  let files: GeneratedFile[];
  if (input.target === "nextjs") files = generateNextjsFiles(config, { type: "builtin", style });
  else if (input.target === "react") files = generateReactFiles(config, { type: "builtin", style });
  else files = generateHtmlFiles(config, { type: "builtin", style });
  files = files.map((file) => {
    if (file.name !== "stylekit.config.json") return file;
    const manifest = JSON.parse(file.content) as Record<string, unknown>;
    manifest.generatedAt = input.generatedAt;
    return { ...file, content: JSON.stringify(manifest, null, 2) };
  });
  files = [...files].sort((left, right) => left.name.localeCompare(right.name));
  const quality = evaluateGeneratedFiles(config, files);
  if (quality.errors.length > 0) {
    throw new WorkspaceGenerationError("GENERATION_QUALITY_FAILED", quality.errors.join(" "));
  }
  return {
    engineVersion: WORKSPACE_GENERATOR_VERSION,
    target: input.target,
    templateType,
    styleSlug,
    knowledge: {
      schemaVersion: "knowledge-generation-context-v1" as const,
      references: input.knowledgeReferences ?? [],
    },
    files: files.map((file) => ({ ...file, sha256: sha256(file.content) })),
    quality: { errors: quality.errors, warnings: [...warnings, ...quality.warnings] },
  };
}

/**
 * Renders the same config into a single self-contained HTML document, for an
 * iframe. `styleSlug` lets the editor preview a style the user has picked but
 * not saved yet; it is validated against the same supported list.
 */
export function buildWorkspacePreview(
  input: WorkspaceProjectInput,
  options: { styleSlug?: string | null } = {}
) {
  const templateType = templateForProject(input.projectType);
  if (templateType !== "dashboard") {
    throw new WorkspaceGenerationError(
      "UNSUPPORTED_CAPABILITY",
      "预览只覆盖已完成工程验证的 Next.js 数据后台。"
    );
  }
  const override =
    options.styleSlug && options.styleSlug !== input.selectedStyleSlug
      ? options.styleSlug
      : null;
  const { config, styleSlug, style } = buildConfig(
    { ...input, selectedStyleSlug: override ?? input.selectedStyleSlug },
    templateType,
    "html"
  );
  return {
    html: generatePreviewHtml(config, { type: "builtin", style }),
    templateType,
    styleSlug,
    unsavedStyle: override !== null,
  };
}
