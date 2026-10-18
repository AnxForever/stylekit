/**
 * Act VIII - Features (12 bars, 24s).
 *
 * Four capabilities shown as their real pages moving under the camera: the
 * template gallery, the animation library, the kit builder and the export
 * surface. One idea per shot, so the act reads as a tour and not a list.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, Sequence } from "remotion";
import { PageStage } from "../components/PageStage";
import { FilmGrain } from "../components/cinematic";
import { fontMono, fontSerifCN, fontSansCN } from "../components/fonts";
import { progress, sec } from "../components/motion";
import { splitBars } from "../acts";
import TemplatesPage from "../../../../app/templates/page";
import AnimationsPage from "../../../../app/animations/page";
import PatternsPage from "../../../../app/component-patterns/page";

const NEON = "#C6FF3D";

const Plated: React.FC<{ kicker: string; title: string; at: number }> = ({ kicker, title, at }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, sec(0.5), "out");
  return (
    <div style={{ position: "absolute", left: 56, top: 56, opacity: p, background: "rgba(6,6,9,0.8)", borderLeft: `3px solid ${NEON}`, padding: "14px 22px 14px 18px", transform: `translateY(${(1 - p) * -10}px)` }}>
      <div style={{ fontFamily: fontMono, fontSize: 13, letterSpacing: "0.4em", color: "rgba(255,255,255,0.4)" }}>{kicker}</div>
      <div style={{ fontFamily: fontSerifCN, fontSize: 40, fontWeight: 900, color: "#F4F1EA", marginTop: 8 }}>{title}</div>
    </div>
  );
};

const PageShot: React.FC<{ Page: React.ComponentType; kicker: string; title: string; from: number; to: number; scale?: number }> = ({ Page, kicker, title, from, to, scale = 1.3 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 44%" }}>
        <PageStage Page={Page} startScroll={from} endScroll={to} />
      </AbsoluteFill>
      <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse 72% 64% at 50% 46%, transparent 52%, rgba(4,4,6,0.66) 100%)" }} />
      <Plated kicker={kicker} title={title} at={sec(0.15)} />
      <FilmGrain amount={0.05} seed={61} frame={frame} />
    </AbsoluteFill>
  );
};

/**
 * Export shot: the four formats the product ships, stated as a list because
 * this is a capability, not a page - and the numbers are the product's own.
 */
const EXPORTS = [
  ["Tailwind preset", "tailwind.config.js 直接丢掉"],
  ["shadcn theme", "一条命令进 globals.css"],
  ["CSS variables", "不依赖框架，哪都能用"],
  ["Figma tokens", "设计稿和代码用同一份值"],
  [".cursorrules", "让编辑器也懂这套风格"],
  ["claude-rules", "同一个约束，换个工具"],
];

const ExportShot: React.FC = () => {
  const frame = useCurrentFrame();
  const head = progress(frame, sec(0.1), sec(0.55), "out");
  return (
    <AbsoluteFill style={{ background: "#08080A", justifyContent: "center", paddingLeft: 140, paddingRight: 140 }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 50% at 18% 80%, #C6FF3D12 0%, transparent 62%)" }} />
      <div style={{ fontFamily: fontMono, fontSize: 15, letterSpacing: "0.42em", color: "rgba(255,255,255,0.36)", opacity: head }}>07 / EXPORTS</div>
      <div style={{ fontFamily: fontSerifCN, fontSize: 66, fontWeight: 900, color: "#F4F1EA", margin: "18px 0 44px", opacity: head }}>选定的风格，带走就行。</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {EXPORTS.map(([k, v], i) => {
          const p = progress(frame, sec(0.6) + i * 9, sec(0.45), "out");
          return (
            <div key={k} style={{ padding: "22px 26px", borderRadius: 10, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", opacity: p, transform: `translateY(${(1 - p) * 22}px)` }}>
              <div style={{ fontFamily: fontMono, fontSize: 22, color: NEON }}>{k}</div>
              <div style={{ fontFamily: fontSansCN, fontSize: 17, color: "rgba(244,241,234,0.5)", marginTop: 8 }}>{v}</div>
            </div>
          );
        })}
      </div>
      <FilmGrain amount={0.14} seed={63} frame={frame} />
    </AbsoluteFill>
  );
};

// 12 bars: 3.5 templates, 3.5 motion, 2 kit, 3 exports.
const [S_TEMPLATES, S_MOTION, S_KIT, S_EXPORTS] = splitBars("features", [3.5, 7, 9]);

export const ActFeatures: React.FC = () => (
  <AbsoluteFill style={{ background: "#08080A" }}>
    <Sequence durationInFrames={S_TEMPLATES} name="feat-templates">
      <PageShot Page={TemplatesPage} kicker="05 / TEMPLATES" title="36 个页面模板" from={0} to={760} />
    </Sequence>
    <Sequence from={S_TEMPLATES} durationInFrames={S_MOTION} name="feat-motion">
      <PageShot Page={AnimationsPage} kicker="06 / MOTION" title="60 个动效，一键复制" from={0} to={560} scale={1.3} />
    </Sequence>
    <Sequence from={S_TEMPLATES + S_MOTION} durationInFrames={S_KIT} name="feat-collections">
      <PageShot Page={PatternsPage} kicker="PATTERNS" title="组件配方，直接拿去用" from={0} to={520} scale={1.26} />
    </Sequence>
    <Sequence from={S_TEMPLATES + S_MOTION + S_KIT} durationInFrames={S_EXPORTS} name="feat-exports">
      <ExportShot />
    </Sequence>
  </AbsoluteFill>
);
