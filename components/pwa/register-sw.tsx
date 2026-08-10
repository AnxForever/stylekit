"use client";

import { useEffect } from "react";

/**
 * Registers the production service worker without showing an install prompt.
 * The site should keep its offline/PWA capabilities, while installation stays
 * an explicit browser action instead of a persistent floating control.
 */
export function RegisterSW() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const registerServiceWorker = () => {
      if (process.env.NODE_ENV !== "production") {
        navigator.serviceWorker
          .getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => {
              void registration.unregister();
            });
          })
          .catch(() => {
            // ignore dev cleanup failure
          });

        if ("caches" in window) {
          void caches
            .keys()
            .then((keys) =>
              Promise.all(
                keys
                  .filter((key) => key.startsWith("stylekit-"))
                  .map((key) => caches.delete(key)),
              ),
            )
            .catch(() => {
              // ignore dev cleanup failure
            });
        }
      } else {
        navigator.serviceWorker
          .register("/sw.js", { updateViaCache: "none" })
          .catch(() => {
            // SW registration failure is non-fatal
          });
      }
    };

    let idleId: number | null = null;
    let timeoutId: number | null = null;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(registerServiceWorker, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(registerServiceWorker, 1000);
    }

    return () => {
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
