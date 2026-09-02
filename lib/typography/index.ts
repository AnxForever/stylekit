// Typography / Font Pairing Library
// A deliberately small catalog of expressive, open-source Google Fonts.

export type TypographyCategory =
  | "classic"
  | "modern"
  | "playful"
  | "editorial"
  | "technical"
  | "elegant"
  | "display"
  | "handwritten";

export interface FontSpec {
  family: string;
  weight: number;
}

export interface FontPairing {
  id: string;
  name: string;
  nameZh: string;
  heading: FontSpec;
  body: FontSpec;
  category: TypographyCategory;
  tags: string[];
  mood: string[];
  bestFor: string;
  bestForZh: string;
  description: string;
  descriptionZh: string;
  previewWord?: string;
  sourceUrl: string;
  license: "OFL";
}

const font = (family: string, weight: number): FontSpec => ({ family, weight });
const specimen = (family: string) =>
  `https://fonts.google.com/specimen/${family.replace(/ /g, "+")}`;

export const fontPairings: FontPairing[] = [
  {
    id: "gallery-gloock",
    name: "Gallery Gloock",
    nameZh: "画廊格洛克",
    heading: font("Gloock", 400),
    body: font("Manrope", 400),
    category: "elegant",
    tags: ["gallery", "culture", "editorial"],
    mood: ["quiet", "artful", "assured"],
    bestFor: "Art galleries, cultural institutions, architecture",
    bestForZh: "艺术画廊、文化机构与建筑网站",
    description: "A poised serif with unusual details, grounded by a neutral sans for navigation and prose.",
    descriptionZh: "带有独特细节的沉静衬线体，搭配中性无衬线体承载导航与正文。",
    sourceUrl: specimen("Gloock"),
    license: "OFL",
  },
  {
    id: "literary-alegreya",
    name: "Literary Archive",
    nameZh: "文学档案",
    heading: font("Alegreya", 600),
    body: font("Source Sans 3", 400),
    category: "classic",
    tags: ["literary", "reading", "humanist"],
    mood: ["warm", "scholarly", "readable"],
    bestFor: "Long-form essays, books, archives, education",
    bestForZh: "长文、书籍、档案与教育内容",
    description: "Calligraphic rhythm in the headings with a highly readable humanist sans for longer passages.",
    descriptionZh: "标题具有书写节奏，正文则使用适合长时间阅读的人文无衬线体。",
    sourceUrl: specimen("Alegreya"),
    license: "OFL",
  },
  {
    id: "retro-yeseva",
    name: "Yeseva Salon",
    nameZh: "叶塞娃沙龙",
    heading: font("Yeseva One", 400),
    body: font("Karla", 400),
    category: "classic",
    tags: ["retro", "signage", "hospitality"],
    mood: ["nostalgic", "confident", "welcoming"],
    bestFor: "Boutique hospitality, restaurants, retro identities",
    bestForZh: "精品酒店、餐饮与复古品牌",
    description: "A theatrical display face softened by a compact, friendly sans.",
    descriptionZh: "带舞台感的展示字体，搭配紧凑友好的无衬线正文。",
    sourceUrl: specimen("Yeseva One"),
    license: "OFL",
  },
  {
    id: "atelier-bricolage",
    name: "Bricolage Studio",
    nameZh: "布里科工作室",
    heading: font("Bricolage Grotesque", 700),
    body: font("Albert Sans", 400),
    category: "modern",
    tags: ["studio", "expressive", "contemporary"],
    mood: ["inventive", "direct", "energetic"],
    bestFor: "Creative studios, design tools, expressive products",
    bestForZh: "创意工作室、设计工具与表现型产品",
    description: "A characterful grotesque that stays legible even when the hierarchy becomes bold.",
    descriptionZh: "字形个性鲜明，即使放大和加粗也能保持清晰。",
    sourceUrl: specimen("Bricolage Grotesque"),
    license: "OFL",
  },
  {
    id: "swiss-archivo",
    name: "Archivo Poster",
    nameZh: "阿奇沃海报",
    heading: font("Archivo Black", 400),
    body: font("Archivo", 400),
    category: "modern",
    tags: ["poster", "swiss", "signage"],
    mood: ["structured", "graphic", "decisive"],
    bestFor: "Posters, wayfinding, portfolios, bold landing pages",
    bestForZh: "海报、导视、作品集与强视觉落地页",
    description: "A single-family system with enough width and weight contrast to feel deliberately graphic.",
    descriptionZh: "同一字体家族通过宽度与重量差异形成明确、图形化的层级。",
    previewWord: "FORM",
    sourceUrl: specimen("Archivo Black"),
    license: "OFL",
  },
  {
    id: "anime-dela",
    name: "Dela Pop",
    nameZh: "德拉潮流",
    heading: font("Dela Gothic One", 400),
    body: font("Nunito Sans", 400),
    category: "playful",
    tags: ["anime", "pop", "youth"],
    mood: ["loud", "friendly", "kinetic"],
    bestFor: "Anime, gaming, youth culture, playful campaigns",
    bestForZh: "动漫、游戏、青年文化与趣味活动",
    description: "Dense display shapes create instant personality while the body remains open and approachable.",
    descriptionZh: "密度较高的展示字形迅速建立个性，正文依然开放易读。",
    previewWord: "TOKYO!",
    sourceUrl: specimen("Dela Gothic One"),
    license: "OFL",
  },
  {
    id: "artbook-young",
    name: "Young Art Book",
    nameZh: "青年艺术书",
    heading: font("Young Serif", 400),
    body: font("Work Sans", 400),
    category: "editorial",
    tags: ["art-book", "culture", "independent"],
    mood: ["fresh", "literary", "unconventional"],
    bestFor: "Independent publishing, art books, cultural essays",
    bestForZh: "独立出版、艺术书与文化文章",
    description: "Soft, irregular serif details give editorial pages personality without hurting readability.",
    descriptionZh: "柔和而略带不规则的衬线细节，为编辑页面增加个性。",
    sourceUrl: specimen("Young Serif"),
    license: "OFL",
  },
  {
    id: "museum-kalnia",
    name: "Kalnia Museum",
    nameZh: "卡尔尼亚博物馆",
    heading: font("Kalnia", 600),
    body: font("Commissioner", 400),
    category: "editorial",
    tags: ["museum", "exhibition", "variable"],
    mood: ["curatorial", "sculptural", "measured"],
    bestFor: "Museum programs, exhibitions, artist portfolios",
    bestForZh: "博物馆项目、展览与艺术家作品集",
    description: "Sculptural terminals make short titles memorable; the body face keeps supporting information orderly.",
    descriptionZh: "雕塑感端点让短标题更具记忆点，正文则保持信息秩序。",
    previewWord: "FORM / 26",
    sourceUrl: specimen("Kalnia"),
    license: "OFL",
  },
  {
    id: "signal-fragment",
    name: "Fragment Signal",
    nameZh: "片段信号",
    heading: font("Fragment Mono", 400),
    body: font("Albert Sans", 400),
    category: "technical",
    tags: ["mono", "interface", "code"],
    mood: ["precise", "quiet", "digital"],
    bestFor: "Developer tools, documentation, technical portfolios",
    bestForZh: "开发者工具、文档与技术作品集",
    description: "A restrained monospace for labels and headlines, paired with a more comfortable prose face.",
    descriptionZh: "克制的等宽体用于标签与标题，更舒适的无衬线体承载正文。",
    previewWord: "0x26",
    sourceUrl: specimen("Fragment Mono"),
    license: "OFL",
  },
  {
    id: "systems-azeret",
    name: "Azeret Systems",
    nameZh: "阿泽雷特系统",
    heading: font("Azeret Mono", 600),
    body: font("Public Sans", 400),
    category: "technical",
    tags: ["systems", "data", "industrial"],
    mood: ["systematic", "dense", "reliable"],
    bestFor: "Data products, industrial interfaces, system documentation",
    bestForZh: "数据产品、工业界面与系统文档",
    description: "More mechanical than a typical code font, with a public-service sans that handles dense information.",
    descriptionZh: "比常见代码字体更具机械感，正文无衬线体适合高密度信息。",
    sourceUrl: specimen("Azeret Mono"),
    license: "OFL",
  },
  {
    id: "future-unbounded",
    name: "Unbounded Future",
    nameZh: "无界未来",
    heading: font("Unbounded", 700),
    body: font("Manrope", 400),
    category: "display",
    tags: ["future", "wide", "experimental"],
    mood: ["futuristic", "expansive", "bold"],
    bestFor: "Sci-fi, mobility, technology campaigns, games",
    bestForZh: "科幻、出行、科技活动与游戏",
    description: "Wide geometric forms create a cinematic future-facing voice; use them only for short statements.",
    descriptionZh: "宽阔几何字形营造电影化未来感，仅用于短句和主标题。",
    previewWord: "BEYOND",
    sourceUrl: specimen("Unbounded"),
    license: "OFL",
  },
  {
    id: "poster-bungee",
    name: "Bungee Street",
    nameZh: "蹦极街头",
    heading: font("Bungee", 400),
    body: font("Archivo", 400),
    category: "display",
    tags: ["street", "poster", "festival"],
    mood: ["urban", "graphic", "celebratory"],
    bestFor: "Street culture, festivals, sports, bold announcements",
    bestForZh: "街头文化、节庆、体育与强势公告",
    description: "Stacked letterforms behave like signage, balanced by a practical grotesque for details.",
    descriptionZh: "堆叠式字形像街头招牌，搭配实用无衬线体处理细节。",
    previewWord: "BLOCK PARTY",
    sourceUrl: specimen("Bungee"),
    license: "OFL",
  },
  {
    id: "deco-limelight",
    name: "Limelight Deco",
    nameZh: "聚光灯装饰",
    heading: font("Limelight", 400),
    body: font("Karla", 400),
    category: "display",
    tags: ["art-deco", "cinema", "hospitality"],
    mood: ["cinematic", "ornamental", "polished"],
    bestFor: "Art Deco, cinema, hotels, event identities",
    bestForZh: "装饰艺术、电影、酒店与活动视觉",
    description: "A geometric display face with period character, kept usable through a compact sans companion.",
    descriptionZh: "具有时代特征的几何展示字体，搭配紧凑无衬线体保持实用性。",
    previewWord: "CINEMA",
    sourceUrl: specimen("Limelight"),
    license: "OFL",
  },
  {
    id: "gothic-grenze",
    name: "Grenze Nocturne",
    nameZh: "格伦策夜曲",
    heading: font("Grenze Gotisch", 700),
    body: font("Manrope", 400),
    category: "display",
    tags: ["gothic", "fantasy", "music"],
    mood: ["dark", "ornate", "theatrical"],
    bestFor: "Gothic, fantasy, music, dark editorial",
    bestForZh: "哥特、幻想、音乐与暗黑编辑风格",
    description: "Blackletter energy for short display text, paired with a neutral body to prevent visual fatigue.",
    descriptionZh: "黑体书写感用于短标题，中性正文避免长时间阅读疲劳。",
    previewWord: "NOCTURNE",
    sourceUrl: specimen("Grenze Gotisch"),
    license: "OFL",
  },
  {
    id: "handmade-shantell",
    name: "Shantell Workshop",
    nameZh: "香特尔手作",
    heading: font("Shantell Sans", 700),
    body: font("Atkinson Hyperlegible", 400),
    category: "handwritten",
    tags: ["handmade", "illustration", "friendly"],
    mood: ["human", "playful", "accessible"],
    bestFor: "Illustration, workshops, learning, handmade brands",
    bestForZh: "插画、工作坊、学习与手作品牌",
    description: "A genuinely drawn display face paired with an accessibility-led body font.",
    descriptionZh: "真实手绘感展示字体，搭配以易读性为核心设计的正文字体。",
    previewWord: "Made by hand",
    sourceUrl: specimen("Shantell Sans"),
    license: "OFL",
  },
  // === Batch 2: distinctive-but-popular OFL faces (no overused defaults) ===
  {
    id: "sora-figtree",
    name: "Sora Product",
    nameZh: "Sora 产品",
    heading: font("Sora", 600),
    body: font("Figtree", 400),
    category: "modern",
    tags: ["saas", "product", "fintech"],
    mood: ["crisp", "modern", "confident"],
    bestFor: "SaaS marketing, product pages, fintech",
    bestForZh: "SaaS 营销、产品页与金融科技",
    description: "Sora's squared geometric headings over the friendly, compact Figtree body.",
    descriptionZh: "Sora 方正的几何标题搭配友好紧凑的 Figtree 正文，是产品站的稳妥现代组合。",
    sourceUrl: specimen("Sora"),
    license: "OFL",
  },
  {
    id: "epilogue-hanken",
    name: "Epilogue Grotesk",
    nameZh: "Epilogue 无衬线",
    heading: font("Epilogue", 600),
    body: font("Hanken Grotesk", 400),
    category: "modern",
    tags: ["startup", "app", "marketing"],
    mood: ["neutral", "approachable", "clean"],
    bestFor: "App marketing, startups, general product sites",
    bestForZh: "应用营销、初创公司与通用产品站",
    description: "Epilogue's tidy headings with Hanken Grotesk's warm, readable body.",
    descriptionZh: "Epilogue 利落的标题搭配 Hanken Grotesk 温和易读的正文。",
    sourceUrl: specimen("Epilogue"),
    license: "OFL",
  },
  {
    id: "plex-technical",
    name: "Plex Technical",
    nameZh: "Plex 技术",
    heading: font("IBM Plex Sans", 600),
    body: font("IBM Plex Sans", 400),
    category: "technical",
    tags: ["developer", "docs", "product"],
    mood: ["precise", "engineered", "trustworthy"],
    bestFor: "Developer tools, documentation, technical products",
    bestForZh: "开发者工具、文档与技术型产品",
    description: "A single super-family at two weights — the safest technical voice there is.",
    descriptionZh: "同一超级字族的两种字重，是最稳妥的技术气质表达。",
    sourceUrl: specimen("IBM Plex Sans"),
    license: "OFL",
  },
  {
    id: "syne-brutal",
    name: "Syne Avant",
    nameZh: "Syne 前卫",
    heading: font("Syne", 700),
    body: font("Hanken Grotesk", 400),
    category: "display",
    tags: ["art", "cultural", "expressive"],
    mood: ["experimental", "bold", "artful"],
    bestFor: "Art collectives, cultural events, expressive landing pages",
    bestForZh: "艺术团体、文化活动与表现型落地页",
    previewWord: "AVANT",
    description: "Syne's eccentric display weight against a calm grotesque body for contrast.",
    descriptionZh: "Syne 古怪的展示字重与冷静的无衬线正文形成强烈反差。",
    sourceUrl: specimen("Syne"),
    license: "OFL",
  },
  {
    id: "caslon-journal",
    name: "Caslon Journal",
    nameZh: "卡斯隆期刊",
    heading: font("Libre Caslon Display", 400),
    body: font("Source Sans 3", 400),
    category: "classic",
    tags: ["journal", "academic", "editorial"],
    mood: ["scholarly", "timeless", "authoritative"],
    bestFor: "Journals, academic sites, heritage brands",
    bestForZh: "期刊、学术网站与传统品牌",
    previewWord: "Journal",
    description: "A classic Caslon display serif grounded by a neutral humanist sans.",
    descriptionZh: "经典的 Caslon 展示衬线，以中性人文无衬线体收束。",
    sourceUrl: specimen("Libre Caslon Display"),
    license: "OFL",
  },
  {
    id: "newsreader-editorial",
    name: "Newsreader Editorial",
    nameZh: "Newsreader 社论",
    heading: font("Newsreader", 500),
    body: font("Figtree", 400),
    category: "editorial",
    tags: ["magazine", "reading", "editorial"],
    mood: ["literary", "refined", "current"],
    bestFor: "Magazines, long-form reading, modern editorial",
    bestForZh: "杂志、长文阅读与现代社论",
    previewWord: "Editorial",
    description: "Newsreader's screen-tuned editorial serif with a compact modern sans body.",
    descriptionZh: "Newsreader 为屏幕优化的社论衬线搭配紧凑的现代无衬线正文。",
    sourceUrl: specimen("Newsreader"),
    license: "OFL",
  },
  {
    id: "spectral-work",
    name: "Spectral Reader",
    nameZh: "Spectral 阅读",
    heading: font("Spectral", 600),
    body: font("Work Sans", 400),
    category: "classic",
    tags: ["blog", "reading", "publication"],
    mood: ["calm", "readable", "trustworthy"],
    bestFor: "Blogs, publications, long-form reading",
    bestForZh: "博客、出版物与长文阅读",
    description: "Spectral's contemporary serif for headings, Work Sans for comfortable body copy.",
    descriptionZh: "Spectral 当代衬线用于标题，Work Sans 承载舒适的长文正文。",
    sourceUrl: specimen("Spectral"),
    license: "OFL",
  },
  {
    id: "outfit-clean",
    name: "Outfit Clean",
    nameZh: "Outfit 简净",
    heading: font("Outfit", 600),
    body: font("Figtree", 400),
    category: "modern",
    tags: ["startup", "landing", "marketing"],
    mood: ["even", "friendly", "modern"],
    bestFor: "Landing pages, startups, general marketing sites",
    bestForZh: "落地页、初创公司与通用营销站",
    description: "Outfit's even geometric headings — a friendly, contemporary default.",
    descriptionZh: "Outfit 匀称的几何标题，是友好又现代的默认之选。",
    sourceUrl: specimen("Outfit"),
    license: "OFL",
  },
  {
    id: "gabarito-pop",
    name: "Gabarito Pop",
    nameZh: "Gabarito 活力",
    heading: font("Gabarito", 700),
    body: font("Hanken Grotesk", 400),
    category: "playful",
    tags: ["consumer", "youth", "campaign"],
    mood: ["friendly", "energetic", "rounded"],
    bestFor: "Consumer apps, youth brands, playful campaigns",
    bestForZh: "消费类应用、青年品牌与趣味活动",
    description: "Gabarito's rounded, energetic headings with a clean grotesque body.",
    descriptionZh: "Gabarito 圆润有活力的标题搭配干净的无衬线正文。",
    sourceUrl: specimen("Gabarito"),
    license: "OFL",
  },
  {
    id: "mono-terminal",
    name: "Mono Terminal",
    nameZh: "等宽终端",
    heading: font("Space Mono", 700),
    body: font("Sora", 400),
    category: "technical",
    tags: ["developer", "terminal", "retro-tech"],
    mood: ["technical", "raw", "retro"],
    bestFor: "Developer brands, hackathons, terminal aesthetics",
    bestForZh: "开发者品牌、黑客松与终端美学",
    previewWord: "0xF00",
    description: "Space Mono headings over a Sora body — a coherent monospace-flavored system.",
    descriptionZh: "Space Mono 标题搭配 Sora 正文，构成协调的等宽风格系统。",
    sourceUrl: specimen("Space Mono"),
    license: "OFL",
  },
  {
    id: "chromatic-nabla",
    name: "Chromatic Nabla",
    nameZh: "彩色立体",
    heading: font("Nabla", 400),
    body: font("Manrope", 400),
    category: "display",
    tags: ["color-font", "3d", "expressive", "hero"],
    mood: ["bold", "futuristic", "joyful"],
    bestFor: "Creative portfolios, launch heroes, festival and campaign headlines",
    bestForZh: "创意作品集、发布会 hero、节日与活动标题",
    previewWord: "AURORA",
    description: "A COLRv1 color font with gradient-filled 3D facets — an instant focal point, paired with a calm neutral sans for everything else.",
    descriptionZh: "COLRv1 彩色字体，带渐变立体切面，天生的视觉焦点；其余内容交给克制的中性无衬线体。",
    sourceUrl: specimen("Nabla"),
    license: "OFL",
  },
  {
    id: "carnival-honk",
    name: "Carnival Honk",
    nameZh: "嘉年华招牌",
    heading: font("Honk", 400),
    body: font("Work Sans", 400),
    category: "display",
    tags: ["color-font", "playful", "poster", "signage"],
    mood: ["loud", "festive", "fun"],
    bestFor: "Event posters, promos, kids and entertainment brands",
    bestForZh: "活动海报、促销页、儿童与娱乐品牌",
    previewWord: "BLOCK PARTY",
    description: "A multi-color signage face bursting with personality, kept legible by a workhorse sans for body copy.",
    descriptionZh: "多彩招牌字，个性张扬；正文用可靠的无衬线体保证可读。",
    sourceUrl: specimen("Honk"),
    license: "OFL",
  },
  {
    id: "arcade-sixtyfour",
    name: "Arcade Sixtyfour",
    nameZh: "街机 64",
    heading: font("Sixtyfour", 400),
    body: font("IBM Plex Sans", 400),
    category: "display",
    tags: ["retro", "pixel", "8-bit", "crt"],
    mood: ["nostalgic", "playful", "technical"],
    bestFor: "Retro games, dev demos, 8-bit and CRT nostalgia",
    bestForZh: "复古游戏、技术 demo、8-bit 与 CRT 怀旧主题",
    previewWord: "GAME OVER",
    description: "A CRT-era bitmap face with scanline texture, grounded by IBM Plex Sans for readable modern copy.",
    descriptionZh: "带扫描线质感的 CRT 点阵字，搭配 IBM Plex Sans 承载现代可读正文。",
    sourceUrl: specimen("Sixtyfour"),
    license: "OFL",
  },
  {
    id: "matrix-doto",
    name: "Matrix Doto",
    nameZh: "点阵矩阵",
    heading: font("Doto", 500),
    body: font("Sora", 400),
    category: "technical",
    tags: ["dot-matrix", "variable", "data", "dashboard"],
    mood: ["technical", "precise", "futuristic"],
    bestFor: "Dashboards, counters, data-driven and sci-tech heroes",
    bestForZh: "数据仪表盘、计数器、科技感 hero",
    previewWord: "0101 GRID",
    description: "A dot-matrix variable face that reads like an LED panel, with Sora keeping body text clean.",
    descriptionZh: "点阵可变字，像 LED 面板般的数字感，Sora 保持正文干净。",
    sourceUrl: specimen("Doto"),
    license: "OFL",
  },
  {
    id: "pixel-play",
    name: "Pixel Play",
    nameZh: "像素游戏",
    heading: font("Pixelify Sans", 700),
    body: font("Nunito Sans", 400),
    category: "playful",
    tags: ["pixel", "game", "retro", "playful"],
    mood: ["playful", "nostalgic", "friendly"],
    bestFor: "Indie games, pixel art, playful product UI",
    bestForZh: "独立游戏、像素艺术、活泼的产品界面",
    previewWord: "PLAYER 1",
    description: "A clean pixel face that stays crisp at display sizes, softened by the rounded humanist Nunito Sans.",
    descriptionZh: "干净的像素字，大字号依旧利落，搭配圆润人文的 Nunito Sans 更亲和。",
    sourceUrl: specimen("Pixelify Sans"),
    license: "OFL",
  },
  {
    id: "gothic-jacquard",
    name: "Gothic Jacquard",
    nameZh: "哥特织锦",
    heading: font("Jacquarda Bastarda 9", 400),
    body: font("Spectral", 400),
    category: "display",
    tags: ["blackletter", "pixel", "gothic", "ornate"],
    mood: ["dark", "ornate", "dramatic"],
    bestFor: "Dark themes, music covers, luxury packaging, Halloween",
    bestForZh: "暗黑主题、音乐封面、奢华包装、万圣节",
    previewWord: "MIDNIGHT",
    description: "A blackletter-meets-bitmap display face with ornate menace, balanced by Spectral's readable serif body.",
    descriptionZh: "哥特黑体撞上像素的装饰性标题字，暗黑而讲究，用 Spectral 可读衬线正文平衡。",
    sourceUrl: specimen("Jacquarda Bastarda 9"),
    license: "OFL",
  },
  {
    id: "signal-glitch",
    name: "Signal Glitch",
    nameZh: "故障信号",
    heading: font("Rubik Glitch", 400),
    body: font("Hanken Grotesk", 400),
    category: "display",
    tags: ["glitch", "cyberpunk", "experimental", "poster"],
    mood: ["edgy", "digital", "raw"],
    bestFor: "Cyberpunk, experimental posters, music and nightlife",
    bestForZh: "赛博朋克、实验海报、音乐与夜生活",
    previewWord: "SIGNAL LOST",
    description: "A datamoshed display face with slipped channels, cooled down by the neutral Hanken Grotesk body.",
    descriptionZh: "通道错位的故障标题字，用中性的 Hanken Grotesk 正文降温。",
    sourceUrl: specimen("Rubik Glitch"),
    license: "OFL",
  },
  {
    id: "neon-monoton",
    name: "Neon Monoton",
    nameZh: "霓虹灯管",
    heading: font("Monoton", 400),
    body: font("Karla", 400),
    category: "display",
    tags: ["neon", "retro", "signage", "80s"],
    mood: ["retro", "vibrant", "nocturnal"],
    bestFor: "Retro signage, nightlife, 80s and diner themes",
    bestForZh: "复古招牌、夜生活、80 年代与美式餐厅主题",
    previewWord: "OPEN LATE",
    description: "A single-line face built for neon-tube headlines, with the compact Karla keeping copy grounded.",
    descriptionZh: "为霓虹灯管标题而生的单线字，搭配紧凑的 Karla 稳住正文。",
    sourceUrl: specimen("Monoton"),
    license: "OFL",
  },
  {
    id: "chubby-bagel",
    name: "Chubby Bagel",
    nameZh: "圆胖软糖",
    heading: font("Bagel Fat One", 400),
    body: font("Figtree", 400),
    category: "playful",
    tags: ["rounded", "chunky", "cute", "brand"],
    mood: ["friendly", "soft", "cheerful"],
    bestFor: "Food and dessert brands, kids products, cute apps",
    bestForZh: "食品甜品品牌、儿童产品、可爱风 app",
    previewWord: "Yummy",
    description: "An ultra-round, pillowy display face that feels edible, paired with the friendly geometric Figtree.",
    descriptionZh: "超圆软糯、几乎能吃的标题字，搭配友好的几何无衬线 Figtree。",
    sourceUrl: specimen("Bagel Fat One"),
    license: "OFL",
  },
  {
    id: "vogue-bodoni",
    name: "Vogue Bodoni",
    nameZh: "时尚博多尼",
    heading: font("Bodoni Moda", 600),
    body: font("Public Sans", 400),
    category: "elegant",
    tags: ["didone", "fashion", "editorial", "high-contrast"],
    mood: ["chic", "refined", "dramatic"],
    bestFor: "Fashion, beauty, luxury, editorial covers",
    bestForZh: "时尚、美妆、奢侈品、编辑封面",
    previewWord: "VOGUE",
    description: "A high-contrast Didone with magazine-cover drama, kept modern and legible by Public Sans.",
    descriptionZh: "高对比 Didone，自带杂志封面的戏剧感，用 Public Sans 保持现代与可读。",
    sourceUrl: specimen("Bodoni Moda"),
    license: "OFL",
  },
  {
    id: "roman-cinzel",
    name: "Roman Cinzel",
    nameZh: "罗马碑刻",
    heading: font("Cinzel", 600),
    body: font("Source Sans 3", 400),
    category: "elegant",
    tags: ["roman", "inscriptional", "luxury", "capitals"],
    mood: ["classical", "prestigious", "assured"],
    bestFor: "Luxury brands, wineries, architecture, weddings",
    bestForZh: "奢华品牌、酒庄、建筑、婚礼",
    previewWord: "AETERNA",
    description: "Roman inscriptional capitals with quiet authority, grounded by the humanist Source Sans 3.",
    descriptionZh: "罗马碑刻式大写，沉静而有权威感，用人文的 Source Sans 3 落地正文。",
    sourceUrl: specimen("Cinzel"),
    license: "OFL",
  },
  {
    id: "salon-cormorant",
    name: "Salon Cormorant",
    nameZh: "沙龙加拉蒙",
    heading: font("Cormorant Garamond", 600),
    body: font("Karla", 400),
    category: "elegant",
    tags: ["garamond", "literary", "delicate", "editorial"],
    mood: ["elegant", "literary", "airy"],
    bestFor: "Poetry, boutiques, editorial and fine-dining menus",
    bestForZh: "诗歌、精品店、编辑内容与精致餐单",
    previewWord: "Élégance",
    description: "A slender, high-contrast Garamond for graceful headlines, with the compact Karla for body.",
    descriptionZh: "纤细高对比的 Garamond，标题优雅有致，正文用紧凑的 Karla。",
    sourceUrl: specimen("Cormorant Garamond"),
    license: "OFL",
  },
  {
    id: "civic-bigshoulders",
    name: "Civic Big Shoulders",
    nameZh: "都市工业",
    heading: font("Big Shoulders Display", 700),
    body: font("Public Sans", 400),
    category: "display",
    tags: ["industrial", "condensed", "poster", "civic"],
    mood: ["bold", "urban", "confident"],
    bestFor: "Sports, industrial brands, posters, civic and city design",
    bestForZh: "体育、工业品牌、海报、城市与公共设计",
    previewWord: "BUILT CITY",
    description: "A tall, condensed industrial sans born from Chicago's public design, with Public Sans for clean body copy.",
    descriptionZh: "源自芝加哥公共设计的窄高工业无衬线体，搭配 Public Sans 承载干净正文。",
    sourceUrl: specimen("Big Shoulders Display"),
    license: "OFL",
  },
  {
    id: "mission-martian",
    name: "Mission Martian",
    nameZh: "火星任务",
    heading: font("Martian Mono", 600),
    body: font("IBM Plex Sans", 400),
    category: "technical",
    tags: ["monospace", "wide", "aerospace", "console"],
    mood: ["technical", "precise", "spacey"],
    bestFor: "Aerospace and tech brands, code displays, console UI",
    bestForZh: "航天与技术品牌、代码展示、控制台界面",
    previewWord: "LAUNCH_SEQ",
    description: "An extra-wide monospace with mission-control precision, paired with IBM Plex Sans for prose.",
    descriptionZh: "超宽等宽字，带控制中心般的精确感，搭配 IBM Plex Sans 承载正文。",
    sourceUrl: specimen("Martian Mono"),
    license: "OFL",
  },
  {
    id: "product-geist",
    name: "Product Geist",
    nameZh: "产品极简",
    heading: font("Geist", 700),
    body: font("Geist", 400),
    category: "modern",
    tags: ["geometric", "product", "ui", "minimal"],
    mood: ["modern", "clean", "neutral"],
    bestFor: "SaaS products, developer tools, modern app UI",
    bestForZh: "SaaS 产品、开发者工具、现代应用界面",
    description: "Vercel's restrained geometric sans as one coherent family — crisp headings and calm body from a single voice.",
    descriptionZh: "Vercel 出品的克制几何无衬线体，标题与正文同出一源，利落又统一。",
    sourceUrl: specimen("Geist"),
    license: "OFL",
  },
  {
    id: "notebook-playwrite",
    name: "Notebook Playwrite",
    nameZh: "手写笔记",
    heading: font("Playwrite AU SA", 400),
    body: font("Source Sans 3", 400),
    category: "handwritten",
    tags: ["handwriting", "personal", "notes", "friendly"],
    mood: ["warm", "personal", "casual"],
    bestFor: "Personal blogs, greeting cards, notes and warm brands",
    bestForZh: "个人博客、贺卡、笔记类与亲切品牌",
    previewWord: "Dear you,",
    description: "A school-primer handwriting face with natural joins, grounded by the readable Source Sans 3.",
    descriptionZh: "学校字帖式的手写体，连笔自然，用可读的 Source Sans 3 承载正文。",
    sourceUrl: specimen("Playwrite AU SA"),
    license: "OFL",
  },
];

