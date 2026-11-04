import type { DesignSpec } from "../types";

export const koreanMinimalSpec: DesignSpec = {
  slug: "korean-minimal",
  name: "韩式极简",
  nameEn: "Korean Minimal",
  cover: "/styles/korean-minimal.svg",
  theme: "light",
  northStar: {
    zh: "暖白、粉彩、大圆角：克制但不冷，像一间光线很好的房间。",
    en: "Warm white, pastels and generous radii — restrained without being cold, like a well-lit room.",
  },
  summary: {
    zh: "韩式极简来自 K-beauty 与韩国建筑的双重影响：留白要大（内边距 32 到 64px），底色是暖白而不是纯白，主文字用石板蓝而不是黑，强调色全部是低饱和的粉彩（藕粉、鼠尾草绿、米沙）。圆角偏大（24px），边框极细（10% 透明度），阴影几乎不可见。它有两条很容易被忽略的禁令——不许全大写、不许宽字距，因为这两者在这套语言里被视为强势。",
    en: "Korean Minimal owes its look to K-beauty and Korean architecture together: generous whitespace (32 to 64px of padding), a warm white ground rather than pure white, slate blue for primary text instead of black, and accents that are all low-saturation pastels — blush, sage, sand. Radius runs large at 24px, borders are hairline at 10% opacity, and shadows are barely visible. Two prohibitions are easy to miss: no uppercase and no wide tracking, because both read as forceful in this language.",
  },
  colors: [
    {
      name: "石板蓝",
      nameEn: "Slate Blue",
      value: "#3d4a5c",
      group: "brand",
      role: {
        zh: "主文字与标题。比黑柔，长时间阅读不压迫。",
        en: "Primary text and headings — softer than black, easy over long reading.",
      },
      token: "--color-slate-blue",
    },
    {
      name: "暖白",
      nameEn: "Warm White",
      value: "#faf9f7",
      group: "surface",
      role: {
        zh: "页面画布。带一点米调的暖白，是整套风格的地基。",
        en: "The canvas — a warm white with a faint cream cast, and the foundation of the whole style.",
      },
      token: "--color-warm-white",
    },
    {
      name: "藕粉",
      nameEn: "Blush",
      value: "#d4a5a5",
      group: "accent",
      role: {
        zh: "第一强调，用于标签、情感语义与细节描边。",
        en: "The first accent, on labels, emotional semantics and fine detail.",
      },
      token: "--color-blush",
    },
    {
      name: "鼠尾草绿",
      nameEn: "Sage",
      value: "#a8c5b8",
      group: "accent",
      role: {
        zh: "第二强调与成功状态，常以 10% 底出现。",
        en: "The second accent and success, usually as a 10% ground.",
      },
      token: "--color-sage",
    },
    {
      name: "米沙",
      nameEn: "Sand",
      value: "#e8d4b8",
      group: "accent",
      role: {
        zh: "暖色区块与图片衬底，用于制造温度差。",
        en: "Warm blocks and image beds, creating a difference in temperature.",
      },
      token: "--color-sand",
    },
    {
      name: "橄榄",
      nameEn: "Olive",
      value: "#b9b08a",
      group: "accent",
      role: {
        zh: "最暗的一支粉彩，用于边框与次级标记。",
        en: "The darkest pastel, on borders and secondary marks.",
      },
      token: "--color-olive",
    },
  ],
  fonts: [
    {
      family: "Pretendard",
      substitute: "'Apple SD Gothic Neo', 'PingFang SC', system-ui, sans-serif",
      weights: [300, 400, 500],
      sizes: [12, 14, 16, 20, 26, 34],
      lineHeight: { display: 1.3, heading: 1.4, body: 1.75 },
      tracking: { display: "0", label: "0.02em" },
      role: {
        zh: "全站唯一字体，只用 300 到 500。永不全大写、永不宽字距，行高 1.75 保证呼吸。",
        en: "The only face, in 300 through 500. Never uppercase, never widely tracked, with 1.75 leading for breathing room.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 300, size: 34, lineHeight: 1.3, token: "--text-display" },
    { role: "heading", weight: 400, size: 26, lineHeight: 1.4, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 20, lineHeight: 1.45, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.75, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.5, tracking: "0.02em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1040,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "16px" },
    { element: "inputs", value: "16px" },
    { element: "images", value: "20px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Warm White", value: "#faf9f7", purpose: "页面画布" },
    { level: 1, name: "Soft White", value: "#ffffff", purpose: "卡片" },
    { level: 2, name: "Blush Bed", value: "rgba(212,165,165,0.12)", purpose: "图片衬底与区块" },
  ],
  elevation: [
    { name: "Card", value: "0 2px 8px rgba(61,74,92,0.04)" },
    { name: "Card hover", value: "0 6px 20px rgba(61,74,92,0.07)" },
  ],
  components: [
    {
      name: "Soft Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "石板蓝填充、暖白文字、16px 圆角、无描边、无阴影，15px/400、padding 14px 32px。hover 时填充提亮 6%；按下时填充压暗一档并轻微缩到 0.99。过渡 400ms ease-out，慢但不拖。",
        en: "Slate blue fill, warm white text, 16px radius, no border, no shadow, 15px/400, 14px 32px padding. Hover brightens the fill six percent; press darkens it a step and scales to 0.99. 400ms ease-out — slow without dragging.",
      },
      sizes: "padding 14px 32px; label 15px",
      states: "hover: brighter fill; active: darker, scale 0.99",
    },
    {
      name: "Breathing Card",
      role: { zh: "内容卡与作品卡", en: "Content and work cards" },
      construction: {
        zh: "白底、24px 圆角、1px 石板蓝 10% 描边、内边距 32px，阴影 0 2px 8px 石板蓝 4%。标题 26px/400，正文 14px/400 行高 1.75，色为石板蓝 70%。hover 时阴影扩到 20px、上浮 2px。",
        en: "White fill, 24px radius, a 1px slate border at 10%, 32px padding, shadow 0 2px 8px at 4% slate. Title at 26px/400, body at 14px/400 on 1.75 leading in 70% slate. Hover widens the shadow to 20px and lifts 2px.",
      },
    },
    {
      name: "Gentle Input",
      role: { zh: "表单输入", en: "Form input" },
      construction: {
        zh: "白底、16px 圆角、1px 石板蓝 12% 描边、padding 12px 18px、15px 字。占位符石板蓝 35%。聚焦时描边转石板蓝 40% 并加 3px 的藕粉 15% 外环，不改变尺寸。",
        en: "White fill, 16px radius, a 1px slate border at 12%, 12px 18px padding at 15px. The placeholder sits at 35% slate. Focus turns the border to 40% slate and adds a 3px ring at 15% blush without resizing.",
      },
    },
    {
      name: "Pastel Chip",
      role: { zh: "分类与筛选标记", en: "Category and filter chips" },
      construction: {
        zh: "999px 全圆角、12% 粉彩底（藕粉、鼠尾草绿或米沙）、无描边、13px/500、padding 6px 14px，文字用石板蓝而非彩色。选中态底升到 22%。",
        en: "Fully rounded on a 12% pastel ground (blush, sage or sand), no border, 13px/500, 6px 14px padding, with slate text rather than colored. Selection raises the ground to 22%.",
      },
    },
    {
      name: "Photo Bed",
      role: { zh: "图片容器", en: "Image container" },
      construction: {
        zh: "20px 圆角、衬底用米沙或藕粉 12%、内边距 0、overflow hidden。图片本身不加边框，允许 4:5 或 1:1 比例。hover 时图片放大 1.03，容器阴影加深。",
        en: "20px radius on a bed of sand or 12% blush, no padding, overflow hidden. The image takes no border and may sit at 4:5 or 1:1. Hover scales the image 1.03 and deepens the container's shadow.",
      },
    },
  ],
  imagery: {
    zh: "自然光下的静物与人像，色调偏暖，饱和度低。允许粉彩衬底。不使用高对比摄影、冷光与 UI 插画。",
    en: "Still life and portrait work in natural light, warm in cast and low in saturation, optionally on a pastel bed. No high-contrast photography, cool lighting or UI illustration.",
  },
  layout: {
    zh: "上限 1040px、容器内边距 32 到 64px，区块间距 128px。单栏或非对称双栏（5:7），右侧留大片空白。元素间距至少 24px，行宽不超过 34em。",
    en: "Capped at 1040px with padding from 32 to 64px, sections 128px apart. One column or an asymmetric 5:7 split with emptiness on the right. Elements keep 24px between them and the measure stays under 34em.",
  },
  dos: [
    { zh: "暖白底，不用纯白", en: "Ground in warm white, not pure white" },
    { zh: "主文字用石板蓝", en: "Set primary text in slate blue" },
    { zh: "强调只用低饱和粉彩", en: "Accents are low-saturation pastels only" },
    { zh: "圆角 16 到 24px", en: "Radius runs 16 to 24px" },
    { zh: "边框 1px 的 10%", en: "Borders are 1px at 10%" },
    { zh: "永不全大写、永不宽字距", en: "Never uppercase, never wide tracking" },
  ],
  donts: [
    { zh: "不要用高饱和纯色", en: "No high-saturation pure color" },
    { zh: "不要用 2px 以上边框", en: "No border at 2px or above" },
    { zh: "不要用全大写与宽字距", en: "No uppercase and no wide tracking" },
    { zh: "不要用深色或黑色背景", en: "No dark or black ground" },
    { zh: "不要过度装饰与堆叠元素", en: "No over-decoration or stacked elements" },
    { zh: "不要用霓虹或荧光色", en: "No neon or fluorescent color" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3d4a5c",
      background: "#faf9f7",
      card: "#ffffff",
      blush: "#d4a5a5",
      sage: "#a8c5b8",
      border: "rgba(61,74,92,0.10)",
    },
    prompts: [
      {
        zh: "做一个韩式极简卡片：白底、24px 圆角、1px rgba(61,74,92,0.1) 描边、内边距 32px、阴影 0 2px 8px rgba(61,74,92,0.04)。标题 26px/400 #3d4a5c，正文 14px/400、行高 1.75、色 rgba(61,74,92,0.7)。卡片上方放一个 12% #d4a5a5 底的小标签（999px 圆角、13px/500）。hover 时阴影扩到 0 6px 20px rgba(61,74,92,0.07)、上浮 2px。页面底色 #faf9f7。",
        en: "Build a Korean minimal card: white fill, 24px radius, a 1px rgba(61,74,92,0.1) border, 32px padding, shadow 0 2px 8px rgba(61,74,92,0.04). Title at 26px/400 in #3d4a5c, body at 14px/400 on 1.75 leading in rgba(61,74,92,0.7). A small chip on a 12% #d4a5a5 ground (fully rounded, 13px/500) sits above the title. Hover widens the shadow to 0 6px 20px rgba(61,74,92,0.07) and lifts 2px. The page ground is #faf9f7.",
      },
    ],
  },
  similar: [
    { name: "Japanese Fresh", why: { zh: "同样粉彩与留白，但日系更轻（无粗体、无阴影），韩式允许大圆角与柔影", en: "Also pastel and airy, though Japanese Fresh is lighter while Korean allows larger radii and soft shadow" } },
    { name: "Soft Utility", why: { zh: "同为柔和工具感，但韩式更偏生活方式而非效率", en: "Also soft, though Korean leans lifestyle rather than utility" } },
  ],
  completeness: "full",
};
