import type { DesignSpec } from "../types";

export const zenGardenSpec: DesignSpec = {
  slug: "zen-garden",
  name: "枯山水",
  nameEn: "Zen Garden",
  cover: "/styles/zen-garden.svg",
  theme: "light",
  northStar: {
    zh: "白砂、苔石、耙纹：留白不是空的，是被梳理过的。",
    en: "Raked sand, moss and stone — the emptiness is not empty, it has been combed.",
  },
  summary: {
    zh: "枯山水用白砂、苔藓与石头三种材料构成一个没有水的庭园：界面上就是沙白底（#f5f3ee）、苔绿点缀（#8a9a7b）、纤细到几乎看不见的边框（1px 的 30%），以及大量被「梳理过」的留白——留白在这里是核心结构而不是余量。它的时间感极慢：过渡 1000ms ease-in-out，因为耙纹与苔藓的变化以年为单位。禁令是：不许明亮鲜艳的色彩、不许厚重边框与粗线条、不许快速动画与弹跳、不许密集排列。",
    en: "Zen Garden builds a garden without water from three materials — sand, moss and stone: a sand-white ground (#f5f3ee), moss as accent (#8a9a7b), borders so fine they nearly vanish (1px at 30%), and an expanse of whitespace that has been combed rather than left over. Emptiness is the structure here, not the remainder. Its sense of time is very slow at 1000ms ease-in-out, because raked lines and moss change by the year. Bright saturated color, heavy borders and thick lines, fast animation and bounce, and dense arrangement are all refused.",
  },
  colors: [
    {
      name: "石",
      nameEn: "Stone",
      value: "#4a5548",
      group: "brand",
      role: {
        zh: "文字与石头。带绿的深灰，是庭园里唯一的重量。",
        en: "Text and stone — a green-cast dark grey, the only weight in the garden.",
      },
      token: "--color-stone",
    },
    {
      name: "沙",
      nameEn: "Sand",
      value: "#f5f3ee",
      group: "surface",
      role: {
        zh: "页面底。白砂的颜色，所有内容铺在它上面。",
        en: "The page ground — the color of white sand that everything rests on.",
      },
      token: "--color-sand",
    },
    {
      name: "苔",
      nameEn: "Moss",
      value: "#8a9a7b",
      group: "accent",
      role: {
        zh: "唯一强调色：hover 态、选中与「生长」语义。",
        en: "The single accent on hover, selection and growth semantics.",
      },
      token: "--color-moss",
    },
    {
      name: "砂砾",
      nameEn: "Gravel",
      value: "#c4bba8",
      group: "accent",
      role: {
        zh: "边框与分隔，永远只有 1px 的 30%。",
        en: "Borders and dividers, always 1px at 30%.",
      },
      token: "--color-gravel",
    },
    {
      name: "岩",
      nameEn: "Rock",
      value: "#7a7062",
      group: "neutral",
      role: {
        zh: "次级文字与元数据。",
        en: "Secondary text and metadata.",
      },
      token: "--color-rock",
    },
    {
      name: "沼青",
      nameEn: "Pond Teal",
      value: "#799d91",
      group: "accent",
      role: {
        zh: "冷侧的一笔，用于「水」的暗示，出现频率极低。",
        en: "The cool stroke, hinting at water, used very rarely.",
      },
      token: "--color-pond-teal",
    },
  ],
  fonts: [
    {
      family: "Noto Serif SC",
      substitute: "'Songti SC', Georgia, serif",
      weights: [300, 400],
      sizes: [15, 18, 22, 28, 38, 50],
      lineHeight: { display: 1.2, heading: 1.4, body: 1.9 },
      tracking: { display: "0.04em", label: "0.28em" },
      role: {
        zh: "全站衬线，行高 1.9，字距放到 0.28em。字与字、行与行之间的空隙和内容一样重要。",
        en: "Serif throughout at 1.9 leading with tracking opened to 0.28em — the gaps between letters and lines matter as much as the content.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 300, size: 50, lineHeight: 1.2, tracking: "0.04em", token: "--text-display" },
    { role: "heading", weight: 300, size: 38, lineHeight: 1.35, token: "--text-heading" },
    { role: "subheading", weight: 400, size: 28, lineHeight: 1.45, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 22, lineHeight: 1.8, token: "--text-body-lg" },
    { role: "body", weight: 300, size: 18, lineHeight: 1.9, token: "--text-body" },
    { role: "label", weight: 400, size: 15, lineHeight: 1.7, tracking: "0.28em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160, 240],
    maxWidth: 960,
    sectionGap: 240,
    cardPadding: 40,
    elementGap: 40,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "stones", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Sand", value: "#f5f3ee", purpose: "页面底" },
    { level: 1, name: "Moss Bed", value: "rgba(138,154,123,0.08)", purpose: "苔区块" },
  ],
  elevation: [{ name: "None", value: "none — the garden is flat" }],
  components: [
    {
      name: "Quiet Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "透明底、无描边（默认 border-color: transparent）、零圆角、衬线 15px、字距 0.28em、padding 12px 32px，文字为石色 70%。hover 时描边转苔绿 30%、文字升到 100%、背景加苔绿 5%、并加一层几乎看不见的苔绿光晕（0 0 20px 苔 5%）。过渡 1000ms ease-in-out。",
        en: "Transparent fill with a transparent border, zero radius, serif at 15px with 0.28em tracking, 12px 32px padding, text in 70% stone. Hover takes the border to 30% moss, the text to full, adds a 5% moss ground and a barely visible 0 0 20px glow at 5% moss. 1000ms ease-in-out.",
      },
      sizes: "padding 12px 32px; label 15px",
      states: "hover: moss border 30%, text 100%; no motion",
    },
    {
      name: "Stone Card",
      role: { zh: "内容卡与石组", en: "Content cards and stone groupings" },
      construction: {
        zh: "沙色填充（与底同色，靠边框区分）、零圆角、1px 砂砾 30% 描边、内边距 40px，无阴影。hover 时描边升到 55%，其余完全不变。卡片之间可错位 16 到 48px，像石头不按网格摆放。",
        en: "Sand fill (the same as the ground, separated by its border), zero radius, a 1px gravel border at 30%, 40px padding, no shadow. Hover raises the border to 55% and changes nothing else. Cards may offset by 16 to 48px, the way stones ignore a grid.",
      },
    },
    {
      name: "Raked Line",
      role: { zh: "耙纹装饰", en: "The raked line" },
      construction: {
        zh: "用 repeating-linear-gradient 画 24px 间隔的 1px 沙色 40% 或砂砾 25% 的平行线，覆盖在一个区块上（不透明度 50%），模拟砂纹。线必须是等距的同心弧或直线，绝不杂乱。",
        en: "A repeating gradient draws parallel 1px lines every 24px in 40% sand or 25% gravel over a section at 50% opacity, imitating raked sand. The lines stay evenly spaced — concentric arcs or straight — and never scatter.",
      },
    },
    {
      name: "Moss Cluster",
      role: { zh: "苔与石的点缀", en: "Moss and stone accents" },
      construction: {
        zh: "由两到三个不同尺寸的圆或不规则块组成（16 到 64px），苔绿或岩色，不透明度 60% 到 80%，紧挨着放在卡片角落或标题旁，像一组石头旁长了苔。单屏最多两处。",
        en: "Two or three circles or irregular blocks between 16px and 64px in moss or rock at 60% to 80% opacity, placed together at a card corner or beside a heading like stones with moss growing on them. Twice per screen at most.",
      },
    },
    {
      name: "Silence Gap",
      role: { zh: "留白区块", en: "The silence gap" },
      construction: {
        zh: "240px 到 320px 高的空区块，作为真实元素存在。枯山水的核心就是它——没有这块空白，庭园只是几堆石头。",
        en: "An empty block 240px to 320px tall, existing as a real element. This is the heart of the style: without that emptiness the garden is only a few piles of stone.",
      },
    },
  ],
  imagery: {
    zh: "枯山水摄影与极简线稿：砂纹、石组、苔、竹篱、远处山影。必须有大量留白，色调压在灰绿与沙之间。不使用鲜艳色彩、密集图案与彩色插画。",
    en: "Karesansui photography and minimal line art: raked sand, stone groups, moss, bamboo fences, a distant ridge. It needs abundant emptiness with the palette held between grey-green and sand. No vivid color, dense pattern or colorful illustration.",
  },
  layout: {
    zh: "上限 960px、容器内边距 32px，区块间距 240px。构图像庭园：内容偏一侧、另一侧留白，元素不必对齐网格。禁止密集排列，一屏最多三个元素。",
    en: "Capped at 960px with 32px padding, sections 240px apart. The composition behaves like a garden — content to one side, emptiness to the other, elements unbound from the grid. Dense arrangement is refused; three elements per screen at most.",
  },
  dos: [
    { zh: "沙白底，苔绿点缀", en: "Sand ground with moss accents" },
    { zh: "边框 1px 且只有 30%", en: "Borders are 1px at 30%" },
    { zh: "留白到 240px，它是核心", en: "Emptiness out to 240px — it is the core" },
    { zh: "过渡 1000ms，元素不动", en: "Transitions run 1000ms with nothing moving" },
    { zh: "行高 1.9、字距 0.28em", en: "Leading at 1.9 with 0.28em tracking" },
    { zh: "用耙纹做装饰", en: "Ornament comes from raked lines" },
  ],
  donts: [
    { zh: "不要用明亮鲜艳色彩", en: "No bright vivid color" },
    { zh: "不要用厚重边框与粗线条", en: "No heavy borders or thick lines" },
    { zh: "不要用快速动画与弹跳", en: "No fast animation or bounce" },
    { zh: "不要密集排列元素", en: "Never arrange elements densely" },
    { zh: "不要用阴影", en: "No shadows" },
    { zh: "不要把耙纹画得杂乱", en: "Never let the raked lines scatter" },
  ],
  promptGuide: {
    quickColors: {
      text: "#4a5548",
      background: "#f5f3ee",
      moss: "#8a9a7b",
      gravel: "#c4bba8",
      rock: "#7a7062",
      teal: "#799d91",
    },
    prompts: [
      {
        zh: "做一个枯山水风格卡片：沙色 #f5f3ee 填充、零圆角、1px rgba(196,187,168,0.3) 描边、内边距 40px、无阴影。标题 38px Noto Serif SC 300、字距 0.04em；正文 18px/300、行高 1.9。卡片之间留 240px 空白。hover 时描边升到 rgba(196,187,168,0.55)，其余不变，transition 1000ms ease-in-out。区块上可叠 24px 间隔的 1px 砂纹（不透明度 50%）。页面底色 #f5f3ee。",
        en: "Build a zen garden card: sand #f5f3ee fill, zero radius, a 1px rgba(196,187,168,0.3) border, 40px padding, no shadow. The title runs 38px Noto Serif SC at weight 300 with 0.04em tracking; body at 18px/300 on 1.9 leading. Leave 240px of emptiness between cards. Hover raises the border to rgba(196,187,168,0.55) and changes nothing else over 1000ms ease-in-out. A section may carry 1px raked lines every 24px at 50% opacity. The page ground is #f5f3ee.",
      },
    ],
  },
  similar: [
    { name: "Wabi-Sabi", why: { zh: "同属日本美学，但侘寂讲不完美与时间，枯山水讲秩序与观想", en: "Both Japanese aesthetics, though wabi-sabi is about imperfection and time while zen garden is about order and contemplation" } },
    { name: "Japanese Fresh", why: { zh: "同样留白，但日系清新的留白更轻，枯山水的留白更重", en: "Both work in emptiness, though Japanese Fresh keeps it light while zen garden carries weight" } },
  ],
  completeness: "full",
};
