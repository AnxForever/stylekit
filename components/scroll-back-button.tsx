"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { navigateBackOrFallback } from "@/lib/navigation/smart-back";

interface ScrollBackButtonProps {
  label?: string;
  href?: string;
  className?: string;
  savedReturnUrlKey?: string;
  fallbackHref?: string;
}

export function ScrollBackButton({
  label = "返回",
  href,
  className = "",
  savedReturnUrlKey,
  fallbackHref,
}: ScrollBackButtonProps) {
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

    // 返回到styles列表页面时，尝试恢复之前保存的URL（包含过滤器参数）
    if (href) {
      if (savedReturnUrlKey) {
        navigateBackOrFallback(router, {
          href,
          savedReturnUrlKey,
          fallbackHref: fallbackHref ?? href,
        });
        return;
      }

      // 如果指定了href，检查是否有保存的styles列表URL
      if (href === "/styles") {
        navigateBackOrFallback(router, {
          href,
          savedReturnUrlKey: "styles-return-url",
          fallbackHref: "/styles",
        });
        return;
      }
      router.push(href);
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
      {label}
    </button>
  );
}
