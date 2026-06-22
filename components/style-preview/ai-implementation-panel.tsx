"use client";

import { useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { Copy, Download, ChevronDown, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { buildPromptPair, resolvePromptKeywords } from "@/lib/styles/prompt-pair";
import type { PromptContext } from "@/lib/styles/prompt-pair";
import { trackEvent } from "@/lib/analytics/events";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

function bulletList(values: string[]): string {
  const items = values.map((value) => value.trim()).filter(Boolean);
  return items.length > 0 ? items.map((value) => `- ${value}`).join("\n") : "- (none)";
}

function buildDesignSpec({
  locale,
  styleName,
  styleSlug,
  description,
  philosophy,
  colors,
  doList,
  dontList,
  keywords,
}: {
  locale: "en" | "zh";
  styleName: string;
  styleSlug: string;
  description: string;
  philosophy: string;
  colors: AiImplementationPanelProps["colors"];
  doList: string[];
  dontList: string[];
  keywords: string[];
}): string {
  const accents = colors.accent.join(", ");

  if (locale === "en") {
    return `# ${styleName} Design Spec

style_slug: ${styleSlug}

## When To Use
- Before implementation, when the team needs one shared definition of the style.
- Before handing work to AI, so colors, layout, components, motion, and accessibility have clear boundaries.
- During review, when you need a checklist for whether the result still matches the style.

## How To Use
- Read Overview and Visual System first to understand the signature.
- Treat Layout Rules and Component Rules as implementation boundaries.
- Use Delivery Check before accepting generated UI or shipping changes.

## Overview
${description}

## Design Intent
${philosophy.split("\n\n")[0] ?? description}

## Visual System
- Primary: ${colors.primary}
- Secondary: ${colors.secondary}
- Accents: ${accents}
- Signature cues: ${keywords.slice(0, 8).join(", ")}

## Layout Rules
- Use direct, high-contrast hierarchy before decorative density.
- Keep sections scannable with strong dividers, clear alignment, and deliberate asymmetry.
- Preserve stable responsive dimensions for controls, cards, and preview surfaces.

## Component Rules
${bulletList(doList.slice(0, 8))}

## Interaction And Motion
- Hover states should feel immediate and physical.
- Active states should visibly compress or flatten the element.
- Avoid soft fades, blurry depth, or motion that changes layout unexpectedly.

## Accessibility
- Keep text contrast at WCAG AA or better.
- Preserve visible focus states on every interactive element.
- Maintain 44px mobile touch targets and respect reduced-motion preferences.

## Avoid
${bulletList(dontList.slice(0, 8))}

## Delivery Check
- The page should still be recognizable as ${styleName} after replacing sample content.
- Buttons, cards, inputs, empty states, errors, and loading states should share one visual language.
- No rounded-card, blurred-shadow, or gradient-heavy defaults should leak in from generic UI libraries.`;
  }

  return `# ${styleName} Design Spec

style_slug: ${styleSlug}

## 什么时候用
- 实现前需要统一团队或 AI 对这个风格的理解时使用。
- 把任务交给 AI 前，用它确定颜色、布局、组件、动效和可访问性的边界。
- 审核结果时，用它判断生成界面是否仍然属于这个风格。

## 怎么用
- 先读“概览”和“视觉系统”，理解这个风格的识别点。
- 把“布局规则”和“组件规则”当作实现边界。
- 交付前按“交付检查”逐条自检。

## 概览
${description}

## 设计意图
${philosophy.split("\n\n")[0] ?? description}

## 视觉系统
- Primary: ${colors.primary}
- Secondary: ${colors.secondary}
- Accents: ${accents}
- Signature cues: ${keywords.slice(0, 8).join("、")}

## 布局规则
- 先建立直接、高对比的信息层级，再考虑装饰密度。
- 区块需要易扫读：强分隔、明确对齐、可控的不对称。
- 控件、卡片、预览区域要有稳定的响应式尺寸，避免交互时跳动。

## 组件规则
${bulletList(doList.slice(0, 8))}

## 交互与动效
- Hover 反馈要即时、明确、有实体碰撞感。
- Active 状态要明显压平或压缩元素。
- 避免柔和淡入、模糊景深、以及会引发布局变化的动效。

## 可访问性
- 文字对比度保持 WCAG AA 或更高。
- 每个可交互元素都必须保留清晰键盘焦点。
- 移动端触控目标不低于 44px，并尊重 reduced-motion。

## 禁止项
${bulletList(dontList.slice(0, 8))}

## 交付检查
- 替换示例内容后，页面仍应一眼识别为 ${styleName}。
- 按钮、卡片、输入、空状态、错误、加载状态应共享同一套视觉语言。
- 不允许通用组件库的圆角卡片、模糊阴影、重渐变默认样式泄漏进来。`;
}

function addPromptPurpose({
  locale,
  kind,
  content,
}: {
  locale: "en" | "zh";
  kind: "hard" | "creative";
  content: string;
}): string {
  if (locale === "en") {
    const purpose =
      kind === "hard"
        ? "Use this when you want AI to generate code with strict style consistency. It is the safest default for production UI."
        : "Use this when you want AI to explore the direction more freely while keeping the core style identity.";
    const steps =
      kind === "hard"
        ? [
            "Copy the full prompt into ChatGPT, Claude, Cursor, or another coding assistant.",
            "Append the concrete product/page requirement after the prompt.",
            "After generation, check the forbidden rules and interaction states before accepting the output.",
          ]
        : [
            "Copy the brief into the AI tool when you are still exploring directions.",
            "Add the target page type, audience, and any reference constraints.",
            "Ask for 2-3 directions first, then switch to Hard Prompt once one direction is chosen.",
          ];
    const title = kind === "hard" ? "# Hard Prompt" : "# Creative Brief";
    return content.replace(
      /# (Hard Prompt|Soft Prompt)/,
      `${title}\n\n## When To Use\n${purpose}\n\n## How To Use\n${bulletList(steps)}`
    );
  }

  const purpose =
    kind === "hard"
      ? "当你希望 AI 严格按风格规则生成代码时使用。它是生产界面最稳的默认选择。"
      : "当你希望 AI 做方向探索、方案发散时使用。它保留核心风格识别度，但允许实现更灵活。";
  const steps =
    kind === "hard"
      ? [
          "把完整提示词复制到 ChatGPT、Claude、Cursor 或其他编码助手。",
          "在提示词后追加具体产品、页面或组件需求。",
          "生成后按禁止项和交互状态检查，确认没有风格漂移。",
        ]
      : [
          "还在探索方向时，把它复制到 AI 工具里。",
          "补充页面类型、目标用户和参考约束。",
          "先让 AI 给 2-3 个方向，确定方向后再用硬性提示词落地。",
        ];
  const title = kind === "hard" ? "# Hard Prompt" : "# Creative Brief";
  return content.replace(
    /# (Hard Prompt|Soft Prompt)/,
    `${title}\n\n## 什么时候用\n${purpose}\n\n## 怎么用\n${bulletList(steps)}`
  );
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
      <div className="border-b border-border">
        <button
          type="button"
          onClick={() => setContextOpen((prev) => !prev)}
          className="flex w-full items-center gap-2 px-4 py-3 text-sm text-muted hover:text-foreground transition-colors"
          aria-expanded={contextOpen}
        >
          {contextOpen ? (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          )}
          <span>
            {locale === "zh"
              ? "项目上下文（可选 — 让提示词更精准）"
              : "Project Context (optional — makes prompts more precise)"}
          </span>
          {promptContext && (
            <span className="ml-auto text-[10px] uppercase tracking-widest text-foreground/60">
              {locale === "zh" ? "已设置" : "Set"}
            </span>
          )}
        </button>
        {contextOpen && (
          <div className="px-4 pb-4">
            <p className="mb-4 text-xs text-muted">
              {locale === "zh"
                ? "填 2-3 个信息，提示词会自动带上你的项目约束，AI 输出会更精准。不改也不影响使用。"
                : "Fill in 2-3 details and the prompts will carry your project constraints. AI output will be more precise. Skipping is fine."}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="impeccable-project-type"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  {locale === "zh" ? "项目类型" : "Project type"}
                </label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger id="impeccable-project-type" className="w-full">
                    <SelectValue placeholder={locale === "zh" ? "选择" : "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={locale === "zh" ? "着陆页" : "Landing page"}>
                      {locale === "zh" ? "着陆页" : "Landing page"}
                    </SelectItem>
                    <SelectItem value={locale === "zh" ? "仪表盘" : "Dashboard"}>
                      {locale === "zh" ? "仪表盘" : "Dashboard"}
                    </SelectItem>
                    <SelectItem value={locale === "zh" ? "工具 App" : "App / Tool"}>
                      {locale === "zh" ? "工具 App" : "App / Tool"}
                    </SelectItem>
                    <SelectItem value={locale === "zh" ? "其他" : "Other"}>
                      {locale === "zh" ? "其他" : "Other"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="impeccable-brand-personality"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  {locale === "zh" ? "品牌调性（3个词）" : "Brand personality (3 words)"}
                </label>
                <input
                  id="impeccable-brand-personality"
                  type="text"
                  value={brandPersonality}
                  onChange={(e) => setBrandPersonality(e.target.value)}
                  placeholder={
                    locale === "zh"
                      ? "专业、温暖、极简"
                      : "Professional, warm, minimal"
                  }
                  className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="impeccable-anti-references"
                  className="mb-1.5 block text-xs font-medium text-foreground"
                >
                  {locale === "zh" ? "绝对不要什么" : "Anti-references"}
                </label>
                <input
                  id="impeccable-anti-references"
                  type="text"
                  value={antiReferences}
                  onChange={(e) => setAntiReferences(e.target.value)}
                  placeholder={
                    locale === "zh"
                      ? "不要 Material、不要紫色"
                      : "No Material Design, no purple"
                  }
                  className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

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
