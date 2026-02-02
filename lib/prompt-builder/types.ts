// Prompt Builder - Type definitions
// Enhanced with v0 three-element framework

export type PageType = "landing" | "dashboard" | "blog" | "form" | "list";
export type TechStack = "nextjs" | "react" | "vue" | "vanilla";
export type CompLib = "shadcn" | "radix" | "headless" | "none";
export type InteractionLevel = "minimal" | "standard" | "rich";

// v0 Framework: Target Audience
export type TargetAudience =
  | "consumer"     // B2C 消费者
  | "enterprise"   // B2B 企业用户
  | "developer"    // 开发者
  | "creative"     // 创意工作者
  | "general";     // 通用

// v0 Framework: Brand Mood
export type BrandMood =
  | "professional"  // 专业稳重
  | "playful"       // 活泼有趣
  | "luxurious"     // 高端奢华
  | "minimal"       // 极简现代
  | "bold"          // 大胆前卫
  | "friendly"      // 亲切友好
  | "trustworthy";  // 可信赖

// v0 Framework: Design Priority
export type DesignPriority =
  | "conversion"     // 转化优先
  | "readability"    // 可读性优先
  | "visual-impact"  // 视觉冲击优先
  | "accessibility"  // 无障碍优先
  | "performance";   // 性能优先

export interface PromptConfig {
  style: string;
  pageType: PageType;
  techStack: TechStack;
  componentLib: CompLib;
  interactionLevel: InteractionLevel;
  includeTokens: boolean;
  includeExamples: boolean;
  includeUIPlan: boolean;
  archetypeId?: string;

  // Knowledge-based options
  productType?: string;
  includeUXGuidelines?: boolean;
  includeStackGuidelines?: boolean;

  // === v0 Three-Element Framework ===

  // 1. Product Surface (产品表面)
  productSurface?: {
    /** 具体功能需求 */
    features?: string[];
    /** 数据展示类型 */
    dataTypes?: string[];
    /** 核心用户操作 */
    userActions?: string[];
  };

  // 2. Context of Use (使用场景)
  contextOfUse?: {
    /** 目标受众 */
    targetAudience?: TargetAudience;
    /** 使用场景 */
    useCase?: string;
    /** 用户决策点 */
    userDecisions?: string[];
    /** 设备优先 */
    devicePriority?: "mobile" | "desktop" | "both";
  };

  // 3. Constraints & Taste (约束与品味)
  constraints?: {
    /** 品牌调性 */
    brandMood?: BrandMood;
    /** 设计优先级 */
    designPriority?: DesignPriority;
    /** 必须包含的元素 */
    mustHave?: string[];
    /** 禁止包含的元素 */
    mustNotHave?: string[];
    /** 参考风格/网站 */
    references?: string[];
  };

  // Gradient options
  includeGradients?: boolean;
  gradientCategory?: string;
}

export const PAGE_TYPE_OPTIONS: { value: PageType; labelZh: string; labelEn: string }[] = [
  { value: "landing", labelZh: "着陆页", labelEn: "Landing Page" },
  { value: "dashboard", labelZh: "仪表盘", labelEn: "Dashboard" },
  { value: "blog", labelZh: "博客", labelEn: "Blog" },
  { value: "form", labelZh: "表单页", labelEn: "Form Page" },
  { value: "list", labelZh: "列表页", labelEn: "List Page" },
];

export const TECH_STACK_OPTIONS: { value: TechStack; labelZh: string; labelEn: string }[] = [
  { value: "nextjs", labelZh: "Next.js + App Router", labelEn: "Next.js + App Router" },
  { value: "react", labelZh: "React + Vite", labelEn: "React + Vite" },
  { value: "vue", labelZh: "Vue 3 + Vite", labelEn: "Vue 3 + Vite" },
  { value: "vanilla", labelZh: "原生 HTML/CSS", labelEn: "Vanilla HTML/CSS" },
];

export const COMP_LIB_OPTIONS: { value: CompLib; labelZh: string; labelEn: string }[] = [
  { value: "shadcn", labelZh: "shadcn/ui", labelEn: "shadcn/ui" },
  { value: "radix", labelZh: "Radix UI", labelEn: "Radix UI" },
  { value: "headless", labelZh: "Headless UI", labelEn: "Headless UI" },
  { value: "none", labelZh: "无组件库", labelEn: "No Library" },
];

export const INTERACTION_OPTIONS: { value: InteractionLevel; labelZh: string; labelEn: string }[] = [
  { value: "minimal", labelZh: "极简", labelEn: "Minimal" },
  { value: "standard", labelZh: "标准", labelEn: "Standard" },
  { value: "rich", labelZh: "丰富", labelEn: "Rich" },
];

// v0 Framework Options
export const TARGET_AUDIENCE_OPTIONS: { value: TargetAudience; labelZh: string; labelEn: string }[] = [
  { value: "consumer", labelZh: "消费者 (B2C)", labelEn: "Consumer (B2C)" },
  { value: "enterprise", labelZh: "企业用户 (B2B)", labelEn: "Enterprise (B2B)" },
  { value: "developer", labelZh: "开发者", labelEn: "Developer" },
  { value: "creative", labelZh: "创意工作者", labelEn: "Creative" },
  { value: "general", labelZh: "通用", labelEn: "General" },
];

export const BRAND_MOOD_OPTIONS: { value: BrandMood; labelZh: string; labelEn: string; description: string }[] = [
  { value: "professional", labelZh: "专业稳重", labelEn: "Professional", description: "适合 B2B、金融、法律" },
  { value: "playful", labelZh: "活泼有趣", labelEn: "Playful", description: "适合社交、游戏、儿童" },
  { value: "luxurious", labelZh: "高端奢华", labelEn: "Luxurious", description: "适合奢侈品、高端服务" },
  { value: "minimal", labelZh: "极简现代", labelEn: "Minimal", description: "适合科技、工具、效率" },
  { value: "bold", labelZh: "大胆前卫", labelEn: "Bold", description: "适合创意、艺术、潮流" },
  { value: "friendly", labelZh: "亲切友好", labelEn: "Friendly", description: "适合社区、教育、健康" },
  { value: "trustworthy", labelZh: "可信赖", labelEn: "Trustworthy", description: "适合医疗、政府、安全" },
];

export const DESIGN_PRIORITY_OPTIONS: { value: DesignPriority; labelZh: string; labelEn: string }[] = [
  { value: "conversion", labelZh: "转化优先", labelEn: "Conversion First" },
  { value: "readability", labelZh: "可读性优先", labelEn: "Readability First" },
  { value: "visual-impact", labelZh: "视觉冲击优先", labelEn: "Visual Impact First" },
  { value: "accessibility", labelZh: "无障碍优先", labelEn: "Accessibility First" },
  { value: "performance", labelZh: "性能优先", labelEn: "Performance First" },
];
