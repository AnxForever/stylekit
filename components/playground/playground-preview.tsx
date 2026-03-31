"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  Loader2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2,
  MousePointer,
  Eye,
  X
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface PlaygroundPreviewProps {
  code: string;
  styleSlug: string;
  /** CSS variables/tokens to inject as inline styles */
  tokenCss: string;
  deviceWidth?: number;
  onElementSelect?: (info: ElementInfo | null) => void;
}

export interface ElementInfo {
  tagName: string;
  classes: string[];
  id?: string;
  computedStyles?: Record<string, string>;
}

// 构建增强的预览文档
function buildSrcdoc(code: string, tokenCss: string, inspectorEnabled: boolean): string {
  // Escape closing script tags in user code to prevent srcdoc breakout
  const safeCode = code.replace(/<\/script/gi, "<\\/script");

  // 元素检查器脚本
  const inspectorScript = inspectorEnabled ? `
    <script>
      (function() {
        let hoveredEl = null;
        let highlightOverlay = null;
        let tooltip = null;

        function createOverlay() {
          highlightOverlay = document.createElement('div');
          highlightOverlay.id = 'sk-highlight-overlay';
          highlightOverlay.style.cssText = 'position:fixed;pointer-events:none;border:2px solid #3b82f6;background:rgba(59,130,246,0.1);z-index:99999;display:none;transition:all 0.1s ease;';
          document.body.appendChild(highlightOverlay);

          tooltip = document.createElement('div');
          tooltip.id = 'sk-tooltip';
          tooltip.style.cssText = 'position:fixed;pointer-events:none;z-index:100000;padding:4px 8px;background:#18181b;color:#fff;font-size:11px;font-family:ui-monospace,monospace;border-radius:4px;max-width:300px;word-break:break-all;display:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);';
          document.body.appendChild(tooltip);
        }

        function updateHighlight(el) {
          if (!el || el === document.body || el === document.documentElement) {
            highlightOverlay.style.display = 'none';
            tooltip.style.display = 'none';
            return;
          }

          const rect = el.getBoundingClientRect();
          highlightOverlay.style.left = rect.left + 'px';
          highlightOverlay.style.top = rect.top + 'px';
          highlightOverlay.style.width = rect.width + 'px';
          highlightOverlay.style.height = rect.height + 'px';
          highlightOverlay.style.display = 'block';

          // 构建 tooltip 内容
          let label = '<' + el.tagName.toLowerCase();
          if (el.id) label += '#' + el.id;
          if (el.className && typeof el.className === 'string') {
            const classes = el.className.split(' ').filter(c => c && !c.startsWith('sk-'));
            if (classes.length > 0) {
              label += '.' + classes.slice(0, 3).join('.');
              if (classes.length > 3) label += ' (+' + (classes.length - 3) + ')';
            }
          }
          label += '>';
          
          tooltip.textContent = label;
          tooltip.style.display = 'block';
          
          // 定位 tooltip
          let tooltipTop = rect.top - 28;
          if (tooltipTop < 4) tooltipTop = rect.bottom + 4;
          tooltip.style.left = Math.max(4, rect.left) + 'px';
          tooltip.style.top = tooltipTop + 'px';
        }

        function handleMouseMove(e) {
          const el = document.elementFromPoint(e.clientX, e.clientY);
          if (el !== hoveredEl) {
            hoveredEl = el;
            updateHighlight(el);
          }
        }

        function handleClick(e) {
          e.preventDefault();
          e.stopPropagation();
          const el = document.elementFromPoint(e.clientX, e.clientY);
          if (el && el !== document.body && el !== document.documentElement) {
            const classes = el.className && typeof el.className === 'string' 
              ? el.className.split(' ').filter(c => c && !c.startsWith('sk-'))
              : [];
            const info = {
              tagName: el.tagName.toLowerCase(),
              classes: classes,
              id: el.id || undefined
            };
            window.parent.postMessage({ type: 'SK_ELEMENT_SELECT', payload: info }, '*');
          }
        }

        function handleMouseLeave() {
          hoveredEl = null;
          if (highlightOverlay) highlightOverlay.style.display = 'none';
          if (tooltip) tooltip.style.display = 'none';
        }

        // 初始化
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
        } else {
          init();
        }

        function init() {
          createOverlay();
          document.addEventListener('mousemove', handleMouseMove, true);
          document.addEventListener('click', handleClick, true);
          document.addEventListener('mouseleave', handleMouseLeave);
        }
      })();
    <\\/script>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"><\\/script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; }
    /* 平滑滚动 */
    html { scroll-behavior: smooth; }
    /* 隐藏滚动条但保持滚动功能 */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.3); }
    ${tokenCss}
  </style>
</head>
<body>
  <div id="preview-root">${safeCode}</div>
  ${inspectorScript}
</body>
</html>`;
}

