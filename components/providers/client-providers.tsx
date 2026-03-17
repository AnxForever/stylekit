"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { HtmlLangUpdater } from "@/components/i18n/html-lang-updater";
import { FavoritesProvider } from "@/lib/favorites/context";
import { PageTransition } from "@/components/page-transition";
import { SWRProvider } from "@/lib/swr/provider";
import { UtmProvider } from "@/components/analytics/utm-provider";

interface ClientProvidersProps {
  children: React.ReactNode;
}

/**
 * 客户端 Provider 容器
 * 将所有需要客户端渲染的 Context Provider 集中管理
 * 这样可以让 RootLayout 的其他部分保持为 Server Component
 */
export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider>
        <HtmlLangUpdater />
        <SWRProvider>
          <FavoritesProvider>
            <UtmProvider>
              <PageTransition>
                {children}
              </PageTransition>
            </UtmProvider>
          </FavoritesProvider>
        </SWRProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
