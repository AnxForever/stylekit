import type { DesignSpec } from "../types";

export const watercolorStyleSpec: DesignSpec = {
  slug: "watercolor-style",
  name: "水彩画风",
  nameEn: "Watercolor Style",
  cover: "/styles/watercolor-style.svg",
  theme: "light",
  northStar: {
    zh: "纸上的三层晕染：颜色从不描边，只在边缘化开。",
    en: "Three washes on paper: color never draws an edge, it only bleeds at the border.",
  },
  summary: {
    zh: "水彩画风的关键是「没有硬边」。所有色块都是半径极大的模糊圆，彼此叠压形成晕染；卡片的渐变从对角淡入淡出，边缘再叠一层 1px 的极淡描边暗示纸张。底色是暖纸白（#faf8f5），主色是偏灰的蓝（#4a6fa5），标题用衬线斜体，正文行高拉到 1.7。它不使用投影来分层，而是靠「颜色在纸上扩散的面积」——hover 时卡片内部的色斑放大并加深，像水在湿纸上继续晕开。",
    en: "The defining rule of watercolor is that nothing has a hard edge. Every color field is a heavily blurred circle, and they overlap into washes; card gradients fade in and out diagonally, with a 1px hairline on top to suggest the paper's edge. The ground is warm paper white (#faf8f5), the primary is a muted blue (#4a6fa5), headings are serif italic, and body leading stretches to 1.7. Layering never uses shadow — it uses the area a color occupies on the paper. On hover the internal wash scales up and deepens, as if water were still spreading.",
  },
  colors: [
    {
      name: "水彩蓝",
      nameEn: "Watercolor Blue",
      value: "#4a6fa5",
      group: "brand",
      role: {
        zh: "主行动、标题与文字。偏灰的蓝，像颜料被水稀释过一次。",
        en: "Primary actions, headings and text — a greyed blue, as if the pigment were diluted once.",
      },
      token: "--color-watercolor-blue",
    },
    {
      name: "纸白",
      nameEn: "Paper White",
      value: "#faf8f5",
      group: "surface",
      role: {
        zh: "页面画布。暖白，用来模拟水彩纸的底色。",
        en: "The canvas — a warm white standing in for watercolor paper.",
      },
      token: "--color-paper-white",
    },
    {
      name: "蜜桃",
      nameEn: "Peach",
      value: "#e8a87c",
      group: "accent",
      role: {
        zh: "暖色晕染的第一层，出现在标题区与卡片一角。",
        en: "The first warm wash, appearing behind headlines and in a card's corner.",
      },
      token: "--color-peach",
    },
    {
      name: "水青",
      nameEn: "Water Teal",
      value: "#85cdca",
      group: "accent",
      role: {
        zh: "冷色晕染，与蜜桃叠压成中间色。",
        en: "The cool wash, overlapping peach to produce the intermediate tone.",
      },
      token: "--color-water-teal",
    },
    {
      name: "玫瑰",
      nameEn: "Rose",
      value: "#c38d94",
      group: "accent",
      role: {
        zh: "第三层晕染，透明度最低，只用来加深中心。",
        en: "The third wash at the lowest opacity, used only to deepen a centre.",
      },
      token: "--color-rose",
    },
    {
      name: "赭",
      nameEn: "Ochre",
      value: "#d4a373",
      group: "accent",
      role: {
        zh: "纸边与分隔，多用于 10% 到 20% 透明度的细线。",
        en: "Paper edges and dividers, mostly as 10% to 20% hairlines.",
      },
      token: "--color-ochre",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 500],
      sizes: [20, 26, 34, 44, 60],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.7 },
      tracking: { display: "-0.005em", label: "0.12em" },
      role: {
        zh: "标题、引文与导航字标，多用斜体。衬线斜体是水彩最自然的文字表情。",
        en: "Headings, quotes and the wordmark, usually italic. Serif italic is the most natural voice for watercolor.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, sans-serif",
      weights: [300, 400],
      sizes: [13, 15, 17],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.7 },
      tracking: { display: "0", label: "0.12em" },
      role: {
        zh: "正文与说明，保持中性，避免与衬线标题抢戏。",
        en: "Body and captions, kept neutral so the serif keeps the stage.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Cormorant Garamond", weight: 400, size: 60, lineHeight: 1.2, token: "--text-display" },
    { role: "heading", font: "Cormorant Garamond", weight: 400, size: 44, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", font: "Cormorant Garamond", weight: 500, size: 26, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 300, size: 17, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 15, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Inter", weight: 400, size: 13, lineHeight: 1.5, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128, 192],
    maxWidth: 1080,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "16px" },
    { element: "washes", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Paper White", value: "#faf8f5", purpose: "页面画布" },
    { level: 1, name: "Wash Card", value: "rgba(255,255,255,0.60)", purpose: "卡片与浮层" },
  ],
  elevation: [
    { name: "Card", value: "0 10px 30px rgba(74,111,165,0.10)" },
    { name: "Card hover", value: "0 12px 40px rgba(74,111,165,0.18)" },
  ],
  components: [
    {
      name: "Wash Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "蓝到水青的横向渐变（80% 不透明）、白字、999px 全圆角、无描边。字级 17px、衬线、padding 16px 32px，阴影 0 10px 30px 蓝 20%。hover 时渐变升到 90%、阴影扩到 40px、上浮 2px；按下缩放 0.98 并让阴影收回到 10px。过渡 500ms ease-in-out。",
        en: "A horizontal blue-to-teal gradient at 80% opacity, white text, fully rounded at 999px, no border. 17px serif type, 16px 32px padding, shadow 0 10px 30px at 20% blue. Hover raises the gradient to 90%, widens the shadow to 40px and lifts 2px; press scales 0.98 and pulls the shadow back to 10px. 500ms ease-in-out.",
      },
      states: "hover: gradient 80%→90%, lift 2px; active: scale 0.98",
    },
    {
      name: "Wash Card",
      role: { zh: "作品卡与内容卡", en: "Work and content card" },
      construction: {
        zh: "蜜桃 20% 到白到水青 20% 的三段对角渐变、24px 圆角、1px 蓝 10% 描边、内边距 32px、10px 模糊，内部右上角放一块 96px 的水青 30% 模糊圆。hover 时两端渐变升到 30%、圆斑放大 1.5 倍并加深到 40%、阴影扩到 40px。过渡 500ms，圆斑 700ms。",
        en: "A three-stop diagonal gradient from 20% peach through white to 20% teal, 24px radius, a 1px border at 10% blue, 32px padding, 10px blur, with a 96px blurred circle of 30% teal in the top-right corner. Hover raises both gradient ends to 30%, scales the circle 1.5x to 40% and widens the shadow to 40px. 500ms, with 700ms on the circle.",
      },
    },
    {
      name: "Wash Input",
      role: { zh: "表单与写作输入", en: "Forms and writing input" },
      construction: {
        zh: "白 60% 填充、1px 蓝 20% 描边、16px 圆角、padding 16px 20px、15px 衬线。占位符用蓝 40%。聚焦时描边升到 40%、填充升到 80%、加一层 0 10px 30px 蓝 10% 的柔光。过渡 300ms。",
        en: "White at 60% fill, a 1px border at 20% blue, 16px radius, 16px 20px padding at 15px serif. The placeholder sits at 40% blue. Focus raises the border to 40%, the fill to 80%, and adds a 0 10px 30px glow at 10% blue. 300ms.",
      },
    },
    {
      name: "Color Wash",
      role: { zh: "背景晕染层", en: "Background wash layer" },
      construction: {
        zh: "二到三块直径 256px 到 384px 的圆，填充蜜桃、水青或玫瑰的 20% 到 30%，模糊 64px，随意分布在页面两角与中心，彼此可叠压。不使用动画。整页不超过三块。",
        en: "Two or three circles between 256px and 384px across, filled with 20% to 30% peach, teal or rose, blurred 64px, scattered across the corners and centre and allowed to overlap. No animation, and never more than three per page.",
      },
    },
  ],
  imagery: {
    zh: "水彩原作、晕染质感、纸质纹理。允许在照片上叠一层纸纹并降低饱和度。不使用锐利摄影、硬边图形、3D 渲染与霓虹色。",
    en: "Original watercolor, wash texture and paper grain. A photo may take a paper overlay and reduced saturation. No sharp photography, hard-edged graphics, 3D renders or neon.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 32px，区块间距 128px。版面留白极多，文字块宽度控制在 34em 以内。允许标题跨栏并与晕染圆叠压。图片可用 24px 圆角或不规则裁切。",
    en: "Capped at 1080px with 32px padding, sections 128px apart. Whitespace is abundant and text blocks stay under 34em. Headings may span columns and overlap a wash circle. Images take 24px radii or irregular crops.",
  },
  dos: [
    { zh: "所有色块都是大半径模糊圆，没有硬边", en: "Every color field is a heavily blurred circle with no hard edge" },
    { zh: "标题用衬线斜体", en: "Set headings in serif italic" },
    { zh: "hover 让色斑放大与加深", en: "Hover scales and deepens the wash" },
    { zh: "纸白底，不用冷白", en: "Ground in paper white, never cool white" },
    { zh: "每页晕染圆不超过三块", en: "At most three wash circles per page" },
    { zh: "动效 500ms，色斑 700ms", en: "Motion at 500ms, with 700ms on the washes" },
  ],
  donts: [
    { zh: "不要用硬边描边或锐利几何", en: "No hard borders or sharp geometry" },
    { zh: "不要用高饱和原色", en: "No saturated primaries" },
    { zh: "不要用投影作为主要分层手段", en: "Do not use shadow as the main layering device" },
    { zh: "不要在正文用衬线加粗", en: "Never bold the body serif" },
    { zh: "不要让晕染遮住文字", en: "Never let a wash cover the text" },
    { zh: "不要用三块以上的晕染叠在一起", en: "Do not stack more than three washes" },
  ],
  promptGuide: {
    quickColors: {
      text: "#4a6fa5",
      background: "#faf8f5",
      card: "rgba(255,255,255,0.60)",
      accent: "#e8a87c",
      secondary: "#85cdca",
      border: "rgba(74,111,165,0.20)",
    },
    prompts: [
      {
        zh: "做一个水彩卡片：background 用 135 度渐变 linear-gradient(135deg, rgba(232,168,124,0.2), #ffffff, rgba(133,205,202,0.2))，24px 圆角、1px rgba(74,111,165,0.1) 描边、内边距 32px、backdrop-blur 10px。右上角放一个 96px 的 rgba(133,205,202,0.3) 圆形并 blur(40px)。hover 时两端渐变升到 0.3、圆斑 scale(1.5) 并加深到 0.4，过渡 700ms。页面底色 #faf8f5，标题用衬线斜体 #4a6fa5。",
        en: "Build a watercolor card: background linear-gradient(135deg, rgba(232,168,124,0.2), #ffffff, rgba(133,205,202,0.2)), 24px radius, 1px rgba(74,111,165,0.1) border, 32px padding, backdrop-blur 10px. A 96px circle of rgba(133,205,202,0.3) with blur(40px) sits top-right. On hover both gradient ends rise to 0.3 and the circle scales 1.5x to 0.4, over 700ms. The page ground is #faf8f5 with serif italic headings in #4a6fa5.",
      },
    ],
  },
  similar: [
    { name: "Impressionist Oil", why: { zh: "同样以笔触与晕染为主要语言，但油画更厚更重", en: "Also speaks through strokes and washes, though oil paint is thicker and heavier" } },
    { name: "Natural Organic", why: { zh: "同样的纸感与暖调，但水彩更强调流动", en: "Same paper feel and warmth, though watercolor emphasises flow" } },
  ],
  completeness: "full",
};
