/**
 * Act II - The problem (8 bars, 16s).
 *
 * The film shows the failure honestly: the same generic landing page, repeated.
 * Rather than build a fake one, we take a REAL page from the catalogue that
 * represents the "corporate clean" default and tile it - the point lands
 * because the tiles are genuine product output.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShowcaseStage } from "../components/ShowcaseStage";
import { FilmGrain, Scanlines } from "../components/cinematic";
import { fontSerifCN, fontMono } from "../components/fonts";
import { progress, sec, rand } from "../components/motion";

const ALERT = "#FF2E63";

/** One tile: a real page, cropped, jittering as the message lands. */
const Tile: React.FC<{ i: number; frame: number }> = ({ i, frame }) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const delay = sec(0.5) + i * 6;
  const p = progress(frame, delay, sec(0.45), "out");
  const j = progress(frame, sec(2), sec(9), "in");
  const jx = Math.floor(rand(Math.floor(frame / 4) + i) * 3 - 1) * j * 4;

  return (
    <div
      style={{
        position: "absolute",
        left: col * 640,
        top: row * 400,
        width: 620,
        height: 380,
        overflow: "hidden",
        opacity: p * 0.92,
        transform: `translate(${jx}px, ${(1 - p) * 30}px) scale(${0.94 + p * 0.06})`,
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.08)",
        filter: "saturate(0.5) brightness(0.8)",
      }}
    >
      <div style={{ width: 1440, height: 900, transform: "scale(0.43)", transformOrigin: "0 0" }}>
        <ShowcaseStage slug="corporate-clean" startScroll={0} endScroll={0} />
      </div>
    </div>
  );
};

export const ActSlop: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = progress(frame, sec(6.2), sec(0.7), "out");
  const line2 = progress(frame, sec(8.4), sec(0.7), "out");
  const line3 = progress(frame, sec(11.0), sec(0.8), "out");
  const alertIn = progress(frame, sec(10.4), sec(0.6), "out");
  const camScale = 1.06 - progress(frame, 0, sec(16), "in") * 0.04;

  return (
    <AbsoluteFill style={{ background: "#07070A", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${camScale * 1.06}) translateY(60px)`, transformOrigin: "50% 45%" }}>
        {Array.from({ length: 6 }, (_, i) => (
          <Tile key={i} i={i} frame={frame} />
        ))}
      </AbsoluteFill>
      <Scanlines frame={frame} opacity={0.1} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(5,5,8,0.82) 0%, rgba(5,5,8,0.35) 40%, rgba(5,5,8,0.88) 100%)" }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontFamily: fontSerifCN, fontSize: 84, fontWeight: 900, color: "#F4F1EA", letterSpacing: "-0.01em", opacity: line1, transform: `translateY(${(1 - line1) * 20}px)`, textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>
          都能跑。
        </div>
        <div style={{ marginTop: 22, fontFamily: fontSerifCN, fontSize: 84, fontWeight: 900, color: ALERT, letterSpacing: "-0.01em", opacity: line2, transform: `translateY(${(1 - line2) * 20}px)`, textShadow: "0 4px 40px rgba(0,0,0,0.9)" }}>
          全都一样。
        </div>
        <div style={{ marginTop: 40, fontFamily: fontMono, fontSize: 19, letterSpacing: "0.36em", color: "rgba(255,255,255,0.42)", opacity: line3 }}>
          6 PAGES · 6 PROMPTS · 1 RESULT
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ border: `2px solid ${ALERT}`, opacity: alertIn * 0.45, pointerEvents: "none" }} />
      <FilmGrain amount={0.22} seed={9} frame={frame} />
    </AbsoluteFill>
  );
};