"use client";

import { useEffect, useState } from "react";

const REPO = "AnxForever/stylekit";
const CACHE_KEY = "gh_star_count";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function getCachedCount(): number | null {
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

function setCachedCount(count: number) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }));
  } catch {
    // quota exceeded — ignore
  }
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(n);
}

interface GitHubStarButtonProps {
  /** "compact" = header icon button, "default" = hero CTA style */
  variant?: "compact" | "default";
  className?: string;
}

const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export function GitHubStarButton({
  variant = "default",
  className = "",
}: GitHubStarButtonProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const cached = getCachedCount();
    if (cached !== null) {
      setCount(cached);
    }

    fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data: { stargazers_count?: number }) => {
        const fresh = data.stargazers_count ?? 0;
        setCachedCount(fresh);
        setCount(fresh);
      })
      .catch(() => {
        // keep cached value or stay null
      });
  }, []);

  const href = `https://github.com/${REPO}`;

  if (variant === "compact") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-muted hover:text-foreground transition-colors ${className}`}
        aria-label={`Star ${REPO} on GitHub${count !== null ? ` (${count} stars)` : ""}`}
      >
        <GitHubIcon size={16} />
        {count !== null && (
          <span className="text-xs tabular-nums">{formatCount(count)}</span>
        )}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors ${className}`}
      aria-label={`Star ${REPO} on GitHub${count !== null ? ` (${count} stars)` : ""}`}
    >
      <GitHubIcon size={16} />
      <StarIcon size={14} />
      <span>Star</span>
      {count !== null && (
        <span className="ml-0.5 px-1.5 py-0.5 text-xs tabular-nums bg-foreground/5 border border-border rounded-sm">
          {formatCount(count)}
        </span>
      )}
    </a>
  );
}
