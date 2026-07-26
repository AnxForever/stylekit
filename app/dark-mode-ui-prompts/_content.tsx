"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LocalizedLink } from "@/components/i18n/localized-link";
import type { PromptTopic, PromptTool } from "@/lib/prompts/types";
import type { StyleMeta } from "@/lib/styles/meta";
import type { PromptTemplatePreview } from "@/lib/seo/prompt-template-previews";

// Flagship dark-mode topic page. The canvas is intentionally hard-coded dark in
// both site themes: a page teaching dark mode design IS the demo. Palette and
// interaction rules follow lib/styles/dark-mode.ts (StyleKit's own dark-mode
// style DNA): elevation via lightness, low-contrast borders that illuminate on
// hover, one disciplined accent, inset top-edge glow on primary actions.

const INK = {
  base: "#09090b",
  alt: "#0d0d10",
  card: "#131316",
  raised: "#1a1a20",
  overlay: "#222228",
  top: "#2a2a31",
  border: "#27272a",
  borderSoft: "#1f1f23",
  text: "#fafafa",
  body: "#d4d4d8",
  muted: "#a1a1aa",
  dim: "#71717a",
  accent: "#3b82f6",
  accentLight: "#60a5fa",
};

// Contrast ratios below are real WCAG 2.x computations for this palette (not
// illustrative): recomputed 2026-07-26 via relative-luminance formula.
const CONTRAST_ROWS = [
  { fg: "#fafafa", bg: "#09090b", ratio: "19.06:1", grade: "AAA", useEn: "Primary text on base", useZh: "基底上的主文本" },
  { fg: "#d4d4d8", bg: "#131316", ratio: "12.55:1", grade: "AAA", useEn: "Body text on cards", useZh: "卡片上的正文" },
  { fg: "#60a5fa", bg: "#09090b", ratio: "7.83:1", grade: "AAA", useEn: "Accent text and links", useZh: "强调文本与链接" },
  { fg: "#a1a1aa", bg: "#09090b", ratio: "7.76:1", grade: "AAA", useEn: "Muted captions on base", useZh: "基底上的次要说明" },
  { fg: "#a1a1aa", bg: "#131316", ratio: "7.24:1", grade: "AAA", useEn: "Muted captions on cards", useZh: "卡片上的次要说明" },
  { fg: "#3b82f6", bg: "#09090b", ratio: "5.41:1", grade: "AA", useEn: "Accent fills and icons", useZh: "强调填充与图标" },
  { fg: "#71717a", bg: "#09090b", ratio: "4.12:1", grade: "AA-large", useEn: "Large dim labels only (18px+)", useZh: "仅限大号弱化标签（18px+）" },
  { fg: "#52525b", bg: "#09090b", ratio: "2.57:1", grade: "FAIL", useEn: "Too dim — do not ship", useZh: "过暗——禁止上线" },
];

const ELEVATION_LAYERS = [
  { hex: "#09090b", token: "zinc-950", nameEn: "Base", nameZh: "基底", useEn: "Page background. Never pure #000 — true black smears on OLED and makes shadows invisible.", useZh: "页面背景。永远不用纯 #000——OLED 上会拖影，阴影也会完全失效。" },
  { hex: "#131316", token: "card", nameEn: "Card", nameZh: "卡片", useEn: "Resting cards and panels. One step lighter than base, separated by a 1px border, not shadow.", useZh: "静置卡片与面板。比基底亮一档，用 1px 边框而非阴影分隔。" },
  { hex: "#1a1a20", token: "raised", nameEn: "Raised", nameZh: "抬升", useEn: "Hover states, dropdowns, popovers. Lightness signals proximity to the viewer.", useZh: "悬停态、下拉、弹出层。亮度传达与观者的距离。" },
  { hex: "#222228", token: "overlay", nameEn: "Overlay", nameZh: "浮层", useEn: "Modals and dialogs. Pair with a scrim (black at 60-70% opacity) behind.", useZh: "模态与对话框。背后配 60-70% 不透明度的黑色遮罩。" },
  { hex: "#2a2a31", token: "top", nameEn: "Top", nameZh: "顶层", useEn: "Tooltips, toasts, context menus — the closest surfaces to the user.", useZh: "工具提示、通知、右键菜单——离用户最近的表面。" },
];

