export type ComponentPatternFamily =
  | "breadcrumb"
  | "accordion"
  | "tabs"
  | "pagination"
  | "sidebar-nav";

export type ComponentPatternCategory = "navigation" | "disclosure";

export type ComponentPatternPreviewId =
  | "breadcrumb-standard"
  | "breadcrumb-pill"
  | "breadcrumb-title-linked"
  | "breadcrumb-cyberpunk"
  | "breadcrumb-ink-wash"
  | "breadcrumb-linear"
  | "breadcrumb-gothic"
  | "accordion-synthwave"
  | "accordion-skeuomorphism"
  | "accordion-ghibli"
  | "accordion-african-textile"
  | "accordion-liquid-glass"
  | "accordion-sci-fi-hud"
  | "accordion-art-nouveau"
  | "accordion-pop-art"
  | "tabs-art-deco"
  | "tabs-cel-shading"
  | "tabs-apple-style"
  | "tabs-holographic"
  | "tabs-pixel-art"
  | "tabs-scandinavian"
  | "tabs-dark-academia"
  | "pagination-data-dense"
  | "pagination-brutalist-web"
  | "pagination-neon-tokyo"
  | "pagination-risograph"
  | "pagination-japanese-fresh"
  | "pagination-shopify-clean"
  | "sidebar-nav-sidebar-fixed"
  | "sidebar-nav-notion-style"
  | "sidebar-nav-macos-vibrancy"
  | "sidebar-nav-solarpunk"
  | "sidebar-nav-github-style"
  | "sidebar-nav-steampunk"
  | "sidebar-nav-film-noir";

export interface ComponentPattern {
  id: string;
  family: ComponentPatternFamily;
  category: ComponentPatternCategory;
  name: string;
  nameZh: string;
  summary: string;
  summaryZh: string;
  useCase: string;
  useCaseZh: string;
  tags: string[];
  tagsZh: string[];
  sourceStyleSlug: string;
  sourceHref: string;
  previewId: ComponentPatternPreviewId;
}

