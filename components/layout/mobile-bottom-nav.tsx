"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Palette, LayoutTemplate, Menu } from "lucide-react";

const tabs = [
  { href: "/", icon: Home, label: "Home", match: (p: string) => p === "/" },
  { href: "/styles", icon: Palette, label: "Styles", match: (p: string) => p.startsWith("/styles") },
  { href: "/templates", icon: LayoutTemplate, label: "Templates", match: (p: string) => p.startsWith("/templates") },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  const handleMenuClick = () => {
    // Dispatch Cmd+K to open command palette as "More" action
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
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-14 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = tab.match(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] text-xs transition-colors ${
                isActive ? "text-foreground" : "text-muted"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleMenuClick}
          className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] text-xs text-muted transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
}
