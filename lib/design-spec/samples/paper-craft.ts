import type { DesignSpec } from "../types";

export const paperCraftSpec: DesignSpec = {
  slug: "paper-craft",
  name: "纸艺手作",
  nameEn: "Paper Craft",
  cover: "/styles/paper-craft.svg",
  theme: "light",
  northStar: {
    zh: "一层层剪好的纸叠起来：每层都有一点阴影，每张都歪一点点。",
    en: "Cut paper stacked in layers, each casting a little shadow, each placed slightly askew.",
  },
  summary: {
    zh: "纸艺手作模拟剪纸与层叠纸片：纸白底（#fdf6ee）上放明快的纸艺色块（玫红 #e85d75、薄荷 #5cb8a5、明黄 #f5c040、蓝 #6b7fb5），每块纸片带 4px 固定的偏移硬阴影（黑 8%）表示它离桌面有一点距离，圆角取 12 到 16px 但配合 1 度的微旋转显得不完美，层叠靠多个绝对定位的 div 加不同阴影深度实现。它禁止深色背景、禁止发光与霓虹阴影、禁止金属与玻璃质感——纸不反光。",
    en: "Paper Craft imitates cut and layered paper: bright craft blocks (rose #e85d75, mint #5cb8a5, marigold #f5c040, blue #6b7fb5) on paper white (#fdf6ee), each piece carrying a fixed 4px offset hard shadow at 8% black to show it sits a little above the desk, radii of 12 to 16px paired with a one-degree rotation so nothing is perfect, and stacking built from absolutely positioned divs at different shadow depths. Dark grounds, glow and neon shadow, metal and glass are all refused — paper does not catch light that way.",
  },
  colors: [
    {
      name: "玫红纸",
      nameEn: "Rose Paper",
      value: "#e85d75",
      group: "brand",
      role: {
        zh: "第一纸色：主按钮、最上层的纸片与关键强调。",
        en: "The first paper on the primary button, the topmost sheet and key emphasis.",
      },
      token: "--color-rose-paper",
    },
    {
      name: "纸白",
      nameEn: "Paper White",
      value: "#fdf6ee",
      group: "surface",
      role: {
        zh: "页面底与最大的那张底纸。",
        en: "The page ground and the largest sheet underneath everything.",
      },
      token: "--color-paper-white",
    },
    {
      name: "薄荷纸",
      nameEn: "Mint Paper",
      value: "#5cb8a5",
      group: "accent",
      role: {
        zh: "第二纸色，用于次级区块与「自然」语义。",
        en: "The second paper on secondary blocks and nature semantics.",
      },
      token: "--color-mint-paper",
    },
    {
      name: "明黄纸",
      nameEn: "Marigold Paper",
      value: "#f5c040",
      group: "accent",
      role: {
        zh: "高亮与徽标，是四支纸色里最跳的一支。",
        en: "Highlights and badges — the loudest of the four papers.",
      },
      token: "--color-marigold-paper",
    },
    {
      name: "靛蓝纸",
      nameEn: "Indigo Paper",
      value: "#6b7fb5",
      group: "accent",
      role: {
        zh: "冷侧纸色，用于信息与第三层。",
        en: "The cool paper, on information and the third layer.",
      },
      token: "--color-indigo-paper",
    },
    {
      name: "墨",
      nameEn: "Ink",
      value: "#2d2d2d",
      group: "brand",
      role: {
        zh: "文字与剪纸轮廓。不是纯黑。",
        en: "Type and cut-paper outlines — not pure black.",
      },
      token: "--color-ink",
    },
  ],
  fonts: [
    {
      family: "Quicksand",
      substitute: "'Trebuchet MS', 'Segoe UI', sans-serif",
      weights: [500, 700],
      sizes: [13, 16, 20, 26, 34, 46],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.7 },
      tracking: { display: "0.01em", label: "0.08em" },
      role: {
        zh: "圆润无衬线或带手写感的字体。字形不能太尖，纸艺里没有尖锐的笔画。",
        en: "A rounded sans, optionally with a handwritten feel. Nothing too pointed — paper craft has no sharp strokes.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 46, lineHeight: 1.15, tracking: "0.01em", token: "--text-display" },
    { role: "heading", weight: 700, size: 34, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 26, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 20, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 500, size: 16, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 700, size: 13, lineHeight: 1.5, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1080,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "stickers", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Paper White", value: "#fdf6ee", purpose: "页面底" },
    { level: 1, name: "Rose Sheet", value: "#e85d75", purpose: "第一层纸片" },
    { level: 2, name: "Mint Sheet", value: "#5cb8a5", purpose: "第二层纸片" },
  ],
  elevation: [
    { name: "Paper layer 1", value: "4px 4px 0 rgba(0,0,0,0.08)" },
    { name: "Paper layer 2", value: "6px 6px 0 rgba(0,0,0,0.10)" },
    { name: "Button", value: "3px 3px 0 rgba(0,0,0,0.10)" },
  ],
  components: [
    {
      name: "Paper Card",
      role: { zh: "纸片卡片（核心组件）", en: "The paper card — the core component" },
      construction: {
        zh: "纸白或一支纸色填充、16px 圆角、无描边、内边距 28px，硬阴影 4px 4px 0 黑 8%。整张卡 rotate(1deg)。hover 时上浮 2px、阴影扩到 6px 且旋转归零。过渡 300ms ease-out。",
        en: "Paper white or one paper color, 16px radius, no border, 28px padding, hard shadow 4px 4px 0 at 8% black. The whole card sits at rotate(1deg). Hover lifts 2px, widens the shadow to 6px and returns the rotation to zero. 300ms ease-out.",
      },
      states: "hover: lift 2px, rotation to 0",
    },
    {
      name: "Stacked Sheets",
      role: { zh: "层叠纸片", en: "The stacked sheets" },
      construction: {
        zh: "三层绝对定位的圆角矩形，每层比上一层偏移 8px 并加深阴影（4px → 6px → 8px），角度各异（-1、0、+1.5 度）。只有最上层承载内容，其余两层填不同纸色。层数固定三层，再多会显得脏。",
        en: "Three absolutely positioned rounded rectangles, each offset 8px from the one above with a deeper shadow (4px, then 6px, then 8px) and its own angle (-1, 0, +1.5 degrees). Only the top layer holds content; the two beneath fill with different papers. Three layers exactly — a fourth turns muddy.",
      },
    },
    {
      name: "Craft Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "纸色填充、纸白文字、12px 圆角、无描边、16px/700、padding 12px 28px，硬阴影 3px 3px 0 黑 10%。hover 时阴影扩到 5px 并上浮 1px；按下时阴影归零并下沉 1px。过渡 150ms ease-out。",
        en: "A paper fill, paper white text, 12px radius, no border, 16px/700, 12px 28px padding, hard shadow 3px 3px 0 at 10% black. Hover widens the shadow to 5px and lifts 1px; press zeroes the shadow and sinks 1px. 150ms ease-out.",
      },
      sizes: "padding 12px 28px; label 16px",
      states: "hover: shadow 5px, lift 1px; active: shadow none",
    },
    {
      name: "Cut Edge",
      role: { zh: "剪边装饰", en: "The cut edge" },
      construction: {
        zh: "用 clip-path 的多边形在纸片的一边做出手工剪痕（5 到 8 个顶点，各点偏移 2 到 4px），或用一个半圆的扇贝边重复。它必须只有一边有剪痕——四边都剪会失去「剪」的感觉。",
        en: "A clip-path polygon cuts a handmade edge along one side of a sheet (five to eight vertices offset 2 to 4px), or a repeated half-circle scallop does it. Only one side is cut — cutting all four loses the sense of scissors.",
      },
    },
    {
      name: "Corner Sticker",
      role: { zh: "角贴与圆点贴纸", en: "Corner stickers and dot labels" },
      construction: {
        zh: "32 到 56px 的圆或半圆，填一支纸色，带 3px 3px 0 黑 10% 的硬阴影，压在纸片角上并跨过边缘 8px。它是最能表现「手工贴上去」的元素，单屏 2 到 4 处。",
        en: "A 32 to 56px circle or half circle in one paper color with a 3px 3px 0 shadow at 10%, sitting on a sheet corner and overlapping the edge by 8px. It is the clearest sign that something was stuck on by hand; two to four per screen.",
      },
    },
  ],
  imagery: {
    zh: "剪纸插画、分层纸片构图、纸纹理摄影。图像可以是多层纸片拼出的场景，必须有明确的手工剪痕。不使用写实摄影、金属与玻璃质感、发光图像。",
    en: "Paper-cut illustration, layered sheet compositions, paper-texture photography. A scene may be assembled from cut layers as long as the scissor marks are legible. No realistic photography, metal or glass, or glowing imagery.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 96px。元素允许 ±1.5 度旋转与 8px 错位。层叠深度最多三层。整页保持纸白底，色块像贴上去的纸片。",
    en: "Capped at 1080px with 24px padding, sections 96px apart. Elements may rotate up to 1.5 degrees and offset by 8px, with stacking capped at three layers. The page stays paper white while the blocks read as sheets glued on.",
  },
  dos: [
    { zh: "纸白底，纸色块贴上去", en: "Paper white ground with paper blocks stuck on" },
    { zh: "4px 固定偏移硬阴影表示离桌面", en: "A fixed 4px offset shadow shows the piece's height" },
    { zh: "圆角 12 到 16px 配 1 度微旋转", en: "Radius 12 to 16px with a one-degree rotation" },
    { zh: "层叠最多三层，阴影逐层加深", en: "Three layers at most, shadow deepening per layer" },
    { zh: "只有一边有剪痕", en: "Only one side carries the cut edge" },
    { zh: "角贴贴纸跨过边缘 8px", en: "Corner stickers overlap the edge by 8px" },
  ],
  donts: [
    { zh: "不要用深色或黑色背景", en: "No dark or black grounds" },
    { zh: "不要用发光或霓虹阴影", en: "No glow or neon shadow" },
    { zh: "不要用金属或玻璃质感", en: "No metal or glass" },
    { zh: "不要四边都做剪痕", en: "Never cut all four edges" },
    { zh: "不要层叠超过三层", en: "Never stack past three layers" },
    { zh: "不要用尖锐字形", en: "No pointed letterforms" },
  ],
  promptGuide: {
    quickColors: {
      text: "#2d2d2d",
      background: "#fdf6ee",
      rose: "#e85d75",
      mint: "#5cb8a5",
      marigold: "#f5c040",
      indigo: "#6b7fb5",
    },
    prompts: [
      {
        zh: "做一个纸艺手作卡片：纸白 #fdf6ee 填充、16px 圆角、无边框、内边距 28px、box-shadow 4px 4px 0 rgba(0,0,0,0.08)、transform rotate(1deg)。标题 34px/700、色 #2d2d2d；正文 16px/500、行高 1.7。卡片下方垫两层纸片：各偏移 8px、阴影依次 6px 与 8px、旋转 -1 度与 1.5 度、填 #5cb8a5 与 #f5c040。左上角贴一个 40px 的玫红 #e85d75 圆形角贴，跨过边缘 8px，带 3px 3px 0 rgba(0,0,0,0.1)。hover 时卡片上浮 2px、旋转归零。页面底色 #fdf6ee。",
        en: "Build a paper craft card: #fdf6ee fill, 16px radius, no border, 28px padding, box-shadow 4px 4px 0 rgba(0,0,0,0.08) and transform rotate(1deg). The title runs 34px/700 in #2d2d2d with body at 16px/500 on 1.7 leading. Two sheets sit underneath, each offset 8px with shadows of 6px and 8px, rotated -1 and 1.5 degrees, filled #5cb8a5 and #f5c040. A 40px rose #e85d75 circle sticks to the top-left, overlapping the edge by 8px with a 3px 3px 0 rgba(0,0,0,0.1) shadow. Hover lifts the card 2px and returns its rotation to zero. The page ground is #fdf6ee.",
      },
    ],
  },
  similar: [
    { name: "Collage Art", why: { zh: "同样剪贴，但拼贴用撕边与混合字体，纸艺用整齐剪边与层叠", en: "Both cut-and-paste, though collage uses torn edges and mixed type while paper craft uses clean cuts and layering" } },
    { name: "Claymorphism", why: { zh: "同样柔和体积感，但粘土是凸起的圆块，纸艺是薄的纸片", en: "Both soft volume, though clay is raised rounded mass while paper is thin sheet" } },
  ],
  completeness: "full",
};
