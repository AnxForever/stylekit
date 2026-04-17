import { z } from "zod";
import type { AgentTool } from "./types";
import { searchStylesTool } from "./search-styles";
import { searchTemplatesTool } from "./search-templates";
import { searchComponentsTool } from "./search-components";
import { getStyleDetailsTool } from "./get-style-details";
import { getDesignGuidelinesTool } from "./get-design-guidelines";

/**
 * 所有 agent tool 的集中注册点。
 * 添加新 tool 只需：写好 xxx-tool.ts，在这里导入并加进数组。
 */
const ALL_TOOLS: AgentTool<z.ZodTypeAny>[] = [
  searchStylesTool,
  searchTemplatesTool,
  searchComponentsTool,
  getStyleDetailsTool,
  getDesignGuidelinesTool,
];

/**
 * 用 Map 优化 executor 查找性能（O(1) vs O(n)）。
 */
export const toolRegistry: ReadonlyMap<string, AgentTool<z.ZodTypeAny>> = new Map(
  ALL_TOOLS.map((tool) => [tool.name, tool])
);

/**
 * 导出给 provider 拼装 OpenAI tools 参数用。
 * 注意：这一层不做 Zod → JSON Schema 转换，那个转换在 provider.ts 做。
 */
export function getAllTools(): AgentTool<z.ZodTypeAny>[] {
  return ALL_TOOLS;
}

/**
 * 按名称过滤——给将来的"按阶段启用不同 tool"留个接口。
 */
export function getToolsByName(names: readonly string[]): AgentTool<z.ZodTypeAny>[] {
  const nameSet = new Set(names);
  return ALL_TOOLS.filter((tool) => nameSet.has(tool.name));
}
