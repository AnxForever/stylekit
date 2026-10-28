"use client";

import { useEffect, useRef } from "react";

/**
 * The hero grid, dented by the pointer.
 *
 * At rest this is deliberately identical to the CSS grid it replaces: 48px pitch,
 * one device pixel, 4% ink. Nothing breathes, nothing drifts. The only motion is
 * a soft depression under the cursor — vertices are pulled *toward* the pointer
 * instead of being pushed away, so it reads as a finger pressed into cloth rather
 * than a bump following the mouse. A critically damped spring returns it, with no
 * overshoot, so it feels light rather than springy.
 */

const PITCH = 48;
/** Lines are cut into short segments so the dent curves instead of kinking. */
const SEGMENT = 16;
/** Depth of the depression, in CSS pixels. Deliberately small. */
const MAX_DENT = 9;
/** Radius of the ball resting on the surface, and how soft its rim is. */
const BALL_RADIUS = 54;
const BALL_SOFTNESS = 42;
const RADIUS = 210;
/** The pointer is eased toward its target so fast sweeps stay silky. */
const POINTER_EASING = 0.22;
/** Critically damped: k = w^2, c = 2w. Fast and quiet. */
const SPRING_K = 320;
const SPRING_C = 36;
const FRAME_MS = 1000 / 60;

export function HeroGridField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    const spring = { value: 0, velocity: 0, target: 0 };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let last = 0;
    let visible = true;
    let ink = "color-mix(in srgb, #0a0a0a 4%, transparent)";

    const readInk = () => {
      const value = getComputedStyle(canvas).getPropertyValue("--hero-grid-ink").trim();
      if (value) ink = value;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      readInk();
    };

    /**
     * A ball resting on the cloth pushes material outward around its rim and leaves
     * the middle alone. Pulling vertices toward the cursor reads as pinching the
     * surface up; pushing them out along a ring is what reads as a depression.
     */
    const dent = (x: number, y: number) => {
      if (!pointer.active || spring.value < 0.001) return [0, 0] as const;

      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy) || 0.0001;
      if (distance > RADIUS) return [0, 0] as const;

      // Outside the ball the cloth is pushed away; inside it is drawn in, so the
      // spacing itself compresses towards the centre. That compression is the whole
      // depth cue — painting a shadow disc on white just draws a visible circle.
      const edge = Math.min(1, (RADIUS - distance) / (RADIUS * 0.35));
      const rim = Math.exp(-((distance - BALL_RADIUS) ** 2) / (2 * BALL_SOFTNESS ** 2));
      const inside = distance < BALL_RADIUS ? (1 - distance / BALL_RADIUS) ** 2 : 0;
      const offset = (rim - inside * 0.85) * edge * MAX_DENT * spring.value;

      return [(dx / distance) * offset, (dy / distance) * offset] as const;
    };

    const draw = (now: number) => {
      frame = 0;
      if (!visible) return;
      if (now - last < FRAME_MS) {
        frame = requestAnimationFrame(draw);
        return;
      }
      last = now;

      const dt = FRAME_MS / 1000;
      const acceleration =
        -SPRING_K * (spring.value - spring.target) - SPRING_C * spring.velocity;
      spring.velocity += acceleration * dt;
      spring.value += spring.velocity * dt;

      // Ease the pointer itself: a fast sweep should deform the cloth smoothly
      // instead of snapping to each event position.
      if (pointer.active) {
        pointer.x += (pointer.tx - pointer.x) * POINTER_EASING;
        pointer.y += (pointer.ty - pointer.y) * POINTER_EASING;
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = ink;
      context.lineWidth = 1;
      context.beginPath();

      // Half-pixel offsets in device space keep a 1px line crisp at any DPR.
      const snap = (value: number) => Math.round(value * dpr) + 0.5;
      const line = (x1: number, y1: number, x2: number, y2: number) => {
        const [ax, ay] = dent(x1, y1);
        const [bx, by] = dent(x2, y2);
        context.moveTo(snap(x1 + ax), snap(y1 + ay));
        context.lineTo(snap(x2 + bx), snap(y2 + by));
      };

      for (let x = 0; x <= width + PITCH; x += PITCH) {
        for (let y = -SEGMENT; y <= height + SEGMENT; y += SEGMENT) {
          line(x, y, x, y + SEGMENT);
        }
      }
      for (let y = 0; y <= height + PITCH; y += PITCH) {
        for (let x = -SEGMENT; x <= width + SEGMENT; x += SEGMENT) {
          line(x, y, x + SEGMENT, y);
        }
      }

      context.stroke();

      if (canvas.dataset.ready !== "true") canvas.dataset.ready = "true";

      const settled =
        Math.abs(spring.value - spring.target) < 0.001 &&
        Math.abs(spring.velocity) < 0.001 &&
        !pointer.active;
      if (!settled) frame = requestAnimationFrame(draw);
      else spring.value = spring.target;
    };

    const start = () => {
      if (frame === 0 && visible) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!pointer.active) {
        // Enter at the real position so the first frame does not fly in.
        pointer.x = x;
        pointer.y = y;
      }
      pointer.tx = x;
      pointer.ty = y;
      pointer.active = true;
      spring.target = 1;
      start();
    };

    const onPointerLeave = () => {
      pointer.active = false;
      spring.target = 0;
      start();
    };

    resize();
    start();

    const observer = new ResizeObserver(() => {
      resize();
      start();
    });
    observer.observe(canvas);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    intersection.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    query.addEventListener("change", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      query.removeEventListener("change", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-grid-field pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
