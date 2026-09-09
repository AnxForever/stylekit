"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { installPreviewFonts, type PreviewFontResult } from "@/lib/style-preview/font-preview";
import { componentMotionCss } from "@/lib/style-preview/motion-css";
import { parsePreviewAssets, type PreviewAssets, type PreviewComponentKey } from "@/lib/style-preview/preview-assets";

export function ExtractedComponentPreview({ html, assets: rawAssets, componentKey }: {
  html: string;
  assets: PreviewAssets;
  componentKey: string;
}) {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const id = useId();
  const scope = `preview-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const container = useRef<HTMLDivElement>(null);
  const assets = useMemo(() => parsePreviewAssets(rawAssets), [rawAssets]);
  const [playing, setPlaying] = useState(false);
  const [fontResult, setFontResult] = useState<{ assets: PreviewAssets; result: PreviewFontResult }>();
  const motion = assets?.motion?.[componentKey as PreviewComponentKey];
  const css = useMemo(() => componentMotionCss(motion, scope, playing), [motion, scope, playing]);
  const fontStatus = assets && fontResult?.assets === assets ? fontResult.result : undefined;
  const fontNames = [...new Set(assets?.fonts?.map((font) => font.family) ?? [])];
  const hasAnimation = Boolean(motion?.animations?.length);
  const hasStates = Boolean(Object.keys(motion?.states ?? {}).length);

  useEffect(() => {
    if (!container.current || !assets?.fonts?.length) return;
    let current = true;
    const fonts = installPreviewFonts(container.current, assets.fonts, scope);
    void fonts.ready.then((result) => {
      if (current) setFontResult({ assets, result });
    });
    return () => {
      current = false;
      fonts.cleanup();
    };
  }, [assets, html, scope]);

  return (
    <div className="space-y-5">
      {(fontNames.length > 0 || hasStates || hasAnimation) && (
        <div className="flex flex-wrap items-start justify-between gap-3 text-xs leading-relaxed">
          <div className="min-w-0 space-y-1">
            {fontNames.length > 0 && <p className="break-words">{zh ? "字体：" : "Fonts: "}{fontNames.join(", ")}</p>}
            {fontNames.length > 0 && <p role="status" className="opacity-70">
              {!fontStatus
                ? (zh ? "正在加载字体…" : "Loading fonts…")
                : fontStatus.fallback > 0
                  ? (zh ? "部分字体未能加载，当前使用备用字体。" : "Some fonts are unavailable; their fallbacks are shown.")
                  : (zh ? "原站字体已加载。" : "Website fonts loaded.")}
            </p>}
            {hasStates && <p className="opacity-70">{zh ? "悬停、按下或用 Tab 聚焦，查看交互状态。" : "Hover, press or focus with Tab to try the interaction states."}</p>}
            {hasAnimation && <p className="hidden opacity-70 motion-reduce:block">{zh ? "系统已开启减少动态效果，动画预览已关闭。" : "Animation preview is disabled by your reduced motion setting."}</p>}
          </div>
          {hasAnimation && <button
            type="button"
            aria-pressed={playing}
            onClick={() => setPlaying((value) => !value)}
            className="shrink-0 border border-current px-3 py-1.5 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:hidden"
          >
            {playing ? (zh ? "停止动画" : "Stop animation") : (zh ? "播放动画" : "Play animation")}
          </button>}
        </div>
      )}
      {css && <style>{css}</style>}
      <div ref={container} data-stylekit-preview={scope} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
