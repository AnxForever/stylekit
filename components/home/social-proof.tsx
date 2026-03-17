"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { RevealOnScroll } from "@/components/home/reveal-on-scroll";

const REPO = "AnxForever/stylekit";
const CACHE_KEY = "gh_star_count";
const CACHE_TTL = 1000 * 60 * 30;

function getCachedStars(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { count, ts } = JSON.parse(raw) as { count: number; ts: number };
    if (Date.now() - ts > CACHE_TTL) return null;
    return count;
  } catch {
    return null;
  }
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

interface StatItem {
  value: string;
  label: string;
}

export function SocialProof() {
  const { t } = useI18n();
  const [stars, setStars] = useState<number | null>(() => getCachedStars());

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data: { stargazers_count?: number }) => {
        const fresh = data.stargazers_count ?? 0;
        setStars(fresh);
      })
      .catch(() => {});
  }, []);

  const stats: StatItem[] = [
    { value: "130+", label: t("home.proof.styles") },
    { value: "40+", label: t("home.proof.animations") },
    { value: "30+", label: t("home.proof.templates") },
  ];

  const openSourceLabel = stars !== null
    ? `${formatStars(stars)} Stars`
    : t("home.proof.openSource");

  return (
    <section className="border-b border-border" aria-label={t("home.proof.ariaLabel")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10">
        <RevealOnScroll variant="soft">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <RevealOnScroll
                key={stat.label}
                variant="upSubtle"
                delayMs={80 + index * 60}
                disableDelayOnMobile
              >
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl tabular-nums tracking-tight mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
            <RevealOnScroll variant="upSubtle" delayMs={260} disableDelayOnMobile>
              <a
                href={`https://github.com/${REPO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-center group"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl tabular-nums tracking-tight mb-1 group-hover:text-accent transition-colors">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="inline-block align-middle sm:w-8 sm:h-8 md:w-9 md:h-9"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </p>
                <p className="text-xs sm:text-sm text-muted tracking-wide group-hover:text-foreground transition-colors">
                  {openSourceLabel}
                </p>
              </a>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
