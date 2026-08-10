"use client";

/**
 * User avatar dropdown with sign-in / sign-out.
 *
 * When authenticated: shows avatar + dropdown with profile info and sign-out.
 * When unauthenticated: shows "Sign in" button.
 * When Supabase is not configured: renders nothing.
 */

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/lib/auth/use-user";
import { getAvatarImageSrc } from "@/lib/avatar";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { useI18n } from "@/lib/i18n/context";
import { ChevronDown, ChevronRight, Loader2, LogIn, LogOut, User as UserIcon } from "lucide-react";

export function UserMenu() {
  const { user, loading, signOut } = useUser();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Don't render anything while loading or if Supabase is not configured
  if (loading) {
    return <div className="w-8 h-8" />;
  }

  if (!user) {
    return (
      <LocalizedLink
        href="/login"
        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden lg:inline">{t("auth.signIn")}</span>
      </LocalizedLink>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const avatarSrc = getAvatarImageSrc(avatarUrl);
  const displayName = (user.user_metadata?.display_name as string) ||
    (user.user_metadata?.user_name as string) ||
    (user.user_metadata?.full_name as string) ||
    user.email ||
    "User";

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
      setOpen(false);
    } catch {
      // Keep the menu usable if the auth provider briefly fails to sign out.
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-transparent p-1 pr-2 text-sm text-muted transition-[border-color,background-color,color] hover:border-border hover:bg-foreground/[0.04] hover:text-foreground"
        aria-label={t("auth.account")}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="account-menu"
      >
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={displayName}
            width={28}
            height={28}
            unoptimized
            className="h-8 w-8 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-zinc-100 dark:bg-zinc-800">
            <UserIcon className="h-4 w-4" />
          </div>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id="account-menu"
          role="menu"
          aria-label={t("auth.account")}
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(19rem,calc(100vw-2rem))] origin-top-right animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 overflow-hidden rounded-2xl border border-border/80 bg-background/95 p-2 text-foreground shadow-2xl backdrop-blur-xl"
        >
          <div className="rounded-xl border border-border/70 bg-foreground/[0.035] p-3">
            <div className="flex items-center gap-3">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  width={44}
                  height={44}
                  unoptimized
                  className="h-11 w-11 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background">
                  <UserIcon className="h-5 w-5 text-muted" />
                </div>
              )}
              <div className="min-w-0">
                <p className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  {t("auth.account")}
                </p>
                <p className="truncate text-sm font-medium">{displayName}</p>
                {user.email && <p className="truncate text-xs text-muted">{user.email}</p>}
              </div>
            </div>
          </div>
          <LocalizedLink
            href="/profile"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="group mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-foreground/20">
              <UserIcon className="h-4 w-4" />
            </span>
            <span className="flex-1">{t("profile.title")}</span>
            <ChevronRight className="h-4 w-4 text-muted/60 transition-transform group-hover:translate-x-0.5" />
          </LocalizedLink>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            disabled={signingOut}
            role="menuitem"
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-red-500/[0.07] hover:text-red-600 disabled:cursor-wait disabled:opacity-60 dark:hover:text-red-400"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted transition-colors group-hover:border-red-500/20 group-hover:text-red-600 dark:group-hover:text-red-400">
              {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            </span>
            <span className="flex-1">{t("auth.signOut")}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Simplified mobile user menu (inline, no dropdown).
 */
export function MobileUserMenu() {
  const { user, loading, signOut } = useUser();
  const { t } = useI18n();
  const [signingOut, setSigningOut] = useState(false);

  if (loading) return null;

  if (!user) {
    return (
      <LocalizedLink
        href="/login"
        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
      >
        <LogIn className="w-4 h-4" />
        {t("auth.signIn")}
      </LocalizedLink>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const avatarSrc = getAvatarImageSrc(avatarUrl);
  const displayName = (user.user_metadata?.display_name as string) ||
    (user.user_metadata?.user_name as string) ||
    (user.user_metadata?.full_name as string) ||
    "User";

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
    } catch {
      // Keep the mobile menu usable if the auth provider briefly fails.
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-background/70 p-3">
      <div className="flex items-center gap-3">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={displayName}
            width={24}
            height={24}
            unoptimized
            className="h-9 w-9 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-zinc-100 dark:bg-zinc-800">
            <UserIcon className="h-4 w-4" />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{t("auth.account")}</p>
          <p className="truncate text-sm font-medium">{displayName}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
        <LocalizedLink
          href="/profile"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-2 text-xs text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <UserIcon className="h-3.5 w-3.5" />
          {t("profile.title")}
        </LocalizedLink>
        <button
          type="button"
          onClick={() => void handleSignOut()}
          disabled={signingOut}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-2 text-xs text-muted transition-colors hover:border-red-500/20 hover:text-red-600 disabled:cursor-wait disabled:opacity-60 dark:hover:text-red-400"
        >
          {signingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
          {t("auth.signOut")}
        </button>
      </div>
    </div>
  );
}
