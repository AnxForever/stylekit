import { getAllStylesMeta } from "./meta";
import type { StyleMeta, StyleTag } from "./meta-types";

export interface StyleCollection {
  /** URL slug under /collections/. */
  slug: string;
  /** Membership tag — styles carrying this tag belong to the collection. */
  tag: StyleTag;
  titleEn: string;
  titleZh: string;
  headlineEn: string;
  headlineZh: string;
  /** Substantive intro copy (SEO + GEO) — real prose, not boilerplate. */
  introEn: string;
  introZh: string;
  metaDescriptionEn: string;
  metaDescriptionZh: string;
  /** Optional cross-link to the matching prompt hub — builds the topic cluster. */
  relatedPromptHref?: string;
  relatedPromptLabelEn?: string;
  relatedPromptLabelZh?: string;
}

/**
 * Curated topic-cluster pillar pages. Each targets a specific, high-intent
 * search theme (not the 4 broad categories) and links to member style pages,
 * concentrating internal link equity to lift the whole cluster.
 */
export const STYLE_COLLECTIONS: StyleCollection[] = [
  {
    slug: "dark-mode",
    tag: "dark-theme",
    titleEn: "Dark Mode Design Styles",
    titleZh: "暗色模式设计风格",
    headlineEn: "Dark Mode Design Styles for Web & App UI",
    headlineZh: "适合 Web 与 App 的暗色模式设计风格",
    introEn:
      "Dark mode is more than inverting colors — the best dark interfaces manage contrast, elevation, and glare so surfaces stay legible and calm at night. These styles are built dark-first, each with tuned color tokens, readable surface hierarchies, and accent colors that stay vivid on deep backgrounds. Pick one, copy its tokens, and ship a consistent dark theme in your AI coding tool.",
    introZh:
      "暗色模式不只是反转颜色——真正好的暗色界面会管理对比、层次和眩光，让每个表面在夜间依然清晰、耐看。这些风格都是暗色优先设计的，各自带有调校过的颜色 tokens、可读的表面层级，以及在深色背景上依然鲜活的强调色。选一个、复制它的 tokens，就能在你的 AI 编码工具里稳定落地暗色主题。",
    metaDescriptionEn:
      "Curated dark mode design styles with tuned color tokens and readable contrast — for dashboards, SaaS, and dark-first UI. Copy tokens or install the theme via shadcn.",
    metaDescriptionZh:
      "精选暗色模式设计风格，带调校过的颜色 tokens 与可读对比——适合 dashboard、SaaS 与暗色优先 UI。可复制 tokens 或通过 shadcn 安装主题。",
    relatedPromptHref: "/dark-mode-ui-prompts",
    relatedPromptLabelEn: "Dark Mode UI Prompts",
    relatedPromptLabelZh: "暗色模式 UI 提示词",
  },
  {
    slug: "retro-vintage",
    tag: "retro",
    titleEn: "Retro & Vintage Web Design Styles",
    titleZh: "复古怀旧网页设计风格",
    headlineEn: "Retro & Vintage Design Styles",
    headlineZh: "复古与怀旧设计风格",
    introEn:
      "Retro design borrows the type, color, and texture of an era to make an interface feel human and memorable — from Y2K chrome and vaporwave gradients to mid-century print and 8-bit pixels. These styles capture each aesthetic precisely, with period-accurate palettes, typography, and motion so the nostalgia reads as intentional, not accidental.",
    introZh:
      "复古设计借用某个年代的字体、色彩与质感，让界面显得有人味、令人难忘——从 Y2K 金属质感、蒸汽波渐变，到世纪中叶印刷风与 8-bit 像素。这些风格精准还原每种美学，配以符合年代的调色板、字体与动效，让怀旧显得是有意为之，而非偶然。",
    metaDescriptionEn:
      "Curated retro and vintage web design styles — Y2K, vaporwave, mid-century, pixel art, and more, with period-accurate palettes and typography. Copy tokens or install instantly.",
    metaDescriptionZh:
      "精选复古怀旧网页设计风格——Y2K、蒸汽波、世纪中叶、像素艺术等，配符合年代的调色板与字体。可复制 tokens 或一键安装。",
  },
  {
    slug: "anime-manga",
    tag: "anime-aesthetic",
    titleEn: "Anime & Manga UI Design Styles",
    titleZh: "二次元 / 漫画 UI 设计风格",
    headlineEn: "Anime & Manga-Inspired UI Styles",
    headlineZh: "二次元与漫画风 UI 设计",
    introEn:
      "Anime aesthetics bring bold linework, screentone texture, dramatic speed lines, and expressive color into interface design. These styles translate manga and anime visual language into usable UI systems — from shoujo softness to cyber-mecha intensity — with tokens and component recipes that keep the drama legible and on-brand.",
    introZh:
      "二次元美学把粗犷的线条、网点质感、夸张的速度线与富有表现力的色彩带进界面设计。这些风格把漫画与动画的视觉语言转化为可用的 UI 系统——从少女漫的柔和到赛博机甲的强烈——配以 tokens 与组件配方，让戏剧感既清晰又统一。",
    metaDescriptionEn:
      "Curated anime and manga-inspired UI design styles with bold linework, screentone, and expressive color — turned into usable tokens and components. Copy or install instantly.",
    metaDescriptionZh:
      "精选二次元与漫画风 UI 设计风格，粗线条、网点、表现力色彩——转化为可用的 tokens 与组件。可复制或一键安装。",
  },
  {
    slug: "game-ui",
    tag: "game-ui",
    titleEn: "Game UI Design Styles",
    titleZh: "游戏 UI 设计风格",
    headlineEn: "Game UI Design Styles & HUD Systems",
    headlineZh: "游戏 UI 设计风格与 HUD 系统",
    introEn:
      "Game interfaces balance immersion and information — HUDs, inventories, and menus that stay readable under motion and pressure. These styles bring game UI language to the web: sci-fi HUD overlays, JRPG panels, arcade CRT glow, and pixel menus, each with tokens tuned for high legibility and atmosphere.",
    introZh:
      "游戏界面在沉浸感与信息量之间取得平衡——HUD、背包、菜单，即使在动态和高压下也要清晰可读。这些风格把游戏 UI 语言带到 Web：科幻 HUD 叠层、JRPG 面板、街机 CRT 辉光、像素菜单，各自的 tokens 都为高可读性与氛围感调校过。",
    metaDescriptionEn:
      "Curated game UI design styles — sci-fi HUD, JRPG panels, arcade CRT, and pixel menus, tuned for legibility and atmosphere. Copy tokens or install the theme via shadcn.",
    metaDescriptionZh:
      "精选游戏 UI 设计风格——科幻 HUD、JRPG 面板、街机 CRT、像素菜单，为可读性与氛围调校。可复制 tokens 或通过 shadcn 安装主题。",
  },
  {
    slug: "colorful-bold",
    tag: "colorful",
    titleEn: "Colorful & Bold Design Styles",
    titleZh: "高饱和大胆配色设计风格",
    headlineEn: "Colorful & Bold Design Styles",
    headlineZh: "高饱和 · 大胆配色设计风格",
    introEn:
      "Bold color grabs attention and signals confidence — but only when the palette is balanced and the contrast is controlled. These high-saturation styles, from dopamine design to Memphis and pop art, pair vivid color with disciplined tokens so the energy feels designed rather than loud.",
    introZh:
      "大胆的色彩能抓住注意力、传递自信——但前提是调色板平衡、对比可控。这些高饱和风格，从多巴胺设计到孟菲斯与波普艺术，把鲜艳色彩与克制的 tokens 搭配，让活力显得是设计出来的，而非吵闹。",
    metaDescriptionEn:
      "Curated colorful and bold design styles — dopamine design, Memphis, pop art, and more, with balanced high-saturation palettes. Copy tokens or install instantly.",
    metaDescriptionZh:
      "精选高饱和大胆配色设计风格——多巴胺设计、孟菲斯、波普艺术等，配平衡的高饱和调色板。可复制 tokens 或一键安装。",
  },
  {
    slug: "hand-drawn",
    tag: "hand-drawn",
    titleEn: "Hand-Drawn & Sketch Design Styles",
    titleZh: "手绘 / 涂鸦设计风格",
    headlineEn: "Hand-Drawn & Sketch Design Styles",
    headlineZh: "手绘与涂鸦设计风格",
    introEn:
      "Hand-drawn interfaces feel warm, approachable, and unmistakably human — sketchy strokes, doodle accents, and imperfect edges that soften a product's tone. These styles capture that handmade quality with tokens and components that stay consistent, so the friendliness scales without looking messy.",
    introZh:
      "手绘界面让人感到温暖、亲切、充满人味——潦草的笔触、涂鸦式点缀、不完美的边缘，柔化产品的调性。这些风格用 tokens 与组件保留这种手作质感，同时保持一致，让亲和力能规模化而不显凌乱。",
    metaDescriptionEn:
      "Curated hand-drawn and sketch design styles — doodle accents, sketchy strokes, and warm imperfect edges, kept consistent with tokens. Copy or install instantly.",
    metaDescriptionZh:
      "精选手绘与涂鸦设计风格——涂鸦点缀、潦草笔触、温暖不完美的边缘，用 tokens 保持一致。可复制或一键安装。",
  },
  {
    slug: "glassmorphism",
    tag: "glassmorphic",
    titleEn: "Glassmorphism Design Styles",
    titleZh: "玻璃拟态设计风格",
    headlineEn: "Glassmorphism & Frosted Glass UI Styles",
    headlineZh: "玻璃拟态与磨砂玻璃 UI 风格",
    introEn:
      "Glassmorphism layers translucent surfaces over rich backgrounds — frosted blur, thin light borders, and careful elevation that make interfaces feel physical and premium. Done badly it turns to mud; these styles get the recipe right, with tuned backdrop blur, contrast-safe text on glass, and tokens that keep every layer legible in both light and dark.",
    introZh:
      "玻璃拟态在丰富的背景上叠加半透明表面——磨砂模糊、细亮边框、讲究的层级，让界面产生实体感与高级感。做不好就是一团浆糊；这些风格把配方调对了：合适的 backdrop blur、玻璃上对比安全的文字，以及让每一层在明暗模式下都清晰的 tokens。",
    metaDescriptionEn:
      "Curated glassmorphism design styles — frosted blur, light borders, and legible glass layers with tuned tokens. Copy tokens or install the theme via shadcn.",
    metaDescriptionZh:
      "精选玻璃拟态设计风格——磨砂模糊、亮色细边、清晰可读的玻璃层级与调校 tokens。可复制 tokens 或通过 shadcn 安装主题。",
    relatedPromptHref: "/prompts/glassmorphism",
    relatedPromptLabelEn: "Glassmorphism UI Prompts",
    relatedPromptLabelZh: "玻璃拟态 UI 提示词",
  },
  {
    slug: "gradient",
    tag: "gradient",
    titleEn: "Gradient Design Styles",
    titleZh: "渐变设计风格",
    headlineEn: "Gradient-Driven Design Styles",
    headlineZh: "以渐变为主角的设计风格",
    introEn:
      "Gradients moved past the flat-design ban and came back with discipline — aurora meshes, soft duotones, and deep radial glows that give interfaces atmosphere without wrecking readability. These styles use gradients as a system, not a decoration: consistent stops, controlled saturation, and text layers that always keep their contrast.",
    introZh:
      "渐变熬过了扁平化时代的封杀，带着纪律回归——极光网格、柔和双色调、深邃的径向辉光，为界面营造氛围而不破坏可读性。这些风格把渐变当作系统而非装饰：一致的色标、克制的饱和度，以及始终保住对比度的文字层。",
    metaDescriptionEn:
      "Curated gradient design styles — aurora mesh, duotone, and radial glow palettes used as a system with contrast-safe text. Copy tokens or install instantly.",
    metaDescriptionZh:
      "精选渐变设计风格——极光网格、双色调、径向辉光，作为系统使用并保证文字对比。可复制 tokens 或一键安装。",
  },
  {
    slug: "geometric",
    tag: "geometric",
    titleEn: "Geometric Design Styles",
    titleZh: "几何设计风格",
    headlineEn: "Geometric & Grid-Built Design Styles",
    headlineZh: "几何与网格构成的设计风格",
    introEn:
      "Geometric design builds interfaces from primitives — circles, grids, diagonals, and modular blocks arranged with mathematical intent. From Bauhaus and Swiss rationalism to art deco ornament and isometric depth, these styles turn structure itself into the visual identity, with tokens that keep proportions consistent across every component.",
    introZh:
      "几何设计用基本形构建界面——圆、网格、斜线与模块化色块，以数学化的意图排布。从包豪斯与瑞士理性主义，到装饰艺术的纹样与等距立体感，这些风格让结构本身成为视觉识别，tokens 保证比例在每个组件上都一致。",
    metaDescriptionEn:
      "Curated geometric design styles — Bauhaus, Swiss grid, art deco, and isometric systems built from primitives with consistent proportions. Copy or install instantly.",
    metaDescriptionZh:
      "精选几何设计风格——包豪斯、瑞士网格、装饰艺术、等距立体，用基本形与一致比例构建。可复制或一键安装。",
  },
  {
    slug: "textured",
    tag: "texture-heavy",
    titleEn: "Textured & Tactile Design Styles",
    titleZh: "质感肌理设计风格",
    headlineEn: "Textured & Tactile Design Styles",
    headlineZh: "有质感、可触摸的设计风格",
    introEn:
      "Texture is what separates a sterile interface from one you want to touch — paper grain, fabric weave, risograph ink, grain overlays, and embossed surfaces that give pixels a material memory. These styles apply texture with restraint and purpose, so the tactility adds warmth and identity without hurting performance or legibility.",
    introZh:
      "质感是无菌界面与想伸手触摸的界面之间的分水岭——纸张颗粒、织物纹理、Riso 油墨、噪点叠层、浮雕表面，让像素拥有材质记忆。这些风格克制而有目的地使用质感，让触感带来温度与识别度，同时不牺牲性能与可读性。",
    metaDescriptionEn:
      "Curated textured design styles — paper grain, risograph, fabric, and grain overlays applied with restraint for warmth and identity. Copy tokens or install instantly.",
    metaDescriptionZh:
      "精选质感肌理设计风格——纸张颗粒、Riso 印刷、织物与噪点叠层，克制使用带来温度与识别度。可复制 tokens 或一键安装。",
  },
  {
    slug: "high-contrast",
    tag: "high-contrast",
    titleEn: "High-Contrast Design Styles",
    titleZh: "高对比设计风格",
    headlineEn: "High-Contrast & Statement Design Styles",
    headlineZh: "高对比 · 强表达设计风格",
    introEn:
      "High contrast is both an aesthetic stance and an accessibility win — thick borders, hard shadows, and palettes that hit WCAG ratios without trying. From neo-brutalism to bold editorial black-and-white, these styles make hierarchy unmistakable: every action, heading, and state reads instantly, even in sunlight, even for low-vision users.",
    introZh:
      "高对比既是审美立场，也是无障碍红利——粗边框、硬阴影、天然满足 WCAG 对比率的配色。从新野兽派到黑白编辑排版，这些风格让层级毫不含糊：每个操作、标题与状态都能瞬间读清，烈日下如此，低视力用户亦然。",
    metaDescriptionEn:
      "Curated high-contrast design styles — neo-brutalism, bold editorial, and hard-shadow systems that pass WCAG ratios by design. Copy tokens or install instantly.",
    metaDescriptionZh:
      "精选高对比设计风格——新野兽派、黑白编辑风、硬阴影系统，天生满足 WCAG 对比率。可复制 tokens 或一键安装。",
  },
  {
    slug: "brand-inspired",
    tag: "brand-inspired",
    titleEn: "Brand-Inspired Design Styles",
    titleZh: "知名品牌风格解构",
    headlineEn: "Design Styles Inspired by Famous Product Aesthetics",
    headlineZh: "解构知名产品美学的设计风格",
    introEn:
      "Great product aesthetics are studied, not copied — the restraint of Cupertino minimalism, the elevation logic of material surfaces, the confidence of Swiss corporate identity. These styles distill what makes famous design languages work into original, reusable token systems, so you can apply the same discipline to your own product without imitating anyone's trade dress.",
    introZh:
      "对优秀产品美学应当研究，而非照抄——库比蒂诺式极简的克制、材质表面的层级逻辑、瑞士企业识别的笃定。这些风格把知名设计语言的成立原理提炼为原创、可复用的 token 系统，让你把同样的纪律用在自己的产品上，而不是模仿任何人的商业外观。",
    metaDescriptionEn:
      "Curated design styles inspired by famous product aesthetics — the principles behind Apple-like minimalism, material elevation, and Swiss identity, as original token systems.",
    metaDescriptionZh:
      "精选解构知名产品美学的设计风格——苹果式极简、材质层级、瑞士识别背后的原理，做成原创 token 系统。",
  },
];

export function getAllCollections(): StyleCollection[] {
  return STYLE_COLLECTIONS;
}

export function getCollectionBySlug(slug: string): StyleCollection | undefined {
  return STYLE_COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getCollectionStyles(collection: StyleCollection): StyleMeta[] {
  return getAllStylesMeta()
    .filter((style) => style.tags?.includes(collection.tag))
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

/** For the /collections index — count members per collection. */
export function getCollectionStyleCount(collection: StyleCollection): number {
  return getCollectionStyles(collection).length;
}

/**
 * Collections a style belongs to, by its tags. Powers the reverse link on
 * style detail pages — closing the bidirectional topic-cluster loop
 * (collection -> styles AND style -> collections).
 */
export function getCollectionsForTags(tags: StyleTag[] | undefined): StyleCollection[] {
  if (!tags || tags.length === 0) return [];
  const tagSet = new Set(tags);
  return STYLE_COLLECTIONS.filter((collection) => tagSet.has(collection.tag));
}
