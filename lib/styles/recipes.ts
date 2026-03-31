// Style Recipe System
// Curated combinations of visual style + layout + animations for specific use cases

import { styles, type DesignStyle } from "./index";

// ============ TYPES ============

export interface StyleRecipe {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  
  // Target use case
  useCase: UseCase;
  tags: RecipeTag[];
  
  // Recipe components
  visualStyle: string;      // slug of visual style
  layout: string;           // slug of layout style
  animations?: string[];    // slugs of recommended animations
  
  // Why this combination works
  reasoning: string;
  reasoningZh: string;
  
  // Visual preview
  previewGradient?: string; // Tailwind gradient for card preview
  
  // Popularity & sorting
  featured?: boolean;
  popularity?: number;      // 0-100
}

export type UseCase = 
  | "saas-landing"
  | "saas-dashboard"
  | "ecommerce"
  | "portfolio"
  | "blog"
  | "agency"
  | "startup"
  | "enterprise"
  | "creative"
  | "personal"
  | "documentation"
  | "mobile-app";

export type RecipeTag =
  | "modern"
  | "retro"
  | "minimal"
  | "bold"
  | "elegant"
  | "playful"
  | "professional"
  | "dark"
  | "light"
  | "animated"
  | "high-conversion"
  | "developer-friendly";

// ============ RECIPE DATA ============

