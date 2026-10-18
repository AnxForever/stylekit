import React from "react";
import { Composition } from "remotion";
import { StyleKitFilm } from "./Film";
import { FPS, TOTAL_FRAMES } from "./timeline2";
import "./components/fonts";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="StyleKitPromo"
    component={StyleKitFilm}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
