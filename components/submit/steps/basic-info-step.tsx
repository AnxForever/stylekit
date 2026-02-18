"use client";

import { AlertCircle, X } from "lucide-react";
import type { StyleCategory, StyleType, StyleTag } from "@/lib/styles/meta";

interface BasicInfoStepProps {
  formData: {
    name: string;
    nameEn: string;
    slug: string;
    description: string;
    category: StyleCategory;
    styleType: StyleType;
    tags: StyleTag[];
    keywords: string[];
    philosophy: string;
  };
  updateField: (field: string, value: unknown) => void;
  getVisibleError: (field: string, step: number) => string;
  markTouched: (field: string) => void;
  isAnimating: boolean;
  text: {
    hint: string;
    extractorUrlLabel: string;
    extractorUrlHint: string;
    extractorUrlPlaceholder: string;
    extractorUrlAction: string;
    extractorUrlLoading: string;
    extractorTitle: string;
    extractorDescription: string;
    extractorPlaceholder: string;
    extractorApply: string;
    fields: {
      styleNameLocal: string;
      styleNameEnglish: string;
      slug: string;
      slugHint: string;
      shortDescription: string;
      category: string;
      type: string;
      tags: string;
      keywords: string;
      designPhilosophy: string;
    };
    placeholders: {
      styleNameLocal: string;
      styleNameEnglish: string;
      slug: string;
      shortDescription: string;
      keywords: string;
      designPhilosophy: string;
    };
    add: string;
    categoryLabels: Record<StyleCategory, string>;
    typeLabels: Record<StyleType, string>;
    tagLabels: Record<StyleTag, string>;
  };
  manifestCopy: {
    title: string;
    description: string;
    placeholder: string;
    apply: string;
    upload: string;
  };
  manifestInput: string;
  setManifestInput: (input: string) => void;
  manifestMessage: { type: "success" | "error"; text: string } | null;
  setManifestMessage: (msg: { type: "success" | "error"; text: string } | null) => void;
  applyManifestInput: () => void;
  importManifestFile: (file: File) => Promise<void>;
  extractUrl: string;
  setExtractUrl: (url: string) => void;
  isExtractingUrl: boolean;
  extractFromUrl: () => void;
  extractInput: string;
  setExtractInput: (input: string) => void;
  extractMessage: { type: "success" | "error"; text: string } | null;
  setExtractMessage: (msg: { type: "success" | "error"; text: string } | null) => void;
  applyExtractedDraft: () => void;
  handleNameEnChange: (value: string) => void;
  handleSlugChange: (value: string) => void;
  keywordInput: string;
  setKeywordInput: (input: string) => void;
  addKeyword: () => void;
  removeKeyword: (keyword: string) => void;
  toggleTag: (tag: StyleTag) => void;
}

const categoryOptions: StyleCategory[] = ["modern", "minimal", "expressive", "retro"];
const typeOptions: StyleType[] = ["visual", "layout", "animation"];
const tagOptions: StyleTag[] = ["modern", "minimal", "expressive", "retro", "high-contrast", "responsive", "brand-inspired"];

