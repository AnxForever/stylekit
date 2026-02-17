"use client";

import { useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Layers, Sliders } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { hasStyleTokens } from "@/lib/styles/tokens-registry";
import {
  blendTokens,
  blendTokensWeighted,
  defaultWeights,
  getBlendDimensions,
  type BlendConfig,
  type BlendDimension,
  type BlendWeights,
  type BlendPreset,
} from "@/lib/styles/blend-engine";
import { DimensionPicker } from "./dimension-picker";
import { WeightSliders } from "./weight-slider";
import { BlendPreview } from "./blend-preview";
import { BlendExport } from "./blend-export";
import { BlendPresets } from "./blend-presets";

type BlendMode = "pick" | "interpolate";

function getFirstVisualSlug(): string {
  const visual = getAllStylesMeta().find(
    (s) => s.styleType === "visual" && hasStyleTokens(s.slug)
  );
  return visual?.slug ?? "neo-brutalist";
}

function getSecondVisualSlug(exclude: string): string {
  const visual = getAllStylesMeta().find(
    (s) => s.styleType === "visual" && hasStyleTokens(s.slug) && s.slug !== exclude
  );
  return visual?.slug ?? "glassmorphism";
}

export function BlendContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale, t } = useI18n();

  const mode = (searchParams.get("mode") as BlendMode) ?? "pick";

  const defaultSlug = useMemo(() => {
    return searchParams.get("base") ?? getFirstVisualSlug();
  }, [searchParams]);

  // Dimension-picking state
  const [config, setConfig] = useState<BlendConfig>(() => {
    const dims = getBlendDimensions();
    const initial: BlendConfig = {
      colors: "",
      typography: "",
      spacing: "",
      shadows: "",
      borders: "",
      interaction: "",
    };
    for (const dim of dims) {
      initial[dim.key] = searchParams.get(dim.key) ?? defaultSlug;
    }
    return initial;
  });

  // Weighted interpolation state
  const [styleA, setStyleA] = useState(() => searchParams.get("a") ?? defaultSlug);
  const [styleB, setStyleB] = useState(() =>
    searchParams.get("b") ?? getSecondVisualSlug(defaultSlug)
  );
  const [weights, setWeights] = useState<BlendWeights>(() => {
    const w = defaultWeights();
    const dims = getBlendDimensions();
    for (const dim of dims) {
      const param = searchParams.get(`w_${dim.key}`);
      if (param) w[dim.key] = Number(param);
    }
    return w;
  });

  // All styles with tokens
  const allStyles = useMemo(() => {
    return getAllStylesMeta()
      .filter((s) => s.styleType === "visual" && hasStyleTokens(s.slug))
      .sort((a, b) => {
        const nameA = locale === "zh" ? a.name : a.nameEn;
        const nameB = locale === "zh" ? b.name : b.nameEn;
        return nameA.localeCompare(nameB);
      });
  }, [locale]);

  const getStyleName = useCallback(
    (slug: string) => {
      const s = allStyles.find((st) => st.slug === slug);
      return s ? (locale === "zh" ? s.name : s.nameEn) : slug;
    },
    [allStyles, locale]
  );

  // URL sync for pick mode
  const syncPickUrl = useCallback(
    (newConfig: BlendConfig) => {
      const params = new URLSearchParams();
      params.set("mode", "pick");
      const dims = getBlendDimensions();
      for (const dim of dims) {
        params.set(dim.key, newConfig[dim.key]);
      }
      router.replace(`/blend?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  // URL sync for interpolate mode
  const syncInterpUrl = useCallback(
    (a: string, b: string, w: BlendWeights) => {
      const params = new URLSearchParams();
      params.set("mode", "interpolate");
      params.set("a", a);
      params.set("b", b);
      const dims = getBlendDimensions();
      for (const dim of dims) {
        if (w[dim.key] !== 50) {
          params.set(`w_${dim.key}`, String(w[dim.key]));
        }
      }
      router.replace(`/blend?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const updateDimension = useCallback(
    (dimension: BlendDimension, slug: string) => {
      setConfig((prev) => {
        const next = { ...prev, [dimension]: slug };
        syncPickUrl(next);
        return next;
      });
    },
    [syncPickUrl]
  );

  const updateWeight = useCallback(
    (dimension: BlendDimension, value: number) => {
      setWeights((prev) => {
        const next = { ...prev, [dimension]: value };
        syncInterpUrl(styleA, styleB, next);
        return next;
      });
    },
    [styleA, styleB, syncInterpUrl]
  );

  const switchMode = useCallback(
    (newMode: BlendMode) => {
      if (newMode === "pick") {
        syncPickUrl(config);
      } else {
        syncInterpUrl(styleA, styleB, weights);
      }
    },
    [config, styleA, styleB, weights, syncPickUrl, syncInterpUrl]
  );

  const applyPreset = useCallback(
    (preset: BlendPreset) => {
      if (preset.mode === "pick" && preset.config) {
        setConfig(preset.config);
        syncPickUrl(preset.config);
        if (mode !== "pick") switchMode("pick");
      } else if (preset.mode === "interpolate" && preset.styleA && preset.styleB) {
        const w = { ...defaultWeights(), ...preset.weights };
        setStyleA(preset.styleA);
        setStyleB(preset.styleB);
        setWeights(w);
        syncInterpUrl(preset.styleA, preset.styleB, w);
        if (mode !== "interpolate") switchMode("interpolate");
      }
    },
    [mode, switchMode, syncPickUrl, syncInterpUrl]
  );

  // Compute blended tokens based on current mode
  const blendedTokens = useMemo(() => {
    if (mode === "interpolate") {
      return blendTokensWeighted({ styleA, styleB, weights });
    }
    return blendTokens(config);
  }, [mode, config, styleA, styleB, weights]);

  const dimensions = getBlendDimensions();

  const allSame = useMemo(() => {
    const values = Object.values(config);
    return values.every((v) => v === values[0]);
  }, [config]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
      {/* Mode toggle */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => switchMode("pick")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            mode === "pick"
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground border border-border"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {t("blend.modePick")}
        </button>
        <button
          onClick={() => switchMode("interpolate")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            mode === "interpolate"
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground border border-border"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          {t("blend.modeInterpolate")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Controls */}
        <div className="space-y-6">
          {mode === "pick" ? (
            <>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-muted/5 border-b border-border text-sm font-medium flex items-center gap-2">
                  <Layers className="w-4 h-4 text-muted" />
                  {t("blend.dimensionsTitle")}
                </div>
                <div className="px-4">
                  {dimensions.map((dim) => (
                    <DimensionPicker
                      key={dim.key}
                      dimension={dim.key}
                      value={config[dim.key]}
                      onChange={(slug) => updateDimension(dim.key, slug)}
                    />
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted px-1">
                {allSame ? t("blend.singleStyle") : t("blend.mixedStyles")}
              </div>
            </>
          ) : (
            <>
              {/* Style A/B selectors */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-2 bg-muted/5 border-b border-border text-sm font-medium flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-muted" />
                  {t("blend.interpolateTitle")}
                </div>
                <div className="px-4 py-3 space-y-3">
                  {/* Style A */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-foreground w-6">A</span>
                    <select
                      value={styleA}
                      onChange={(e) => {
                        setStyleA(e.target.value);
                        syncInterpUrl(e.target.value, styleB, weights);
                      }}
                      className="flex-1 appearance-none bg-muted/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground cursor-pointer hover:bg-muted/20 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    >
                      {allStyles.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {locale === "zh" ? s.name : s.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Style B */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-foreground w-6">B</span>
                    <select
                      value={styleB}
                      onChange={(e) => {
                        setStyleB(e.target.value);
                        syncInterpUrl(styleA, e.target.value, weights);
                      }}
                      className="flex-1 appearance-none bg-muted/10 border border-border rounded-lg px-3 py-2 text-sm text-foreground cursor-pointer hover:bg-muted/20 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    >
                      {allStyles.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {locale === "zh" ? s.name : s.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Weight sliders */}
                <div className="px-4 border-t border-border">
                  <WeightSliders
                    weights={weights}
                    styleAName={getStyleName(styleA)}
                    styleBName={getStyleName(styleB)}
                    onWeightChange={updateWeight}
                    onResetAll={() => {
                      const w = defaultWeights();
                      setWeights(w);
                      syncInterpUrl(styleA, styleB, w);
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Presets */}
          <BlendPresets onSelect={applyPreset} />

          {/* Export */}
          {blendedTokens && <BlendExport tokens={blendedTokens} />}
        </div>

        {/* Right: Preview */}
        <div className="space-y-6">
          {blendedTokens ? (
            <BlendPreview tokens={blendedTokens} />
          ) : (
            <div className="text-center py-16 space-y-4 border border-border rounded-lg">
              <Layers className="w-12 h-12 text-muted/30 mx-auto" />
              <p className="text-muted text-sm">{t("blend.noPreview")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
