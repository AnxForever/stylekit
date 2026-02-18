import type { GeneratorConfig, SectionConfig, TemplateType } from "./types";

interface ScenarioSectionPatch {
  enabled?: boolean;
  content?: Record<string, string>;
}

export interface GeneratorScenarioPack {
  id: string;
  templateType: TemplateType;
  source: "builtin" | "custom";
  name: string;
  nameZh?: string;
  description: string;
  descriptionZh?: string;
  globalContent: {
    siteName: string;
    siteDescription: string;
  };
  sections: Record<string, ScenarioSectionPatch>;
}

const SCENARIO_PACKS: GeneratorScenarioPack[] = [
  {
    id: "saas-launch-landing",
    templateType: "landing",
    source: "builtin",
    name: "B2B SaaS Launch",
    nameZh: "B2B SaaS 发布页",
    description: "Enterprise launch copy with strong readability and trust language.",
    descriptionZh: "强调专业可信与可读性的企业级发布文案。",
    globalContent: {
      siteName: "FlowPilot Cloud",
      siteDescription: "Automate approvals and handoffs with audit-ready workflow automation.",
    },
    sections: {
      hero: {
        content: {
          headline: "Automate Cross-Team Operations Without Losing Control",
          subheadline:
            "FlowPilot unifies approvals, handoffs, and reporting in one secure workspace for regulated teams.",
          ctaText: "Book Demo",
          ctaSecondaryText: "View ROI",
        },
      },
      features: {
        content: {
          title: "Built for operations leaders",
          subtitle: "Ship process changes quickly while preserving governance and visibility.",
          feature1Title: "Automated Approvals",
          feature1Desc: "Policy rules route requests to the right stakeholders in seconds.",
          feature2Title: "Compliance by Default",
          feature2Desc: "SOC 2 controls, immutable logs, and audit-ready export reports.",
          feature3Title: "Live KPI Tracking",
          feature3Desc: "Monitor cycle time, bottlenecks, and SLA risks from one dashboard.",
        },
      },
      cta: {
        content: {
          title: "Roll out in weeks, not quarters",
          description: "Migration specialists help your team replace spreadsheet workflows fast.",
          buttonText: "Start Implementation Plan",
        },
      },
      footer: {
        content: {
          copyright: "2026 FlowPilot Inc. All rights reserved.",
          links: "Security, Compliance, API Docs, Pricing, Contact",
        },
      },
    },
  },
  {
    id: "ai-agent-launch-landing",
    templateType: "landing",
    source: "builtin",
    name: "AI Agent Platform",
    nameZh: "AI Agent 平台发布",
    description: "Developer-first messaging for launching AI infrastructure products.",
    descriptionZh: "面向开发者的 AI 基础设施产品发布文案。",
    globalContent: {
      siteName: "AgentForge",
      siteDescription: "Deploy reliable AI agents with observability, guardrails, and tool orchestration.",
    },
    sections: {
      hero: {
        content: {
          headline: "Production AI Agents in One Platform",
          subheadline:
            "Build, evaluate, and monitor multi-step agents with tracing, retries, and policy enforcement.",
          ctaText: "Try Sandbox",
          ctaSecondaryText: "Read Architecture Guide",
        },
      },
      features: {
        content: {
          title: "From prompt to production",
          subtitle: "Everything your team needs to ship dependable agent workflows.",
          feature1Title: "Workflow Studio",
          feature1Desc: "Compose planning, tool calls, and validation into reusable agent graphs.",
          feature2Title: "Guardrails & Policies",
          feature2Desc: "Prevent unsafe outputs with role policies and content filters.",
          feature3Title: "Evaluation Harness",
          feature3Desc: "Benchmark releases and detect quality regressions before deployment.",
        },
      },
      cta: {
        content: {
          title: "Ready for enterprise rollout",
          description: "Connect your models, tools, and internal APIs in a secure runtime.",
          buttonText: "Talk to Solutions Team",
        },
      },
    },
  },
  {
    id: "product-designer-portfolio",
    templateType: "portfolio",
    source: "builtin",
    name: "Senior Product Designer",
    nameZh: "高级产品设计师作品集",
    description: "Case-study oriented portfolio for product and UX leaders.",
    descriptionZh: "以案例驱动的产品与 UX 作品集模板。",
    globalContent: {
      siteName: "Avery Liu Portfolio",
      siteDescription: "Case studies focused on growth, retention, and enterprise operations UX.",
    },
    sections: {
      hero: {
        content: {
          name: "Avery Liu",
          title: "Senior Product Designer",
          bio: "I design enterprise workflows that turn complex operations into intuitive products.",
          ctaText: "See Case Studies",
        },
      },
      projects: {
        content: {
          title: "Selected Work",
          subtitle: "Recent projects with measurable business impact.",
          project1Title: "Invoice Recovery Funnel",
          project1Desc: "Redesigned billing recovery flow and increased paid conversion by 18%.",
          project1Tag: "Fintech",
          project2Title: "Support Ops Command Center",
          project2Desc: "Built triage workspace that reduced average response time by 32%.",
          project2Tag: "SaaS Ops",
          project3Title: "Onboarding Experiment Framework",
          project3Desc: "Launched experimentation toolkit used by six growth squads.",
          project3Tag: "Growth",
        },
      },
      about: {
        content: {
          title: "How I work",
          description:
            "I partner with PM and engineering to frame outcomes, prototype quickly, and validate through live experiments.",
          skill1: "Product Strategy",
          skill2: "Information Architecture",
          skill3: "Design Systems",
          skill4: "User Research",
        },
      },
      contact: {
        content: {
          title: "Open to strategic product roles",
          description: "Looking for teams building high-impact B2B products.",
          email: "hello@averyliu.design",
          buttonText: "Start a Conversation",
          socialLinks: "LinkedIn, Dribbble, GitHub",
        },
      },
    },
  },
  {
    id: "fullstack-engineer-portfolio",
    templateType: "portfolio",
    source: "builtin",
    name: "Full-Stack Engineer",
    nameZh: "全栈工程师作品集",
    description: "Engineering-focused portfolio with platform and architecture projects.",
    descriptionZh: "突出架构与平台建设能力的工程师作品集模板。",
    globalContent: {
      siteName: "Nora Kim Engineering",
      siteDescription: "Full-stack systems, developer tooling, and performance-led delivery.",
    },
    sections: {
      hero: {
        content: {
          name: "Nora Kim",
          title: "Staff Full-Stack Engineer",
          bio: "I build reliable web platforms and internal tooling for product teams.",
          ctaText: "Browse Projects",
        },
      },
      projects: {
        content: {
          title: "Engineering Highlights",
          subtitle: "Architecture work across SaaS, data systems, and developer experience.",
          project1Title: "Multi-Region API Gateway",
          project1Desc: "Designed failover architecture with p95 latency under 120ms.",
          project1Tag: "Backend",
          project2Title: "Design Token Compiler",
          project2Desc: "Built token pipeline used by 12 product squads across platforms.",
          project2Tag: "Frontend Platform",
          project3Title: "Observability Upgrade",
          project3Desc: "Introduced trace-first alerting and cut incident MTTR by 41%.",
          project3Tag: "SRE",
        },
      },
      about: {
        content: {
          title: "Technical strengths",
          description: "I focus on scalable architecture, observability, and fast delivery loops.",
          skill1: "TypeScript",
          skill2: "Distributed Systems",
          skill3: "Cloud Architecture",
          skill4: "Developer Experience",
        },
      },
    },
  },
  {
    id: "engineering-leadership-blog",
    templateType: "blog",
    source: "builtin",
    name: "Engineering Leadership Blog",
    nameZh: "工程管理博客",
    description: "Long-form engineering insights and architecture notes.",
    descriptionZh: "聚焦架构、交付与团队协作的长文博客模板。",
    globalContent: {
      siteName: "Systems at Scale",
      siteDescription: "Engineering leadership notes on architecture, reliability, and delivery.",
    },
    sections: {
      hero: {
        content: {
          blogName: "Systems at Scale",
          tagline: "Shipping reliable software in high-growth environments.",
          authorName: "Iris Chen",
          authorBio: "VP Engineering sharing practical lessons from product and platform teams.",
        },
      },
      posts: {
        content: {
          sectionTitle: "Latest Essays",
          post1Title: "Designing Incident Response Playbooks Teams Actually Use",
          post1Excerpt: "A framework for balancing process, ownership, and speed under pressure.",
          post1Date: "Feb 10, 2026",
          post1Category: "Reliability",
          post2Title: "Scaling Frontend Architecture Across Product Squads",
          post2Excerpt: "Patterns for ownership boundaries, shared components, and release safety.",
          post2Date: "Feb 04, 2026",
          post2Category: "Frontend Platform",
          post3Title: "Replacing Heroics with Engineering Systems",
          post3Excerpt: "A playbook for moving from reactive firefighting to predictable delivery.",
          post3Date: "Jan 29, 2026",
          post3Category: "Engineering Management",
        },
      },
      sidebar: {
        content: {
          aboutTitle: "About this publication",
          aboutText: "Practical engineering strategies for teams scaling product and platform together.",
          categories: "Architecture, Reliability, Leadership, Delivery, Tooling",
          tags: "TypeScript, SRE, Metrics, Incident Response, DX, Platform",
        },
      },
    },
  },
  {
    id: "b2b-content-blog",
    templateType: "blog",
    source: "builtin",
    name: "B2B Content Hub",
    nameZh: "B2B 内容中枢博客",
    description: "Marketing-focused editorial preset for SaaS education content.",
    descriptionZh: "面向 SaaS 增长教育内容的营销型博客预设。",
    globalContent: {
      siteName: "Growth Playbook",
      siteDescription: "Actionable GTM and product growth strategies for modern SaaS teams.",
    },
    sections: {
      hero: {
        content: {
          blogName: "Growth Playbook",
          tagline: "Acquisition, activation, and retention playbooks that scale.",
          authorName: "GrowthLab Team",
          authorBio: "A research team sharing tested strategies from B2B SaaS companies.",
        },
      },
      posts: {
        content: {
          sectionTitle: "Featured Guides",
          post1Title: "From Trial Signup to First Value in 7 Days",
          post1Excerpt: "Activation framework with in-app cues, success milestones, and lifecycle emails.",
          post1Date: "Feb 12, 2026",
          post1Category: "Activation",
          post2Title: "Product-Led Sales Handshake Blueprint",
          post2Excerpt: "Route high-intent usage signals to sales without hurting user trust.",
          post2Date: "Feb 07, 2026",
          post2Category: "PLG",
          post3Title: "Churn Interviews That Reveal Retention Gaps",
          post3Excerpt: "A question framework to uncover value perception and adoption blockers.",
          post3Date: "Jan 31, 2026",
          post3Category: "Retention",
        },
      },
      sidebar: {
        content: {
          aboutTitle: "Editorial focus",
          aboutText: "Weekly data-backed guides for PMM, growth, and product teams.",
          categories: "Acquisition, Activation, Monetization, Retention",
          tags: "PLG, Onboarding, Lifecycle, SaaS Metrics, ICP",
        },
      },
    },
  },
  {
    id: "saas-revenue-dashboard",
    templateType: "dashboard",
    source: "builtin",
    name: "SaaS Revenue Command Center",
    nameZh: "SaaS 收入驾驶舱",
    description: "Recurring revenue and funnel health preset for SaaS operators.",
    descriptionZh: "用于追踪 ARR、留存与扩张的经营分析仪表盘。",
    globalContent: {
      siteName: "Revenue Control",
      siteDescription: "Track ARR growth, retention, and expansion signals in one dashboard.",
    },
    sections: {
      sidebar: {
        content: {
          appName: "Revenue Control",
          navItems: "Overview, ARR, Retention, Expansion, Forecast, Settings",
          activeItem: "Overview",
        },
      },
      kpi: {
        content: {
          sectionTitle: "Revenue Snapshot",
          kpi1Label: "ARR",
          kpi1Value: "$12.8M",
          kpi1Change: "+14.2%",
          kpi2Label: "Net Revenue Retention",
          kpi2Value: "116%",
          kpi2Change: "+2.3%",
          kpi3Label: "Logo Churn",
          kpi3Value: "2.1%",
          kpi3Change: "-0.7%",
          kpi4Label: "Expansion Revenue",
          kpi4Value: "$1.9M",
          kpi4Change: "+18.4%",
        },
      },
      charts: {
        content: {
          chartTitle: "ARR Growth by Segment",
          chartType: "line",
          chartSummary: "Compare booked ARR against plan to surface acceleration and risk windows.",
          chartLabels: "Jan, Feb, Mar, Apr, May, Jun",
          primarySeriesLabel: "Booked ARR",
          primarySeriesValues: "8.4, 8.9, 9.6, 10.4, 11.3, 12.1",
          secondarySeriesLabel: "Plan ARR",
          secondarySeriesValues: "8.0, 8.6, 9.1, 9.8, 10.6, 11.4",
        },
      },
      table: {
        content: {
          tableTitle: "Accounts at risk this week",
          columns: "Account, CSM, Health Score, ARR, Renewal Date",
          rowCount: "6",
        },
      },
    },
  },
  {
    id: "ecommerce-ops-dashboard",
    templateType: "dashboard",
    source: "builtin",
    name: "E-commerce Operations",
    nameZh: "电商运营仪表盘",
    description: "Commerce operations preset for fulfillment and growth teams.",
    descriptionZh: "覆盖履约与增长指标的电商运营监控模板。",
    globalContent: {
      siteName: "Commerce Pulse",
      siteDescription: "Monitor orders, fulfillment, and campaign performance across channels.",
    },
    sections: {
      sidebar: {
        content: {
          appName: "Commerce Pulse",
          navItems: "Overview, Orders, Inventory, Marketing, Logistics, Settings",
          activeItem: "Overview",
        },
      },
      kpi: {
        content: {
          sectionTitle: "Daily Operations",
          kpi1Label: "Gross Sales",
          kpi1Value: "$248,420",
          kpi1Change: "+9.8%",
          kpi2Label: "Orders",
          kpi2Value: "3,812",
          kpi2Change: "+6.1%",
          kpi3Label: "Fulfillment SLA",
          kpi3Value: "97.4%",
          kpi3Change: "+1.2%",
          kpi4Label: "ROAS",
          kpi4Value: "4.3x",
          kpi4Change: "+0.4x",
        },
      },
      charts: {
        content: {
          chartTitle: "Channel Performance Trend",
          chartType: "bar",
          chartSummary: "Track weekly revenue by top channels and compare against baseline.",
          chartLabels: "Email, Search, Social, Influencer, Referral, Direct",
          primarySeriesLabel: "Revenue",
          primarySeriesValues: "82, 94, 71, 63, 57, 109",
          secondarySeriesLabel: "Baseline",
          secondarySeriesValues: "70, 80, 65, 58, 54, 90",
        },
      },
      table: {
        content: {
          tableTitle: "Orders Needing Attention",
          columns: "Order ID, Customer, Priority, Status, Updated",
          rowCount: "7",
        },
      },
    },
  },
  {
    id: "education-enrollment-landing-zh",
    templateType: "landing",
    source: "builtin",
    name: "Education Course Enrollment",
    nameZh: "在线课程招生落地页",
    description: "Enrollment-focused messaging for online education and cohort programs.",
    descriptionZh: "面向在线教育与训练营的招生转化文案预设。",
    globalContent: {
      siteName: "增长产品实战课",
      siteDescription: "8 周项目制课程，帮你系统掌握增长策略与落地执行。",
    },
    sections: {
      hero: {
        content: {
          headline: "把增长方法变成可复用的实战能力",
          subheadline: "真实案例 + 导师批改 + 项目复盘，帮你在工作中直接拿结果。",
          ctaText: "领取课程大纲",
          ctaSecondaryText: "查看往期学员成果",
        },
      },
      features: {
        content: {
          title: "课程核心亮点",
          subtitle: "围绕策略、执行、复盘三大模块，构建完整增长闭环。",
          feature1Title: "案例拆解",
          feature1Desc: "拆解 SaaS 与电商增长案例，掌握可迁移的方法框架。",
          feature2Title: "作业批改",
          feature2Desc: "导师逐条点评关键作业，确保你能把方法用起来。",
          feature3Title: "项目实战",
          feature3Desc: "以真实业务目标为导向，完成一套可落地的增长方案。",
        },
      },
      cta: {
        content: {
          title: "下一期即将开营",
          description: "限量席位，优先审核有项目背景的申请者。",
          buttonText: "立即申请试听",
        },
      },
      footer: {
        content: {
          copyright: "2026 Growth Academy. All rights reserved.",
          links: "课程介绍, 导师团队, 学员案例, 常见问题, 联系我们",
        },
      },
    },
  },
  {
    id: "indie-maker-portfolio-zh",
    templateType: "portfolio",
    source: "builtin",
    name: "Indie Maker Portfolio",
    nameZh: "独立开发者作品集",
    description: "Showcase shipped products, metrics, and product thinking for indie makers.",
    descriptionZh: "突出已上线产品、业务结果与产品思考的独立开发者作品集。",
    globalContent: {
      siteName: "林一鸣 · Indie Maker",
      siteDescription: "专注 AI 工具与效率产品，持续构建可持续增长的产品组合。",
    },
    sections: {
      hero: {
        content: {
          name: "林一鸣",
          title: "独立开发者 / 产品设计师",
          bio: "我专注打造实用型 AI 产品，用更少资源跑出可验证增长。",
          ctaText: "查看已上线产品",
        },
      },
      projects: {
        content: {
          title: "代表作品",
          subtitle: "从 0 到 1 打造并持续迭代的产品项目。",
          project1Title: "Prompt Hub",
          project1Desc: "面向运营团队的提示词管理工具，月活 1.2 万，7 日留存提升 18%。",
          project1Tag: "AI 工具",
          project2Title: "Flow Notes",
          project2Desc: "跨平台笔记与任务联动应用，完成 3 次关键体验重构。",
          project2Tag: "效率产品",
          project3Title: "Landing Sprint",
          project3Desc: "AI 驱动的落地页生成器，帮助创作者 30 分钟内完成上线。",
          project3Tag: "SaaS",
        },
      },
      about: {
        content: {
          title: "我的方法",
          description: "先定义业务目标，再做最小实现，持续通过数据反馈推进产品迭代。",
          skill1: "产品策略",
          skill2: "全栈开发",
          skill3: "增长实验",
          skill4: "体验设计",
        },
      },
      contact: {
        content: {
          title: "合作与咨询",
          description: "欢迎交流 AI 产品、增长实验与独立项目合作。",
          email: "hello@linyiming.dev",
          buttonText: "发起合作沟通",
          socialLinks: "GitHub, X, 即刻, LinkedIn",
        },
      },
    },
  },
  {
    id: "ai-product-blog-zh",
    templateType: "blog",
    source: "builtin",
    name: "AI Product Notes",
    nameZh: "AI 产品实践博客",
    description: "Chinese editorial preset for AI product building and operation insights.",
    descriptionZh: "面向 AI 产品构建与运营实践的中文内容博客预设。",
    globalContent: {
      siteName: "AI 产品实战笔记",
      siteDescription: "记录 AI 产品从想法到落地的策略、方法与复盘。",
    },
    sections: {
      hero: {
        content: {
          blogName: "AI 产品实战笔记",
          tagline: "关注真正能上线、能增长、能复用的方法。",
          authorName: "周北",
          authorBio: "连续创业者，长期实践 AI 产品设计与增长运营。",
        },
      },
      posts: {
        content: {
          sectionTitle: "最新文章",
          post1Title: "如何定义 AI 功能的最小可用版本（MLP）",
          post1Excerpt: "从用户目标、输入负担、反馈闭环三方面，快速定位可上线的首版能力。",
          post1Date: "2026-02-14",
          post1Category: "产品设计",
          post2Title: "提示词工程在真实业务中的分层策略",
          post2Excerpt: "拆解系统提示、任务提示、风格提示的职责边界与协作方式。",
          post2Date: "2026-02-09",
          post2Category: "Prompt Engineering",
          post3Title: "AI 产品上线后的质量监控指标清单",
          post3Excerpt: "从响应正确率、拒答率、回退率到人工兜底成本，建立可执行看板。",
          post3Date: "2026-02-03",
          post3Category: "运营分析",
        },
      },
      sidebar: {
        content: {
          aboutTitle: "关于这个博客",
          aboutText: "专注 AI 产品实践，不讲空洞趋势，只讲可执行方法。",
          categories: "产品策略, Prompt 设计, 工作流自动化, 增长运营",
          tags: "AI Product, RAG, Agent, Prompt, 指标体系, 增长实验",
        },
      },
      footer: {
        content: {
          copyright: "2026 AI 产品实战笔记. All rights reserved.",
          links: "首页, 文章归档, 关于作者, 订阅更新",
        },
      },
    },
  },
  {
    id: "marketing-growth-dashboard-zh",
    templateType: "dashboard",
    source: "builtin",
    name: "Marketing Growth Dashboard",
    nameZh: "增长营销仪表盘",
    description: "Campaign and funnel monitoring preset for growth and marketing teams.",
    descriptionZh: "用于追踪投放表现与转化漏斗的增长营销分析仪表盘。",
    globalContent: {
      siteName: "增长雷达",
      siteDescription: "统一追踪渠道投放、转化效率与留存质量，提升预算回报率。",
    },
    sections: {
      sidebar: {
        content: {
          appName: "增长雷达",
          navItems: "总览, 渠道投放, 转化漏斗, 留存分析, 实验中心, 设置",
          activeItem: "总览",
        },
      },
      kpi: {
        content: {
          sectionTitle: "今日关键指标",
          kpi1Label: "获客成本 CAC",
          kpi1Value: "¥138",
          kpi1Change: "-8.6%",
          kpi2Label: "注册转化率",
          kpi2Value: "12.4%",
          kpi2Change: "+1.7%",
          kpi3Label: "7 日留存",
          kpi3Value: "31.2%",
          kpi3Change: "+2.1%",
          kpi4Label: "投放 ROI",
          kpi4Value: "3.8x",
          kpi4Change: "+0.5x",
        },
      },
      charts: {
        content: {
          chartTitle: "渠道效果趋势",
          chartType: "line",
          chartSummary: "按周比较核心渠道表现，快速识别增长瓶颈与机会。",
          chartLabels: "周一, 周二, 周三, 周四, 周五, 周六",
          primarySeriesLabel: "实际转化",
          primarySeriesValues: "62, 71, 69, 83, 88, 97",
          secondarySeriesLabel: "目标转化",
          secondarySeriesValues: "58, 64, 66, 72, 78, 84",
        },
      },
      table: {
        content: {
          tableTitle: "高优先级优化项",
          columns: "实验项, 负责人, 当前状态, 预估收益, 更新时间",
          rowCount: "6",
        },
      },
      footer: {
        content: {
          copyright: "2026 Growth Radar. All rights reserved.",
          version: "v2.3.0",
        },
      },
    },
  },
];

export function getScenarioPacksByTemplate(templateType: TemplateType): GeneratorScenarioPack[] {
  return SCENARIO_PACKS.filter((pack) => pack.templateType === templateType);
}

export function getScenarioPackById(id: string): GeneratorScenarioPack | undefined {
  return SCENARIO_PACKS.find((pack) => pack.id === id);
}

export function applyScenarioPackToSections(
  sections: SectionConfig[],
  scenarioPack: GeneratorScenarioPack
): SectionConfig[] {
  return sections.map((section) => {
    const patch = scenarioPack.sections[section.id];
    if (!patch) return section;

    return {
      ...section,
      enabled: patch.enabled ?? section.enabled,
      content: {
        ...section.content,
        ...(patch.content ?? {}),
      },
    };
  });
}

export function applyScenarioPackToConfig(
  config: GeneratorConfig,
  scenarioPack: GeneratorScenarioPack
): GeneratorConfig {
  return {
    ...config,
    globalContent: {
      ...config.globalContent,
      ...scenarioPack.globalContent,
    },
    sections: applyScenarioPackToSections(config.sections, scenarioPack),
  };
}
