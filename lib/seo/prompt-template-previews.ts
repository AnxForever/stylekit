export interface PromptTemplatePreview {
  templateId: string;
  name: string;
  description: string;
  href: string;
  styleSlug: string;
}

export const uiPromptTemplates: PromptTemplatePreview[] = [
  {
    templateId: "saas-landing",
    name: "SaaS Landing Page",
    description: "A reliable starting point for product-led marketing websites and feature-driven UI prompts.",
    href: "/templates/saas-landing",
    styleSlug: "stripe-style",
  },
  {
    templateId: "docs-site",
    name: "Documentation Site",
    description: "Useful for prompts that need navigation density, code blocks, and docs-style hierarchy.",
    href: "/templates/docs-site",
    styleSlug: "notion-style",
  },
  {
    templateId: "minimalist-portfolio",
    name: "Minimalist Portfolio",
    description: "A clean base for portfolio prompts, case-study layouts, and service-led websites.",
    href: "/templates/minimalist-portfolio",
    styleSlug: "minimalist-flat",
  },
  {
    templateId: "dashboard-charts",
    name: "Dashboard with Charts",
    description: "Helpful when a prompt needs KPI cards, charts, and a more product-like interface.",
    href: "/templates/dashboard-charts",
    styleSlug: "material-design",
  },
];

export const landingPageTemplates: PromptTemplatePreview[] = [
  {
    templateId: "saas-landing",
    name: "SaaS Landing Page",
    description: "A strong baseline for hero, feature, pricing, FAQ, and CTA flow.",
    href: "/templates/saas-landing",
    styleSlug: "stripe-style",
  },
  {
    templateId: "startup-landing",
    name: "Startup Landing Page",
    description: "Useful for launch energy, waitlist flows, and dark gradient product storytelling.",
    href: "/templates/startup-landing",
    styleSlug: "modern-gradient",
  },
  {
    templateId: "glass-landing",
    name: "Glass Landing Page",
    description: "Great when the prompt needs layered cards, translucency, and a softer tech feel.",
    href: "/templates/glass-landing",
    styleSlug: "glassmorphism",
  },
  {
    templateId: "brutal-landing",
    name: "Brutal Landing Page",
    description: "A sharper choice for brand-heavy launches that need stronger visual signature.",
    href: "/templates/brutal-landing",
    styleSlug: "neo-brutalist",
  },
];

export const dashboardTemplates: PromptTemplatePreview[] = [
  {
    templateId: "warm-dashboard",
    name: "Warm Dashboard",
    description: "Useful for calmer analytics surfaces without losing hierarchy or density control.",
    href: "/templates/warm-dashboard",
    styleSlug: "warm-dashboard",
  },
  {
    templateId: "dashboard-charts",
    name: "Dashboard with Charts",
    description: "A straightforward base for KPI cards, trend charts, and reporting views.",
    href: "/templates/dashboard-charts",
    styleSlug: "material-design",
  },
  {
    templateId: "calendar-schedule",
    name: "Calendar Schedule",
    description: "Helpful when prompts need filters, calendars, detail panels, and operator workflows.",
    href: "/templates/calendar-schedule",
    styleSlug: "material-design",
  },
  {
    templateId: "fitness-health",
    name: "Fitness Dashboard",
    description: "A more energetic dashboard preview for KPI cards, progress visuals, and activity views.",
    href: "/templates/fitness-health",
    styleSlug: "neon-gradient",
  },
];

export const tailwindUiTemplates: PromptTemplatePreview[] = [
  {
    templateId: "shadcn-analytics",
    name: "Shadcn Analytics",
    description: "A strong base for Tailwind + shadcn/ui dashboards, cards, filters, and KPI-heavy layouts.",
    href: "/templates/shadcn-analytics",
    styleSlug: "corporate-clean",
  },
  {
    templateId: "docs-site",
    name: "Documentation Site",
    description: "Useful for developer docs, sidebar navigation, content hierarchy, and utility-first content layouts.",
    href: "/templates/docs-site",
    styleSlug: "notion-style",
  },
  {
    templateId: "saas-landing",
    name: "SaaS Landing Page",
    description: "Helpful for Tailwind marketing pages with clean section rhythm, CTA hierarchy, and responsive spacing.",
    href: "/templates/saas-landing",
    styleSlug: "stripe-style",
  },
  {
    templateId: "file-manager",
    name: "File Manager App",
    description: "A practical app-shell reference for tables, list-detail panels, toolbars, and denser Tailwind patterns.",
    href: "/templates/file-manager",
    styleSlug: "github-style",
  },
];

export const darkModeTemplates: PromptTemplatePreview[] = [
  {
    templateId: "shadcn-analytics",
    name: "Dark Analytics Dashboard",
    description: "Good for dark SaaS analytics prompts with KPI density, charts, and restrained accent color use.",
    href: "/templates/shadcn-analytics",
    styleSlug: "dark-mode",
  },
  {
    templateId: "crm-frosted-glass",
    name: "Frosted CRM",
    description: "Useful for layered dark surfaces, subtle glow, and richer product chrome without losing readability.",
    href: "/templates/crm-frosted-glass",
    styleSlug: "film-noir",
  },
  {
    templateId: "music-player",
    name: "Music Player",
    description: "A strong reference for immersive dark media interfaces, ambient accents, and large visual surfaces.",
    href: "/templates/music-player",
    styleSlug: "neon-tokyo",
  },
  {
    templateId: "chat-messaging",
    name: "Messaging UI",
    description: "Helpful for dark chat layouts, sidebars, message panes, and high-contrast collaboration tools.",
    href: "/templates/chat-messaging",
    styleSlug: "cyberpunk-neon",
  },
];
