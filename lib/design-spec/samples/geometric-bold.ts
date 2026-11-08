import type { DesignSpec } from "../types";

export const geometricBoldSpec: DesignSpec = {
  slug: "geometric-bold",
  name: "几何大胆风",
  nameEn: "Geometric Bold",
  cover: "/styles/geometric-bold.svg",
  theme: "light",
  northStar: {
    zh: "巨大的圆、方块与三角在版面上相撞，字体大得像海报。",
    en: "Oversized circles, squares and triangles collide across the page, with type set like a poster.",
  },
  summary: {
    zh: "几何大胆风把版式当成海报：字大到 160px、色块纯到红蓝黄、形状只有圆、方、三角三种，而且必须互相重叠。所有元素绝对定位，允许旋转 6 到 12 度制造动势。圆角只有两个合法值——完全直角或完全圆，没有中间态。它的难度在秩序：形状再多也必须落在一条隐形网格上，色块面积必须有明显的主次（最大的一块不超过屏幕 40%）。",
    en: "Geometric Bold treats layout as a poster: type up to 160px, blocks in pure red, blue and yellow, and only three shapes — circle, square, triangle — which must overlap. Everything is absolutely positioned and may rotate six to twelve degrees for momentum. Radius has exactly two legal values: fully square or fully round, nothing between. The difficulty is order: however many shapes appear, they must land on an invisible grid, and block areas must rank clearly, with the largest never exceeding forty percent of the screen.",
  },
  colors: [
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "主文字、最大色块与形状描边。海报需要最极端的对比。",
        en: "Primary type, the largest blocks and shape strokes — a poster wants the most extreme contrast.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "画布与反白文字。与黑成对，不做灰度中间层。",
        en: "Canvas and reversed-out type, always paired with black; no mid greys.",
      },
      token: "--color-white",
    },
    {
      name: "红",
      nameEn: "Red",
      value: "#ff0000",
      group: "accent",
      role: {
        zh: "主强调与焦点形状。全屏面积不超过 25%。",
        en: "Primary emphasis and the focal shape, never above 25% of a screen.",
      },
      token: "--color-red",
    },
    {
      name: "蓝",
      nameEn: "Blue",
      value: "#0000ff",
      group: "accent",
      role: {
        zh: "第二色块，用于与红形成对位，面积小于红。",
        en: "The second block, set against red at a smaller area.",
      },
      token: "--color-blue",
    },
    {
      name: "黄",
      nameEn: "Yellow",
      value: "#ffff00",
      group: "accent",
      role: {
        zh: "高亮点缀，用于标签与小型形状，面积最小。",
        en: "Highlight accents on tags and small shapes — the smallest area of the three.",
      },
      token: "--color-yellow",
    },
    {
      name: "赭",
      nameEn: "Ochre",
      value: "#6c3b00",
      group: "accent",
      role: {
        zh: "唯一的暗暖色，用于需要压在黄色上的文字。",
        en: "The one dark warm tone, for text that must sit on yellow.",
      },
      token: "--color-ochre",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "Helvetica Neue, Arial, sans-serif",
      weights: [700, 900],
      sizes: [14, 18, 24, 40, 80, 160],
      lineHeight: { display: 0.88, heading: 0.95, body: 1.5 },
      tracking: { display: "-0.045em", label: "0.1em" },
      role: {
        zh: "全站唯一字体，只用 700 与 900 两档。海报字的行高压到 0.88，让字块成为形状。",
        en: "The only face, in 700 and 900 only. Poster type runs at 0.88 leading so the text block becomes a shape.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 160, lineHeight: 0.88, tracking: "-0.045em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 80, lineHeight: 0.92, tracking: "-0.035em", token: "--text-heading-lg" },
    { role: "heading", weight: 700, size: 40, lineHeight: 0.98, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 24, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body", weight: 700, size: 18, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 700, size: 14, lineHeight: 1.3, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128, 192],
    maxWidth: 1440,
    sectionGap: 192,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "shapes", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "画布" },
    { level: 1, name: "Black Block", value: "#000000", purpose: "主形状与反色区块" },
    { level: 2, name: "Color Block", value: "#ff0000", purpose: "强调形状" },
  ],
  elevation: [{ name: "None", value: "none — shapes stack by overlap, not shadow" }],
  components: [
    {
      name: "Shape Block",
      role: { zh: "几何形状与色块", en: "Geometric shapes and color blocks" },
      construction: {
        zh: "只用圆、正方、等腰三角三种。填纯色（黑、红、蓝、黄之一），无描边无阴影，允许与其它形状重叠 20% 到 40%。可旋转 6 到 12 度。同一屏内最多四种形状，其中一种面积必须明显更大。",
        en: "Only three forms: circle, square, isosceles triangle. Fill with one pure color — black, red, blue or yellow — with no stroke and no shadow, and let shapes overlap by twenty to forty percent. Rotation runs six to twelve degrees. Four shapes maximum per screen, with one clearly larger than the rest.",
      },
      states: "hover: rotate an extra 3deg, no scale",
    },
    {
      name: "Poster Headline",
      role: { zh: "主标题字块", en: "The headline as a block" },
      construction: {
        zh: "160px、900 字重、行高 0.88、字距 -0.045em，行宽由内容决定而非容器。允许三行堆叠并与形状重叠，但文字必须始终在最上层且与背景保持至少 7:1 对比。可整体旋转 -2 到 2 度。",
        en: "160px at weight 900, 0.88 leading and -0.045em tracking, with line width driven by the words rather than the container. It may stack three lines and overlap a shape, but type always sits on top and keeps at least 7:1 contrast. The block itself may rotate between -2 and 2 degrees.",
      },
    },
    {
      name: "Block Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "纯黑或纯红填充、白字、直角、无阴影。14px/700、0.1em 字距、padding 16px 32px、2px 描边（与填充同色）。hover 时填充与文字互换；按下时整体向右下偏移 4px 并保持无阴影。过渡 120ms。",
        en: "Black or red fill, white text, square corners, no shadow. 14px at weight 700 with 0.1em tracking, 16px 32px padding, and a 2px border in the fill color. Hover swaps fill and text; press offsets the whole block 4px down-right with no shadow. 120ms.",
      },
      states: "hover: inverted; active: offset 4px",
    },
    {
      name: "Grid Scaffold",
      role: { zh: "隐形网格", en: "The invisible grid" },
      construction: {
        zh: "12 栏、24px 间距、内容上限 1440px。所有形状与文字块必须贴齐栏线或其中点，重叠允许但落点必须在网格上。允许一条 1px 的辅助线贯穿整页，但只在设计稿中显示。",
        en: "Twelve columns, 24px gutters, capped at 1440px. Every shape and text block snaps to a column edge or its midpoint; overlap is allowed but the landing point must sit on the grid. One 1px guide line may run the page, visible in the artboard only.",
      },
    },
  ],
  imagery: {
    zh: "几何图形本身即是图像，不用摄影。允许将照片处理成纯色双色调后作为形状填充。不使用渐变、柔和阴影与写实插画。",
    en: "Geometry is the imagery; photography is absent, though a photo may be reduced to a two-tone fill inside a shape. No gradients, soft shadows or realistic illustration.",
  },
  layout: {
    zh: "上限 1440px、12 栏、24px 间距。区块间距 192px，形状允许溢出容器边缘。首屏常见为巨型标题压在两个重叠形状上。整页滚动平滑，不做视差。",
    en: "Capped at 1440px over twelve columns with 24px gutters. Sections sit 192px apart, and shapes may bleed past the container edge. The hero is typically a giant headline riding on two overlapping shapes. Page scroll stays plain, with no parallax.",
  },
  dos: [
    { zh: "只用圆、方、三角三种形状", en: "Only circles, squares and triangles" },
    { zh: "圆角只有 0 或全圆两个值", en: "Radius is either 0 or fully round" },
    { zh: "标题 160px、行高 0.88", en: "Headlines at 160px with 0.88 leading" },
    { zh: "形状允许重叠 20% 到 40%", en: "Let shapes overlap by twenty to forty percent" },
    { zh: "所有元素贴齐 12 栏网格", en: "Snap everything to the twelve-column grid" },
    { zh: "最大色块不超过屏幕 40%", en: "The largest block stays under 40% of the screen" },
  ],
  donts: [
    { zh: "不要用中间圆角", en: "No intermediate radii" },
    { zh: "不要用渐变与柔和阴影", en: "No gradients or soft shadows" },
    { zh: "不要把文字放在形状下面", en: "Never put type beneath a shape" },
    { zh: "不要用超过四种形状", en: "No more than four shapes per screen" },
    { zh: "不要让三个色块面积相等", en: "Never give three blocks equal area" },
    { zh: "不要用写实插画或摄影做主视觉", en: "Do not lead with realistic illustration or photography" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      red: "#ff0000",
      blue: "#0000ff",
      yellow: "#ffff00",
      ochre: "#6c3b00",
    },
    prompts: [
      {
        zh: "做一个几何大胆风首屏：白底、12 栏网格。左上放一个占屏 35% 的黑色圆（无描边无阴影），右下放一个 20% 的红色正方，两者重叠 25%。标题 160px/900、行高 0.88、字距 -0.045em、纯黑，压在两个形状之上。下面一个纯黑直角按钮（14px/700、0.1em 字距、padding 16px 32px），hover 时黑白反转。",
        en: "Build a Geometric Bold hero: white ground on a twelve-column grid. A black circle covering 35% of the screen sits top-left with no stroke or shadow, a red square at 20% bottom-right, overlapping by a quarter. A 160px/900 headline runs at 0.88 leading and -0.045em tracking in black over both shapes. Below it, a square black button (14px/700, 0.1em tracking, 16px 32px padding) inverts on hover.",
      },
    ],
  },
  similar: [
    { name: "Bauhaus", why: { zh: "同源的几何与三原色，但更讲构成秩序", en: "Same geometry and primaries, though Bauhaus is stricter about composition" } },
    { name: "Swiss Style", why: { zh: "同样的网格纪律，但瑞士风格拒绝重叠与旋转", en: "Same grid discipline, though Swiss refuses overlap and rotation" } },
  ],
  completeness: "full",
};
