"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { UserMenu, MobileUserMenu } from "@/components/layout/user-menu";
import { mainNav, secondaryNav, type NavDropdown, type NavItem } from "@/lib/nav-config";
import {
  hasSeenLatestChangelog,
  isChangelogPath,
  markLatestChangelogSeen,
} from "@/lib/changelog/read-state";
import { ChevronDown } from "lucide-react";
import { ShortcutHint } from "@/components/ui/shortcut-hint";
import { GitHubStarButton } from "@/components/github-star-button";
import { KitNavButton } from "@/components/kit/kit-nav-button";
import { trackEvent } from "@/lib/analytics/events";
import { localizeHref } from "@/lib/i18n/routing";

const linkClass =
  "shrink-0 whitespace-nowrap text-sm tracking-wide text-muted hover:text-foreground transition-colors";

/**
 * Grace period between leaving the trigger and the panel collapsing.
 * Long enough to traverse the 8px gap between trigger and panel +
 * accidentally cross into the panel; short enough that intentional
 * moves away still feel snappy. Mirrors GitHub / Stripe / Linear.
 */
const CLOSE_GRACE_MS = 300;

/**
 * Hover-driven dropdown state with a grace period before close.
 *
 * `openNow` cancels any pending close and forces the dropdown open.
 * `scheduleClose` defers the actual close by CLOSE_GRACE_MS, so a
 * cursor that briefly leaves the container (e.g. crossing the gap
 * between trigger and panel) doesn't collapse the panel mid-traversal.
 */
interface DesktopDropdownProps {
  item: NavItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registerRef: (element: HTMLDivElement | null) => void;
}

/**
 * Single-column or multi-column mega-menu panel for desktop. Used
 * for every mainNav entry that has a `dropdown` field (currently
 * "Build" and "Resources"); the panel is uniform so future top-level
 * dropdowns need no rendering changes.
 *
 * Open behavior:
 * - Mouse: hovering the trigger OR the panel keeps it open. Leaving
 *   both starts a 150ms close timer so the user can cross the gap
 *   between them without the panel collapsing mid-traversal.
 * - Keyboard: focus inside the container keeps it open; focus
 *   leaving schedules the same close.
 */
