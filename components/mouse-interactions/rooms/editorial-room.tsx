"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { usePointerInteractionEnabled, type RoomProps } from "./_room-shared";
import { cn } from "@/lib/utils";

/**
 * Room 03 — Editorial
 *
 * 三套鼠标交互动效:
 *  1. serif 逐字向量排斥 — 标题每字符测到指针距离, 近则沿向量推开 +
 *     轻微缩小 + 失焦 blur, lerp 0.2 弹簧回。
 *  2. 克制墨点轨迹 — 指针移动每 ~28px 留一个墨点, 900ms 淡出。
 *  3. 靠近浮现辅助动作 — token 行 hover 浮现 Copy/Edit。
 *
 * 关键: pointermove 只在鼠标移动时触发。鼠标"放上去停住"不触发 → 加
 * onPointerEnter 兜底, 进入舞台即更新指针位置, 静止放置也能排斥。
 */

const TITLE = "Cursor";
const SERIF = "var(--font-serif), ui-serif, Georgia, serif";

export function EditorialRoom({ className, showHeader = true }: RoomProps) {
  const enabled = usePointerInteractionEnabled();

  const stageRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const charState = useRef(TITLE.split("").map(() => ({ x: 0, y: 0, s: 1 })));
  const charRects = useRef<{ cx: number; cy: number }[]>([]);
  const pointer = useRef({ x: 0, y: 0, inside: false });
  const lastTrail = useRef({ x: 0, y: 0 });

  const measure = () => {
    charRects.current = charRefs.current.map((el) => {
      if (!el) return { cx: 0, cy: 0 };
      const r = el.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    });
  };

  useEffect(() => {
    measure();
    const delayed = window.setTimeout(measure, 120);
    const run = () => measure();
    window.addEventListener("resize", run);
    // 关键: charRects 用 getBoundingClientRect (viewport 相对坐标), 滚动会让
    // 字符的 viewport 位置变化。不 re-measure 会导致 dist 算错 → 字符不排斥。
    // 这正是"F12 缩窗 resize 后能动、正常滚动不动"的根因。rAF 节流避免卡顿。
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        measure();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => measure()).catch(() => {});
    }
    let io: IntersectionObserver | null = null;
    if (stageRef.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) measure();
      });
      io.observe(stageRef.current);
    }
    return () => {
      window.clearTimeout(delayed);
      window.removeEventListener("resize", run);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const THR = 110;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const p = pointer.current;
      charRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = charRects.current[i];
        const cs = charState.current[i];
        if (!rect || !cs) return;
        let tx = 0;
        let ty = 0;
        let ts = 1;
        if (p.inside) {
          const dx = rect.cx - p.x;
          const dy = rect.cy - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < THR && dist > 0.01) {
            const f = 1 - dist / THR;
            const push = f * 52;
            tx = (dx / dist) * push;
            ty = (dy / dist) * push;
            ts = 1 - f * 0.18;
          }
        }
        cs.x += (tx - cs.x) * 0.2;
        cs.y += (ty - cs.y) * 0.2;
        cs.s += (ts - cs.s) * 0.2;
        const intensity = 1 - cs.s;
        el.style.transform = `translate3d(${cs.x.toFixed(2)}px, ${cs.y.toFixed(2)}px, 0) scale(${cs.s.toFixed(3)})`;
        el.style.filter = intensity > 0.01 ? `blur(${(intensity * 24).toFixed(2)}px)` : "";
      });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  // 原生 listener 兜底: 详情页(嵌在 _content.tsx 深处, 有 showcase iframe
  // + 大量交互)真实鼠标的 React 合成 onPointerMove 可能不触发 (委托时序)。
  // Cursor Lab 组件树简单 React 委托正常。用 addEventListener 双保险,
  // 绕过 React 合成, 真实鼠标与 Playwright dispatch 都能触发。
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const handle = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY, inside: true };
    };
    const leave = () => {
      pointer.current.inside = false;
    };
    stage.addEventListener("pointermove", handle);
    stage.addEventListener("pointerenter", handle);
    stage.addEventListener("pointerleave", leave);
    return () => {
      stage.removeEventListener("pointermove", handle);
      stage.removeEventListener("pointerenter", handle);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointer.current = { x: e.clientX, y: e.clientY, inside: true };
    if (!enabled) return;
    const stage = stageRef.current;
    const trail = trailRef.current;
    if (!stage || !trail) return;
    const r = stage.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const dx = x - lastTrail.current.x;
    const dy = y - lastTrail.current.y;
    if (Math.hypot(dx, dy) > 28) {
      lastTrail.current = { x, y };
      const dot = document.createElement("span");
      dot.style.cssText =
        `position:absolute;left:${x}px;top:${y}px;width:7px;height:7px;` +
        `border-radius:9999px;background:rgba(10,10,10,0.32);pointer-events:none;` +
        `transform:translate(-50%,-50%) scale(1);will-change:opacity,transform;` +
        `transition:opacity 900ms ease-out, transform 900ms ease-out;`;
      trail.appendChild(dot);
      window.requestAnimationFrame(() => {
        dot.style.opacity = "0";
        dot.style.transform = "translate(-50%,-50%) scale(0.2)";
      });
      window.setTimeout(() => dot.remove(), 960);
    }
  };

  const onLeave = () => {
    pointer.current.inside = false;
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={onMove}
      onPointerEnter={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "relative h-[440px] w-full overflow-hidden border border-black/15 bg-[#fafaf7] motion-safe:pointer-fine:cursor-none [&_*]:motion-safe:pointer-fine:cursor-none",
        className,
      )}
    >
      <div ref={trailRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />

      {showHeader ? (
        <div className="absolute inset-x-6 top-5 z-10 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-black/50">
            Room 03 — Editorial
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-black/40">
            Vol. 01
          </span>
        </div>
      ) : null}
      <div className="absolute inset-x-6 top-12 z-10 h-px bg-black/15" />

      <h2
        className="absolute left-1/2 top-[36%] z-10 -translate-x-1/2 -translate-y-1/2 text-center"
        aria-label={TITLE}
      >
        <span
          aria-hidden="true"
          className="inline-flex"
          style={{ fontFamily: SERIF, fontSize: "5.5rem", lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          {TITLE.split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => {
                charRefs.current[i] = el;
              }}
              className="inline-block will-change-transform"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {ch}
            </span>
          ))}
        </span>
      </h2>

      <p
        className="absolute left-1/2 top-[54%] z-10 -translate-x-1/2 text-center text-base italic text-black/55"
        style={{ fontFamily: SERIF }}
      >
        Move the cursor — the type steps aside.
      </p>

      <div className="group absolute inset-x-6 bottom-16 z-10 flex items-center justify-between border-y border-black/15 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-black/45">Token</p>
          <p className="text-sm text-black/80" style={{ fontFamily: SERIF }}>
            --editorial-accent: #b91c1c
          </p>
        </div>
        <div className="flex translate-y-1 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            className="border border-black/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-black/70 transition-colors hover:bg-black hover:text-white"
          >
            Copy
          </button>
          <button
            type="button"
            className="border border-black/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-black/70 transition-colors hover:bg-black hover:text-white"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="absolute inset-x-6 bottom-5 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">
        <span>
          <span className="pointer-fine:hidden">Static</span>
          <span className="hidden pointer-fine:inline">Type repels · ink trail</span>
        </span>
        <span aria-hidden="true">—</span>
      </div>
    </div>
  );
}
