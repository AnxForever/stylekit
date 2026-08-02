"use client";

import { useMemo, useState } from "react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import { useKit } from "@/lib/kit/context";
import type { KitItem, KitItemType } from "@/lib/kit/types";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import { animationsMeta } from "@/lib/animations/meta";
import { fontPairings } from "@/lib/typography";
import { getGradientById } from "@/lib/gradients";
import { getShadowById } from "@/lib/shadows";
import { getBackgroundById } from "@/lib/backgrounds";
import { buildKitHints } from "@/lib/kit/hints";
import { encodeKitToSearch } from "@/lib/kit/share";
import { KitCombinationPreview } from "@/components/kit/kit-combination-preview";
import { KitSwitcher } from "@/components/kit/kit-switcher";

interface ResolvedRow {
  item: KitItem;
  name: string;
  secondaryName: string;
  href: string;
  detail: string;
}

const SECTION_ORDER: KitItemType[] = [
  "style",
  "animation",
  "font-pairing",
  "gradient",
  "shadow",
  "background",
];

const SECTION_LABELS: Record<KitItemType, { zh: string; en: string }> = {
  style: { zh: "设计风格", en: "Styles" },
  animation: { zh: "动效", en: "Animations" },
  "font-pairing": { zh: "字体配对", en: "Font Pairings" },
  gradient: { zh: "渐变", en: "Gradients" },
  shadow: { zh: "阴影", en: "Shadows" },
  background: { zh: "背景纹理", en: "Backgrounds" },
};

const BROWSE_LINKS: { type: KitItemType; href: string; zh: string; en: string }[] = [
  { type: "style", href: "/styles", zh: "浏览风格库", en: "Browse styles" },
  { type: "animation", href: "/animations", zh: "浏览动效库", en: "Browse animations" },
  { type: "font-pairing", href: "/resources?tab=typography", zh: "浏览字体配对", en: "Browse font pairings" },
  { type: "gradient", href: "/resources?tab=gradients", zh: "浏览渐变库", en: "Browse gradients" },
  { type: "shadow", href: "/resources?tab=shadows", zh: "浏览阴影库", en: "Browse shadows" },
  { type: "background", href: "/resources?tab=backgrounds", zh: "浏览背景纹理", en: "Browse backgrounds" },
];

function resolveRow(item: KitItem, locale: string): ResolvedRow {
  if (item.type === "style") {
    const meta = getStyleMetaBySlug(item.slug);
    return {
      item,
      name: (locale === "zh" ? meta?.name : meta?.nameEn || meta?.name) ?? item.slug,
      secondaryName: (locale === "zh" ? meta?.nameEn : meta?.name) ?? "",
      href: `/styles/${item.slug}`,
      detail: meta?.category ?? "",
    };
  }
  if (item.type === "animation") {
    const meta = animationsMeta.find((a) => a.slug === item.slug);
    return {
      item,
      name: (locale === "zh" ? meta?.name : meta?.nameEn) ?? item.slug,
      secondaryName: (locale === "zh" ? meta?.nameEn : meta?.name) ?? "",
      href: `/animations/${item.slug}`,
      detail: meta ? `${meta.category} · ${meta.duration}` : "",
    };
  }
  if (item.type === "font-pairing") {
    const pairing = fontPairings.find((p) => p.id === item.slug);
    return {
      item,
      name: (locale === "zh" ? pairing?.nameZh : pairing?.name) ?? item.slug,
      secondaryName: (locale === "zh" ? pairing?.name : pairing?.nameZh) ?? "",
      href: "/resources?tab=typography",
      detail: pairing ? `${pairing.heading.family} · ${pairing.body.family}` : "",
    };
  }
  if (item.type === "gradient") {
    const gradient = getGradientById(item.slug);
    return {
      item,
      name: (locale === "zh" ? gradient?.nameZh : gradient?.name) ?? item.slug,
      secondaryName: "",
      href: "/resources?tab=gradients",
      detail: gradient?.category ?? "",
    };
  }
  if (item.type === "shadow") {
    const shadow = getShadowById(item.slug);
    return {
      item,
      name: (locale === "zh" ? shadow?.nameZh : shadow?.name) ?? item.slug,
      secondaryName: "",
      href: "/resources?tab=shadows",
      detail: shadow?.category ?? "",
    };
  }
  const background = getBackgroundById(item.slug);
  return {
    item,
    name: (locale === "zh" ? background?.nameZh : background?.name) ?? item.slug,
    secondaryName: "",
    href: "/resources?tab=backgrounds",
    detail: background?.category ?? "",
  };
}

