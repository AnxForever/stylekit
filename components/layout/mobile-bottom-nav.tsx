"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Palette, LayoutTemplate, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref, stripLocaleFromPathname } from "@/lib/i18n/routing";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { locale } = useI18n();
  const visiblePath = stripLocaleFromPathname(pathname || "/");
  const tabs = [
    {
      href: "/",
      icon: Home,
      label: locale === "zh" ? "首页" : "Home",
      match: (path: string) => path === "/",
    },
    {
      href: "/styles",
      icon: Palette,
      label: locale === "zh" ? "风格" : "Styles",
      match: (path: string) => path.startsWith("/styles"),
    },
    {
      href: "/templates",
      icon: LayoutTemplate,
      label: locale === "zh" ? "模板" : "Templates",
      match: (path: string) => path.startsWith("/templates"),
    },
  ] as const;

  if (
    visiblePath.startsWith("/admin") ||
    visiblePath.startsWith("/validation/") ||
    visiblePath.startsWith("/workspace")
  ) {
    return null;
  }

  const handleSearchClick = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/95 supports-[backdrop-filter]:bg-background/75 backdrop-blur"
      aria-label={locale === "zh" ? "移动导航" : "Mobile navigation"}
    >
      <div className="flex items-center justify-around h-14 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = tab.match(visiblePath);
          return (
            <Link
              key={tab.href}
              href={localizeHref(tab.href, locale)}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-[44px] min-w-[64px] flex-col items-center justify-center gap-0.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                isActive ? "text-foreground" : "text-muted"
              }`}
            >
              <tab.icon className="w-5 h-5" aria-hidden="true" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleSearchClick}
          className="flex min-h-[44px] min-w-[64px] flex-col items-center justify-center gap-0.5 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          aria-label={locale === "zh" ? "搜索" : "Search"}
        >
          <Search className="w-5 h-5" aria-hidden="true" />
          <span>{locale === "zh" ? "搜索" : "Search"}</span>
        </button>
      </div>
    </nav>
  );
}
