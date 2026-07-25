"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Heart, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { thankYouEntries, thankYouModalConfig } from "@/lib/site/support";
import { cn } from "@/lib/utils";

// Entries screenshotted within a week of the newest one count as the same
// "batch" — donations usually arrive and get recorded in clusters.
const RECENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const sortedReceiptEntries = [...thankYouEntries]
  .filter((entry) => entry.receiptImage)
  .sort((a, b) => b.date.localeCompare(a.date));

const latestEntry = sortedReceiptEntries[0];

const latestReceiptEntries = latestEntry
  ? sortedReceiptEntries
      .filter(
        (entry) =>
          Date.parse(latestEntry.date) - Date.parse(entry.date) <= RECENT_WINDOW_MS
      )
      .slice(0, 6)
  : [];

// Keyed by the newest entry so every new donation batch invalidates the old
// dismissal and the ledger announces itself exactly once more.
const dismissStorageKey = latestEntry
  ? `stylekit-thankyou-modal-dismissed:${latestEntry.id}`
  : "stylekit-thankyou-modal-dismissed";

interface ThankYouModalProps {
  showOnHomepageOnly?: boolean;
  className?: string;
}

export function ThankYouModal({
  showOnHomepageOnly = true,
  className,
}: ThankYouModalProps) {
  const [isEligible, setIsEligible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { locale } = useI18n();

  const rememberDismissal = () => {
    try {
      window.localStorage.setItem(dismissStorageKey, Date.now().toString());
    } catch {
      // Storage can be unavailable (private mode); the modal just re-opens next visit.
    }
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    const isHome = pathname === "/" || pathname === "/en" || pathname === "/zh";
    const eligible =
      (!showOnHomepageOnly || isHome) &&
      latestReceiptEntries.length > 0 &&
      thankYouModalConfig.enabled;

    if (!eligible) return;

    // Auto-open once per donation batch: a fresh batch means a fresh storage
    // key, so returning visitors see the new supporters exactly one more time.
    // Direct links (?support=thanks) always open regardless of dismissal.
    const shouldOpenFromLink =
      new URLSearchParams(window.location.search).get("support") === "thanks";
    let dismissed: string | null = null;
    try {
      dismissed = window.localStorage.getItem(dismissStorageKey);
    } catch {
      dismissed = null;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsEligible(true);
      if (shouldOpenFromLink || !dismissed) setIsOpen(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [showOnHomepageOnly]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      rememberDismissal();
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    trackEvent("cta_click", {
      label: "recent_supporters",
      location: "home_hero",
    });
  };

  const handleClose = () => {
    rememberDismissal();
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  if (!isEligible) return null;

  const supporterCount = latestReceiptEntries.length;
  const triggerLabel =
    locale === "zh"
      ? `感谢 ${supporterCount} 位近期支持者`
      : `Thank ${supporterCount} recent supporters`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn(
          "group inline-flex min-h-10 items-center gap-2 border-b border-foreground/25 py-1 text-xs tracking-wide text-muted transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background",
          className
        )}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-foreground">
          <Heart className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span>{triggerLabel}</span>
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-5">
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px]"
            onClick={handleClose}
            aria-label={locale === "zh" ? "关闭支持记录" : "Close supporter ledger"}
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="supporter-ledger-title"
            aria-describedby="supporter-ledger-description"
            className="relative max-h-[88dvh] w-full max-w-5xl overflow-y-auto rounded-t-[30px] border border-border bg-background shadow-[0_30px_100px_-32px_rgba(0,0,0,0.7)] sm:rounded-[30px]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur sm:px-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                {locale === "zh" ? "Community ledger / 社区记录" : "Community ledger"}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={locale === "zh" ? "关闭" : "Close"}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted">
                  {latestEntry?.date}
                </p>
                <h2 id="supporter-ledger-title" className="max-w-[12ch] font-display text-3xl leading-[1.05] tracking-tight sm:text-5xl">
                  {thankYouModalConfig.title[locale]}
                </h2>
                <p id="supporter-ledger-description" className="mt-5 max-w-md text-sm leading-7 text-muted sm:text-base">
                  {thankYouModalConfig.description[locale]}
                </p>
                <p className="mt-6 border-l-2 border-foreground pl-4 text-xs leading-6 text-muted">
                  {locale === "zh"
                    ? "这批记录关闭后不会再自动弹出；下次有新的支持时会再出现一次。"
                    : "Once closed, this batch stays quiet — the ledger returns only when new support arrives."}
                </p>
              </div>

              <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                {latestReceiptEntries.map((entry) => (
                  <figure
                    key={entry.id}
                    className="w-[76vw] max-w-[18rem] shrink-0 snap-center border border-border bg-zinc-50 p-3 dark:bg-zinc-900/60 sm:w-auto sm:max-w-none"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden border border-border bg-white">
                      <Image
                        src={entry.receiptImage!}
                        alt={entry.receiptAlt?.[locale] || "Receipt"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 76vw, 240px"
                        unoptimized
                      />
                    </div>
                    <figcaption className="mt-3 flex items-center justify-between gap-2 text-xs">
                      <span className="text-muted">{entry.date}</span>
                      <span className="font-medium text-foreground">
                        {entry.amount?.[locale]}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
