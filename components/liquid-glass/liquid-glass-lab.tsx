"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Camera, Droplets, Music, Send, Sparkles } from "lucide-react";
import {
  DEFAULT_LIQUID_GLASS_SETTINGS,
  type LiquidGlassSettings,
} from "@/lib/liquid-glass";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { LiquidGlass, useSvgBackdropSupport } from "./liquid-glass";

const subscribeNever = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useHydrated(): boolean {
  return useSyncExternalStore(subscribeNever, getClientSnapshot, getServerSnapshot);
}

type Lang = "en" | "zh";

const copy = {
  en: {
    eyebrow: "Liquid Glass Lab",
    title: "Real refraction, not just blur.",
    description:
      "An Apple-style liquid glass material built on SVG displacement filters. The surface bends, magnifies, and color-fringes whatever sits behind it — strongest at the rim, subtle at the center, like looking through a water droplet.",
    dragHint: "Drag the glass card around and watch straight lines bend at its rim.",
    supportWarning:
      "This browser cannot render SVG backdrop filters yet, so the demo falls back to plain frosted blur. Open it in Chrome or Edge to see true refraction and dispersion.",
    cardLabel: "Liquid Glass",
    cardTitle: "Drag me over the stripes",
    cardCaption: "Rim bends, center stays calm.",
    controls: "Controls",
    presets: "Presets",
    reset: "Reset",
    how: "How it works",
    howSteps: [
      {
        title: "Lens displacement map",
        body: "A canvas renders the glass shape as a vector field: red encodes horizontal offset, green vertical, neutral gray means no shift. Magnitude ramps up near the border and fades to zero at the center — Spread controls the band, Depth the curvature.",
      },
      {
        title: "Refraction with dispersion",
        body: "feImage feeds that map into feDisplacementMap, which bends the backdrop through it three times — once per RGB channel at slightly different scales — and screen-blends the results. The mismatch paints rainbow fringes exactly where distortion peaks: the rim.",
      },
      {
        title: "Liquid wobble and frost",
        body: "feTurbulence adds a subtle organic ripple over the refracted image and feGaussianBlur frosts it. The whole chain runs as one CSS backdrop-filter: url(#filter), so the glass live-refracts anything that scrolls or moves behind it.",
      },
    ],
    sliders: {
      light: { label: "Light", hint: "Specular highlight along the rim" },
      refraction: { label: "Refraction", hint: "How hard the backdrop bends" },
      depth: { label: "Depth", hint: "Lens thickness and magnification" },
      dispersion: { label: "Dispersion", hint: "RGB rainbow fringe at the edges" },
      frost: { label: "Frost", hint: "Blur over the refracted image" },
      spread: { label: "Spread", hint: "How far the rim distortion reaches inward" },
    },
    presetNames: { droplet: "Droplet", frosted: "Frosted", prism: "Prism" },
    backdropHeadline: "Refraction bends what you read.",
    backdropBody:
      "Glass is honest about light. It slows every wavelength by a different amount, so edges split into color and straight lines refuse to stay straight. This page exists to be distorted.",
  },
  zh: {
    eyebrow: "液态玻璃实验室",
    title: "真折射,不止是模糊。",
    description:
      "基于 SVG 位移滤镜的苹果风液态玻璃材质。玻璃会弯曲、放大并色散其背后的内容——边缘失真最强,中心保持微妙,就像透过一滴水看世界。",
    dragHint: "拖动玻璃卡片,观察直线在它的边缘发生弯曲。",
    supportWarning:
      "当前浏览器还不支持 SVG backdrop 滤镜,演示已降级为普通磨砂模糊。请用 Chrome 或 Edge 打开以体验真实折射与色散。",
    cardLabel: "Liquid Glass",
    cardTitle: "拖我到条纹上",
    cardCaption: "边缘弯曲,中心平静。",
    controls: "参数调节",
    presets: "预设",
    reset: "重置",
    how: "实现原理",
    howSteps: [
      {
        title: "透镜位移图",
        body: "Canvas 把玻璃形状渲染成一张向量场贴图:红通道编码水平位移,绿通道编码垂直位移,中性灰表示不动。位移量在边界附近最强、到中心衰减为零——展开控制衰减带宽度,深度控制曲率。",
      },
      {
        title: "折射与色散",
        body: "feImage 把位移图喂给 feDisplacementMap,对背景做三次弯曲——RGB 三个通道各用略微不同的强度——再用 screen 混合回来。三个通道的错位恰好在失真最强的边缘画出彩虹镶边。",
      },
      {
        title: "液态扰动与霜化",
        body: "feTurbulence 在折射图像上叠加细微的有机涟漪,feGaussianBlur 负责霜化。整条滤镜链通过一句 CSS backdrop-filter: url(#filter) 生效,玻璃背后滚动或移动的内容都会被实时折射。",
      },
    ],
    sliders: {
      light: { label: "光线", hint: "沿边缘的高光强度" },
      refraction: { label: "折射", hint: "背景弯曲的强度" },
      depth: { label: "深度", hint: "镜片厚度与放大感" },
      dispersion: { label: "色散", hint: "边缘的 RGB 彩虹分离" },
      frost: { label: "霜化", hint: "折射图像上的模糊量" },
      spread: { label: "展开", hint: "边缘失真向内延伸的范围" },
    },
    presetNames: { droplet: "水滴", frosted: "磨砂", prism: "棱镜" },
    backdropHeadline: "折射会弯曲你读到的一切。",
    backdropBody:
      "玻璃对光很诚实。它让每种波长以不同的速度慢下来,于是边缘裂成颜色,直线拒绝保持笔直。这一页存在的意义,就是被扭曲。",
  },
} as const;

