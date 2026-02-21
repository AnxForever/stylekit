"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { hasStyleTokens } from "@/lib/styles/tokens-registry";
import type { GeneratedStyle } from "@/lib/ai-generator";

export interface StyleGenerationResponse extends GeneratedStyle {
  candidates?: GeneratedStyle[];
  meta?: {
    variationCount: number;
    creativity: number;
    seed: number;
  };
}

interface StyleGenFormProps {
  onGenerate: (result: StyleGenerationResponse) => void;
}

interface StyleCatalogResponse {
  catalogVersion: string;
  availableStyles: string[];
  moodKeywords: string[];
}

type CatalogSource = "network" | "cache" | "fallback";
type CatalogFallbackReason =
  | "network-error"
  | "invalid-payload"
  | "unexpected-status"
  | "not-modified-without-cache";

const STYLE_CATALOG_CACHE_KEY = "stylekit-ai-gen-catalog-v1";
const STYLE_CATALOG_ETAG_KEY = "stylekit-ai-gen-catalog-etag-v1";

const EXAMPLE_PROMPTS = [
  "Like Apple but warmer and more playful",
  "Professional and clean with a modern edge",
  "Dark, futuristic, neon accents",
  "Futuristic but less neon and not brutalist",
  "Soft, organic, natural feeling",
  "Bold brutalist with colorful accents",
  "Elegant luxury with art deco touches",
  "Japanese anime style, cute and vibrant",
  "Retro vintage with warm colors",
];

function isStyleCatalogResponse(value: unknown): value is StyleCatalogResponse {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.catalogVersion === "string" &&
    Array.isArray(obj.availableStyles) &&
    obj.availableStyles.every((item) => typeof item === "string") &&
    Array.isArray(obj.moodKeywords) &&
    obj.moodKeywords.every((item) => typeof item === "string")
  );
}

function readCachedCatalog(): { catalog: StyleCatalogResponse | null; etag: string | null } {
  try {
    const rawCatalog = localStorage.getItem(STYLE_CATALOG_CACHE_KEY);
    const rawEtag = localStorage.getItem(STYLE_CATALOG_ETAG_KEY);
    if (!rawCatalog) {
      return { catalog: null, etag: rawEtag };
    }
    const parsed: unknown = JSON.parse(rawCatalog);
    if (!isStyleCatalogResponse(parsed)) {
      return { catalog: null, etag: rawEtag };
    }
    return { catalog: parsed, etag: rawEtag };
  } catch {
    return { catalog: null, etag: null };
  }
}

function writeCachedCatalog(catalog: StyleCatalogResponse, etag: string | null): void {
  try {
    localStorage.setItem(STYLE_CATALOG_CACHE_KEY, JSON.stringify(catalog));
    if (etag) {
      localStorage.setItem(STYLE_CATALOG_ETAG_KEY, etag);
    } else {
      localStorage.removeItem(STYLE_CATALOG_ETAG_KEY);
    }
  } catch {
    // Ignore storage quota/private mode errors.
  }
}

function hasKeyword(description: string, keyword: string): boolean {
  const normalizedDescription = description.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase();
  return normalizedDescription.split(/[\s,;.!?]+/).includes(normalizedKeyword);
}

