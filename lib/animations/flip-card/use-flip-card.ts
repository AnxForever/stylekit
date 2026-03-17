"use client";

import { useCallback, useState } from "react";

export interface UseFlipCardOptions {
  /** Flip duration in ms (default: 600) */
  duration?: number;
  /** Perspective distance in px (default: 1000) */
  perspective?: number;
}

export interface FlipCardState {
  isFlipped: boolean;
  flip: () => void;
  reset: () => void;
  toggle: () => void;
  containerStyle: React.CSSProperties;
  innerStyle: React.CSSProperties;
  frontStyle: React.CSSProperties;
  backStyle: React.CSSProperties;
}

/**
 * useFlipCard — 3D card flip hook.
 *
 * Returns styles for container, inner, front, and back faces.
 * Flip can be triggered by hover (CSS) or programmatically via toggle().
 *
 * @example
 * const { isFlipped, toggle, containerStyle, innerStyle, frontStyle, backStyle } = useFlipCard();
 * <div style={containerStyle}>
 *   <div style={innerStyle} onMouseEnter={toggle} onMouseLeave={toggle}>
 *     <div style={frontStyle}>Front</div>
 *     <div style={backStyle}>Back</div>
 *   </div>
 * </div>
 */
export function useFlipCard({
  duration = 600,
  perspective = 1000,
}: UseFlipCardOptions = {}): FlipCardState {
  const [isFlipped, setIsFlipped] = useState(false);

  const flip = useCallback(() => setIsFlipped(true), []);
  const reset = useCallback(() => setIsFlipped(false), []);
  const toggle = useCallback(() => setIsFlipped((prev) => !prev), []);

  const containerStyle: React.CSSProperties = {
    perspective: `${perspective}px`,
  };

  const innerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    willChange: "transform",
    transition: `transform ${duration}ms ease-in-out`,
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  };

  const faceBase: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
  };

  const frontStyle: React.CSSProperties = { ...faceBase };

  const backStyle: React.CSSProperties = {
    ...faceBase,
    transform: "rotateY(180deg)",
  };

  return {
    isFlipped,
    flip,
    reset,
    toggle,
    containerStyle,
    innerStyle,
    frontStyle,
    backStyle,
  };
}
