"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import { Github, LogIn, X } from "lucide-react";

export function LoginContent() {
  const { user, loading, signInWithGitHub, signInWithLinuxDo } = useUser();
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const authError = searchParams.get("auth_error");
  const nextParam = searchParams.get("next");
  const nextPath = nextParam && nextParam.startsWith("/") ? nextParam : "/styles";
  const [dismissed, setDismissed] = useState(false);

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
          href={nextPath}
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
        >
          {t("auth.goHome")}
        </Link>
      </div>
    );
  }

  const errorMessage = authError === "linuxdo"
    ? t("auth.errorLinuxDo")
    : authError
      ? t("auth.errorGeneric")
      : null;

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

      {errorMessage && !dismissed && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
          <span className="flex-1">{errorMessage}</span>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={() => signInWithGitHub(nextPath)}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-border text-foreground font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <Github className="w-5 h-5" />
          {t("auth.signInWithGitHub")}
        </button>

        <button
          onClick={() => signInWithLinuxDo(nextPath)}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-border text-foreground font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <LogIn className="w-5 h-5" />
          {t("auth.signInWithLinuxDo")}
        </button>
      </div>
    </div>
  );
}
