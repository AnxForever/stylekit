"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";
import { CURATED_STYLE_COUNT } from "@/lib/product/catalog-facts";
import {
  Github,
  Mail,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  ArrowUpLeft,
  Languages,
  Moon,
  Sun,
  Star,
  Package,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { LinuxDoMark } from "@/components/auth/brand-marks";
import { LoginBrandInk } from "@/components/auth/login-brand-ink";

// Flip to true once Supabase SMTP (email delivery) is configured for the
// project. Until then the email panel renders as a labelled "coming soon"
// preview instead of a button that would fail on send.
const EMAIL_OTP_ENABLED = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EmailStage = "idle" | "code";

export function LoginContent() {
  const {
    user,
    loading,
    signInWithGitHub,
    signInWithLinuxDo,
    signInWithEmailOtp,
    verifyEmailOtp,
  } = useUser();
  const { t, locale, setLocale } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const authError = searchParams.get("auth_error");
  const nextParam = searchParams.get("next");
  const nextPath = nextParam && nextParam.startsWith("/") ? nextParam : "/styles";
  const [dismissed, setDismissed] = useState(false);
  // Which social provider is mid-redirect, so the buttons can show a spinner
  // and lock out double-clicks during the (visible) OAuth navigation delay.
  const [pendingProvider, setPendingProvider] = useState<
    "github" | "linuxdo" | null
  >(null);
  // next-themes resolves the actual theme only on the client. Gate the
  // theme-dependent icon on mount so the server and first client render agree
  // (avoids the React #418 hydration mismatch the toggle otherwise triggers).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Email OTP flow state
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<EmailStage>("idle");
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const errorMessage =
    authError === "linuxdo"
      ? t("auth.errorLinuxDo")
      : authError
        ? t("auth.errorGeneric")
        : null;

  const handleSendCode = async () => {
    if (!EMAIL_PATTERN.test(email.trim())) {
      setEmailError(t("auth.emailInvalid"));
      return;
    }
    setEmailBusy(true);
    setEmailError(null);
    try {
      await signInWithEmailOtp(email.trim());
      setStage("code");
    } catch {
      setEmailError(t("auth.errorEmailSend"));
    } finally {
      setEmailBusy(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!/^\d{6}$/.test(code.trim())) {
      setEmailError(t("auth.codeInvalid"));
      return;
    }
    setEmailBusy(true);
    setEmailError(null);
    try {
      await verifyEmailOtp(email.trim(), code.trim());
      window.location.href = nextPath;
    } catch {
      setEmailError(t("auth.errorEmailVerify"));
    } finally {
      setEmailBusy(false);
    }
  };

  // OAuth sign-in navigates the whole document away, so there is a visible beat
  // between click and redirect. Reflect that in the button (spinner + disabled)
  // and guard against a second provider being launched mid-flight. On failure
  // to even start the redirect, release the lock so the user can retry.
  const handleGitHub = async () => {
    if (pendingProvider) return;
    setPendingProvider("github");
    try {
      await signInWithGitHub(nextPath);
    } catch {
      setPendingProvider(null);
    }
  };

  const handleLinuxDo = async () => {
    if (pendingProvider) return;
    setPendingProvider("linuxdo");
    try {
      await signInWithLinuxDo(nextPath);
    } catch {
      setPendingProvider(null);
    }
  };

  // PLACEHOLDER_BRAND_PANEL
  const perks = [
    { icon: Star, title: t("auth.perkFavoritesTitle"), desc: t("auth.perkFavoritesDesc") },
    { icon: Package, title: t("auth.perkKitsTitle"), desc: t("auth.perkKitsDesc") },
    { icon: RefreshCw, title: t("auth.perkSyncTitle"), desc: t("auth.perkSyncDesc") },
  ];

  const brandPanel = (
    <aside className="relative hidden overflow-hidden border-r border-border bg-white text-zinc-900 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      {/* Colored ink blooming into water on a white ground — an on-brand living
          watercolor. See components/auth/login-brand-ink.tsx. */}
      <LoginBrandInk />

      {/* Legibility wash: only a soft lift on the far-left edge where the copy
          sits, so the ink stays crisp and clear across most of the panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(96deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.28) 32%, rgba(255,255,255,0) 62%)",
        }}
      />
      {/* Oversized watermark wordmark, clipped by the panel edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-3 select-none font-serif text-[9rem] leading-none tracking-tight text-zinc-900/[0.06] xl:text-[12rem]"
      >
        SK
      </span>

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          StyleKit
        </span>
        <span className="font-mono text-[11px] tabular-nums text-zinc-400">
          {CURATED_STYLE_COUNT}+ {t("auth.curatedStyles")}
        </span>
      </div>

      <div className="relative z-10 max-w-md">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
          {t("auth.perksHeading")}
        </p>
        <h2 className="mb-10 font-serif text-3xl leading-[1.15] text-zinc-900 xl:text-4xl">
          {t("auth.brandStatement")}
        </h2>
        <ul className="divide-y divide-zinc-900/10 border-y border-zinc-900/10">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <li key={perk.title} className="flex items-start gap-4 py-4">
                <span className="mt-0.5 font-mono text-[10px] tabular-nums text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium leading-snug text-zinc-900">{perk.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600">{perk.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
        SK — 2026
      </div>
    </aside>
  );

  // Footer row for the form column — gives the wide right side a real
  // top/middle/bottom rhythm instead of one lone centered block.
  const formFooter = (
    <div className="flex flex-col gap-2 border-t border-border pt-5 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
      <span className="font-mono uppercase tracking-[0.14em]">
        StyleKit — {CURATED_STYLE_COUNT}+ {t("auth.curatedStyles")}
      </span>
      <div className="flex items-center gap-4">
        <Link
          href={localizeHref("/terms", locale)}
          className="transition-colors hover:text-foreground"
        >
          {t("auth.termsLink")}
        </Link>
        <Link
          href={localizeHref("/privacy", locale)}
          className="transition-colors hover:text-foreground"
        >
          {t("auth.privacyLink")}
        </Link>
      </div>
    </div>
  );

  // PLACEHOLDER_FORM_BODY
  const topBar = (
    <div className="flex items-center justify-between">
      <Link
        href={localizeHref("/", locale)}
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
      >
        <ArrowUpLeft className="h-3.5 w-3.5" />
        {t("auth.backToStyleKit")}
      </Link>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
          aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
          className="p-2 text-muted transition-colors hover:text-foreground"
        >
          <Languages className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={
            !mounted
              ? t("theme.switchToDark")
              : resolvedTheme === "dark"
                ? t("theme.switchToLight")
                : t("theme.switchToDark")
          }
          className="p-2 text-muted transition-colors hover:text-foreground"
        >
          {/* Render a stable placeholder until mounted so SSR and first client
              render match; swap to the resolved-theme icon afterwards. */}
          {!mounted ? (
            <Moon className="h-[18px] w-[18px] opacity-0" strokeWidth={1.5} />
          ) : resolvedTheme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} />
          ) : (
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );

  let formBody: React.ReactNode;
  if (loading) {
    formBody = (
      <div className="animate-pulse space-y-4">
        <div className="h-9 w-52 bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-8 h-12 bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-12 bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  } else if (user) {
    formBody = (
      <div>
        <h1 className="mb-3 font-serif text-3xl leading-tight">{t("auth.loginTitle")}</h1>
        <p className="mb-8 text-sm text-muted">{t("auth.alreadySignedIn")}</p>
        <Link
          href={nextPath}
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("auth.goHome")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  } else {
    formBody = (
      <div>
        {/* PLACEHOLDER_FORM_INNER */}
        <div className="mb-8">
          <div className="mb-6 inline-flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center bg-foreground font-serif text-xs font-bold text-background">
              SK
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              StyleKit
            </span>
          </div>
          <h1 className="mb-2 font-serif text-3xl leading-tight md:text-4xl">
            {t("auth.loginTitle")}
          </h1>
          <p className="text-sm leading-relaxed text-muted">{t("auth.loginTagline")}</p>
        </div>

        {errorMessage && !dismissed && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-3 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300"
          >
            <span className="flex-1">{errorMessage}</span>
            <button
              onClick={() => setDismissed(true)}
              className="shrink-0 text-red-600 transition-colors hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Social sign-in */}
        <div className="space-y-3">
          <button
            onClick={handleGitHub}
            disabled={pendingProvider !== null}
            aria-busy={pendingProvider === "github"}
            className="group flex w-full cursor-pointer items-center gap-3 border border-border px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground/[0.04] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pendingProvider === "github" ? (
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
            ) : (
              <Github className="h-5 w-5 shrink-0" />
            )}
            <span className="flex-1 text-left">
              {pendingProvider === "github"
                ? t("auth.redirecting")
                : t("auth.signInWithGitHub")}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </button>

          <button
            onClick={handleLinuxDo}
            disabled={pendingProvider !== null}
            aria-busy={pendingProvider === "linuxdo"}
            className="group flex w-full cursor-pointer items-center gap-3 border border-border px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground/[0.04] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pendingProvider === "linuxdo" ? (
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
            ) : (
              <LinuxDoMark className="h-5 w-5 shrink-0" />
            )}
            <span className="flex-1 text-left">
              {pendingProvider === "linuxdo"
                ? t("auth.redirecting")
                : t("auth.signInWithLinuxDo")}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-muted opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {t("auth.emailHeading")}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Email OTP */}
        {/* PLACEHOLDER_EMAIL_BLOCK */}
        {!EMAIL_OTP_ENABLED ? (
          <div>
            <div className="flex items-stretch">
              <div className="flex flex-1 items-center gap-2 border border-border bg-foreground/[0.02] px-3 py-3 opacity-60">
                <Mail className="h-4 w-4 shrink-0 text-muted" />
                <span className="text-sm text-muted">{t("auth.emailPlaceholder")}</span>
              </div>
              <span className="flex items-center border border-l-0 border-border px-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                {t("auth.emailComingSoon")}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {t("auth.emailComingSoonNote")}
            </p>
          </div>
        ) : stage === "idle" ? (
          <div>
            <div className="flex items-center gap-2 border border-border px-3 transition-colors focus-within:border-foreground">
              <Mail className="h-4 w-4 shrink-0 text-muted" />
              <input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                placeholder={t("auth.emailPlaceholder")}
                className="flex-1 bg-transparent py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
                aria-label={t("auth.emailLabel")}
              />
            </div>
            <button
              onClick={handleSendCode}
              disabled={emailBusy}
              className="mt-3 flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {emailBusy ? t("auth.sending") : t("auth.emailContinue")}
              {!emailBusy && <ArrowRight className="h-4 w-4" />}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {t("auth.newAccountNote")}
            </p>
            {emailError && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">{emailError}</p>
            )}
          </div>
        ) : (
          <div>
            <p className="mb-3 text-xs leading-relaxed text-muted">
              {t("auth.codeSentTo").replace("{email}", email.trim())}
            </p>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
              placeholder={t("auth.codePlaceholder")}
              className="w-full border border-border bg-transparent px-3 py-3 text-center font-mono text-lg tracking-[0.3em] text-foreground placeholder:tracking-normal placeholder:text-muted/60 focus:border-foreground focus:outline-none"
              aria-label={t("auth.codeLabel")}
              autoFocus
            />
            <button
              onClick={handleVerifyCode}
              disabled={emailBusy}
              className="mt-3 flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {emailBusy ? t("auth.verifying") : t("auth.verify")}
              {!emailBusy && <Check className="h-4 w-4" />}
            </button>
            {emailError && (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">{emailError}</p>
            )}
            <div className="mt-4 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setStage("idle");
                  setCode("");
                  setEmailError(null);
                }}
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" />
                {t("auth.useAnotherEmail")}
              </button>
              <button
                onClick={handleSendCode}
                disabled={emailBusy}
                className="text-muted transition-colors hover:text-foreground disabled:opacity-50"
              >
                {t("auth.resendCode")}
              </button>
            </div>
          </div>
        )}

        <p className="mt-8 text-xs leading-relaxed text-muted">
          {t("auth.termsPrefix")}{" "}
          <Link
            href={localizeHref("/terms", locale)}
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            {t("auth.termsLink")}
          </Link>{" "}
          {t("auth.and")}{" "}
          <Link
            href={localizeHref("/privacy", locale)}
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            {t("auth.privacyLink")}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[0.82fr_1fr] xl:grid-cols-[0.78fr_1.05fr]">
      {brandPanel}
      <main
        className={`flex min-h-screen flex-col px-6 py-8 transition-opacity duration-300 sm:px-10 md:px-16 lg:py-10 motion-reduce:transition-none ${pendingProvider ? "opacity-40" : "opacity-100"}`}
      >
        {topBar}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[26rem]">{formBody}</div>
        </div>
        {formFooter}
      </main>

      {pendingProvider && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-6 backdrop-blur-sm"
          role="status"
          aria-live="polite"
          aria-label={t("auth.redirecting")}
        >
          <div className="w-full max-w-sm border border-border bg-background/95 p-6 shadow-2xl sm:p-8">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-accent motion-reduce:animate-none" />
              <p className="font-serif text-xl">
                {pendingProvider === "linuxdo"
                  ? t("auth.signInWithLinuxDo")
                  : t("auth.signInWithGitHub")}
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t("auth.redirecting")}
            </p>
            <div className="mt-6 h-1 overflow-hidden bg-border" aria-hidden="true">
              <div className="h-full w-1/3 animate-pulse bg-accent motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
