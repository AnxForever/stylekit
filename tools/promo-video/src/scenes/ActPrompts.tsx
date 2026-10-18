/**
 * Act VI - Prompts (14 bars, 28s). The core of the product, so it gets three shots.
 *
 *   1. the real library page, scrolling (proof of the breadth)
 *   2. what a style contains - four layers, dealt as cards
 *   3. the real generated prompt scrolling, character-exact, from buildHardPrompt()
 *
 * Shot 3 is the one that matters: the text on screen is the string the product
 * itself emits for 赛博朋克霓虹, not a mock-up written for the film.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, Sequence } from "remotion";
import { PageStage } from "../components/PageStage";
import { FilmGrain, LightSweep, Scanlines } from "../components/cinematic";
import { fontMono, fontSansCN, fontSerifCN } from "../components/fonts";
import { progress, sec } from "../components/motion";
import { splitBars } from "../acts";
import { HARD_PROMPT_CYBERPUNK } from "../generated/prompt-text";
import PromptsPage from "../../../../app/prompts/page";

const NEON = "#C6FF3D";
const CYAN = "#22D3EE";

const LibraryShot: React.FC = () => {
  const frame = useCurrentFrame();
  const headIn = progress(frame, sec(0.3), sec(0.6), "out");
  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: "scale(1.36)", transformOrigin: "50% 50%" }}>
        <PageStage Page={PromptsPage} startScroll={0} endScroll={620} />
      </AbsoluteFill>
      <LightSweep frame={frame} duration={sec(9)} delay={sec(0.6)} />
      <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse 74% 66% at 50% 46%, transparent 54%, rgba(4,4,6,0.62) 100%)" }} />
      <div style={{ position: "absolute", left: 56, top: 56, opacity: headIn, background: "rgba(6,6,9,0.78)", borderLeft: `3px solid ${NEON}`, padding: "14px 22px 14px 18px" }}>
        <div style={{ fontFamily: fontMono, fontSize: 14, letterSpacing: "0.42em", color: "rgba(255,255,255,0.42)" }}>02 / PROMPTS</div>
        <div style={{ fontFamily: fontSerifCN, fontSize: 44, fontWeight: 900, color: "#F4F1EA", marginTop: 9 }}>提示词库</div>
        <div style={{ fontFamily: fontMono, fontSize: 12, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", marginTop: 7 }}>12 TOPICS · 96+ PROMPTS</div>
      </div>
      <FilmGrain amount={0.06} seed={41} frame={frame} />
    </AbsoluteFill>
  );
};

const ROWS = [
  ["TOKENS", "颜色 · 阴影 · 圆角 · 字号阶梯"],
  ["RULES", "能做什么，以及不能做什么"],
  ["RECIPES", "按钮、卡片、导航的组装方式"],
  ["PROMPT", "可以直接复制的整段提示词"],
];

const AnatomyShot: React.FC = () => {
  const frame = useCurrentFrame();
  const head = progress(frame, sec(0.15), sec(0.55), "out");
  return (
    <AbsoluteFill style={{ background: "#08080A", justifyContent: "center", paddingLeft: 140, paddingRight: 140 }}>
      <div style={{ fontFamily: fontMono, fontSize: 15, letterSpacing: "0.42em", color: "rgba(255,255,255,0.36)", opacity: head }}>03 / ANATOMY OF A STYLE</div>
      <div style={{ fontFamily: fontSerifCN, fontSize: 76, fontWeight: 900, color: "#F4F1EA", marginTop: 20, opacity: head, transform: `translateY(${(1 - head) * 16}px)` }}>一个风格，是一份规格。</div>
      <div style={{ marginTop: 56 }}>
        {ROWS.map(([k, v], i) => {
          const p = progress(frame, sec(0.9) + i * 14, sec(0.5), "out");
          return (
            <div key={k} style={{ display: "flex", alignItems: "baseline", gap: 40, padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", opacity: p, transform: `translateX(${(1 - p) * -30}px)` }}>
              <div style={{ fontFamily: fontMono, fontSize: 19, letterSpacing: "0.3em", color: NEON, width: 210 }}>{k}</div>
              <div style={{ fontFamily: fontSansCN, fontSize: 38, color: "rgba(244,241,234,0.9)" }}>{v}</div>
            </div>
          );
        })}
      </div>
      <FilmGrain amount={0.14} seed={43} frame={frame} />
    </AbsoluteFill>
  );
};

/**
 * The real generated prompt, scrolling like a source file. The text is exactly
 * what buildHardPrompt() returns, so the viewer is reading the product output.
 */
