"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics/events";
import {
  FRIEND_PROMO_ID,
  FRIEND_PROMO_STORAGE_KEY,
} from "@/lib/home/friend-promo";

// Bump the id when promoting a new project so the banner shows again.
const PROMO = {
  id: FRIEND_PROMO_ID,
  name: "ProdClub",
  tagline: {
    zh: "ChatGPT Plus / Pro 会员代充服务",
    en: "Third-party ChatGPT Plus / Pro subscription top-ups",
  },
  siteUrl: "https://prodclub.xyz/r/6JJ9HG",
};

interface FriendPromoBannerProps {
  placement?: "home" | "contact";
}

export function FriendPromoBanner({ placement = "contact" }: FriendPromoBannerProps) {
  const { locale } = useI18n();
  // The banner is present in the initial HTML. A head bootstrap hides it
  // before first paint for returning visitors who dismissed this campaign.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(FRIEND_PROMO_STORAGE_KEY);
      document.documentElement.dataset.friendPromoDismissed =
        dismissed === PROMO.id ? "true" : "false";
    } catch {
      document.documentElement.dataset.friendPromoDismissed = "false";
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    document.documentElement.dataset.friendPromoDismissed = "true";
    try {
      localStorage.setItem(FRIEND_PROMO_STORAGE_KEY, PROMO.id);
    } catch {
      // localStorage unavailable; banner simply reappears next visit
    }
  };

  return (
    <div data-friend-promo className="border-b border-border bg-foreground/[0.03]">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 md:px-12 py-2.5 text-sm">
        <span aria-hidden className="hidden sm:block h-px w-6 bg-accent shrink-0" />
        <span className="shrink-0 text-[10px] tracking-[0.16em] uppercase text-muted">
          {locale === "zh" ? "广告" : "Ad"}
        </span>
        <p className="min-w-0 flex-1 truncate">
          <a
            href={PROMO.siteUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => trackEvent("cta_click", { label: "prodclub", location: `${placement}_promo` })}
            className="font-medium underline-offset-4 hover:underline"
          >
            {PROMO.name}
          </a>
          <span className="text-muted">
            {" "}— {locale === "zh" ? PROMO.tagline.zh : PROMO.tagline.en}
          </span>
        </p>
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
        <button
          type="button"
          onClick={dismiss}
          aria-label={locale === "zh" ? "关闭广告" : "Dismiss advertisement"}
          className="shrink-0 p-1 text-muted transition-colors hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
