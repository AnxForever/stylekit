"use client";

import { useState, useMemo, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  fontPairings,
  getTypographyCategories,
  generateGoogleFontsLink,
  fontStack,
  generateFontCSS,
  generateTailwindTheme,
  pairingContrast,
  type FontPairing,
  type TypographyCategory,
} from "@/lib/typography";

// ---------------------------------------------------------------------------
// Teaching-layer fonts — preloaded once so the principle demos render in the
// real faces, not a fallback. Mirrors the card's lazy-load pattern below.
// ---------------------------------------------------------------------------
const DEMO_FONT_URLS = [
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap",
];

function useDemoFonts() {
  useEffect(() => {
    for (const url of DEMO_FONT_URLS) {
      const id = `typography-demo-${url}`;
      if (document.getElementById(id)) continue;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.id = id;
      document.head.appendChild(link);
    }
  }, []);
}

// Module 1 — the three font genes
const FONT_GENES = [
  {
    geneEn: "Serif",
    geneZh: "衬线",
    stack: "'Playfair Display', Georgia, serif",
    weight: 600,
    useZh: "长读正文、编辑、印刷感",
    useEn: "Long-form reading, editorial, print-feel",
    avoidZh: "UI 小字号笔画糊",
    avoidEn: "Muddy at small UI sizes",
  },
  {
    geneEn: "Sans",
    geneZh: "无衬线",
    stack: "'Inter', system-ui, sans-serif",
    weight: 600,
    useZh: "现代 UI、按钮、数据界面",
    useEn: "Modern UI, buttons, data surfaces",
    avoidZh: "超长文易眼疲劳",
    avoidEn: "Tiring for very long reading",
  },
  {
    geneEn: "Mono",
    geneZh: "等宽",
    stack: "'JetBrains Mono', ui-monospace, monospace",
    weight: 500,
    useZh: "代码、表格数字、对齐",
    useEn: "Code, tabular numbers, alignment",
    avoidZh: "正文用很怪",
    avoidEn: "Awkward for body copy",
  },
] as const;

// Module 2 — pairing principles (the "why" behind pairingContrast)
const PAIRING_PRINCIPLES = [
  {
    nameZh: "对比 Contrast",
    nameEn: "Contrast",
    bodyZh: "衬线配无衬线才有层次——两边都衬线，标题压不住正文。",
    bodyEn: "Serif × sans creates hierarchy — two serifs compete instead of leading.",
  },
  {
    nameZh: "x-height 匹配",
    nameEn: "x-height match",
    bodyZh: "字身高度接近才和谐。Playfair（x-height 小）要配大 x-height 的正文。",
    bodyEn: "Match the lowercase height. Playfair (small x-height) needs a taller body face.",
  },
  {
    nameZh: "字重配比",
    nameEn: "Weight match",
    bodyZh: "标题 600–700 / 正文 400，差距拉开层级才清晰。",
    bodyEn: "Heading 600–700, body 400 — open the gap so hierarchy reads.",
  },
] as const;

// Module 4 — loading performance
const LOADING_TIPS = [
  {
    titleZh: "font-display: swap",
    titleEn: "font-display: swap",
    bodyZh: "先渲染系统字体，加载完再换（FOUT）。Google Fonts 的 &display=swap 已默认开启。",
    bodyEn: "Render with the system font first, swap when loaded (FOUT). Google Fonts sets this via &display=swap.",
  },
  {
    titleZh: "preload 关键字重",
    titleEn: "Preload the critical weight",
    bodyZh: "只 preload 首屏标题那一个 woff2，其余懒加载。",
    bodyEn: "Preload only the single woff2 the hero uses; lazy-load the rest.",
  },
  {
    titleZh: "Variable Font",
    titleEn: "Variable Font",
    bodyZh: "一个文件覆盖全 weight 区间（如 100–900），省下多个请求。",
    bodyEn: "One file spans the whole weight range (e.g. 100–900) — fewer requests.",
  },
] as const;

