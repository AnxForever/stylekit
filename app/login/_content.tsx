"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useUser } from "@/lib/auth/use-user";
import { sanitizeNextPath } from "@/lib/auth/next-path";
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
  Eye,
  EyeOff,
} from "lucide-react";
import { LinuxDoMark, NodeLocMark } from "@/components/auth/brand-marks";
import { XiaoheiLoading } from "@/components/profile/xiaohei-note";
const LoginBrandInk = dynamic(
  () => import("@/components/auth/login-brand-ink").then((module) => module.LoginBrandInk),
  { ssr: false, loading: () => null },
);

// Email login uses the app's SMTP service and a server-generated numeric code.
// Supabase is only used to create the user and establish the final session.
const EMAIL_OTP_ENABLED = true;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EmailStage = "idle" | "code";
type AuthMode = "login" | "register";
type EmailMethod = "password" | "otp";

export function LoginContent() {
  const {
    user,
    loading: authLoading,
    signInWithGitHub,
    signInWithLinuxDo,
    signInWithNodeLoc,
    signInWithPassword,
    signUpWithPassword,
    signInWithEmailOtp,
    verifyEmailOtp,
  } = useUser();
  const { t, locale, setLocale } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const authError = searchParams.get("auth_error");
  const nextParam = searchParams.get("next");
  const nextPath = sanitizeNextPath(nextParam);
  const [dismissed, setDismissed] = useState(false);
  // Which social provider is mid-redirect, so the buttons can show a spinner
  // and lock out double-clicks during the (visible) OAuth navigation delay.
  const [pendingProvider, setPendingProvider] = useState<
    "github" | "linuxdo" | "nodeloc" | null
  >(null);
  // next-themes resolves the actual theme only on the client. Gate the
  // theme-dependent icon on mount so the server and first client render agree
  // (avoids the React #418 hydration mismatch the toggle otherwise triggers).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Email OTP flow state
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [emailMethod, setEmailMethod] = useState<EmailMethod>("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [stage, setStage] = useState<EmailStage>("idle");
  const [emailBusy, setEmailBusy] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const errorMessage =
    authError === "linuxdo"
      ? t("auth.errorLinuxDo")
      : authError === "nodeloc"
        ? t("auth.errorNodeLoc")
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

  const switchAuthMode = (nextMode: AuthMode) => {
    setAuthMode(nextMode);
    setPassword("");
    setConfirmPassword("");
    setPasswordError(null);
    setPasswordSuccess(false);
    setEmailError(null);
  };

  const switchLocale = () => {
    const targetLocale = locale === "zh" ? "en" : "zh";
    setLocale(targetLocale);

    const currentPath = `${pathname || "/login"}${
      typeof window === "undefined"
        ? ""
        : `${window.location.search}${window.location.hash}`
    }`;

    router.replace(localizeHref(currentPath, targetLocale), { scroll: false });
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setPasswordError(t("auth.emailInvalid"));
      return;
    }
    if (!password) {
      setPasswordError(t("auth.passwordRequired"));
      return;
    }
    if (authMode === "register" && password.length < 8) {
      setPasswordError(t("auth.passwordMinLength"));
      return;
    }
    if (authMode === "register" && password !== confirmPassword) {
      setPasswordError(t("auth.passwordMismatch"));
      return;
    }

    setPasswordBusy(true);
    setPasswordError(null);
    try {
      if (authMode === "login") {
        await signInWithPassword(normalizedEmail, password);
        window.location.href = nextPath;
      } else {
        const result = await signUpWithPassword(normalizedEmail, password, nextPath);
        if (result.needsEmailConfirmation) {
          setPasswordSuccess(true);
        } else {
          window.location.href = nextPath;
        }
      }
    } catch {
      setPasswordError(
        authMode === "login" ? t("auth.passwordError") : t("auth.registerError"),
      );
    } finally {
      setPasswordBusy(false);
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

  const handleNodeLoc = async () => {
    if (pendingProvider) return;
    setPendingProvider("nodeloc");
    try {
      await signInWithNodeLoc(nextPath);
    } catch {
      setPendingProvider(null);
    }
  };

  const passwordForm = passwordSuccess ? (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Check className="h-5 w-5" aria-hidden="true" />
      </div>
      <h2 className="font-serif text-2xl">{t("auth.accountCreated")}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {t("auth.checkEmailConfirmation")}
      </p>
      <button
        type="button"
        onClick={() => {
          setPasswordSuccess(false);
          setEmailMethod("otp");
        }}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-medium text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
      >
        {t("auth.useCodeInstead")}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  ) : (
    <form
      onSubmit={handlePasswordSubmit}
      noValidate
      aria-label={authMode === "login" ? t("auth.loginTitle") : t("auth.registerTitle")}
      aria-describedby={passwordError ? "password-form-error" : "password-form-hint"}
      className="rounded-2xl border border-border/80 bg-background/55 p-4 sm:p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">01 / 01</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            {authMode === "login" ? t("auth.passwordMode") : t("auth.register")}
          </p>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted">
          <Mail className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="login-email" className="mb-2 block text-xs font-medium text-muted">
            {t("auth.emailLabel")}
            <span aria-hidden="true" className="ml-1 text-accent">*</span>
            <span className="sr-only">{locale === "zh" ? "必填" : "required"}</span>
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(passwordError && !EMAIL_PATTERN.test(email.trim()))}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("auth.emailPlaceholder")}
            className="min-h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted/60 transition-[border-color,box-shadow] focus:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/10"
            autoCapitalize="none"
            spellCheck={false}
          />
        </div>

        <div>
          <label htmlFor="login-password" className="mb-2 block text-xs font-medium text-muted">
            {t("auth.passwordLabel")}
            <span aria-hidden="true" className="ml-1 text-accent">*</span>
            <span className="sr-only">{locale === "zh" ? "必填" : "required"}</span>
          </label>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete={authMode === "login" ? "current-password" : "new-password"}
              required
              minLength={authMode === "register" ? 8 : undefined}
              aria-required="true"
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? "password-form-error" : "password-form-hint"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              className="min-h-11 w-full rounded-xl border border-border bg-background px-3.5 pr-12 text-sm text-foreground placeholder:text-muted/60 transition-[border-color,box-shadow] focus:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((visible) => !visible)}
              aria-label={passwordVisible
                ? (locale === "zh" ? "隐藏密码" : "Hide password")
                : (locale === "zh" ? "显示密码" : "Show password")}
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
            >
              {passwordVisible ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {authMode === "register" && (
            <p id="password-form-hint" className="mt-2 text-xs text-muted">
              {t("auth.passwordMinLength")}
            </p>
          )}
        </div>

        {authMode === "register" && (
          <div>
            <label htmlFor="confirm-password" className="mb-2 block text-xs font-medium text-muted">
              {t("auth.confirmPasswordLabel")}
              <span aria-hidden="true" className="ml-1 text-accent">*</span>
              <span className="sr-only">{locale === "zh" ? "必填" : "required"}</span>
            </label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type={passwordVisible ? "text" : "password"}
              autoComplete="new-password"
              required
              aria-required="true"
              aria-invalid={Boolean(passwordError && password !== confirmPassword)}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder={t("auth.confirmPasswordPlaceholder")}
              className="min-h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted/60 transition-[border-color,box-shadow] focus:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/10"
            />
          </div>
        )}
      </div>

      {passwordError && (
        <p id="password-form-error" role="alert" aria-live="assertive" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs leading-relaxed text-red-600 dark:text-red-400">
          {passwordError}
        </p>
      )}
      {authMode === "login" && (
        <p id="password-form-hint" className="mt-3 text-xs text-muted">
          <button
            type="button"
            onClick={() => {
              setEmailMethod("otp");
              setPasswordError(null);
            }}
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            {t("auth.passwordLoginPrompt")}
          </button>
        </p>
      )}
      <button
        type="submit"
        disabled={passwordBusy}
        aria-busy={passwordBusy}
        className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-[0_8px_20px_-12px_var(--foreground)] transition-[transform,opacity,box-shadow] duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg disabled:translate-y-0 disabled:cursor-wait disabled:opacity-50 motion-reduce:transform-none"
      >
        {passwordBusy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            <span className="sr-only">{locale === "zh" ? "处理中" : "Submitting"}</span>
            {authMode === "login" ? t("auth.signingIn") : t("auth.registering")}
          </>
        ) : (
          <>
            {authMode === "login" ? t("auth.passwordContinue") : t("auth.registerContinue")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );

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
        <span className="rounded-full border border-zinc-900/10 bg-white/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 backdrop-blur-sm">
          {CURATED_STYLE_COUNT}+ {t("auth.curatedStyles")}
        </span>
      </div>

      <div className="relative z-10 max-w-md animate-[home-reveal-up-strong_700ms_ease-out_both]">
        <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
          <span className="h-px w-8 bg-zinc-900/30" aria-hidden="true" />
          {t("auth.perksHeading")}
        </p>
        <h2 className="mb-10 max-w-sm font-serif text-3xl leading-[1.12] text-zinc-900 xl:text-[2.75rem]">
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

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
        <XiaoheiLoading
          locale={locale}
          label={locale === "zh" ? "正在确认登录状态" : "Checking your session"}
        />
      </div>
    );
  }

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
          onClick={switchLocale}
          aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}
          title={locale === "zh" ? "Switch to English" : "切换到中文"}
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
  if (user) {
    formBody = (
      <div className="flex flex-col">
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
        <div className="mb-5 animate-[home-reveal-up-strong_650ms_ease-out_both]">
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center bg-foreground font-serif text-xs font-bold text-background shadow-[4px_4px_0_var(--accent)]">
              SK
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                StyleKit
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {t("auth.secureAccess")}
            </span>
          </div>
          <h1 className="mb-2 font-serif text-4xl leading-[1.05] md:text-[2.75rem]">
            {authMode === "login" ? t("auth.loginTitle") : t("auth.registerTitle")}
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {authMode === "login" ? t("auth.loginTagline") : t("auth.registerTagline")}
          </p>
        </div>

        {errorMessage && !dismissed && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-300/70 bg-red-50/80 px-4 py-3 text-sm text-red-800 shadow-sm dark:border-red-800 dark:bg-red-950/50 dark:text-red-300"
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

        <div className="mb-4">
          <div
            role="group"
            aria-label={locale === "zh" ? "账户操作" : "Account action"}
            className="grid grid-cols-2 rounded-xl border border-border bg-foreground/[0.025] p-1"
          >
            <button
              type="button"
              aria-pressed={authMode === "login"}
              onClick={() => switchAuthMode("login")}
              className={`min-h-11 rounded-lg px-3 text-sm font-medium transition-colors ${authMode === "login" ? "bg-background text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
            >
              {t("auth.signIn")}
            </button>
            <button
              type="button"
              aria-pressed={authMode === "register"}
              onClick={() => switchAuthMode("register")}
              className={`min-h-11 rounded-lg px-3 text-sm font-medium transition-colors ${authMode === "register" ? "bg-background text-foreground shadow-sm" : "text-muted hover:text-foreground"}`}
            >
              {t("auth.register")}
            </button>
          </div>
        </div>

        {emailMethod === "password" ? passwordForm : (
        <div>
        <button
          type="button"
          onClick={() => {
            setEmailMethod("password");
            setStage("idle");
            setCode("");
            setEmailError(null);
          }}
          className="mb-4 inline-flex min-h-10 items-center gap-1.5 text-xs text-muted underline underline-offset-2 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {t("auth.usePasswordInstead")}
        </button>

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
          <div className="rounded-2xl border border-border/80 bg-background/55 p-4 sm:p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">01 / 02</p>
                <p className="mt-1 text-sm font-medium text-foreground">{t("auth.emailVerification")}</p>
              </div>
              <Mail className="h-4 w-4 text-muted" strokeWidth={1.5} />
            </div>
            <label htmlFor="login-email" className="mb-2 block text-xs font-medium text-muted">
              {t("auth.emailLabel")}
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 transition-[border-color,box-shadow] focus-within:border-foreground focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--foreground)_10%,transparent)]">
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
                className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted/60 focus:outline-none"
                aria-label={t("auth.emailLabel")}
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>
            <button
              type="button"
              onClick={handleSendCode}
              disabled={emailBusy}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-[0_8px_20px_-12px_var(--foreground)] transition-[transform,opacity,box-shadow] duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg disabled:translate-y-0 disabled:opacity-50 motion-reduce:transform-none"
            >
              {emailBusy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                  {t("auth.sending")}
                </>
              ) : (
                <>
                  {t("auth.emailContinue")}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {t("auth.newAccountNote")}
            </p>
            {emailError && (
              <p role="alert" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">{emailError}</p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-foreground/15 bg-background/55 p-4 sm:p-4">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">02 / 02</p>
                <p className="mt-1 text-sm font-medium text-foreground">{t("auth.checkInbox")}</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-4 w-4" />
              </span>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-muted">
              {t("auth.codeSentTo").replace("{email}", email.trim())}
            </p>
            <label htmlFor="login-code" className="sr-only">{t("auth.codeLabel")}</label>
            <input
              id="login-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
              placeholder={t("auth.codePlaceholder")}
              className="w-full rounded-xl border border-border bg-background px-3 py-4 text-center font-mono text-2xl tracking-[0.42em] text-foreground placeholder:text-sm placeholder:tracking-normal placeholder:text-muted/60 focus:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/10"
              aria-label={t("auth.codeLabel")}
              autoFocus
            />
            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={emailBusy}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-[0_8px_20px_-12px_var(--foreground)] transition-[transform,opacity,box-shadow] duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg disabled:translate-y-0 disabled:opacity-50 motion-reduce:transform-none"
            >
              {emailBusy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                  {t("auth.verifying")}
                </>
              ) : (
                <>
                  {t("auth.verify")}
                  <Check className="h-4 w-4" />
                </>
              )}
            </button>
            {emailError && (
              <p role="alert" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">{emailError}</p>
            )}
            <div className="mt-4 flex items-center justify-between text-xs">
              <button
                type="button"
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
                type="button"
                onClick={handleSendCode}
                disabled={emailBusy}
                className="text-muted transition-colors hover:text-foreground disabled:opacity-50"
              >
                {t("auth.resendCode")}
              </button>
            </div>
          </div>
        )}
        </div>
        )}

        {/* Social sign-in: a compact row on desktop, full-width buttons on mobile. */}
        <div className="my-5 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {t("auth.social")}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid gap-2.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleGitHub}
            disabled={pendingProvider !== null}
            aria-busy={pendingProvider === "github"}
            aria-label={t("auth.signInWithGitHub")}
            className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-2.5 py-2.5 text-xs font-medium text-foreground shadow-none transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground/[0.04] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
          >
            {pendingProvider === "github" ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <Github className="h-4 w-4 shrink-0" />
            )}
            <span className="truncate">
              {pendingProvider === "github" ? t("auth.redirecting") : "GitHub"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleNodeLoc}
            disabled={pendingProvider !== null}
            aria-busy={pendingProvider === "nodeloc"}
            aria-label={t("auth.signInWithNodeLoc")}
            className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-2.5 py-2.5 text-xs font-medium text-foreground shadow-none transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground/[0.04] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
          >
            {pendingProvider === "nodeloc" ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <NodeLocMark className="h-4 w-4 shrink-0" />
            )}
            <span className="truncate">
              {pendingProvider === "nodeloc" ? t("auth.redirecting") : "NodeLoc"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleLinuxDo}
            disabled={pendingProvider !== null}
            aria-busy={pendingProvider === "linuxdo"}
            aria-label={t("auth.signInWithLinuxDo")}
            className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-2.5 py-2.5 text-xs font-medium text-foreground shadow-none transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground/[0.04] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none"
          >
            {pendingProvider === "linuxdo" ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            ) : (
              <LinuxDoMark className="h-4 w-4 shrink-0" />
            )}
            <span className="truncate">
              {pendingProvider === "linuxdo" ? t("auth.redirecting") : "Linux DO"}
            </span>
          </button>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted">
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
    <div className="relative min-h-dvh bg-background text-foreground lg:grid lg:h-dvh lg:min-h-0 lg:grid-cols-[0.82fr_1fr] xl:grid-cols-[0.78fr_1.05fr]">
      {brandPanel}
      <main
        className={`flex min-h-dvh flex-col px-5 py-4 transition-opacity duration-300 sm:px-10 sm:py-6 md:px-16 lg:min-h-0 lg:overflow-hidden lg:px-12 lg:py-5 motion-reduce:transition-none ${pendingProvider ? "opacity-40" : "opacity-100"}`}
      >
        {topBar}
        <div className="flex min-h-0 flex-1 items-center justify-center py-5 lg:py-3">
          <div className="w-full max-w-[31rem] rounded-[1.75rem] border border-border/70 bg-background/90 p-4 shadow-[0_18px_54px_-44px_color-mix(in_srgb,var(--foreground)_36%,transparent)] backdrop-blur-sm sm:p-6 lg:p-6">
            {formBody}
          </div>
        </div>
        {formFooter}
      </main>

      {pendingProvider && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-6 backdrop-blur-sm"
        >
          <XiaoheiLoading
            locale={locale}
            label={
              pendingProvider === "linuxdo"
                ? t("auth.signInWithLinuxDo")
                : pendingProvider === "nodeloc"
                  ? t("auth.signInWithNodeLoc")
                  : t("auth.signInWithGitHub")
            }
            detail={t("auth.redirecting")}
          />
        </div>
      )}
    </div>
  );
}
