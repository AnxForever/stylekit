/**
 * Template-aware rules for the interface copy that AI writes into a project.
 *
 * The snapshot schema only knows the shape (section id -> field id -> string).
 * This module knows the dashboard template: which section and field ids exist,
 * which values are comma-separated lists or numeric chart series, and how much
 * copy a slot can hold. Generation and preview merge the saved copy over the
 * template defaults, so a stored revision can never produce an unrenderable
 * interface even if it was written by an older client.
 */

import { getTemplateByType, type TemplateType } from "@/lib/generator";
import { workspaceContentSchema, type WorkspaceContent } from "./schema";

export const WORKSPACE_CONTENT_SYSTEM_PROMPT = `你是资深 B2B 产品文案编辑，负责为数据后台界面撰写真实可用的中文文案。
规则：
- 只返回 JSON，形如 {"sections":{"sidebar":{"appName":"..."}}}，不要 markdown，不要解释。
- 只能使用给定区块和字段 id，不能新增、改名或省略字段。
- 每个值都是字符串；列表字段用英文逗号加空格分隔；数值序列只写数字。
- 同一张图表的标签与两组数值数量必须一致，数值要和标签一一对应。
- 文案贴合项目说明、目标用户和品牌调性，简洁、具体，不写口号式空话。
- 应用名称要像独立产品名（2-6 个汉字，或品牌式英文），不要原样重复项目名称。
- 版权行使用给定的当前年份；版本号使用 v1.0.0 这样的语义化格式，除非项目说明另有要求。
- 不要输出 HTML、脚本、反引号、表情符号或占位符。`;

