import { Metadata } from "next";
import { canonicalizeEnglishMetadata } from "@/lib/i18n/metadata";

export interface StyleGuide {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  history: string;
  historyEn: string;
  philosophy: string;
  philosophyEn: string;
  useCases: UseCase[];
  references: Reference[];
  influenced?: string[];
  influencedBy?: string[];
}

export interface UseCase {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  industry: string;
  screenshot?: string;
}

export interface Reference {
  title: string;
  url: string;
  type: "article" | "book" | "website" | "research";
}

/**
 * Design style history database
 * Each entry contains historical context and design philosophy documentation
 */
export const styleGuides: Record<string, StyleGuide> = {
  neumorphism: {
    name: "新拟物派设计",
    nameEn: "Neumorphism",
    slug: "neumorphism",
    description: "受软材料启发的现代 UI 设计风格，通过精妙的阴影和圆角创造温暖的交互体验",
    descriptionEn: "Modern UI design style inspired by soft materials, creating warm interactive experiences through subtle shadows and rounded corners.",
    history: "新拟物派设计在 2020 年左右由设计社区开发，作为对极简主义和玻态形态的演进。它结合了材料设计的深度原理和极简主义的清洁美学。",
    historyEn: "Neumorphism was developed by the design community around 2020 as an evolution of minimalism and glassmorphism. It combines the depth principles of Material Design with the clean aesthetics of minimalism.",
    philosophy: "拟物化与数字化的融合。设计目标是创造一个既不完全真实也不完全抽象的界面，给用户一种触觉和视觉上的满足。",
    philosophyEn: "A fusion of skeuomorphism and digitalism. The design goal is to create an interface that is neither completely realistic nor completely abstract, giving users a sense of tactile and visual satisfaction.",
    useCases: [
      {
        title: "应用仪表板",
        titleEn: "App Dashboard",
        description: "用于生产力应用和项目管理工具，创造舒适的工作环境",
        descriptionEn: "Used in productivity apps and project management tools to create comfortable work environments",
        industry: "SaaS",
      },
      {
        title: "健康与健身应用",
        titleEn: "Health & Fitness Apps",
        description: "健身追踪应用和医疗应用中创建友好的用户界面",
        descriptionEn: "Creating friendly user interfaces in fitness tracking and medical applications",
        industry: "Healthcare",
      },
    ],
    references: [
      {
        title: "Neumorphism.io 设计系统",
        url: "https://neumorphism.io",
        type: "website",
      },
      {
        title: "软 UI 设计趋势分析",
        url: "https://www.smashingmagazine.com",
        type: "article",
      },
    ],
    influencedBy: ["Material Design", "Minimalism"],
    influenced: ["Glassmorphism", "Liquid Glass"],
  },
  "minimalist-flat": {
    name: "极简扁平设计",
    nameEn: "Minimalist Flat Design",
    slug: "minimalist-flat",
    description: "去除所有装饰性元素，只保留必要的设计要素，强调功能性和清晰度",
    descriptionEn: "Remove all decorative elements and keep only essential design elements, emphasizing functionality and clarity.",
    history: "扁平设计始于 2010 年代初，作为对拟物化设计的反应。极简主义的影响源自 20 世纪中期的设计运动和瑞士设计风格的精神。",
    historyEn: "Flat design originated in the early 2010s as a reaction to skeuomorphic design. Minimalism influence comes from mid-20th century design movements and the spirit of Swiss design style.",
    philosophy: "设计即减法。每个像素都必须服务于功能，没有无谓的装饰。通过空白和精确的排版，实现最高的可读性和用户理解度。",
    philosophyEn: "Design is subtraction. Every pixel must serve a function with no gratuitous decoration. Through whitespace and precise typography, achieve maximum readability and user comprehension.",
    useCases: [
      {
        title: "科技产品网站",
        titleEn: "Tech Product Websites",
        description: "Apple、Stripe 等科技公司使用极简设计传达产品核心价值",
        descriptionEn: "Tech companies like Apple and Stripe use minimalist design to convey core product values",
        industry: "Technology",
      },
      {
        title: "企业品牌",
        titleEn: "Corporate Branding",
        description: "财务、法律和咨询公司使用以建立专业形象",
        descriptionEn: "Used by financial, legal, and consulting firms to establish professional image",
        industry: "Corporate",
      },
    ],
    references: [
      {
        title: "Dieter Rams 十项好设计原则",
        url: "https://en.wikipedia.org/wiki/Dieter_Rams",
        type: "article",
      },
      {
        title: "瑞士设计风格历史",
        url: "https://www.smashingmagazine.com",
        type: "article",
      },
    ],
    influencedBy: ["Swiss Style", "Bauhaus"],
    influenced: ["Neo-Brutalism", "Glassmorphism"],
  },
  glassmorphism: {
    name: "玻璃拟态设计",
    nameEn: "Glassmorphism",
    slug: "glassmorphism",
    description: "通过模糊透明效果和多层次叠加创造现代感的界面设计风格",
    descriptionEn: "A modern UI style that creates depth through frosted glass effects, transparency, and layered elements.",
    history: "玻璃拟态在 2020-2021 年随着 macOS Big Sur 的发布而流行。它源于 Windows Vista 的 Aero Glass 和 iOS 7 的设计，并发展成为独立的设计趋势。",
    historyEn: "Glassmorphism became popular in 2020-2021 with the release of macOS Big Sur. It evolved from Windows Vista's Aero Glass and iOS 7's design, developing into an independent design trend.",
    philosophy: "通过透明度和模糊效果创造深度和层次感，同时保持界面的现代感和轻盈感。强调背景内容与前景元素的视觉关系。",
    philosophyEn: "Create depth and hierarchy through transparency and blur effects while maintaining a modern, lightweight feel. Emphasizes the visual relationship between background content and foreground elements.",
    useCases: [
      {
        title: "SaaS 产品界面",
        titleEn: "SaaS Product Interfaces",
        description: "创造高端、现代感的产品体验",
        descriptionEn: "Creating premium, modern product experiences",
        industry: "SaaS",
      },
      {
        title: "AI 和科技产品",
        titleEn: "AI & Tech Products",
        description: "传达创新和前沿技术的感觉",
        descriptionEn: "Conveying innovation and cutting-edge technology",
        industry: "Technology",
      },
    ],
    references: [
      {
        title: "Apple Human Interface Guidelines",
        url: "https://developer.apple.com/design/human-interface-guidelines/",
        type: "website",
      },
      {
        title: "Glassmorphism CSS Generator",
        url: "https://css.glass",
        type: "website",
      },
    ],
    influencedBy: ["Neumorphism", "Material Design"],
    influenced: ["Liquid Glass"],
  },
  "neo-brutalism": {
    name: "新野兽派设计",
    nameEn: "Neo-Brutalism",
    slug: "neo-brutalism",
    description: "大胆的颜色、粗犷的边框和不对称布局，挑战传统设计规范",
    descriptionEn: "Bold colors, raw borders, and asymmetric layouts that challenge traditional design conventions.",
    history: "新野兽派设计于 2020 年代初兴起，受建筑野兽派运动启发。它是对过度精致的 UI 设计的一种反叛，强调原始、大胆和诚实的视觉表达。",
    historyEn: "Neo-brutalism emerged in the early 2020s, inspired by the architectural Brutalist movement. It's a rebellion against over-polished UI design, emphasizing raw, bold, and honest visual expression.",
    philosophy: "设计应该是诚实和大胆的，不需要隐藏或美化。通过打破常规的视觉元素创造独特的品牌识别和用户记忆点。",
    philosophyEn: "Design should be honest and bold without hiding or beautifying. Create unique brand identity and memorable user experiences through unconventional visual elements.",
    useCases: [
      {
        title: "创意工作室和代理商",
        titleEn: "Creative Studios & Agencies",
        description: "展示大胆的创意能力和独特视角",
        descriptionEn: "Showcasing bold creative capabilities and unique perspectives",
        industry: "Creative",
      },
      {
        title: "独立产品和初创公司",
        titleEn: "Indie Products & Startups",
        description: "在拥挤的市场中脱颖而出",
        descriptionEn: "Standing out in crowded markets",
        industry: "Startup",
      },
    ],
    references: [
      {
        title: "Brutalist Websites",
        url: "https://brutalistwebsites.com",
        type: "website",
      },
      {
        title: "Why Brutalism is Making a Comeback",
        url: "https://www.designweek.co.uk",
        type: "article",
      },
    ],
    influencedBy: ["Brutalist Architecture", "Punk Design"],
    influenced: ["Anti-Design Movement"],
  },
  editorial: {
    name: "编辑风格设计",
    nameEn: "Editorial Design",
    slug: "editorial",
    description: "受杂志和出版物启发的排版和布局，强调可读性和内容层次",
    descriptionEn: "Typography and layout inspired by magazines and publications, emphasizing readability and content hierarchy.",
    history: "编辑风格设计源于印刷媒体的悠久传统，特别是 20 世纪的杂志设计。数字时代使这种风格适应了网页，保留了其对排版和留白的重视。",
    historyEn: "Editorial design originates from the long tradition of print media, particularly 20th-century magazine design. The digital age adapted this style for the web while retaining its emphasis on typography and whitespace.",
    philosophy: "内容为王，设计服务于阅读。通过精心的排版、适当的留白和清晰的视觉层次引导读者注意力。",
    philosophyEn: "Content is king, design serves reading. Guide reader attention through careful typography, appropriate whitespace, and clear visual hierarchy.",
    useCases: [
      {
        title: "博客和在线杂志",
        titleEn: "Blogs & Online Magazines",
        description: "提供优质的长篇阅读体验",
        descriptionEn: "Providing premium long-form reading experiences",
        industry: "Media",
      },
      {
        title: "品牌故事和案例研究",
        titleEn: "Brand Stories & Case Studies",
        description: "通过叙事设计建立品牌连接",
        descriptionEn: "Building brand connection through narrative design",
        industry: "Marketing",
      },
    ],
    references: [
      {
        title: "Typewolf - Typography Inspiration",
        url: "https://www.typewolf.com",
        type: "website",
      },
      {
        title: "The Elements of Typographic Style",
        url: "https://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style",
        type: "book",
      },
    ],
    influencedBy: ["Swiss Typography", "Magazine Design"],
    influenced: ["Content-First Design"],
  },
  "cyber-wafuu": {
    name: "赛博和风设计",
    nameEn: "Cyber Wafuu",
    slug: "cyber-wafuu",
    description: "融合日本传统美学与赛博朋克元素的独特视觉风格",
    descriptionEn: "A unique visual style blending Japanese traditional aesthetics with cyberpunk elements.",
    history: "赛博和风是 21 世纪互联网文化的产物，融合了日本传统文化元素与科幻未来主义视觉。它反映了全球化时代中东西方文化的碰撞与融合。",
    historyEn: "Cyber Wafuu is a product of 21st-century internet culture, blending Japanese traditional cultural elements with sci-fi futuristic visuals. It reflects the collision and fusion of Eastern and Western cultures in the era of globalization.",
    philosophy: "在传统与未来之间寻找平衡。通过将古老的美学元素（如樱花、灯笼、书法）与霓虹灯、故障效果、赛博格元素结合，创造出独特的文化身份。",
    philosophyEn: "Finding balance between tradition and future. By combining ancient aesthetic elements (like cherry blossoms, lanterns, calligraphy) with neon lights, glitch effects, and cyborg elements, create a unique cultural identity.",
    useCases: [
      {
        title: "游戏和娱乐",
        titleEn: "Gaming & Entertainment",
        description: "创造独特的世界观和视觉识别",
        descriptionEn: "Creating unique worldviews and visual identity",
        industry: "Gaming",
      },
      {
        title: "潮牌和街头文化",
        titleEn: "Streetwear & Urban Culture",
        description: "吸引年轻、前卫的目标受众",
        descriptionEn: "Attracting young, avant-garde target audiences",
        industry: "Fashion",
      },
    ],
    references: [
      {
        title: "Ghost in the Shell Aesthetics",
        url: "https://www.imdb.com/title/tt0113568/",
        type: "website",
      },
      {
        title: "Japanese Cyberpunk Art Movement",
        url: "https://www.artstation.com",
        type: "website",
      },
    ],
    influencedBy: ["Cyberpunk", "Japanese Traditional Art"],
    influenced: ["Modern Anime Aesthetics"],
  },
};

