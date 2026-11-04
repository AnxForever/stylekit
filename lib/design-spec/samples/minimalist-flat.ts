import type { DesignSpec } from "../types";

/**
 * Tenth sample and the last of the first batch. Its constraint is subtraction:
 * no shadows, no gradients, no mixed radii. Hierarchy must come from color
 * blocks and whitespace alone, so the spec has almost no elevation tokens.
 */
export const minimalistFlatSpec: DesignSpec = {
  slug: "minimalist-flat",
  name: "极简扁平风",
  nameEn: "Minimalist Flat",
  cover: "/styles/minimalist-flat.svg",
  theme: "light",
  northStar: {
    zh: "黑白两色、零阴影、大量留白，一切装饰都被删掉。",
    en: "Two colors, zero shadow, generous whitespace — every decoration removed.",
  },
  summary: {
    zh: "极简扁平风靠删减工作：不用阴影、不用渐变、不混用圆角，层次只由色块与留白建立。黑白是主结构，四支高饱和强调色各自承担一类动作（主色粉用于按下态，青用于数据，黄用于高亮，赭用于次级）。交互同样不用阴影，hover 时直接反转前景与背景，200ms 内完成；按下态换成强调色，给出明确的一次性反馈。圆角必须统一——要么全部直角，要么全部全圆角，混用会立刻散掉。",
    en: "Minimalist Flat works by removal: no shadows, no gradients, no mixed radii. Hierarchy comes from color blocks and whitespace alone. Black and white carry the structure, while four saturated accents each own one job — pink for pressed states, teal for data, yellow for highlights, ochre for secondary. Interaction avoids shadow too: hover inverts foreground and background over 200ms, and press swaps in an accent for one clear confirmation. Radius must be uniform — all square or all fully round; mixing them dissolves the system.",
  },
  colors: [
    {
      name: "纯黑",
      nameEn: "Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "文字、描边与深色区块。允许纯黑，因为这套风格就是要最高的对比。",
        en: "Text, borders and dark blocks. Pure black is allowed here; this style wants maximum contrast.",
      },
      token: "--color-black",
    },
    {
      name: "纯白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "页面画布与反转区块的填充。与纯黑成对使用，没有中间灰。",
        en: "Canvas and the fill of inverted blocks. Always paired with black; there is no mid grey.",
      },
      token: "--color-white",
    },
    {
      name: "信号粉",
      nameEn: "Signal Pink",
      value: "#ff3366",
      group: "accent",
      role: {
        zh: "按下态与主强调。全站最强的视觉信号，只出现在一次交互的瞬间。",
        en: "Pressed states and primary emphasis — the loudest signal, saved for the instant of interaction.",
      },
      token: "--color-signal-pink",
    },
    {
      name: "薄荷青",
      nameEn: "Mint",
      value: "#00d4aa",
      group: "accent",
      role: {
        zh: "数据、成功与图表。用于需要被读出来的数字，不做背景。",
        en: "Data, success and charts. For figures that must be read, never as a background.",
      },
      token: "--color-mint",
    },
    {
      name: "亮黄",
      nameEn: "Bright Yellow",
      value: "#ffcc00",
      group: "accent",
      role: {
        zh: "高亮与标记。用于强调一段文字或一个标签，面积不超过一行。",
        en: "Highlights and markers, applied to a line of text or a single tag — never more than a line.",
      },
      token: "--color-yellow",
    },
    {
      name: "赭",
      nameEn: "Ochre",
      value: "#b45700",
      group: "accent",
      role: {
        zh: "次级强调与警示。出现频率最低，用于需要区分于信号粉的场合。",
        en: "Secondary emphasis and warnings, the least used tone, for cases that must not read as pink.",
      },
      token: "--color-ochre",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "Helvetica Neue, Arial, system-ui, sans-serif",
      weights: [400, 700, 900],
      sizes: [12, 14, 16, 24, 40, 64],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.6 },
      tracking: { display: "-0.03em", label: "0.12em" },
      role: {
        zh: "全站唯一字体。标题用 900 与紧字距制造版面张力，正文 400 保持中性。",
        en: "The only face: 900 at tight tracking gives headlines their tension, while 400 keeps body copy neutral.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 64, lineHeight: 1.05, tracking: "-0.03em", token: "--text-display" },
    { role: "heading-lg", weight: 900, size: 40, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 700, size: 24, lineHeight: 1.2, tracking: "-0.01em", token: "--text-heading" },
    { role: "body-lg", weight: 400, size: 18, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.12em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128, 192],
    maxWidth: 1280,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "buttons-pill", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "页面画布" },
    { level: 1, name: "Black Block", value: "#000000", purpose: "反转区块与页脚" },
  ],
  elevation: [
    { name: "None", value: "none" },
    { name: "Rule", value: "2px solid #000000" },
  ],
  components: [
    {
      name: "Filled Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "纯黑填充、白字、2px 纯黑描边、直角、无阴影。字级 16px、字重 700、padding 16px 32px。hover 时填充与文字互换（白底黑字、保留描边）；按下时填充换成信号粉、文字白、描边同色。过渡只变颜色，200ms。",
        en: "Black fill, white text, 2px black border, square corners, no shadow. 16px type at weight 700, 16px 32px padding. Hover swaps fill and text (white fill, black text, border kept); press switches the fill to signal pink with white text and a matching border. Color-only transition, 200ms.",
      },
      sizes: "padding 16px 32px; label 16px",
      states: "hover: inverted; active: pink fill; no shadow at any state",
    },
    {
      name: "Outlined Button",
      role: { zh: "次级行动", en: "Secondary action" },
      construction: {
        zh: "白底、纯黑文字、2px 纯黑描边、直角。padding 16px 32px、16px/700。hover 反转为黑底白字；按下换成信号粉，与主按钮保持同一套状态逻辑。",
        en: "White fill, black text, 2px black border, square corners, 16px 32px padding at 16px/700. Hover inverts to black fill with white text; press moves to signal pink, matching the primary's state logic.",
      },
    },
    {
      name: "Flat Card",
      role: { zh: "内容块与作品卡", en: "Content block and work card" },
      construction: {
        zh: "白底、2px 纯黑描边、直角、无阴影、无圆角，内边距 32px。hover 时背景整体转黑、文字转白，不做位移。图像必须与卡片同宽、直角裁切。",
        en: "White fill, 2px black border, square corners, no shadow, 32px padding. Hover turns the whole block black with white text and moves nothing. Images match the card width and are cropped square.",
      },
    },
    {
      name: "Accent Label",
      role: { zh: "分类、标签与状态", en: "Category, tag and status" },
      construction: {
        zh: "无描边、直角、无圆角，12px 字、700 字重、0.12em 字距、padding 4px 8px。默认黑底白字；用于高亮时换亮黄底黑字；用于数据时用薄荷青底白字。三种变体不混用。",
        en: "No border, square, 12px type at weight 700 with 0.12em tracking, 4px 8px padding. Default is black on white; highlights switch to yellow fill with black text; data uses mint fill with white text. The three variants never mix.",
      },
    },
  ],
  imagery: {
    zh: "两色摄影、几何构图、大面积纯色块。图像必须是直角裁切、强对比、无柔和过渡。允许把照片压成单色作为区块背景。不使用阴影、渐变、柔光与装饰性插画。",
    en: "Two-tone photography, geometric composition and large flat color fields. Images are cropped square with hard contrast and no soft transition. A photo may be flattened to one tone as a block background. No shadow, gradient, glow or decorative illustration.",
  },
  layout: {
    zh: "12 栏、上限 1280px、容器内边距 24px。区块间距 128px 到 192px，比常规大得多，留白本身就是版面的主要材料。区块全部左对齐或贴边，标题不居中。允许整块反转为黑底白字，但一页不超过两次。",
    en: "Twelve columns capped at 1280px, container padding 24px. Sections sit 128px to 192px apart — far more than usual, because whitespace is the primary material. Blocks align left or bleed to the edge; headings are never centred. A section may invert to black, at most twice per page.",
  },
  dos: [
    {
      zh: "只用纯黑白做主结构，强调色各自承担一类动作",
      en: "Black and white carry the structure; each accent owns one kind of action",
    },
    {
      zh: "零阴影，层级靠色块与留白",
      en: "Zero shadow — hierarchy from color blocks and whitespace",
    },
    {
      zh: "圆角必须统一，要么全直角要么全圆角",
      en: "Radius must be uniform: all square or all fully round",
    },
    {
      zh: "hover 反转前景与背景，不用阴影",
      en: "Hover inverts foreground and background instead of adding shadow",
    },
    {
      zh: "按下态换强调色，一次性明确反馈",
      en: "Press swaps to an accent for one clear confirmation",
    },
    {
      zh: "区块间距 128px 起，宁可减少模块",
      en: "Section spacing starts at 128px; cut a module before compressing",
    },
  ],
  donts: [
    {
      zh: "不要使用任何阴影",
      en: "No shadows of any kind",
    },
    {
      zh: "不要使用渐变",
      en: "No gradients",
    },
    {
      zh: "不要混用直角与小圆角",
      en: "Do not mix square corners with small radii",
    },
    {
      zh: "不要用低于 50% 透明度的元素",
      en: "Nothing below 50% opacity",
    },
    {
      zh: "不要用灰色文字替代黑色层级",
      en: "Do not substitute grey text for black hierarchy",
    },
    {
      zh: "不要用图案或纹理背景",
      en: "No pattern or texture backgrounds",
    },
  ],
  promptGuide: {
    quickColors: {
      text: "#000000",
      background: "#ffffff",
      accent: "#ff3366",
      data: "#00d4aa",
      highlight: "#ffcc00",
      border: "#000000",
    },
    prompts: [
      {
        zh: "做一个极简扁平按钮：纯黑填充、白字、2px 纯黑描边、直角、无阴影，16px/700，padding 16px 32px。hover 时反转为白底黑字；按下时填充 #ff3366、文字白色。只用 transition-colors 200ms，不加任何位移或阴影。",
        en: "Build a flat button: black fill, white text, 2px black border, square corners, no shadow, 16px/700 with 16px 32px padding. Hover inverts to a white fill with black text; press fills #ff3366 with white text. Only transition-colors over 200ms — no translation and no shadow.",
      },
    ],
  },
  similar: [
    {
      name: "Vercel",
      why: {
        zh: "同样的黑白结构加一支高饱和强调，零阴影",
        en: "Same black-and-white structure with a single saturated accent and no shadow",
      },
    },
    {
      name: "Swiss Style",
      why: {
        zh: "同源的版式纪律：网格、留白、强对比，但不拒绝描边与色块",
        en: "Shares the typographic discipline — grid, whitespace, contrast — while allowing rules and blocks",
      },
    },
  ],
  completeness: "full",
};
