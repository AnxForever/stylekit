"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Copy, Download, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics/events";
import type { Locale } from "@/lib/i18n/translations";
import {
  PROJECT_BRIEF_PROJECT_TYPES,
  PROJECT_BRIEF_STACKS,
  PROJECT_BRIEF_STATES,
  buildProjectImplementationBrief,
  getProjectBriefAnalyticsMetadata,
  getProjectBriefProjectTypeLabel,
  getProjectBriefStackLabel,
  getProjectBriefStateLabel,
  normalizeProjectBriefList,
  validateProjectImplementationBriefInput,
  type ProjectBriefAnalyticsMetadata,
  type ProjectBriefProjectType,
  type ProjectBriefStack,
  type ProjectBriefState,
  type ProjectBriefValidationField,
} from "@/lib/styles/project-implementation-brief";
import type { PromptContext, PromptPairInput } from "@/lib/styles/prompt-pair";

interface ProjectContextFormProps {
  locale: Locale;
  open: boolean;
  onToggle: () => void;
  style: PromptPairInput;
  onPromptContextChange: (context: PromptContext | undefined) => void;
}

interface GeneratedBrief {
  content: string;
  metadata: ProjectBriefAnalyticsMetadata;
}

interface LocalizedStatus {
  locale: Locale;
  message: string;
}

const inputClassName =
  "w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none";

function toggleItem<T extends string>(values: T[], item: T, checked: boolean): T[] {
  return checked ? [...values, item] : values.filter((value) => value !== item);
}

async function copyText(value: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value);
    return;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (!copied) throw new Error("Clipboard unavailable");
  }
}