const SLIDER_KEYS: Array<keyof LiquidGlassSettings> = [
  "light",
  "refraction",
  "depth",
  "dispersion",
  "frost",
  "spread",
];

const PRESETS: Array<{
  id: "droplet" | "frosted" | "prism";
  settings: LiquidGlassSettings;
}> = [
  {
    id: "droplet",
    settings: { light: 60, refraction: 62, depth: 62, dispersion: 30, frost: 4, spread: 42 },
  },
  {
    id: "frosted",
    settings: { light: 45, refraction: 26, depth: 34, dispersion: 12, frost: 62, spread: 64 },
  },
  {
    id: "prism",
    settings: { light: 72, refraction: 88, depth: 78, dispersion: 100, frost: 2, spread: 58 },
  },
];

const DOCK_ICONS = [Camera, Music, Send, Sparkles];

export function LiquidGlassLab() {
  const { locale } = useI18n();
  const lang: Lang = locale === "zh" ? "zh" : "en";
  const t = copy[lang];

  const [settings, setSettings] = useState<LiquidGlassSettings>(
    DEFAULT_LIQUID_GLASS_SETTINGS
  );
  const hydrated = useHydrated();
  const supported = useSvgBackdropSupport();

  const playgroundRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 56, y: 96 });
  const dragState = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const playground = playgroundRef.current;
    if (!playground) return;
    const rect = playground.getBoundingClientRect();
    dragState.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left - position.x,
      offsetY: event.clientY - rect.top - position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    const playground = playgroundRef.current;
    const card = cardRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !playground || !card) return;
    const rect = playground.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - cardRect.width);
    const maxY = Math.max(0, rect.height - cardRect.height);
    setPosition({
      x: Math.min(maxX, Math.max(0, event.clientX - rect.left - drag.offsetX)),
      y: Math.min(maxY, Math.max(0, event.clientY - rect.top - drag.offsetY)),
    });
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
    }
  };

  const updateSetting = (key: keyof LiquidGlassSettings, value: number) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
          {t.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {t.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {t.description}
        </p>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.dragHint}</p>
      </header>

      {hydrated && !supported ? (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300">
          {t.supportWarning}
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div
          ref={playgroundRef}
          className="relative h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 sm:h-[620px]"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-violet-600/70 blur-3xl" />
            <div className="absolute -right-20 top-14 h-80 w-80 rounded-full bg-cyan-500/60 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-96 w-96 rounded-full bg-amber-500/50 blur-3xl" />
            <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-rose-500/50 blur-3xl" />

            <div className="absolute inset-x-0 top-8 px-8 text-white sm:px-10">
              <p className="font-serif text-[clamp(34px,5.4vw,72px)] leading-[1.04] tracking-tight">
                {t.backdropHeadline}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
                {t.backdropBody}
              </p>
            </div>

            <div
              className="absolute inset-x-0 top-[46%] h-24 opacity-90"
              style={{
                background:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.95) 0 2px, transparent 2px 18px)",
              }}
            />
            <div
              className="absolute inset-x-0 top-[64%] h-14 opacity-70"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.85) 0 2px, transparent 2px 10px)",
              }}
            />

            <div
              className="absolute bottom-10 left-8 h-36 w-36 opacity-80"
              style={{
                background:
                  "conic-gradient(rgba(255,255,255,0.9) 25%, transparent 0 50%, rgba(255,255,255,0.9) 0 75%, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="absolute inset-x-8 bottom-8 hidden grid-cols-8 gap-2 sm:grid">
              {[
                "bg-red-500",
                "bg-orange-400",
                "bg-yellow-400",
                "bg-green-500",
                "bg-teal-400",
                "bg-blue-500",
                "bg-indigo-500",
                "bg-fuchsia-500",
              ].map((tile) => (
                <div key={tile} className={cn("h-9 rounded-md", tile)} />
              ))}
            </div>
          </div>

          <div
            ref={cardRef}
            className="absolute left-0 top-0 z-20 w-[min(340px,72%)] cursor-grab touch-none select-none active:cursor-grabbing"
            style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
          >
            <LiquidGlass settings={settings} radius={30} contentClassName="p-6">
              <div className="flex items-center gap-2 text-white/90">
                <Droplets className="h-4 w-4" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
                  {t.cardLabel}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.25)]">
                {t.cardTitle}
              </p>
              <p className="mt-1 text-sm text-white/75">{t.cardCaption}</p>
            </LiquidGlass>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
            <LiquidGlass
              settings={settings}
              radius={999}
              contentClassName="flex items-center gap-1 px-3 py-2"
            >
              {DOCK_ICONS.map((Icon, index) => (
                <span
                  key={index}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              ))}
            </LiquidGlass>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-white">
              {t.controls}
            </h2>
            <button
              type="button"
              onClick={() => setSettings(DEFAULT_LIQUID_GLASS_SETTINGS)}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
            >
              {t.reset}
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {SLIDER_KEYS.map((key) => (
              <label key={key} className="block">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {t.sliders[key].label}
                  </span>
                  <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
                    {settings[key]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={settings[key]}
                  onChange={(event) => updateSetting(key, Number(event.target.value))}
                  className="mt-2 w-full accent-sky-600"
                  aria-label={t.sliders[key].label}
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.sliders[key].hint}
                </p>
              </label>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {t.presets}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSettings(preset.settings)}
                  className="rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-400"
                >
                  {t.presetNames[preset.id]}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t.how}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {t.howSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-xs font-semibold tabular-nums text-sky-600 dark:text-sky-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
