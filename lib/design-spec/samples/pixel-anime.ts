import type { DesignSpec } from "../types";

export const pixelAnimeSpec: DesignSpec = {
  slug: "pixel-anime",
  name: "像素动漫风",
  nameEn: "Pixel Anime",
  cover: "/styles/pixel-anime.svg",
  theme: "light",
  northStar: {
    zh: "一屏 GBA 时代的 JRPG：对话框有角块，动画只有 15 帧。",
    en: "A GBA-era JRPG on screen: dialogue boxes with corner blocks, animation at fifteen frames.",
  },
  summary: {
    zh: "像素动漫风合并了经典 JRPG 的界面语法与像素动漫的画风：RPG 对话框（4px 边框加四角方块装饰）、状态条、等宽字体、NES 调色板（蓝、红、金、绿四支）。它的时间规则叫 Framerate Drop——所有过渡 75ms、缓动必须 linear 或 transition-none，因为 2000 年代初的掌机只有 15 帧，动画是跳的不是滑的。禁止平滑渐变、禁止圆角、禁止任何模糊（包括光晕，像素的发光必须是零模糊的硬边）。",
    en: "Pixel Anime merges classic JRPG interface grammar with pixel anime art: RPG dialogue frames (4px borders with square corner blocks), status bars, monospace type, and the NES palette in blue, red, gold and green. Its timing rule is Framerate Drop — every transition runs 75ms on linear or transition-none, because early-2000s handhelds ran at fifteen frames and animation jumped rather than slid. Smooth gradients, rounded corners and all blur are excluded, including glow: pixel light must have hard edges.",
  },
  colors: [
    {
      name: "勇者蓝",
      nameEn: "Hero Blue",
      value: "#4a90d9",
      group: "brand",
      role: {
        zh: "主色：对话框边框、主按钮与选中项。JRPG 的界面蓝。",
        en: "The primary on dialogue frames, buttons and selection — the interface blue of a JRPG.",
      },
      token: "--color-hero-blue",
    },
    {
      name: "夜紫",
      nameEn: "Night Purple",
      value: "#2d1b69",
      group: "surface",
      role: {
        zh: "深底与对话框内部。像战斗时的暗场。",
        en: "The dark ground and the interior of dialogue frames, like a battle scene dimming.",
      },
      token: "--color-night-purple",
    },
    {
      name: "警报红",
      nameEn: "Alert Red",
      value: "#ff6b6b",
      group: "accent",
      role: {
        zh: "危险、伤害与「敌人」标记。",
        en: "Danger, damage and enemy marks.",
      },
      token: "--color-alert-red",
    },
    {
      name: "金币黄",
      nameEn: "Coin Gold",
      value: "#ffd93d",
      group: "accent",
      role: {
        zh: "经验、金币与高亮，是画面里唯一「亮」的东西。",
        en: "Experience, coins and highlights — the only bright element in the frame.",
      },
      token: "--color-coin-gold",
    },
    {
      name: "治疗绿",
      nameEn: "Heal Green",
      value: "#50c878",
      group: "accent",
      role: {
        zh: "生命值、恢复与成功。",
        en: "Health, recovery and success.",
      },
      token: "--color-heal-green",
    },
    {
      name: "橄榄",
      nameEn: "Olive",
      value: "#a98d16",
      group: "accent",
      role: {
        zh: "最暗的一支强调，用于压在金色上的文字。",
        en: "The darkest accent, for text sitting on gold.",
      },
      token: "--color-olive",
    },
  ],
  fonts: [
    {
      family: "Press Start 2P",
      substitute: "'Courier New', ui-monospace, monospace",
      weights: [400],
      sizes: [10, 12, 14, 18, 24, 32],
      lineHeight: { display: 1.3, heading: 1.4, body: 1.8 },
      tracking: { display: "0.05em", label: "0.12em" },
      role: {
        zh: "全站唯一字体，等宽。行高必须放大到 1.8，否则像素字会粘在一起。",
        en: "The only face, monospace. Leading must open to 1.8 or the pixel glyphs smear together.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", weight: 400, size: 32, lineHeight: 1.35, tracking: "0.05em", token: "--text-display" },
    { role: "heading", weight: 400, size: 24, lineHeight: 1.4, tracking: "0.05em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 18, lineHeight: 1.5, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 14, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 12, lineHeight: 1.8, token: "--text-body" },
    { role: "label", weight: 400, size: 10, lineHeight: 1.6, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 960,
    sectionGap: 64,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Night Purple", value: "#2d1b69", purpose: "页面底" },
    { level: 1, name: "Dialog Box", value: "#1a1038", purpose: "对话框内部" },
    { level: 2, name: "Paper", value: "#f4f4f4", purpose: "浅色面板" },
  ],
  elevation: [
    { name: "Hard drop", value: "4px 4px 0 #2d1b69" },
    { name: "Pressed", value: "none" },
    { name: "Never", value: "blurred shadows are forbidden" },
  ],
  components: [
    {
      name: "Dialog Box",
      role: { zh: "RPG 对话框（核心组件）", en: "The RPG dialogue box — the core component" },
      construction: {
        zh: "深紫 #1a1038 填充、4px 勇者蓝边框、零圆角、内边距 20px。四角各放一个 8px × 8px 的实心方块（勇者蓝）作为角装饰，位于边框内侧。文字 14px 等宽、行高 1.8、白色。框外可选 4px 零模糊的硬阴影。",
        en: "Deep purple #1a1038 fill, a 4px hero blue border, zero radius, 20px padding. An 8px by 8px solid block in hero blue marks each corner, inset from the border. Text runs 14px monospace on 1.8 leading in white. A 4px zero-blur hard shadow may sit outside the frame.",
      },
    },
    {
      name: "Command Button",
      role: { zh: "指令按钮", en: "Command button" },
      construction: {
        zh: "勇者蓝填充、白色等宽字、4px 夜紫边框、零圆角、14px、字距 0.12em、padding 12px 24px，硬阴影 4px 4px 0 夜紫。hover 时填充硬切到金币黄、文字转夜紫（调色板替换，不做渐变）；按下时位移 4px 4px 且阴影归零。全程 transition-none 或 75ms linear。",
        en: "Hero blue fill, white monospace text, a 4px night purple border, zero radius, 14px at 0.12em tracking, 12px 24px padding, and a 4px 4px 0 hard shadow in night purple. Hover cuts the fill to coin gold and the text to night purple — a palette swap, never a fade; press translates 4px 4px and zeroes the shadow. transition-none or 75ms linear throughout.",
      },
      sizes: "padding 12px 24px; label 14px",
      states: "hover: palette swap; active: translate 4px, shadow none",
    },
    {
      name: "Status Bar",
      role: { zh: "状态条（HP / EXP）", en: "Status bars for HP and EXP" },
      construction: {
        zh: "高 12px、零圆角、4px 夜紫边框，内部填充用治疗绿（HP）或金币黄（EXP），并分成 8px 宽的小格（每格之间 2px 空隙），模拟分段血条。绝不使用平滑渐变。数值以等宽字体放在条右侧。",
        en: "12px tall with zero radius and a 4px night purple border, filled in heal green for HP or coin gold for EXP, divided into 8px cells with 2px gaps to imitate a segmented bar. No smooth gradient anywhere. The figure sits to the right in monospace.",
      },
    },
    {
      name: "Corner Block Decoration",
      role: { zh: "角块与像素装饰", en: "Corner blocks and pixel ornament" },
      construction: {
        zh: "8px 或 12px 的实心方块，取调色板四色之一，放在面板四角、标题两侧或作为分隔符。可组成 2×2 的小簇作为「星光」效果，但每个方块必须有硬边、零模糊、零圆角。",
        en: "8px or 12px solid squares in one of the four palette colors, placed at panel corners, beside a title or as a separator. A 2×2 cluster can stand in for a sparkle, but every block keeps hard edges, zero blur and zero radius.",
      },
    },
    {
      name: "Menu List",
      role: { zh: "菜单与选项列表", en: "Menu and option lists" },
      construction: {
        zh: "每项高 32px、零圆角、左侧 8px 处一个 8px 的箭头方块指示选中（未选中时透明）。选中项填充勇者蓝 20%、文字转金币黄。切选项时只做颜色硬切，不做滑动。",
        en: "Each item is 32px tall with zero radius, an 8px arrow block 8px from the left marking selection (transparent when unselected). Selection fills 20% hero blue and turns the text coin gold. Switching options cuts color only, never slides.",
      },
    },
  ],
  imagery: {
    zh: "像素画：16×16 到 64×64 的角色、道具与地形，必须放大整数倍（2× 或 3×）并用 image-rendering: pixelated 保持硬边。允许把照片降采样成像素图。不使用矢量插画、平滑渐变与模糊。",
    en: "Pixel art at 16×16 to 64×64 for characters, items and terrain, scaled by whole multiples (2x or 3x) with image-rendering: pixelated to keep edges hard. A photo may be downsampled into pixels. No vector illustration, smooth gradients or blur.",
  },
  layout: {
    zh: "上限 960px、容器内边距 16px，区块间距 64px。布局像游戏画面：中央是主内容区，底部可固定一条对话框，右上角挂状态。所有尺寸取 4 的倍数并落在 4px 网格上。",
    en: "Capped at 960px with 16px padding, sections 64px apart. The layout reads like a game screen: a central play area, an optional dialogue box pinned at the bottom, and status in the top-right. Every dimension is a multiple of four on a 4px grid.",
  },
  dos: [
    { zh: "4px 边框加四角方块装饰", en: "4px borders with square corner blocks" },
    { zh: "全站等宽像素字体", en: "Monospace pixel type throughout" },
    { zh: "只用 NES 调色板的四支色", en: "Only the four NES palette colors" },
    { zh: "过渡 75ms 或 transition-none", en: "Transitions at 75ms or transition-none" },
    { zh: "缓动只用 linear", en: "Easing is linear only" },
    { zh: "发光必须是零模糊硬边", en: "Glow must be zero-blur and hard-edged" },
  ],
  donts: [
    { zh: "不要用平滑渐变", en: "No smooth gradients" },
    { zh: "不要用任何圆角", en: "No rounded corners" },
    { zh: "不要用模糊（含 backdrop-blur）", en: "No blur, including backdrop-blur" },
    { zh: "不要用衬线字体", en: "No serif type" },
    { zh: "不要用 ease-in-out 或 ease", en: "Never use ease-in-out or ease" },
    { zh: "不要用柔和阴影", en: "No soft shadows" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ffffff",
      background: "#2d1b69",
      dialog: "#1a1038",
      blue: "#4a90d9",
      gold: "#ffd93d",
      green: "#50c878",
    },
    prompts: [
      {
        zh: "做一个像素 RPG 对话框：背景 #1a1038、4px solid #4a90d9 边框、border-radius 0、内边距 20px。四角各放一个 8px × 8px 的 #4a90d9 实心方块（距边框内侧 4px）。文字 14px Press Start 2P、行高 1.8、白色。下方一个指令按钮：背景 #4a90d9、白色等宽字、4px #2d1b69 边框、零圆角、box-shadow 4px 4px 0 #2d1b69。hover 时背景硬切到 #ffd93d、文字转 #2d1b69；active 时 translate(4px,4px) 且阴影 none，transition: none。页面底色 #2d1b69。",
        en: "Build a pixel RPG dialogue box: background #1a1038, a 4px solid #4a90d9 border, border-radius 0, 20px padding. An 8px by 8px solid #4a90d9 block marks each corner, inset 4px from the border. Text runs 14px Press Start 2P on 1.8 leading in white. Below sits a command button: #4a90d9 fill, white monospace text, a 4px #2d1b69 border, zero radius, box-shadow 4px 4px 0 #2d1b69. Hover cuts the fill to #ffd93d and the text to #2d1b69; active applies translate(4px,4px) with no shadow and transition none. The page ground is #2d1b69.",
      },
    ],
  },
  similar: [
    { name: "Pixel Art", why: { zh: "同属 8-bit，但像素艺术是通用界面，像素动漫专做 JRPG 与对话系统", en: "Both 8-bit, though pixel art is general interface while pixel anime builds a JRPG dialogue system" } },
    { name: "Visual Novel", why: { zh: "同为游戏叙事界面，但视觉小说用柔和半透面板，像素动漫用硬边方框", en: "Both game storytelling interfaces, though visual novel uses translucent panels while this uses hard frames" } },
  ],
  completeness: "full",
};
