import { stripLocaleFromPathname } from "@/lib/i18n/routing";

const TEMPLATE_PAGE_PATH = /^\/templates\/([^/]+)$/;

/**
 * Slug of an in-site template page. Template pages are served under a locale
 * prefix (`/zh/templates/<slug>`), so the prefix is removed before matching.
 */
export function getTemplateSlugFromPathname(pathname: string): string | null {
  return stripLocaleFromPathname(pathname).match(TEMPLATE_PAGE_PATH)?.[1] ?? null;
}
