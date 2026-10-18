/**
 * The style montage.
 *
 * Six featured pages, each shot differently: a real showcase component moving
 * through its own scroll, under a treatment that changes camera, colour and
 * grain so no two shots look alike. The page is always the real component;
 * only the camera and the lens in front of it change.
 *
 * Timing is bar-locked: one style per musical phrase, so the montage cuts on
 * the grid the score is written to.
 */
import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ShowcaseStage } from "../components/ShowcaseStage";
import { TreatmentFX } from "../components/cinematic";
import { TREATMENTS } from "../treatments";
import { fontSansCN, fontMono, fontSerifCN } from "../components/fonts";
import { progress, sec } from "../components/motion";
import { actLen } from "../acts";

// Shot length is derived from the act's length so the montage always exactly
// fills its slot in the film. 30 bars / 6 styles = 5 bars = 10s per style.
const SHOT = Math.round(actLen("styles") / TREATMENTS.length);

// The page is authored at 1440x900 while the stage is 1920x1080. Scale so the
// page covers the frame (1920/1440 = 1.3333) plus a little over-scan so the
// camera tilt never exposes an edge.
const PAGE_SCALE = 1.36;

/**
 * One style shot.
 *
 * The page is scaled so its 1440px design width fills the 1920 frame. The page
 * itself only scrolls, slowly and linearly; every bit of drama comes from the
 * camera (zoom, tilt, sweep) so the motion never fights the material.
 */
const StyleShot: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const t = TREATMENTS[index];
  const p = progress(frame, 0, SHOT, "inOut");
  const zoom = t.zoom[0] + (t.zoom[1] - t.zoom[0]) * p;
  const tilt = t.tilt[0] + (t.tilt[1] - t.tilt[0]) * p;

  const headIn = progress(frame, sec(0.2), sec(0.55), "out");
  const capIn = progress(frame, sec(0.7), sec(0.55), "out");
  const out = progress(frame, SHOT - sec(0.5), sec(0.5), "in");

  return (
    <AbsoluteFill style={{ background: "#08080A", overflow: "hidden" }}>
      {/* The page: 1440 design width scaled to cover the 1920 frame. */}
      {/* 1440 page -> 1920 frame is 1.3333; +6% over-scan so camera tilt never
          reveals an edge. */}
      <AbsoluteFill style={{ transform: `scale(${PAGE_SCALE}) rotate(${tilt}deg)`, transformOrigin: "50% 50%" }}>
        <ShowcaseStage slug={t.slug as never} startScroll={t.scroll[0]} endScroll={t.scroll[1]} zoom={[zoom, zoom]} />
      </AbsoluteFill>

      <TreatmentFX treatment={t} frame={frame} duration={SHOT} />

      {/* A vignette keeps the eye on the page and hides the rotate edges. */}
      <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse 76% 68% at 50% 48%, transparent 52%, rgba(4,4,6,0.78) 100%)" }} />

      {/* Title block: placed per page by the treatment, in the margin that page
          leaves clear. */}
      <div
        style={{
          position: "absolute",
          ...(t.plate === "top-left" ? { left: 56, top: 56 } : {}),
          ...(t.plate === "top-right" ? { right: 56, top: 56 } : {}),
          ...(t.plate === "bottom-left" ? { left: 56, bottom: 96 } : {}),
          ...(t.plate === "bottom-right" ? { right: 56, bottom: 96 } : {}),
          opacity: headIn,
          transform: `translateY(${(1 - headIn) * (t.plate.startsWith("top") ? -12 : 12)}px)`,
          background: "rgba(6,6,9,0.82)",
          padding: "14px 22px 14px 18px",
          borderLeft: "3px solid rgba(198,255,61,0.9)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontFamily: fontMono, fontSize: 15, letterSpacing: "0.42em", color: "rgba(255,255,255,0.42)" }}>
          {String(index + 1).padStart(2, "0")} / 06
        </div>
        <div style={{ fontFamily: fontSerifCN, fontSize: 46, fontWeight: 900, color: "#F4F1EA", marginTop: 10, letterSpacing: "0.03em" }}>
          {t.label}
        </div>
        <div style={{ fontFamily: fontMono, fontSize: 13, letterSpacing: "0.32em", color: "rgba(255,255,255,0.34)", marginTop: 7 }}>
          {t.latin}
        </div>
      </div>
      {/* Caption in the lower-left margin, on a dark plate so it never collides. */}
      <div
        style={{
          position: "absolute",
          right: 56,
          bottom: 56,
          opacity: capIn,
          transform: `translateY(${(1 - capIn) * 14}px)`,
          background: "rgba(6,6,9,0.62)",
          borderLeft: "2px solid rgba(198,255,61,0.75)",
          padding: "12px 20px 12px 16px",
        }}
      >
        <div style={{ fontFamily: fontSansCN, fontSize: 23, color: "rgba(255,255,255,0.82)", letterSpacing: "0.05em" }}>
          {t.fx.caption}
        </div>
      </div>

      <AbsoluteFill style={{ background: "#000", opacity: out, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

export const StyleMontage: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {TREATMENTS.map((t, i) => (
      <Sequence key={t.slug} from={i * SHOT} durationInFrames={SHOT} premountFor={90} name={`style-${t.slug}`}>
        <StyleShot index={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const STYLE_MONTAGE_FRAMES = SHOT * TREATMENTS.length;