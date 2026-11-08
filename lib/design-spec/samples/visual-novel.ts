import type { DesignSpec } from "../types";

export const visualNovelSpec: DesignSpec = {
  slug: "visual-novel",
  name: "视觉小说风",
  nameEn: "Visual Novel",
  cover: "/styles/visual-novel.svg",
  theme: "dark",
  northStar: {
    zh: "半透明的对话框浮在场景上，一切为「读下去」让路。",
    en: "A translucent dialogue panel floats over the scene, and everything else yields to reading.",
  },
  summary: {
    zh: "视觉小说风来自 ADV 游戏界面：场景是一张插画，对话框是压在下方的一块 85% 不透明的深色面板，角色名在面板左上角用渐变名牌标出，选项是纵向排列的分支按钮，hover 时有一道高光从左扫过。它的排版纪律很清楚——叙事文本用衬线、UI 标签用无衬线，正文行高拉到 1.8，因为玩家要连续读几百字。装饰要克制：只在面板角落放 L 形线，绝不用粗边框、RGB 分离与像素字体。",
    en: "Visual Novel comes from ADV game interfaces: the scene is an illustration, the dialogue sits in an 85% opaque dark panel across the bottom, the speaker's name hangs in a gradient nameplate at the panel's top-left, and choices are stacked branch buttons that take a highlight sweep on hover. Its typographic discipline is clear — serif for narration, sans for UI labels, body leading at 1.8 because players read hundreds of characters at a stretch. Ornament stays restrained: an L-shaped rule in a panel corner, and nothing else. Heavy borders, RGB split and pixel fonts are excluded.",
  },
  colors: [
    {
      name: "夜色板岩",
      nameEn: "Night Slate",
      value: "#1a202c",
      group: "surface",
      role: {
        zh: "对话框与选项面板的底色，以 85% 不透明度压住场景。",
        en: "The dialogue and choice panels, laid over the scene at 85% opacity.",
      },
      token: "--color-night-slate",
    },
    {
      name: "雾白",
      nameEn: "Mist White",
      value: "#f7fafc",
      group: "surface",
      role: {
        zh: "信息卡与存档界面。以 70% 不透明度出现，保持通透。",
        en: "Info cards and save screens, at 70% opacity to stay translucent.",
      },
      token: "--color-mist",
    },
    {
      name: "叙事靛",
      nameEn: "Narrative Indigo",
      value: "#6366f1",
      group: "brand",
      role: {
        zh: "角色名牌、选中项与关键按钮。对话里表示「这是重要的一句」。",
        en: "Nameplates, selection and key buttons — in dialogue it marks a line that matters.",
      },
      token: "--color-indigo",
    },
    {
      name: "心动粉",
      nameEn: "Heart Pink",
      value: "#ec4899",
      group: "accent",
      role: {
        zh: "好感度、情感选项与关键转折。",
        en: "Affection, emotional choices and turning points.",
      },
      token: "--color-heart-pink",
    },
    {
      name: "信任绿",
      nameEn: "Trust Green",
      value: "#10b981",
      group: "accent",
      role: {
        zh: "已解锁、已存档与正向反馈。",
        en: "Unlocked, saved and positive feedback.",
      },
      token: "--color-trust-green",
    },
    {
      name: "洋红",
      nameEn: "Magenta",
      value: "#d948bb",
      group: "accent",
      role: {
        zh: "隐藏路线与特殊事件，全屏最多一处。",
        en: "Hidden routes and special events — one instance per screen at most.",
      },
      token: "--color-magenta",
    },
  ],
  fonts: [
    {
      family: "Lora",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 500],
      sizes: [16, 18, 20, 24, 32, 44],
      lineHeight: { display: 1.3, heading: 1.4, body: 1.8 },
      tracking: { display: "0", label: "0.06em" },
      role: {
        zh: "叙事与对话正文。衬线让长文本读起来像小说，行高 1.8 是硬指标。",
        en: "Narration and dialogue. The serif reads like prose, and the 1.8 leading is a hard requirement.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, sans-serif",
      weights: [400, 500, 700],
      sizes: [12, 13, 15, 18],
      lineHeight: { display: 1.3, heading: 1.4, body: 1.6 },
      tracking: { display: "0", label: "0.08em" },
      role: {
        zh: "UI 标签、按钮与数值。永远与衬线叙事文本分工明确。",
        en: "UI labels, buttons and figures — always clearly divided from the serif narration.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Lora", weight: 500, size: 44, lineHeight: 1.3, token: "--text-display" },
    { role: "heading", font: "Lora", weight: 500, size: 32, lineHeight: 1.35, token: "--text-heading" },
    { role: "subheading", font: "Lora", weight: 400, size: 24, lineHeight: 1.4, token: "--text-subheading" },
    { role: "body-lg", font: "Lora", weight: 400, size: 20, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", font: "Lora", weight: 400, size: 16, lineHeight: 1.8, token: "--text-body" },
    { role: "label", font: "Inter", weight: 700, size: 13, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1120,
    sectionGap: 64,
    cardPadding: 32,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "12px" },
    { element: "buttons", value: "8px" },
    { element: "nameplates", value: "6px" },
    { element: "pills", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Scene", value: "scene illustration", purpose: "背景插画" },
    { level: 1, name: "Dialogue Panel", value: "rgba(26,32,44,0.85)", purpose: "对话框" },
    { level: 2, name: "Info Card", value: "rgba(247,250,252,0.70)", purpose: "信息卡与存档" },
  ],
  elevation: [
    { name: "Dialogue", value: "0 8px 32px rgba(0,0,0,0.50)" },
    { name: "Nameplate", value: "0 4px 10px rgba(99,102,241,0.30)" },
    { name: "Card", value: "0 6px 20px rgba(0,0,0,0.30)" },
  ],
  components: [
    {
      name: "Dialogue Panel",
      role: { zh: "对话框（核心组件）", en: "The dialogue panel — the core component" },
      construction: {
        zh: "夜板岩 85% 填充、20px 模糊、12px 圆角、1px 叙事靛 20% 描边、内边距 32px（顶部 40px 留给名牌），阴影 0 8px 32px 黑 50%。叙事文字 16px 衬线、行高 1.8、白色。左上角用两条 1px 叙事靛 40% 的线做 L 形装饰（各 24px）。hover 时描边升到 40%、面板上浮 2px。",
        en: "85% night slate fill, 20px blur, 12px radius, a 1px indigo border at 20%, 32px padding with 40px reserved at the top for the nameplate, shadow 0 8px 32px at 50% black. Narration runs 16px serif on 1.8 leading in white. Two 1px indigo lines at 40%, 24px each, form an L in the top-left corner. Hover raises the border to 40% and lifts the panel 2px.",
      },
      sizes: "padding 32px; narration 16px",
      states: "hover: border 40%, lift 2px",
    },
    {
      name: "Nameplate",
      role: { zh: "角色名牌", en: "The speaker nameplate" },
      construction: {
        zh: "压在对话框左上角、向上偏移 16px，横向内边距 24px、纵向 6px，叙事靛到深靛的横向渐变填充，圆角只有上两角与右下角（模拟标签），白字 13px/700、字距 0.08em，阴影 0 4px 10px 靛蓝 30%。名牌宽度随名字自适应，不留空。",
        en: "Anchored to the panel's top-left and offset 16px upward, 24px horizontal and 6px vertical padding, filled with an indigo-to-deep-indigo horizontal gradient, rounded on the two top corners plus the bottom-right (a tag shape), white 13px/700 at 0.08em with a 0 4px 10px indigo shadow. The plate hugs its name.",
      },
    },
    {
      name: "Choice Button",
      role: { zh: "分支选项按钮", en: "Branch choice buttons" },
      construction: {
        zh: "夜板岩 60% 填充、8px 模糊、8px 圆角、1px 叙事靛 30% 描边，左对齐、18px 无衬线、padding 16px 32px，全宽。hover 时填充转靛 20%、描边到 60%、上浮 2px，同时一道白色 5% 的高光从左扫到右（700ms）。按下时整体右移 8px 并回落。",
        en: "60% night slate fill, 8px blur, 8px radius, a 1px indigo border at 30%, flush left, 18px sans, 16px 32px padding, full width. Hover lifts 2px, turns the fill to 20% indigo, the border to 60%, and sweeps a 5% white highlight left to right over 700ms. Press shifts the button 8px right and settles it.",
      },
      states: "hover: highlight sweep, lift 2px; active: shift right 8px",
    },
    {
      name: "Save Slot",
      role: { zh: "存档与章节列表", en: "Save slots and chapter lists" },
      construction: {
        zh: "雾白 70% 填充、12px 圆角、内边距 16px，左侧放 16:9 的截图缩略图，右侧 15px 章节名与 12px 时间戳。hover 时填充升到 85%、缩略图放大 1.03。空档位用虚线边框并显示「空」字样。",
        en: "70% mist fill, 12px radius, 16px padding, with a 16:9 thumbnail on the left and a 15px chapter name with a 12px timestamp on the right. Hover raises the fill to 85% and scales the thumbnail 1.03. Empty slots take a dashed border and an 'empty' label.",
      },
    },
    {
      name: "Scene Stage",
      role: { zh: "场景区域", en: "The scene stage" },
      construction: {
        zh: "占视口 85% 高度，背景是一张渐变插画（天空由上到下过渡），角色以底部对齐的半透明剪影出现（宽度 160px、120% 高度的圆顶形、不透明度 8%）。对话框叠在底部 24px 处，不遮挡中心视觉。",
        en: "Eighty-five percent of the viewport, backed by a gradient illustration (sky fading top to bottom), with characters as bottom-aligned translucent silhouettes (160px wide, a dome shape at 120% height, 8% opacity). The dialogue panel overlaps 24px from the bottom without covering the centre.",
      },
    },
  ],
  imagery: {
    zh: "场景插画是主体：天空渐变、室内、夜景，配半透明角色剪影。允许 CG 立绘与表情差分。不使用写实摄影、UI 截图与扁平几何。",
    en: "Scene illustration is the subject: gradient skies, interiors, night streets, with translucent character silhouettes. CG portraits and expression variants are welcome. No realistic photography, UI screenshots or flat geometry.",
  },
  layout: {
    zh: "上限 1120px，场景占 85vh，对话框固定在底部 24px、最大宽度 960px、居中。选项纵向排列、宽度与对话框一致、间距 8px。信息卡与存档界面用两列网格。",
    en: "Capped at 1120px with the scene filling 85vh. The dialogue panel pins 24px from the bottom, capped at 960px and centred. Choices stack vertically at the panel's width with 8px gaps. Info cards and save screens use a two-column grid.",
  },
  dos: [
    { zh: "叙事用衬线、UI 用无衬线", en: "Serif for narration, sans for UI" },
    { zh: "对话框 85% 不透明加深模糊", en: "The dialogue panel is 85% opaque with a deep blur" },
    { zh: "正文行高 1.8", en: "Body leading at 1.8" },
    { zh: "名牌只圆三角，做成标签形", en: "Round the nameplate on three corners to read as a tag" },
    { zh: "选项 hover 用高光扫过", en: "Choices sweep a highlight on hover" },
    { zh: "装饰只用角落的 L 形线", en: "Ornament is the corner L rule only" },
  ],
  donts: [
    { zh: "不要用 4px 以上的粗边框", en: "No borders at 4px or above" },
    { zh: "不要用 RGB 分离的重影", en: "No RGB split ghosting" },
    { zh: "不要用像素风或等宽字体做正文", en: "No pixel or monospace faces for narration" },
    { zh: "不要用纯黑背景", en: "No pure black background" },
    { zh: "不要用全大写宽字距的终端风文本", en: "No uppercase wide-tracked terminal text" },
    { zh: "不要让对话框遮住场景中心", en: "Never let the panel cover the scene's centre" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f7fafc",
      panel: "rgba(26,32,44,0.85)",
      accent: "#6366f1",
      heart: "#ec4899",
      trust: "#10b981",
      border: "rgba(99,102,241,0.20)",
    },
    prompts: [
      {
        zh: "做一个视觉小说对话框：背景 rgba(26,32,44,0.85)、backdrop-blur 20px、12px 圆角、1px rgba(99,102,241,0.2) 描边、内边距 32px、阴影 0 8px 32px rgba(0,0,0,0.5)。叙事文字 16px 衬线、行高 1.8、白色。左上角放一个渐变名牌（linear-gradient(to right, #6366f1, #4f46e5)、白字 13px/700、只圆上两角与右下角）。下方竖排三个选项按钮，各占全宽、8px 圆角、hover 时一道白色 5% 的高光从左扫过。",
        en: "Build a visual novel dialogue panel: background rgba(26,32,44,0.85), backdrop-blur 20px, 12px radius, a 1px rgba(99,102,241,0.2) border, 32px padding, shadow 0 8px 32px rgba(0,0,0,0.5). Narration runs 16px serif at 1.8 leading in white. A gradient nameplate sits top-left (linear-gradient(to right, #6366f1, #4f46e5), white 13px/700, rounded on three corners). Three choice buttons stack below, each full width on an 8px radius, sweeping a 5% white highlight left to right on hover.",
      },
    ],
  },
  similar: [
    { name: "Cyberpunk Neon", why: { zh: "同为游戏界面，但那边是 HUD 发光，这里是叙事面板", en: "Also a game interface, though that one glows like a HUD while this is a reading panel" } },
    { name: "Shoujo Manga", why: { zh: "同源于漫画叙事，但视觉小说更偏游戏 UI", en: "Shares the comic storytelling root, though visual novel leans to game UI" } },
  ],
  completeness: "full",
};
