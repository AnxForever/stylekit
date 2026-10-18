/**
 * Per-style art direction.
 *
 * Each featured style gets its own camera move and overlay set, so the montage
 * reads as a curated gallery rather than a slideshow. `plate` places the title
 * block where that particular page has empty space - dense pages (swiss poster,
 * brutalist) have content almost everywhere, so their labels move to a corner
 * that their own layout leaves clear.
 */

export type PlatePos = "bottom-left" | "bottom-right" | "top-left" | "top-right";

export type Treatment = {
  slug: string;
  label: string;
  latin: string;
  scroll: [number, number];
  zoom: [number, number];
  tilt: [number, number];
  /** Where the title block sits. Chosen per page, not globally. */
  plate: PlatePos;
  fx: {
    sweep?: boolean;
    scanlines?: boolean;
    chroma?: number;
    grain?: number;
    bleed?: "left" | "right" | "top" | "bottom";
    brackets?: boolean;
    caption?: string;
  };
};

export const TREATMENTS: Treatment[] = [
  {
    slug: "editorial",
    label: "编辑杂志风",
    latin: "EDITORIAL",
    scroll: [0, 1500],
    zoom: [1.18, 1.0],
    tilt: [-1.2, 0],
    plate: "top-left",
    fx: { sweep: true, grain: 0.12, caption: "衬线 · 留白 · 克制的呼吸" },
  },
  {
    slug: "neo-brutalist",
    label: "新野兽派",
    latin: "NEO-BRUTALIST",
    scroll: [0, 900],
    zoom: [1.35, 1.08],
    tilt: [0, 0],
    plate: "top-left",
    fx: { chroma: 6, scanlines: true, grain: 0.22, caption: "粗边框 · 硬阴影 · 不留情面" },
  },
  {
    slug: "art-deco",
    label: "装饰艺术",
    latin: "ART DECO",
    scroll: [0, 1100],
    zoom: [1.05, 1.28],
    tilt: [0.8, -0.4],
    plate: "top-left",
    fx: { bleed: "top", grain: 0.1, caption: "几何对称 · 金色 · 机器时代的语言" },
  },
  {
    slug: "ukiyo-e-digital",
    label: "数字浮世绘",
    latin: "UKIYO-E DIGITAL",
    scroll: [0, 1200],
    zoom: [1.1, 1.0],
    tilt: [0, 0.6],
    plate: "top-left",
    fx: { brackets: true, grain: 0.14, caption: "木刻版画 · 平涂 · 重新上屏" },
  },
  {
    slug: "glassmorphism",
    label: "玻璃拟态",
    latin: "GLASSMORPHISM",
    scroll: [0, 1400],
    zoom: [1.22, 1.02],
    tilt: [0, 0],
    plate: "top-left",
    fx: { bleed: "left", grain: 0.08, caption: "透明是材料，光才是主角" },
  },
  {
    slug: "swiss-poster",
    label: "瑞士海报",
    latin: "SWISS POSTER",
    scroll: [0, 1000],
    zoom: [1.0, 1.16],
    tilt: [0, 0],
    // This page fills the frame edge to edge with type, so the label moves out
    // of the way to the upper-right gutter.
    plate: "top-right",
    fx: { sweep: true, grain: 0.06, caption: "网格 · 字号阶梯 · 客观的秩序" },
  },
];
