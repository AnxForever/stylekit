// Visual hierarchy — system-layer foundations.
//
// Hierarchy is control over the order in which the eye moves through a layout.
// Four levers do most of the work — Size, Weight, Color/Contrast, and Space.
// This module is self-contained: lever data, a sample composition, and a
// scoring function that ranks elements by visual weight so the React layer can
// render a live "scan order" without any of the logic living in the component.

export type LeverId = "size" | "weight" | "color" | "space";

export interface HierarchyLever {
  id: LeverId;
  name: string;
  nameZh: string;
  desc: string;
  descZh: string;
}

export const HIERARCHY_LEVERS: HierarchyLever[] = [
  {
    id: "size",
    name: "Size",
    nameZh: "大小",
    desc: "Bigger elements are seen first — size is the loudest signal in the room.",
    descZh: "更大的元素先被看到——大小是房间里最响亮的信号。",
  },
  {
    id: "weight",
    name: "Weight",
    nameZh: "字重",
    desc: "Heavier strokes carry more visual mass and hold the eye longer.",
    descZh: "更重的笔画有更大的视觉质量，留住视线更久。",
  },
  {
    id: "color",
    name: "Color",
    nameZh: "颜色对比",
    desc: "High contrast against the background jumps forward; muted tones recede.",
    descZh: "与背景高对比的跳到前面，灰暗的色调后退。",
  },
  {
    id: "space",
    name: "Space",
    nameZh: "留白",
    desc: "Whitespace and isolation give an element room to command attention.",
    descZh: "留白与隔离给元素空间去掌控注意力。",
  },
];

export interface HierarchyElement {
  id: string;
  role: string;
  roleZh: string;
  label: string;
  labelZh: string;
  /**
   * Intrinsic strength on each lever (0-1): how strongly this element expresses
   * the lever when that lever is switched on. A title is strong on size and
   * weight; a CTA is strong on color; meta text is weak on everything.
   */
  levers: Record<LeverId, number>;
}

export const SAMPLE_ELEMENTS: HierarchyElement[] = [
  {
    id: "eyebrow",
    role: "Eyebrow",
    roleZh: "眉标",
    label: "NEW RELEASE",
    labelZh: "新版发布",
    levers: { size: 0.2, weight: 0.5, color: 0.7, space: 0.3 },
  },
  {
    id: "title",
    role: "Title",
    roleZh: "标题",
    label: "Design that ships itself",
    labelZh: "会自己上线的设计",
    levers: { size: 1.0, weight: 1.0, color: 0.8, space: 0.6 },
  },
  {
    id: "body",
    role: "Body",
    roleZh: "正文",
    label: "A short paragraph that supports the headline without competing with it.",
    labelZh: "一段支撑标题、又不与它争抢的简短说明。",
    levers: { size: 0.3, weight: 0.2, color: 0.3, space: 0.2 },
  },
  {
    id: "cta",
    role: "Button",
    roleZh: "按钮",
    label: "Get started",
    labelZh: "开始使用",
    levers: { size: 0.5, weight: 0.6, color: 1.0, space: 0.7 },
  },
  {
    id: "meta",
    role: "Meta",
    roleZh: "元信息",
    label: "Updated 2 days ago",
    labelZh: "2 天前更新",
    levers: { size: 0.1, weight: 0.1, color: 0.15, space: 0.1 },
  },
];

/** Sum an element's strength across the active levers. No levers = flat = 0. */
export function visualWeight(el: HierarchyElement, active: LeverId[]): number {
  return active.reduce((sum, lever) => sum + el.levers[lever], 0);
}

export interface RankedElement {
  id: string;
  score: number;
  /** 1-based scan order; 1 = the eye lands here first. */
  rank: number;
}

/**
 * Rank elements by visual weight under the active levers, descending.
 * Ties keep source order (stable sort), so a flat composition (no levers)
 * falls back to plain top-to-bottom reading order.
 */
export function rankByWeight(elements: HierarchyElement[], active: LeverId[]): RankedElement[] {
  const scored = elements.map((el) => ({ id: el.id, score: visualWeight(el, active) }));
  const sorted = [...scored].sort((a, b) => b.score - a.score);
  return sorted.map((s, i) => ({ ...s, rank: i + 1 }));
}

export interface TextLevel {
  name: string;
  size: string;
  weight: number;
  opacity: number;
}

export const TEXT_LEVELS: TextLevel[] = [
  { name: "primary", size: "1.5rem", weight: 700, opacity: 1 },
  { name: "secondary", size: "1rem", weight: 500, opacity: 0.9 },
  { name: "tertiary", size: "0.875rem", weight: 400, opacity: 0.6 },
];

/** Emit a copyable three-tier text-hierarchy token set. */
export function generateHierarchyCSS(): string {
  const lines: string[] = [];
  for (const level of TEXT_LEVELS) {
    lines.push(`.text-${level.name} {`);
    lines.push(`  font-size: ${level.size};`);
    lines.push(`  font-weight: ${level.weight};`);
    lines.push(`  opacity: ${level.opacity};`);
    lines.push("}");
  }
  return lines.join("\n");
}
