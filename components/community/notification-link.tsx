"use client";

import { Bell } from "lucide-react";
import { useUser } from "@/lib/auth/use-user";
import { useI18n } from "@/lib/i18n/context";
import { useCommunityNotifications } from "@/lib/community/use-notifications";
import { LocalizedLink } from "@/components/i18n/localized-link";

export function CommunityNotificationLink({ className = "" }: { className?: string }) {
  const { user } = useUser();
  const { locale } = useI18n();
  const { data, error } = useCommunityNotifications(user?.id, "", 1);
  if (!user) return null;
  const count = error ? undefined : data?.unreadCount;
  const label = locale === "zh" ? "社区通知" : "Community notifications";
  const ariaLabel = count ? `${label} · ${count} ${locale === "zh" ? "条未读" : "unread"}` : label;

  return (
    <LocalizedLink href="/community/notifications" aria-label={ariaLabel} title={ariaLabel}
      className={`relative inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${className}`}>
      <Bell className="size-4" aria-hidden="true" />
      {count ? <span aria-hidden="true" className="absolute right-0 top-0 min-w-4 rounded-full bg-foreground px-1 text-center text-[10px] leading-4 text-background">{count > 99 ? "99+" : count}</span> : null}
    </LocalizedLink>
  );
}
