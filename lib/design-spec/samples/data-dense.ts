import type { DesignSpec } from "../types";

export const dataDenseSpec: DesignSpec = {
  slug: "data-dense",
  name: "数据密集",
  nameEn: "Data Dense",
  cover: "/styles/data-dense.svg",
  theme: "light",
  northStar: {
    zh: "每像素都用来放数据：字号 10 到 12px，间距 4px 一跳，没有装饰。",
    en: "Every pixel carries data: type at 10 to 12px, spacing on a 4px step, no ornament at all.",
  },
  summary: {
    zh: "数据密集是为操作台服务的，所有美学指标被压到最小：字号 10 到 12px、行高 28px、间距以 4px 递增、圆角 4px、无阴影无渐变。它的层次靠三件事建立——交替行底色（白与极浅蓝灰）、1px 分隔线、以及状态标签的色块。数字、ID 与代码一律等宽并右对齐，保证纵向可比。这套风格的价值在密度本身：一屏能看到 40 行记录，而不是 12 行。任何增加留白的改动都是退步。",
    en: "Data Dense serves an operations desk, so every aesthetic metric is minimised: 10 to 12px type, 28px rows, spacing in 4px steps, 4px radii, no shadow and no gradient. Hierarchy comes from three things only — alternating row grounds (white and a very pale blue-grey), 1px dividers, and the color blocks of status tags. Figures, IDs and code all run monospace and right-align so columns can be compared vertically. The value of this style is the density itself: forty rows per screen instead of twelve. Any change that adds whitespace is a regression.",
  },
  colors: [
    {
      name: "纯白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "表格与面板底。与交替行色形成最轻的一层区分。",
        en: "Table and panel ground, forming the lightest separation against the alternating row tone.",
      },
      token: "--color-white",
    },
    {
      name: "行交替",
      nameEn: "Row Tint",
      value: "#f8fafc",
      group: "surface",
      role: {
        zh: "交替行与表头底色。只差一档，靠重复面积被感知。",
        en: "Alternating rows and header ground — one step off white, felt through repetition rather than contrast.",
      },
      token: "--color-row-tint",
    },
    {
      name: "墨字",
      nameEn: "Ink",
      value: "#1e293b",
      group: "brand",
      role: {
        zh: "主要文字与数字。深板岩，在密集排版里仍保持锐利。",
        en: "Primary text and figures — deep slate that stays crisp at dense sizes.",
      },
      token: "--color-ink",
    },
    {
      name: "灰字",
      nameEn: "Muted",
      value: "#64748b",
      group: "neutral",
      role: {
        zh: "表头、次要列与说明。永远与 10px 全大写同时出现。",
        en: "Headers, secondary columns and notes, always paired with 10px uppercase.",
      },
      token: "--color-muted",
    },
    {
      name: "主蓝",
      nameEn: "Primary Blue",
      value: "#3b82f6",
      group: "accent",
      role: {
        zh: "主操作、选中行与焦点。在表格里是唯一允许的饱和色块。",
        en: "Primary actions, selected rows and focus — the only saturated block allowed in a table.",
      },
      token: "--color-primary-blue",
    },
    {
      name: "危险红",
      nameEn: "Danger",
      value: "#ef4444",
      group: "accent",
      role: {
        zh: "删除与错误状态，只出现在文字与 10% 底的标签上。",
        en: "Deletion and error states, only on text and 10% ground tags.",
      },
      token: "--color-danger",
    },
    {
      name: "成功绿",
      nameEn: "Success",
      value: "#22c55e",
      group: "accent",
      role: {
        zh: "增长与完成状态，与危险红同等面积同等字重。",
        en: "Growth and completion, matched to danger in both area and weight.",
      },
      token: "--color-success",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600],
      sizes: [10, 11, 12, 14, 18],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.45 },
      tracking: { display: "-0.01em", label: "0.06em" },
      role: {
        zh: "全站唯一字体，最大只到 18px。表头 10px 全大写是这套风格的识别标记。",
        en: "The only face, capping at 18px. The 10px uppercase header is this style's identifying mark.",
      },
      token: "--font-sans",
    },
    {
      family: "JetBrains Mono",
      substitute: "ui-monospace, SFMono-Regular, Menlo, monospace",
      weights: [400, 500],
      sizes: [11, 12, 14],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.45 },
      tracking: { display: "0", label: "0.02em" },
      role: {
        zh: "数字、ID、时间戳与代码。等宽让纵向对比成为可能。",
        en: "Figures, IDs, timestamps and code — the monospace makes vertical comparison possible.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "heading", weight: 600, size: 18, lineHeight: 1.3, token: "--text-heading" },
    { role: "body-lg", weight: 500, size: 14, lineHeight: 1.45, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 12, lineHeight: 1.45, token: "--text-body" },
    { role: "body-sm", weight: 400, size: 11, lineHeight: 1.4, token: "--text-body-sm" },
    { role: "label", weight: 500, size: 10, lineHeight: 1.3, tracking: "0.06em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "compact",
    scale: [4, 8, 12, 16, 24, 32],
    maxWidth: 1600,
    sectionGap: 16,
    cardPadding: 12,
    elementGap: 4,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "4px" },
    { element: "inputs", value: "4px" },
    { element: "tags", value: "4px" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "表格与面板" },
    { level: 1, name: "Row Tint", value: "#f8fafc", purpose: "交替行与表头" },
    { level: 2, name: "Rail", value: "#f8fafc", purpose: "左侧导航" },
  ],
  elevation: [{ name: "None", value: "none — 1px borders only" }],
  components: [
    {
      name: "Data Table",
      role: { zh: "主数据表", en: "The primary data table" },
      construction: {
        zh: "外框 1px #e2e8f0、4px 圆角、无阴影。表头高 32px、底色 #f8fafc、10px 全大写 0.06em 灰字 500 字重。行高 28px、内边距 8px 12px、交替行底色 #f8fafc。数值列等宽右对齐，状态列放色标签。hover 整行为 #eff6ff。过渡 120ms。",
        en: "A 1px #e2e8f0 frame, 4px radius, no shadow. The header is 32px tall on #f8fafc with 10px uppercase at 0.06em in grey 500. Rows are 28px with 8px 12px padding, alternating to #f8fafc. Numeric columns run monospace and right-align; the status column holds color tags. Hover tints the whole row #eff6ff over 120ms.",
      },
      sizes: "row 28px; header 32px",
      states: "hover: row #eff6ff",
    },
    {
      name: "Action Button",
      role: { zh: "行内操作与工具栏按钮", en: "Row actions and toolbar buttons" },
      construction: {
        zh: "高 24px、padding 4px 10px、4px 圆角、11px/500，无阴影。主操作用蓝填充白字；次要操作白底配 1px #e2e8f0 描边；删除操作用红字透明底。hover 只变底色，过渡 120ms。",
        en: "24px tall, 4px 10px padding, 4px radius, 11px/500, no shadow. Primary actions take a blue fill with white text, secondary actions a white fill with a 1px #e2e8f0 border, destructive actions red text on transparent. Hover changes only the ground, over 120ms.",
      },
      sizes: "height 24px; label 11px",
    },
    {
      name: "Stat Card",
      role: { zh: "顶部指标条", en: "Top-row stats" },
      construction: {
        zh: "白底、1px #e2e8f0 描边、4px 圆角、内边距 10px 12px、无阴影。第一行 10px 全大写灰字标签，第二行 18px/600 等宽数字，第三行 10px 的涨跌（绿或红）。三张卡以上等宽横排，间距 12px。",
        en: "White fill, 1px #e2e8f0 border, 4px radius, 10px 12px padding, no shadow. The first line is a 10px uppercase grey label, the second an 18px/600 monospace figure, the third a 10px delta in green or red. Three or more sit in an equal-width row with 12px gaps.",
      },
    },
    {
      name: "Status Tag",
      role: { zh: "状态与分类标记", en: "Status and category tags" },
      construction: {
        zh: "10px/500、4px 圆角、padding 2px 6px、无描边。进行中用蓝 10% 底配蓝 700 字，成功用绿 10% 配绿 700，失败用红 10% 配红 700。颜色必须与文字标签同时出现，不单靠色相。",
        en: "10px/500 on a 4px radius with 2px 6px padding and no border. In-progress uses a 10% blue ground with blue 700 text, success 10% green, failure 10% red. Color always pairs with a text label, never carrying meaning alone.",
      },
    },
    {
      name: "Admin Rail",
      role: { zh: "左侧导航", en: "Left navigation rail" },
      construction: {
        zh: "宽 192px、#f8fafc 底、右侧 1px #e2e8f0 描边、垂直内边距 12px。项目高 26px、4px 圆角、12px 字、图标 14px。选中项蓝填充白字，hover 白底加墨字。分组标签 10px 全大写灰字，上间距 12px。",
        en: "192px wide on #f8fafc with a 1px #e2e8f0 border on the right and 12px vertical padding. Items are 26px tall on a 4px radius with 12px type and a 14px icon. Selection fills blue with white text; hover gives a white ground with ink text. Group labels sit 12px above at 10px uppercase grey.",
      },
    },
  ],
  imagery: {
    zh: "几乎没有图像。允许头像 20px、图标 14px 与迷你趋势图（高度不超过 24px）。不使用大图、插画与背景纹理，它们会直接减少可显示的行数。",
    en: "Almost no imagery. Avatars at 20px, icons at 14px and sparklines no taller than 24px are the entire budget. No large images, illustration or background texture — they directly reduce the row count.",
  },
  layout: {
    zh: "左侧 192px 导航加右侧内容区，内容区上限 1600px、内边距 16px。顶部指标条 12px 间距，下方表格占满剩余高度。所有间距是 4 的倍数，表格行高固定 28px，一屏目标 35 行以上。",
    en: "A 192px rail beside a content area capped at 1600px with 16px padding. The stat row uses 12px gaps and the table below fills the remaining height. Every gap is a multiple of four, rows are pinned at 28px, and the target is thirty-five rows per screen.",
  },
  dos: [
    { zh: "字号 10 到 12px，最大 18px", en: "Type between 10 and 12px, capping at 18px" },
    { zh: "间距以 4px 递增", en: "Spacing moves in 4px steps" },
    { zh: "行高固定 28px", en: "Pin row height at 28px" },
    { zh: "数字与 ID 用等宽右对齐", en: "Run figures and IDs monospace and right-aligned" },
    { zh: "用交替行色与 1px 线分层", en: "Layer with alternating rows and 1px rules" },
    { zh: "状态色必须配文字标签", en: "Status colors always pair with a text label" },
  ],
  donts: [
    { zh: "不要用 16px 以上的内边距", en: "No padding above 16px" },
    { zh: "不要用 8px 以上的圆角", en: "No radius above 8px" },
    { zh: "不要给表格加阴影", en: "No shadows on tables" },
    { zh: "不要用装饰性渐变", en: "No decorative gradients" },
    { zh: "不要为了美观而加留白", en: "Never add whitespace for looks" },
    { zh: "不要用色相单独传达状态", en: "Never signal status by hue alone" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1e293b",
      background: "#ffffff",
      rowTint: "#f8fafc",
      accent: "#3b82f6",
      muted: "#64748b",
      border: "#e2e8f0",
    },
    prompts: [
      {
        zh: "做一个数据表：外框 1px #e2e8f0、4px 圆角、无阴影。表头高 32px、底色 #f8fafc、10px 全大写 0.06em #64748b。行高 28px、内边距 8px 12px、交替行底色 #f8fafc、hover 整行 #eff6ff。数值列 font-variant-numeric: tabular-nums 并右对齐，状态列用 10px 标签（10% 底 + 实色文字，4px 圆角、padding 2px 6px）。",
        en: "Build a data table: a 1px #e2e8f0 frame, 4px radius, no shadow. The header is 32px tall on #f8fafc with 10px uppercase at 0.06em in #64748b. Rows are 28px with 8px 12px padding, alternating to #f8fafc and tinting to #eff6ff on hover. Numeric columns use tabular-nums and right-align; status cells hold 10px tags (10% ground with solid text, 4px radius, 2px 6px padding).",
      },
    ],
  },
  similar: [
    { name: "Dashboard Layout", why: { zh: "同为操作台，但 Dashboard 用 20px 内边距与更大的卡片", en: "Also an operations surface, though Dashboard uses 20px padding and larger cards" } },
    { name: "Linear", why: { zh: "同样追求密度，但 Linear 用暗色与大标题换取气质", en: "Also pursues density, though Linear buys character with dark tones and large titles" } },
  ],
  completeness: "full",
};
