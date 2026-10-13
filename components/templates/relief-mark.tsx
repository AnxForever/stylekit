"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import styles from "./relief-mark.module.css";

export interface ReliefMarkProps {
  /** Accessible name for the interactive relief demo. */
  label?: string;
  /** Lets the containing template size and place the mark. */
  className?: string;
}

const GLYPH_PATH =
  "M32 32h98v26H60v20h58v26H60v40H32z M158 144V32h28l34 52 34-52h28v112h-28V79l-33 51h-2l-33-51v65z";
const EXTRUSION = 14;
const LAYER_COUNT = 12;

function makeIds(id: string) {
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");
  return {
    facePattern: "relief-" + safeId + "-hatch",
    light: "relief-" + safeId + "-light",
  };
}

function interactivePointerLightEnabled(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * A reusable SVG extrusion study for the Field Manual profile template.
 * The neutral block lettering is separate from any personal brand. Its native
 * button semantics make the momentary press available to keyboard and touch users.
 */
export function ReliefMark({
  className,
  label = "Field Manual mark",
}: ReliefMarkProps) {
  const reactId = useId();
  const ids = makeIds(reactId);
  const lightRef = useRef<SVGRadialGradientElement>(null);
  const [pressed, setPressed] = useState(false);
  const classes = [styles.button, className].filter(Boolean).join(" ");
  const extrusionLayers = Array.from({ length: LAYER_COUNT + 1 }, (_, index) =>
    1 - index / LAYER_COUNT
  );

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if ((event.pointerType !== "mouse" && event.pointerType !== "pen") ||
        !interactivePointerLightEnabled()) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width <= 0 || bounds.height <= 0 || !lightRef.current) return;

    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    lightRef.current.setAttribute("cx", (x * 100).toFixed(1) + "%");
    lightRef.current.setAttribute("cy", (y * 100).toFixed(1) + "%");
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse" || event.button === 0) {
      setPressed(true);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!event.repeat && (event.key === " " || event.key === "Enter")) {
      setPressed(true);
    }
  }

  function handleKeyUp(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === " " || event.key === "Enter") {
      setPressed(false);
    }
  }

  function resetInteraction() {
    setPressed(false);
    if (!lightRef.current) return;
    lightRef.current.setAttribute("cx", "50%");
    lightRef.current.setAttribute("cy", "50%");
  }

  const handlePointerLeave = () => resetInteraction();

  return (
    <button
      type="button"
      className={classes}
      aria-label={label}
      data-pressed={pressed}
      onPointerDown={handlePointerDown}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={resetInteraction}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={resetInteraction}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 312 168"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.art}
      >
        <defs>
          <pattern
            id={ids.facePattern}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-2 2 2-2M0 9 9 0M7 11l4-4"
              className={styles.hatch}
            />
          </pattern>
          <radialGradient
            id={ids.light}
            ref={lightRef}
            cx="50%"
            cy="50%"
            r="72%"
            gradientUnits="objectBoundingBox"
            className={styles.pointerGradient}
          >
            <stop offset="0" className={styles.lightCenter} />
            <stop offset="0.34" className={styles.lightMid} />
            <stop offset="1" className={styles.lightEdgeStop} />
          </radialGradient>
        </defs>

        <g className={styles.extrusion} aria-hidden="true">
          {extrusionLayers.map((depth) => (
            <path
              key={depth}
              d={GLYPH_PATH}
              transform={
                "translate(" +
                (EXTRUSION * depth).toFixed(2) +
                " " +
                (EXTRUSION * depth).toFixed(2) +
                ")"
              }
            />
          ))}
        </g>

        <g className={styles.face}>
          <path d={GLYPH_PATH} className={styles.faceFill} />
          <path
            d={GLYPH_PATH}
            fill={"url(#" + ids.light + ")"}
            className={styles.lightWash}
          />
          <path d={GLYPH_PATH} fill={"url(#" + ids.facePattern + ")"} />
          <path d={GLYPH_PATH} className={styles.faceOutline} />
          <path
            d={GLYPH_PATH}
            fill="none"
            stroke={"url(#" + ids.light + ")"}
            className={styles.lightEdge}
          />
        </g>
      </svg>
    </button>
  );
}
