"use client";

import { useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Layers } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { hasStyleTokens } from "@/lib/styles/tokens-registry";
import {
  blendTokens,
  getBlendDimensions,
  type BlendConfig,
  type BlendDimension,
} from "@/lib/styles/blend-engine";
import { DimensionPicker } from "./dimension-picker";
import { BlendPreview } from "./blend-preview";
import { BlendExport } from "./blend-export";

function getFirstVisualSlug(): string {
  const visual = getAllStylesMeta().find(
    (s) => s.styleType === "visual" && hasStyleTokens(s.slug)
  );
  return visual?.slug ?? "neo-brutalist";
}

export function BlendContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useI18n();

  const defaultSlug = useMemo(() => {
    return searchParams.get("base") ?? getFirstVisualSlug();
  }, [searchParams]);

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

  const syncUrl = useCallback(
    (newConfig: BlendConfig) => {
      const params = new URLSearchParams();
      const dims = getBlendDimensions();
      for (const dim of dims) {
        params.set(dim.key, newConfig[dim.key]);
      }
      router.replace(`/blend?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const updateDimension = useCallback(
    (dimension: BlendDimension, slug: string) => {
      setConfig((prev) => {
        const next = { ...prev, [dimension]: slug };
        syncUrl(next);
        return next;
      });
    },
    [syncUrl]
  );

  const blendedTokens = useMemo(() => blendTokens(config), [config]);

  const dimensions = getBlendDimensions();

  // Check if all dimensions use the same style
  const allSame = useMemo(() => {
    const values = Object.values(config);
    return values.every((v) => v === values[0]);
  }, [config]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Dimension pickers */}
        <div className="space-y-6">
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

          {/* Blend status */}
          <div className="text-xs text-muted px-1">
            {allSame
              ? t("blend.singleStyle")
              : t("blend.mixedStyles")}
          </div>

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
