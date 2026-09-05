/**
 * Tolerant intake for planner output.
 *
 * The zod schema enforces the contract; this preprocessor fills the gaps a
 * model leaves when it follows the prose but drops a field. version and
 * constraints carry no design meaning, so they default freely. projectType
 * feeds the prompt context, so it is inferred from the brief with a
 * conservative fallback rather than guessed wildly.
 */

import type { StyleIntent } from "./intent.js";

const PROJECT_HINTS: Array<[RegExp, StyleIntent["projectType"]]> = [
  [/仪表盘|后台|数据|dashboard|admin|analytics|管理/i, "dashboard"],
  [/博客|文章|杂志|blog|editorial content/i, "blog"],
  [/作品集|简历|portfolio/i, "portfolio"],
];

export function inferProjectType(raw: unknown): StyleIntent["projectType"] {
  const brief = (raw as { brief?: { requiredPages?: string[]; primaryGoal?: string; audience?: string } })?.brief;
  const text = [brief?.primaryGoal, brief?.audience, ...(brief?.requiredPages ?? [])]
    .filter(Boolean)
    .join(" ");

  for (const [pattern, projectType] of PROJECT_HINTS) {
    if (pattern.test(text)) return projectType;
  }
  return "landing";
}

export function coerceIntent(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return raw;

  const record = raw as Record<string, unknown>;
  return {
    ...record,
    schemaVersion: record.schemaVersion ?? "style-intent-v1",
    constraints: Array.isArray(record.constraints) ? record.constraints : [],
    projectType:
      typeof record.projectType === "string"
        ? record.projectType
        : inferProjectType(record),
  };
}
