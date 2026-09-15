"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import { useCommunityNotifications, notificationKey } from "@/lib/community/use-notifications";
import { LocalizedLink } from "@/components/i18n/localized-link";
import type { CommunityNotification } from "@/lib/community/notifications";

export function NotificationInbox() {
  const { user, loading } = useUser();
  const { locale } = useI18n();
  if (loading) return <p role="status">{locale === "zh" ? "正在加载账号…" : "Loading your account…"}</p>;
  if (!user) return (
    <div className="border border-border p-6">
      <h2 className="text-lg font-medium">{locale === "zh" ? "登录后查看回复通知" : "Sign in to see your replies"}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{locale === "zh" ? "通知只对你可见，不会公开展示。" : "Your inbox is private and is never published in the community."}</p>
      <LocalizedLink href={`/login?next=${encodeURIComponent(`/${locale}/community/notifications`)}`} className="mt-5 inline-flex min-h-11 items-center rounded-md bg-foreground px-4 text-sm text-background">
        {locale === "zh" ? "登录查看" : "Sign in"}
      </LocalizedLink>
    </div>
  );
  return <SignedInInbox key={user.id} userId={user.id} />;
}

function SignedInInbox({ userId }: { userId: string }) {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const [cursors, setCursors] = useState<string[]>([""]);
  const cursor = cursors.at(-1) ?? "";
  const { data, error, isLoading, mutate } = useCommunityNotifications(userId, cursor);
  const { mutate: mutateCache } = useSWRConfig();
  const [saving, setSaving] = useState(false);
  const [writeError, setWriteError] = useState("");
  const [message, setMessage] = useState("");
  const unreadIds = data?.items.filter((item) => !item.readAt).map((item) => item.id) ?? [];

  async function markRead(ids: string[]) {
    if (saving || ids.length === 0) return;
    setSaving(true); setWriteError(""); setMessage("");
    try {
      const response = await fetch("/api/community/notifications", {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }),
      });
      if (!response.ok) throw new Error("Could not mark notifications as read");
      await Promise.all([mutate(), mutateCache(notificationKey(userId, "", 1))]);
      setMessage(isZh ? "已标记为已读。" : "Marked as read.");
    } catch { setWriteError(isZh ? "标记失败，请重试。通知仍保留未读状态。" : "Could not mark as read. Your notifications remain unread; please retry."); }
    finally { setSaving(false); }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <p className="text-sm text-muted" role="status">{data && !error ? (isZh ? `${data.unreadCount} 条未读回复` : `${data.unreadCount} unread ${data.unreadCount === 1 ? "reply" : "replies"}`) : (isZh ? "你的回复通知" : "Your reply notifications")}</p>
        <button type="button" disabled={saving || isLoading || unreadIds.length === 0} onClick={() => void markRead(unreadIds)} className="min-h-11 rounded-md border border-border px-4 text-sm hover:border-foreground disabled:opacity-50">
          {saving ? (isZh ? "正在标记…" : "Marking…") : (isZh ? "将本页未读标记为已读" : "Mark this page as read")}
        </button>
      </div>
      <p role="status" aria-live="polite" className="text-sm text-muted">{message}</p>
      {writeError ? <p role="alert" className="mb-4 text-sm text-red-700 dark:text-red-300">{writeError}</p> : null}
      {error ? (
        <div role="alert" className="border border-border p-5">
          <p className="text-sm">{isZh ? "通知暂时无法加载，请稍后重试。" : "Notifications are temporarily unavailable. Please try again."}</p>
          <button type="button" onClick={() => void mutate()} className="mt-3 min-h-10 px-2 text-sm underline underline-offset-4">{isZh ? "重试" : "Retry"}</button>
        </div>
      ) : isLoading ? (
        <div role="status" className="space-y-3" aria-label={isZh ? "正在加载通知" : "Loading notifications"}>
          {[0, 1, 2].map((item) => <div key={item} aria-hidden="true" className="h-24 rounded-md bg-muted/10 motion-safe:animate-pulse" />)}
        </div>
      ) : data?.items.length === 0 ? (
        <div className="py-14 text-center">
          <h2 className="font-serif text-xl">{isZh ? "这一页暂无回复通知" : "No reply notifications on this page"}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">{isZh ? "有人回复你的评论时，会出现在这里。被删除的评论和隐藏风格不会继续显示。" : "Replies to your comments appear here. Deleted comments and hidden styles are not shown."}</p>
          <LocalizedLink href="/community" className="mt-5 inline-flex min-h-11 items-center text-sm underline underline-offset-4">{isZh ? "去社区参与讨论" : "Join a community discussion"}</LocalizedLink>
        </div>
      ) : (
        <ol className="divide-y divide-border">{data?.items.map((item) => <NotificationRow key={item.id} item={item} locale={locale} saving={saving} onRead={() => void markRead([item.id])} />)}</ol>
      )}
      {cursors.length > 1 || data?.nextCursor ? (
        <nav aria-label={isZh ? "通知分页" : "Notification pages"} className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
          <button type="button" disabled={cursors.length === 1 || isLoading || saving} onClick={() => setCursors((current) => current.slice(0, -1))} className="min-h-11 rounded-md border border-border px-4 text-sm disabled:opacity-50">{isZh ? "上一页" : "Previous"}</button>
          <span className="text-xs text-muted">{isZh ? `第 ${cursors.length} 页` : `Page ${cursors.length}`}</span>
          <button type="button" disabled={!data?.nextCursor || isLoading || saving} onClick={() => { if (data?.nextCursor) setCursors((current) => [...current, data.nextCursor!]); }} className="min-h-11 rounded-md border border-border px-4 text-sm disabled:opacity-50">{isZh ? "下一页" : "Next"}</button>
        </nav>
      ) : null}
    </div>
  );
}

function NotificationRow({ item, locale, saving, onRead }: { item: CommunityNotification; locale: "en" | "zh"; saving: boolean; onRead: () => void }) {
  const isZh = locale === "zh";
  return (
    <li className="py-6">
      <article>
        <div className="flex flex-wrap items-baseline justify-between gap-3 text-xs text-muted">
          <p>{isZh ? item.styleName : item.styleNameEn || item.styleName}{!item.readAt ? <span className="ml-3 font-medium text-foreground">{isZh ? "未读" : "Unread"}</span> : null}</p>
          <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString(isZh ? "zh-CN" : "en-US")}</time>
        </div>
        <h2 className="mt-3 break-words font-sans text-base font-medium">{item.actorName || (isZh ? "社区成员" : "A community member")}{isZh ? " 回复了你" : " replied to you"}</h2>
        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-foreground/90">{item.content}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm">
          <LocalizedLink href={item.href} className="inline-flex min-h-10 items-center underline underline-offset-4">{isZh ? "查看回复" : "Read reply"}</LocalizedLink>
          {!item.readAt ? <button type="button" onClick={onRead} disabled={saving} className="min-h-10 text-muted hover:text-foreground disabled:opacity-50">{isZh ? "标记已读" : "Mark as read"}</button> : null}
        </div>
      </article>
    </li>
  );
}