export function ProjectContextForm({
  locale,
  open,
  onToggle,
  style,
  onPromptContextChange,
}: ProjectContextFormProps) {
  const [projectType, setProjectType] = useState<ProjectBriefProjectType | "">("");
  const [audience, setAudience] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [stacks, setStacks] = useState<ProjectBriefStack[]>([]);
  const [requiredItemsText, setRequiredItemsText] = useState("");
  const [requiredStates, setRequiredStates] = useState<ProjectBriefState[]>([]);
  const [brandPersonality, setBrandPersonality] = useState("");
  const [antiReferences, setAntiReferences] = useState("");
  const [additionalConstraints, setAdditionalConstraints] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [issues, setIssues] = useState<ProjectBriefValidationField[]>([]);
  const [generated, setGenerated] = useState<GeneratedBrief | null>(null);
  const [generatedIsStale, setGeneratedIsStale] = useState(false);
  const [status, setStatus] = useState<LocalizedStatus | null>(null);

  const generatedOutputIsStale =
    generatedIsStale || (generated !== null && generated.metadata.locale !== locale);

  const input = useMemo(
    () => ({
      locale,
      style,
      projectType: projectType || ("" as ProjectBriefProjectType),
      audience,
      primaryGoal,
      stacks,
      requiredItems: normalizeProjectBriefList(requiredItemsText),
      requiredStates,
      brandPersonality: normalizeProjectBriefList(brandPersonality),
      antiReferences: normalizeProjectBriefList(antiReferences),
      additionalConstraints,
    }),
    [
      locale,
      style,
      projectType,
      audience,
      primaryGoal,
      stacks,
      requiredItemsText,
      requiredStates,
      brandPersonality,
      antiReferences,
      additionalConstraints,
    ],
  );

  const hasContext = Boolean(
    projectType ||
      audience.trim() ||
      primaryGoal.trim() ||
      stacks.length ||
      requiredItemsText.trim() ||
      requiredStates.length ||
      brandPersonality.trim() ||
      antiReferences.trim() ||
      additionalConstraints.trim(),
  );

  useEffect(() => {
    const context = {
      projectType: projectType
        ? getProjectBriefProjectTypeLabel(projectType, locale)
        : "",
      brandPersonality: brandPersonality.trim(),
      antiReferences: antiReferences.trim(),
    };
    onPromptContextChange(
      context.projectType || context.brandPersonality || context.antiReferences
        ? context
        : undefined,
    );
  }, [
    locale,
    projectType,
    brandPersonality,
    antiReferences,
    onPromptContextChange,
  ]);

  const markChanged = (field: ProjectBriefValidationField) => {
    setIssues((current) => current.filter((issue) => issue !== field));
    if (generated) setGeneratedIsStale(true);
    setStatus(null);
  };

  const handleGenerate = () => {
    const validation = validateProjectImplementationBriefInput(input);
    if (!validation.valid) {
      const nextIssues = [...new Set(validation.issues.map((issue) => issue.field))];
      setIssues(nextIssues);
      setStatus({
        locale,
        message:
          locale === "zh"
            ? "请完成项目类型、主要用户和核心任务，并检查字段长度。"
            : "Complete project type, primary audience, and core task, then check field limits.",
      });
      return;
    }

    const metadata = getProjectBriefAnalyticsMetadata(input);
    setGenerated({
      content: buildProjectImplementationBrief(input),
      metadata,
    });
    setGeneratedIsStale(false);
    setIssues([]);
    setStatus({
      locale,
      message:
        locale === "zh" ? "实施简报已生成。" : "Implementation brief generated.",
    });
    trackEvent("project_brief_generated", metadata);
  };

  const handleCopy = async () => {
    if (!generated) return;
    try {
      await copyText(generated.content);
      setStatus({
        locale,
        message:
          locale === "zh" ? "实施简报已复制。" : "Implementation brief copied.",
      });
      trackEvent("project_brief_copy", generated.metadata);
    } catch {
      setStatus({
        locale,
        message:
          locale === "zh"
            ? "复制失败，请直接选择下方内容。"
            : "Copy failed. Select the content below instead.",
      });
    }
  };

  const handleDownload = () => {
    if (!generated) return;
    try {
      const blob = new Blob([generated.content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${style.styleSlug}-project-implementation-brief.md`;
      anchor.click();
      URL.revokeObjectURL(url);
      setStatus({
        locale,
        message:
          locale === "zh" ? "实施简报已下载。" : "Implementation brief downloaded.",
      });
      trackEvent("project_brief_download", generated.metadata);
    } catch {
      setStatus({
        locale,
        message:
          locale === "zh"
            ? "下载失败，简报内容仍保留在下方。"
            : "Download failed. The brief remains available below.",
      });
    }
  };

  const handleClear = () => {
    setProjectType("");
    setAudience("");
    setPrimaryGoal("");
    setStacks([]);
    setRequiredItemsText("");
    setRequiredStates([]);
    setBrandPersonality("");
    setAntiReferences("");
    setAdditionalConstraints("");
    setIssues([]);
    setGenerated(null);
    setGeneratedIsStale(false);
    setStatus({
      locale,
      message:
        locale === "zh" ? "项目上下文已清空。" : "Project context cleared.",
    });
  };

  const fieldError = (field: ProjectBriefValidationField) => issues.includes(field);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[48px] w-full items-center gap-2 px-4 py-3 text-left text-sm text-muted transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-controls="project-implementation-brief-form"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        <span>
          {locale === "zh"
            ? "项目实施简报（可选）"
            : "Project Implementation Brief (optional)"}
        </span>
        {hasContext && (
          <span className="ml-auto text-[10px] uppercase tracking-widest text-foreground/60">
            {generated ? (locale === "zh" ? "已生成" : "Generated") : locale === "zh" ? "已填写" : "In progress"}
          </span>
        )}
      </button>

      {open && (
        <div id="project-implementation-brief-form" className="px-4 pb-5">
          <p className="mb-4 max-w-3xl text-xs leading-5 text-muted">
            {locale === "zh"
              ? "填写 3 项核心信息，生成可交给编码助手的实施工作单。输入只保留在当前页面，不会上传或保存。"
              : "Complete three core fields to create a work order for a coding assistant. Input stays on this page and is not uploaded or saved."}
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="project-brief-project-type"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                {locale === "zh" ? "项目类型（必填）" : "Project type (required)"}
              </label>
              <Select
                value={projectType}
                onValueChange={(value) => {
                  setProjectType(value as ProjectBriefProjectType);
                  markChanged("projectType");
                }}
              >
                <SelectTrigger
                  id="project-brief-project-type"
                  className="w-full"
                  aria-invalid={fieldError("projectType")}
                  aria-describedby={fieldError("projectType") ? "project-brief-project-type-error" : undefined}
                >
                  <SelectValue placeholder={locale === "zh" ? "选择项目类型" : "Select project type"} />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_BRIEF_PROJECT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {getProjectBriefProjectTypeLabel(type, locale)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldError("projectType") && (
                <p id="project-brief-project-type-error" className="mt-1 text-xs text-red-600">
                  {locale === "zh" ? "请选择项目类型。" : "Select a project type."}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="project-brief-audience"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                {locale === "zh" ? "主要用户（必填）" : "Primary audience (required)"}
              </label>
              <input
                id="project-brief-audience"
                value={audience}
                maxLength={300}
                onChange={(event) => {
                  setAudience(event.target.value);
                  markChanged("audience");
                }}
                aria-invalid={fieldError("audience")}
                aria-describedby={fieldError("audience") ? "project-brief-audience-error" : undefined}
                placeholder={locale === "zh" ? "例如：小型物流团队的运营主管" : "For example: operations managers at small logistics teams"}
                className={inputClassName}
              />
              {fieldError("audience") && (
                <p id="project-brief-audience-error" className="mt-1 text-xs text-red-600">
                  {locale === "zh" ? "请填写主要用户，最多 300 个字符。" : "Enter the primary audience, up to 300 characters."}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="project-brief-primary-goal"
                className="mb-1.5 block text-xs font-medium text-foreground"
              >
                {locale === "zh" ? "核心任务（必填）" : "Core user task (required)"}
              </label>
              <textarea
                id="project-brief-primary-goal"
                value={primaryGoal}
                maxLength={600}
                rows={3}
                onChange={(event) => {
                  setPrimaryGoal(event.target.value);
                  markChanged("primaryGoal");
                }}
                aria-invalid={fieldError("primaryGoal")}
                aria-describedby={fieldError("primaryGoal") ? "project-brief-primary-goal-error" : undefined}
                placeholder={
                  locale === "zh"
                    ? "例如：查看延误订单并在不离开队列的情况下分配负责人"
                    : "For example: review delayed shipments and assign an owner without leaving the queue"
                }
                className={`${inputClassName} resize-y`}
              />
              {fieldError("primaryGoal") && (
                <p id="project-brief-primary-goal-error" className="mt-1 text-xs text-red-600">
                  {locale === "zh" ? "请填写核心任务，最多 600 个字符。" : "Enter the core task, up to 600 characters."}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 border-t border-border/70 pt-4">
            <button
              type="button"
              onClick={() => setAdvancedOpen((current) => !current)}
              className="flex min-h-[40px] items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              aria-expanded={advancedOpen}
              aria-controls="project-brief-advanced-fields"
            >
              {advancedOpen ? (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              )}
              {locale === "zh" ? "高级约束（可选）" : "Advanced constraints (optional)"}
            </button>

            {advancedOpen && (
              <div id="project-brief-advanced-fields" className="mt-3 space-y-5">
                <fieldset>
                  <legend className="mb-2 text-xs font-medium text-foreground">
                    {locale === "zh" ? "技术栈" : "Technology stack"}
                  </legend>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                    {PROJECT_BRIEF_STACKS.map((stack) => (
                      <label
                        key={stack}
                        className="flex min-h-[40px] items-center gap-2 border border-border px-3 py-2 text-xs text-foreground"
                      >
                        <input
                          type="checkbox"
                          checked={stacks.includes(stack)}
                          onChange={(event) => {
                            setStacks((current) => toggleItem(current, stack, event.target.checked));
                            markChanged("stacks");
                          }}
                        />
                        <span>{getProjectBriefStackLabel(stack)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="project-brief-required-items" className="mb-1.5 block text-xs font-medium text-foreground">
                      {locale === "zh" ? "必要页面、区块或流程" : "Required pages, sections, or flow steps"}
                    </label>
                    <textarea
                      id="project-brief-required-items"
                      value={requiredItemsText}
                      maxLength={1_500}
                      rows={3}
                      onChange={(event) => {
                        setRequiredItemsText(event.target.value);
                        markChanged("requiredItems");
                      }}
                      aria-invalid={fieldError("requiredItems")}
                      placeholder={locale === "zh" ? "延误队列、订单详情、负责人分配" : "Delay queue, shipment detail, owner assignment"}
                      className={`${inputClassName} resize-y`}
                    />
                  </div>

                  <div>
                    <label htmlFor="project-brief-brand" className="mb-1.5 block text-xs font-medium text-foreground">
                      {locale === "zh" ? "品牌调性" : "Brand personality"}
                    </label>
                    <input
                      id="project-brief-brand"
                      value={brandPersonality}
                      maxLength={400}
                      onChange={(event) => {
                        setBrandPersonality(event.target.value);
                        markChanged("brandPersonality");
                      }}
                      placeholder={locale === "zh" ? "直接、可靠、专注" : "Direct, dependable, focused"}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <fieldset>
                  <legend className="mb-2 text-xs font-medium text-foreground">
                    {locale === "zh" ? "必要界面状态" : "Required UI states"}
                  </legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {PROJECT_BRIEF_STATES.map((state) => (
                      <label
                        key={state}
                        className="flex min-h-[40px] items-center gap-2 border border-border px-3 py-2 text-xs text-foreground"
                      >
                        <input
                          type="checkbox"
                          checked={requiredStates.includes(state)}
                          onChange={(event) => {
                            setRequiredStates((current) => toggleItem(current, state, event.target.checked));
                            markChanged("requiredStates");
                          }}
                        />
                        <span>{getProjectBriefStateLabel(state, locale)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="project-brief-anti-references" className="mb-1.5 block text-xs font-medium text-foreground">
                      {locale === "zh" ? "不要出现的风格或做法" : "Anti-references and exclusions"}
                    </label>
                    <textarea
                      id="project-brief-anti-references"
                      value={antiReferences}
                      maxLength={1_500}
                      rows={3}
                      onChange={(event) => {
                        setAntiReferences(event.target.value);
                        markChanged("antiReferences");
                      }}
                      placeholder={locale === "zh" ? "不要玻璃拟态、不要紫色渐变" : "No glassmorphism, no purple gradients"}
                      className={`${inputClassName} resize-y`}
                    />
                  </div>

                  <div>
                    <label htmlFor="project-brief-additional-constraints" className="mb-1.5 block text-xs font-medium text-foreground">
                      {locale === "zh" ? "其他工程约束" : "Additional engineering constraints"}
                    </label>
                    <textarea
                      id="project-brief-additional-constraints"
                      value={additionalConstraints}
                      maxLength={1_200}
                      rows={3}
                      onChange={(event) => {
                        setAdditionalConstraints(event.target.value);
                        markChanged("additionalConstraints");
                      }}
                      placeholder={locale === "zh" ? "保留现有路由和数据请求约定" : "Preserve existing routing and data-fetching conventions"}
                      className={`${inputClassName} resize-y`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex min-h-[40px] items-center border border-foreground bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-85"
            >
              {generated
                ? locale === "zh"
                  ? "更新实施简报"
                  : "Update brief"
                : locale === "zh"
                  ? "生成实施简报"
                  : "Generate brief"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!hasContext && !generated}
              className="inline-flex min-h-[40px] items-center gap-2 border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {locale === "zh" ? "清空" : "Clear"}
            </button>
            <p
              className={`min-w-0 basis-full text-xs sm:ml-2 sm:basis-auto ${issues.length > 0 ? "text-red-600" : "text-muted"}`}
              role={issues.length > 0 ? "alert" : "status"}
              aria-live="polite"
            >
              {status?.locale === locale ? status.message : ""}
            </p>
          </div>

          {generated && (
            <div className="mt-5 border-t border-border pt-5">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {locale === "zh" ? "项目实施简报" : "Project Implementation Brief"}
                  </h3>
                  {generatedOutputIsStale && (
                    <p className="mt-1 text-xs text-muted">
                      {locale === "zh" ? "字段已修改，请更新简报。" : "Fields changed. Update the brief before using it."}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex min-h-[40px] items-center gap-2 border border-border px-3 py-2 text-sm transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    {locale === "zh" ? "复制简报" : "Copy brief"}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex min-h-[40px] items-center gap-2 border border-border px-3 py-2 text-sm transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {locale === "zh" ? "下载简报" : "Download brief"}
                  </button>
                </div>
              </div>
              <div className="max-h-[420px] overflow-auto border border-border p-3">
                <pre className="whitespace-pre-wrap break-words text-xs leading-6 text-foreground">
                  <code>{generated.content}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
