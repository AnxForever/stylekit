"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import {
  usePointerInteractionEnabled,
  useReducedMotion,
  type RoomProps,
} from "./_room-shared";
import { cn } from "@/lib/utils";

/**
 * Room 01 — Neo-Brutalist
 *
 * 三套鼠标交互动效 (一个风格允许多个):
 *  1. 双向磁吸 CTA — 按钮体被指针吸引 (strength 0.28, neobrutalism 比
 *     luxury 0.15 更 punchy), 内部 label 反向被拉 (×0.45), iOS 式 mutual
 *     attraction (motion.dev useMagneticPull)。被吸时 +3% scale 卖效果。
 *  2. 惯性拖拽卡 — 松手后 0.9 衰减滑行, 基于 getBoundingClientRect 撞墙
 *     硬回弹 (×0.55), 拖拽中按速度微旋。触屏可拖, reduced-motion 无惯性。
 *  3. zone 状态光标 — 舞台三段 (左/中/右) 切 Push/Grab/Drag 标签 + 撞色,
 *     即时跟手无 lerp (brutalist 硬切, 非 luxury 的柔顺)。
 *
 * SSR-safe: zone 光标始终渲染保持 DOM 结构稳定; 底部状态文本用纯 CSS
 * 媒体查询变体 (pointer-fine / motion-reduce) 控制, 不依赖 client-only
 * 的 hook 状态, 彻底避免 hydration mismatch。
 */

const ZONES = [
  { label: "Push", bg: "#ff006e", fg: "#ffffff" },
  { label: "Grab", bg: "#ccff00", fg: "#0a0a0a" },
  { label: "Drag", bg: "#00d9ff", fg: "#0a0a0a" },
] as const;

