/**
 * Act VII - Access (12 bars, 24s).
 *
 * Three ways in, each typed at reading speed, then the real developer page under
 * the camera to prove these are genuine commands from the genuine product. The
 * MCP line gets the longest hold: it is the least familiar and the most useful.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, Sequence } from "remotion";
import { PageStage } from "../components/PageStage";
import { FilmGrain } from "../components/cinematic";
import { fontMono, fontSansCN, fontSerifCN } from "../components/fonts";
import { progress, sec } from "../components/motion";
import { splitBars } from "../acts";
import DevelopersPage from "../../../../app/developers/page";

const NEON = "#C6FF3D";
const CYAN = "#22D3EE";
const GLYPH = 0.045; // seconds per character

const Typed: React.FC<{ text: string; at: number; frame: number }> = ({ text, at, frame }) => {
  const chars = Array.from(text);
  const shown = Math.max(0, Math.min(chars.length, Math.floor((frame - at) / 60 / GLYPH)));
  const caret = Math.floor(frame / 16) % 2 === 0;
  return (
    <div style={{ fontFamily: fontMono, fontSize: 27, color: "#F4F1EA", whiteSpace: "pre" }}>
      {chars.slice(0, shown).join("")}
      {shown < chars.length || caret ? <span style={{ display: "inline-block", width: 12, height: 27, background: NEON, verticalAlign: "-4px", marginLeft: 2 }} /> : null}
    </div>
  );
};

const Row: React.FC<{ i: number; title: string; note: string; cmd: string; at: number }> = ({ i, title, note, cmd, at }) => {
  const frame = useCurrentFrame();
  const p = progress(frame, at, sec(0.45), "out");
  const done = progress(frame, at + sec(1.0), sec(0.4), "out");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "66px 300px 1fr", alignItems: "center", gap: 26, padding: "26px 30px", borderRadius: 10, background: "rgba(255,255,255,0.035)", border: `1px solid rgba(255,255,255,${0.06 + done * 0.12})`, opacity: p, transform: `translateY(${(1 - p) * 26}px)`, marginBottom: 20 }}>
      <div style={{ fontFamily: fontMono, fontSize: 14, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em" }}>0{i + 1}</div>
      <div>
        <div style={{ fontFamily: fontSerifCN, fontSize: 28, fontWeight: 700, color: "#F4F1EA" }}>{title}</div>
        <div style={{ fontFamily: fontSansCN, fontSize: 16, color: "rgba(244,241,234,0.42)", marginTop: 6 }}>{note}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: fontMono, fontSize: 27, color: NEON }}>$</span>
        <Typed text={cmd} at={at + sec(0.3)} frame={frame} />
      </div>
    </div>
  );
};

const CommandsShot: React.FC = () => {
  const frame = useCurrentFrame();
  const head = progress(frame, sec(0.1), sec(0.5), "out");
  return (
    <AbsoluteFill style={{ background: "#08080A", justifyContent: "center", paddingLeft: 120, paddingRight: 120 }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 50% at 82% 14%, ${CYAN}14 0%, transparent 62%)` }} />
      <div style={{ fontFamily: fontMono, fontSize: 15, letterSpacing: "0.42em", color: "rgba(255,255,255,0.36)", opacity: head }}>04 / THREE WAYS IN</div>
      <div style={{ fontFamily: fontSerifCN, fontSize: 64, fontWeight: 900, color: "#F4F1EA", margin: "18px 0 44px", opacity: head }}>不管你用什么工具，接得住。</div>
      <Row i={0} at={sec(0.6)} title="shadcn 项目" note="一条命令，把亮色与暗色的 CSS 变量写进 globals.css" cmd="npx shadcn add https://stylekit.top/r/glassmorphism.json" />
      <Row i={1} at={sec(2.0)} title="编码代理" note="Claude Code / Cursor / Windsurf 按需套用全部风格" cmd="npx skills@latest add AnxForever/stylekit-skill" />
      <Row i={2} at={sec(3.4)} title="MCP 客户端" note="风格检索、设计令牌、组件配方，外加一个风格合规检查器" cmd="npx -y --prefer-online stylekit-mcp@latest" />
      <FilmGrain amount={0.16} seed={51} frame={frame} />
    </AbsoluteFill>
  );
};

const DevPageShot: React.FC = () => {
  const frame = useCurrentFrame();
  const head = progress(frame, sec(0.2), sec(0.5), "out");
  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: "scale(1.3)", transformOrigin: "50% 42%" }}>
        <PageStage Page={DevelopersPage} startScroll={300} endScroll={1100} />
      </AbsoluteFill>
      <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse 70% 62% at 50% 46%, transparent 50%, rgba(4,4,6,0.7) 100%)" }} />
      <div style={{ position: "absolute", left: 56, top: 56, opacity: head, background: "rgba(6,6,9,0.78)", borderLeft: `3px solid ${CYAN}`, padding: "14px 22px 14px 18px" }}>
        <div style={{ fontFamily: fontMono, fontSize: 13, letterSpacing: "0.4em", color: "rgba(255,255,255,0.4)" }}>MCP · DESIGN TOKENS · LINT</div>
        <div style={{ fontFamily: fontSerifCN, fontSize: 40, fontWeight: 900, color: "#F4F1EA", marginTop: 8 }}>接进你的工作流</div>
      </div>
      <FilmGrain amount={0.05} seed={53} frame={frame} />
    </AbsoluteFill>
  );
};

// 12 bars: 7 of commands, 5 of the developer page. Derived, never hardcoded.
const [SHOT_CMD, SHOT_DEV] = splitBars("access", [7]);

export const ActAccess: React.FC = () => (
  <AbsoluteFill style={{ background: "#08080A" }}>
    <Sequence durationInFrames={SHOT_CMD} name="access-commands">
      <CommandsShot />
    </Sequence>
    <Sequence from={SHOT_CMD} durationInFrames={SHOT_DEV} name="access-devpage">
      <DevPageShot />
    </Sequence>
  </AbsoluteFill>
);
