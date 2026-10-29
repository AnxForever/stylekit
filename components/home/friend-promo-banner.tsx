"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";

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
const MARQUEE_REPEAT = 3;

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
  const copy = (
    <>
      <span className="font-medium text-foreground">{PROMO.name}</span>
      <span className="text-muted">{` — ${tagline}`}</span>
    </>
  );

  return (
    <div data-friend-promo className="border-b border-border bg-foreground/[0.03]">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 md:px-12 py-1.5 text-xs sm:text-sm">
        <span aria-hidden className="hidden sm:block h-px w-6 bg-accent shrink-0" />
        <span className="shrink-0 text-[10px] tracking-[0.16em] uppercase text-muted">
          {locale === "zh" ? "广告" : "Ad"}
        </span>
        {scrolls ? (
          <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div data-friend-promo-track className="flex w-max items-center">
              {[0, 1].map((loop) => (
                <div
                  key={loop}
                  aria-hidden={loop === 1}
                  className="flex shrink-0 items-center gap-8 pr-8"
                >
                  {Array.from({ length: MARQUEE_REPEAT }, (_, index) => (
                    <span
                      key={index}
                      aria-hidden={index > 0}
                      className="flex shrink-0 items-center gap-8 whitespace-nowrap"
                    >
                      {copy}
                      <span aria-hidden className="select-none text-border">
                        ·
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // A div, not a p: the global `p { text-wrap: pretty }` rule would
          // override the truncation and wrap the line onto two rows.
          <div className="min-w-0 flex-1 truncate">{copy}</div>
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
