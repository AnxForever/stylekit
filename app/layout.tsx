import type { Metadata } from "next";
import { ClientProviders } from "@/components/providers/client-providers";
import { LazyCommandPalette } from "@/components/ui/lazy-command-palette";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "StyleKit — 设计风格集合",
    template: "%s — StyleKit",
  },
  description: "精选优质 Web 设计风格，提供文档、组件模板、代码片段，以及可直接导出的 AI Rules。让 AI 生成的网站更加美观。",
  keywords: ["设计系统", "Web 设计", "CSS", "Tailwind", "UI 组件", "Neo-Brutalist", "设计风格"],
  authors: [{ name: "StyleKit" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "StyleKit",
    title: "StyleKit — 设计风格集合",
    description: "精选优质 Web 设计风格，提供文档、组件模板、代码片段，以及可直接导出的 AI Rules。",
  },
  twitter: {
    card: "summary_large_image",
    title: "StyleKit — 设计风格集合",
    description: "精选优质 Web 设计风格，提供文档、组件模板、代码片段，以及可直接导出的 AI Rules。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <ClientProviders>
          <LazyCommandPalette />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
