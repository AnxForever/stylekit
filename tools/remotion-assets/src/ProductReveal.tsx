import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const W = 1280;
const H = 720;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 95;

  // Act 1 (0 - 0.35): device rises from below and fades in
  const rise = interpolate(t, [0, 0.32], [180, 0], clamp);
  const appear = interpolate(t, [0, 0.22], [0, 1], clamp);

  // Act 2 (0.3 - 0.68): pseudo-3D turn via horizontal squeeze, specular sweep
  const turn = interpolate(t, [0.3, 0.68], [0, 1], clamp);
  const squeeze = 1 - 0.22 * Math.sin(turn * Math.PI);
  const skew = 6 * Math.sin(turn * Math.PI);
  const sweepX = interpolate(t, [0.34, 0.62], [-360, 360], clamp);

  // Act 3 (0.68 - 1): accent ring ignites, glow blooms, chips orbit in
  const ignite = interpolate(t, [0.68, 0.86], [0, 1], clamp);
  const chips = interpolate(t, [0.78, 0.98], [0, 1], clamp);
  const floorGlow = interpolate(t, [0.1, 0.4], [0.25, 0.55], clamp) + ignite * 0.25;

  const cx = W / 2;
  const cy = H / 2 + 14;
  const devW = 300;
  const devH = 480;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <radialGradient id="floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1B2735" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0B111A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3A3F47" />
            <stop offset="45%" stopColor="#14161A" />
            <stop offset="100%" stopColor="#26292F" />
          </linearGradient>
          <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E1B2E" />
            <stop offset="100%" stopColor="#050910" />
          </linearGradient>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="blueBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2997FF" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#2997FF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#2997FF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="devClip">
            <rect x={-devW / 2} y={-devH / 2} width={devW} height={devH} rx={46} />
          </clipPath>
        </defs>

        <ellipse cx={cx} cy={H - 70} rx={520} ry={130} fill="url(#floor)" opacity={floorGlow} />

        <circle cx={cx} cy={cy} r={330} fill="url(#blueBloom)" opacity={ignite} />

        <g
          transform={`translate(${cx} ${cy + rise}) skewY(${skew * 0.4}) scale(${squeeze} 1)`}
          opacity={appear}
        >
          <rect
            x={-devW / 2}
            y={-devH / 2}
            width={devW}
            height={devH}
            rx={46}
            fill="url(#body)"
            stroke="#4A4F58"
            strokeWidth={2}
          />
          <rect
            x={-devW / 2 + 14}
            y={-devH / 2 + 14}
            width={devW - 28}
            height={devH - 28}
            rx={34}
            fill="url(#screen)"
          />
          <g clipPath="url(#devClip)">
            <rect x={sweepX - 130} y={-devH / 2} width={260} height={devH} fill="url(#sweep)" transform={`rotate(18)`} />
          </g>
          <circle cx={0} cy={devH / 2 - 52} r={13} fill="#0A0D12" stroke="#2997FF" strokeWidth={2.5} strokeOpacity={ignite} />
          <rect
            x={-devW / 2}
            y={-devH / 2}
            width={devW}
            height={devH}
            rx={46}
            fill="none"
            stroke="#2997FF"
            strokeWidth={3}
            strokeOpacity={ignite * 0.9}
          />
        </g>

        {[0, 1, 2].map((i) => {
          const ang = -Math.PI / 2 + (i - 1) * 0.9;
          const dist = 330 + 40 * (1 - chips);
          const px = cx + Math.cos(ang) * dist * 1.5;
          const py = cy + Math.sin(ang) * dist * 0.95;
          return (
            <g key={i} opacity={chips} transform={`translate(${px} ${py})`}>
              <rect x={-74} y={-26} width={148} height={52} rx={12} fill="#0C0F14" stroke="#2A2F38" strokeWidth={1.5} />
              <rect x={-58} y={-8} width={i === 1 ? 96 : 72} height={7} rx={3.5} fill="#E8EAED" opacity={0.9} />
              <rect x={-58} y={4} width={44} height={5} rx={2.5} fill="#2997FF" opacity={0.9} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