const EXCLUDED_FIELD_IDS = new Set(["chartType"]);
const LIST_FIELD_IDS = new Set(["navItems", "columns", "chartLabels"]);
const NUMERIC_LIST_FIELD_IDS = new Set(["primarySeriesValues", "secondarySeriesValues"]);
const CHART_LIST_FIELD_IDS = ["chartLabels", "primarySeriesValues", "secondarySeriesValues"] as const;
const LIST_SPLIT_PATTERN = /[,，\n]/;
const NUMERIC_ITEM_PATTERN = /^\d{1,6}(?:\.\d{1,2})?$/;
const UNSAFE_PATTERN = /[<>`]|\$\{/;

const MAX_LIST_ITEMS = 8;
const MIN_LIST_ITEMS = 2;
const MAX_LIST_ITEM_LENGTH = 24;
const MAX_TEXT_LENGTH = 80;
const MAX_TEXTAREA_LENGTH = 240;
const MAX_ROW_COUNT = 20;

export type WorkspaceContentSummaryEntry = {
  sectionId: string;
  sectionName: string;
  fieldId: string;
  label: string;
  value: string;
};

export type WorkspaceContentBrief = {
  name: string;
  description: string;
  projectType: string;
  brief?: {
    audience?: string;
    primaryGoal?: string;
    requiredPages?: string[];
    brandPersonality?: string[];
    antiReferences?: string[];
    notes?: string;
  };
};

export type WorkspaceContentResult =
  | { ok: true; content: WorkspaceContent; fieldCount: number; summary: WorkspaceContentSummaryEntry[] }
  | { ok: false; error: string };

function fail(error: string): { ok: false; error: string } {
  return { ok: false, error };
}

function splitList(value: string): string[] {
  return value
    .split(LIST_SPLIT_PATTERN)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeListValue(fieldId: string, value: string): { ok: true; value: string } | { ok: false; error: string } {
  const items = splitList(value);
  if (items.length < MIN_LIST_ITEMS || items.length > MAX_LIST_ITEMS) {
    return fail(`字段 ${fieldId} 需要 ${MIN_LIST_ITEMS}-${MAX_LIST_ITEMS} 个用逗号分隔的条目。`);
  }
  const seen = new Set<string>();
  for (const item of items) {
    if (item.length > MAX_LIST_ITEM_LENGTH) return fail(`字段 ${fieldId} 的条目过长。`);
    if (UNSAFE_PATTERN.test(item)) return fail(`字段 ${fieldId} 含有不允许的字符。`);
    if (NUMERIC_LIST_FIELD_IDS.has(fieldId)) {
      if (!NUMERIC_ITEM_PATTERN.test(item)) return fail(`字段 ${fieldId} 只能包含数字。`);
    }
    if (seen.has(item)) return fail(`字段 ${fieldId} 不能包含重复条目。`);
    seen.add(item);
  }
  return { ok: true, value: items.join(", ") };
}

/**
 * Validates AI (or client) copy against the template and returns it in a
 * canonical form: trimmed values, `", "`-joined lists, numeric series kept as
 * strings, chart lists the same length.
 */
export function normalizeWorkspaceContent(templateType: TemplateType, input: unknown): WorkspaceContentResult {
  const template = getTemplateByType(templateType);
  if (!template) return fail(`模板 ${templateType} 不存在。`);

  const parsed = workspaceContentSchema.safeParse(input);
  if (!parsed.success) return fail("界面文案格式无效。");
  const raw = parsed.data;

  const fieldsBySection = new Map(
    template.sections.map((section) => [
      section.id,
      new Map(
        section.fields
          .filter((field) => !EXCLUDED_FIELD_IDS.has(field.id))
          .map((field) => [field.id, field])
      ),
    ])
  );

  const content: WorkspaceContent = {};
  const summary: WorkspaceContentSummaryEntry[] = [];

  for (const [sectionId, fields] of Object.entries(raw)) {
    const definition = template.sections.find((section) => section.id === sectionId);
    const allowed = fieldsBySection.get(sectionId);
    if (!definition || !allowed) return fail(`未知区块 ${sectionId}。`);

    const sectionContent: Record<string, string> = {};
    for (const [fieldId, rawValue] of Object.entries(fields)) {
      const field = allowed.get(fieldId);
      if (!field) return fail(`区块 ${sectionId} 中不存在字段 ${fieldId}。`);

      const value = rawValue.trim();
      if (!value) return fail(`字段 ${fieldId} 不能为空。`);
      if (UNSAFE_PATTERN.test(value)) return fail(`字段 ${fieldId} 含有不允许的字符。`);

      let normalized = value;
      if (LIST_FIELD_IDS.has(fieldId) || NUMERIC_LIST_FIELD_IDS.has(fieldId)) {
        const list = normalizeListValue(fieldId, value);
        if (!list.ok) return list;
        normalized = list.value;
      } else if (fieldId === "rowCount") {
        if (!/^\d{1,2}$/.test(value) || Number(value) < 1 || Number(value) > MAX_ROW_COUNT) {
          return fail(`字段 ${fieldId} 需要 1-${MAX_ROW_COUNT} 的整数。`);
        }
      } else {
        const limit = field.type === "textarea" ? MAX_TEXTAREA_LENGTH : MAX_TEXT_LENGTH;
        if (value.length > limit) return fail(`字段 ${fieldId} 超过 ${limit} 个字符。`);
      }

      sectionContent[fieldId] = normalized;
      summary.push({
        sectionId,
        sectionName: definition.name,
        fieldId,
        label: field.label,
        value: normalized,
      });
    }

    if (Object.keys(sectionContent).length === 0) return fail(`区块 ${sectionId} 没有填写任何字段。`);
    content[sectionId] = sectionContent;
  }

  const chartFields = content.charts;
  if (chartFields) {
    const present = CHART_LIST_FIELD_IDS.filter((fieldId) => fieldId in chartFields);
    if (present.length > 0) {
      if (present.length !== CHART_LIST_FIELD_IDS.length) {
        return fail("图表标签和两组数值必须同时填写。");
      }
      const lengths = CHART_LIST_FIELD_IDS.map((fieldId) => splitList(chartFields[fieldId]).length);
      if (new Set(lengths).size !== 1) return fail("图表标签和两组数值的数量必须一致。");
    }
  }

  const navItems = content.sidebar?.navItems;
  const activeItem = content.sidebar?.activeItem;
  if (navItems && activeItem && !splitList(navItems).includes(activeItem.trim())) {
    return fail("当前激活项必须是导航项之一。");
  }

  return { ok: true, content, fieldCount: summary.length, summary };
}

/** Stable signature for "has the copy changed since it was saved". */
export function workspaceContentSignature(content: WorkspaceContent): string {
  const sorted = Object.keys(content)
    .sort()
    .map((sectionId) => [
      sectionId,
      Object.keys(content[sectionId])
        .sort()
        .map((fieldId) => [fieldId, content[sectionId][fieldId]]),
    ]);
  return JSON.stringify(sorted);
}

export function buildWorkspaceContentPrompt(project: WorkspaceContentBrief): string {
  const template = getTemplateByType("dashboard");
  const brief = project.brief ?? {};
  const currentYear = new Date().getFullYear();
  const lines = [
    `请为下面这个「${template?.name ?? "数据后台"}」项目撰写界面文案。`,
    "",
    `项目名称：${project.name}`,
    `当前年份：${currentYear}`,
    `项目说明：${project.description || "（未填写）"}`,
    `目标用户：${brief.audience || "（未填写）"}`,
    `主要目标：${brief.primaryGoal || "（未填写）"}`,
    `页面清单：${brief.requiredPages?.length ? brief.requiredPages.join("、") : "（未填写）"}`,
    `品牌调性：${brief.brandPersonality?.length ? brief.brandPersonality.join("、") : "（未填写）"}`,
    `绝对不要：${brief.antiReferences?.length ? brief.antiReferences.join("、") : "（未填写）"}`,
    `其他约束：${brief.notes || "（未填写）"}`,
    "",
    `给 sidebar.appName 起一个产品名，不要直接照抄「${project.name}」。`,
    `footer.copyright 的年份必须是 ${currentYear}；footer.version 使用 v1.0.0 格式，除非项目说明另有要求。`,
    "",
    "可填写字段（必须全部填写，只使用这些区块和字段 id）：",
  ];
  for (const section of template?.sections ?? []) {
    lines.push(`[${section.id}] ${section.name}：${section.description}`);
    for (const field of section.fields) {
      if (EXCLUDED_FIELD_IDS.has(field.id)) continue;
      lines.push(`- ${field.id}（${field.label}）当前默认值：${field.defaultValue}`);
    }
  }
  lines.push(
    "",
    '只返回 JSON，例如 {"sections":{"sidebar":{"appName":"..."}}}。',
    "列表字段用英文逗号加空格分隔；图表标签与两组数值数量一致，数值只写数字。"
  );
  return lines.join("\n");
}
