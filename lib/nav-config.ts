// Site-wide navigation configuration
// Edit this file to add/remove/reorder navigation links

import type { TranslationKey } from "@/lib/i18n/translations";

export interface NavItem {
  href: string;
  labelKey: TranslationKey;
  external?: boolean;
}

export interface NavDropdownGroup {
  groupLabelKey?: TranslationKey;
  items: NavItem[];
}

export interface NavDropdown {
  labelKey: TranslationKey;
  items: NavItem[];
  groups?: NavDropdownGroup[];
}

export interface ExternalNavItem {
  href: string;
  label: string;
  external: true;
}

// Main navigation items (shown directly in nav bar)
export const mainNav: NavItem[] = [
  { href: "/styles", labelKey: "nav.styles" },
  { href: "/recipes", labelKey: "nav.recipes" },
  { href: "/guides", labelKey: "nav.guides" },
  { href: "/animations", labelKey: "nav.animations" },
  { href: "/templates", labelKey: "nav.templates" },
];

// Resources dropdown menu
export const resourcesDropdown: NavDropdown = {
  labelKey: "nav.resources",
  items: [
    { href: "/component-patterns", labelKey: "nav.componentPatterns" },
    { href: "/gradients", labelKey: "nav.gradients" },
    { href: "/shadows", labelKey: "nav.shadows" },
    { href: "/typography", labelKey: "nav.typography" },
    { href: "/backgrounds", labelKey: "nav.backgrounds" },
  ],
};

// Tools dropdown menu (temporarily disabled — items not yet validated)
export const toolsDropdown: NavDropdown = {
  labelKey: "nav.tools",
  items: [],
};

// Secondary navigation
export const secondaryNav: NavItem[] = [
  { href: "/community", labelKey: "nav.community" },
  { href: "/blog", labelKey: "nav.blog" },
  { href: "/changelog", labelKey: "nav.changelog" },
];

export const externalNav: ExternalNavItem[] = [
  {
    href: "https://github.com/AnxForever/stylekit",
    label: "GitHub",
    external: true,
  },
];
