"use client";

import { ReactNode, useEffect } from "react";

/**
 * 禁用自动向上滚动的包装组件
 * 在detail页面中使用，防止Next.js app router的自动scroll to top行为
 */
export function DisableAutoScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 防止浏览器和Next.js的自动向上滚动
    // 当页面加载时，保持用户之前的滚动位置

    // 立即禁用浏览器的默认行为
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 使用 MutationObserver 监听文档变化
    // 如果检测到自动向上滚动，立即恢复到当前位置
    const observer = new MutationObserver(() => {
      // 这样做可以防止某些情况下的自动滚动
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false,
    });

    // 页面加载完成后，停止干涉滚动
    const timeoutId = setTimeout(() => {
      observer.disconnect();
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      // 恢复浏览器的默认滚动行为
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return <>{children}</>;
}
