"use client";

import { Fragment } from "react";
import { ArrowUpRight, MessageSquareText } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import { COMMUNITY_GROUP, resolveCommunityGroupDestination } from "@/lib/community/join";
import { localizeHref } from "@/lib/i18n/routing";

// A house ad that stays up permanently. Since there is no dismiss control, the
// homepage copy marquee-scrolls on one compact line instead of truncating, and
// the call to action stays fixed so it never moves under the pointer.
const PROMO = {
  name: "ProdClub",
  tagline: {
    zh: "ChatGPT Plus / Pro 会员代充服务",
    en: "Third-party ChatGPT Plus / Pro subscription top-ups",
  },
  siteUrl: "https://prodclub.xyz/r/6JJ9HG",
};

// Each half of the loop is repeated enough times to outrun the widest bar, so
// the -50% translation never exposes an empty gap.
const MARQUEE_REPEAT = 2;

interface FriendPromoBannerProps {
  placement?: "home" | "contact";
}

export function FriendPromoBanner({ placement = "contact" }: FriendPromoBannerProps) {
  const { locale } = useI18n();
  // Only the homepage marquee-scrolls. The ad also sits under the contact page
  // content, where a moving line would compete with the support channels, so it
  // stays as one static, truncated line there.
  const scrolls = placement === "home";
  const tagline = locale === "zh" ? PROMO.tagline.zh : PROMO.tagline.en;

  // The community group alternates with the ad so the floating rail on the
  // left is not the only way to discover it.
  const groupDestination = resolveCommunityGroupDestination(COMMUNITY_GROUP);
  const groupInvite =
    groupDestination.kind === "invite" ? groupDestination.href : null;
  const groupHref = groupInvite ?? localizeHref("/community/join", locale);
  const groupName = locale === "zh" ? "StyleKit 交流群" : "StyleKit community";
  const groupDetail = COMMUNITY_GROUP.groupNumber
    ? locale === "zh"
      ? `QQ 群 ${COMMUNITY_GROUP.groupNumber}，聊风格、提示词和建站`
      : `QQ group ${COMMUNITY_GROUP.groupNumber} for styles, prompts, and site builds`
    : locale === "zh"
      ? "一起聊风格、提示词和建站"
      : "Styles, prompts, and site builds";

  // Each message carries its own tag: the bar no longer shows a single fixed
  // "ad" label, so the group invite is not labelled as paid placement.
  const adCopy = (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {locale === "zh" ? "广告" : "Ad"}
      </span>
      <span className="font-medium text-foreground">{PROMO.name}</span>
      <span className="text-muted">{` — ${tagline}`}</span>
    </>
  );

  const groupCopy = (interactive: boolean) => (
    <>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        {locale === "zh" ? "交流群" : "Community"}
      </span>
      <a
        href={groupHref}
        {...(groupInvite ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        tabIndex={interactive ? undefined : -1}
        onClick={() =>
          trackEvent("cta_click", { label: "community-group", location: `${placement}_promo` })
        }
        className="inline-flex items-center gap-1.5 text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:text-accent"
      >
        <MessageSquareText aria-hidden className="h-3.5 w-3.5 text-muted" />
        <span className="font-medium">{groupName}</span>
        <span className="text-muted">{` — ${groupDetail}`}</span>
        <ArrowUpRight aria-hidden className="h-3 w-3 text-muted" />
      </a>
    </>
  );

  return (
    <div data-friend-promo className="border-b border-border bg-foreground/[0.03]">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 md:px-12 py-1.5 text-xs sm:text-sm">
        <span aria-hidden className="hidden sm:block h-px w-6 bg-accent shrink-0" />
        {scrolls ? (
          <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div data-friend-promo-track className="flex w-max items-center">
              {[0, 1].map((loop) => (
                <div
                  key={loop}
                  aria-hidden={loop === 1}
                  className="flex shrink-0 items-center gap-8 pr-8"
                >
                  {Array.from({ length: MARQUEE_REPEAT }, (_, repeat) => {
                    // Only the first copy of each message is exposed to
                    // assistive tech and the keyboard; the rest is decorative
                    // filler that makes the loop seamless.
                    const duplicate = loop === 1 || repeat > 0;
                    return (
                      <Fragment key={repeat}>
                        <span
                          aria-hidden={duplicate}
                          className="flex shrink-0 items-center gap-2 whitespace-nowrap"
                        >
                          {adCopy}
                          <span aria-hidden className="select-none text-border">
                            ·
                          </span>
                        </span>
                        <span
                          aria-hidden={duplicate}
                          className="flex shrink-0 items-center gap-2 whitespace-nowrap"
                        >
                          {groupCopy(!duplicate)}
                          <span aria-hidden className="select-none text-border">
                            ·
                          </span>
                        </span>
                      </Fragment>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // A div, not a p: the global `p { text-wrap: pretty }` rule would
          // override the truncation and wrap the line onto two rows.
          <div className="min-w-0 flex-1 flex items-center gap-2 truncate">{adCopy}</div>
        )}
        <a
          href={PROMO.siteUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          onClick={() => trackEvent("cta_click", { label: "prodclub", location: `${placement}_promo` })}
          className="shrink-0 inline-flex items-center gap-1.5 border border-foreground/30 px-2.5 py-1 text-xs tracking-wide transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
        >
          {locale === "zh" ? "查看服务" : "View service"}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
