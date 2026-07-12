/// <reference lib="webworker" />

const CACHE_NAME = "stylekit-v2";
const STATIC_ASSETS = ["/", "/icon.svg", "/manifest.json"];

// Install: cache static shell
self.addEventListener("install", (event) => {
  const e = event;
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  const e = event;
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for pages, cache-first for assets
self.addEventListener("fetch", (event) => {
  const e = event;
  const { request } = e;
  const url = new URL(request.url);

  // Let Next.js own React Server Component navigation and prefetch traffic.
  // Intercepting these short-lived requests adds service-worker overhead and
  // can mix route payloads from different builds without improving offline UX.
  const isNextDataRequest =
    request.headers.get("RSC") === "1" ||
    request.headers.get("Next-Router-Prefetch") === "1" ||
    url.searchParams.has("_rsc");

  // Skip non-GET, API, and analytics requests
  if (
    request.method !== "GET" ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/webpack") ||
    isNextDataRequest
  ) {
    return;
  }

  // Network-first for static assets (JS, CSS, images, fonts) — 新 build 优先,
  // 避免 SW 缓存旧 CSS/JS 导致看不到更新; 离线时回退缓存。
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.match(/\.(js|css|svg|png|jpg|woff2?)$/)
  ) {
    e.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || new Response("", { status: 504 }))
        )
    );
    return;
  }

  // Network-first for pages (with offline fallback)
  e.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && url.pathname.startsWith("/styles/")) {
          // Cache style pages for offline viewing
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
  );
});
