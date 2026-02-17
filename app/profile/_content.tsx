"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ExternalLink,
  Github,
  User,
  Calendar,
  Shield,
  LogIn,
} from "lucide-react";
import { useUser } from "@/lib/auth/use-user";
import { useFavorites } from "@/lib/favorites/context";
import { useI18n } from "@/lib/i18n/context";

export function ProfileContent() {
  const { user, loading } = useUser();
  const { favorites } = useFavorites();
  const { t, locale } = useI18n();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-muted/20" />
            <div className="space-y-3">
              <div className="h-7 w-48 bg-muted/20 rounded" />
              <div className="h-4 w-32 bg-muted/20 rounded" />
              <div className="h-4 w-56 bg-muted/20 rounded" />
            </div>
          </div>
          <div className="h-48 bg-muted/20 rounded" />
          <div className="h-32 bg-muted/20 rounded" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <User className="w-16 h-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t("profile.notLoggedIn")}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t("profile.signInPrompt")}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
          >
            <LogIn className="w-5 h-5" />
            {t("auth.signIn")}
          </Link>
        </div>
      </div>
    );
  }

  const userName = user.user_metadata?.user_name ?? "";
  const fullName = user.user_metadata?.full_name ?? "";
  const avatarUrl = user.user_metadata?.avatar_url ?? "";
  const email = user.email ?? "";
  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString(
        locale === "zh" ? "zh-CN" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  const provider =
    user.user_metadata?.provider ||
    user.app_metadata?.provider ||
    "github";
  const isLinuxDo = provider === "linuxdo";

  const profileUrl = isLinuxDo
    ? `https://linux.do/u/${userName}`
    : `https://github.com/${userName}`;
  const profileLabel = isLinuxDo
    ? t("profile.linuxdoProfile")
    : t("profile.githubProfile");
  const providerLabel = isLinuxDo
    ? t("profile.providerLinuxDo")
    : t("profile.providerGitHub");

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={userName}
            width={96}
            height={96}
            unoptimized
            className="w-24 h-24 rounded-full border-2 border-border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-border bg-muted/20 flex items-center justify-center">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
        )}

        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {userName}
          </h1>
          {fullName && fullName !== userName && (
            <p className="text-lg text-muted-foreground mt-1">{fullName}</p>
          )}
          {email && (
            <p className="text-sm text-muted-foreground mt-1">{email}</p>
          )}
          {createdAt && (
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2 justify-center sm:justify-start">
              <Calendar className="w-4 h-4" />
              {t("profile.memberSince")} {createdAt}
            </p>
          )}
          {userName && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
            >
              {isLinuxDo ? (
                <LogIn className="w-4 h-4" />
              ) : (
                <Github className="w-4 h-4" />
              )}
              {profileLabel}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Favorites */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
          <Heart className="w-5 h-5" />
          {t("profile.favorites")} ({favorites.length})
        </h2>

        {favorites.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            {t("profile.noFavorites")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((slug) => (
              <Link
                key={slug}
                href={`/styles/${slug}`}
                className="group block rounded-lg border border-border bg-background p-4 hover:border-foreground/20 transition-colors"
              >
                <p className="font-medium text-foreground group-hover:underline">
                  {slug}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("profile.viewStyle")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Account Info */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
          <Shield className="w-5 h-5" />
          {t("profile.accountInfo")}
        </h2>
        <div className="rounded-lg border border-border bg-background divide-y divide-border">
          <div className="flex justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">
              {t("profile.provider")}
            </span>
            <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
              {isLinuxDo ? (
                <LogIn className="w-4 h-4" />
              ) : (
                <Github className="w-4 h-4" />
              )}
              {providerLabel}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">
              {t("profile.userId")}
            </span>
            <span className="text-sm font-mono text-foreground">
              #{user.user_metadata?.seq_id ?? user.id.slice(0, 8)}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">
              {t("profile.email")}
            </span>
            <span className="text-sm text-foreground">{email}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
