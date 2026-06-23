"use client";

/**
 * Particle / canvas / decoration primitives. These create DOM
 * nodes (or canvas particles) on each movement tick and animate
 * them to fade out, giving a "trail of confetti" / "ripple" /
 * "speed line" feel. They use rAF because each tick appends a
 * new element to the layer and CSS transitions handle the
 * per-element exit.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStage } from "../_stage";

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