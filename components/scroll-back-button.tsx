"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface ScrollBackButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

export function ScrollBackButton({
  label = "返回",
  href,
  className = "",
}: ScrollBackButtonProps) {
  const router = useRouter();

  useEffect(() => {
    // 页面加载时恢复滚动位置
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname) {
      const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedScroll) {
        const y = parseInt(savedScroll, 10);
        // 延迟一小段时间以确保DOM完全加载
        setTimeout(() => {
          window.scrollTo(0, y);
        }, 50);
      }
    }
  }, []);

  const handleClick = () => {
    // 保存当前滚动位置
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    if (pathname) {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    }

    // 返回或导航到指定href
    if (href) {
      router.push(href);
    } else {
      router.back();
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
