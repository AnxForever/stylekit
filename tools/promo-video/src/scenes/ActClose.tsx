/**
 * Act IX - Close (5 bars, 10s).
 *
 * The film has been dark for three minutes. The strongest move left is to go to
 * paper: a hard cut to warm off-white, the four-square mark, one line, the domain.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, staticFile, Img } from "remotion";
import { fontMono, fontSerifCN } from "../components/fonts";
import { progress, sec } from "../components/motion";
import { FilmGrain } from "../components/cinematic";

const INK = "#0A0A0B";
const PAPER = "#F4F1EA";
const NEON = "#C6FF3D";

export const ActClose: React.FC = () => {
  const frame = useCurrentFrame();
  const a = progress(frame, sec(0.15), sec(0.5), "out");
  const b = progress(frame, sec(0.8), sec(0.5), "out");
  const mark = progress(frame, sec(1.6), sec(0.55), "back");
  const name = progress(frame, sec(1.9), sec(0.5), "out");
  const url = progress(frame, sec(2.3), sec(0.55), "out");
  const tag = progress(frame, sec(2.8), sec(0.5), "out");

  return (
    <AbsoluteFill style={{ background: PAPER, overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 70% at 50% 0%, #ffffff 0%, ${PAPER} 56%, #E7E2D6 100%)` }} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", opacity: 1 - progress(frame, sec(1.35), sec(0.3), "in") }}>
        <div style={{ fontFamily: fontSerifCN, fontSize: 76, fontWeight: 900, color: INK, opacity: a, transform: `translateY(${(1 - a) * 22}px)` }}>不是让你更快。</div>
        <div style={{ marginTop: 18, fontFamily: fontSerifCN, fontSize: 76, fontWeight: 900, color: INK, opacity: b, transform: `translateY(${(1 - b) * 22}px)`, paddingBottom: 8, borderBottom: `7px solid ${NEON}` }}>是让你不必重来。</div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Img src={staticFile("brand/stylekit-mark-v2.svg")} style={{ width: 118, opacity: mark, transform: `scale(${0.6 + mark * 0.4})`, filter: "invert(0)" }} />
        <div style={{ marginTop: 40, fontSize: 92, fontWeight: 800, letterSpacing: "0.06em", color: INK, opacity: name }}>STYLEKIT</div>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 18, opacity: url }}>
          <div style={{ width: 64, height: 1, background: INK, opacity: 0.28 }} />
          <div style={{ fontFamily: fontMono, fontSize: 30, letterSpacing: "0.1em", color: INK }}>www.stylekit.top</div>
          <div style={{ width: 64, height: 1, background: INK, opacity: 0.28 }} />
        </div>
        <div style={{ position: "absolute", bottom: 88, fontFamily: fontSerifCN, fontSize: 22, letterSpacing: "0.28em", color: "rgba(10,10,11,0.42)", opacity: tag }}>开源 · MIT · 148 套风格持续增加</div>
      </AbsoluteFill>
      <FilmGrain amount={0.07} seed={71} frame={frame} />
    </AbsoluteFill>
  );
};
