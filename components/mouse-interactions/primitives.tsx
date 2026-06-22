"use client";

/**
 * 动效原语库 — 20 个风格房间复用的鼠标交互动效组件。
 *
 * 架构:
 *  - MouseStage: 舞台容器, 用原生 addEventListener 跟踪指针 (绕过 React
 *    合成事件委托, 详情页深层嵌套也可靠触发), 通过 context 暴露 pos ref。
 *  - 各原语: GSAP quickTo 驱动位置 (替代手写 rAF + lerp), 用 GSAP easing
 *    曲线获得自然惯性。
 *  - 每个房间 = MouseStage + 原语组合 + 风格视觉 (配色/字体/背景)。
 *
 * SSR-safe: 所有动效在 effect 内注册, 装饰层始终渲染, 不依赖 client-only
 * state 做条件输出。
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PointerPos {
  x: number;
  y: number;
  inside: boolean;
}

interface StageContextValue {
  pos: React.MutableRefObject<PointerPos>;
  stageRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PointerContext = createContext<StageContextValue | null>(null);

const useStage = (): StageContextValue => {
  const ctx = useContext(PointerContext);
  if (!ctx) throw new Error("mouse primitive must be used inside <MouseStage>");
  return ctx;
};

export function MouseStage({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef<PointerPos>({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY, inside: true };
    };
    const onLeave = () => {
      pos.current = { ...pos.current, inside: false };
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerenter", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerenter", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={className}
      style={style}
    >
      <PointerContext.Provider value={{ pos, stageRef }}>
        {children}
      </PointerContext.Provider>
    </div>
  );
}

// lerp 工具
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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

/* ============ 原语 6: PressDent (压凹, neumorphism) ============ */
export function PressDent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      const el = ref.current;
      if (!stage || !el) return;
      const r = el.getBoundingClientRect();
      const sR = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2 - sR.left;
      const cy = r.top + r.height / 2 - sR.top;
      const px = pos.current.x - sR.left;
      const py = pos.current.y - sR.top;
      const dist = Math.hypot(cx - px, cy - py);
      const RADIUS = 120;
      if (dist < RADIUS && pos.current.inside) {
        const f = 1 - dist / RADIUS;
        el.style.boxShadow = `inset ${4 + f * 8}px ${4 + f * 8}px ${10 + f * 10}px #c5cdd6, inset -${4 + f * 8}px -${4 + f * 8}px ${10 + f * 10}px #ffffff`;
        el.style.transform = `scale(${1 - f * 0.04})`;
      } else {
        el.style.boxShadow = "6px 6px 12px #c5cdd6, -6px -6px 12px #ffffff";
        el.style.transform = "scale(1)";
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pos, stageRef]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        background: "#e6ebf0",
        borderRadius: 16,
        boxShadow: "6px 6px 12px #c5cdd6, -6px -6px 12px #ffffff",
        transition: "box-shadow 200ms ease-out, transform 200ms ease-out",
      }}
    >
      {children}
    </div>
  );
}

/* ============ 原语 7: Mirror (镜像双光晕, GSAP 驱动) ============ */
export function Mirror({ color = "rgba(212,175,55,0.6)" }: { color?: string }) {
  const { pos, stageRef } = useStage();
  const refA = useRef<HTMLDivElement | null>(null);
  const refB = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const a = refA.current;
    const b = refB.current;
    if (!a || !b) return;

    const xToA = gsap.quickTo(a, "x", { duration: 0.22, ease: "expo.out" });
    const yToA = gsap.quickTo(a, "y", { duration: 0.22, ease: "expo.out" });
    const xToB = gsap.quickTo(b, "x", { duration: 0.22, ease: "expo.out" });
    const yToB = gsap.quickTo(b, "y", { duration: 0.22, ease: "expo.out" });
    const opTo = gsap.quickTo([a, b], "opacity", { duration: 0.3 });

    gsap.ticker.add(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.width === 0) return;
      const x = pos.current.x - r.left;
      const y = pos.current.y - r.top;
      const inside = pos.current.inside;

      xToA(x);
      yToA(y);
      xToB(r.width - x);
      yToB(y);
      opTo(inside ? 1 : 0);
    });
  }, { scope: refA });

  const layer = (ref: React.RefObject<HTMLDivElement | null>) => (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20"
      style={{
        width: 80,
        height: 80,
        x: 0,
        y: 0,
        translate: "-50% -50%",
        background: `radial-gradient(circle, ${color}, transparent 60%)`,
        filter: "blur(8px)",
        mixBlendMode: "screen",
        opacity: 0,
      }}
    />
  );
  return (
    <div>
      {layer(refA)}
      {layer(refB)}
    </div>
  );
}

