// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentProps } from "react";
import type { Comment } from "@/lib/swr";

const mocks = vi.hoisted(() => ({
  comments: vi.fn(), user: vi.fn(), mutate: vi.fn(), mutateCache: vi.fn(),
  pathname: vi.fn(), locale: vi.fn(),
}));
vi.mock("@/lib/swr", () => ({ useStyleComments: mocks.comments }));
vi.mock("@/lib/auth/use-user", () => ({ useUser: mocks.user }));
vi.mock("swr", () => ({ useSWRConfig: () => ({ mutate: mocks.mutateCache }) }));
vi.mock("next/navigation", () => ({ usePathname: mocks.pathname, useSearchParams: () => new URLSearchParams(window.location.search) }));
vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: mocks.locale(), t: (key: string) => key }),
}));
vi.mock("next/link", () => ({ default: (props: ComponentProps<"a">) => <a {...props} /> }));

import { StyleComments } from "@/components/styles/style-comments";

function comment(index: number): Comment {
  return {
    id: `comment-${index}`, content: `Comment number ${index}`, author_name: "Creator",
    avatar_url: null, user_id: "owner", created_at: "2026-09-10T10:00:00Z",
    author_provider: "github", author_seq_id: 42, author_title: null,
    author_title_color: null, author_title_icon_path: null,
  };
}

let rows: Comment[];
beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState(null, "", "/en/community/aurora");
  rows = Array.from({ length: 11 }, (_, index) => comment(index + 1));
  mocks.locale.mockReturnValue("en");
  mocks.pathname.mockReturnValue("/en/community/aurora");
  mocks.user.mockReturnValue({ user: null });
  mocks.mutate.mockResolvedValue(undefined);
  mocks.mutateCache.mockResolvedValue(undefined);
  mocks.comments.mockImplementation((_slug: string, limit: number, offset: number) => ({
    data: { comments: rows.slice(offset, offset + limit), total: rows.length },
    mutate: mocks.mutate, error: undefined, isLoading: false,
  }));
  vi.stubGlobal("fetch", vi.fn(() => { throw new Error("Unexpected network access in comments test"); }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function signIn() {
  mocks.user.mockReturnValue({ user: { id: "owner", user_metadata: { user_name: "Creator" } } });
}

describe("style discussion participation", () => {
  it("makes comments beyond the first ten reachable and links the public contributor profile", () => {
    render(<StyleComments slug="aurora" />);
    expect(screen.getByText("Comment number 1")).toBeInTheDocument();
    expect(screen.queryByText("Comment number 11")).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Creator" })[0]).toHaveAttribute("href", "/en/community/u/42");
    fireEvent.click(screen.getByRole("button", { name: "Next comments" }));
    expect(mocks.comments).toHaveBeenLastCalledWith("aurora", 10, 10, undefined);
    expect(screen.getByText("Comment number 11")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next comments" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Previous comments" }));
    expect(screen.getByText("Comment number 1")).toBeInTheDocument();
  });

  it("returns a signed-out reader to the same localized community discussion", () => {
    mocks.locale.mockReturnValue("zh");
    mocks.pathname.mockReturnValue("/zh/community/aurora");
    render(<StyleComments slug="aurora" />);
    const link = screen.getByRole("link", { name: "styleComments.signInAction" });
    const href = new URL(link.getAttribute("href")!, "https://www.stylekit.top");
    expect(href.pathname).toBe("/zh/login");
    expect(href.searchParams.get("next")).toBe("/zh/community/aurora#style-feedback");
  });

  it("distinguishes load failure from an empty discussion and offers retry", () => {
    mocks.comments.mockReturnValue({ data: undefined, error: new Error("offline"), isLoading: false, mutate: mocks.mutate });
    render(<StyleComments slug="aurora" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Comments could not be loaded.");
    expect(screen.queryByText(/No comments yet/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(mocks.mutate).toHaveBeenCalledOnce();
  });

  it("shows a labeled loading state rather than a zero comment count", () => {
    mocks.comments.mockReturnValue({ data: undefined, error: undefined, isLoading: true, mutate: mocks.mutate });
    render(<StyleComments slug="aurora" />);
    expect(screen.getByRole("status", { name: "Loading comments…" })).toBeInTheDocument();
    expect(screen.queryByText(/No comments yet/)).not.toBeInTheDocument();
  });

  it("keeps a multiline draft after a failed mutation and rejects blank input", async () => {
    signIn();
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ success: false, error: "Try later" }), { status: 429 }));
    render(<StyleComments slug="aurora" />);
    const input = screen.getByRole("textbox", { name: "Your comment" });
    expect(input.tagName).toBe("TEXTAREA");
    fireEvent.change(input, { target: { value: "   " } });
    expect(screen.getByRole("button", { name: "Post comment" })).toBeDisabled();
    fireEvent.change(input, { target: { value: "A concrete question\nWith context" } });
    fireEvent.click(screen.getByRole("button", { name: "Post comment" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Try later"));
    expect(input).toHaveValue("A concrete question\nWith context");
    expect(mocks.mutate).not.toHaveBeenCalled();
  });

  it("posts from a later page and returns to the newest page instead of inserting into the wrong page", async () => {
    signIn();
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ success: true, comment: comment(12) }), { status: 201 }));
    render(<StyleComments slug="aurora" />);
    fireEvent.click(screen.getByRole("button", { name: "Next comments" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Your comment" }), { target: { value: "New feedback" } });
    fireEvent.click(screen.getByRole("button", { name: "Post comment" }));
    await waitFor(() => expect(screen.getByText("Comment posted.")).toBeInTheDocument());
    expect(mocks.mutateCache).toHaveBeenCalledWith("/api/styles/aurora/comments?limit=10&offset=0", undefined, { revalidate: false });
    expect(mocks.comments).toHaveBeenLastCalledWith("aurora", 10, 0, undefined);
    expect(screen.getByRole("textbox", { name: "Your comment" })).toHaveValue("");
  });

  it("moves back after deleting the only comment on the final page", async () => {
    signIn();
    vi.stubGlobal("confirm", vi.fn().mockReturnValue(true));
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    render(<StyleComments slug="aurora" />);
    fireEvent.click(screen.getByRole("button", { name: "Next comments" }));
    fireEvent.click(screen.getByRole("button", { name: "styleComments.delete" }));
    await waitFor(() => expect(screen.getByText("Comment deleted.")).toBeInTheDocument());
    expect(mocks.comments).toHaveBeenLastCalledWith("aurora", 10, 0, undefined);
    expect(mocks.mutateCache).toHaveBeenCalledWith("/api/styles/aurora/comments?limit=10&offset=0", undefined, { revalidate: false });
  });

  it("shows edit errors beside the discussion without discarding the edited text", async () => {
    signIn();
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ success: false, error: "Update failed" }), { status: 500 }));
    render(<StyleComments slug="aurora" />);
    fireEvent.click(screen.getAllByRole("button", { name: "styleComments.edit" })[0]);
    const input = screen.getByRole("textbox", { name: "Edit your comment" });
    fireEvent.change(input, { target: { value: "Updated question" } });
    expect(screen.getByRole("button", { name: "Next comments" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "styleComments.save" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Update failed"));
    expect(input).toHaveValue("Updated question");
  });
});

