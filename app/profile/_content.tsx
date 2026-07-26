"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ExternalLink,
  Github,
  User,
  Calendar,
  LogIn,
  LogOut,
  Star,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
} from "lucide-react";
import { useUser } from "@/lib/auth/use-user";
import { useFavorites } from "@/lib/favorites/context";
import { useI18n } from "@/lib/i18n/context";
import {
  useProfileComments,
  useProfileSubmissions,
  useProfileRatings,
  useProfileTitle,
} from "@/lib/swr";
import { getAvatarImageSrc } from "@/lib/avatar";
import {
  EMPEROR_TITLE_TOKEN,
  EARLY_USER_TITLE_TOKEN,
  SITE_OWNER_TITLE_TOKEN,
} from "@/lib/auth/user-title-policy";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { FavoriteButton } from "@/components/favorite-button";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import type { StyleMeta } from "@/lib/styles/meta";

const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;
const SVG_PATH_RE = /^[MmLlHhVvCcSsQqTtAaZz0-9eE+.,\-\s]+$/;

function getTitleBadgeClass(title: string): string {
  if (title === EMPEROR_TITLE_TOKEN) {
    return "border-amber-300/80 bg-amber-100 text-amber-800 dark:border-amber-700 dark:bg-amber-900/40 dark:text-amber-200";
  }

  if (title === EARLY_USER_TITLE_TOKEN) {
    return "border-sky-300/80 bg-sky-100 text-sky-800 dark:border-sky-700 dark:bg-sky-900/40 dark:text-sky-200";
  }

  if (title === SITE_OWNER_TITLE_TOKEN) {
    return "border-violet-300/80 bg-violet-100 text-violet-800 dark:border-violet-700 dark:bg-violet-900/40 dark:text-violet-200";
  }

  return "border-rose-300/80 bg-rose-100 text-rose-800 dark:border-rose-700 dark:bg-rose-900/40 dark:text-rose-200";
}

function normalizeHexColor(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!HEX_COLOR_RE.test(trimmed)) {
    return null;
  }
  return trimmed.toLowerCase();
}

function pickBadgeTextColor(hex: string): string {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return "#111827";
  }

  const red = Number.parseInt(normalized.slice(1, 3), 16);
  const green = Number.parseInt(normalized.slice(3, 5), 16);
  const blue = Number.parseInt(normalized.slice(5, 7), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
  return luminance >= 155 ? "#111827" : "#f8fafc";
}

function getTitleBadgeAppearance(
  title: string | null,
  titleColor: string | null | undefined
): { className: string; style?: CSSProperties } {
  const normalizedColor = normalizeHexColor(titleColor);
  if (!normalizedColor) {
    return {
      className: title ? getTitleBadgeClass(title) : "",
    };
  }

  return {
    className: "border",
    style: {
      backgroundColor: normalizedColor,
      borderColor: normalizedColor,
      color: pickBadgeTextColor(normalizedColor),
    },
  };
}

function normalizeTitleIconPath(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2048) {
    return null;
  }

  if (!SVG_PATH_RE.test(trimmed)) {
    return null;
  }

  return trimmed;
}

function asPositiveInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

