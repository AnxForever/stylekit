import React from "react";
import { AbsoluteFill } from "remotion";

const W = 1200;
const H = 1500;

// Deterministic pseudo-random (stable across renders)
function rnd(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface Pleat {
  x: number;
  w: number;
  tone: number; // 0 dark .. 1 light
  sway: number;
}

function makePleats(seed: number, count: number): Pleat[] {
  const pleats: Pleat[] = [];
  let x = -60;
  for (let i = 0; i < count; i++) {
    const w = 60 + rnd(seed + i) * 130;
    pleats.push({ x, w, tone: rnd(seed + i * 3.7), sway: (rnd(seed + i * 9.1) - 0.5) * 160 });
    x += w * 0.82;
  }
  return pleats;
}

function pleatPath(p: Pleat): string {
  const midX = p.x + p.w / 2;
  return [
    `M ${p.x} -80`,
    `C ${p.x + p.sway * 0.4} ${H * 0.33}, ${p.x - p.sway * 0.5} ${H * 0.66}, ${p.x + p.sway} ${H + 80}`,
    `L ${p.x + p.w + p.sway} ${H + 80}`,
    `C ${p.x + p.w - p.sway * 0.5} ${H * 0.66}, ${p.x + p.w + p.sway * 0.4} ${H * 0.33}, ${p.x + p.w} -80`,
    "Z",
  ].join(" ") + ` M ${midX} -80`;
}

const Drape: React.FC<{ seed: number; light: string; mid: string; dark: string; idPrefix: string; filterId?: string }> = ({
  seed,
  light,
  mid,
  dark,
  idPrefix,
  filterId = "fold",
}) => {
  const pleats = makePleats(seed, 14);
  return (
    <g filter={`url(#${filterId})`}>
      <rect x={-80} y={-80} width={W + 160} height={H + 160} fill={mid} />
      {pleats.map((p, i) => (
        <path
          key={i}
          d={pleatPath(p)}
          fill={`url(#${idPrefix}${p.tone > 0.5 ? "L" : "D"})`}
          opacity={0.55 + p.tone * 0.4}
        />
      ))}
      <defs>
        <linearGradient id={`${idPrefix}L`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid} stopOpacity="0" />
          <stop offset="45%" stopColor={light} />
          <stop offset="100%" stopColor={mid} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idPrefix}D`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={mid} stopOpacity="0" />
          <stop offset="50%" stopColor={dark} />
          <stop offset="100%" stopColor={mid} stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  );
};

export const LookStill: React.FC<{ variant: number }> = ({ variant }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: variant === 3 ? "#141210" : "#F1EDE4" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="lightband" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A96A" stopOpacity="0" />
            <stop offset="50%" stopColor="#D8B87E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C9A96A" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="softsun" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#D8B87E" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#D8B87E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D8B87E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="archShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DED5C2" />
            <stop offset="100%" stopColor="#AC9C7C" />
          </linearGradient>
          <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141210" stopOpacity="0.16" />
            <stop offset="30%" stopColor="#141210" stopOpacity="0" />
            <stop offset="72%" stopColor="#141210" stopOpacity="0" />
            <stop offset="100%" stopColor="#141210" stopOpacity="0.22" />
          </linearGradient>
          <filter id="fold" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.007 0.0018" numOctaves="2" seed="11" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="70" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="vein" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.011 0.0035" numOctaves="4" seed="11" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="150" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
          <filter id="softblur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="grain2">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.12  0 0 0 0 0.1  0 0 0 0 0.08  0 0 0 0.06 0" />
          </filter>
        </defs>

        {variant === 1 && (
          <g>
            <rect width={W} height={H} fill="#F1EDE4" />
            <Drape seed={4} light="#F6F1E6" mid="#DECFB1" dark="#A8916A" idPrefix="v1" />
            <rect x={W * 0.14} y={-100} width={110} height={H + 200} fill="url(#lightband)" transform={`rotate(8 ${W / 2} ${H / 2})`} />
            <rect width={W} height={H} fill="url(#vignette)" />
          </g>
        )}

        {variant === 2 && (
          <g>
            <rect width={W} height={H} fill="#EDE7DA" />
            <circle cx={W * 0.5} cy={H * 0.32} r={430} fill="url(#softsun)" />
            <path
              d={`M ${W * 0.18} ${H} L ${W * 0.18} ${H * 0.42} A ${W * 0.32} ${W * 0.32} 0 0 1 ${W * 0.82} ${H * 0.42} L ${W * 0.82} ${H} Z`}
              fill="url(#archShade)"
            />
            <path
              d={`M ${W * 0.27} ${H} L ${W * 0.27} ${H * 0.47} A ${W * 0.23} ${W * 0.23} 0 0 1 ${W * 0.73} ${H * 0.47} L ${W * 0.73} ${H} Z`}
              fill="#F6F2E9"
            />
            <path
              d={`M ${W * 0.27} ${H} L ${W * 0.27} ${H * 0.47} A ${W * 0.23} ${W * 0.23} 0 0 1 ${W * 0.5} ${H * 0.404} L ${W * 0.5} ${H} Z`}
              fill="#141210"
              opacity={0.08}
            />
            <ellipse cx={W * 0.62} cy={H * 0.88} rx={330} ry={64} fill="#141210" opacity={0.16} filter="url(#softblur)" />
            <rect x={W * 0.487} y={H * 0.5} width={9} height={H * 0.5} fill="#141210" opacity={0.3} />
            <rect width={W} height={H} fill="url(#vignette)" />
          </g>
        )}

        {variant === 3 && (
          <g>
            <rect width={W} height={H} fill="#141210" />
            <Drape seed={9} light="#4A4034" mid="#221E19" dark="#0B0907" idPrefix="v3" filterId="vein" />
            <rect x={W * 0.26} y={-100} width={230} height={H + 200} fill="url(#lightband)" opacity={0.5} filter="url(#softblur)" transform={`rotate(-12 ${W / 2} ${H / 2})`} />
            <line x1={W * 0.16} y1={H * 0.82} x2={W * 0.84} y2={H * 0.82} stroke="#C9A96A" strokeWidth={2} opacity={0.85} />
            <circle cx={W * 0.5} cy={H * 0.82} r={7} fill="#C9A96A" />
          </g>
        )}

        {variant === 4 && (
          <g>
            <rect width={W} height={H} fill="#E9E2D2" />
            <circle cx={W * 0.72} cy={H * 0.24} r={340} fill="url(#softsun)" />
            <g transform={`rotate(-8 ${W / 2} ${H / 2})`}>
              <g transform={`translate(0 ${H * 0.34}) scale(1 0.62)`}>
                <Drape seed={17} light="#F2EBDC" mid="#D6C6A6" dark="#9E8A64" idPrefix="v4" />
              </g>
            </g>
            <rect x={W * 0.1} y={H * 0.12} width={W * 0.36} height={12} fill="#141210" opacity={0.8} />
            <rect x={W * 0.1} y={H * 0.155} width={W * 0.2} height={8} fill="#9A7B4F" opacity={0.9} />
            <rect width={W} height={H} fill="url(#vignette)" />
          </g>
        )}

        <rect width={W} height={H} filter="url(#grain2)" />
      </svg>
    </AbsoluteFill>
  );
};
