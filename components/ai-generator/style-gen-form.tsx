"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { hasStyleTokens } from "@/lib/styles/tokens-registry";
import type { GeneratedStyle } from "@/lib/ai-generator";

interface StyleGenFormProps {
  onGenerate: (result: GeneratedStyle) => void;
}

const EXAMPLE_PROMPTS = [
  "Like Apple but warmer and more playful",
  "Professional and clean with a modern edge",
  "Dark, futuristic, neon accents",
  "Soft, organic, natural feeling",
  "Bold brutalist with colorful accents",
  "Elegant luxury with art deco touches",
  "Japanese anime style, cute and vibrant",
  "Retro vintage with warm colors",
];

export function StyleGenForm({ onGenerate }: StyleGenFormProps) {
  const { t } = useI18n();
  const [description, setDescription] = useState("");
  const [baseStyle, setBaseStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visualStyles = getAllStylesMeta().filter(
    (s) => s.styleType === "visual" && hasStyleTokens(s.slug)
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: description.trim(),
          baseStyle: baseStyle || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const result: GeneratedStyle = await res.json();
      onGenerate(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  function handleExampleClick(prompt: string) {
    setDescription(prompt);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Description Input */}
      <div className="space-y-2">
        <label
          htmlFor="style-description"
          className="block text-sm font-medium"
        >
          {t("aiGen.descriptionLabel")}
        </label>
        <textarea
          id="style-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("aiGen.descriptionPlaceholder")}
          rows={3}
          maxLength={500}
          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted text-sm resize-none focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
        <p className="text-xs text-muted">
          {description.length}/500
        </p>
      </div>

      {/* Example prompts */}
      <div className="space-y-2">
        <p className="text-xs text-muted uppercase tracking-wide">
          {t("aiGen.examples")}
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleExampleClick(prompt)}
              className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-foreground/5 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Base Style Selector */}
      <div className="space-y-2">
        <label htmlFor="base-style" className="block text-sm font-medium">
          {t("aiGen.baseStyleLabel")}
        </label>
        <select
          id="base-style"
          value={baseStyle}
          onChange={(e) => setBaseStyle(e.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        >
          <option value="">{t("aiGen.baseStyleNone")}</option>
          {visualStyles.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.nameEn} ({s.name})
            </option>
          ))}
        </select>
        <p className="text-xs text-muted">
          {t("aiGen.baseStyleHint")}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !description.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("aiGen.generating")}
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {t("aiGen.generate")}
          </>
        )}
      </button>
    </form>
  );
}
