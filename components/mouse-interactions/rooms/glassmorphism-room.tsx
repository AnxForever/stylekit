"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { usePointerInteractionEnabled, type RoomProps } from "./_room-shared";
import { cn } from "@/lib/utils";

/**
 * Room 02 — Glassmorphism
 *
 * 三套鼠标交互动效:
 *  1. 环境光晕跟随 — lerp 0.15 (100daysofcraft sweet spot) 平滑追随指针,
 *     mix-blend-mode: screen 在深底上增亮, 双层 (cyan ambient + violet focus)。
 *  2. 多层视差光斑 — 背景色斑按不同 depth (正负方向) 响应指针归一化坐标,
 *     营造空间深度 (Glassmorphism 的空气感)。
 *  3. 玻璃聚光灯 + zoning — 指针进入卡片时光晕从 cyan ambient 收缩切换为
 *     violet focus (motion.dev cursor-zone 模式), 卡片表面聚光灯跟随。
 *
 * SSR-safe: 所有装饰层始终渲染; 底部状态文本用纯 CSS pointer-fine 变体
 * 控制, 不依赖 client hook 状态, 避免 hydration mismatch。
 */

const PARALLAX = [
  { depth: -34, className: "left-[14%] top-[24%] h-56 w-56 bg-cyan-400/30" },
  { depth: -20, className: "right-[16%] top-[58%] h-64 w-64 bg-violet-500/30" },
  { depth: 42, className: "left-[60%] top-[14%] h-32 w-32 bg-fuchsia-400/25" },
] as const;

export function GlassmorphismRoom({ className, showHeader = true }: RoomProps) {
  const enabled = usePointerInteractionEnabled();

  const stageRef = useRef<HTMLDivElement>(null);
  const auraCyanRef = useRef<HTMLDivElement>(null);
  const auraVioletRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  const target = useRef({ x: 0, y: 0, nx: 0, ny: 0, inside: false, inCard: false });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * 0.15;
      c.y += (t.y - c.y) * 0.15;
      const tf = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
      if (auraCyanRef.current) {
        auraCyanRef.current.style.transform = tf;
        auraCyanRef.current.style.opacity = t.inside && !t.inCard ? "1" : "0";
      }
      if (auraVioletRef.current) {
        auraVioletRef.current.style.transform = tf;
        auraVioletRef.current.style.opacity = t.inside && t.inCard ? "1" : "0";
      }
      parallaxRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = PARALLAX[i]?.depth ?? 0;
        el.style.transform = `translate3d(${(t.nx * d).toFixed(2)}px, ${(t.ny * d).toFixed(2)}px, 0)`;
      });
      if (spotlightRef.current && cardRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        const lx = t.x - r.left;
        const ly = t.y - r.top;
        spotlightRef.current.style.background = `radial-gradient(300px circle at ${lx.toFixed(0)}px ${ly.toFixed(0)}px, rgba(167,139,250,0.32), transparent 58%)`;
        spotlightRef.current.style.opacity = t.inside ? "1" : "0";
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  const onStageMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    target.current = {
      ...target.current,
      x,
      y,
      nx: (x / r.width - 0.5) * 2,
      ny: (y / r.height - 0.5) * 2,
      inside: true,
    };
  };
  const onStageLeave = () => {
    target.current = { ...target.current, inside: false, inCard: false };
  };
  const onCardEnter = () => {
    target.current.inCard = true;
  };
  const onCardLeave = () => {
    target.current.inCard = false;
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={onStageMove}
      onPointerLeave={onStageLeave}
      className={cn(
        "relative h-[440px] w-full overflow-hidden border border-white/10 motion-safe:pointer-fine:cursor-none [&_*]:motion-safe:pointer-fine:cursor-none",
        className,
      )}
      style={{
        background:
          "radial-gradient(circle at 30% 18%, #1a1230 0%, #0b0814 55%, #07050d 100%)",
      }}
    >
      {PARALLAX.map((p, i) => (
        <div
          key={i}
          ref={(el) => {
            parallaxRefs.current[i] = el;
          }}
          className={cn("absolute rounded-full blur-3xl will-change-transform", p.className)}
        />
      ))}

      {showHeader ? (
        <div className="absolute left-6 top-5 z-30 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-200/70">
          Room 02 — Glassmorphism
        </div>
      ) : null}

      <div
        ref={cardRef}
        onPointerEnter={onCardEnter}
        onPointerLeave={onCardLeave}
        className="absolute left-1/2 top-1/2 z-10 w-[320px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl"
      >
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-200"
        />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/60">
            Depth · light
          </p>
          <h3 className="mt-3 text-2xl font-light tracking-tight text-white">
            Hover · glide
          </h3>
          <p className="mt-2 text-sm font-light leading-6 text-white/55">
            An ambient aura follows the cursor; the glass catches a violet light
            when you enter.
          </p>
        </div>
      </div>

      <div
        ref={auraCyanRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 opacity-0"
        style={{ transform: "translate3d(0,0,0)", transition: "opacity 220ms ease-out" }}
      >
        <div
          className="h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(103,232,249,0.55), transparent 62%)",
            filter: "blur(18px)",
            mixBlendMode: "screen",
          }}
        />
      </div>
      <div
        ref={auraVioletRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 opacity-0"
        style={{ transform: "translate3d(0,0,0)", transition: "opacity 180ms ease-out" }}
      >
        <div
          className="h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.7), transparent 60%)",
            filter: "blur(14px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="absolute bottom-4 left-6 z-30 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
        <span className="pointer-fine:hidden">Static</span>
        <span className="hidden pointer-fine:inline">Ambient cursor · parallax depth</span>
      </div>
    </div>
  );
}