export function BasicInfoStep({
  formData,
  updateField,
  getVisibleError,
  markTouched,
  isAnimating,
  text,
  manifestCopy,
  manifestInput,
  setManifestInput,
  manifestMessage,
  setManifestMessage,
  applyManifestInput,
  importManifestFile,
  extractUrl,
  setExtractUrl,
  isExtractingUrl,
  extractFromUrl,
  extractInput,
  setExtractInput,
  extractMessage,
  setExtractMessage,
  applyExtractedDraft,
  handleNameEnChange,
  handleSlugChange,
  keywordInput,
  setKeywordInput,
  addKeyword,
  removeKeyword,
  toggleTag,
}: BasicInfoStepProps) {
  return (
    <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      <div className="p-4 border border-border bg-zinc-50 dark:bg-zinc-900">
        <p className="text-sm text-muted">{text.hint}</p>
      </div>

      <div className="p-4 border border-border bg-background">
        <label className="block text-sm font-medium mb-2">{manifestCopy.title}</label>
        <p className="text-xs text-muted mb-3">{manifestCopy.description}</p>
        <textarea
          value={manifestInput}
          onChange={(e) => {
            setManifestInput(e.target.value);
            if (manifestMessage) setManifestMessage(null);
          }}
          placeholder={manifestCopy.placeholder}
          rows={5}
          className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors resize-y focus:border-foreground font-mono text-xs"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={applyManifestInput}
            disabled={!manifestInput.trim()}
            className="inline-flex items-center justify-center px-4 py-2 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {manifestCopy.apply}
          </button>
          <label className="inline-flex items-center justify-center px-4 py-2 border border-border hover:border-foreground transition-colors text-sm cursor-pointer">
            {manifestCopy.upload}
            <input
              type="file"
              accept=".json,application/json"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  void importManifestFile(file);
                }
                e.currentTarget.value = "";
              }}
            />
          </label>
          {manifestMessage && (
            <p className={`text-xs ${manifestMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
              {manifestMessage.text}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 border border-border bg-background">
        <label className="block text-sm font-medium mb-2">{text.extractorUrlLabel}</label>
        <p className="text-xs text-muted mb-3">{text.extractorUrlHint}</p>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="url"
            value={extractUrl}
            onChange={(e) => setExtractUrl(e.target.value)}
            placeholder={text.extractorUrlPlaceholder}
            className="flex-1 px-4 py-2 border border-border bg-background outline-none transition-colors focus:border-foreground text-sm"
          />
          <button
            type="button"
            onClick={extractFromUrl}
            disabled={!extractUrl.trim() || isExtractingUrl}
            className="inline-flex items-center justify-center px-4 py-2 border border-border hover:border-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm whitespace-nowrap"
          >
            {isExtractingUrl ? text.extractorUrlLoading : text.extractorUrlAction}
          </button>
        </div>

        <div className="border-t border-border pt-4">
          <label className="block text-sm font-medium mb-2">{text.extractorTitle}</label>
          <p className="text-xs text-muted mb-3">{text.extractorDescription}</p>
          <textarea
            value={extractInput}
            onChange={(e) => {
              setExtractInput(e.target.value);
              if (extractMessage) setExtractMessage(null);
            }}
            placeholder={text.extractorPlaceholder}
            rows={6}
            className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors resize-y focus:border-foreground font-mono text-xs"
          />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={applyExtractedDraft}
              disabled={!extractInput.trim() || isExtractingUrl}
              className="inline-flex items-center justify-center px-4 py-2 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {text.extractorApply}
            </button>
            {extractMessage && (
              <p className={`text-xs ${extractMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {extractMessage.text}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm mb-2">
            {text.fields.styleNameLocal} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => markTouched("name")}
            placeholder={text.placeholders.styleNameLocal}
            className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">
            {text.fields.styleNameEnglish} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.nameEn}
            onChange={(e) => handleNameEnChange(e.target.value)}
            onBlur={() => markTouched("name")}
            placeholder={text.placeholders.styleNameEnglish}
            className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground"
          />
        </div>
      </div>
      {getVisibleError("name", 1) && (
        <p className="text-xs text-red-500 flex items-center gap-1 -mt-4">
          <AlertCircle className="w-3 h-3" />
          {getVisibleError("name", 1)}
        </p>
      )}

      <div>
        <label className="block text-sm mb-2">{text.fields.slug}</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          onBlur={() => markTouched("slug")}
          placeholder={text.placeholders.slug}
          className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors focus:border-foreground font-mono text-sm"
        />
        <p className="text-xs text-muted mt-1">{text.fields.slugHint}</p>
        {getVisibleError("slug", 1) && (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" />
            {getVisibleError("slug", 1)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.shortDescription}</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder={text.placeholders.shortDescription}
          rows={3}
          className="w-full px-4 py-3 border border-border bg-background outline-none transition-colors resize-none focus:border-foreground"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.designPhilosophy}</label>
        <textarea
          value={formData.philosophy}
          onChange={(e) => updateField("philosophy", e.target.value)}
          placeholder={text.placeholders.designPhilosophy}
          rows={4}
          className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block text-sm mb-2">{text.fields.category}</label>
          <select
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
          >
            {categoryOptions.map((value) => (
              <option key={value} value={value}>{text.categoryLabels[value]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-2">{text.fields.type}</label>
          <select
            value={formData.styleType}
            onChange={(e) => updateField("styleType", e.target.value)}
            className="w-full px-4 py-3 border border-border bg-background focus:border-foreground outline-none transition-colors"
          >
            {typeOptions.map((value) => (
              <option key={value} value={value}>{text.typeLabels[value]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.tags}</label>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((tagValue) => (
            <button
              key={tagValue}
              type="button"
              onClick={() => toggleTag(tagValue)}
              className={`px-3 py-1.5 text-sm border transition-colors ${
                formData.tags.includes(tagValue)
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {text.tagLabels[tagValue]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm mb-2">{text.fields.keywords}</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
            placeholder={text.placeholders.keywords}
            className="flex-1 px-4 py-2 border border-border bg-background focus:border-foreground outline-none transition-colors"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 border border-border hover:border-foreground transition-colors"
          >
            {text.add}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-sm"
            >
              {keyword}
              <button type="button" onClick={() => removeKeyword(keyword)} className="text-muted hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
