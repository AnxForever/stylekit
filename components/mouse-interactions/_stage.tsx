"use client";

/**
 * Stage infrastructure for the mouse-interaction primitives.
 *
 * The primitives in components/mouse-interactions/primitives/* all
 * share one pointer position source. Rather than pass `pos` and
 * `stageRef` through props for every primitive, we route them
 * through a context that the <MouseStage> root owns. Primitives
 * call `useStage()` to grab the current frame's pointer position
 * inside their GSAP ticker / rAF loops.
 *
 * Why a native addEventListener instead of React's pointer events?
 *   - React's synthetic events are delegated to the root. When a
 *     primitive is rendered inside deeply nested portals /
 *     transformed layers (which the 20 mouse-rooms do), the
 *     synthetic pointer event sometimes never reaches our
 *     handler because pointer events get cancelled by a
 *     transformed ancestor with `pointer-events: none`. Native
 *     listeners on the stage element bypass that.
 *   - It also lets the stage element stop propagation naturally
 *     so cursor-aura=off children don't accidentally trigger
 *     stage-wide effects.
 *
 * SSR-safe: the listeners are registered inside useEffect, so
 * the component renders identically on the server and the client.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

export interface PointerPos {
  x: number;
  y: number;
  inside: boolean;
}

interface StageContextValue {
  pos: React.MutableRefObject<PointerPos>;
  stageRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const PointerContext = createContext<StageContextValue | null>(null);

export const useStage = (): StageContextValue => {
  const ctx = useContext(PointerContext);
  if (!ctx) throw new Error("mouse primitive must be used inside <MouseStage>");
  return ctx;
};

export function MouseStage({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef<PointerPos>({ x: 0, y: 0, inside: false });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // Skip on touch / coarse-pointer devices — the effects are
    // tuned for a mouse and consume frames they don't need.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY, inside: true };
    };
    const onLeave = () => {
      pos.current = { ...pos.current, inside: false };
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerenter", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerenter", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={stageRef} className={className} style={style}>
      <PointerContext.Provider value={{ pos, stageRef }}>
        {children}
      </PointerContext.Provider>
    </div>
  );
}

// Linear interpolation helper shared by primitives that smooth
// rAF-driven values (MagneticTarget, GeometricFragments, etc).
// Kept here so every primitive file doesn't have to redefine it.
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;