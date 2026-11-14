/** @vitest-environment jsdom */

import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const authState = vi.hoisted(() => ({ user: null as null | { id: string } }));
const trackEventMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/analytics/events", () => ({ trackEvent: trackEventMock }));

vi.mock("@/lib/auth/use-user", () => ({
  useUser: () => ({ user: authState.user }),
}));

vi.mock("@/lib/auth/browser-client-loader", () => ({
  loadAuthClient: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ t: (key: string) => key }),
}));

import { FavoriteButton } from "@/components/favorite-button";
import { FavoritesProvider, useFavorites } from "@/lib/favorites/context";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function Probe({ slug = "glassmorphism" }: { slug?: string }) {
  const { favorites, mutationStatus, addFavorite } = useFavorites();
  const status = mutationStatus(slug);
  return (
    <>
      <output data-testid="favorites">{favorites.join(",")}</output>
      <output data-testid="mutation-status">{`${status.pending}:${status.failed}`}</output>
      <button onClick={() => addFavorite("editorial")} type="button">
        Seed anonymous favorite
      </button>
      <FavoriteButton slug={slug} />
    </>
  );
}

function tree() {
  return (
    <FavoritesProvider>
      <Probe />
    </FavoritesProvider>
  );
}

function installFetch(
  implementation: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
) {
  const fetchMock = vi.fn(implementation);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  trackEventMock.mockReset();
  authState.user = null;
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("FavoritesProvider", () => {
  it("isolates anonymous, account A, and account B in one mounted provider", async () => {
    const accountARead = deferred<Response>();
    const accountBRead = deferred<Response>();
    const accountAWrite = deferred<Response>();
    let getCount = 0;
    const fetchMock = installFetch((input, init) => {
      const method = init?.method ?? "GET";
      if (method === "GET" && String(input) === "/api/favorites") {
        getCount += 1;
        return getCount === 1 ? accountARead.promise : accountBRead.promise;
      }
      if (method === "POST") return accountAWrite.promise;
      throw new Error(`Unexpected request: ${method} ${String(input)}`);
    });

    const view = render(tree());
    fireEvent.click(screen.getByRole("button", { name: "Seed anonymous favorite" }));
    expect(screen.getByTestId("favorites").textContent).toBe("editorial");
    expect(fetchMock).not.toHaveBeenCalled();

    authState.user = { id: "account-a" };
    view.rerender(tree());
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId("favorites").textContent).toBe("");
    expect(
      new Headers(fetchMock.mock.calls[0][1]?.headers).get("X-StyleKit-Expected-User"),
    ).toBe("account-a");

    fireEvent.click(screen.getByRole("button", { name: "Add to favorites" }));
    await waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === "POST")).toBe(true));
    expect(screen.getByTestId("favorites").textContent).toBe("glassmorphism");

    authState.user = { id: "account-b" };
    view.rerender(tree());
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    expect(
      new Headers(fetchMock.mock.calls[2][1]?.headers).get("X-StyleKit-Expected-User"),
    ).toBe("account-b");

    await act(async () => accountBRead.resolve(jsonResponse({ success: true, favorites: ["neo-brutalist"] })));
    await waitFor(() => expect(screen.getByTestId("favorites").textContent).toBe("neo-brutalist"));

    await act(async () => accountARead.resolve(jsonResponse({ success: true, favorites: ["editorial"] })));
    await act(async () => accountAWrite.resolve(jsonResponse({ success: true })));
    expect(screen.getByTestId("favorites").textContent).toBe("neo-brutalist");
    expect(trackEventMock.mock.calls).toEqual([
      ["style_favorite", { slug: "editorial", action: "add", storage: "local" }],
    ]);
  });

  it("serializes rapid toggles of one slug and keeps the last requested value", async () => {
    const post = deferred<Response>();
    const fetchMock = installFetch((input, init) => {
      const method = init?.method ?? "GET";
      if (method === "GET") return Promise.resolve(jsonResponse({ success: true, favorites: [] }));
      if (method === "POST") return post.promise;
      if (method === "DELETE") return Promise.resolve(jsonResponse({ success: true }));
      throw new Error(`Unexpected method: ${method}`);
    });

    authState.user = { id: "account-a" };
    render(tree());
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole("button", { name: "Add to favorites" }));
    await waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === "POST")).toBe(true));
    fireEvent.click(screen.getByRole("button", { name: "Remove from favorites" }));
    expect(fetchMock.mock.calls.some(([, init]) => init?.method === "DELETE")).toBe(false);
    expect(screen.getByTestId("favorites").textContent).toBe("");

    expect(trackEventMock).not.toHaveBeenCalled();

    await act(async () => post.resolve(jsonResponse({ success: true })));
    await waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === "DELETE")).toBe(true));
    await waitFor(() => expect(screen.getByTestId("mutation-status").textContent).toBe("false:false"));
    expect(screen.getByTestId("favorites").textContent).toBe("");
    expect(trackEventMock.mock.calls).toEqual([
      ["style_favorite", { slug: "glassmorphism", action: "add", storage: "account" }],
      ["style_favorite", { slug: "glassmorphism", action: "remove", storage: "account" }],
    ]);
  });

  it("does not let an older initial GET erase a favorite confirmed by a later write", async () => {
    const staleRead = deferred<Response>();
    const fetchMock = installFetch((input, init) => {
      if (init?.method === "POST") return Promise.resolve(jsonResponse({ success: true }));
      if (!init?.method || init.method === "GET") return staleRead.promise;
      throw new Error("Unexpected request");
    });

    authState.user = { id: "account-a" };
    render(tree());
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Add to favorites" }));
    await waitFor(() => expect(screen.getByTestId("favorites").textContent).toBe("glassmorphism"));
    await waitFor(() => expect(fetchMock.mock.calls.some(([, init]) => init?.method === "POST")).toBe(true));

    await act(async () => staleRead.resolve(jsonResponse({ success: true, favorites: [] })));
    expect(screen.getByTestId("favorites").textContent).toBe("glassmorphism");
  });

  it("rolls back a failed write and retries the exact desired value", async () => {
    let postCount = 0;
    let getCount = 0;
    const fetchMock = installFetch((input, init) => {
      const method = init?.method ?? "GET";
      if (method === "GET") {
        getCount += 1;
        return Promise.resolve(jsonResponse({ success: true, favorites: [] }));
      }
      if (method === "POST") {
        postCount += 1;
        return Promise.resolve(
          postCount === 1
            ? jsonResponse({ success: false }, 500)
            : jsonResponse({ success: true }),
        );
      }
      throw new Error(`Unexpected request: ${String(input)}`);
    });

    authState.user = { id: "account-a" };
    render(tree());
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Add to favorites" }));
    await waitFor(() => expect(screen.getByTestId("mutation-status").textContent).toBe("false:true"));
    expect(screen.getByTestId("favorites").textContent).toBe("");
    expect(screen.getByRole("button", { name: "error.retry" })).toBeTruthy();
    expect(getCount).toBe(2);
    expect(trackEventMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "error.retry" }));
    await waitFor(() => expect(screen.getByTestId("favorites").textContent).toBe("glassmorphism"));
    await waitFor(() => expect(screen.getByTestId("mutation-status").textContent).toBe("false:false"));
    expect(postCount).toBe(2);
    expect(trackEventMock).toHaveBeenCalledTimes(1);
    expect(trackEventMock).toHaveBeenCalledWith("style_favorite", {
      slug: "glassmorphism", action: "add", storage: "account",
    });
  });

  it("keeps anonymous intent in memory when localStorage fails and can retry persistence", async () => {
    const fetchMock = installFetch(async () => {
      throw new Error("Anonymous favorites must not use the API");
    });
    const storageWrite = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage is unavailable");
    });

    render(tree());
    fireEvent.click(screen.getByRole("button", { name: "Add to favorites" }));
    expect(screen.getByTestId("favorites").textContent).toBe("glassmorphism");
    expect(screen.getByTestId("mutation-status").textContent).toBe("false:true");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(trackEventMock).not.toHaveBeenCalled();

    storageWrite.mockRestore();
    fireEvent.click(screen.getByRole("button", { name: "error.retry" }));
    await waitFor(() => expect(screen.getByTestId("mutation-status").textContent).toBe("false:false"));
    expect(screen.getByTestId("favorites").textContent).toBe("glassmorphism");
    expect(trackEventMock).toHaveBeenCalledTimes(1);
    expect(trackEventMock).toHaveBeenCalledWith("style_favorite", {
      slug: "glassmorphism", action: "add", storage: "local",
    });
  });

  it("does not count restored or repeated local favorite state as an action", () => {
    render(tree());
    fireEvent.click(screen.getByRole("button", { name: "Seed anonymous favorite" }));
    fireEvent.click(screen.getByRole("button", { name: "Seed anonymous favorite" }));
    expect(trackEventMock).toHaveBeenCalledTimes(1);
    cleanup();
    trackEventMock.mockClear();
    render(tree());
    expect(screen.getByTestId("favorites").textContent).toBe("editorial");
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("does not infer a successful action from reconciliation after a failed request", async () => {
    let reads = 0;
    const fetchMock = installFetch(async (_input, init) => {
      if (init?.method === "POST") return jsonResponse({ success: false }, 503);
      reads += 1;
      return jsonResponse({ success: true, favorites: reads === 1 ? [] : ["glassmorphism"] });
    });
    authState.user = { id: "account-a" };
    render(tree());
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Add to favorites" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(screen.getByTestId("mutation-status").textContent).toBe("false:false"));
    expect(screen.getByTestId("favorites").textContent).toBe("glassmorphism");
    expect(trackEventMock).not.toHaveBeenCalled();
  });

});
