import { ArrowUpRight, Compass, Search, Waves } from "lucide-react";
import { useId, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { LiquidGlass } from "@/components/liquid-glass/liquid-glass";
import type { StylePreviewComponents } from "../types";
import { previewCopy } from "../copy";

const clearMaterial = {
  refraction: 62,
  depth: 40,
  dispersion: 5,
  frost: 1.1,
  light: 72,
  spread: 52,
};

const paleGlass = {
  "--liquid-solid-fill": "#dce9ef",
} as CSSProperties;

function PreviewBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-[#92b6c9] bg-cover bg-center"
      style={{ backgroundImage: "url('/styles/liquid-glass/glacier.webp')" }}
    />
  );
}

function PreviewScene({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div className={`relative isolate w-full overflow-hidden rounded-2xl bg-[#92b6c9] ${className}`}>
      <PreviewBackdrop />
      <div className="relative flex min-h-[168px] w-full flex-col items-center justify-center gap-4 p-5">
        {children}
      </div>
    </div>
  );
}

function CoverPreview({ locale }: { locale?: "zh" | "en" }) {
  return (
    <div
      className="relative isolate h-full min-h-[150px] w-full overflow-hidden bg-[#92b6c9] text-[#17374c]"
      style={{ containerType: "inline-size" }}
    >
      <PreviewBackdrop />
      <div className="absolute inset-x-[7%] top-[9%] flex items-center justify-between font-mono text-[clamp(6px,2cqw,10px)] font-medium uppercase tracking-[0.18em]">
        <span>StyleKit / 01</span>
        <span>64°02′ N</span>
      </div>

      <div className="absolute left-[7%] top-[24%]">
        <h2 className="whitespace-pre-line font-sans text-[clamp(22px,9.5cqw,48px)] font-medium leading-[0.96] tracking-[-0.065em]">
          {previewCopy(locale, "液态\n玻璃", "Liquid\nGlass.")}
        </h2>
      </div>

      <div className="absolute right-[7%] top-[30%] w-[41%]">
        <LiquidGlass
          appearance="clear"
          settings={clearMaterial}
          radius={24}
          tint="rgba(240, 250, 255, 0.055)"
          style={paleGlass}
          contentClassName="aspect-[1.48] p-[11%]"
        >
          <div className="flex items-center justify-between gap-2">
            <Waves
              aria-hidden="true"
              className="h-[clamp(13px,5cqw,24px)] w-[clamp(13px,5cqw,24px)] shrink-0"
              strokeWidth={1.45}
            />
            <p className="min-w-0 flex-1 text-[clamp(8px,2.6cqw,13px)] font-semibold tracking-tight">
              {previewCopy(locale, "冰川", "Glacier")}
            </p>
            <span className="font-mono text-[clamp(8px,3cqw,14px)]">03°</span>
          </div>
        </LiquidGlass>
      </div>

      <div className="absolute bottom-[9%] left-[7%] flex items-center gap-2">
        <LiquidGlass
          appearance="clear"
          settings={clearMaterial}
          radius={999}
          tint="rgba(240, 250, 255, 0.075)"
          style={paleGlass}
          contentClassName="flex items-center gap-[2cqw] px-[4cqw] py-[2.5cqw]"
        >
          <span className="text-[clamp(7px,2.5cqw,12px)] font-semibold">
            {previewCopy(locale, "走近光线", "Explore the light")}
          </span>
          <ArrowUpRight aria-hidden="true" className="h-[3.5cqw] w-[3.5cqw]" strokeWidth={1.6} />
        </LiquidGlass>
        <LiquidGlass
          appearance="clear"
          settings={clearMaterial}
          radius={999}
          tint="rgba(240, 250, 255, 0.055)"
          style={paleGlass}
          contentClassName="flex h-[8.5cqw] w-[8.5cqw] items-center justify-center"
        >
          <Compass aria-hidden="true" className="h-[4cqw] w-[4cqw]" strokeWidth={1.5} />
        </LiquidGlass>
      </div>
    </div>
  );
}

function ButtonPreview({ locale }: { locale?: "zh" | "en" }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = `light-notes-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <PreviewScene className="text-[#17374c]">
      <LiquidGlass
        appearance="clear"
        settings={clearMaterial}
        radius={999}
        tint="rgba(240, 250, 255, 0.08)"
        style={paleGlass}
        className="max-w-full transition-transform duration-200 has-[button:active]:scale-[0.96] motion-reduce:transform-none motion-reduce:transition-none"
      >
        <button
          type="button"
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setDetailsOpen((open) => !open)}
          className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-transparent px-6 py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17374c]"
        >
          {previewCopy(
            locale,
            detailsOpen ? "收起光线" : "查看光线",
            detailsOpen ? "Hide light" : "View light",
          )}
          <ArrowUpRight
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${detailsOpen ? "rotate-45" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"}`}
            strokeWidth={1.7}
          />
        </button>
      </LiquidGlass>
      <p
        id={detailsId}
        hidden={!detailsOpen}
        className="rounded-lg bg-[#e5f0f5]/90 px-3 py-2 text-center font-mono text-[10px] leading-relaxed"
      >
        {previewCopy(locale, "09:41 · 冰河湖 · 晴", "09:41 · GLACIER LAGOON · CLEAR SKIES")}
      </p>
    </PreviewScene>
  );
}

function CardPreview({ locale }: { locale?: "zh" | "en" }) {
  return (
    <PreviewScene className="text-[#17374c]">
      <LiquidGlass
        appearance="clear"
        settings={clearMaterial}
        radius={24}
        tint="rgba(240, 250, 255, 0.065)"
        style={paleGlass}
        className="w-full max-w-72"
        contentClassName="min-h-36 px-5 py-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-sans text-base font-semibold tracking-tight">
            {previewCopy(locale, "冰河湖的光", "Glacial light")}
          </h3>
          <span className="font-mono text-xs font-medium">03°</span>
        </div>
        <p className="mt-1 text-xs font-medium">
          {previewCopy(locale, "冰岛 · 杰古沙龙冰河湖", "Jökulsárlón, Iceland")}
        </p>
      </LiquidGlass>
    </PreviewScene>
  );
}

function InputPreview({ locale }: { locale?: "zh" | "en" }) {
  const inputId = `glacier-search-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <PreviewScene className="text-[#17374c]">
      <label className="sr-only" htmlFor={inputId}>
        {previewCopy(locale, "搜索地点", "Search places")}
      </label>
      <LiquidGlass
        appearance="clear"
        settings={clearMaterial}
        radius={999}
        tint="rgba(240, 250, 255, 0.09)"
        style={paleGlass}
        className="w-full max-w-80 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#17374c]"
        contentClassName="flex items-center gap-2 pl-4 pr-3"
      >
        <Search aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.7} />
        <input
          id={inputId}
          type="search"
          placeholder={previewCopy(locale, "寻找一处风景", "Find a place")}
          className="h-12 min-w-0 flex-1 rounded-full border-0 bg-transparent text-sm font-medium text-[#17374c] outline-none placeholder:text-[#345469]"
        />
      </LiquidGlass>
    </PreviewScene>
  );
}

const preview = {
  button: ({ locale } = {}) => <ButtonPreview locale={locale} />,
  card: ({ locale } = {}) => <CardPreview locale={locale} />,
  input: ({ locale } = {}) => <InputPreview locale={locale} />,
  coverPreview: ({ locale } = {}) => <CoverPreview locale={locale} />,
} satisfies StylePreviewComponents;

export default preview;