/* ============ 原语: Grid3D (透视网格响应指针, GSAP 驱动) ============ */
export function Grid3D({
  color = "rgba(255,113,206,0.3)",
  size = 40,
}: {
  color?: string;
  size?: number;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const rxTo = gsap.quickTo(el, "rotationX", { duration: 0.22, ease: "expo.out" });
    const ryTo = gsap.quickTo(el, "rotationY", { duration: 0.22, ease: "expo.out" });

    gsap.ticker.add(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.width === 0) return;
      const nx = (pos.current.x - r.left) / r.width - 0.5;
      const ny = (pos.current.y - r.top) / r.height - 0.5;
      rxTo(ny * 20);
      ryTo(nx * 30);
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        transformStyle: "preserve-3d",
      }}
    />
  );
}

/* ============ 原语 8: Tilt3D (3D 倾斜表面) ============ */
export function Tilt3D({
  children,
  className,
  max = 12,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      const el = ref.current;
      if (!stage || !el) return;
      const r = el.getBoundingClientRect();
      const sR = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2 - sR.left;
      const cy = r.top + r.height / 2 - sR.top;
      const px = pos.current.x - sR.left;
      const py = pos.current.y - sR.top;
      const RADIUS = 200;
      const dist = Math.hypot(cx - px, cy - py);
      if (dist < RADIUS && pos.current.inside) {
        const nx = (px - cx) / (r.width / 2);
        const ny = (py - cy) / (r.height / 2);
        el.style.transform = `perspective(800px) rotateX(${(-ny * max).toFixed(2)}deg) rotateY(${(nx * max).toFixed(2)}deg)`;
      } else {
        el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [max, pos, stageRef]);

  return (
    <div ref={ref} className={className} style={{ transition: "transform 200ms ease-out", transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

/* ============ 原语 9: MagneticTarget (磁吸目标) ============ */
export function MagneticTarget({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      const el = ref.current;
      if (!stage || !el) return;
      const sR = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - sR.left;
      const cy = r.top + r.height / 2 - sR.top;
      const px = pos.current.x - sR.left;
      const py = pos.current.y - sR.top;
      const RADIUS = 160;
      const dist = Math.hypot(cx - px, cy - py);
      let tx = 0;
      let ty = 0;
      let active = false;
      if (dist < RADIUS && pos.current.inside) {
        const f = 1 - dist / RADIUS;
        tx = (px - cx) * strength * f;
        ty = (py - cy) * strength * f;
        active = true;
      }
      cur.current.x = lerp(cur.current.x, tx, 0.3);
      cur.current.y = lerp(cur.current.y, ty, 0.3);
      el.style.transform = `translate3d(${cur.current.x.toFixed(2)}px, ${cur.current.y.toFixed(2)}px, 0) scale(${active ? 1.04 : 1})`;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [strength, pos, stageRef]);

  return (
    <div ref={ref} className={className} style={{ transition: "transform 200ms ease-out" }}>
      {children}
    </div>
  );
}

/* ============ 原语: Warp (液态有机 blob, GSAP 位置 + rAF 形变) ============ */
export function Warp({
  color = "rgba(180,220,255,0.45)",
  size = 180,
}: {
  color?: string;
  size?: number;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.28, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.28, ease: "expo.out" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.22, ease: "expo.out" });
    const opacityTo = gsap.quickTo(el, "opacity", { duration: 0.4 });

    gsap.ticker.add(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (r.width === 0) return;
      const cx = pos.current.x - r.left;
      const cy = pos.current.y - r.top;
      const inside = pos.current.inside;

      xTo(cx);
      yTo(cy);
      opacityTo(inside ? 1 : 0);

      // 有机形变: border-radius 呼吸 + scale 脉动
      const t = performance.now() / 1000;
      const br1 = 45 + Math.sin(t * 1.7) * 18;
      const br2 = 55 - Math.sin(t * 1.3) * 18;
      el.style.borderRadius = `${br1}% ${br2}% ${br2}% ${br1}% / ${br2}% ${br1}% ${br1}% ${br2}%`;
      scaleTo(1 + Math.sin(t * 2.2) * 0.12);
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
        background: `radial-gradient(circle, ${color}, transparent 64%)`,
        filter: "blur(14px)",
        mixBlendMode: "screen",
        opacity: 0,
      }}
    />
  );
}

/* ============ 原语: Squish (黏土挤压弹性, claymorphism) ============ */
export function Squish({
  children,
  className,
  range = 150,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      const el = ref.current;
      if (!stage || !el) return;
      const sR = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - sR.left;
      const cy = r.top + r.height / 2 - sR.top;
      const px = pos.current.x - sR.left;
      const py = pos.current.y - sR.top;
      const dist = Math.hypot(cx - px, cy - py);
      let scale = 1;
      if (dist < range && pos.current.inside) {
        const f = 1 - dist / range;
        scale = 1 - f * 0.18;
      }
      el.style.transform = `scale(${scale.toFixed(3)})`;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [range, pos, stageRef]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        borderRadius: 24,
        background: "#e8c8d8",
        boxShadow:
          "inset 4px 4px 10px rgba(255,255,255,0.6), inset -4px -4px 10px rgba(180,120,150,0.4), 4px 4px 12px rgba(180,120,150,0.25)",
      }}
    >
      {children}
    </div>
  );
}

