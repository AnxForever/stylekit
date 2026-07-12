// Site-wide navigation configuration
// Edit this file to add/remove/reorder navigation links.

import type { TranslationKey } from "@/lib/i18n/translations";

export interface NavItem {
  href: string;
  labelKey: TranslationKey;
  external?: boolean;
  /**
   * Optional dropdown attached to this item. When set, the item is
   * rendered as a mega-menu trigger (button) instead of a plain link.
   * Used for top-level entries like "Build" and "Resources" that need
   * groups but should keep their position in mainNav stable.
   */
  dropdown?: NavDropdown;
}

export interface NavDropdownGroup {
  groupLabelKey?: TranslationKey;
  items: NavItem[];
}

export interface NavDropdown {
  labelKey: TranslationKey;
  /**
   * Flat list of items rendered as a single-column dropdown.
   * Use this for narrow menus, or together with `groups` for wide
   * mega menus that need both a flat list and grouped sections.
   */
  items?: NavItem[];
  /** Grouped sections rendered as a multi-column mega menu. */
  groups?: NavDropdownGroup[];
  /**
   * Width hint for the mega-menu panel:
   * - "narrow" (~220px single column, no groups)
   * - "wide"   (~720px multi-column grid, requires groups)
   * Defaults to "narrow" when omitted.
   */
  width?: "narrow" | "wide";
}

export interface ExternalNavItem {
  href: string;
  label: string;
  external: true;
}

// Main navigation items shown directly in the nav bar.
// Keep this surface intentionally minimal. Detailed categories and filters
// belong inside their destination pages instead of in header dropdowns.
export const mainNav: NavItem[] = [
  { href: "/styles", labelKey: "nav.styles" },
  { href: "/templates", labelKey: "nav.templates" },
  { href: "/guides", labelKey: "nav.resources" },
  { href: "https://anxforever.cn", labelKey: "nav.blog", external: true },
];

// Intentionally empty so the header does not render a "More" overflow menu.
export const secondaryNav: NavItem[] = [];

export const externalNav: ExternalNavItem[] = [
  {
    href: "https://github.com/AnxForever/stylekit",
    label: "GitHub",
    external: true,
  },
];
