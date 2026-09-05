/**
 * Catalog browsing without the planner: count, list by category, inspect one.
 * These answer real questions ("which dark styles exist?") and give the demo
 * and tests stable ground under them.
 */

import { stylesMeta, getStyleBySlug } from "stylekit-core/styles";

const CATEGORY_LABELS: Record<string, string> = {
  modern: "现代",
  retro: "复古",
  minimal: "极简",
  expressive: "表现力",
};

export function catalogCount(): number {
  return stylesMeta.length;
}

export function catalogByCategory(): string {
  const grouped = new Map<string, string[]>();
  for (const meta of stylesMeta) {
    const list = grouped.get(meta.category) ?? [];
    list.push(`${meta.name} \`${meta.slug}\``);
    grouped.set(meta.category, list);
  }

  return [...grouped.entries()]
    .map(([category, entries]) => {
      const label = CATEGORY_LABELS[category] ?? category;
      return `**${label}**（${entries.length}）\n${entries.join(" · ")}`;
    })
    .join("\n\n");
}

export function inspectStyle(slug: string): string | null {
  const style = getStyleBySlug(slug);
  if (!style) return null;

  return [
    `**${style.name}**（${style.nameEn}）\`${style.slug}\``,
    "",
    style.description,
    "",
    `- 分类：${CATEGORY_LABELS[style.category] ?? style.category}`,
    `- 主色：${style.colors.primary} · 辅助：${style.colors.secondary} · 强调：${style.colors.accent.join(" / ")}`,
    `- 标签：${style.tags.join(" · ") || "无"}`,
    "",
    "**要诀**",
    ...style.doList.slice(0, 3).map((item) => `- ✅ ${item}`),
    ...style.dontList.slice(0, 3).map((item) => `- ⛔ ${item}`),
    "",
    `详情：https://www.stylekit.top/styles/${style.slug}`,
  ].join("\n");
}