describe("contextual replies", () => {
  it("keeps the selected parent and draft when publishing fails", async () => {
    signIn();
    mocks.comments.mockReturnValue({ data: { comments: [comment(1)], total: 1, repliesEnabled: true }, error: undefined, isLoading: false, mutate: mocks.mutate });
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ success: false, error: "The original comment is no longer available." }), { status: 409 }));
    render(<StyleComments slug="aurora" />);
    fireEvent.click(screen.getByRole("button", { name: "Reply" }));
    expect(screen.getByText("Replying to Creator")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: "Your comment" }), { target: { value: "My reply" } });
    fireEvent.click(screen.getByRole("button", { name: "Post reply" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("original comment"));
    expect(screen.getByRole("textbox", { name: "Your comment" })).toHaveValue("My reply");
    expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string)).toEqual({ content: "My reply", replyToId: "comment-1" });
    expect(screen.getByRole("button", { name: "Cancel reply" })).toBeInTheDocument();
  });
  it("shows removed context explicitly rather than inventing a parent author", () => {
    mocks.comments.mockReturnValue({ data: { comments: [{ ...comment(1), is_reply: true, reply_to_id: null, reply_to: null }], total: 1, repliesEnabled: true }, isLoading: false, mutate: mocks.mutate });
    render(<StyleComments slug="aurora" />);
    expect(screen.getByText("The original comment was removed.")).toBeInTheDocument();
  });
  it("requests a linked comment directly instead of assuming it appears on page one", () => {
    window.history.replaceState(null, "", "/en/community/aurora?comment=target#comment-target");
    render(<StyleComments slug="aurora" />);
    expect(mocks.comments).toHaveBeenCalledWith("aurora", 10, 0, "target");
    expect(screen.getByRole("button", { name: "View all comments" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next comments" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "View all comments" }));
    expect(new URLSearchParams(window.location.search).has("comment")).toBe(false);
  });
  it("does not advertise reply controls while the database migration is pending", () => {
    signIn();
    mocks.comments.mockReturnValue({ data: { comments: [comment(1)], total: 1, repliesEnabled: false }, isLoading: false, mutate: mocks.mutate });
    render(<StyleComments slug="aurora" />);
    expect(screen.queryByRole("button", { name: "Reply" })).not.toBeInTheDocument();
    expect(screen.getByText(/Replies are temporarily unavailable/)).toBeInTheDocument();
  });
});
