import type { DesignSpec } from "../types";

export const blueprintSpec: DesignSpec = {
  slug: "blueprint",
  name: "工程蓝图",
  nameEn: "Blueprint",
  cover: "/styles/blueprint.svg",
  theme: "dark",
  northStar: {
    zh: "蓝底白线：网格、坐标、标注、尺寸线，一张还没施工的图。",
    en: "White lines on blue: grids, coordinates, callouts and dimension marks — a drawing before it is built.",
  },
  summary: {
    zh: "工程蓝图模仿技术制图：蓝图蓝底（#1e3a5f）上铺 1px 的白色或浅蓝网格，所有线条与文字都是白色或浅蓝，标注和尺寸线用橙色高亮，字体必须是等宽以维持制图感。元素的边框都是 1px 半透明白，辅助线用虚线，卡片是半透明的同色蓝加轻微模糊（像描图纸叠在图上）。它禁止暖色背景、禁止圆润柔和元素、禁止渐变填充——线条与色块必须纯色。",
    en: "Blueprint imitates technical drafting: a blueprint blue ground (#1e3a5f) carrying 1px white or pale blue grids, with every line and label in white or pale blue, callouts and dimension lines in orange, and monospace type holding the drafting feel. Borders are 1px translucent white, auxiliary lines run dashed, and cards are a translucent blue of the same family with a slight blur — tracing paper laid over the drawing. Warm grounds, soft rounded elements and gradient fills are all refused; lines and blocks stay solid.",
  },
  colors: [
    {
      name: "蓝图蓝",
      nameEn: "Blueprint Blue",
      value: "#1e3a5f",
      group: "surface",
      role: {
        zh: "页面底。制图纸的蓝，所有白线与网格铺在它上面。",
        en: "The page ground — drafting blue that all white lines and grids sit on.",
      },
      token: "--color-blueprint-blue",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "brand",
      role: {
        zh: "主线条与主要文字。制图的白线。",
        en: "Primary lines and text — the drafting line.",
      },
      token: "--color-white",
    },
    {
      name: "浅蓝",
      nameEn: "Pale Blue",
      value: "#a0c4e8",
      group: "accent",
      role: {
        zh: "次级线条、网格与辅助文字，比白色弱一档。",
        en: "Secondary lines, grids and helper text, one step quieter than white.",
      },
      token: "--color-pale-blue",
    },
    {
      name: "中蓝",
      nameEn: "Mid Blue",
      value: "#4a90d9",
      group: "accent",
      role: {
        zh: "链接与选中态，是画面里最饱和的蓝。",
        en: "Links and selection — the most saturated blue in the frame.",
      },
      token: "--color-mid-blue",
    },
    {
      name: "标注橙",
      nameEn: "Callout Orange",
      value: "#ff6b35",
      group: "accent",
      role: {
        zh: "唯一暖色，只用于标注、尺寸线与需要被指出的问题。",
        en: "The only warm tone, on callouts, dimension lines and anything that must be pointed at.",
      },
      token: "--color-callout-orange",
    },
    {
      name: "修订紫",
      nameEn: "Revision Violet",
      value: "#b071e4",
      group: "accent",
      role: {
        zh: "修订标记与版本注记，出现频率最低。",
        en: "Revision marks and version notes, used least.",
      },
      token: "--color-revision-violet",
    },
  ],
  fonts: [
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [10, 11, 13, 16, 22, 32],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.65 },
      tracking: { display: "0.08em", label: "0.16em" },
      role: {
        zh: "全站唯一等宽字体。制图里的每个字都是标注，字距必须放开。",
        en: "The only face, monospace. Every word on a drawing is an annotation, so tracking stays open.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "heading", weight: 700, size: 32, lineHeight: 1.2, tracking: "0.08em", token: "--text-heading" },
    { role: "subheading", weight: 700, size: 22, lineHeight: 1.3, tracking: "0.08em", token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 13, lineHeight: 1.65, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 11, lineHeight: 1.6, token: "--text-body-sm" },
    { role: "label", weight: 700, size: 10, lineHeight: 1.4, tracking: "0.16em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1280,
    sectionGap: 48,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Blueprint Blue", value: "#1e3a5f", purpose: "页面底（带网格）" },
    { level: 1, name: "Tracing Paper", value: "rgba(30,58,95,0.60)", purpose: "卡片（半透明）" },
  ],
  elevation: [
    { name: "None", value: "none — the drawing is flat" },
    { name: "Card focus", value: "0 0 0 1px rgba(255,255,255,0.30)" },
  ],
  components: [
    {
      name: "Grid Bed",
      role: { zh: "网格底（核心结构）", en: "The grid bed — the core structure" },
      construction: {
        zh: "两层 repeating-linear-gradient 叠出 8px 小格与 80px 大格的白色网格：小格 1px 白 5%，大格 1px 白 10%。全页固定覆盖，pointer-events: none。它让整页读起来像一张图纸。",
        en: "Two repeating linear gradients produce an 8px minor grid in 1px white at 5% and an 80px major grid in 1px white at 10%, fixed across the page with pointer-events none. It makes the page read as a drawing.",
      },
    },
    {
      name: "Drafting Card",
      role: { zh: "内容卡与图块", en: "Content cards and blocks" },
      construction: {
        zh: "蓝图蓝 60% 填充、12px 模糊、零圆角、1px 白 30% 描边、内边距 20px。左上角放 12px 等宽全大写的图块编号（如 FIG. 01），右上角放尺寸标记。hover 时描边升到 60%。",
        en: "60% blueprint fill with a 12px blur, zero radius, a 1px white border at 30%, 20px padding. A 12px monospace uppercase figure number such as FIG. 01 sits top-left with a dimension mark top-right. Hover raises the border to 60%.",
      },
    },
    {
      name: "Dimension Line",
      role: { zh: "尺寸线与标注", en: "Dimension lines and callouts" },
      construction: {
        zh: "一条 1px 白 50% 的直线，两端各一个 4px 的短垂线作为端点标记，中间放 10px 等宽标注文字（如 2400）。关键标注用橙色 #ff6b35。用于说明间距与尺寸。",
        en: "A 1px white line at 50% with a 4px perpendicular tick at each end and a 10px monospace label in the middle such as 2400. Critical callouts take orange #ff6b35. It annotates spacing and dimensions.",
      },
    },
    {
      name: "Draft Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 白 40% 描边、零圆角、11px 等宽全大写 0.16em、padding 10px 20px。hover 时填充白 12%、描边转白、文字保持白；按下时填充升到 20%。过渡 120ms linear。",
        en: "Transparent fill, a 1px white border at 40%, zero radius, 11px monospace uppercase at 0.16em, 10px 20px padding. Hover fills 12% white and takes the border to full while the text stays white; press raises the fill to 20%. 120ms linear.",
      },
      sizes: "padding 10px 20px; label 11px",
      states: "hover: fill 12%, border white; active: fill 20%",
    },
    {
      name: "Auxiliary Rule",
      role: { zh: "辅助虚线", en: "Auxiliary dashed rules" },
      construction: {
        zh: "1px 虚线（dash 4px、gap 4px），颜色白 25% 或浅蓝 40%，用于引出标注、连接图块与说明。它绝不用于装饰，只用于表示「这条线与那个对象有关」。",
        en: "A 1px dash at 4px intervals with 4px gaps, in 25% white or 40% pale blue, used to lead a callout to the object it describes. It never decorates; it only states that this line relates to that part.",
      },
    },
  ],
  imagery: {
    zh: "技术插图：剖面图、平面图、爆炸图、流程图与结构示意，全部白线绘制。允许把照片处理成蓝底白线的线稿。不使用彩色摄影、柔和插画与装饰图形。",
    en: "Technical illustration: sections, plans, exploded views, flow diagrams and structural schematics, all drawn in white line. A photo may be reduced to a white-line drawing on blue. No color photography, soft illustration or decorative graphics.",
  },
  layout: {
    zh: "上限 1280px、容器内边距 16px，图块间距 12px，形成图纸式的密集排布。允许图块以 1px 白线拼接成大图。所有尺寸取 4 的倍数，与网格对齐。",
    en: "Capped at 1280px with 16px padding and 12px between blocks, producing a drawing's density. Blocks may join on 1px white lines into a larger plate. Dimensions are multiples of four, aligned to the grid.",
  },
  dos: [
    { zh: "蓝底白线，铺 8px 与 80px 双层网格", en: "White on blue with 8px and 80px grids" },
    { zh: "全站等宽字体", en: "Monospace throughout" },
    { zh: "标注用橙色高亮", en: "Callouts highlight in orange" },
    { zh: "辅助线用虚线", en: "Auxiliary lines are dashed" },
    { zh: "零圆角、纯色填充", en: "Zero radius, solid fills" },
    { zh: "图块带编号与尺寸标记", en: "Blocks carry figure numbers and dimensions" },
  ],
  donts: [
    { zh: "不要用暖色背景", en: "No warm grounds" },
    { zh: "不要用圆润柔和元素", en: "No soft rounded elements" },
    { zh: "不要用渐变填充", en: "No gradient fills" },
    { zh: "不要用彩色摄影", en: "No color photography" },
    { zh: "不要用衬线或无衬线字体", en: "No serif or sans type" },
    { zh: "不要让辅助线变成装饰", en: "Never let auxiliary lines become decoration" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#1e3a5f",
      pale: "#a0c4e8",
      accent: "#4a90d9",
      callout: "#ff6b35",
      card: "rgba(30,58,95,0.60)",
    },
    prompts: [
      {
        zh: "做一个工程蓝图卡片：背景 rgba(30,58,95,0.6)、backdrop-blur 12px、零圆角、1px rgba(255,255,255,0.3) 描边、内边距 20px。左上角 12px 等宽全大写图块编号（FIG. 01），右上角尺寸标记。页面底 #1e3a5f 上铺双层网格：8px 小格用 1px 白 5%、80px 大格用 1px 白 10%。关键标注用橙色 #ff6b35，辅助线用 1px 虚线（dash 4px、gap 4px、白 25%）。全站等宽字体。",
        en: "Build a blueprint card: background rgba(30,58,95,0.6) with a 12px backdrop blur, zero radius, a 1px rgba(255,255,255,0.3) border, 20px padding. A 12px monospace uppercase figure number (FIG. 01) sits top-left with a dimension mark top-right. The #1e3a5f page ground carries two grids: 8px minor cells at 1px white 5% and 80px major cells at 1px white 10%. Critical callouts use #ff6b35 and auxiliary lines are 1px dashes at 4px intervals in 25% white. Monospace throughout.",
      },
    ],
  },
  similar: [
    { name: "Sci-Fi HUD", why: { zh: "同为技术界面，但 HUD 发光，蓝图是纸上白线", en: "Both technical, though the HUD glows while a blueprint is white line on paper" } },
    { name: "Data Dense", why: { zh: "同样追求密度与标注，但数据密集是表格，蓝图是制图", en: "Both value density and annotation, though dense data uses tables while this is drafting" } },
  ],
  completeness: "full",
};
