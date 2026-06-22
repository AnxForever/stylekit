"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, FlaskConical, RefreshCcw, TriangleAlert } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";

type DrawElementContext = CanvasRenderingContext2D & {
  drawElementImage?: (
    element: Element,
    dx: number,
    dy: number,
    dWidth?: number,
    dHeight?: number,
  ) => DOMMatrix;
};

type ExperimentalCanvas = HTMLCanvasElement & {
  requestPaint?: () => void;
};

const pageCopy = {
  en: {
    badge: "WICG experiment",
    title: "HTML drawn into canvas, without flattening the DOM first.",
    description:
      "This page probes the proposed HTML-in-Canvas API. If your browser exposes drawElementImage, the form card below is painted into the canvas while remaining real HTML.",
    detected: "drawElementImage detected",
    notDetected: "drawElementImage not detected",
    renderCalls: "Render calls",
    lastRender: "Last render",
    notPainted: "Not rendered yet",
    fallbackAt: "Fallback at",
    renderedAt: "Rendered at",
    requestPaint: "Request paint",
    canvasAria: "HTML-in-Canvas experimental drawing surface",
    canvasSurface: "Canvas surface",
    fallbackCanvasTitle: "drawElementImage unavailable",
    fallbackCanvasHint: "Open Chrome Canary and enable chrome://flags/#canvas-draw-element",
    liveDomSource: "Live DOM source",
    cardTitle: "Canvas-ready card",
    cardDescription: "A real button and input rendered through the proposal.",
    sampleField: "Sample field",
    realInput: "Real HTML input",
    realButton: "Real button",
    browserSupport: "Browser support",
    browserSupportBody:
      "Current stable browsers normally show the fallback. To test the real path, use Chrome Canary or Chromium with chrome://flags/#canvas-draw-element.",
    fallbackDomCopy: "Fallback DOM copy",
    fallbackDomBody: "This copy remains visible when the proposal is unavailable.",
  },
  zh: {
    badge: "WICG 实验",
    title: "把真实 HTML 画进 canvas，而不是先把 DOM 压平成图片。",
    description:
      "这个页面用于验证 HTML-in-Canvas 提案。如果浏览器暴露 drawElementImage，下面的表单卡片会以真实 HTML 的身份被绘制进 canvas。",
    detected: "已检测到 drawElementImage",
    notDetected: "未检测到 drawElementImage",
    renderCalls: "渲染次数",
    lastRender: "最近渲染",
    notPainted: "尚未渲染",
    fallbackAt: "降级渲染于",
    renderedAt: "真实渲染于",
    requestPaint: "请求重绘",
    canvasAria: "HTML-in-Canvas 实验绘制区域",
    canvasSurface: "Canvas 画布",
    fallbackCanvasTitle: "drawElementImage 不可用",
    fallbackCanvasHint: "请使用 Chrome Canary 并开启 chrome://flags/#canvas-draw-element",
    liveDomSource: "真实 DOM 来源",
    cardTitle: "可绘制到 Canvas 的卡片",
    cardDescription: "真实按钮和输入框，通过提案 API 渲染。",
    sampleField: "示例字段",
    realInput: "真实 HTML 输入框",
    realButton: "真实按钮",
    browserSupport: "浏览器支持",
    browserSupportBody:
      "当前稳定版浏览器通常会显示降级视图。要测试真实路径，请使用 Chrome Canary 或 Chromium，并开启 chrome://flags/#canvas-draw-element。",
    fallbackDomCopy: "降级 DOM 副本",
    fallbackDomBody: "当实验 API 不可用时，这个副本会保持可见。",
  },
} as const;

