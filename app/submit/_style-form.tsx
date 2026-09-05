"use client";

import { useMemo, useRef, useState } from "react";
import { COPY, type SubmitLocale } from "./_copy";
import { buildPromptPair, type PromptPairInput } from "@/lib/styles/prompt-pair";

/**
 * Prompt-first submission form.
 *
 * Exists because the manifest paste flow asked a contributor to hand-author 34
 * required fields before StyleKit would look at their work. What a style
 * actually needs to be useful is its identity, its palette, and the rules an
 * assistant follows; everything else now has a sensible default. This form
 * collects exactly that, and hands the same manifest shape to the same API, so
 * both routes share one validator and one gate set.
 */

const CATEGORIES = ["modern", "retro", "minimal", "expressive"] as const;
const STYLE_TYPES = ["visual", "layout"] as const;

const CATEGORY_LABELS: Record<string, { en: string; zh: string }> = {
  modern: { en: "Modern", zh: "现代" },
  retro: { en: "Retro", zh: "复古" },
  minimal: { en: "Minimal", zh: "极简" },
  expressive: { en: "Expressive", zh: "张扬" },
};

const TYPE_LABELS: Record<string, { en: string; zh: string }> = {
  visual: { en: "Visual style", zh: "视觉风格" },
  layout: { en: "Layout pattern", zh: "布局范式" },
};

export interface StyleFormValue {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  category: string;
  styleType: string;
  primaryColor: string;
  secondaryColor: string;
  background: string;
  foreground: string;
  rules: string;
  doList: string;
  dontList: string;
  keywords: string;
  buttonCode: string;
  coverSvg: string;
}

export const EMPTY_STYLE_FORM: StyleFormValue = {
  name: "",
  nameEn: "",
  slug: "",
  description: "",
  category: "modern",
  styleType: "visual",
  primaryColor: "#1d4ed8",
  secondaryColor: "#ffffff",
  background: "#ffffff",
  foreground: "#0f172a",
  rules: "",
  doList: "",
  dontList: "",
  keywords: "",
  buttonCode: "",
  coverSvg: "",
};

/** One trimmed entry per non-empty line — the do/dont lists and rules share this. */
function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Keywords are short; accept commas (both scripts) or newlines as separators. */
function splitKeywords(value: string): string[] {
  return value
    .split(/[\n,\uff0c]/)
    .map((word) => word.trim())
    .filter(Boolean);
}

/**
 * Fields the form itself insists on, in the reader's own vocabulary.
 *
 * The gates report schema failures by field path ("formData.nameEn: ..."),
 * which is precise for a hand-written manifest and meaningless to someone
 * filling in a labelled form. Checking here lets the form point at what the
 * person actually sees.
 */
export function findMissingFields(
  value: StyleFormValue,
  locale: SubmitLocale,
): string[] {
  const labels = {
    en: {
      name: "an English name",
      slug: "a URL slug",
      description: "a description",
      rules: "at least three AI rules",
    },
    zh: {
      name: "英文名",
      slug: "URL 标识",
      description: "描述",
      rules: "至少三条 AI 规则",
    },
  }[locale];

  const missing: string[] = [];
  if (!value.nameEn.trim() && !value.name.trim()) missing.push(labels.name);
  if (!value.slug.trim()) missing.push(labels.slug);
  if (!value.description.trim()) missing.push(labels.description);
  if (value.rules.split("\n").filter((line) => line.trim()).length < 3) {
    missing.push(labels.rules);
  }
  return missing;
}

