/**
 * Renders one of the app's real pages inside the film.
 *
 * Same idea as ShowcaseStage, but for the product's own screens: the prompts
 * library, the developer page, the template gallery. The page is mounted as-is
 * (with the app's provider stack) and the camera scrolls it.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import css from "../generated/showcase-css";
import { AppProviders } from "./AppProviders";
import { progress } from "./motion";

export type PageStageProps = {
  Page: React.ComponentType;
  startScroll: number;
  endScroll: number;
  zoom?: [number, number];
  /** Page width; the app is authored at 1440. */
  width?: number;
};

export const PageStage: React.FC<PageStageProps> = ({ Page, startScroll, endScroll, zoom = [1, 1], width = 1440 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = progress(frame, 0, Math.max(1, durationInFrames - 1), "inOut");
  const y = startScroll + (endScroll - startScroll) * p;
  const z = zoom[0] + (zoom[1] - zoom[0]) * p;

  // Fix absolute asset paths exactly as ShowcaseStage does, without touching app
  // code: Remotion serves the public folder under /public.
  React.useEffect(() => {
    const fix = () => {
      const root = document.getElementById("sk-page-root");
      if (!root) return;
      root.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
        const s = img.getAttribute("src") ?? "";
        if (s.startsWith("/") && !s.startsWith("/public/")) img.src = "/public" + s;
      });
    };
    fix();
    const t2 = setTimeout(fix, 350);
    const t3 = setTimeout(fix, 1400);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width,
          marginLeft: -width / 2,
          transform: `translateY(${-y}px) scale(${z})`,
          transformOrigin: "50% 0%",
        }}
      >
        <div id="sk-page-root" style={{ width }}>
          <AppProviders>
            <Page />
          </AppProviders>
        </div>
      </div>
    </AbsoluteFill>
  );
};
