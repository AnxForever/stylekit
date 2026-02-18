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
  { href: "/templates", labelKey: "nav.templates" },
];

// Tools dropdown menu (temporarily empty — re-enable when features are stable)
export const toolsDropdown: NavDropdown = {
  labelKey: "nav.tools",
  items: [],
  groups: [],
};

// Secondary navigation (temporarily empty)
export const secondaryNav: NavItem[] = [];

export const externalNav: ExternalNavItem[] = [
  {
    href: "https://github.com/AnxForever/stylekit",
    label: "GitHub",
    external: true,
  },
];
