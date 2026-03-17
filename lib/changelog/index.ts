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
    version: "0.9.0",
    date: "2026-03-17",
    title: "Animation Catalog Redesign",
    changes: [
      { type: "added", description: "Sandbox panel with universal playground for animations" },
      { type: "added", description: "Compact filter bar with category, trigger, and difficulty filters" },
      { type: "changed", description: "Migrated all 49 animations to directory-based structure" },
      { type: "removed", description: "Removed animation StyleType and 4 legacy animation styles" },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-03-10",
    title: "Blog and Changelog Framework",
    changes: [
      { type: "added", description: "File-based blog system with MDX support" },
      { type: "added", description: "Changelog page with timeline layout" },
      { type: "added", description: "Blog and Changelog navigation links" },
    ],
  },
  {
    version: "0.7.0",
    date: "2026-02-28",
    title: "Design System Expansion",
    changes: [
      { type: "added", description: "120+ visual styles with design tokens and component recipes" },
      { type: "added", description: "AI prompt export for consistent UI generation" },
      { type: "added", description: "Figma and code export support" },
      { type: "changed", description: "Improved style catalog filtering and search" },
    ],
  },
];
