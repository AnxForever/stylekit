// Knowledge Base - Landing Page Patterns
// Data converted from landing.csv

import type { LandingPattern } from "./types";
import { BM25 } from "./search";

export const landingPatterns: LandingPattern[] = [
  {
    name: "Hero + Features + CTA",
    keywords: ["hero", "hero-centric", "features", "feature-rich", "cta", "call-to-action"],
    sectionOrder: ["Hero with headline/image", "Value prop", "Key features (3-5)", "CTA section", "Footer"],
    primaryCtaPlacement: "Hero (sticky) + Bottom",
    colorStrategy: "Hero: Brand primary or vibrant. Features: Card bg #FAFAFA. CTA: Contrasting accent color",
    recommendedEffects: "Hero parallax, feature card hover lift, CTA glow on hover",
    conversionOptimization: "Deep CTA placement. Use contrasting color (at least 7:1 contrast ratio). Sticky navbar CTA.",
  },
  {
    name: "Hero + Testimonials + Features",
    keywords: ["hero", "testimonials", "social-proof", "trust", "reviews"],
    sectionOrder: ["Hero with headline", "Social proof bar", "Testimonials carousel", "Features grid", "CTA", "Footer"],
    primaryCtaPlacement: "Hero + After testimonials",
    colorStrategy: "Hero: Brand. Testimonials: Soft bg #F5F5F5. Features: White",
    recommendedEffects: "Testimonial carousel auto-play, avatar hover scale",
    conversionOptimization: "Social proof early. Show real customer names and photos. Include metrics.",
  },
  {
    name: "Product Demo Hero",
    keywords: ["demo", "product", "showcase", "interactive", "preview"],
    sectionOrder: ["Demo Hero (video/interactive)", "Features breakdown", "How it works", "Pricing", "CTA", "Footer"],
    primaryCtaPlacement: "Hero + Pricing section",
    colorStrategy: "Dark hero bg for demo visibility. Light sections below",
    recommendedEffects: "Video autoplay muted, demo interaction hints, smooth scroll",
    conversionOptimization: "Show product in action immediately. Reduce time to 'aha moment'.",
  },
  {
    name: "Minimal Single Column",
    keywords: ["minimal", "simple", "single", "column", "clean", "one-page"],
    sectionOrder: ["Hero", "Value prop", "Single feature list", "CTA", "Footer"],
    primaryCtaPlacement: "Hero + Bottom",
    colorStrategy: "Monochromatic. Single accent color for CTAs",
    recommendedEffects: "Subtle fade-in on scroll, minimal animations",
    conversionOptimization: "Reduce cognitive load. Single clear CTA. No distractions.",
  },
  {
    name: "Comparison Table",
    keywords: ["comparison", "versus", "vs", "compare", "table", "pricing"],
    sectionOrder: ["Hero", "Problem statement", "Comparison table", "Detailed features", "CTA", "Footer"],
    primaryCtaPlacement: "Comparison table (per row) + Bottom",
    colorStrategy: "Highlight 'Your Product' column. Use green for advantages",
    recommendedEffects: "Table row hover highlight, sticky table header",
    conversionOptimization: "Show clear winner. Highlight key differentiators. Use checkmarks/crosses.",
  },
  {
    name: "Lead Magnet / Opt-in",
    keywords: ["lead", "magnet", "opt-in", "email", "download", "ebook", "newsletter"],
    sectionOrder: ["Hero with form", "What you'll get", "Author/company credibility", "Testimonials", "Form repeat", "Footer"],
    primaryCtaPlacement: "Hero form + Repeated form below",
    colorStrategy: "Form: High contrast. Trust colors throughout",
    recommendedEffects: "Form field focus glow, success animation, progress indicator",
    conversionOptimization: "Minimize form fields. Show instant value. Display trust signals.",
  },
  {
    name: "Pricing Page",
    keywords: ["pricing", "plans", "tiers", "subscription", "packages"],
    sectionOrder: ["Hero headline", "Pricing tiers (3-4)", "Feature comparison", "FAQ", "CTA", "Footer"],
    primaryCtaPlacement: "Per tier + FAQ bottom",
    colorStrategy: "Highlight recommended tier. Use brand color for popular choice",
    recommendedEffects: "Tier hover scale, popular badge pulse, toggle monthly/yearly",
    conversionOptimization: "Highlight most popular. Show savings on annual. Reduce choice paralysis (3 options).",
  },
  {
    name: "Video-First Hero",
    keywords: ["video", "hero", "explainer", "watch", "play"],
    sectionOrder: ["Video Hero (autoplay or play button)", "Key benefits", "Features", "Testimonials", "CTA", "Footer"],
    primaryCtaPlacement: "Below video + Bottom",
    colorStrategy: "Dark overlay on video. Contrasting CTA below",
    recommendedEffects: "Video autoplay muted with sound icon, play button animation",
    conversionOptimization: "Keep video under 90 seconds. Add captions. Clear CTA after video.",
  },
  {
    name: "Scroll-Triggered Storytelling",
    keywords: ["scroll", "story", "storytelling", "narrative", "journey", "timeline"],
    sectionOrder: ["Opening hook", "Problem", "Journey/Solution", "Benefits", "Proof", "CTA", "Footer"],
    primaryCtaPlacement: "End of story + Sticky",
    colorStrategy: "Section color transitions. Emotional color progression",
    recommendedEffects: "Scroll-triggered animations, parallax layers, progress indicator",
    conversionOptimization: "Emotional engagement. Build narrative tension. Payoff at CTA.",
  },
  {
    name: "Waitlist / Coming Soon",
    keywords: ["waitlist", "coming", "soon", "launch", "early", "access", "beta"],
    sectionOrder: ["Hero with countdown", "Teaser features", "Email capture", "Social links", "Footer"],
    primaryCtaPlacement: "Hero email form",
    colorStrategy: "Exciting gradients. Brand tease colors",
    recommendedEffects: "Countdown timer, email success confetti, share incentive",
    conversionOptimization: "Create urgency. Offer early access benefits. Show waitlist count.",
  },
  {
    name: "Bento Grid Showcase",
    keywords: ["bento", "grid", "showcase", "cards", "features", "modern"],
    sectionOrder: ["Hero", "Bento grid features", "Social proof", "CTA", "Footer"],
    primaryCtaPlacement: "Hero + Grid CTA card + Bottom",
    colorStrategy: "Varied card backgrounds. Brand accent for CTA card",
    recommendedEffects: "Card hover effects, micro-interactions, subtle shadows",
    conversionOptimization: "Visual hierarchy in grid. Make CTA card stand out. Balance information density.",
  },
  {
    name: "SaaS Dashboard Preview",
    keywords: ["saas", "dashboard", "preview", "app", "screenshot", "demo"],
    sectionOrder: ["Hero with dashboard screenshot", "Key metrics/features", "How it works", "Integrations", "Pricing", "CTA", "Footer"],
    primaryCtaPlacement: "Hero + Pricing",
    colorStrategy: "Dark hero with bright dashboard. Trust colors below",
    recommendedEffects: "Dashboard tilt/3D effect, feature highlight animations",
    conversionOptimization: "Show real UI early. Highlight key metrics. Build trust with integrations.",
  },
  {
    name: "AI/ML Product Demo",
    keywords: ["ai", "ml", "demo", "interactive", "chat", "generate"],
    sectionOrder: ["Interactive demo hero", "Capabilities showcase", "Use cases", "Pricing/API", "Documentation link", "CTA", "Footer"],
    primaryCtaPlacement: "After demo + Pricing",
    colorStrategy: "Futuristic gradients. Purple/blue AI aesthetic",
    recommendedEffects: "Real-time demo, typing animation, glow effects",
    conversionOptimization: "Let users try immediately. Show impressive examples. Clear API/pricing info.",
  },
  {
    name: "Enterprise Sales",
    keywords: ["enterprise", "b2b", "sales", "demo", "contact", "solution"],
    sectionOrder: ["Hero with demo CTA", "Logos/trust bar", "Solution overview", "Case studies", "Security/compliance", "Contact form", "Footer"],
    primaryCtaPlacement: "Hero demo request + Contact form",
    colorStrategy: "Professional blue/navy. Trust-building colors",
    recommendedEffects: "Minimal animations. Professional feel. Smooth scrolling",
    conversionOptimization: "Lead with credibility. Show enterprise logos. Security badges prominent.",
  },
  {
    name: "Mobile App Landing",
    keywords: ["mobile", "app", "ios", "android", "download", "store"],
    sectionOrder: ["Hero with phone mockup", "App store badges", "Key features", "Screenshots carousel", "Reviews", "Download CTA", "Footer"],
    primaryCtaPlacement: "Hero badges + Bottom badges",
    colorStrategy: "Match app color scheme. Platform-appropriate badges",
    recommendedEffects: "Phone mockup animations, screenshot slider, review carousel",
    conversionOptimization: "Show app in context. Display ratings. Link to both stores.",
  },
  {
    name: "Portfolio Showcase",
    keywords: ["portfolio", "work", "projects", "case", "studies", "showcase"],
    sectionOrder: ["Hero with tagline", "Featured work grid", "About/process", "Services", "Contact", "Footer"],
    primaryCtaPlacement: "Hero + Contact section",
    colorStrategy: "Neutral base. Let work speak. Accent for CTAs",
    recommendedEffects: "Work hover effects, image zoom, smooth transitions",
    conversionOptimization: "Show best work first. Clear contact CTA. Build credibility.",
  },
  {
    name: "Event/Conference",
    keywords: ["event", "conference", "summit", "webinar", "register", "tickets"],
    sectionOrder: ["Hero with date/countdown", "Speakers grid", "Schedule/agenda", "Venue/virtual info", "Sponsors", "Register CTA", "Footer"],
    primaryCtaPlacement: "Hero sticky + After speakers + Bottom",
    colorStrategy: "Event brand colors. Urgency in CTAs",
    recommendedEffects: "Countdown animation, speaker card hovers, schedule accordion",
    conversionOptimization: "Create urgency with countdown. Show speaker credibility. Clear ticket options.",
  },
  {
    name: "Nonprofit/Cause",
    keywords: ["nonprofit", "charity", "donate", "cause", "impact", "mission"],
    sectionOrder: ["Hero with impact statement", "Mission/story", "Impact metrics", "How to help", "Testimonials", "Donate CTA", "Footer"],
    primaryCtaPlacement: "Hero + Impact section + Bottom",
    colorStrategy: "Warm, hopeful colors. Emotional imagery",
    recommendedEffects: "Impact counter animation, story reveal, donation progress",
    conversionOptimization: "Emotional connection first. Show clear impact. Easy donation flow.",
  },
  {
    name: "Local Business",
    keywords: ["local", "business", "restaurant", "store", "service", "location"],
    sectionOrder: ["Hero with location/hours", "Services/menu", "Gallery", "Reviews", "Map/contact", "Footer"],
    primaryCtaPlacement: "Hero (call/book) + Contact section",
    colorStrategy: "Warm, inviting. Local brand colors",
    recommendedEffects: "Gallery lightbox, map interactive, review slider",
    conversionOptimization: "Location prominent. Easy to call/book. Show real photos.",
  },
  {
    name: "Marketplace Listing",
    keywords: ["marketplace", "listing", "sell", "buy", "products", "shop"],
    sectionOrder: ["Search/category hero", "Featured listings", "Categories grid", "How it works", "Seller CTA", "Footer"],
    primaryCtaPlacement: "Hero search + Seller signup",
    colorStrategy: "Trust colors. Category differentiation",
    recommendedEffects: "Search suggestions, listing card hovers, category icons",
    conversionOptimization: "Search-first experience. Show variety. Build trust for transactions.",
  },
];

