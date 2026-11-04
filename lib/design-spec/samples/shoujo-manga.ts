import type { DesignSpec } from "../types";

export const shoujoMangaSpec: DesignSpec = {
  slug: "shoujo-manga",
  name: "少女漫画风",
  nameEn: "Shoujo Manga",
  cover: "/styles/shoujo-manga.svg",
  theme: "light",
  northStar: {
    zh: "樱花粉、网点、花瓣边框、缎带标题：每一格都在心动。",
    en: "Sakura pink, screentone, flower frames and ribbon titles — every panel is a heartbeat.",
  },
  summary: {
    zh: "少女漫画风把日本少女漫画的视觉语汇搬到界面上：樱花粉主调、网点（screentone）纹理作背景、花瓣与蕾丝扇边作边框、缎带横幅作章节标题、金色多角星作闪光点缀。它的密度比其它风格高——装饰不是可选项而是身份，边角必须有花或星。圆角一律放大（按钮全圆、卡片 16px、面板 24px），底色保持珍珠白。禁止深色背景、禁止冷硬几何、禁止无装饰的裸卡片。",
    en: "Shoujo Manga carries the vocabulary of Japanese girls' comics onto the interface: sakura pink as the key, screentone texture behind, flower and lace-scallop frames, ribbon banners as chapter titles, and gold multi-point sparkles as accent. Its density runs higher than most — ornament is identity rather than option, and a corner without a flower or star is unfinished. Radii stay large (fully round buttons, 16px cards, 24px panels) on a pearl-white ground. Dark grounds, cold geometry and bare undecorated cards are all excluded.",
  },
  colors: [
    {
      name: "樱花粉",
      nameEn: "Sakura",
      value: "#ffb7c5",
      group: "brand",
      role: {
        zh: "主色：缎带、边框与主行动。整套风格的第一语言。",
        en: "The key color on ribbons, borders and primary actions — the style's first language.",
      },
      token: "--color-sakura",
    },
    {
      name: "珍珠白",
      nameEn: "Pearl White",
      value: "#fff5f7",
      group: "surface",
      role: {
        zh: "页面底。带一丝粉的暖白，比纯白更接近少女漫画的纸张。",
        en: "The page ground — a pink-cast warm white, closer to manga paper than pure white.",
      },
      token: "--color-pearl",
    },
    {
      name: "薰衣草",
      nameEn: "Lavender",
      value: "#c4b5fd",
      group: "accent",
      role: {
        zh: "第二色，用于梦境与幻想场景的强调。",
        en: "The second color, on dream and fantasy emphasis.",
      },
      token: "--color-lavender",
    },
    {
      name: "星光金",
      nameEn: "Starlight",
      value: "#fde68a",
      group: "accent",
      role: {
        zh: "闪光与点缀。必须带 4px 的柔光，否则不像星星。",
        en: "Sparkles and accents — they need a 4px soft glow or they stop reading as stars.",
      },
      token: "--color-starlight",
    },
    {
      name: "花瓣粉",
      nameEn: "Petal",
      value: "#fecdd3",
      group: "accent",
      role: {
        zh: "大面积柔和区块与网点底色。",
        en: "Large soft blocks and the screentone ground.",
      },
      token: "--color-petal",
    },
    {
      name: "桃红",
      nameEn: "Peach Rose",
      value: "#f8a9d7",
      group: "accent",
      role: {
        zh: "情绪最强的一支，用于「心动」时刻的关键按钮。",
        en: "The most emotional tone, on the key button of a heartbeat moment.",
      },
      token: "--color-peach-rose",
    },
  ],
  fonts: [
    {
      family: "Quicksand",
      substitute: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
      weights: [400, 600, 700],
      sizes: [13, 15, 18, 24, 32, 44],
      lineHeight: { display: 1.15, heading: 1.25, body: 1.7 },
      tracking: { display: "0.02em", label: "0.1em" },
      role: {
        zh: "标题与按钮。圆润的几何无衬线自带柔软感，是这套风格的基础语气。",
        en: "Headings and buttons. The rounded geometric sans supplies the softness this style runs on.",
      },
      token: "--font-display",
    },
    {
      family: "Nunito",
      substitute: "'Segoe UI', system-ui, sans-serif",
      weights: [400, 600],
      sizes: [13, 15, 17],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.75 },
      tracking: { display: "0", label: "0.1em" },
      role: {
        zh: "正文与对白。行高 1.75，读起来像漫画的旁白框。",
        en: "Body and dialogue at 1.75 leading, reading like a caption box.",
      },
      token: "--font-body",
    },
  ],
  typeScale: [
    { role: "display", font: "Quicksand", weight: 700, size: 44, lineHeight: 1.15, tracking: "0.02em", token: "--text-display" },
    { role: "heading", font: "Quicksand", weight: 700, size: 32, lineHeight: 1.2, token: "--text-heading" },
    { role: "subheading", font: "Quicksand", weight: 600, size: 24, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "Nunito", weight: 400, size: 17, lineHeight: 1.75, token: "--text-body-lg" },
    { role: "body", font: "Nunito", weight: 400, size: 15, lineHeight: 1.75, token: "--text-body" },
    { role: "label", font: "Quicksand", weight: 600, size: 13, lineHeight: 1.45, tracking: "0.1em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96],
    maxWidth: 1080,
    sectionGap: 96,
    cardPadding: 32,
    elementGap: 20,
  },
  radii: [
    { element: "cards", value: "16px" },
    { element: "panels", value: "24px" },
    { element: "buttons", value: "999px" },
    { element: "inputs", value: "999px" },
  ],
  surfaces: [
    { level: 0, name: "Pearl White", value: "#fff5f7", purpose: "页面底" },
    { level: 1, name: "White", value: "#ffffff", purpose: "卡片" },
    { level: 2, name: "Screentone", value: "radial-gradient dot pattern", purpose: "网点纹理层" },
  ],
  elevation: [
    { name: "Card", value: "0 8px 24px rgba(255,183,197,0.35)" },
    { name: "Sparkle", value: "0 0 4px rgba(253,230,138,0.90)" },
  ],
  components: [
    {
      name: "Ribbon Banner",
      role: { zh: "缎带标题（识别核心）", en: "The ribbon banner — the identifier" },
      construction: {
        zh: "樱花粉填充、零描边，主体高 40px、左右内边距 32px，两端各用 clip-path 切出 V 形燕尾（各 16px 宽）。文字用 Quicksand 700、18px、珍珠白、字距 0.1em。缎带下方可加一条 1px 的粉色投影线增加厚度。",
        en: "Sakura fill with no stroke, 40px tall and 32px padded, with V-shaped tails cut by clip-path at each end (16px wide). The label runs Quicksand 700 at 18px in pearl white on 0.1em tracking. A 1px pink shadow line beneath the ribbon adds thickness.",
      },
    },
    {
      name: "Lace Card",
      role: { zh: "内容卡（带蕾丝扇边）", en: "The lace-scallop card" },
      construction: {
        zh: "白底、16px 圆角、1px 樱花粉 40% 描边、内边距 32px、阴影 0 8px 24px 粉 35%。顶部或四边用 radial-gradient 做 8px 半径的波浪扇边（间隔 16px）。左上角放一个 14px 的樱花粉花朵图标作为角饰。",
        en: "White fill, 16px radius, a 1px sakura border at 40%, 32px padding, shadow 0 8px 24px at 35% pink. A radial gradient makes an 8px scallop edge at 16px intervals along the top or all four sides, and a 14px sakura flower icon sits as a corner mark.",
      },
    },
    {
      name: "Sparkle",
      role: { zh: "多角星闪光", en: "The multi-point sparkle" },
      construction: {
        zh: "四角星形状（两个交叉的 2px 细长菱形或用 SVG），尺寸 8px 到 20px，填星光金并带 4px 柔光。散布在卡片角落与标题旁，单屏 3 到 6 个，不做动画或只做 4 秒的缓慢明暗呼吸。",
        en: "A four-point star (two crossed thin diamonds, or an SVG) between 8px and 20px, filled starlight with a 4px soft glow. They scatter at card corners and beside headings, three to six per screen, either static or breathing brightness over four seconds.",
      },
    },
    {
      name: "Pill Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "桃红或樱花粉填充、珍珠白文字、999px 全圆角、无描边、15px/700、padding 12px 28px，阴影 0 6px 16px 粉 40%。hover 时填充提亮并放大到 1.03；按下缩到 0.97。过渡 250ms ease-out。",
        en: "Peach rose or sakura fill, pearl white text, fully rounded, no border, 15px/700, 12px 28px padding, shadow 0 6px 16px at 40% pink. Hover brightens the fill and scales to 1.03; press scales 0.97. 250ms ease-out.",
      },
    },
    {
      name: "Screentone Bed",
      role: { zh: "网点背景层", en: "The screentone bed" },
      construction: {
        zh: "在区块背景上叠一层 4px 间隔、半径 0.8px 的花瓣粉网点（radial-gradient），整体不透明度 25% 到 35%。它是漫画印刷的暗示，不可超过这个强度，否则文字会糊。",
        en: "A radial gradient at 4px spacing with 0.8px dots in petal pink overlays a section at 25% to 35% opacity. It implies print halftone and must never go stronger or the text muddies.",
      },
    },
  ],
  imagery: {
    zh: "漫画风插画：人物特写、花瓣、缎带、闪光与网点阴影。允许把照片处理成网点单色后作为回忆场景。不使用写实摄影、冷色几何与暗调图像。",
    en: "Manga-style illustration: character close-ups, petals, ribbons, sparkles and halftone shading. A photo may be reduced to single-tone halftone for a memory scene. No realistic photography, cold geometry or dark imagery.",
  },
  layout: {
    zh: "上限 1080px、容器内边距 24px，区块间距 96px。允许卡片轻微旋转（-2 到 2 度）与错位堆叠。标题区常为居中缎带，内容以两列或三列卡片展开。装饰密度高于常规，但正文行宽不超过 34em。",
    en: "Capped at 1080px with 24px padding, sections 96px apart. Cards may rotate between -2 and 2 degrees and stack out of line. Headers are usually centred ribbons with content opening into two or three columns. Ornament runs denser than usual while the text measure stays under 34em.",
  },
  dos: [
    { zh: "樱花粉为主调", en: "Sakura pink carries the palette" },
    { zh: "边角必须有花或星", en: "Every corner needs a flower or a star" },
    { zh: "章节标题用缎带横幅", en: "Chapter titles use ribbon banners" },
    { zh: "叠一层 25% 到 35% 的网点", en: "Layer screentone at 25% to 35%" },
    { zh: "圆角放大：按钮全圆、卡片 16px", en: "Large radii: round buttons, 16px cards" },
    { zh: "闪光必须带柔光", en: "Sparkles always carry a soft glow" },
  ],
  donts: [
    { zh: "不要用深色或暗调背景", en: "No dark grounds" },
    { zh: "不要用冷硬几何", en: "No cold hard geometry" },
    { zh: "不要做无装饰的裸卡片", en: "No bare undecorated cards" },
    { zh: "不要让网点超过 35%", en: "Never push screentone past 35%" },
    { zh: "不要用小圆角", en: "No small radii" },
    { zh: "不要用写实摄影", en: "No realistic photography" },
  ],
  promptGuide: {
    quickColors: {
      text: "#5a4a52",
      background: "#fff5f7",
      card: "#ffffff",
      sakura: "#ffb7c5",
      starlight: "#fde68a",
      lavender: "#c4b5fd",
    },
    prompts: [
      {
        zh: "做一个少女漫画风卡片：白底、16px 圆角、1px rgba(255,183,197,0.4) 描边、内边距 32px、阴影 0 8px 24px rgba(255,183,197,0.35)。顶部用 radial-gradient 做 8px 蕾丝扇边（间隔 16px）。左上角放一个 14px 樱花粉花朵图标，右下角放两个 12px 星光金四角星（带 0 0 4px rgba(253,230,138,0.9) 柔光）。标题用 Quicksand 700 24px，正文 Nunito 15px/1.75。区块背景可叠 4px 间隔的 #fecdd3 网点（30% 不透明度）。页面底色 #fff5f7。",
        en: "Build a shoujo manga card: white fill, 16px radius, a 1px rgba(255,183,197,0.4) border, 32px padding, shadow 0 8px 24px rgba(255,183,197,0.35). A radial gradient draws an 8px scallop edge every 16px along the top. A 14px sakura flower icon sits top-left with two 12px four-point stars bottom-right carrying 0 0 4px rgba(253,230,138,0.9) glow. The title runs Quicksand 700 at 24px, body Nunito 15px on 1.75. A section may carry 4px screentone in #fecdd3 at 30% opacity. The page ground is #fff5f7.",
      },
    ],
  },
  similar: [
    { name: "Comic Style", why: { zh: "同源于漫画，但少女漫画用粉色与缎带，美漫用粗墨线与对话气泡", en: "Both comic-derived, though shoujo uses pink and ribbons while western comics uses ink lines and bubbles" } },
    { name: "Kawaii Pastel", why: { zh: "同样粉彩可爱，但少女漫画的叙事装饰更密、更有情节感", en: "Also pastel and cute, though shoujo's ornament is denser and more narrative" } },
  ],
  completeness: "full",
};
