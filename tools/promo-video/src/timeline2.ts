/**
 * The master cue sheet.
 *
 * 120 BPM at 60fps: one beat is 30 frames, one 4/4 bar is 120 frames. 98 bars is
 * exactly 196 seconds. Every act is placed on whole bars, so picture, copy and
 * score all agree on where a moment lives.
 *
 * When cutting, move a bar number here - not a frame number anywhere else.
 */

export const FPS = 60;
export const BPM = 120;
export const BEAT = (FPS * 60) / BPM;
export const BAR = BEAT * 4;

export const bar = (b: number) => Math.round(b * BAR);
export const sec = (s: number) => Math.round(s * FPS);

export const ACTS = [
  { id: "open", title: "开场 · 黑暗中亮起", startBar: 0, endBar: 4 },
  { id: "slop", title: "痛点 · AI 味的同质化", startBar: 4, endBar: 12 },
  { id: "turn", title: "转折 · 问题不在模型", startBar: 12, endBar: 19 },
  { id: "reveal", title: "揭示 · 148 套风格", startBar: 19, endBar: 25 },
  { id: "styles", title: "风格 · 六套真实页面", startBar: 25, endBar: 55 },
  { id: "prompts", title: "提示词 · 从好看点到可执行", startBar: 55, endBar: 69 },
  { id: "access", title: "接入 · 三种方式与 MCP", startBar: 69, endBar: 81 },
  { id: "features", title: "功能 · 模板·动效·导出", startBar: 81, endBar: 93 },
  { id: "close", title: "收束 · 不必重来", startBar: 93, endBar: 98 },
];
export type ActId = (typeof ACTS)[number]["id"];

export const TOTAL_BARS = 98;
export const TOTAL_FRAMES = bar(TOTAL_BARS);

export const act = (id: ActId) => {
  const found = ACTS.find((a) => a.id === id);
  if (!found) throw new Error("unknown act: " + id);
  return found;
};

export const actRange = (id: ActId) => {
  const a = act(id);
  return { from: bar(a.startBar), durationInFrames: bar(a.endBar) - bar(a.startBar) };
};