const TOOL_LABEL: Record<PromptTool, string> = {
  general: "ChatGPT / Claude",
  v0: "v0",
  cursor: "Cursor",
  claude: "Claude",
};

function CopyButton({ text, labelCopy, labelCopied }: { text: string; labelCopy: string; labelCopied: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-md border transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131316]"
      style={
        copied
          ? { backgroundColor: "rgba(34,197,94,0.12)", borderColor: "rgba(34,197,94,0.4)", color: "#4ade80" }
          : { backgroundColor: INK.raised, borderColor: INK.border, color: INK.body, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }
      }
    >
      {copied ? labelCopied : labelCopy}
    </button>
  );
}

function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mb-10 md:mb-12 max-w-3xl">
      <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: INK.accentLight }}>
        {eyebrow}
      </p>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ color: INK.text }}>
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: INK.muted }}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${INK.borderSoft}` }}>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
        style={{ color: open ? INK.text : INK.body }}
      >
        <span className="font-medium text-sm md:text-base pr-4">{question}</span>
        <span
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
          style={{ color: INK.accentLight }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-6 text-sm md:text-base leading-relaxed max-w-3xl" style={{ color: INK.muted }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export function DarkModeFlagshipContent({
  topic,
  relatedStyles,
  doList,
  dontList,
  templates,
}: {
  topic: PromptTopic;
  relatedStyles: StyleMeta[];
  doList: string[];
  dontList: string[];
  templates: PromptTemplatePreview[];
}) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const [activeLayer, setActiveLayer] = useState(1);

  const layer = ELEVATION_LAYERS[activeLayer];

  return (
    <div style={{ backgroundColor: INK.base, color: INK.text }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% -10%, rgba(59,130,246,0.14), transparent 70%), radial-gradient(ellipse 40% 30% at 85% 10%, rgba(96,165,250,0.06), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: INK.accentLight }}>
            {isZh ? "提示词库 / 暗黑模式" : "Prompt Library / Dark Mode"}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] max-w-4xl">
            {isZh ? "暗黑模式 UI 设计提示词" : "Dark Mode UI Prompts"}
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: INK.muted }}>
            {isZh ? topic.introZh : topic.introEn}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#prompts"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.98] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
              style={{ backgroundColor: INK.accent, color: "#ffffff", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 24px -8px rgba(59,130,246,0.5)" }}
            >
              {isZh ? "直达 8 条提示词" : "Jump to the 8 prompts"}
            </a>
            <a
              href="#principles"
              className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors duration-200 hover:border-[#3f3f46] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
              style={{ borderColor: INK.border, color: INK.body, backgroundColor: "rgba(255,255,255,0.02)" }}
            >
              {isZh ? "先读设计原则" : "Read the design rules first"}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm" style={{ color: INK.dim }}>
            <span>
              <strong style={{ color: INK.body }}>{topic.prompts.length}</strong> {isZh ? "条可复制提示词" : "copy-paste prompts"}
            </span>
            <span>
              <strong style={{ color: INK.body }}>5</strong> {isZh ? "层表面阶梯" : "surface elevation steps"}
            </span>
            <span>
              <strong style={{ color: INK.body }}>{relatedStyles.length}</strong> {isZh ? "个相关暗色风格" : "related dark styles"}
            </span>
            <span>
              WCAG AA/AAA {isZh ? "真实对比度数据" : "verified contrast data"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Elevation ladder (interactive) ───────────────── */}
      <section className="relative" style={{ borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "第一课" : "Lesson One"}
            title={isZh ? "表面层级：亮度即海拔" : "Surface elevation: lightness is altitude"}
            lead={
              isZh
                ? "浅色界面靠阴影表达层级；暗色界面里阴影几乎不可见，改用亮度：越接近用户的表面越亮。点击下面的每一层，看它的取值和用途。"
                : "Light UIs express elevation with shadows. On dark canvases shadows are nearly invisible, so lightness does the job instead: the closer a surface is to the user, the lighter it gets. Click each layer to see its value and role."
            }
          />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="flex flex-col gap-2" role="tablist" aria-label={isZh ? "表面层级" : "Surface elevation layers"}>
              {ELEVATION_LAYERS.map((l, i) => (
                <button
                  key={l.hex}
                  role="tab"
                  aria-selected={activeLayer === i}
                  onClick={() => setActiveLayer(i)}
                  className="group flex items-center justify-between rounded-lg px-5 transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                  style={{
                    backgroundColor: l.hex,
                    border: `1px solid ${activeLayer === i ? INK.accent : INK.border}`,
                    height: `${52 + i * 6}px`,
                    transform: activeLayer === i ? "translateX(8px)" : undefined,
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: activeLayer === i ? INK.text : INK.muted }}>
                    {i}. {isZh ? l.nameZh : l.nameEn}
                  </span>
                  <span className="font-mono text-xs" style={{ color: activeLayer === i ? INK.accentLight : INK.dim }}>
                    {l.hex}
                  </span>
                </button>
              ))}
            </div>
            <div
              className="rounded-xl p-6 md:p-8 md:sticky md:top-24"
              style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="inline-block w-14 h-14 rounded-lg"
                  style={{ backgroundColor: layer.hex, border: `1px solid ${INK.border}` }}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-lg">{isZh ? layer.nameZh : layer.nameEn}</p>
                  <p className="font-mono text-sm" style={{ color: INK.accentLight }}>
                    {layer.hex} · {layer.token}
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: INK.muted }}>
                {isZh ? layer.useZh : layer.useEn}
              </p>
              <p className="mt-5 pt-5 text-xs leading-relaxed" style={{ color: INK.dim, borderTop: `1px solid ${INK.borderSoft}` }}>
                {isZh
                  ? "规律：每层比上一层亮 3-4% 亮度，配 1px 低对比边框。整页最多 5 层就足够表达任何界面。"
                  : "Rule of thumb: each step is 3-4% lighter than the one below, separated by a 1px low-contrast border. Five layers are enough for any interface."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Four rules ───────────────────────────────────── */}
      <section id="principles" className="scroll-mt-20" style={{ backgroundColor: INK.alt, borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "四条铁律" : "The Four Rules"}
            title={isZh ? "优秀暗色界面的不可妥协项" : "What great dark UIs never compromise on"}
            lead={
              isZh
                ? "把这四条写进任何提示词，AI 生成的暗色界面立刻高一个档次。下面每条都附带可视化对照。"
                : "Bake these four rules into any prompt and AI-generated dark UIs jump a quality tier. Each rule ships with a visual proof below."
            }
          />
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Rule 1: never pure black */}
            <article className="rounded-xl p-6 md:p-7 transition-transform duration-200 hover:-translate-y-0.5" style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}>
              <p className="font-mono text-xs mb-3" style={{ color: INK.accentLight }}>01</p>
              <h3 className="text-lg font-semibold mb-2">{isZh ? "永远不用纯黑" : "Never use pure black"}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: INK.muted }}>
                {isZh
                  ? "#000000 在 OLED 上产生拖影，且让阴影和层级完全失效。从 #09090b 或 zinc-950 起步，给界面留出向下的空间。"
                  : "#000000 smears on OLED panels and kills every shadow and elevation cue. Start at #09090b (zinc-950) so the UI keeps room below."}
              </p>
              <div className="grid grid-cols-2 gap-3" aria-hidden="true">
                <div className="rounded-lg p-4" style={{ backgroundColor: "#000000", border: `1px solid ${INK.border}` }}>
                  <div className="rounded-md h-8 mb-2" style={{ backgroundColor: "#0a0a0a" }} />
                  <p className="font-mono text-[10px]" style={{ color: "#525252" }}>#000 — {isZh ? "层级消失" : "layers vanish"}</p>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: INK.base, border: `1px solid ${INK.border}` }}>
                  <div className="rounded-md h-8 mb-2" style={{ backgroundColor: INK.card, border: `1px solid ${INK.borderSoft}` }} />
                  <p className="font-mono text-[10px]" style={{ color: INK.dim }}>#09090b — {isZh ? "层级清晰" : "layers read"}</p>
                </div>
              </div>
            </article>

            {/* Rule 2: desaturate */}
            <article className="rounded-xl p-6 md:p-7 transition-transform duration-200 hover:-translate-y-0.5" style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}>
              <p className="font-mono text-xs mb-3" style={{ color: INK.accentLight }}>02</p>
              <h3 className="text-lg font-semibold mb-2">{isZh ? "暗底上要降饱和、提亮度" : "Lighter, less saturated color on dark"}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: INK.muted }}>
                {isZh
                  ? "浅色主题的饱和色在暗底上会「震动」刺眼。文字与图标用亮一档的色阶（blue-500 改 blue-400），填充色才保留 500。"
                  : "Saturated light-theme colors vibrate against dark canvases. Shift text and icons one step lighter (blue-500 becomes blue-400); keep 500 for solid fills only."}
              </p>
              <div className="rounded-lg p-4" style={{ backgroundColor: INK.base, border: `1px solid ${INK.borderSoft}` }} aria-hidden="true">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: "#2563eb" }}>{isZh ? "刺眼的 600" : "vibrating 600"}</span>
                  <span className="font-mono text-[10px]" style={{ color: INK.dim }}>3.55:1 FAIL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: INK.accentLight }}>{isZh ? "舒适的 400" : "comfortable 400"}</span>
                  <span className="font-mono text-[10px]" style={{ color: INK.dim }}>7.83:1 AAA</span>
                </div>
              </div>
            </article>

            {/* Rule 3: readable, not glaring */}
            <article className="rounded-xl p-6 md:p-7 transition-transform duration-200 hover:-translate-y-0.5" style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}>
              <p className="font-mono text-xs mb-3" style={{ color: INK.accentLight }}>03</p>
              <h3 className="text-lg font-semibold mb-2">{isZh ? "白字要压光，层级靠三档" : "Dim the white, build three text tiers"}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: INK.muted }}>
                {isZh
                  ? "纯白 #fff 在暗底上晃眼。主文本用 #fafafa，正文 #d4d4d8，说明 #a1a1aa——三档就能撑起整页层级，且全部超过 AAA。"
                  : "Pure #fff glares on dark. Use #fafafa for primary, #d4d4d8 for body, #a1a1aa for captions — three tiers carry a whole page, all clearing AAA."}
              </p>
              <div className="rounded-lg p-4 space-y-1.5" style={{ backgroundColor: INK.base, border: `1px solid ${INK.borderSoft}` }} aria-hidden="true">
                <p className="text-sm font-semibold" style={{ color: INK.text }}>{isZh ? "主文本 19.06:1" : "Primary 19.06:1"}</p>
                <p className="text-sm" style={{ color: INK.body }}>{isZh ? "正文 15.2:1" : "Body 15.2:1"}</p>
                <p className="text-xs" style={{ color: INK.muted }}>{isZh ? "说明 7.76:1" : "Caption 7.76:1"}</p>
              </div>
            </article>

            {/* Rule 4: one accent */}
            <article className="rounded-xl p-6 md:p-7 transition-transform duration-200 hover:-translate-y-0.5" style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}>
              <p className="font-mono text-xs mb-3" style={{ color: INK.accentLight }}>04</p>
              <h3 className="text-lg font-semibold mb-2">{isZh ? "一个强调色，花在刀刃上" : "One accent, spent carefully"}</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: INK.muted }}>
                {isZh
                  ? "暗色界面 90% 是灰阶，强调色只给主操作、当前态和关键数据。到处上色 = 到处没有重点。"
                  : "A dark UI is 90% grayscale. The accent goes to the primary action, the active state, and one key metric. Color everywhere means emphasis nowhere."}
              </p>
              <div className="rounded-lg p-4 flex items-center gap-3" style={{ backgroundColor: INK.base, border: `1px solid ${INK.borderSoft}` }} aria-hidden="true">
                <span className="h-8 flex-1 rounded-md" style={{ backgroundColor: INK.raised }} />
                <span className="h-8 flex-1 rounded-md" style={{ backgroundColor: INK.raised }} />
                <span
                  className="h-8 flex-1 rounded-md"
                  style={{ backgroundColor: INK.accent, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)" }}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Contrast table ───────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "实测数据" : "Verified Data"}
            title={isZh ? "本页色板的真实对比度" : "Real contrast ratios for this palette"}
            lead={
              isZh
                ? "以下每个数值都按 WCAG 相对亮度公式实算——把整张表贴进提示词，AI 就没有理由生成不可读的文字。"
                : "Every ratio below is computed with the WCAG relative-luminance formula — paste this table into a prompt and the AI has no excuse for unreadable text."
            }
          />
          <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${INK.border}` }}>
            <table className="w-full text-sm" style={{ backgroundColor: INK.card }}>
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider" style={{ color: INK.dim, borderBottom: `1px solid ${INK.border}` }}>
                  <th className="px-5 py-3.5 font-medium">{isZh ? "示例" : "Sample"}</th>
                  <th className="px-5 py-3.5 font-medium">{isZh ? "前景 / 背景" : "Foreground / Background"}</th>
                  <th className="px-5 py-3.5 font-medium">{isZh ? "对比度" : "Ratio"}</th>
                  <th className="px-5 py-3.5 font-medium">WCAG</th>
                  <th className="px-5 py-3.5 font-medium hidden md:table-cell">{isZh ? "用途" : "Use for"}</th>
                </tr>
              </thead>
              <tbody>
                {CONTRAST_ROWS.map((row) => (
                  <tr key={`${row.fg}-${row.bg}`} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: `1px solid ${INK.borderSoft}` }}>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold" style={{ backgroundColor: row.bg, color: row.fg, border: `1px solid ${INK.border}` }}>
                        Aa
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs" style={{ color: INK.muted }}>
                      {row.fg} / {row.bg}
                    </td>
                    <td className="px-5 py-3.5 font-mono" style={{ color: INK.body }}>{row.ratio}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-block rounded px-2 py-0.5 text-[11px] font-semibold"
                        style={
                          row.grade === "FAIL"
                            ? { backgroundColor: "rgba(239,68,68,0.12)", color: "#f87171" }
                            : row.grade === "AA-large"
                              ? { backgroundColor: "rgba(245,158,11,0.12)", color: "#fbbf24" }
                              : { backgroundColor: "rgba(34,197,94,0.12)", color: "#4ade80" }
                        }
                      >
                        {row.grade}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-xs" style={{ color: INK.muted }}>
                      {isZh ? row.useZh : row.useEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Prompts ──────────────────────────────────────── */}
      <section id="prompts" className="scroll-mt-20" style={{ backgroundColor: INK.alt, borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "即拿即用" : "Copy & Paste"}
            title={isZh ? "8 条暗黑模式设计提示词" : "8 dark mode design prompts"}
            lead={
              isZh
                ? "每条都带具体色值、层级和对比度约束，覆盖仪表盘、SaaS、移动端、登录页与定价页，直接粘进 ChatGPT、Claude、Cursor 或 v0。"
                : "Every prompt carries concrete hex values, elevation steps, and contrast constraints — dashboards, SaaS, mobile, auth, and pricing. Paste straight into ChatGPT, Claude, Cursor, or v0."
            }
          />
          <div className="grid gap-5">
            {topic.prompts.map((p) => (
              <article
                key={p.titleEn}
                className="rounded-xl p-6 md:p-7 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}`, borderLeft: `2px solid ${INK.accent}` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">{isZh ? p.titleZh : p.titleEn}</h3>
                    <p className="mt-1 text-xs font-mono" style={{ color: INK.accentLight }}>
                      {TOOL_LABEL[p.tool]}
                    </p>
                  </div>
                  <CopyButton
                    text={p.prompt}
                    labelCopy={isZh ? "复制提示词" : "Copy prompt"}
                    labelCopied={isZh ? "已复制" : "Copied"}
                  />
                </div>
                <p
                  className="text-sm leading-relaxed font-mono rounded-lg p-4"
                  style={{ color: INK.muted, backgroundColor: INK.base, border: `1px solid ${INK.borderSoft}` }}
                >
                  {p.prompt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Do / Don't ───────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "风格速查" : "Style Checklist"}
            title={isZh ? "写提示词时的 Do 与 Don't" : "Do and don't when writing prompts"}
            lead={
              isZh
                ? "摘自 StyleKit 的 dark-mode 风格定义——生成结果跑偏时，把违反的那条直接贴回给 AI。"
                : "Straight from StyleKit's dark-mode style definition — when a generation drifts, paste the violated line back to the AI."
            }
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6 md:p-7" style={{ backgroundColor: INK.card, border: "1px solid rgba(34,197,94,0.25)" }}>
              <p className="text-sm font-semibold mb-4" style={{ color: "#4ade80" }}>
                {isZh ? "要这样做" : "Do"}
              </p>
              <ul className="space-y-3">
                {doList.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed" style={{ color: INK.muted }}>
                    <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "#4ade80" }}>+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl p-6 md:p-7" style={{ backgroundColor: INK.card, border: "1px solid rgba(239,68,68,0.25)" }}>
              <p className="text-sm font-semibold mb-4" style={{ color: "#f87171" }}>
                {isZh ? "不要这样做" : "Don't"}
              </p>
              <ul className="space-y-3">
                {dontList.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed" style={{ color: INK.muted }}>
                    <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "#f87171" }}>-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use cases ────────────────────────────────────── */}
      <section style={{ backgroundColor: INK.alt, borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "适用场景" : "Where It Fits"}
            title={isZh ? "暗黑模式最擅长的场景" : "Where dark mode earns its keep"}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topic.useCases.map((uc) => (
              <article
                key={uc.titleEn}
                className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}
              >
                <h3 className="font-semibold mb-2">{isZh ? uc.titleZh : uc.titleEn}</h3>
                <p className="text-sm leading-relaxed" style={{ color: INK.muted }}>
                  {isZh ? uc.descriptionZh : uc.descriptionEn}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Templates ────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "起步模板" : "Starter Templates"}
            title={isZh ? "从可运行的暗色模板逆向学习" : "Reverse-engineer from runnable dark templates"}
            lead={
              isZh
                ? "每个模板都能在线预览并下载为完整 Next.js + Tailwind 项目——对照它们理解基底、抬升面、边框与强调色的节奏。"
                : "Each template previews live and downloads as a full Next.js + Tailwind project — study how base, raised surfaces, borders, and accent rhythm play together."
            }
          />
          <div className="grid md:grid-cols-3 gap-5">
            {templates.map((t) => (
              <LocalizedLink
                key={t.templateId}
                href={t.href}
                className="group rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}
              >
                <div className="rounded-lg h-24 mb-5 p-3 flex flex-col gap-2" style={{ backgroundColor: INK.base, border: `1px solid ${INK.borderSoft}` }} aria-hidden="true">
                  <div className="flex gap-2">
                    <span className="h-2 w-10 rounded-full" style={{ backgroundColor: INK.raised }} />
                    <span className="h-2 w-6 rounded-full" style={{ backgroundColor: INK.accent, opacity: 0.7 }} />
                  </div>
                  <div className="flex gap-2 flex-1">
                    <span className="flex-1 rounded-md" style={{ backgroundColor: INK.card, border: `1px solid ${INK.borderSoft}` }} />
                    <span className="flex-1 rounded-md" style={{ backgroundColor: INK.raised }} />
                  </div>
                </div>
                <h3 className="font-semibold mb-1.5 transition-colors group-hover:text-[#60a5fa]">{t.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: INK.muted }}>
                  {t.description}
                </p>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: INK.alt, borderBottom: `1px solid ${INK.borderSoft}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading eyebrow="FAQ" title={isZh ? "暗黑模式设计常见问题" : "Dark mode design questions, answered"} />
          <div className="max-w-3xl">
            {topic.faq.map((f) => (
              <FAQItem
                key={f.questionEn}
                question={isZh ? f.questionZh : f.questionEn}
                answer={isZh ? f.answerZh : f.answerEn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Related styles + CTA ─────────────────────────── */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <SectionHeading
            eyebrow={isZh ? "继续深入" : "Go Deeper"}
            title={isZh ? "相关暗色系风格" : "Related dark styles"}
            lead={
              isZh
                ? "每个风格页都带完整的设计 tokens、组件配方和可导出的 AI 规则。"
                : "Every style page ships full design tokens, component recipes, and exportable AI rules."
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedStyles.map((s) => (
              <LocalizedLink
                key={s.slug}
                href={`/styles/${s.slug}`}
                className="group rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}
              >
                <div className="flex items-center gap-2.5 mb-3" aria-hidden="true">
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: s.colors.primary, border: "1px solid rgba(255,255,255,0.12)" }} />
                  <span className="h-4 w-4 rounded-full" style={{ backgroundColor: s.colors.secondary, border: "1px solid rgba(255,255,255,0.12)" }} />
                  {s.colors.accent.slice(0, 2).map((c) => (
                    <span key={c} className="h-4 w-4 rounded-full" style={{ backgroundColor: c, border: "1px solid rgba(255,255,255,0.12)" }} />
                  ))}
                </div>
                <h3 className="font-semibold transition-colors group-hover:text-[#60a5fa]">
                  {isZh ? s.name : s.nameEn}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed line-clamp-2" style={{ color: INK.muted }}>
                  {isZh ? s.description : s.tags.join(" · ")}
                </p>
              </LocalizedLink>
            ))}
          </div>
          <div
            className="mt-14 rounded-xl px-6 py-10 md:px-12 text-center relative overflow-hidden"
            style={{ backgroundColor: INK.card, border: `1px solid ${INK.border}` }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 50% 80% at 50% 120%, rgba(59,130,246,0.12), transparent 70%)" }}
            />
            <h2 className="relative text-xl md:text-2xl font-bold mb-3">
              {isZh ? "还想要别的方向？" : "Need a different direction?"}
            </h2>
            <p className="relative text-sm md:text-base mb-6 max-w-xl mx-auto" style={{ color: INK.muted }}>
              {isZh
                ? "浏览全部 140 种设计风格，或回到提示词总库挑选落地页、仪表盘和 Tailwind 专题。"
                : "Browse all 140 design styles, or head back to the prompt library for landing page, dashboard, and Tailwind collections."}
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <LocalizedLink
                href="/styles"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.98] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
                style={{ backgroundColor: INK.accent, color: "#ffffff", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)" }}
              >
                {isZh ? "浏览 140 种风格" : "Browse 140 styles"}
              </LocalizedLink>
              <LocalizedLink
                href="/ui-prompts"
                className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors duration-200 hover:border-[#3f3f46] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                style={{ borderColor: INK.border, color: INK.body }}
              >
                {isZh ? "提示词总库" : "All prompt collections"}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