export const componentPatterns: ComponentPattern[] = [
  {
    id: "sidebar-fixed-standard-breadcrumb",
    family: "breadcrumb",
    category: "navigation",
    name: "Standard Breadcrumb",
    nameZh: "标准面包屑",
    summary: "Minimal inline breadcrumb with restrained separators for admin surfaces.",
    summaryZh: "简洁的行内面包屑，用克制的分隔符呈现后台层级路径。",
    useCase: "Dashboards, analytics views, deep back-office navigation.",
    useCaseZh: "适合仪表盘、分析页和多层后台导航。",
    tags: ["minimal", "admin", "hierarchy"],
    tagsZh: ["极简", "后台", "层级"],
    sourceStyleSlug: "sidebar-fixed",
    sourceHref: "/styles/sidebar-fixed/showcase",
    previewId: "breadcrumb-standard",
  },
  {
    id: "sidebar-fixed-pill-breadcrumb",
    family: "breadcrumb",
    category: "navigation",
    name: "Pill Breadcrumb",
    nameZh: "胶囊面包屑",
    summary: "Pill-based breadcrumb that turns path segments into clear touch targets.",
    summaryZh: "把路径节点做成胶囊按钮，层级更醒目，也更适合点击。",
    useCase: "Content tools, project management, editorial workspaces.",
    useCaseZh: "适合内容工具、项目管理和编辑工作台。",
    tags: ["pill", "touch-friendly", "workspace"],
    tagsZh: ["胶囊", "易点击", "工作台"],
    sourceStyleSlug: "sidebar-fixed",
    sourceHref: "/styles/sidebar-fixed/showcase",
    previewId: "breadcrumb-pill",
  },
  {
    id: "sidebar-fixed-title-breadcrumb",
    family: "breadcrumb",
    category: "navigation",
    name: "Title-Linked Breadcrumb",
    nameZh: "标题联动面包屑",
    summary: "Breadcrumb stacked above the page title to reinforce page context.",
    summaryZh: "把面包屑与页面标题组合在一起，强化当前页面语境。",
    useCase: "Profile pages, detail views, record-centric admin screens.",
    useCaseZh: "适合资料页、详情页和记录中心型后台界面。",
    tags: ["title", "detail-page", "context"],
    tagsZh: ["标题联动", "详情页", "上下文"],
    sourceStyleSlug: "sidebar-fixed",
    sourceHref: "/styles/sidebar-fixed/showcase",
    previewId: "breadcrumb-title-linked",
  },
  {
    id: "synthwave-faq-accordion",
    family: "accordion",
    category: "disclosure",
    name: "Synthwave Glow Accordion",
    nameZh: "合成波霓虹手风琴",
    summary: "Neon FAQ accordion with bright borders and high-contrast glow states.",
    summaryZh: "带霓虹描边和高对比发光状态的 FAQ 手风琴。",
    useCase: "Event pages, product FAQs, theatrical landing sections.",
    useCaseZh: "适合活动页、产品 FAQ 和更具戏剧性的落地页区块。",
    tags: ["neon", "faq", "glow"],
    tagsZh: ["霓虹", "问答", "发光"],
    sourceStyleSlug: "synthwave",
    sourceHref: "/styles/synthwave/showcase",
    previewId: "accordion-synthwave",
  },
  {
    id: "skeuomorphism-panel-accordion",
    family: "accordion",
    category: "disclosure",
    name: "Skeuomorphic Panel Accordion",
    nameZh: "拟物面板手风琴",
    summary: "Raised tactile panels with embossed chrome-like separators.",
    summaryZh: "用拟物隆起面板和压印分隔线营造可触碰的层次感。",
    useCase: "Settings pages, feature explainers, desktop-like interfaces.",
    useCaseZh: "适合设置页、功能说明和桌面感较强的界面。",
    tags: ["tactile", "panel", "desktop"],
    tagsZh: ["触感", "面板", "桌面感"],
    sourceStyleSlug: "skeuomorphism",
    sourceHref: "/styles/skeuomorphism/showcase",
    previewId: "accordion-skeuomorphism",
  },
  {
    id: "ghibli-soft-accordion",
    family: "accordion",
    category: "disclosure",
    name: "Soft Storybook Accordion",
    nameZh: "绘本柔和手风琴",
    summary: "Warm, hand-crafted accordion with calm color transitions and gentle spacing.",
    summaryZh: "色彩柔和、留白舒展的绘本感手风琴，过渡更温和。",
    useCase: "About sections, story-driven product pages, educational content.",
    useCaseZh: "适合关于页、叙事型产品页和教育内容。",
    tags: ["storybook", "soft", "warm"],
    tagsZh: ["绘本感", "柔和", "温暖"],
    sourceStyleSlug: "ghibli-style",
    sourceHref: "/styles/ghibli-style/showcase",
    previewId: "accordion-ghibli",
  },
  {
    id: "african-textile-pattern-accordion",
    family: "accordion",
    category: "disclosure",
    name: "Pattern-Rich Accordion",
    nameZh: "纹样强调手风琴",
    summary: "Decorative accordion that uses strong pattern rhythm and warm earth accents.",
    summaryZh: "以强节奏纹样和大地色点缀塑造视觉识别的手风琴。",
    useCase: "Cultural showcases, editorial storytelling, immersive brand pages.",
    useCaseZh: "适合文化展示、专题叙事和更沉浸的品牌页面。",
    tags: ["pattern", "editorial", "cultural"],
    tagsZh: ["纹样", "专题", "文化感"],
    sourceStyleSlug: "african-textile",
    sourceHref: "/styles/african-textile/showcase",
    previewId: "accordion-african-textile",
  },
  {
    id: "art-deco-framed-tabs",
    family: "tabs",
    category: "navigation",
    name: "Framed Deco Tabs",
    nameZh: "装饰框标签页",
    summary: "Framed geometric tabs with luxe contrast and ornamental emphasis.",
    summaryZh: "带几何边框和奢华对比的装饰型标签页。",
    useCase: "Hospitality, premium brands, gallery-like component sections.",
    useCaseZh: "适合酒店、奢品品牌和展陈感更强的组件区块。",
    tags: ["luxury", "geometric", "framed"],
    tagsZh: ["奢华", "几何", "边框"],
    sourceStyleSlug: "art-deco",
    sourceHref: "/styles/art-deco/showcase",
    previewId: "tabs-art-deco",
  },
  {
    id: "cel-shading-color-tabs",
    family: "tabs",
    category: "navigation",
    name: "Four-Color Tabs",
    nameZh: "四色切换标签页",
    summary: "High-contrast tabs driven by bold flat color blocks and comic timing.",
    summaryZh: "用高对比纯色块塑造节奏感很强的漫画式标签页。",
    useCase: "Playful dashboards, toy-like interfaces, demo galleries.",
    useCaseZh: "适合玩具感后台、趣味界面和演示型画廊。",
    tags: ["playful", "comic", "flat-color"],
    tagsZh: ["趣味", "漫画感", "纯色块"],
    sourceStyleSlug: "cel-shading",
    sourceHref: "/styles/cel-shading/showcase",
    previewId: "tabs-cel-shading",
  },
  {
    id: "apple-style-segmented-tabs",
    family: "tabs",
    category: "navigation",
    name: "Segmented Soft Tabs",
    nameZh: "分段柔和标签页",
    summary: "Soft segmented control with quiet contrast and polished product feel.",
    summaryZh: "安静克制的分段式标签页，带更精致的产品气质。",
    useCase: "Product control panels, settings, app-like dashboards.",
    useCaseZh: "适合产品控制台、设置页和更应用化的仪表盘。",
    tags: ["segmented", "polished", "product"],
    tagsZh: ["分段式", "精致", "产品化"],
    sourceStyleSlug: "apple-style",
    sourceHref: "/styles/apple-style/showcase",
    previewId: "tabs-apple-style",
  },
  {
    id: "data-dense-compact-pagination",
    family: "pagination",
    category: "navigation",
    name: "Compact Data Pagination",
    nameZh: "紧凑数据分页",
    summary: "Compact pagination built for table-heavy admin interfaces.",
    summaryZh: "为数据表格场景设计的紧凑型分页控件。",
    useCase: "Operations dashboards, admin tables, dense reporting screens.",
    useCaseZh: "适合运营后台、管理表格和高密度报表界面。",
    tags: ["compact", "table", "admin"],
    tagsZh: ["紧凑", "表格", "后台"],
    sourceStyleSlug: "data-dense",
    sourceHref: "/styles/data-dense/showcase",
    previewId: "pagination-data-dense",
  },
  {
    id: "brutalist-web-plain-pagination",
    family: "pagination",
    category: "navigation",
    name: "Plain Text Pagination",
    nameZh: "纯文本分页",
    summary: "Intentionally bare pagination rendered like hypertext controls.",
    summaryZh: "故意保持朴素，像超文本链接一样呈现的分页控件。",
    useCase: "Documentation, low-decoration content systems, brutalist UI.",
    useCaseZh: "适合文档系统、低装饰内容平台和 brutalist 风格界面。",
    tags: ["plain", "text-link", "brutalist"],
    tagsZh: ["朴素", "文本链接", "粗野网页"],
    sourceStyleSlug: "brutalist-web",
    sourceHref: "/styles/brutalist-web/showcase",
    previewId: "pagination-brutalist-web",
  },
  {
    id: "sidebar-fixed-admin-nav",
    family: "sidebar-nav",
    category: "navigation",
    name: "Structured Admin Sidebar",
    nameZh: "结构化后台侧栏",
    summary: "Crisp multi-zone sidebar built for efficient enterprise navigation.",
    summaryZh: "层级清晰、分区明确的企业后台侧栏导航。",
    useCase: "B2B SaaS, admin centers, analytics workspaces.",
    useCaseZh: "适合 B2B SaaS、后台中心和分析工作区。",
    tags: ["enterprise", "structured", "sidebar"],
    tagsZh: ["企业感", "结构化", "侧栏"],
    sourceStyleSlug: "sidebar-fixed",
    sourceHref: "/styles/sidebar-fixed/showcase",
    previewId: "sidebar-nav-sidebar-fixed",
  },
  {
    id: "notion-style-editorial-nav",
    family: "sidebar-nav",
    category: "navigation",
    name: "Editorial Workspace Sidebar",
    nameZh: "编辑型工作台侧栏",
    summary: "Document-oriented sidebar with lightweight hierarchy and muted cues.",
    summaryZh: "以文档为中心的轻量侧栏，用柔和视觉提示组织层级。",
    useCase: "Knowledge bases, notes apps, content planning tools.",
    useCaseZh: "适合知识库、笔记应用和内容规划工具。",
    tags: ["editorial", "docs", "muted"],
    tagsZh: ["编辑型", "文档", "低对比"],
    sourceStyleSlug: "notion-style",
    sourceHref: "/styles/notion-style/showcase",
    previewId: "sidebar-nav-notion-style",
  },
  {
    id: "macos-vibrancy-floating-nav",
    family: "sidebar-nav",
    category: "navigation",
    name: "Floating Vibrancy Sidebar",
    nameZh: "悬浮磨砂侧栏",
    summary: "Translucent sidebar with glass blur and gentle desktop framing.",
    summaryZh: "用磨砂玻璃和柔和桌面边框打造的悬浮式侧栏。",
    useCase: "Creative tools, premium apps, desktop-inspired products.",
    useCaseZh: "适合创作工具、高级产品和桌面感界面。",
    tags: ["glass", "desktop", "premium"],
    tagsZh: ["玻璃感", "桌面感", "高级感"],
    sourceStyleSlug: "macos-vibrancy",
    sourceHref: "/styles/macos-vibrancy/showcase",
    previewId: "sidebar-nav-macos-vibrancy",
  },

  // --- Breadcrumb additions ---
  {
    id: "cyberpunk-neon-breadcrumb",
    family: "breadcrumb",
    category: "navigation",
    name: "Neon Glow Breadcrumb",
    nameZh: "霓虹发光面包屑",
    summary: "Cyberpunk breadcrumb with neon separators and electric glow on hover.",
    summaryZh: "赛博朋克风格面包屑，霓虹分隔符配上电光悬停效果。",
    useCase: "Gaming dashboards, tech product pages, futuristic admin panels.",
    useCaseZh: "适合游戏后台、科技产品页和未来感管理面板。",
    tags: ["neon", "cyberpunk", "glow"],
    tagsZh: ["霓虹", "赛博朋克", "发光"],
    sourceStyleSlug: "cyberpunk-neon",
    sourceHref: "/styles/cyberpunk-neon/showcase",
    previewId: "breadcrumb-cyberpunk",
  },
  {
    id: "ink-wash-breadcrumb",
    family: "breadcrumb",
    category: "navigation",
    name: "Ink Wash Breadcrumb",
    nameZh: "水墨面包屑",
    summary: "Calligraphic breadcrumb with brush-stroke separators and ink gradients.",
    summaryZh: "以毛笔笔触做分隔符、墨色渐变呈现的书法风面包屑。",
    useCase: "Cultural platforms, art galleries, editorial storytelling.",
    useCaseZh: "适合文化平台、艺术画廊和文艺编辑页面。",
    tags: ["calligraphy", "brush", "cultural"],
    tagsZh: ["书法", "笔触", "文化感"],
    sourceStyleSlug: "ink-wash",
    sourceHref: "/styles/ink-wash/showcase",
    previewId: "breadcrumb-ink-wash",
  },
  {
    id: "linear-style-breadcrumb",
    family: "breadcrumb",
    category: "navigation",
    name: "Linear Dot Breadcrumb",
    nameZh: "Linear 圆点面包屑",
    summary: "Clean product breadcrumb with dot separators and muted hierarchy.",
    summaryZh: "以小圆点分隔、层级柔和的产品风格面包屑。",
    useCase: "SaaS products, project tools, developer platforms.",
    useCaseZh: "适合 SaaS 产品、项目工具和开发者平台。",
    tags: ["product", "clean", "dot"],
    tagsZh: ["产品化", "干净", "圆点"],
    sourceStyleSlug: "linear-style",
    sourceHref: "/styles/linear-style/showcase",
    previewId: "breadcrumb-linear",
  },
  {
    id: "gothic-breadcrumb",
    family: "breadcrumb",
    category: "navigation",
    name: "Gothic Ornament Breadcrumb",
    nameZh: "哥特纹饰面包屑",
    summary: "Dark breadcrumb with ornamental separators and blackletter accents.",
    summaryZh: "深色背景配纹饰分隔符和哥特字体点缀的面包屑。",
    useCase: "Dark-themed sites, luxury brands, editorial magazines.",
    useCaseZh: "适合深色主题网站、奢侈品牌和杂志编辑页。",
    tags: ["ornament", "dark", "luxury"],
    tagsZh: ["纹饰", "暗色", "奢华"],
    sourceStyleSlug: "gothic",
    sourceHref: "/styles/gothic/showcase",
    previewId: "breadcrumb-gothic",
  },

  // --- Accordion additions ---
  {
    id: "liquid-glass-accordion",
    family: "accordion",
    category: "disclosure",
    name: "Liquid Glass Accordion",
    nameZh: "液态玻璃手风琴",
    summary: "Translucent frosted panels with glass refraction edges and soft blur.",
    summaryZh: "半透明磨砂面板，带玻璃折射边缘和柔和模糊效果。",
    useCase: "Premium landing pages, creative portfolios, modern product sites.",
    useCaseZh: "适合高端落地页、创意作品集和现代产品网站。",
    tags: ["glass", "translucent", "premium"],
    tagsZh: ["玻璃感", "半透明", "高端"],
    sourceStyleSlug: "liquid-glass",
    sourceHref: "/styles/liquid-glass/showcase",
    previewId: "accordion-liquid-glass",
  },
  {
    id: "sci-fi-hud-accordion",
    family: "accordion",
    category: "disclosure",
    name: "HUD Readout Accordion",
    nameZh: "HUD 读数手风琴",
    summary: "Sci-fi data readout panels with scan-line borders and terminal green accents.",
    summaryZh: "科幻数据面板风格，带扫描线边框和终端绿色点缀。",
    useCase: "Tech dashboards, monitoring tools, data-heavy interfaces.",
    useCaseZh: "适合科技仪表盘、监控工具和数据密集界面。",
    tags: ["sci-fi", "terminal", "data"],
    tagsZh: ["科幻", "终端", "数据"],
    sourceStyleSlug: "sci-fi-hud",
    sourceHref: "/styles/sci-fi-hud/showcase",
    previewId: "accordion-sci-fi-hud",
  },
  {
    id: "art-nouveau-accordion",
    family: "accordion",
    category: "disclosure",
    name: "Art Nouveau Flowing Accordion",
    nameZh: "新艺术流线手风琴",
    summary: "Organic flowing panels with vine-like borders and warm earth tones.",
    summaryZh: "带藤蔓般边框和大地暖色调的有机流线手风琴。",
    useCase: "Boutique sites, wellness brands, artisan product pages.",
    useCaseZh: "适合精品店、健康品牌和手工艺产品页面。",
    tags: ["organic", "flowing", "warm"],
    tagsZh: ["有机", "流线", "温暖"],
    sourceStyleSlug: "art-nouveau",
    sourceHref: "/styles/art-nouveau/showcase",
    previewId: "accordion-art-nouveau",
  },
  {
    id: "pop-art-accordion",
    family: "accordion",
    category: "disclosure",
    name: "Pop Art Bold Accordion",
    nameZh: "波普艺术手风琴",
    summary: "High-contrast comic panels with thick outlines and halftone dot textures.",
    summaryZh: "高对比漫画面板，粗描边配半调网点纹理。",
    useCase: "Creative agencies, youth brands, playful marketing pages.",
    useCaseZh: "适合创意机构、年轻品牌和趣味营销页面。",
    tags: ["comic", "bold", "halftone"],
    tagsZh: ["漫画", "粗犷", "半调"],
    sourceStyleSlug: "pop-art",
    sourceHref: "/styles/pop-art/showcase",
    previewId: "accordion-pop-art",
  },

  // --- Tabs additions ---
  {
    id: "holographic-shimmer-tabs",
    family: "tabs",
    category: "navigation",
    name: "Holographic Shimmer Tabs",
    nameZh: "全息光泽标签页",
    summary: "Rainbow gradient tabs with prismatic shimmer on the active state.",
    summaryZh: "带彩虹渐变和棱镜光泽激活态的全息标签页。",
    useCase: "Creative showcases, NFT galleries, futuristic product pages.",
    useCaseZh: "适合创意展示、NFT 画廊和未来感产品页。",
    tags: ["rainbow", "shimmer", "prismatic"],
    tagsZh: ["彩虹", "光泽", "棱镜"],
    sourceStyleSlug: "holographic",
    sourceHref: "/styles/holographic/showcase",
    previewId: "tabs-holographic",
  },
  {
    id: "pixel-art-tabs",
    family: "tabs",
    category: "navigation",
    name: "8-Bit Pixel Tabs",
    nameZh: "8-Bit 像素标签页",
    summary: "Retro pixel tabs with stepped borders and game-UI color palette.",
    summaryZh: "复古像素标签页，阶梯边框配游戏 UI 配色。",
    useCase: "Game interfaces, retro-themed apps, fun developer tools.",
    useCaseZh: "适合游戏界面、复古主题应用和趣味开发工具。",
    tags: ["retro", "pixel", "game"],
    tagsZh: ["复古", "像素", "游戏"],
    sourceStyleSlug: "pixel-art",
    sourceHref: "/styles/pixel-art/showcase",
    previewId: "tabs-pixel-art",
  },
  {
    id: "scandinavian-warm-tabs",
    family: "tabs",
    category: "navigation",
    name: "Scandinavian Warm Tabs",
    nameZh: "北欧暖调标签页",
    summary: "Warm muted tabs with rounded shapes and natural color palette.",
    summaryZh: "圆润造型和自然色系的温暖北欧风标签页。",
    useCase: "Lifestyle brands, furniture sites, wellness platforms.",
    useCaseZh: "适合生活方式品牌、家居网站和健康平台。",
    tags: ["warm", "rounded", "natural"],
    tagsZh: ["温暖", "圆润", "自然"],
    sourceStyleSlug: "scandinavian",
    sourceHref: "/styles/scandinavian/showcase",
    previewId: "tabs-scandinavian",
  },
  {
    id: "dark-academia-tabs",
    family: "tabs",
    category: "navigation",
    name: "Dark Academia Tabs",
    nameZh: "暗色学院标签页",
    summary: "Scholarly tabs with serif accents, muted golds, and parchment textures.",
    summaryZh: "衬线字体点缀、哑金色调和羊皮纸质感的学院风标签页。",
    useCase: "Educational platforms, library tools, scholarly publishing.",
    useCaseZh: "适合教育平台、图书馆工具和学术出版页面。",
    tags: ["scholarly", "serif", "muted-gold"],
    tagsZh: ["学院感", "衬线", "哑金"],
    sourceStyleSlug: "dark-academia",
    sourceHref: "/styles/dark-academia/showcase",
    previewId: "tabs-dark-academia",
  },

  // --- Pagination additions ---
  {
    id: "neon-tokyo-pagination",
    family: "pagination",
    category: "navigation",
    name: "Neon Tokyo Pagination",
    nameZh: "霓虹东京分页",
    summary: "Glowing neon pagination with electric borders on a dark backdrop.",
    summaryZh: "深色背景上带电光边框的霓虹分页控件。",
    useCase: "Night-mode apps, gaming platforms, entertainment dashboards.",
    useCaseZh: "适合暗色模式应用、游戏平台和娱乐仪表盘。",
    tags: ["neon", "dark", "electric"],
    tagsZh: ["霓虹", "暗色", "电光"],
    sourceStyleSlug: "neon-tokyo",
    sourceHref: "/styles/neon-tokyo/showcase",
    previewId: "pagination-neon-tokyo",
  },
  {
    id: "risograph-texture-pagination",
    family: "pagination",
    category: "navigation",
    name: "Risograph Texture Pagination",
    nameZh: "Riso 印刷分页",
    summary: "Grainy textured pagination with overlapping spot colors and print feel.",
    summaryZh: "带颗粒纹理和叠印专色的印刷感分页控件。",
    useCase: "Indie publications, zine-style sites, creative portfolios.",
    useCaseZh: "适合独立出版物、Zine 风格网站和创意作品集。",
    tags: ["grain", "print", "indie"],
    tagsZh: ["颗粒", "印刷", "独立"],
    sourceStyleSlug: "risograph",
    sourceHref: "/styles/risograph/showcase",
    previewId: "pagination-risograph",
  },
  {
    id: "japanese-fresh-pagination",
    family: "pagination",
    category: "navigation",
    name: "Fresh Soft Pagination",
    nameZh: "清新柔和分页",
    summary: "Light airy pagination with pastel accents and generous whitespace.",
    summaryZh: "大量留白配柔和色彩的清新分页控件。",
    useCase: "Lifestyle blogs, recipe sites, gentle e-commerce.",
    useCaseZh: "适合生活博客、菜谱网站和柔和风格电商。",
    tags: ["pastel", "airy", "gentle"],
    tagsZh: ["粉彩", "轻盈", "柔和"],
    sourceStyleSlug: "japanese-fresh",
    sourceHref: "/styles/japanese-fresh/showcase",
    previewId: "pagination-japanese-fresh",
  },
  {
    id: "shopify-clean-pagination",
    family: "pagination",
    category: "navigation",
    name: "Clean Commerce Pagination",
    nameZh: "简洁商务分页",
    summary: "Polished e-commerce pagination with clear affordance and product feel.",
    summaryZh: "面向电商场景的简洁分页，操作引导清晰，产品质感。",
    useCase: "Online stores, product catalogs, marketplace listings.",
    useCaseZh: "适合在线商店、产品目录和商城列表页。",
    tags: ["commerce", "polished", "clear"],
    tagsZh: ["商务", "精致", "清晰"],
    sourceStyleSlug: "shopify-clean",
    sourceHref: "/styles/shopify-clean/showcase",
    previewId: "pagination-shopify-clean",
  },

  // --- Sidebar Nav additions ---
  {
    id: "solarpunk-eco-nav",
    family: "sidebar-nav",
    category: "navigation",
    name: "Solarpunk Eco Sidebar",
    nameZh: "太阳朋克生态侧栏",
    summary: "Green-tinted sidebar with organic accents and sustainable color palette.",
    summaryZh: "绿色调侧栏，有机装饰元素配可持续色系。",
    useCase: "Sustainability platforms, green tech, environmental dashboards.",
    useCaseZh: "适合可持续平台、绿色科技和环境监测仪表盘。",
    tags: ["green", "organic", "eco"],
    tagsZh: ["绿色", "有机", "生态"],
    sourceStyleSlug: "solarpunk",
    sourceHref: "/styles/solarpunk/showcase",
    previewId: "sidebar-nav-solarpunk",
  },
  {
    id: "github-style-dev-nav",
    family: "sidebar-nav",
    category: "navigation",
    name: "Developer Sidebar",
    nameZh: "开发者侧栏",
    summary: "Monospace-accented sidebar with tight spacing and code-aware hierarchy.",
    summaryZh: "等宽字体点缀、紧凑间距和代码感层级的开发者侧栏。",
    useCase: "Developer tools, code platforms, documentation sites.",
    useCaseZh: "适合开发工具、代码平台和文档网站。",
    tags: ["monospace", "developer", "tight"],
    tagsZh: ["等宽", "开发者", "紧凑"],
    sourceStyleSlug: "github-style",
    sourceHref: "/styles/github-style/showcase",
    previewId: "sidebar-nav-github-style",
  },
  {
    id: "steampunk-panel-nav",
    family: "sidebar-nav",
    category: "navigation",
    name: "Steampunk Gauge Sidebar",
    nameZh: "蒸汽朋克仪表侧栏",
    summary: "Brass-tinted sidebar with riveted borders and mechanical gauge feel.",
    summaryZh: "黄铜色调侧栏，铆钉边框配机械仪表质感。",
    useCase: "Themed experiences, game dashboards, retro-industrial tools.",
    useCaseZh: "适合主题体验、游戏仪表盘和复古工业风工具。",
    tags: ["brass", "mechanical", "themed"],
    tagsZh: ["黄铜", "机械", "主题化"],
    sourceStyleSlug: "steampunk",
    sourceHref: "/styles/steampunk/showcase",
    previewId: "sidebar-nav-steampunk",
  },
  {
    id: "film-noir-shadow-nav",
    family: "sidebar-nav",
    category: "navigation",
    name: "Film Noir Shadow Sidebar",
    nameZh: "黑色电影侧栏",
    summary: "High-contrast sidebar with dramatic shadows and monochrome palette.",
    summaryZh: "强对比侧栏，戏剧性阴影配黑白灰色系。",
    useCase: "Photography portfolios, cinematic sites, premium dark themes.",
    useCaseZh: "适合摄影作品集、电影感网站和高端暗色主题。",
    tags: ["shadow", "monochrome", "cinematic"],
    tagsZh: ["阴影", "黑白", "电影感"],
    sourceStyleSlug: "film-noir",
    sourceHref: "/styles/film-noir/showcase",
    previewId: "sidebar-nav-film-noir",
  },
];