const TAB_KEYS = ["favorites", "comments", "ratings", "submissions"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const LIST_PREVIEW_COUNT = 12;

function isTabKey(value: string): value is TabKey {
  return (TAB_KEYS as readonly string[]).includes(value);
}

function FavoriteTile({ style }: { style: StyleMeta }) {
  const { locale } = useI18n();
  const primaryName = locale === "zh" ? style.name : style.nameEn || style.name;
  const secondaryName = locale === "zh" ? style.nameEn : style.name;

  return (
    <div className="group relative border border-border hover:border-foreground transition-colors">
      <LocalizedLink
        href={`/styles/${style.slug}`}
        aria-label={primaryName}
        className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <div className="relative aspect-video overflow-hidden">
        <StyleCoverPreview styleSlug={style.slug} interactive={false} />
      </div>
      {style.colors && (
        <div className="h-1 flex">
          <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
          <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
          {style.colors.accent?.slice(0, 2).map((color, i) => (
            <div key={color || i} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      )}
      <div className="flex items-baseline gap-2 px-3 py-2.5 min-w-0">
        <span className="text-sm truncate group-hover:text-accent transition-colors">
          {primaryName}
        </span>
        <span className="text-xs text-muted truncate">{secondaryName}</span>
      </div>
      <div className="absolute top-1.5 right-1.5 z-20">
        <FavoriteButton
          slug={style.slug}
          size="sm"
          className="bg-white/80 dark:bg-black/50 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-border px-5 py-10 text-center text-sm text-muted">
      {children}
    </p>
  );
}

interface ProfileContentProps {
  allStyles: StyleMeta[];
}

export function ProfileContent({ allStyles }: ProfileContentProps) {
  const { user, loading, signOut } = useUser();
  const { favorites } = useFavorites();
  const { t, locale } = useI18n();
  const [showEmail, setShowEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("favorites");
  const [showAllComments, setShowAllComments] = useState(false);
  const [showAllRatings, setShowAllRatings] = useState(false);
  const { data: commentsData, isLoading: commentsLoading, error: commentsError } = useProfileComments(user?.id);
  const { data: ratingsData, isLoading: ratingsLoading, error: ratingsError } = useProfileRatings(user?.id);
  const { data: submissionsData, mutate: mutateSubmissions, isLoading: submissionsLoading, error: submissionsError } = useProfileSubmissions(user?.id);
  const { data: profileTitleData } = useProfileTitle(user?.id);
  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null);
  const [editSubmissionName, setEditSubmissionName] = useState("");
  const [editSubmissionNameEn, setEditSubmissionNameEn] = useState("");
  const [editSubmissionDescription, setEditSubmissionDescription] = useState("");
  const [submissionActionBusyId, setSubmissionActionBusyId] = useState<string | null>(null);
  const [submissionActionError, setSubmissionActionError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (isTabKey(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const selectTab = (key: TabKey) => {
    setActiveTab(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  const onTabListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    event.preventDefault();
    const index = TAB_KEYS.indexOf(activeTab);
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % TAB_KEYS.length
        : (index + TAB_KEYS.length - 1) % TAB_KEYS.length;
    const nextKey = TAB_KEYS[nextIndex];
    selectTab(nextKey);
    document.getElementById(`tab-${nextKey}`)?.focus();
  };

  const styleMetaBySlug = useMemo(
    () => new Map(allStyles.map((style) => [style.slug, style])),
    [allStyles]
  );

  const styleDisplayName = (slug: string): string => {
    const meta = styleMetaBySlug.get(slug);
    if (!meta) {
      return slug;
    }
    return locale === "zh" ? meta.name : meta.nameEn || meta.name;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="animate-pulse flex flex-col md:flex-row gap-8 md:gap-14">
          <div className="md:w-64 md:shrink-0 space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/20" />
            <div className="h-6 w-36 bg-muted/20" />
            <div className="h-3 w-28 bg-muted/20" />
            <div className="h-3 w-32 bg-muted/20" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="h-8 w-full max-w-sm bg-muted/20" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-video bg-muted/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
        <p className="text-xs uppercase tracking-widest text-muted mb-6">
          {t("profile.pageLabel")}
        </p>
        <User className="w-8 h-8 text-muted mx-auto mb-5" aria-hidden="true" />
        <h1 className="text-2xl md:text-3xl mb-3">{t("profile.notLoggedIn")}</h1>
        <p className="text-sm text-muted mb-8">{t("profile.signInPrompt")}</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 border border-foreground px-6 py-2.5 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
        >
          <LogIn className="w-4 h-4" aria-hidden="true" />
          {t("auth.signIn")}
        </Link>
      </div>
    );
  }

  const userName = user.user_metadata?.user_name ?? "";
  const fullName = user.user_metadata?.full_name ?? "";
  const avatarUrl = user.user_metadata?.avatar_url ?? "";
  const avatarSrc = getAvatarImageSrc(avatarUrl);
  const email = user.email ?? "";
  const maskedEmail = (() => {
    if (!email.includes("@")) return "";
    const [local, domain] = email.split("@");
    if (!local || !domain) return "";
    if (local.length <= 2) {
      return `${local[0] ?? "*"}***@${domain}`;
    }
    return `${local.slice(0, 2)}***@${domain}`;
  })();
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
  const rawProfileTitle =
    profileTitleData?.title ??
    (typeof user.user_metadata?.user_title === "string"
      ? user.user_metadata.user_title
      : typeof user.user_metadata?.title === "string"
        ? user.user_metadata.title
        : null);

  const profileTitleLabel = (() => {
    if (!rawProfileTitle) {
      return null;
    }
    if (rawProfileTitle === EMPEROR_TITLE_TOKEN) {
      return t("styleComments.titleEmperor");
    }
    if (rawProfileTitle === SITE_OWNER_TITLE_TOKEN) {
      return t("styleComments.titleEmperor");
    }
    if (rawProfileTitle === EARLY_USER_TITLE_TOKEN) {
      return t("styleComments.titleEarlyUser");
    }
    return rawProfileTitle;
  })();
  const profileTitleBadgeClass = rawProfileTitle
    ? getTitleBadgeAppearance(rawProfileTitle, profileTitleData?.titleColor)
    : { className: "" };
  const profileTitleIconPath = normalizeTitleIconPath(
    profileTitleData?.titleIconPath
  );
  const profileSeqId =
    asPositiveInt(profileTitleData?.seqId) ??
    asPositiveInt(user.user_metadata?.seq_id);

  const comments = commentsData?.comments ?? [];
  const ratings = ratingsData?.ratings ?? [];
  const submissions = submissionsData?.submissions ?? [];
  const visibleComments = showAllComments ? comments : comments.slice(0, LIST_PREVIEW_COUNT);
  const visibleRatings = showAllRatings ? ratings : ratings.slice(0, LIST_PREVIEW_COUNT);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(
      locale === "zh" ? "zh-CN" : "en-US",
      { month: "short", day: "numeric", year: "numeric" }
    );

  function beginEditSubmission(submission: {
    id: string;
    name: string | null;
    name_en: string | null;
    description: string | null;
  }) {
    setSubmissionActionError(null);
    setEditingSubmissionId(submission.id);
    setEditSubmissionName(submission.name ?? "");
    setEditSubmissionNameEn(submission.name_en ?? "");
    setEditSubmissionDescription(submission.description ?? "");
  }

  async function saveSubmissionEdit(submission: {
    id: string;
    status: "pending" | "approved" | "rejected";
  }) {
    if (submission.status === "approved") {
      const confirmed = window.confirm(t("profile.submissionApprovedEditConfirm"));
      if (!confirmed) {
        return;
      }
    }

    setSubmissionActionError(null);
    setSubmissionActionBusyId(submission.id);
    try {
      const updates: Record<string, string> = {};
      const trimmedName = editSubmissionName.trim();
      const trimmedNameEn = editSubmissionNameEn.trim();
      const trimmedDescription = editSubmissionDescription.trim();
      if (trimmedName) {
        updates.name = trimmedName;
      }
      if (trimmedNameEn) {
        updates.nameEn = trimmedNameEn;
      }
      if (trimmedDescription) {
        updates.description = trimmedDescription;
      }
      if (Object.keys(updates).length === 0) {
        throw new Error(t("profile.submissionEditEmpty"));
      }

      const response = await fetch(`/api/profile/submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(body?.error ?? t("profile.submissionUpdateFailed"));
      }

      await mutateSubmissions(
        (current) => {
          if (!current) {
            return current;
          }
          return {
            ...current,
            submissions: current.submissions.map((item) =>
              item.id === submission.id
                ? {
                    ...item,
                    name: updates.name ?? item.name,
                    name_en: updates.nameEn ?? item.name_en,
                    description: updates.description ?? item.description,
                  }
                : item
            ),
          };
        },
        { revalidate: false }
      );
      setEditingSubmissionId(null);
      void mutateSubmissions();
    } catch (error) {
      setSubmissionActionError(
        error instanceof Error ? error.message : t("profile.submissionUpdateFailed")
      );
    } finally {
      setSubmissionActionBusyId(null);
    }
  }

  async function deleteSubmission(submission: {
    id: string;
    status: "pending" | "approved" | "rejected";
  }) {
    const confirmMessage =
      submission.status === "approved"
        ? t("profile.submissionApprovedDeleteConfirm")
        : t("profile.submissionDeleteConfirm");
    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) {
      return;
    }

    setSubmissionActionError(null);
    setSubmissionActionBusyId(submission.id);
    try {
      const response = await fetch(`/api/profile/submissions/${submission.id}`, {
        method: "DELETE",
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(body?.error ?? t("profile.submissionDeleteFailed"));
      }

      await mutateSubmissions(
        (current) => {
          if (!current) {
            return current;
          }
          return {
            ...current,
            submissions: current.submissions.filter((item) => item.id !== submission.id),
          };
        },
        { revalidate: false }
      );
      if (editingSubmissionId === submission.id) {
        setEditingSubmissionId(null);
      }
      void mutateSubmissions();
    } catch (error) {
      setSubmissionActionError(
        error instanceof Error ? error.message : t("profile.submissionDeleteFailed")
      );
    } finally {
      setSubmissionActionBusyId(null);
    }
  }

  const tabs: Array<{ key: TabKey; label: string; count: string }> = [
    {
      key: "favorites",
      label: t("profile.statsFavorites"),
      count: String(favorites.length),
    },
    {
      key: "comments",
      label: t("profile.statsComments"),
      count: commentsLoading ? "–" : String(comments.length),
    },
    {
      key: "ratings",
      label: t("profile.statsRatings"),
      count: ratingsLoading ? "–" : String(ratings.length),
    },
    {
      key: "submissions",
      label: t("profile.statsSubmissions"),
      count: submissionsLoading ? "–" : String(submissions.length),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14 motion-safe:animate-home-reveal-soft">
      <div className="flex flex-col md:flex-row gap-8 md:gap-14 md:min-h-[55vh]">
        {/* Identity rail */}
        <aside className="md:w-64 md:shrink-0">
          <div className="md:sticky md:top-24">
            <p className="text-[11px] uppercase tracking-widest text-muted mb-5">
              {t("profile.pageLabel")}
            </p>
            <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={userName}
                  width={80}
                  height={80}
                  priority
                  unoptimized
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border shrink-0"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border bg-muted/10 flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-muted" aria-hidden="true" />
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl leading-snug break-words">
                  {userName || fullName}
                </h1>
                {fullName && userName && fullName !== userName && (
                  <p className="text-sm text-muted mt-0.5">{fullName}</p>
                )}
                {profileTitleLabel && (
                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${profileTitleBadgeClass.className}`}
                    style={profileTitleBadgeClass.style}
                  >
                    {profileTitleIconPath ? (
                      <svg
                        viewBox="0 0 40 40"
                        className="h-3 w-3 fill-current"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d={profileTitleIconPath} />
                      </svg>
                    ) : null}
                    {profileTitleLabel}
                  </span>
                )}
              </div>
            </div>

            <dl className="mt-5 border-t border-border pt-5 space-y-2.5 text-[13px]">
              {createdAt && (
                <div className="flex items-center gap-2 text-muted">
                  <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">
                    {t("profile.memberSince")} {createdAt}
                  </span>
                </div>
              )}
              {userName && (
                <div className="flex items-center gap-2 text-muted">
                  {isLinuxDo ? (
                    <LogIn className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <Github className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  )}
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 min-w-0 hover:text-foreground transition-colors"
                  >
                    <span className="truncate">{profileLabel}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">{t("profile.provider")}</dt>
                <dd>{providerLabel}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">{t("profile.userId")}</dt>
                <dd className="font-mono tabular-nums">
                  #{profileSeqId ?? user.id.slice(0, 8)}
                </dd>
              </div>
              {email && (
                <div className="flex items-center justify-between gap-3 min-w-0">
                  <dt className="text-muted shrink-0">{t("profile.email")}</dt>
                  <dd className="inline-flex items-center gap-1.5 min-w-0">
                    <span className="font-mono text-xs truncate">
                      {showEmail ? email : maskedEmail || t("profile.emailHidden")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowEmail((current) => !current)}
                      className="inline-flex items-center text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={showEmail ? t("profile.hideEmail") : t("profile.showEmail")}
                    >
                      {showEmail ? (
                        <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </dd>
                </div>
              )}
            </dl>

            <button
              type="button"
              onClick={() => void signOut()}
              className="mt-6 inline-flex w-full items-center justify-center gap-1.5 border border-border px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted hover:border-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LogOut className="w-3 h-3" aria-hidden="true" />
              {t("auth.signOut")}
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            role="tablist"
            aria-label={t("profile.stats")}
            onKeyDown={onTabListKeyDown}
            className="flex gap-6 border-b border-border overflow-x-auto scrollbar-hide"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  id={`tab-${tab.key}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(tab.key)}
                  className={`relative pb-3 text-sm whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 font-mono text-xs text-muted tabular-nums">
                    {tab.count}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-px bg-foreground" />
                  )}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="pt-6"
          >
            {activeTab === "favorites" && (
              <>
                {favorites.length === 0 ? (
                  <div className="border border-border px-5 py-12 text-center">
                    <p className="text-sm text-muted mb-5">{t("profile.noFavorites")}</p>
                    <LocalizedLink
                      href="/styles"
                      className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm hover:border-foreground transition-colors"
                    >
                      {t("profile.browseStyles")}
                    </LocalizedLink>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {favorites.map((slug) => {
                        const meta = styleMetaBySlug.get(slug);
                        if (meta) {
                          return <FavoriteTile key={slug} style={meta} />;
                        }
                        return (
                          <LocalizedLink
                            key={slug}
                            href={`/styles/${slug}`}
                            className="group flex flex-col justify-center border border-border p-4 hover:border-foreground transition-colors"
                          >
                            <p className="text-sm truncate group-hover:text-accent transition-colors">
                              {slug}
                            </p>
                            <p className="text-xs text-muted mt-1">
                              {t("profile.viewStyle")}
                            </p>
                          </LocalizedLink>
                        );
                      })}
                    </div>
                    <div className="mt-5 text-right">
                      <LocalizedLink
                        href="/styles"
                        className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline transition-colors"
                      >
                        {t("profile.browseStyles")}
                      </LocalizedLink>
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === "comments" && (
              <>
                {commentsError ? (
                  <EmptyNote>{t("profile.loadFailed")}</EmptyNote>
                ) : commentsLoading ? (
                  <div className="divide-y divide-border border-y border-border animate-pulse">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="py-3.5 space-y-2">
                        <div className="h-4 w-32 bg-muted/20" />
                        <div className="h-3 w-full bg-muted/20" />
                      </div>
                    ))}
                  </div>
                ) : comments.length === 0 ? (
                  <EmptyNote>{t("profile.noComments")}</EmptyNote>
                ) : (
                  <>
                    <div className="divide-y divide-border border-y border-border">
                      {visibleComments.map((comment) => (
                      <div
                        key={comment.id}
                        className="py-3.5 grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-4"
                      >
                        <div className="min-w-0">
                          <LocalizedLink
                            href={`/styles/${comment.style_slug}`}
                            className="text-sm hover:text-accent transition-colors"
                          >
                            {styleDisplayName(comment.style_slug)}
                          </LocalizedLink>
                          <p className="text-[13px] text-muted line-clamp-2 mt-0.5">
                            {comment.content}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-muted tabular-nums">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                    ))}
                    </div>
                    {!showAllComments && comments.length > LIST_PREVIEW_COUNT && (
                      <div className="mt-4 text-center">
                        <button
                          type="button"
                          onClick={() => setShowAllComments(true)}
                          className="border border-border px-4 py-1.5 text-xs uppercase tracking-wider text-muted hover:border-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {t("profile.showAll").replace("{count}", String(comments.length))}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {activeTab === "ratings" && (
              <>
                {ratingsError ? (
                  <EmptyNote>{t("profile.loadFailed")}</EmptyNote>
                ) : ratingsLoading ? (
                  <div className="divide-y divide-border border-y border-border animate-pulse">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="py-3 flex justify-between">
                        <div className="h-4 w-28 bg-muted/20" />
                        <div className="h-4 w-24 bg-muted/20" />
                      </div>
                    ))}
                  </div>
                ) : ratings.length === 0 ? (
                  <EmptyNote>{t("profile.noRatings")}</EmptyNote>
                ) : (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {visibleRatings.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between gap-3 border border-border px-4 py-3"
                      >
                        <LocalizedLink
                          href={`/styles/${r.style_slug}`}
                          className="text-sm truncate hover:text-accent transition-colors"
                        >
                          {styleDisplayName(r.style_slug)}
                        </LocalizedLink>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < r.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted/30"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-mono text-xs text-muted tabular-nums">
                            {formatDate(r.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                    </div>
                    {!showAllRatings && ratings.length > LIST_PREVIEW_COUNT && (
                      <div className="mt-4 text-center">
                        <button
                          type="button"
                          onClick={() => setShowAllRatings(true)}
                          className="border border-border px-4 py-1.5 text-xs uppercase tracking-wider text-muted hover:border-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {t("profile.showAll").replace("{count}", String(ratings.length))}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {activeTab === "submissions" && (
              <>
                {submissionActionError && (
                  <p
                    aria-live="polite"
                    className="mb-3 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
                  >
                    {submissionActionError}
                  </p>
                )}

                {submissionsError ? (
                  <EmptyNote>{t("profile.loadFailed")}</EmptyNote>
                ) : submissionsLoading ? (
                  <div className="space-y-3 animate-pulse">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="border border-border p-3.5 space-y-2.5">
                        <div className="flex justify-between">
                          <div className="h-4 w-32 bg-muted/20" />
                          <div className="h-3 w-20 bg-muted/20" />
                        </div>
                        <div className="h-3 w-full bg-muted/20" />
                      </div>
                    ))}
                  </div>
                ) : submissions.length === 0 ? (
                  <EmptyNote>{t("profile.noSubmissions")}</EmptyNote>
                ) : (
                  <div className="space-y-3">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="border border-border p-3.5 md:p-4 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <LocalizedLink
                              href={`/styles/${sub.slug}`}
                              className="text-sm hover:text-accent transition-colors truncate"
                            >
                              {sub.name_en || sub.name || sub.slug}
                            </LocalizedLink>
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                                statusColors[sub.status] ?? ""
                              }`}
                            >
                              {t(`profile.submissionStatus.${sub.status}`)}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-muted tabular-nums shrink-0">
                            {formatDate(sub.submitted_at)}
                          </span>
                        </div>

                        {(sub.description || sub.slug) && (
                          <p className="text-xs text-muted line-clamp-2">
                            {sub.description || sub.slug}
                          </p>
                        )}

                        {editingSubmissionId === sub.id ? (
                          <div className="space-y-2">
                            <input
                              value={editSubmissionName}
                              onChange={(event) => setEditSubmissionName(event.target.value)}
                              placeholder={t("profile.submissionEditName")}
                              name="submissionName"
                              autoComplete="off"
                              className="w-full border border-border bg-background px-3 py-1.5 text-sm focus:border-foreground focus:outline-none transition-colors"
                            />
                            <input
                              value={editSubmissionNameEn}
                              onChange={(event) => setEditSubmissionNameEn(event.target.value)}
                              placeholder={t("profile.submissionEditNameEn")}
                              name="submissionNameEn"
                              autoComplete="off"
                              spellCheck={false}
                              className="w-full border border-border bg-background px-3 py-1.5 text-sm focus:border-foreground focus:outline-none transition-colors"
                            />
                            <textarea
                              value={editSubmissionDescription}
                              onChange={(event) => setEditSubmissionDescription(event.target.value)}
                              placeholder={t("profile.submissionEditDescription")}
                              name="submissionDescription"
                              className="w-full border border-border bg-background px-3 py-1.5 text-sm focus:border-foreground focus:outline-none transition-colors"
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => void saveSubmissionEdit(sub)}
                                disabled={submissionActionBusyId === sub.id}
                                className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-[11px] uppercase tracking-wider hover:border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
                              >
                                {submissionActionBusyId === sub.id
                                  ? t("profile.submissionSaving")
                                  : t("profile.submissionSave")}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingSubmissionId(null)}
                                disabled={submissionActionBusyId === sub.id}
                                className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-[11px] uppercase tracking-wider hover:border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
                              >
                                {t("profile.submissionCancel")}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => beginEditSubmission(sub)}
                              disabled={submissionActionBusyId === sub.id}
                              className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 text-[11px] uppercase tracking-wider hover:border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60"
                            >
                              <Pencil className="w-3 h-3" aria-hidden="true" />
                              {t("profile.submissionEdit")}
                            </button>
                            <button
                              type="button"
                              onClick={() => void deleteSubmission(sub)}
                              disabled={submissionActionBusyId === sub.id}
                              className="inline-flex items-center gap-1.5 border border-red-300 px-2.5 py-1 text-[11px] uppercase tracking-wider text-red-700 hover:border-red-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-red-800 dark:text-red-300 disabled:opacity-60"
                            >
                              <Trash2 className="w-3 h-3" aria-hidden="true" />
                              {submissionActionBusyId === sub.id
                                ? t("profile.submissionDeleting")
                                : t("profile.submissionDelete")}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
