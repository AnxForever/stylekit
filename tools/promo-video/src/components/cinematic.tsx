/**
 * Cinematic overlays laid over the real pages.
 *
 * The rule for every effect here: it must be a camera or a lens, never a
 * decoration. A light sweep is a scanner passing over the work, scanlines are a
 * signal, brackets are a viewfinder. If an effect only makes the frame busier
 * without saying "we are looking at this closely", it does not belong.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { progress, rand } from "./motion";
import type { Treatment } from "../treatments";

/** A soft band of light travelling across the frame. */
export const LightSweep: React.FC<{ frame: number; duration: number; delay?: number }> = ({
  frame,
  duration,
  delay = 0,
}) => {
  const p = progress(frame, delay, duration, "inOut");
  const x = -40 + p * 180;
  const opacity = Math.sin(Math.PI * Math.min(1, Math.max(0, p))) * 0.85;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      <div
        style={{
          position: "absolute",
          top: "-20%",
          bottom: "-20%",
          left: `${x}%`,
          width: "24%",
          transform: "skewX(-14deg)",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.34) 50%, rgba(255,255,255,0.05) 70%, transparent 100%)",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

/** Fine horizontal bands, drifting - reads as a broadcast signal. */
export const Scanlines: React.FC<{ frame: number; opacity?: number; gap?: number }> = ({
  frame,
  opacity = 0.18,
  gap = 3,
}) => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity,
        background: `repeating-linear-gradient(180deg, rgba(0,0,0,0.9) 0px, rgba(0,0,0,0.9) 1px, transparent 1px, transparent ${gap}px)`,
        transform: `translateY(${(frame * 0.6) % gap}px)`,
        mixBlendMode: "multiply",
      }}
    />
  );
};

/** Colour separation, as tinted fields drifting either side of the page. */
export const ChromaBleed: React.FC<{ amount: number; frame: number }> = ({ amount, frame }) => {
  if (amount <= 0) return null;
  const wobble = Math.sin(frame * 0.13) * amount * 0.35;
  return (
    <>
      <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", background: "rgba(255,0,90,0.055)", transform: `translateX(${-amount - wobble}px)` }} />
      <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", background: "rgba(0,180,255,0.055)", transform: `translateX(${amount + wobble}px)` }} />
    </>
  );
};

/** Light bleeding in from an edge, as if the page were lit from off-frame. */
export const EdgeBleed: React.FC<{ side: "left" | "right" | "top" | "bottom"; frame: number }> = ({ side, frame }) => {
  const pulse = 0.55 + Math.sin(frame * 0.03) * 0.14;
  const dirs = {
    left: "90deg, rgba(255,255,255,0.30) 0%, transparent 46%",
    right: "270deg, rgba(255,255,255,0.30) 0%, transparent 46%",
    top: "180deg, rgba(255,255,255,0.26) 0%, transparent 44%",
    bottom: "0deg, rgba(255,255,255,0.26) 0%, transparent 44%",
  };
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: pulse, mixBlendMode: "screen", background: `linear-gradient(${dirs[side]})` }} />
  );
};

/** Viewfinder brackets, drawn on at the start of a shot. */
export const Brackets: React.FC<{ frame: number; color?: string }> = ({ frame, color = "rgba(255,255,255,0.72)" }) => {
  const p = progress(frame, 0, 26, "out");
  const len = 54 * p;
  const inset = 46;
  const arm = (key: string, rot: number, x: number, y: number) => (
    <div key={key} style={{ position: "absolute", left: x, top: y, width: len, height: len, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, transform: `rotate(${rot}deg)`, transformOrigin: "0 0" }} />
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {arm("tl", 0, inset, inset)}
      {arm("tr", 90, 1920 - inset, inset)}
      {arm("bl", 270, inset, 1080 - inset)}
      {arm("br", 180, 1920 - inset, 1080 - inset)}
    </AbsoluteFill>
  );
};

/** Slow film grain, seeded per shot so it never repeats identically. */
export const FilmGrain: React.FC<{ amount: number; seed: number; frame: number }> = ({ amount, seed, frame }) => {
  if (amount <= 0) return null;
  const j = Math.floor(rand(Math.floor(frame / 2) + seed) * 9);
  return (
    <AbsoluteFill style={{ opacity: amount, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%">
        <filter id={`g-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed={seed + j} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#g-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** All the overlays a treatment asks for, in the right order. */
export const TreatmentFX: React.FC<{ treatment: Treatment; frame: number; duration: number }> = ({ treatment, frame, duration }) => {
  const fx = treatment.fx;
  return (
    <>
      {fx.chroma ? <ChromaBleed amount={fx.chroma} frame={frame} /> : null}
      {fx.scanlines ? <Scanlines frame={frame} /> : null}
      {fx.sweep ? <LightSweep frame={frame} duration={duration} delay={duration * 0.18} /> : null}
      {fx.bleed ? <EdgeBleed side={fx.bleed} frame={frame} /> : null}
      {fx.brackets ? <Brackets frame={frame} /> : null}
      <FilmGrain amount={fx.grain ?? 0} seed={treatment.slug.length * 7} frame={frame} />
    </>
  );
};