export function KitContent() {
  const { locale } = useI18n();
  const { items, count, removeItem, updateNote, makePrimary, clearKit } = useKit();
  const [exporting, setExporting] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const zh = locale === "zh";

  const sections = useMemo(() => {
    return SECTION_ORDER.map((type) => ({
      type,
      rows: items.filter((item) => item.type === type).map((item) => resolveRow(item, locale)),
    })).filter((section) => section.rows.length > 0);
  }, [items, locale]);

  const preview = useMemo(() => {
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
    return {
      styles,
      animations,
      fontPairing: pairings[0] ?? null,
      hints: buildKitHints({
        styleCount: styles.length,
        fontPairingCount: pairings.length,
        animations,
      }),
    };
  }, [items]);

  const handleExport = async () => {
    if (count === 0 || exporting) return;
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

  const handleCopyPrompt = async () => {
    if (count === 0) return;
    const { buildKitFiles } = await import("@/lib/kit/export");
    const prompt = buildKitFiles(items).find((file) => file.path === "AI_PROMPT.md");
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt.content);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  const handleCopyShareLink = async () => {
    if (count === 0) return;
    const path = locale === "zh" ? "/zh/kit/shared" : "/en/kit/shared";
    const url = `${window.location.origin}${path}?${encodeKitToSearch(items)}`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    clearKit();
    setConfirmClear(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-14">
      <header className="mb-8 border-b border-border pb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
          Kit Builder
        </p>
        <h1 className="text-2xl md:text-3xl mb-2">{zh ? "我的工具箱" : "My Kit"}</h1>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          {zh
            ? "在全站收集风格、动效与字体配对，最后一键导出为一套连贯的设计包：合成 AI 提示词、设计规范、design tokens 与可用代码。"
            : "Collect styles, animations and font pairings across the site, then export them as one coherent design kit: a merged AI prompt, design spec, tokens and ready-to-use code."}
        </p>
      </header>

      <KitSwitcher />

      {count === 0 ? (
        <div className="border border-dashed border-border px-6 py-14 text-center">
          <p className="text-sm text-muted mb-6">
            {zh
              ? "工具箱还是空的。去卡片上点「+ Kit」按钮，把中意的素材收进来。"
              : "Your kit is empty. Hit the \"+ Kit\" button on any card to start collecting."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BROWSE_LINKS.map((link) => (
              <LocalizedLink
                key={link.href}
                href={link.href}
                className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:border-foreground hover:text-foreground transition-colors"
              >
                {zh ? link.zh : link.en}
              </LocalizedLink>
            ))}
          </div>
        </div>
      ) : (
        <>
          <KitCombinationPreview
            styles={preview.styles}
            animations={preview.animations}
            fontPairing={preview.fontPairing}
            hints={preview.hints}
            onMakePrimary={(slug) => makePrimary("style", slug)}
          />

          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="border border-foreground bg-foreground text-background px-4 py-2 text-xs uppercase tracking-[0.14em] transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {exporting
                ? zh
                  ? "打包中…"
                  : "Packing…"
                : zh
                  ? "导出设计包 (ZIP)"
                  : "Export Design Kit (ZIP)"}
            </button>
            <button
              type="button"
              onClick={handleCopyPrompt}
              className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:border-foreground hover:text-foreground transition-colors"
            >
              {promptCopied
                ? zh
                  ? "已复制"
                  : "Copied"
                : zh
                  ? "复制合成提示词"
                  : "Copy merged prompt"}
            </button>
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:border-foreground hover:text-foreground transition-colors"
            >
              {linkCopied ? (zh ? "链接已复制" : "Link copied") : zh ? "分享这套搭配" : "Share this kit"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="ml-auto border border-border px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:border-red-500 hover:text-red-500 transition-colors"
            >
              {confirmClear ? (zh ? "再点一次确认清空" : "Click again to confirm") : zh ? "清空" : "Clear"}
            </button>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.type}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
                  {zh ? SECTION_LABELS[section.type].zh : SECTION_LABELS[section.type].en}
                  <span className="ml-2 tabular-nums">({section.rows.length})</span>
                </h2>
                <ul className="border-t border-border">
                  {section.rows.map((row) => (
                    <li
                      key={`${row.item.type}:${row.item.slug}`}
                      className="border-b border-border py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <LocalizedLink
                          href={row.href}
                          className="text-sm hover:text-accent transition-colors"
                        >
                          {row.name}
                          {row.secondaryName && (
                            <span className="ml-2 text-xs text-muted">{row.secondaryName}</span>
                          )}
                        </LocalizedLink>
                        {row.detail && (
                          <p className="font-mono text-[10px] uppercase tracking-wide text-muted mt-0.5">
                            {row.detail}
                          </p>
                        )}
                      </div>
                      <input
                        type="text"
                        value={row.item.note ?? ""}
                        onChange={(e) => updateNote(row.item.type, row.item.slug, e.target.value)}
                        placeholder={zh ? "备注，如：用在 hero 区" : "Note, e.g. use on hero"}
                        className="w-full sm:w-56 bg-transparent border border-border px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted/60 focus:border-foreground focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(row.item.type, row.item.slug)}
                        aria-label={zh ? `移除 ${row.name}` : `Remove ${row.name}`}
                        className="self-start sm:self-auto text-xs uppercase tracking-[0.14em] text-muted hover:text-red-500 transition-colors"
                      >
                        {zh ? "移除" : "Remove"}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-10 border border-border bg-muted/10 px-5 py-4 text-xs text-muted leading-relaxed">
            {zh ? (
              <>
                导出的 ZIP 包含：<span className="text-foreground">AI_PROMPT.md</span>
                （多素材合成的单份提示词，直接投喂 Cursor / v0）、
                <span className="text-foreground">DESIGN_SPEC.md</span>（统一设计规范）、design
                tokens、Tailwind 预设、动效代码与字体引入片段。
                {sections.some((s) => s.type === "style" && s.rows.length > 1) &&
                  " 你选了多个风格：提示词会以第一个为主风格、其余作点缀合成。"}
              </>
            ) : (
              <>
                The exported ZIP contains <span className="text-foreground">AI_PROMPT.md</span> (one
                merged prompt for Cursor / v0),{" "}
                <span className="text-foreground">DESIGN_SPEC.md</span>, design tokens, Tailwind
                presets, animation code and font loading snippets.
                {sections.some((s) => s.type === "style" && s.rows.length > 1) &&
                  " You picked multiple styles: the first acts as the base, the rest blend in as accents."}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
