import type { DesignSpec } from "../types";

export const jrpgSpec: DesignSpec = {
  slug: "jrpg",
  name: "日式 RPG",
  nameEn: "JRPG",
  cover: "/styles/jrpg.svg",
  theme: "dark",
  northStar: {
    zh: "斜面边框、金色标题、蓝底渐变：一个 1995 年的菜单窗口。",
    en: "Beveled frames, gold headings, blue gradient grounds — a 1995 menu window.",
  },
  summary: {
    zh: "日式 RPG 界面来自 16 位到 32 位时代的游戏菜单：深海军蓝底（#0f172a）上叠蓝色到深蓝的渐变，窗口用 2px 蓝色边框加内阴影做出斜面浮雕感，标题用金色（#fbbf24），状态栏用绿（HP）与蓝（MP），卡片是双层描边（2px 深蓝加 1px 亮蓝环），按钮靠 inset 白色高光显得凸起。菜单反馈必须硬切——75 到 120ms，模拟手柄选中项的节奏，绝不能平滑缓动。它禁止极简扁平：无边框无阴影在这里等于没做。",
    en: "JRPG interfaces come from 16- and 32-bit game menus: deep navy (#0f172a) under a blue-to-deep-blue gradient, windows framed at 2px with inset shadows for the bevel, gold (#fbbf24) headings, green HP and blue MP bars, cards with a double stroke (2px dark blue plus a 1px bright ring), and buttons that read as raised through an inset white highlight. Menu feedback must cut hard at 75 to 120ms, imitating a controller moving between options — never a smooth ease. Flat minimalism is refused; no border and no shadow here means nothing was done.",
  },
  colors: [
    {
      name: "深海军",
      nameEn: "Deep Navy",
      value: "#0f172a",
      group: "surface",
      role: {
        zh: "页面底与窗口内部。32 位时代 RPG 的菜单底色。",
        en: "The page ground and window interior — the menu tone of a 32-bit RPG.",
      },
      token: "--color-deep-navy",
    },
    {
      name: "指令蓝",
      nameEn: "Command Blue",
      value: "#1e40af",
      group: "brand",
      role: {
        zh: "窗口边框、按钮底与 MP 条。",
        en: "Window frames, button grounds and the MP bar.",
      },
      token: "--color-command-blue",
    },
    {
      name: "金",
      nameEn: "Gold",
      value: "#fbbf24",
      group: "accent",
      role: {
        zh: "标题、重要数值与选中项。菜单里唯一发亮的颜色。",
        en: "Headings, key figures and selection — the one bright color in a menu.",
      },
      token: "--color-gold",
    },
    {
      name: "窗白",
      nameEn: "Window White",
      value: "#f0f9ff",
      group: "surface",
      role: {
        zh: "主要文字与描述。略带蓝的白。",
        en: "Primary text and descriptions — a faintly blue white.",
      },
      token: "--color-window-white",
    },
    {
      name: "HP 绿",
      nameEn: "HP Green",
      value: "#22c55e",
      group: "accent",
      role: {
        zh: "生命值与成功。永远是分段条而非连续渐变。",
        en: "Health and success, always a segmented bar rather than a continuous gradient.",
      },
      token: "--color-hp-green",
    },
    {
      name: "亮绿",
      nameEn: "Signal Green",
      value: "#56ed40",
      group: "accent",
      role: {
        zh: "状态提示与「可执行」标记。",
        en: "Status hints and actionable marks.",
      },
      token: "--color-signal-green",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Segoe UI', system-ui, sans-serif",
      weights: [400, 700],
      sizes: [13, 16, 20, 26, 34, 44],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "0.02em", label: "0.08em" },
      role: {
        zh: "带一点方正的界面无衬线，标题 700 并带金色。字级偏紧凑，因为菜单要在一屏内放下很多行。",
        en: "A slightly squared interface sans, headings at 700 in gold. Sizes stay compact because a menu must fit many rows on one screen.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400, 700],
      sizes: [13, 16, 20],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.55 },
      tracking: { display: "0.04em", label: "0.08em" },
      role: {
        zh: "数值与状态读数。等宽让 HP/MP 与等级在纵向可比。",
        en: "Figures and status readouts — the monospace lets HP, MP and levels compare vertically.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "heading", font: "Inter", weight: 700, size: 44, lineHeight: 1.15, tracking: "0.02em", token: "--text-heading" },
    { role: "subheading", font: "Inter", weight: 700, size: 34, lineHeight: 1.2, tracking: "0.02em", token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 20, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body" },
    { role: "body-sm", font: "Inter", weight: 400, size: 13, lineHeight: 1.55, token: "--text-body-sm" },
    { role: "label", font: "JetBrains Mono", weight: 700, size: 13, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "compact",
    scale: [8, 12, 16, 24, 32, 48, 64],
    maxWidth: 1120,
    sectionGap: 48,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "8px" },
    { element: "buttons", value: "6px" },
    { element: "inputs", value: "6px" },
    { element: "bars", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Navy Gradient", value: "linear-gradient(#1e3a8a, #0f172a)", purpose: "页面与窗口底" },
    { level: 1, name: "Window", value: "#132039", purpose: "菜单窗口" },
    { level: 2, name: "Selected Row", value: "rgba(251,191,36,0.18)", purpose: "选中行" },
  ],
  elevation: [
    {
      name: "Bevel",
      value: "inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(0,0,0,0.35)",
    },
    { name: "Window drop", value: "0 8px 24px rgba(0,0,0,0.55)" },
    { name: "Pressed", value: "inset 0 2px 6px rgba(0,0,0,0.45)" },
  ],
  components: [
    {
      name: "Bevel Window",
      role: { zh: "斜面菜单窗口（核心组件）", en: "The beveled menu window — the core component" },
      construction: {
        zh: "窗口底 #132039、2px 指令蓝描边、外层再加 1px 亮蓝 20% 的环形成双层描边、8px 圆角、内边距 20px，阴影 inset 0 1px 0 白 20% 加 inset 0 -1px 0 黑 35% 做出斜面。外投影 0 8px 24px 黑 55%。标题金色 34px/700，内容窗白 16px。",
        en: "A #132039 ground with a 2px command blue border plus an outer 1px bright blue ring at 20% for the double stroke, 8px radius, 20px padding, and the bevel from inset 0 1px 0 white at 20% and inset 0 -1px 0 black at 35%. The drop shadow runs 0 8px 24px at 55% black. Titles at 34px/700 in gold, content at 16px in window white.",
      },
    },
    {
      name: "Command Button",
      role: { zh: "指令按钮", en: "Command button" },
      construction: {
        zh: "指令蓝填充、窗白文字、2px 深蓝描边、6px 圆角、16px/700、padding 10px 24px，inset 0 1px 0 白 20% 做出凸起。hover 时填充提亮 6%、文字转金色；按下时内阴影反向（inset 0 2px 6px 黑 45%）并下沉 1px。过渡 90ms linear——硬切。",
        en: "Command blue fill, window white text, a 2px dark blue border, 6px radius, 16px/700, 10px 24px padding, with inset 0 1px 0 white at 20% for the raise. Hover brightens the fill six percent and turns the text gold; press reverses the inset shadow and sinks 1px. 90ms linear — a hard cut.",
      },
      sizes: "padding 10px 24px; label 16px",
      states: "hover: brighter, gold text; active: inset shadow, sink 1px",
    },
    {
      name: "Status Bar",
      role: { zh: "HP / MP 状态条", en: "HP and MP bars" },
      construction: {
        zh: "高 16px、全圆角、2px 深蓝描边，内部填充 HP 绿或亮蓝，并用 8px 宽的小格分开（每格间隔 2px），模拟分段血条。绝不用平滑渐变——分段是这个时代的标志。数值用等宽字体放在条右侧，13px 金色。",
        en: "16px tall on a fully rounded shape with a 2px dark blue border, filled green for HP or bright blue for MP, divided into 8px cells with 2px gaps to imitate a segmented bar. No smooth gradient — segmentation is the mark of the era. The figure sits right in 13px monospace gold.",
      },
    },
    {
      name: "Menu List",
      role: { zh: "菜单选项列表", en: "The menu option list" },
      construction: {
        zh: "每项高 36px、6px 圆角、左侧 8px 处一个 8px 的金色三角或方块指示选中（未选中时透明）。选中项底填金 18% 并把文字转金。切换只做颜色硬切，不做滑动，时长 90ms。",
        en: "Each item is 36px tall on a 6px radius with an 8px gold triangle or square marking selection 8px from the left (transparent when unselected). Selection fills 18% gold and turns the text gold. Switching cuts color only, never slides, in 90ms.",
      },
    },
    {
      name: "Portrait Frame",
      role: { zh: "立绘与头像框", en: "Portrait and avatar frames" },
      construction: {
        zh: "48 到 96px、8px 圆角、2px 金色描边加 1px 深蓝外环，内部填海军的深色或放立绘。四角各放一个 4px 的金色角标。用于角色、物品与队伍成员。",
        en: "48 to 96px on an 8px radius, a 2px gold border plus a 1px dark blue outer ring, filled with deep navy or a portrait. A 4px gold corner mark sits at each corner. It carries characters, items and party members.",
      },
    },
  ],
  imagery: {
    zh: "像素立绘、道具图标、地图与技能特效。图标必须有 2px 描边与内阴影，不能是扁平线稿。允许把照片处理成 32 色调色板。不使用现代插画与扁平图标。",
    en: "Pixel portraits, item icons, maps and skill effects. Icons need a 2px stroke and an inner shadow — flat line art will not do. A photo may be reduced to a 32-color palette. No modern illustration or flat icons.",
  },
  layout: {
    zh: "上限 1120px、容器内边距 16px，窗口间距 12px，形成密集的菜单排布。允许窗口层叠（主菜单上叠子菜单），每层偏移 8px 并加深阴影。所有尺寸取 4 的倍数。",
    en: "Capped at 1120px with 16px padding and 12px between windows, producing a dense menu arrangement. Windows may stack with sub-menus offset 8px and a deeper shadow. Dimensions are multiples of four.",
  },
  dos: [
    { zh: "2px 边框加内阴影做斜面", en: "2px borders with inset shadows for the bevel" },
    { zh: "金色标题与选中项", en: "Gold headings and selection" },
    { zh: "状态条必须分段", en: "Status bars must be segmented" },
    { zh: "菜单反馈 75 到 120ms 硬切", en: "Menu feedback cuts in 75 to 120ms" },
    { zh: "双层描边（2px 深蓝加 1px 亮蓝）", en: "Double strokes: 2px dark blue plus 1px bright" },
    { zh: "按钮用 inset 白色高光显凸起", en: "Buttons raise with an inset white highlight" },
  ],
  donts: [
    { zh: "不要用极简扁平（无边框无阴影）", en: "No flat minimalism with no border and no shadow" },
    { zh: "不要用平滑缓动做菜单反馈", en: "Never ease menu feedback" },
    { zh: "不要用连续渐变的状态条", en: "No continuous-gradient status bars" },
    { zh: "不要用扁平线稿图标", en: "No flat line-art icons" },
    { zh: "不要用超过 8px 的圆角", en: "No radius above 8px" },
    { zh: "不要让金色承担正文", en: "Never let gold carry body text" },
  ],
  promptGuide: {
    quickColors: {
      text: "#f0f9ff",
      background: "#0f172a",
      blue: "#1e40af",
      gold: "#fbbf24",
      green: "#22c55e",
      window: "#132039",
    },
    prompts: [
      {
        zh: "做一个 JRPG 菜单窗口：#132039 底、2px solid #1e40af 边框加外层 1px rgba(96,165,250,0.2) 环、8px 圆角、内边距 20px、box-shadow inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.55)。标题 34px/700 金色 #fbbf24，正文 16px #f0f9ff。下方放一条 16px 高、全圆角、分成 8px 小格的 HP 绿 #22c55e 状态条。按钮 #1e40af 填充、2px 深蓝边、inset 0 1px 0 白色高光，hover 时文字转金，transition 90ms linear。页面底色用 linear-gradient(#1e3a8a, #0f172a)。",
        en: "Build a JRPG menu window: a #132039 ground with a 2px solid #1e40af border plus an outer 1px rgba(96,165,250,0.2) ring, 8px radius, 20px padding, and box-shadow inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.55). The heading runs 34px/700 in gold #fbbf24 with body at 16px in #f0f9ff. Below, a 16px fully rounded HP bar in #22c55e divides into 8px cells. The button fills #1e40af with a 2px dark blue border and an inset 0 1px 0 white highlight, turning its text gold on hover over 90ms linear. The page ground is linear-gradient(#1e3a8a, #0f172a).",
      },
    ],
  },
  similar: [
    { name: "Pixel Anime", why: { zh: "同为 RPG 界面，但像素动漫是 8-bit 硬边方框，日式 RPG 是斜面浮雕窗口", en: "Both RPG interfaces, though pixel anime uses 8-bit square frames while JRPG uses beveled windows" } },
    { name: "Visual Novel", why: { zh: "同为游戏叙事界面，但视觉小说以对话框为主，日式 RPG 以菜单与状态为主", en: "Both game storytelling, though visual novel centers dialogue while JRPG centers menus and status" } },
  ],
  completeness: "full",
};
