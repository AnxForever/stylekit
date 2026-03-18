"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";

export function TemplateViewTracker() {
  const pathname = usePathname();
  const lastTrackedSlug = useRef<string | null>(null);

  useEffect(() => {
    const match = pathname.match(/^\/templates\/([^/]+)$/);
    if (!match) return;

    const slug = match[1];
    if (lastTrackedSlug.current === slug) return;

    lastTrackedSlug.current = slug;
    trackEvent("template_view", { slug, source: "page" });
  }, [pathname]);

  return null;
}
