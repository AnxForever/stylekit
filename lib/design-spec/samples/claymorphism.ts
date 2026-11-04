import type { DesignSpec } from "../types";

export const claymorphismSpec: DesignSpec = {
  slug: "claymorphism",
  name: "粘土拟态",
  nameEn: "Claymorphism",
  cover: "/styles/claymorphism.svg",
  theme: "light",
  northStar: {
    zh: "像捏出来的一块软糖：超大圆角、内外双阴影、按下去会扁。",
    en: "A piece of soft candy pressed by hand: huge radii, inner-plus-outer shadows, and it squashes when you push.",
  },
  summary: {
    zh: "粘土拟态是新拟物的可爱版本：形状必须圆到近乎球体（按钮 24px、卡片 32px、hero 容器 48px），每个元素同时拥有内外两层阴影——外层负责体积、内层负责高光与暗缘。颜色全部为粉彩（粉、奶油、薄荷、薰衣草、柠檬），饱和度低、明度高，靠色相而不是明度区分层级。交互最特别：按下时不是位移，而是横向拉宽 5%、纵向压扁 10% 并下沉 8px，像真正的粘土被按住。动效使用带回弹的弹簧曲线，让柔软被感知。",
    en: "Claymorphism is the playful cousin of neumorphism: shapes round almost into spheres (24px buttons, 32px cards, 48px hero containers), and every element carries two shadow layers at once — an outer pair for volume and an inner pair for highlight and edge shade. The palette is pastel throughout (pink, cream, mint, lavender, lemon) with low saturation and high lightness, so hue rather than tone separates levels. Interaction is the distinctive part: on press the element widens 5%, squashes 10% and sinks 8px, exactly like clay being pushed. Motion uses a spring curve so the softness is felt.",
  },
  colors: [
    {
      name: "粘土粉",
      nameEn: "Clay Pink",
      value: "#f8b4d9",
      group: "brand",
      role: {
        zh: "主行动与主色块。整套系统的基准色相，其他颜色都围绕它取值。",
        en: "Primary actions and hero blocks — the hue every other color is chosen against.",
      },
      token: "--color-clay-pink",
    },
    {
      name: "奶油",
      nameEn: "Cream",
      value: "#fef3c7",
      group: "surface",
      role: {
        zh: "卡片与分区底。比粉更浅，用来承载内容而不抢戏。",
        en: "Cards and section beds, lighter than pink so content can sit without competing.",
      },
      token: "--color-cream",
    },
    {
      name: "薄荷",
      nameEn: "Mint",
      value: "#a7f3d0",
      group: "accent",
      role: {
        zh: "成功与「新」语义，用于标签与徽标。",
        en: "Success and 'new' semantics on tags and badges.",
      },
      token: "--color-mint",
    },
    {
      name: "薰衣草",
      nameEn: "Lavender",
      value: "#c4b5fd",
      group: "accent",
      role: {
        zh: "次级强调与信息块。与粉形成同明度的色相对比。",
        en: "Secondary emphasis and info blocks, contrasting pink by hue rather than tone.",
      },
      token: "--color-lavender",
    },
    {
      name: "柠檬",
      nameEn: "Lemon",
      value: "#fcd34d",
      group: "accent",
      role: {
        zh: "提醒与数字高亮。出现频率最低，面积最小。",
        en: "Nudges and figure highlights — the rarest and smallest accent.",
      },
      token: "--color-lemon",
    },
    {
      name: "天蓝",
      nameEn: "Sky",
      value: "#b6e9ff",
      group: "accent",
      role: {
        zh: "链接与可点击标记，是唯一偏冷的粉彩。",
        en: "Links and clickable markers; the one pastel that leans cool.",
      },
      token: "--color-sky",
    },
  ],
  fonts: [
    {
      family: "Nunito",
      substitute: "Quicksand, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 700, 800],
      sizes: [13, 15, 18, 24, 34, 48],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.06em" },
      role: {
        zh: "全站唯一字体。圆润的无衬线（Nunito）是粘土感的一半，换成几何体就垮。",
        en: "The only face. A rounded sans (Nunito) is half the clay feel; swap in a geometric face and it collapses.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 800, size: 48, lineHeight: 1.15, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 700, size: 34, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", weight: 700, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 700, size: 13, lineHeight: 1.4, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "32px" },
    { element: "buttons", value: "24px" },
    { element: "inputs", value: "16px" },
    { element: "hero-panels", value: "48px" },
  ],
  surfaces: [
    { level: 0, name: "Cream Page", value: "#fef3c7", purpose: "页面底色" },
    { level: 1, name: "Clay Card", value: "#ffffff", purpose: "卡片（配渐变到粉彩）" },
  ],
  elevation: [
    {
      name: "Clay raised",
      value: "8px 8px 16px rgba(255,182,193,0.50), -8px -8px 16px rgba(255,255,255,0.80), inset 4px 4px 8px rgba(255,255,255,0.40), inset -4px -4px 8px rgba(219,112,147,0.20)",
    },
    {
      name: "Clay card",
      value: "12px 12px 24px rgba(0,0,0,0.08), inset 6px 6px 12px rgba(255,255,255,0.60), inset -4px -4px 8px rgba(0,0,0,0.05)",
    },
    {
      name: "Clay pressed",
      value: "2px 2px 4px rgba(255,182,193,0.30), -2px -2px 4px rgba(255,255,255,0.90), inset 4px 4px 8px rgba(219,112,147,0.25)",
    },
  ],
  components: [
    {
      name: "Clay Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "粉色纵向渐变填充、白字、24px 圆角、无描边，字级 18px、字重 700、padding 16px 32px。阴影为四段组合：外阴影 8px 8px 16px 粉 50% 与 -8px -8px 16px 白 80%，内阴影 inset 4px 4px 8px 白 40% 与 inset -4px -4px 8px 深粉 20%。hover 时四段阴影各扩 2px 并上浮 4px；按下时横向缩放 1.05、纵向 0.9、下沉 8px，阴影收缩到 2px 档。过渡 300ms，弹簧缓动 cubic-bezier(0.34, 1.56, 0.64, 1)。",
        en: "A vertical pink gradient fill, white text, 24px radius, no border, 18px type at weight 700, 16px 32px padding. The shadow is four parts: outer 8px 8px 16px at 50% pink and -8px -8px 16px at 80% white, inner inset 4px 4px 8px at 40% white and inset -4px -4px 8px at 20% deep pink. Hover widens all four by 2px and lifts 4px; press scales 1.05 horizontally and 0.9 vertically, sinks 8px and shrinks the shadow to the 2px step. 300ms on cubic-bezier(0.34, 1.56, 0.64, 1).",
      },
      sizes: "padding 16px 32px; label 18px",
      states: "hover: shadows widen, lift 4px; active: scaleX 1.05, scaleY 0.9, sink 8px",
    },
    {
      name: "Clay Card",
      role: { zh: "功能卡与内容卡", en: "Feature and content card" },
      construction: {
        zh: "奶油到琥珀的斜向渐变、32px 圆角、无描边、内边距 32px。阴影为 12px 12px 24px 黑 8% 加两层内阴影（6px 6px 12px 白 60%、-4px -4px 8px 黑 5%）。标题 24px/700 深琥珀色。hover 时阴影各扩 4px、上浮 4px，过渡 300ms 弹簧。",
        en: "A cream-to-amber diagonal gradient, 32px radius, no border, 32px padding. The shadow pairs 12px 12px 24px at 8% black with two inner layers (6px 6px 12px at 60% white, -4px -4px 8px at 5% black). Titles run 24px/700 in deep amber. Hover widens each shadow by 4px and lifts 4px over a 300ms spring.",
      },
    },
    {
      name: "Clay Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "灰到浅灰的纵向渐变、16px 圆角、无描边、内边距 16px 24px、15px 字。基础状态就是凹陷的：inset 4px 4px 8px 黑 10% 与 inset -4px -4px 8px 白 90%。聚焦时内阴影加深到 6px 12px，并外扩一圈 4px 粉 30% 的光环。过渡 300ms 弹簧。",
        en: "A grey-to-pale vertical gradient, 16px radius, no border, 16px 24px padding at 15px. The resting state is already recessed: inset 4px 4px 8px at 10% black and inset -4px -4px 8px at 90% white. Focus deepens the inner shadow to 6px 12px and adds a 4px outer ring at 30% pink. 300ms spring.",
      },
    },
    {
      name: "Clay Badge",
      role: { zh: "标签与状态徽标", en: "Tags and status badges" },
      construction: {
        zh: "全圆角、粉彩填充（薄荷、薰衣草或柠檬之一）、内部用一层 2px 内高光与 2px 内暗缘，字级 13px/700、padding 6px 14px。不描边、不加外阴影，靠内阴影保持粘土感。",
        en: "Fully rounded with a pastel fill (mint, lavender or lemon) and a 2px inner highlight plus a 2px inner edge, 13px type at weight 700, 6px 14px padding. No border and no outer shadow; the inner pair keeps the clay quality.",
      },
    },
  ],
  imagery: {
    zh: "3D 渲染的软质物体、圆润插画、粉彩渐变背景。允许把界面元素做成「实物」——按钮像糖果、卡片像积木。不使用锐利摄影、深色背景与几何线稿。",
    en: "Soft 3D objects, rounded illustration and pastel gradient backdrops. Interface elements may look physical — buttons like candy, cards like blocks. No sharp photography, dark grounds or geometric line art.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 96px，卡片间距 24px。元素之间至少留 24px，因为四段阴影会互相侵占。允许卡片轻微旋转（±2 度）增加手工感，但同屏不超过两张。",
    en: "Capped at 1120px with 24px padding, sections 96px apart, cards 24px apart. Elements need at least 24px between them because the four-part shadows bleed. Cards may rotate up to two degrees for a handmade feel, at most two per screen.",
  },
  dos: [
    { zh: "圆角从 16px 起，卡片 32px，容器 48px", en: "Radius starts at 16px, cards at 32px, containers at 48px" },
    { zh: "每个元素同时有外阴影与内阴影", en: "Every element carries both an outer and an inner shadow" },
    { zh: "全部使用粉彩，靠色相区分层级", en: "Stay pastel throughout and separate levels by hue" },
    { zh: "按下时横向拉宽纵向压扁", en: "Press widens horizontally and squashes vertically" },
    { zh: "动效用带回弹的弹簧曲线", en: "Use a spring curve with overshoot" },
    { zh: "元素间距至少 24px", en: "Keep at least 24px between elements" },
  ],
  donts: [
    { zh: "不要用锐利直角或小圆角", en: "No sharp corners or small radii" },
    { zh: "不要用单层阴影", en: "No single-layer shadows" },
    { zh: "不要用深色背景", en: "No dark grounds" },
    { zh: "不要用高饱和或纯色填充", en: "No saturated or pure color fills" },
    { zh: "不要把元素挤在 16px 以内", en: "Never crowd elements closer than 16px" },
    { zh: "不要用线性缓动，柔软需要回弹", en: "No linear easing; softness needs overshoot" },
  ],
  promptGuide: {
    quickColors: {
      text: "#7c3f58",
      background: "#fef3c7",
      card: "#ffffff",
      primary: "#f8b4d9",
      secondary: "#c4b5fd",
      accent: "#a7f3d0",
    },
    prompts: [
      {
        zh: "做一个粘土按钮：粉色纵向渐变、白字、24px 圆角、700 字重、padding 16px 32px。box-shadow 四段：8px 8px 16px rgba(255,182,193,0.5), -8px -8px 16px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(255,255,255,0.4), inset -4px -4px 8px rgba(219,112,147,0.2)。hover 时四段各扩 2px 并 translateY(-4px)；active 时 scaleX(1.05) scaleY(0.9) translateY(8px)。过渡 300ms cubic-bezier(0.34,1.56,0.64,1)。",
        en: "Build a clay button: vertical pink gradient, white text, 24px radius, weight 700, 16px 32px padding. The box-shadow has four parts: 8px 8px 16px rgba(255,182,193,0.5), -8px -8px 16px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(255,255,255,0.4) and inset -4px -4px 8px rgba(219,112,147,0.2). Hover widens each by 2px and translates -4px; active applies scaleX(1.05) scaleY(0.9) translateY(8px). Transition 300ms cubic-bezier(0.34,1.56,0.64,1).",
      },
    ],
  },
  similar: [
    { name: "Neumorphism", why: { zh: "同源的阴影逻辑，但粘土用了粉彩与超大圆角", en: "Shares the shadow logic, though clay adds pastel color and huge radii" } },
    { name: "Soft UI", why: { zh: "同样柔软亲和，但 Soft UI 更克制、少一份玩具感", en: "Also soft and friendly, though Soft UI stays more restrained" } },
  ],
  completeness: "full",
};
