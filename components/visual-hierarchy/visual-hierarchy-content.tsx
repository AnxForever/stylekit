"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  HIERARCHY_LEVERS,
  SAMPLE_ELEMENTS,
  rankByWeight,
  generateHierarchyCSS,
  type LeverId,
  type HierarchyElement,
} from "@/lib/visual-hierarchy";

const ALL_LEVERS: LeverId[] = ["size", "weight", "color", "space"];

interface ElementStyle {
  fontSize: string;
  fontWeight: number;
  opacity: number;
  marginTop: string;
}

function styleFor(el: HierarchyElement, active: LeverId[]): ElementStyle {
  const has = (l: LeverId) => active.includes(l);
  return {
    fontSize: has("size") ? `${(1 + el.levers.size * 0.9).toFixed(3)}rem` : "0.95rem",
    fontWeight: has("weight") ? Math.round(400 + el.levers.weight * 400) : 400,
    opacity: has("color") ? 1 : 0.5,
    marginTop: has("space") ? `${Math.round(el.levers.space * 22)}px` : "4px",
  };
}

export function VisualHierarchyContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);

  const [active, setActive] = useState<LeverId[]>([...ALL_LEVERS]);
  const [copied, setCopied] = useState<string | null>(null);

  function toggle(id: LeverId) {
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const ranked = rankByWeight(SAMPLE_ELEMENTS, active);
  const rankMap = new Map(ranked.map((r) => [r.id, r.rank]));
  const css = generateHierarchyCSS();
  const flat = active.length === 0;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16" data-cursor-aura="off">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {tx("系统层 · 注意力", "System layer · Attention")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {tx("视觉层次", "Visual Hierarchy")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {tx(
            "视觉层次是对「眼睛先看什么、后看什么」的控制。四个杠杆——大小、字重、颜色对比、留白——决定了每个元素的视觉重量，进而决定注意力的流动顺序。",
            "Visual hierarchy is control over the order the eye moves through a layout. Four levers — size, weight, color, and space — set each element's visual weight, and that weight decides where attention flows first.",
          )}
        </p>
      </div>

      {/* 1. The levers */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{tx("一、四个杠杆", "1. The four levers")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {HIERARCHY_LEVERS.map((l) => (
            <div key={l.id} className="rounded-xl border border-border bg-muted/10 p-5">
              <span className="text-base font-semibold">{tx(l.nameZh, l.name)}</span>
              <p className="text-sm text-muted leading-relaxed mt-1">{tx(l.descZh, l.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. The lever controller — the heart */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-2">{tx("二、杠杆调节器", "2. The lever controller")}</h2>
        <p className="text-sm text-muted mb-5">
          {tx(
            "打开/关闭杠杆，左侧序号是眼睛的扫描顺序（按视觉重量实时排序）。全部关闭，一切扁平、只能从上往下硬扫；逐个打开，主次秩序浮现。",
            "Toggle the levers — the numbers on the left are the scan order, ranked live by visual weight. Switch them all off and everything goes flat, read top to bottom; switch them on and a clear order emerges.",
          )}
        </p>

        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs uppercase tracking-wide text-muted mr-1">{tx("杠杆", "Levers")}</span>
          {HIERARCHY_LEVERS.map((l) => {
            const on = active.includes(l.id);
            return (
              <button
                key={l.id}
                onClick={() => toggle(l.id)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                  on
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted border-border hover:border-foreground"
                }`}
              >
                {tx(l.nameZh, l.name)}
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-border p-6 md:p-8 bg-background">
          {SAMPLE_ELEMENTS.map((el) => {
            const s = styleFor(el, active);
            const rank = rankMap.get(el.id) ?? 0;
            const colorOn = active.includes("color");
            return (
              <div key={el.id} className="flex items-start gap-3" style={{ marginTop: s.marginTop }}>
                <span
                  className={`mt-1 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.65rem] font-semibold tabular-nums ${
                    rank === 1 && !flat
                      ? "bg-accent text-white"
                      : "border border-border text-muted"
                  }`}
                  title={tx("扫描顺序", "Scan order")}
                >
                  {rank}
                </span>
                <div className="min-w-0">
                  {el.id === "cta" ? (
                    <button
                      style={{ fontSize: s.fontSize, fontWeight: s.fontWeight }}
                      className={`px-3 py-1.5 rounded-md ${
                        colorOn
                          ? "bg-foreground text-background"
                          : "bg-muted/30 text-muted"
                      }`}
                    >
                      {tx(el.labelZh, el.label)}
                    </button>
                  ) : (
                    <span
                      className="block leading-snug"
                      style={{ fontSize: s.fontSize, fontWeight: s.fontWeight, opacity: s.opacity }}
                    >
                      {tx(el.labelZh, el.label)}
                    </span>
                  )}
                  <span className="block text-[0.65rem] uppercase tracking-wide text-muted/50 mt-0.5">
                    {tx(el.roleZh, el.role)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {flat && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
            {tx(
              "所有杠杆关闭——没有层次，每个元素权重相等，眼睛只能从上往下逐行硬扫。",
              "All levers off — no hierarchy, every element weighs the same, and the eye has no choice but to grind top to bottom.",
            )}
          </p>
        )}
      </section>

      {/* 3. Copyable tokens */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{tx("三、可复制：文本层级", "3. Copyable text levels")}</h2>
        <p className="text-sm text-muted mb-4">
          {tx(
            "把层次固化成三级文本 token——主、次、辅。用相对字号、字重、不透明度区分，而不是每次现调。",
            "Freeze the hierarchy into three text tokens — primary, secondary, tertiary — separated by relative size, weight, and opacity instead of tuning each one by hand.",
          )}
        </p>
        <div className="lg:max-w-xl">
          <CodeBlock
            title={tx("CSS 文本层级", "CSS text levels")}
            code={css}
            copied={copied === "css"}
            onCopy={() => copy(css, "css")}
          />
        </div>
      </section>

      {/* 4. Using hierarchy */}
      <section>
        <h2 className="text-lg font-semibold mb-4">{tx("四、选用指南", "4. Using hierarchy")}</h2>
        <ul className="space-y-2 text-sm text-muted leading-relaxed">
          {[
            tx(
              "每屏一个主焦点：先决定眼睛最先该落在哪，再让其他一切退后。两个并列的「第一」等于没有第一。",
              "One focal point per screen: decide where the eye must land first, then let everything else recede. Two competing firsts means no first.",
            ),
            tx(
              "层级控制在 3-4 级：主、次、辅足够；级数越多，每级的差异越被稀释。",
              "Keep it to 3-4 levels: primary, secondary, tertiary is usually enough — more levels dilute the contrast between each.",
            ),
            tx(
              "杠杆叠加、但别全开满：标题同时放大 + 加粗就够，再叠满色彩和留白会过载。",
              "Stack levers, but don't max them all: a title that is bigger and bolder is plenty — piling on color and space too overloads it.",
            ),
            tx(
              "别只靠颜色：色彩对比对色盲用户失效，层次要同时落在大小或字重上，才经得起可访问性。",
              "Don't rely on color alone: contrast fails for color-blind users, so anchor hierarchy in size or weight as well to stay accessible.",
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
