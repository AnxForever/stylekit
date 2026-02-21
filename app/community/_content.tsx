"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LogIn, RefreshCw, Send } from "lucide-react";
import { useCommunityFeed } from "@/lib/swr";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";

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
}

export function CommunityContent({ initialSlug = "" }: CommunityContentProps) {
  const { t, locale } = useI18n();
  const { user } = useUser();
  const [offset, setOffset] = useState(0);
  const normalizedSlug = useMemo(
    () => initialSlug.trim().toLowerCase() || undefined,
    [initialSlug]
  );

  const { data, error, isLoading, mutate } = useCommunityFeed({
    limit: PAGE_SIZE,
    offset,
    slug: normalizedSlug,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;

  return (
    <section className="border-b border-border">
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
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              {t("community.submitCta")}
            </Link>
            {!user ? (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm"
              >
                <LogIn className="w-4 h-4" />
                {t("auth.signIn")}
              </Link>
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
            <Link
              href="/community"
              className="underline text-muted hover:text-foreground"
            >
              {t("community.clearFilter")}
            </Link>
          </div>
        )}

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
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors"
            >
              <Send className="w-4 h-4" />
              {t("community.emptyAction")}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 [content-visibility:auto] [contain-intrinsic-size:1px_920px]">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="border border-border bg-background/80 hover:border-foreground transition-colors overflow-hidden"
                >
                  <Link href={`/styles/${item.slug}`} className="block aspect-[16/10] relative bg-zinc-100 dark:bg-zinc-900">
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
                  </Link>
                  <div className="p-4 space-y-3">
                    <div>
                      <Link
                        href={`/styles/${item.slug}`}
                        className="text-lg hover:underline leading-tight"
                      >
                        {item.title}
                      </Link>
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
              <p className="text-sm text-muted">
                {t("community.showing")} {Math.min(offset + 1, total)}-{Math.min(offset + PAGE_SIZE, total)}
                {" "}
                {t("community.of")} {total}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOffset((current) => Math.max(0, current - PAGE_SIZE))}
                  disabled={!hasPrev}
                  className="px-3 py-1.5 text-sm border border-border hover:border-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t("community.prev")}
                </button>
                <button
                  type="button"
                  onClick={() => setOffset((current) => current + PAGE_SIZE)}
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
