"use client";

import {
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { usePointerInteractionEnabled } from "./hooks";

interface MagneticTargetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;
  disabled?: boolean;
}

export function MagneticTarget({
  children,
  strength = 0.22,
  disabled = false,
  className,
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticTargetProps) {
  const enabled = usePointerInteractionEnabled(disabled);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const nextRef = useRef({ x: 0, y: 0 });

  function writeTransform() {
    frameRef.current = null;
    const target = targetRef.current;
    if (!target) return;
    target.style.transform = `translate3d(${nextRef.current.x}px, ${nextRef.current.y}px, 0)`;
  }

  function schedule(x: number, y: number) {
    nextRef.current = { x, y };
    if (frameRef.current == null) {
      frameRef.current = window.requestAnimationFrame(writeTransform);
    }
  }

  function handleMove(event: MouseEvent<HTMLElement>) {
    onMouseMove?.(event as MouseEvent<HTMLDivElement>);
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
    schedule(Number(x.toFixed(2)), Number(y.toFixed(2)));
  }

  function handleLeave(event: MouseEvent<HTMLElement>) {
    onMouseLeave?.(event as MouseEvent<HTMLDivElement>);
    if (!enabled) return;
    schedule(0, 0);
  }

  const sharedClassName = cn(
    "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
    className
  );

  return (
    <div
      ref={(node) => {
        targetRef.current = node;
      }}
      className={sharedClassName}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </div>
  );
}
