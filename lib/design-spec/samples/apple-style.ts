import type { DesignSpec } from "../types";

export const appleStyleSpec: DesignSpec = {
  slug: "apple-style",
  name: "Apple 风格",
  nameEn: "Apple Style",
  cover: "/styles/apple-style.svg",
  theme: "light",
  northStar: {
    zh: "大量留白、一颗系统蓝、慢到刚好的动效：让产品自己说话。",
    en: "Generous whitespace, one system blue and motion slowed to just this side of noticeable — let the product speak.",
  },
  summary: {
    zh: "Apple 风格的核心不是元素，而是比例：内容占的面积远小于留白，产品图是唯一的主角。底色用偏冷的浅灰（#f5f5f7）代替纯白，卡片比它白一档浮起来。颜色只允许一支系统蓝（#0071e3）用于行动，其余全是灰阶。圆角克制而统一，按钮全圆角、卡片 24px、输入框 12px。动效是这套风格的签名：500ms 与一段缓入缓出的曲线，hover 时轻微上浮、阴影扩散，快一点就变成普通网页，慢一点就拖沓。",
    en: "Apple Style is about proportion before elements: content occupies far less area than whitespace, and product imagery is the only subject. A cool light grey (#f5f5f7) replaces white, with cards a step brighter so they lift. One system blue (#0071e3) is allowed for action; everything else is greyscale. Radii are restrained and consistent — pills for buttons, 24px cards, 12px inputs. Motion is the signature: 500ms on an ease-in-out curve, a slight lift and a widened shadow on hover. Faster reads as an ordinary web page; slower feels sluggish.",
  },
  colors: [
    {
      name: "苹果黑",
      nameEn: "Apple Black",
      value: "#000000",
      group: "brand",
      role: {
        zh: "正文、标题与深色满屏区块。深色区块用来把产品图推到最前。",
        en: "Body, headings and full-bleed dark sections that push the product image forward.",
      },
      token: "--color-apple-black",
    },
    {
      name: "苹果灰",
      nameEn: "Apple Grey",
      value: "#f5f5f7",
      group: "surface",
      role: {
        zh: "页面画布。比纯白柔一档，让白色卡片有依托。",
        en: "Page canvas, one step softer than white so white cards have something to sit on.",
      },
      token: "--color-apple-grey",
    },
    {
      name: "卡片白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "卡片与浮层填充。只在灰底之上出现。",
        en: "Card and overlay fill, appearing only above the grey ground.",
      },
      token: "--color-card-white",
    },
    {
      name: "系统蓝",
      nameEn: "System Blue",
      value: "#0071e3",
      group: "accent",
      role: {
        zh: "唯一强调色：主 CTA、链接与选中态。一屏只允许一处。",
        en: "The only accent: primary CTA, links and selection, once per screen.",
      },
      token: "--color-system-blue",
    },
    {
      name: "成功绿",
      nameEn: "Success Green",
      value: "#34c759",
      group: "accent",
      role: {
        zh: "成功与在线状态，小面积标记。",
        en: "Success and presence, kept to small marks.",
      },
      token: "--color-success-green",
    },
    {
      name: "警示红",
      nameEn: "Alert Red",
      value: "#ff3b30",
      group: "accent",
      role: {
        zh: "错误与删除，出现即代表不可撤销。",
        en: "Errors and destructive actions; its presence implies irreversibility.",
      },
      token: "--color-alert-red",
    },
  ],
  fonts: [
    {
      family: "SF Pro Display",
      substitute: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 17, 24, 40, 56, 80],
      lineHeight: { display: 1.05, heading: 1.15, body: 1.55 },
      tracking: { display: "-0.025em", label: "0.01em" },
      role: {
        zh: "全站唯一字体。大标题用 600 与紧字距，正文 400 保持中性，字级偏大（17px 起）。",
        en: "The only face: 600 with tight tracking for display, 400 for body, starting larger than usual at 17px.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 80, lineHeight: 1.05, tracking: "-0.025em", token: "--text-display" },
    { role: "heading-lg", weight: 600, size: 56, lineHeight: 1.1, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", weight: 600, size: 40, lineHeight: 1.15, tracking: "-0.015em", token: "--text-heading" },
    { role: "subheading", weight: 500, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 17, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 400, size: 12, lineHeight: 1.4, tracking: "0.01em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128, 192],
    maxWidth: 1080,
    sectionGap: 128,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
    { element: "product-media", value: "18px" },
  ],
  surfaces: [
    { level: 0, name: "Apple Grey", value: "#f5f5f7", purpose: "页面画布" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "卡片与浮层" },
    { level: 2, name: "Black Stage", value: "#000000", purpose: "产品满屏区" },
  ],
  elevation: [
    { name: "Card rest", value: "0 4px 12px rgba(0,0,0,0.04)" },
    { name: "Card hover", value: "0 20px 40px rgba(0,0,0,0.08)" },
    { name: "Button glow", value: "0 4px 14px rgba(0,113,227,0.30)" },
  ],
  components: [
    {
      name: "Pill Button",
      role: { zh: "主行动，例：Buy、Learn more", en: "Primary action: Buy, Learn more" },
      construction: {
        zh: "系统蓝填充、白字、999px 全圆角、无描边。字级 17px、字重 500、padding 12px 24px，阴影 0 4px 14px 蓝 30%。hover 时填充提亮到 #0077ed、上浮 2px、阴影扩到 20px 40%；按下缩放 0.96。过渡 500ms，缓动 cubic-bezier(0.25, 0.1, 0.25, 1)。",
        en: "System blue fill, white text, fully rounded at 999px, no border. 17px type at weight 500, 12px 24px padding, shadow 0 4px 14px at 30% blue. Hover brightens the fill to #0077ed, lifts 2px and widens the shadow to 20px 40%; press scales to 0.96. 500ms on cubic-bezier(0.25, 0.1, 0.25, 1).",
      },
      sizes: "padding 12px 24px; label 17px",
      states: "hover: lift 2px, brighter fill; active: scale 0.96",
    },
    {
      name: "Product Card",
      role: { zh: "产品卡与功能卡", en: "Product and feature card" },
      construction: {
        zh: "白底、24px 圆角、内边距 32px、阴影 0 4px 12px 4%。内容居中：上方 192px 见方的产品图（18px 圆角、苹果灰底），下面 24px/600 标题与 14px 灰字。hover 时上浮 4px、阴影扩到 0 20px 40px 8%、产品图放大 1.05，过渡 500ms。",
        en: "White fill, 24px radius, 32px padding, shadow 0 4px 12px at 4%. Content is centred: a 192px product image (18px radius, grey bed) above a 24px/600 title and 14px grey copy. Hover lifts 4px, widens the shadow to 0 20px 40px at 8% and scales the image to 1.05, over 500ms.",
      },
    },
    {
      name: "Search Field",
      role: { zh: "搜索与输入", en: "Search and input" },
      construction: {
        zh: "苹果灰底、12px 圆角、无描边、padding 12px 16px、17px 字。聚焦时加 2px 系统蓝焦点环，不改变尺寸。",
        en: "Grey fill, 12px radius, no border, 12px 16px padding at 17px. Focus adds a 2px system-blue ring without resizing the box.",
      },
      states: "focus: 2px blue ring",
    },
    {
      name: "Vibrancy Nav",
      role: { zh: "顶部导航", en: "Top navigation" },
      construction: {
        zh: "高 48px、白色 80% 不透明、backdrop-blur 20px、底部 1px 灰 50% 描边。链接 12px、字重 400、间距 32px，hover 转 50% 灰。右侧最多一个纯文字 CTA。",
        en: "48px tall, 80% white with a 20px backdrop blur, a 1px border at 50% grey along the bottom. Links at 12px/400, 32px apart, fading to 50% grey on hover. One text-only CTA on the right.",
      },
    },
  ],
  imagery: {
    zh: "产品渲染与实拍是唯一的主角：满屏、居中、背景纯净（黑、白或苹果灰）。允许缓慢的视差与缩放。不使用插画、图标墙、渐变背景或人物特写。",
    en: "Product renders and photography are the only subject: full-bleed, centred, on a clean ground (black, white or Apple grey). Slow parallax and scale are welcome. No illustration, icon walls, gradient backgrounds or people.",
  },
  layout: {
    zh: "上限 1080px，容器内边距 24px。区块间距 128px 起，留白至少是内容高度的一半。每屏只讲一件事：一个标题、一句副标题、两个链接。产品区可满屏且反色。",
    en: "Capped at 1080px with 24px padding. Sections sit 128px apart, with whitespace at least half the content height. Each viewport carries one idea: a headline, a subhead, two links. Product sections may go full-bleed and invert.",
  },
  dos: [
    { zh: "留白优先，元素稀疏到近乎空", en: "Whitespace first; keep elements sparse to the point of emptiness" },
    { zh: "只用一支系统蓝，#0071e3", en: "One system blue only: #0071e3" },
    { zh: "动效 500ms，缓入缓出", en: "Motion runs 500ms on an ease-in-out curve" },
    { zh: "按钮全圆角、卡片 24px、输入 12px", en: "Pills for buttons, 24px cards, 12px inputs" },
    { zh: "标题 600 字重配紧字距", en: "Headings at weight 600 with tight tracking" },
    { zh: "背景用苹果灰而不是纯白", en: "Ground with Apple grey, not pure white" },
  ],
  donts: [
    { zh: "不要用多个强调色", en: "Do not introduce a second accent" },
    { zh: "不要用渐变背景", en: "No gradient backgrounds" },
    { zh: "不要用重阴影", en: "No heavy shadows" },
    { zh: "不要把内容挤在一起", en: "Never crowd the layout" },
    { zh: "不要用装饰性插画或图标墙", en: "No decorative illustration or icon walls" },
    { zh: "不要让圆角混用超过三档", en: "Do not exceed three radius values" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1d1d1f",
      background: "#f5f5f7",
      card: "#ffffff",
      accent: "#0071e3",
      muted: "#86868b",
      dark: "#000000",
    },
    prompts: [
      {
        zh: "做一个产品卡：白底、24px 圆角、内边距 32px、阴影 0 4px 12px rgba(0,0,0,0.04)。上方放 192px 见方产品图（18px 圆角、#f5f5f7 底），下面 24px/600 标题 #1d1d1f 与 14px #86868b 说明，再下面一个 #0071e3 全圆角按钮（17px/500、padding 12px 24px）。hover 时卡片上浮 4px、阴影扩到 0 20px 40px rgba(0,0,0,0.08)、产品图放大 1.05，过渡 500ms cubic-bezier(0.25,0.1,0.25,1)。",
        en: "Build a product card: white fill, 24px radius, 32px padding, shadow 0 4px 12px rgba(0,0,0,0.04). A 192px product image (18px radius on #f5f5f7) sits above a 24px/600 title in #1d1d1f and 14px copy in #86868b, with a #0071e3 pill button below (17px/500, 12px 24px padding). On hover the card lifts 4px, the shadow widens to 0 20px 40px rgba(0,0,0,0.08) and the image scales to 1.05, over 500ms cubic-bezier(0.25,0.1,0.25,1).",
      },
    ],
  },
  similar: [
    { name: "Apple", why: { zh: "同一套比例、同一支蓝、同一段缓动", en: "Same proportion, same single blue, same easing" } },
    { name: "Linear", why: { zh: "同样以留白与单一强调色组织信息", en: "Also organises information with whitespace and a single accent" } },
  ],
  completeness: "full",
};
