"use client";

/**
 * Motion adapted from 9und30/glassy-liquid at
 * 2361eb1f03979703db988180028ccc6d5fc23fe5: core/spring.ts,
 * interaction/press.ts and components/selector.ts. MIT, copyright 2026
 * thirtynine. Full notice: docs/licenses/glassy-liquid-MIT.txt.
 * This showcase adapter keeps optical maps at their layout size and animates
 * only the material layers; text never receives the gel deformation.
 */
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import type { LiquidGlassSettings } from "@/lib/liquid-glass";
import { cn } from "@/lib/utils";
import { LiquidGlass, type LiquidGlassProps } from "./liquid-glass";
import styles from "./fluid-glass.module.css";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const rubberBand = (offset: number, limit: number) =>
  Math.sign(offset) * limit * (1 - 1 / (Math.abs(offset) * 0.55 / limit + 1));

/** Analytic damped spring. Retargeting deliberately preserves velocity. */
class Spring {
  value: number;
  target: number;
  velocity = 0;

  constructor(value = 0, private duration = 0.42, private bounce = 0.24) {
    this.value = this.target = value;
  }

  to(target: number, duration = this.duration, bounce = this.bounce) {
    this.target = target;
    this.duration = duration;
    this.bounce = bounce;
  }

  set(value: number) {
    this.value = this.target = value;
    this.velocity = 0;
  }

  get settled() {
    return this.value === this.target && this.velocity === 0;
  }

  step(dt: number) {
    if (this.settled || dt <= 0) return;
    const omega = 2 * Math.PI / Math.max(0.001, this.duration);
    const damping = 1 - clamp(this.bounce, 0, 0.99);
    const start = this.value - this.target;
    const velocity = this.velocity;
    const decay = Math.exp(-damping * omega * dt);
    let offset: number;
    let nextVelocity: number;
    if (damping < 1) {
      const frequency = omega * Math.sqrt(1 - damping * damping);
      const b = (velocity + damping * omega * start) / frequency;
      const cosine = Math.cos(frequency * dt);
      const sine = Math.sin(frequency * dt);
      offset = decay * (start * cosine + b * sine);
      nextVelocity = decay * ((b * frequency - damping * omega * start) * cosine
        - (start * frequency + damping * omega * b) * sine);
    } else {
      const b = velocity + omega * start;
      offset = decay * (start + b * dt);
      nextVelocity = decay * (b - omega * (start + b * dt));
    }
    if (Math.abs(offset) < 0.001 && Math.abs(nextVelocity) < 0.01) {
      this.set(this.target);
    } else {
      this.value = this.target + offset;
      this.velocity = nextVelocity;
    }
  }
}

export interface FluidGlassProps extends LiquidGlassProps {
  draggable?: boolean;
  dragLabel?: string;
}