/* ============ 原语: Ripple (移动涟漪扩散, brutalist-web) ============ */
export function Ripple({
  color = "rgba(230,57,70,0.5)",
  spacing = 60,
}: {
  color?: string;
  spacing?: number;
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
        const ripple = document.createElement("span");
        ripple.style.cssText =
          `position:absolute;left:${x}px;top:${y}px;width:10px;height:10px;` +
          `border:2px solid ${color};border-radius:9999px;pointer-events:none;` +
          `transform:translate(-50%,-50%) scale(0);will-change:transform,opacity;` +
          `transition:transform 700ms ease-out, opacity 700ms ease-out;`;
        layer.appendChild(ripple);
        requestAnimationFrame(() => {
          ripple.style.transform = "translate(-50%,-50%) scale(12)";
          ripple.style.opacity = "0";
        });
        window.setTimeout(() => ripple.remove(), 760);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [color, spacing, pos, stageRef]);
  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" />;
}

/* ============ 原语: Confetti (移动喷彩纸粒子, anti-design) ============ */
export function Confetti({
  colors = ["#ff006e", "#ccff00", "#00d9ff", "#ff9500"],
  spacing = 40,
}: {
  colors?: string[];
  spacing?: number;
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
        const c = colors[Math.floor(Math.random() * colors.length)];
        const tx = (Math.random() - 0.5) * 80;
        const piece = document.createElement("span");
        piece.style.cssText =
          `position:absolute;left:${x}px;top:${y}px;width:6px;height:8px;background:${c};` +
          `pointer-events:none;transform:translate(-50%,-50%) rotate(0deg);` +
          `will-change:transform,opacity;` +
          `transition:transform 900ms cubic-bezier(0.3,0.7,0.4,1), opacity 900ms ease-out;`;
        layer.appendChild(piece);
        requestAnimationFrame(() => {
          piece.style.transform = `translate(calc(-50% + ${tx.toFixed(0)}px), calc(-50% + 70px)) rotate(${Math.floor(Math.random() * 720)}deg)`;
          piece.style.opacity = "0";
        });
        window.setTimeout(() => piece.remove(), 960);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [colors, spacing, pos, stageRef]);
  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" />;
}

/* ============ 原语: EmblemSpin (旋转徽章跟随, GSAP 驱动) ============ */
export function EmblemSpin({
  color = "rgba(230,57,70,0.85)",
  size = 50,
  followDuration = 0.75,
}: {
  color?: string;
  size?: number;
  followDuration?: number;
}) {
  const { pos, stageRef } = useStage();
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: followDuration, ease: "expo.out" });
    const yTo = gsap.quickTo(el, "y", { duration: followDuration, ease: "expo.out" });
    const opacityTo = gsap.quickTo(el, "opacity", { duration: 0.3 });

    // 无限旋转
    gsap.to(el, { rotation: 360, duration: 3, repeat: -1, ease: "none" });

    // 每帧从 stage context 读指针位置, 喂给 quickTo
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
        borderRadius: 9999,
        border: `3px solid ${color}`,
        borderTopColor: "transparent",
        opacity: 0,
      }}
    />
  );
}

/* ============ 原语: GeometricFragments (构成主义几何碎片, 物理驱动) ============ */
interface FragmentParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  type: "tri" | "diamond" | "rect" | "circle";
}

