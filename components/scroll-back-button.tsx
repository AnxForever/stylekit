"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { navigateBackOrFallback } from "@/lib/navigation/smart-back";

interface ScrollBackButtonProps {
  label?: string;
  href?: string;
  className?: string;
  savedReturnUrlKey?: string;
  fallbackHref?: string;
}

export function ScrollBackButton({
  label,
  href,
  className = "",
  savedReturnUrlKey,
  fallbackHref,
}: ScrollBackButtonProps) {
  const { t } = useI18n();
  const resolvedLabel = label ?? t("nav.back");
  const router = useRouter();

  useEffect(() => {
    // 页面加载时恢复滚动位置
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname) {
      const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedScroll) {
        const y = parseInt(savedScroll, 10);
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: "instant" });
        });
        sessionStorage.removeItem(`scroll-${pathname}`);
      }
    }
  }, []);

  const handleClick = () => {
    // 保存当前滚动位置
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname) {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    }

    if (href) {
      navigateBackOrFallback(router, {
        href,
        savedReturnUrlKey:
          savedReturnUrlKey ?? (href === "/styles" ? "styles-return-url" : undefined),
        fallbackHref: fallbackHref ?? href,
      });
    } else {
      navigateBackOrFallback(router, { fallbackHref: fallbackHref ?? "/" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted hover:text-foreground border border-border hover:border-foreground transition-colors rounded ${className}`}
    >
      <ChevronLeft className="w-4 h-4" />
      {resolvedLabel}
    </button>
  );
}
