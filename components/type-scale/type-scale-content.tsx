"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  SCALE_RATIOS,
  generateScale,
  generateFluidScale,
  generateScaleCSS,
  generateScaleTailwind,
  generateFluidCSS,
} from "@/lib/type-scale";

// A short specimen rendered at each step so size differences read as real type,
// not just numbers.
const SPECIMEN = "The spectrum of scale";
const SPECIMEN_ZH = "字号阶梯让层次清晰";

export function TypeScaleContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);

  const [base, setBase] = useState(16);
  const [ratioIdx, setRatioIdx] = useState(3); // Major Third (1.25)
  const [fluid, setFluid] = useState(false);
  const [minBase, setMinBase] = useState(16);
  const [maxBase, setMaxBase] = useState(20);
  const [minVw, setMinVw] = useState(360);
  const [maxVw, setMaxVw] = useState(1240);
  const [copied, setCopied] = useState<string | null>(null);

  const ratio = SCALE_RATIOS[ratioIdx];

  const staticScale = useMemo(() => generateScale(base, ratio.value), [base, ratio]);
  const fluidScale = useMemo(
    () =>
      generateFluidScale({
        minViewport: minVw,
        maxViewport: maxVw,
        minBase,
        maxBase,
        minRatio: ratio.value,
        maxRatio: ratio.value,
      }),
    [minVw, maxVw, minBase, maxBase, ratio],
  );

  const cssCode = useMemo(
    () => (fluid ? generateFluidCSS(fluidScale) : generateScaleCSS(staticScale)),
    [fluid, fluidScale, staticScale],
  );
  const twCode = useMemo(() => generateScaleTailwind(staticScale), [staticScale]);

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const specimen = tx(SPECIMEN_ZH, SPECIMEN);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16" data-cursor-aura="off">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {tx("系统层 · 排版", "System layer · Typography")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {tx("字号阶梯", "Type Scale")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {tx(
            "字号不该靠猜。模块化比例从一个基准尺寸出发，乘以固定比例得到每一级，让整套排版有统一的数学关系——再用 clamp() 让它随视口流体缩放，无需断点。",
            "Font sizes should not be guesswork. A modular scale derives every step from one base by a fixed ratio, giving the whole system a single mathematical relationship — then clamp() makes it scale fluidly with the viewport, no breakpoints.",
          )}
        </p>
      </div>

      {/* Module 1 — Principle */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">
          {tx("一、原理：模块化比例", "1. The principle: modular scale")}
        </h2>
        <div className="rounded-xl border border-border bg-muted/10 p-6 md:p-8">
          <div className="font-mono text-xl md:text-2xl tracking-tight mb-4">
            size = base × ratio<sup>step</sup>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-sm">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className="rounded-md border border-border bg-background px-3 py-1.5 tabular-nums">
                  {Math.round(16 * Math.pow(1.25, s))}px
                </span>
                {s < 3 && <span className="text-muted">× 1.25 →</span>}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted mt-4 leading-relaxed">
            {tx(
              "基准 16px、比例 1.25（Major Third）下，每一级是上一级的 1.25 倍。基准建议 16px（不是 14/15px），它是浏览器默认正文尺寸。",
              "With base 16px and ratio 1.25 (Major Third), each step is 1.25× the previous. Use 16px as the base (not 14/15px) — it is the browser's default body size.",
            )}
          </p>
        </div>
      </section>

      {/* Module 2 — Generator */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">
          {tx("二、交互生成器", "2. Interactive generator")}
        </h2>

        {/* Controls */}
        <div className="rounded-xl border border-border p-5 mb-6 space-y-5">
          {/* Base + mode */}
          <div className="flex flex-wrap items-end gap-6">
            <label className="flex-1 min-w-[200px]">
              <span className="text-xs uppercase tracking-wide text-muted">
                {tx("基准尺寸", "Base size")} — {base}px
              </span>
              <input
                type="range"
                min={12}
                max={24}
                step={1}
                value={base}
                onChange={(e) => setBase(Number(e.target.value))}
                className="w-full accent-foreground mt-2"
                aria-label="Base size"
              />
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-muted">
                {tx("模式", "Mode")}
              </span>
              <div className="inline-flex rounded-lg border border-border overflow-hidden text-sm">
                <button
                  onClick={() => setFluid(false)}
                  className={`px-3 py-1.5 ${!fluid ? "bg-foreground text-background" : "bg-background text-muted"}`}
                >
                  {tx("静态", "Static")}
                </button>
                <button
                  onClick={() => setFluid(true)}
                  className={`px-3 py-1.5 ${fluid ? "bg-foreground text-background" : "bg-background text-muted"}`}
                >
                  Fluid
                </button>
              </div>
            </div>
          </div>

          {/* Ratio picker */}
          <div>
            <span className="text-xs uppercase tracking-wide text-muted">
              {tx("比例", "Ratio")}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {SCALE_RATIOS.map((r, i) => (
                <button
                  key={r.value}
                  onClick={() => setRatioIdx(i)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    i === ratioIdx
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  <span className="tabular-nums">{r.value}</span>
                  <span className="opacity-60"> · {r.name}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted mt-2">{ratio.hint}</p>
          </div>

          {/* Fluid params */}
          {fluid && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
              {[
                { label: tx("最小基准", "Min base"), value: minBase, set: setMinBase },
                { label: tx("最大基准", "Max base"), value: maxBase, set: setMaxBase },
                { label: tx("最小视口", "Min viewport"), value: minVw, set: setMinVw },
                { label: tx("最大视口", "Max viewport"), value: maxVw, set: setMaxVw },
              ].map((f) => (
                <label key={f.label} className="text-xs">
                  <span className="uppercase tracking-wide text-muted">{f.label}</span>
                  <input
                    type="number"
                    value={f.value}
                    onChange={(e) => f.set(Number(e.target.value))}
                    className="w-full mt-1 px-2 py-1.5 border border-border rounded-md bg-background text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Scale preview — largest first */}
        <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
          {(fluid ? fluidScale : staticScale)
            .slice()
            .reverse()
            .map((s) => {
              const size = fluid
                ? (s as { clamp: string }).clamp
                : `${(s as { px: number }).px}px`;
              const detail = fluid
                ? `${(s as { minPx: number }).minPx}→${(s as { maxPx: number }).maxPx}px`
                : `${(s as { px: number }).px}px · ${(s as { rem: number }).rem}rem`;
              return (
                <div key={s.key} className="flex items-center gap-4 px-5 py-3">
                  <span className="w-12 shrink-0 text-[0.7rem] uppercase tracking-wide text-muted tabular-nums">
                    {s.key}
                  </span>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <span
                      className="block truncate"
                      style={{ fontSize: size, lineHeight: 1.15 }}
                    >
                      {specimen}
                    </span>
                  </div>
                  <span className="shrink-0 text-[0.7rem] text-muted/70 tabular-nums text-right">
                    {detail}
                  </span>
                </div>
              );
            })}
        </div>
        {fluid && (
          <p className="text-xs text-muted mt-3">
            {tx(
              "提示：拖动浏览器窗口宽度，上面的字号会随视口平滑缩放（clamp 生效），无需任何断点。",
              "Tip: drag your browser width — the sizes above scale smoothly with the viewport (clamp at work), with no breakpoints.",
            )}
          </p>
        )}
      </section>

      {/* Module 3 — Copyable tokens */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">
          {tx("三、可复制 token", "3. Copyable tokens")}
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock
            title={
              fluid
                ? tx("CSS 变量（fluid / clamp）", "CSS variables (fluid / clamp)")
                : tx("CSS 变量", "CSS variables")
            }
            code={cssCode}
            copied={copied === "css"}
            onCopy={() => copy(cssCode, "css")}
          />
          <CodeBlock
            title={tx("Tailwind v4 @theme（静态）", "Tailwind v4 @theme (static)")}
            code={twCode}
            copied={copied === "tw"}
            onCopy={() => copy(twCode, "tw")}
          />
        </div>
      </section>

      {/* Module 4 — Usage guide */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          {tx("四、选用指南", "4. Choosing a ratio")}
        </h2>
        <div className="rounded-xl border border-border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-muted/20 text-muted">
              <tr>
                <th className="text-left font-medium px-4 py-2.5">{tx("比例", "Ratio")}</th>
                <th className="text-left font-medium px-4 py-2.5">{tx("适合", "Best for")}</th>
                <th className="text-left font-medium px-4 py-2.5 hidden sm:table-cell">
                  {tx("采用", "Used by")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["1.125–1.2", tx("密集 UI、仪表盘、数据表", "Dense UI, dashboards, data tables"), "Vercel, Tailwind"],
                ["1.25–1.333", tx("多数产品、SaaS、文档", "Most products, SaaS, docs"), "Stripe, Material"],
                ["1.414–1.618", tx("编辑、营销、display 主导", "Editorial, marketing, display-led"), tx("杂志 / hero", "Magazines / hero")],
              ].map((row) => (
                <tr key={row[0]}>
                  <td className="px-4 py-2.5 font-mono tabular-nums">{row[0]}</td>
                  <td className="px-4 py-2.5 text-muted">{row[1]}</td>
                  <td className="px-4 py-2.5 text-muted/70 hidden sm:table-cell">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="space-y-2 text-sm text-muted leading-relaxed">
          {[
            tx(
              "基准用 16px——浏览器默认正文尺寸，可读性与无障碍的安全起点。",
              "Use 16px as the base — the browser default, the safe anchor for readability and accessibility.",
            ),
            tx(
              "把每个标题级别映射到阶梯的某一步，而不是写死随意的 px。",
              "Map each heading level to a step on the scale, not an arbitrary px value.",
            ),
            tx(
              "正文行宽控制在 55–75ch；正文尺寸保持稳定，不要做 fluid——只让 display / heading 流体缩放。",
              "Keep body line length at 55–75ch; keep body size stable (not fluid) — only let display / heading scale fluidly.",
            ),
            tx(
              "字号越大行高越紧：大标题约 1.1，正文约 1.5——垂直律动随尺寸调整。",
              "Tighten line-height as size grows: ~1.1 for large headings, ~1.5 for body — vertical rhythm tracks size.",
            ),
            tx(
              "不确定就从 1.25 起；层次太平再加大比例。别把 1.618 强加到密集 UI 上。",
              "When unsure start at 1.25; raise the ratio if hierarchy feels flat. Don't force 1.618 onto a dense UI.",
            ),
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
            copied
              ? "bg-green-500 text-white border-green-500"
              : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
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
