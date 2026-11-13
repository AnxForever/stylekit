"use client";

/**
 * Search choreography adapted from ptu14/liquid-glass demo/LiquidSearch.tsx
 * at c90ff9f098aea4b9705edf3ac83dabf3d98704d7. MIT, copyright 2026
 * Mateusz Daniluk. Full notice: docs/licenses/ptu14-liquid-glass-MIT.txt.
 * The input remains native and mounted; only the material and layout move.
 */
import { forwardRef, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Search, X } from "lucide-react";
import { resolveLiquidGlassSettings, type LiquidGlassSettings } from "@/lib/liquid-glass";
import { createSearchGlassRenderer, type SearchGlassFrame } from "@/lib/liquid-glass/search-renderer";
import { LiquidSpring } from "@/lib/liquid-glass/spring";
import { cn } from "@/lib/utils";
import styles from "./fluid-search.module.css";

const HEIGHT = 52;
const GAP = 12;
const PADDING = 80;
const LIQUID_MS = 620;
const rubber = (distance: number, reach: number) => distance * reach / (reach + Math.abs(distance));

export interface FluidSearchProps {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  placeholder: string;
  labels: { open: string; clear: string; close: string };
  settings?: Partial<LiquidGlassSettings>;
  tint?: string;
  className?: string;
}

interface SearchController {
  refresh: () => void;
  typing: () => void;
}