export function getComponentPatternFamilies(): {
  family: ComponentPatternFamily;
  count: number;
  labelEn: string;
  labelZh: string;
}[] {
  const labels: Record<ComponentPatternFamily, { labelEn: string; labelZh: string }> = {
    breadcrumb: { labelEn: "Breadcrumb", labelZh: "面包屑" },
    accordion: { labelEn: "Accordion", labelZh: "手风琴" },
    tabs: { labelEn: "Tabs", labelZh: "标签页" },
    pagination: { labelEn: "Pagination", labelZh: "分页" },
    "sidebar-nav": { labelEn: "Sidebar Nav", labelZh: "侧栏导航" },
  };

  return Object.entries(labels).map(([family, label]) => ({
    family: family as ComponentPatternFamily,
    count: componentPatterns.filter((pattern) => pattern.family === family).length,
    ...label,
  }));
}

export function getComponentPatternCategories(): {
  category: ComponentPatternCategory;
  count: number;
  labelEn: string;
  labelZh: string;
}[] {
  const labels: Record<ComponentPatternCategory, { labelEn: string; labelZh: string }> = {
    navigation: { labelEn: "Navigation", labelZh: "导航" },
    disclosure: { labelEn: "Disclosure", labelZh: "展开/折叠" },
  };

  return Object.entries(labels).map(([category, label]) => ({
    category: category as ComponentPatternCategory,
    count: componentPatterns.filter((pattern) => pattern.category === category).length,
    ...label,
  }));
}