function DesktopDropdown({
  item,
  open,
  onOpenChange,
  registerRef,
}: DesktopDropdownProps) {
  const { t, locale } = useI18n();
  const dropdown = item.dropdown;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 用原生事件替代 React onMouseEnter/Leave, 避免重渲染时脱落
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cancel = () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const handleEnter = () => {
      cancel();
      onOpenChange(true);
    };

    const handleLeave = () => {
      cancel();
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        onOpenChange(false);
      }, CLOSE_GRACE_MS);
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      cancel();
    };
  }, [onOpenChange]);

  if (!dropdown) return null;

  const isWide = dropdown.width === "wide";
  const hasGroups = (dropdown.groups?.length ?? 0) > 0;
  const hasItems = (dropdown.items?.length ?? 0) > 0;

  const setRefs = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    registerRef(el);
  };

  return (
    <div
      className="relative"
      ref={setRefs}
      onFocus={() => onOpenChange(true)}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget as Node | null)
        ) {
          onOpenChange(false);
        }
      }}
    >
      <button
        type="button"
        className={`flex shrink-0 items-center gap-0.5 whitespace-nowrap text-sm tracking-wide transition-colors ${
          open ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {t(item.labelKey)}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={
            isWide
              ? "absolute top-full left-1/2 -translate-x-1/2 mt-2 p-6 bg-background border border-border shadow-lg z-50 grid gap-6 min-w-[640px] max-w-[800px]"
              : "absolute top-full left-0 mt-2 py-2 min-w-[200px] bg-background border border-border shadow-lg z-50"
          }
          style={
            hasGroups
              ? {
                  gridTemplateColumns: `repeat(${dropdown.groups?.length ?? 1}, minmax(140px, 1fr))`,
                }
              : undefined
          }
          role="menu"
        >
          {hasGroups &&
            dropdown.groups!.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-1">
                {group.groupLabelKey && (
                  <p className="px-2 pt-1 pb-2 text-[10px] uppercase tracking-widest text-muted">
                    {t(group.groupLabelKey)}
                  </p>
                )}
                {group.items.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={localizeHref(subItem.href, locale)}
                    prefetch={false}
                    className="block px-2 py-1.5 text-sm text-muted hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded transition-colors"
                    onClick={() => onOpenChange(false)}
                    role="menuitem"
                  >
                    {t(subItem.labelKey)}
                  </Link>
                ))}
              </div>
            ))}

          {hasItems &&
            dropdown.items!.map((subItem) => (
              <Link
                key={subItem.href}
                href={localizeHref(subItem.href, locale)}
                prefetch={false}
                className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                onClick={() => onOpenChange(false)}
                role="menuitem"
              >
                {t(subItem.labelKey)}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

interface MoreOverflowProps {
  secondaryNav: NavItem[];
  isMoreOpen: boolean;
  onMoreOpenChange: (open: boolean) => void;
  onCloseOtherDropdowns: () => void;
  registerRef: (element: HTMLDivElement | null) => void;
  hasChangelogUpdate: boolean;
  onChangelogSeen: () => void;
}

/**
 * Single-column "More" overflow for secondary nav. Uses the same
 * hover + grace-period pattern as DesktopDropdown so behaviour
 * stays consistent across all menus.
 */
function MoreOverflow({
  secondaryNav,
  hasChangelogUpdate,
  onChangelogSeen,
  isMoreOpen,
  onMoreOpenChange,
  onCloseOtherDropdowns,
  registerRef,
}: MoreOverflowProps) {
  const { t, locale } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 原生事件, 避免 React 重渲染时脱落
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cancel = () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const handleEnter = () => {
      cancel();
      onCloseOtherDropdowns();
      onMoreOpenChange(true);
    };

    const handleLeave = () => {
      cancel();
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        onMoreOpenChange(false);
      }, CLOSE_GRACE_MS);
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      cancel();
    };
  }, [onMoreOpenChange, onCloseOtherDropdowns]);

  const setRefs = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    registerRef(el);
  };

  return (
    <div
      className="relative"
      ref={setRefs}
      onFocus={() => {
        onCloseOtherDropdowns();
        onMoreOpenChange(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onMoreOpenChange(false);
        }
      }}
    >
      <button
        type="button"
        className={`flex shrink-0 items-center gap-0.5 whitespace-nowrap text-sm tracking-wide transition-colors ${
          isMoreOpen ? "text-foreground" : "text-muted hover:text-foreground"
        }`}
        aria-expanded={isMoreOpen}
        aria-haspopup="menu"
      >
        {t("nav.more")}
        {hasChangelogUpdate ? (
          <span className="w-2 h-2 rounded-full bg-red-500" />
        ) : null}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isMoreOpen && (
        <div
          className="absolute left-0 top-full z-50 mt-2 min-w-[160px] border border-border bg-background py-2 shadow-lg"
          role="menu"
        >
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={localizeHref(item.href, locale)}
              prefetch={false}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted transition-colors hover:bg-zinc-50 hover:text-foreground dark:hover:bg-zinc-800"
              onClick={() => {
                if (item.href === "/changelog") onChangelogSeen();
                onMoreOpenChange(false);
              }}
              role="menuitem"
            >
              {t(item.labelKey)}
              {item.href === "/changelog" && hasChangelogUpdate ? (
                <span className="w-2 h-2 rounded-full bg-red-500" />
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expandedMobileGroupKey, setExpandedMobileGroupKey] = useState<string | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hasChangelogUpdate, setHasChangelogUpdate] = useState(false);
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valid hydration pattern
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isChangelogPath(pathname)) {
      markLatestChangelogSeen();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- route-derived notification state
      setHasChangelogUpdate(false);
      return;
    }

    setHasChangelogUpdate(!hasSeenLatestChangelog());
  }, [mounted, pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (moreRef.current && !moreRef.current.contains(target)) {
        setIsMoreOpen(false);
      }
      const clickedInsideAnyDropdown = dropdownRefs.current.some(
        (ref) => ref && ref.contains(target)
      );
      if (!clickedInsideAnyDropdown) {
        setOpenIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  const markChangelogSeen = () => {
    markLatestChangelogSeen();
    setHasChangelogUpdate(false);
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

  return (
    <header className="border-b border-border" data-cursor-aura="off">
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
              <kbd className="hidden 2xl:inline-flex rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"><ShortcutHint keys="K" separator=" " /></kbd>
            </button>

            {/* Main Nav Items: link or dropdown trigger */}
            {mainNav.map((item, index) =>
              item.dropdown ? (
                <DesktopDropdown
                  key={item.labelKey}
                  item={item}
                  open={openIndex === index}
                  onOpenChange={(next) => {
                    setIsMoreOpen(false);
                    setOpenIndex(next ? index : null);
                  }}
                  registerRef={(el) => {
                    dropdownRefs.current[index] = el;
                  }}
                />
              ) : (
                <Link
                  key={item.href}
                  href={localizeHref(item.href, locale)}
                  className={linkClass}
                >
                  {t(item.labelKey)}
                </Link>
              )
            )}

            {/* Secondary Nav Items (More overflow) */}
            {secondaryNav.length > 0 && (
              <MoreOverflow
                secondaryNav={secondaryNav}
                hasChangelogUpdate={hasChangelogUpdate}
                onChangelogSeen={markChangelogSeen}
                isMoreOpen={isMoreOpen}
                onMoreOpenChange={(next) => {
                  setOpenIndex(null);
                  setIsMoreOpen(next);
                }}
                onCloseOtherDropdowns={() => setOpenIndex(null)}
                registerRef={(el) => {
                  moreRef.current = el;
                }}
              />
            )}

            {/* GitHub Star Button */}
            <div className="hidden xl:block shrink-0">
              <GitHubStarButton variant="compact" />
            </div>

            {mounted && <KitNavButton />}
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

              {/* Kit Builder entry */}
              <Link
                href="/kit"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm tracking-wide text-muted hover:text-foreground transition-colors"
              >
                {locale === "zh" ? "我的工具箱" : "My Kit"}
              </Link>

              {/* Main Nav: link or accordion dropdown */}
              {mainNav.map((item) => {
                const dropdown: NavDropdown | undefined = item.dropdown;
                if (!dropdown) {
                  return (
                    <Link
                      key={item.href}
                      href={localizeHref(item.href, locale)}
                      className={linkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                }
                const hasGroups = (dropdown.groups?.length ?? 0) > 0;
                return (
                  <div key={item.labelKey} className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-widest text-muted">
                      {t(item.labelKey)}
                    </p>
                    {hasGroups ? (
                      dropdown.groups!.map((group) => {
                        const groupKey = `${item.labelKey}:${group.groupLabelKey ?? "default"}`;
                        const isOpen = expandedMobileGroupKey === groupKey;
                        return (
                          <div key={groupKey} className="flex flex-col">
                            {group.groupLabelKey ? (
                              <button
                                onClick={() =>
                                  setExpandedMobileGroupKey((prev) =>
                                    prev === groupKey ? null : groupKey
                                  )
                                }
                                className="w-full flex items-center justify-between py-1.5 text-[10px] uppercase tracking-widest text-muted/70 hover:text-foreground transition-colors"
                                aria-expanded={isOpen}
                              >
                                <span>{t(group.groupLabelKey)}</span>
                                <ChevronDown
                                  className={`w-3.5 h-3.5 transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            ) : null}
                            {isOpen &&
                              group.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={localizeHref(subItem.href, locale)}
                                  prefetch={false}
                                  className={`block py-2 ${linkClass}`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {t(subItem.labelKey)}
                                </Link>
                              ))}
                          </div>
                        );
                      })
                    ) : (
                      (dropdown.items ?? []).map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={localizeHref(subItem.href, locale)}
                          prefetch={false}
                          className={`block py-2 ${linkClass}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t(subItem.labelKey)}
                        </Link>
                      ))
                    )}
                  </div>
                );
              })}

              {/* Secondary Nav */}
              {secondaryNav.length > 0 && (
                <div className="pt-2 border-t border-border">
                  {secondaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={localizeHref(item.href, locale)}
                      prefetch={false}
                      className={`flex items-center gap-2 py-2 ${linkClass}`}
                      onClick={() => {
                        if (item.href === "/changelog") markChangelogSeen();
                        setIsMenuOpen(false);
                      }}
                    >
                      {t(item.labelKey)}
                      {item.href === "/changelog" && hasChangelogUpdate ? (
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                      ) : null}
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
