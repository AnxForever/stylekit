import type { AgentConsultPhase, AgentPlannerResult, AgentSuggestedOption } from "../types";

export interface EvalTurn {
  userMessage: string;
  mockPlannerResult: AgentPlannerResult;
  expectedPhase: AgentConsultPhase;
  expectedSlotsFilled?: string[];
  shouldRetrieveKnowledge?: boolean;
  shouldProduceCodePrompt?: boolean;
}

export interface EvalScenario {
  id: string;
  name: string;
  locale: "en" | "zh";
  turns: EvalTurn[];
}

const BASE_CONTEXT = {
  targetAudience: "developer" as const,
  primaryDevice: "desktop" as const,
};

const EMPTY_OPTIONS: AgentSuggestedOption[] = [];

function makePlanner(
  overrides: Partial<AgentPlannerResult>
): AgentPlannerResult {
  return {
    ready: false,
    phase: "goal",
    normalizedQuery: "",
    productType: "",
    audience: "",
    visualTone: "",
    styleSlug: "",
    mustHave: [],
    constraints: [],
    followUpQuestion: "",
    suggestedOptions: [],
    reasoning: [],
    context: {},
    ...overrides,
  };
}

export const evalScenarios: EvalScenario[] = [
  /* 1. Happy path: 5 turns through full consultation */
  {
    id: "happy-path",
    name: "Happy path (portfolio for designers)",
    locale: "en",
    turns: [
      {
        userMessage: "I want to build a portfolio site",
        mockPlannerResult: makePlanner({
          phase: "goal",
          normalizedQuery: "portfolio site",
          productType: "Portfolio",
          followUpQuestion: "Who is your target audience?",
          suggestedOptions: [
            { id: "developers", label: "Developers", description: "Engineers" },
            { id: "designers", label: "Designers", description: "Creatives" },
          ],
        }),
        expectedPhase: "goal",
        expectedSlotsFilled: ["productType"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Designers",
        mockPlannerResult: makePlanner({
          phase: "audience",
          normalizedQuery: "portfolio site for designers",
          productType: "Portfolio",
          audience: "Designers and creative professionals",
          followUpQuestion: "What visual style do you prefer?",
          suggestedOptions: [
            { id: "minimalist", label: "Minimalist", description: "Clean and simple" },
            { id: "bold", label: "Bold", description: "Strong visual impact" },
          ],
        }),
        expectedPhase: "audience",
        expectedSlotsFilled: ["productType", "audience"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "I like minimalism, clean and airy",
        mockPlannerResult: makePlanner({
          phase: "feel",
          normalizedQuery: "minimalist portfolio for designers",
          productType: "Portfolio",
          audience: "Designers and creative professionals",
          visualTone: "Minimalist, clean, airy",
          mustHave: ["Project gallery", "About section"],
          constraints: ["Keep it simple"],
          followUpQuestion: "Here's a summary of your brief. Does this look right?",
          suggestedOptions: EMPTY_OPTIONS,
        }),
        expectedPhase: "feel",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Looks good, generate!",
        mockPlannerResult: makePlanner({
          phase: "confirm",
          ready: false,
          normalizedQuery: "minimalist portfolio for designers",
          productType: "Portfolio",
          audience: "Designers and creative professionals",
          visualTone: "Minimalist, clean, airy",
          mustHave: ["Project gallery", "About section"],
          constraints: ["Keep it simple"],
          followUpQuestion: "Great! Confirm and I'll generate the prompt.",
        }),
        expectedPhase: "confirm",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Yes, go ahead",
        mockPlannerResult: makePlanner({
          phase: "done",
          ready: true,
          normalizedQuery: "minimalist portfolio for designers",
          productType: "Portfolio",
          audience: "Designers and creative professionals",
          visualTone: "Minimalist, clean, airy",
          mustHave: ["Project gallery", "About section"],
          constraints: ["Keep it simple"],
          context: { ...BASE_CONTEXT, brandMood: "minimal" },
        }),
        expectedPhase: "done",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: true,
      },
    ],
  },

  /* 2. Quick skip: user provides enough info in one message */
  {
    id: "quick-skip",
    name: "Quick skip (all info in first message)",
    locale: "en",
    turns: [
      {
        userMessage:
          "I need a minimalist SaaS landing page for developers with a clear CTA and pricing section",
        mockPlannerResult: makePlanner({
          phase: "feel",
          normalizedQuery: "minimalist saas landing page for developers",
          productType: "SaaS Landing Page",
          audience: "Developers",
          visualTone: "Minimalist",
          mustHave: ["Clear CTA", "Pricing section"],
          constraints: [],
          followUpQuestion:
            "Great, you've covered a lot! Here's the brief — does this look right?",
        }),
        expectedPhase: "feel",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Looks good, go!",
        mockPlannerResult: makePlanner({
          phase: "confirm",
          ready: false,
          normalizedQuery: "minimalist saas landing page for developers",
          productType: "SaaS Landing Page",
          audience: "Developers",
          visualTone: "Minimalist",
          mustHave: ["Clear CTA", "Pricing section"],
          followUpQuestion: "Confirm to generate.",
        }),
        expectedPhase: "confirm",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Confirm",
        mockPlannerResult: makePlanner({
          phase: "done",
          ready: true,
          normalizedQuery: "minimalist saas landing page for developers",
          productType: "SaaS Landing Page",
          audience: "Developers",
          visualTone: "Minimalist",
          mustHave: ["Clear CTA", "Pricing section"],
          context: { ...BASE_CONTEXT, brandMood: "minimal" },
        }),
        expectedPhase: "done",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: true,
      },
    ],
  },

  /* 3. Revise loop: user changes mind after confirm */
  {
    id: "revise-loop",
    name: "Revise loop (change visual direction)",
    locale: "en",
    turns: [
      {
        userMessage: "Blog site",
        mockPlannerResult: makePlanner({
          phase: "goal",
          normalizedQuery: "blog site",
          productType: "Blog",
          followUpQuestion: "Who will read your blog?",
          suggestedOptions: [
            { id: "developers", label: "Developers", description: "Tech audience" },
            { id: "consumers", label: "General Public", description: "Broad audience" },
          ],
        }),
        expectedPhase: "goal",
        expectedSlotsFilled: ["productType"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Developers and tech folks",
        mockPlannerResult: makePlanner({
          phase: "audience",
          normalizedQuery: "developer blog",
          productType: "Blog",
          audience: "Developers and tech professionals",
          followUpQuestion: "What visual style fits your blog?",
        }),
        expectedPhase: "audience",
        expectedSlotsFilled: ["productType", "audience"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Clean and editorial",
        mockPlannerResult: makePlanner({
          phase: "feel",
          normalizedQuery: "editorial developer blog",
          productType: "Blog",
          audience: "Developers and tech professionals",
          visualTone: "Editorial, clean",
          mustHave: ["Code blocks", "Table of contents"],
          constraints: ["Reading-first layout"],
          followUpQuestion: "Here's a summary. Look good?",
        }),
        expectedPhase: "feel",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Actually, I want something bolder and more playful",
        mockPlannerResult: makePlanner({
          phase: "revise",
          normalizedQuery: "bold playful developer blog",
          productType: "Blog",
          audience: "Developers and tech professionals",
          visualTone: "Bold, playful",
          mustHave: ["Code blocks", "Table of contents"],
          constraints: ["Reading-first layout"],
          followUpQuestion: "Got it — switching to a bolder direction. Updated brief below.",
        }),
        expectedPhase: "revise",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Yes, this is what I want",
        mockPlannerResult: makePlanner({
          phase: "confirm",
          ready: false,
          normalizedQuery: "bold playful developer blog",
          productType: "Blog",
          audience: "Developers and tech professionals",
          visualTone: "Bold, playful",
          mustHave: ["Code blocks", "Table of contents"],
          constraints: ["Reading-first layout"],
          followUpQuestion: "Confirm to generate your prompt.",
        }),
        expectedPhase: "confirm",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Go ahead",
        mockPlannerResult: makePlanner({
          phase: "done",
          ready: true,
          normalizedQuery: "bold playful developer blog",
          productType: "Blog",
          audience: "Developers and tech professionals",
          visualTone: "Bold, playful",
          mustHave: ["Code blocks", "Table of contents"],
          constraints: ["Reading-first layout"],
          context: { ...BASE_CONTEXT, brandMood: "bold" },
        }),
        expectedPhase: "done",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: true,
      },
    ],
  },

  /* 4. Non-substantive message: simple "OK" should not trigger heavy retrieval */
  {
    id: "non-substantive",
    name: "Non-substantive message handling",
    locale: "en",
    turns: [
      {
        userMessage: "Dashboard",
        mockPlannerResult: makePlanner({
          phase: "goal",
          normalizedQuery: "dashboard",
          productType: "Dashboard",
          followUpQuestion: "Who will use this dashboard?",
        }),
        expectedPhase: "goal",
        expectedSlotsFilled: ["productType"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "OK",
        mockPlannerResult: makePlanner({
          phase: "audience",
          normalizedQuery: "dashboard",
          productType: "Dashboard",
          audience: "Business analysts",
          followUpQuestion: "What visual tone do you want?",
        }),
        expectedPhase: "audience",
        expectedSlotsFilled: ["productType", "audience"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Professional and data-focused",
        mockPlannerResult: makePlanner({
          phase: "feel",
          normalizedQuery: "professional data dashboard",
          productType: "Dashboard",
          audience: "Business analysts",
          visualTone: "Professional, data-focused",
          mustHave: ["Charts", "KPI cards"],
          constraints: ["Information density balance"],
          followUpQuestion: "Summary ready. Confirm?",
        }),
        expectedPhase: "feel",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "sure",
        mockPlannerResult: makePlanner({
          phase: "done",
          ready: true,
          normalizedQuery: "professional data dashboard",
          productType: "Dashboard",
          audience: "Business analysts",
          visualTone: "Professional, data-focused",
          mustHave: ["Charts", "KPI cards"],
          constraints: ["Information density balance"],
          context: { ...BASE_CONTEXT, brandMood: "professional" },
        }),
        expectedPhase: "done",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: true,
      },
    ],
  },

  /* 5. Chinese locale */
  {
    id: "chinese-locale",
    name: "Chinese locale full flow",
    locale: "zh",
    turns: [
      {
        userMessage: "我想做一个个人作品集网站",
        mockPlannerResult: makePlanner({
          phase: "goal",
          normalizedQuery: "个人作品集网站",
          productType: "作品集",
          followUpQuestion: "你的目标用户是谁？",
          suggestedOptions: [
            { id: "designers", label: "设计师", description: "UI/UX 设计师" },
            { id: "developers", label: "开发者", description: "程序员" },
          ],
        }),
        expectedPhase: "goal",
        expectedSlotsFilled: ["productType"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "设计师和创意工作者",
        mockPlannerResult: makePlanner({
          phase: "audience",
          normalizedQuery: "设计师作品集",
          productType: "作品集",
          audience: "设计师和创意工作者",
          followUpQuestion: "你喜欢什么视觉风格？",
        }),
        expectedPhase: "audience",
        expectedSlotsFilled: ["productType", "audience"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "简约干净",
        mockPlannerResult: makePlanner({
          phase: "feel",
          normalizedQuery: "简约设计师作品集",
          productType: "作品集",
          audience: "设计师和创意工作者",
          visualTone: "简约、干净",
          mustHave: ["项目展示", "关于我"],
          constraints: ["保持简洁"],
          followUpQuestion: "以下是你的需求摘要，确认吗？",
        }),
        expectedPhase: "feel",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: true,
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "确认，开始生成",
        mockPlannerResult: makePlanner({
          phase: "done",
          ready: true,
          normalizedQuery: "简约设计师作品集",
          productType: "作品集",
          audience: "设计师和创意工作者",
          visualTone: "简约、干净",
          mustHave: ["项目展示", "关于我"],
          constraints: ["保持简洁"],
          context: { ...BASE_CONTEXT, brandMood: "minimal" },
        }),
        expectedPhase: "done",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldRetrieveKnowledge: false,
        shouldProduceCodePrompt: true,
      },
    ],
  },

  /* 6. Snapshot integrity: verify slots accumulate correctly */
  {
    id: "snapshot-integrity",
    name: "Slot snapshot integrity across turns",
    locale: "en",
    turns: [
      {
        userMessage: "E-commerce site",
        mockPlannerResult: makePlanner({
          phase: "goal",
          normalizedQuery: "ecommerce site",
          productType: "E-commerce",
          followUpQuestion: "Who are your customers?",
        }),
        expectedPhase: "goal",
        expectedSlotsFilled: ["productType"],
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Young fashion-conscious consumers",
        mockPlannerResult: makePlanner({
          phase: "audience",
          normalizedQuery: "fashion ecommerce for young consumers",
          productType: "E-commerce",
          audience: "Young fashion-conscious consumers",
          followUpQuestion: "What feel do you want?",
        }),
        expectedPhase: "audience",
        expectedSlotsFilled: ["productType", "audience"],
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Vibrant and trendy",
        mockPlannerResult: makePlanner({
          phase: "feel",
          normalizedQuery: "vibrant trendy fashion ecommerce",
          productType: "E-commerce",
          audience: "Young fashion-conscious consumers",
          visualTone: "Vibrant, trendy",
          mustHave: ["Product grid", "Cart", "Search"],
          constraints: ["Mobile-first"],
          followUpQuestion: "Summary ready.",
        }),
        expectedPhase: "feel",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldProduceCodePrompt: false,
      },
      {
        userMessage: "Looks good",
        mockPlannerResult: makePlanner({
          phase: "done",
          ready: true,
          normalizedQuery: "vibrant trendy fashion ecommerce",
          productType: "E-commerce",
          audience: "Young fashion-conscious consumers",
          visualTone: "Vibrant, trendy",
          mustHave: ["Product grid", "Cart", "Search"],
          constraints: ["Mobile-first"],
          context: {
            targetAudience: "consumer",
            primaryDevice: "mobile",
            brandMood: "bold",
          },
        }),
        expectedPhase: "done",
        expectedSlotsFilled: ["productType", "audience", "visualTone", "mustHave", "constraints"],
        shouldProduceCodePrompt: true,
      },
    ],
  },
];
