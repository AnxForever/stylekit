"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import { useKit } from "@/lib/kit/context";
import type { KitItem } from "@/lib/kit/types";
import { parseKitFromSearch } from "@/lib/kit/share";
import { buildKitHints } from "@/lib/kit/hints";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { animationsMeta } from "@/lib/animations/meta";
import { fontPairings } from "@/lib/typography";
import { getGradientById } from "@/lib/gradients";
import { getShadowById } from "@/lib/shadows";
import { getBackgroundById } from "@/lib/backgrounds";
import { KitCombinationPreview } from "@/components/kit/kit-combination-preview";

const TYPE_LABELS: Record<KitItem["type"], { zh: string; en: string }> = {
  style: { zh: "设计风格", en: "Styles" },
  animation: { zh: "动效", en: "Animations" },
  "font-pairing": { zh: "字体配对", en: "Font Pairings" },
  gradient: { zh: "渐变", en: "Gradients" },
  shadow: { zh: "阴影", en: "Shadows" },
  background: { zh: "背景纹理", en: "Backgrounds" },
};

const TYPE_HREF: Record<KitItem["type"], (slug: string) => string> = {
  style: (slug) => `/styles/${slug}`,
  animation: (slug) => `/animations/${slug}`,
  "font-pairing": () => "/resources?tab=typography",
  gradient: () => "/resources?tab=gradients",
  shadow: () => "/resources?tab=shadows",
  background: () => "/resources?tab=backgrounds",
};

function resolveName(item: KitItem, zh: boolean): string {
  switch (item.type) {
    case "style": {
      const m = getStyleMetaBySlug(item.slug);
      return (zh ? m?.name : m?.nameEn) ?? item.slug;
    }
    case "animation": {
      const m = animationsMeta.find((a) => a.slug === item.slug);
      return (zh ? m?.name : m?.nameEn) ?? item.slug;
    }
    case "font-pairing":
      return fontPairings.find((p) => p.id === item.slug)?.name ?? item.slug;
    case "gradient": {
      const g = getGradientById(item.slug);
      return (zh ? g?.nameZh : g?.name) ?? item.slug;
    }
    case "shadow": {
      const s = getShadowById(item.slug);
      return (zh ? s?.nameZh : s?.name) ?? item.slug;
    }
    default: {
      const b = getBackgroundById(item.slug);
      return (zh ? b?.nameZh : b?.name) ?? item.slug;
    }
  }
}

export function SharedKitContent() {
  const { locale } = useI18n();
  const searchParams = useSearchParams();
  const { addItem, count } = useKit();
  const [imported, setImported] = useState(false);
  const [exporting, setExporting] = useState(false);
  const zh = locale === "zh";

  const items = useMemo(
    () => parseKitFromSearch(new URLSearchParams(searchParams.toString())),
    [searchParams]
  );

  const resolved = useMemo(() => {
    const styles = items
      .filter((item) => item.type === "style")
      .map((item) => getStyleMetaBySlug(item.slug))
      .filter((style): style is NonNullable<typeof style> => Boolean(style));
    const animations = items
      .filter((item) => item.type === "animation")
      .map((item) => animationsMeta.find((a) => a.slug === item.slug))
      .filter((a): a is NonNullable<typeof a> => Boolean(a));
    const pairings = items
      .filter((item) => item.type === "font-pairing")
      .map((item) => fontPairings.find((p) => p.id === item.slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    return { styles, animations, pairings };
  }, [items]);

  const handleImport = () => {
    for (const item of items) addItem(item.type, item.slug);
    setImported(true);
  };

  const handleExport = async () => {
    if (items.length === 0 || exporting) return;
    setExporting(true);
    try {
      const { buildKitZipBlob } = await import("@/lib/kit/export");
      const blob = await buildKitZipBlob(items);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "stylekit-design-kit.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-14">
      <header className="mb-8 border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
          {zh ? "分享的设计套件" : "Shared Design Kit"}
        </p>
        <h1 className="text-2xl md:text-3xl mb-2">
          {zh ? "有人给你递了一套搭配" : "Someone sent you a combination"}
        </h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          {zh
            ? "这是一套在 StyleKit 组合好的设计方向：风格、动效与字体。可以直接导出，也可以导入自己的工具箱继续调整。"
            : "A design direction composed on StyleKit: styles, motion and type. Export it directly, or import it into your own kit and keep tuning."}
        </p>
      </header>

      {items.length === 0 ? (
        <div className="border border-dashed border-border px-6 py-14 text-center">
          <p className="text-sm text-muted mb-6">
            {zh
              ? "链接无效或不包含任何素材。"
              : "This link is invalid or contains no assets."}
          </p>
          <LocalizedLink
            href="/kit"
            className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:border-foreground hover:text-foreground transition-colors"
          >
            {zh ? "去搭一套自己的" : "Build your own kit"}
          </LocalizedLink>
        </div>
      ) : (
        <>
          <KitCombinationPreview
            styles={resolved.styles}
            animations={resolved.animations}
            fontPairing={resolved.pairings[0] ?? null}
            hints={buildKitHints({
              styleCount: resolved.styles.length,
              fontPairingCount: resolved.pairings.length,
              animations: resolved.animations,
              interactive: false,
            })}
          />

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              type="button"
              onClick={handleImport}
              disabled={imported}
              className="border border-foreground bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.14em] transition-opacity hover:opacity-80 disabled:opacity-60"
            >
              {imported
                ? zh
                  ? "已导入我的工具箱"
                  : "Imported to My Kit"
                : zh
                  ? "导入我的工具箱"
                  : "Import to My Kit"}
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:border-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              {exporting ? (zh ? "打包中…" : "Packing…") : zh ? "直接导出 ZIP" : "Export ZIP"}
            </button>
            {imported && (
              <LocalizedLink
                href="/kit"
                className="px-2 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:text-foreground transition-colors"
              >
                {zh ? `打开工具箱 (${count})` : `Open My Kit (${count})`}
              </LocalizedLink>
            )}
          </div>

          <div className="space-y-8">
            {(["style", "animation", "font-pairing", "gradient", "shadow", "background"] as const).map((type) => {
              const group = items.filter((item) => item.type === type);
              if (group.length === 0) return null;
              return (
                <section key={type}>
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
                    {zh ? TYPE_LABELS[type].zh : TYPE_LABELS[type].en}
                    <span className="ml-2 tabular-nums">({group.length})</span>
                  </h2>
                  <ul className="border-t border-border">
                    {group.map((item) => (
                      <li
                        key={`${item.type}:${item.slug}`}
                        className="border-b border-border py-3 flex items-center justify-between gap-4"
                      >
                        <LocalizedLink
                          href={TYPE_HREF[item.type](item.slug)}
                          className="text-sm hover:text-accent transition-colors"
                        >
                          {resolveName(item, zh)}
                        </LocalizedLink>
                        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                          {item.slug}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
