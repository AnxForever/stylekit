"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n/context";
import { DESIGN_PRINCIPLES, generateChecklistMarkdown } from "@/lib/design-principles";

export function DesignPrinciplesContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);

  const [strict, setStrict] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const checklistMd = useMemo(
    () => generateChecklistMarkdown(locale === "zh" ? "zh" : "en"),
    [locale],
  );

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16" data-cursor-aura="off">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted mb-3">
          {tx("系统层 · 设计原理", "System layer · Principles")}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {tx("设计四原则 · CRAP", "The Four Principles · CRAP")}
        </h1>
        <p className="text-muted leading-relaxed max-w-2xl">
          {tx(
            "色彩、字体、字号、间距给你正确的元素；CRAP 教你怎么组织它们。对比、重复、对齐、亲密性——四条原则把一堆正确的 token 变成一个看起来「刻意」的版面。",
            "Color, type, scale, and spacing give you correct elements; CRAP tells you how to organize them. Contrast, Repetition, Alignment, Proximity — four principles that turn a pile of correct tokens into a layout that reads as intentional.",
          )}
        </p>
      </div>

      {/* 1. The four principles */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{tx("一、四原则", "1. The four principles")}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {DESIGN_PRINCIPLES.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-muted/10 p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-bold text-accent tabular-nums">{p.letter}</span>
                <span className="text-lg font-semibold">{tx(p.nameZh, p.name)}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{tx(p.definitionZh, p.definition)}</p>
              <p className="text-xs text-foreground/50 mt-2 italic">{tx(p.mnemonicZh, p.mnemonic)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Before / after demos — the heart of the page */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
          <h2 className="text-lg font-semibold">{tx("二、对照演示", "2. Before / after")}</h2>
          <div className="inline-flex rounded-lg border border-border overflow-hidden text-sm">
            <button
              onClick={() => setStrict(false)}
              className={`px-3 py-1.5 ${!strict ? "bg-foreground text-background" : "bg-background text-muted"}`}
            >
              {tx("违反", "Violating")}
            </button>
            <button
              onClick={() => setStrict(true)}
              className={`px-3 py-1.5 ${strict ? "bg-foreground text-background" : "bg-background text-muted"}`}
            >
              {tx("遵守", "Following")}
            </button>
          </div>
        </div>
        <p className="text-sm text-muted mb-5">
          {tx(
            "切换开关，看同样的内容从「随手摆」变成「守原则」——差距一眼可见。",
            "Flip the switch and watch the same content go from arbitrary to principled — the gap is visible at a glance.",
          )}
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Contrast */}
          <DemoCard letter="C" title={tx("对比", "Contrast")}>
            <div className="rounded-lg border border-border p-5 bg-background w-full">
              <div
                className={
                  strict
                    ? "text-xl font-bold mb-1 leading-snug"
                    : "text-sm font-normal mb-1 text-muted"
                }
              >
                {tx("更快地构建漂亮界面", "Build beautiful interfaces, faster")}
              </div>
              <p className="text-sm text-muted mb-3">
                {tx("一套有层次的排版，胜过十句说明。", "One typographic hierarchy beats ten captions.")}
              </p>
              <button
                className={
                  strict
                    ? "px-3 py-1.5 rounded-md bg-foreground text-background text-sm font-medium"
                    : "px-3 py-1.5 rounded-md bg-muted/30 text-muted text-sm"
                }
              >
                {tx("开始", "Get started")}
              </button>
            </div>
          </DemoCard>

          {/* Repetition */}
          <DemoCard letter="R" title={tx("重复", "Repetition")}>
            <div className="grid grid-cols-3 gap-3 w-full">
              {[0, 1, 2].map((i) => {
                const violating = [
                  "rounded-none border-2 border-accent/40 p-2",
                  "rounded-xl border border-border p-4 bg-muted/20",
                  "rounded-full border border-dashed border-foreground/40 p-3",
                ][i];
                return (
                  <div
                    key={i}
                    className={`bg-background ${strict ? "rounded-lg border border-border p-3" : violating}`}
                  >
                    <div className="h-2 w-full rounded bg-foreground/30 mb-2" />
                    <div className="h-2 w-2/3 rounded bg-foreground/15" />
                  </div>
                );
              })}
            </div>
          </DemoCard>

          {/* Alignment */}
          <DemoCard letter="A" title={tx("对齐", "Alignment")}>
            <div className="w-full space-y-2 border-l-2 border-dashed border-accent/30 pl-3">
              {[
                tx("产品名称", "Product name"),
                tx("简短的一句话描述", "A short one-line description"),
                tx("立即体验", "Try it now"),
              ].map((line, i) => {
                const violating = ["text-left", "text-center", "text-right pr-4"][i];
                return (
                  <p key={i} className={`text-sm ${strict ? "text-left" : violating}`}>
                    {line}
                  </p>
                );
              })}
            </div>
          </DemoCard>

          {/* Proximity */}
          <DemoCard letter="P" title={tx("亲密性", "Proximity")}>
            <div className={`w-full flex flex-col ${strict ? "gap-5" : "gap-2"}`}>
              {[
                { label: tx("邮箱", "Email"), value: "darling@stylekit.top" },
                { label: tx("电话", "Phone"), value: "+86 138 0000 0000" },
                { label: tx("城市", "City"), value: tx("北京", "Beijing") },
              ].map((g, i) => (
                <div key={i} className={`flex flex-col ${strict ? "gap-0.5" : "gap-2"}`}>
                  <span className="text-[0.7rem] uppercase tracking-wide text-muted">{g.label}</span>
                  <span className="text-sm">{g.value}</span>
                </div>
              ))}
            </div>
          </DemoCard>
        </div>
      </section>

      {/* 3. Checklist + code */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold mb-4">{tx("三、自查清单与代码", "3. Checklist & code")}</h2>

        <div className="rounded-xl border border-border p-5 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">{tx("CRAP 自查清单", "CRAP self-review")}</span>
            <button
              onClick={() => copy(checklistMd, "md")}
              className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                copied === "md"
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-background text-muted border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {copied === "md" ? "Copied!" : tx("复制 Markdown", "Copy Markdown")}
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {DESIGN_PRINCIPLES.map((p) => (
              <div key={p.id}>
                <h3 className="text-sm font-semibold mb-2">
                  {p.letter} — {tx(p.nameZh, p.name)}
                </h3>
                <ul className="space-y-1.5">
                  {p.checklist.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted leading-relaxed">
                      <span className="mt-1 h-3 w-3 shrink-0 rounded-sm border border-border" />
                      <span>{tx(item.zh, item.en)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {DESIGN_PRINCIPLES.map((p) => (
            <CodeBlock
              key={p.id}
              title={`${p.letter} · ${tx(p.nameZh, p.name)}`}
              code={p.snippet.code}
              copied={copied === p.id}
              onCopy={() => copy(p.snippet.code, p.id)}
            />
          ))}
        </div>
      </section>

      {/* 4. Using the principles */}
      <section>
        <h2 className="text-lg font-semibold mb-4">{tx("四、选用指南", "4. Using the principles")}</h2>
        <ul className="space-y-2 text-sm text-muted leading-relaxed">
          {[
            tx(
              "应用顺序：先用亲密性把内容分组，再用对齐建立秩序，接着用重复统一样式，最后用对比拉开主次。先理结构，再强化。",
              "Apply in order: group with Proximity, order with Alignment, unify with Repetition, then sharpen with Contrast. Structure first, emphasis last.",
            ),
            tx(
              "对比最忌「差一点」：almost the same 是最糟的——要么相同，要么明显不同。",
              "Contrast's worst enemy is almost: if two things are not the same, make them very different, not slightly.",
            ),
            tx(
              "对齐别混用：同一区块里居中和左对齐混排，秩序立刻垮掉。",
              "Don't mix alignments: centered and left-aligned text in one block destroys the order.",
            ),
            tx(
              "落回材料层：对比落到字号/字重/色彩，重复与亲密性落到间距 token，对齐落到网格——CRAP 是「用法」，前四块是「材料」。",
              "It maps to the elements: Contrast lands on scale/weight/color, Repetition and Proximity on spacing tokens, Alignment on the grid — CRAP is the usage, the other four blocks are the materials.",
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

function DemoCard({ letter, title, children }: { letter: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/10">
        <span className="text-sm font-bold text-accent">{letter}</span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="p-5 min-h-[150px] flex items-center justify-center bg-background">{children}</div>
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
