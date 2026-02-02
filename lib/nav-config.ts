// Site-wide navigation configuration
// Edit this file to add/remove/reorder navigation links

import type { TranslationKey } from "@/lib/i18n/translations";

export interface NavItem {
  href: string;
  labelKey: TranslationKey;
  external?: boolean;
}

export interface ExternalNavItem {
  href: string;
  label: string;
  external: true;
}

export const mainNav: NavItem[] = [
  { href: "/styles", labelKey: "nav.styles" },
  { href: "/components", labelKey: "nav.components" },
  { href: "/linter", labelKey: "nav.linter" },
  { href: "/prompt-builder", labelKey: "nav.promptBuilder" },
  { href: "/guide", labelKey: "nav.guide" },
  { href: "/about", labelKey: "nav.about" },
];

export const externalNav: ExternalNavItem[] = [
  {
    href: "https://github.com/AnxForever/stylekit",
    label: "GitHub",
    external: true,
  },
];
