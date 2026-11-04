import type { DesignSpec } from "../types";

export const neoBrutalistPlayfulSpec: DesignSpec = {
  slug: "neo-brutalist-playful",
  name: "俏皮野兽派",
  nameEn: "Neo-Brutalist Playful",
  cover: "/styles/neo-brutalist-playful.svg",
  theme: "light",
  northStar: {
    zh: "黑框硬影的骨架不变，但换上五支糖果色，还允许歪一点。",
    en: "The same black frames and hard shadows, now wearing five candy colors and allowed to tilt.",
  },
  summary: {
    zh: "俏皮野兽派是新野兽派的年轻版本，骨架完全一致：4px 纯黑边框、零圆角、零模糊的偏移阴影。区别在三点——第一，阴影可以是彩色的，而且 hover 时会换色；第二，元素允许 -2 到 3 度的旋转，hover 时继续转；第三，强调色从四支扩到五支，允许同屏出现三种。动效用带回弹的弹簧曲线（300ms），按下时位移等于阴影偏移并归零。所有装饰必须用图标而不是 emoji，这是它区别于「随便玩」的地方。",
    en: "Neo-Brutalist Playful is the younger sibling of the brutalist system, and the skeleton is identical: 4px pure black borders, zero radius, zero-blur offset shadows. Three things change. Shadows may be colored, and they swap color on hover. Elements may rotate between -2 and 3 degrees, carrying on rotating on hover. And the accent set grows from four to five, with three allowed on one screen. Motion uses a spring curve at 300ms, and press translates exactly the shadow offset while zeroing it. All ornament is drawn with icons rather than emoji, which is what separates it from merely messing about.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink",
      value: "#000000",
      group: "brand",
      role: {
        zh: "所有边框、阴影的基准与文字。4px 描边是这套风格不可协商的部分。",
        en: "Every border, the shadow baseline and all text — the 4px stroke is non-negotiable.",
      },
      token: "--color-ink",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "卡片填充。纯白是为了让五支强调色都能压在上面。",
        en: "Card fill. Pure white lets all five accents sit on top without muddying.",
      },
      token: "--color-white",
    },
    {
      name: "珊瑚红",
      nameEn: "Coral",
      value: "#ff6b6b",
      group: "accent",
      role: {
        zh: "主行动与第一阴影色。出现频率最高的强调。",
        en: "Primary actions and the first shadow color — the most frequent accent.",
      },
      token: "--color-coral",
    },
    {
      name: "薄荷青",
      nameEn: "Mint",
      value: "#4ecdc4",
      group: "accent",
      role: {
        zh: "第二阴影色与链接，与珊瑚形成冷暖对位。",
        en: "The second shadow color and links, pairing cool against coral.",
      },
      token: "--color-mint",
    },
    {
      name: "阳光黄",
      nameEn: "Sunny",
      value: "#ffe66d",
      group: "accent",
      role: {
        zh: "hover 高亮与角标，用于装饰小块。",
        en: "Hover highlights and corner tags on small decorative blocks.",
      },
      token: "--color-sunny",
    },
    {
      name: "海沫绿",
      nameEn: "Seafoam",
      value: "#95e1d3",
      group: "accent",
      role: {
        zh: "分类色与状态标记，比薄荷更浅。",
        en: "Category and status marks, a lighter step than mint.",
      },
      token: "--color-seafoam",
    },
    {
      name: "蜜桃粉",
      nameEn: "Peach",
      value: "#f38181",
      group: "accent",
      role: {
        zh: "情绪化强调，用于收藏、喜欢与推荐角标。",
        en: "Emotional emphasis on saves, likes and recommendation tags.",
      },
      token: "--color-peach",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Helvetica, sans-serif",
      weights: [700, 900],
      sizes: [14, 16, 20, 28, 40, 56],
      lineHeight: { display: 1, heading: 1.1, body: 1.55 },
      tracking: { display: "-0.03em", label: "0.04em" },
      role: {
        zh: "全站唯一字体，只用 700 与 900。标题压到行高 1.0，让字块像方块。",
        en: "The only face, in 700 and 900 only. Headings run at 1.0 leading so the text block reads as a slab.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 56, lineHeight: 1, tracking: "-0.03em", token: "--text-display" },
    { role: "heading", weight: 900, size: 40, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 28, lineHeight: 1.15, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 20, lineHeight: 1.4, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 16, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 700, size: 14, lineHeight: 1.35, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
    sectionGap: 80,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "tags", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "页面与卡片" },
    { level: 1, name: "Coral Block", value: "#ff6b6b", purpose: "强调区块" },
  ],
  elevation: [
    { name: "Coral shadow", value: "6px 6px 0 #ff6b6b" },
    { name: "Mint shadow", value: "8px 8px 0 #4ecdc4" },
    { name: "Sunny hover", value: "8px 8px 0 #ffe66d" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Playful Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "珊瑚红填充、白字、4px 黑边、零圆角、6px 珊瑚或薄荷硬阴影，默认 -2 度旋转。16px/900、padding 12px 24px。hover 时上浮 4px、右移 1px、旋转到 3 度、阴影换成阳光黄并扩到 8px；按下时位移 6px 6px、缩放 0.95、旋转归零、阴影去除。过渡 300ms 弹簧曲线 cubic-bezier(0.34, 1.56, 0.64, 1)。右上角可放一个 12px 的黄色小方块（2px 黑边）作为角标。",
        en: "Coral fill, white text, a 4px black border, zero radius, a 6px coral or mint hard shadow, rotated -2 degrees by default. 16px/900, 12px 24px padding. Hover lifts 4px, shifts 1px right, rotates to 3 degrees and swaps the shadow to sunny yellow at 8px; press translates 6px 6px, scales 0.95, returns rotation to zero and removes the shadow. 300ms on cubic-bezier(0.34, 1.56, 0.64, 1). A 12px yellow square with a 2px border may sit as a corner tag.",
      },
      sizes: "padding 12px 24px; label 16px",
      states: "hover: rotate to 3deg, yellow shadow; active: translate 6px, scale 0.95, shadow none",
    },
    {
      name: "Tilted Card",
      role: { zh: "内容卡与功能卡", en: "Content and feature cards" },
      construction: {
        zh: "白底、4px 黑边、零圆角、8px 薄荷硬阴影，默认 -1 度旋转，内边距 28px。顶部放一排 16px 的彩色方块（各 2px 黑边）作为装饰序列。hover 时上浮 8px、旋转 2 度、阴影换成珊瑚红并扩到 12px。过渡 300ms 弹簧。",
        en: "White fill, a 4px black border, zero radius, an 8px mint hard shadow, rotated -1 degree by default, 28px padding. A row of 16px colored squares (each with a 2px border) runs across the top as ornament. Hover lifts 8px, rotates 2 degrees and swaps the shadow to coral at 12px. 300ms spring.",
      },
    },
    {
      name: "Square Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "白底、4px 黑边、零圆角、padding 12px 16px、16px/700 字。聚焦时加 4px 薄荷硬阴影且不改变尺寸；错误态把边框与阴影都换成珊瑚红。",
        en: "White fill, a 4px black border, zero radius, 12px 16px padding at 16px/700. Focus adds a 4px mint hard shadow without changing size; the error state switches both border and shadow to coral.",
      },
    },
    {
      name: "Icon Tag",
      role: { zh: "带图标的标签", en: "Tags with icons" },
      construction: {
        zh: "彩色填充（五支强调色之一）、2px 黑边、零圆角、12px/700 字、padding 4px 10px，左侧配 14px 线性图标。禁止用 emoji 或符号字符替代图标。",
        en: "Accent fill, a 2px black border, zero radius, 12px/700 text, 4px 10px padding, with a 14px line icon on the left. Emoji and symbol characters are forbidden in place of icons.",
      },
    },
    {
      name: "Sticker Cluster",
      role: { zh: "装饰性贴纸组合", en: "Decorative sticker clusters" },
      construction: {
        zh: "由 3 到 5 个 12px 到 24px 的小方块、圆点或星形组成，各自 2px 黑边，分别用不同强调色，整体旋转 -3 度。只用于卡片角落，不承载信息，单屏不超过两组。",
        en: "Three to five small squares, dots or stars between 12px and 24px, each with a 2px border in a different accent, the whole cluster rotated -3 degrees. Confined to card corners, carrying no information, at most two per screen.",
      },
    },
  ],
  imagery: {
    zh: "粗描边图形、几何贴纸、单色图标。允许把照片处理成高对比双色调后加黑框。不使用柔和摄影、渐变与 emoji 装饰。",
    en: "Heavy-stroke graphics, geometric stickers and monochrome icons. A photo may be flattened to a high-contrast duotone inside a black frame. No soft photography, gradients or emoji.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 24px，区块间距 80px。元素允许 -2 到 3 度旋转，同屏最多四个带旋转的元素。卡片垂直错落 8px。所有内容对齐 8px 网格的倍数，旋转不改变落点。",
    en: "Capped at 1200px with 24px padding, sections 80px apart. Elements may rotate between -2 and 3 degrees, with at most four rotated items per screen. Cards stagger 8px vertically. Everything snaps to multiples of the 8px grid; rotation never moves the landing point.",
  },
  dos: [
    { zh: "4px 黑边、零圆角、硬阴影", en: "4px black borders, zero radius, hard shadows" },
    { zh: "阴影可用彩色并在 hover 换色", en: "Shadows may be colored and swap on hover" },
    { zh: "旋转控制在 -2 到 3 度", en: "Keep rotation between -2 and 3 degrees" },
    { zh: "装饰只用图标，不用 emoji", en: "Ornament is icons only, never emoji" },
    { zh: "动效 300ms 带回弹", en: "Motion runs 300ms with overshoot" },
    { zh: "同屏最多三种强调色", en: "At most three accents on one screen" },
  ],
  donts: [
    { zh: "不要用任何圆角", en: "No border radius anywhere" },
    { zh: "不要用模糊阴影", en: "No blurred shadows" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要旋转超过 3 度", en: "Never rotate past 3 degrees" },
    { zh: "不要用 emoji 或符号字符", en: "No emoji or symbol characters" },
    { zh: "不要用柔和灰色", en: "No soft greys" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      coral: "#ff6b6b",
      mint: "#4ecdc4",
      sunny: "#ffe66d",
      peach: "#f38181",
    },
    prompts: [
      {
        zh: "做一个俏皮野兽派按钮：背景 #ff6b6b、白字、4px solid #000 边框、border-radius 0、900 字重 16px、padding 12px 24px、box-shadow 6px 6px 0 #4ecdc4、transform rotate(-2deg)。hover 时 translateY(-4px) rotate(3deg)、阴影换成 8px 8px 0 #ffe66d；active 时 translate(6px,6px) scale(0.95) rotate(0) 且阴影 none。transition 300ms cubic-bezier(0.34,1.56,0.64,1)。",
        en: "Build a playful brutalist button: background #ff6b6b, white text, a 4px solid #000 border, border-radius 0, weight 900 at 16px, 12px 24px padding, box-shadow 6px 6px 0 #4ecdc4 and transform rotate(-2deg). Hover applies translateY(-4px) rotate(3deg) with the shadow swapped to 8px 8px 0 #ffe66d; active applies translate(6px,6px) scale(0.95) rotate(0) with no shadow. Transition 300ms cubic-bezier(0.34,1.56,0.64,1).",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist", why: { zh: "同一骨架，但正经版不旋转、阴影只用黑色", en: "Same skeleton, though the serious version never rotates and keeps shadows black" } },
    { name: "Memphis", why: { zh: "同样彩色几何与俏皮，但孟菲斯用图案而非硬阴影", en: "Also colorful geometry and play, though Memphis uses pattern rather than hard shadow" } },
  ],
  completeness: "full",
};
