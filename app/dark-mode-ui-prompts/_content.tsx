"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LocalizedLink } from "@/components/i18n/localized-link";
import type { PromptTopic, PromptTool } from "@/lib/prompts/types";
import type { StyleMeta } from "@/lib/styles/meta";
import type { PromptTemplatePreview } from "@/lib/seo/prompt-template-previews";

// Flagship dark-mode topic page, art-directed as a nocturnal spec sheet:
// serif display headings (site-wide display face), monospaced data skeleton,
// hairline rules, square corners, numbered sections, and a disciplined single
// accent. The canvas is hard-coded dark in both site themes — a page teaching
// dark mode design is its own demo. Values follow lib/styles/dark-mode.ts.

const INK = {
  base: "#0a0a0c",
  alt: "#0e0e11",
  panel: "#121216",
  raised: "#1a1a20",
  line: "#212127",
  lineSoft: "#1a1a1f",
  text: "#f4f4f5",
  body: "#c8c8cd",
  muted: "#9d9da6",
  dim: "#6e6e78",
  faint: "#3f3f46",
  accent: "#3b82f6",
  accentLight: "#7aa7f8",
};

// Real WCAG 2.x ratios for this palette — recomputed 2026-07-26 with the
// relative-luminance formula, not illustrative numbers.
const CONTRAST_ROWS = [
  { fg: "#fafafa", bg: "#09090b", ratio: "19.06", grade: "AAA", useEn: "Primary text on base", useZh: "基底上的主文本" },
  { fg: "#d4d4d8", bg: "#131316", ratio: "12.55", grade: "AAA", useEn: "Body text on panels", useZh: "面板上的正文" },
  { fg: "#60a5fa", bg: "#09090b", ratio: "7.83", grade: "AAA", useEn: "Accent text, links", useZh: "强调文本与链接" },
  { fg: "#a1a1aa", bg: "#09090b", ratio: "7.76", grade: "AAA", useEn: "Captions on base", useZh: "基底上的说明文字" },
  { fg: "#a1a1aa", bg: "#131316", ratio: "7.24", grade: "AAA", useEn: "Captions on panels", useZh: "面板上的说明文字" },
  { fg: "#3b82f6", bg: "#09090b", ratio: "5.41", grade: "AA", useEn: "Accent fills, icons", useZh: "强调填充与图标" },
  { fg: "#71717a", bg: "#09090b", ratio: "4.12", grade: "AA-LG", useEn: "Large dim labels only, 18px+", useZh: "仅限大号弱化标签，18px+" },
  { fg: "#52525b", bg: "#09090b", ratio: "2.57", grade: "FAIL", useEn: "Too dim — never ship this", useZh: "过暗——禁止上线" },
];

const ELEVATION_LAYERS = [
  { hex: "#09090b", token: "zinc-950", nameEn: "Base", nameZh: "基底", useEn: "Page background. Never pure #000 — true black smears on OLED and erases every shadow cue.", useZh: "页面背景。永远不用纯 #000——OLED 上会拖影，所有阴影线索也随之消失。" },
  { hex: "#131316", token: "card", nameEn: "Card", nameZh: "卡片", useEn: "Resting cards and panels. One step lighter than base, separated by a 1px border, not shadow.", useZh: "静置卡片与面板。比基底亮一档，用 1px 边框而非阴影分隔。" },
  { hex: "#1a1a20", token: "raised", nameEn: "Raised", nameZh: "抬升", useEn: "Hover states, dropdowns, popovers. Lightness signals proximity to the viewer.", useZh: "悬停态、下拉、弹出层。亮度传达与观者的距离。" },
  { hex: "#222228", token: "overlay", nameEn: "Overlay", nameZh: "浮层", useEn: "Modals and dialogs, over a black scrim at 60-70% opacity.", useZh: "模态与对话框，背后配 60-70% 不透明度的黑色遮罩。" },
  { hex: "#2a2a31", token: "top", nameEn: "Top", nameZh: "顶层", useEn: "Tooltips, toasts, context menus — the surfaces closest to the user.", useZh: "工具提示、通知、右键菜单——离用户最近的表面。" },
];

