import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found | StyleKit",
};

/** Next adds noindex to this provider-independent unmatched-route document. */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-12">
          <p className="text-sm text-muted">StyleKit · 404</p>
          <h1 className="mt-4 text-3xl font-semibold">This page could not be found.</h1>
          <p lang="zh-CN" className="mt-3 text-base text-muted">页面不存在，或已被移除。</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/en" className="inline-flex min-h-11 items-center rounded-md border border-foreground px-4 text-sm">English home</Link>
            <Link href="/zh" lang="zh-CN" className="inline-flex min-h-11 items-center rounded-md border border-foreground px-4 text-sm">返回中文首页</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
