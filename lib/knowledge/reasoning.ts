// Knowledge Base - Reasoning Engine
// Product type -> Design decision rules
// Data converted from ui-reasoning.csv

import type { ReasoningRule, Severity } from "./types";
import { BM25 } from "./search";

export const reasoningRules: ReasoningRule[] = [
  {
    category: "SaaS (General)",
    recommendedPattern: "Hero + Features + CTA",
    stylePriority: ["Glassmorphism + Flat Design", "Soft UI Evolution", "Minimalism"],
    colorMood: "Trust blue + Accent contrast",
    typographyMood: "Professional + Hierarchy",
    keyEffects: "Subtle hover (200-250ms) + Smooth transitions",
    decisionRules: {
      if_ux_focused: "prioritize-minimalism",
      if_data_heavy: "add-glassmorphism",
      if_enterprise: "use-corporate-clean",
    },
    antiPatterns: ["Excessive animation", "Dark mode by default", "Complex gradients"],
    severity: "High",
  },
  {
    category: "Micro SaaS",
    recommendedPattern: "Minimal Single Column",
    stylePriority: ["Minimalism + Accent Pop", "Flat Design 2.0", "Playful Minimal"],
    colorMood: "Single accent + neutral base",
    typographyMood: "Friendly + Clear",
    keyEffects: "Subtle fade-in + Minimal animations",
    decisionRules: {
      if_solo_founder: "emphasize-personal-brand",
      if_niche_tool: "focus-single-feature",
      if_indie: "playful-touches-ok",
    },
    antiPatterns: ["Over-engineering", "Enterprise feel", "Feature overload"],
    severity: "High",
  },
  {
    category: "E-commerce",
    recommendedPattern: "Product Grid + Hero",
    stylePriority: ["Clean Commerce + Card Grid", "Minimalism", "Flat Design"],
    colorMood: "Trust + urgency CTA",
    typographyMood: "Clear + Scannable",
    keyEffects: "Product hover zoom + Cart animation + Quick view",
    decisionRules: {
      if_luxury: "use-editorial-whitespace",
      if_mass_market: "use-clean-grid",
      if_sale_focused: "add-urgency-elements",
    },
    antiPatterns: ["Slow loading", "Hidden prices", "Complex navigation"],
    severity: "High",
  },
  {
    category: "Fintech",
    recommendedPattern: "Hero + Trust Signals + Features",
    stylePriority: ["Trust Minimalism + Data Focus", "Glassmorphism", "Dark Mode Professional"],
    colorMood: "Trust blue/green + stability",
    typographyMood: "Professional + Numbers-friendly",
    keyEffects: "Smooth data transitions + Security indicators",
    decisionRules: {
      if_consumer: "friendly-approachable",
      if_b2b: "professional-data-dense",
      if_crypto: "dark-mode-futuristic",
    },
    antiPatterns: ["Playful elements", "Unclear data", "Missing trust signals"],
    severity: "Critical",
  },
  {
    category: "Healthcare",
    recommendedPattern: "Trust + Services + CTA",
    stylePriority: ["Calm + Accessible", "Soft UI", "Clean Medical"],
    colorMood: "Calm blue/green + clean white",
    typographyMood: "Clear + Accessible + Warm",
    keyEffects: "Gentle transitions + Progress indicators",
    decisionRules: {
      if_patient_facing: "maximum-accessibility",
      if_provider_facing: "data-dense-clean",
      if_wellness: "soft-natural-tones",
    },
    antiPatterns: ["Harsh colors", "Small text", "Complex forms"],
    severity: "Critical",
  },
  {
    category: "EdTech",
    recommendedPattern: "Hero + Course Grid + Testimonials",
    stylePriority: ["Playful + Structured", "Gamification UI", "Clean Educational"],
    colorMood: "Engaging + progress indicators",
    typographyMood: "Friendly + Readable",
    keyEffects: "Progress animations + Achievement feedback + Interactive elements",
    decisionRules: {
      if_kids: "bright-playful-gamified",
      if_professional: "clean-structured",
      if_video_based: "content-first-minimal-chrome",
    },
    antiPatterns: ["Boring design", "Hidden progress", "Complex navigation"],
    severity: "High",
  },
  {
    category: "Developer Tools",
    recommendedPattern: "Code Hero + Docs + Features",
    stylePriority: ["Dark Mode + Monospace", "Minimalism", "Terminal Aesthetic"],
    colorMood: "Dark bg + syntax highlighting",
    typographyMood: "Code-friendly + Technical",
    keyEffects: "Code highlighting + Copy feedback + Smooth scrolling docs",
    decisionRules: {
      if_api: "docs-first",
      if_cli: "terminal-aesthetic",
      if_sdk: "code-examples-prominent",
    },
    antiPatterns: ["Light mode only", "Flashy animations", "Non-monospace code"],
    severity: "High",
  },
  {
    category: "AI/ML Platform",
    recommendedPattern: "Demo Hero + Features + Use Cases",
    stylePriority: ["Futuristic + Glassmorphism", "Aurora UI", "Dark Mode AI"],
    colorMood: "Purple/blue gradients + glow effects",
    typographyMood: "Modern + Tech-forward",
    keyEffects: "Real-time demos + Typing animation + Glow/pulse effects",
    decisionRules: {
      if_chatbot: "conversation-ui-focus",
      if_api: "docs-and-pricing-prominent",
      if_enterprise: "security-trust-focus",
    },
    antiPatterns: ["Static demos", "Unclear pricing", "Over-hyped claims"],
    severity: "High",
  },
  {
    category: "Crypto/Web3",
    recommendedPattern: "Hero + Stats + Features",
    stylePriority: ["Dark Mode + Neon Accents", "Cyberpunk", "Glassmorphism"],
    colorMood: "Dark + neon purple/green",
    typographyMood: "Bold + Futuristic",
    keyEffects: "Real-time stats + Glowing elements + Particle effects",
    decisionRules: {
      if_defi: "data-dense-charts",
      if_nft: "gallery-visual-focus",
      if_dao: "community-governance-focus",
    },
    antiPatterns: ["Unreadable neon", "Missing security info", "Fake scarcity"],
    severity: "Critical",
  },
  {
    category: "Gaming",
    recommendedPattern: "Video Hero + Features + Community",
    stylePriority: ["Bold + Dark + Animated", "Cyberpunk", "Neon Brutalism"],
    colorMood: "Dark + vibrant accents",
    typographyMood: "Bold + Impact",
    keyEffects: "Video backgrounds + Hover animations + Achievement badges",
    decisionRules: {
      if_esports: "stats-leaderboard-focus",
      if_casual: "playful-accessible",
      if_mobile: "touch-optimized",
    },
    antiPatterns: ["Slow loading", "Auto-playing sound", "Inaccessible design"],
    severity: "High",
  },
  {
    category: "Social Platform",
    recommendedPattern: "Value Prop + Demo + Social Proof",
    stylePriority: ["Clean + Card Feed", "Soft UI", "Minimalism"],
    colorMood: "Brand color + neutral feed",
    typographyMood: "Friendly + Scannable",
    keyEffects: "Smooth scrolling + Like/share animations + Real-time updates",
    decisionRules: {
      if_professional: "linkedin-clean-style",
      if_casual: "friendly-playful",
      if_visual: "media-first-minimal-text",
    },
    antiPatterns: ["Cluttered feed", "Aggressive notifications", "Dark patterns"],
    severity: "High",
  },
  {
    category: "Productivity Tool",
    recommendedPattern: "Feature Hero + Use Cases",
    stylePriority: ["Minimal + Functional", "Notion-like", "Clean Utility"],
    colorMood: "Neutral + task status colors",
    typographyMood: "Clean + Readable",
    keyEffects: "Keyboard shortcuts + Smooth transitions + Quick actions",
    decisionRules: {
      if_note_taking: "notion-style-blocks",
      if_project_management: "kanban-timeline-views",
      if_calendar: "time-block-visualization",
    },
    antiPatterns: ["Slow performance", "Complex onboarding", "Feature bloat"],
    severity: "High",
  },
  {
    category: "Marketing Agency",
    recommendedPattern: "Portfolio Hero + Case Studies",
    stylePriority: ["Bold + Creative", "Editorial", "Brutalism"],
    colorMood: "Brand-forward + creative palette",
    typographyMood: "Statement + Creative",
    keyEffects: "Portfolio hover effects + Smooth page transitions + Parallax",
    decisionRules: {
      if_design_focus: "strong-visual-portfolio",
      if_tech_focus: "case-study-metrics",
      if_boutique: "personality-first",
    },
    antiPatterns: ["Generic templates", "Stock photos", "Slow portfolio loading"],
    severity: "Medium",
  },
  {
    category: "Enterprise Software",
    recommendedPattern: "Value Prop + Demo Request + Trust",
    stylePriority: ["Professional + Data-Dense", "Minimalism", "Corporate Clean"],
    colorMood: "Professional blue + corporate",
    typographyMood: "Professional + Clear",
    keyEffects: "Smooth scrolling + Subtle hovers + Demo scheduling",
    decisionRules: {
      if_crm: "integration-focus",
      if_erp: "complexity-management",
      if_security: "trust-compliance-focus",
    },
    antiPatterns: ["Playful design", "Missing enterprise features", "No demo option"],
    severity: "High",
  },
  {
    category: "Analytics Dashboard",
    recommendedPattern: "Demo Hero + Integrations + Features",
    stylePriority: ["Data-Dense + Clean Charts", "Dashboard Focus", "Dark Mode Data"],
    colorMood: "Chart colors + data visualization",
    typographyMood: "Numbers-friendly + Clear",
    keyEffects: "Real-time data updates + Chart animations + Filter transitions",
    decisionRules: {
      if_marketing: "funnel-conversion-focus",
      if_product: "user-behavior-focus",
      if_finance: "kpi-metrics-focus",
    },
    antiPatterns: ["Cluttered dashboards", "Slow data loading", "Confusing charts"],
    severity: "High",
  },
  {
    category: "Documentation",
    recommendedPattern: "Search + Categories + Quick Start",
    stylePriority: ["Clean + Readable", "Sidebar Nav", "Code Focus"],
    colorMood: "High contrast + code syntax",
    typographyMood: "Readable + Code-friendly",
    keyEffects: "Search-as-you-type + Code copy + Smooth scroll",
    decisionRules: {
      if_api: "code-examples-first",
      if_tutorial: "step-by-step-progress",
      if_reference: "search-navigation-focus",
    },
    antiPatterns: ["Poor search", "Outdated content", "No code highlighting"],
    severity: "High",
  },
  {
    category: "Event/Conference",
    recommendedPattern: "Hero + Speakers + Schedule + Tickets",
    stylePriority: ["Bold + Exciting", "Countdown", "Speaker Focus"],
    colorMood: "Event brand + urgency",
    typographyMood: "Bold + Exciting",
    keyEffects: "Countdown animation + Speaker hover + Schedule accordion",
    decisionRules: {
      if_tech: "speaker-credibility-focus",
      if_virtual: "platform-demo-focus",
      if_networking: "attendee-benefits-focus",
    },
    antiPatterns: ["Hidden pricing", "Complex registration", "Missing schedule"],
    severity: "Medium",
  },
  {
    category: "Mobile App Landing",
    recommendedPattern: "Hero + Store Badges + Screenshots + Reviews",
    stylePriority: ["Phone Mockup Focus", "Clean App Landing", "Screenshot Gallery"],
    colorMood: "Match app colors + platform badges",
    typographyMood: "Clean + App-like",
    keyEffects: "Phone mockup animations + Screenshot carousel + Rating display",
    decisionRules: {
      if_ios_focus: "apple-design-language",
      if_android_focus: "material-design-hints",
      if_cross_platform: "neutral-modern",
    },
    antiPatterns: ["Missing store links", "No screenshots", "Outdated badges"],
    severity: "High",
  },
  {
    category: "Nonprofit/Cause",
    recommendedPattern: "Impact Story + Donate + Progress",
    stylePriority: ["Warm + Human-Centered", "Storytelling", "Impact Focus"],
    colorMood: "Warm + hopeful + brand",
    typographyMood: "Warm + Readable",
    keyEffects: "Impact counter animation + Story reveal + Donation progress",
    decisionRules: {
      if_emergency: "urgency-focused",
      if_ongoing: "impact-progress-focus",
      if_community: "local-stories-focus",
    },
    antiPatterns: ["Cold corporate feel", "Hidden impact", "Complex donation"],
    severity: "Medium",
  },
  {
    category: "Portfolio (Personal)",
    recommendedPattern: "Hero + Work + Contact",
    stylePriority: ["Minimal + Personal Brand", "Creative", "One-Page"],
    colorMood: "Personal brand colors",
    typographyMood: "Personal + Professional",
    keyEffects: "Work hover effects + Smooth scroll + Contact form",
    decisionRules: {
      if_designer: "visual-portfolio-first",
      if_developer: "github-projects-focus",
      if_writer: "content-samples-focus",
    },
    antiPatterns: ["Generic template", "Too many projects", "Missing contact"],
    severity: "Low",
  },
];

