import type { DesignSpec } from "../types";

export const dopamineDesignSpec: DesignSpec = {
  slug: "dopamine-design",
  name: "多巴胺设计",
  nameEn: "Dopamine Design",
  cover: "/styles/dopamine-design.svg",
  theme: "light",
  northStar: {
    zh: "高饱和撞色加圆润大字：让界面看起来像在笑。",
    en: "Saturated clash color and rounded oversized type — an interface that looks like it is smiling.",
  },
  summary: {
    zh: "多巴胺设计要的是情绪冲击：粉、紫、黄、蓝四支高饱和色并置，标题推到 5xl 到 7xl 加 900 字重，按钮全圆角加彩色投影，卡片用双色渐变，一切都圆润、都大、都亮。它的规则主要是禁令——禁止大面积灰、禁止低饱和马卡龙色、禁止严肃商务排版、禁止衬线字体。允许 emoji 与趣味图标点缀，这在别的风格里是被禁的，在这里是语气的一部分。",
    en: "Dopamine Design is after emotional impact: pink, violet, yellow and blue in saturated juxtaposition, headlines at 5xl to 7xl on weight 900, pill buttons with colored shadows, cards on two-stop gradients — everything round, large and bright. Its rules are mostly prohibitions: no large grey areas, no desaturated macaron palettes, no serious business typesetting, no serif. Emoji and playful icons are allowed here, where other styles ban them, because they are part of the tone.",
  },
  colors: [
    {
      name: "热粉",
      nameEn: "Hot Pink",
      value: "#ff006e",
      group: "brand",
      role: {
        zh: "第一主色与主按钮。整套风格最强的情绪信号。",
        en: "The first primary and the main button — the loudest emotional signal here.",
      },
      token: "--color-hot-pink",
    },
    {
      name: "电紫",
      nameEn: "Electric Violet",
      value: "#8338ec",
      group: "brand",
      role: {
        zh: "第二主色，与热粉构成渐变与撞色关系。",
        en: "The second primary, forming gradients and clashes with the pink.",
      },
      token: "--color-electric-violet",
    },
    {
      name: "阳光黄",
      nameEn: "Sunny Yellow",
      value: "#ffbe0b",
      group: "accent",
      role: {
        zh: "高亮与徽标，用于需要跳出的信息。",
        en: "Highlights and badges on information that must jump out.",
      },
      token: "--color-sunny-yellow",
    },
    {
      name: "活力蓝",
      nameEn: "Vivid Blue",
      value: "#3a86ff",
      group: "accent",
      role: {
        zh: "第三撞色与链接，是画面里最冷的一支。",
        en: "The third clash and links — the coolest tone in the frame.",
      },
      token: "--color-vivid-blue",
    },
    {
      name: "薄荷绿",
      nameEn: "Mint",
      value: "#06d6a0",
      group: "accent",
      role: {
        zh: "成功与「完成」状态，面积较小。",
        en: "Success and done states at a smaller area.",
      },
      token: "--color-mint",
    },
    {
      name: "橘橙",
      nameEn: "Tangerine",
      value: "#fb5607",
      group: "accent",
      role: {
        zh: "最热的一支，用于强调与倒计时。",
        en: "The hottest tone, on emphasis and countdowns.",
      },
      token: "--color-tangerine",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Segoe UI', system-ui, sans-serif",
      weights: [700, 900],
      sizes: [15, 18, 22, 30, 44, 64],
      lineHeight: { display: 1.02, heading: 1.1, body: 1.5 },
      tracking: { display: "-0.03em", label: "0.02em" },
      role: {
        zh: "全站唯一无衬线，只用 700 与 900。标题 44 到 64px 并压紧字距，字块要够重才有冲击。",
        en: "The only sans, in 700 and 900. Headlines run 44 to 64px on tight tracking — the block needs weight to hit.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 64, lineHeight: 1.02, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 44, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 900, size: 30, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", weight: 700, size: 22, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", weight: 700, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 700, size: 15, lineHeight: 1.5, token: "--text-body" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1160,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "16px" },
    { element: "badges", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "页面底" },
    { level: 1, name: "Pink Wash", value: "rgba(255,0,110,0.08)", purpose: "区块底" },
    { level: 2, name: "Gradient Card", value: "linear-gradient violet→blue", purpose: "卡片" },
  ],
  elevation: [
    { name: "Pink lift", value: "0 8px 30px rgba(255,0,110,0.40)" },
    { name: "Pink lift hover", value: "0 12px 40px rgba(255,0,110,0.60)" },
    { name: "Violet lift", value: "0 16px 50px rgba(131,56,236,0.35)" },
  ],
  components: [
    {
      name: "Dopamine Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "热粉填充、白字、999px 全圆角、无描边，18px/700、padding 16px 32px，彩色投影 0 8px 30px 粉 40%。hover 时投影扩到 40px 并加深到 60%、放大 1.05、上浮 2px；按下缩到 0.95。过渡 200ms。",
        en: "Hot pink fill, white text, fully rounded, no border, 18px/700, 16px 32px padding, with a colored shadow at 0 8px 30px 40% pink. Hover widens the shadow to 40px at 60%, scales 1.05 and lifts 2px; press scales 0.95. 200ms.",
      },
      sizes: "padding 16px 32px; label 18px",
      states: "hover: scale 1.05, deeper pink shadow; active: scale 0.95",
    },
    {
      name: "Gradient Card",
      role: { zh: "内容卡与功能卡", en: "Content and feature cards" },
      construction: {
        zh: "电紫到活力蓝的对角渐变填充、24px 圆角、无描边、内边距 32px，投影 0 16px 50px 紫 35%。左上角放一个白 20% 底的全圆角标签（14px/600）并带轻微模糊。hover 时投影扩到 60px、放大 1.02。",
        en: "A diagonal violet-to-blue gradient fill, 24px radius, no border, 32px padding, shadow 0 16px 50px at 35% violet. A badge on a 20% white ground sits fully rounded at 14px/600 top-left with a slight blur. Hover widens the shadow to 60px and scales 1.02.",
      },
    },
    {
      name: "Bold Input",
      role: { zh: "输入框", en: "Input field" },
      construction: {
        zh: "白底、16px 圆角、2px 电紫 20% 描边、padding 14px 20px、15px/700 字。标签电紫 15px/700 置于上方 8px。聚焦时描边转热粉并加 4px 的热粉 15% 外环。",
        en: "White fill, 16px radius, a 2px violet border at 20%, 14px 20px padding at 15px/700. The label sits 8px above in violet at 15px/700. Focus turns the border hot pink and adds a 4px ring at 15%.",
      },
    },
    {
      name: "Emoji Badge",
      role: { zh: "带 emoji 的标签", en: "Badges with emoji" },
      construction: {
        zh: "阳光黄或薄荷绿填充、999px 全圆角、无描边、14px/700、padding 6px 14px，前面放一个 16px 的 emoji 或趣味图标。这是本风格唯一允许 emoji 的地方。",
        en: "Sunny yellow or mint fill, fully rounded, no border, 14px/700, 6px 14px padding, with a 16px emoji or playful icon leading. This is the only place emoji appears in the style.",
      },
    },
    {
      name: "Blob Shape",
      role: { zh: "装饰色块", en: "Decorative color blobs" },
      construction: {
        zh: "不规则圆（border-radius 取 60% 40% 55% 45% 这样的四值）、尺寸 120 到 320px、填一支高饱和色并降到 20% 不透明度，绝对定位在区块角落，允许溢出。单屏最多三个。",
        en: "Irregular circles using four-value radii such as 60% 40% 55% 45%, sized 120 to 320px, filled with one saturated color at 20% opacity, absolutely positioned at section corners and allowed to bleed. Three per screen at most.",
      },
    },
  ],
  imagery: {
    zh: "高饱和插画、几何图形、3D 渲染的糖果色物件。允许 emoji 作为视觉元素。不使用低饱和摄影、严肃企业照与灰调插画。",
    en: "Saturated illustration, geometry and 3D candy-colored objects. Emoji may serve as imagery. No desaturated photography, serious corporate shots or grey illustration.",
  },
  layout: {
    zh: "上限 1160px、容器内边距 24px，区块间距 96px。允许大量装饰色块溢出与旋转。元素间距至少 20px，留白中等——多巴胺靠颜色不靠空旷。",
    en: "Capped at 1160px with 24px padding, sections 96px apart. Decorative blobs may bleed and rotate freely. Elements keep at least 20px between them and whitespace stays moderate — dopamine runs on color rather than emptiness.",
  },
  dos: [
    { zh: "高饱和撞色并置", en: "Place saturated clash colors side by side" },
    { zh: "标题推到大字号加 900 字重", en: "Push headlines large at weight 900" },
    { zh: "按钮全圆角加彩色投影", en: "Pill buttons with colored shadows" },
    { zh: "卡片用双色渐变", en: "Cards carry two-stop gradients" },
    { zh: "允许 emoji 与趣味图标", en: "Emoji and playful icons are allowed" },
    { zh: "动效 200ms，带 1.05 的放大", en: "Motion runs 200ms with a 1.05 scale" },
  ],
  donts: [
    { zh: "不要大面积用灰", en: "No large grey areas" },
    { zh: "不要用低饱和马卡龙色", en: "No desaturated macaron palettes" },
    { zh: "不要做严肃商务排版", en: "No serious business typesetting" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要用锐利直角", en: "No sharp right angles" },
    { zh: "不要一次上五种以上撞色", en: "Never five or more clashes at once" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#ffffff",
      pink: "#ff006e",
      violet: "#8338ec",
      yellow: "#ffbe0b",
      blue: "#3a86ff",
    },
    prompts: [
      {
        zh: "做一个多巴胺风格按钮：背景 #ff006e、白字、18px/700、999px 全圆角、padding 16px 32px、box-shadow 0 8px 30px rgba(255,0,110,0.4)。hover 时阴影扩到 0 12px 40px rgba(255,0,110,0.6)、scale(1.05)、translateY(-2px)；active 时 scale(0.95)，transition 200ms。角落可放一个 240px 的不规则圆（border-radius 60% 40% 55% 45%），填 #ffbe0b、不透明度 20%。页面底色 #ffffff。",
        en: "Build a dopamine button: background #ff006e, white text, 18px/700, fully rounded, 16px 32px padding, box-shadow 0 8px 30px rgba(255,0,110,0.4). Hover widens the shadow to 0 12px 40px rgba(255,0,110,0.6) with scale(1.05) and translateY(-2px); active scales 0.95 over 200ms. A 240px irregular circle (border-radius 60% 40% 55% 45%) filled #ffbe0b at 20% opacity may sit in a corner. The page ground is #ffffff.",
      },
    ],
  },
  similar: [
    { name: "Neo-Brutalist Playful", why: { zh: "同样活跃撞色，但俏皮野兽派用黑边硬阴影，多巴胺用渐变与彩色柔影", en: "Both lively and clashing, though playful brutalist uses black borders and hard shadows while dopamine uses gradients and colored soft shadows" } },
    { name: "Kawaii Minimal", why: { zh: "同为明亮愉悦，但可爱极简是低饱和粉彩，多巴胺是高饱和荧光", en: "Both bright and cheerful, though kawaii is pastel while dopamine is saturated neon" } },
  ],
  completeness: "full",
};
