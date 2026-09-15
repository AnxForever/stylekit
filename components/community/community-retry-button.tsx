"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function CommunityRetryButton({ locale }: { locale: "en" | "zh" }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={pending}
      aria-busy={pending}
      className="mt-4 min-h-10 rounded-md border border-border px-4 text-sm font-medium transition-colors hover:border-foreground disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {pending
        ? locale === "zh" ? "正在重试…" : "Retrying…"
        : locale === "zh" ? "重新加载" : "Try again"}
    </button>
  );
}
