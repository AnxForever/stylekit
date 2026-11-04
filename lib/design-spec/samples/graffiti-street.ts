import type { DesignSpec } from "../types";

export const graffitiStreetSpec: DesignSpec = {
  slug: "graffiti-street",
  name: "涂鸦街头",
  nameEn: "Graffiti Street",
  cover: "/styles/graffiti-street.svg",
  theme: "dark",
  northStar: {
    zh: "喷漆罐在砖墙上：撞色、粗边、随手歪着的字。",
    en: "A spray can on a brick wall — clash color, heavy outlines, lettering left crooked.",
  },
  summary: {
    zh: "涂鸦街头模拟砖墙与沥青墙面上的喷漆：深灰近黑底（#1c1c1e）、高饱和撞色（#ff2d55 玫红、#00e5ff 青、#ffea00 黄、#b620e0 紫、#ff6d00 橙）、文字用 900 字重全大写并随机旋转 -3 到 3 度、喷漆扩散靠多层 drop-shadow 模拟、按钮与标签用 4px 粗边框加硬偏移阴影、下划线用对比色当作喷漆划线。它的规则是「乱但可读」——每个元素都歪，但文字始终清楚。",
    en: "Graffiti Street imitates spray paint on brick and asphalt: a dark near-black ground (#1c1c1e), saturated clashes (#ff2d55 rose, #00e5ff cyan, #ffea00 yellow, #b620e0 violet, #ff6d00 orange), 900-weight uppercase type rotated between -3 and 3 degrees at random, spray diffusion faked with layered drop-shadows, buttons and tags carrying 4px borders with hard offset shadows, and underlines struck in a contrasting color as if sprayed. The rule is ugly but legible — every element tilts, while the words stay clear.",
  },
  colors: [
    {
      name: "喷漆玫红",
      nameEn: "Spray Rose",
      value: "#ff2d55",
      group: "brand",
      role: {
        zh: "主色：主按钮、主标签与最抢眼的字。",
        en: "The primary on buttons, main tags and the loudest lettering.",
      },
      token: "--color-spray-rose",
    },
    {
      name: "沥青黑",
      nameEn: "Asphalt",
      value: "#1c1c1e",
      group: "surface",
      role: {
        zh: "页面底。模拟夜里的砖墙与沥青。",
        en: "The page ground — brick and asphalt at night.",
      },
      token: "--color-asphalt",
    },
    {
      name: "喷漆青",
      nameEn: "Spray Cyan",
      value: "#00e5ff",
      group: "accent",
      role: {
        zh: "第二撞色，与玫红形成最强对比。",
        en: "The second clash, opposing rose at maximum contrast.",
      },
      token: "--color-spray-cyan",
    },
    {
      name: "喷漆黄",
      nameEn: "Spray Yellow",
      value: "#ffea00",
      group: "accent",
      role: {
        zh: "高亮与描边，像荧光喷漆。",
        en: "Highlights and outlines — fluorescent paint.",
      },
      token: "--color-spray-yellow",
    },
    {
      name: "喷漆紫",
      nameEn: "Spray Violet",
      value: "#b620e0",
      group: "accent",
      role: {
        zh: "第三撞色，用于让画面失去统一色。",
        en: "The third clash, breaking any unified palette.",
      },
      token: "--color-spray-violet",
    },
    {
      name: "喷漆橙",
      nameEn: "Spray Orange",
      value: "#ff6d00",
      group: "accent",
      role: {
        zh: "第四撞色与警示，出现频率中等。",
        en: "The fourth clash and warnings, at a moderate frequency.",
      },
      token: "--color-spray-orange",
    },
  ],
  fonts: [
    {
      family: "Inter",
      substitute: "'Arial Black', Impact, sans-serif",
      weights: [900],
      sizes: [14, 18, 24, 34, 46, 64],
      lineHeight: { display: 1, heading: 1.1, body: 1.5 },
      tracking: { display: "-0.02em", label: "0.04em" },
      role: {
        zh: "只有 900 一个字重，全大写。标题压到行高 1.0 并带随机旋转，像手喷上去的。",
        en: "One weight only — 900 — set uppercase. Headlines run at 1.0 leading with a random rotation, like something sprayed by hand.",
      },
      token: "--font-sans",
    },
  ],
  typeScale: [
    { role: "display", weight: 900, size: 64, lineHeight: 1, tracking: "-0.02em", token: "--text-display" },
    { role: "heading", weight: 900, size: 46, lineHeight: 1.05, tracking: "-0.02em", token: "--text-heading" },
    { role: "subheading", weight: 900, size: 34, lineHeight: 1.1, token: "--text-subheading" },
    { role: "body-lg", weight: 900, size: 24, lineHeight: 1.35, token: "--text-body-lg" },
    { role: "body", weight: 900, size: 18, lineHeight: 1.5, token: "--text-body" },
    { role: "label", weight: 900, size: 14, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "compact",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1200,
    sectionGap: 64,
    cardPadding: 24,
    elementGap: 16,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "tags", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "Asphalt", value: "#1c1c1e", purpose: "页面底" },
    { level: 1, name: "Wall Panel", value: "#242427", purpose: "面板" },
    { level: 2, name: "Brick Pattern", value: "repeating gradient", purpose: "砖墙纹理" },
  ],
  elevation: [
    { name: "Hard offset", value: "6px 6px 0 #ff2d55" },
    { name: "Hard offset alt", value: "6px 6px 0 #00e5ff" },
    { name: "Pressed", value: "none" },
  ],
  components: [
    {
      name: "Spray Tag",
      role: { zh: "喷漆标签（核心组件）", en: "The spray tag — the core component" },
      construction: {
        zh: "透明底、4px 撞色描边、零圆角、14px/900 全大写、字距 0.04em、padding 6px 14px，带随机旋转 -3 到 3 度与 6px 6px 0 的硬阴影。文字用 2 到 3 层 drop-shadow（同色、偏移 1px、模糊 0）模拟喷漆的边晕。",
        en: "Transparent fill, a 4px clash border, zero radius, 14px/900 uppercase at 0.04em, 6px 14px padding, with a random rotation between -3 and 3 degrees and a 6px 6px 0 hard shadow. The text carries two or three drop-shadows of the same color, 1px offset, zero blur, to fake the paint's overspray.",
      },
    },
    {
      name: "Brick Wall",
      role: { zh: "砖墙底纹", en: "The brick wall ground" },
      construction: {
        zh: "用 repeating-linear-gradient 画错位的砖块（砖 64×24px、缝 4px、缝色更深），整体不透明度 40%。它必须错位（第二行砖从 32px 处开始），否则会看起来像地砖而不是砖墙。",
        en: "A repeating gradient draws staggered bricks 64 by 24px with 4px darker joints at 40% opacity. The courses must stagger — the second row starting 32px in — or it reads as floor tile rather than wall.",
      },
    },
    {
      name: "Thick Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "玫红填充、黑字、零圆角、4px 黑描边、18px/900 全大写、padding 12px 28px，硬阴影 6px 6px 0 青。hover 时填充硬切到黄、阴影换紫；按下时位移 6px 6px 且阴影归零。过渡 80ms linear。",
        en: "Rose fill, black text, zero radius, a 4px black border, 18px/900 uppercase, 12px 28px padding, hard shadow 6px 6px 0 in cyan. Hover cuts the fill to yellow and the shadow to violet; press translates 6px 6px and zeroes it. 80ms linear.",
      },
      sizes: "padding 12px 28px; label 18px",
      states: "hover: yellow fill, violet shadow; active: translate 6px",
    },
    {
      name: "Spray Underline",
      role: { zh: "喷漆划线", en: "The sprayed underline" },
      construction: {
        zh: "文字下方一条 4px 的撞色横线（text-decoration 或伪元素），长度比文字宽 4%，略微倾斜 1 到 2 度，颜色取与文字对比的撞色。它是这套风格最常用的强调手段。",
        en: "A 4px clash line under the text via text-decoration or a pseudo element, four percent wider than the words, tilted 1 to 2 degrees, colored in a clash that opposes the text. It is the style's most common emphasis.",
      },
    },
    {
      name: "Sticker Blob",
      role: { zh: "喷漆圆斑", en: "The spray blob" },
      construction: {
        zh: "一个 24 到 96px 的圆或不规则块，用 radial-gradient 从实色渐隐到透明，边缘不锐利（模糊 6 到 12px），像喷漆的扩散。颜色取一支撞色，不透明度 40% 到 70%，放在文字背后或角落。单屏 3 到 6 处。",
        en: "A 24 to 96px circle or irregular blob on a radial gradient fading from solid to transparent, its edge soft at 6 to 12px blur like paint spreading. One clash color at 40% to 70%, sitting behind text or in a corner. Three to six per screen.",
      },
    },
  ],
  imagery: {
    zh: "街头摄影与涂鸦作品：砖墙、卷帘门、地铁车厢、手绘 tag。必须高对比、有街头痕迹。允许把照片压成高饱和双色调再叠喷漆效果。不使用棚拍产品、柔和插画与无痕迹的干净图像。",
    en: "Street photography and graffiti work: brick walls, shutters, subway cars, hand-drawn tags. High contrast with visible street wear, and a photo may be crushed to a saturated duotone under a spray layer. No studio products, soft illustration or clean unmarked imagery.",
  },
  layout: {
    zh: "上限 1200px、容器内边距 16px，区块间距 64px。允许元素重叠、旋转与溢出。零圆角贯穿全站。混乱必须有节奏：大 tag 与小贴纸交替，文字始终可读。",
    en: "Capped at 1200px with 16px padding, sections 64px apart. Overlap, rotation and bleed are welcome, with zero radius throughout. The chaos needs rhythm — big tags alternating with small stickers, and text always readable.",
  },
  dos: [
    { zh: "深灰底加四支高饱和撞色", en: "Dark ground with four saturated clashes" },
    { zh: "文字 900 全大写并随机旋转", en: "900-weight uppercase with random rotation" },
    { zh: "喷漆晕边用零模糊的 drop-shadow", en: "Overspray via zero-blur drop-shadows" },
    { zh: "4px 粗边框加硬偏移阴影", en: "4px borders with hard offset shadows" },
    { zh: "砖墙纹理必须错位", en: "Brick courses must stagger" },
    { zh: "乱但可读", en: "Ugly but legible" },
  ],
  donts: [
    { zh: "不要用棚拍产品与干净影像", en: "No studio products or clean imagery" },
    { zh: "不要用圆角", en: "No rounded corners" },
    { zh: "不要给喷漆加真实模糊光晕", en: "No realistic blurred glow on the spray" },
    { zh: "不要让旋转超过 3 度", en: "Never rotate past 3 degrees" },
    { zh: "不要让纹理变成地砖", en: "Never let the brick read as floor tile" },
    { zh: "不要牺牲可读性", en: "Never sacrifice legibility" },
  ],
  promptGuide: {
    quickColors: {
      text: "#ff2d55",
      background: "#1c1c1e",
      cyan: "#00e5ff",
      yellow: "#ffea00",
      violet: "#b620e0",
      orange: "#ff6d00",
    },
    prompts: [
      {
        zh: "做一个涂鸦街头版面：沥青黑 #1c1c1e 底、叠错位砖墙纹理（砖 64×24px、缝 4px、不透明度 40%、第二行从 32px 起）。标题 64px/900 全大写、字距 -0.02em、色 #ff2d55、rotate(-2deg)、叠 2 层同色 drop-shadow（偏移 1px、模糊 0）做喷漆边晕。按钮玫红 #ff2d55 填充、黑字、零圆角、4px 黑描边、硬阴影 6px 6px 0 #00e5ff，hover 时填充硬切到 #ffea00、阴影换 #b620e0。文字下加一条 4px 的 #00e5ff 划线并倾斜 1.5 度。角落放几个 24-96px 的喷漆圆斑（radial-gradient 渐隐、模糊 8px、不透明度 60%）。全站零圆角、旋转不超过 3 度。",
        en: "Build a graffiti layout: asphalt #1c1c1e ground under a staggered brick texture (64×24px bricks, 4px joints, 40% opacity, second course offset 32px). The headline runs 64px/900 uppercase at -0.02em in #ff2d55 at rotate(-2deg) with two same-color drop-shadows at 1px offset and zero blur for overspray. The button fills #ff2d55 with black text, zero radius, a 4px black border and a 6px 6px 0 hard shadow in #00e5ff, cutting to #ffea00 with a #b620e0 shadow on hover. A 4px #00e5ff underline tilted 1.5 degrees sits under the text. Spray blobs of 24 to 96px (radial fade, 8px blur, 60% opacity) sit in the corners. Zero radius throughout, and no rotation past three degrees.",
      },
    ],
  },
  similar: [
    { name: "Anti-Design", why: { zh: "同样反规则，但反设计是刻意的规则破坏，涂鸦是街头手艺", en: "Both break rules, though anti-design breaks them by system while graffiti is street craft" } },
    { name: "Collage Art", why: { zh: "同为手工拼贴感，但拼贴用纸与胶带，涂鸦用喷漆与墙", en: "Both handmade, though collage uses paper and tape while graffiti uses spray and wall" } },
  ],
  completeness: "full",
};