export function TypographyContent() {
  const { t, locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const [selectedCategory, setSelectedCategory] = useState<TypographyCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  useDemoFonts();

  const categories = useMemo(() => getTypographyCategories(), []);

  const filteredPairings = useMemo(() => {
    let result = fontPairings;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.nameZh.includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          p.mood.some((m) => m.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  // Load Google Fonts dynamically for visible pairings
  useEffect(() => {
    filteredPairings.forEach((pairing) => {
      const fontKey = `${pairing.heading.family}-${pairing.body.family}`;
      if (!loadedFonts.has(fontKey)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = generateGoogleFontsLink(pairing);
        document.head.appendChild(link);
        setLoadedFonts((prev) => new Set(prev).add(fontKey));
      }
    });
  }, [filteredPairings, loadedFonts]);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <div data-cursor-aura="off">
      {/* Hero — system-layer voice, mirrors color-theory */}
      <header className="max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-16 mb-16">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          {tx("系统层 · 基础", "Foundations · System Layer")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {tx("字体配对", "Typography & Pairing")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl text-lg">
          {tx(
            "好看的字体不是凭运气——它建立在基因选择、配对原理、排版参数与加载性能之上。先教你为什么，再给你能直接用的配对。",
            "Great type isn't luck — it rests on gene choice, pairing logic, typesetting parameters, and loading performance. The why first, then pairings you can use.",
          )}
        </p>
      </header>

      {/* Teaching modules (system layer) */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-20 pb-20">
        {/* Module 1 — the three font genes */}
        <section>
          <SectionHeader
            n="01"
            title={tx("原理：字体的三大基因", "Principle: the three font genes")}
            desc={tx(
              "任何字体都归入三族之一——衬线、无衬线、等宽。选错族，再好看的字体也救不回来。",
              "Every typeface falls into one of three genes — serif, sans, mono. Pick the wrong gene and no beauty will save it.",
            )}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {FONT_GENES.map((g) => (
              <div key={g.geneEn} className="rounded-xl border border-border overflow-hidden bg-background">
                <div
                  className="h-28 flex items-center justify-center border-b border-border bg-gradient-to-br from-background to-muted/20"
                  style={{ fontFamily: g.stack, fontWeight: g.weight }}
                >
                  <span className="text-5xl">Aa</span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold">
                    {tx(g.geneZh, g.geneEn)}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    ✓ {tx(g.useZh, g.useEn)}
                  </p>
                  <p className="text-xs text-muted">
                    ✗ {tx(g.avoidZh, g.avoidEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Module 2 — pairing principles */}
        <section>
          <SectionHeader
            n="02"
            title={tx("配对原理：为什么这对成立", "Why a pairing works")}
            desc={tx(
              "好配对不是两个好看的字体凑一起——它在对比、x-height、字重三个维度同时成立。",
              "A good pairing isn't two pretty faces shoved together — it satisfies three dimensions at once: contrast, x-height, and weight.",
            )}
          />
          {/* Live ✓ / ✗ comparison using real faces */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <PairingExample
              ok
              locale={locale}
              labelZh="成功：衬线 × 无衬线"
              labelEn="Works: serif × sans"
              contrast="Serif × Sans"
              headingStack="'Playfair Display', Georgia, serif"
              headingFamily="Playfair Display"
              headingWeight={700}
              bodyStack="'Inter', system-ui, sans-serif"
              bodyFamily="Inter"
              bodyWeight={400}
              noteZh="衬线标题压得住，无衬线正文干净——对比拉出层级。"
              noteEn="Serif headline leads, sans body stays clean — contrast gives hierarchy."
            />
            <PairingExample
              ok={false}
              locale={locale}
              labelZh="失败：两个衬线打架"
              labelEn="Fails: two serifs compete"
              contrast="Serif × Serif"
              headingStack="'Playfair Display', Georgia, serif"
              headingFamily="Playfair Display"
              headingWeight={700}
              bodyStack="'Merriweather', Georgia, serif"
              bodyFamily="Merriweather"
              bodyWeight={400}
              noteZh="两个衬线基因重复，标题正文互相争抢，层级塌掉。"
              noteEn="Two serif genes repeat — headline and body fight each other, hierarchy collapses."
            />
          </div>
          {/* The three principles */}
          <div className="grid gap-4 sm:grid-cols-3">
            {PAIRING_PRINCIPLES.map((p) => (
              <div key={p.nameEn} className="rounded-xl border border-border bg-muted/10 p-5">
                <h3 className="font-semibold mb-2 text-sm">{tx(p.nameZh, p.nameEn)}</h3>
                <p className="text-xs text-muted leading-relaxed">{tx(p.bodyZh, p.bodyEn)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Module 3 — typesetting parameters */}
        <section>
          <SectionHeader
            n="03"
            title={tx("排版参数：行高与度量", "Typesetting: line-height & measure")}
            desc={tx(
              "字体选对了，还要排得对。行高决定行间空气，度量决定每行长度——两个参数主宰阅读舒适度。",
              "Right face, right typesetting. Line-height sets the air between lines, measure sets how long each line runs — together they govern reading comfort.",
            )}
          />
          <TypeMetricsDemo locale={locale} />
        </section>

        {/* Module 4 — loading performance */}
        <section>
          <SectionHeader
            n="04"
            title={tx("加载性能：别让字体拖垮页面", "Loading: don't let type slow the page")}
            desc={tx(
              "字体是最大的渲染阻塞资源之一。三条规则把加载成本降到最低。",
              "Fonts are among the largest render-blocking resources. Three rules keep the cost down.",
            )}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {LOADING_TIPS.map((tip) => (
              <div key={tip.titleEn} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-semibold mb-2 text-sm font-mono">{tx(tip.titleZh, tip.titleEn)}</h3>
                <p className="text-xs text-muted leading-relaxed">{tx(tip.bodyZh, tip.bodyEn)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Transition into the tool area — existing list, reframed */}
      <div className="border-t border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.16em] text-muted mb-2">
              {tx("挑配对", "Pick a pairing")}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              {tx("35 组精选字体配对", "35 curated pairings")}
            </h2>
            <p className="text-muted leading-relaxed mt-2">
              {t("typography.description")}
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("typography.searchPlaceholder")}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                  selectedCategory === "all"
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
                }`}
              >
                {t("typography.filterAll")} ({fontPairings.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    selectedCategory === cat.category
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {locale === "zh" ? cat.labelZh : cat.labelEn} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted mb-6">
            {t("typography.showing")} {filteredPairings.length} {t("typography.pairings")}
          </p>

          {filteredPairings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted">{t("typography.noResults")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPairings.map((pairing) => (
                <TypographyCard
                  key={pairing.id}
                  pairing={pairing}
                  copied={copiedId === pairing.id}
                  onCopy={copyToClipboard}
                  locale={locale}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Teaching sub-components
// ---------------------------------------------------------------------------

function SectionHeader({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-sm font-mono text-muted">{n}</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <p className="text-muted leading-relaxed">{desc}</p>
    </div>
  );
}

function PairingExample({
  ok,
  locale,
  labelZh,
  labelEn,
  contrast,
  headingStack,
  headingFamily,
  headingWeight,
  bodyStack,
  bodyFamily,
  bodyWeight,
  noteZh,
  noteEn,
}: {
  ok: boolean;
  locale: "zh" | "en";
  labelZh: string;
  labelEn: string;
  contrast: string;
  headingStack: string;
  headingFamily: string;
  headingWeight: number;
  bodyStack: string;
  bodyFamily: string;
  bodyWeight: number;
  noteZh: string;
  noteEn: string;
}) {
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);
  return (
    <div
      className={`rounded-xl border overflow-hidden bg-background ${
        ok ? "border-emerald-500/50" : "border-red-500/50"
      }`}
    >
      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium ${ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
            {ok ? "✓" : "✗"} {tx(labelZh, labelEn)}
          </span>
          <span className="text-[0.65rem] font-mono text-muted/70 uppercase tracking-wide">{contrast}</span>
        </div>
        <div
          style={{ fontFamily: headingStack, fontWeight: headingWeight }}
          className="text-2xl mb-1.5 break-words"
        >
          {tx("更快地构建漂亮界面", "Build beautiful interfaces, faster")}
        </div>
        <p
          style={{ fontFamily: bodyStack, fontWeight: bodyWeight }}
          className="text-sm text-muted leading-relaxed break-words"
        >
          {tx(noteZh, noteEn)}
        </p>
        <p className="text-[0.65rem] text-muted/50 mt-2 font-mono">
          {headingFamily} {tx("×", "×")} {bodyFamily}
        </p>
      </div>
    </div>
  );
}

function TypeMetricsDemo({ locale }: { locale: "zh" | "en" }) {
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);
  const [lh, setLh] = useState(1.6);

  return (
    <div className="grid gap-8 md:grid-cols-2 items-center">
      <div className="rounded-xl border border-border p-6 bg-background">
        <p style={{ lineHeight: lh, fontFamily: "'Inter', system-ui, sans-serif" }} className="text-foreground/90 max-w-[62ch]">
          {tx(
            "排版是字体的呼吸——行高决定行间空气，度量决定每行长度。行太挤，眼睛找不到下一行；行太宽，读到右边就丢了开头。拖动右边的滑块，感受 1.2 到 2.0 之间空气的变化。",
            "Typesetting is how type breathes — line-height sets the air between lines, measure sets how long each line runs. Too tight and the eye loses the next line; too wide and you forget the start by the end. Drag the slider to feel 1.2 to 2.0.",
          )}
        </p>
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2 text-[0.65rem] font-mono text-muted/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{tx("理想行长 45–75 字符（本段约 62ch）", "ideal measure 45–75ch (this block ~62ch)")}</span>
        </div>
      </div>
      <div className="space-y-5">
        <Slider
          label={tx("行高 line-height", "line-height")}
          hint={tx("正文推荐 1.5–1.7", "body 1.5–1.7")}
          min={1.2}
          max={2}
          step={0.05}
          value={lh}
          onChange={setLh}
        />
        <ul className="text-sm text-muted leading-relaxed space-y-2">
          <li className="flex gap-2">
            <span className="text-foreground/40">·</span>
            <span>{tx("正文 1.5–1.7：留够空气，长读不累。", "Body 1.5–1.7: enough air for long reading.")}</span>
          </li>
          <li className="flex gap-2">
            <span className="text-foreground/40">·</span>
            <span>{tx("标题 1.1–1.3：越大的字行高越紧。", "Headlines 1.1–1.3: tighter as size grows.")}</span>
          </li>
          <li className="flex gap-2">
            <span className="text-foreground/40">·</span>
            <span>{tx("行长 45–75 字符：超 75 读者会断行。", "Measure 45–75ch: past 75, readers lose the line.")}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Slider({
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-xs text-muted">{hint}</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-foreground"
          aria-label={label}
        />
        <span className="text-sm font-mono tabular-nums w-12 text-right">{value.toFixed(2)}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pairing card (existing, preserved verbatim)
// ---------------------------------------------------------------------------

interface TypographyCardProps {
  pairing: FontPairing;
  copied: boolean;
  onCopy: (text: string, id: string) => void;
  locale: "zh" | "en";
}

const CATEGORY_LABEL: Record<string, string> = {
  classic: "Classic",
  modern: "Modern",
  playful: "Playful",
  editorial: "Editorial",
  technical: "Technical",
  elegant: "Elegant",
  display: "Display",
  handwritten: "Handwritten",
};

// Character set shown in the heading face — reveals the letterform details
// (x-height, terminals, how 0/O and g/a are drawn) that make a typeface itself.
const CHARSET = "Aa Gg Qq Rg 0123 &?";

// Personality-matched preview copy per category, so each specimen reads like the
// kind of product the pairing is for — not the same "quick brown fox" everywhere.
const PREVIEW_BY_CATEGORY: Record<string, { heading: string; body: string }> = {
  classic: {
    heading: "Timeless by Design",
    body: "Considered typography that endures—every letterform carries the weight of tradition, set for comfortable long-form reading.",
  },
  modern: {
    heading: "Built for Tomorrow",
    body: "Clean lines and confident spacing shape interfaces that feel effortless, fast, and unmistakably current.",
  },
  playful: {
    heading: "Hello, Sunshine!",
    body: "Bright, friendly type that smiles back—made for products that keep things light and never too serious.",
  },
  editorial: {
    heading: "The Morning Edition",
    body: "Long-form reading deserves rhythm and contrast. A serif headline sets the tone; the body face carries the story.",
  },
  technical: {
    heading: "System Architecture",
    body: "Monospace precision meets readable prose—for documentation, dashboards, and code that engineers actually trust.",
  },
  elegant: {
    heading: "Maison & Atelier",
    body: "Refined contrast and graceful proportion lend a quiet luxury to fashion, beauty, and premium editorial work.",
  },
  display: {
    heading: "Make a Statement",
    body: "Oversized type that commands the page—reserve it for the single word you want remembered.",
  },
  handwritten: {
    heading: "With Love",
    body: "A personal, human touch for invitations, quotes, and brands that want to feel handmade.",
  },
};

// Visualizes the weight gap between heading and body — the contrast that makes a
// hierarchy hold up. If the two bars are nearly equal, the pairing reads flat.
function WeightContrastBar({
  headingWeight,
  bodyWeight,
  bodyFamily,
}: {
  headingWeight: number;
  bodyWeight: number;
  bodyFamily: string;
}) {
  const pct = (weight: number) => `${((weight - 100) / 800) * 100}%`;
  return (
    <div className="flex items-center gap-4 text-[0.7em] text-muted" style={{ fontFamily: bodyFamily }}>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-wide">Heading</span>
          <span className="tabular-nums">{headingWeight}</span>
        </div>
        <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
          <div className="h-full rounded-full bg-foreground" style={{ width: pct(headingWeight) }} />
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="uppercase tracking-wide">Body</span>
          <span className="tabular-nums">{bodyWeight}</span>
        </div>
        <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
          <div className="h-full rounded-full bg-foreground/50" style={{ width: pct(bodyWeight) }} />
        </div>
      </div>
    </div>
  );
}

function TypographyCard({ pairing, copied, onCopy, locale }: TypographyCardProps) {
  const [scale, setScale] = useState(1);

  const headingFamily = fontStack(pairing.heading);
  const bodyFamily = fontStack(pairing.body);
  const isDisplay = pairing.category === "display" || pairing.category === "handwritten";
  const preview = PREVIEW_BY_CATEGORY[pairing.category] ?? PREVIEW_BY_CATEGORY.modern;
  const contrast = pairingContrast(pairing);

  return (
    <div className="group border border-border rounded-xl overflow-hidden bg-background hover:border-foreground/40 hover:shadow-lg transition-all">
      {/* Specimen — adapts to the typeface: display / handwritten faces star as an
          oversized word; text pairings show a character set, headline and copy. */}
      <div
        className="px-6 pt-6 pb-5 bg-gradient-to-br from-background to-muted/20"
        style={{ fontSize: `${16 * scale}px` }}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[0.7rem] uppercase tracking-[0.14em] text-muted"
            style={{ fontFamily: bodyFamily }}
          >
            {CATEGORY_LABEL[pairing.category]}
          </span>
          <span className="text-[0.7rem] text-muted/70 tracking-wide">{contrast}</span>
        </div>

        {isDisplay ? (
          <>
            {/* The typeface itself is the subject */}
            <div
              className="mb-5 break-words"
              style={{
                fontFamily: headingFamily,
                fontWeight: pairing.heading.weight,
                fontSize: "3.6em",
                lineHeight: 0.95,
              }}
            >
              {pairing.previewWord ?? preview.heading}
            </div>
            <div
              className="mb-5 text-muted/80 break-words"
              style={{
                fontFamily: headingFamily,
                fontWeight: pairing.heading.weight,
                fontSize: "1.4em",
                lineHeight: 1.2,
              }}
            >
              {CHARSET}
            </div>
            <p
              className="leading-relaxed text-muted"
              style={{ fontFamily: bodyFamily, fontWeight: pairing.body.weight, fontSize: "0.9em" }}
            >
              {preview.body}
            </p>
          </>
        ) : (
          <>
            {/* Character set in the heading face — letterforms up close */}
            <div
              className="mb-4 pb-4 border-b border-border/60 text-foreground/85 break-words"
              style={{
                fontFamily: headingFamily,
                fontWeight: pairing.heading.weight,
                fontSize: "1.5em",
                lineHeight: 1.15,
              }}
            >
              {CHARSET}
            </div>
            <h3
              className="tracking-tight mb-2 break-words"
              style={{ fontFamily: headingFamily, fontWeight: pairing.heading.weight, fontSize: "1.9em", lineHeight: 1.1 }}
            >
              {preview.heading}
            </h3>
            <p
              className="leading-relaxed mb-4 text-muted"
              style={{ fontFamily: bodyFamily, fontWeight: pairing.body.weight, fontSize: "0.92em" }}
            >
              {preview.body}
            </p>
            <WeightContrastBar
              headingWeight={pairing.heading.weight}
              bodyWeight={pairing.body.weight}
              bodyFamily={bodyFamily}
            />
          </>
        )}
      </div>

      {/* Size slider (interactive) */}
      <div className="px-6 py-3 border-y border-border flex items-center gap-3 bg-muted/10">
        <span className="text-xs text-muted whitespace-nowrap">Aa</span>
        <input
          type="range"
          min={0.8}
          max={1.4}
          step={0.05}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="flex-1 accent-foreground"
          aria-label="Preview font scale"
        />
        <span className="text-xs tabular-nums text-muted whitespace-nowrap w-10 text-right">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Info + copy */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="font-semibold text-sm truncate">
              {locale === "zh" ? pairing.nameZh : pairing.name}
            </h4>
            <p className="text-xs text-muted mt-0.5 truncate">
              {pairing.heading.family} <span className="opacity-50">·</span> {pairing.body.family}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 justify-end shrink-0">
            {pairing.mood.slice(0, 2).map((m) => (
              <span key={m} className="px-1.5 py-0.5 text-[0.65rem] rounded bg-muted/40 text-muted">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onCopy(generateFontCSS(pairing), pairing.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
              copied
                ? "bg-green-500 text-white border-green-500"
                : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
            }`}
          >
            {copied ? "Copied!" : "Copy CSS"}
          </button>
          <button
            onClick={() => onCopy(generateTailwindTheme(pairing), pairing.id)}
            className="flex-1 px-3 py-2 text-xs font-medium rounded-md border bg-background text-muted border-border hover:border-foreground hover:text-foreground transition-colors"
          >
            Tailwind
          </button>
        </div>
      </div>
    </div>
  );
}
