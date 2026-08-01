"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const PROMO_STORAGE_KEY = "stylekit-friend-promo-dismissed";

// Bump the id when promoting a new project so the banner shows again.
const PROMO = {
  id: "nextdevtpl-202608",
  name: "NextDevTpl",
  tagline: {
    zh: "开源 Next.js 16 SaaS 全栈启动模板：认证、支付、积分、多部署目标",
    en: "open-source Next.js 16 SaaS starter with auth, payments, credits, and deploy presets",
  },
  repoUrl: "https://github.com/evepupil/NextDevTpl",
  siteUrl: "https://nextdevtpl.chaosyn.com",
};

export function FriendPromoBanner() {
  const { locale } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(PROMO_STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- storage-derived visibility, avoids SSR hydration mismatch
      if (dismissed !== PROMO.id) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, PROMO.id);
    } catch {
      // localStorage unavailable; banner simply reappears next visit
    }
  };

  return (
    <div className="border-b border-border bg-foreground/[0.03]">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 md:px-12 py-2.5 text-sm">
        <span aria-hidden className="hidden sm:block h-px w-6 bg-accent shrink-0" />
        <span className="shrink-0 text-[10px] tracking-[0.16em] uppercase text-muted">
          {locale === "zh" ? "友情推荐" : "Community pick"}
        </span>
        <p className="min-w-0 flex-1 truncate">
          <a
            href={PROMO.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline-offset-4 hover:underline"
          >
            {PROMO.name}
          </a>
          <span className="text-muted">
            {" "}— {locale === "zh" ? PROMO.tagline.zh : PROMO.tagline.en}
          </span>
        </p>
        <a
          href={PROMO.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 border border-foreground/30 px-2.5 py-1 text-xs tracking-wide transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
          <ArrowUpRight className="h-3 w-3" />
        </a>
        <button
          type="button"
          onClick={dismiss}
          aria-label={locale === "zh" ? "关闭推荐横幅" : "Dismiss recommendation banner"}
          className="shrink-0 p-1 text-muted transition-colors hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