// Pre-built BM25 index for reasoning search
let reasoningSearchIndex: BM25<ReasoningRule> | null = null;

function getReasoningSearchIndex(): BM25<ReasoningRule> {
  if (!reasoningSearchIndex) {
    reasoningSearchIndex = new BM25(
      reasoningRules,
      (r) =>
        `${r.category} ${r.recommendedPattern} ${r.stylePriority.join(" ")} ${r.colorMood} ${r.typographyMood}`
    );
  }
  return reasoningSearchIndex;
}

/**
 * Search reasoning rules by query
 */
export function searchReasoning(query: string, maxResults = 3): ReasoningRule[] {
  return getReasoningSearchIndex().search(query, maxResults);
}

/**
 * Get reasoning rule for a specific product category
 */
export function getReasoningForProduct(category: string): ReasoningRule | undefined {
  const categoryLower = category.toLowerCase();
  return reasoningRules.find(
    (r) => r.category.toLowerCase() === categoryLower
  );
}

/**
 * Get all reasoning rules
 */
export function getAllReasoningRules(): ReasoningRule[] {
  return reasoningRules;
}

/**
 * Apply decision rules based on context
 */
export function applyDecisionRules(
  rule: ReasoningRule,
  context: Record<string, boolean>
): string[] {
  const recommendations: string[] = [];

  for (const [condition, action] of Object.entries(rule.decisionRules)) {
    // Convert condition like "if_ux_focused" to "ux_focused"
    const contextKey = condition.replace(/^if_/, "");
    if (context[contextKey]) {
      recommendations.push(action);
    }
  }

  return recommendations;
}

/**
 * Get anti-patterns for a category
 */
export function getAntiPatterns(category: string): string[] {
  const rule = getReasoningForProduct(category);
  return rule?.antiPatterns || [];
}
