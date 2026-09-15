// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentProps } from "react";
const mocks = vi.hoisted(() => ({ user: vi.fn(), inbox: vi.fn(), mutate: vi.fn(), globalMutate: vi.fn() }));
vi.mock("@/lib/auth/use-user", () => ({ useUser: mocks.user }));
vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: "en" }) }));
vi.mock("swr", () => ({ useSWRConfig: () => ({ mutate: mocks.globalMutate }) }));
vi.mock("@/lib/community/use-notifications", async (original) => ({ ...await original<typeof import("@/lib/community/use-notifications")>(), useCommunityNotifications: mocks.inbox }));
vi.mock("next/link", () => ({ default: (props: ComponentProps<"a">) => <a {...props} /> }));
import { NotificationInbox } from "@/components/community/notification-inbox";

const note = {
  id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", createdAt: "2026-09-15T01:00:00Z", readAt: null,
  actorName: "Creator", content: "A useful reply", styleName: "暗色", styleNameEn: "Dark Mode",
  href: "/styles/dark-mode?comment=bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb#comment-bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
};
beforeEach(() => {
  vi.clearAllMocks();
  mocks.user.mockReturnValue({ user: { id: "signed-in-user" }, loading: false });
  mocks.mutate.mockResolvedValue(undefined); mocks.globalMutate.mockResolvedValue(undefined);
  mocks.inbox.mockReturnValue({ data: { items: [note], unreadCount: 1, nextCursor: null }, error: undefined, isLoading: false, mutate: mocks.mutate });
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("private notification inbox UI", () => {
  it("does not render another user's cached inbox to signed-out readers", () => {
    mocks.user.mockReturnValue({ user: null, loading: false });
    render(<NotificationInbox />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/en/login?next=%2Fen%2Fcommunity%2Fnotifications");
    expect(screen.queryByText("A useful reply")).not.toBeInTheDocument();
    expect(mocks.inbox).not.toHaveBeenCalled();
  });
  it("links to the exact reply and sends only visible unread IDs when acknowledged", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({ success: true })));
    render(<NotificationInbox />);
    expect(screen.getByRole("link", { name: "Read reply" })).toHaveAttribute("href", `/en${note.href}`);
    fireEvent.click(screen.getByRole("button", { name: "Mark this page as read" }));
    await waitFor(() => expect(screen.getByText("Marked as read.")).toBeInTheDocument());
    expect(JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string)).toEqual({ ids: [note.id] });
    expect(mocks.mutate).toHaveBeenCalledOnce();
  });
  it("does not falsely mark a failed mutation successful", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response("Unavailable", { status: 503 }));
    render(<NotificationInbox />);
    fireEvent.click(screen.getByRole("button", { name: "Mark as read" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("remain unread"));
    expect(screen.getByText("Unread", { exact: true })).toBeInTheDocument();
    expect(mocks.mutate).not.toHaveBeenCalled();
  });
  it("shows retry rather than treating an outage as an empty inbox", () => {
    mocks.inbox.mockReturnValue({ data: undefined, error: new Error("offline"), isLoading: false, mutate: mocks.mutate });
    render(<NotificationInbox />);
    expect(screen.getByRole("alert")).toHaveTextContent("temporarily unavailable");
    expect(screen.queryByText("No reply notifications on this page")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(mocks.mutate).toHaveBeenCalledOnce();
  });
  it("resets pagination when the signed-in identity changes", () => {
    mocks.inbox.mockReturnValue({ data: { items: [note], unreadCount: 1, nextCursor: "cursor-2" }, error: undefined, isLoading: false, mutate: mocks.mutate });
    const view = render(<NotificationInbox />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(mocks.inbox).toHaveBeenLastCalledWith("signed-in-user", "cursor-2");
    mocks.user.mockReturnValue({ user: { id: "second-user" }, loading: false });
    view.rerender(<NotificationInbox />);
    expect(mocks.inbox).toHaveBeenLastCalledWith("second-user", "");
  });
});
