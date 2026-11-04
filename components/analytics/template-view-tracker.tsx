"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";
import { getTemplateSlugFromPathname } from "@/lib/templates/route";

export function TemplateViewTracker() {
  const pathname = usePathname();
  const lastTrackedSlug = useRef<string | null>(null);

  useEffect(() => {
    const slug = getTemplateSlugFromPathname(pathname);
    if (!slug) return;
    if (lastTrackedSlug.current === slug) return;

    lastTrackedSlug.current = slug;
    trackEvent("template_view", { slug, source: "page" });
  }, [pathname]);

  return null;
}
