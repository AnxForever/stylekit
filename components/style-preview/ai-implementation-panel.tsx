"use client";

import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { Copy, Download } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { buildPromptPair, resolvePromptKeywords } from "@/lib/styles/prompt-pair";
import type { PromptContext } from "@/lib/styles/prompt-pair";
import { trackEvent } from "@/lib/analytics/events";
import {
  addPromptPurpose,
  buildDesignSpec,
} from "./_prompt-builders";
import { ProjectContextForm } from "./_project-context";

interface AiImplementationPanelProps {
  styleName: string;
  styleSlug: string;
  description: string;
  philosophy: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string[];
  };
  aiRules: string;
  aiRulesEn?: string;
  enhancedRules?: string | null;
  doList: string[];
  doListEn?: string[];
  dontList: string[];
  dontListEn?: string[];
  keywords: string[];
  keywordsEn?: string[];
}

type ImplementationTab = "design-spec" | "hard" | "creative-brief";

interface ImplementationItem {
  id: ImplementationTab;
  title: string;
  eyebrow: string;
  description: string;
  whenToUse: string[];
  howToUse: string[];
  filename: string;
  content: string;
}


export function AiImplementationPanel({
  styleName,
  styleSlug,
  description,
  philosophy,
  colors,
  aiRules,
  aiRulesEn,
  enhancedRules,
  doList,
  doListEn,
  dontList,
  dontListEn,
  keywords,
  keywordsEn,
}: AiImplementationPanelProps) {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState<ImplementationTab>("hard");
  const [copiedTab, setCopiedTab] = useState<ImplementationTab | null>(null);

  // Project context — lightweight interview before prompt generation
  const [contextOpen, setContextOpen] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [brandPersonality, setBrandPersonality] = useState("");
  const [antiReferences, setAntiReferences] = useState("");

  const promptContext: PromptContext | undefined = useMemo(() => {
    const trimmed = {
      projectType: projectType.trim(),
      brandPersonality: brandPersonality.trim(),
      antiReferences: antiReferences.trim(),
    };
    if (!trimmed.projectType && !trimmed.brandPersonality && !trimmed.antiReferences) {
      return undefined;
    }
    return trimmed;
  }, [projectType, brandPersonality, antiReferences]);

  const items = useMemo<ImplementationItem[]>(() => {
    const localizedDoList = locale === "en" && doListEn && doListEn.length > 0 ? doListEn : doList;
    const localizedDontList = locale === "en" && dontListEn && dontListEn.length > 0 ? dontListEn : dontList;
    const promptInput = {
      styleName,
      styleSlug,
      aiRules,
      aiRulesEn,
      enhancedRules,
      doList,
      doListEn,
      dontList,
      dontListEn,
      keywords,
      keywordsEn,
    };
    const localizedKeywords = resolvePromptKeywords(promptInput, locale, 8);
    const prompts = buildPromptPair(promptInput, locale, promptContext);
    const hardPrompt = addPromptPurpose({
      locale,
      kind: "hard",
      content: prompts.hardPrompt,
    });
    const creativeBrief = addPromptPurpose({
      locale,
      kind: "creative",
      content: prompts.softPrompt,
    });

    return [
      {
        id: "hard",
        title: locale === "zh" ? "硬性提示词" : "Hard Prompt",
        eyebrow: locale === "zh" ? "推荐 · 直接生成" : "Recommended · Generate",
        description:
          locale === "zh"
            ? "默认使用它：复制后追加具体需求，让 AI 直接生成一致、可落地的前端。"
            : "Use this by default: copy it, append the concrete requirement, and let AI generate consistent production UI.",
        whenToUse:
          locale === "zh"
            ? ["要 AI 直接生成页面或组件", "需要多轮输出保持一致", "担心风格跑偏或变丑"]
            : ["When AI should generate UI directly", "When repeated outputs must stay consistent", "When style drift is the main risk"],
        howToUse:
          locale === "zh"
            ? ["复制完整提示词", "后面追加具体需求", "生成后按禁止项和状态规则检查"]
            : ["Copy the full prompt", "Append the concrete requirement", "Review against forbidden rules and UI states"],
        filename: `${styleSlug}-hard-prompt.md`,
        content: hardPrompt,
      },
      {
        id: "design-spec",
        title: "Design Spec",
        eyebrow: locale === "zh" ? "说明书 · 质检标准" : "Reference · QA standard",
        description:
          locale === "zh"
            ? "当你要理解、改写或审核风格时使用。它解释硬性提示词背后的规则。"
            : "Use this to understand, modify, or review the style. It explains the rules behind the hard prompt.",
        whenToUse:
          locale === "zh"
            ? ["实现前统一风格标准", "交给 AI 或团队前确定边界", "审核结果是否跑偏"]
            : ["Before implementation", "Before handing work to AI or a team", "When reviewing style drift"],
        howToUse:
          locale === "zh"
            ? ["先读概览和视觉系统", "按布局和组件规则实现", "交付前用检查清单验收"]
            : ["Read overview and visual system first", "Implement within layout and component rules", "Use delivery check before accepting output"],
        filename: `${styleSlug}-design-spec.md`,
        content: buildDesignSpec({
          locale,
          styleName,
          styleSlug,
          description,
          philosophy,
          colors,
          doList: localizedDoList,
          dontList: localizedDontList,
          keywords: localizedKeywords,
        }),
      },
      {
        id: "creative-brief",
        title: locale === "zh" ? "Creative Brief" : "Creative Brief",
        eyebrow: locale === "zh" ? "探索 · 改版方向" : "Explore · Redesign",
        description:
          locale === "zh"
            ? "用于探索和改版：保留风格识别度，但允许 AI 在布局和表达上更灵活。"
            : "For exploration and redesign: keeps the style identity while allowing more layout and expression flexibility.",
        whenToUse:
          locale === "zh"
            ? ["早期找方向", "想比较不同布局方案", "做改版或视觉探索"]
            : ["Early direction finding", "Comparing layout options", "Redesign or visual exploration"],
        howToUse:
          locale === "zh"
            ? ["复制后补充场景和用户", "先让 AI 给多个方向", "选定后再用硬性提示词落地"]
            : ["Copy it and add context plus audience", "Ask for multiple directions first", "Switch to Hard Prompt after choosing one"],
        filename: `${styleSlug}-creative-brief.md`,
        content: creativeBrief,
      },
    ];
  }, [
    locale,
    styleName,
    styleSlug,
    description,
    philosophy,
    colors,
    aiRules,
    aiRulesEn,
    enhancedRules,
    doList,
    doListEn,
    dontList,
    dontListEn,
    keywords,
    keywordsEn,
    promptContext,
  ]);

  const activeItem = items.find((item) => item.id === activeTab) ?? items[0];

  const focusTab = (tabId: ImplementationTab) => {
    window.requestAnimationFrame(() => {
      document.getElementById(`ai-implementation-tab-${tabId}`)?.focus();
    });
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, tabId: ImplementationTab) => {
    const currentIndex = items.findIndex((item) => item.id === tabId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = items[nextIndex]?.id;
    if (!nextTab) return;
    setActiveTab(nextTab);
    focusTab(nextTab);
  };

  const handleCopy = async (item: ImplementationItem) => {
    try {
      await navigator.clipboard.writeText(item.content);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = item.content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopiedTab(item.id);
    trackEvent("code_copy", { slug: styleSlug, language: item.id });
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownload = (item: ImplementationItem) => {
    const blob = new Blob([item.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-border">
      <div
        role="tablist"
        aria-label={locale === "zh" ? "AI 实现文档" : "AI implementation documents"}
        className="grid grid-cols-1 border-b border-border sm:grid-cols-3"
      >
        {items.map((item) => {
          const selected = item.id === activeItem.id;

          return (
            <button
              key={item.id}
              id={`ai-implementation-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`${item.eyebrow} ${item.title}`}
              aria-controls={`ai-implementation-panel-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              onKeyDown={(event) => handleTabKeyDown(event, item.id)}
              className={`min-h-[56px] border-b border-r border-border px-3 py-3 text-left transition-colors last:border-r-0 md:border-b-0 ${
                selected
                  ? "bg-foreground text-background"
                  : "bg-background text-muted hover:bg-zinc-50 hover:text-foreground dark:hover:bg-zinc-900"
              }`}
            >
              <span className="block text-[10px] uppercase tracking-widest opacity-75">
                {item.eyebrow}
              </span>
              <span className="mt-1 block text-sm font-medium tracking-normal">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Project context — lightweight pre-prompt interview */}
      <ProjectContextForm
        locale={locale}
        open={contextOpen}
        onToggle={() => setContextOpen((prev) => !prev)}
        hasContext={!!promptContext}
        projectType={projectType}
        brandPersonality={brandPersonality}
        antiReferences={antiReferences}
        onProjectTypeChange={setProjectType}
        onBrandPersonalityChange={setBrandPersonality}
        onAntiReferencesChange={setAntiReferences}
      />

      <div
        id={`ai-implementation-panel-${activeItem.id}`}
        role="tabpanel"
        aria-labelledby={`ai-implementation-tab-${activeItem.id}`}
      >
        <div className="flex flex-col gap-4 border-b border-border px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg">{activeItem.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-muted">{activeItem.description}</p>
            <div className="mt-4 grid gap-3 text-xs md:grid-cols-2">
              <div className="border border-border/70 p-3">
                <p className="mb-2 font-medium text-foreground">
                  {locale === "zh" ? "什么时候用" : "When to use"}
                </p>
                <ul className="space-y-1.5 text-muted">
                  {activeItem.whenToUse.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border/70 p-3">
                <p className="mb-2 font-medium text-foreground">
                  {locale === "zh" ? "怎么用" : "How to use"}
                </p>
                <ul className="space-y-1.5 text-muted">
                  {activeItem.howToUse.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCopy(activeItem)}
              className="inline-flex min-h-[40px] items-center gap-2 border border-border px-3 py-2 text-sm transition-colors hover:border-foreground hover:text-foreground"
            >
              <Copy className="h-4 w-4" aria-hidden="true" />
              {copiedTab === activeItem.id
                ? locale === "zh"
                  ? "已复制"
                  : "Copied"
                : locale === "zh"
                  ? "复制"
                  : "Copy"}
            </button>
            <button
              type="button"
              onClick={() => handleDownload(activeItem)}
              className="inline-flex min-h-[40px] items-center gap-2 border border-border px-3 py-2 text-sm transition-colors hover:border-foreground hover:text-foreground"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {locale === "zh" ? "下载" : "Download"}
            </button>
          </div>
        </div>

        <div className="max-h-[520px] overflow-y-auto p-4">
          <pre className="whitespace-pre-wrap text-xs leading-6 text-foreground md:text-sm">
            <code>{activeItem.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
