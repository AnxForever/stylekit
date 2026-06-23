"use client";

/**
 * Pointer-reactive physics effects. These primitives deform /
 * tilt / push their children based on the cursor's position
 * relative to the element's bounding box. Each runs its own
 * rAF loop because the deform math is element-specific (radius
 * falloff, etc.) and a one-size-fits-all GSAP driver would
 * obscure the per-element tuning.
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { lerp, useStage } from "../_stage";

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