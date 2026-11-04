import type { DesignSpec } from "../types";

export const materialDesignSpec: DesignSpec = {
  slug: "material-design",
  name: "材料设计",
  nameEn: "Material Design",
  cover: "/styles/material-design.svg",
  theme: "light",
  northStar: {
    zh: "纸与墨的隐喻：元素有海拔，动效有物理，网格是 8dp。",
    en: "Paper and ink: elements have elevation, motion has physics, and the grid is 8dp.",
  },
  summary: {
    zh: "Material Design 的核心不是外观而是两条物理假设：第一，界面由「纸」组成，纸有海拔（elevation），层级靠阴影深度表达而不是靠边框；第二，动效必须遵循同一组曲线——cubic-bezier(0.4, 0, 0.2, 1)，250ms，减速进入。所有尺寸落在 8dp 网格上，主色大胆（紫 #6200ee），次色作为点缀（青 #03dac6）。按钮按下必须缩到 0.98 并加深阴影，这是它认为的「触感真实性」。",
    en: "Material Design is not a look but two physical assumptions. First, the interface is made of paper: paper has elevation, and hierarchy is expressed through shadow depth rather than borders. Second, motion follows one curve — cubic-bezier(0.4, 0, 0.2, 1) at 250ms, decelerating into place. Every dimension lands on the 8dp grid, the primary is bold (violet #6200ee) with the secondary as an accent (teal #03dac6). A button must scale to 0.98 and deepen its shadow on press; that is what the system calls tactile authenticity.",
  },
  colors: [
    {
      name: "材料紫",
      nameEn: "Material Violet",
      value: "#6200ee",
      group: "brand",
      role: {
        zh: "主行动、选中态与浮动按钮。整套系统的识别色。",
        en: "Primary actions, selection and the floating action button — the system's identifier.",
      },
      token: "--color-violet",
    },
    {
      name: "青绿",
      nameEn: "Teal",
      value: "#03dac6",
      group: "accent",
      role: {
        zh: "次色，用于强调、进度与浮动按钮上的图标。",
        en: "The secondary, on emphasis, progress and the glyph inside a floating action button.",
      },
      token: "--color-teal",
    },
    {
      name: "粉",
      nameEn: "Pink",
      value: "#ff0266",
      group: "accent",
      role: {
        zh: "错误与删除。材料规范里的语义色之一。",
        en: "Errors and deletion — one of the spec's semantic colors.",
      },
      token: "--color-pink",
    },
    {
      name: "琥珀黄",
      nameEn: "Amber",
      value: "#ffde03",
      group: "accent",
      role: {
        zh: "警告与需要注意的状态。",
        en: "Warnings and states that need attention.",
      },
      token: "--color-amber",
    },
    {
      name: "绿",
      nameEn: "Green",
      value: "#00c853",
      group: "accent",
      role: {
        zh: "成功与完成，通常出现在对勾与进度环上。",
        en: "Success and completion, on checks and progress rings.",
      },
      token: "--color-green",
    },
    {
      name: "深红褐",
      nameEn: "Rust",
      value: "#c12700",
      group: "accent",
      role: {
        zh: "严肃警告与不可逆操作的确认态。",
        en: "Serious warnings and confirmation of irreversible actions.",
      },
      token: "--color-rust",
    },
  ],
  fonts: [
    {
      family: "Roboto",
      substitute: "'Helvetica Neue', system-ui, sans-serif",
      weights: [400, 500, 700],
      sizes: [12, 14, 16, 20, 24, 34, 45],
      lineHeight: { display: 1.17, heading: 1.25, body: 1.5 },
      tracking: { display: "-0.01em", label: "0.08em" },
      role: {
        zh: "全站唯一字体。按钮与标签用 500 加 0.08em 字距并全大写，标题用 400 的大字号。",
        en: "The only face. Buttons and labels run weight 500 at 0.08em uppercase; headings use 400 at large sizes.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 400, size: 45, lineHeight: 1.17, token: "--text-display" },
    { role: "heading-lg", weight: 400, size: 34, lineHeight: 1.2, token: "--text-heading-lg" },
    { role: "heading", weight: 400, size: 24, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 500, size: 20, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.5, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.08em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 40, 48, 64, 80],
    maxWidth: 1200,
    sectionGap: 40,
    cardPadding: 16,
    elementGap: 8,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "inputs", value: "4px" },
    { element: "fab", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Surface", value: "#ffffff", purpose: "页面与卡片" },
    { level: 1, name: "Elevated 1", value: "#ffffff", purpose: "卡片，靠阴影表达海拔" },
    { level: 4, name: "Elevated 4", value: "#ffffff", purpose: "浮动按钮与菜单" },
  ],
  elevation: [
    { name: "Elevation 1", value: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" },
    { name: "Elevation 2", value: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" },
    { name: "Elevation 4", value: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" },
    { name: "Elevation 8", value: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)" },
  ],
  components: [
    {
      name: "Contained Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "材料紫填充、白字、4px 圆角、无描边，14px/500、0.08em 字距、全大写、padding 10px 24px，海拔 2 的三层阴影。hover 时填充提亮到 #7528e5 并升到海拔 4；按下缩到 0.98、海拔降到 8 并加一道中心扩散的白色 20% 涟漪（250ms 内扩散到 2.5 倍半径）。过渡 250ms cubic-bezier(0.4, 0, 0.2, 1)。",
        en: "Violet fill, white text, 4px radius, no border, 14px/500 at 0.08em uppercase, 10px 24px padding, carrying three-layer elevation 2 shadows. Hover brightens the fill to #7528e5 and rises to elevation 4; press scales 0.98, drops to elevation 8 and emits a 20% white ripple expanding from the centre to 2.5x radius within 250ms. 250ms on cubic-bezier(0.4, 0, 0.2, 1).",
      },
      sizes: "padding 10px 24px; label 14px",
      states: "hover: elevation 4; active: scale 0.98, ripple",
    },
    {
      name: "Elevated Card",
      role: { zh: "内容卡与列表容器", en: "Content cards and list containers" },
      construction: {
        zh: "白底、4px 圆角、内边距 16px，海拔 1 的双层阴影，无边框。hover 时海拔升到 4（阴影加深、模糊扩大），卡片位置不变——材料规范里海拔变化本身就是反馈。",
        en: "White fill, 4px radius, 16px padding, elevation 1 two-layer shadow, no border. Hover raises it to elevation 4 — deeper shadow, wider blur — while the card stays put, because in this system elevation change is the feedback.",
      },
      states: "hover: elevation 1 → 4",
    },
    {
      name: "Floating Action",
      role: { zh: "浮动主操作按钮", en: "The floating primary action" },
      construction: {
        zh: "56px 圆形、材料紫填充、白色 24px 图标、海拔 4，位于视口右下 16dp。hover 时海拔升到 8 并提亮；按下缩到 0.96。图标与边缘间距严格 16px。",
        en: "A 56px circle in violet with a 24px white glyph at elevation 4, pinned 16dp from the viewport's bottom-right. Hover raises it to elevation 8 and brightens; press scales 0.96. The glyph sits exactly 16px from the edge.",
      },
    },
    {
      name: "Outlined Field",
      role: { zh: "文本输入", en: "Text input" },
      construction: {
        zh: "透明底、1px #9e9e9e 描边、4px 圆角、padding 12px 16px、16px 字，标签浮动在描边上。聚焦时描边变 2px 材料紫、标签转紫、加 0 0 0 4px 的紫 12% 光环。错误态描边转粉并显示辅助文字。",
        en: "Transparent fill, a 1px #9e9e9e border, 4px radius, 12px 16px padding at 16px, with the label floating on the border. Focus thickens the border to 2px violet, turns the label violet and adds a 4px ring at 12% violet. The error state turns the border pink and reveals helper text.",
      },
    },
    {
      name: "Snackbar",
      role: { zh: "轻提示与撤销", en: "Toast and undo" },
      construction: {
        zh: "深灰 #323232 填充、白字、4px 圆角、padding 14px 16px、14px 字，海拔 6，出现在视口底部居中、距底 16dp。右侧放一个青绿色文字的动作按钮。显示 4 秒后自动消失，进入用 250ms 的减速曲线。",
        en: "Dark grey #323232 fill, white text, 4px radius, 14px 16px padding at 14px, elevation 6, appearing centred 16dp from the viewport bottom. A teal text action sits on the right. It dismisses after four seconds, entering on the 250ms deceleration curve.",
      },
    },
  ],
  imagery: {
    zh: "以图标、插画与产品截图为主。图标必须是 Material Symbols 风格的实心或线性图形，尺寸落在 8dp 网格上。不使用写实摄影与装饰性大图。",
    en: "Icons, illustration and product screenshots lead. Icons follow the Material Symbols vocabulary, filled or outlined, sized on the 8dp grid. No realistic photography or large decorative imagery.",
  },
  layout: {
    zh: "上限 1200px，一切尺寸取 8 的倍数（间距 8、16、24、32）。12 栏网格、栏间距 16dp，卡片与列表用 16dp 内边距。内容左对齐，工具栏固定在顶部、浮动按钮固定在右下。",
    en: "Capped at 1200px with every dimension a multiple of eight (8, 16, 24, 32). Twelve columns with 16dp gutters, and 16dp padding inside cards and lists. Content aligns left, the toolbar pins to the top and the floating action to the bottom-right.",
  },
  dos: [
    { zh: "层级靠海拔阴影，不靠边框", en: "Express hierarchy through elevation, not borders" },
    { zh: "一切尺寸落在 8dp 网格", en: "Land every dimension on the 8dp grid" },
    { zh: "动效统一 250ms 与标准减速曲线", en: "Motion uses 250ms on the standard deceleration curve" },
    { zh: "按钮按下缩到 0.98 并加深阴影", en: "Buttons scale to 0.98 and deepen their shadow on press" },
    { zh: "hover 时卡片海拔必须变化", en: "Card elevation must change on hover" },
    { zh: "主色大胆，次色只作点缀", en: "Bold primary, secondary as accent only" },
  ],
  donts: [
    { zh: "不要用不一致的阴影深度", en: "No inconsistent shadow depths" },
    { zh: "不要用过于柔和的配色", en: "No overly soft palettes" },
    { zh: "不要省略交互反馈", en: "Never omit interaction feedback" },
    { zh: "不要打破 8dp 网格", en: "Do not break the 8dp grid" },
    { zh: "不要用非标准缓动曲线", en: "No non-standard easing curves" },
    { zh: "不要让卡片 hover 时阴影不变", en: "Never keep a card's shadow unchanged on hover" },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      primary: "#6200ee",
      secondary: "#03dac6",
      error: "#ff0266",
      surface: "#ffffff",
    },
    prompts: [
      {
        zh: "做一个 Material 主按钮：背景 #6200ee、白字、4px 圆角、14px/500 全大写 0.08em 字距、padding 10px 24px、阴影 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)。hover 时背景 #7528e5、阴影升到 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)。active 时 scale(0.98) 并加深阴影。transition 250ms cubic-bezier(0.4,0,0.2,1)。",
        en: "Build a Material primary button: background #6200ee, white text, 4px radius, 14px/500 uppercase at 0.08em tracking, 10px 24px padding, shadow 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23). Hover sets the background to #7528e5 and raises the shadow to 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23). Active applies scale(0.98) with a deeper shadow. Transition 250ms cubic-bezier(0.4,0,0.2,1).",
      },
    ],
  },
  similar: [
    { name: "Fluent Design", why: { zh: "同为大厂系统，但 Fluent 用亚克力材质，Material 用纸与海拔", en: "Both vendor systems, though Fluent models acrylic while Material models paper and elevation" } },
    { name: "Corporate Clean", why: { zh: "同样克制的商业界面，但材料设计更强调海拔与动效物理", en: "Both restrained product interfaces, though Material insists on elevation and motion physics" } },
  ],
  completeness: "full",
};
