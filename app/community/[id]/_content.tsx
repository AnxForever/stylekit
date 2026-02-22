"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { useI18n } from "@/lib/i18n/context";
import type { SubmissionRecord } from "@/lib/submit/reviewer";
import type { DesignStyle } from "@/lib/styles";

interface Props {
  submission: SubmissionRecord;
  style: DesignStyle;
}

function parseAuthor(
  formData: Record<string, unknown>
): { handle: string; avatarUrl: string | null; provider: string } {
  const meta = formData.__author;
  if (meta && typeof meta === "object" && !Array.isArray(meta)) {
    const m = meta as Record<string, unknown>;
    const handle =
      typeof m.handle === "string" && m.handle.trim()
        ? m.handle.trim().replace(/^@+/, "")
        : "anonymous";
    const avatarUrl = typeof m.avatarUrl === "string" ? m.avatarUrl : null;
    const provider = typeof m.provider === "string" ? m.provider : "unknown";
    return { handle, avatarUrl, provider };
  }
  const authorName =
    typeof formData.authorName === "string" ? formData.authorName.trim() : "";
  return {
    handle: authorName.replace(/^@+/, "") || "anonymous",
    avatarUrl: null,
    provider: "unknown",
  };
}

function formatDate(iso: string, locale: "zh" | "en"): string {
  const dateLocale = locale === "zh" ? "zh-CN" : "en-US";
  return new Date(iso).toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function CommunitySubmissionContent({ submission, style }: Props) {
  const { t, locale } = useI18n();
  const author = parseAuthor(submission.formData);
  const backHref = `/community?slug=${submission.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="flex items-center gap-4 mb-6">
            <ScrollBackButton label={t("community.label")} href={backHref} />
            <div className="flex items-center gap-2 text-sm text-muted">
              <Link
                href="/community"
                className="hover:text-foreground transition-colors"
              >
                {t("community.label")}
              </Link>
              <span>/</span>
              <span>{style.name}</span>
            </div>
          </div>

          <div className={`${style.cover?.startsWith("data:") ? "grid grid-cols-1 md:grid-cols-2 gap-8 items-start" : ""}`}>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl mb-2">{style.name}</h1>
              {style.nameEn && style.nameEn !== style.name && (
                <p className="text-xl text-muted mb-4">{style.nameEn}</p>
              )}
              {style.description && (
                <p className="text-lg text-muted leading-relaxed mb-6">
                  {style.description}
                </p>
              )}

              {/* Author attribution */}
              <div className="inline-flex items-center gap-3 border border-border bg-background/70 px-3 py-2">
                {author.avatarUrl ? (
                  <Image
                    src={author.avatarUrl}
                    alt={author.handle}
                    width={24}
                    height={24}
                    unoptimized
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-muted/30 inline-flex items-center justify-center text-[11px] text-foreground">
                    {author.handle.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-sm text-muted">
                  {t("community.by")}{" "}
                  <span className="text-foreground font-medium">
                    @{author.handle}
                  </span>
                </span>
                {author.provider !== "unknown" && (
                  <span className="uppercase tracking-wide border border-border px-1 py-0.5 text-[10px]">
                    {author.provider}
                  </span>
                )}
                <time
                  dateTime={submission.submittedAt}
                  className="text-xs text-muted ml-2"
                >
                  {formatDate(submission.submittedAt, locale)}
                </time>
              </div>
            </div>

            {style.cover?.startsWith("data:") && (
              <div className="border border-border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={style.cover}
                  alt={`${style.name} cover`}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Color palette */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <p className="text-xs tracking-widest uppercase text-muted mb-4">
            Colors
          </p>
          <ColorPalette colors={style.colors} />
        </div>
      </section>

      {/* Design Rules */}
      {(style.philosophy || (style.doList && style.doList.length > 0) || (style.dontList && style.dontList.length > 0)) && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Design Rules
            </p>
            {style.philosophy && (
              <p className="text-base text-muted leading-relaxed mb-6">{style.philosophy}</p>
            )}
            {((style.doList && style.doList.length > 0) || (style.dontList && style.dontList.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {style.doList && style.doList.length > 0 && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-green-600 dark:text-green-400 mb-3">Do</p>
                    <ul className="space-y-2">
                      {style.doList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted">
                          <span className="text-green-600 dark:text-green-400 mt-0.5 shrink-0">&#10003;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {style.dontList && style.dontList.length > 0 && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-red-600 dark:text-red-400 mb-3">Don&apos;t</p>
                    <ul className="space-y-2">
                      {style.dontList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted">
                          <span className="text-red-600 dark:text-red-400 mt-0.5 shrink-0">&#10007;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Component Preview */}
      {style.components && Object.values(style.components).some((c) => c.code) && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Components
            </p>
            <ComponentPreview components={style.components} />
          </div>
        </section>
      )}

      {/* AI Rules */}
      {style.aiRules && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              AI Rules
            </p>
            <pre className="text-sm text-muted bg-muted/5 border border-border p-4 md:p-6 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {style.aiRules}
            </pre>
          </div>
        </section>
      )}

      {/* View all versions footer */}
      <section>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <Link
            href={backHref}
            className="text-sm underline underline-offset-4 hover:no-underline text-muted hover:text-foreground"
          >
            View all community submissions for {submission.slug}
          </Link>
        </div>
      </section>
    </>
  );
}
