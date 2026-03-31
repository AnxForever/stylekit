"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, LogIn, RefreshCw, Send, TrendingUp } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useCommunityFeed } from "@/lib/swr";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import { SORT_OPTIONS, type SortMethod } from "@/lib/community/leaderboard";
import { CommunityStatsCard } from "@/components/community/community-stats-card";

const PAGE_SIZE = 12;

function formatDate(iso: string, locale: "zh" | "en"): string {
  const dateLocale = locale === "zh" ? "zh-CN" : "en-US";
  return new Date(iso).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface CommunityContentProps {
  initialSlug?: string;
  initialOffset?: number;
}

export function CommunityContent({
  initialSlug = "",
  initialOffset = 0,
}: CommunityContentProps) {
  const { t, locale } = useI18n();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [offset, setOffset] = useState(initialOffset);
  const [sortMethod, setSortMethod] = useState<SortMethod>("recent");
  const normalizedSlug = useMemo(
    () => initialSlug.trim().toLowerCase() || undefined,
    [initialSlug]
  );
  const currentReturnUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (normalizedSlug) {
      params.set("slug", normalizedSlug);
    }
    if (offset > 0) {
      params.set("offset", String(offset));
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [normalizedSlug, offset, pathname]);

  const { data, error, isLoading, isValidating, mutate } = useCommunityFeed({
    limit: PAGE_SIZE,
    offset,
    slug: normalizedSlug,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;
  const isRefreshing = isValidating && !isLoading;

  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("community-return-url", currentReturnUrl);
  }, [currentReturnUrl]);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("community-scroll-position");
    if (!savedScroll) return;

    const y = Number.parseInt(savedScroll, 10);
    if (Number.isNaN(y)) {
      sessionStorage.removeItem("community-scroll-position");
      return;
    }

    const id = window.setTimeout(() => {
      window.scrollTo({ top: y, behavior: "instant" });
      sessionStorage.removeItem("community-scroll-position");
    }, 80);

    return () => {
      window.clearTimeout(id);
    };
  }, []);

  const persistCommunityContext = () => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("community-scroll-position", window.scrollY.toString());
    sessionStorage.setItem("community-return-url", currentReturnUrl);
  };

  return (
    <section>
      {/* Community Stats */}
      <CommunityStatsCard
        stats={{
          totalSubmissions: data?.total || 0,
          totalCollaborators: data?.collaborators || 0,
          recentSubmissions: data?.recentCount || 0,
          topStyle: data?.featured || null,
        }}
      />

      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-muted mb-3">
              {t("community.label")}
            </p>
            <h1 className="text-3xl md:text-5xl tracking-tight mb-3">
              {t("community.title")}
            </h1>
            <p className="text-muted max-w-2xl">
              {t("community.description")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <LocalizedLink
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              {t("community.submitCta")}
            </LocalizedLink>
            {!user ? (
              <LocalizedLink
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm"
              >
                <LogIn className="w-4 h-4" />
                {t("auth.signIn")}
              </LocalizedLink>
            ) : null}
          </div>
        </div>

        {normalizedSlug && (
          <div className="mb-6 rounded-md border border-border bg-background/70 px-4 py-3 text-sm flex flex-wrap gap-2 items-center justify-between">
            <span className="text-muted">
              {t("community.filteredByStyle")}
              {" "}
              <span className="text-foreground font-medium">{normalizedSlug}</span>
            </span>
            <LocalizedLink
              href="/community"
              onClick={() => {
                setOffset(0);
              }}
              className="underline text-muted hover:text-foreground"
            >
              {t("community.clearFilter")}
            </LocalizedLink>
          </div>
        )}

        {/* Sort Controls */}
        <div className="mb-6 flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortMethod(option.value)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                sortMethod === option.value
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground"
              }`}
              title={option.description}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 flex items-center justify-between">
            <span>{error.message || t("community.loadError")}</span>
            <button
              type="button"
              onClick={() => {
                void mutate();
              }}
              className="inline-flex items-center gap-1 underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t("error.retry")}
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="border border-border p-4 animate-pulse space-y-3">
                <div className="aspect-[16/10] bg-muted/20" />
                <div className="h-5 bg-muted/20 w-3/4" />
                <div className="h-3 bg-muted/20 w-full" />
                <div className="h-3 bg-muted/20 w-2/3" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="border border-dashed border-border p-10 text-center">
            <h2 className="text-xl mb-2">{t("community.emptyTitle")}</h2>
            <p className="text-sm text-muted mb-4">
              {t("community.emptyDesc")}
            </p>
            <LocalizedLink
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              {t("community.emptyAction")}
            </LocalizedLink>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 [content-visibility:auto] [contain-intrinsic-size:1px_920px]">
              {items.map((item) => (
                <article
                  key={item.id}
                  className={`border border-border bg-background/80 hover:border-foreground transition-colors overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1px_420px] ${
                    isRefreshing ? "opacity-75" : ""
                  }`}
                >
                  <LocalizedLink
                    href={`/community/${item.id}`}
                    onClick={persistCommunityContext}
                    className="block aspect-[16/10] relative bg-zinc-100 dark:bg-zinc-900"
                  >
                    {item.cover ? (
                      <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-muted">
                        {t("community.noCover")}
                      </div>
                    )}
                  </LocalizedLink>
                  <div className="p-4 space-y-3">
                    <div>
                      <LocalizedLink
                        href={`/community/${item.id}`}
                        onClick={persistCommunityContext}
                        className="text-lg hover:underline leading-tight"
                      >
                        {item.title}
                      </LocalizedLink>
                      {item.titleEn && item.titleEn !== item.title && (
                        <p className="text-xs text-muted mt-1">{item.titleEn}</p>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-sm text-muted line-clamp-2 md:min-h-[2.5rem]">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted">
                      <div className="inline-flex items-center gap-2 min-w-0">
                        {item.author.avatarUrl ? (
                          <Image
                            src={item.author.avatarUrl}
                            alt={item.author.handle}
                            width={20}
                            height={20}
                            unoptimized
                            className="w-5 h-5 rounded-full"
                          />
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-muted/30 inline-flex items-center justify-center text-[10px] text-foreground">
                            {item.author.handle.charAt(0).toUpperCase()}
                          </span>
                        )}
                        <span className="truncate">
                          {t("community.by")}
                          {" "}
                          <span className="text-foreground">@{item.author.handle}</span>
                        </span>
                        <span className="uppercase tracking-wide border border-border px-1 py-0.5 text-[10px]">
                          {item.author.provider}
                        </span>
                      </div>
                      <time dateTime={item.submittedAt}>{formatDate(item.submittedAt, locale)}</time>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted">
                  {t("community.showing")} {Math.min(offset + 1, total)}-{Math.min(offset + PAGE_SIZE, total)}
                  {" "}
                  {t("community.of")} {total}
                </p>
                {isRefreshing && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextOffset = Math.max(0, offset - PAGE_SIZE);
                    setOffset(nextOffset);
                    const params = new URLSearchParams();
                    if (normalizedSlug) {
                      params.set("slug", normalizedSlug);
                    }
                    if (nextOffset > 0) {
                      params.set("offset", String(nextOffset));
                    }
                    const query = params.toString();
                    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
                  }}
                  disabled={!hasPrev}
                  className="px-3 py-1.5 text-sm border border-border hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t("community.prev")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextOffset = offset + PAGE_SIZE;
                    setOffset(nextOffset);
                    const params = new URLSearchParams();
                    if (normalizedSlug) {
                      params.set("slug", normalizedSlug);
                    }
                    params.set("offset", String(nextOffset));
                    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
                  }}
                  disabled={!hasNext}
                  className="px-3 py-1.5 text-sm border border-border hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t("community.next")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