export function StyleGenForm({ onGenerate }: StyleGenFormProps) {
  const { t } = useI18n();
  const [description, setDescription] = useState("");
  const [baseStyle, setBaseStyle] = useState("");
  const [variationCount, setVariationCount] = useState(3);
  const [creativity, setCreativity] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<StyleCatalogResponse | null>(null);
  const [catalogSource, setCatalogSource] = useState<CatalogSource | null>(null);
  const reportedFallbacksRef = useRef<Set<string>>(new Set());

  const baseVisualStyles = useMemo(
    () =>
      getAllStylesMeta().filter(
        (s) => s.styleType === "visual" && hasStyleTokens(s.slug)
      ),
    []
  );

  const visualStyles = useMemo(() => {
    if (!catalog || catalog.availableStyles.length === 0) {
      return baseVisualStyles;
    }
    const allowedSlugs = new Set(catalog.availableStyles);
    return baseVisualStyles.filter((style) => allowedSlugs.has(style.slug));
  }, [baseVisualStyles, catalog]);

  const moodKeywords = useMemo(
    () => (catalog?.moodKeywords ?? []).slice(0, 16),
    [catalog]
  );
  const catalogSourceText = useMemo(() => {
    if (catalogSource === "network") return t("aiGen.catalogSourceNetwork");
    if (catalogSource === "cache") return t("aiGen.catalogSourceCache");
    if (catalogSource === "fallback") return t("aiGen.catalogSourceFallback");
    return null;
  }, [catalogSource, t]);

  useEffect(() => {
    let cancelled = false;

    const reportCatalogFallback = (
      reason: CatalogFallbackReason,
      httpStatus?: number
    ) => {
      const key = httpStatus ? `${reason}:${httpStatus}` : reason;
      if (reportedFallbacksRef.current.has(key)) {
        return;
      }
      reportedFallbacksRef.current.add(key);

      const payload = {
        reason,
        ...(typeof httpStatus === "number" ? { httpStatus } : {}),
      };

      void fetch("/api/generate-style/report-fallback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Ignore telemetry delivery failures.
      });
    };

    const bootstrap = async () => {
      const { catalog: cachedCatalog, etag } = readCachedCatalog();
      const applyFallback = (
        reason: CatalogFallbackReason,
        httpStatus?: number
      ) => {
        if (cachedCatalog) return;
        setCatalogSource("fallback");
        reportCatalogFallback(reason, httpStatus);
      };

      if (!cancelled && cachedCatalog) {
        setCatalog(cachedCatalog);
        setCatalogSource("cache");
      }

      try {
        const res = await fetch("/api/generate-style", {
          method: "GET",
          headers: etag ? { "If-None-Match": etag } : undefined,
          cache: "no-store",
        });

        if (cancelled) return;
        if (res.status === 304) {
          applyFallback("not-modified-without-cache", 304);
          return;
        }
        if (!res.ok) {
          applyFallback("unexpected-status", res.status);
          return;
        }

        const payload: unknown = await res.json();
        if (!isStyleCatalogResponse(payload)) {
          applyFallback("invalid-payload", res.status);
          return;
        }

        setCatalog(payload);
        setCatalogSource("network");
        writeCachedCatalog(payload, res.headers.get("etag"));
      } catch {
        applyFallback("network-error");
        // Keep using local fallback when discovery request fails.
      }
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

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
          variationCount,
          creativity: creativity / 100,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const payload: unknown = await res.json();
      if (!payload || typeof payload !== "object") {
        throw new Error("Generation response is invalid");
      }

      const result = payload as StyleGenerationResponse;
      const candidates =
        Array.isArray(result.candidates) && result.candidates.length > 0
          ? result.candidates
          : [result];
      onGenerate({
        ...result,
        candidates,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  function handleExampleClick(prompt: string) {
    setDescription(prompt);
  }

  function handleKeywordClick(keyword: string) {
    setDescription((prev) => {
      if (!prev.trim()) return keyword;
      if (hasKeyword(prev, keyword)) return prev;
      return `${prev.trim()}, ${keyword}`;
    });
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

      {/* Mood Keywords */}
      {moodKeywords.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted uppercase tracking-wide">
              {t("aiGen.keywordChips")}
            </p>
            {catalog?.catalogVersion && (
              <span className="text-[11px] text-muted">
                {t("aiGen.catalogVersion")}: {catalog.catalogVersion}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {moodKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => handleKeywordClick(keyword)}
                className="text-xs px-3 py-1.5 border border-border rounded-full hover:bg-foreground/5 transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}

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
        {catalogSourceText && (
          <p className="text-xs text-muted">
            {t("aiGen.catalogSource")}: {catalogSourceText}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="variation-count" className="block text-sm font-medium">
          {t("aiGen.variationCountLabel")}
        </label>
        <select
          id="variation-count"
          value={variationCount}
          onChange={(event) => setVariationCount(Number(event.target.value))}
          className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        >
          {[1, 2, 3, 4].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted">
          {t("aiGen.variationCountHint")}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="creativity-level" className="block text-sm font-medium">
            {t("aiGen.creativityLabel")}
          </label>
          <span className="text-xs text-muted">
            {creativity}%
          </span>
        </div>
        <input
          id="creativity-level"
          type="range"
          min={0}
          max={100}
          step={5}
          value={creativity}
          onChange={(event) => setCreativity(Number(event.target.value))}
          className="w-full accent-foreground"
        />
        <p className="text-xs text-muted">
          {t("aiGen.creativityHint")}
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
