import type { DesignSpec } from "../types";

export const luxeLookbookSpec: DesignSpec = {
  slug: "luxe-lookbook",
  name: "奢华画册",
  nameEn: "Luxe Lookbook",
  cover: "/styles/luxe-lookbook.svg",
  theme: "light",
  northStar: {
    zh: "瓷白、墨黑、一点哑光金：奢侈来自删掉的部分。",
    en: "Porcelain, ink and a trace of matte gold — the luxury is in what was removed.",
  },
  summary: {
    zh: "奢华画册是时装屋的数字旗舰：瓷白底（#f7f5f1）配墨黑字（#141210），唯一强调色是哑光金（#9a7b4f），而它只能落在小标签、焦点态与单个 CTA 上。全站方角、1px hairline 分栏、零阴影零渐变——每加一项都会拉低身价。字重绝不用 font-bold 造，粗细由 Didone 衬线本身的笔画对比产生。首屏是全幅丝绸质感的影片，海报帧作 LCP，preload=none，入视才静音自动播，离屏暂停，reduced-motion 与 Save-Data 下只留静帧。",
    en: "Luxe Lookbook is a couture house's digital flagship: porcelain (#f7f5f1) under ink (#141210) with a single matte gold accent (#9a7b4f) confined to kickers, focus states and one CTA. Corners are square throughout, columns divide on 1px hairlines, and shadow and gradient are absent — each addition would cheapen it. Weight never comes from font-bold; the contrast lives in the Didone serif's own stroke. The hero is a full-bleed silk-motion film with the poster as LCP, preload none, muted autoplay only in view, pausing offscreen, and a still frame under reduced motion or Save-Data.",
  },
  colors: [
    {
      name: "墨黑",
      nameEn: "Ink",
      value: "#141210",
      group: "brand",
      role: {
        zh: "全部文字与 hairline。带一点暖的黑，像丝绒。",
        en: "All type and hairlines — a warm-leaning black, like velvet.",
      },
      token: "--color-ink",
    },
    {
      name: "瓷白",
      nameEn: "Porcelain",
      value: "#f7f5f1",
      group: "surface",
      role: {
        zh: "页面底。极浅的暖白，比纯白更有材质。",
        en: "The page ground — a very pale warm white with more material than pure white.",
      },
      token: "--color-porcelain",
    },
    {
      name: "哑光金",
      nameEn: "Matte Gold",
      value: "#9a7b4f",
      group: "accent",
      role: {
        zh: "唯一强调色，只出现在小标签、焦点与一个 CTA 上。",
        en: "The single accent, allowed only on kickers, focus and one CTA.",
      },
      token: "--color-matte-gold",
    },
    {
      name: "骨灰",
      nameEn: "Bone",
      value: "#e8e3db",
      group: "surface",
      role: {
        zh: "次级区块与图片衬底，用于在不引入对比的前提下分区。",
        en: "Secondary blocks and image beds, dividing space without introducing contrast.",
      },
      token: "--color-bone",
    },
    {
      name: "石灰",
      nameEn: "Ash",
      value: "#6b6259",
      group: "neutral",
      role: {
        zh: "次级文字、价格说明与元数据。",
        en: "Secondary text, price notes and metadata.",
      },
      token: "--color-ash",
    },
  ],
  fonts: [
    {
      family: "Didot",
      substitute: "'Playfair Display', Georgia, serif",
      weights: [400],
      sizes: [22, 32, 48, 72, 104],
      lineHeight: { display: 1.02, heading: 1.08, body: 1.6 },
      tracking: { display: "-0.02em", label: "0.24em" },
      role: {
        zh: "展示标题用 Didone 衬线，靠笔画粗细对比产生字重感，绝不加粗。100px 以上是常态。",
        en: "Display headlines use a Didone serif whose stroke contrast supplies the weight — never bolded, and routinely above 100px.",
      },
      token: "--font-display",
    },
    {
      family: "Inter",
      substitute: "system-ui, 'Helvetica Neue', sans-serif",
      weights: [300, 400],
      sizes: [11, 12, 14],
      lineHeight: { display: 1.5, heading: 1.5, body: 1.75 },
      tracking: { display: "0.06em", label: "0.24em" },
      role: {
        zh: "界面文字、价格与说明。字级压到 11 到 14px，让衬线标题独占注意力。",
        en: "Interface text, prices and captions at 11 to 14px, leaving all attention to the serif.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", font: "Didot", weight: 400, size: 104, lineHeight: 1.02, tracking: "-0.02em", token: "--text-display" },
    { role: "heading-lg", font: "Didot", weight: 400, size: 72, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading-lg" },
    { role: "heading", font: "Didot", weight: 400, size: 48, lineHeight: 1.1, token: "--text-heading" },
    { role: "subheading", font: "Didot", weight: 400, size: 32, lineHeight: 1.2, token: "--text-subheading" },
    { role: "body", font: "Inter", weight: 400, size: 14, lineHeight: 1.75, token: "--text-body" },
    { role: "label", font: "Inter", weight: 300, size: 11, lineHeight: 1.6, tracking: "0.24em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "airy",
    scale: [8, 16, 24, 32, 48, 64, 96, 160],
    maxWidth: 1360,
    sectionGap: 160,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
    { element: "media", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Porcelain", value: "#f7f5f1", purpose: "页面底" },
    { level: 1, name: "Bone", value: "#e8e3db", purpose: "次级区块" },
    { level: 2, name: "Film", value: "full-bleed video", purpose: "首屏影片" },
  ],
  elevation: [{ name: "None", value: "none — a shadow cheapens it" }],
  components: [
    {
      name: "Silk Hero",
      role: { zh: "全幅影片首屏（签名组件）", en: "The full-bleed film hero — the signature" },
      construction: {
        zh: "100vh 高、overflow hidden。poster 用 AVIF 先渲染作为 LCP；video 设 muted、loop、playsInline、preload=\"none\"，用 IntersectionObserver 在入视时 load 与 play、离屏时 pause。上覆一层从底部墨黑 40% 到透明的渐变遮罩（唯一允许的渐变）。标题用 104px Didot 白色，左下对齐距边 64px。reduced-motion 与 Save-Data 下完全不播，只留海报静帧。",
        en: "100vh tall with overflow hidden. The AVIF poster renders first as the LCP; the video is muted, looping and playsInline with preload none, loaded and played in view through IntersectionObserver and paused offscreen. A gradient scrim from 40% ink at the bottom to transparent covers it — the only gradient permitted. The headline runs 104px Didot in white, anchored 64px from the bottom-left. Under reduced motion or Save-Data it never plays, leaving the poster alone.",
      },
      sizes: "100vh; poster as LCP",
    },
    {
      name: "Lookbook Grid",
      role: { zh: "画册网格", en: "The lookbook grid" },
      construction: {
        zh: "两列或三列、gap 为 0、图块之间用 1px 墨黑 20% 的 hairline 分隔。每块为 3:4 竖构图，hover 时叠上第二张图（交叉淡入 600ms）并在底部浮出 11px 全大写 0.24em 的系列名。图片零圆角零阴影。",
        en: "Two or three columns at zero gap, divided by 1px ink hairlines at 20%. Each block is a 3:4 portrait; hover cross-fades to a second image over 600ms and floats an 11px uppercase 0.24em collection name at the bottom. Images take no radius and no shadow.",
      },
      states: "hover: second image cross-fade, collection label appears",
    },
    {
      name: "Gold CTA",
      role: { zh: "唯一的主行动", en: "The single call to action" },
      construction: {
        zh: "哑光金填充或透明底配 1px 金描边、零圆角、白字或金字、11px/300 全大写 0.24em、padding 16px 40px，无阴影。hover 时填充金 10%；按下时填充 18%。全页只有一个。",
        en: "Matte gold fill or a 1px gold border on transparent, zero radius, white or gold text at 11px/300 uppercase on 0.24em, 16px 40px padding, no shadow. Hover fills 10% gold; press 18%. One per page.",
      },
    },
    {
      name: "Hairline Column",
      role: { zh: "hairline 分栏", en: "The hairline column divider" },
      construction: {
        zh: "1px、墨黑 20%，纵贯或横跨，用于分栏与分区。绝不用阴影或底色分区——一条线就够。",
        en: "1px ink at 20%, running vertically or horizontally to divide columns and regions. Never divide with shadow or fill — one line is enough.",
      },
    },
    {
      name: "Numeral Display",
      role: { zh: "数字排版（价格与尺码）", en: "Numeral display for price and size" },
      construction: {
        zh: "价格与尺码用 Didot 48 到 72px，字距 -0.02em，不用币种符号缩写而写出全称。数字本身即装饰，不加底色不加边框。",
        en: "Price and size set in Didot at 48 to 72px on -0.02em tracking, with currency written out rather than abbreviated. The numerals are the ornament — no ground, no border.",
      },
    },
  ],
  imagery: {
    zh: "时装摄影：丝绸、皮革、雕塑感的布光，统一 3:4 竖构图。允许全幅影片与静帧交替。不使用插画、图形装饰与任何图标墙。",
    en: "Fashion photography: silk, leather, sculptural lighting, all in a 3:4 portrait crop. Full-bleed film and stills alternate. No illustration, graphic ornament or icon walls.",
  },
  layout: {
    zh: "上限 1360px、容器内边距 32px，区块间距 160px。留白占页面六成以上。标题可以极大（104px 以上）并与图片重叠。全站方角，任何一处圆角都被视为降级。",
    en: "Capped at 1360px with 32px padding, sections 160px apart. Over sixty percent of the page stays empty. Headlines may run very large — 104px and up — and overlap imagery. Corners are square everywhere; a single radius reads as a downgrade.",
  },
  dos: [
    { zh: "瓷白底配墨黑字，唯一哑光金", en: "Porcelain under ink with one matte gold" },
    { zh: "全站方角，hairline 分栏", en: "Square corners with hairline dividers" },
    { zh: "字重来自 Didone 笔画对比", en: "Weight comes from the Didone's stroke contrast" },
    { zh: "海报作 LCP，视频入视才播", en: "Poster as LCP, video only in view" },
    { zh: "留白占六成以上", en: "Keep over sixty percent empty" },
    { zh: "动效像丝绸垂落，600ms 起", en: "Motion like silk falling, 600ms and up" },
  ],
  donts: [
    { zh: "不要用圆角、阴影、渐变", en: "No radius, shadow or gradient" },
    { zh: "不要把金色用在多处", en: "Never spread the gold" },
    { zh: "不要用 font-bold 造字重", en: "Never manufacture weight with bold" },
    { zh: "不要拥挤排版", en: "Never crowd the layout" },
    { zh: "不要让视频成为 LCP 依赖", en: "Never let the video carry the LCP" },
    { zh: "不要用快速跳变的动效", en: "No fast or jump-cut motion" },
  ],
  promptGuide: {
    quickColors: {
      text: "#141210",
      background: "#f7f5f1",
      gold: "#9a7b4f",
      bone: "#e8e3db",
      ash: "#6b6259",
      border: "rgba(20,18,16,0.20)",
    },
    prompts: [
      {
        zh: "做一个奢华画册版面：瓷白底 #f7f5f1、墨黑字 #141210、唯一强调色哑光金 #9a7b4f。全站零圆角零阴影。展示标题用 Didot 104px、字距 -0.02em、不加粗；界面文字 11 到 14px、字距 0.24em 全大写。画册网格两列 gap 0，图块用 1px rgba(20,18,16,0.2) hairline 分隔、3:4 竖构图。首屏全幅影片：poster 作 LCP、video preload=\"none\"、muted 静音、入视才播、离屏暂停、reduced-motion 只留静帧。金色只出现在一个小标签和一个 CTA 上。区块间距 160px。",
        en: "Build a luxe lookbook layout: porcelain #f7f5f1, ink #141210 and a single matte gold #9a7b4f. Zero radius and zero shadow throughout. Display headlines run Didot at 104px on -0.02em tracking without bolding; interface text sits at 11 to 14px uppercase on 0.24em. The lookbook grid is two columns at zero gap, divided by 1px rgba(20,18,16,0.2) hairlines with 3:4 portrait crops. The hero is full-bleed film: poster as LCP, video with preload none, muted, playing only in view and pausing offscreen, a still frame under reduced motion. Gold appears on one label and one CTA. Sections sit 160px apart.",
      },
    ],
  },
  similar: [
    { name: "Art Deco", why: { zh: "同为奢侈品语汇，但装饰艺术铺满金线与几何，奢华画册靠删减", en: "Both luxury vocabularies, though Art Deco fills the page with gold line while luxe works by removal" } },
    { name: "Immersive Photo", why: { zh: "同样以影像为主体，但画册的克制更彻底（无圆角无阴影）", en: "Both image-led, though the lookbook's restraint is total — no radius, no shadow" } },
  ],
  completeness: "full",
};
