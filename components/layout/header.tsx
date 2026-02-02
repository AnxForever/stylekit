"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { mainNav, externalNav } from "@/lib/nav-config";
import { Download } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useI18n();

  /* eslint-disable react-hooks/set-state-in-effect */
  // Required pattern for SSR hydration with next-themes
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const linkClass = "text-sm tracking-wide text-muted hover:text-foreground transition-colors";

  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Masthead */}
          <Link href="/" className="masthead text-lg md:text-xl">
            StyleKit
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Search Button */}
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  bubbles: true,
                });
                document.dispatchEvent(event);
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted border border-border rounded-md hover:border-foreground/50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>{t("nav.search")}</span>
              <kbd className="hidden lg:inline-flex px-1.5 py-0.5 text-[10px] bg-zinc-100 dark:bg-zinc-800 rounded">⌘K</kbd>
            </button>
            <Link
              href="/guide"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t("nav.export")}</span>
            </Link>
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {t(item.labelKey)}
              </Link>
            ))}
            {externalNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {item.label}
              </a>
            ))}
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
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -mr-2"
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
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/guide"
                className="flex items-center gap-2 px-4 py-2 text-sm bg-foreground text-background"
                onClick={() => setIsMenuOpen(false)}
              >
                <Download className="w-4 h-4" />
                {t("nav.export")}
              </Link>
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              {externalNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {item.label}
                </a>
              ))}
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