// Pre-built BM25 index for landing pattern search
let landingSearchIndex: BM25<LandingPattern> | null = null;

function getLandingSearchIndex(): BM25<LandingPattern> {
  if (!landingSearchIndex) {
    landingSearchIndex = new BM25(
      landingPatterns,
      (l) =>
        `${l.name} ${l.keywords.join(" ")} ${l.conversionOptimization}`
    );
  }
  return landingSearchIndex;
}

/**
 * Search landing patterns by query
 */
export function searchLandingPatterns(
  query: string,
  maxResults = 5
): LandingPattern[] {
  return getLandingSearchIndex().search(query, maxResults);
}

/**
 * Get landing pattern by name
 */
export function getLandingPatternByName(name: string): LandingPattern | undefined {
  const nameLower = name.toLowerCase();
  return landingPatterns.find((l) => l.name.toLowerCase() === nameLower);
}

/**
 * Get landing patterns by keyword
 */
export function getLandingPatternsByKeyword(keyword: string): LandingPattern[] {
  const keywordLower = keyword.toLowerCase();
  return landingPatterns.filter((l) =>
    l.keywords.some((k) => k.toLowerCase().includes(keywordLower))
  );
}

/**
 * Get all landing patterns
 */
export function getAllLandingPatterns(): LandingPattern[] {
  return landingPatterns;
}
