// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

const { useI18nMock, usePathnameMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
  usePathnameMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

vi.mock("next/navigation", () => ({
  usePathname: usePathnameMock,
}));

vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <a {...props}>{children}</a>
  ),
}));

import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import type { SiteAnnouncement } from "@/lib/site-announcements";

const zhAnnouncement: SiteAnnouncement = {
  id: "site-announcement:zh-CN",
  locale: "zh-CN",
  enabled: true,
  title: "本周更新",
  body: "新的内容已经上线。",
  ctaLabel: "查看详情",
  ctaHref: "/zh/changelog",
  startsAt: null,
  endsAt: null,
  updatedAt: null,
};

const enAnnouncement: SiteAnnouncement = {
  id: "site-announcement:en",
  locale: "en",
  enabled: true,
  title: "Weekly update",
  body: "New content is live.",
  ctaLabel: "View details",
  ctaHref: "/en/changelog",
  startsAt: null,
  endsAt: null,
  updatedAt: null,
};

describe("AnnouncementBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useI18nMock.mockReturnValue({ locale: "zh", t: (key: string) => key });
    usePathnameMock.mockReturnValue("/zh");
  });

  it("renders the announcement body on the public banner", async () => {
    render(
      <AnnouncementBanner
        announcements={{ en: enAnnouncement, zh: zhAnnouncement }}
      />,
    );

    await waitFor(() => expect(screen.getByRole("banner")).toBeVisible());
    expect(screen.getByText("本周更新")).toBeInTheDocument();
    expect(screen.getByText("新的内容已经上线。")).toBeInTheDocument();
  });

  it("selects the announcement by locale", async () => {
    useI18nMock.mockReturnValue({ locale: "en", t: (key: string) => key });
    usePathnameMock.mockReturnValue("/en");

    render(
      <AnnouncementBanner
        announcements={{ en: enAnnouncement, zh: zhAnnouncement }}
      />,
    );

    await waitFor(() => expect(screen.getByRole("banner")).toBeVisible());
    expect(screen.getByText("Weekly update")).toBeInTheDocument();
    expect(screen.queryByText("本周更新")).not.toBeInTheDocument();
  });

  it("does not render on isolated admin surfaces", () => {
    usePathnameMock.mockReturnValue("/admin/content");

    render(
      <AnnouncementBanner
        announcements={{ en: enAnnouncement, zh: zhAnnouncement }}
      />,
    );

    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });
});
