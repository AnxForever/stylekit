import type { DesignSpec } from "../types";

export const neoBrutalistSoftSpec: DesignSpec = {
  slug: "neo-brutalist-soft",
  name: "柔和野兽派",
  nameEn: "Neo-Brutalist Soft",
  cover: "/styles/neo-brutalist-soft.svg",
  theme: "light",
  northStar: {
    zh: "骨架仍是硬阴影与零圆角，但换成灰边、灰影与粉彩色。",
    en: "Still hard shadows and square corners, now with grey borders, grey shadows and pastel color.",
  },
  summary: {
    zh: "柔和野兽派保留了野兽派的骨架：零圆角、硬偏移阴影、按下时位移等于偏移并归零。但它把三个最刺眼的参数降了一档——边框从 4px 纯黑降到 2px gray-800，阴影从纯黑降到 20% 的黑，配色从霓虹换成粉彩（pink-400 而非 #ff006e）。结果是一套可以放进企业产品里的野兽派：仍然有物理感，但不再喊叫。底色也从纯白退到浅灰。",
    en: "Neo-Brutalist Soft keeps the brutalist skeleton: zero radius, hard offset shadows, and a press that translates exactly the offset while zeroing it. Three of the loudest parameters drop one step — borders from 4px pure black to 2px gray-800, shadows from solid black to 20% black, and color from neon to pastel (pink-400 rather than #ff006e). The result is a brutalist system that can live inside a product: still physical, no longer shouting. The ground also steps back from pure white to light grey.",
  },
  colors: [
    {
      name: "深灰",
      nameEn: "Deep Grey",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "文字、边框与阴影基准。比纯黑柔一档，长时间阅读更舒服。",
        en: "Text, borders and the shadow baseline — one step softer than pure black for longer reading.",
      },
      token: "--color-deep-grey",
    },
    {
      name: "浅灰底",
      nameEn: "Light Ground",
      value: "#f5f5f5",
      group: "surface",
      role: {
        zh: "页面画布。不用纯白，让白卡片有依托。",
        en: "Page canvas. Not pure white, so white cards have something to sit on.",
      },
      token: "--color-light-ground",
    },
    {
      name: "卡白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "卡片填充，只在浅灰底上出现。",
        en: "Card fill, appearing only above the light grey ground.",
      },
      token: "--color-card-white",
    },
    {
      name: "柔粉",
      nameEn: "Soft Pink",
      value: "#f472b6",
      group: "accent",
      role: {
        zh: "主强调与选中态。pink-400 的柔和版，不做主按钮的大面积填充。",
        en: "Primary emphasis and selection — the pink-400 soft version, never a large button fill.",
      },
      token: "--color-soft-pink",
    },
    {
      name: "青柠",
      nameEn: "Lime",
      value: "#a3e635",
      group: "accent",
      role: {
        zh: "hover 高亮与成功状态，用于小面积标签。",
        en: "Hover highlights and success, on small labels.",
      },
      token: "--color-lime",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#38bdf8",
      group: "accent",
      role: {
        zh: "链接与信息标记，与柔粉形成冷暖对位。",
        en: "Links and informational marks, pairing cool against the pink.",
      },
      token: "--color-sky",
    },
    {
      name: "琥珀",
      nameEn: "Amber",
      value: "#fbbf24",
      group: "accent",
      role: {
        zh: "提醒与高亮底，出现频率最低。",
        en: "Nudges and highlight grounds, used least.",
      },
      token: "--color-amber",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [500, 700, 800],
      sizes: [13, 15, 18, 24, 32, 44],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.55 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "全站唯一字体，500 到 800 三档。标题 800 但不全大写，这是与硬核野兽派的分界。",
        en: "The only face, in 500 through 800. Headings take 800 without uppercase, which is where it separates from the hard version.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 800, size: 44, lineHeight: 1.1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 800, size: 32, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 700, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 500, size: 15, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 700, size: 13, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 80,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "badges", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Light Ground", value: "#f5f5f5", purpose: "页面画布" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "卡片与面板" },
  ],
  elevation: [
    { name: "Soft hard shadow", value: "4px 4px 0 rgba(0,0,0,0.20)" },
    { name: "Hover", value: "6px 6px 0 rgba(0,0,0,0.24)" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Soft Block Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "白底、深灰文字、2px gray-800 描边、零圆角、4px 灰色硬阴影（黑 20%），15px/700、padding 12px 24px。hover 时填充换成柔粉、文字转白、阴影扩到 6px，不上浮也不过量位移；按下时位移 4px 4px 且阴影归零。过渡 150ms ease-out。",
        en: "White fill, deep grey text, a 2px gray-800 border, zero radius, a 4px grey hard shadow at 20% black, 15px/700, 12px 24px padding. Hover fills soft pink with white text and widens the shadow to 6px, without lifting or over-travelling; press translates 4px 4px and zeroes the shadow. 150ms ease-out.",
      },
      sizes: "padding 12px 24px; label 15px",
      states: "hover: pink fill, shadow 6px; active: translate 4px, shadow none",
    },
    {
      name: "Soft Brutal Card",
      role: { zh: "内容卡与功能卡", en: "Content and feature cards" },
      construction: {
        zh: "白底、2px gray-800 描边、零圆角、内边距 24px、4px 灰色硬阴影。标题 24px/700 深灰，正文 15px/500 灰 60%。hover 时上浮 2px、阴影扩到 6px、描边转柔粉。过渡 150ms。",
        en: "White fill, a 2px gray-800 border, zero radius, 24px padding, a 4px grey hard shadow. Title at 24px/700 in deep grey, body at 15px/500 in 60% grey. Hover lifts 2px, widens the shadow to 6px and turns the border soft pink. 150ms.",
      },
    },
    {
      name: "Quiet Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "白底、2px gray-800 描边、零圆角、padding 10px 14px、15px 字。聚焦时描边转天蓝并加 4px 的灰硬阴影，不改变盒子尺寸。",
        en: "White fill, a 2px gray-800 border, zero radius, 10px 14px padding at 15px. Focus turns the border sky blue and adds a 4px grey hard shadow without resizing.",
      },
    },
    {
      name: "Pastel Tag",
      role: { zh: "标签与状态", en: "Tags and statuses" },
      construction: {
        zh: "粉彩填充（柔粉、青柠、天蓝或琥珀之一，取 15% 透明度作底）、零圆角、2px gray-800 描边、13px/700、padding 2px 8px。文字用深灰，不用白色。",
        en: "A pastel fill (soft pink, lime, sky or amber at 15% as a ground), zero radius, a 2px gray-800 border, 13px/700, 2px 8px padding. Text stays deep grey rather than white.",
      },
    },
  ],
  imagery: {
    zh: "几何图形与粗描边图标。允许把照片处理成粉彩双色调后加 2px 描边。不使用柔和渐变的摄影与装饰插画。",
    en: "Geometry and heavy-stroke icons. A photo may be reduced to a pastel duotone behind a 2px border. No soft-gradient photography or decorative illustration.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 80px。允许元素轻微错位 4px 制造手工感，但不做旋转。卡片垂直错落 8px，整体保持整齐。",
    en: "Capped at 1120px with 24px padding, sections 80px apart. Elements may offset by 4px for a handmade feel but never rotate. Cards stagger 8px vertically while the layout stays orderly.",
  },
  dos: [
    { zh: "2px gray-800 边框，不用纯黑", en: "2px gray-800 borders, never pure black" },
    { zh: "阴影用 20% 黑而不是实色", en: "Shadows at 20% black rather than solid" },
    { zh: "粉彩强调，每屏不超过两种", en: "Pastel accents, at most two per screen" },
    { zh: "保持零圆角与硬偏移阴影", en: "Keep zero radius and hard offset shadows" },
    { zh: "浅灰底，不用纯白", en: "Ground in light grey, never pure white" },
    { zh: "过渡 150ms，短促", en: "Transitions at 150ms, crisp" },
  ],
  donts: [
    { zh: "不要用圆角", en: "No border radius" },
    { zh: "不要用纯黑边框", en: "No pure black borders" },
    { zh: "不要用高饱和纯色", en: "No high-saturation pure color" },
    { zh: "不要用纯黑背景", en: "No pure black ground" },
    { zh: "不要用渐变", en: "No gradients" },
    { zh: "不要用模糊阴影", en: "No blurred shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#f5f5f5",
      card: "#ffffff",
      pink: "#f472b6",
      sky: "#38bdf8",
      border: "#262626",
    },
    prompts: [
      {
        zh: "做一个柔和野兽派按钮：白底、#1a1a1a 文字、2px solid #262626 边框、border-radius 0、700 字重 15px、padding 12px 24px、box-shadow 4px 4px 0 rgba(0,0,0,0.2)。hover 时背景 #f472b6、文字白色、阴影扩到 6px 6px 0 rgba(0,0,0,0.24)。active 时 translate(4px,4px) 且阴影 none。transition 150ms ease-out。页面底色 #f5f5f5。",
        en: "Build a soft brutalist button: white fill, #1a1a1a text, a 2px solid #262626 border, border-radius 0, weight 700 at 15px, 12px 24px padding, box-shadow 4px 4px 0 rgba(0,0,0,0.2). Hover fills #f472b6 with white text and widens the shadow to 6px 6px 0 rgba(0,0,0,0.24). Active applies translate(4px,4px) with no shadow. Transition 150ms ease-out. The page ground is #f5f5f5.",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist", why: { zh: "同一骨架，但硬核版用 4px 纯黑边与霓虹强调", en: "Same skeleton, though the hard version uses 4px pure black and neon accents" } },
    { name: "Corporate Clean", why: { zh: "同样克制的商用语言，但柔和野兽派保留硬阴影与零圆角", en: "Also a restrained commercial language, though this keeps hard shadows and square corners" } },
  ],
  completeness: "full",
};
