/**
 * Act I - Opening (4 bars, 8s).
 *
 * Near-black. The four-square mark from the brand draws itself in, one square
 * per beat, then the question the film answers. Deliberately the quietest shot
 * in the film: everything after it needs somewhere to grow from.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, staticFile, Img } from "remotion";
import { fontMono, fontSerifCN, fontSansCN } from "../components/fonts";
import { progress, sec } from "../components/motion";
import { FilmGrain } from "../components/cinematic";

const INK = "#08080A";
const PAPER = "#F4F1EA";
const NEON = "#C6FF3D";

export const ActOpen: React.FC = () => {
  const frame = useCurrentFrame();

  // The mark: four squares, one per beat.
  const squares = [0, 1, 2, 3].map((i) => progress(frame, sec(0.5) + i * 30, sec(0.55), "out"));
  const wordIn = progress(frame, sec(3.2), sec(0.7), "out");
  const lineIn = progress(frame, sec(4.4), sec(0.8), "out");
  const subIn = progress(frame, sec(5.6), sec(0.8), "out");

  // Camera: an almost imperceptible push. The film is barely awake here.
  const push = 1 + progress(frame, 0, sec(8), "inOut") * 0.04;

  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `scale(${push})` }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto auto", gap: 16 }}>
        {squares.map((p, i) => (
          <div
            key={i}
            style={{
              width: 74,
              height: 74,
              borderRadius: 16,
              background: i === 3 ? NEON : PAPER,
              opacity: p,
              transform: `scale(${0.6 + p * 0.4})`,
              boxShadow: i === 3 ? `0 0 42px ${NEON}66` : "none",
            }}
          />
        ))}
        </div>

        <div
          style={{
            marginTop: 54,
            fontFamily: fontMono,
            fontSize: 20,
            letterSpacing: "0.52em",
            color: PAPER,
            opacity: wordIn,
            paddingLeft: "0.52em",
            transform: `translateY(${(1 - wordIn) * 12}px)`,
          }}
        >
          STYLEKIT
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 420 }}>
        <div style={{ width: 220, height: 1, background: "rgba(255,255,255,0.18)", transform: `scaleX(${lineIn})` }} />
        <div
          style={{
            marginTop: 34,
            fontFamily: fontSerifCN,
            fontSize: 46,
            fontWeight: 700,
            color: "rgba(244,241,234,0.9)",
            letterSpacing: "0.06em",
            opacity: subIn,
            transform: `translateY(${(1 - subIn) * 14}px)`,
          }}
        >
          面向 AI 生成网页的视觉风格库
        </div>
      </AbsoluteFill>

      <FilmGrain amount={0.16} seed={3} frame={frame} />
    </AbsoluteFill>
  );
};

void Img;
void staticFile;
void fontSansCN;
