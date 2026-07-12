import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

type FetchEventLike = {
  request: Request;
  respondWith: ReturnType<typeof vi.fn>;
};

async function loadFetchHandler() {
  const source = await readFile(new URL("../../public/sw.js", import.meta.url), "utf8");
  let fetchHandler: ((event: FetchEventLike) => void) | undefined;

  const cache = {
    addAll: vi.fn().mockResolvedValue(undefined),
    put: vi.fn().mockResolvedValue(undefined),
  };
  const caches = {
    open: vi.fn().mockResolvedValue(cache),
    keys: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(true),
    match: vi.fn().mockResolvedValue(undefined),
  };

  runInNewContext(source, {
    URL,
    Request,
    Response,
    Promise,
    fetch: vi.fn().mockResolvedValue(new Response("ok", { status: 200 })),
    caches,
    self: {
      addEventListener(type: string, handler: (event: FetchEventLike) => void) {
        if (type === "fetch") fetchHandler = handler;
      },
      skipWaiting: vi.fn(),
      clients: { claim: vi.fn() },
    },
  });

  if (!fetchHandler) throw new Error("Service worker fetch handler was not registered");
  return fetchHandler;
}

describe("service worker request policy", () => {
  it("bypasses Next.js RSC navigation requests", async () => {
    const fetchHandler = await loadFetchHandler();
    const respondWith = vi.fn();

    fetchHandler({
      request: new Request("https://www.stylekit.top/zh/profile?_rsc=route", {
        headers: { RSC: "1" },
      }),
      respondWith,
    });

    expect(respondWith).not.toHaveBeenCalled();
  });

  it("continues handling static assets", async () => {
    const fetchHandler = await loadFetchHandler();
    const respondWith = vi.fn();

    fetchHandler({
      request: new Request("https://www.stylekit.top/_next/static/chunks/app.js"),
      respondWith,
    });

    expect(respondWith).toHaveBeenCalledTimes(1);
  });
});
