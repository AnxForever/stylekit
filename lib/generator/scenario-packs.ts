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
  description: string;
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
    description: "Enterprise launch copy with strong readability and trust language.",
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
    description: "Developer-first messaging for launching AI infrastructure products.",
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
    description: "Case-study oriented portfolio for product and UX leaders.",
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
    description: "Engineering-focused portfolio with platform and architecture projects.",
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
    description: "Long-form engineering insights and architecture notes.",
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
    description: "Marketing-focused editorial preset for SaaS education content.",
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
    description: "Recurring revenue and funnel health preset for SaaS operators.",
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
    description: "Commerce operations preset for fulfillment and growth teams.",
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