const PromptShot: React.FC<{ frames: number }> = ({ frames }) => {
  const frame = useCurrentFrame();
  const lines = HARD_PROMPT_CYBERPUNK.split("\n");

  // Fixed line height so the scroll rate is readable and predictable.
  const LINE_H = 34;
  const totalH = lines.length * LINE_H;
  const viewport = 760;
  const p = progress(frame, sec(0.6), Math.max(1, frames - sec(2.2)), "inOut");
  const scrollY = (totalH - viewport) * p;

  const head = progress(frame, 0, sec(0.55), "out");

  return (
    <AbsoluteFill style={{ background: "#07070A" }}>
      <Scanlines frame={frame} opacity={0.06} gap={4} />

      {/* Window chrome: this is a file, not a poster. */}
      <div style={{ position: "absolute", left: 100, top: 70, right: 100, bottom: 70, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, overflow: "hidden", background: "#0B0B10", boxShadow: "0 40px 120px rgba(0,0,0,0.7)" }}>
        <div style={{ height: 44, background: "#12121A", display: "flex", alignItems: "center", gap: 8, padding: "0 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: 6, background: c, opacity: 0.85 }} />
          ))}
          <div style={{ marginLeft: 16, fontFamily: fontMono, fontSize: 14, color: "rgba(255,255,255,0.42)", letterSpacing: "0.12em" }}>
            hard-prompt · cyberpunk-neon.md
          </div>
          <div style={{ marginLeft: "auto", fontFamily: fontMono, fontSize: 12, color: NEON, letterSpacing: "0.2em" }}>
            {lines.length} 行 · {HARD_PROMPT_CYBERPUNK.length} 字符
          </div>
        </div>

        <div style={{ position: "relative", height: "calc(100% - 44px)", overflow: "hidden", padding: "26px 40px" }}>
          <div style={{ transform: `translateY(${-scrollY}px)` }}>
            {lines.map((l, i) => {
              const isHeading = l.startsWith("#");
              const isRule = l.startsWith("- ");
              const isKey = /^[a-z_]+:/.test(l);
              const revealed = progress(frame, sec(0.2) + i * 0.9, sec(0.4), "out");
              return (
                <div key={i} style={{ height: LINE_H, lineHeight: `${LINE_H}px`, fontFamily: fontMono, fontSize: 17, whiteSpace: "pre", opacity: revealed * (isHeading ? 1 : 0.9), color: isHeading ? NEON : isKey ? CYAN : isRule ? "rgba(244,241,234,0.86)" : "rgba(244,241,234,0.62)", fontWeight: isHeading ? 700 : 400 }}>
                  {l || " "}
                </div>
              );
            })}
          </div>
          {/* Footer fade so text scrolls out cleanly. */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 90, background: "linear-gradient(180deg, transparent, #0B0B10)" }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: 100, top: 24, opacity: head, fontFamily: fontMono, fontSize: 14, letterSpacing: "0.36em", color: "rgba(255,255,255,0.4)" }}>
        04 / THE PROMPT · buildHardPrompt()
      </div>
      <FilmGrain amount={0.1} seed={45} frame={frame} />
    </AbsoluteFill>
  );
};

// 14 bars: 5 library, 4 anatomy, 5 prompt file.
const [SHOT_LIBRARY, SHOT_ANATOMY, SHOT_PROMPT] = splitBars("prompts", [5, 9]);

export const ActPrompts: React.FC = () => (
  <AbsoluteFill style={{ background: "#08080A" }}>
    <Sequence durationInFrames={SHOT_LIBRARY} name="prompts-library">
      <LibraryShot />
    </Sequence>
    <Sequence from={SHOT_LIBRARY} durationInFrames={SHOT_ANATOMY} name="prompts-anatomy">
      <AnatomyShot />
    </Sequence>
    <Sequence from={SHOT_LIBRARY + SHOT_ANATOMY} durationInFrames={SHOT_PROMPT} name="prompts-file">
      <PromptShot frames={SHOT_PROMPT} />
    </Sequence>
  </AbsoluteFill>
);
