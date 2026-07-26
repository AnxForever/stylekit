import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

const W = 1920;
const H = 1080;
const TAU = Math.PI * 2;

interface Ribbon {
  baseY: number;
  thickness: number;
  amp: number;
  spatial: number;
  speed: number;
  phase: number;
  fill: string;
  opacity: number;
  blur: number;
}

const RIBBONS: Ribbon[] = [
  { baseY: 260, thickness: 340, amp: 90, spatial: 1.2, speed: 1, phase: 0.0, fill: "silkA", opacity: 0.85, blur: 14 },
  { baseY: 430, thickness: 300, amp: 120, spatial: 1.6, speed: 1, phase: 1.7, fill: "silkB", opacity: 0.8, blur: 8 },
  { baseY: 560, thickness: 380, amp: 110, spatial: 0.9, speed: 2, phase: 3.1, fill: "silkC", opacity: 0.75, blur: 4 },
  { baseY: 700, thickness: 320, amp: 140, spatial: 1.4, speed: 1, phase: 4.4, fill: "silkB", opacity: 0.7, blur: 10 },
  { baseY: 840, thickness: 360, amp: 100, spatial: 1.1, speed: 2, phase: 5.6, fill: "silkD", opacity: 0.8, blur: 6 },
  { baseY: 960, thickness: 420, amp: 80, spatial: 0.8, speed: 1, phase: 2.4, fill: "silkA", opacity: 0.85, blur: 16 },
];

function edge(baseY: number, amp: number, spatial: number, speed: number, phase: number, theta: number): string {
  const step = 64;
  const pts: string[] = [];
  for (let x = -step; x <= W + step; x += step) {
    const u = (x / W) * spatial * TAU;
    const y =
      baseY +
      amp * Math.sin(u + speed * theta + phase) +
      amp * 0.35 * Math.sin(2.3 * u - speed * theta + phase * 1.9);
    pts.push(`${x},${Math.round(y * 10) / 10}`);
  }
  return pts.join(" L");
}

function ribbonPath(r: Ribbon, theta: number): string {
  const top = edge(r.baseY, r.amp, r.spatial, r.speed, r.phase, theta);
  const bottomPts: string[] = [];
  const step = 64;
  for (let x = W + step; x >= -step; x -= step) {
    const u = (x / W) * r.spatial * TAU;
    const y =
      r.baseY +
      r.thickness +
      r.amp * 0.8 * Math.sin(u + r.speed * theta + r.phase + 0.9) +
      r.amp * 0.3 * Math.sin(2.1 * u - r.speed * theta + r.phase);
    bottomPts.push(`${x},${Math.round(y * 10) / 10}`);
  }
  return `M${top} L${bottomPts.join(" L")} Z`;
}

export const SilkFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const total = durationInFrames > 1 ? durationInFrames : 240;
  const theta = (frame / total) * TAU;

  const glowX = W * 0.5 + Math.cos(theta) * W * 0.18;
  const glowY = H * 0.42 + Math.sin(theta) * H * 0.1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F7F5F1" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="silkA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2EDE2" />
            <stop offset="55%" stopColor="#E9E0CE" />
            <stop offset="100%" stopColor="#DDD1BA" />
          </linearGradient>
          <linearGradient id="silkB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EFE7D8" />
            <stop offset="60%" stopColor="#E2D5BE" />
            <stop offset="100%" stopColor="#D3C4A8" />
          </linearGradient>
          <linearGradient id="silkC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EDE4D2" />
            <stop offset="50%" stopColor="#DfD2B9" />
            <stop offset="100%" stopColor="#C9B896" />
          </linearGradient>
          <linearGradient id="silkD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0EADD" />
            <stop offset="55%" stopColor="#E5DAC5" />
            <stop offset="100%" stopColor="#D6C7AB" />
          </linearGradient>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C9A96A" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#C9A96A" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#C9A96A" stopOpacity="0" />
          </radialGradient>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.09  0 0 0 0 0.07  0 0 0 0.04 0" />
          </filter>
          {RIBBONS.map((r, i) => (
            <filter key={i} id={`blur${i}`} x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation={r.blur} />
            </filter>
          ))}
        </defs>

        <circle cx={glowX} cy={glowY} r={720} fill="url(#goldGlow)" />

        {RIBBONS.map((r, i) => (
          <path
            key={i}
            d={ribbonPath(r, theta)}
            fill={`url(#${r.fill})`}
            opacity={r.opacity}
            filter={`url(#blur${i})`}
          />
        ))}

        <circle cx={glowX} cy={glowY - 60} r={420} fill="url(#goldGlow)" opacity={0.7} />
        <rect width={W} height={H} filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};
