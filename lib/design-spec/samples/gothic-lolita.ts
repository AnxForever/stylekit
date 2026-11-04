import type { DesignSpec } from "../types";

export const gothicLolitaSpec: DesignSpec = {
  slug: "gothic-lolita",
  name: "哥特萝莉风",
  nameEn: "Gothic Lolita",
  cover: "/styles/gothic-lolita.svg",
  theme: "dark",
  northStar: {
    zh: "黑缎带、蕾丝边、十字与玫瑰：暗色浪漫的精细装饰。",
    en: "Black ribbon, lace trim, cross and rose — dark romance in fine detail.",
  },
  summary: {
    zh: "哥特萝莉风把哥特建筑装饰与洛丽塔的精致细节缝在一起：黑底（#1a1a1a）上装深紫（#4a1a4a）与血红（#8b1a2a），文字用浅灰白（#e5e5e5），衬线字体带装饰性，图案必须是严格对称的哥特花纹、十字架与玫瑰，边框用蕾丝扇边或缎带。它的禁令是：不许明亮鲜艳的颜色、不许可爱卡通元素、不许现代极简、不许过于圆润的形状——圆润会把它推向甜系，而它要的是暗。",
    en: "Gothic Lolita stitches Gothic architectural ornament to Lolita's fine detail: deep violet (#4a1a4a) and blood red (#8b1a2a) over black (#1a1a1a), text in a pale grey-white (#e5e5e5), decorative serif faces, and patterns that must be strictly symmetrical — Gothic tracery, crosses and roses — with lace scallop or ribbon borders. The prohibitions: no bright vivid color, no cute cartoon elements, no modern minimalism, and no overly rounded shapes, since roundness pushes it toward sweet while this style wants dark.",
  },
  colors: [
    {
      name: "深紫",
      nameEn: "Deep Violet",
      value: "#4a1a4a",
      group: "brand",
      role: {
        zh: "主色：缎带、边框与强调区块。黑与血红之间的过渡。",
        en: "The primary on ribbons, borders and emphasis — the bridge between black and blood red.",
      },
      token: "--color-deep-violet",
    },
    {
      name: "血红",
      nameEn: "Blood Red",
      value: "#8b1a2a",
      group: "brand",
      role: {
        zh: "第二主色：玫瑰、十字与关键强调。",
        en: "The second primary on roses, crosses and key emphasis.",
      },
      token: "--color-blood-red",
    },
    {
      name: "黑",
      nameEn: "Black",
      value: "#1a1a1a",
      group: "surface",
      role: {
        zh: "页面底与主体裁。整套风格的暗色基础。",
        en: "The page ground and the main garment — the dark basis of everything.",
      },
      token: "--color-black",
    },
    {
      name: "浅灰白",
      nameEn: "Pale Silver",
      value: "#e5e5e5",
      group: "surface",
      role: {
        zh: "文字与蕾丝。不是纯白，带一点灰的缎面光。",
        en: "Text and lace — not pure white, a satin sheen with a little grey.",
      },
      token: "--color-pale-silver",
    },
    {
      name: "中紫",
      nameEn: "Mid Violet",
      value: "#6b2d5b",
      group: "accent",
      role: {
        zh: "抬升面与次级装饰，比主紫亮一档。",
        en: "Raised surfaces and secondary ornament, one step above the primary violet.",
      },
      token: "--color-mid-violet",
    },
  ],
  fonts: [
    {
      family: "Cormorant Garamond",
      substitute: "'EB Garamond', Georgia, 'Songti SC', serif",
      weights: [400, 600],
      sizes: [14, 17, 21, 28, 38, 52],
      lineHeight: { display: 1.15, heading: 1.3, body: 1.75 },
      tracking: { display: "0.03em", label: "0.22em" },
      role: {
        zh: "装饰性衬线，标题加 0.22em 的宽字距像蕾丝边，正文行高 1.75。",
        en: "A decorative serif: headings at 0.22em tracking like lace trim, body at 1.75 leading.",
      },
      token: "--font-serif",
    },
  ],
  typeScale: [
    { role: "display", weight: 600, size: 52, lineHeight: 1.15, tracking: "0.03em", token: "--text-display" },
    { role: "heading", weight: 600, size: 38, lineHeight: 1.25, tracking: "0.03em", token: "--text-heading" },
    { role: "subheading", weight: 400, size: 28, lineHeight: 1.35, token: "--text-subheading" },
    { role: "body-lg", weight: 400, size: 21, lineHeight: 1.7, token: "--text-body-lg" },
    { role: "body", weight: 400, size: 17, lineHeight: 1.75, token: "--text-body" },
    { role: "label", weight: 600, size: 14, lineHeight: 1.55, tracking: "0.22em", token: "--text-label" },
  ],
  spacing: {
    base: 8,
    density: "comfortable",
    scale: [8, 16, 24, 32, 48, 64, 96, 128],
    maxWidth: 1040,
    sectionGap: 112,
    cardPadding: 32,
    elementGap: 24,
  },
  radii: [
    { element: "cards", value: "4px" },
    { element: "buttons", value: "2px" },
    { element: "stamps", value: "999px" },
    { element: "frames", value: "50% 50% 0 0" },
  ],
  surfaces: [
    { level: 0, name: "Black", value: "#1a1a1a", purpose: "页面底" },
    { level: 1, name: "Deep Violet", value: "#4a1a4a", purpose: "卡片" },
    { level: 2, name: "Blood Red", value: "#8b1a2a", purpose: "强调块" },
  ],
  elevation: [
    { name: "None", value: "none — depth comes from ornament" },
    { name: "Violet glow", value: "0 0 20px rgba(74,26,74,0.60)" },
  ],
  components: [
    {
      name: "Lace Frame",
      role: { zh: "蕾丝扇边框架（核心组件）", en: "The lace frame — the core component" },
      construction: {
        zh: "深紫填充、4px 圆角、1px 浅灰白 25% 描边、内边距 32px。四边用 radial-gradient 做 8px 半径的扇贝边（间隔 16px），四角各放一个 16px 的对称哥特纹（十字或卷草，用 1px 浅灰白线画）。",
        en: "Deep violet fill, 4px radius, a 1px pale silver border at 25%, 32px padding. A radial gradient makes an 8px scallop edge at 16px intervals along all four sides, and a 16px symmetrical Gothic mark (a cross or scroll) drawn in 1px pale silver sits at each corner.",
      },
    },
    {
      name: "Ribbon Button",
      role: { zh: "行动按钮", en: "Action button" },
      construction: {
        zh: "深紫填充、浅灰白文字、2px 圆角、1px 浅灰白 30% 描边、14px/600、字距 0.22em、padding 14px 32px。两端用 clip-path 切出缎带的燕尾（各 10px），外发光 0 0 20px 深紫 60%。hover 时描边升到 60%、文字转血红、发光扩到 32px；按下时缩到 0.98。过渡 300ms。",
        en: "Deep violet fill, pale silver text, 2px radius, a 1px silver border at 30%, 14px/600 at 0.22em, 14px 32px padding. clip-path cuts ribbon tails 10px at each end, with a 0 0 20px glow at 60% violet. Hover raises the border to 60%, turns the text blood red and widens the glow to 32px; press scales 0.98. 300ms.",
      },
      sizes: "padding 14px 32px; label 14px",
      states: "hover: blood red text, wider glow; active: scale 0.98",
    },
    {
      name: "Rose Motif",
      role: { zh: "玫瑰与十字装饰", en: "Rose and cross ornaments" },
      construction: {
        zh: "48 到 96px 的对称玫瑰（8 到 12 片花瓣，双层）或十字，用 1px 线稿或平涂血红。必须严格左右对称——哥特萝莉的装饰不允不对称。放在框架四角或标题两侧，单屏 2 到 3 处。",
        en: "A symmetrical rose (eight to twelve petals in two layers) or a cross, 48 to 96px, drawn in 1px line or flat blood red. It must mirror exactly — Gothic Lolita ornament is never asymmetric. It sits at frame corners or beside headings, two to three per screen.",
      },
    },
    {
      name: "Cameo Portrait",
      role: { zh: "浮雕头像框", en: "The cameo portrait frame" },
      construction: {
        zh: "96 到 160px 的椭圆框、2px 浅灰白 40% 描边、内部填深紫或放灰度肖像、外圈再加一层 4px 的深紫描边。它模仿维多利亚时代的浮雕胸针，用于角色与作者头像。",
        en: "A 96 to 160px oval with a 2px silver border at 40%, filled deep violet or holding a greyscale portrait, ringed again by 4px of deep violet. It imitates a Victorian cameo brooch and carries character or author portraits.",
      },
    },
    {
      name: "Cross Divider",
      role: { zh: "十字分隔线", en: "The cross divider" },
      construction: {
        zh: "一条 1px 浅灰白 30% 的横线，中央嵌一个 16px 的血红十字，两侧各有一个 4px 的菱形。用于区块之间，替代普通分隔线。",
        en: "A 1px silver rule at 30% with a 16px blood red cross embedded at its centre and a 4px diamond on either side. It divides sections in place of an ordinary rule.",
      },
    },
  ],
  imagery: {
    zh: "暗调摄影与插画：蕾丝、缎带、玫瑰、烛台、十字架、哥特建筑细节。必须低饱和、暗部丰富，允许棕黑单色。不使用明亮摄影、可爱插画与彩色卡通。",
    en: "Dark photography and illustration: lace, ribbon, roses, candelabra, crosses, Gothic architectural detail. Low saturation with rich shadow, optionally graded to warm monochrome. No bright photography, cute illustration or color cartoons.",
  },
  layout: {
    zh: "上限 1040px、容器内边距 32px，区块间距 112px。以严格对称为主（与哥特一致），允许元素居中堆叠。留白宽松，装饰密度高于常规但必须对称。",
    en: "Capped at 1040px with 32px padding, sections 112px apart. Symmetry leads, consistent with Gothic, and elements may stack centred. Whitespace runs generous while ornament stays denser than usual — always mirrored.",
  },
  dos: [
    { zh: "黑底配深紫与血红", en: "Black ground with deep violet and blood red" },
    { zh: "装饰必须严格对称", en: "Ornament must mirror exactly" },
    { zh: "用蕾丝扇边与缎带", en: "Use lace scallops and ribbon" },
    { zh: "装饰性衬线加宽字距", en: "Decorative serif on wide tracking" },
    { zh: "文字用浅灰白而非纯白", en: "Text uses pale silver, not pure white" },
    { zh: "玫瑰与十字作标记", en: "Rose and cross carry the marks" },
  ],
  donts: [
    { zh: "不要用明亮鲜艳的颜色", en: "No bright vivid color" },
    { zh: "不要用可爱卡通元素", en: "No cute cartoon elements" },
    { zh: "不要现代极简", en: "No modern minimalism" },
    { zh: "不要用过于圆润的形状", en: "No overly rounded shapes" },
    { zh: "不要用不对称装饰", en: "No asymmetric ornament" },
    { zh: "不要用纯白", en: "No pure white" },
  ],
  promptGuide: {
    quickColors: {
      text: "#e5e5e5",
      background: "#1a1a1a",
      violet: "#4a1a4a",
      red: "#8b1a2a",
      mid: "#6b2d5b",
      lace: "#e5e5e5",
    },
    prompts: [
      {
        zh: "做一个哥特萝莉卡片：深紫 #4a1a4a 填充、4px 圆角、1px rgba(229,229,229,0.25) 描边、内边距 32px。四边用 radial-gradient 做 8px 蕾丝扇边（间隔 16px），四角各一个 16px 的对称哥特十字（1px 浅灰白线）。标题 38px/600 Cormorant Garamond、字距 0.22em、色 #e5e5e5；正文 17px、行高 1.75。按钮深紫填充、浅灰白文字、2px 圆角、两端 clip-path 切缎带燕尾、外发光 0 0 20px rgba(74,26,74,0.6)，hover 时文字转血红 #8b1a2a。页面底色 #1a1a1a。",
        en: "Build a Gothic Lolita card: #4a1a4a fill, 4px radius, a 1px rgba(229,229,229,0.25) border, 32px padding. A radial gradient makes an 8px lace scallop at 16px intervals along all four sides, with a 16px symmetrical Gothic cross in 1px pale silver at each corner. The heading runs 38px/600 Cormorant Garamond at 0.22em in #e5e5e5 with body at 17px on 1.75 leading. The button fills deep violet with pale silver text on a 2px radius, ribbon tails cut by clip-path at each end and a 0 0 20px rgba(74,26,74,0.6) glow, turning its text blood red #8b1a2a on hover. The page ground is #1a1a1a.",
      },
    ],
  },
  similar: [
    { name: "Gothic", why: { zh: "同族，但哥特式是教堂与尖拱，哥特萝莉是衣饰与蕾丝", en: "Same family, though Gothic is churches and pointed arches while this is garment and lace" } },
    { name: "Shoujo Manga", why: { zh: "同样装饰密度高，但少女漫画是粉与缎带，哥特萝莉是黑与玫瑰", en: "Both ornament-dense, though shoujo is pink and ribbon while this is black and rose" } },
  ],
  completeness: "full",
};
