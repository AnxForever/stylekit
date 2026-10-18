/**
 * The app's provider stack, reconstructed for video.
 *
 * Real feature pages (prompts, developers, templates...) mount the site's own
 * layout and hooks, which expect these providers. Reproducing the stack here
 * means the film can render any page without forking app code.
 *
 * Order matters and matches the site: locale -> session -> saved kit.
 */
import React from "react";
import { I18nProvider } from "../../../../lib/i18n/context";
import { AuthProvider } from "../../../../lib/auth/use-user";
import { KitProvider } from "../../../../lib/kit/context";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nProvider initialLocale="zh">
    <AuthProvider>
      <KitProvider>{children}</KitProvider>
    </AuthProvider>
  </I18nProvider>
);
