/// <reference lib="webworker" />

// Keep a minimal service worker so the site remains installable as a PWA.
// Network traffic is intentionally left to the browser and Next.js: caching
// build-scoped HTML, JS, or CSS here can mix assets from different releases.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("stylekit-"))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
