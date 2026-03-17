export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: {
    type: "added" | "changed" | "fixed" | "removed";
    description: string;
  }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.12.0",
    date: "2026-03-18",
    title: "Promotion Readiness and Polish",
    changes: [
      { type: "added", description: "Comprehensive promotion readiness: SEO, analytics, blog, social proof, and monitoring" },
      { type: "fixed", description: "Export dialog rendering off-screen due to DOM nesting" },
      { type: "fixed", description: "Collapsible sections invisible on Chrome 120+ desktop" },
      { type: "changed", description: "Reordered style detail page sections by user priority" },
    ],
  },
  {
    version: "0.11.0",
    date: "2026-03-17",
    title: "Animation Catalog Redesign",
    changes: [
      { type: "added", description: "Sandbox panel with universal playground for animations" },
      { type: "added", description: "Compact filter bar with category, trigger, and difficulty filters" },
      { type: "added", description: "Scroll-page-turn and scroll-peel-away animations" },
      { type: "changed", description: "Migrated all 49 animations to directory-based structure" },
      { type: "removed", description: "Removed animation StyleType and 4 legacy animation styles" },
    ],
  },
  {
    version: "0.10.0",
    date: "2026-03-17",
    title: "Styles Expansion and Scenario Discovery",
    changes: [
      { type: "added", description: "4 new styles to fill scenario gaps, plus card-flip, voice-recorder, retro-radio, weather-card animations" },
      { type: "added", description: "Scenario-based style discovery and homepage entry points" },
      { type: "added", description: "Live iframe embed for showcase previews" },
      { type: "added", description: "Publishable stylekit-contributor skill for external PRs" },
      { type: "changed", description: "Upgraded quality scorer v2 and enhanced all 127 styles to B grade" },
      { type: "changed", description: "Comprehensive mobile layout optimization" },
      { type: "fixed", description: "Canonical URLs aligned with Vercel primary domain" },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-03-16",
    title: "Resource Libraries and SEO",
    changes: [
      { type: "added", description: "Gradients library with 40+ presets" },
      { type: "added", description: "Shadows library with 30+ box-shadow presets" },
      { type: "added", description: "Typography and backgrounds resource pages" },
      { type: "added", description: "Comprehensive SEO optimization" },
      { type: "added", description: "English translations for all 118 style definitions" },
      { type: "added", description: "GitHub Star button with live star count" },
      { type: "changed", description: "Reorganized nav with Resources dropdown menu" },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-03-15",
    title: "Animation Platform and Performance",
    changes: [
      { type: "added", description: "Expanded to 25 animations with polished card covers" },
      { type: "added", description: "12 new animations covering exit, transition, and more" },
      { type: "changed", description: "Smooth animation browsing and list filtering performance" },
      { type: "fixed", description: "Hydration mismatch on animation detail pages" },
      { type: "fixed", description: "Live style cover previews restored" },
    ],
  },
];
