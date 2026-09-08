/**
 * Lightweight background metadata for list and kit surfaces.
 *
 * The full background registry contains large inline SVG data URLs. Keep this
 * small index separate so pages that only need a name/category do not ship
 * those previews in their initial client bundle.
 */

export type BackgroundCategory =
  | "grid"
  | "dots"
  | "stripes"
  | "waves"
  | "noise"
  | "geometric"
  | "gradient-pattern";

export interface BackgroundMeta {
  id: string;
  name: string;
  nameZh: string;
  category: BackgroundCategory;
}

export const backgroundsMeta: readonly BackgroundMeta[] = [
  { id: "dot-grid", name: "Dot Grid", nameZh: "点阵网格", category: "grid" },
  { id: "square-grid", name: "Square Grid", nameZh: "方格网格", category: "grid" },
  { id: "isometric-grid", name: "Isometric Grid", nameZh: "等距网格", category: "grid" },
  { id: "cross-hatch", name: "Cross Hatch", nameZh: "交叉线", category: "grid" },
  { id: "polka-dots", name: "Polka Dots", nameZh: "波点", category: "dots" },
  { id: "scattered-dots", name: "Scattered Dots", nameZh: "散点", category: "dots" },
  { id: "honeycomb", name: "Honeycomb", nameZh: "蜂巢", category: "dots" },
  { id: "diagonal-stripes", name: "Diagonal Stripes", nameZh: "斜条纹", category: "stripes" },
  { id: "vertical-stripes", name: "Vertical Stripes", nameZh: "竖条纹", category: "stripes" },
  { id: "horizontal-stripes", name: "Horizontal Stripes", nameZh: "横条纹", category: "stripes" },
  { id: "zigzag", name: "Zigzag", nameZh: "锯齿纹", category: "stripes" },
  { id: "chevron", name: "Chevron", nameZh: "人字纹", category: "stripes" },
  { id: "wave-simple", name: "Simple Wave", nameZh: "简单波浪", category: "waves" },
  { id: "topographic", name: "Topographic Lines", nameZh: "等高线", category: "waves" },
  { id: "checkerboard", name: "Checkerboard", nameZh: "棋盘格", category: "geometric" },
  { id: "triangles", name: "Triangles", nameZh: "三角形", category: "geometric" },
  { id: "diamonds", name: "Diamonds", nameZh: "菱形", category: "geometric" },
  { id: "circuit-board", name: "Circuit Board", nameZh: "电路板", category: "geometric" },
  { id: "gradient-mesh", name: "Gradient Mesh", nameZh: "渐变网格", category: "gradient-pattern" },
  { id: "gradient-rays", name: "Gradient Rays", nameZh: "渐变光线", category: "gradient-pattern" },
  { id: "topography", name: "Topography", nameZh: "地形图", category: "geometric" },
  { id: "jigsaw", name: "Jigsaw", nameZh: "拼图", category: "geometric" },
  { id: "overlapping-circles", name: "Overlapping Circles", nameZh: "交叠圆环", category: "geometric" },
  { id: "hexagons", name: "Hexagons", nameZh: "六边形", category: "geometric" },
  { id: "wiggle", name: "Wiggle", nameZh: "波纹曲线", category: "waves" },
  { id: "bubbles", name: "Bubbles", nameZh: "气泡", category: "dots" },
  { id: "endless-clouds", name: "Endless Clouds", nameZh: "绵延云朵", category: "geometric" },
  { id: "hero-plus", name: "Plus", nameZh: "加号", category: "geometric" },
  { id: "i-like-food", name: "Food", nameZh: "美食图案", category: "geometric" },
  { id: "graph-paper", name: "Graph Paper", nameZh: "方格纸", category: "grid" },
  { id: "hero-diagonal-lines", name: "Diagonal Lines Fine", nameZh: "细斜线", category: "stripes" },
  { id: "floating-cogs", name: "Floating Cogs", nameZh: "齿轮", category: "geometric" },
];

const backgroundMetaById = new Map(
  backgroundsMeta.map((background) => [background.id, background]),
);

export function getBackgroundMetaById(id: string): BackgroundMeta | undefined {
  return backgroundMetaById.get(id);
}
