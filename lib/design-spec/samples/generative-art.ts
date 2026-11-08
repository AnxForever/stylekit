import type { DesignSpec } from "../types";

export const generativeArtSpec: DesignSpec = {
  slug: "generative-art",
  name: "生成艺术",
  nameEn: "Generative Art",
  cover: "/styles/generative-art.svg",
  theme: "dark",
  northStar: {
    zh: "一切由函数画出来：噪声、参数与缓动生成一个不重复的界面。",
    en: "Everything is drawn by function — noise, parameters and easing generate a surface that never repeats.",
  },
  summary: {
    zh: "生成艺术用算法而非手绘来构图：近黑底（#0a0a0a）上，SVG 或 canvas 用数学函数绘出圆、线与曲网格，色板由 HSL 旋转从基准紫（#7c3aed）派生，文字一律等宽，动效由数学缓动函数（而非固定 cubic-bezier）驱动，卡片是暗色玻璃（neutral-900 80% 加模糊），交互元素带 0 0 20px 的紫光。它的核心原则是「参数可复现」——同一个种子必须画出同一张图，随机不等于不可控。",
    en: "Generative Art composes by algorithm rather than hand: SVG or canvas draws circles, lines and curve grids from mathematical functions over near black (#0a0a0a), the palette derives from a base violet (#7c3aed) through HSL rotation, all type is monospace, motion is driven by mathematical easing rather than a fixed cubic-bezier, cards are dark glass at 80% neutral-900 with a blur, and interactive elements carry a 0 0 20px violet glow. Its governing principle is reproducibility — one seed must always draw the same image, so randomness never means loss of control.",
  },
  colors: [
    {
      name: "近黑",
      nameEn: "Near Black",
      value: "#0a0a0a",
      group: "surface",
      role: {
        zh: "页面底。让算法绘出的线条与光晕成为唯一光源。",
        en: "The page ground — letting the drawn lines and glows be the only light.",
      },
      token: "--color-near-black",
    },
    {
      name: "基准紫",
      nameEn: "Base Violet",
      value: "#7c3aed",
      group: "brand",
      role: {
        zh: "色板的基准色，HSL 旋转由它派生整族颜色。",
        en: "The palette's base — HSL rotation derives the whole family from it.",
      },
      token: "--color-base-violet",
    },
    {
      name: "算法蓝",
      nameEn: "Algorithm Blue",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "旋转 +30 度的派生色，用于数据与线条。",
        en: "The derived tone at +30 degrees of rotation, on data and lines.",
      },
      token: "--color-algorithm-blue",
    },
    {
      name: "算法青",
      nameEn: "Algorithm Teal",
      value: "#14b8a6",
      group: "accent",
      role: {
        zh: "旋转 +90 度的派生色，用于第二序列。",
        en: "The derived tone at +90 degrees, on the second series.",
      },
      token: "--color-algorithm-teal",
    },
    {
      name: "算法玫",
      nameEn: "Algorithm Rose",
      value: "#f43f5e",
      group: "accent",
      role: {
        zh: "旋转 -60 度的派生色，用于异常与对比。",
        en: "The derived tone at -60 degrees, on anomalies and contrast.",
      },
      token: "--color-algorithm-rose",
    },
    {
      name: "算法橙",
      nameEn: "Algorithm Amber",
      value: "#f59e0b",
      group: "accent",
      role: {
        zh: "旋转 -120 度的派生色，用于高亮。",
        en: "The derived tone at -120 degrees, on highlights.",
      },
      token: "--color-algorithm-amber",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [11, 13, 16, 22, 32, 44],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "0.02em", label: "0.14em" },
      role: {
        zh: "全站等宽。参数、坐标与数值必须等宽，因为它们是这套界面的内容。",
        en: "Monospace throughout — parameters, coordinates and figures are the content here, so they must align.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 44, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", weight: 700, size: 32, lineHeight: 1.2, tracking: "0.02em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 22, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 400, size: 11, lineHeight: 1.45, tracking: "0.14em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1280,
    sectionGap: 96,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "inputs", value: "8px" },
    { element: "dots", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Near Black", value: "#0a0a0a", purpose: "页面底" },
    { level: 1, name: "Dark Glass", value: "rgba(23,23,23,0.80)", purpose: "卡片" },
    { level: 2, name: "Plotted Field", value: "canvas / SVG", purpose: "算法绘图区" },
  ],
  elevation: [
    { name: "Violet glow", value: "0 0 20px rgba(124,58,237,0.40)" },
    { name: "Violet glow strong", value: "0 0 36px rgba(124,58,237,0.60)" },
  ],
  components: [
    {
      name: "Plotted Field",
      role: { zh: "算法绘图区（核心组件）", en: "The plotted field — the core component" },
      construction: {
        zh: "一个 canvas 或 SVG，用数学函数绘制：圆族（半径按 sin 序列）、曲网格（参数方程）、或噪声场（simplex noise 转等高线）。线宽 1px、颜色从 HSL 派生（每次递增 30 度）、不透明度按层递减。所有参数由种子生成，同种子必须重现同一图。",
        en: "A canvas or SVG drawn by function: families of circles whose radii follow a sine series, parametric curve grids, or a noise field contoured into lines. Strokes are 1px, colors derive by stepping hue 30 degrees each pass, and opacity falls per layer. Every parameter comes from a seed, and one seed must always reproduce the same image.",
      },
    },
    {
      name: "Glass Card",
      role: { zh: "玻璃面板", en: "The glass panel" },
      construction: {
        zh: "neutral-900 80% 填充、12px 圆角、1px 白 10% 描边、内边距 24px、20px 背景模糊，外发光 0 0 20px 紫 40%。标题 22px/700 紫白，正文 13px 白 75%。hover 时发光扩到 36px 并让绘图区重新生成一次（新种子）。",
        en: "80% neutral-900 fill, 12px radius, a 1px white border at 10%, 24px padding, a 20px backdrop blur, and a 0 0 20px glow at 40% violet. Title at 22px/700, body at 13px in 75% white. Hover widens the glow to 36px and regenerates the plot with a new seed.",
      },
    },
    {
      name: "Parameter Input",
      role: { zh: "参数输入", en: "Parameter input" },
      construction: {
        zh: "近黑填充、8px 圆角、1px 白 15% 描边、padding 10px 14px、13px 等宽。左侧放 11px 全大写的参数名（如 SEED / FREQ），右侧可放一个 4px 宽的紫滑块。聚焦时描边转紫并加 0 0 0 2px 紫 25% 环。",
        en: "Near black fill, 8px radius, a 1px white border at 15%, 10px 14px padding at 13px monospace. An 11px uppercase parameter name sits on the left (SEED, FREQ) with a 4px violet slider on the right. Focus turns the border violet and adds a 2px ring at 25%.",
      },
    },
    {
      name: "Easing Preview",
      role: { zh: "缓动可视化", en: "The easing preview" },
      construction: {
        zh: "一条小的曲线图（120×80px），画出当前缓动函数的形状（如 cubic-bezier 或指数衰减），线宽 2px 紫色，网格 1px 白 8%。旁边用等宽小字显示函数名与参数。动效由该曲线实际驱动，预览即真实。",
        en: "A small curve plot (120 by 80px) drawing the current easing function — a cubic-bezier or exponential decay — at a 2px violet stroke on a 1px grid at 8% white. The function name and parameters sit beside it in small monospace. The animation is actually driven by that curve, so the preview never lies.",
      },
    },
    {
      name: "Glow Node",
      role: { zh: "发光节点", en: "The glow node" },
      construction: {
        zh: "8px 实心圆（紫或派生色）带 0 0 20px 同色 60% 光晕，放在标签左端或绘图区的数据点上。hover 时光晕扩到 36px 并弹出 11px 的等宽数值提示。",
        en: "An 8px solid dot in violet or a derived tone with a 0 0 20px glow at 60%, sitting at a label's left edge or on a datum in the plot. Hover widens the glow to 36px and pops an 11px monospace value tip.",
      },
    },
  ],
  imagery: {
    zh: "图像即算法输出：噪声场、参数曲线、点阵、网格、粒子轨迹。允许把照片按像素采样后重绘为几何图元。不使用摄影原图、柔和插画与手工装饰。",
    en: "The imagery is algorithmic output: noise fields, parametric curves, dot matrices, grids, particle trails. A photo may be sampled and redrawn as primitives. No raw photography, soft illustration or handmade ornament.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 24px，区块间距 96px。允许绘图区溢出容器。参数栏可固定在侧边。整页保持黑底，所有亮色都来自绘制物与光晕。",
    en: "Capped at 1280px with 24px padding, sections 96px apart. Plots may bleed past the container, and a parameter rail may pin to the side. The page stays black, with every bright value coming from drawn matter and glow.",
  },
  dos: [
    { zh: "一切由函数与种子生成", en: "Everything is generated from function and seed" },
    { zh: "同种子必须复现同图", en: "One seed always reproduces one image" },
    { zh: "色板由 HSL 旋转从基准紫派生", en: "The palette derives from base violet by HSL rotation" },
    { zh: "全站等宽字体", en: "Monospace throughout" },
    { zh: "动效由数学缓动函数驱动", en: "Motion is driven by mathematical easing" },
    { zh: "卡片是暗色玻璃加紫光", en: "Cards are dark glass with a violet glow" },
  ],
  donts: [
    { zh: "不要用不可复现的纯随机", en: "No unreproducible pure randomness" },
    { zh: "不要用非等宽字体作正文", en: "No non-monospace body text" },
    { zh: "不要用亮底", en: "No light grounds" },
    { zh: "不要用固定 cubic-bezier 敷衍缓动", en: "Do not settle for a fixed cubic-bezier" },
    { zh: "不要让绘图区压过文字", en: "Never let the plot overpower the text" },
    { zh: "不要用柔和阴影", en: "No soft shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e5e5e5",
      background: "#0a0a0a",
      violet: "#7c3aed",
      blue: "#3b82f6",
      teal: "#14b8a6",
      rose: "#f43f5e",
    },
    prompts: [
      {
        zh: "做一个生成艺术面板：近黑 #0a0a0a 底，一个 canvas 用参数方程绘制曲网格（线宽 1px、颜色从 #7c3aed 起按 HSL 每次 +30 度派生、不透明度逐层递减），所有参数由固定种子生成。上层放一块玻璃卡 rgba(23,23,23,0.8) 填充、12px 圆角、1px rgba(255,255,255,0.1) 描边、20px 背景模糊、内边距 24px、box-shadow 0 0 20px rgba(124,58,237,0.4)。文字全部等宽，标题 22px/700、正文 13px。参数输入用 11px 全大写标签，聚焦时描边转 #7c3aed 加 2px 环。",
        en: "Build a generative art panel: near black #0a0a0a ground with a canvas drawing a parametric curve grid (1px strokes, colors derived from #7c3aed by +30 degrees of HSL per pass, opacity falling per layer), every parameter coming from a fixed seed. Above sits a glass card at rgba(23,23,23,0.8) fill, 12px radius, a 1px rgba(255,255,255,0.1) border, a 20px backdrop blur, 24px padding and box-shadow 0 0 20px rgba(124,58,237,0.4). All type is monospace: 22px/700 headings, 13px body. Parameter inputs carry 11px uppercase labels, with focus turning the border #7c3aed and adding a 2px ring.",
      },
    ],
  },
  similar: [
    { name: "Particle", why: { zh: "同为程序化视觉，但粒子是点与连线，生成艺术是函数曲线", en: "Both procedural, though particles are points and links while this is function-drawn curve" } },
    { name: "Shader Gradient", why: { zh: "同为实时计算，但着色器画场，生成艺术画结构", en: "Both computed live, though a shader paints a field while this plots structure" } },
  ],
  completeness: "full",
};
