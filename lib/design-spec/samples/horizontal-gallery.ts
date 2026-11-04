import type { DesignSpec } from "../types";

export const horizontalGallerySpec: DesignSpec = {
  slug: "horizontal-gallery",
  name: "横滚画廊",
  nameEn: "Horizontal Gallery",
  cover: "/styles/horizontal-gallery.svg",
  theme: "light",
  northStar: {
    zh: "白盒展厅：作品沿一条横向轨道排开，看展变成一次散步。",
    en: "A white cube: works line up along one horizontal rail, and viewing becomes a walk.",
  },
  summary: {
    zh: "横滚画廊模仿美术馆的白盒展厅：作品沿着一条横向的 snap 滚动轨道排开（overflow-x-auto、snap-x mandatory、每件 shrink-0 snap-start），留白就是展墙，图注用 12px 全大写 0.2em 的灰字放在图外下方并带 No. 01 编号，章节标题作为轨道首格 sticky 在左侧随滚动常驻。它的禁令全部指向「不要让作品被装饰干扰」——不许给作品图加阴影圆角边框、不许把文字压在图上、不许厚重边框、不许花哨背景墙、不许高饱和多色装饰，唯一点缀色是克制的赤陶。",
    en: "Horizontal Gallery imitates a museum's white cube: works line up along one horizontal snap rail (overflow-x auto, snap-x mandatory, each shrink-0 snap-start), whitespace acts as the wall, and captions sit outside and below each image at 12px uppercase 0.2em in grey with a No. 01 index. The section title becomes the rail's first cell, sticky at the left so it accompanies the scroll. Every rule points at keeping the work undistracted — no shadow, radius or border on an image, no type on top of a work, no heavy borders, no decorated wall, no saturated multicolor, with terracotta as the one restrained accent.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#1a1a1a",
      group: "brand",
      role: {
        zh: "标题与主要文字。展签的颜色。",
        en: "Headings and primary text — the color of a wall label.",
      },
      token: "--color-ink",
    },
    {
      name: "白墙",
      nameEn: "Gallery White",
      value: "#fcfcfa",
      group: "surface",
      role: {
        zh: "页面底。略暖的白，像刷过漆的展墙。",
        en: "The page ground — a faintly warm white, like a freshly painted wall.",
      },
      token: "--color-gallery-white",
    },
    {
      name: "赤陶",
      nameEn: "Terracotta",
      value: "#a85a3a",
      group: "accent",
      role: {
        zh: "唯一点缀色，少量出现在编号、链接与选中标记上。",
        en: "The only accent, appearing sparingly on indices, links and selection marks.",
      },
      token: "--color-terracotta",
    },
    {
      name: "灰石",
      nameEn: "Stone",
      value: "#8a8a85",
      group: "neutral",
      role: {
        zh: "图注、编号与元信息。级别最低但必须可读。",
        en: "Captions, indices and metadata — the lowest tier while staying readable.",
      },
      token: "--color-stone",
    },
    {
      name: "线灰",
      nameEn: "Hairline",
      value: "#e8e6e1",
      group: "surface",
      role: {
        zh: "所有 1px hairline，永远不超过 1px。",
        en: "Every 1px hairline, and never thicker than 1px.",
      },
      token: "--color-hairline",
    },
    {
      name: "深石灰",
      nameEn: "Dark Stone",
      value: "#2e2e2c",
      group: "neutral",
      role: {
        zh: "反色区块底，用于「关于」与页脚。",
        en: "Inverted section grounds for about pages and the footer.",
      },
      token: "--color-dark-stone",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "Georgia, 'Songti SC', serif",
      weights: [300, 400],
      sizes: [22, 28, 36, 48, 64],
      lineHeight: { display: 1.1, heading: 1.2, body: 1.6 },
      tracking: { display: "0.02em", label: "0.2em" },
      role: {
        zh: "标题用细衬线加宽字距。层级靠字号与字距建立，绝不靠加粗。",
        en: "Headings in a light serif on wide tracking; hierarchy comes from size and tracking, never from bold.",
      },
      token: "--font-serif",
    },
    {
      family: "Inter",
      substitute: "system-ui, 'Helvetica Neue', sans-serif",
      weights: [300, 400],
      sizes: [12, 13, 15],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.7 },
      tracking: { display: "0.02em", label: "0.2em" },
      role: {
        zh: "正文与图注用浅色无衬线，字号压到 12 到 15px 让作品独占注意力。",
        en: "Body and captions in a light sans at 12 to 15px, letting the works hold all the attention.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Cormorant Garamond", weight: 300, size: 64, lineHeight: 1.1, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Cormorant Garamond", weight: 300, size: 48, lineHeight: 1.15, token: "--text-heading" },
    { role: "subheading", font: "Cormorant Garamond", weight: 400, size: 36, lineHeight: 1.25, token: "--text-subheading" },
    { role: "body-lg", font: "Inter", weight: 300, size: 15, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", font: "Inter", weight: 300, size: 13, lineHeight: 1.7, token: "--text-body" },
    { role: "label", font: "Inter", weight: 400, size: 12, lineHeight: 1.5, tracking: "0.2em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1440,
    sectionGap: 160,
    cardPadding: 0,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "media", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Gallery White", value: "#fcfcfa", purpose: "展墙" },
    { level: 1, name: "Dark Stone", value: "#2e2e2c", purpose: "反色区块" },
  ],
  elevation: [{ name: "None", value: "none — a shadow would mount the work on the wall" }],
  components: [
    {
      name: "Snap Rail",
      role: { zh: "横滚轨道（核心结构）", en: "The snap rail — the core structure" },
      construction: {
        zh: "容器 overflow-x: auto、scroll-snap-type: x mandatory、隐藏滚动条但保留键盘与触控可滚。每件作品 shrink-0、scroll-snap-align: start、间距 64px。轨道上下各一条 1px hairline。",
        en: "The container uses overflow-x auto with scroll-snap-type x mandatory, hiding the scrollbar while keeping keyboard and touch scrolling. Each work is shrink-0 with scroll-snap-align start and 64px gaps. A 1px hairline runs above and below the rail.",
      },
      sizes: "gap 64px between works",
    },
    {
      name: "Gallery Cell",
      role: { zh: "作品格", en: "The gallery cell" },
      construction: {
        zh: "图片宽度按视口比例（桌面 42vw、平板 60vw、手机 82vw），高度自适应保持原始比例，零圆角零边框零阴影。图片下方 16px 处放图注：12px 全大写 0.2em 的灰石色编号（No. 01）加作品名与年份。图注绝不出现在图上。",
        en: "The image takes a viewport share (42vw desktop, 60vw tablet, 82vw mobile) with height following its native ratio, and no radius, border or shadow. The caption sits 16px below: a 12px uppercase 0.2em stone index (No. 01) followed by title and year. Captions never appear on the image.",
      },
      sizes: "42vw desktop / 60vw tablet / 82vw mobile",
    },
    {
      name: "Sticky Title",
      role: { zh: "常驻章节标题（首格）", en: "The sticky section title — the first cell" },
      construction: {
        zh: "作为轨道的第一个格子，sticky left-0、与页面同色底、宽 320px、右侧 1px hairline。标题 48px 细衬线，下方 12px 全大写章节编号。它随横滚常驻，指明当前章节。",
        en: "The rail's first cell, sticky at the left edge on the page's own ground, 320px wide with a 1px hairline on its right. The title runs 48px light serif above a 12px uppercase section number. It stays put through the scroll, naming the section.",
      },
    },
    {
      name: "Hairline Caption",
      role: { zh: "图注与元信息", en: "Captions and metadata" },
      construction: {
        zh: "12px、字距 0.2em、全大写、灰石 #8a8a85。格式固定为「No. 01 / 作品名 / 年份 / 材质」。编号用赤陶色。它模仿博物馆的展签，绝不加粗也绝不省略编号。",
        en: "12px at 0.2em tracking, uppercase, in stone #8a8a85. The format is fixed: No. 01 / title / year / medium, with the index in terracotta. It imitates a museum label and is never bolded or stripped of its number.",
      },
    },
    {
      name: "Wall Rule",
      role: { zh: "展墙分隔线", en: "The wall rule" },
      construction: {
        zh: "1px、色 #e8e6e1，横跨内容宽，两端各收进 24px。用于分隔不同章节的轨道。绝对不允许 2px 及以上——粗线会让页面变成表格而不是展墙。",
        en: "1px in #e8e6e1, spanning the content width and inset 24px at each end. It divides one section's rail from the next. Nothing at 2px or above is permitted — a heavy line turns a gallery wall into a table.",
      },
    },
  ],
  imagery: {
    zh: "作品图是唯一内容，必须高质、精确裁切、无滤镜。允许不同尺寸与比例（这正是画廊的节奏），但每件作品都要有编号与展签。不使用装饰插画、背景纹理与多色图形。",
    en: "The works are the only content, and they must be high quality with precise crops and no filter. Varied sizes and ratios are welcome — that variation is the gallery's rhythm — but every work carries an index and a label. No decorative illustration, background texture or multicolor graphics.",
  },
  layout: {
    zh: "上限 1440px，轨道左右内边距 32px，章节间距 160px。垂直方向几乎全是留白，横向承载全部内容。允许轨道在移动端降至 82vw 单件可见。",
    en: "Capped at 1440px with 32px rail padding and 160px between sections. Vertically the page is nearly all emptiness; the content lives horizontally. On mobile the rail drops to 82vw so one work shows at a time.",
  },
  dos: [
    { zh: "用 snap-x mandatory 做横向吸附", en: "Snap horizontally with snap-x mandatory" },
    { zh: "每件作品带 No. 01 编号与展签", en: "Every work carries a No. 01 index and a label" },
    { zh: "一切分割线只有 1px", en: "Every divider is exactly 1px" },
    { zh: "章节标题 sticky 在轨道左侧", en: "The section title sticks at the rail's left" },
    { zh: "标题用细衬线，层级靠字距", en: "Light serif headings with hierarchy from tracking" },
    { zh: "点缀色只有赤陶，少量出现", en: "Terracotta is the only accent, used sparingly" },
  ],
  donts: [
    { zh: "不要给作品图加阴影圆角边框", en: "No shadow, radius or border on a work image" },
    { zh: "不要把文字压在作品图上", en: "Never put type on a work image" },
    { zh: "不要在轨道里混排瀑布流", en: "Never mix a masonry column into the rail" },
    { zh: "不要用 2px 及以上边框", en: "No border at 2px or above" },
    { zh: "不要用花哨背景墙", en: "No decorated wall: gradients, texture, color blocks" },
    { zh: "不要用高饱和多色装饰", en: "No saturated multicolor decoration" },
  ],
  promptGuide: {
    quickColors: {
      text: "#1a1a1a",
      background: "#fcfcfa",
      accent: "#a85a3a",
      stone: "#8a8a85",
      hairline: "#e8e6e1",
      dark: "#2e2e2c",
    },
    prompts: [
      {
        zh: "做一个横滚画廊：容器 overflow-x auto、scroll-snap-type x mandatory、上下各一条 1px #e8e6e1 hairline。每件作品 shrink-0、scroll-snap-align start、间距 64px、宽度 42vw（移动端 82vw）、零圆角零边框零阴影。图片下方 16px 放 12px 全大写 0.2em 的图注，格式「No. 01 / 作品名 / 年份」，编号用赤陶 #a85a3a、其余 #8a8a85。章节标题作为首格 sticky left-0、宽 320px、48px 细衬线。页面底色 #fcfcfa。",
        en: "Build a horizontal gallery: a container with overflow-x auto and scroll-snap-type x mandatory, bounded by 1px #e8e6e1 hairlines above and below. Each work is shrink-0 with scroll-snap-align start, 64px gaps and a 42vw width (82vw on mobile), with no radius, border or shadow. A 12px uppercase 0.2em caption sits 16px below in the format No. 01 / title / year, its index in terracotta #a85a3a and the rest in #8a8a85. The section title is the first cell, sticky at the left, 320px wide in 48px light serif. The page ground is #fcfcfa.",
      },
    ],
  },
  similar: [
    { name: "Luxe Lookbook", why: { zh: "同为克制的作品展示，但画册是纵向网格，这里是横向轨道", en: "Both restrained showcases, though the lookbook is a vertical grid while this is a horizontal rail" } },
    { name: "Masonry Flow", why: { zh: "同为作品集，但瀑布流靠高度错落，画廊靠横向节奏", en: "Both portfolios, though masonry uses varying heights while the gallery uses horizontal rhythm" } },
  ],
  completeness: "full",
};
