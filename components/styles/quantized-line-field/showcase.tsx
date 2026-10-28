"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { canvasLineCardsPrompt, canvasLineCardMarks } from "@/lib/prompts/canvas-line-cards";
import { QuantizedLineArtwork } from "./cover";
import styles from "./showcase.module.css";

type Brand = keyof typeof canvasLineCardMarks;
type PromptLocale = "zh" | "en";
const reference = "/experiments/brand-line-cards/index.html";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#267dff]";
const action = `inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm transition-colors ${focus}`;
const brands: Brand[] = ["apple", "google", "tesla"];

/**
 * Shadow tint: keep the surface hue, drop saturation and lightness. A neutral
 * black over warm paper reads as dirt; a hue-matched dark reads as shade.
 */
function shadowTint(background: string): string {
  const [r, g, b] = [1, 3, 5].map(
    (offset) => parseInt(background.slice(offset, offset + 2), 16) / 255
  );
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return `${Math.round(hue)}deg ${Math.round(Math.min(saturation, 0.45) * 60)}% 16%`;
}

const MAX_TILT = 6;
const LIFT_PX = -6;
/** Critically damped: k = ω², c = 2ω for ω ≈ 17.3 rad/s (Apple's ~0.35s response). */
const SPRING_K = 300;
const SPRING_C = 34;

type TiltValues = { rx: number; ry: number; ty: number };

type TiltState = {
  target: TiltValues;
  current: TiltValues;
  velocity: TiltValues;
  frame: number | null;
  stamp: number;
};

/** One semi-implicit Euler step of a critically damped spring. Returns "still moving". */
function tiltStep(element: HTMLElement, state: TiltState, now: number): boolean {
  const dt = Math.min((now - (state.stamp || now)) / 1000, 1 / 30);
  state.stamp = now;
  let moving = false;

  for (const key of ["rx", "ry", "ty"] as const) {
    const acceleration =
      -SPRING_K * (state.current[key] - state.target[key]) -
      SPRING_C * state.velocity[key];
    state.velocity[key] += acceleration * dt;
    state.current[key] += state.velocity[key] * dt;

    if (
      Math.abs(state.target[key] - state.current[key]) > 0.01 ||
      Math.abs(state.velocity[key]) > 0.01
    ) {
      moving = true;
    }
  }

  element.style.setProperty("--rx", `${state.current.rx.toFixed(3)}deg`);
  element.style.setProperty("--ry", `${state.current.ry.toFixed(3)}deg`);
  element.style.setProperty("--ty", `${state.current.ty.toFixed(2)}px`);
  return moving;
}

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tint: string;
};

/**
 * Pointer-driven tilt with a spring integration, plus a sheen that follows the
 * cursor. Values are written as CSS custom properties so the compositor owns the
 * transform; only the numbers are animated here.
 */
