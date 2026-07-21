"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getShowcaseTypographyProfile } from "@/lib/typography/showcase-profiles";

const ACTIVE_FONT_PROPERTIES = [
  "--font-display-active",
  "--font-body-active",
  "--font-mono-active",
] as const;

export function ShowcaseTypographyRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const profile = getShowcaseTypographyProfile(pathname);
    if (!profile) return;

    const body = document.body;
    const previousValues = Object.fromEntries(
      ACTIVE_FONT_PROPERTIES.map((property) => [
        property,
        body.style.getPropertyValue(property),
      ])
    );
    const previousProfile = body.dataset.showcaseFont;

    body.dataset.showcaseFont = profile.id;
    body.style.setProperty("--font-display-active", profile.displayStack);
    body.style.setProperty("--font-body-active", profile.bodyStack);
    body.style.setProperty("--font-mono-active", profile.monoStack);

    const existingLink = document.head.querySelector<HTMLLinkElement>(
      `link[data-showcase-font-profile="${profile.id}"]`
    );
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = profile.stylesheetUrl;
      link.dataset.showcaseFontProfile = profile.id;
      document.head.appendChild(link);
    }

    return () => {
      for (const property of ACTIVE_FONT_PROPERTIES) {
        const previousValue = previousValues[property];
        if (previousValue) {
          body.style.setProperty(property, previousValue);
        } else {
          body.style.removeProperty(property);
        }
      }

      if (previousProfile) {
        body.dataset.showcaseFont = previousProfile;
      } else {
        delete body.dataset.showcaseFont;
      }
    };
  }, [pathname]);

  return null;
}
