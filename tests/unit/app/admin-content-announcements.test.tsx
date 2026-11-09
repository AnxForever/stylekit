// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteContentEditor } from "@/app/admin/content/_content";

interface AnnouncementRecord {
  locale: "zh-CN" | "en";
  enabled: boolean;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string | null;
}

function makeRecord(
  locale: AnnouncementRecord["locale"],
  title: string,
  updatedAt = "2026-11-09T10:00:00.000Z",
): AnnouncementRecord {
  return {
    locale,
    enabled: true,
    title,
    body: "公告正文",
    cta_label: "查看详情",
    cta_href: "/zh/changelog",
    starts_at: null,
    ends_at: null,
    updated_at: updatedAt,
  };
}

function jsonResponse(payload: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => payload,
  } as Response;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function makeFetch(initial?: AnnouncementRecord[]) {
  return vi.fn<typeof fetch>((_input, init) => {
    if (init?.method === "PUT") {
      return Promise.resolve(jsonResponse({ error: "Unexpected save request." }, 500));
    }
    return Promise.resolve(jsonResponse({ announcements: initial ?? [] }));
  });
}

function titleInput(): HTMLInputElement {
  return screen.getAllByRole("textbox")[0] as HTMLInputElement;
}

beforeEach(() => {
  vi.stubGlobal("fetch", makeFetch([
    makeRecord("zh-CN", "中文公告"),
    makeRecord("en", "English announcement"),
  ]));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("site announcement admin drafts", () => {
  it("keeps the other locale draft when the submitted save finishes", async () => {
    const initial = [makeRecord("zh-CN", "中文公告"), makeRecord("en", "English announcement")];
    const pendingSave = deferred<Response>();
    const fetchMock = vi.fn<typeof fetch>((_input, init) =>
      init?.method === "PUT"
        ? pendingSave.promise
        : Promise.resolve(jsonResponse({ announcements: initial })),
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<SiteContentEditor />);
    await screen.findByRole("button", { name: "保存公告" });
    const title = titleInput();
    fireEvent.change(title, { target: { value: "已提交中文标题" } });
    fireEvent.click(screen.getByRole("button", { name: "保存公告" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    const submitted = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      locale: string;
      title: string;
      expectedUpdatedAt: string;
    };
    expect(submitted).toMatchObject({ locale: "zh-CN", title: "已提交中文标题" });

    fireEvent.click(screen.getByRole("button", { name: "English" }));
    const englishTitle = titleInput();
    fireEvent.change(englishTitle, { target: { value: "尚未保存的英文草稿" } });

    await act(async () => {
      pendingSave.resolve(jsonResponse({
        announcement: makeRecord("zh-CN", "已提交中文标题", "2026-11-09T10:01:00.000Z"),
      }));
    });

    expect(titleInput()).toHaveValue("尚未保存的英文草稿");
    expect(screen.getByText(/中文公告已保存/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("preserves same-locale edits made while the submitted snapshot is saving", async () => {
    const initial = [makeRecord("zh-CN", "中文公告"), makeRecord("en", "English announcement")];
    const pendingSave = deferred<Response>();
    const fetchMock = vi.fn<typeof fetch>((_input, init) =>
      init?.method === "PUT"
        ? pendingSave.promise
        : Promise.resolve(jsonResponse({ announcements: initial })),
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<SiteContentEditor />);
    await screen.findByRole("button", { name: "保存公告" });
    const title = titleInput();
    fireEvent.change(title, { target: { value: "本次提交的标题" } });
    fireEvent.click(screen.getByRole("button", { name: "保存公告" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

    fireEvent.change(titleInput(), {
      target: { value: "保存期间新编辑的标题" },
    });
    await act(async () => {
      pendingSave.resolve(jsonResponse({
        announcement: makeRecord("zh-CN", "本次提交的标题", "2026-11-09T10:01:00.000Z"),
      }));
    });

    expect(titleInput()).toHaveValue("保存期间新编辑的标题");
    expect(screen.getByText(/保存后继续编辑的内容仍未保存/)).toBeInTheDocument();
  });

  it("preserves a draft on version conflict and requires an explicit overwrite", async () => {
    const initial = [makeRecord("zh-CN", "中文公告"), makeRecord("en", "English announcement")];
    const latest = makeRecord("zh-CN", "服务器最新公告", "2026-11-09T10:02:00.000Z");
    const fetchMock = vi.fn<typeof fetch>((_input, init) => {
      if (init?.method !== "PUT") return Promise.resolve(jsonResponse({ announcements: initial }));
      const body = JSON.parse(init.body as string) as { title: string; expectedUpdatedAt: string };
      if (body.expectedUpdatedAt === initial[0]?.updated_at) {
        return Promise.resolve(jsonResponse({ error: "公告已被其他管理员更新。", latestAnnouncement: latest }, 409));
      }
      return Promise.resolve(jsonResponse({
        announcement: makeRecord("zh-CN", body.title, "2026-11-09T10:03:00.000Z"),
      }));
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<SiteContentEditor />);
    await screen.findByRole("button", { name: "保存公告" });
    fireEvent.change(titleInput(), {
      target: { value: "保留我的草稿" },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存公告" }));

    expect(await screen.findByRole("button", { name: "用当前草稿覆盖" })).toBeInTheDocument();
    expect(titleInput()).toHaveValue("保留我的草稿");
    expect(screen.getByRole("button", { name: "载入服务器版本" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "用当前草稿覆盖" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    const overwrite = JSON.parse(fetchMock.mock.calls[2]?.[1]?.body as string) as {
      title: string;
      expectedUpdatedAt: string;
    };
    expect(overwrite).toMatchObject({
      expectedUpdatedAt: latest.updated_at,
      title: "保留我的草稿",
    });
    expect(await screen.findByText("中文公告已保存。" )).toBeInTheDocument();
  });

  it("keeps the draft and allows retry after a network failure", async () => {
    const initial = [makeRecord("zh-CN", "中文公告"), makeRecord("en", "English announcement")];
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({ announcements: initial }))
      .mockRejectedValueOnce(new Error("network unavailable"))
      .mockResolvedValueOnce(jsonResponse({
        announcement: makeRecord("zh-CN", "可重试草稿", "2026-11-09T10:01:00.000Z"),
      }));
    vi.stubGlobal("fetch", fetchMock);

    render(<SiteContentEditor />);
    await screen.findByRole("button", { name: "保存公告" });
    fireEvent.change(titleInput(), {
      target: { value: "可重试草稿" },
    });
    fireEvent.click(screen.getByRole("button", { name: "保存公告" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("network unavailable");
    expect(titleInput()).toHaveValue("可重试草稿");

    fireEvent.click(screen.getByRole("button", { name: "保存公告" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    const firstSave = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as { expectedUpdatedAt: string };
    const retry = JSON.parse(fetchMock.mock.calls[2]?.[1]?.body as string) as { expectedUpdatedAt: string };
    expect(retry.expectedUpdatedAt).toBe(firstSave.expectedUpdatedAt);
    expect(await screen.findByText("中文公告已保存。" )).toBeInTheDocument();
  });
});
