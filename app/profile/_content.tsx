"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ExternalLink,
  ArrowRight,
  Github,
  User,
  Calendar,
  LogIn,
  LogOut,
  Star,
  Eye,
  EyeOff,
  Pencil,
  Save,
  Upload,
  X,
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
import { XiaoheiLoading } from "@/components/profile/xiaohei-note";
import { EditorialAuraFrame } from "@/components/effects/editorial-aura-frame";
import type { StyleMeta } from "@/lib/styles/meta";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal/modal";

const HEX_COLOR_RE = /^#[0-9a-f]{6}$/i;
const SVG_PATH_RE = /^[MmLlHhVvCcSsQqTtAaZz0-9eE+.,\-\s]+$/;

function getTitleBadgeClass(title: string): string {
  if (title === EMPEROR_TITLE_TOKEN) {
    return "border-amber-300/60 bg-amber-50 text-amber-800 shadow-[0_1px_2px_rgba(120,80,0,0.08)] dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-200";
  }

  if (title === EARLY_USER_TITLE_TOKEN) {
    return "border-sky-300/60 bg-sky-50 text-sky-800 shadow-[0_1px_2px_rgba(0,80,120,0.08)] dark:border-sky-700/60 dark:bg-sky-950/30 dark:text-sky-200";
  }

  if (title === SITE_OWNER_TITLE_TOKEN) {
    return "border-violet-300/60 bg-violet-50 text-violet-800 shadow-[0_1px_2px_rgba(80,40,140,0.08)] dark:border-violet-700/60 dark:bg-violet-950/30 dark:text-violet-200";
  }

  return "border-rose-300/60 bg-rose-50 text-rose-800 shadow-[0_1px_2px_rgba(140,30,60,0.08)] dark:border-rose-700/60 dark:bg-rose-950/30 dark:text-rose-200";
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
      backgroundColor: `color-mix(in srgb, ${normalizedColor} 12%, transparent)`,
      borderColor: `color-mix(in srgb, ${normalizedColor} 38%, transparent)`,
      color: pickBadgeTextColor(normalizedColor),
      boxShadow: `0 1px 2px color-mix(in srgb, ${normalizedColor} 12%, transparent)`,
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
const MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024;
const AVATAR_FILE_TYPES = "image/jpeg,image/png,image/webp";
const PROFILE_AURA_ACCENT = ["#6366f1", "#fb7185", "#2dd4bf"] as const;

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
  const { user, loading, updateProfile, signOut } = useUser();
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
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileNameDraft, setProfileNameDraft] = useState("");
  const [profileAvatarDraft, setProfileAvatarDraft] = useState("");
  const [profileAvatarFile, setProfileAvatarFile] = useState<File | null>(null);
  const [profileAvatarPreview, setProfileAvatarPreview] = useState<string | null>(null);
  const [profileAvatarRemoved, setProfileAvatarRemoved] = useState(false);
  const [profileSaveState, setProfileSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (isTabKey(hash)) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    if (!profileAvatarFile) {
      setProfileAvatarPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(profileAvatarFile);
    setProfileAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [profileAvatarFile]);

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
        <XiaoheiLoading locale={locale} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center px-4 py-12 sm:px-6 md:px-10">
        <section className="relative w-full overflow-hidden rounded-[2rem] border border-border bg-background/80 p-6 shadow-[0_24px_80px_-48px_var(--foreground)] backdrop-blur-sm sm:p-10 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-56 w-56 rounded-full bg-foreground/[0.04] blur-2xl"
          />
          <div className="relative grid gap-10 md:grid-cols-[minmax(0,1fr)_13rem] md:items-center md:gap-16">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background shadow-[4px_4px_0_var(--accent)]">
                  <User className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                  {t("profile.pageLabel")}
                </p>
              </div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                01 / {t("auth.account")}
              </p>
              <h1 className="max-w-xl font-serif text-3xl leading-[1.08] sm:text-4xl md:text-5xl">
                {t("profile.notLoggedIn")}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
                {t("profile.signInPrompt")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/login"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-[transform,opacity] hover:-translate-y-0.5 hover:opacity-90 motion-reduce:transform-none"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  {t("auth.signIn")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <LocalizedLink
                  href="/styles"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {t("nav.styles")}
                </LocalizedLink>
              </div>
            </div>

            <div aria-hidden="true" className="relative mx-auto hidden h-44 w-44 md:block">
              <div className="absolute inset-4 rounded-full border border-border/80" />
              <div className="absolute inset-10 rounded-full border border-dashed border-border" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-7xl text-foreground/[0.08]">SK</span>
              </div>
              <span className="absolute right-0 top-5 h-2 w-2 rounded-full bg-accent" />
              <span className="absolute bottom-8 left-4 h-1.5 w-1.5 rounded-full bg-foreground/30" />
              <span className="absolute bottom-2 right-8 font-mono text-[9px] tracking-[0.2em] text-muted">
                {t("auth.signIn")}
              </span>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const userName = user.user_metadata?.user_name ?? "";
  const fullName = user.user_metadata?.full_name ?? "";
  const avatarUrl = user.user_metadata?.avatar_url ?? "";
  const avatarSrc = getAvatarImageSrc(avatarUrl);
  const email = user.email ?? "";
  const customDisplayName =
    typeof user.user_metadata?.display_name === "string"
      ? user.user_metadata.display_name.trim()
      : "";
  const displayName = customDisplayName || fullName || userName || email || "User";
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

  const beginProfileEdit = () => {
    setProfileNameDraft(
      typeof user.user_metadata?.display_name === "string"
        ? user.user_metadata.display_name
        : "",
    );
    setProfileAvatarDraft(typeof avatarUrl === "string" ? avatarUrl : "");
    setProfileAvatarFile(null);
    setProfileAvatarPreview(null);
    setProfileAvatarRemoved(false);
    setProfileSaveError(null);
    setProfileSaveState("idle");
    setEditingProfile(true);
  };

  const saveProfile = async () => {
    setProfileSaveState("saving");
    setProfileSaveError(null);
    try {
      let nextAvatarUrl = profileAvatarDraft;
      if (profileAvatarFile) {
        const formData = new FormData();
        formData.append("file", profileAvatarFile);
        const response = await fetch("/api/profile/avatar", {
          method: "POST",
          body: formData,
        });
        const body = (await response.json().catch(() => null)) as { avatarUrl?: string; error?: string } | null;
        if (!response.ok || !body?.avatarUrl) {
          throw new Error(body?.error ?? t("profile.avatarUploadFailed"));
        }
        nextAvatarUrl = body.avatarUrl;
      } else if (profileAvatarRemoved) {
        await fetch("/api/profile/avatar", { method: "DELETE" });
        nextAvatarUrl = "";
      }

      await updateProfile({
        displayName: profileNameDraft,
        avatarUrl: nextAvatarUrl,
      });
      setProfileAvatarDraft(nextAvatarUrl);
      setProfileAvatarFile(null);
      setProfileAvatarPreview(null);
      setProfileAvatarRemoved(false);
      setProfileSaveState("saved");
      setEditingProfile(false);
    } catch (error) {
      setProfileSaveState("error");
      setProfileSaveError(error instanceof Error ? error.message : t("profile.saveFailed"));
    }
  };

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (!file) return;

    if (!AVATAR_FILE_TYPES.split(",").includes(file.type)) {
      setProfileSaveError(t("profile.avatarFileTypeInvalid"));
      return;
    }
    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setProfileSaveError(t("profile.avatarFileTooLarge"));
      return;
    }

    setProfileSaveError(null);
    setProfileAvatarFile(file);
    setProfileAvatarRemoved(false);
  };

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
    <EditorialAuraFrame
      className="mx-auto max-w-7xl"
      accent={PROFILE_AURA_ACCENT}
      intensity="subtle"
      label="Personal archive ambient frame"
    >
      <div className="min-h-[calc(100vh-4rem)] bg-[#f5f2ec] bg-[radial-gradient(circle_at_4%_8%,rgba(91,92,190,0.10),transparent_22rem),radial-gradient(circle_at_96%_18%,rgba(226,76,112,0.08),transparent_24rem)] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 md:py-14 dark:bg-[#101313] dark:bg-[radial-gradient(circle_at_4%_8%,rgba(91,92,190,0.12),transparent_22rem),radial-gradient(circle_at_96%_18%,rgba(226,76,112,0.08),transparent_24rem)] motion-safe:animate-home-reveal-soft">
      <div className="grid gap-6 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-8">
        {/* Identity rail */}
        <aside className="min-w-0">
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-background p-5 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.45)] md:sticky md:top-24">
            <div
              aria-hidden="true"
              className="relative -mx-5 -mt-5 mb-6 h-24 overflow-hidden border-b border-border/70 bg-[#f1eee7] dark:bg-[#171b1b]"
            >
              <div className="absolute -left-8 -top-16 h-40 w-40 rounded-full bg-indigo-300/35 blur-3xl dark:bg-indigo-400/15" />
              <div className="absolute left-1/3 -top-10 h-36 w-36 rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-400/15" />
              <div className="absolute -right-8 top-4 h-36 w-36 rounded-full bg-teal-300/30 blur-3xl dark:bg-teal-400/15" />
              <div className="absolute bottom-3 left-5 text-[9px] font-medium uppercase tracking-[0.28em] text-foreground/55">
                StyleKit / Personal archive
              </div>
              <div className="absolute bottom-3 right-5 font-mono text-[10px] text-foreground/45">01—26</div>
            </div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-muted">
              {t("profile.pageLabel")}
            </p>
            <div className="flex flex-col items-start gap-5">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={displayName}
                  width={96}
                  height={96}
                  priority
                  unoptimized
                  className="h-20 w-20 shrink-0 rounded-full border border-border object-cover ring-4 ring-muted/10 md:h-24 md:w-24"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-border bg-muted/10 ring-4 ring-muted/10 md:h-24 md:w-24">
                  <User className="h-8 w-8 text-muted" aria-hidden="true" />
                </div>
              )}
              <div className="min-w-0">
                <h1 className="break-words text-2xl leading-tight tracking-tight md:text-3xl">
                  {displayName}
                </h1>
                {fullName && fullName !== displayName ? <p className="mt-1 text-sm text-muted">{fullName}</p> : null}
                {(userName || profileTitleLabel) && (
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {userName && (
                      <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
                      >
                        <span className="truncate">{profileLabel}</span>
                        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
                      </a>
                    )}
                    {profileTitleLabel && (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-[0.04em] ${profileTitleBadgeClass.className}`}
                        style={profileTitleBadgeClass.style}
                      >
                        {profileTitleIconPath ? (
                          <svg
                            viewBox="0 0 40 40"
                            className="h-3 w-3 fill-current opacity-80"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d={profileTitleIconPath} />
                          </svg>
                        ) : (
                          <span className="h-1 w-1 rounded-full bg-current opacity-55" aria-hidden="true" />
                        )}
                        {profileTitleLabel}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {editingProfile ? (
              <Modal
                open={editingProfile}
                onOpenChange={(open) => {
                  if (profileSaveState !== "saving") {
                    setEditingProfile(open);
                  }
                }}
              >
                <ModalContent className="max-h-[min(44rem,calc(100vh-2rem))] max-w-2xl overflow-y-auto rounded-2xl border border-border bg-[#fbfaf7] p-0 shadow-[0_24px_80px_-32px_rgba(21,24,24,0.55)] dark:bg-[#121616]">
                  <ModalHeader className="relative overflow-hidden border-b border-border bg-[#f1eee7] px-6 py-7 pr-14 dark:bg-[#171b1b] sm:px-8">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-rose-300/25 blur-3xl dark:bg-rose-400/10" />
                    <div aria-hidden="true" className="pointer-events-none absolute right-24 -top-20 h-44 w-44 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-400/10" />
                    <div className="relative flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                      <span>{t("profile.pageLabel")}</span>
                    </div>
                    <ModalTitle className="mt-2 text-2xl tracking-tight">{t("profile.editProfile")}</ModalTitle>
                    <ModalDescription className="relative mt-2 max-w-md text-sm leading-relaxed">
                      {t("profile.editProfileDescription")}
                    </ModalDescription>
                  </ModalHeader>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      void saveProfile();
                    }}
                    className="space-y-6 px-6 py-6 sm:px-8"
                  >
                <label htmlFor="profile-display-name" className="block text-sm text-foreground">
                  <span className="text-xs text-muted">{t("profile.displayName")}</span>
                  <input
                    id="profile-display-name"
                    value={profileNameDraft}
                    onChange={(event) => setProfileNameDraft(event.target.value)}
                    maxLength={60}
                    autoComplete="name"
                    className="mt-2 min-h-11 w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground focus:ring-2 focus:ring-accent/20"
                    placeholder={t("profile.displayNamePlaceholder")}
                  />
                </label>
                <div className="border-t border-border pt-5">
                  <p className="text-xs text-muted">{t("profile.avatar")}</p>
                  <div className="mt-2 flex flex-col gap-4 rounded-xl border border-dashed border-foreground/20 bg-muted/5 p-4 sm:flex-row sm:items-center">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted/10 ring-4 ring-background">
                      {(profileAvatarPreview || (!profileAvatarRemoved && avatarSrc)) ? (
                        <Image
                          src={profileAvatarPreview || avatarSrc || ""}
                          alt=""
                          fill
                          sizes="80px"
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <User className="absolute inset-0 m-auto h-5 w-5 text-muted" aria-hidden="true" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-2">
                        <input
                          id="profile-avatar-file"
                          type="file"
                          accept={AVATAR_FILE_TYPES}
                          onChange={handleAvatarFileChange}
                          className="sr-only"
                        />
                        <label
                          htmlFor="profile-avatar-file"
                          className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-foreground px-3 py-2 text-xs text-foreground transition-colors hover:bg-foreground hover:text-background focus-within:outline-none focus-within:ring-2 focus-within:ring-accent"
                        >
                          <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                          {profileAvatarFile ? t("profile.changeAvatar") : t("profile.chooseAvatar")}
                        </label>
                        {(profileAvatarFile || (!profileAvatarRemoved && avatarSrc)) && (
                          <button
                            type="button"
                            onClick={() => {
                              setProfileAvatarFile(null);
                              setProfileAvatarRemoved(true);
                              setProfileAvatarDraft("");
                              setProfileSaveError(null);
                            }}
                            className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                          >
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                            {t("profile.removeAvatar")}
                          </button>
                        )}
                      </div>
                      <p className="mt-2 text-[11px] leading-relaxed text-muted">{t("profile.avatarHint")}</p>
                    </div>
                  </div>
                </div>
                {profileSaveError && (
                  <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs leading-relaxed text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                    {profileSaveError}
                  </p>
                )}
                  <ModalFooter className="-mx-6 -mb-6 mt-2 gap-2 border-t border-border bg-muted/5 px-6 py-4 sm:-mx-8 sm:-mb-6 sm:px-8">
                    <button
                      type="button"
                      onClick={() => setEditingProfile(false)}
                      disabled={profileSaveState === "saving"}
                      className="min-h-10 rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground disabled:opacity-50"
                    >
                      {t("profile.cancel")}
                    </button>
                    <button
                      type="submit"
                      disabled={profileSaveState === "saving"}
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-foreground px-5 py-2 text-sm text-background transition-colors hover:bg-foreground/85 disabled:cursor-wait disabled:opacity-50"
                    >
                      <Save className="h-3.5 w-3.5" aria-hidden="true" />
                      {profileSaveState === "saving" ? t("profile.saving") : t("profile.save")}
                    </button>
                  </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>
            ) : (
              <button
                type="button"
                onClick={beginProfileEdit}
                className="mt-6 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Pencil className="h-3 w-3" aria-hidden="true" />
                {t("profile.editProfile")}
              </button>
            )}

            <dl className="mt-6 grid gap-4 border-t border-border pt-5 text-[13px]">
              {createdAt && (
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">{t("profile.memberSince")}</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    {createdAt}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">{t("profile.provider")}</dt>
                <dd className="mt-1 flex items-center gap-1.5 text-sm">
                  {isLinuxDo ? <LogIn className="h-3.5 w-3.5 text-muted" aria-hidden="true" /> : <Github className="h-3.5 w-3.5 text-muted" aria-hidden="true" />}
                  {providerLabel}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">{t("profile.userId")}</dt>
                <dd className="mt-1 font-mono text-sm tabular-nums">
                  #{profileSeqId ?? user.id.slice(0, 8)}
                </dd>
              </div>
              {email && (
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">{t("profile.email")}</dt>
                  <dd className="mt-1 inline-flex min-w-0 items-center gap-1.5">
                    <span className="truncate font-mono text-xs">
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
              className="mt-6 inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LogOut className="w-3 h-3" aria-hidden="true" />
              {t("auth.signOut")}
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 rounded-2xl border border-border/80 bg-background p-4 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.45)] sm:p-6 lg:p-7">
          <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">StyleKit / Archive</p>
              <h2 className="mt-2 text-2xl tracking-tight md:text-3xl">{t("profile.collectionTitle")}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{t("profile.collectionDescription")}</p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:pb-1">
              No. {profileSeqId ?? user.id.slice(0, 8)} / 2026
            </p>
          </div>
          <div
            role="tablist"
            aria-label={t("profile.stats")}
            onKeyDown={onTabListKeyDown}
            className="grid grid-cols-2 gap-1 rounded-xl bg-muted/10 p-1 sm:grid-cols-4"
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
                  className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? "bg-background text-foreground shadow-sm" : "text-muted hover:bg-background/70 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="rounded-full bg-muted/10 px-1.5 font-mono text-[11px] text-muted tabular-nums">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="pt-5 sm:pt-7"
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
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {favorites.map((slug) => {
                        const meta = styleMetaBySlug.get(slug);
                        if (meta) {
                          return <FavoriteTile key={slug} style={meta} />;
                        }
                        return (
                          <LocalizedLink
                            key={slug}
                            href={`/styles/${slug}`}
                            className="group flex flex-col justify-center rounded-xl border border-border p-4 transition-colors hover:border-foreground"
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
                        className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:border-foreground/40"
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
                        className="space-y-2.5 rounded-xl border border-border p-4 transition-colors hover:border-foreground/40 md:p-5"
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
    </EditorialAuraFrame>
  );
}
