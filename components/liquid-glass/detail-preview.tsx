"use client";

import { useId, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight, Compass, Mountain, Waves } from "lucide-react";
import { LiquidGlass } from "./liquid-glass";
import catalogPreview from "@/lib/style-preview/styles/liquid-glass";
import { previewCopy } from "@/lib/style-preview/copy";
import type { StylePreviewLocale } from "@/lib/style-preview/types";

const material = {
  light: 72, refraction: 62, depth: 40, dispersion: 5, frost: 1.1, spread: 52,
};
const paleGlass = { "--liquid-solid-fill": "#dce9ef" } as CSSProperties;
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17374c]";

function Scene({ children, position = "center" }: { children: ReactNode; position?: string }) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-[#92b6c9] text-[#17374c]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/styles/liquid-glass/glacier.webp')", backgroundPosition: position }}
      />
      <div className="relative flex min-h-72 flex-col items-start justify-between gap-8 p-5 sm:p-8">
        {children}
      </div>
    </div>
  );
}

function DockPreview({ locale }: { locale: StylePreviewLocale }) {
  const [selected, setSelected] = useState(0);
  const scenes = [
    { en: "Glacier", zh: "冰川", position: "50% 50%", icon: Mountain },
    { en: "Reflection", zh: "倒影", position: "50% 100%", icon: Waves },
    { en: "Horizon", zh: "远山", position: "100% 30%", icon: Compass },
  ];
  const scene = scenes[selected];

  return (
    <Scene position={scene.position}>
      <div aria-live="polite">
        <p className="text-xs font-medium uppercase tracking-[0.14em]">
          {previewCopy(locale, "冰岛 · 杰古沙龙冰河湖", "Jökulsárlón, Iceland")}
        </p>
        <h3 className="mt-2 font-sans text-3xl font-semibold tracking-tight">{previewCopy(locale, scene.zh, scene.en)}</h3>
      </div>
      <LiquidGlass
        appearance="clear"
        settings={material}
        radius={999}
        tint="rgba(240, 250, 255, 0.18)"
        style={paleGlass}
        className="max-w-full self-center"
      >
        <nav aria-label={previewCopy(locale, "场景导航", "Scene navigation")} className="flex max-w-full flex-wrap justify-center gap-1 p-1.5">
          {scenes.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.en}
                type="button"
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
                className={`flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors sm:px-4 sm:text-sm motion-reduce:transition-none ${focus} ${selected === index ? "bg-white/55 shadow-[inset_0_1px_0_rgb(255_255_255_/_65%)]" : "hover:bg-white/20"}`}
              >
                <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                {previewCopy(locale, item.zh, item.en)}
              </button>
            );
          })}
        </nav>
      </LiquidGlass>
    </Scene>
  );
}

function HeroPreview({ locale }: { locale: StylePreviewLocale }) {
  const [open, setOpen] = useState(false);
  const noteId = useId();

  return (
    <Scene>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em]">64°02′ N / 16°14′ W</p>
        <h3 className="mt-3 max-w-sm font-sans text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
          {previewCopy(locale, "光，落在冰川上。", "Light on ice.")}
        </h3>
      </div>
      <div className="max-w-full space-y-3">
        <LiquidGlass
          appearance="clear"
          settings={material}
          radius={999}
          tint="rgba(240, 250, 255, 0.18)"
          style={paleGlass}
          className="inline-block transition-transform has-[button:active]:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <button
            type="button"
            aria-expanded={open}
            aria-controls={noteId}
            onClick={() => setOpen((value) => !value)}
            className={`flex min-h-12 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold ${focus}`}
          >
            {previewCopy(locale, open ? "收起场景笔记" : "查看场景笔记", open ? "Close field note" : "View field note")}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </LiquidGlass>
        <p id={noteId} hidden={!open} className="max-w-sm rounded-xl bg-[#e5f0f5]/95 p-4 text-sm leading-relaxed">
          {previewCopy(locale, "杰古沙龙冰河湖位于冰岛东南部。镜面般的湖水，让冰与光在这里相遇。", "At Jökulsárlón in southeast Iceland, still water reflects the ice and the changing light.")}
        </p>
      </div>
    </Scene>
  );
}

export default function LiquidGlassDetailPreview({ componentKey, locale }: { componentKey: string; locale: StylePreviewLocale }) {
  let content: ReactNode;
  if (componentKey === "button" || componentKey === "card" || componentKey === "input") {
    content = catalogPreview[componentKey]({ locale });
  } else if (componentKey === "nav") {
    content = <DockPreview locale={locale} />;
  } else if (componentKey === "hero") {
    content = <HeroPreview locale={locale} />;
  } else {
    const base = locale === "zh" ? "/zh" : "";
    content = (
      <footer className="flex min-h-40 flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-background p-6 text-foreground">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em]">StyleKit</p>
          <h3 className="mt-2 font-serif text-2xl">{previewCopy(locale, "让光线透过来。", "Let the light through.")}</h3>
        </div>
        <a href={`${base}/styles/liquid-glass/showcase`} className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
          {previewCopy(locale, "打开完整场景", "Open the full scene")}
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </footer>
    );
  }

  return <div data-liquid-glass-detail={componentKey}>{content}</div>;
}
