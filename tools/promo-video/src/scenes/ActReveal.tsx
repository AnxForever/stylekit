/**
 * Act IV - The reveal (6 bars, 12s).
 *
 * White flash, then every real accent colour in the catalogue detonates outward,
 * the camera punches in, and the name arrives with the number that gives it
 * meaning. The explosion is literally a portrait of the library palette.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fontMono, fontSerifCN } from "../components/fonts";
import { progress, sec, rand } from "../components/motion";
import { FilmGrain } from "../components/cinematic";
import { ALL_STYLES, TOTAL_STYLES } from "../catalog";

const NEON = "#C6FF3D";

export const ActReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const punch = progress(frame, 0, sec(0.34), "out");
  const settle = progress(frame, sec(0.34), sec(2.4), "out");
  const cam = 2.4 - punch * 1.1 - settle * 0.32;
  const nameIn = progress(frame, sec(1.0), sec(0.5), "out");
  const numIn = progress(frame, sec(1.5), sec(0.9), "out");
  const tagIn = progress(frame, sec(2.6), sec(0.7), "out");
  // 3 frames at full, then a hard 8-frame falloff: an impact, not a dissolve.
  const t = frame;
  const flash = t < 3 ? 1 : Math.max(0, 1 - (t - 3) / 8) ** 1.4;
  const count = Math.round(TOTAL_STYLES * progress(frame, sec(1.5), sec(1.0), "out"));

  return (
    <AbsoluteFill style={{ background: "#08080A", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${cam})` }}>
        <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, #2a1c55 0%, #0d0b16 46%, #050508 100%)" }} />
        {ALL_STYLES.map((s, i) => {
          const angle = rand(i * 1.7) * Math.PI * 2;
          const dist = 200 + rand(i * 3.3 + 1) * 880;
          // Drift continues for most of the act so the hold never goes static.
          const spread = progress(frame, 0, sec(9.0), "out");
          const r = 6 + rand(i * 5.1) * 24;
          const fade = progress(frame, sec(7.5), sec(4.0), "in");
          const palette = [s.accent[0], s.accent[1] || s.accent[0], s.primary, s.secondary];
          return (
            <div key={s.slug} style={{
              position: "absolute",
              left: 960 + Math.cos(angle) * dist * spread - r / 2,
              top: 540 + Math.sin(angle) * dist * spread * 0.62 - r / 2,
              width: r, height: r, borderRadius: r * 0.24,
              background: palette[i % 4],
              opacity: (1 - fade) * (0.45 + rand(i) * 0.55),
              transform: `rotate(${angle * 40 + frame * 0.6}deg)`,
              boxShadow: `0 0 ${r}px ${s.accent[0]}55`,
            }} />
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontFamily: fontMono, fontSize: 18, letterSpacing: "0.5em", color: "rgba(244,241,234,0.5)", opacity: nameIn, paddingLeft: "0.5em" }}>INTRODUCING</div>
        <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: "0.02em", color: "#F4F1EA", opacity: nameIn, transform: `scale(${0.88 + nameIn * 0.12})`, filter: `blur(${(1 - nameIn) * 16}px)`, marginTop: 18 }}>STYLEKIT</div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 26, opacity: numIn }}>
          <div style={{ width: 110, height: 1, background: "rgba(255,255,255,0.3)" }} />
          <div style={{ fontFamily: fontMono, fontSize: 64, fontWeight: 600, color: NEON, fontVariantNumeric: "tabular-nums" }}>{String(count).padStart(3, "0")}</div>
          <div style={{ width: 110, height: 1, background: "rgba(255,255,255,0.3)" }} />
        </div>
        <div style={{ marginTop: 26, fontFamily: fontSerifCN, fontSize: 34, letterSpacing: "0.3em", color: "rgba(244,241,234,0.66)", opacity: tagIn, paddingLeft: "0.3em" }}>套精选风格</div>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: "#F2FFF6", opacity: flash * 0.9, pointerEvents: "none" }} />
      <FilmGrain amount={0.18} seed={21} frame={frame} />
    </AbsoluteFill>
  );
};
