"use client";

import {
  useEffect,
  useRef,
  type PointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import { usePointerInteractionEnabled } from "@/components/pointer-interactions/hooks";

/**
 * Cursor-following wash for cards, ported from the owner's blog. The hook
 * writes --spotlight-x/y on the card element in a requestAnimationFrame and
 * <CardSpotlight /> paints them as a soft radial highlight. Both stay inert
 * on coarse pointers and for reduced-motion visitors, and the layer only
 * fades in where the browser supports hover.
 */
export function useCardSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const enabled = usePointerInteractionEnabled();
  const ref = useRef<T | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointRef = useRef({ x: 0, y: 0 });

  useEffect(
    () => () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
    },
    []
  );

  const onPointerMove = (event: PointerEvent<T>) => {
    if (!enabled) return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    pointRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    if (frameRef.current != null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const node = ref.current;
      if (!node) return;
      node.style.setProperty("--spotlight-x", `${pointRef.current.x.toFixed(1)}px`);
      node.style.setProperty("--spotlight-y", `${pointRef.current.y.toFixed(1)}px`);
    });
  };

  return { ref, onPointerMove };
}

/**
 * Sits above the card content but below links (z-10) and controls (z-20), so
 * the highlight never blocks interaction or washes out the action buttons.
 * Requires a `group` ancestor, which every card root already provides.
 */
export function CardSpotlight({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "card-spotlight pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100",
        className
      )}
    />
  );
}
