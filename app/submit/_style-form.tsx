"use client";

import { useState } from "react";
import { COPY, type SubmitLocale } from "./_copy";

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
  buttonCode: "",
  coverSvg: "",
};

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
  const rules = value.rules
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

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
      ...(value.buttonCode.trim() ? { buttonCode: value.buttonCode.trim() } : {}),
    },
    ...(value.coverSvg.trim()
      ? { assets: { coverSvg: value.coverSvg.trim() } }
      : {}),
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
  const set = <K extends keyof StyleFormValue>(key: K, next: StyleFormValue[K]) =>
    onChange({ ...value, [key]: next });

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
            onChange={(event) => set("nameEn", event.target.value)}
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
          onChange={(event) => set("slug", event.target.value)}
          placeholder="nordic-minimal"
        />
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
        <Field label={t.fieldCategory}>
          <select
            className={inputClass}
            value={value.category}
            onChange={(event) => set("category", event.target.value)}
          >
            {CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {CATEGORY_LABELS[option][locale]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.fieldStyleType}>
          <select
            className={inputClass}
            value={value.styleType}
            onChange={(event) => set("styleType", event.target.value)}
          >
            {STYLE_TYPES.map((option) => (
              <option key={option} value={option}>
                {TYPE_LABELS[option][locale]}
              </option>
            ))}
          </select>
        </Field>
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

      <Field label={t.fieldRules} hint={t.rulesHint}>
        <textarea
          className={`${inputClass} resize-none font-mono text-xs leading-relaxed`}
          rows={6}
          value={value.rules}
          onChange={(event) => set("rules", event.target.value)}
          placeholder={t.rulesPlaceholder}
        />
      </Field>

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
    </div>
  );
}
