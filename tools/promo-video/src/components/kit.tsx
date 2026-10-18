/**
 * Shared visual primitives. These exist so a camera move, a frame edge or a
 * grain field looks identical in every scene - the film's continuity lives
 * here, not in the individual shots.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT_MONO, INK, SAFE } from "../theme";
import { rand } from "./motion";

/** 16:9 stage with the film's safe area already applied. */
export const Stage: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill
    style={{
      paddingLeft: SAFE.x,
      paddingRight: SAFE.x,
      paddingTop: SAFE.y,
      paddingBottom: SAFE.y,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/**
 * Film grain. A static tile of deterministic noise, jittered per frame so it
 * shimmers like stock rather than sitting there like a texture. Overlaid at low
 * opacity it is the single cheapest way to make vector art read as footage.
 */
export const Grain: React.FC<{ opacity?: number; seed?: number; scale?: number }> = ({
  opacity = 0.16,
  seed = 1,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const id = `grain-${seed}`;
  const jitter = Math.floor(rand(Math.floor(frame / 2) + seed * 97) * 12);
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width="100%" height="100%" style={{ transform: `scale(${scale})` }}>
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            seed={seed + jitter}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Vignette that pulls the eye to the centre of frame. */
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.75 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 42%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

/** The letterbox bars. Present for the whole film except the light outro. */
export const Letterbox: React.FC<{ height?: number }> = ({ height = 46 }) => (
  <>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height, background: "#000" }} />
    <div
      style={{ position: "absolute", bottom: 0, left: 0, right: 0, height, background: "#000" }}
    />
  </>
);

/** Monospaced eyebrow label - the film's one piece of persistent chrome. */
export const Slate: React.FC<{
  index?: string;
  label: string;
  color?: string;
  opacity?: number;
}> = ({ index, label, color = "rgba(255,255,255,0.5)", opacity = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: SAFE.x,
      top: 74,
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontFamily: FONT_MONO,
      fontSize: 15,
      letterSpacing: "0.28em",
      color,
      opacity,
      textTransform: "uppercase",
    }}
  >
    {index ? <span style={{ color: "inherit", opacity: 0.8 }}>{index}</span> : null}
    <span style={{ width: 26, height: 1, background: color, opacity: 0.6 }} />
    <span>{label}</span>
  </div>
);

/**
 * Thin rule that draws itself. Used as a section marker and as a beat accent:
 * its growth is linear so it reads as mechanical, not decorative.
 */
export const Rule: React.FC<{
  x: number;
  y: number;
  width: number;
  p: number;
  color?: string;
  thickness?: number;
}> = ({ x, y, width, p, color = "#fff", thickness = 2 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: width * p,
      height: thickness,
      background: color,
    }}
  />
);

/** A single 2x2 quadrant of the square motif. Radius scales with the block. */
export const Pixel: React.FC<{
  size: number;
  color: string;
  radius?: number;
  style?: React.CSSProperties;
}> = ({ size, color, radius = 0.18, style }) => (
  <div
    style={{
      width: size,
      height: size,
      background: color,
      borderRadius: size * radius,
      ...style,
    }}
  />
);

/**
 * The four-square motif that recurs through the film: it is simultaneously the
 * original logo grid, a style card, and a beat. Drawn rather than imported so
 * every instance can be animated independently.
 */
export const Quad: React.FC<{
  size: number;
  colors: [string, string, string, string];
  gap?: number;
  radius?: number;
  rotated?: number;
  style?: React.CSSProperties;
}> = ({ size, colors, gap = 0.08, radius = 0.2, rotated = 0, style }) => {
  const pad = size * gap;
  const cell = (size - pad) / 2;
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: `rotate(${rotated}deg)`,
        ...style,
      }}
    >
      {colors.map((c, i) => (
        <Pixel
          key={i}
          size={cell}
          color={c}
          radius={radius}
          style={{
            position: "absolute",
            left: (i % 2) * (cell + pad),
            top: Math.floor(i / 2) * (cell + pad),
          }}
        />
      ))}
    </div>
  );
};

/**
 * The detonation white flash. Returns an overlay whose opacity spikes and
 * decays - deliberately not an eased curve, because a flash should feel like
 * an impact rather than an animation.
 */
export const Flash: React.FC<{
  frame: number;
  at: number;
  peak?: number;
  hold?: number;
  fade?: number;
  color?: string;
}> = ({ frame, at, peak = 1, hold = 3, fade = 26, color = "#FFFFFF" }) => {
  if (frame < at || frame > at + hold + fade) return null;
  const t = frame - at;
  const opacity =
    t < hold ? peak * (1 - (t / hold) * 0.25) : peak * 0.75 * Math.max(0, 1 - (t - hold) / fade) ** 1.6;
  return (
    <AbsoluteFill style={{ background: color, opacity, pointerEvents: "none" }} />
  );
};

/**
 * Background shader stand-in: a soft drifting bloom built from two radial
 * gradients. Cheap, deterministic, and it keeps dark scenes from looking flat
 * between hard cuts.
 */
export const Bloom: React.FC<{
  colors: [string, string];
  intensity?: number;
  drift?: number;
  frame?: number;
}> = ({ colors, intensity = 0.4, drift = 1, frame = 0 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 70% 60% at ${30 + Math.sin(frame * 0.006 * drift) * 18}% ${28 + Math.cos(frame * 0.005 * drift) * 14}%, ${colors[0]} 0%, transparent 62%),
        radial-gradient(ellipse 60% 70% at ${72 - Math.sin(frame * 0.004 * drift) * 16}% ${74 + Math.sin(frame * 0.007 * drift) * 12}%, ${colors[1]} 0%, transparent 58%)`,
      opacity: intensity,
      backgroundBlendMode: "screen",
    }}
  />
);