export function NeoBrutalistRoom({ className, showHeader = true }: RoomProps) {
  const enabled = usePointerInteractionEnabled();
  const reduced = useReducedMotion();

  const stageRef = useRef<HTMLDivElement>(null);

  // 双向磁吸 CTA
  const ctaRef = useRef<HTMLButtonElement>(null);
  const ctaLabelRef = useRef<HTMLSpanElement>(null);
  const ctaFrame = useRef(0);
  const ctaTarget = useRef({ x: 0, y: 0, active: false });

  // 可拖卡片 + 惯性
  const cardRef = useRef<HTMLDivElement>(null);
  const cardFrame = useRef(0);
  const inertiaFrame = useRef(0);
  const cardState = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    dragging: false,
    px: 0,
    py: 0,
  });

  // zone 状态光标 (始终渲染, enabled 控制是否更新)
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const cursorFrame = useRef(0);
  const cursorPos = useRef({ x: 0, y: 0, zone: 1, visible: false });

  // --- 磁吸 CTA ---
  const writeCta = () => {
    ctaFrame.current = 0;
    const btn = ctaRef.current;
    const label = ctaLabelRef.current;
    if (!btn) return;
    const { x, y, active } = ctaTarget.current;
    btn.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${active ? 1.03 : 1})`;
    if (label) {
      label.style.transform = `translate3d(${(-x * 0.45).toFixed(2)}px, ${(-y * 0.45).toFixed(2)}px, 0)`;
    }
  };
  const scheduleCta = () => {
    if (ctaFrame.current === 0) ctaFrame.current = requestAnimationFrame(writeCta);
  };
  const onCtaMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!enabled) return;
    const btn = ctaRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    ctaTarget.current = {
      x: (e.clientX - (r.left + r.width / 2)) * 0.28,
      y: (e.clientY - (r.top + r.height / 2)) * 0.28,
      active: true,
    };
    scheduleCta();
  };
  const onCtaLeave = () => {
    ctaTarget.current = { x: 0, y: 0, active: false };
    scheduleCta();
  };

  // --- 可拖卡片 ---
  const writeCard = () => {
    cardFrame.current = 0;
    const card = cardRef.current;
    if (!card) return;
    const a = cardState.current;
    const rot = Math.max(-10, Math.min(10, a.vx * 0.7));
    card.style.transform = `translate3d(${a.x.toFixed(2)}px, ${a.y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
  };
  const scheduleCard = () => {
    if (cardFrame.current === 0) cardFrame.current = requestAnimationFrame(writeCard);
  };
  const onCardDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const a = cardState.current;
    a.dragging = true;
    a.px = e.clientX;
    a.py = e.clientY;
    a.vx = 0;
    a.vy = 0;
    card.setPointerCapture(e.pointerId);
  };
  const onCardMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const a = cardState.current;
    if (!a.dragging) return;
    const dx = e.clientX - a.px;
    const dy = e.clientY - a.py;
    a.x += dx;
    a.y += dy;
    a.vx = dx;
    a.vy = dy;
    a.px = e.clientX;
    a.py = e.clientY;
    scheduleCard();
  };
  const onCardUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const a = cardState.current;
    a.dragging = false;
    if (card && card.hasPointerCapture(e.pointerId)) {
      card.releasePointerCapture(e.pointerId);
    }
    if (reduced) return;
    if (inertiaFrame.current !== 0) return;
    if (Math.abs(a.vx) <= 0.4 && Math.abs(a.vy) <= 0.4) return;
    const tick = () => {
      const stage = stageRef.current;
      const el = cardRef.current;
      const s = cardState.current;
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.9;
      s.vy *= 0.9;
      if (stage && el) {
        const sR = stage.getBoundingClientRect();
        const cR = el.getBoundingClientRect();
        const overLeft = cR.left - sR.left;
        const overTop = cR.top - sR.top;
        const overRight = sR.right - cR.right;
        const overBottom = sR.bottom - cR.bottom;
        if (overLeft < 0) {
          s.x -= overLeft;
          s.vx = Math.abs(s.vx) * 0.55;
        }
        if (overRight < 0) {
          s.x += overRight;
          s.vx = -Math.abs(s.vx) * 0.55;
        }
        if (overTop < 0) {
          s.y -= overTop;
          s.vy = Math.abs(s.vy) * 0.55;
        }
        if (overBottom < 0) {
          s.y += overBottom;
          s.vy = -Math.abs(s.vy) * 0.55;
        }
      }
      scheduleCard();
      if (Math.abs(s.vx) >= 0.4 || Math.abs(s.vy) >= 0.4) {
        inertiaFrame.current = requestAnimationFrame(tick);
      } else {
        inertiaFrame.current = 0;
      }
    };
    inertiaFrame.current = requestAnimationFrame(tick);
  };

  // --- zone 状态光标 ---
  const writeCursor = () => {
    cursorFrame.current = 0;
    const outer = cursorRef.current;
    const label = cursorLabelRef.current;
    if (!outer || !label) return;
    const { x, y, zone, visible } = cursorPos.current;
    const z = ZONES[zone] ?? ZONES[1];
    outer.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    outer.style.opacity = visible ? "1" : "0";
    label.textContent = z.label;
    label.style.background = z.bg;
    label.style.color = z.fg;
  };
  const scheduleCursor = () => {
    if (cursorFrame.current === 0) cursorFrame.current = requestAnimationFrame(writeCursor);
  };
  const onStageMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const zone = x < r.width / 3 ? 0 : x < (r.width * 2) / 3 ? 1 : 2;
    cursorPos.current = { x, y, zone, visible: true };
    scheduleCursor();
  };
  const onStageLeave = () => {
    cursorPos.current = { ...cursorPos.current, visible: false };
    scheduleCursor();
    onCtaLeave();
  };

  // 卸载时清理所有 rAF
  useEffect(
    () => () => {
      [ctaFrame, cardFrame, inertiaFrame, cursorFrame].forEach((f) => {
        if (f.current !== 0) cancelAnimationFrame(f.current);
      });
    },
    [],
  );

  return (
    <div
      ref={stageRef}
      onPointerMove={onStageMove}
      onPointerLeave={onStageLeave}
      className={cn(
        "relative h-[440px] w-full overflow-hidden border-[3px] border-black bg-[#f3f1ea] motion-safe:pointer-fine:cursor-none [&_button]:cursor-pointer [&_a]:cursor-pointer",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(10,10,10,0.16) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -left-3 select-none font-black uppercase leading-none tracking-tighter text-black/[0.05]"
        style={{ fontSize: "12rem" }}
      >
        Brutal
      </span>

      {showHeader ? (
        <div className="absolute left-5 top-4 z-10 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-black">
          Room 01 — Neo-Brutalist
        </div>
      ) : null}

      {/* 双向磁吸 CTA: wrapper 居中, button 承载磁吸 transform */}
      <div className="absolute left-1/2 top-[58%] z-20 -translate-x-1/2 -translate-y-1/2">
        <button
          ref={ctaRef}
          type="button"
          onPointerMove={onCtaMove}
          onPointerLeave={onCtaLeave}
          className="will-change-transform focus:outline-none"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          <span className="block border-[3px] border-black bg-[#ff006e] px-9 py-4 shadow-[8px_8px_0_0_#0a0a0a] transition-colors hover:bg-[#ff3d8b]">
            <span
              ref={ctaLabelRef}
              className="inline-block font-black uppercase tracking-[0.22em] text-white will-change-transform"
              style={{ fontSize: "1.05rem" }}
            >
              Grab me
            </span>
          </span>
        </button>
      </div>

      {/* 可拖卡片 */}
      <div
        ref={cardRef}
        onPointerDown={onCardDown}
        onPointerMove={onCardMove}
        onPointerUp={onCardUp}
        onPointerCancel={onCardUp}
        className="absolute right-[12%] top-[20%] z-20 h-28 w-44 touch-none select-none border-[3px] border-black bg-[#ccff00] shadow-[6px_6px_0_0_#0a0a0a] will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="flex h-full flex-col justify-between p-3">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black">
            Card · fling
          </span>
          <span className="text-lg font-black uppercase leading-none tracking-tight text-black">
            Throw it
          </span>
        </div>
      </div>

      {/* zone 状态光标 — 始终渲染保持结构稳定; enabled 控制是否更新位置/标签 */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-30 opacity-0"
        style={{ transform: "translate3d(0,0,0)", transition: "opacity 120ms ease-out" }}
      >
        <span
          ref={cursorLabelRef}
          className="inline-block -translate-x-1/2 -translate-y-1/2 border-[3px] border-black px-2 py-1 font-mono text-[10px] font-black uppercase tracking-[0.22em]"
          style={{ background: "#ccff00", color: "#0a0a0a" }}
        >
          Grab
        </span>
      </div>

      {/* 底部状态: 纯 CSS 媒体查询变体控制文本, 不依赖 client hook 状态 */}
      <div className="absolute bottom-4 left-5 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-black/60">
        <span className="inline-block h-2 w-2 border-[1.5px] border-black bg-[#00d9ff]" />
        <span className="motion-reduce:hidden pointer-fine:hidden">Touch — drag enabled</span>
        <span className="motion-reduce:hidden hidden pointer-fine:inline">Move · hover · fling</span>
        <span className="hidden motion-reduce:inline">Reduced motion — static</span>
      </div>
    </div>
  );
}
