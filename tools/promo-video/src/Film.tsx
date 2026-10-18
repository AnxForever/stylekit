/**
 * The film.
 *
 * Acts are placed on the bar grid from timeline2. Everything the viewer sees is
 * either a real StyleKit page (ShowcaseStage / PageStage) or a typographic
 * transition built from the product's own numbers. No screenshots, no redrawn
 * mockups.
 */
import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { ACTS, actRange } from "./timeline2";
import { StyleMontage } from "./scenes/StyleMontage";
import { ActOpen } from "./scenes/ActOpen";
import { ActSlop } from "./scenes/ActSlop";
import { ActTurn } from "./scenes/ActTurn";
import { ActReveal } from "./scenes/ActReveal";
import { ActPrompts } from "./scenes/ActPrompts";
import { ActAccess } from "./scenes/ActAccess";
import { ActFeatures } from "./scenes/ActFeatures";
import { ActClose } from "./scenes/ActClose";

const SCENES: Record<string, React.FC> = {
  open: ActOpen,
  slop: ActSlop,
  turn: ActTurn,
  reveal: ActReveal,
  styles: StyleMontage,
  prompts: ActPrompts,
  access: ActAccess,
  features: ActFeatures,
  close: ActClose,
};

/**
 * The cut. Each act keeps a hard boundary: overlapping sequence starts would
 * change the total frame count, and this film's length and its music are both
 * derived from one grid.
 */
export const StyleKitFilm: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {ACTS.map((a) => {
      const Scene = SCENES[a.id];
      const range = actRange(a.id);
      if (!Scene) return null;
      return (
        <Sequence key={a.id} name={a.id} from={range.from} durationInFrames={range.durationInFrames} premountFor={60}>
          <Scene />
        </Sequence>
      );
    })}
    <Audio src={staticFile("audio/score.wav")} />
  </AbsoluteFill>
);