/** Turn the form into the manifest shape the API and gates already understand. */
export function toManifest(value: StyleFormValue) {
  const rules = splitLines(value.rules);
  const doList = splitLines(value.doList);
  const dontList = splitLines(value.dontList);
  const keywords = splitKeywords(value.keywords);

  return {
    formData: {
      name: value.name.trim() || value.nameEn.trim(),
      nameEn: value.nameEn.trim() || value.name.trim(),
      slug: value.slug.trim().toLowerCase(),
      description: value.description.trim(),
      category: value.category,
      styleType: value.styleType,
      primaryColor: value.primaryColor,
      secondaryColor: value.secondaryColor,
      background: value.background,
      foreground: value.foreground,
      aiRules: rules,
      // Optional in the reduced contract; omitted when empty so the manifest
      // stays clean and the schema fills in its `[]` default.
      ...(doList.length ? { doList } : {}),
      ...(dontList.length ? { dontList } : {}),
      ...(keywords.length ? { keywords } : {}),
      ...(value.buttonCode.trim() ? { buttonCode: value.buttonCode.trim() } : {}),
    },
    ...(value.coverSvg.trim()
      ? { assets: { coverSvg: value.coverSvg.trim() } }
      : {}),
  };
}

/**
 * Build the prompt-builder input from the form, mirroring the community path in
 * `mapSubmissionToStyle`: the authored rules become `aiRules`, and everything a
 * curated style would carry (localized rules, a token spec, do/dont lists) is
 * absent — a form submission has none of it. Keeping this in lockstep with the
 * runtime mapper is what makes the preview equal to what ships on the live page.
 */
export function formToPromptInput(
  value: StyleFormValue,
  locale: SubmitLocale
): PromptPairInput {
  const name = value.name.trim() || value.nameEn.trim() || value.slug.trim();
  const nameEn = value.nameEn.trim() || value.name.trim() || value.slug.trim();
  const aiRules = splitLines(value.rules).join("\n");

  return {
    styleName: locale === "zh" ? name : nameEn,
    styleSlug: value.slug.trim().toLowerCase(),
    aiRules,
    aiRulesEn: undefined,
    enhancedRules: null,
    // A single-language submission fills the base lists; the preview then
    // shows real Prefer/Avoid/Style-Signal sections instead of "(none)".
    doList: splitLines(value.doList),
    dontList: splitLines(value.dontList),
    keywords: splitKeywords(value.keywords),
  };
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:border-foreground focus:outline-none";

/**
 * Segmented choice instead of a native <select>.
 *
 * Both taxonomies here are tiny — four categories, two types — so a dropdown
 * costs two interactions and hides the options behind the first one. Laying
 * them out flat makes the whole vocabulary visible and selectable in a single
 * click, and sidesteps the unstylable native control entirely.
 */
function Segmented({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onSelect: (next: string) => void;
}) {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(option.value)}
              className={`h-9 rounded-md border px-3.5 text-xs font-medium transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** "Nordic Calm" -> "nordic-calm". */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type SlugStatus =
  | "idle"
  | "checking"
  | "available"
  | "curated"
  | "pending"
  | "invalid";

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function PromptPreview({
  locale,
  value,
}: {
  locale: SubmitLocale;
  value: StyleFormValue;
}) {
  const t = COPY[locale];
  const [kind, setKind] = useState<"hard" | "soft">("hard");
  const [copied, setCopied] = useState(false);

  // A name and at least one rule are the two inputs the prompt is built from;
  // below that there is nothing meaningful to render.
  const hasEnough =
    (value.nameEn.trim() || value.name.trim()).length > 0 &&
    value.rules.split("\n").some((line) => line.trim());

  const prompt = useMemo(() => {
    if (!hasEnough) return "";
    const pair = buildPromptPair(formToPromptInput(value, locale), locale);
    return kind === "hard" ? pair.hardPrompt : pair.softPrompt;
  }, [hasEnough, value, locale, kind]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be blocked; the text stays selectable in the panel.
    }
  };

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {t.previewTitle}
        </span>
        {hasEnough ? (
          <span className="font-mono text-xs text-muted-foreground">
            {t.previewChars(prompt.length)}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{t.previewNote}</p>

      {hasEnough ? (
        <>
          <div className="mt-3 flex items-center gap-2">
            {(["hard", "soft"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setKind(option)}
                aria-pressed={kind === option}
                className={`h-7 rounded-md border px-3 text-xs transition-colors ${
                  kind === option
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {option === "hard" ? t.previewHard : t.previewSoft}
              </button>
            ))}
            <button
              type="button"
              onClick={copy}
              className="ml-auto h-7 rounded-md border border-border px-3 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {copied ? t.previewCopied : t.previewCopy}
            </button>
          </div>
          <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-background p-3 font-mono text-xs leading-relaxed text-foreground">
            {prompt}
          </pre>
        </>
      ) : (
        <p className="mt-3 rounded-md border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
          {t.previewEmpty}
        </p>
      )}
    </div>
  );
}

