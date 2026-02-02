"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * 页面过渡动画包装器
 * 使用 CSS 动画实现淡入效果，无需额外依赖
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset and trigger animation on route change
    setIsVisible(false);
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}
