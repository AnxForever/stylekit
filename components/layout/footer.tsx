"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <p className="masthead text-lg mb-4">StyleKit</p>
            <p className="text-sm text-muted leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("footer.navigation")}
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/styles"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.styles")}
              </Link>
              <Link
                href="/about"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("nav.about")}
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("footer.resources")}
            </p>
            <nav className="flex flex-col gap-2">
              <a
                href="https://github.com/AnxForever/stylekit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("footer.githubRepo")}
              </a>
              <a
                href="#"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                {t("footer.submitStyle")}
              </a>
            </nav>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>{t("footer.openSource")}</p>
          <p>{t("footer.builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
