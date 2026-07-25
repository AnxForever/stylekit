"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import {
  ExternalLink,
  Github,
  User,
  Calendar,
  LogIn,
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
import { StyleCard } from "@/components/home/style-card";
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

function SectionHeading({
  index,
  label,
  count,
}: {
  index: string;
  label: string;
  count?: number;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs tracking-widest text-muted mb-3">{index}</p>
      <h2 className="text-2xl md:text-3xl">
        {label}
        {typeof count === "number" && (
          <span className="ml-3 font-mono text-sm text-muted tabular-nums align-middle">
            {count}
          </span>
        )}
      </h2>
    </div>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-border px-6 py-12 text-center text-muted">
      {children}
    </p>
  );
}

interface ProfileContentProps {
  allStyles: StyleMeta[];
}

export function ProfileContent({ allStyles }: ProfileContentProps) {
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
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="animate-pulse">
          <div className="h-3 w-16 bg-muted/20 mb-8" />
          <div className="flex items-end gap-6">
            <div className="w-24 h-24 rounded-full bg-muted/20" />
            <div className="space-y-3">
              <div className="h-9 w-56 bg-muted/20" />
              <div className="h-4 w-40 bg-muted/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted/10" />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-muted/10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <section className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
          <p className="text-xs uppercase tracking-widest text-muted mb-6">
            {t("profile.pageLabel")}
          </p>
          <User className="w-10 h-10 text-muted mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl mb-4">
            {t("profile.notLoggedIn")}
          </h1>
          <p className="text-muted mb-10">{t("profile.signInPrompt")}</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 border border-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            <LogIn className="w-4 h-4" aria-hidden="true" />
            {t("auth.signIn")}
          </Link>
        </div>
      </section>
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
    {
      anchor: "profile-favorites",
      label: t("profile.statsFavorites"),
      value: String(favorites.length),
      delay: 0,
    },
    {
      anchor: "profile-comments",
      label: t("profile.statsComments"),
      value: commentsLoading ? "–" : String(comments.length),
      delay: 60,
    },
    {
      anchor: "profile-ratings",
      label: t("profile.statsRatings"),
      value: ratingsLoading ? "–" : String(ratings.length),
      delay: 120,
    },
    {
      anchor: "profile-submissions",
      label: t("profile.statsSubmissions"),
      value: submissionsLoading ? "–" : String(submissions.length),
      delay: 180,
    },
  ];

  const statCellBorders = [
    "",
    "border-l border-border",
    "border-t border-border md:border-t-0 md:border-l",
    "border-l border-t border-border md:border-t-0",
  ];

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-10 md:pb-14">
          <p className="text-xs uppercase tracking-widest text-muted mb-8 motion-safe:animate-home-reveal-soft">
            {t("profile.pageLabel")}
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 md:gap-8 motion-safe:animate-home-reveal-up">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={userName}
                width={96}
                height={96}
                priority
                unoptimized
                className="w-24 h-24 rounded-full border border-border shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border border-border bg-muted/10 flex items-center justify-center shrink-0">
                <User className="w-10 h-10 text-muted" aria-hidden="true" />
              </div>
            )}

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                <h1 className="text-3xl md:text-5xl leading-tight break-words">
                  {userName}
                </h1>
                {profileTitleLabel && (
                  <span
                    className={`mt-2 sm:mt-0 self-center sm:self-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium shrink-0 ${profileTitleBadgeClass.className}`}
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
                )}
              </div>
              {fullName && fullName !== userName && (
                <p className="text-base text-muted mt-1">{fullName}</p>
              )}
              {email && showEmail && (
                <p className="font-mono text-sm text-muted mt-1">{email}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-muted">
                {createdAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {t("profile.memberSince")} {createdAt}
                  </span>
                )}
                {userName && (
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    {isLinuxDo ? (
                      <LogIn className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Github className="w-4 h-4" aria-hidden="true" />
                    )}
                    {profileLabel}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats folio strip */}
      <section className="border-b border-border" aria-label={t("profile.stats")}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <a
                key={stat.anchor}
                href={`#${stat.anchor}`}
                className={`group flex flex-col gap-1.5 py-8 md:py-10 pr-4 md:px-6 md:first:pl-0 motion-safe:animate-home-reveal-up-subtle ${statCellBorders[index]} ${index % 2 === 1 ? "pl-4 md:pl-6" : ""}`}
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <span className="font-serif text-3xl md:text-4xl tabular-nums leading-none group-hover:text-accent transition-colors">
                  {stat.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Favorites */}
      <section id="profile-favorites" className="border-b border-border scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              index="01"
              label={t("profile.favorites")}
              count={favorites.length}
            />
            {favorites.length > 0 && (
              <LocalizedLink
                href="/styles"
                className="mb-8 hidden sm:inline text-sm text-muted underline-offset-4 hover:text-foreground hover:underline transition-colors"
              >
                {t("profile.browseStyles")}
              </LocalizedLink>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="border border-border px-6 py-14 text-center">
              <p className="text-muted mb-6">{t("profile.noFavorites")}</p>
              <LocalizedLink
                href="/styles"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm hover:border-foreground transition-colors"
              >
                {t("profile.browseStyles")}
              </LocalizedLink>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {favorites.map((slug) => {
                const meta = styleMetaBySlug.get(slug);
                if (meta) {
                  return <StyleCard key={slug} style={meta} variant="compact" />;
                }
                return (
                  <LocalizedLink
                    key={slug}
                    href={`/styles/${slug}`}
                    className="group flex flex-col justify-center border border-border p-4 md:p-5 hover:border-foreground transition-colors"
                  >
                    <p className="group-hover:text-accent transition-colors truncate">
                      {slug}
                    </p>
                    <p className="text-sm text-muted mt-1">
                      {t("profile.viewStyle")}
                    </p>
                  </LocalizedLink>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Comments ledger */}
      <section id="profile-comments" className="border-b border-border scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <SectionHeading
            index="02"
            label={t("profile.comments")}
            count={comments.length}
          />

          {commentsLoading ? (
            <div className="border-t border-border animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border-b border-border py-4 space-y-2">
                  <div className="h-4 w-32 bg-muted/20" />
                  <div className="h-4 w-full bg-muted/20" />
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <EmptyNote>{t("profile.noComments")}</EmptyNote>
          ) : (
            <div className="border-t border-border">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="grid gap-1 border-b border-border py-4 sm:grid-cols-[1fr_auto] sm:gap-6"
                >
                  <div className="min-w-0">
                    <LocalizedLink
                      href={`/styles/${comment.style_slug}`}
                      className="text-sm font-medium hover:text-accent transition-colors"
                    >
                      {styleDisplayName(comment.style_slug)}
                    </LocalizedLink>
                    <p className="text-sm text-muted line-clamp-2 mt-1">
                      {comment.content}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted tabular-nums">
                    {formatDate(comment.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ratings */}
      <section id="profile-ratings" className="border-b border-border scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <SectionHeading
            index="03"
            label={t("profile.ratings")}
            count={ratings.length}
          />

          {ratingsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between border border-border px-4 py-3">
                  <div className="h-4 w-24 bg-muted/20" />
                  <div className="h-4 w-20 bg-muted/20" />
                </div>
              ))}
            </div>
          ) : ratings.length === 0 ? (
            <EmptyNote>{t("profile.noRatings")}</EmptyNote>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ratings.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 border border-border px-4 py-3"
                >
                  <LocalizedLink
                    href={`/styles/${r.style_slug}`}
                    className="text-sm font-medium truncate hover:text-accent transition-colors"
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
          )}
        </div>
      </section>

      {/* Submissions */}
      <section id="profile-submissions" className="border-b border-border scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <SectionHeading
            index="04"
            label={t("profile.submissions")}
            count={submissions.length}
          />

          {submissionActionError && (
            <p className="mb-4 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
              {submissionActionError}
            </p>
          )}

          {submissionsLoading ? (
            <div className="space-y-3 animate-pulse">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="border border-border px-4 py-4 space-y-3">
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
                  className="border border-border p-4 md:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <LocalizedLink
                        href={`/styles/${sub.slug}`}
                        className="text-sm font-medium hover:text-accent transition-colors truncate"
                      >
                        {sub.name_en || sub.name || sub.slug}
                      </LocalizedLink>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
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
                        className="w-full border border-border bg-background px-3 py-2 text-sm focus:border-foreground focus:outline-none transition-colors"
                      />
                      <input
                        value={editSubmissionNameEn}
                        onChange={(event) => setEditSubmissionNameEn(event.target.value)}
                        placeholder={t("profile.submissionEditNameEn")}
                        className="w-full border border-border bg-background px-3 py-2 text-sm focus:border-foreground focus:outline-none transition-colors"
                      />
                      <textarea
                        value={editSubmissionDescription}
                        onChange={(event) => setEditSubmissionDescription(event.target.value)}
                        placeholder={t("profile.submissionEditDescription")}
                        className="w-full border border-border bg-background px-3 py-2 text-sm focus:border-foreground focus:outline-none transition-colors"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => void saveSubmissionEdit(sub)}
                          disabled={submissionActionBusyId === sub.id}
                          className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs uppercase tracking-wider hover:border-foreground transition-colors disabled:opacity-60"
                        >
                          {submissionActionBusyId === sub.id
                            ? t("profile.submissionSaving")
                            : t("profile.submissionSave")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingSubmissionId(null)}
                          disabled={submissionActionBusyId === sub.id}
                          className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs uppercase tracking-wider hover:border-foreground transition-colors disabled:opacity-60"
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
                        className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs uppercase tracking-wider hover:border-foreground transition-colors disabled:opacity-60"
                      >
                        <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                        {t("profile.submissionEdit")}
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteSubmission(sub)}
                        disabled={submissionActionBusyId === sub.id}
                        className="inline-flex items-center gap-1.5 border border-red-300 px-3 py-1.5 text-xs uppercase tracking-wider text-red-700 hover:border-red-500 transition-colors dark:border-red-800 dark:text-red-300 disabled:opacity-60"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
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
        </div>
      </section>

      {/* Account colophon */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <SectionHeading index="05" label={t("profile.accountInfo")} />
          <div className="border border-border divide-y divide-border">
            <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-3.5">
              <span className="text-sm text-muted">{t("profile.provider")}</span>
              <span className="text-sm inline-flex items-center gap-1.5">
                {isLinuxDo ? (
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Github className="w-4 h-4" aria-hidden="true" />
                )}
                {providerLabel}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-3.5">
              <span className="text-sm text-muted">{t("profile.userId")}</span>
              <span className="font-mono text-sm tabular-nums">
                #{profileSeqId ?? user.id.slice(0, 8)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-3.5">
              <span className="text-sm text-muted">{t("profile.userTitle")}</span>
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
                <span className="text-sm text-muted">
                  {t("profile.userTitleNone")}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 px-4 md:px-5 py-3.5">
              <span className="text-sm text-muted">{t("profile.email")}</span>
              <span className="inline-flex items-center gap-2 min-w-0">
                <span className="font-mono text-sm truncate">
                  {showEmail ? email : maskedEmail || t("profile.emailHidden")}
                </span>
                {email && (
                  <button
                    type="button"
                    onClick={() => setShowEmail((current) => !current)}
                    className="inline-flex items-center text-muted hover:text-foreground transition-colors"
                    aria-label={showEmail ? t("profile.hideEmail") : t("profile.showEmail")}
                  >
                    {showEmail ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