export const styleRecipes: StyleRecipe[] = [
  // SaaS Landing Pages
  {
    id: "saas-modern-glass",
    name: "Modern SaaS Glass",
    nameZh: "现代SaaS玻璃风",
    description: "Premium glass effects with bento grid layout. Perfect for AI/tech products.",
    descriptionZh: "高级玻璃效果搭配Bento网格布局，非常适合AI/科技产品。",
    useCase: "saas-landing",
    tags: ["modern", "elegant", "high-conversion", "animated"],
    visualStyle: "liquid-glass",
    layout: "bento-grid",
    animations: ["fade-in-up", "blur-in", "float"],
    reasoning: "Glass morphism conveys cutting-edge tech while bento grid organizes complex features elegantly. The combination creates trust and sophistication.",
    reasoningZh: "玻璃拟态传达前沿科技感，Bento网格优雅地组织复杂功能。组合创造信任感和精致感。",
    previewGradient: "from-indigo-500 via-purple-500 to-pink-500",
    featured: true,
    popularity: 95,
  },
  {
    id: "saas-stripe-minimal",
    name: "Stripe-Style Minimal",
    nameZh: "Stripe极简风格",
    description: "Clean, trustworthy design inspired by Stripe. Great for fintech and B2B.",
    descriptionZh: "受Stripe启发的简洁可信设计，非常适合金融科技和B2B产品。",
    useCase: "saas-landing",
    tags: ["minimal", "professional", "high-conversion", "light"],
    visualStyle: "stripe-style",
    layout: "hero-fullscreen",
    animations: ["fade-in", "slide-up"],
    reasoning: "Stripe's visual language has become synonymous with trust in payments and SaaS. The hero-first layout creates strong first impressions.",
    reasoningZh: "Stripe的视觉语言已成为支付和SaaS领域信任的代名词。Hero优先布局创造强烈第一印象。",
    previewGradient: "from-indigo-600 to-purple-600",
    featured: true,
    popularity: 92,
  },
  {
    id: "saas-neo-brutal",
    name: "Neo-Brutal SaaS",
    nameZh: "新野兽派SaaS",
    description: "Bold, attention-grabbing design. Stands out in crowded markets.",
    descriptionZh: "大胆、吸引眼球的设计，在竞争激烈的市场中脱颖而出。",
    useCase: "saas-landing",
    tags: ["bold", "playful", "modern", "high-conversion"],
    visualStyle: "neo-brutalist",
    layout: "asymmetric-grid",
    animations: ["bounce-in", "shake"],
    reasoning: "Neo-brutalism breaks from generic SaaS design, creating memorability. Asymmetric grid adds dynamic energy without chaos.",
    reasoningZh: "新野兽派打破通用SaaS设计，创造记忆点。不对称网格增加动感而不混乱。",
    previewGradient: "from-yellow-400 to-pink-500",
    featured: true,
    popularity: 88,
  },

  // Dashboards
  {
    id: "dashboard-warm",
    name: "Warm Dashboard",
    nameZh: "温暖仪表盘",
    description: "Comfortable, long-session dashboard design with warm tones.",
    descriptionZh: "温暖色调的舒适长时间使用仪表盘设计。",
    useCase: "saas-dashboard",
    tags: ["professional", "light", "minimal"],
    visualStyle: "warm-dashboard",
    layout: "sidebar-fixed",
    animations: ["fade-in"],
    reasoning: "Warm colors reduce eye strain for prolonged use. Fixed sidebar provides consistent navigation for power users.",
    reasoningZh: "温暖色调减少长时间使用的视觉疲劳。固定侧边栏为高频用户提供一致的导航体验。",
    previewGradient: "from-amber-100 to-orange-100",
    popularity: 85,
  },
  {
    id: "dashboard-dark-glass",
    name: "Dark Glass Dashboard",
    nameZh: "暗黑玻璃仪表盘",
    description: "Sleek dark mode with glass panels. Modern analytics feel.",
    descriptionZh: "时尚暗色模式配合玻璃面板，现代数据分析感。",
    useCase: "saas-dashboard",
    tags: ["dark", "modern", "elegant", "animated"],
    visualStyle: "glassmorphism",
    layout: "dashboard-layout",
    animations: ["fade-in", "scale-in"],
    reasoning: "Dark glass panels create depth without overwhelming data. The translucency adds sophistication to data-heavy interfaces.",
    reasoningZh: "暗色玻璃面板创造层次感而不淹没数据。透明效果为数据密集界面增添精致感。",
    previewGradient: "from-slate-800 to-slate-900",
    featured: true,
    popularity: 90,
  },

  // E-commerce
  {
    id: "ecommerce-minimal",
    name: "Minimal Commerce",
    nameZh: "极简电商",
    description: "Let products shine with minimal distractions.",
    descriptionZh: "让产品在极简背景下闪耀。",
    useCase: "ecommerce",
    tags: ["minimal", "elegant", "high-conversion", "light"],
    visualStyle: "minimalist-flat",
    layout: "masonry-flow",
    animations: ["fade-in", "zoom-in"],
    reasoning: "Minimalism removes friction from purchase decisions. Masonry layout creates Instagram-like browsing experience.",
    reasoningZh: "极简主义消除购买决策的摩擦。瀑布流布局创造类似Instagram的浏览体验。",
    previewGradient: "from-gray-100 to-white",
    popularity: 87,
  },
  {
    id: "ecommerce-luxury",
    name: "Luxury Retail",
    nameZh: "奢侈品零售",
    description: "High-end feel for premium products and fashion.",
    descriptionZh: "为高端产品和时尚品牌打造的奢华感。",
    useCase: "ecommerce",
    tags: ["elegant", "dark", "animated", "high-conversion"],
    visualStyle: "editorial",
    layout: "full-page-scroll",
    animations: ["parallax", "fade-in-up", "reveal"],
    reasoning: "Editorial typography elevates brand perception. Full-page scroll creates immersive storytelling for luxury positioning.",
    reasoningZh: "编辑风格排版提升品牌感知。全屏滚动为奢侈定位创造沉浸式叙事。",
    previewGradient: "from-stone-900 to-black",
    featured: true,
    popularity: 84,
  },

  // Portfolio
  {
    id: "portfolio-creative",
    name: "Creative Portfolio",
    nameZh: "创意作品集",
    description: "Showcase creative work with bold visual statements.",
    descriptionZh: "用大胆的视觉语言展示创意作品。",
    useCase: "portfolio",
    tags: ["creative", "bold", "animated", "dark"],
    visualStyle: "neo-brutalist-playful",
    layout: "magazine-grid",
    animations: ["stagger-children", "flip-in", "slide-in"],
    reasoning: "Playful brutalism shows personality and creative confidence. Magazine grid mimics editorial layouts for showcasing work.",
    reasoningZh: "趣味野兽派展现个性和创意自信。杂志网格模仿编辑布局来展示作品。",
    previewGradient: "from-fuchsia-500 to-cyan-500",
    popularity: 82,
  },
  {
    id: "portfolio-developer",
    name: "Developer Portfolio",
    nameZh: "开发者作品集",
    description: "Clean, code-focused design for developers and engineers.",
    descriptionZh: "为开发者和工程师设计的简洁、代码聚焦风格。",
    useCase: "portfolio",
    tags: ["minimal", "dark", "developer-friendly", "professional"],
    visualStyle: "github-style",
    layout: "timeline-vertical",
    animations: ["typewriter", "fade-in"],
    reasoning: "GitHub-style familiarity builds developer trust. Timeline layout naturally shows project history and growth.",
    reasoningZh: "GitHub风格的熟悉感建立开发者信任。时间线布局自然展示项目历史和成长。",
    previewGradient: "from-gray-900 to-gray-800",
    popularity: 86,
  },

  // Blog
  {
    id: "blog-editorial",
    name: "Editorial Blog",
    nameZh: "编辑风格博客",
    description: "Magazine-quality typography for long-form content.",
    descriptionZh: "杂志级别的排版，适合长篇内容。",
    useCase: "blog",
    tags: ["elegant", "minimal", "light", "professional"],
    visualStyle: "editorial",
    layout: "f-pattern-layout",
    animations: ["fade-in"],
    reasoning: "Editorial typography optimizes reading experience. F-pattern follows natural eye movement for article scanning.",
    reasoningZh: "编辑风格排版优化阅读体验。F型布局遵循自然视线移动便于文章浏览。",
    previewGradient: "from-stone-100 to-stone-50",
    featured: true,
    popularity: 89,
  },
  {
    id: "blog-notion",
    name: "Notion-Style Blog",
    nameZh: "Notion风格博客",
    description: "Clean, distraction-free writing experience.",
    descriptionZh: "简洁无干扰的写作体验。",
    useCase: "blog",
    tags: ["minimal", "light", "developer-friendly"],
    visualStyle: "notion-style",
    layout: "holy-grail-layout",
    animations: ["fade-in"],
    reasoning: "Notion's clean aesthetic has become the standard for modern note-taking. Holy grail layout provides ideal reading width with navigation.",
    reasoningZh: "Notion的简洁美学已成为现代笔记应用的标准。圣杯布局提供理想阅读宽度和导航。",
    previewGradient: "from-white to-gray-50",
    popularity: 88,
  },

  // Agency & Startup
  {
    id: "agency-bold",
    name: "Bold Agency",
    nameZh: "大胆代理商",
    description: "Make a statement with bold typography and animations.",
    descriptionZh: "用大胆的排版和动画做出声明。",
    useCase: "agency",
    tags: ["bold", "animated", "dark", "creative"],
    visualStyle: "geometric-bold",
    layout: "parallax-sections",
    animations: ["parallax", "reveal", "magnetic"],
    reasoning: "Bold geometry commands attention and shows design confidence. Parallax creates immersive storytelling for agency capabilities.",
    reasoningZh: "大胆几何吸引注意力展示设计自信。视差滚动为代理商能力创造沉浸式叙事。",
    previewGradient: "from-violet-600 to-indigo-600",
    featured: true,
    popularity: 83,
  },
  {
    id: "startup-energetic",
    name: "Energetic Startup",
    nameZh: "活力初创",
    description: "Dynamic, growth-focused design for early-stage startups.",
    descriptionZh: "为早期初创企业设计的动态、增长聚焦风格。",
    useCase: "startup",
    tags: ["modern", "playful", "animated", "high-conversion"],
    visualStyle: "dopamine-design",
    layout: "split-screen",
    animations: ["bounce-in", "wiggle", "confetti"],
    reasoning: "Dopamine design creates excitement and energy. Split screen allows showing product + benefits simultaneously.",
    reasoningZh: "多巴胺设计创造兴奋感和活力。分屏布局允许同时展示产品和优势。",
    previewGradient: "from-orange-400 to-pink-500",
    popularity: 81,
  },

  // Documentation
  {
    id: "docs-linear",
    name: "Linear-Style Docs",
    nameZh: "Linear风格文档",
    description: "Modern, beautiful documentation that developers love.",
    descriptionZh: "开发者喜爱的现代美观文档。",
    useCase: "documentation",
    tags: ["minimal", "dark", "developer-friendly", "professional"],
    visualStyle: "linear-style",
    layout: "sidebar-fixed",
    animations: ["fade-in"],
    reasoning: "Linear's documentation has set the standard for developer experience. Fixed sidebar enables quick navigation through complex docs.",
    reasoningZh: "Linear的文档已成为开发者体验的标准。固定侧边栏便于在复杂文档中快速导航。",
    previewGradient: "from-slate-900 to-purple-950",
    featured: true,
    popularity: 91,
  },

  // Retro & Creative
  {
    id: "retro-vaporwave",
    name: "Vaporwave Aesthetic",
    nameZh: "蒸汽波美学",
    description: "90s internet nostalgia for creative projects.",
    descriptionZh: "90年代互联网怀旧风，适合创意项目。",
    useCase: "creative",
    tags: ["retro", "creative", "bold", "animated"],
    visualStyle: "vaporwave",
    layout: "card-stack",
    animations: ["glitch", "vhs-distortion", "float"],
    reasoning: "Vaporwave creates instant visual identity through nostalgia. Card stack adds playful depth to the surreal aesthetic.",
    reasoningZh: "蒸汽波通过怀旧创造即时视觉识别。卡片堆叠为超现实美学增添趣味层次。",
    previewGradient: "from-pink-400 via-purple-400 to-cyan-400",
    popularity: 79,
  },
  {
    id: "retro-pixel",
    name: "Pixel Art Style",
    nameZh: "像素艺术风格",
    description: "8-bit charm for games and nostalgic projects.",
    descriptionZh: "8位像素魅力，适合游戏和怀旧项目。",
    useCase: "creative",
    tags: ["retro", "playful", "creative"],
    visualStyle: "pixel-art",
    layout: "bento-grid",
    animations: ["pixel-fade", "bounce"],
    reasoning: "Pixel art triggers gaming nostalgia and stands out from polished designs. Bento grid organizes content while maintaining retro feel.",
    reasoningZh: "像素艺术触发游戏怀旧情绪，从精致设计中脱颖而出。Bento网格在保持复古感的同时组织内容。",
    previewGradient: "from-green-400 to-blue-500",
    popularity: 77,
  },

  // Japanese Aesthetics
  {
    id: "japanese-zen",
    name: "Zen Minimal",
    nameZh: "禅意极简",
    description: "Japanese-inspired calm and space.",
    descriptionZh: "日式禅意的平静与留白。",
    useCase: "personal",
    tags: ["minimal", "elegant", "light"],
    visualStyle: "zen-garden",
    layout: "full-page-scroll",
    animations: ["fade-in", "breathe"],
    reasoning: "Zen aesthetics create calm and focus. Full-page scroll allows contemplative pacing through content.",
    reasoningZh: "禅宗美学创造平静和专注。全屏滚动允许沉思式的内容节奏。",
    previewGradient: "from-stone-200 to-stone-100",
    popularity: 80,
  },
  {
    id: "japanese-cyber",
    name: "Cyber Wafuu",
    nameZh: "赛博和风",
    description: "Fusion of Japanese tradition and cyberpunk.",
    descriptionZh: "日本传统与赛博朋克的融合。",
    useCase: "creative",
    tags: ["creative", "dark", "animated", "bold"],
    visualStyle: "cyber-wafuu",
    layout: "asymmetric-grid",
    animations: ["glitch", "neon-pulse", "reveal"],
    reasoning: "Cyber wafuu creates unique visual identity through cultural fusion. Asymmetric grid adds dynamic tension to the aesthetic.",
    reasoningZh: "赛博和风通过文化融合创造独特视觉识别。不对称网格为美学增添动态张力。",
    previewGradient: "from-red-600 via-black to-cyan-500",
    popularity: 78,
  },
];

