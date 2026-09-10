"use client";

import { Suspense, useMemo, useState } from "react";
import { Check, Copy, Minus, Plus, RotateCcw } from "lucide-react";
import {
  DEMO_IMAGES,
  PARAM_RANGES,
  SHADER_CATALOG,
  SHADER_CATEGORIES,
  getInitialParams,
  getVisibleParamKeys,
  type ShaderCatalogEntry,
  type ShaderParamValue,
  type ShaderParams,
} from "@/components/shaders/shader-catalog";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

type Lang = "en" | "zh";

const copy = {
  en: {
    description:
      "Zero-dependency WebGL2 background shaders from Paper's open-source library. Gradients, fluids, noise, patterns and optics. Every parameter is live, then you copy the React snippet. One WebGL context at a time, paused automatically when off-screen.",
    categories: { all: "All" },
    controls: "Controls",
    presets: "Presets",
    reset: "Reset",
    sourceImage: "Source image",
    install: "Install",
    useIt: "Use it in React",
    copyCode: "Copy code",
    copied: "Copied",
    on: "On",
    off: "Off",
    credit: "Shaders by the open-source",
    loadingTexture: "loading texture",
    colors: "colors",
    addColor: "Add color",
    removeColor: "Remove color",
  },
  zh: {
    description:
      "来自 Paper 开源库的零依赖 WebGL2 背景着色器。渐变、流体、噪声、图案与光学,每个参数实时可调,调好后直接复制 React 代码片段。同一时刻只占用一个 WebGL context,离屏自动暂停渲染。",
    categories: { all: "全部" },
    controls: "参数调节",
    presets: "预设",
    reset: "重置",
    sourceImage: "源图像",
    install: "安装",
    useIt: "在你的项目里使用",
    copyCode: "复制代码",
    copied: "已复制",
    on: "开",
    off: "关",
    credit: "着色器来自开源项目",
    loadingTexture: "纹理加载中",
    colors: "颜色",
    addColor: "添加颜色",
    removeColor: "移除颜色",
  },
} as const;

// Hard cap on simultaneously rendered pixels; the shaders downscale instead of
// melting low-end GPUs.
const MAX_PIXEL_COUNT = 1_000_000;
const MAX_COLORS = 8;
const MIN_COLORS = 2;

function getRange(key: string, value: number): [number, number, number] {
  const preset = PARAM_RANGES[key];
  const step = Number.isInteger(value) ? 1 : 0.01;
  // A shipped preset value must never sit outside its own slider, or the first
  // drag snaps it back into range and destroys the preset look. Widen the
  // declared range to always contain the current value (with headroom), and
  // let the low end follow a negative value down.
  if (preset) {
    const [min, max, presetStep] = preset;
    return [Math.min(min, value), Math.max(max, Math.ceil(value)), presetStep];
  }
  const max = value > 1 ? Math.ceil(value * 2) : 1;
  return [Math.min(0, value), max, step];
}

function serializeValue(value: ShaderParamValue): string {
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") return String(value);
  return `[${value.map((color) => `"${color}"`).join(", ")}]`;
}

function buildSnippet(entry: ShaderCatalogEntry, params: ShaderParams): string {
  const keys = getVisibleParamKeys(entry);
  const props = keys
    .map((key) => {
      const value = params[key];
      if (value === undefined) return null;
      return `      ${key}={${serializeValue(value)}}`;
    })
    .filter(Boolean);
  // The demo image is a StyleKit-local path, so never emit it as a working prop
  // in code the visitor pastes into their own project — point them at their own
  // asset instead.
  if (entry.defaultImage) {
    props.push(`      image="/your-image.jpg" // swap for your own image URL`);
  }
  const propsBlock = props.join("\n");
  return [
    `import { ${entry.nameEn} } from "@paper-design/shaders-react";`,
    "",
    "export function Background() {",
    "  return (",
    `    <${entry.nameEn}`,
    propsBlock,
    `      style={{ width: "100%", height: "100%" }}`,
    "    />",
    "  );",
    "}",
  ].join("\n");
}

