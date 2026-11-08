import type { DesignSpec } from "../types";

export const mobileEditorialSpec: DesignSpec = {
  slug: "mobile-editorial",
  name: "移动编辑风",
  nameEn: "Mobile Editorial",
  cover: "/styles/mobile-editorial.svg",
  theme: "light",
  northStar: {
    zh: "把杂志的节奏压进手机：衬线标题、暖纸面、单列流。",
    en: "Compress a magazine's rhythm into a phone: serif headlines, warm paper, one column.",
  },
  summary: {
    zh: "移动编辑风把杂志的排版节奏移植到手机屏：衬线标题承担性格、无衬线正文保证易读、暖纸底（#fffdf8）提供印刷感、单列纵向流加横向专题卡加底部导航。它的配色纪律非常克制——珊瑚色 #e97b61 是唯一的强行动色，其余全部是纸色、墨色与三支低饱和辅色。任何多余的强调色都会破坏编辑节奏，所以在它的规范里「少一个颜色」永远优于「多一个」。",
    en: "Mobile Editorial carries a magazine's typographic rhythm onto a phone: serif headlines supply character, sans body keeps legibility, a warm paper ground (#fffdf8) adds print feel, and the structure is a single vertical column with horizontal feature cards and bottom navigation. Its color discipline is severe — coral #e97b61 is the only strong action color, and everything else is paper, ink and three muted supports. Any extra accent breaks the editorial rhythm, so the rule is always one color fewer rather than one more.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#24211f",
      group: "brand",
      role: {
        zh: "标题与正文。带暖调的近黑，印刷感由此而来。",
        en: "Headlines and body — a warm near-black that carries the printed feel.",
      },
      token: "--color-ink",
    },
    {
      name: "纸",
      nameEn: "Paper",
      value: "#fffdf8",
      group: "surface",
      role: {
        zh: "页面底。微暖的白，比纯白更像纸张。",
        en: "The page ground — a barely warm white, closer to paper than pure white.",
      },
      token: "--color-paper",
    },
    {
      name: "珊瑚",
      nameEn: "Coral",
      value: "#e97b61",
      group: "accent",
      role: {
        zh: "唯一的强行动色：主按钮、栏目标签与链接。",
        en: "The only strong action color: primary buttons, section labels and links.",
      },
      token: "--color-coral",
    },
    {
      name: "鼠尾草",
      nameEn: "Sage",
      value: "#c5d8c1",
      group: "accent",
      role: {
        zh: "生活与自然栏目的标记色，只作底不作字。",
        en: "The marker for lifestyle and nature sections — used as a ground, never as text.",
      },
      token: "--color-sage",
    },
    {
      name: "米金",
      nameEn: "Sand Gold",
      value: "#e9d7a9",
      group: "accent",
      role: {
        zh: "引文底与文化栏目，是第二支底色。",
        en: "Pull-quote grounds and culture sections — the second background tone.",
      },
      token: "--color-sand-gold",
    },
    {
      name: "淡紫",
      nameEn: "Lilac",
      value: "#d7c4e8",
      group: "accent",
      role: {
        zh: "观点与评论栏目，出现频率最低。",
        en: "Opinion and commentary sections, used least.",
      },
      token: "--color-lilac",
    },
  ],
  fonts: [
    {
      family: "Playfair Display",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [400, 700],
      sizes: [20, 24, 30, 38],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "-0.01em", label: "0.18em" },
      role: {
        zh: "标题用衬线，24 到 30px 为主。在手机上大字号反而挤压，所以克制。",
        en: "Serif for headlines, mostly 24 to 30px — larger sizes crowd a phone, so it stays restrained.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, -apple-system, sans-serif",
      weights: [400, 500, 600],
      sizes: [12, 14, 15],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.75 },
      tracking: { display: "0", label: "0.18em" },
      role: {
        zh: "正文与标签用无衬线。正文 15px、行高 1.75，适合拇指滑动阅读。",
        en: "Sans for body and labels. Body at 15px on 1.75 leading, tuned for thumb scrolling.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Playfair Display", weight: 700, size: 38, lineHeight: 1.1, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", font: "Playfair Display", weight: 700, size: 30, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Playfair Display", weight: 400, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 400, size: 15, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 400, size: 14, lineHeight: 1.75, token: "--text-body" },
    { role: "label", font: "Inter", weight: 600, size: 12, lineHeight: 1.4, tracking: "0.18em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 20, 24, 32, 48],
    maxWidth: 480,
    sectionGap: 32,
    cardPadding: 20,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "12px" },
    { element: "images", value: "12px" },
  ],
  surfaces: [
    { level: 0, name: "Paper", value: "#fffdf8", purpose: "页面底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "浮层与卡内卡" },
    { level: 2, name: "Sage Bed", value: "rgba(197,216,193,0.35)", purpose: "栏目底" },
  ],
  elevation: [
    { name: "None", value: "none — hairline rules separate" },
    { name: "Sheet", value: "0 -12px 40px rgba(36,33,31,0.10)" },
  ],
  components: [
    {
      name: "Coral Button",
      role: { zh: "主行动按钮", en: "Primary action" },
      construction: {
        zh: "珊瑚填充、白字、999px 全圆角、无描边，15px/500、padding 12px 20px。hover 时填充加深到 #d9644e；按下缩放 0.98。过渡只改颜色，200ms。",
        en: "Coral fill, white text, fully rounded, no border, 15px/500, 12px 20px padding. Hover deepens the fill to #d9644e; press scales 0.98. Color-only transition, 200ms.",
      },
      sizes: "padding 12px 20px; label 15px",
      states: "hover: #d9644e; active: scale 0.98",
    },
    {
      name: "Story Card",
      role: { zh: "故事卡（纵向列表项）", en: "The story card — a vertical list item" },
      construction: {
        zh: "纸色底、上下各 1px 墨色 15% 描边（无左右边）、内边距 20px 0。上方 12px 全大写 0.18em 的珊瑚栏目标签加阅读时长，中间 24px 衬线标题（最多两行），下方 14px 正文（最多三行，色墨 65%）。卡片之间无间距，靠描边分隔。",
        en: "Paper fill with 1px ink rules at 15% above and below (no sides), 20px vertical padding. A 12px uppercase 0.18em coral label with reading time sits on top, a 24px serif headline of two lines at most in the middle, and 14px body in 65% ink capped at three lines below. Cards sit flush, divided by the rules.",
      },
    },
    {
      name: "Feature Strip",
      role: { zh: "横向专题卡条", en: "The horizontal feature strip" },
      construction: {
        zh: "横向滚动的卡片条，每张宽 280px、12px 圆角、左侧图片 4:3、下方 20px 衬线标题。卡片间距 12px，容器左右内边距 16px 并允许最后一张露出边缘 24px 作为可滑动的暗示。",
        en: "A horizontally scrolling strip where each card runs 280px wide on a 12px radius with a 4:3 image on top and a 20px serif headline below. Cards sit 12px apart, and the container pads 16px sideways while letting the last card peek 24px past the edge as a scroll hint.",
      },
    },
    {
      name: "Archive Field",
      role: { zh: "搜索与订阅输入", en: "Search and subscribe inputs" },
      construction: {
        zh: "纸色底、仅底部 1px 墨色 25% 描边（无边框包裹）、padding 12px 4px、14px 字。占位符墨 45%。聚焦时底线转珊瑚并保持 1px。",
        en: "Paper fill with a 1px ink rule along the bottom only at 25%, no wrapping border, 12px 4px padding at 14px. The placeholder sits at 45% ink. Focus turns the rule coral while keeping it at 1px.",
      },
    },
    {
      name: "Bottom Nav",
      role: { zh: "底部导航", en: "Bottom navigation" },
      construction: {
        zh: "固定底部、高 56px、纸色底加 16px 模糊、顶部 1px 墨色 10% 描边，四个等宽项，每项 12px 标签加 20px 图标。当前项用珊瑚，其余墨 50%。",
        en: "Fixed at the bottom at 56px tall on paper with a 16px blur and a 1px ink rule at 10% along the top. Four equal items carry a 12px label under a 20px icon, with the active item in coral and the rest at 50% ink.",
      },
    },
  ],
  imagery: {
    zh: "编辑类摄影：人物、场所、物件，统一 4:3 或 3:2 裁切，暖调。允许小幅面缩略图配长标题。不使用全幅大图、装饰插画与冷调摄影。",
    en: "Editorial photography — people, places, objects — cropped consistently to 4:3 or 3:2 in a warm cast. Small thumbnails paired with long headlines work well. No full-bleed imagery, decorative illustration or cool-toned photography.",
  },
  layout: {
    zh: "移动优先：单列、上限 480px、内边距 16px、区块间距 32px。桌面端居中为 480px 一列，不扩展成多栏。底部固定 56px 导航，内容区留出同等底部内边距。",
    en: "Mobile first: one column capped at 480px with 16px padding and 32px between sections. On desktop it centres at 480px rather than expanding into columns. A fixed 56px nav sits at the bottom with matching padding reserved in the content.",
  },
  dos: [
    { zh: "衬线标题配无衬线正文", en: "Serif headlines against sans body" },
    { zh: "珊瑚是唯一的强行动色", en: "Coral is the only strong action color" },
    { zh: "单列流、上限 480px", en: "One column capped at 480px" },
    { zh: "用横向条承载专题", en: "Carry features in a horizontal strip" },
    { zh: "行高 1.75 便于拇指阅读", en: "Leading at 1.75 for thumb reading" },
    { zh: "底部固定导航", en: "Fixed bottom navigation" },
  ],
  donts: [
    { zh: "不要用过多种强调色", en: "No extra accents beyond the set" },
    { zh: "不要打破编辑节奏", en: "Do not break the editorial rhythm" },
    { zh: "不要在桌面端扩成多栏", en: "Do not expand to columns on desktop" },
    { zh: "不要让标题超过两行", en: "Never let a headline run past two lines" },
    { zh: "不要用冷调摄影", en: "No cool-toned photography" },
    { zh: "不要用全幅大图", en: "No full-bleed imagery" },
  ],
  promptGuide: {
    quickColors: {
      text: "#24211f",
      background: "#fffdf8",
      accent: "#e97b61",
      sage: "#c5d8c1",
      gold: "#e9d7a9",
      muted: "#6b6560",
    },
    prompts: [
      {
        zh: "做一个移动编辑风故事卡：纸色 #fffdf8 底、上下各 1px rgba(36,33,31,0.15) 描边、无左右边框、内边距 20px 0。上方 12px 全大写 0.18em 的 #e97b61 栏目标签加阅读时长，中间 Playfair Display 24px 标题（最多两行），下方 14px 正文（最多三行、色 rgba(36,33,31,0.65)、行高 1.75）。主按钮珊瑚 #e97b61、999px 圆角、白字 15px/500。页面底色 #fffdf8，单列上限 480px，底部固定 56px 导航。",
        en: "Build a mobile editorial story card: paper #fffdf8 fill with 1px rgba(36,33,31,0.15) rules above and below, no side borders, 20px vertical padding. A 12px uppercase 0.18em coral #e97b61 label with reading time sits on top above a Playfair Display 24px headline of two lines, with 14px body in rgba(36,33,31,0.65) at 1.75 leading capped at three lines. The primary button is coral #e97b61 on a fully rounded shape with white 15px/500 text. The page ground is #fffdf8 in one 480px column with a fixed 56px bottom nav.",
      },
    ],
  },
  similar: [
    { name: "Editorial", why: { zh: "同一语汇的桌面版，移动编辑压缩为单列并加横向条", en: "The desktop version of the same language, compressed to one column with a horizontal strip" } },
    { name: "Magazine Grid", why: { zh: "同为杂志逻辑，但那边靠网格分优先级，这里靠纵向流", en: "Both magazine logic, though that one ranks through a grid while this uses a single vertical flow" } },
  ],
  completeness: "full",
};
