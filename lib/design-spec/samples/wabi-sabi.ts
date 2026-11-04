import type { DesignSpec } from "../types";

export const wabiSabiSpec: DesignSpec = {
  slug: "wabi-sabi",
  name: "侘寂风",
  nameEn: "Wabi-Sabi",
  cover: "/styles/wabi-sabi.svg",
  theme: "light",
  northStar: {
    zh: "不完美、不恒常、不完整：让材质和时间替设计说话。",
    en: "Imperfect, impermanent, incomplete — let material and time speak instead of design.",
  },
  summary: {
    zh: "侘寂是日本美学里对「不完美」的接纳：器物的缺口、纸的泛黄、墙的斑驳都被视为价值而不是缺陷。落到界面上，它表现为暖纸底（#f2ede4）、墨色文字（#3a3a3a）、衬线字体、极细的分隔线（1px 且只有 30% 不透明度），以及大量到近乎奢侈的留白。它禁止鲜艳与高饱和、禁止厚重阴影与粗边框、禁止密集排列、禁止装饰性动画与弹跳——任何「表现欲」都是对它的冒犯。",
    en: "Wabi-sabi is the Japanese acceptance of imperfection: a chip in a bowl, yellowed paper, a blotched wall are all value rather than flaw. On screen it shows as warm paper (#f2ede4), ink text (#3a3a3a), serif type, dividers of 1px at 30% opacity, and whitespace extravagant to the point of luxury. Vivid saturation, heavy shadow and thick borders, dense arrangement, decorative animation and bounce are all refused — any display of eagerness offends it.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#3a3a3a",
      group: "brand",
      role: {
        zh: "全部文字。中深灰而非纯黑，长时间看更松。",
        en: "Every text run — a mid-deep grey rather than black, easier over long use.",
      },
      token: "--color-ink",
    },
    {
      name: "纸",
      nameEn: "Paper",
      value: "#f2ede4",
      group: "surface",
      role: {
        zh: "页面底。泛黄的暖米色，像放了很久的和纸。",
        en: "The page ground — a yellowed warm cream like washi left for years.",
      },
      token: "--color-paper",
    },
    {
      name: "苔",
      nameEn: "Moss",
      value: "#8a9a7b",
      group: "accent",
      role: {
        zh: "第一辅色，像石阶上的苔，用于次级强调。",
        en: "The first support color, like moss on a stone step, on secondary emphasis.",
      },
      token: "--color-moss",
    },
    {
      name: "沙",
      nameEn: "Sand",
      value: "#b5a78c",
      group: "accent",
      role: {
        zh: "区块底与分隔，用于不引入对比地分区。",
        en: "Section grounds and dividers, dividing space without introducing contrast.",
      },
      token: "--color-sand",
    },
    {
      name: "茶",
      nameEn: "Tea",
      value: "#8b6f4e",
      group: "accent",
      role: {
        zh: "温暖的棕，用于需要人气的元素与木器语义。",
        en: "A warm brown, on elements needing a human presence and on wooden objects.",
      },
      token: "--color-tea",
    },
    {
      name: "青灰",
      nameEn: "Slate Teal",
      value: "#799d91",
      group: "accent",
      role: {
        zh: "冷侧的一笔，用于水、陶釉与安静状态。",
        en: "The cool stroke, on water, glaze and quiet states.",
      },
      token: "--color-slate-teal",
    },
  ],
  fonts: [
    {
      family: "Noto Serif SC",
      substitute: "'Songti SC', Georgia, serif",
      weights: [300, 400],
      sizes: [14, 16, 19, 24, 32, 42],
      lineHeight: { display: 1.25, heading: 1.4, body: 1.9 },
      tracking: { display: "0.02em", label: "0.24em" },
      role: {
        zh: "全站衬线，只用 300 与 400。行高 1.9，字距微开，让字与字之间也有空隙。",
        en: "Serif throughout in 300 and 400 only. Leading at 1.9 with slightly open tracking, so even letters keep their distance.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", font: "Noto Serif SC", weight: 300, size: 42, lineHeight: 1.25, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Noto Serif SC", weight: 400, size: 32, lineHeight: 1.35, token: "--text-heading" },
    { role: "subheading", font: "Noto Serif SC", weight: 400, size: 24, lineHeight: 1.45, token: "--text-subheading" },
    { role: "body-lg", font: "Noto Serif SC", weight: 400, size: 19, lineHeight: 1.85, token: "--text-body-lg" },
    { role: "body", font: "Noto Serif SC", weight: 300, size: 16, lineHeight: 1.9, token: "--text-body" },
    { role: "label", font: "Noto Serif SC", weight: 400, size: 14, lineHeight: 1.7, tracking: "0.24em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 144, 192],
    maxWidth: 980,
    sectionGap: 192,
    cardPadding: 40,
    elementGap: 36,
  },
  radii: [
    { element: "cards", value: "2px" },
    { element: "buttons", value: "2px" },
    { element: "images", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#f2ede4", purpose: "页面底" },
    { level: 1, name: "Lifted Paper", value: "#f7f3ec", purpose: "卡片" },
    { level: 2, name: "Sand Block", value: "rgba(181,167,140,0.22)", purpose: "次级区块" },
  ],
  elevation: [
    { name: "None", value: "none — shadows break the quiet" },
    { name: "Max allowed", value: "0 1px 2px rgba(58,58,58,0.04)" },
  ],
  components: [
    {
      name: "Hairline Rule",
      role: { zh: "极细分隔线（核心结构）", en: "The hairline rule — the core structure" },
      construction: {
        zh: "1px、色 #d4cdc5 的 30%、横跨内容宽并在两端各收进 10%。整条线必须弱到「几乎看不见但又能感觉到」，它是这套风格唯一的结构工具。",
        en: "1px in #d4cdc5 at 30%, spanning most of the content width with 10% clear at each end. It must be weak enough to barely see yet still felt — the style's only structural tool.",
      },
    },
    {
      name: "Quiet Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、1px 墨色 25% 描边、2px 圆角、衬线 14px、字距 0.24em、padding 14px 36px，无阴影。hover 时描边升到 45%、文字从 80% 升到 100%，元素完全不动。过渡 600ms ease-out。",
        en: "Transparent fill, a 1px ink border at 25%, 2px radius, serif at 14px with 0.24em tracking, 14px 36px padding, no shadow. Hover raises the border to 45% and the text from 80% to full, with nothing moving. 600ms ease-out.",
      },
      states: "hover: border 45%, text 100%; no motion",
    },
    {
      name: "Paper Card",
      role: { zh: "内容卡", en: "Content card" },
      construction: {
        zh: "提亮一档的纸色填充、2px 圆角、1px 沙 30% 描边、内边距 40px，无阴影。标题 32px/400，正文 16px/300 行高 1.9。hover 时只把描边升到 50% 与填充提亮 2%，过渡 800ms。",
        en: "Paper fill one step lifted, 2px radius, a 1px sand border at 30%, 40px padding, no shadow. Title at 32px/400, body at 16px/300 on 1.9 leading. Hover only raises the border to 50% and the fill by two percent, over 800ms.",
      },
    },
    {
      name: "Object Image",
      role: { zh: "器物图片容器", en: "Object image container" },
      construction: {
        zh: "零圆角、无边框、无阴影。图片可以是不规则的器物（陶碗、旧木、石），允许边缘不齐。图片与文字之间 36px。不叠加任何滤镜或遮罩，让材质自己呈现。",
        en: "Zero radius, no border, no shadow. The image may hold an irregular object — a clay bowl, old wood, a stone — and its edge need not be clean. It sits 36px from text, with no filter or overlay, letting the material speak.",
      },
    },
    {
      name: "Silence Block",
      role: { zh: "留白区块", en: "The silence block" },
      construction: {
        zh: "一个 192px 到 320px 高的空区块，不含任何内容，作为真实元素存在。在侘寂里「什么都没有」本身就是一种内容，用来把前后的东西隔开并放大。",
        en: "An empty block 192px to 320px tall carrying nothing, existing as a real element. In wabi-sabi, having nothing there is itself the content — it separates and enlarges what surrounds it.",
      },
    },
  ],
  imagery: {
    zh: "器物摄影：陶器、旧木、石、枯枝、麻布。必须自然光、低饱和、有磨损痕迹。允许不对称与不完整构图。不使用高饱和、棚拍打光与装饰插画。",
    en: "Object photography: ceramics, old wood, stone, dry branches, linen. Natural light, low saturation, visible wear. Asymmetry and incomplete framing are welcome. No saturation, studio lighting or decorative illustration.",
  },
  layout: {
    zh: "上限 980px、容器内边距 32px，区块间距 192px。版面允许不完整与偏置：元素不必贴齐网格，留白可以不对称。禁止密集排列，一屏原则上不超过三个信息块。",
    en: "Capped at 980px with 32px padding, sections 192px apart. The layout may be incomplete and off-centre — elements need not align to a grid and emptiness may be lopsided. Dense arrangement is refused; one screen carries three blocks at most.",
  },
  dos: [
    { zh: "暖纸底，不用纯白", en: "Ground in warm paper, never white" },
    { zh: "衬线字体，行高 1.9", en: "Serif type at 1.9 leading" },
    { zh: "分隔线 1px 且只有 30%", en: "Dividers are 1px at 30%" },
    { zh: "留白到近乎奢侈", en: "Let emptiness run near-luxurious" },
    { zh: "允许不完美与不对称", en: "Allow imperfection and asymmetry" },
    { zh: "过渡 600 到 800ms，元素不动", en: "Transitions run 600 to 800ms with nothing moving" },
  ],
  donts: [
    { zh: "不要用鲜艳高饱和色", en: "No vivid saturated color" },
    { zh: "不要用厚重阴影或粗边框", en: "No heavy shadows or thick borders" },
    { zh: "不要密集排列元素", en: "Never arrange elements densely" },
    { zh: "不要用装饰性动画与弹跳", en: "No decorative animation or bounce" },
    { zh: "不要用纯白背景", en: "No pure white ground" },
    { zh: "不要加滤镜与遮罩破坏材质", en: "Never filter or overlay the material away" },
  ],
  promptGuide: {
    quickColors: {
      text: "#3a3a3a",
      background: "#f2ede4",
      card: "#f7f3ec",
      moss: "#8a9a7b",
      sand: "#b5a78c",
      tea: "#8b6f4e",
    },
    prompts: [
      {
        zh: "做一个侘寂风卡片：背景 #f7f3ec（提亮一档的纸色）、2px 圆角、1px rgba(181,167,140,0.3) 描边、内边距 40px、无阴影。标题 32px Noto Serif SC 400、色 #3a3a3a；正文 16px/300、行高 1.9。卡片之间留 192px 空白。hover 时描边升到 rgba(181,167,140,0.5)、transition 800ms ease-out，元素不位移。页面底色 #f2ede4。",
        en: "Build a wabi-sabi card: background #f7f3ec (paper one step lifted), 2px radius, a 1px rgba(181,167,140,0.3) border, 40px padding, no shadow. Title at 32px Noto Serif SC 400 in #3a3a3a; body at 16px/300 on 1.9 leading. Leave 192px of emptiness between cards. Hover raises the border to rgba(181,167,140,0.5) over 800ms ease-out with nothing moving. The page ground is #f2ede4.",
      },
    ],
  },
  similar: [
    { name: "Japanese Fresh", why: { zh: "同源美学，但日系清新是明亮的，侘寂是沉静并有时间痕迹的", en: "Shares the aesthetic root, though Japanese Fresh is bright while wabi-sabi is quiet and visibly aged" } },
    { name: "Ink Wash", why: { zh: "同为东方克制，但水墨讲墨的浓淡，侘寂讲材质的不完美", en: "Both Eastern restraint, though ink wash works in ink density while wabi-sabi works in material imperfection" } },
  ],
  completeness: "full",
};