function SegmentedButtons({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex border border-border" role="group" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "px-3 py-1 font-mono text-xs transition-colors",
            "first:border-l-0 border-l border-border",
            value === option.value
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ColorSwatchInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  // <input type="color"> only accepts #rrggbb. Some presets ship 8-digit hex
  // with alpha (#rrggbbaa); feed the picker the opaque 6-digit form so it does
  // not silently reset, while the swatch still shows the true colour (alpha and
  // all) and edits preserve nothing beyond what the picker can express.
  const pickerValue = /^#[0-9a-fA-F]{8}$/.test(value) ? value.slice(0, 7) : value;
  return (
    <span className="relative inline-flex h-8 w-8 shrink-0 border border-border focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-foreground">
      <input
        type="color"
        value={pickerValue}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="h-full w-full cursor-pointer bg-transparent p-0 opacity-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: value }}
      />
    </span>
  );
}

function ParamRow({
  paramKey,
  value,
  enums,
  labels,
  onChange,
}: {
  paramKey: string;
  value: ShaderParamValue;
  enums?: Record<string, string | number>;
  labels: { on: string; off: string };
  onChange: (value: ShaderParamValue) => void;
}) {
  // Color list: one row of swatches, add and remove inline.
  if (Array.isArray(value)) {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
          {paramKey}
        </span>
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {value.map((color, index) => (
            <span key={index} className="relative inline-flex">
              <ColorSwatchInput
                value={color}
                label={`color ${index + 1}`}
                onChange={(next) => {
                  const colors = [...value];
                  colors[index] = next;
                  onChange(colors);
                }}
              />
              {value.length > MIN_COLORS && (
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center border border-border bg-background text-muted hover:text-foreground"
                  aria-label={`remove color ${index + 1}`}
                >
                  <Minus className="h-3 w-3" aria-hidden="true" />
                </button>
              )}
            </span>
          ))}
          {value.length < MAX_COLORS && (
            <button
              type="button"
              onClick={() => onChange([...value, "#808080"])}
              className="grid h-8 w-8 place-items-center border border-border text-muted hover:text-foreground"
              aria-label="add color"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Single color.
  if (typeof value === "string" && value.startsWith("#")) {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
          {paramKey}
        </span>
        <div className="flex flex-1 items-center gap-2">
          <ColorSwatchInput
            value={value}
            label={paramKey}
            onChange={(next) => onChange(next)}
          />
          <span className="font-mono text-xs text-muted">{value}</span>
        </div>
      </div>
    );
  }

  // Boolean.
  if (typeof value === "boolean") {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
          {paramKey}
        </span>
        <div className="flex-1">
          <SegmentedButtons
            ariaLabel={paramKey}
            value={value ? "on" : "off"}
            onChange={(next) => onChange(next === "on")}
            options={[
              { value: "off", label: labels.off },
              { value: "on", label: labels.on },
            ]}
          />
        </div>
      </div>
    );
  }

  // Enum: string keys mapped to engine numbers, rendered as segmented buttons.
  if (typeof value === "string" && enums) {
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
          {paramKey}
        </span>
        <div className="flex flex-1 flex-wrap">
          <SegmentedButtons
            ariaLabel={paramKey}
            value={value}
            onChange={(next) => onChange(next)}
            options={Object.keys(enums).map((key) => ({ value: key, label: key }))}
          />
        </div>
      </div>
    );
  }

  // Number slider.
  if (typeof value === "number") {
    const [min, max, step] = getRange(paramKey, value);
    return (
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
          {paramKey}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label={paramKey}
          className="flex-1"
        />
        <span className="w-14 shrink-0 text-right font-mono text-xs tabular-nums text-muted">
          {value}
        </span>
      </div>
    );
  }

  return null;
}

export function ShadersContent() {
  const { locale } = useI18n();
  const lang: Lang = locale === "zh" ? "zh" : "en";
  const t = copy[lang];

  const [category, setCategory] = useState<string>("all");
  const [shaderId, setShaderId] = useState(SHADER_CATALOG[0].id);
  const entry = useMemo(
    () => SHADER_CATALOG.find((shader) => shader.id === shaderId) ?? SHADER_CATALOG[0],
    [shaderId]
  );
  const [params, setParams] = useState<ShaderParams>(() =>
    getInitialParams(SHADER_CATALOG[0])
  );
  const [snippetCopied, setSnippetCopied] = useState(false);
  const [installCopied, setInstallCopied] = useState(false);

  const visibleShaders = useMemo(
    () =>
      category === "all"
        ? SHADER_CATALOG
        : SHADER_CATALOG.filter((shader) => shader.category === category),
    [category]
  );

  const paramKeys = useMemo(() => getVisibleParamKeys(entry), [entry]);
  const snippet = useMemo(() => buildSnippet(entry, params), [entry, params]);
  const ShaderComponent = entry.Component;

  const selectShader = (id: string) => {
    const next =
      SHADER_CATALOG.find((shader) => shader.id === id) ?? SHADER_CATALOG[0];
    setShaderId(next.id);
    setParams(getInitialParams(next));
  };

  const selectPreset = (presetParams: ShaderParams) => {
    setParams({
      ...presetParams,
      // Keep the currently chosen demo image; presets ship an empty string.
      ...(entry.defaultImage ? { image: params.image } : {}),
    });
  };

  const setParam = (key: string, value: ShaderParamValue) => {
    setParams((previous) => ({ ...previous, [key]: value }));
  };

  const copyText = async (text: string, mark: (copied: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      mark(true);
      setTimeout(() => mark(false), 1600);
    } catch {
      // Clipboard may be unavailable (insecure context); nothing to recover.
    }
  };

  return (
    <div>
      <div className="mb-6 max-w-3xl">
        <p className="text-base leading-relaxed text-muted">{t.description}</p>
      </div>

      {/* Shader picker: category chips over a wrapped list of shader names. */}
      <div className="border border-border">
        <div
          className="flex flex-wrap items-center gap-2 border-b border-border p-3"
          role="group"
          aria-label="shader categories"
        >
          {[{ id: "all", nameEn: t.categories.all, nameZh: t.categories.all }, ...SHADER_CATEGORIES].map(
            (item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={cn(
                  "border px-3 py-1 text-xs transition-colors",
                  category === item.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {lang === "zh" ? item.nameZh : item.nameEn}
              </button>
            )
          )}
        </div>
        <div className="flex max-h-44 flex-wrap gap-1.5 overflow-y-auto p-3">
          {visibleShaders.map((shader) => (
            <button
              key={shader.id}
              type="button"
              onClick={() => selectShader(shader.id)}
              aria-pressed={shaderId === shader.id}
              className={cn(
                "border px-2.5 py-1 font-mono text-xs transition-colors",
                shaderId === shader.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {lang === "zh" ? shader.nameZh : shader.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Live canvas */}
        <div className="relative h-[420px] border border-border bg-slate-950 sm:h-[560px]">
          <Suspense
            fallback={
              <div className="grid h-full place-items-center font-mono text-xs text-white/40">
                {t.loadingTexture}
              </div>
            }
          >
            <ShaderComponent
              {...params}
              maxPixelCount={MAX_PIXEL_COUNT}
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
          <p className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mix-blend-difference">
            {entry.id}
          </p>
        </div>

        {/* Controls */}
        <aside className="border border-border">
          <div className="border-b border-border p-4">
            <h2 className="font-serif text-lg leading-tight">
              {lang === "zh" ? entry.nameZh : entry.nameEn}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {lang === "zh" ? entry.descZh : entry.descEn}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.presets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => selectPreset(preset.params)}
                  className="border border-border px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[520px] divide-y divide-border overflow-y-auto border-b border-border">
            {paramKeys.map((key) => (
              <ParamRow
                key={key}
                paramKey={key}
                value={params[key] as ShaderParamValue}
                enums={entry.enums?.[key]}
                labels={{ on: t.on, off: t.off }}
                onChange={(value) => setParam(key, value)}
              />
            ))}
            {entry.defaultImage && (
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-wide text-muted">
                  {t.sourceImage}
                </span>
                <div className="flex flex-1 gap-1.5">
                  {DEMO_IMAGES.map((image) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => setParam("image", image.url)}
                      aria-pressed={params.image === image.url}
                      title={lang === "zh" ? image.nameZh : image.nameEn}
                      className={cn(
                        "h-12 w-16 overflow-hidden border transition-colors",
                        params.image === image.url
                          ? "border-foreground"
                          : "border-border hover:border-foreground/40"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url}
                        alt={lang === "zh" ? image.nameZh : image.nameEn}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t.controls}
            </span>
            <button
              type="button"
              onClick={() => setParams(getInitialParams(entry))}
              className="flex items-center gap-1.5 border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              {t.reset}
            </button>
          </div>
        </aside>
      </div>

      {/* Code export */}
      <div className="mt-6 border border-border">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {t.useIt}
          </p>
          <button
            type="button"
            onClick={() => copyText(snippet, setSnippetCopied)}
            className="flex items-center gap-1.5 border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            {snippetCopied ? (
              <Check className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Copy className="h-3 w-3" aria-hidden="true" />
            )}
            {snippetCopied ? t.copied : t.copyCode}
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="shrink-0">$ pnpm add @paper-design/shaders-react</span>
            <button
              type="button"
              onClick={() =>
                copyText("pnpm add @paper-design/shaders-react", setInstallCopied)
              }
              aria-label={t.install}
              className="shrink-0 text-muted transition-colors hover:text-foreground"
            >
              {installCopied ? (
                <Check className="h-3 w-3" aria-hidden="true" />
              ) : (
                <Copy className="h-3 w-3" aria-hidden="true" />
              )}
            </button>
          </div>
          <pre className="mt-3 overflow-x-auto border border-border bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
            {snippet}
          </pre>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">
        {t.credit}{" "}
        <a
          href="https://github.com/paper-design/shaders"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          paper-design/shaders
        </a>{" "}
        · Apache-2.0
      </p>
    </div>
  );
}