export function FluidGlass({
  draggable = false,
  dragLabel,
  className,
  style,
  contentClassName,
  radius = 28,
  children,
  ...glassProps
}: FluidGlassProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const x = new Spring();
    const y = new Spring();
    const followX = new Spring(0, 0.18, 0);
    const followY = new Spring(0, 0.18, 0);
    const pressure = new Spring(0, 0.22, 0.18);
    const stretchX = new Spring(0, 0.16, 0);
    const stretchY = new Spring(0, 0.16, 0);
    const springs = [x, y, followX, followY, pressure, stretchX, stretchY];
    let frame = 0;
    let lastTime = 0;
    let disposed = false;
    let width = 1;
    let height = 1;
    let keyboard: Element | null = null;
    let limits = { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity };
    let pointer: {
      id: number;
      clientX: number;
      clientY: number;
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    } | null = null;

    function measure() {
      const rect = root!.getBoundingClientRect();
      width = root!.offsetWidth || 1;
      height = root!.offsetHeight || 1;
      const bounds = root!.closest<HTMLElement>("[data-fluid-bounds]");
      const boundary = bounds?.getBoundingClientRect();
      const left = (boundary?.left ?? 0) + (bounds?.clientLeft ?? 0);
      const top = (boundary?.top ?? 0) + (bounds?.clientTop ?? 0);
      const right = left + (bounds?.clientWidth ?? window.innerWidth);
      const bottom = top + (bounds?.clientHeight ?? window.innerHeight);
      const baseLeft = rect.left - x.value;
      const baseTop = rect.top - y.value;
      limits = {
        minX: left - baseLeft,
        maxX: Math.max(left - baseLeft, right - baseLeft - rect.width),
        minY: top - baseTop,
        maxY: Math.max(top - baseTop, bottom - baseTop - rect.height),
      };
      if (draggable) {
        x.to(clamp(x.target, limits.minX, limits.maxX));
        y.to(clamp(y.target, limits.minY, limits.maxY));
      }
    }

    function draw() {
      const reduced = preference.matches;
      const grow = reduced ? 0 : Math.min(0.085, 12 / Math.max(width, height)) * pressure.value;
      const ex = reduced ? 0 : stretchX.value;
      const ey = reduced ? 0 : stretchY.value;
      const sx = (1 + grow) * (1 + ex) / Math.sqrt(1 + ey);
      const sy = (1 + grow) * (1 + ey) / Math.sqrt(1 + ex);
      root!.style.setProperty("--fluid-material-transform",
        `translate(${reduced ? 0 : followX.value.toFixed(2)}px, ${reduced ? 0 : followY.value.toFixed(2)}px) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`);
      root!.style.setProperty("--fluid-pressure", String(clamp(pressure.value, 0, 1)));
      if (draggable) root!.style.translate = `${x.value.toFixed(2)}px ${y.value.toFixed(2)}px`;
    }

    function tick(now: number) {
      frame = 0;
      if (disposed) return;
      const dt = lastTime ? Math.min(0.064, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;
      if (preference.matches) {
        springs.forEach((spring) => spring.set(spring.target));
        stretchX.set(0);
        stretchY.set(0);
      } else {
        x.step(dt);
        y.step(dt);
        if (draggable) {
          const boundedX = clamp(x.value, limits.minX, limits.maxX);
          const boundedY = clamp(y.value, limits.minY, limits.maxY);
          if (boundedX !== x.value) { x.value = boundedX; x.velocity = 0; }
          if (boundedY !== y.value) { y.value = boundedY; y.velocity = 0; }
        }
        followX.step(dt);
        followY.step(dt);
        pressure.step(dt);
        stretchX.to(Math.min(0.25, Math.abs(x.velocity) * 0.00014
          + Math.abs(followX.velocity) * 0.00012 + Math.abs(followX.value) / width * 0.6));
        stretchY.to(Math.min(0.25, Math.abs(y.velocity) * 0.00014
          + Math.abs(followY.velocity) * 0.00012 + Math.abs(followY.value) / height * 0.6));
        stretchX.step(dt);
        stretchY.step(dt);
      }
      draw();
      if (springs.some((spring) => !spring.settled)) frame = requestAnimationFrame(tick);
      else {
        lastTime = 0;
        if (!pointer) root!.removeAttribute("data-fluid-active");
      }
    }

    function wake() {
      if (disposed) return;
      root!.setAttribute("data-fluid-active", "");
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function end(cancelled: boolean) {
      const held = pointer;
      pointer = null;
      keyboard = null;
      if (held && root!.hasPointerCapture(held.id)) root!.releasePointerCapture(held.id);
      if (cancelled && held && draggable) {
        x.to(clamp(held.originX, limits.minX, limits.maxX));
        y.to(clamp(held.originY, limits.minY, limits.maxY));
      }
      pressure.to(0, 0.5, 0.38);
      followX.to(0, 0.5, 0.38);
      followY.to(0, 0.5, 0.38);
      root!.removeAttribute("data-fluid-pressed");
      wake();
    }

    function down(event: PointerEvent) {
      if (event.button !== 0 || pointer) return;
      const target = event.target;
      if (!(target instanceof Element) || target.closest("[data-fluid-glass]") !== root) return;
      if (target.closest("[data-fluid-control]")) return;
      if (target.closest(":disabled, [aria-disabled='true']")) return;
      measure();
      const rect = root!.getBoundingClientRect();
      root!.style.setProperty("--fluid-contact-x", `${clamp((event.clientX - rect.left) / rect.width, 0, 1) * 100}%`);
      root!.style.setProperty("--fluid-contact-y", `${clamp((event.clientY - rect.top) / rect.height, 0, 1) * 100}%`);
      pointer = { id: event.pointerId, clientX: event.clientX, clientY: event.clientY,
        startX: event.clientX, startY: event.clientY, originX: x.value, originY: y.value };
      pressure.to(1, 0.22, 0.18);
      root!.setAttribute("data-fluid-pressed", "");
      if (draggable) {
        event.preventDefault();
        root!.focus({ preventScroll: true });
        root!.setPointerCapture(event.pointerId);
      }
      wake();
    }

    function move(event: PointerEvent) {
      if (!pointer || pointer.id !== event.pointerId) return;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      const dx = event.clientX - pointer.startX;
      const dy = event.clientY - pointer.startY;
      if (draggable) {
        event.preventDefault();
        x.to(clamp(pointer.originX + dx, limits.minX, limits.maxX), 0.16, 0);
        y.to(clamp(pointer.originY + dy, limits.minY, limits.maxY), 0.16, 0);
      } else {
        followX.to(rubberBand(dx, Math.min(12, width * 0.09)), 0.18, 0);
        followY.to(rubberBand(dy, Math.min(10, height * 0.09)), 0.18, 0);
      }
      wake();
    }

    function up(event: PointerEvent) {
      if (pointer?.id === event.pointerId) end(event.type === "pointercancel");
    }

    function lost(event: PointerEvent) {
      if (pointer?.id === event.pointerId) end(true);
    }

    function keydown(event: KeyboardEvent) {
      if (!draggable) {
        if (event.repeat || pointer || (event.key !== " " && event.key !== "Enter")) return;
        const target = event.target;
        if (!(target instanceof Element) || target.closest("[data-fluid-glass]") !== root) return;
        if (target.closest("[data-fluid-control], :disabled, [aria-disabled='true']")) return;
        const control = target.closest("button, a[href]");
        if (!control || !root!.contains(control)) return;
        keyboard = control;
        const rect = root!.getBoundingClientRect();
        const contact = control.getBoundingClientRect();
        root!.style.setProperty("--fluid-contact-x", `${clamp((contact.left + contact.width / 2 - rect.left) / Math.max(1, rect.width), 0, 1) * 100}%`);
        root!.style.setProperty("--fluid-contact-y", `${clamp((contact.top + contact.height / 2 - rect.top) / Math.max(1, rect.height), 0, 1) * 100}%`);
        pressure.to(1, 0.22, 0.18);
        root!.setAttribute("data-fluid-pressed", "");
        wake();
        // Native buttons and links keep their own activation and scrolling.
        return;
      }
      if (event.target !== root) return;
      const step = event.shiftKey ? 32 : 12;
      const movement: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step],
      };
      const offset = movement[event.key];
      if (offset) {
        event.preventDefault();
        measure();
        x.to(clamp(x.target + offset[0], limits.minX, limits.maxX));
        y.to(clamp(y.target + offset[1], limits.minY, limits.maxY));
        pressure.to(0.75, 0.22, 0.18);
        wake();
      } else if (event.key === "Home") {
        event.preventDefault();
        measure();
        x.to(clamp(0, limits.minX, limits.maxX));
        y.to(clamp(0, limits.minY, limits.maxY));
        end(false);
      } else if (event.key === "Escape") {
        event.preventDefault();
        end(true);
      } else if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        pressure.to(1, 0.22, 0.18);
        wake();
      }
    }

    function keyup(event: KeyboardEvent) {
      if (!draggable && keyboard && (event.key === " " || event.key === "Enter")) {
        end(false);
        return;
      }
      if (draggable && event.target === root && [" ", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) end(false);
    }

    function resize() {
      measure();
      wake();
    }

    function blur() { if (pointer || pressure.target !== 0) end(true); }
    function preventDrag(event: DragEvent) { if (draggable) event.preventDefault(); }
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    observer?.observe(root);
    const bounds = root.closest<HTMLElement>("[data-fluid-bounds]");
    if (bounds && bounds !== root) observer?.observe(bounds);
    root.addEventListener("pointerdown", down);
    root.addEventListener("lostpointercapture", lost);
    root.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
    root.addEventListener("dragstart", preventDrag);
    root.addEventListener("focusout", blur);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("blur", blur);
    window.addEventListener("resize", resize);
    preference.addEventListener("change", resize);
    measure();
    draw();
    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (pointer && root.hasPointerCapture(pointer.id)) root.releasePointerCapture(pointer.id);
      observer?.disconnect();
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("lostpointercapture", lost);
      root.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
      root.removeEventListener("dragstart", preventDrag);
      root.removeEventListener("focusout", blur);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", blur);
      window.removeEventListener("resize", resize);
      preference.removeEventListener("change", resize);
    };
  }, [draggable]);

  return (
    <div
      ref={rootRef}
      className={cn(styles.surface, className)}
      style={{ borderRadius: radius, ...style }}
      data-fluid-glass=""
      data-fluid-draggable={draggable || undefined}
      role={draggable ? "button" : undefined}
      tabIndex={draggable ? 0 : undefined}
      aria-label={draggable ? dragLabel ?? "Move glass surface with arrow keys. Home resets; Escape cancels." : undefined}
    >
      <LiquidGlass {...glassProps} radius={radius} className={styles.material}
        style={{ boxShadow: "none" }} contentClassName={contentClassName}>
        {children}
      </LiquidGlass>
    </div>
  );
}