const TOOL_LABEL: Record<PromptTool, string> = {
  general: "CHATGPT / CLAUDE",
  v0: "V0",
  cursor: "CURSOR",
  claude: "CLAUDE",
};

const SECTIONS = [
  { id: "elevation", en: "Elevation", zh: "表面层级" },
  { id: "rules", en: "Four rules", zh: "四条铁律" },
  { id: "contrast", en: "Contrast", zh: "对比度" },
  { id: "prompts", en: "Prompts", zh: "提示词" },
  { id: "checklist", en: "Do / Don't", zh: "取舍清单" },
  { id: "references", en: "References", zh: "参考资源" },
  { id: "faq", en: "FAQ", zh: "常见问题" },
];

function num(i: number) {
  return String(i + 1).padStart(2, "0");
}

function SectionHead({ index, title, lead, isZh }: { index: number; title: string; lead?: string; isZh: boolean }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.2em]" style={{ color: INK.accentLight }}>
          {num(index)}
        </span>
        <h2 className="text-2xl md:text-[2.5rem] leading-tight" style={{ color: INK.text }}>
          {title}
        </h2>
        <span aria-hidden="true" className="hidden md:block flex-1 self-center" style={{ borderTop: `1px solid ${INK.lineSoft}` }} />
      </div>
      {lead ? (
        <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-[1.75] md:ml-[calc(2rem+1rem)]" style={{ color: INK.muted }}>
          {lead}
        </p>
      ) : null}
      <span className="sr-only">{isZh ? "章节" : "section"}</span>
    </div>
  );
}

function CopyButton({ text, isZh }: { text: string; isZh: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 font-mono text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
      style={
        copied
          ? { border: "1px solid rgba(74,222,128,0.5)", color: "#4ade80" }
          : { border: `1px solid ${INK.line}`, color: INK.muted }
      }
      onMouseEnter={(e) => { if (!copied) (e.currentTarget as HTMLButtonElement).style.color = INK.text; }}
      onMouseLeave={(e) => { if (!copied) (e.currentTarget as HTMLButtonElement).style.color = INK.muted; }}
    >
      {copied ? (isZh ? "已复制" : "Copied") : (isZh ? "复制" : "Copy")}
    </button>
  );
}

