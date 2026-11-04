import type { DesignSpec } from "../types";

export const cottagecoreSpec: DesignSpec = {
  slug: "cottagecore",
  name: "田园核风",
  nameEn: "Cottagecore",
  cover: "/styles/cottagecore.svg",
  theme: "light",
  northStar: {
    zh: "亚麻、花园、手缝的边：一个想住进去的乡下午后。",
    en: "Linen, a garden, a hand-stitched edge — an afternoon in the country you want to move into.",
  },
  summary: {
    zh: "田园核风来自「向往简单的乡居生活」这一情绪：大地色与花色（绿、米白、麦黄、棕、藕粉）、衬线字体、亚麻或纸张质感背景、圆角与柔和阴影、花卉与蘑菇等刺绣式装饰。它的动效有一个很具体的习惯——hover 时上浮 2px 并旋转 0.8 度，像纸片被风轻轻掀起，而且必须带 motion-reduce 降级。禁令是：不许冷蓝灰、不许锐角与硬边框、不许霓虹与荧光、不许任何科技或工业感元素。",
    en: "Cottagecore runs on a longing for simple country life: earth and floral tones (green, cream, wheat, brown, blush), serif type, linen or paper texture, rounded corners with soft shadows, and embroidered ornaments like flowers and mushrooms. Its motion has one specific habit — hover lifts 2px and rotates 0.8 degrees, like paper caught by a breeze, always with a motion-reduce fallback. Cold blue-greys, sharp corners and hard borders, neon and fluorescent color, and anything technological or industrial are all refused.",
  },
  colors: [
    {
      name: "草甸绿",
      nameEn: "Meadow",
      value: "#5a8f5a",
      group: "brand",
      role: {
        zh: "主色：主按钮、叶子装饰与成功状态。",
        en: "The primary on buttons, leaf ornament and success.",
      },
      token: "--color-meadow",
    },
    {
      name: "米白布",
      nameEn: "Cloth",
      value: "#faf6f0",
      group: "surface",
      role: {
        zh: "页面底。像洗过很多次的亚麻布。",
        en: "The page ground — linen washed many times.",
      },
      token: "--color-cloth",
    },
    {
      name: "麦黄",
      nameEn: "Wheat",
      value: "#f5d75f",
      group: "accent",
      role: {
        zh: "阳光与高亮，用于小花蕊与徽标。",
        en: "Sunlight and highlights, on flower centres and badges.",
      },
      token: "--color-wheat",
    },
    {
      name: "木棕",
      nameEn: "Timber",
      value: "#8b7355",
      group: "accent",
      role: {
        zh: "木器与文字的第二层，比墨色暖。",
        en: "Wood and the second text tier — warmer than ink.",
      },
      token: "--color-timber",
    },
    {
      name: "野蔷薇",
      nameEn: "Wild Rose",
      value: "#d4a0a0",
      group: "accent",
      role: {
        zh: "花朵与情绪化强调，出现频率中等。",
        en: "Flowers and emotional emphasis, at a moderate frequency.",
      },
      token: "--color-wild-rose",
    },
    {
      name: "新芽绿",
      nameEn: "Sprout",
      value: "#7ff77e",
      group: "accent",
      role: {
        zh: "最亮的一支，只用于「新增」与春季主题。",
        en: "The brightest tone, only on new growth and spring themes.",
      },
      token: "--color-sprout",
    },
  ],
  fonts: [
    {
      family: "Lora",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [15, 17, 21, 28, 36, 48],
      lineHeight: { display: 1.2, heading: 1.35, body: 1.8 },
      tracking: { display: "0.01em", label: "0.12em" },
      role: {
        zh: "全站唯一字体。衬线带一点手写气质，行高 1.8 让页面显得慢。",
        en: "The only face — a serif with a hand-written note, at 1.8 leading so the page feels slow.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 48, lineHeight: 1.2, tracking: "0.01em", token: "--text-display" },
    { role: "heading", weight: 600, size: 36, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 28, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 21, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 17, lineHeight: 1.8, token: "--text-body" },
    { role: "label", weight: 600, size: 15, lineHeight: 1.6, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1040,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "16px" },
    { element: "ornaments", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Cloth", value: "#faf6f0", purpose: "页面底（带亚麻纹理）" },
    { level: 1, name: "Lighter Cloth", value: "#fffdf8", purpose: "卡片" },
    { level: 2, name: "Meadow Wash", value: "rgba(90,143,90,0.10)", purpose: "区块底" },
  ],
  elevation: [
    { name: "Soft", value: "0 4px 10px rgba(90,143,90,0.20)" },
    { name: "Soft hover", value: "0 8px 20px rgba(90,143,90,0.30)" },
    { name: "Pressed", value: "0 2px 6px rgba(90,143,90,0.20)" },
  ],
  components: [
    {
      name: "Meadow Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "草甸绿填充、米白文字、999px 全圆角、无描边、衬线 15px、padding 12px 32px，阴影 0 4px 10px 绿 20%。hover 时上浮 2px、旋转 0.8 度、阴影扩到 20px；按下旋转归零、缩到 0.97、阴影收到 6px。过渡 500ms ease-in-out，并带 motion-reduce:transform-none。",
        en: "Meadow fill, cloth text, fully rounded, no border, serif at 15px, 12px 32px padding, shadow 0 4px 10px at 20% green. Hover lifts 2px, rotates 0.8 degrees and widens the shadow to 20px; press returns the rotation, scales 0.97 and pulls the shadow to 6px. 500ms ease-in-out, with motion-reduce transform none.",
      },
      sizes: "padding 12px 32px; label 15px",
      states: "hover: lift 2px, rotate 0.8deg; active: rotate 0, scale 0.97",
    },
    {
      name: "Linen Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "提亮一档的布色填充、24px 圆角、1px 草甸绿 12% 描边、内边距 32px，柔阴影 0 4px 10px 绿 20%。左上角放一个 32px 的花卉或叶片装饰（草甸绿 70%）。hover 时上浮 4px、阴影扩到 20px。",
        en: "Cloth one step lifted, 24px radius, a 1px meadow border at 12%, 32px padding, soft shadow 0 4px 10px at 20% green. A 32px flower or leaf ornament at 70% meadow sits top-left. Hover lifts 4px and widens the shadow to 20px.",
      },
    },
    {
      name: "Fabric Field",
      role: { zh: "输入框", en: "Input field" },
      construction: {
        zh: "布色填充、16px 圆角、1px 木棕 20% 描边、padding 12px 18px、17px 字。聚焦时描边转草甸绿并加 3px 的绿 15% 外环。占位符木棕 50%。",
        en: "Cloth fill, 16px radius, a 1px timber border at 20%, 12px 18px padding at 17px. Focus turns the border meadow and adds a 3px ring at 15% green. The placeholder sits at 50% timber.",
      },
    },
    {
      name: "Floral Sprig",
      role: { zh: "花卉与蘑菇装饰", en: "Flower and mushroom ornaments" },
      construction: {
        zh: "手绘式线稿或刺绣感的花朵、麦穗、蘑菇，尺寸 24 到 96px，颜色取野蔷薇、麦黄或草甸绿。放在卡片角落或标题旁，允许轻微旋转 -8 到 8 度。它是这套风格的身份标记，不可省略。",
        en: "Hand-drawn or embroidered flowers, wheat ears and mushrooms between 24px and 96px, colored wild rose, wheat or meadow. They sit at card corners or beside headings, rotated between -8 and 8 degrees. They are the style's identity marker and cannot be omitted.",
      },
    },
    {
      name: "Stitched Rule",
      role: { zh: "缝线分隔", en: "The stitched divider" },
      construction: {
        zh: "一条 2px 的虚线（dash 6px、gap 4px），颜色取草甸绿 30% 或木棕 30%，两端各收进 16px。可选在两端加一针「回针」小标记。用于区块之间的分隔，替代直线。",
        en: "A 2px dashed rule with 6px dashes and 4px gaps in 30% meadow or timber, inset 16px at each end, optionally finished with a small backstitch mark. It divides sections in place of a straight line.",
      },
    },
  ],
  imagery: {
    zh: "乡居摄影与手绘插画：花园、面包、陶器、亚麻、蘑菇。必须自然光、暖调、有柔焦。允许把照片处理成柔和的胶片色。不使用冷光、工业物件与科技产品。",
    en: "Countryside photography and hand-drawn illustration: gardens, bread, pottery, linen, mushrooms. Natural light, warm cast, soft focus. A photo may be graded to a gentle film look. No cool lighting, industrial objects or tech products.",
  },
  layout: {
    zh: "上限 1040px、容器内边距 24px，区块间距 112px。允许卡片轻微错位与旋转（-2 到 2 度）。留白宽松，密度中低。装饰可以溢出容器一点，像藤蔓爬出边框。",
    en: "Capped at 1040px with 24px padding, sections 112px apart. Cards may offset and rotate between -2 and 2 degrees. Whitespace runs generous at a low-to-medium density, and ornament may spill past a container like a vine over an edge.",
  },
  dos: [
    { zh: "大地色与花色，暖调为主", en: "Earth and floral tones, warm overall" },
    { zh: "衬线字体，行高 1.8", en: "Serif type at 1.8 leading" },
    { zh: "圆角 16 到 24px，软阴影", en: "Radius 16 to 24px with soft shadows" },
    { zh: "必须有花卉或叶片装饰", en: "Flower or leaf ornament is mandatory" },
    { zh: "hover 上浮 2px 并旋转 0.8 度", en: "Hover lifts 2px and rotates 0.8 degrees" },
    { zh: "带 motion-reduce 降级", en: "Always include a motion-reduce fallback" },
  ],
  donts: [
    { zh: "不要用冷蓝灰色调", en: "No cold blue-grey tones" },
    { zh: "不要用锐角与硬边框", en: "No sharp corners or hard borders" },
    { zh: "不要用霓虹或荧光色", en: "No neon or fluorescent color" },
    { zh: "不要用科技或工业风元素", en: "No tech or industrial elements" },
    { zh: "不要省略装饰", en: "Never omit the ornament" },
    { zh: "不要在无降级的情况下做旋转动画", en: "Never animate rotation without a fallback" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3d3a34",
      background: "#faf6f0",
      card: "#fffdf8",
      green: "#5a8f5a",
      wheat: "#f5d75f",
      rose: "#d4a0a0",
    },
    prompts: [
      {
        zh: "做一个田园风按钮：背景 #5a8f5a、米白文字 #faf6f0、999px 全圆角、衬线 15px、padding 12px 32px、box-shadow 0 4px 10px rgba(90,143,90,0.2)。hover 时 translateY(-2px) rotate(0.8deg)、阴影扩到 0 8px 20px rgba(90,143,90,0.3)；active 时 rotate(0) scale(0.97)、阴影收到 0 2px 6px，transition 500ms ease-in-out 并加 motion-reduce:transform-none。卡片用 #fffdf8 底、24px 圆角、内边距 32px，左上角放一个 32px 的草甸绿叶片装饰。页面底色 #faf6f0，可叠亚麻纹理。",
        en: "Build a cottagecore button: background #5a8f5a, cloth text #faf6f0, fully rounded, serif at 15px, 12px 32px padding, box-shadow 0 4px 10px rgba(90,143,90,0.2). Hover applies translateY(-2px) rotate(0.8deg) with the shadow widened to 0 8px 20px rgba(90,143,90,0.3); active applies rotate(0) scale(0.97) and pulls the shadow to 0 2px 6px, over 500ms ease-in-out plus motion-reduce transform none. Cards use #fffdf8 on a 24px radius with 32px padding and a 32px meadow leaf ornament top-left. The page ground is #faf6f0 with a linen texture.",
      },
    ],
  },
  similar: [
    { name: "Natural Organic", why: { zh: "同为自然取材，但田园核更叙事、更怀旧，装饰密度更高", en: "Both nature-derived, though cottagecore is more narrative and nostalgic with denser ornament" } },
    { name: "Solarpunk", why: { zh: "同样绿色乐观，但太阳朋克面向未来，田园核面向过去", en: "Both green and optimistic, though solarpunk faces forward while cottagecore faces back" } },
  ],
  completeness: "full",
};
