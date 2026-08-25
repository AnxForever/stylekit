/**
 * Builds the 设计规范交付单 — the Markdown that gets imported into a Feishu
 * doc as the human-readable half of the handoff. The full prompt is embedded
 * so the doc is the single source a teammate can copy from.
 */

import { getStyleBySlug } from "stylekit-core/styles";
import type { Artifact } from "../artifacts/index.js";
import type { StyleIntent } from "../planner/index.js";

export function buildDeliveryDoc(
  intent: StyleIntent,
  artifacts: Artifact[],
): string {
  const style = getStyleBySlug(intent.styleSlug);
  if (!style) return "";

  const promptArtifact = artifacts.find((a) => a.name.endsWith("AI-PROMPT.md"));
  const lines: string[] = [
    `# ${style.name} · 设计规范交付单`,
    "",
    "> 由 StyleKit 生成。本单是本次设计任务的唯一权威依据，代码以「规范交付单」为合同，体检以「风格规则引擎」为准。",
    "",
    "## 项目画像",
    "",
    `- 项目类型：${intent.projectType}`,
    `- 目标用户：${intent.brief.audience}`,
    `- 首要目标：${intent.brief.primaryGoal}`,
    `- 品牌调性：${intent.brief.brandPersonality.join("、") || "未指定"}`,
    `- 禁区：${intent.brief.antiReferences.join("；") || "无"}`,
    "",
    "## 风格概览",
    "",
    `- 风格：${style.name}（${style.nameEn}）`,
    `- 主色：${style.colors.primary} · 辅助：${style.colors.secondary} · 强调：${style.colors.accent.join(" / ")}`,
    `- 分类：${style.category}`,
    "",
    style.philosophy,
    "",
    "## 风格要诀",
    "",
    ...style.doList.map((item) => `- ✅ ${item}`),
    ...style.dontList.map((item) => `- ⛔ ${item}`),
    "",
    "## 关键词",
    "",
    style.keywords.join(" · "),
    "",
    "## 工程包清单",
    "",
    ...artifacts.map((a) => `- \`${a.name}\` — ${a.purpose}`),
    "",
    "## 交给 AI 编程助手的成品提示词",
    "",
    ...(promptArtifact ? promptArtifact.content.split("\n") : ["（生成失败，请从多维表格或工程包取用）"]),
  ];

  return lines.join("\n");
}
