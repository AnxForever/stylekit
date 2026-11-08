import type { DesignSpec } from "../types";

export const solarpunkSpec: DesignSpec = {
  slug: "solarpunk",
  name: "太阳朋克",
  nameEn: "Solarpunk",
  cover: "/styles/solarpunk.svg",
  theme: "light",
  northStar: {
    zh: "乐观的生态未来：植物与技术不是对立，而是长在一起。",
    en: "An optimistic eco-future where plants and technology are not opposed — they grow together.",
  },
  summary: {
    zh: "太阳朋克是对赛博朋克的正面回答：不要霓虹废土，要阳光、植物与共居的技术。视觉上它靠三件事——温暖浅色的底（#fef3c7 或薄荷绿的白）、叶绿与金黄这对主色、以及大圆角与有机曲线（没有一条边是完全直的）。渐变在这里是合法的，而且必须是从绿到金的暖向渐变。它禁止纯黑背景、尖锐直角、冷工业元素与霓虹发光，也禁止任何废土或反乌托邦的暗示。",
    en: "Solarpunk is the optimistic answer to cyberpunk: not neon wasteland but sunlight, plants and technology living together. Three things carry it — a warm light ground (#fef3c7 or a mint-tinted white), a pair of leaf green and golden yellow, and generous radii with organic curves, since no edge is perfectly straight. Gradients are legal here and must run warm, from green into gold. The style refuses black grounds, sharp corners, cold industrial elements, neon glow and any hint of wasteland or dystopia.",
  },
  colors: [
    {
      name: "叶绿",
      nameEn: "Leaf",
      value: "#4ade80",
      group: "brand",
      role: {
        zh: "主色：生长、行动与植物元素。整套风格的乐观感来自它。",
        en: "The primary for growth, actions and plant elements — the optimism comes from this green.",
      },
      token: "--color-leaf",
    },
    {
      name: "金黄",
      nameEn: "Golden",
      value: "#fbbf24",
      group: "accent",
      role: {
        zh: "阳光与能量，几乎总与叶绿同现，形成暖向渐变。",
        en: "Sunlight and energy, almost always paired with leaf green in a warm gradient.",
      },
      token: "--color-golden",
    },
    {
      name: "奶油光",
      nameEn: "Cream Light",
      value: "#fef3c7",
      group: "surface",
      role: {
        zh: "页面底。暖金色调的浅底，让绿与蓝都显得温和。",
        en: "The page ground — a warm gold-tinted light that softens every green and blue.",
      },
      token: "--color-cream-light",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#38bdf8",
      group: "accent",
      role: {
        zh: "水与清洁能源，用于数据与次级元素。",
        en: "Water and clean energy, on data and secondary elements.",
      },
      token: "--color-sky",
    },
    {
      name: "赭石",
      nameEn: "Ochre",
      value: "#a16207",
      group: "accent",
      role: {
        zh: "文字与描边。深赭代替黑，避免任何冷硬感。",
        en: "Text and strokes — deep ochre replaces black, avoiding any cold hardness.",
      },
      token: "--color-ochre",
    },
    {
      name: "薰衣草",
      nameEn: "Lavender",
      value: "#b692ff",
      group: "accent",
      role: {
        zh: "科技与社区语义，出现频率最低，用于区分机械部件。",
        en: "Technology and community semantics, used least, marking the mechanical parts.",
      },
      token: "--color-lavender",
    },
  ],
  fonts: [
    {
      family: "Nunito",
      substitute: "'Segoe UI', 'PingFang SC', system-ui, sans-serif",
      weights: [400, 600, 700],
      sizes: [13, 15, 18, 24, 32, 44],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.7 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。圆润无衬线的字形与有机曲线同源，行高 1.7 让长文易读。",
        en: "The only face. Its rounded forms share a source with the organic curves, and 1.7 leading keeps long copy easy.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 44, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 700, size: 32, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 24, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 600, size: 13, lineHeight: 1.45, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1160,
    sectionGap: 112,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "16px" },
    { element: "media", value: "32px" },
  ],
  surfaces: [
    { level: 0, name: "Cream Light", value: "#fef3c7", purpose: "页面底" },
    { level: 1, name: "Mint White", value: "#f0fdf4", purpose: "卡片与区块" },
    { level: 2, name: "Leaf Wash", value: "rgba(74,222,128,0.12)", purpose: "高亮区块" },
  ],
  elevation: [
    { name: "Card", value: "0 12px 32px rgba(74,222,128,0.18)" },
    { name: "Card hover", value: "0 20px 48px rgba(74,222,128,0.26)" },
    { name: "Button", value: "0 8px 20px rgba(251,191,36,0.30)" },
  ],
  components: [
    {
      name: "Sun Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "叶绿到金黄的 135 度渐变填充、白字、999px 全圆角、无描边，15px/700、padding 12px 28px，阴影 0 8px 20px 金黄 30%。hover 时渐变角度转 180 度（模拟光线移动）、阴影扩到 28px、上浮 2px；按下缩放 0.98。过渡 300ms ease-out。",
        en: "A 135-degree leaf-to-golden gradient fill, white text, fully rounded, no border, 15px/700, 12px 28px padding, shadow 0 8px 20px at 30% golden. Hover rotates the gradient to 180 degrees to imply moving light, widens the shadow to 28px and lifts 2px; press scales 0.98. 300ms ease-out.",
      },
      sizes: "padding 12px 28px; label 15px",
      states: "hover: gradient rotates, lift 2px; active: scale 0.98",
    },
    {
      name: "Organic Card",
      role: { zh: "内容卡与项目卡", en: "Content and project cards" },
      construction: {
        zh: "薄荷白填充、24px 圆角、1px 叶绿 15% 描边、内边距 28px，阴影 0 12px 32px 叶绿 18%。左上角配一个 48px 的圆形图标底（叶绿 12%）。hover 时上浮 4px、阴影扩到 48px。圆角不对称也是允许的（如 24px 与 32px 混用），但同一卡片内保持一致。",
        en: "Mint white fill, 24px radius, a 1px leaf border at 15%, 28px padding, shadow 0 12px 32px at 18% leaf. A 48px circular icon bed at 12% leaf sits top-left. Hover lifts 4px and widens the shadow to 48px. Asymmetric radii are permitted (24px against 32px), as long as one card stays consistent.",
      },
    },
    {
      name: "Soft Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "薄荷白填充、16px 圆角、1px 叶绿 20% 描边、padding 12px 18px、15px 字，聚焦时描边转叶绿并加 4px 的叶绿 20% 外环。占位符赭石 45%。",
        en: "Mint white fill, 16px radius, a 1px leaf border at 20%, 12px 18px padding at 15px, with focus turning the border leaf green and adding a 4px ring at 20%. The placeholder sits at 45% ochre.",
      },
    },
    {
      name: "Plant Motif",
      role: { zh: "植物与有机装饰", en: "Plant and organic ornament" },
      construction: {
        zh: "单线条植物图形（藤蔓、叶片、太阳能板叶片混合），stroke 2px、颜色叶绿或赭石、尺寸 64px 到 160px。可沿卡片边缘或区块之间蜿蜒，允许超出容器 16px。单屏不超过三处。",
        en: "Single-stroke botanical forms (vines, leaves, solar-panel-leaf hybrids) at a 2px stroke in leaf green or ochre, sized 64px to 160px. They may wind along a card edge or between blocks and bleed 16px past the container. At most three per screen.",
      },
    },
    {
      name: "Warm Gradient Band",
      role: { zh: "渐变区块与分隔", en: "Gradient bands and dividers" },
      construction: {
        zh: "从叶绿到金黄的 120 度渐变，高度 120px 到 200px，圆角 32px 或全宽无圆角。用于区块之间的过渡，替代留白。渐变上可叠一层 8% 的叶脉纹理。",
        en: "A 120-degree leaf-to-golden gradient, 120px to 200px tall, either at 32px radius or full width with none. It carries the transition between sections instead of whitespace, optionally with an 8% leaf-vein texture over it.",
      },
    },
  ],
  imagery: {
    zh: "植物与技术的混合插画：太阳能板长成叶片形状、楼顶有花园、藤蔓绕着结构。允许自然光摄影并加暖色调。不使用冷工业摄影、废土场景与霓虹灯效。",
    en: "Illustration that fuses plant and machine: solar panels grown into leaf shapes, rooftop gardens, vines wrapping structure. Warm-toned natural-light photography works too. No cold industrial photography, wasteland scenes or neon.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 24px，区块间距 112px。允许非对称与曲线边界（区块底部可以用弧形切出），元素沿轻微弧线排列。卡片之间 20px，整体密度中等偏松。",
    en: "Capped at 1160px with 24px padding, sections 112px apart. Asymmetry and curved boundaries are welcome — a section may end on an arc — and elements may follow a slight curve. Cards sit 20px apart at a medium-to-loose density.",
  },
  dos: [
    { zh: "暖浅底，不用黑或深色", en: "Warm light grounds, never black or dark" },
    { zh: "叶绿与金黄成对，用暖向渐变", en: "Pair leaf green with golden in warm gradients" },
    { zh: "大圆角与有机曲线", en: "Generous radii and organic curves" },
    { zh: "植物元素与技术并置", en: "Set plant forms beside technology" },
    { zh: "文字用深赭代替黑", en: "Use deep ochre instead of black for text" },
    { zh: "阴影带绿调而不是灰调", en: "Shadows carry a green cast rather than grey" },
  ],
  donts: [
    { zh: "不要用纯黑或暗色主题", en: "No pure black or dark themes" },
    { zh: "不要用尖锐直角", en: "No sharp corners" },
    { zh: "不要用冷工业风元素", en: "No cold industrial elements" },
    { zh: "不要用高对比霓虹发光", en: "No high-contrast neon glow" },
    { zh: "不要出现废土或反乌托邦元素", en: "No wasteland or dystopian imagery" },
    { zh: "不要用灰暗压抑的配色", en: "No grey or oppressive palettes" },
  ],
  promptGuide: {
    quickColors: {
      text: "#a16207",
      background: "#fef3c7",
      card: "#f0fdf4",
      leaf: "#4ade80",
      golden: "#fbbf24",
      sky: "#38bdf8",
    },
    prompts: [
      {
        zh: "做一个太阳朋克卡片：背景 #f0fdf4、24px 圆角、1px rgba(74,222,128,0.15) 描边、内边距 28px、阴影 0 12px 32px rgba(74,222,128,0.18)。左上角 48px 圆形图标底（rgba(74,222,128,0.12)）。标题 24px/600 #a16207，正文 15px/400、行高 1.7。主按钮用 linear-gradient(135deg, #4ade80, #fbbf24)、999px 圆角、白字、阴影 0 8px 20px rgba(251,191,36,0.3)。页面底色 #fef3c7。",
        en: "Build a solarpunk card: background #f0fdf4, 24px radius, a 1px rgba(74,222,128,0.15) border, 28px padding, shadow 0 12px 32px rgba(74,222,128,0.18). A 48px circular icon bed at rgba(74,222,128,0.12) sits top-left. Title at 24px/600 in #a16207, body at 15px/400 on 1.7 leading. The primary button uses linear-gradient(135deg, #4ade80, #fbbf24), fully rounded, white text, shadow 0 8px 20px rgba(251,191,36,0.3). The page ground is #fef3c7.",
      },
    ],
  },
  similar: [
    { name: "Natural Organic", why: { zh: "同样自然取材，但太阳朋克明确站在「技术与自然共生」这一侧", en: "Also drawn from nature, though solarpunk explicitly sides with technology living alongside it" } },
    { name: "Claymorphism", why: { zh: "同样圆润柔和，但粘土是玩具感、太阳朋克是生态叙事", en: "Also rounded and soft, though clay reads as toy while solarpunk tells an ecological story" } },
  ],
  completeness: "full",
};
