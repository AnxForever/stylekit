import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "@/lib/analytics/collection-policy";

/** Public measurement ID supplied for the StyleKit website. */
export const GOOGLE_ANALYTICS_ID = GOOGLE_ANALYTICS_MEASUREMENT_ID;

/**
 * Register a lazy loader on every production document. The shared collection
 * policy decides whether it may run now and re-evaluates it after SPA history
 * changes. This lets an admin-first session begin collecting after it enters
 * a public page, while the supported GA disable flag stops sends before an
 * already-loaded tag observes navigation into an excluded route.
 */
export const GOOGLE_ANALYTICS_BOOTSTRAP_SCRIPT = `
(() => {
  const isExcluded = () => {
    try {
      return typeof window.__stylekitIsAnalyticsExcluded === "function"
        ? window.__stylekitIsAnalyticsExcluded()
        : true;
    } catch {
      return true;
    }
  };

  window.__stylekitEnsureGoogleAnalytics = () => {
    const excluded = isExcluded();
    window["ga-disable-${GOOGLE_ANALYTICS_ID}"] = excluded;
    if (excluded || document.getElementById("google-analytics-tag")) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", "${GOOGLE_ANALYTICS_ID}", {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    const script = document.createElement("script");
    script.id = "google-analytics-tag";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}";
    document.head.appendChild(script);
  };

  window.__stylekitEnsureGoogleAnalytics();
})();
`;

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}
