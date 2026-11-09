// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildAnnouncementBootstrapScript,
  getAnnouncementDismissalKeys,
  hasAnnouncementDismissal,
} from "@/lib/site-announcement-dismissal";
import { getSiteAnnouncementRevisionId } from "@/lib/site-announcement-revision";

const LOCALE = "zh-CN" as const;

function makeRow(overrides: Partial<{
  enabled: boolean;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string | null;
}> = {}) {
  return {
    locale: LOCALE,
    enabled: true,
    title: "重要更新",
    body: "有新的内容上线。",
    cta_label: "查看详情",
    cta_href: "/zh/changelog",
    starts_at: null,
    ends_at: null,
    updated_at: "2026-11-09T10:00:00.000Z",
    ...overrides,
  };
}

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("announcement revision and dismissal", () => {
  it("keeps the same identity for formatting and timestamp-only changes", () => {
    const original = getSiteAnnouncementRevisionId(makeRow({
      title: "重要  更新",
      body: "有新的 内容上线。",
    }));
    const sameContent = getSiteAnnouncementRevisionId(makeRow({
      title: "  重要 更新  ",
      body: "有新的\n内容上线。",
      updated_at: "2026-11-09T10:30:00.000Z",
    }));

    expect(sameContent).toBe(original);
  });

  it.each([
    { body: "公告正文改动。" },
    { cta_label: "立即查看" },
    { cta_href: "/zh/updates" },
    { starts_at: "2026-11-10T00:00:00.000Z" },
    { ends_at: "2026-11-12T00:00:00.000Z" },
    { enabled: false },
  ])("changes identity when publishable content changes: $body", (change) => {
    const original = getSiteAnnouncementRevisionId(makeRow());
    const changed = getSiteAnnouncementRevisionId({ ...makeRow(), ...change });
    expect(changed).not.toBe(original);
  });

  it("migrates the old locale-only dismissal once to the current revision", () => {
    const storage = window.localStorage;
    const oldKey = "sk-site-announcement-dismissed:site-announcement:zh-CN";
    const current = { id: getSiteAnnouncementRevisionId(makeRow()) };
    storage.clear();
    storage.setItem(oldKey, "1");

    expect(hasAnnouncementDismissal(storage, current.id, LOCALE)).toBe(true);
    expect(storage.getItem(getAnnouncementDismissalKeys(current.id, LOCALE).legacyRevision)).toBe(current.id);

    const nextRevision = getSiteAnnouncementRevisionId(makeRow({ body: "公告正文有真实改动。" }));
    expect(hasAnnouncementDismissal(storage, nextRevision, LOCALE)).toBe(false);
  });

  it("uses the same migration in the pre-hydration bootstrap script", () => {
    const storage = window.localStorage;
    const current = { id: getSiteAnnouncementRevisionId(makeRow()) };
    const documentStub = { documentElement: { dataset: {} as Record<string, string> } };
    storage.clear();
    storage.setItem("sk-site-announcement-dismissed:site-announcement:zh-CN", "1");

    const execute = new Function("localStorage", "document", buildAnnouncementBootstrapScript(current.id, LOCALE));
    execute(storage, documentStub);

    expect(documentStub.documentElement.dataset.siteAnnouncementDismissed).toBe("true");
    expect(storage.getItem(getAnnouncementDismissalKeys(current.id, LOCALE).legacyRevision)).toBe(current.id);

    delete documentStub.documentElement.dataset.siteAnnouncementDismissed;
    const nextRevision = getSiteAnnouncementRevisionId(makeRow({ body: "公告正文有真实改动。" }));
    new Function("localStorage", "document", buildAnnouncementBootstrapScript(nextRevision, LOCALE))(storage, documentStub);
    expect(documentStub.documentElement.dataset.siteAnnouncementDismissed).toBeUndefined();
  });

  it("keeps JSON values safe inside the inline bootstrap script", () => {
    const script = buildAnnouncementBootstrapScript("site-announcement:</script>", LOCALE);

    expect(script).not.toContain("</script>");
    expect(script).toContain("\\u003c/script>");
  });
});
