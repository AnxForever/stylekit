// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: "zh" }),
}));

import { FeedbackForm } from "@/components/feedback/feedback-form";

function mockFetch() {
  return vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValue({ ok: true, json: async () => ({ success: true }) } as Response);
}

describe("FeedbackForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("refuses a supporter note that leaves no way to reply", async () => {
    const fetchMock = mockFetch();
    render(<FeedbackForm variant="supporter" />);

    fireEvent.change(screen.getByLabelText("想说的话"), {
      target: { value: "谢谢你们的项目" },
    });
    fireEvent.click(screen.getByRole("button", { name: "发送留言" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("留个邮箱或微信号");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("relays the supporter's note and contact with a supporter topic", async () => {
    const fetchMock = mockFetch();
    render(<FeedbackForm variant="supporter" />);

    fireEvent.change(screen.getByLabelText("想说的话"), {
      target: { value: "想聊聊定制的事" },
    });
    fireEvent.change(screen.getByLabelText("邮箱或微信号"), {
      target: { value: "wx: stylekit-fan" },
    });
    fireEvent.click(screen.getByRole("button", { name: "发送留言" }));

    await screen.findByRole("status");
    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(init?.body))).toEqual({
      message: "想聊聊定制的事",
      email: "",
      contact: "wx: stylekit-fan",
      website: "",
      topic: "supporter",
    });
  });

  it("keeps the feedback variant's optional email as the reply address", async () => {
    const fetchMock = mockFetch();
    render(<FeedbackForm />);

    fireEvent.change(screen.getByLabelText("你的想法"), {
      target: { value: "首页加载有点慢" },
    });
    fireEvent.change(screen.getByLabelText("邮箱（可选）"), {
      target: { value: "reader@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "发送反馈" }));

    await screen.findByRole("status");
    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(String(init?.body))).toEqual({
      message: "首页加载有点慢",
      email: "reader@example.com",
      website: "",
      topic: "feedback",
    });
  });
});
