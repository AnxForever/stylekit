/**
 * Act III - The turn (7 bars, 14s).
 *
 * A black room and one sentence. The argument of the whole film is stated here,
 * so the camera does not move and nothing decorates the type.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { fontSerifCN, fontSansCN, fontMono } from "../components/fonts";
import { progress, sec } from "../components/motion";
import { FilmGrain } from "../components/cinematic";

const NEON = "#C6FF3D";
const ALERT = "#FF2E63";

const Word: React.FC<{ text: string; at: number; frame: number; color?: string; size: number }> = ({
  text, at, frame, color = "#F4F1EA", size,
}) => {
  const p = progress(frame, at, sec(0.4), "out");
  return (
    <span style={{ display: "inline-block", opacity: p, color, fontSize: size, fontWeight: 900, letterSpacing: "0.01em", transform: `translateY(${(1 - p) * 18}px)`, filter: `blur(${(1 - p) * 8}px)` }}>
      {text}
    </span>
  );
};

export const ActTurn: React.FC = () => {
  const frame = useCurrentFrame();
  const t1 = sec(1.0);
  const t2 = sec(4.6);
  const underline = progress(frame, sec(7.4), sec(0.6), "inOut");
  const traceIn = progress(frame, sec(8.2), sec(0.6), "out");

  return (
    <AbsoluteFill style={{ background: "#000", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "baseline", fontFamily: fontSerifCN }}>
        <Word frame={frame} at={t1} text="问题" size={86} />
        <Word frame={frame} at={t1 + 6} text="不在" size={86} />
        <Word frame={frame} at={t1 + 12} text="模型" size={86} color={NEON} />
        <Word frame={frame} at={t1 + 18} text="。" size={86} />
      </div>

      <div style={{ marginTop: 54, display: "flex", gap: 18, alignItems: "baseline", fontFamily: fontSansCN }}>
        <Word frame={frame} at={t2} text="「做得好看点」" size={52} />
        <span style={{ fontSize: 52, color: "rgba(255,255,255,0.3)", opacity: progress(frame, t2 + 10, sec(0.3), "out") }}>——</span>
        <span style={{ position: "relative", display: "inline-block" }}>
          <Word frame={frame} at={t2 + 16} text="不是一句规格" size={52} color={ALERT} />
          <span style={{ position: "absolute", left: 0, right: 0, bottom: -8, height: 3, background: ALERT, transform: `scaleX(${underline})`, transformOrigin: "left center" }} />
        </span>
      </div>

      <div style={{ position: "absolute", left: 120, bottom: 110, fontFamily: fontMono, fontSize: 17, lineHeight: 2, color: "rgba(255,255,255,0.26)" }}>
        {["  prompt : 做一个好看的落地页", "  tokens : (none)", "  rules  : (none)", "  output : 与上一千次相同"].map((l, i) => (
          <div key={l} style={{ opacity: progress(frame, traceIn + i * 7, sec(0.4), "out") }}>{l}</div>
        ))}
      </div>
      <FilmGrain amount={0.26} seed={13} frame={frame} />
    </AbsoluteFill>
  );
};