export function StyleForm({
  locale,
  value,
  onChange,
}: {
  locale: SubmitLocale;
  value: StyleFormValue;
  onChange: (next: StyleFormValue) => void;
}) {
  const t = COPY[locale];
  const [showOptional, setShowOptional] = useState(false);
  // Availability is a hint, not a gate: the dry run and the write both re-check
  // the slug server-side, so this only saves a round trip of surprise.
  const [slugStatus, setSlugStatus] = useState<SlugStatus>("idle");
  const slugSeq = useRef(0);
  // Once someone edits the slug by hand it stops tracking the name, so a
  // deliberate URL is never overwritten by a later title tweak.
  const [slugTouched, setSlugTouched] = useState(false);
  const set = <K extends keyof StyleFormValue>(key: K, next: StyleFormValue[K]) =>
    onChange({ ...value, [key]: next });

  const setNameEn = (next: string) =>
    onChange({
      ...value,
      nameEn: next,
      ...(slugTouched ? {} : { slug: slugify(next) }),
    });

  const checkSlug = async () => {
    const slug = value.slug.trim().toLowerCase();
    if (!slug) {
      setSlugStatus("idle");
      return;
    }
    if (!SLUG_RE.test(slug)) {
      setSlugStatus("invalid");
      return;
    }
    // A monotonic sequence guards against a slower earlier lookup landing after
    // a faster later one and overwriting the current answer.
    const seq = ++slugSeq.current;
    setSlugStatus("checking");
    try {
      const response = await fetch(
        `/api/submit/slug-available?slug=${encodeURIComponent(slug)}`
      );
      const data = await response.json();
      if (seq !== slugSeq.current) return;
      setSlugStatus((data.reason as SlugStatus) ?? (data.available ? "available" : "pending"));
    } catch {
      // A network hiccup should not nag; the dry run still catches a clash.
      if (seq !== slugSeq.current) return;
      setSlugStatus("idle");
    }
  };

  const ruleCount = value.rules.split("\n").filter((line) => line.trim()).length;

  const colorFields: [keyof StyleFormValue, string][] = [
    ["primaryColor", t.colorPrimary],
    ["secondaryColor", t.colorSecondary],
    ["background", t.colorBackground],
    ["foreground", t.colorForeground],
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-muted-foreground">{t.formIntro}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.fieldNameEn}>
          <input
            className={inputClass}
            value={value.nameEn}
            onChange={(event) => setNameEn(event.target.value)}
            placeholder="Nordic Minimal"
          />
        </Field>
        <Field label={t.fieldName}>
          <input
            className={inputClass}
            value={value.name}
            onChange={(event) => set("name", event.target.value)}
            placeholder="北欧极简"
          />
        </Field>
      </div>

      <Field label={t.fieldSlug} hint={t.slugHint}>
        <input
          className={`${inputClass} font-mono`}
          value={value.slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlugStatus("idle");
            set("slug", event.target.value);
          }}
          onBlur={checkSlug}
          placeholder="nordic-minimal"
        />
        {slugStatus !== "idle" ? (
          <span
            className={`mt-1 block text-xs ${
              slugStatus === "available"
                ? "text-emerald-600"
                : slugStatus === "checking"
                  ? "text-muted-foreground"
                  : slugStatus === "invalid"
                    ? "text-amber-600"
                    : "text-destructive"
            }`}
          >
            {slugStatus === "checking"
              ? t.slugChecking
              : slugStatus === "available"
                ? t.slugAvailable
                : slugStatus === "curated"
                  ? t.slugCurated
                  : slugStatus === "pending"
                    ? t.slugPending
                    : t.slugInvalid}
          </span>
        ) : null}
      </Field>

      <Field label={t.fieldDescription} hint={t.descriptionHint}>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={value.description}
          onChange={(event) => set("description", event.target.value)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Segmented
          label={t.fieldCategory}
          value={value.category}
          onSelect={(next) => set("category", next)}
          options={CATEGORIES.map((option) => ({
            value: option,
            label: CATEGORY_LABELS[option][locale],
          }))}
        />
        <Segmented
          label={t.fieldStyleType}
          value={value.styleType}
          onSelect={(next) => set("styleType", next)}
          options={STYLE_TYPES.map((option) => ({
            value: option,
            label: TYPE_LABELS[option][locale],
          }))}
        />
      </div>

      <div>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {t.fieldColors}
        </span>
        <div className="mt-2 grid gap-3 sm:grid-cols-4">
          {colorFields.map(([key, label]) => (
            <label key={key} className="block">
              <span className="text-xs text-muted-foreground">{label}</span>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={value[key] as string}
                  onChange={(event) => set(key, event.target.value as never)}
                  className="h-9 w-9 shrink-0 cursor-pointer rounded border border-border bg-transparent"
                  aria-label={label}
                />
                <input
                  className="w-full rounded-md border border-border bg-transparent px-2 py-1.5 font-mono text-xs focus:border-foreground focus:outline-none"
                  value={value[key] as string}
                  onChange={(event) => set(key, event.target.value as never)}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {t.fieldRules}
          </span>
          {/* Live count because three is the threshold the gates enforce; a
              contributor should see they are short before running the check. */}
          <span
            className={`font-mono text-xs ${
              ruleCount >= 3 ? "text-muted-foreground" : "text-amber-600"
            }`}
          >
            {t.rulesCount(ruleCount)}
          </span>
        </div>
        <textarea
          className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
          rows={6}
          value={value.rules}
          onChange={(event) => set("rules", event.target.value)}
          placeholder={t.rulesPlaceholder}
        />
        <span className="mt-1 block text-xs text-muted-foreground">
          {t.rulesHint}
        </span>
      </div>

      <div className="border-t border-border pt-5">
        <button
          type="button"
          onClick={() => setShowOptional((open) => !open)}
          className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {showOptional ? "−" : "+"} {t.optionalSection}
        </button>

        {showOptional ? (
          <div className="mt-4 space-y-5">
            <p className="text-xs text-muted-foreground">{t.optionalHint}</p>
            <Field label={t.fieldKeywords} hint={t.keywordsHint}>
              <input
                className={inputClass}
                value={value.keywords}
                onChange={(event) => set("keywords", event.target.value)}
                placeholder={t.keywordsPlaceholder}
              />
            </Field>
            <Field label={t.fieldDoList} hint={t.doListHint}>
              <textarea
                className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
                rows={3}
                value={value.doList}
                onChange={(event) => set("doList", event.target.value)}
                placeholder={t.doListPlaceholder}
              />
            </Field>
            <Field label={t.fieldDontList} hint={t.dontListHint}>
              <textarea
                className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
                rows={3}
                value={value.dontList}
                onChange={(event) => set("dontList", event.target.value)}
                placeholder={t.dontListPlaceholder}
              />
            </Field>
            <Field label={t.fieldButtonCode}>
              <textarea
                className={`${inputClass} resize-none font-mono text-xs`}
                rows={3}
                value={value.buttonCode}
                onChange={(event) => set("buttonCode", event.target.value)}
                placeholder='<button className="px-4 py-2">Action</button>'
              />
            </Field>
            <Field label={t.fieldCoverSvg}>
              <textarea
                className={`${inputClass} resize-none font-mono text-xs`}
                rows={3}
                value={value.coverSvg}
                onChange={(event) => set("coverSvg", event.target.value)}
                placeholder="<svg viewBox='0 0 100 60'>...</svg>"
              />
            </Field>
          </div>
        ) : null}
      </div>

      <PromptPreview locale={locale} value={value} />
    </div>
  );
}
