"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import type { GateReport } from "@/lib/submission/types";
import { COPY, type SubmitLocale } from "./_copy";
import {
  EMPTY_STYLE_FORM,
  StyleForm,
  findMissingFields,
  toManifest,
  type StyleFormValue,
} from "./_style-form";

const DRAFT_KEY = "stylekit:submit:manifest-draft";
const FORM_DRAFT_KEY = "stylekit:submit:form-draft";

interface SubmitConsoleProps {
  locale: SubmitLocale;
  signedIn: boolean;
  masterPrompt: string;
  checklist: string[];
}

type Phase = "idle" | "checking" | "checked" | "submitting" | "submitted";

export function SubmitConsole({
  locale,
  signedIn,
  masterPrompt,
  checklist,
}: SubmitConsoleProps) {
  const t = COPY[locale];
  // The form is the default route; the manifest paste stays available for
  // contributors who already generated one with an assistant.
  const [mode, setMode] = useState<"form" | "manifest">("form");
  const [form, setForm] = useState<StyleFormValue>(EMPTY_STYLE_FORM);
  const [manifestText, setManifestText] = useState("");
  const [report, setReport] = useState<GateReport | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null);
  const restoredRef = useRef(false);

  // Restore an unsent draft once. A manifest is expensive to regenerate, so
  // losing one to an accidental navigation is worse than a stale textarea.
  // Deliberately not a lazy useState initializer: localStorage is unreadable
  // during SSR, so seeding from it there would hydrate against a mismatch.
  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const savedManifest = window.localStorage.getItem(DRAFT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only draft recovery
      if (savedManifest) setManifestText(savedManifest);

      const savedForm = window.localStorage.getItem(FORM_DRAFT_KEY);
      if (savedForm) {
        const parsed = JSON.parse(savedForm) as Partial<StyleFormValue>;
        // Merge onto the empty shape so a draft saved before a field existed
        // (or a hand-edited one) never leaves a controlled input undefined.
        setForm({ ...EMPTY_STYLE_FORM, ...parsed });
      }
    } catch {
      // Private browsing throws on localStorage, and a corrupt draft is not
      // worth surfacing. Nothing to recover.
    }
  }, []);

  useEffect(() => {
    try {
      if (manifestText.trim()) window.localStorage.setItem(DRAFT_KEY, manifestText);
      else window.localStorage.removeItem(DRAFT_KEY);
    } catch {
      // Ignore: the draft is a convenience, not a requirement.
    }
  }, [manifestText]);

  // Persist the form draft too. The form is the default mode, and losing a
  // half-filled form to a refresh or a sign-in round-trip is the single most
  // discouraging thing that can happen to someone trying to contribute.
  useEffect(() => {
    try {
      const touched =
        form.name.trim() ||
        form.nameEn.trim() ||
        form.description.trim() ||
        form.rules.trim();
      if (touched) window.localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(form));
      else window.localStorage.removeItem(FORM_DRAFT_KEY);
    } catch {
      // Ignore: the draft is a convenience, not a requirement.
    }
  }, [form]);

  // Both modes produce the same manifest shape, so everything downstream —
  // the dry run, the gate report, the submit call — stays mode-agnostic.
  const parseManifest = useCallback((): unknown | null => {
    if (mode === "form") {
      return toManifest(form);
    }
    try {
      return JSON.parse(manifestText);
    } catch {
      setError(t.invalidJson);
      return null;
    }
  }, [mode, form, manifestText, t.invalidJson]);

  const runCheck = useCallback(async () => {
    if (mode === "form") {
      const missing = findMissingFields(form, locale);
      if (missing.length > 0) {
        setReport(null);
        setError(`${t.formMissing} ${missing.join(locale === "zh" ? "、" : ", ")}`);
        return;
      }
    }
    setError(null);
    setReport(null);
    const manifest = parseManifest();
    if (manifest === null) return;

    setPhase("checking");
    try {
      const response = await fetch("/api/submit/validate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ manifest }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        setError(payload.error ?? t.checkFailed);
        setPhase("idle");
        return;
      }
      setReport(payload.report as GateReport);
      setPhase("checked");
    } catch {
      setError(t.checkFailed);
      setPhase("idle");
    }
  }, [mode, form, locale, t.formMissing, parseManifest, t.checkFailed]);

  const submit = useCallback(async () => {
    setError(null);
    const manifest = parseManifest();
    if (manifest === null) return;

    setPhase("submitting");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ manifest, acceptedTerms: true }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        if (payload.report) setReport(payload.report as GateReport);
        setError(payload.error ?? t.submitFailed);
        setPhase("checked");
        return;
      }
      setSubmittedSlug(payload.submission?.slug ?? null);
      setPhase("submitted");
      setManifestText("");
      setForm(EMPTY_STYLE_FORM);
      try {
        window.localStorage.removeItem(FORM_DRAFT_KEY);
      } catch {
        // best-effort cleanup
      }
    } catch {
      setError(t.submitFailed);
      setPhase("checked");
    }
  }, [parseManifest, t.submitFailed]);

  const onDrop = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    void file.text().then(setManifestText);
  }, []);

  const copyPrompt = useCallback(() => {
    void navigator.clipboard.writeText(masterPrompt).then(() => {
      setPromptCopied(true);
      window.setTimeout(() => setPromptCopied(false), 2000);
    });
  }, [masterPrompt]);

  if (phase === "submitted") {
    return (
      <SubmittedNotice locale={locale} slug={submittedSlug} onAgain={() => setPhase("idle")} />
    );
  }

  const canSubmit = Boolean(report?.accepted) && accepted && signedIn;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <header className="border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t.intro}
        </p>
      </header>

      <div className="mt-8 flex gap-2" role="tablist" aria-label={t.title}>
        {(["form", "manifest"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={mode === option}
            onClick={() => {
              setMode(option);
              setReport(null);
              setError(null);
              setPhase("idle");
            }}
            className={`h-9 rounded-md border px-4 text-xs font-medium transition-colors ${
              mode === option
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {option === "form" ? t.modeForm : t.modeManifest}
          </button>
        ))}
      </div>

      {mode === "form" ? (
        <Section index="01" title={t.modeForm} description={t.formIntro}>
          {/* The same rules the gates enforce, in a form an assistant can act
              on. Offered here too because filling the form by hand and having
              an assistant draft it are the same job with different tools. */}
          <div className="mb-6 flex flex-wrap items-center gap-3 border border-border p-4">
            <span className="text-sm text-muted-foreground">{t.aiHelpHint}</span>
            <button
              type="button"
              onClick={copyPrompt}
              className="border border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
            >
              {promptCopied ? t.promptCopied : t.copyRules}
            </button>
          </div>
          <StyleForm locale={locale} value={form} onChange={setForm} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={runCheck}
              disabled={!form.slug.trim() || phase === "checking"}
              className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
            >
              {phase === "checking" ? t.checking : t.runCheck}
            </button>
          </div>
        </Section>
      ) : (
        <>
          <Section index="01" title={t.step1Title} description={t.step1Description}>
            <ul className="space-y-2">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 border-b border-border/60 pb-2 text-sm text-muted-foreground"
                >
                  <span className="font-mono text-xs text-muted-foreground/70">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={copyPrompt}
                className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
              >
                {promptCopied ? t.promptCopied : t.copyPrompt}
              </button>
              <span className="text-xs text-muted-foreground">{t.promptHint}</span>
            </div>
          </Section>

          <Section index="02" title={t.step2Title} description={t.step2Description}>
            <textarea
              value={manifestText}
              onChange={(event) => setManifestText(event.target.value)}
              onDrop={onDrop}
              onDragOver={(event) => event.preventDefault()}
              spellCheck={false}
              rows={12}
              placeholder={t.manifestPlaceholder}
              aria-label={t.step2Title}
              className="w-full resize-y border border-border bg-background p-4 font-mono text-xs leading-relaxed outline-none focus:border-foreground"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={runCheck}
                disabled={!manifestText.trim() || phase === "checking"}
                className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
              >
                {phase === "checking" ? t.checking : t.runCheck}
              </button>
              {manifestText.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    setManifestText("");
                    setReport(null);
                    setError(null);
                    setPhase("idle");
                  }}
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground underline-offset-4 hover:underline"
                >
                  {t.clear}
                </button>
              ) : null}
            </div>
          </Section>
        </>
      )}

      {error ? (
        <p
          role="alert"
          className="mt-4 border-l-2 border-destructive pl-3 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <Section index="03" title={t.step3Title} description={t.step3Description}>
        {report ? (
          <GateTable report={report} locale={locale} humanizeFields={mode === "form"} />
        ) : (
          <p className="border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            {t.noReport}
          </p>
        )}
      </Section>

      <Section index="04" title={t.step4Title} description={t.step4Description}>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-foreground"
          />
          <span className="text-muted-foreground">
            {t.termsPrefix}{" "}
            <LocalizedLink href="/terms" className="text-foreground underline underline-offset-4">
              {t.termsLink}
            </LocalizedLink>
            {t.termsSuffix}
          </span>
        </label>

        {!signedIn ? (
          <p className="mt-6 border-l-2 border-border pl-3 text-sm text-muted-foreground">
            {t.signInPrefix}{" "}
            <LocalizedLink href="/login" className="text-foreground underline underline-offset-4">
              {t.signInLink}
            </LocalizedLink>
            {t.signInSuffix}
          </p>
        ) : null}

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit || phase === "submitting"}
          className="mt-6 border border-foreground bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {phase === "submitting" ? t.submitting : t.submit}
        </button>
        {report && !report.accepted ? (
          <p className="mt-3 text-xs text-muted-foreground">{t.blockedHint}</p>
        ) : null}
      </Section>
    </div>
  );
}

function Section({
  index,
  title,
  description,
  children,
}: {
  index: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-border py-10">
      <div className="grid gap-6 md:grid-cols-[7rem_1fr]">
        <div>
          <span className="font-mono text-xs tracking-widest text-muted-foreground/70">
            {index}
          </span>
        </div>
        <div>
          <h2 className="font-serif text-xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Form-field labels for turning schema paths into words a form filler knows. */
const FIELD_LABELS: Record<string, { en: string; zh: string }> = {
  name: { en: "Name", zh: "名称" },
  nameEn: { en: "English name", zh: "英文名" },
  slug: { en: "URL slug", zh: "URL 标识" },
  description: { en: "Description", zh: "描述" },
  category: { en: "Category", zh: "分类" },
  styleType: { en: "Type", zh: "类型" },
  primaryColor: { en: "Primary color", zh: "主色" },
  secondaryColor: { en: "Secondary color", zh: "辅色" },
  background: { en: "Background", zh: "背景" },
  foreground: { en: "Text color", zh: "文字色" },
  accentColors: { en: "Accent colors", zh: "强调色" },
  muted: { en: "Muted color", zh: "中性色" },
  aiRules: { en: "AI rules", zh: "AI 规则" },
  doList: { en: "Do list", zh: "推荐列表" },
  dontList: { en: "Don't list", zh: "禁止列表" },
  keywords: { en: "Keywords", zh: "关键词" },
  tags: { en: "Tags", zh: "标签" },
};

/**
 * Rewrites `formData.<field>` schema paths into the form's own labels.
 *
 * The schema reports failures by manifest path, which is precise for a pasted
 * manifest and opaque to someone filling in a labelled form. Unknown fields are
 * left untouched so no information is lost.
 */
function humanizeGateDetail(detail: string, locale: SubmitLocale): string {
  return detail.replace(
    /formData\.([A-Za-z]+)/g,
    (whole, field: string) => FIELD_LABELS[field]?.[locale] ?? whole,
  );
}

function GateTable({
  report,
  locale,
  humanizeFields = false,
}: {
  report: GateReport;
  locale: SubmitLocale;
  humanizeFields?: boolean;
}) {
  const t = COPY[locale];

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {t.requiredChecks}
        </p>
        <ul className="mt-3 divide-y divide-border border-y border-border">
          {report.gates.map((gate) => (
            <li key={gate.id} className="flex gap-4 py-3">
              <span
                aria-hidden
                className={`mt-0.5 font-mono text-xs ${gate.passed ? "text-foreground" : "text-destructive"}`}
              >
                {gate.passed ? "PASS" : "FAIL"}
              </span>
              <span className="sr-only">{gate.passed ? t.passed : t.failed}</span>
              <div className="min-w-0">
                <p className="text-sm">{gate.label}</p>
                <p
                  className={`mt-1 text-xs leading-relaxed ${gate.passed ? "text-muted-foreground" : "text-destructive"}`}
                >
                  {humanizeFields ? humanizeGateDetail(gate.detail, locale) : gate.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {report.signals.length ? (
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.advisorySignals}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">{t.advisoryNote}</p>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {report.signals.map((signal) => (
              <li key={signal.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3">
                <span className="text-sm">{signal.label}</span>
                <span className="font-mono text-xs text-foreground">{signal.value}</span>
                {signal.comparison ? (
                  <span className="w-full text-xs text-muted-foreground">
                    {signal.comparison}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function SubmittedNotice({
  locale,
  slug,
  onAgain,
}: {
  locale: SubmitLocale;
  slug: string | null;
  onAgain: () => void;
}) {
  const t = COPY[locale];

  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 font-serif text-3xl">{t.doneTitle}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {slug ? `${t.doneBody} (${slug})` : t.doneBody}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <LocalizedLink
          href="/profile"
          className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
        >
          {t.viewSubmissions}
        </LocalizedLink>
        <LocalizedLink
          href="/community"
          className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:border-foreground"
        >
          {t.browseCommunity}
        </LocalizedLink>
        <button
          type="button"
          onClick={onAgain}
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground underline-offset-4 hover:underline"
        >
          {t.submitAnother}
        </button>
      </div>
    </div>
  );
}
