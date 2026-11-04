import type { DesignSpec } from "../types";

export const ghibliStyleSpec: DesignSpec = {
  slug: "ghibli-style",
  name: "吉卜力风格",
  nameEn: "Ghibli Style",
  cover: "/styles/ghibli-style.svg",
  theme: "light",
  northStar: {
    zh: "手绘的天空与草地，暖到发甜的绿，一切都慢半拍。",
    en: "A hand-painted sky and meadow in warm green, where everything moves half a beat slower.",
  },
  summary: {
    zh: "吉卜力风格来自动画场景美术：天空从浅蓝渐变到奶油，云是几块模糊的白，地面是带纹理的鼠尾草绿。它的核心不是配色而是「手作痕迹」——圆角一律很大，边界带 2px 半透明描边，卡片与按钮在 hover 时会轻微倾斜（0.8 度），像被人拿起来看了一眼。颜色全部低饱和、偏暖，最深的文字用暖棕（#5a4a3a）而不是黑。动效慢，500 到 700ms，缓入缓出，允许缩放与旋转这种「有机」的位移，而不是机械的上下平移。",
    en: "Ghibli Style comes from animation background art: a sky that fades from pale blue into cream, clouds as a few blurred white shapes, and ground in textured sage. Its core is not color but the trace of the hand — radii run large, edges carry a 2px semi-transparent border, and cards and buttons tilt about 0.8 degrees on hover as if lifted for a look. Every color is warm and low-saturation, and the darkest text is a warm brown (#5a4a3a) rather than black. Motion is slow at 500 to 700ms on an ease-in-out curve, and it allows scale and rotation — organic movement rather than mechanical translation.",
  },
  colors: [
    {
      name: "鼠尾草",
      nameEn: "Sage",
      value: "#7cb9a8",
      group: "brand",
      role: {
        zh: "主行动与自然语义。草地的绿，也是整套系统的主色。",
        en: "Primary actions and natural semantics — the meadow green that anchors the system.",
      },
      token: "--color-sage",
    },
    {
      name: "奶油",
      nameEn: "Cream",
      value: "#f4e4bc",
      group: "surface",
      role: {
        zh: "卡片与地平线。让画面有「被夕阳照过」的暖度。",
        en: "Cards and horizon, giving the frame a sunlit warmth.",
      },
      token: "--color-cream",
    },
    {
      name: "暖棕",
      nameEn: "Warm Brown",
      value: "#5a4a3a",
      group: "brand",
      role: {
        zh: "全部文字与标题。替代黑色，避免破坏画面的暖调。",
        en: "All text and headings — the warm replacement for black.",
      },
      token: "--color-warm-brown",
    },
    {
      name: "珊瑚",
      nameEn: "Coral",
      value: "#e8a87c",
      group: "accent",
      role: {
        zh: "夕阳与暖色强调，用于徽标、价格与高亮。",
        en: "Sunset warmth for badges, prices and highlights.",
      },
      token: "--color-coral",
    },
    {
      name: "天青",
      nameEn: "Sky Teal",
      value: "#85cdca",
      group: "accent",
      role: {
        zh: "天空与水面，是渐变的上半段。",
        en: "Sky and water — the upper half of every gradient.",
      },
      token: "--color-sky-teal",
    },
    {
      name: "玫瑰灰",
      nameEn: "Rose Grey",
      value: "#c38d94",
      group: "accent",
      role: {
        zh: "情感强调与角色肤色，只在小面积出现。",
        en: "Emotional emphasis and character tones, kept to small areas.",
      },
      token: "--color-rose-grey",
    },
  ],
  fonts: [
    {
      family: "Quicksand",
      substitute: "'Hiragino Maru Gothic ProN', 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500, 600],
      sizes: [13, 15, 18, 24, 32, 48],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.75 },
      tracking: { display: "-0.01em", label: "0.08em" },
      role: {
        zh: "全站唯一字体。圆润无衬线配宽松行高（1.75），让文字像画面里的旁白。",
        en: "The only face: a rounded sans with loose leading (1.75) so text reads like narration over the image.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 48, lineHeight: 1.15, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 32, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 24, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 15, lineHeight: 1.75, token: "--text-body" },
    { role: "label", weight: 500, size: 13, lineHeight: 1.5, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1120,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "16px" },
    { element: "icons", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Sky to Cream", value: "linear-gradient(#87ceeb, #b4e4f5, #f4e4bc)", purpose: "首屏天空" },
    { level: 1, name: "Cream Card", value: "#f4e4bc", purpose: "卡片与面板" },
  ],
  elevation: [
    { name: "Card", value: "0 8px 30px rgba(90,74,58,0.06)" },
    { name: "Card hover", value: "0 16px 40px rgba(124,185,168,0.18)" },
    { name: "Button", value: "0 8px 20px rgba(124,185,168,0.30)" },
  ],
  components: [
    {
      name: "Journey Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "天青到鼠尾草的纵向渐变、白字、999px 全圆角、2px 描边（主色 25% 不透明度）。字级 18px、字重 500、padding 16px 32px，阴影 0 8px 20px 绿 30%。hover 时上浮 4px、放大 1.01、旋转 0.8 度、阴影扩到 30px；按下时缩放 0.98 且角度归零。过渡 500ms ease-in-out。",
        en: "A vertical teal-to-sage gradient, white text, fully rounded at 999px, with a 2px border at 25% primary. 18px type at weight 500, 16px 32px padding, shadow 0 8px 20px at 30% green. Hover lifts 4px, scales 1.01, rotates 0.8 degrees and widens the shadow to 30px; press scales 0.98 and returns the angle to zero. 500ms ease-in-out.",
      },
      sizes: "padding 16px 32px; label 18px",
      states: "hover: lift 4px, scale 1.01, rotate 0.8deg; active: scale 0.98, rotate 0",
    },
    {
      name: "Story Card",
      role: { zh: "内容卡与场景卡", en: "Content and scene card" },
      construction: {
        zh: "奶油到浅琥珀的斜向渐变（90% 不透明）、24px 圆角、1px 描边（#d4c49a 45%）、内边距 32px、10px 模糊。图标块 64px 圆形、天青到鼠尾草渐变、内部阴影。hover 时上浮 6px、反向旋转 0.8 度、放大 1.01、阴影转绿 18%，图标放大 1.05 并旋转 6 度。过渡 700ms ease-in-out。",
        en: "A cream-to-amber diagonal gradient at 90% opacity, 24px radius, a 1px border at 45% #d4c49a, 32px padding, 10px blur. The icon tile is a 64px circle on a teal-to-sage gradient with an inner shadow. Hover lifts 6px, rotates the opposite way by 0.8 degrees, scales 1.01 and turns the shadow to 18% green, while the icon scales 1.05 and rotates 6 degrees. 700ms ease-in-out.",
      },
    },
    {
      name: "Story Input",
      role: { zh: "表单与写作输入", en: "Forms and writing input" },
      construction: {
        zh: "奶油 60% 填充、2px 描边（#d4c49a 40%）、16px 圆角、padding 16px 20px、15px 字、暖棕文字。聚焦时描边转鼠尾草、填充升到 80%，过渡 300ms。",
        en: "Cream at 60% fill, a 2px border at 40% #d4c49a, 16px radius, 16px 20px padding at 15px in warm brown. Focus turns the border sage and the fill to 80%, over 300ms.",
      },
    },
    {
      name: "Cloud Layer",
      role: { zh: "首屏云层与背景装饰", en: "Hero clouds and background decoration" },
      construction: {
        zh: "三到五块白色 40% 到 60% 的椭圆（宽高比 2:1），模糊 4px，分布在天空渐变的上三分之一，位置错落不重叠。不做动画或只做极慢的横向漂移（60 秒以上一个循环）。",
        en: "Three to five white ellipses at 40% to 60% (2:1 ratio) with a 4px blur, spread across the upper third of the sky gradient without overlapping. No animation, or a very slow drift of 60 seconds or more per cycle.",
      },
    },
  ],
  imagery: {
    zh: "手绘感插画与动画场景美术：天空、草地、小屋、云。允许纸张或水彩纹理叠加 5% 到 10%。不使用锐利摄影、3D 渲染与高饱和色块。",
    en: "Hand-drawn illustration and animation background art: sky, meadow, cottage, clouds. A 5% to 10% paper or watercolor grain may overlay. No sharp photography, 3D renders or saturated blocks.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 24px，区块间距 112px。首屏为满幅天空渐变，标题居中偏上，下方留出大片天空。内容区用两栏或三栏卡片，卡片允许错落 8px 的高度差以增加手工感。",
    en: "Capped at 1120px with 24px padding, sections 112px apart. The hero is a full-bleed sky gradient with the headline sitting high and open sky below it. Content runs two or three cards wide, with up to 8px of vertical offset for a handmade feel.",
  },
  dos: [
    { zh: "用暖棕替代黑色文字", en: "Use warm brown instead of black for text" },
    { zh: "圆角大：按钮全圆角、卡片 24px", en: "Ran large: pills for buttons, 24px cards" },
    { zh: "hover 允许 0.8 度旋转与 1.01 放大", en: "Allow 0.8-degree rotation and 1.01 scale on hover" },
    { zh: "动效 500 到 700ms，缓入缓出", en: "Motion runs 500 to 700ms on ease-in-out" },
    { zh: "用天空渐变与云层建立场景", en: "Build the scene with a sky gradient and cloud layers" },
    { zh: "正文行高 1.75，读起来像旁白", en: "Body leading at 1.75 so text reads as narration" },
  ],
  donts: [
    { zh: "不要用纯黑与高饱和色", en: "No pure black and no saturated color" },
    { zh: "不要用锐利直角", en: "No sharp corners" },
    { zh: "不要用快速过渡或线性缓动", en: "No fast transitions or linear easing" },
    { zh: "不要让云层重叠成一大块", en: "Never let the clouds merge into one mass" },
    { zh: "不要在画面里加科技感元素", en: "No tech-flavored elements in the scene" },
    { zh: "不要用阴影做主要分层手段", en: "Do not rely on shadow as the main layering device" },
  ],
  promptGuide: {
    quickColors: {
      text: "#5a4a3a",
      background: "#f4e4bc",
      card: "rgba(244,228,188,0.9)",
      primary: "#7cb9a8",
      sky: "#85cdca",
      accent: "#e8a87c",
    },
    prompts: [
      {
        zh: "做一个吉卜力风格卡片：奶油到浅琥珀 135 度渐变（90% 不透明）、24px 圆角、1px rgba(212,196,154,0.45) 描边、内边距 32px、backdrop-blur 10px、阴影 0 8px 30px rgba(90,74,58,0.06)。左上 64px 圆形图标块（天青到鼠尾草渐变）。hover 时 translateY(-6px) rotate(-0.8deg) scale(1.01)、阴影转 rgba(124,185,168,0.18)，过渡 700ms ease-in-out。",
        en: "Build a Ghibli-style card: cream-to-amber 135-degree gradient at 90% opacity, 24px radius, 1px rgba(212,196,154,0.45) border, 32px padding, backdrop-blur 10px, shadow 0 8px 30px rgba(90,74,58,0.06). A 64px circular icon tile in a teal-to-sage gradient sits top-left. Hover applies translateY(-6px) rotate(-0.8deg) scale(1.01) and shifts the shadow to rgba(124,185,168,0.18), over 700ms ease-in-out.",
      },
    ],
  },
  similar: [
    { name: "Natural Organic", why: { zh: "同属暖色手作系，但吉卜力更偏插画叙事", en: "Also warm and handmade, though Ghibli leans into illustration and narrative" } },
    { name: "Cottagecore", why: { zh: "同样的田园语义，更复古、装饰更多", en: "Same pastoral semantics, more nostalgic and more ornamented" } },
  ],
  completeness: "full",
};
