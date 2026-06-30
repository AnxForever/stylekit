"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  SPACING_PRESETS,
  GRID_PRESETS,
  spacingTokens,
  isOnGrid,
  snapToGrid,
  generateSpacingCSS,
  generateSpacingTailwind,
} from "@/lib/spacing";

export function SpacingContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);

  const [presetIdx, setPresetIdx] = useState(0);
  const [checkValue, setCheckValue] = useState(13);
  const [gridIdx, setGridIdx] = useState(2);
  const [copied, setCopied] = useState<string | null>(null);

  const preset = SPACING_PRESETS[presetIdx];
  const tokens = useMemo(() => spacingTokens(preset), [preset]);
  const grid = GRID_PRESETS[gridIdx];
  const onGrid = isOnGrid(checkValue, preset.base);
  const snapped = snapToGrid(checkValue, preset.base);
  const cssCode = useMemo(() => generateSpacingCSS(preset), [preset]);
  const twCode = useMemo(() => generateSpacingTailwind(preset), [preset]);

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const maxPx = Math.max(...tokens.map((t) => t.px)) || 1;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16" data-cursor-aura="off">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {tx("系统层 · 布局", "System layer · Layout")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {tx("间距与网格", "Spacing & Grid")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {tx(
            "间距是布局的节奏。把所有 padding、margin、gap 都约束到一个 8 像素的网格上，页面就有了统一的呼吸感——而不是一堆随手定的 13px、17px。",
            "Spacing is the rhythm of a layout. Snap every padding, margin, and gap to one 8-pixel grid and the page breathes as a system — instead of a pile of arbitrary 13px and 17px values.",
          )}
        </p>
      </div>

      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">
          {tx("一、原理：8 点网格", "1. The principle: the 8-point grid")}
        </h2>
        <div className="rounded-xl border border-border bg-muted/10 p-6 md:p-8">
          <div className="flex items-end gap-3 mb-5 flex-wrap">
            {[8, 16, 24, 32, 48, 64].map((px) => (
              <div key={px} className="flex flex-col items-center gap-1">
                <div className="bg-foreground/80 rounded" style={{ width: px, height: px }} />
                <span className="text-[0.65rem] text-muted tabular-nums">{px}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted leading-relaxed">
            {tx(
              "所有间距都是 8 的倍数（4px 作为精细的半步）。为什么是 8？常见屏幕密度 1×、1.5×、2×、3× 都能整除 8，得到整数像素——所以 8px 的内边距在手机、桌面、高清屏上都像素完美，而 5px、7px 会因子像素渲染发虚。",
              "Every value is a multiple of 8 (with 4px as a fine half-step). Why 8? The common screen densities — 1x, 1.5x, 2x, 3x — all divide 8 into whole pixels, so 8px padding renders pixel-perfect on phone, desktop, and retina alike, while 5px or 7px go soft from sub-pixel rounding.",
            )}
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{tx("二、交互演示", "2. Interactive")}</h2>

        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs uppercase tracking-wide text-muted">{tx("网格基准", "Grid base")}</span>
          <div className="inline-flex rounded-lg border border-border overflow-hidden text-sm">
            {SPACING_PRESETS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setPresetIdx(i)}
                className={`px-3 py-1.5 ${i === presetIdx ? "bg-foreground text-background" : "bg-background text-muted"}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted hidden sm:inline">{preset.hint}</span>
        </div>

        <div className="rounded-xl border border-border divide-y divide-border overflow-hidden mb-6">
          {tokens.map((t) => (
            <div key={t.key} className="flex items-center gap-4 px-5 py-2.5">
              <span className="w-10 shrink-0 text-[0.7rem] uppercase tracking-wide text-muted">{t.key}</span>
              <div className="flex-1 min-w-0">
                <div className="h-4 rounded bg-foreground/80" style={{ width: `${(t.px / maxPx) * 100}%` }} />
              </div>
              <span className="shrink-0 w-24 text-right text-[0.7rem] text-muted/70 tabular-nums">
                {t.px}px · {t.rem}rem
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border p-5 mb-6">
          <span className="text-xs uppercase tracking-wide text-muted">{tx("Snap 检查器", "Snap checker")}</span>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <input
              type="number"
              value={checkValue}
              onChange={(e) => setCheckValue(Number(e.target.value))}
              className="w-24 px-3 py-2 border border-border rounded-md bg-background text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <span className="text-sm text-muted">px</span>
            {onGrid ? (
              <span className="text-sm text-green-600 dark:text-green-400">
                {tx(`落在 ${preset.base}px 网格上`, `On the ${preset.base}px grid`)}
              </span>
            ) : (
              <span className="text-sm text-amber-600 dark:text-amber-400">
                {tx(`不在网格上 — 应 snap 到 ${snapped}px`, `Off-grid — snap to ${snapped}px`)}
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-2">
            {tx(
              "铁律：值要么落在阶梯上，要么扩展阶梯——绝不在原地发明 13px。",
              "The rule: snap to the scale or extend the scale — never invent 13px in place.",
            )}
          </p>
        </div>

        <div className="rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">{tx("列网格", "Column grid")}</span>
            <div className="inline-flex rounded-lg border border-border overflow-hidden text-sm">
              {GRID_PRESETS.map((g, i) => (
                <button
                  key={g.id}
                  onClick={() => setGridIdx(i)}
                  className={`px-3 py-1.5 ${i === gridIdx ? "bg-foreground text-background" : "bg-background text-muted"}`}
                >
                  {g.label} · {g.columns}
                </button>
              ))}
            </div>
          </div>
          <div
            className="grid rounded-lg overflow-hidden"
            style={{ gridTemplateColumns: `repeat(${grid.columns}, 1fr)`, gap: `${Math.min(grid.gutter, 16)}px` }}
          >
            {Array.from({ length: grid.columns }).map((_, i) => (
              <div key={i} className="h-16 rounded bg-accent/15 border border-accent/30" />
            ))}
          </div>
          <p className="text-xs text-muted mt-3">
            {tx(
              `${grid.columns} 列 · gutter ${grid.gutter}px · margin ${grid.margin}px。12 整除 2/3/4/6，半/三分/四分/六分都能对齐。`,
              `${grid.columns} columns · ${grid.gutter}px gutter · ${grid.margin}px margin. 12 divides into 2/3/4/6 — halves, thirds, quarters, sixths all align.`,
            )}
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{tx("三、可复制 token", "3. Copyable tokens")}</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock title={tx("CSS 变量", "CSS variables")} code={cssCode} copied={copied === "css"} onCopy={() => copy(cssCode, "css")} />
          <CodeBlock title={tx("Tailwind v4 @theme", "Tailwind v4 @theme")} code={twCode} copied={copied === "tw"} onCopy={() => copy(twCode, "tw")} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">{tx("四、选用指南", "4. Using the system")}</h2>
        <ul className="space-y-2 text-sm text-muted leading-relaxed mb-6">
          {[
            tx("默认用 8pt——主流且跨设备像素完美；只在密集 UI（仪表盘、数据表）才降到 4pt 精细。", "Default to 8pt — mainstream and pixel-perfect across devices; drop to 4pt only for dense UI like dashboards and tables."),
            tx("snap 不发明：组件用了 13px，下一个就会用 14px，系统的节奏就垮了。", "Snap, don't invent: once one component uses 13px, the next uses 14px, and the rhythm collapses."),
            tx("区分 micro 与 macro：组件内间距（micro）移动端保持不变；页面级间距（macro，section/hero）移动端缩小。", "Separate micro from macro: keep component-internal spacing stable on mobile; shrink page-level spacing on small screens."),
            tx("布局用 12 列网格，gutter 16–24px、外边距桌面 24 / 移动 16；gutter 和 margin 也用间距 token。", "Lay out on a 12-column grid, 16–24px gutters, 24/16px desktop/mobile margins — gutters and margins are spacing tokens too."),
            tx("常见尺寸落在网格上：按钮高 40/48、图标 16/24/32、卡片内边距 16/24、触摸目标不小于 44×44。", "Common sizes land on the grid: buttons 40/48 tall, icons 16/24/32, card padding 16/24, touch targets at least 44x44."),
          ].map((tip, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-foreground/40 mt-0.5">—</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

interface CodeBlockProps {
  title: string;
  code: string;
  copied: boolean;
  onCopy: () => void;
}

function CodeBlock({ title, code, copied, onCopy }: CodeBlockProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-muted/10">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <span className="text-xs font-medium text-muted">{title}</span>
        <button
          onClick={onCopy}
          className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
            copied ? "bg-green-500 text-white border-green-500" : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs leading-relaxed overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