export function GeometricFragments({
  color = "rgba(204,0,0,0.7)",
  count = 24,
  stirRadius = 180,
}: {
  color?: string;
  count?: number;
  stirRadius?: number;
}) {
  const { pos, stageRef } = useStage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<FragmentParticle[]>([]);
  const prevPos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    let initialized = false;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const r = stage.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // 懒初始化: 碎片随机散布全舞台
      if (!initialized && w > 0 && h > 0) {
        particles.current = Array.from({ length: count }).map(() => {
          const hx = Math.random() * w;
          const hy = Math.random() * h;
          return {
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            homeX: hx,
            homeY: hy,
            size: 2.5 + Math.random() * 7,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.04,
            type: (["tri", "diamond", "rect", "circle"] as const)[Math.floor(Math.random() * 4)],
          };
        });
        initialized = true;
      }
      if (!initialized) return;

      // 平滑光标位置
      const tx = pos.current.x - r.left;
      const ty = pos.current.y - r.top;
      cur.current.x += (tx - cur.current.x) * 0.6;
      cur.current.y += (ty - cur.current.y) * 0.6;
      const cx = cur.current.x;
      const cy = cur.current.y;

      // 光标速度 (用于扰动强度)
      const dx = cx - prevPos.current.x;
      const dy = cy - prevPos.current.y;
      const speed = Math.hypot(dx, dy);
      prevPos.current.x = cx;
      prevPos.current.y = cy;

      const inside = pos.current.inside;
      const dt = 0.016; // ~60fps

      particles.current.forEach((p) => {
        if (!inside) {
          // 光标离开舞台: 碎片漂回原位
          p.vx += (p.homeX - p.x) * 0.002;
          p.vy += (p.homeY - p.y) * 0.002;
        } else {
          const distX = p.x - cx;
          const distY = p.y - cy;
          const dist = Math.hypot(distX, distY);

          if (dist < stirRadius && dist > 0) {
            // 推斥力: 距离越近越强, 光标速度越快越强
            const force = (1 - dist / stirRadius) * (0.6 + speed * 0.15);
            const nx = distX / dist;
            const ny = distY / dist;
            p.vx += nx * force;
            p.vy += ny * force;
          }

          // 微弱回归原位
          p.vx += (p.homeX - p.x) * 0.0003;
          p.vy += (p.homeY - p.y) * 0.0003;
        }

        // 阻力
        p.vx *= 0.93;
        p.vy *= 0.93;

        // 更新位置
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;

        // 边界限制
        p.x = Math.max(-20, Math.min(w + 20, p.x));
        p.y = Math.max(-20, Math.min(h + 20, p.y));

        p.rotation += p.rotSpeed + p.vx * 0.02;

        // 绘制
        const alpha = 0.18 + Math.min(speed * 0.03, 0.3);
        ctx.fillStyle = color;
        ctx.globalAlpha = inside ? alpha : Math.max(0.05, alpha * 0.3);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const s = p.size;
        switch (p.type) {
          case "tri":
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.8, s * 0.5);
            ctx.lineTo(-s * 0.8, s * 0.5);
            ctx.closePath();
            ctx.fill();
            break;
          case "diamond":
            ctx.beginPath();
            ctx.moveTo(0, -s);
            ctx.lineTo(s * 0.6, 0);
            ctx.lineTo(0, s);
            ctx.lineTo(-s * 0.6, 0);
            ctx.closePath();
            ctx.fill();
            break;
          case "rect":
            ctx.fillRect(-s * 0.5, -s * 0.5, s, s);
            break;
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [count, stirRadius, color, pos, stageRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-1"
    />
  );
}
/* ============ 原语: SpeedLine (漫画放射速度线) ============ */
export function SpeedLine({
  color = "rgba(20,20,30,0.65)",
  spacing = 38,
  fadeMs = 500,
}: {
  color?: string;
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
        const angle = Math.random() * Math.PI * 2;
        const line = document.createElement("div");
        line.style.cssText =
          `position:absolute;left:${x}px;top:${y}px;width:34px;height:3px;background:${color};` +
          `pointer-events:none;transform-origin:left center;transform:translate(0,-50%) rotate(${angle}rad) scaleX(0.3);` +
          `opacity:0.85;will-change:transform,opacity;` +
          `transition:transform ${fadeMs}ms ease-out, opacity ${fadeMs}ms ease-out;`;
        layer.appendChild(line);
        requestAnimationFrame(() => {
          line.style.transform = `translate(0,-50%) rotate(${angle}rad) scaleX(2.6)`;
          line.style.opacity = "0";
        });
        window.setTimeout(() => line.remove(), fadeMs + 60);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [color, spacing, fadeMs, pos, stageRef]);
  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" />;
}

/* ============ 原语: PaperLayer (多层视差纸片, collage-art) ============ */
export interface PaperLayerItem {
  depth: number;
  className: string;
  color: string;
}
export function PaperLayer({ layers = [] }: { layers?: PaperLayerItem[] }) {
  const { pos, stageRef } = useStage();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const nx = (pos.current.x - r.left) / r.width - 0.5;
      const ny = (pos.current.y - r.top) / r.height - 0.5;
      layers.forEach((layer, i) => {
        const el = refs.current[i];
        if (el) {
          el.style.transform = `translate3d(${(nx * layer.depth).toFixed(2)}px, ${(ny * layer.depth).toFixed(2)}px, 0)`;
        }
      });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [layers, pos, stageRef]);
  return (
    <>
      {layers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`absolute ${layer.className}`}
          style={{ background: layer.color, transition: "transform 200ms ease-out", zIndex: i + 1 }}
        />
      ))}
    </>
  );
}
