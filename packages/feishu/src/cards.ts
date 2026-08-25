/**
 * Card builders.
 *
 * All cards follow the card JSON 2.0 shape (schema declared explicitly).
 * Buttons carry their intent in `behaviors[0].value`, which is exactly what
 * comes back through the cardAction event as `action.value`.
 */

import { getStyleBySlug } from "stylekit-core/styles";
import type { StyleIntent } from "./planner/index.js";
import type { StyleLintReport } from "./compliance/index.js";

export interface CardButtonValue {
  action: "select_style" | "reroll" | "compliance_ok";
  slug?: string;
}

function markdown(content: string): object {
  return { tag: "markdown", content };
}

function button(text: string, value: CardButtonValue, type: "primary" | "default" = "default"): object {
  return {
    tag: "button",
    text: { tag: "plain_text", content: text },
    type,
    value,
    behaviors: [{ type: "callback", value }],
  };
}

/** Shown while the planner works; updated in stages. */
export function thinkingCard(stage: number): object {
  const lines: Record<number, string> = {
    1: "**正在读取 StyleKit 风格库**\n\n146 个设计风格已装载，等待需求…",
    2: "**正在分析需求**\n\n理解项目类型、品牌调性与禁区…\n\n已完成：风格库装载",
    3: "**正在比对风格特征**\n\n从配色、排版、交互与气质四个维度筛选候选…\n\n已完成：风格库装载、需求分析",
  };
  return {
    schema: "2.0",
    header: { title: { tag: "plain_text", content: "风格选型中" }, template: "blue" },
    body: { elements: [markdown(lines[stage] ?? lines[1]!)] },
  };
}

/** The final recommendation: one primary style with alternates. */
export function recommendCard(intent: StyleIntent, alternatives: string[]): object {
  const style = getStyleBySlug(intent.styleSlug);
  const styleLine = style
    ? `${style.name} · ${style.nameEn} · 主色 ${style.colors.primary}`
    : intent.styleSlug;

  const altLines = alternatives
    .map((slug) => {
      const s = getStyleBySlug(slug);
      return s ? `- ${s.name} · ${s.nameEn} · 主色 ${s.colors.primary}` : `- ${slug}`;
    })
    .join("\n");

  const actions = [button("就用这个", { action: "select_style", slug: intent.styleSlug }, "primary")];
  for (const slug of alternatives) {
    actions.push(button(`换 ${getStyleBySlug(slug)?.name ?? slug}`, { action: "select_style", slug }));
  }
  actions.push(button("重新推荐", { action: "reroll" }));

  return {
    schema: "2.0",
    header: { title: { tag: "plain_text", content: `推荐：${style?.name ?? intent.styleSlug}` }, template: "blue" },
    body: {
      elements: [
        markdown(`**${styleLine}**\n\n**为什么选它**\n${intent.rationale.map((r) => `- ${r}`).join("\n")}\n\n**项目画像**\n- 项目类型：${intent.projectType}\n- 品牌调性：${intent.brief.brandPersonality.join("、") || "未指定"}\n- 禁区：${intent.brief.antiReferences.join("；") || "无"}\n\n**备选**\n${altLines}`),
        { tag: "hr" },
        { tag: "action", actions },
      ],
    },
  };
}

export function thinkingStages(): number[] {
  return [1, 2, 3];
}

export function isCardButtonValue(value: unknown): value is CardButtonValue {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    "action" in (value as Record<string, unknown>)
  );
}

/** Result of a code compliance check, with fixes when known. */
export function complianceCard(report: StyleLintReport): object {
  const violations = report.violations
    .slice(0, 12)
    .map(
      (v) =>
        `- **${v.className}**（第 ${v.line} 行，${v.severity === "error" ? "错误" : "警告"}）${v.reason}${v.fix ? ` → 建议 \`${v.fix}\`` : ""}`,
    )
    .join("\n");

  const hidden = report.violations.length > 12 ? `\n\n…另有 ${report.violations.length - 12} 处未列出` : "";

  const status = report.violations.length === 0
    ? `**通过**：${report.checkedClasses} 个类名全部符合 ${report.slug} 风格`
    : `**${report.violations.filter((v) => v.severity === "error").length} 处错误**，共检查 ${report.checkedClasses} 个类名`;

  return {
    schema: "2.0",
    header: {
      title: { tag: "plain_text", content: report.violations.length === 0 ? "风格合规" : "风格违规" },
      template: report.violations.length === 0 ? "green" : "red",
    },
    body: { elements: [markdown(`${status}\n\n${violations}${hidden}`)] },
  };
}

/** Delivery summary shown after a style is picked. */
export function deliverCard(params: { slug: string; artifacts: number; totalChars: number; docUrl?: string; baseUrl?: string }): object {
  const style = getStyleBySlug(params.slug);
  const lines = [
    `**${style?.name ?? params.slug} 工程包已生成**`,
    `- 产物：${params.artifacts} 件（共 ${params.totalChars.toLocaleString()} 字符）`,
  ];
  if (params.docUrl) lines.push(`- [设计规范交付单](${params.docUrl})`);
  if (params.baseUrl) lines.push(`- [多维表格记录](${params.baseUrl})`);
  lines.push("\n把 AI 写好的代码贴回群里，我来体检它是否守住了这个风格。");

  return {
    schema: "2.0",
    header: { title: { tag: "plain_text", content: "工程包就绪" }, template: "green" },
    body: { elements: [markdown(lines.join("\n"))] },
  };
}
