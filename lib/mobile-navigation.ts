import { stripLocaleFromPathname } from "@/lib/i18n/routing";

const MOBILE_BOTTOM_NAV_EXCLUDED_PATHS = [
  "/admin",
  "/experiments",
  "/validation",
  "/workspace",
] as const;

/** Keep bottom-tab visibility and mobile-menu de-duplication in sync. */
export function isMobileBottomNavVisible(pathname: string): boolean {
  const routePath = stripLocaleFromPathname(pathname || "/");

  return !MOBILE_BOTTOM_NAV_EXCLUDED_PATHS.some(
    (prefix) => routePath === prefix || routePath.startsWith(`${prefix}/`)
  );
}