export function getFontPairingsByCategory(category: TypographyCategory): FontPairing[] {
  return fontPairings.filter((pairing) => pairing.category === category);
}

export function getFontPairingById(id: string): FontPairing | undefined {
  return fontPairings.find((pairing) => pairing.id === id);
}

export function getFontPairingsByMood(mood: string): FontPairing[] {
  const query = mood.toLowerCase();
  return fontPairings.filter((pairing) =>
    pairing.mood.some((entry) => entry.toLowerCase().includes(query))
  );
}

export function getTypographyCategories(): {
  category: TypographyCategory;
  count: number;
  labelZh: string;
  labelEn: string;
}[] {
  const labels: Record<TypographyCategory, { zh: string; en: string }> = {
    classic: { zh: "经典", en: "Classic" },
    modern: { zh: "现代", en: "Modern" },
    playful: { zh: "趣味", en: "Playful" },
    editorial: { zh: "编辑", en: "Editorial" },
    technical: { zh: "技术", en: "Technical" },
    elegant: { zh: "优雅", en: "Elegant" },
    display: { zh: "展示", en: "Display" },
    handwritten: { zh: "手写", en: "Handwritten" },
  };

  return (Object.keys(labels) as TypographyCategory[])
    .map((category) => ({
      category,
      count: fontPairings.filter((pairing) => pairing.category === category).length,
      labelZh: labels[category].zh,
      labelEn: labels[category].en,
    }))
    .filter((category) => category.count > 0);
}

