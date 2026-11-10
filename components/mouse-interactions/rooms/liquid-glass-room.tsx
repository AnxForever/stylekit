"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { Move } from "lucide-react";
import { LiquidGlass, useOpaqueGlassPreference, useSvgBackdropSupport } from "@/components/liquid-glass/liquid-glass";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import type { RoomProps } from "./types";

type Point = { x: number; y: number };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const material = { light: 72, refraction: 62, depth: 40, dispersion: 5, frost: 1.1, spread: 52 };
const paleGlass = { "--liquid-solid-fill": "#dce9ef" } as CSSProperties;

const copy = {
  en: {
    header: "Room 09 — Liquid Glass",
    move: "Move glass lens; click to center",
    instruction: "Move your pointer or tap to place the lens. Focus it to use the arrow keys; Home or Enter centers it. Touch swipes scroll normally.",
    glass: "Glass",
    frost: "Frost",
    solid: "Solid",
    live: "Move across the ice to see the edges bend while the center stays clear.",
    fallback: "Frosted alternative. Live refraction is available in Chrome and Edge.",
    opaque: "Your display preference uses a solid surface.",
  },
  zh: {
    header: "房间 09 — 液态玻璃",
    move: "移动玻璃透镜；点击居中",
    instruction: "移动鼠标或轻点定位。聚焦透镜后可用方向键移动，Home 或 Enter 居中；触屏滑动仍可正常滚动。",
    glass: "清透",
    frost: "磨砂",
    solid: "实体",
    live: "让透镜经过冰川，看边缘弯折，中心依然清晰。",
    fallback: "当前显示磨砂替代材质，Chrome 和 Edge 可体验实时折射。",
    opaque: "已按你的显示偏好使用实体材质。",
  },
} as const;

export function LiquidGlassRoom({ className, showHeader = true }: RoomProps) {
  const { locale } = useI18n();
  const t = copy[locale];
  const supported = useSvgBackdropSupport();
  const opaque = useOpaqueGlassPreference();
  const instructionId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const position = useRef<Point | null>(null);
  const touchStart = useRef<(Point & { id: number }) | null>(null);

  const place = useCallback((point?: Point) => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens || stage.clientWidth === 0 || stage.clientHeight === 0) return;
    const minX = Math.min(12, Math.max(0, (stage.clientWidth - lens.offsetWidth) / 2));
    const minY = Math.min(12, Math.max(0, (stage.clientHeight - lens.offsetHeight) / 2));
    const maxX = Math.max(minX, stage.clientWidth - lens.offsetWidth - minX);
    const maxY = Math.max(minY, stage.clientHeight - lens.offsetHeight - minY);
    const next = {
      x: clamp(point?.x ?? (minX + maxX) / 2, minX, maxX),
      y: clamp(point?.y ?? (minY + maxY) / 2, minY, maxY),
    };
    position.current = next;
    lens.style.left = "0";
    lens.style.top = "0";
    // Direct event-driven placement: no spring, idle ticker or animation loop.
    lens.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
  }, []);

  useEffect(() => {
    place();
    const resize = () => place(position.current ?? undefined);
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
    const observer = new ResizeObserver(resize);
    if (stageRef.current) observer.observe(stageRef.current);
    if (lensRef.current) observer.observe(lensRef.current);
    return () => observer.disconnect();
  }, [place]);

  const placeAtPointer = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return;
    const bounds = stage.getBoundingClientRect();
    place({
      x: event.clientX - bounds.left - lens.offsetWidth / 2,
      y: event.clientY - bounds.top - lens.offsetHeight / 2,
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Home") {
      event.preventDefault();
      place();
      return;
    }
    const direction: Record<string, Point> = {
      ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
    };
    const delta = direction[event.key];
    if (!delta) return;
    event.preventDefault();
    if (!position.current) place();
    const current = position.current;
    if (!current) return;
    const step = event.shiftKey ? 24 : 8;
    place({ x: current.x + delta.x * step, y: current.y + delta.y * step });
  };

  return (
    <div className={cn("flex h-[440px] w-full flex-col overflow-hidden border border-border", className)} data-liquid-glass-room="true">
      <div
        ref={stageRef}
        data-liquid-glass-stage="true"
        className="relative min-h-0 flex-1 overflow-hidden bg-[#92b6c9] text-[#17374c]"
        style={{ touchAction: "auto" }}
        onPointerMove={(event) => { if (event.pointerType !== "touch") placeAtPointer(event); }}
        onPointerDown={(event) => {
          if (event.pointerType === "touch") touchStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (event.pointerType !== "touch" || !start || start.id !== event.pointerId) return;
          if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
          if (event.target instanceof Element && event.target.closest("button")) return;
          placeAtPointer(event);
        }}
        onPointerCancel={() => { touchStart.current = null; }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/styles/liquid-glass/glacier.webp')" }} />
        {showHeader ? <p className="pointer-events-none absolute left-5 top-5 font-mono text-[11px] font-medium uppercase tracking-[0.16em]">{t.header}</p> : null}
        <div
          ref={lensRef}
          data-liquid-glass-lens="true"
          className="absolute h-28 w-40 max-w-[calc(100%_-_24px)]"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <LiquidGlass appearance="clear" settings={material} radius={28} tint="rgba(240, 250, 255, 0.06)" style={paleGlass} className="h-full" contentClassName="h-full">
            <button
              type="button"
              aria-label={t.move}
              aria-describedby={instructionId}
              aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Home"
              onKeyDown={onKeyDown}
              onClick={() => place()}
              className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[28px] bg-transparent text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17374c]"
            >
              <Move aria-hidden="true" className="h-5 w-5" strokeWidth={1.4} />
              <span>{opaque ? t.solid : supported ? t.glass : t.frost}</span>
            </button>
          </LiquidGlass>
        </div>
      </div>
      <div className="shrink-0 border-t border-border bg-background px-5 py-3 text-foreground">
        <p className="text-xs font-medium" role="status">{opaque ? t.opaque : supported ? t.live : t.fallback}</p>
        <p id={instructionId} className="mt-1 text-xs leading-relaxed text-muted">{t.instruction}</p>
      </div>
    </div>
  );
}
