"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="inline-block text-6xl md:text-7xl font-black tracking-tighter text-accent">
            Oops!
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl mb-4">出错了</h1>
        <p className="text-muted mb-8">
          抱歉，页面加载时发生了错误。请尝试刷新页面或稍后再试。
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
        >
          重试
        </button>
      </div>
    </div>
  );
}
