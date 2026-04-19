"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Eye, FileText, Pencil, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import {
  assessDesignMdQuality,
  DesignMdRenderer,
  parseDesignMd,
  type DesignMdQualityReport,
} from "@/lib/design-md";
import { DESIGN_MD_TEMPLATE_SAMPLE } from "./design-md-template-sample";

type Category = "modern" | "retro" | "minimal" | "expressive";
const CATEGORY_OPTIONS: Category[] = ["modern", "retro", "minimal", "expressive"];

type EditorTab = "edit" | "preview";

interface FormState {
  slug: string;
  name: string;
  nameEn: string;
  category: Category | "";
  description: string;
  designMd: string;
}

const INITIAL_STATE: FormState = {
  slug: "",
  name: "",
  nameEn: "",
  category: "",
  description: "",
  designMd: "",
};

const MIN_DESIGN_MD_LENGTH = 200;

export function DesignMdPasteForm() {
  const { locale } = useI18n();
  const { user, loading: userLoading } = useUser();

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [tab, setTab] = useState<EditorTab>("edit");
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, string[]> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successSlug, setSuccessSlug] = useState<string | null>(null);

  const zh = locale === "zh";

  const parsed = useMemo(() => {
    const raw = form.designMd.trim();
    if (!raw) return { doc: null, report: null as DesignMdQualityReport | null, parseError: null as string | null };
    try {
      const doc = parseDesignMd(form.designMd);
      return {
        doc,
        report: assessDesignMdQuality(doc),
        parseError: null,
      };
    } catch (err) {
      return {
        doc: null,
        report: null,
        parseError: err instanceof Error ? err.message : String(err),
      };
    }
  }, [form.designMd]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const applyFrontmatterHints = (raw: string) => {
    try {
      const doc = parseDesignMd(raw);
      const fm = doc.frontmatter;
      if (!fm) return;
      setForm((prev) => ({
        ...prev,
        slug: prev.slug || fm.slug,
        name: prev.name || fm.name,
        category: (prev.category || fm.category || "") as Category | "",
      }));
    } catch {
      // ignore — user is still typing
    }
  };

  const handleDesignMdChange = (value: string) => {
    updateField("designMd", value);
    applyFrontmatterHints(value);
  };

  const handleLoadSample = () => {
    setForm((prev) => ({ ...prev, designMd: DESIGN_MD_TEMPLATE_SAMPLE }));
    applyFrontmatterHints(DESIGN_MD_TEMPLATE_SAMPLE);
  };

  const canSubmit =
    !submitting &&
    !!user &&
    form.slug.trim().length > 0 &&
    form.name.trim().length > 0 &&
    form.designMd.trim().length >= MIN_DESIGN_MD_LENGTH;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setDetails(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "design-md",
          slug: form.slug.trim().toLowerCase(),
          name: form.name.trim(),
          nameEn: form.nameEn.trim() || undefined,
          category: form.category || undefined,
          description: form.description.trim() || undefined,
          design_md: form.designMd,
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        slug?: string;
        details?: Record<string, string[]>;
      };

      if (!response.ok || !data.success) {
        setError(data.error ?? (zh ? "提交失败" : "Submission failed"));
        if (data.details) setDetails(data.details);
        return;
      }

      setSuccessSlug(data.slug ?? form.slug);
      setForm(INITIAL_STATE);
      setTab("edit");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : zh
            ? "提交失败，请稍后重试"
            : "Submission failed, please retry"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successSlug) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" aria-hidden="true" />
        <h1 className="mt-6 text-2xl font-semibold">
          {zh ? "投稿已进入审核队列" : "Submission queued for review"}
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {zh
            ? `我们已记录 slug 为 "${successSlug}" 的 DESIGN.md。审核通过后它会出现在社区页，带上 DESIGN.md 徽章。`
            : `We have queued your DESIGN.md for slug "${successSlug}". Once approved it will appear in the community feed with a DESIGN.md badge.`}
        </p>
        <p className="mt-2 text-xs text-muted">
          {zh
            ? "审核时间通常为 1-3 天，可随时回社区页查看状态。"
            : "Review typically takes 1-3 days; you can check the community feed any time."}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/community?slug=${encodeURIComponent(successSlug)}`}
            className="inline-flex items-center justify-center h-10 px-4 text-sm bg-accent text-white hover:bg-accent/90 transition-colors"
          >
            {zh ? "去社区查看" : "View in community"}
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setSuccessSlug(null);
            }}
          >
            {zh ? "再提交一份" : "Submit another"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-muted">
          {zh ? "社区投稿" : "Community Submission"}
        </p>
        <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold">
          <FileText className="h-8 w-8 text-accent" aria-hidden="true" />
          {zh ? "粘贴 DESIGN.md" : "Paste DESIGN.md"}
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {zh
            ? "支持 Google Stitch 的 DESIGN.md 格式。把完整 markdown 粘到下方文本域，我们会从 frontmatter 自动读取 slug 与名称。提交后进入人工审核队列。"
            : "Supports the Google Stitch DESIGN.md format. Paste the full markdown below — we will auto-read slug and name from YAML frontmatter. Submissions enter the manual review queue."}
        </p>
      </header>

      {!userLoading && !user ? (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-md border border-border bg-foreground/5 p-4 text-sm"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <p className="font-medium">
              {zh ? "请先登录后再投稿" : "Please sign in before submitting"}
            </p>
            <p className="mt-1 text-muted">
              {zh
                ? "我们用账户记录投稿人署名与审核状态。"
                : "We record submissions against your account for attribution and review tracking."}
            </p>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              {zh ? "Slug (英文唯一标识)" : "Slug (unique id)"}
            </span>
            <Input
              type="text"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="neo-brutalist"
              required
              autoComplete="off"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              {zh ? "风格名称" : "Name"}
            </span>
            <Input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder={zh ? "新野兽派" : "Neo Brutalist"}
              required
              autoComplete="off"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              {zh ? "英文名称 (可选)" : "English name (optional)"}
            </span>
            <Input
              type="text"
              value={form.nameEn}
              onChange={(e) => updateField("nameEn", e.target.value)}
              placeholder="Neo Brutalist"
              autoComplete="off"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">
              {zh ? "分类 (可选)" : "Category (optional)"}
            </span>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value as Category | "")}
              className="h-10 px-4 text-sm border border-border bg-background focus:border-foreground focus:outline-none"
            >
              <option value="">{zh ? "未选择" : "Not selected"}</option>
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">
            {zh ? "一句话描述 (可选，最多 300 字)" : "One-line description (optional, max 300 chars)"}
          </span>
          <Input
            type="text"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder={
              zh
                ? "一句话概括这份设计系统的氛围"
                : "A single sentence capturing the mood of this design system"
            }
            maxLength={300}
          />
        </label>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium">
              {zh ? "DESIGN.md 内容" : "DESIGN.md content"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                {zh ? "加载示例 (Neo Brutalist)" : "Load sample (Neo Brutalist)"}
              </button>
              <div className="inline-flex rounded-full border border-border p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setTab("edit")}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 transition-colors ${
                    tab === "edit"
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-pressed={tab === "edit"}
                >
                  <Pencil className="h-3 w-3" aria-hidden="true" />
                  {zh ? "编辑" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 transition-colors ${
                    tab === "preview"
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-pressed={tab === "preview"}
                  disabled={!form.designMd.trim()}
                >
                  <Eye className="h-3 w-3" aria-hidden="true" />
                  {zh ? "预览" : "Preview"}
                </button>
              </div>
            </div>
          </div>

          {tab === "edit" ? (
            <textarea
              value={form.designMd}
              onChange={(e) => handleDesignMdChange(e.target.value)}
              placeholder={
                zh
                  ? "---\nname: Neo Brutalist\nslug: neo-brutalist\n---\n\n# Design System: ..."
                  : "---\nname: Neo Brutalist\nslug: neo-brutalist\n---\n\n# Design System: ..."
              }
              required
              rows={18}
              className="w-full font-mono text-sm bg-background border border-border p-4 focus:border-foreground focus:outline-none leading-relaxed"
            />
          ) : (
            <div className="min-h-[32rem] border border-border bg-background p-4 md:p-6">
              {parsed.doc ? (
                <DesignMdRenderer document={parsed.doc} showFrontmatter showToc />
              ) : parsed.parseError ? (
                <div role="alert" className="text-sm text-red-600 dark:text-red-400">
                  <p className="font-medium">
                    {zh ? "预览解析失败" : "Preview parse failed"}
                  </p>
                  <p className="mt-1 font-mono text-xs">{parsed.parseError}</p>
                  <p className="mt-2 text-muted">
                    {zh
                      ? "回到编辑 tab 修正后再试。"
                      : "Switch back to Edit to fix and retry."}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted">
                  {zh ? "粘贴内容后这里会显示预览。" : "Paste content first to see a preview."}
                </p>
              )}
            </div>
          )}

          <span className="text-xs text-muted">
            {zh
              ? `至少 ${MIN_DESIGN_MD_LENGTH} 字符,当前 ${form.designMd.length} 字符。`
              : `Min ${MIN_DESIGN_MD_LENGTH} chars, currently ${form.designMd.length}.`}
          </span>
        </div>

        {parsed.report ? <QualityBadge report={parsed.report} zh={zh} /> : null}

        {error ? (
          <div
            role="alert"
            className="rounded-md border border-red-500 bg-red-50 dark:bg-red-950/30 p-4 text-sm text-red-700 dark:text-red-300"
          >
            <p className="font-medium">{error}</p>
            {details ? (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {Object.entries(details).flatMap(([field, msgs]) =>
                  msgs.map((msg, idx) => (
                    <li key={`${field}-${idx}`}>
                      <strong>{field}:</strong> {msg}
                    </li>
                  ))
                )}
              </ul>
            ) : null}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-muted">
            {zh
              ? "提交后进入人工审核，通过后会出现在社区页。"
              : "Submissions are manually reviewed before appearing in the community."}
          </p>
          <Button
            type="submit"
            disabled={!canSubmit}
            variant="primary"
            className="gap-2"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {submitting
              ? zh
                ? "提交中..."
                : "Submitting..."
              : zh
                ? "提交 DESIGN.md"
                : "Submit DESIGN.md"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function QualityBadge({
  report,
  zh,
}: {
  report: DesignMdQualityReport;
  zh: boolean;
}) {
  const tone =
    report.level === "excellent"
      ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-200"
      : report.level === "standard"
        ? "border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200"
        : "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-200";

  const label =
    report.level === "excellent"
      ? zh
        ? "结构完整 (11/11)"
        : "Complete (11/11)"
      : report.level === "standard"
        ? zh
          ? "可接受，可选章节有缺失"
          : "Acceptable, some optional sections missing"
        : zh
          ? "必选章节未齐"
          : "Missing required sections";

  return (
    <div className={`rounded-md border p-3 text-xs ${tone}`} aria-live="polite">
      <p className="font-medium">
        {label} · {zh ? "字数" : "Words"}: {report.wordCount}
      </p>
      {report.missingRequired.length > 0 ? (
        <p className="mt-1">
          {zh ? "缺必选: " : "Missing required: "}
          {report.missingRequired.join(", ")}
        </p>
      ) : null}
      {report.level !== "excellent" && report.missingRecommended.length > 0 ? (
        <p className="mt-1 opacity-80">
          {zh ? "缺推荐: " : "Missing recommended: "}
          {report.missingRecommended.join(", ")}
        </p>
      ) : null}
    </div>
  );
}
