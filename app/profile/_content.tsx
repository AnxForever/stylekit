"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import {
  Heart,
  ExternalLink,
  Github,
  User,
  Calendar,
  Shield,
  LogIn,
  MessageSquare,
  Star,
  Send,
  BarChart3,
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
import {
  EMPEROR_TITLE_TOKEN,
  EARLY_USER_TITLE_TOKEN,
  SITE_OWNER_TITLE_TOKEN,
} from "@/lib/auth/user-title-policy";

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

export function ProfileContent() {
  const { user, loading } = useUser();
  const { favorites } = useFavorites();
  const { t, locale } = useI18n();
  const [showEmail, setShowEmail] = useState(false);
  const { data: commentsData, isLoading: commentsLoading } = useProfileComments(user?.id);
  const { data: ratingsData, isLoading: ratingsLoading } = useProfileRatings(user?.id);
  const { data: submissionsData, mutate: mutateSubmissions, isLoading: submissionsLoading } = useProfileSubmissions(user?.id);
  const { data: profileTitleData } = useProfileTitle(user?.id);
  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null);
  const [editSubmissionName, setEditSubmissionName] = useState("");
  const [editSubmissionNameEn, setEditSubmissionNameEn] = useState("");
  const [editSubmissionDescription, setEditSubmissionDescription] = useState("");
  const [submissionActionBusyId, setSubmissionActionBusyId] = useState<string | null>(null);
  const [submissionActionError, setSubmissionActionError] = useState<string | null>(null);

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted/20 rounded-lg" />
            ))}
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

  const stats = [
    { label: t("profile.statsFavorites"), value: favorites.length, icon: Heart },
    { label: t("profile.statsComments"), value: comments.length, icon: MessageSquare },
    { label: t("profile.statsRatings"), value: ratings.length, icon: Star },
    { label: t("profile.statsSubmissions"), value: submissions.length, icon: Send },
  ];

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
            priority
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
          {profileTitleLabel && (
            <div className="mt-2 flex justify-center sm:justify-start">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${profileTitleBadgeClass.className}`}
                style={profileTitleBadgeClass.style}
              >
                {profileTitleIconPath ? (
                  <svg
                    viewBox="0 0 40 40"
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d={profileTitleIconPath} />
                  </svg>
                ) : null}
                {profileTitleLabel}
              </span>
            </div>
          )}
          {fullName && fullName !== userName && (
            <p className="text-lg text-muted-foreground mt-1">{fullName}</p>
          )}
          {email && showEmail && (
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

      {/* Stats Overview */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
          <BarChart3 className="w-5 h-5" />
          {t("profile.stats")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-background p-4 text-center"
            >
              <stat.icon className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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

      {/* My Comments */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
          <MessageSquare className="w-5 h-5" />
          {t("profile.comments")} ({comments.length})
        </h2>

        {commentsLoading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-4 space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-muted/20 rounded" />
                  <div className="h-3 w-20 bg-muted/20 rounded" />
                </div>
                <div className="h-4 w-full bg-muted/20 rounded" />
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            {t("profile.noComments")}
          </p>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <Link
                    href={`/styles/${comment.style_slug}`}
                    className="text-sm font-medium text-foreground hover:underline"
                  >
                    {comment.style_slug}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My Ratings */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
          <Star className="w-5 h-5" />
          {t("profile.ratings")} ({ratings.length})
        </h2>

        {ratingsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-pulse">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                <div className="h-4 w-24 bg-muted/20 rounded" />
                <div className="h-4 w-20 bg-muted/20 rounded" />
              </div>
            ))}
          </div>
        ) : ratings.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            {t("profile.noRatings")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ratings.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
              >
                <Link
                  href={`/styles/${r.style_slug}`}
                  className="text-sm font-medium text-foreground hover:underline"
                >
                  {r.style_slug}
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(r.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My Submissions */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-4">
          <Send className="w-5 h-5" />
          {t("profile.submissions")} ({submissions.length})
        </h2>

        {submissionActionError && (
          <p className="mb-3 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
            {submissionActionError}
          </p>
        )}

        {submissionsLoading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border px-4 py-3 space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-muted/20 rounded" />
                  <div className="h-3 w-20 bg-muted/20 rounded" />
                </div>
                <div className="h-3 w-full bg-muted/20 rounded" />
              </div>
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            {t("profile.noSubmissions")}
          </p>
        ) : (
          <div className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="rounded-lg border border-border bg-background px-4 py-3 space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Link
                      href={`/styles/${sub.slug}`}
                      className="text-sm font-medium text-foreground hover:underline truncate"
                    >
                      {sub.name_en || sub.name || sub.slug}
                    </Link>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        statusColors[sub.status] ?? ""
                      }`}
                    >
                      {t(`profile.submissionStatus.${sub.status}`)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDate(sub.submitted_at)}
                  </span>
                </div>

                {(sub.description || sub.slug) && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {sub.description || sub.slug}
                  </p>
                )}

                {editingSubmissionId === sub.id ? (
                  <div className="space-y-2">
                    <input
                      value={editSubmissionName}
                      onChange={(event) => setEditSubmissionName(event.target.value)}
                      placeholder={t("profile.submissionEditName")}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                    <input
                      value={editSubmissionNameEn}
                      onChange={(event) => setEditSubmissionNameEn(event.target.value)}
                      placeholder={t("profile.submissionEditNameEn")}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                    <textarea
                      value={editSubmissionDescription}
                      onChange={(event) => setEditSubmissionDescription(event.target.value)}
                      placeholder={t("profile.submissionEditDescription")}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => void saveSubmissionEdit(sub)}
                        disabled={submissionActionBusyId === sub.id}
                        className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:border-foreground disabled:opacity-60"
                      >
                        {submissionActionBusyId === sub.id
                          ? t("profile.submissionSaving")
                          : t("profile.submissionSave")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingSubmissionId(null)}
                        disabled={submissionActionBusyId === sub.id}
                        className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:border-foreground disabled:opacity-60"
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
                      className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:border-foreground disabled:opacity-60"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      {t("profile.submissionEdit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteSubmission(sub)}
                      disabled={submissionActionBusyId === sub.id}
                      className="inline-flex items-center gap-1 rounded-md border border-red-300 px-3 py-1.5 text-xs text-red-700 hover:border-red-500 dark:border-red-800 dark:text-red-300 disabled:opacity-60"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
              #{profileSeqId ?? user.id.slice(0, 8)}
            </span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">
              {t("profile.userTitle")}
            </span>
            {profileTitleLabel ? (
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${profileTitleBadgeClass.className}`}
                style={profileTitleBadgeClass.style}
              >
                {profileTitleIconPath ? (
                  <svg
                    viewBox="0 0 40 40"
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d={profileTitleIconPath} />
                  </svg>
                ) : null}
                {profileTitleLabel}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                {t("profile.userTitleNone")}
              </span>
            )}
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground">
              {t("profile.email")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-sm text-foreground">
                {showEmail ? email : maskedEmail || t("profile.emailHidden")}
              </span>
              {email && (
                <button
                  type="button"
                  onClick={() => setShowEmail((current) => !current)}
                  className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showEmail ? t("profile.hideEmail") : t("profile.showEmail")}
                >
                  {showEmail ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