// 缩放级别选项
const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function PlaygroundPreview({
  code,
  styleSlug,
  tokenCss,
  deviceWidth,
  onElementSelect,
}: PlaygroundPreviewProps) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  
  const [debouncedCode, setDebouncedCode] = useState(code);
  const [debouncedTokenCss, setDebouncedTokenCss] = useState(tokenCss);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inspectorEnabled, setInspectorEnabled] = useState(false);
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Derive loading from whether inputs differ from debounced values
  const loading = code !== debouncedCode || tokenCss !== debouncedTokenCss;

  // Debounce code + tokenCss updates
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedCode(code);
      setDebouncedTokenCss(tokenCss);
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [code, tokenCss]);

  // 监听来自 iframe 的消息
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === 'SK_ELEMENT_SELECT') {
        const info = e.data.payload as ElementInfo;
        setSelectedElement(info);
        onElementSelect?.(info);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onElementSelect]);

  // 全屏切换
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // 监听全屏变化
  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 缩放控制
  const handleZoomIn = useCallback(() => {
    const currentIdx = ZOOM_LEVELS.indexOf(zoom);
    if (currentIdx < ZOOM_LEVELS.length - 1) {
      setZoom(ZOOM_LEVELS[currentIdx + 1]);
    }
  }, [zoom]);

  const handleZoomOut = useCallback(() => {
    const currentIdx = ZOOM_LEVELS.indexOf(zoom);
    if (currentIdx > 0) {
      setZoom(ZOOM_LEVELS[currentIdx - 1]);
    }
  }, [zoom]);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  const srcdoc = useMemo(
    () => buildSrcdoc(debouncedCode, debouncedTokenCss, inspectorEnabled),
    [debouncedCode, debouncedTokenCss, inspectorEnabled]
  );

  // 关闭元素信息面板
  const clearSelection = useCallback(() => {
    setSelectedElement(null);
    onElementSelect?.(null);
  }, [onElementSelect]);

  return (
    <div 
      ref={containerRef}
      className={`relative h-full w-full bg-white dark:bg-zinc-900 flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50' : ''
      }`}
    >
      {/* 预览控制栏 */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-border bg-zinc-50 dark:bg-zinc-900 shrink-0">
        <div className="flex items-center gap-1">
          {/* Zoom Controls */}
          <button
            onClick={handleZoomOut}
            disabled={zoom <= ZOOM_LEVELS[0]}
            className="p-1 text-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title={isZh ? "缩小" : "Zoom Out"}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={handleZoomReset}
            className="px-1.5 py-0.5 text-[10px] font-mono text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors min-w-[40px] text-center"
            title={isZh ? "重置缩放" : "Reset Zoom"}
          >
            {Math.round(zoom * 100)}%
          </button>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
            className="p-1 text-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title={isZh ? "放大" : "Zoom In"}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-3 bg-border mx-1" />

          {/* Element Inspector */}
          <button
            onClick={() => setInspectorEnabled(!inspectorEnabled)}
            className={`p-1 transition-colors ${
              inspectorEnabled 
                ? 'text-blue-500 bg-blue-500/10' 
                : 'text-muted hover:text-foreground'
            }`}
            title={inspectorEnabled 
              ? (isZh ? "关闭元素检查" : "Disable Inspector") 
              : (isZh ? "开启元素检查" : "Enable Inspector")}
          >
            <MousePointer className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1 text-muted hover:text-foreground transition-colors"
            title={isFullscreen 
              ? (isZh ? "退出全屏" : "Exit Fullscreen") 
              : (isZh ? "全屏预览" : "Enter Fullscreen")}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute top-10 right-2 z-10 flex items-center gap-1.5 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-muted">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>{isZh ? "更新中..." : "Updating..."}</span>
        </div>
      )}

      {/* 选中元素信息面板 */}
      {selectedElement && (
        <div className="absolute top-10 left-2 z-10 flex items-start gap-2 px-3 py-2 bg-zinc-900 dark:bg-zinc-800 rounded-lg shadow-lg text-xs text-white max-w-[280px]">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-blue-400 font-mono">&lt;{selectedElement.tagName}&gt;</span>
              {selectedElement.id && (
                <span className="text-yellow-400 font-mono">#{selectedElement.id}</span>
              )}
            </div>
            {selectedElement.classes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedElement.classes.map((cls, i) => (
                  <span 
                    key={i} 
                    className="px-1.5 py-0.5 bg-zinc-700 rounded text-[10px] font-mono text-zinc-300"
                  >
                    .{cls}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={clearSelection}
            className="p-0.5 text-zinc-500 hover:text-white transition-colors shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* 预览 iframe */}
      <div 
        className="flex-1 overflow-auto flex items-start justify-center p-4"
        style={{ 
          backgroundColor: isFullscreen ? '#f4f4f5' : undefined 
        }}
      >
        <div
          className="bg-white dark:bg-zinc-900 shadow-sm overflow-hidden transition-all duration-200 origin-top-left"
          style={{
            width: deviceWidth ? `${deviceWidth}px` : '100%',
            maxWidth: '100%',
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
          }}
        >
          <iframe
            ref={iframeRef}
            key={`${styleSlug}-${inspectorEnabled}`}
            srcDoc={srcdoc}
            className="w-full border-0"
            style={{ 
              height: `${100 / zoom}vh`,
              maxWidth: deviceWidth ? deviceWidth : undefined,
            }}
            title="Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>

      {/* Inspector Mode Hint */}
      {inspectorEnabled && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-full text-xs shadow-lg">
          <Eye className="w-3 h-3" />
          <span>{isZh ? "点击元素查看类名" : "Click elements to inspect"}</span>
        </div>
      )}
    </div>
  );
}
