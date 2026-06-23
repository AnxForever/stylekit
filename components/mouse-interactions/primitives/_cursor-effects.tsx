"use client";

/**
 * Cursor-following decorative effects. Each primitive reads the
 * stage pointer position via `useStage()` and animates a single
 * decorative layer to follow it (with varying inertia, color,
 * and blend mode).
 *
 * All five primitives here use GSAP's `quickTo` + `gsap.ticker`
 * pattern for the pointer follow; the inline `lerp` rAF fallback
 * lives in primitives that need physics-style behavior instead.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStage } from "../_stage";

/* ============ 原语 1: FollowAura (光晕跟随, GSAP 驱动) ============ */
export function FollowAura({
  color = "rgba(103,232,249,0.5)",
  size = 220,
  blur = 18,
  followDuration = 0.22,
  blend = "screen",
}: {
  color?: string;
  size?: number;
  blur?: number;
  followDuration?: number;
  blend?: "screen" | "multiply" | "normal";
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: followDuration, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: followDuration, ease: "expo.out" });
    const opacityTo = gsap.quickTo(el, "opacity", { duration: 0.35 });

    gsap.ticker.add(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.width === 0) return;
      const x = pos.current.x - r.left;
      const y = pos.current.y - r.top;
      xTo(x);
      yTo(y);
      opacityTo(pos.current.inside ? 1 : 0);
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20"
      style={{
        width: size,
        height: size,
        x: 0,
        y: 0,
        translate: "-50% -50%",
        background: `radial-gradient(circle, ${color}, transparent 62%)`,
        filter: `blur(${blur}px)`,
        mixBlendMode: blend,
        opacity: 0,
      }}
    />
  );
}

/* ============ 原语 2: Trail (点轨迹) ============ */
export function Trail({
  color = "rgba(10,10,10,0.32)",
  dotSize = 7,
  spacing = 28,
  fadeMs = 900,
}: {
  color?: string;
  dotSize?: number;
  spacing?: number;
  fadeMs?: number;
}) {
  const { pos, stageRef } = useStage();
  const layerRef = useRef<HTMLDivElement | null>(null);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      const layer = layerRef.current;
      if (!stage || !layer || !pos.current.inside) return;
      const r = stage.getBoundingClientRect();
      const x = pos.current.x - r.left;
      const y = pos.current.y - r.top;
      const dx = x - last.current.x;
      const dy = y - last.current.y;
      if (Math.hypot(dx, dy) > spacing) {
        last.current = { x, y };
        const dot = document.createElement("span");
        dot.style.cssText =
          `position:absolute;left:${x}px;top:${y}px;width:${dotSize}px;height:${dotSize}px;` +
          `border-radius:9999px;background:${color};pointer-events:none;` +
          `transform:translate(-50%,-50%) scale(1);will-change:opacity,transform;` +
          `transition:opacity ${fadeMs}ms ease-out, transform ${fadeMs}ms ease-out;`;
        layer.appendChild(dot);
        requestAnimationFrame(() => {
          dot.style.opacity = "0";
          dot.style.transform = "translate(-50%,-50%) scale(0.2)";
        });
        window.setTimeout(() => dot.remove(), fadeMs + 60);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [color, dotSize, spacing, fadeMs, pos, stageRef]);

  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" />;
}

/* ============ 原语 3: Spotlight (聚光灯表面, GSAP 驱动) ============ */
export function Spotlight({
  color = "255,255,255",
  radius = 320,
  strength = 0.14,
}: {
  color?: string;
  radius?: number;
  strength?: number;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "--sx", { duration: 0.2, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "--sy", { duration: 0.2, ease: "expo.out" });
    const opacityTo = gsap.quickTo(el, "opacity", { duration: 0.35 });

    gsap.ticker.add(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.width === 0) return;
      xTo(pos.current.x - r.left);
      yTo(pos.current.y - r.top);
      opacityTo(pos.current.inside ? 1 : 0);
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        opacity: 0,
        background: `radial-gradient(${radius}px circle at var(--sx, 50%) var(--sy, 50%), rgba(${color},${strength}), transparent 58%)`,
      }}
    />
  );
}

/* ============ 原语 4: GlitchRGB (RGB 色散拖尾, GSAP 驱动) ============ */
export function GlitchRGB({ size = 28 }: { size?: number }) {
  const { pos, stageRef } = useStage();
  const refR = useRef<HTMLDivElement | null>(null);
  const refG = useRef<HTMLDivElement | null>(null);
  const refB = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const rEl = refR.current;
    const gEl = refG.current;
    const bEl = refB.current;
    if (!rEl || !gEl || !bEl) return;

    const xR = gsap.quickTo(rEl, "x", { duration: 0.2, ease: "expo.out" });
    const yR = gsap.quickTo(rEl, "y", { duration: 0.2, ease: "expo.out" });
    const xG = gsap.quickTo(gEl, "x", { duration: 0.2, ease: "expo.out" });
    const yG = gsap.quickTo(gEl, "y", { duration: 0.2, ease: "expo.out" });
    const xB = gsap.quickTo(bEl, "x", { duration: 0.2, ease: "expo.out" });
    const yB = gsap.quickTo(bEl, "y", { duration: 0.2, ease: "expo.out" });
    const opTo = gsap.quickTo([rEl, gEl, bEl], "opacity", { duration: 0.25 });

    gsap.ticker.add(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.width === 0) return;
      const cx = pos.current.x - r.left;
      const cy = pos.current.y - r.top;
      const inside = pos.current.inside;

      xR(cx - 2);
      yR(cy);
      xG(cx);
      yG(cy);
      xB(cx + 2);
      yB(cy);
      opTo(inside ? 1 : 0);
    });
  }, { scope: containerRef });

  const layer = (c: string, ref: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20"
      style={{
        width: size,
        height: size,
        x: 0,
        y: 0,
        translate: "-50% -50%",
        borderRadius: 9999,
        background: c,
        mixBlendMode: "screen",
        opacity: 0,
      }}
    />
  );
  return (
    <div ref={containerRef}>
      {layer("rgba(255,0,80,0.9)", refR)}
      {layer("rgba(0,255,200,0.9)", refG)}
      {layer("rgba(80,120,255,0.9)", refB)}
    </div>
  );
}

/* ============ 原语 5: Scanline (扫描线跟随, GSAP 驱动) ============ */
export function Scanline({ color = "rgba(0,255,200,0.5)" }: { color?: string }) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const yTo = gsap.quickTo(el, "y", { duration: 0.12, ease: "expo.out" });
    const opacityTo = gsap.quickTo(el, "opacity", { duration: 0.25 });

    gsap.ticker.add(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.width === 0) return;
      yTo(pos.current.y - r.top);
      opacityTo(pos.current.inside ? 1 : 0);
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full"
      style={{ y: 0, opacity: 0, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
    />
  );
}