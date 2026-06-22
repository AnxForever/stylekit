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
// Stable top-level surface — keep this list short (3-5 items).
// New features belong in a dropdown, not as new top-level items.
export const mainNav: NavItem[] = [
  { href: "/styles", labelKey: "nav.styles" },
  { href: "/templates", labelKey: "nav.templates" },
  {
    href: "/templates",
    labelKey: "nav.build",
    dropdown: {
      labelKey: "nav.build",
      width: "wide",
      // "What can I build?" — every entry jumps to /templates?type=X
      // where the page already filters by type. No new routes needed.
      groups: [
        {
          groupLabelKey: "nav.buildMain",
          items: [
            { href: "/templates?type=landing", labelKey: "templates.typeLanding" },
            { href: "/templates?type=portfolio", labelKey: "templates.typePortfolio" },
            { href: "/templates?type=blog", labelKey: "templates.typeBlog" },
            { href: "/templates?type=docs", labelKey: "templates.typeDocs" },
          ],
        },
        {
          groupLabelKey: "nav.buildApps",
          items: [
            { href: "/templates?type=dashboard", labelKey: "templates.typeDashboard" },
            { href: "/templates?type=saas", labelKey: "templates.typeSaas" },
            { href: "/templates?type=admin", labelKey: "templates.typeAdmin" },
            { href: "/templates?type=auth", labelKey: "templates.typeAuth" },
          ],
        },
        {
          groupLabelKey: "nav.buildCommerce",
          items: [
            { href: "/templates?type=ecommerce", labelKey: "templates.typeEcommerce" },
            { href: "/templates?type=pricing", labelKey: "nav.buildPricing" },
            { href: "/templates?type=social", labelKey: "templates.typeSocial" },
            { href: "/templates?type=messaging", labelKey: "templates.typeMessaging" },
          ],
        },
        {
          groupLabelKey: "nav.buildMedia",
          items: [
            { href: "/templates?type=media", labelKey: "templates.typeMedia" },
            { href: "/templates?type=lifestyle", labelKey: "templates.typeLifestyle" },
            { href: "/templates?type=education", labelKey: "templates.typeEducation" },
            { href: "/templates", labelKey: "nav.buildAll" },
          ],
        },
      ],
    },
  },
  {
    href: "/templates",
    labelKey: "nav.resources",
    dropdown: {
      labelKey: "nav.resources",
      width: "wide",
      groups: [
        {
          groupLabelKey: "nav.resourcesBrowse",
          items: [
            { href: "/styles", labelKey: "nav.styles" },
            { href: "/animations", labelKey: "nav.animations" },
            { href: "/mouse-interactions", labelKey: "nav.mouseInteractions" },
            { href: "/animations/vocabulary", labelKey: "nav.vocabulary" },
            { href: "/recipes", labelKey: "nav.recipes" },
            { href: "/guides", labelKey: "nav.guides" },
          ],
        },
        {
          groupLabelKey: "nav.resourcesComponents",
          items: [
            { href: "/component-patterns", labelKey: "nav.componentPatterns" },
            { href: "/gradients", labelKey: "nav.gradients" },
            { href: "/shadows", labelKey: "nav.shadows" },
            { href: "/backgrounds", labelKey: "nav.backgrounds" },
          ],
        },
        {
          groupLabelKey: "nav.resourcesType",
          items: [
            { href: "/typography", labelKey: "nav.typography" },
          ],
        },
      ],
    },
  },
];

// Secondary navigation: surface under the "More" overflow menu.
// Add new community/blog/external items here, not in mainNav.
export const secondaryNav: NavItem[] = [
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