/**
 * Generate SEO-optimized metadata for a style guide page
 */
export function generateStyleGuideMetadata(guide: StyleGuide): Metadata {
  const title = `${guide.nameEn} - Design Style Guide`;
  const description = guide.descriptionEn;
  const keywords = [
    guide.nameEn,
    "design style",
    "UI design",
    "design system",
    "web design",
    ...guide.references.map((r) => r.title),
  ];

  return canonicalizeEnglishMetadata({
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/en/guides/${guide.slug}`,
    },
  }, `/guides/${guide.slug}`);
}

/**
 * Generate comparison articles between two styles
 */
export function generateStyleComparison(
  style1: StyleGuide,
  style2: StyleGuide
): {
  title: string;
  description: string;
  sections: ComparisonSection[];
} {
  return {
    title: `${style1.nameEn} vs ${style2.nameEn}: Complete Comparison`,
    description: `Learn the key differences between ${style1.nameEn} and ${style2.nameEn} design styles, their use cases, and which one suits your project.`,
    sections: [
      {
        title: "Design Philosophy",
        comparison: [
          {
            label: style1.nameEn,
            content: style1.philosophyEn,
          },
          {
            label: style2.nameEn,
            content: style2.philosophyEn,
          },
        ],
      },
      {
        title: "Best Use Cases",
        comparison: [
          {
            label: style1.nameEn,
            content: style1.useCases.map((u) => u.titleEn).join(", "),
          },
          {
            label: style2.nameEn,
            content: style2.useCases.map((u) => u.titleEn).join(", "),
          },
        ],
      },
    ],
  };
}

export interface ComparisonSection {
  title: string;
  comparison: {
    label: string;
    content: string;
  }[];
}
