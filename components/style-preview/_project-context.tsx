"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/lib/i18n/translations";

interface ProjectContextFormProps {
  locale: Locale;
  open: boolean;
  onToggle: () => void;
  hasContext: boolean;
  projectType: string;
  brandPersonality: string;
  antiReferences: string;
  onProjectTypeChange: (value: string) => void;
  onBrandPersonalityChange: (value: string) => void;
  onAntiReferencesChange: (value: string) => void;
}

/**
 * Lightweight pre-prompt interview form: lets the caller fill in
 * 2-3 project constraints (project type, brand personality,
 * anti-references) that get threaded into the AI prompt. The
 * disclosure collapses by default so it does not dominate the
 * panel above the documents themselves.
 *
 * Extracted from ai-implementation-panel.tsx so the parent only
 * owns the panel-level state machine (active tab, copy/download
 * handlers) and this form owns its own layout + Select/input
 * wiring.
 */
export function ProjectContextForm({
  locale,
  open,
  onToggle,
  hasContext,
  projectType,
  brandPersonality,
  antiReferences,
  onProjectTypeChange,
  onBrandPersonalityChange,
  onAntiReferencesChange,
}: ProjectContextFormProps) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-muted hover:text-foreground transition-colors"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        )}
        <span>
          {locale === "zh"
            ? "项目上下文（可选 — 让提示词更精准）"
            : "Project Context (optional — makes prompts more precise)"}
        </span>
        {hasContext && (
          <span className="ml-auto text-[10px] uppercase tracking-widest text-foreground/60">
            {locale === "zh" ? "已设置" : "Set"}
          </span>
        )}
      </button>
      {open && (
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
              <Select value={projectType} onValueChange={onProjectTypeChange}>
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
                onChange={(e) => onBrandPersonalityChange(e.target.value)}
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
                onChange={(e) => onAntiReferencesChange(e.target.value)}
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
  );
}