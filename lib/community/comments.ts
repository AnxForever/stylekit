import { localizeHref } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/translations";

export const COMMENT_MAX_LENGTH = 280;
export const COMMENTS_PAGE_SIZE = 10;

export function getStyleCommentsKey(slug: string, limit = COMMENTS_PAGE_SIZE, offset = 0, commentId?: string) {
  if (commentId) return `/api/styles/${encodeURIComponent(slug)}/comments?comment=${encodeURIComponent(commentId)}`;
  return `/api/styles/${encodeURIComponent(slug)}/comments?limit=${limit}&offset=${offset}`;
}

export function getStyleFeedbackLoginHref(pathname: string | null, slug: string, locale: Locale, commentId?: string): string {
  const isDetailPath = pathname && /^\/(?:en\/|zh\/)?(?:styles|community)\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/.test(pathname);
  const destination = localizeHref(isDetailPath ? pathname : `/styles/${slug}`, locale);
  const target = commentId ? `${destination}?comment=${encodeURIComponent(commentId)}#comment-${commentId}` : `${destination}#style-feedback`;
  return `${localizeHref("/login", locale)}?next=${encodeURIComponent(target)}`;
}
