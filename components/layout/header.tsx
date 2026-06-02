"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserMenu, MobileUserMenu } from "@/components/layout/user-menu";
import { mainNav, secondaryNav, resourcesDropdown } from "@/lib/nav-config";
import { ChevronDown } from "lucide-react";
import { GitHubStarButton } from "@/components/github-star-button";
import { trackEvent } from "@/lib/analytics/events";
import { localizeHref } from "@/lib/i18n/routing";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [expandedMobileResourcesGroup, setExpandedMobileResourcesGroup] = useState<number | null>(0);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t, locale } = useI18n();
  const resourcesRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valid hydration pattern
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  const openCommandPalette = (location: "header" | "mobile_menu") => {
    trackEvent("cta_click", { label: "open_search", location });
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  const linkClass = "shrink-0 whitespace-nowrap text-sm tracking-wide text-muted hover:text-foreground transition-colors";

  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Masthead */}
          <Link href={localizeHref("/", locale)} className="masthead text-lg md:text-xl">
            StyleKit
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {/* Search Button */}
            <button
              onClick={() => openCommandPalette("header")}
              className="shrink-0 flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-foreground/50"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span className="hidden xl:inline">{t("nav.search")}</span>
              <kbd className="hidden 2xl:inline-flex rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">Ctrl K</kbd>
            </button>

            {/* Main Nav Items */}
            {mainNav.map((item) => (
              <Link key={item.href} href={localizeHref(item.href, locale)} className={linkClass}>
                {t(item.labelKey)}
              </Link>
            ))}

            {/* Resources Dropdown */}
            {(resourcesDropdown.groups?.length || resourcesDropdown.items.length) > 0 && (
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  setIsResourcesOpen((prev) => !prev);
                }}
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap text-sm tracking-wide transition-colors ${
                  isResourcesOpen ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {t(resourcesDropdown.labelKey)}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>

              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-2 py-2 min-w-[180px] bg-background border border-border shadow-lg z-50">
                  {resourcesDropdown.groups ? (
                    resourcesDropdown.groups.map((group, gi) => (
                      <div key={gi}>
                        {gi > 0 && <hr className="my-1.5 border-border" />}
                        {group.groupLabelKey && (
                          <p className="px-4 pt-1.5 pb-1 text-[10px] uppercase tracking-widest text-muted">
                            {t(group.groupLabelKey)}
                          </p>
                        )}
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={localizeHref(item.href, locale)}
                            className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => setIsResourcesOpen(false)}
                          >
                            {t(item.labelKey)}
                          </Link>
                        ))}
                      </div>
                    ))
                  ) : (
                    resourcesDropdown.items.map((item) => (
                      <Link
                        key={item.href}
                        href={localizeHref(item.href, locale)}
                        className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
            )}

            {/* Secondary Nav Items */}
            {secondaryNav.length > 0 && (
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => {
                    setIsResourcesOpen(false);
                    setIsMoreOpen((prev) => !prev);
                  }}
                  className={`flex shrink-0 items-center gap-1 whitespace-nowrap text-sm tracking-wide transition-colors ${
                    isMoreOpen ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {t("nav.more")}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? "rotate-180" : ""}`} />
                </button>

                {isMoreOpen && (
                  <div className="absolute left-0 top-full z-50 mt-2 min-w-[160px] border border-border bg-background py-2 shadow-lg">
                    {secondaryNav.map((item) => (
                      <Link
                        key={item.href}
                        href={localizeHref(item.href, locale)}
                        className="block px-4 py-2 text-sm text-muted transition-colors hover:bg-zinc-50 hover:text-foreground dark:hover:bg-zinc-800"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* GitHub Star Button */}
            <div className="hidden xl:block shrink-0">
              <GitHubStarButton variant="compact" />
            </div>

            {mounted && <LanguageSwitcher />}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 text-muted hover:text-foreground transition-colors"
                aria-label={resolvedTheme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
              >
                {resolvedTheme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}
            {mounted && <UserMenu />}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => {
                    openCommandPalette("mobile_menu");
                  }, 100);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted border border-border rounded-md hover:border-foreground/50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span>{t("nav.search")}</span>
              </button>

              {/* Main Nav */}
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={localizeHref(item.href, locale)}
                  className={linkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}

              {/* Resources Section */}
              {(resourcesDropdown.groups?.length || resourcesDropdown.items.length) > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-muted mb-2">
                  {t(resourcesDropdown.labelKey)}
                </p>
                {resourcesDropdown.groups ? (
                  resourcesDropdown.groups.map((group, gi) => (
                    <div key={gi} className={gi > 0 ? "mt-3" : ""}>
                      {group.groupLabelKey ? (
                        <>
                          <button
                            onClick={() =>
                              setExpandedMobileResourcesGroup((prev) => (prev === gi ? null : gi))
                            }
                            className="w-full flex items-center justify-between py-2 text-[10px] uppercase tracking-widest text-muted/70 hover:text-foreground transition-colors"
                            aria-expanded={expandedMobileResourcesGroup === gi}
                          >
                            <span>{t(group.groupLabelKey)}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${
                                expandedMobileResourcesGroup === gi ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {expandedMobileResourcesGroup === gi && (
                            <div className="mt-1">
                              {group.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={localizeHref(item.href, locale)}
                                  className={`block py-2 ${linkClass}`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {t(item.labelKey)}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={localizeHref(item.href, locale)}
                            className={`block py-2 ${linkClass}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {t(item.labelKey)}
                          </Link>
                        ))
                      )}
                    </div>
                  ))
                ) : (
                  resourcesDropdown.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block py-2 ${linkClass}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))
                )}
              </div>
              )}

              {/* Secondary Nav */}
              {secondaryNav.length > 0 && (
              <div className="pt-2 border-t border-border">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={localizeHref(item.href, locale)}
                    className={`block py-2 ${linkClass}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
              )}

              {/* GitHub Star Button (Mobile) */}
              <GitHubStarButton variant="compact" />

              <div className="pt-2 border-t border-border flex items-center gap-4">
                <LanguageSwitcher />
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-muted hover:text-foreground transition-colors"
                    aria-label={resolvedTheme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
                  >
                    {resolvedTheme === "dark" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
              {mounted && (
                <div className="pt-2 border-t border-border">
                  <MobileUserMenu />
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
