"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

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
        <h1 className="text-2xl md:text-3xl mb-4">{t("error.title")}</h1>
        <p className="text-muted mb-8">
          {t("error.description")}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
        >
          {t("error.retry")}
        </button>
      </div>
    </div>
  );
}
