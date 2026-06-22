"use client";

import { useRef, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { usePointerInteractionEnabled } from "./hooks";

interface TiltSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  maxTilt?: number;
  scale?: number;
}

export function TiltSurface({
  children,
  disabled = false,
  maxTilt = 8,
  scale = 1.015,
  className,
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: TiltSurfaceProps) {
  const enabled = usePointerInteractionEnabled(disabled);
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const transformRef = useRef("rotateX(0deg) rotateY(0deg) scale(1)");

  function write() {
    frameRef.current = null;
    if (ref.current) ref.current.style.transform = transformRef.current;
  }

  function schedule(transform: string) {
    transformRef.current = transform;
    if (frameRef.current == null) {
      frameRef.current = window.requestAnimationFrame(write);
    }
  }

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    onMouseMove?.(event);
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    schedule(
      `rotateX(${Number((-y * maxTilt).toFixed(2))}deg) rotateY(${Number((x * maxTilt).toFixed(2))}deg) scale(${scale})`
    );
  }

  function handleLeave(event: MouseEvent<HTMLDivElement>) {
    onMouseLeave?.(event);
    if (!enabled) return;
    schedule("rotateX(0deg) rotateY(0deg) scale(1)");
  }

  return (
    <div className="sk-tilt-perspective">
      <div
        ref={ref}
        className={cn(
          "motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out",
          className
        )}
        style={{ transformStyle: "preserve-3d", ...style }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
