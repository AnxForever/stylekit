"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import type { GateReport } from "@/lib/submission/types";
import { COPY, type SubmitLocale } from "./_copy";
import {
  EMPTY_STYLE_FORM,
  StyleForm,
  findMissingFields,
  manifestToForm,
  toManifest,
  type StyleFormValue,
} from "./_style-form";

const DRAFT_KEY = "stylekit:submit:manifest-draft";
const FORM_DRAFT_KEY = "stylekit:submit:form-draft";

function normalizedManifestSnapshot(value: unknown): string | null {
  if (value === null || value === undefined) return null;

  const normalize = (item: unknown): unknown => {
    if (Array.isArray(item)) return item.map(normalize);
    if (typeof item !== "object" || item === null) return item;
    return Object.fromEntries(
      Object.entries(item as Record<string, unknown>)
        .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
        .map(([key, nested]) => [key, normalize(nested)]),
    );
  };

  try {
    return JSON.stringify(normalize(value)) ?? null;
  } catch {
    return null;
  }
}

// A machine cannot judge these from computed styles; the extractor flags them
// so the form can ask the contributor to confirm.
const REVIEW_LABELS: Record<string, { en: string; zh: string }> = {
  name: { en: "name", zh: "名称" },
  category: { en: "category", zh: "分类" },
  description: { en: "description", zh: "描述" },
  colors: { en: "colors", zh: "配色" },
  typography: { en: "typography (limited samples)", zh: "字体（采样不足）" },
  fonts: { en: "fonts (some use fallbacks)", zh: "字体（部分使用备用字体）" },
  components: { en: "components (no samples found)", zh: "组件（未找到样例）" },
};

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
  const [checkedManifestSnapshot, setCheckedManifestSnapshot] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null);
  const [extractUrl, setExtractUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [reviewFields, setReviewFields] = useState<string[]>([]);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [beforeExtraction, setBeforeExtraction] = useState<StyleFormValue | null>(null);
  const restoredRef = useRef(false);
  const draftRevisionRef = useRef(0);
  const gateRequestIdRef = useRef(0);
  const activeGateControllerRef = useRef<AbortController | null>(null);
  const checkedManifestSnapshotRef = useRef<string | null>(null);
  const submitInFlightRef = useRef(false);

  const invalidateGate = useCallback(() => {
    gateRequestIdRef.current += 1;
    activeGateControllerRef.current?.abort();
    activeGateControllerRef.current = null;
    checkedManifestSnapshotRef.current = null;
    setCheckedManifestSnapshot(null);
    setPhase((current) => current === "checking" || current === "checked" ? "idle" : current);
  }, []);

  const handleFormChange = useCallback((next: StyleFormValue) => {
    draftRevisionRef.current += 1;
    invalidateGate();
    setForm(next);
  }, [invalidateGate]);

  const handleManifestChange = useCallback((next: string) => {
    draftRevisionRef.current += 1;
    invalidateGate();
    setManifestText(next);
  }, [invalidateGate]);

  const handleModeChange = useCallback((next: "form" | "manifest") => {
    if (next === mode) return;
    draftRevisionRef.current += 1;
    invalidateGate();
    setReport(null);
    setError(null);
    setPhase("idle");
    setMode(next);
  }, [invalidateGate, mode]);

  useEffect(() => () => {
    gateRequestIdRef.current += 1;
    activeGateControllerRef.current?.abort();
  }, []);

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

  const currentManifestSnapshot = useMemo(() => {
    if (mode === "form") return normalizedManifestSnapshot(toManifest(form));
    try {
      return normalizedManifestSnapshot(JSON.parse(manifestText));
    } catch {
      return null;
    }
  }, [form, manifestText, mode]);
  const reportIsCurrent =
    report !== null &&
    checkedManifestSnapshot !== null &&
    checkedManifestSnapshot === currentManifestSnapshot;

  const runCheck = useCallback(async () => {
    const requestId = ++gateRequestIdRef.current;
    const capturedDraftRevision = draftRevisionRef.current;
    activeGateControllerRef.current?.abort();
    activeGateControllerRef.current = null;
    checkedManifestSnapshotRef.current = null;
    setCheckedManifestSnapshot(null);
    setReport(null);
    setError(null);
    if (mode === "form") {
      const missing = findMissingFields(form, locale);
      if (missing.length > 0) {
        setError(`${t.formMissing} ${missing.join(locale === "zh" ? "、" : ", ")}`);
        setPhase("idle");
        return;
      }
    }
    const manifest = parseManifest();
    if (manifest === null) {
      setPhase("idle");
      return;
    }

    const manifestSnapshot = normalizedManifestSnapshot(manifest);
    if (manifestSnapshot === null) return;
    const controller = new AbortController();
    activeGateControllerRef.current = controller;
    setPhase("checking");
    try {
      const response = await fetch("/api/submit/validate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ manifest }),
        signal: controller.signal,
      });
      const payload = await response.json();
      if (
        requestId !== gateRequestIdRef.current ||
        controller.signal.aborted ||
        draftRevisionRef.current !== capturedDraftRevision
      ) return;
      if (!response.ok || !payload.success) {
        setError(payload.error ?? t.checkFailed);
        setPhase("idle");
        return;
      }
      setReport(payload.report as GateReport);
      checkedManifestSnapshotRef.current = manifestSnapshot;
      setCheckedManifestSnapshot(manifestSnapshot);
      setPhase("checked");
    } catch {
      if (
        requestId !== gateRequestIdRef.current ||
        controller.signal.aborted ||
        draftRevisionRef.current !== capturedDraftRevision
      ) return;
      setError(t.checkFailed);
      setPhase("idle");
    } finally {
      if (activeGateControllerRef.current === controller) {
        activeGateControllerRef.current = null;
      }
    }
  }, [mode, form, locale, t.formMissing, parseManifest, t.checkFailed]);

  const submit = useCallback(async () => {
    if (submitInFlightRef.current || !accepted || !signedIn || extracting) return;
    setError(null);
    const manifest = parseManifest();
    if (manifest === null) return;

    const manifestSnapshot = normalizedManifestSnapshot(manifest);
    if (
      manifestSnapshot === null ||
      !report?.accepted ||
      checkedManifestSnapshotRef.current !== manifestSnapshot ||
      checkedManifestSnapshot !== manifestSnapshot ||
      currentManifestSnapshot !== manifestSnapshot
    ) {
      setError(t.checkAgain);
      return;
    }

    submitInFlightRef.current = true;
    const submitMode = mode;
    const submitDraftRevision = draftRevisionRef.current;
    setPhase("submitting");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ manifest, acceptedTerms: true }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        const submittedInputIsCurrent =
          draftRevisionRef.current === submitDraftRevision &&
          mode === submitMode &&
          currentManifestSnapshot === manifestSnapshot;
        if (payload.report && submittedInputIsCurrent) {
          setReport(payload.report as GateReport);
          checkedManifestSnapshotRef.current = manifestSnapshot;
          setCheckedManifestSnapshot(manifestSnapshot);
        }
        if (!submittedInputIsCurrent) {
          setReport(null);
          checkedManifestSnapshotRef.current = null;
          setCheckedManifestSnapshot(null);
        }
        setError(payload.error ?? t.submitFailed);
        setPhase(submittedInputIsCurrent ? "checked" : "idle");
        return;
      }
      setSubmittedSlug(payload.submission?.slug ?? null);
      setPhase("submitted");
      setManifestText("");
      setForm(EMPTY_STYLE_FORM);
      setBeforeExtraction(null);
      setReviewFields([]);
      setExtractError(null);
      try {
        window.localStorage.removeItem(DRAFT_KEY);
        window.localStorage.removeItem(FORM_DRAFT_KEY);
      } catch {
        // best-effort cleanup
      }
      gateRequestIdRef.current += 1;
      checkedManifestSnapshotRef.current = null;
      setCheckedManifestSnapshot(null);
      setReport(null);
      setPhase("submitted");
    } catch {
      setError(t.submitFailed);
      setPhase("checked");
    } finally {
      submitInFlightRef.current = false;
    }
  }, [accepted, checkedManifestSnapshot, currentManifestSnapshot, extracting, mode, parseManifest, report?.accepted, signedIn, t.checkAgain, t.submitFailed]);

  const onDrop = useCallback((event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    draftRevisionRef.current += 1;
    invalidateGate();
    void file.text().then(handleManifestChange).catch(() => setError(t.fileReadFailed));
  }, [handleManifestChange, invalidateGate, t.fileReadFailed]);

  const copyPrompt = useCallback(() => {
    void navigator.clipboard.writeText(masterPrompt).then(() => {
      setPromptCopied(true);
      window.setTimeout(() => setPromptCopied(false), 2000);
    });
  }, [masterPrompt]);

  // Prefill the form from a live URL. The heavy lifting is a guarded service;
  // here we just swap the returned manifest into the form and surface which
  // fields the contributor still needs to confirm.
  const extractFromUrl = useCallback(async () => {
    const url = extractUrl.trim();
    if (!url || extracting || phase === "checking" || phase === "submitting") return;
    if (!signedIn) {
      setExtractError(t.extractSignIn);
      return;
    }
    setExtracting(true);
    setExtractError(null);
    setError(null);
    try {
      const response = await fetch("/api/submit/extract", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success || !payload.manifest?.formData) {
        const message = response.status === 401 ? t.extractSignIn
          : response.status === 429 ? t.extractLimited
          : response.status === 503 ? t.extractUnavailable
          : response.status === 504 ? t.extractTimeout
          : t.extractFailed;
        setExtractError(message);
        return;
      }
      setBeforeExtraction(form);
      handleFormChange(manifestToForm(payload.manifest.formData as Record<string, unknown>, payload.manifest));
      setReviewFields(Array.isArray(payload.needsReview)
        ? payload.needsReview.filter((field: unknown): field is string => typeof field === "string")
        : []);
      setReport(null);
      setPhase("idle");
    } catch {
      setExtractError(t.extractFailed);
    } finally {
      setExtracting(false);
    }
  }, [extractUrl, extracting, form, handleFormChange, phase, signedIn, t]);

  if (phase === "submitted") {
    return (
      <SubmittedNotice
        locale={locale}
        slug={submittedSlug}
        onAgain={() => setPhase("idle")}
      />
    );
  }

  const canSubmit = Boolean(report?.accepted) && reportIsCurrent && accepted && signedIn && !extracting;

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
            disabled={extracting || phase === "submitting"}
            onClick={() => handleModeChange(option)}
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
          <div className="mb-6 rounded-md border border-border p-4">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t.extractTitle}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t.extractHint}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                type="url"
                inputMode="url"
                value={extractUrl}
                disabled={extracting || phase === "checking" || phase === "submitting"}
                onChange={(event) => setExtractUrl(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    void extractFromUrl();
                  }
                }}
                placeholder={t.extractPlaceholder}
                aria-label={t.extractTitle}
                className="min-w-0 flex-1 rounded-md border border-border bg-transparent px-3 py-2 font-mono text-xs focus:border-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={extractFromUrl}
                disabled={!extractUrl.trim() || extracting || phase === "checking" || phase === "submitting"}
                className="shrink-0 border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
              >
                {extracting ? t.extracting : t.extractButton}
              </button>
            </div>
            {extracting ? (
              <p role="status" className="mt-3 text-xs text-muted-foreground">{t.extractProgress}</p>
            ) : null}
            {extractError ? (
              <p role="alert" className="mt-3 text-xs text-destructive">{extractError}</p>
            ) : null}
            {reviewFields.length ? (
              <p role="status" className="mt-3 text-xs text-amber-600">
                {t.extractReview(
                  reviewFields.map((f) => REVIEW_LABELS[f]?.[locale] ?? f),
                )}
              </p>
            ) : null}
            {beforeExtraction ? (
              <button
                type="button"
                disabled={extracting || phase === "checking" || phase === "submitting"}
                onClick={() => {
                  handleFormChange(beforeExtraction);
                  setBeforeExtraction(null);
                  setReviewFields([]);
                  setExtractError(null);
                  setReport(null);
                  setPhase("idle");
                }}
                className="mt-3 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-40"
              >
                {t.extractUndo}
              </button>
            ) : null}
          </div>
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
          <fieldset disabled={extracting || phase === "submitting"} className="min-w-0">
            <StyleForm locale={locale} value={form} onChange={handleFormChange} />
          </fieldset>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={runCheck}
              disabled={!form.slug.trim() || phase === "checking" || extracting}
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
              disabled={phase === "submitting"}
              onChange={(event) => handleManifestChange(event.target.value)}
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
                    handleManifestChange("");
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
        {report && reportIsCurrent ? (
          <GateTable report={report} locale={locale} humanizeFields={mode === "form"} />
        ) : report ? (
          <p role="status" className="border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            {t.reportOutdated}
          </p>
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
        {reportIsCurrent && report && !report.accepted ? (
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
        <div className="min-w-0">
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
