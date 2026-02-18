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
import Link from "next/link";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";

export function UserMenu() {
  const { user, loading, signOut } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't render anything while loading or if Supabase is not configured
  if (loading) {
    return <div className="w-8 h-8" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden lg:inline">{t("auth.signIn")}</span>
      </Link>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const displayName = (user.user_metadata?.user_name as string) ||
    (user.user_metadata?.full_name as string) ||
    user.email ||
    "User";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        aria-label={t("auth.account")}
        aria-expanded={open}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={28}
            height={28}
            unoptimized
            className="w-7 h-7 rounded-full border border-border"
          />
        ) : (
          <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <UserIcon className="w-4 h-4" />
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 py-2 min-w-[200px] bg-background border border-border shadow-lg z-50">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium truncate">{displayName}</p>
            {user.email && (
              <p className="text-xs text-muted truncate">{user.email}</p>
            )}
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <UserIcon className="w-4 h-4" />
            {t("profile.title")}
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="w-full text-left px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {t("auth.signOut")}
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

  if (loading) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
      >
        <LogIn className="w-4 h-4" />
        {t("auth.signIn")}
      </Link>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const displayName = (user.user_metadata?.user_name as string) ||
    (user.user_metadata?.full_name as string) ||
    "User";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={24}
            height={24}
            unoptimized
            className="w-6 h-6 rounded-full border border-border"
          />
        ) : (
          <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <UserIcon className="w-3 h-3" />
          </div>
        )}
        <span className="text-sm">{displayName}</span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
        >
          <UserIcon className="w-3.5 h-3.5" />
          {t("profile.title")}
        </Link>
        <button
          onClick={signOut}
          className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
        >
          <LogOut className="w-3.5 h-3.5" />
          {t("auth.signOut")}
        </button>
      </div>
    </div>
  );
}
