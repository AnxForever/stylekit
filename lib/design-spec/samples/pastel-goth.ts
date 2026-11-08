import type { DesignSpec } from "../types";

export const pastelGothSpec: DesignSpec = {
  slug: "pastel-goth",
  name: "粉彩哥特",
  nameEn: "Pastel Goth",
  cover: "/styles/pastel-goth.svg",
  theme: "dark",
  northStar: {
    zh: "骷髅长在薰衣草色的糖霜里：暗的内核，软的表面。",
    en: "Skulls growing out of lavender frosting — a dark core with a soft surface.",
  },
  summary: {
    zh: "粉彩哥特把暗色美学与糖果色缝在一起：深紫（#2d1b3d）与近黑（#1a1225）作底，薰衣草紫（#d4a5e3）与粉蓝（#7ec8c8）作主文本，粉（#f5a5b8）与长春花紫（#b8a5f5）作装饰。图形语汇是哥特的（骷髅、十字、星星、蝙蝠）但处理成粉彩、圆润、可爱——反差就是全部。圆角取 12 到 16px「柔和但不过于可爱」，边框是粉彩 30% 半透明，标题可粗但必须配粉彩色柔化。",
    en: "Pastel Goth stitches dark aesthetics to candy color: deep violet (#2d1b3d) and near black (#1a1225) underneath, lavender (#d4a5e3) and pastel blue (#7ec8c8) carrying the text, pink (#f5a5b8) and periwinkle (#b8a5f5) decorating. The vocabulary is Gothic — skulls, crosses, stars, bats — but rendered pastel, rounded and cute. The contrast is the entire style. Radii sit at 12 to 16px, soft without turning cute, borders are 30% pastel, and headings may be bold as long as the pastel softens them.",
  },
  colors: [
    {
      name: "深紫",
      nameEn: "Deep Violet",
      value: "#2d1b3d",
      group: "surface",
      role: {
        zh: "页面主底。紫得刚好，比纯黑柔。",
        en: "The main ground — violet enough to read softer than black.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#1a1225",
      group: "surface",
      role: {
        zh: "最深区块与卡片底。带紫的黑。",
        en: "The deepest blocks and card grounds — a violet black.",
      },
      token: "--color-near-black",
    },
    {
      name: "薰衣草",
      nameEn: "Lavender",
      value: "#d4a5e3",
      group: "brand",
      role: {
        zh: "主文本与主描边。整套风格的识别色。",
        en: "Primary text and borders — the identifying color.",
      },
      token: "--color-lavender",
    },
    {
      name: "粉蓝",
      nameEn: "Pastel Blue",
      value: "#7ec8c8",
      group: "brand",
      role: {
        zh: "第二文本色与冷侧强调。",
        en: "The second text tone and the cool emphasis.",
      },
      token: "--color-pastel-blue",
    },
    {
      name: "粉",
      nameEn: "Blush",
      value: "#f5a5b8",
      group: "accent",
      role: {
        zh: "情绪化强调与「可爱」那一侧。",
        en: "Emotional emphasis and the cute side of the contrast.",
      },
      token: "--color-blush",
    },
    {
      name: "长春花紫",
      nameEn: "Periwinkle",
      value: "#b8a5f5",
      group: "accent",
      role: {
        zh: "第三装饰色，用于渐变与图标。",
        en: "The third decorative tone on gradients and icons.",
      },
      token: "--color-periwinkle",
    },
  ],
  fonts: [
    {
      family: "Quicksand",
      substitute: "'Trebuchet MS', 'Segoe UI', sans-serif",
      weights: [500, 700],
      sizes: [12, 15, 19, 26, 34, 46],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.7 },
      tracking: { display: "0.01em", label: "0.14em" },
      role: {
        zh: "圆润无衬线，标题 700 但字形柔和。硬朗的字体会破坏反差。",
        en: "A rounded sans with headings at 700 while the letterforms stay soft. A hard face would break the contrast.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 46, lineHeight: 1.2, tracking: "0.01em", token: "--text-display" },
    { role: "heading", weight: 700, size: 34, lineHeight: 1.3, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 26, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", weight: 500, size: 19, lineHeight: 1.65, token: "--text-body-lg" },
    { role: "body", weight: 500, size: 15, lineHeight: 1.7, token: "--text-body" },
    { role: "label", weight: 700, size: 12, lineHeight: 1.5, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1080,
    sectionGap: 96,
    cardPadding: 28,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "12px" },
    { element: "inputs", value: "12px" },
    { element: "icons", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Deep Violet", value: "#2d1b3d", purpose: "页面底" },
    { level: 1, name: "Near Black", value: "#1a1225", purpose: "卡片" },
    { level: 2, name: "Lavender Wash", value: "rgba(212,165,227,0.10)", purpose: "强调底" },
  ],
  elevation: [
    { name: "Pastel glow", value: "0 0 20px rgba(212,165,227,0.30)" },
    { name: "Pink glow", value: "0 0 20px rgba(245,165,184,0.28)" },
  ],
  components: [
    {
      name: "Soft Goth Card",
      role: { zh: "柔和哥特卡片（核心组件）", en: "The soft goth card — the core component" },
      construction: {
        zh: "近黑填充、16px 圆角、1px 薰衣草 30% 描边、内边距 28px，外带 0 0 20px 薰衣草 30% 柔光。标题 34px/700 薰衣草，正文 15px 粉蓝 80%。四角各放一个 12px 的粉彩十字或骷髅线稿（1px 线，不填充）。hover 时描边升到 60%、柔光转粉。",
        en: "Near black fill, 16px radius, a 1px lavender border at 30%, 28px padding, with a 0 0 20px soft glow at 30% lavender. The title runs 34px/700 in lavender with body at 15px in 80% pastel blue. A 12px pastel cross or skull line drawing (1px, unfilled) marks each corner. Hover raises the border to 60% and shifts the glow to pink.",
      },
      states: "hover: border 60%, pink glow",
    },
    {
      name: "Candy Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "薰衣草填充、深紫文字、12px 圆角、1px 粉蓝 40% 描边、15px/700、padding 12px 28px，外带 0 0 20px 薰衣草 30% 柔光。hover 时填充转粉、描边转长春花紫；按下缩放 0.98。过渡 200ms。",
        en: "Lavender fill, deep violet text, 12px radius, a 1px pastel blue border at 40%, 15px/700, 12px 28px padding, with a 0 0 20px soft glow at 30% lavender. Hover moves the fill to pink and the border to periwinkle; press scales 0.98. 200ms.",
      },
      sizes: "padding 12px 28px; label 15px",
      states: "hover: pink fill; active: scale 0.98",
    },
    {
      name: "Skull Motif",
      role: { zh: "骷髅与十字装饰", en: "Skull and cross ornaments" },
      construction: {
        zh: "24 到 64px 的线稿骷髅、十字、蝙蝠或星星，stroke 2px、颜色薰衣草或粉、绝不填充黑色。可填充 15% 的粉彩底。它必须「可爱化」——圆一点的颅骨、胖一点的骨头。单屏 2 到 4 处。",
        en: "A 24 to 64px line skull, cross, bat or star at a 2px stroke in lavender or pink, never filled black, optionally on a 15% pastel ground. It must be softened — a rounder cranium, a chubbier bone. Two to four per screen.",
      },
    },
    {
      name: "Pastel Gradient",
      role: { zh: "粉彩渐变带", en: "The pastel gradient band" },
      construction: {
        zh: "薰衣草经粉到长春花紫的横向渐变（或粉蓝经薰衣草到粉），高 4 到 8px，用于卡片顶部或分隔。渐变必须柔和且只在粉彩范围内过渡，绝不出现深色站。",
        en: "A horizontal gradient from lavender through pink into periwinkle (or pastel blue through lavender into pink) at 4 to 8px tall, capping a card or dividing a section. It stays soft and never includes a dark stop.",
      },
    },
    {
      name: "Ghost Field",
      role: { zh: "表单输入", en: "Input field" },
      construction: {
        zh: "近黑填充、12px 圆角、1px 薰衣草 25% 描边、padding 10px 16px、15px 字。占位符粉蓝 45%。聚焦时描边转薰衣草 60% 并加 3px 的薰衣草 20% 外环。",
        en: "Near black fill, 12px radius, a 1px lavender border at 25%, 10px 16px padding at 15px. The placeholder sits at 45% pastel blue. Focus turns the border to 60% lavender and adds a 3px ring at 20%.",
      },
    },
  ],
  imagery: {
    zh: "粉彩哥特插画：骷髅、蝙蝠、十字、星星、蜘蛛网，处理成粉彩与柔光。允许把照片压成薰衣草双色调。不使用写实恐怖图像、纯黑图形与高饱和插画。",
    en: "Pastel goth illustration: skulls, bats, crosses, stars, spiderwebs rendered in pastel under soft light. A photo may be graded lavender duotone. No realistic horror imagery, pure black graphics or saturated illustration.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 96px。允许装饰轻微旋转（-6 到 6 度）与错位。留白中等，装饰密度中高但必须柔和。",
    en: "Capped at 1080px with 24px padding, sections 96px apart. Ornament may rotate between -6 and 6 degrees and offset. Whitespace stays moderate with a medium-to-high ornament density, always kept soft.",
  },
  dos: [
    { zh: "深紫近黑底配粉彩", en: "Deep violet to near black with pastels" },
    { zh: "哥特元素但处理成粉彩圆润", en: "Gothic elements rendered pastel and rounded" },
    { zh: "圆角 12 到 16px", en: "Radius 12 to 16px" },
    { zh: "边框粉彩 30% 半透明", en: "Borders at 30% pastel" },
    { zh: "标题可粗但配粉彩色", en: "Headings may be bold alongside pastel color" },
    { zh: "渐变只在粉彩范围内", en: "Gradients stay within the pastels" },
  ],
  donts: [
    { zh: "不要用写实恐怖图像", en: "No realistic horror imagery" },
    { zh: "不要用纯黑填充图形", en: "Never fill a graphic pure black" },
    { zh: "不要用硬朗字体", en: "No hard-edged typeface" },
    { zh: "不要在渐变里加深色站", en: "Never add a dark gradient stop" },
    { zh: "不要用锐角", en: "No sharp right angles" },
    { zh: "不要让元素变成纯可爱", en: "Never let it turn purely cute" },
  ],
  promptGuide: {
    quickColors: {
      text: "#d4a5e3",
      background: "#2d1b3d",
      lavender: "#d4a5e3",
      blue: "#7ec8c8",
      blush: "#f5a5b8",
      periwinkle: "#b8a5f5",
    },
    prompts: [
      {
        zh: "做一个粉彩哥特卡片：近黑 #1a1225 填充、16px 圆角、1px rgba(212,165,227,0.3) 描边、内边距 28px、box-shadow 0 0 20px rgba(212,165,227,0.3)。标题 34px/700 Quicksand、色 #d4a5e3；正文 15px、色 rgba(126,200,200,0.8)。四角各放一个 12px 的粉彩十字线稿（2px 描边、薰衣草、不填充）。按钮薰衣草 #d4a5e3 填充、深紫文字、12px 圆角、1px 粉蓝描边、padding 12px 28px，hover 时填充转 #f5a5b8。卡片顶部加一条 6px 的粉彩渐变带（#d4a5e3 → #f5a5b8 → #b8a5f5）。页面底色 #2d1b3d，全站零纯黑填充、零锐角。",
        en: "Build a pastel goth card: near black #1a1225 fill, 16px radius, a 1px rgba(212,165,227,0.3) border, 28px padding, box-shadow 0 0 20px rgba(212,165,227,0.3). The title runs 34px/700 Quicksand in #d4a5e3 with body at 15px in rgba(126,200,200,0.8). A 12px pastel cross line drawing (2px lavender stroke, unfilled) marks each corner. The button fills lavender #d4a5e3 with deep violet text on a 12px radius, a 1px pastel blue border and 12px 28px padding, moving to #f5a5b8 on hover. A 6px pastel gradient band (#d4a5e3 to #f5a5b8 to #b8a5f5) caps the card. The page ground is #2d1b3d, with no pure black fill and no sharp corner anywhere.",
      },
    ],
  },
  similar: [
    { name: "Gothic Lolita", why: { zh: "同为暗色可爱，但哥特萝莉是蕾丝与缎带，粉彩哥特是糖霜与骷髅", en: "Both dark and cute, though Gothic Lolita is lace and ribbon while this is frosting and skull" } },
    { name: "Kawaii Minimal", why: { zh: "同样粉彩柔和，但可爱极简无哥特元素", en: "Both pastel and soft, though kawaii carries no gothic element" } },
  ],
  completeness: "full",
};