// ============ HELPER FUNCTIONS ============

/**
 * Get all recipes
 */
export function getAllRecipes(): StyleRecipe[] {
  return styleRecipes;
}

/**
 * Get recipes by use case
 */
export function getRecipesByUseCase(useCase: UseCase): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.useCase === useCase)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get featured recipes
 */
export function getFeaturedRecipes(): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.featured)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get recipes by tag
 */
export function getRecipesByTag(tag: RecipeTag): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.tags.includes(tag))
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get recipe by ID
 */
export function getRecipeById(id: string): StyleRecipe | undefined {
  return styleRecipes.find((r) => r.id === id);
}

/**
 * Get recipes that use a specific visual style
 */
export function getRecipesByVisualStyle(styleSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.visualStyle === styleSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get recipes that use a specific layout
 */
export function getRecipesByLayout(layoutSlug: string): StyleRecipe[] {
  return styleRecipes
    .filter((r) => r.layout === layoutSlug)
    .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

/**
 * Get the full style objects for a recipe
 */
export function resolveRecipeStyles(recipe: StyleRecipe): {
  visual: DesignStyle | undefined;
  layout: DesignStyle | undefined;
} {
  return {
    visual: styles.find((s) => s.slug === recipe.visualStyle),
    layout: styles.find((s) => s.slug === recipe.layout),
  };
}

/**
 * Validate that a recipe's referenced styles exist
 */
export function validateRecipe(recipe: StyleRecipe): {
  valid: boolean;
  missingVisual: boolean;
  missingLayout: boolean;
  missingAnimations: string[];
} {
  const visualExists = styles.some((s) => s.slug === recipe.visualStyle);
  const layoutExists = styles.some((s) => s.slug === recipe.layout);
  const missingAnimations = (recipe.animations || []).filter(
    (anim) => !styles.some((s) => s.slug === anim)
  );

  return {
    valid: visualExists && layoutExists && missingAnimations.length === 0,
    missingVisual: !visualExists,
    missingLayout: !layoutExists,
    missingAnimations,
  };
}

/**
 * Get only valid recipes (with existing style references)
 */
export function getValidRecipes(): StyleRecipe[] {
  return styleRecipes.filter((recipe) => {
    const validation = validateRecipe(recipe);
    return validation.valid || (!validation.missingVisual && !validation.missingLayout);
  });
}

/**
 * Search recipes by query
 */
export function searchRecipes(query: string, maxResults = 10): StyleRecipe[] {
  const lowerQuery = query.toLowerCase();
  
  return styleRecipes
    .map((recipe) => {
      let score = 0;
      
      // Name match
      if (recipe.name.toLowerCase().includes(lowerQuery)) score += 10;
      if (recipe.nameZh.includes(query)) score += 10;
      
      // Description match
      if (recipe.description.toLowerCase().includes(lowerQuery)) score += 5;
      if (recipe.descriptionZh.includes(query)) score += 5;
      
      // Use case match
      if (recipe.useCase.includes(lowerQuery)) score += 8;
      
      // Tag match
      recipe.tags.forEach((tag) => {
        if (tag.includes(lowerQuery)) score += 3;
      });
      
      // Style match
      if (recipe.visualStyle.includes(lowerQuery)) score += 6;
      if (recipe.layout.includes(lowerQuery)) score += 6;
      
      // Boost featured
      if (recipe.featured) score += 2;
      
      return { recipe, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.recipe);
}

/**
 * Get all use cases
 */
export function getAllUseCases(): { id: UseCase; label: string; labelZh: string }[] {
  return [
    { id: "saas-landing", label: "SaaS Landing Page", labelZh: "SaaS落地页" },
    { id: "saas-dashboard", label: "SaaS Dashboard", labelZh: "SaaS仪表盘" },
    { id: "ecommerce", label: "E-commerce", labelZh: "电子商务" },
    { id: "portfolio", label: "Portfolio", labelZh: "作品集" },
    { id: "blog", label: "Blog", labelZh: "博客" },
    { id: "agency", label: "Agency", labelZh: "代理商/工作室" },
    { id: "startup", label: "Startup", labelZh: "初创公司" },
    { id: "enterprise", label: "Enterprise", labelZh: "企业官网" },
    { id: "creative", label: "Creative Project", labelZh: "创意项目" },
    { id: "personal", label: "Personal Website", labelZh: "个人网站" },
    { id: "documentation", label: "Documentation", labelZh: "文档网站" },
    { id: "mobile-app", label: "Mobile App Landing", labelZh: "移动应用落地页" },
  ];
}

/**
 * Get all tags
 */
export function getAllRecipeTags(): { id: RecipeTag; label: string; labelZh: string }[] {
  return [
    { id: "modern", label: "Modern", labelZh: "现代" },
    { id: "retro", label: "Retro", labelZh: "复古" },
    { id: "minimal", label: "Minimal", labelZh: "极简" },
    { id: "bold", label: "Bold", labelZh: "大胆" },
    { id: "elegant", label: "Elegant", labelZh: "优雅" },
    { id: "playful", label: "Playful", labelZh: "趣味" },
    { id: "professional", label: "Professional", labelZh: "专业" },
    { id: "dark", label: "Dark Mode", labelZh: "暗色" },
    { id: "light", label: "Light Mode", labelZh: "亮色" },
    { id: "animated", label: "Animated", labelZh: "动画丰富" },
    { id: "high-conversion", label: "High Conversion", labelZh: "高转化" },
    { id: "developer-friendly", label: "Developer Friendly", labelZh: "开发者友好" },
  ];
}