export const FluidSearch = forwardRef<HTMLInputElement, FluidSearchProps>(function FluidSearch({
  value,
  onValueChange,
  label,
  placeholder,
  labels,
  settings,
  tint,
  className,
}, forwardedRef) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<SearchController | null>(null);
  const latest = useRef({ value, onValueChange, settings, tint });
  const [expanded, setExpanded] = useState(Boolean(value));
  const inputId = useId();

  useImperativeHandle(forwardedRef, () => inputRef.current!, []);

  useLayoutEffect(() => {
    latest.current = { value, onValueChange, settings, tint };
    controllerRef.current?.refresh();
  }, [value, onValueChange, settings, tint]);

  useEffect(() => {
    const root = rootRef.current;
    const pill = pillRef.current;
    const button = buttonRef.current;
    const input = inputRef.current;
    const canvas = canvasRef.current;
    if (!root || !pill || !button || !input || !canvas) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const transparency = window.matchMedia("(prefers-reduced-transparency: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const left = new LiquidSpring(0, 0.36, 0.22);
    const right = new LiquidSpring(0, 0.36, 0.22);
    const buttonX = new LiquidSpring(0, 0.56, 0.48);
    const buttonY = new LiquidSpring(0, 0.56, 0.48);
    const scale = new LiquidSpring(1, 0.3, 0.3);
    const springs = [left, right, buttonX, buttonY, scale];
    const image = new Image();
    let renderer: ReturnType<typeof createSearchGlassRenderer> = null;
    let disposed = false;
    let contextLost = false;
    let rowWidth = 0;
    let initialized = false;
    let open = Boolean(latest.current.value);
    let composing = false;
    let frame = 0;
    let previousTime = 0;
    let liquidStart = 0;
    let liquidEnd = 0;
    let releasing = false;
    let suppressClickUntil = 0;
    let dark = false;
    let rgba: SearchGlassFrame["tint"] = [1, 1, 1, 0.07];
    let pointer: { id: number; x: number; y: number; dx: number; dy: number; moved: boolean } | null = null;

    function opaque() {
      return transparency.matches || forcedColors.matches || root!.closest("[data-glass-solid]") !== null;
    }

    function targets() {
      const available = Math.max(HEIGHT, rowWidth - HEIGHT - GAP);
      const width = open ? available : available * 0.72;
      const x = open ? 0 : (rowWidth - width - GAP - HEIGHT) / 2;
      return { left: x, right: x + width, button: x + width + GAP };
    }

    function retarget(immediate = false) {
      const target = targets();
      left.to(target.left);
      right.to(target.right);
      if (!pointer?.moved || motion.matches) {
        buttonX.to(target.button);
        buttonY.to(0);
      }
      scale.to(1);
      if (immediate || motion.matches) springs.forEach((spring) => spring.set(spring.target));
    }

    function draw(now: number) {
      const px = left.value;
      const width = Math.max(HEIGHT, right.value - px);
      const bx = buttonX.value;
      const by = buttonY.value;
      pill!.style.left = "0px";
      button!.style.left = "0px";
      pill!.style.transform = `translate3d(${px.toFixed(3)}px, 0, 0)`;
      pill!.style.width = `${width.toFixed(3)}px`;
      button!.style.transform = `translate3d(${bx.toFixed(3)}px, ${by.toFixed(3)}px, 0) scale(${scale.value.toFixed(4)})`;
      if (!renderer || opaque()) return;
      const rect = root!.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (now - liquidStart) / LIQUID_MS));
      const active = motion.matches ? 0 : pointer?.moved ? 1 : now < liquidEnd ? 1 - progress : 0;
      const blend = motion.matches ? 0 : pointer?.moved ? 24 : now >= liquidEnd ? 0
        : releasing ? 24 * (1 - progress) ** 2 : 24 * Math.sin(progress * Math.PI);
      const resolved = resolveLiquidGlassSettings(latest.current.settings);
      renderer.draw({
        width: rowWidth + PADDING * 2,
        height: HEIGHT + PADDING * 2,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        originX: rect.left - PADDING,
        originY: rect.top - PADDING,
        pill: { x: px + PADDING, y: PADDING, width, height: HEIGHT, radius: HEIGHT / 2 },
        button: { x: bx + PADDING + HEIGHT / 2, y: by + PADDING + HEIGHT / 2, radius: HEIGHT / 2 * scale.value },
        blend,
        active,
        refraction: resolved.refraction,
        frost: resolved.frost / 100 * 12,
        tint: rgba,
        dark,
      });
    }

    function tick(now: number) {
      frame = 0;
      if (disposed) return;
      const dt = previousTime ? Math.min(0.05, (now - previousTime) / 1000) : 1 / 60;
      previousTime = now;
      if (motion.matches) {
        springs.forEach((spring) => spring.set(spring.target));
        liquidEnd = 0;
      } else {
        springs.forEach((spring) => spring.step(dt));
      }
      draw(now);
      if (pointer || springs.some((spring) => !spring.settled) || now < liquidEnd) {
        frame = requestAnimationFrame(tick);
      } else {
        previousTime = 0;
        root!.removeAttribute("data-active");
      }
    }

    function wake() {
      if (disposed) return;
      root!.setAttribute("data-active", "");
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function liquid(release = false) {
      liquidStart = performance.now();
      liquidEnd = motion.matches ? 0 : liquidStart + LIQUID_MS;
      releasing = release;
    }

    function changeOpen(next: boolean) {
      if (open === next) return;
      open = next;
      setExpanded(next);
      retarget();
      if (!motion.matches) buttonX.velocity -= 800;
      liquid();
      wake();
    }

    function measure() {
      rowWidth = root!.clientWidth;
      if (!rowWidth) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round((rowWidth + PADDING * 2) * ratio);
      const height = Math.round((HEIGHT + PADDING * 2) * ratio);
      if (canvas!.width !== width) canvas!.width = width;
      if (canvas!.height !== height) canvas!.height = height;
      retarget(!initialized);
      initialized = true;
      wake();
    }

    function refresh() {
      dark = document.documentElement.classList.contains("dark")
        || root!.closest("[data-theme='dark']") !== null;
      const color = getComputedStyle(pill!, "::before").backgroundColor;
      const channels = color.match(/[\d.]+/g)?.map(Number);
      if (channels && channels.length >= 3) {
        rgba = [channels[0] / 255, channels[1] / 255, channels[2] / 255, channels[3] ?? 1];
      }
      if (latest.current.value) changeOpen(true);
      else if (!root!.contains(document.activeElement)) changeOpen(false);
      wake();
    }

    function rebuildRenderer() {
      renderer?.dispose();
      renderer = null;
      root!.removeAttribute("data-optical");
      if (!disposed && !contextLost && !opaque() && image.complete && image.naturalWidth) {
        renderer = createSearchGlassRenderer(canvas!, image);
        if (renderer) root!.setAttribute("data-optical", "");
      }
      wake();
    }

    function preferenceChanged() {
      if (motion.matches) {
        liquidEnd = 0;
        retarget(true);
      }
      rebuildRenderer();
      refresh();
    }

    function focusIn(event: FocusEvent) {
      if (event.target === input) changeOpen(true);
    }

    function focusOut(event: FocusEvent) {
      if (event.relatedTarget instanceof Node && root!.contains(event.relatedTarget)) return;
      queueMicrotask(() => {
        if (!disposed && !latest.current.value && !root!.contains(document.activeElement)) changeOpen(false);
      });
    }

    function keyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || composing || event.isComposing || event.keyCode === 229) return;
      event.preventDefault();
      event.stopPropagation();
      if (input!.value) {
        latest.current.onValueChange("");
        changeOpen(true);
        input!.focus({ preventScroll: true });
      } else {
        changeOpen(false);
        button!.focus({ preventScroll: true });
      }
    }

    function compositionStart() { composing = true; }
    function compositionEnd() { composing = false; }

    function pointerDown(event: PointerEvent) {
      if (event.button !== 0 || pointer) return;
      event.preventDefault();
      suppressClickUntil = 0;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, dy: 0, moved: false };
      button!.setPointerCapture(event.pointerId);
      scale.to(motion.matches ? 1 : 0.96);
      wake();
    }

    function pointerMove(event: PointerEvent) {
      if (!pointer || pointer.id !== event.pointerId) return;
      pointer.dx = event.clientX - pointer.x;
      pointer.dy = event.clientY - pointer.y;
      if (Math.hypot(pointer.dx, pointer.dy) > 5) pointer.moved = true;
      if (pointer.moved && !motion.matches) {
        buttonX.set(targets().button + rubber(pointer.dx, 90));
        buttonY.set(rubber(pointer.dy, 54));
      }
      wake();
    }

    function endPointer(event: PointerEvent, cancelled: boolean) {
      if (!pointer || pointer.id !== event.pointerId) return;
      const moved = pointer.moved;
      const id = pointer.id;
      pointer = null;
      if (cancelled || moved) suppressClickUntil = performance.now() + 600;
      if (button!.hasPointerCapture(id)) button!.releasePointerCapture(id);
      retarget();
      if (moved) liquid(true);
      wake();
    }

    function pointerUp(event: PointerEvent) { endPointer(event, false); }
    function pointerCancel(event: PointerEvent) { endPointer(event, true); }

    function click(event: MouseEvent) {
      if (event.detail !== 0 && performance.now() < suppressClickUntil) {
        event.preventDefault();
        return;
      }
      if (input!.value) {
        latest.current.onValueChange("");
        changeOpen(true);
        input!.focus({ preventScroll: true });
      } else if (open) {
        changeOpen(false);
        button!.focus({ preventScroll: true });
      } else {
        changeOpen(true);
        input!.focus({ preventScroll: true });
      }
    }

    function lostContext(event: Event) {
      event.preventDefault();
      contextLost = true;
      renderer?.dispose();
      renderer = null;
      root!.removeAttribute("data-optical");
    }

    function restoredContext() {
      contextLost = false;
      rebuildRenderer();
    }

    const observer = new ResizeObserver(measure);
    observer.observe(root);
    const themeObserver = new MutationObserver(() => {
      refresh();
      if (Boolean(renderer) === opaque()) rebuildRenderer();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "data-glass-solid"] });
    root.addEventListener("focusin", focusIn);
    root.addEventListener("focusout", focusOut);
    input.addEventListener("keydown", keyDown);
    input.addEventListener("compositionstart", compositionStart);
    input.addEventListener("compositionend", compositionEnd);
    button.addEventListener("pointerdown", pointerDown);
    button.addEventListener("pointermove", pointerMove);
    button.addEventListener("pointerup", pointerUp);
    button.addEventListener("pointercancel", pointerCancel);
    button.addEventListener("lostpointercapture", pointerCancel);
    button.addEventListener("click", click);
    canvas.addEventListener("webglcontextlost", lostContext);
    canvas.addEventListener("webglcontextrestored", restoredContext);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", wake, { passive: true, capture: true });
    motion.addEventListener("change", preferenceChanged);
    transparency.addEventListener("change", preferenceChanged);
    forcedColors.addEventListener("change", preferenceChanged);
    image.addEventListener("load", rebuildRenderer);
    image.src = "/styles/liquid-glass/glacier.webp";
    controllerRef.current = {
      refresh,
      typing() {
        liquidEnd = 0;
        changeOpen(true);
        wake();
      },
    };
    measure();
    refresh();

    return () => {
      disposed = true;
      controllerRef.current = null;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      themeObserver.disconnect();
      root.removeEventListener("focusin", focusIn);
      root.removeEventListener("focusout", focusOut);
      input.removeEventListener("keydown", keyDown);
      input.removeEventListener("compositionstart", compositionStart);
      input.removeEventListener("compositionend", compositionEnd);
      button.removeEventListener("pointerdown", pointerDown);
      button.removeEventListener("pointermove", pointerMove);
      button.removeEventListener("pointerup", pointerUp);
      button.removeEventListener("pointercancel", pointerCancel);
      button.removeEventListener("lostpointercapture", pointerCancel);
      button.removeEventListener("click", click);
      canvas.removeEventListener("webglcontextlost", lostContext);
      canvas.removeEventListener("webglcontextrestored", restoredContext);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", wake, true);
      motion.removeEventListener("change", preferenceChanged);
      transparency.removeEventListener("change", preferenceChanged);
      forcedColors.removeEventListener("change", preferenceChanged);
      image.removeEventListener("load", rebuildRenderer);
      if (pointer && button.hasPointerCapture(pointer.id)) button.releasePointerCapture(pointer.id);
      renderer?.dispose();
      root.removeAttribute("data-optical");
      root.removeAttribute("data-active");
    };
  }, []);

  const actionLabel = value ? labels.clear : expanded ? labels.close : labels.open;

  return (
    <div
      ref={rootRef}
      role="search"
      aria-label={label}
      className={cn(styles.root, className)}
      data-expanded={expanded ? "" : undefined}
      style={{ "--search-tint": tint ?? "rgba(255, 255, 255, 0.07)" } as CSSProperties}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div ref={pillRef} className={styles.pill}>
        <Search className={styles.searchIcon} size={19} strokeWidth={1.6} aria-hidden="true" />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          aria-label={label}
          placeholder={placeholder}
          value={value}
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => {
            controllerRef.current?.typing();
            onValueChange(event.currentTarget.value);
          }}
        />
      </div>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        aria-label={actionLabel}
        aria-controls={inputId}
        aria-expanded={expanded}
        title={actionLabel}
      >
        {value || expanded ? <X size={20} strokeWidth={1.6} aria-hidden="true" /> : <Search size={20} strokeWidth={1.6} aria-hidden="true" />}
      </button>
    </div>
  );
});