export default function HtmlInCanvasPage() {
  const { locale } = useI18n();
  const copy = locale === "zh" ? pageCopy.zh : pageCopy.en;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const [supported, setSupported] = useState(false);
  const [paintCount, setPaintCount] = useState(0);
  const [lastPaint, setLastPaint] = useState("");

  const drawFallback = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.22)";
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#f8fafc";
    ctx.font = "600 20px system-ui, sans-serif";
    ctx.fillText(copy.fallbackCanvasTitle, 32, 56);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText(copy.fallbackCanvasHint, 32, 86);
  }, [copy]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current as ExperimentalCanvas | null;
    const source = sourceRef.current;
    const rawContext = canvas?.getContext("2d");

    if (!canvas || !source || !rawContext) return;

    const ctx = rawContext as DrawElementContext;
    const rect = canvas.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * scale));
    const height = Math.max(1, Math.round(rect.height * scale));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    if (typeof ctx.reset === "function") {
      ctx.reset();
    } else {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = "rgba(125, 211, 252, 0.22)";
    ctx.lineWidth = 1;

    for (let x = 0; x < rect.width; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }

    for (let y = 0; y < rect.height; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    ctx.fillStyle = "#7dd3fc";
    ctx.font = "12px system-ui, sans-serif";
    ctx.fillText(copy.canvasSurface, 28, 32);

    if (!ctx.drawElementImage) {
      setSupported(false);
      drawFallback(ctx, rect.width, rect.height);
      setPaintCount((count) => count + 1);
      setLastPaint(`${copy.fallbackAt} ${new Date().toLocaleTimeString()}`);
      return;
    }

    try {
      setSupported(true);
      const transform = ctx.drawElementImage(source, 72, 84, 320, 210);
      source.style.transform = transform.toString();
      setPaintCount((count) => count + 1);
      setLastPaint(`${copy.renderedAt} ${new Date().toLocaleTimeString()}`);
    } catch (error) {
      ctx.fillStyle = "#fecaca";
      ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText(error instanceof Error ? error.message : "Unable to draw element snapshot", 28, 72);
    }
  }, [copy, drawFallback]);

  useEffect(() => {
    const canvas = canvasRef.current as ExperimentalCanvas | null;
    if (!canvas) return;

    canvas.setAttribute("layoutsubtree", "");

    const handlePaint = () => paint();
    canvas.addEventListener("paint", handlePaint);

    const observer = new ResizeObserver(() => {
      if (canvas.requestPaint) {
        canvas.requestPaint();
      } else {
        paint();
      }
    });
    observer.observe(canvas);

    const frame = window.requestAnimationFrame(() => paint());

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("paint", handlePaint);
    };
  }, [paint]);

  const requestPaint = () => {
    const canvas = canvasRef.current as ExperimentalCanvas | null;
    if (canvas?.requestPaint) {
      canvas.requestPaint();
      return;
    }
    paint();
  };

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#111827]">
      <Header />

      <main>
        <section className="border-b border-[#d7d0c4]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-12 md:py-16">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 border border-[#111827] bg-[#c7f9cc] px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <FlaskConical className="h-4 w-4" />
                {copy.badge}
              </div>
              <h1 className="max-w-xl text-4xl leading-tight md:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#425466] md:text-lg">
                {copy.description}
              </p>
            </div>

            <div className="grid content-start gap-3 border border-[#111827] bg-white p-4 shadow-[8px_8px_0_#111827]">
              <StatusRow
                ok={supported}
                label={supported ? copy.detected : copy.notDetected}
              />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Metric label={copy.renderCalls} value={String(paintCount)} />
                <Metric label={copy.lastRender} value={lastPaint || copy.notPainted} />
              </div>
              <button
                type="button"
                onClick={requestPaint}
                className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 border border-[#111827] bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2f3a4a]"
              >
                <RefreshCcw className="h-4 w-4" />
                {copy.requestPaint}
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-[1.35fr_0.65fr] md:px-12 md:py-12">
          <div className="border border-[#111827] bg-white p-3 shadow-[8px_8px_0_#111827]">
            <canvas
              ref={canvasRef}
              className="block h-[460px] w-full bg-[#0b0f14]"
              aria-label={copy.canvasAria}
            >
              <div
                ref={sourceRef}
                aria-hidden={!supported}
                inert={supported ? undefined : true}
                className="absolute left-0 top-0 w-[320px] border border-[#111827] bg-[#fef08a] p-5 text-[#111827] shadow-[6px_6px_0_#38bdf8]"
              >
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#425466]">
                  {copy.liveDomSource}
                </p>
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl leading-none">{copy.cardTitle}</h2>
                    <p className="mt-2 text-sm text-[#425466]">
                      {copy.cardDescription}
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center border border-[#111827] bg-[#c7f9cc] text-sm font-bold">
                    UI
                  </span>
                </div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest">
                  {copy.sampleField}
                </label>
                <input
                  className="mb-4 h-10 w-full border border-[#111827] bg-white px-3 text-sm outline-none"
                  defaultValue={copy.realInput}
                />
                <button
                  type="button"
                  className="h-10 border border-[#111827] bg-[#111827] px-4 text-sm font-semibold text-white"
                >
                  {copy.realButton}
                </button>
              </div>
            </canvas>
          </div>

          <aside className="grid content-start gap-4">
            <div className="border border-[#111827] bg-white p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                {supported ? (
                  <BadgeCheck className="h-5 w-5 text-[#15803d]" />
                ) : (
                  <TriangleAlert className="h-5 w-5 text-[#b45309]" />
                )}
                {copy.browserSupport}
              </div>
              <p className="text-sm leading-6 text-[#425466]">
                {copy.browserSupportBody}
              </p>
            </div>

            <div className="border border-[#111827] bg-[#c7f9cc] p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest">{copy.fallbackDomCopy}</p>
              <div className="border border-[#111827] bg-[#fef08a] p-4 shadow-[5px_5px_0_#38bdf8]">
                <p className="text-lg">{copy.cardTitle}</p>
                <p className="mt-2 text-sm text-[#425466]">
                  {copy.fallbackDomBody}
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function StatusRow({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3 border border-[#d7d0c4] bg-[#f7f3ec] px-3 py-3 text-sm">
      {ok ? (
        <BadgeCheck className="h-5 w-5 text-[#15803d]" />
      ) : (
        <TriangleAlert className="h-5 w-5 text-[#b45309]" />
      )}
      <span>{label}</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#d7d0c4] bg-[#f7f3ec] p-3">
      <p className="text-xs uppercase tracking-widest text-[#425466]">{label}</p>
      <p className="mt-2 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}
