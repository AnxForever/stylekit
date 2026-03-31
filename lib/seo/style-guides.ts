import { Metadata } from "next";

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
};

/**
 * Generate SEO-optimized metadata for a style guide page
 */
export function generateStyleGuideMetadata(guide: StyleGuide): Metadata {
  const title = `${guide.nameEn} - Design Style Guide | StyleKit`;
  const description = guide.descriptionEn;
  const keywords = [
    guide.nameEn,
    "design style",
    "UI design",
    "design system",
    "web design",
    ...guide.references.map((r) => r.title),
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/guides/${guide.slug}`,
    },
    alternates: {
      languages: {
        "zh-CN": `/zh/guides/${guide.slug}`,
        "en-US": `/en/guides/${guide.slug}`,
      },
    },
  };
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