export interface FluidSegmentedProps {
  options: readonly { value: string; label: ReactNode }[];
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
  settings?: Partial<LiquidGlassSettings>;
}

export function FluidSegmented({ options, value, onValueChange, ariaLabel, className, settings }: FluidSegmentedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const latest = useRef({ value, onValueChange });
  const optionKeys = JSON.stringify(options.map((option) => option.value));

  useEffect(() => { latest.current = { value, onValueChange }; }, [value, onValueChange]);

  useEffect(() => {
    const root = rootRef.current;
    const pill = pillRef.current;
    if (!root || !pill) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const center = new Spring();
    const width = new Spring();
    const lift = new Spring(0, 0.22, 0.18);
    const stretch = new Spring(0, 0.16, 0);
    let geometry: { value: string; center: number; width: number; button: HTMLButtonElement }[] = [];
    let basis = 1;
    let frame = 0;
    let lastTime = 0;
    let initialized = false;
    let disposed = false;
    let suppressClickUntil = 0;
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;
    let drag: { id: number; x: number; y: number; offset: number; moved: boolean; original: string } | null = null;

    function at(x: number) {
      return geometry.reduce<typeof geometry[number] | undefined>((nearest, item) =>
        !nearest || Math.abs(item.center - x) < Math.abs(nearest.center - x) ? item : nearest, undefined);
    }

    function localX(clientX: number) {
      const rect = root!.getBoundingClientRect();
      return (clientX - rect.left) * (root!.offsetWidth / (rect.width || 1));
    }

    function target(nextValue: string, jump = false) {
      const item = geometry.find((entry) => entry.value === nextValue) ?? geometry[0];
      if (!item) return;
      if (jump) { center.set(item.center); width.set(item.width); }
      else { center.to(item.center, 0.42, 0.24); width.to(item.width, 0.42, 0.24); }
      wake();
    }

    function measure() {
      geometry = Array.from(root!.querySelectorAll<HTMLButtonElement>(":scope > button[data-fluid-option]")).map((button) => ({
        value: button.dataset.fluidOption ?? "", center: button.offsetLeft + button.offsetWidth / 2,
        width: button.offsetWidth, button,
      }));
      basis = Math.max(1, ...geometry.map((item) => item.width));
      // Fixed layout size: changing selection never regenerates its optical map.
      pill!.style.width = `${basis}px`;
      pill!.style.visibility = geometry.length ? "visible" : "hidden";
      if (!drag) target(latest.current.value, !initialized);
      initialized = true;
    }

    function tick(now: number) {
      frame = 0;
      if (disposed) return;
      const dt = lastTime ? Math.min(0.064, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;
      if (preference.matches) {
        center.set(center.target); width.set(width.target); lift.set(lift.target); stretch.set(0);
      } else {
        center.step(dt); width.step(dt); lift.step(dt);
        // Migration itself stretches the liquid, including keyboard selection.
        stretch.to(Math.min(0.3, Math.abs(center.velocity) * 0.0005));
        stretch.step(dt);
      }
      const raised = preference.matches ? 0 : clamp(lift.value, 0, 1.2);
      const sx = width.value / basis * (1 + stretch.value) * (1 + raised * 0.06);
      const sy = (1 + raised * 0.17) / Math.sqrt(1 + stretch.value);
      pill!.style.transform = `translateX(${(center.value - basis / 2).toFixed(2)}px) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
      root!.style.setProperty("--fluid-segment-lift", String(raised));
      const preview = at(center.value)?.value;
      geometry.forEach((item) => item.button.toggleAttribute("data-fluid-current", item.value === preview));
      if ([center, width, lift, stretch].some((spring) => !spring.settled)) frame = requestAnimationFrame(tick);
      else { lastTime = 0; root!.removeAttribute("data-fluid-active"); }
    }

    function wake() {
      if (!disposed && !frame) {
        root!.setAttribute("data-fluid-active", "");
        frame = requestAnimationFrame(tick);
      }
    }

    function end(cancelled: boolean) {
      const held = drag;
      if (!held) return;
      drag = null;
      if (root!.hasPointerCapture(held.id)) root!.releasePointerCapture(held.id);
      suppressClickUntil = performance.now() + 400;
      if (cancelled) target(held.original);
      else {
        const item = at(center.target);
        if (item) {
          target(item.value);
          latest.current.onValueChange(item.value);
        }
      }
      if (releaseTimer) clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => { lift.to(0, 0.5, 0.38); wake(); }, held.moved ? 0 : 130);
      root!.removeAttribute("data-fluid-pressed");
      wake();
    }

    function down(event: PointerEvent) {
      if (event.button !== 0 || drag || !geometry.length) return;
      if (releaseTimer) clearTimeout(releaseTimer);
      const position = localX(event.clientX);
      const selected = geometry.find((item) => item.value === latest.current.value);
      const onSelection = selected && Math.abs(position - center.value) <= selected.width / 2;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY,
        offset: onSelection ? center.value - position : 0, moved: false, original: latest.current.value };
      const next = onSelection ? selected : at(position);
      if (next) target(next.value);
      lift.to(1, 0.22, 0.18);
      root!.setPointerCapture(event.pointerId);
      root!.setAttribute("data-fluid-pressed", "");
      wake();
    }

    function move(event: PointerEvent) {
      if (!drag || drag.id !== event.pointerId) return;
      const dx = Math.abs(event.clientX - drag.x);
      const dy = Math.abs(event.clientY - drag.y);
      if (!drag.moved && event.pointerType === "touch" && dy > 8 && dy > dx) { end(true); return; }
      if (!drag.moved && dx < (event.pointerType === "mouse" ? 4 : 8)) return;
      drag.moved = true;
      event.preventDefault();
      const first = geometry[0];
      const last = geometry[geometry.length - 1];
      if (!first || !last) return;
      const raw = localX(event.clientX) + drag.offset;
      const position = raw < first.center ? first.center + (raw - first.center) * 0.15
        : raw > last.center ? last.center + (raw - last.center) * 0.15 : raw;
      center.to(position, 0.16, 0);
      width.to(at(position)?.width ?? basis, 0.16, 0);
      wake();
    }

    function up(event: PointerEvent) { if (drag?.id === event.pointerId) end(event.type === "pointercancel"); }
    function lost(event: PointerEvent) { if (drag?.id === event.pointerId) end(true); }
    function click(event: MouseEvent) {
      if (performance.now() < suppressClickUntil && event.detail !== 0) {
        event.preventDefault(); event.stopPropagation();
      }
    }
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape" && drag) { event.preventDefault(); end(true); return; }
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(event.key) || !geometry.length) return;
      event.preventDefault();
      const current = Math.max(0, geometry.findIndex((item) => item.value === latest.current.value));
      const rtl = getComputedStyle(root!).direction === "rtl";
      const direction = (event.key === "ArrowRight" ? 1 : -1) * (rtl ? -1 : 1);
      const index = event.key === "Home" ? 0 : event.key === "End" ? geometry.length - 1
        : (current + direction + geometry.length) % geometry.length;
      const item = geometry[index];
      if (!item) return;
      target(item.value);
      latest.current.onValueChange(item.value);
      item.button.focus({ preventScroll: true });
    }
    function sync() { if (!drag) target(latest.current.value); else wake(); }
    function blur() { if (drag) end(true); }
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(root);
    root.querySelectorAll("button").forEach((button) => observer?.observe(button));
    root.addEventListener("pointerdown", down);
    root.addEventListener("lostpointercapture", lost);
    root.addEventListener("click", click, true);
    root.addEventListener("keydown", keydown);
    root.addEventListener("fluid-selection-change", sync);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("blur", blur);
    window.addEventListener("resize", measure);
    preference.addEventListener("change", sync);
    measure();
    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      if (releaseTimer) clearTimeout(releaseTimer);
      if (drag && root.hasPointerCapture(drag.id)) root.releasePointerCapture(drag.id);
      observer?.disconnect();
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("lostpointercapture", lost);
      root.removeEventListener("click", click, true);
      root.removeEventListener("keydown", keydown);
      root.removeEventListener("fluid-selection-change", sync);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", blur);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", sync);
    };
  }, [optionKeys]);

  useEffect(() => { rootRef.current?.dispatchEvent(new Event("fluid-selection-change")); }, [value]);

  return (
    <div ref={rootRef} className={cn(styles.segmented, className)} role="group" aria-label={ariaLabel} data-fluid-control="">
      <div ref={pillRef} className={styles.segmentPill} aria-hidden="true">
        <LiquidGlass appearance="clear" radius={999} settings={settings}
          tint="rgba(255,255,255,0.16)" className={styles.segmentGlass} />
      </div>
      {options.map((option) => (
        <button key={option.value} type="button" className={styles.segmentButton}
          data-fluid-option={option.value} aria-pressed={value === option.value}
          onClick={() => onValueChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