const FONT_CDN = "https://fonts.loli.net";

export function generateGoogleFontsUrl(fonts: FontSpec[]): string {
  const families = new Map<string, Set<number>>();

  for (const spec of fonts) {
    const weights = families.get(spec.family) ?? new Set<number>();
    weights.add(spec.weight);
    families.set(spec.family, weights);
  }

  const query = [...families.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([family, weights]) => {
      const familyName = family.replace(/ /g, "+");
      const weightList = [...weights].sort((left, right) => left - right).join(";");
      return `family=${familyName}:wght@${weightList}`;
    })
    .join("&");

  return `${FONT_CDN}/css2?${query}&display=swap`;
}

export function generateGoogleFontsLink(pairing: FontPairing): string {
  return generateGoogleFontsUrl([pairing.heading, pairing.body]);
}

type GenericFamily = "serif" | "sans" | "mono";

const SYSTEM_FONT_STACKS: Record<GenericFamily, string> = {
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

const FONT_GENERIC: Record<string, GenericFamily> = {
  "Alegreya": "serif",
  "Albert Sans": "sans",
  "Archivo": "sans",
  "Archivo Black": "sans",
  "Atkinson Hyperlegible": "sans",
  "Azeret Mono": "mono",
  "Bricolage Grotesque": "sans",
  "Bungee": "sans",
  "Commissioner": "sans",
  "Dela Gothic One": "sans",
  "Epilogue": "sans",
  "Figtree": "sans",
  "Fragment Mono": "mono",
  "Gabarito": "sans",
  "Gloock": "serif",
  "Grenze Gotisch": "serif",
  "Hanken Grotesk": "sans",
  "IBM Plex Sans": "sans",
  "Kalnia": "serif",
  "Karla": "sans",
  "Libre Caslon Display": "serif",
  "Limelight": "sans",
  "Manrope": "sans",
  "Newsreader": "serif",
  "Nunito Sans": "sans",
  "Outfit": "sans",
  "Public Sans": "sans",
  "Shantell Sans": "sans",
  "Sora": "sans",
  "Source Sans 3": "sans",
  "Space Mono": "mono",
  "Spectral": "serif",
  "Syne": "sans",
  "Unbounded": "sans",
  "Work Sans": "sans",
  "Yeseva One": "serif",
  "Young Serif": "serif",
  // Added 2026-09-02: unique OFL display / text faces
  "Bodoni Moda": "serif",
  "Cinzel": "serif",
  "Cormorant Garamond": "serif",
  "Jacquarda Bastarda 9": "serif",
  "Martian Mono": "mono",
  "Bagel Fat One": "sans",
  "Big Shoulders Display": "sans",
  "Doto": "sans",
  "Geist": "sans",
  "Honk": "sans",
  "Monoton": "sans",
  "Nabla": "sans",
  "Pixelify Sans": "sans",
  "Playwrite AU SA": "sans",
  "Rubik Glitch": "sans",
  "Sixtyfour": "sans",
};

function genericOf(family: string): GenericFamily {
  return FONT_GENERIC[family] ?? "sans";
}

const GENERIC_LABEL: Record<GenericFamily, string> = {
  serif: "Serif",
  sans: "Sans",
  mono: "Mono",
};

export function pairingContrast(pairing: FontPairing): string {
  const heading = GENERIC_LABEL[genericOf(pairing.heading.family)];
  const body = GENERIC_LABEL[genericOf(pairing.body.family)];
  if (pairing.heading.family === pairing.body.family) {
    return `${heading} · one family`;
  }
  return `${heading} × ${body}`;
}

export function fontStack(spec: FontSpec): string {
  return `'${spec.family}', ${SYSTEM_FONT_STACKS[genericOf(spec.family)]}`;
}

const WEIGHT_TW_CLASS: Record<number, string> = {
  300: "font-light",
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
  800: "font-extrabold",
  900: "font-black",
};

function weightClass(weight: number): string {
  return WEIGHT_TW_CLASS[weight] ?? "font-normal";
}

export function generateFontCSS(pairing: FontPairing): string {
  return [
    `@import url('${generateGoogleFontsLink(pairing)}');`,
    "",
    `/* Heading: ${pairing.heading.family} */`,
    `font-family: ${fontStack(pairing.heading)};`,
    `font-weight: ${pairing.heading.weight};`,
    "",
    `/* Body: ${pairing.body.family} */`,
    `font-family: ${fontStack(pairing.body)};`,
    `font-weight: ${pairing.body.weight};`,
  ].join("\n");
}

export function generateTailwindTheme(pairing: FontPairing): string {
  return [
    `@import url('${generateGoogleFontsLink(pairing)}');`,
    "",
    "@theme {",
    `  --font-heading: ${fontStack(pairing.heading)};`,
    `  --font-body: ${fontStack(pairing.body)};`,
    "}",
    "",
    `<h1 class="font-heading ${weightClass(pairing.heading.weight)}">Heading</h1>`,
    `<p class="font-body ${weightClass(pairing.body.weight)}">Body text</p>`,
  ].join("\n");
}
