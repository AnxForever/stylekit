"use client";

import Link from "next/link";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import { Github, LogIn } from "lucide-react";

export function LoginContent() {
  const { user, loading, signInWithGitHub, signInWithLinuxDo } = useUser();
  const { t } = useI18n();

  if (loading) {
    return (
      <div className="max-w-md mx-auto px-6 py-24">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mx-auto" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-64 mx-auto" />
          <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded mt-8" />
          <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <p className="text-muted mb-6">{t("auth.alreadySignedIn")}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
        >
          {t("auth.goHome")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {t("auth.loginTitle")}
        </h1>
        <p className="text-sm text-muted">
          {t("auth.loginSubtitle")}
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={signInWithGitHub}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-border text-foreground font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <Github className="w-5 h-5" />
          {t("auth.signInWithGitHub")}
        </button>

        <button
          onClick={signInWithLinuxDo}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-border text-foreground font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <LogIn className="w-5 h-5" />
          {t("auth.signInWithLinuxDo")}
        </button>
      </div>
    </div>
  );
}
