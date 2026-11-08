import type { DesignSpec } from "../types";

export const cardStackSpec: DesignSpec = {
  slug: "card-stack",
  name: "卡片堆叠布局",
  nameEn: "Card Stack",
  cover: "/styles/card-stack.svg",
  theme: "light",
  northStar: {
    zh: "三张卡片前后错开叠在一起，用 Z 轴而不是排布说明顺序。",
    en: "Three cards overlap at slight offsets, using the Z axis instead of layout to show order.",
  },
  summary: {
    zh: "卡片堆叠是一个 3D 排布策略：一张主卡在最前，后面两张各向上偏移 12px 与 24px、缩小到 0.96 与 0.92、并降低不透明度。它把「顺序」变成空间关系而不是列表。视觉上必须克制——卡片本身只是白底、16px 圆角、一级阴影，所有表现力都放在层级变换上：切换时前后卡片沿着 Z 轴重新排列，用 400ms 的缓出完成。卡片之间的偏移不能超过 24px，否则会读成散落的纸片而不是一副牌。",
    en: "Card Stack is a 3D arrangement strategy: one primary card in front, two behind it offset 12px and 24px upward, scaled to 0.96 and 0.92, and reduced in opacity. It turns sequence into spatial relationship rather than a list. The visual language stays quiet — cards are white with a 16px radius and one shadow step — because all expression lives in the layer transform: switching re-orders the deck along the Z axis over 400ms on an ease-out curve. Offsets must not exceed 24px, or the deck reads as loose paper rather than a hand of cards.",
  },
  colors: [
    {
      name: "午夜",
      nameEn: "Midnight",
      value: "#1a1a2e",
      group: "brand",
      role: {
        zh: "标题、主按钮与深色卡片。堆叠需要一支足够深的颜色来区分主卡。",
        en: "Headings, primary buttons and dark cards — the deck needs one deep tone to single out the lead card.",
      },
      token: "--color-midnight",
    },
    {
      name: "雾白",
      nameEn: "Fog",
      value: "#f0f0f5",
      group: "surface",
      role: {
        zh: "页面底色。带一点蓝的浅灰，让白卡片的边缘清晰。",
        en: "Page ground — a cool light grey that keeps white card edges legible.",
      },
      token: "--color-fog",
    },
    {
      name: "卡白",
      nameEn: "Card White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "主卡与后置卡片的填充。所有卡片同色，只靠变换区分层级。",
        en: "Fill for the lead and trailing cards. Same color throughout; only the transform marks the level.",
      },
      token: "--color-card-white",
    },
    {
      name: "靛",
      nameEn: "Indigo",
      value: "#6c5ce7",
      group: "accent",
      role: {
        zh: "主强调与指示器激活态，用于告诉用户当前看到第几张。",
        en: "Primary accent and the active indicator, telling the user which card they are on.",
      },
      token: "--color-indigo",
    },
    {
      name: "青",
      nameEn: "Cyan",
      value: "#00cec9",
      group: "accent",
      role: {
        zh: "成功与「已完成」步骤，用于进度语义。",
        en: "Success and completed steps, used for progress semantics.",
      },
      token: "--color-cyan",
    },
    {
      name: "粉",
      nameEn: "Pink",
      value: "#fd79a8",
      group: "accent",
      role: {
        zh: "情感化强调，用于收藏与推荐。",
        en: "Emotional emphasis for saves and recommendations.",
      },
      token: "--color-pink",
    },
    {
      name: "奶油黄",
      nameEn: "Butter",
      value: "#ffeaa7",
      group: "accent",
      role: {
        zh: "高亮与「新」标记，只在小面积出现。",
        en: "Highlights and new-item marks, kept to small areas.",
      },
      token: "--color-butter",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      weights: [400, 500, 600, 700],
      sizes: [12, 14, 16, 20, 28, 36],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "全站唯一字体。卡片标题 600、正文 400，字级克制以免抢走堆叠的注意力。",
        en: "The only face: 600 for card titles, 400 for body, sized conservatively so the deck keeps attention.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 700, size: 36, lineHeight: 1.15, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 600, size: 28, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", weight: 600, size: 20, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 16, lineHeight: 1.6, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 14, lineHeight: 1.6, token: "--text-body" },
    { role: "label", weight: 500, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 960,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "12px" },
    { element: "indicators", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Fog", value: "#f0f0f5", purpose: "页面底色" },
    { level: 1, name: "Card White", value: "#ffffff", purpose: "所有堆叠卡片" },
  ],
  elevation: [
    { name: "Lead card", value: "0 18px 40px rgba(26,26,46,0.12)" },
    { name: "Trailing card", value: "0 8px 20px rgba(26,26,46,0.08)" },
  ],
  components: [
    {
      name: "Stack Card",
      role: { zh: "堆叠中的任意一张卡片", en: "Any card in the deck" },
      construction: {
        zh: "白底、16px 圆角、无描边、内边距 32px。前置卡片阴影 0 18px 40px 午夜 12%；后置卡片每层上移 12px、缩放 0.96、不透明度降到 70%，第二层再上移 12px、缩放 0.92、不透明度 40%。切换时用 transform 过渡，400ms cubic-bezier(0.22, 1, 0.36, 1)。",
        en: "White fill, 16px radius, no border, 32px padding. The lead card carries 0 18px 40px at 12% midnight; each trailing layer lifts 12px, scales to 0.96 and drops to 70% opacity, with the third lifting another 12px to 0.92 and 40%. Switching transitions transform over 400ms cubic-bezier(0.22, 1, 0.36, 1).",
      },
      sizes: "padding 32px; radius 16px",
      states: "lead: full opacity; layer 2: 0.96 / 70%; layer 3: 0.92 / 40%",
    },
    {
      name: "Deck Controls",
      role: { zh: "切换按钮与拖动提示", en: "Switching controls and drag affordance" },
      construction: {
        zh: "圆形按钮 40px、白底、1px #e4e4ec 描边、无阴影，箭头图标 16px。hover 时描边转午夜并加 0 4px 12px 8% 阴影；按下缩放 0.94。左右两个按钮分列卡片两侧，垂直居中。",
        en: "Circular buttons at 40px with a white fill, a 1px #e4e4ec border, no shadow and a 16px arrow. Hover turns the border midnight and adds a 0 4px 12px shadow at 8%; press scales 0.94. One button sits on each side of the card, vertically centred.",
      },
    },
    {
      name: "Step Indicator",
      role: { zh: "当前进度指示", en: "Current position indicator" },
      construction: {
        zh: "一排 8px 圆点，间距 8px。当前项填充靛并拉长成 24px 的胶囊，其余为 30% 午夜圆点。切换时宽度与颜色一起过渡，300ms ease-out。",
        en: "A row of 8px dots spaced 8px apart. The active one fills indigo and stretches into a 24px pill; the rest stay at 30% midnight. Switching animates width and color together over 300ms ease-out.",
      },
    },
    {
      name: "Stack Container",
      role: { zh: "堆叠容器", en: "The deck container" },
      construction: {
        zh: "最大宽度 640px，高度固定为卡片最高内容的高度加 48px（为后置层留出空间）。用 transform 与 z-index 实现层级，禁止用绝对定位偏移来模拟。容器需支持触摸左右滑动，滑动阈值 80px。",
        en: "Capped at 640px wide with a fixed height equal to the tallest card plus 48px of headroom for the trailing layers. Levels use transform and z-index — never absolute offsets. The container supports horizontal touch drags with an 80px threshold.",
      },
    },
  ],
  imagery: {
    zh: "卡片内以插图与产品截图为主，每张卡片最多一张图且宽度铺满内容区。不使用全幅摄影与背景纹理，堆叠本身已经足够有存在感。",
    en: "Cards hold illustration or product shots, one image each at full content width. No full-bleed photography or background texture — the stack already carries enough presence.",
  },
  layout: {
    zh: "上限 960px、容器内边距 24px，区块间距 96px。堆叠区居中，卡片最大宽度 640px，左右各留 40px 给切换按钮。上下预留 48px 给后置层。移动端改为单卡纵向滑动，取消重叠。",
    en: "Capped at 960px with 24px padding, sections 96px apart. The deck is centred with cards capped at 640px and 40px on each side for the controls, plus 48px above and below for the trailing layers. On mobile it becomes a single vertical card with no overlap.",
  },
  dos: [
    { zh: "偏移不超过 24px，缩放不低于 0.92", en: "Keep offsets under 24px and scale above 0.92" },
    { zh: "所有卡片同色，只靠变换分层", en: "One card color; the transform alone marks level" },
    { zh: "切换时沿 Z 轴重排，400ms 缓出", en: "Re-order along the Z axis over 400ms ease-out" },
    { zh: "用指示器告诉用户位置", en: "Use an indicator to show position" },
    { zh: "移动端取消重叠，改单卡滑动", en: "Drop the overlap on mobile for a single card" },
    { zh: "容器为后置层预留 48px 空间", en: "Reserve 48px in the container for the trailing layers" },
  ],
  donts: [
    { zh: "不要让偏移超过 24px", en: "Never exceed 24px of offset" },
    { zh: "不要给后置卡片换颜色", en: "Do not recolor the trailing cards" },
    { zh: "不要用绝对定位模拟层级", en: "Do not fake layering with absolute positioning" },
    { zh: "不要在卡片里放第二个堆叠", en: "Never nest a second deck inside a card" },
    { zh: "不要用超过 500ms 的切换", en: "No switch slower than 500ms" },
    { zh: "不要在移动端保留重叠", en: "Do not keep the overlap on mobile" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a2e",
      background: "#f0f0f5",
      card: "#ffffff",
      accent: "#6c5ce7",
      muted: "#8a8a99",
      border: "#e4e4ec",
    },
    prompts: [
      {
        zh: "做一个卡片堆叠：三张白底卡片（16px 圆角、内边距 32px），第一张正常显示并带 0 18px 40px rgba(26,26,46,0.12) 阴影；第二张 translateY(-12px) scale(0.96)、opacity 0.7；第三张 translateY(-24px) scale(0.92)、opacity 0.4。切换时只过渡 transform 与 opacity，400ms cubic-bezier(0.22,1,0.36,1)。下方放三个 8px 圆点作指示器，激活项变 24px 胶囊并填充 #6c5ce7。",
        en: "Build a card stack: three white cards (16px radius, 32px padding). The first sits normally with a 0 18px 40px rgba(26,26,46,0.12) shadow; the second is translateY(-12px) scale(0.96) at opacity 0.7; the third translateY(-24px) scale(0.92) at opacity 0.4. Switching animates transform and opacity only, over 400ms cubic-bezier(0.22,1,0.36,1). Three 8px dots below act as indicators, the active one stretching to a 24px pill filled #6c5ce7.",
      },
    ],
  },
  similar: [
    { name: "Bento Grid", why: { zh: "同样是排版策略，但 Bento 在平面上分主次，堆叠在 Z 轴上", en: "Also a layout strategy, though Bento ranks on the plane while this ranks in depth" } },
    { name: "Framer", why: { zh: "同样用层级变换讲故事，动作语言更丰富", en: "Also tells its story through layer transforms, with a richer motion vocabulary" } },
  ],
  completeness: "full",
};