function TiltCard({ children, className = "", style, tint }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef<TiltState>({
    target: { rx: 0, ry: 0, ty: 0 },
    current: { rx: 0, ry: 0, ty: 0 },
    velocity: { rx: 0, ry: 0, ty: 0 },
    frame: null,
    stamp: 0,
  });

  const drive = useCallback(() => {
    const element = ref.current;
    if (!element || state.current.frame !== null) return;
    state.current.stamp = performance.now();

    const loop = (now: number) => {
      state.current.frame = tiltStep(element, state.current, now)
        ? requestAnimationFrame(loop)
        : null;
    };
    state.current.frame = requestAnimationFrame(loop);
  }, []);

  const release = useCallback(() => {
    state.current.target = { rx: 0, ry: 0, ty: 0 };
    drive();
  }, [drive]);

  useEffect(() => {
    const snapshot = state.current;
    return () => {
      if (snapshot.frame !== null) cancelAnimationFrame(snapshot.frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${className}`}
      style={{ ...style, ["--shadow-color" as string]: tint }}
      data-lifted="false"
      onPointerMove={(event) => {
        const element = ref.current;
        if (!element) return;
        if (event.pointerType === "touch") return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          element.dataset.lifted = "true";
          return;
        }

        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        state.current.target = {
          rx: MAX_TILT * (0.5 - y),
          ry: MAX_TILT * (x - 0.5),
          ty: LIFT_PX,
        };
        element.dataset.lifted = "true";
        drive();
      }}
      onPointerLeave={() => {
        const element = ref.current;
        if (element) element.dataset.lifted = "false";
        release();
      }}
      onPointerCancel={() => {
        const element = ref.current;
        if (element) element.dataset.lifted = "false";
        release();
      }}
    >
      {children}
    </div>
  );
}

const palette = [
  { name: "Paper", nameZh: "纸面", hex: "#fafaf8", ink: "#202220" },
  { name: "Graphite", nameZh: "石墨", hex: "#eeeeeb", ink: "#202220" },
  { name: "Cobalt", nameZh: "钴蓝", hex: "#2152e7", ink: "#f7faff" },
  { name: "Carbon", nameZh: "炭黑", hex: "#111212", ink: "#f5f3ef" },
  { name: "Pale blue", nameZh: "浅蓝", hex: "#c2dcff", ink: "#202220" },
  { name: "Signal red", nameZh: "信号红", hex: "#ec353e", ink: "#111212" },
];

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-[#d9dbd5] py-12 md:py-16">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-serif text-3xl font-normal tracking-tight md:text-4xl">{title}</h2>
        {intro && <p className="max-w-md text-sm leading-relaxed text-[#686b64]">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function StudyFrame({ zh }: { zh: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState<number>();
  const synchronize = useCallback(() => {
    observer.current?.disconnect();

    // `load` can fire before the embedded document finishes laying out, so keep
    // retrying for a few frames instead of giving up on the first miss. The
    // fallback heights are approximations; this is what removes the dead space.
    let attempts = 0;
    const attach = () => {
      const doc = frame.current?.contentDocument;
      const body = doc?.body as HTMLElement | null | undefined;
      if (!body || !doc?.querySelector("main")) {
        if (attempts++ < 30) requestAnimationFrame(attach);
        return;
      }

      const measure = () =>
        // `documentElement.scrollHeight` always reports at least the iframe's own
        // height, so it cannot reveal slack. The body's height is the real one.
        setHeight(Math.ceil(body.getBoundingClientRect().height + 16));
      measure();
      observer.current = new ResizeObserver(measure);
      observer.current.observe(body);
    };

    requestAnimationFrame(attach);
  }, []);
  useEffect(() => () => observer.current?.disconnect(), []);
  // The iframe is server-rendered, so its `load` event usually fires before
  // hydration attaches `onLoad`. Measure once on mount as well.
  useEffect(() => {
    synchronize();
  }, [synchronize]);
  return (
    <iframe
      ref={frame}
      title={zh ? "Apple、Google、Tesla 竖线卡片交互演示" : "Interactive Apple, Google, and Tesla line cards"}
      src={reference}
      onLoad={synchronize}
      className="block h-[850px] w-full border-0 max-[650px]:h-[1900px]"
      style={height ? { height } : undefined}
    />
  );
}

export default function QuantizedLineFieldShowcase() {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const [promptLocale, setPromptLocale] = useState<PromptLocale | null>(null);
  const selectedLocale = promptLocale ?? (zh ? "zh" : "en");
  const prompt = canvasLineCardsPrompt[selectedLocale];
  const [brand, setBrand] = useState<Brand>("apple");
  const [caption, setCaption] = useState("");
  const [appliedCaption, setAppliedCaption] = useState("");
  const [activeTab, setActiveTab] = useState("lines");
  const { copy, result, isCopied } = useClipboard();
  const mark = canvasLineCardMarks[brand];
  const steps = [
    { title: zh ? "路径变成亮度" : "Path to luminance", body: zh ? "只采样一次，保存 60×60 的亮度表。" : "Sample once and keep a 60-by-60 luminance table." },
    { title: zh ? "亮度变成线条" : "Luminance to lines", body: zh ? "用四档粗细和小段间隙，让身份从线场中浮现。" : "Four weights and small segment gaps let the identity emerge." },
    { title: zh ? "触碰产生回应" : "Respond to presence", body: zh ? "指针推开局部线条；弹簧让它们回到网格。" : "A pointer parts nearby lines; springs return them to the grid." },
  ];
  const tabContent: Record<string, { title: string; body: string }> = {
    lines: { title: zh ? "保持线条的颗粒感" : "Keep the discrete rhythm", body: zh ? "每列 30 段，线宽只有四档。不要把它平滑成普通的实心 Logo。" : "Each column has 30 segments and only four weights. Preserve the texture instead of smoothing it into a solid logo." },
    color: { title: zh ? "同一网格，三种身份" : "One grid, three identities", body: zh ? "浅灰配黑线，钴蓝配浅蓝线，近黑配红线。文字始终清晰。" : "Graphite with black ink, cobalt with pale-blue ink, carbon with red ink. Keep copy legible." },
    interaction: { title: zh ? "短暂散开，平静复位" : "Part briefly, settle quietly", body: zh ? "指针静止后，线条也要复位。动效暂停或减少动态效果时保留稳定画面。" : "Lines return even while the pointer stays still. A motion toggle and reduced-motion preference provide a stable frame." },
  };
  const checks = [
    [zh ? "离屏读取" : "Pixel reads", "3", zh ? "每个品牌一次，之后不再读取" : "One per brand; no subsequent reads"],
    [zh ? "亮度网格" : "Luminance grid", "60 × 60", zh ? "保存数值，释放临时画布" : "Keep numbers; release scratch canvases"],
    [zh ? "绘制网格" : "Drawn grid", "60 × 30", zh ? "相邻两行合为一段" : "Average two rows per segment"],
    [zh ? "线宽档位" : "Stroke weights", "4", "0.38 / 1.12 / 2.28 / 3.80"],
    [zh ? "检测区域" : "Scan regions", "2–3", zh ? "每 100ms 选择网格目标，框逐帧连续跟随" : "Choose grid targets every 100ms; animate boxes continuously"],
    [zh ? "屏幕适配" : "Display scale", "CSS × DPR", zh ? "尺寸变化不重新采样" : "Resize without resampling"],
  ];
  return (
    <div className="min-h-screen bg-[#fafaf8] font-sans text-[#202220] selection:bg-[#c2dcff]">
      <h1 className="sr-only">{zh ? "量化线场" : "Quantized Line Field"}</h1>
      <nav className="border-b border-[#d9dbd5]" aria-label={zh ? "展示页导航" : "Showcase navigation"}>
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-10">
          <Link href={localizeHref("/styles/quantized-line-field", locale)} className={`text-sm ${focus}`}>
            {zh ? "返回量化线场" : "Back to Quantized Line Field"}
          </Link>
          <div className="flex items-center gap-4">
            <a href={reference} download="stylekit-brand-line-cards.html" className={`hidden text-sm underline underline-offset-4 sm:inline ${focus}`}>
              {zh ? "下载 HTML" : "Download HTML"}
            </a>
            <button type="button" data-copy-reproduction="top" onClick={() => void copy(prompt, "reproduction-nav")} className={`${action} border-[#202220] bg-[#202220] text-[#fafaf8] hover:bg-[#363934]`}>
              {isCopied("reproduction-nav", prompt) ? (zh ? "已复制" : "Copied") : (zh ? "复制复现提示词" : "Copy reproduction prompt")}
            </button>
          </div>
        </div>
      </nav>

      <section aria-label={zh ? "实时效果" : "Live study"}>
        <StudyFrame zh={zh} />
      </section>

      <main className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Section id="reproduce" title={zh ? "把这个效果带走" : "Make this study your own"} intro={zh ? "完整提示词包含三个实际路径和所有关键参数。复制后可直接交给编程助手。" : "The complete prompt includes all three paths and the key parameters. Copy it into a coding assistant."}>
          <ClipboardFeedback result={result} locale={zh ? "zh" : "en"} />
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex gap-1 rounded-full border border-[#d9dbd5] p-1" aria-label={zh ? "提示词语言" : "Prompt language"}>
              {(["zh", "en"] as const).map((language) => (
                <button key={language} type="button" aria-pressed={selectedLocale === language} onClick={() => setPromptLocale(language)} className={`min-h-10 rounded-full px-5 text-sm ${focus} ${selectedLocale === language ? "bg-[#202220] text-[#fafaf8]" : "hover:bg-[#eeeeeb]"}`}>
                  {language === "zh" ? "中文" : "English"}
                </button>
              ))}
            </div>
            <button type="button" data-copy-reproduction="body" onClick={() => void copy(prompt, "reproduction-body")} className={`${action} border-[#2152e7] bg-[#2152e7] text-white hover:bg-[#1944c4]`}>
              {isCopied("reproduction-body", prompt) ? (zh ? "已复制完整内容" : "Full prompt copied") : (zh ? "复制完整提示词" : "Copy the complete prompt")}
            </button>
          </div>
          <pre id="quantized-reproduction-prompt" lang={selectedLocale === "zh" ? "zh-CN" : "en"} tabIndex={0} aria-label={zh ? "完整复现提示词" : "Complete reproduction prompt"} className={`max-h-[28rem] overflow-y-auto whitespace-pre-wrap rounded-[17px] border border-[#d9dbd5] bg-[#eeeeeb]/50 p-5 font-mono text-xs leading-6 [overflow-wrap:anywhere] md:p-7 ${focus}`}>
            {prompt}
          </pre>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href={reference} download="stylekit-brand-line-cards.html" className={`underline underline-offset-4 ${focus}`}>{zh ? "下载参考 HTML" : "Download reference HTML"}</a>
            <a href={reference} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-4 ${focus}`}>{zh ? "独立打开交互效果" : "Open the interactive study"}</a>
            <Link href={localizeHref("/styles/quantized-line-field#style-prompts", locale)} className={`underline underline-offset-4 ${focus}`}>{zh ? "风格规范与 AI 实现" : "Style rules and AI implementation"}</Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#686b64]">
            {zh ? "替换品牌时，一起替换路径、名称、标语和配色。保留采样与交互规则；不同模型生成的细节仍需对照参考检查。" : "To change a brand, replace its path, name, tagline, and palette together. Preserve the sampling and interaction rules, then review generated details against the reference."}
          </p>
        </Section>

        <Section id="principles" title={zh ? "从图形，到光，再到线" : "From a mark, to light, to lines"}>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title}>
                <span className="font-mono text-xs text-[#2152e7]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mb-3 mt-4 text-lg">{step.title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-[#686b64]">{step.body}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="palette" title={zh ? "颜色承担身份" : "Color carries identity"} intro={zh ? "点击色块复制色值。扫描框统一使用蓝色。" : "Select a swatch to copy its value. Scan overlays share a blue accent."}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {palette.map((color) => (
              <button
                key={color.hex}
                type="button"
                aria-label={`${zh ? "复制" : "Copy"} ${color.hex}`}
                onClick={() => void copy(color.hex, color.hex)}
                className={`flex min-h-40 flex-col justify-between rounded-[17px] border border-black/5 p-4 text-left ${focus}`}
                style={{ backgroundColor: color.hex, color: color.ink }}
              >
                <span className="text-sm">
                  {zh ? color.nameZh : color.name}
                </span>
                <span className="font-mono text-xs">
                  {isCopied(color.hex) ? (zh ? "已复制" : "Copied") : color.hex}
                </span>
              </button>
            ))}
          </div>
        </Section>

        <Section id="typography" title={zh ? "图形之外，让文字安静" : "Let the typography stay quiet"}>
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">Identity,<br />in lines.</p>
              <p className="mt-5 text-xs text-[#686b64]">Georgia / Times New Roman</p>
            </div>
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-2xl tracking-tight">
                  Find your next possibility.
                </p>
                <p className="text-sm leading-relaxed text-[#686b64]">
                  {zh ? "无衬线文字负责名称、标语和操作，保持清晰易读。" : "Sans-serif copy keeps names, taglines, and actions clear."}
                </p>
              </div>
              <div className="border-t border-[#d9dbd5] pt-5 font-mono text-xs text-[#2152e7]">
                x24 / y18
                <span className="ml-5 text-[#686b64]">
                  {zh ? "坐标只用于标注" : "Coordinates for annotations"}
                </span>
              </div>
            </div>
          </div>
        </Section>

        <Section id="weights" title={zh ? "四种粗细，一种节奏" : "Four weights, one rhythm"} intro={zh ? "显示宽度按网格单元缩放；阈值决定亮度属于哪一档。" : "Stroke widths scale with cell size. Thresholds assign each luminance value to a level."}>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[0.38, 1.12, 2.28, 3.8].map((width, index) => (
              <div key={width} className="group relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 translate-y-1.5 rounded-[17px] border border-[#202220]/12 bg-[#e3e3df] opacity-70 transition-[translate,opacity] duration-300 ease-out motion-safe:group-hover:translate-y-2.5 motion-safe:group-hover:opacity-100"
                />
                <figure className={`${styles.cardStatic} rounded-[17px] bg-[#eeeeeb] p-5`}>
                  <svg viewBox="0 0 180 100" aria-hidden="true" className="mb-4 w-full">
                    {Array.from({ length: 16 }, (_, column) =>
                      Array.from({ length: 4 }, (_, row) => (
                        <path
                          key={`${column}-${row}`}
                          d={`M${10 + column * 10} ${5 + row * 24}v21`}
                          stroke="#202220"
                          strokeWidth={width}
                          opacity={[0.15, 0.64, 0.93, 1][index]}
                        />
                      ))
                    )}
                  </svg>
                  <figcaption className="flex justify-between font-mono text-xs"><span>{width.toFixed(2)}</span><span className="text-[#686b64]">{["< .12", ".12–.42", ".42–.89", "≥ .89"][index]}</span></figcaption>
                </figure>
              </div>
            ))}
          </div>
        </Section>

        <Section id="actions" title={zh ? "操作保持克制" : "Keep the actions restrained"}>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => void copy(prompt, "reproduction-actions")} className={`${action} border-[#202220] bg-[#202220] text-[#fafaf8] hover:bg-[#363934]`}>{zh ? "复制提示词" : "Copy prompt"}</button>
            <a href={reference} download="stylekit-brand-line-cards.html" className={`${action} border-[#d9dbd5] hover:border-[#267dff]`}>{zh ? "下载 HTML" : "Download HTML"}</a>
            <a href="#reproduce" className={`${action} border-[#2152e7] bg-[#2152e7] text-white hover:bg-[#1944c4]`}>{zh ? "查看完整配方" : "Read the complete recipe"}</a>
            <Link href={localizeHref("/styles", locale)} className={`px-2 py-3 text-sm underline underline-offset-4 ${focus}`}>{zh ? "探索风格库" : "Explore the style library"}</Link>
          </div>
        </Section>

        <Section id="surfaces" title={zh ? "三种表面，共用一套网格" : "Three surfaces, one grid"}>
          <div className={`grid gap-[19px] min-[900px]:grid-cols-3 ${styles.stage}`}>
            {brands.map((id) => {
              const item = canvasLineCardMarks[id];
              return (
                <TiltCard
                  key={id}
                  tint={shadowTint(item.background)}
                  className="overflow-hidden rounded-[17px]"
                  style={{ backgroundColor: item.background, color: id === "apple" ? "#202220" : "#f7faff" }}
                >
                  <div className="flex min-h-[440px] flex-col justify-between p-6">
                    <h3 className="text-sm">{item.name}</h3>
                    <QuantizedLineArtwork brand={id} className="my-5 w-full" />
                    <p className="text-xs opacity-80">{zh ? "同一采样规则，不同的身份" : "Shared sampling, distinct identity"}</p>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </Section>

        <Section id="customize" title={zh ? "先换一句自己的标语" : "Try a line of your own"} intro={zh ? "选择卡片并输入标语，预览文字与配色的搭配。原始交互仍可在页面顶部体验。" : "Choose a card and try your own tagline. The full interaction remains in the live study above."}>
          <div className="grid gap-8 md:grid-cols-2">
            <form onSubmit={(event) => { event.preventDefault(); setAppliedCaption(caption.trim()); }} className="space-y-6">
              <fieldset>
                <legend className="mb-3 text-sm">{zh ? "卡片配色" : "Card palette"}</legend>
                <div className="flex flex-wrap gap-2">
                  {brands.map((id) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={brand === id}
                      onClick={() => setBrand(id)}
                      className={`${action} ${brand === id ? "border-[#202220] bg-[#202220] text-[#fafaf8]" : "border-[#d9dbd5] hover:border-[#267dff]"}`}
                    >
                      {canvasLineCardMarks[id].name}
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="block text-sm" htmlFor="qf-caption">
                {zh ? "你的标语" : "Your tagline"}
                <input id="qf-caption" value={caption} maxLength={70} onChange={(event) => setCaption(event.target.value)} placeholder={zh ? "让你的想法浮现" : "Let your next idea emerge"} className={`mt-3 block w-full rounded-xl border border-[#d9dbd5] bg-transparent px-4 py-3 placeholder:text-[#73766e] ${focus}`} />
              </label>
              <button
                type="submit"
                className={`${action} border-[#202220] bg-[#202220] text-[#fafaf8]`}
              >
                {zh ? "更新预览" : "Update preview"}
              </button>
              <p className="text-xs leading-relaxed text-[#686b64]">
                {zh ? "要替换图形，请在提示词中提供 24×24 坐标范围的 SVG path。" : "To replace the mark, supply an SVG path in a 24-by-24 coordinate space."}
              </p>
            </form>
            <TiltCard
              tint={shadowTint(mark.background)}
              className="grid grid-cols-[100px_1fr] items-center gap-5 self-center rounded-[17px] p-6"
              style={{ backgroundColor: mark.background, color: brand === "apple" ? "#202220" : "#f7faff" }}
            >
              <QuantizedLineArtwork brand={brand} className="w-full" />
              <div aria-live="polite">
                <p className="mb-4 text-xs opacity-80">{mark.name}</p>
                <p className="break-words text-2xl leading-tight tracking-tight">
                  {appliedCaption || (zh ? "让你的想法浮现。" : "Let your next idea emerge.")}
                </p>
              </div>
            </TiltCard>
          </div>
        </Section>

        <Section id="navigation" title={zh ? "把变化控制在图形里" : "Keep the change in the artwork"}>
          <div role="tablist" aria-label={zh ? "风格构成" : "Style anatomy"} className="mb-6 flex gap-2 border-b border-[#d9dbd5]">
            {[["lines", zh ? "线条" : "Lines"], ["color", zh ? "颜色" : "Color"], ["interaction", zh ? "交互" : "Interaction"]].map(([id, label], index, tabs) => (
              <button key={id} type="button" role="tab" id={`qf-tab-${id}`} aria-selected={activeTab === id} aria-controls={`qf-panel-${id}`} tabIndex={activeTab === id ? 0 : -1} onClick={() => setActiveTab(id)} onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
                else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                else return;
                event.preventDefault(); setActiveTab(tabs[next][0]); document.getElementById(`qf-tab-${tabs[next][0]}`)?.focus();
              }} className={`min-h-11 border-b-2 px-5 py-3 text-sm ${focus} ${activeTab === id ? "border-[#2152e7] text-[#2152e7]" : "border-transparent text-[#686b64]"}`}>{label}</button>
            ))}
          </div>
          <div role="tabpanel" id={`qf-panel-${activeTab}`} aria-labelledby={`qf-tab-${activeTab}`} tabIndex={0} className={`max-w-2xl py-4 ${focus}`}>
            <h3 className="mb-3 text-lg">{tabContent[activeTab].title}</h3>
            <p className="text-sm leading-relaxed text-[#686b64]">{tabContent[activeTab].body}</p>
          </div>
        </Section>

        <Section id="status" title={zh ? "状态也保持清楚" : "Make every state clear"}>
          <div className="mb-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-[#c2dcff] px-4 py-2 text-xs text-[#202220]">
              {zh ? "路径已采样" : "Path sampled"}
            </span>
            <span className="rounded-full border border-[#d9dbd5] px-4 py-2 text-xs">{zh ? "动效可暂停" : "Motion can pause"}</span>
            <span className="rounded-full bg-[#111212] px-4 py-2 font-mono text-xs text-[#f5f3ef]">60 × 60</span>
          </div>
          <label className="block max-w-sm text-sm">{zh ? "亮度表就绪" : "Luminance table ready"}<progress value={100} max={100} className="mt-3 block h-1 w-full accent-[#2152e7]">100%</progress></label>
          <div className="mt-8 border-l-2 border-[#267dff] pl-5 text-sm leading-relaxed text-[#686b64]">
            {zh ? "蓝色框会重新检测当前线场的亮区，并跟随噪声和鼠标形变更新坐标。它们是识别过程的视觉表达，页面没有调用 AI 识别服务。" : "Blue boxes rescan bright regions of the live field and track noise and pointer deformation. They visualize recognition without calling an AI recognition service."}
          </div>
        </Section>

        <Section id="parameters" title={zh ? "可检查的配方" : "A recipe you can inspect"}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <caption className="sr-only">{zh ? "量化线场核心参数" : "Core Quantized Line Field parameters"}</caption>
              <thead>
                <tr className="border-b border-[#202220]">
                  <th scope="col" className="py-4 font-medium">
                    {zh ? "项目" : "Item"}
                  </th>
                  <th scope="col" className="py-4 font-medium">
                    {zh ? "数值" : "Value"}
                  </th>
                  <th scope="col" className="py-4 font-medium">
                    {zh ? "检查要点" : "Check"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {checks.map(([name, value, note]) => (
                  <tr key={name} className="border-b border-[#d9dbd5]">
                    <th scope="row" className="py-4 pr-4 font-normal">{name}</th>
                    <td className="py-4 pr-5 font-mono text-xs">{value}</td>
                    <td className="py-4 text-[#686b64]">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="intent" title={zh ? "熟悉的形状，新的观看方式" : "A familiar shape, seen differently"}>
          <blockquote className="max-w-3xl font-serif text-3xl leading-snug tracking-tight md:text-4xl">
            {zh ? "让图形退回到线条，让身份从明暗之间重新浮现。" : "Reduce the mark to lines. Let its identity emerge from light."}
          </blockquote>
          <p className="mt-6 text-sm text-[#686b64]">{zh ? "适合品牌实验、作品集、活动页面与创意编程展示。" : "For identity studies, portfolios, campaign pages, and creative coding."}</p>
        </Section>

        <Section id="rules" title={zh ? "延展时，守住这几件事" : "What to preserve as you adapt it"}>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-5 text-lg">{zh ? "保留" : "Preserve"}</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-[#686b64]">
                <li>{zh ? "四档线宽和可辨认的分节。" : "Four discrete weights and visible segments."}</li>
                <li>{zh ? "一次采样、高清绘制与轻微流动。" : "One-time sampling, high-DPI drawing, gentle drift."}</li>
                <li>{zh ? "散开后回到原位的短暂反馈。" : "Brief displacement followed by spring return."}</li>
                <li>{zh ? "完整路径数据和可验证的复现条件。" : "Complete paths and observable acceptance checks."}</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 text-lg">{zh ? "避免" : "Avoid"}</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-[#686b64]">
                <li>{zh ? "用发光、模糊和大阴影盖住线条。" : "Glow, blur, or heavy shadows obscuring strokes."}</li>
                <li>{zh ? "只给品牌名，让生成工具猜 Logo。" : "Giving only a brand name and guessing its mark."}</li>
                <li>{zh ? "用每帧像素读取驱动效果。" : "Reading image data on every frame."}</li>
                <li>{zh ? "把视觉扫描框说成真实 AI 检测。" : "Calling a visual scan overlay real AI detection."}</li>
              </ul>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-[#d9dbd5]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6 py-10 text-sm md:px-10">
          <Link href={localizeHref("/styles/quantized-line-field", locale)} className={`font-serif text-xl ${focus}`}>{zh ? "量化线场" : "Quantized Line Field"}</Link>
          <p className="text-xs text-[#686b64]">One path. A field of light. Four line weights.</p>
          <a href="#reproduce" className={`underline underline-offset-4 ${focus}`}>{zh ? "复制完整提示词" : "Copy the complete prompt"}</a>
        </div>
      </footer>
    </div>
  );
}
