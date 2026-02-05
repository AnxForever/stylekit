// Site-wide navigation configuration
// Edit this file to add/remove/reorder navigation links

import type { TranslationKey } from "@/lib/i18n/translations";

export interface NavItem {
  href: string;
  labelKey: TranslationKey;
  external?: boolean;
}

export interface NavDropdown {
  labelKey: TranslationKey;
  items: NavItem[];
}

export interface ExternalNavItem {
  href: string;
  label: string;
  external: true;
}

// Main navigation items (shown directly in nav bar)
export const mainNav: NavItem[] = [
  { href: "/styles", labelKey: "nav.styles" },
  { href: "/templates", labelKey: "nav.templates" },
  { href: "/generate", labelKey: "nav.generator" },
];

// Tools dropdown menu
export const toolsDropdown: NavDropdown = {
  labelKey: "nav.tools",
  items: [
    { href: "/create-style", labelKey: "nav.createStyle" },
    { href: "/developers", labelKey: "nav.developers" },
  ],
};

// Secondary navigation
export const secondaryNav: NavItem[] = [
  { href: "/guide", labelKey: "nav.guide" },
];

export const externalNav: ExternalNavItem[] = [
  {
    href: "https://github.com/AnxForever/stylekit",
    label: "GitHub",
    external: true,
  },
];
