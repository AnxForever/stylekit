import { NextResponse } from "next/server";
import { readUnsubscribeToken, type NewsletterLocale } from "@/lib/newsletter/token";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  checkRateLimit,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

/**
 * Unsubscribe landing for links in newsletter mail.
 *
 * GET only renders a confirmation page: inbox providers and link scanners
 * fetch every href in a message, and deleting on that fetch would silently
 * drop subscribers who never clicked anything. The form on that page, and the
 * RFC 8058 one-click POST advertised in the mail headers, both go to POST,
 * which performs the delete. Removing the row is idempotent.
 */

export const runtime = "nodejs";

const COPY = {
  zh: {
    label: "订阅",
    confirmTitle: "确认退订？",
    confirmBody: (email: string) =>
      `退订后，${email} 将不再收到 StyleKit 的更新邮件。`,
    confirmButton: "确认退订",
    successTitle: "已取消订阅",
    successBody: (email: string) =>
      `${email} 不会再收到 StyleKit 的更新邮件。如果这是误操作，回到站点页脚重新订阅即可。`,
    invalidTitle: "链接无效",
    invalidBody: "这个退订链接不完整或已经失效。你可以在最新一封邮件底部找到可用的链接。",
    errorTitle: "暂时无法处理",
    errorBody: "服务暂时不可用，请稍后再点一次这个链接。",
    back: "返回 StyleKit",
  },
  en: {
    label: "Newsletter",
    confirmTitle: "Unsubscribe?",
    confirmBody: (email: string) => `${email} will stop receiving StyleKit update emails.`,
    confirmButton: "Confirm unsubscribe",
    successTitle: "Unsubscribed",
    successBody: (email: string) =>
      `${email} will no longer receive StyleKit update emails. If this was a mistake, subscribe again from the footer.`,
    invalidTitle: "Invalid link",
    invalidBody: "This unsubscribe link is incomplete or no longer valid. Use the link at the bottom of the latest email.",
    errorTitle: "Could not process this",
    errorBody: "The service is temporarily unavailable. Try the link again in a moment.",
    back: "Back to StyleKit",
  },
} as const;

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  const visible = local.slice(0, 1);
  return `${visible}${"*".repeat(Math.min(Math.max(local.length - 1, 1), 4))}@${domain}`;
}

function renderPage(input: {
  status: number;
  locale: NewsletterLocale;
  title: string;
  body: string;
  accent?: boolean;
  action?: { label: string; token: string };
}): NextResponse {
  const { status, locale, title, body, accent, action } = input;
  const copy = COPY[locale];
  const actionHtml = action
    ? `<form method="post" action="/api/newsletter/unsubscribe?token=${encodeURIComponent(action.token)}" style="margin:0;padding:0;">
      <button type="submit" style="display:inline-block;border:1px solid #fafafa;background:#fafafa;color:#09090b;padding:10px 18px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;">${action.label}</button>
    </form>`
    : "";
  const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title} — StyleKit</title>
</head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#09090b;color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;padding:24px;">
  <main style="width:100%;max-width:32rem;border:1px solid #27272a;padding:40px 32px;">
    <p style="margin:0 0 20px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#71717a;">${copy.label}</p>
    <h1 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.15;font-weight:400;color:${accent ? "#ff6b6b" : "#fafafa"};">${title}</h1>
    <p style="margin:0;font-size:14px;line-height:1.75;color:#a1a1aa;">${body}</p>
    <div style="margin:32px 0 0;display:flex;flex-wrap:wrap;align-items:center;gap:12px;">
      ${actionHtml}
      <a href="https://www.stylekit.top/${locale}" style="display:inline-block;border:1px solid #3f3f46;padding:10px 16px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#fafafa;text-decoration:none;">${copy.back}</a>
    </div>
  </main>
</body>
</html>`;

  return new NextResponse(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

function readToken(request: Request): string | null {
  return new URL(request.url).searchParams.get("token");
}

export async function GET(request: Request) {
  const payload = readUnsubscribeToken(readToken(request));
  if (!payload) {
    return renderPage({
      status: 400,
      locale: "zh",
      accent: true,
      title: COPY.zh.invalidTitle,
      body: COPY.zh.invalidBody,
    });
  }

  const copy = COPY[payload.locale];
  return renderPage({
    status: 200,
    locale: payload.locale,
    title: copy.confirmTitle,
    body: copy.confirmBody(maskEmail(payload.email)),
    action: { label: copy.confirmButton, token: readToken(request) ?? "" },
  });
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit({
    namespace: "newsletter-unsubscribe",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 60 * 60 * 1000,
  });

  const token = readToken(request);
  const payload = readUnsubscribeToken(token);

  if (!payload) {
    return renderPage({
      status: 400,
      locale: "zh",
      accent: true,
      title: COPY.zh.invalidTitle,
      body: COPY.zh.invalidBody,
    });
  }

  const copy = COPY[payload.locale];

  if (!rateLimit.allowed) {
    return renderPage({
      status: 429,
      locale: payload.locale,
      accent: true,
      title: copy.errorTitle,
      body: copy.errorBody,
    });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return renderPage({
      status: 503,
      locale: payload.locale,
      accent: true,
      title: copy.errorTitle,
      body: copy.errorBody,
    });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("email", payload.email);

  if (error) {
    return renderPage({
      status: 500,
      locale: payload.locale,
      accent: true,
      title: copy.errorTitle,
      body: copy.errorBody,
    });
  }

  return renderPage({
    status: 200,
    locale: payload.locale,
    title: copy.successTitle,
    body: copy.successBody(maskEmail(payload.email)),
  });
}
