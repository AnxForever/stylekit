"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  hslToHex,
  hexToRgb,
  formatHsl,
  generateHarmony,
  HARMONY_TYPES,
  contrastRatio,
  wcagLevel,
  type Hsl,
  type HarmonyType,
} from "@/lib/color";

const HARMONY_LABELS: Record<HarmonyType, { zh: string; en: string }> = {
  complementary: { zh: "互补", en: "Complementary" },
  splitComplementary: { zh: "分裂互补", en: "Split Complementary" },
  analogous: { zh: "类比", en: "Analogous" },
  triadic: { zh: "三角", en: "Triadic" },
  tetradic: { zh: "四角", en: "Tetradic" },
  monochromatic: { zh: "单色", en: "Monochromatic" },
};

export function ColorTheoryContent() {
  const { locale } = useI18n();
  const tx = (zh: string, en: string) => (locale === "zh" ? zh : en);

  const [hsl, setHsl] = useState<Hsl>({ h: 220, s: 70, l: 50 });
  const [fg, setFg] = useState("#1f2937");
  const [bg, setBg] = useState("#ffffff");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const baseHex = hslToHex(hsl);
  const ratio = useMemo(() => contrastRatio(hexToRgb(fg), hexToRgb(bg)), [fg, bg]);
  const level = wcagLevel(ratio);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 space-y-24">
      {/* Hero */}
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-muted mb-3">
          {tx("系统层 · 基础", "Foundations · System Layer")}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
          {tx("色彩理论", "Color Theory")}
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          {tx(
            "好看的配色不是凭感觉——它建立在色相、饱和度、明度三个维度,和一套可推导的和谐关系之上。这里教你原理,并给你能直接复制的工具。",
            "Good color isn't guesswork — it rests on hue, saturation, and lightness, plus a set of derivable harmony relationships. Learn the principles, take the tools.",
          )}
        </p>
      </header>

      {/* Module 1: HSL playground */}
      <section>
        <SectionHeader
          n="01"
          title={tx("原理:HSL 三维度", "Principle: The HSL Model")}
          desc={tx(
            "任何颜色都能拆成色相(是什么色)、饱和度(多鲜艳)、明度(多亮)。拖动滑块,感受每个维度。",
            "Every color decomposes into hue (which color), saturation (how vivid), and lightness (how bright). Drag to feel each axis.",
          )}
        />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className="h-56 rounded-2xl border border-border shadow-sm flex items-end p-5"
            style={{ background: baseHex }}
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white font-mono text-sm">
              {baseHex} · {formatHsl(hsl)}
            </div>
          </div>
          <div className="space-y-5">
            <Slider
              label={tx("色相 Hue", "Hue")}
              hint={tx("色轮上的位置 0-360°", "wheel position, 0-360°")}
              min={0}
              max={360}
              value={hsl.h}
              onChange={(h) => setHsl({ ...hsl, h })}
            />
            <Slider
              label={tx("饱和度 Saturation", "Saturation")}
              hint={tx("0=灰, 100=鲜艳", "0=gray, 100=vivid")}
              min={0}
              max={100}
              value={hsl.s}
              onChange={(s) => setHsl({ ...hsl, s })}
            />
            <Slider
              label={tx("明度 Lightness", "Lightness")}
              hint={tx("0=黑, 50=纯色, 100=白", "0=black, 50=pure, 100=white")}
              min={0}
              max={100}
              value={hsl.l}
              onChange={(l) => setHsl({ ...hsl, l })}
            />
          </div>
        </div>
      </section>

      {/* Module 2: Harmony generator */}
      <section>
        <SectionHeader
          n="02"
          title={tx("配色和谐生成器", "Harmony Generator")}
          desc={tx(
            "从上面的基色出发,色轮上的固定角度会生成和谐的配色。点任意色板复制 CSS 变量。",
            "From the base color above, fixed angles on the wheel yield harmonious palettes. Click any to copy CSS variables.",
          )}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HARMONY_TYPES.map((type) => {
            const hexes = generateHarmony(hsl, type).map(hslToHex);
            const cssVars = `:root {\n${hexes
              .map((hex, i) => `  --color-${i + 1}: ${hex};`)
              .join("\n")}\n}`;
            const id = `harmony-${type}`;
            return (
              <div
                key={type}
                className="border border-border rounded-xl overflow-hidden bg-background hover:shadow-md transition-shadow"
              >
                <div className="flex h-24">
                  {hexes.map((hex, i) => (
                    <div key={i} className="flex-1" style={{ background: hex }} title={hex} />
                  ))}
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">
                    {locale === "zh" ? HARMONY_LABELS[type].zh : HARMONY_LABELS[type].en}
                  </span>
                  <button
                    onClick={() => copy(cssVars, id)}
                    className="text-xs px-2.5 py-1 rounded border border-border text-muted hover:text-foreground hover:border-foreground transition-colors"
                  >
                    {copied === id ? tx("已复制", "Copied") : tx("复制", "Copy")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Module 3: Contrast checker */}
      <section>
        <SectionHeader
          n="03"
          title={tx("对比度检查 (WCAG)", "Contrast Checker (WCAG)")}
          desc={tx(
            "文字与背景的对比度决定可读性。WCAG 要求正文至少 4.5:1 (AA),理想 7:1 (AAA)。",
            "Text-to-background contrast drives readability. WCAG wants at least 4.5:1 (AA) for body text, 7:1 (AAA) ideal.",
          )}
        />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div
            className="h-48 rounded-2xl border border-border flex items-center justify-center text-center p-6"
            style={{ background: bg, color: fg }}
          >
            <p className="text-2xl font-semibold">{tx("可读性预览 Aa", "Readability preview Aa")}</p>
          </div>
          <div className="space-y-5">
            <div className="flex gap-4">
              <ColorPicker label={tx("文字色", "Text")} value={fg} onChange={setFg} />
              <ColorPicker label={tx("背景色", "Background")} value={bg} onChange={setBg} />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold tabular-nums">
                {ratio.toFixed(2)}
                <span className="text-lg text-muted">:1</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  level === "Fail"
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                }`}
              >
                {level}
              </span>
            </div>
            <p className="text-sm text-muted">
              {level === "Fail"
                ? tx("对比度不足,正文不可读。", "Insufficient — body text fails.")
                : tx("通过,可安全用于文字。", "Passes — safe for text.")}
            </p>
          </div>
        </div>
      </section>

      {/* Module 4: Usage guide */}
      <section>
        <SectionHeader
          n="04"
          title={tx("选用指南", "Usage Guide")}
          desc={tx(
            "原理之外,几条经验法则能立刻让配色更专业。",
            "Beyond principles, a few rules of thumb make any palette look intentional.",
          )}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-2">{tx("60-30-10 法则", "The 60-30-10 Rule")}</h3>
            <p className="text-sm text-muted mb-4">
              {tx(
                "主色 60%、次色 30%、强调色 10% —— 平衡又有重点。",
                "60% dominant, 30% secondary, 10% accent — balanced with a focal point.",
              )}
            </p>
            <div className="flex h-10 rounded-lg overflow-hidden">
              <div className="w-[60%] bg-slate-700" />
              <div className="w-[30%] bg-slate-400" />
              <div className="w-[10%] bg-amber-500" />
            </div>
          </div>
          <div className="border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-2">{tx("暖色 vs 冷色", "Warm vs Cool")}</h3>
            <p className="text-sm text-muted mb-4">
              {tx(
                "暖色(红橙黄)前进、有活力;冷色(蓝绿紫)后退、显冷静。",
                "Warm hues advance and energize; cool hues recede and calm.",
              )}
            </p>
            <div className="flex gap-2">
              {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"].map((c) => (
                <div key={c} className="flex-1 h-10 rounded" style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="border border-border rounded-xl p-5 md:col-span-2">
            <h3 className="font-semibold mb-2">{tx("语义色", "Semantic Colors")}</h3>
            <p className="text-sm text-muted mb-4">
              {tx(
                "用户对这几种颜色有固定预期 —— 别违背它。",
                "Users carry fixed expectations for these — don't fight them.",
              )}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { c: "#22c55e", zh: "成功", en: "Success" },
                { c: "#eab308", zh: "警告", en: "Warning" },
                { c: "#ef4444", zh: "错误", en: "Error" },
                { c: "#3b82f6", zh: "信息", en: "Info" },
              ].map((s) => (
                <div key={s.en} className="rounded-lg border border-border overflow-hidden">
                  <div className="h-12" style={{ background: s.c }} />
                  <div className="px-3 py-2">
                    <div className="text-sm font-medium">{locale === "zh" ? s.zh : s.en}</div>
                    <div className="text-xs text-muted font-mono">{s.c}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

function Slider({
  label,
  hint,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  min: number;
  max: number;
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
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-foreground"
          aria-label={label}
        />
        <span className="text-sm font-mono tabular-nums w-10 text-right">{value}</span>
      </div>
    </div>
  );
}

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex-1">
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      <div className="flex items-center gap-2 border border-border rounded-lg px-2 py-1.5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
          aria-label={label}
        />
        <span className="text-sm font-mono">{value}</span>
      </div>
    </div>
  );
}
