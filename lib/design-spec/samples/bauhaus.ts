import type { DesignSpec } from "../types";

export const bauhausSpec: DesignSpec = {
  slug: "bauhaus",
  name: "包豪斯风格",
  nameEn: "Bauhaus",
  cover: "/styles/bauhaus.svg",
  theme: "light",
  northStar: {
    zh: "形式追随功能：圆、方、三角与三原色，其余一律删掉。",
    en: "Form follows function: circle, square, triangle and the primaries — everything else removed.",
  },
  summary: {
    zh: "包豪斯是一套功能主义的设计纪律，不是一种装饰。它的规则极简到近乎苛刻：只用基本几何（圆、方、三角）、只用三原色加黑白、不用阴影、不用渐变、不用装饰性插图。层次通过尺度与色块面积建立，文字主导版面且一律左对齐。与几何大胆风的区别在于克制——包豪斯不允许为了动势而旋转与重叠，每个元素都必须有功能位置。",
    en: "Bauhaus is a functionalist discipline, not a decoration. Its rules are severe: only basic geometry (circle, square, triangle), only the primaries plus black and white, no shadow, no gradient, no ornamental illustration. Hierarchy comes from scale and the area a block occupies, and type leads the page from a flush-left edge. What separates it from Geometric Bold is restraint — Bauhaus does not rotate or overlap for momentum; every element must earn a functional position.",
  },
  colors: [
    {
      name: "黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "文字、描边与最深色块。功能主义需要绝对的对比。",
        en: "Type, rules and the darkest block — functionalism wants absolute contrast.",
      },
      token: "--color-black",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "画布与反白文字。不做灰阶过渡。",
        en: "Canvas and reversed-out type. No grey steps.",
      },
      token: "--color-white",
    },
    {
      name: "红",
      nameEn: "Red",
      value: "#ff0000",
      group: "accent",
      role: {
        zh: "警示与主强调。全屏面积不超过 20%。",
        en: "Alerts and primary emphasis, never above twenty percent of a screen.",
      },
      token: "--color-red",
    },
    {
      name: "黄",
      nameEn: "Yellow",
      value: "#ffcc00",
      group: "accent",
      role: {
        zh: "高亮与区块底色，用于承载深色文字。",
        en: "Highlights and block grounds, used to carry dark text.",
      },
      token: "--color-yellow",
    },
    {
      name: "蓝",
      nameEn: "Blue",
      value: "#0000ff",
      group: "accent",
      role: {
        zh: "链接与信息区块，是三原色里最冷静的一支。",
        en: "Links and informational blocks — the calmest of the three primaries.",
      },
      token: "--color-blue",
    },
  ],
  fonts: [
    {
      family: "Futura",
      substitute: "'Jost', 'Century Gothic', 'Helvetica Neue', sans-serif",
      weights: [400, 700],
      sizes: [12, 14, 18, 28, 48, 72],
      lineHeight: { display: 1, heading: 1.1, body: 1.55 },
      tracking: { display: "-0.02em", label: "0.14em" },
      role: {
        zh: "全站唯一字体，几何无衬线，只用 400 与 700。标题左对齐、字距收紧；标签全大写、字距放开。",
        en: "The only face: a geometric sans in 400 and 700 only. Headings sit flush left on tight tracking; labels are uppercase and widely tracked.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 72, lineHeight: 1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", weight: 700, size: 48, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 700, size: 28, lineHeight: 1.1, token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1200,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "shapes", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "画布" },
    { level: 1, name: "Primary Block", value: "#ffcc00", purpose: "色块分区" },
    { level: 2, name: "Black Block", value: "#000000", purpose: "深色分区与页脚" },
  ],
  elevation: [{ name: "None", value: "none" }],
  components: [
    {
      name: "Function Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "纯黑填充、白字、零圆角、无阴影、无描边。14px/700、全大写、0.14em 字距、padding 14px 28px。hover 时填充换成红并保持白字；按下时整体位移到 1px 描边状态（无位移动画）。过渡 120ms。",
        en: "Black fill, white text, zero radius, no shadow, no border. 14px at weight 700, uppercase, 0.14em tracking, 14px 28px padding. Hover switches the fill to red while keeping white text; press settles into a 1px border state with no translation. 120ms.",
      },
      sizes: "padding 14px 28px; label 14px",
      states: "hover: red fill; active: 1px border, black fill",
    },
    {
      name: "Primary Block",
      role: { zh: "色块分区与信息卡", en: "Color-block sections and info cards" },
      construction: {
        zh: "整块填三原色之一（红、黄、蓝），零圆角、无描边、无阴影，内边距 32px。块内文字用黑或白按对比度选择，字号至少 18px。一个区块只用一种颜色，禁止在同一块内混两种。",
        en: "A full block of one primary — red, yellow or blue — with zero radius, no border, no shadow and 32px padding. Text inside is black or white chosen for contrast at 18px minimum. One block, one color; never mix two inside a block.",
      },
    },
    {
      name: "Geometric Frame",
      role: { zh: "图片与内容框架", en: "Image and content frame" },
      construction: {
        zh: "容器零圆角、1px 黑描边（或无描边），内部图像可为圆形或半圆裁切。允许在区块角落放一个 96px 到 160px 的实心圆或三角作为构图元素，但不得遮挡文字。",
        en: "A square container with a 1px black border (or none) whose image may be cropped to a circle or semicircle. A 96px to 160px solid circle or triangle may sit in a corner as a compositional element, but it never covers text.",
      },
    },
    {
      name: "Type Stack",
      role: { zh: "标题与正文排版组", en: "The heading and body stack" },
      construction: {
        zh: "一律左对齐，标题 48 到 72px 加 0.14em 字距的全大写标签置于其上，两者间距 16px。正文单栏、行长不超过 70 字符。禁止居中与右对齐。",
        en: "Always flush left, with a 14px uppercase label at 0.14em tracking sitting 16px above a 48 to 72px heading. Body runs single-column at a seventy-character measure. Centred and right alignment are refused.",
      },
    },
  ],
  imagery: {
    zh: "几何构成与黑白摄影。允许把照片裁成圆形或半圆嵌入色块。不使用彩色摄影、装饰插画与任何非基本几何的形状。",
    en: "Geometric composition and black-and-white photography. A photo may be cropped into a circle or semicircle inside a color block. No color photography, decorative illustration or shapes beyond the basics.",
  },
  layout: {
    zh: "上限 1200px、12 栏、24px 间距。区块间距 96px，色块可跨 4 到 6 栏。所有内容贴齐栏线左边缘，标题可跨 8 栏。禁止重叠与旋转。",
    en: "Capped at 1200px over twelve columns with 24px gutters. Sections sit 96px apart and color blocks span four to six columns. Everything aligns to the left column edge, with headings free to run eight columns. No overlap and no rotation.",
  },
  dos: [
    { zh: "只用圆、方、三角三种形状", en: "Only circles, squares and triangles" },
    { zh: "只用三原色加黑白", en: "Only the primaries plus black and white" },
    { zh: "一切左对齐", en: "Flush left everywhere" },
    { zh: "零圆角、零阴影、零渐变", en: "Zero radius, zero shadow, zero gradient" },
    { zh: "层次靠字号与色块面积", en: "Hierarchy from type size and block area" },
    { zh: "标签 12px 全大写 0.14em", en: "Labels at 12px uppercase on 0.14em" },
  ],
  donts: [
    { zh: "不要旋转或重叠元素", en: "Do not rotate or overlap elements" },
    { zh: "不要用渐变与阴影", en: "No gradients and no shadows" },
    { zh: "不要混用两套圆角", en: "Never mix two radius systems" },
    { zh: "不要引入三原色之外的颜色", en: "Do not introduce color outside the primaries" },
    { zh: "不要用装饰性插画", en: "No decorative illustration" },
    { zh: "不要居中排版", en: "Never centre the layout" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      red: "#ff0000",
      yellow: "#ffcc00",
      blue: "#0000ff",
      border: "#000000",
    },
    prompts: [
      {
        zh: "做一个包豪斯风格区块：白色画布，左侧放一块占 6 栏的黄色实心色块（零圆角、无阴影、内边距 32px），块内黑字 28px/700 左对齐，上方 12px 全大写 0.14em 标签。右侧 6 栏放黑白摄影，裁成圆形。整体对齐 12 栏网格、24px 间距，区块间距 96px。",
        en: "Build a Bauhaus section: a white canvas with a solid yellow block spanning six columns on the left (zero radius, no shadow, 32px padding), holding 28px/700 black text flush left under a 12px uppercase 0.14em label. The right six columns carry black-and-white photography cropped to a circle. Everything snaps to a twelve-column grid with 24px gutters and 96px between sections.",
      },
    ],
  },
  similar: [
    { name: "Geometric Bold", why: { zh: "同一套几何与三原色，但那边允许旋转与重叠", en: "Same geometry and primaries, though that one allows rotation and overlap" } },
    { name: "Swiss Style", why: { zh: "同样的网格与左对齐，但瑞士风格用无衬线排版而非色块", en: "Same grid and flush-left rule, though Swiss leans on typography rather than blocks" } },
  ],
  completeness: "full",
};
