"use client";

import { useRef, type CSSProperties, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { usePointerInteractionEnabled } from "./hooks";

interface SpotlightSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  radius?: number;
  strength?: number;
  color?: string;
}

export function SpotlightSurface({
  children,
  disabled = false,
  radius = 360,
  strength = 0.14,
  color = "255,255,255",
  className,
  style,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}: SpotlightSurfaceProps) {
  const enabled = usePointerInteractionEnabled(disabled);
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointRef = useRef({ x: 0, y: 0, opacity: 0 });

  function write() {
    frameRef.current = null;
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--sk-spotlight-x", `${pointRef.current.x}px`);
    element.style.setProperty("--sk-spotlight-y", `${pointRef.current.y}px`);
    element.style.setProperty("--sk-spotlight-opacity", String(pointRef.current.opacity));
  }

  function schedule(next: typeof pointRef.current) {
    pointRef.current = next;
    if (frameRef.current == null) {
      frameRef.current = window.requestAnimationFrame(write);
    }
  }

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    onMouseMove?.(event);
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    schedule({
      x: Number((event.clientX - rect.left).toFixed(1)),
      y: Number((event.clientY - rect.top).toFixed(1)),
      opacity: 1,
    });
  }

  function handleLeave(event: MouseEvent<HTMLDivElement>) {
    onMouseLeave?.(event);
    if (!enabled) return;
    schedule({ ...pointRef.current, opacity: 0 });
  }

  const cssVars = {
    "--sk-spotlight-radius": `${radius}px`,
    "--sk-spotlight-strength": String(strength),
    "--sk-spotlight-color": color,
    "--sk-spotlight-opacity": 0,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cn("sk-spotlight-surface relative overflow-hidden", className)}
      style={cssVars}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      <div className="sk-spotlight-layer pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-200" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