function FAQItem({ index, question, answer }: { index: number; question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${INK.lineSoft}` }}>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="w-full grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-2 py-5 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
      >
        <span className="font-mono text-xs" style={{ color: INK.dim }}>{num(index)}</span>
        <span className="text-[15px] md:text-base font-medium pr-4" style={{ color: open ? INK.text : INK.body }}>
          {question}
        </span>
        <span aria-hidden="true" className="font-mono text-sm" style={{ color: open ? INK.accentLight : INK.dim }}>
          {open ? "—" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-7 pl-10 max-w-2xl text-sm md:text-[15px] leading-[1.8]" style={{ color: INK.muted }}>
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
  const [openPrompt, setOpenPrompt] = useState<number | null>(0);

  const layer = ELEVATION_LAYERS[activeLayer];

  const rules = [
    {
      tEn: "Never use pure black", tZh: "永远不用纯黑",
      bEn: "#000000 smears on OLED panels and erases every shadow and elevation cue. Start at #09090b so the interface keeps room below itself.",
      bZh: "#000000 在 OLED 上产生拖影，并让所有阴影与层级线索失效。从 #09090b 起步，给界面留出向下的空间。",
      spec: (
        <div className="grid grid-cols-2" style={{ border: `1px solid ${INK.line}` }} aria-hidden="true">
          <div className="p-4" style={{ backgroundColor: "#000000" }}>
            <div className="h-7 mb-2" style={{ backgroundColor: "#0a0a0a" }} />
            <p className="font-mono text-[10px]" style={{ color: "#4b4b52" }}>#000000</p>
          </div>
          <div className="p-4" style={{ backgroundColor: "#09090b", borderLeft: `1px solid ${INK.line}` }}>
            <div className="h-7 mb-2" style={{ backgroundColor: "#131316", borderTop: "1px solid #212127" }} />
            <p className="font-mono text-[10px]" style={{ color: INK.dim }}>#09090b</p>
          </div>
        </div>
      ),
    },
    {
      tEn: "Lighter, less saturated color", tZh: "降饱和、提亮度",
      bEn: "Saturated light-theme colors vibrate against dark canvases. Shift text and icons one step lighter — blue-500 becomes blue-400 — and keep 500 for solid fills only.",
      bZh: "浅色主题的饱和色在暗底上会「震动」刺眼。文字与图标提亮一档——blue-500 改 blue-400——填充色才保留 500。",
      spec: (
        <div className="p-4 space-y-2.5" style={{ border: `1px solid ${INK.line}`, backgroundColor: "#09090b" }} aria-hidden="true">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm" style={{ color: "#2563eb" }}>blue-600</span>
            <span className="font-mono text-[10px]" style={{ color: "#8a5a5e" }}>3.55 FAIL</span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm" style={{ color: "#60a5fa" }}>blue-400</span>
            <span className="font-mono text-[10px]" style={{ color: INK.dim }}>7.83 AAA</span>
          </div>
        </div>
      ),
    },
    {
      tEn: "Dim the white, keep three tiers", tZh: "白字压光，三档层级",
      bEn: "Pure #fff glares on dark. Use #fafafa for primary, #d4d4d8 for body, #a1a1aa for captions — three tiers carry an entire page, all clearing AAA.",
      bZh: "纯白在暗底上晃眼。主文本 #fafafa、正文 #d4d4d8、说明 #a1a1aa——三档撑起整页层级，全部超过 AAA。",
      spec: (
        <div className="p-4 space-y-1.5" style={{ border: `1px solid ${INK.line}`, backgroundColor: "#09090b" }} aria-hidden="true">
          <p className="text-sm" style={{ color: "#fafafa" }}>{"primary"} <span className="font-mono text-[10px]" style={{ color: INK.dim }}>19.06</span></p>
          <p className="text-sm" style={{ color: "#d4d4d8" }}>{"body"} <span className="font-mono text-[10px]" style={{ color: INK.dim }}>15.20</span></p>
          <p className="text-sm" style={{ color: "#a1a1aa" }}>{"caption"} <span className="font-mono text-[10px]" style={{ color: INK.dim }}>7.76</span></p>
        </div>
      ),
    },
    {
      tEn: "One accent, spent carefully", tZh: "一个强调色，花在刀刃上",
      bEn: "A dark interface is 90% grayscale. The accent goes to the primary action, the active state, and one key metric. Color everywhere is emphasis nowhere.",
      bZh: "暗色界面 90% 是灰阶。强调色只给主操作、当前态和一个关键数据。到处上色等于到处没有重点。",
      spec: (
        <div className="p-4 flex items-center gap-2" style={{ border: `1px solid ${INK.line}`, backgroundColor: "#09090b" }} aria-hidden="true">
          <span className="h-7 flex-1" style={{ backgroundColor: INK.panel, border: `1px solid ${INK.lineSoft}` }} />
          <span className="h-7 flex-1" style={{ backgroundColor: INK.panel, border: `1px solid ${INK.lineSoft}` }} />
          <span className="h-7 flex-1" style={{ backgroundColor: INK.accent }} />
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: INK.base, color: INK.text }}>
      {/* ── Section index (sticky) ───────────────────────── */}
      <nav
        aria-label={isZh ? "章节目录" : "Section index"}
        className="sticky top-0 z-30 backdrop-blur-md overflow-x-auto"
        style={{ backgroundColor: "rgba(10,10,12,0.88)", borderBottom: `1px solid ${INK.lineSoft}` }}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-6 h-11 whitespace-nowrap">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-150 hover:text-[#f4f4f5]"
              style={{ color: INK.dim }}
            >
              <span style={{ color: INK.faint }}>{num(i)}</span> {isZh ? s.zh : s.en}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Cover ────────────────────────────────────────── */}
      <header style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-14 md:pb-20">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: INK.dim }}>
                StyleKit · {isZh ? "暗色设计规格与提示词" : "Dark interface spec & prompts"}
              </p>
              <h1 className="text-[2.6rem] md:text-[4rem] leading-[1.05]" style={{ color: INK.text }}>
                {isZh ? "暗黑模式 UI 提示词" : "Dark Mode UI Prompts"}
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] md:text-base leading-[1.8]" style={{ color: INK.muted }}>
                {isZh ? topic.introZh : topic.introEn}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: INK.dim }}>
                <span>{topic.prompts.length} {isZh ? "条提示词" : "prompts"}</span>
                <span>5 {isZh ? "层表面" : "surfaces"}</span>
                <span>WCAG {isZh ? "实测" : "verified"}</span>
                <span>EN / ZH</span>
              </div>
            </div>
            {/* Print-style color bar: the elevation scale as a proof strip */}
            <div className="hidden md:flex flex-col w-40" aria-hidden="true" style={{ border: `1px solid ${INK.line}` }}>
              {ELEVATION_LAYERS.map((l, i) => (
                <div
                  key={l.hex}
                  className="flex items-center justify-between px-3 h-12"
                  style={{ backgroundColor: l.hex, borderTop: i === 0 ? undefined : `1px solid ${INK.lineSoft}` }}
                >
                  <span className="font-mono text-[10px]" style={{ color: INK.dim }}>{num(i)}</span>
                  <span className="font-mono text-[10px]" style={{ color: INK.muted }}>{l.hex}</span>
                </div>
              ))}
              <div className="px-3 py-2" style={{ borderTop: `1px solid ${INK.line}` }}>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: INK.faint }}>
                  {isZh ? "表面色阶" : "surface scale"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 01 Elevation ─────────────────────────────────── */}
      <section id="elevation" className="scroll-mt-16" style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <SectionHead
            index={0}
            isZh={isZh}
            title={isZh ? "表面层级：亮度即海拔" : "Elevation: lightness is altitude"}
            lead={
              isZh
                ? "浅色界面靠阴影表达层级；暗色界面里阴影几乎不可见，改用亮度——越接近用户的表面越亮。选择任意一层查看取值与用途。"
                : "Light UIs express elevation with shadows. On dark canvases shadows are nearly invisible, so lightness does the job — the closer a surface sits to the user, the lighter it gets. Select a layer to read its value and role."
            }
          />
          <div className="grid md:grid-cols-2" style={{ border: `1px solid ${INK.line}` }}>
            <div role="tablist" aria-label={isZh ? "表面层级" : "Elevation layers"} className="flex flex-col">
              {ELEVATION_LAYERS.map((l, i) => (
                <button
                  key={l.hex}
                  role="tab"
                  aria-selected={activeLayer === i}
                  onClick={() => setActiveLayer(i)}
                  className="flex items-center justify-between px-5 py-4 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#3b82f6]"
                  style={{
                    backgroundColor: l.hex,
                    borderTop: i === 0 ? undefined : `1px solid ${INK.lineSoft}`,
                    boxShadow: activeLayer === i ? `inset 2px 0 0 ${INK.accent}` : undefined,
                  }}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px]" style={{ color: activeLayer === i ? INK.accentLight : INK.faint }}>{num(i)}</span>
                    <span className="text-sm font-medium" style={{ color: activeLayer === i ? INK.text : INK.muted }}>
                      {isZh ? l.nameZh : l.nameEn}
                    </span>
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: activeLayer === i ? INK.muted : INK.faint }}>{l.hex}</span>
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8" style={{ backgroundColor: INK.alt, borderLeft: `1px solid ${INK.line}` }}>
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase mb-6 flex justify-between" style={{ color: INK.dim }}>
                <span>{isZh ? "规格" : "Spec"} {num(activeLayer)}</span>
                <span>{layer.token}</span>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <span className="inline-block w-12 h-12" style={{ backgroundColor: layer.hex, border: `1px solid ${INK.line}` }} aria-hidden="true" />
                <div>
                  <p className="text-lg" style={{ color: INK.text }}>{isZh ? layer.nameZh : layer.nameEn}</p>
                  <p className="font-mono text-xs" style={{ color: INK.muted }}>{layer.hex}</p>
                </div>
              </div>
              <p className="text-sm leading-[1.8]" style={{ color: INK.muted }}>
                {isZh ? layer.useZh : layer.useEn}
              </p>
              <p className="mt-6 pt-5 font-mono text-[11px] leading-[1.7]" style={{ color: INK.dim, borderTop: `1px solid ${INK.lineSoft}` }}>
                {isZh
                  ? "规律：每层比下一层亮约 3-4%，以 1px 低对比边框分隔。五层足以表达任何界面。"
                  : "Rule: each step is ~3-4% lighter than the one below, separated by a 1px low-contrast border. Five layers cover any interface."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Rules ─────────────────────────────────────── */}
      <section id="rules" className="scroll-mt-16" style={{ backgroundColor: INK.alt, borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <SectionHead
            index={1}
            isZh={isZh}
            title={isZh ? "四条铁律" : "The four rules"}
            lead={
              isZh
                ? "把这四条写进任何提示词，AI 生成的暗色界面立刻高一个档次。每条附带取值证明。"
                : "Write these four into any prompt and AI-generated dark UIs jump a quality tier. Each rule ships with its proof."
            }
          />
          <div>
            {rules.map((r, i) => (
              <article
                key={r.tEn}
                className="grid md:grid-cols-[2.5rem_1fr_260px] gap-x-6 gap-y-4 py-8 md:py-10 items-start"
                style={{ borderTop: `1px solid ${INK.lineSoft}` }}
              >
                <span className="font-mono text-xs pt-1" style={{ color: INK.dim }}>{num(i)}</span>
                <div>
                  <h3 className="text-lg md:text-xl mb-2.5" style={{ color: INK.text }}>
                    {isZh ? r.tZh : r.tEn}
                  </h3>
                  <p className="max-w-xl text-sm md:text-[15px] leading-[1.8]" style={{ color: INK.muted }}>
                    {isZh ? r.bZh : r.bEn}
                  </p>
                </div>
                <div className="md:justify-self-end w-full max-w-[260px]">{r.spec}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Contrast ──────────────────────────────────── */}
      <section id="contrast" className="scroll-mt-16" style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <SectionHead
            index={2}
            isZh={isZh}
            title={isZh ? "实测对比度" : "Verified contrast"}
            lead={
              isZh
                ? "以下每个数值都按 WCAG 相对亮度公式实算。把整张表贴进提示词，AI 就没有理由生成不可读的文字。"
                : "Every ratio below is computed with the WCAG relative-luminance formula. Paste the table into a prompt and the AI has no excuse for unreadable text."
            }
          />
          <div className="overflow-x-auto" style={{ border: `1px solid ${INK.line}` }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: INK.dim }}>
                  <th className="px-4 py-3 font-normal" style={{ borderBottom: `1px solid ${INK.line}` }}>Aa</th>
                  <th className="px-4 py-3 font-normal" style={{ borderBottom: `1px solid ${INK.line}` }}>{isZh ? "前景 / 背景" : "FG / BG"}</th>
                  <th className="px-4 py-3 font-normal text-right" style={{ borderBottom: `1px solid ${INK.line}` }}>{isZh ? "对比度" : "Ratio"}</th>
                  <th className="px-4 py-3 font-normal" style={{ borderBottom: `1px solid ${INK.line}` }}>WCAG</th>
                  <th className="px-4 py-3 font-normal hidden md:table-cell" style={{ borderBottom: `1px solid ${INK.line}` }}>{isZh ? "用途" : "Use"}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {CONTRAST_ROWS.map((row, i) => (
                  <tr key={`${row.fg}-${row.bg}`} className="transition-colors duration-150 hover:bg-white/[0.025]">
                    <td className="px-4 py-3" style={{ borderTop: i === 0 ? undefined : `1px solid ${INK.lineSoft}` }}>
                      <span className="inline-flex items-center justify-center w-9 h-7 text-[11px] font-sans font-semibold" style={{ backgroundColor: row.bg, color: row.fg, border: `1px solid ${INK.line}` }}>
                        Aa
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: INK.dim, borderTop: i === 0 ? undefined : `1px solid ${INK.lineSoft}` }}>
                      {row.fg} <span style={{ color: INK.faint }}>/</span> {row.bg}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums" style={{ color: INK.body, borderTop: i === 0 ? undefined : `1px solid ${INK.lineSoft}` }}>
                      {row.ratio}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{
                        borderTop: i === 0 ? undefined : `1px solid ${INK.lineSoft}`,
                        color: row.grade === "FAIL" ? "#e57373" : row.grade === "AA-LG" ? "#d4a94f" : INK.muted,
                      }}
                    >
                      {row.grade}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell font-sans" style={{ color: INK.dim, borderTop: i === 0 ? undefined : `1px solid ${INK.lineSoft}` }}>
                      {isZh ? row.useZh : row.useEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 04 Prompts ───────────────────────────────────── */}
      <section id="prompts" className="scroll-mt-16" style={{ backgroundColor: INK.alt, borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <SectionHead
            index={3}
            isZh={isZh}
            title={isZh ? "八条提示词" : "The eight prompts"}
            lead={
              isZh
                ? "每条都带具体色值、层级与对比度约束——仪表盘、SaaS、移动端、登录与定价页。展开查看全文，复制后直接粘进 ChatGPT、Claude、Cursor 或 v0。"
                : "Each one carries concrete hex values, elevation steps, and contrast constraints — dashboards, SaaS, mobile, auth, pricing. Expand to read, copy, and paste straight into ChatGPT, Claude, Cursor, or v0."
            }
          />
          <div style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
            {topic.prompts.map((p, i) => {
              const open = openPrompt === i;
              return (
                <div key={p.titleEn} style={{ borderTop: `1px solid ${INK.lineSoft}` }}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={open}
                    onClick={() => setOpenPrompt(open ? null : i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenPrompt(open ? null : i);
                      }
                    }}
                    className="grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[2.5rem_1fr_150px_auto_auto] items-center gap-3 md:gap-4 py-4 cursor-pointer transition-colors duration-150 hover:bg-white/[0.02] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#3b82f6]"
                  >
                    <span className="font-mono text-xs pl-0.5" style={{ color: open ? INK.accentLight : INK.dim }}>{num(i)}</span>
                    <span className="text-[15px] font-medium" style={{ color: open ? INK.text : INK.body }}>
                      {isZh ? p.titleZh : p.titleEn}
                    </span>
                    <span className="hidden md:block font-mono text-[10px] tracking-[0.14em]" style={{ color: INK.dim }}>
                      {TOOL_LABEL[p.tool]}
                    </span>
                    <CopyButton text={p.prompt} isZh={isZh} />
                    <span aria-hidden="true" className="font-mono text-sm w-4 text-center" style={{ color: INK.dim }}>
                      {open ? "—" : "+"}
                    </span>
                  </div>
                  {open && (
                    <div className="pb-6 md:pl-10">
                      <p
                        className="font-mono text-xs md:text-[13px] leading-[1.85] p-5"
                        style={{ color: INK.muted, backgroundColor: INK.base, border: `1px solid ${INK.lineSoft}` }}
                      >
                        {p.prompt}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 05 Do / Don't ────────────────────────────────── */}
      <section id="checklist" className="scroll-mt-16" style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <SectionHead
            index={4}
            isZh={isZh}
            title={isZh ? "取舍清单" : "Do and don't"}
            lead={
              isZh
                ? "摘自 StyleKit 的 dark-mode 风格定义。生成结果跑偏时，把违反的那条直接贴回给 AI。"
                : "Straight from StyleKit's dark-mode style definition. When a generation drifts, paste the violated line back to the AI."
            }
          />
          <div className="grid md:grid-cols-2 gap-x-12">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase pb-4" style={{ color: INK.muted }}>
                {isZh ? "要" : "Do"}
              </p>
              <ul>
                {doList.map((item) => (
                  <li key={item} className="flex gap-4 py-3 text-sm leading-[1.7]" style={{ color: INK.muted, borderTop: `1px solid ${INK.lineSoft}` }}>
                    <span aria-hidden="true" className="font-mono shrink-0" style={{ color: "#6f9d78" }}>+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase pb-4" style={{ color: INK.muted }}>
                {isZh ? "不要" : "Don't"}
              </p>
              <ul>
                {dontList.map((item) => (
                  <li key={item} className="flex gap-4 py-3 text-sm leading-[1.7]" style={{ color: INK.muted, borderTop: `1px solid ${INK.lineSoft}` }}>
                    <span aria-hidden="true" className="font-mono shrink-0" style={{ color: "#b06a6a" }}>−</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 References ────────────────────────────────── */}
      <section id="references" className="scroll-mt-16" style={{ backgroundColor: INK.alt, borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <SectionHead
            index={5}
            isZh={isZh}
            title={isZh ? "参考资源" : "References"}
            lead={
              isZh
                ? "可运行的暗色模板与相关风格——每个风格页都带完整 tokens、组件配方和可导出的 AI 规则。"
                : "Runnable dark templates and related styles — every style page ships full tokens, component recipes, and exportable AI rules."
            }
          />
          <div className="grid md:grid-cols-2 gap-x-12">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase pb-4" style={{ color: INK.muted }}>
                {isZh ? "起步模板" : "Starter templates"}
              </p>
              <ul style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
                {templates.map((t) => (
                  <li key={t.templateId} style={{ borderTop: `1px solid ${INK.lineSoft}` }}>
                    <LocalizedLink
                      href={t.href}
                      className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
                    >
                      <span>
                        <span className="block text-[15px] font-medium transition-colors duration-150 group-hover:text-[#7aa7f8]" style={{ color: INK.body }}>
                          {t.name}
                        </span>
                        <span className="block mt-1 text-xs leading-relaxed" style={{ color: INK.dim }}>
                          {t.description}
                        </span>
                      </span>
                      <span aria-hidden="true" className="font-mono text-xs shrink-0" style={{ color: INK.dim }}>&rarr;</span>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase pb-4" style={{ color: INK.muted }}>
                {isZh ? "相关暗色风格" : "Related dark styles"}
              </p>
              <ul style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
                {relatedStyles.map((s) => (
                  <li key={s.slug} style={{ borderTop: `1px solid ${INK.lineSoft}` }}>
                    <LocalizedLink
                      href={`/styles/${s.slug}`}
                      className="group flex items-center justify-between gap-4 py-4 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="flex gap-1 shrink-0" aria-hidden="true">
                          <span className="h-3 w-3" style={{ backgroundColor: s.colors.primary }} />
                          <span className="h-3 w-3" style={{ backgroundColor: s.colors.secondary }} />
                          <span className="h-3 w-3" style={{ backgroundColor: s.colors.accent[0] }} />
                        </span>
                        <span className="text-[15px] font-medium truncate transition-colors duration-150 group-hover:text-[#7aa7f8]" style={{ color: INK.body }}>
                          {isZh ? s.name : s.nameEn}
                        </span>
                      </span>
                      <span aria-hidden="true" className="font-mono text-xs shrink-0" style={{ color: INK.dim }}>&rarr;</span>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 FAQ ───────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-16" style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <SectionHead index={6} isZh={isZh} title={isZh ? "常见问题" : "Questions, answered"} />
          <div style={{ borderBottom: `1px solid ${INK.lineSoft}` }}>
            {topic.faq.map((f, i) => (
              <FAQItem
                key={f.questionEn}
                index={i}
                question={isZh ? f.questionZh : f.questionEn}
                answer={isZh ? f.answerZh : f.answerEn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Coda ─────────────────────────────────────────── */}
      <section>
        <div className="max-w-5xl mx-auto px-6 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="max-w-md text-sm leading-[1.8]" style={{ color: INK.muted }}>
              {isZh
                ? "还想要别的方向？浏览全部 140 种设计风格，或回到提示词总库。"
                : "Need a different direction? Browse all 140 design styles, or head back to the prompt library."}
            </p>
            <div className="flex gap-3 shrink-0">
              <LocalizedLink
                href="/styles"
                className="font-mono text-[11px] tracking-[0.14em] uppercase px-5 py-3 transition-colors duration-150 hover:brightness-110 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7aa7f8]"
                style={{ backgroundColor: INK.accent, color: "#0a0a0c" }}
              >
                {isZh ? "140 种风格" : "140 styles"}
              </LocalizedLink>
              <LocalizedLink
                href="/ui-prompts"
                className="font-mono text-[11px] tracking-[0.14em] uppercase px-5 py-3 transition-colors duration-150 hover:text-[#f4f4f5] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6]"
                style={{ border: `1px solid ${INK.line}`, color: INK.muted }}
              >
                {isZh ? "提示词总库" : "All prompts"}
              </LocalizedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
