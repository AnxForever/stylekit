"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref, stripLocaleFromPathname } from "@/lib/i18n/routing";
import {
  COMMUNITY_GROUP,
  resolveCommunityGroupDestination,
} from "@/lib/community/join";
import { trackEvent } from "@/lib/analytics/events";

/**
 * Floating left-edge entry to the community chat group.
 *
 * Desktop only: below `lg` the content column starts close enough to the edge
 * that a rail would overlap it, and the header/footer already link to
 * /community/join. Hidden on the same internal surfaces as the mobile bottom
 * nav, plus showcase pages where the prev/next pager owns the left edge, and
 * on /community/join itself where the link would point at the current page.
 *
 * The destination comes from lib/community/join.ts. A live group opens its
 * invite in a new tab; a pending one falls back to the join page, so the rail
 * is never a dead link.
 */
const HIDDEN_PREFIXES = ["/admin", "/experiments", "/validation", "/workspace"];
const SHOWCASE_PATH = /^\/styles\/[^/]+\/showcase\/?$/;

const RAIL_CLASS =
  "relative flex flex-col items-center gap-2 border border-l-0 border-border bg-background/90 px-2.5 py-3 text-muted shadow-sm backdrop-blur-sm transition-colors hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent";

const PANEL_CLASS =
  "pointer-events-none absolute left-full top-1/2 ml-2 w-56 -translate-y-1/2 border border-border bg-background p-4 text-left text-foreground opacity-0 shadow-sm transition-opacity duration-150 before:absolute before:right-full before:top-0 before:h-full before:w-2 before:content-[''] group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100";

export function CommunityRail() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const visiblePath = stripLocaleFromPathname(pathname || "/");

  if (
    visiblePath.startsWith("/community/join") ||
    HIDDEN_PREFIXES.some((prefix) => visiblePath.startsWith(prefix)) ||
    SHOWCASE_PATH.test(visiblePath)
  ) {
    return null;
  }
  const destination = resolveCommunityGroupDestination(COMMUNITY_GROUP);
  const label = t("nav.communityJoin");

  const handleClick = () => {
    trackEvent("cta_click", {
      label: "join_community_group",
      location: "community_rail",
    });
  };

  const content = (
    <>
      <MessageCircle className="size-4" aria-hidden="true" />
      <span className="text-[11px] tracking-[0.3em] [writing-mode:vertical-rl]">
        {label}
      </span>
      <span className={PANEL_CLASS} aria-hidden="true">
        {COMMUNITY_GROUP.groupNumber ? (
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {t("communityRail.groupNumber")} {COMMUNITY_GROUP.groupNumber}
          </span>
        ) : null}
        <span className="mt-2 block text-sm font-medium">
          {COMMUNITY_GROUP.name ?? label}
        </span>
        <span className="mt-1 block text-xs leading-5 text-muted">
          {t("communityRail.purpose")}
        </span>
        <span className="mt-3 inline-flex items-center gap-1 text-xs">
          {t("communityRail.cta")}
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </span>
      </span>
    </>
  );

  return (
    <div className="group fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      {destination.kind === "invite" ? (
        <a
          href={destination.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("communityRail.aria")}
          onClick={handleClick}
          className={RAIL_CLASS}
        >
          {content}
        </a>
      ) : (
        <Link
          href={localizeHref("/community/join", locale)}
          prefetch={false}
          aria-label={label}
          onClick={handleClick}
          className={RAIL_CLASS}
        >
          {content}
        </Link>
      )}
    </div>
  );
}
