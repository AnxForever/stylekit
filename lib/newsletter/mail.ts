import { getSiteBaseUrl } from "@/lib/site-url";
import { buildUnsubscribeUrl, type NewsletterLocale } from "@/lib/newsletter/token";

/**
 * Welcome mail for a new newsletter subscriber.
 *
 * Delivery is best-effort: the address is already stored when this runs, and a
 * mail failure must not make the footer report that subscribing failed. Every
 * message carries the one-click unsubscribe link so the stored list stays
 * honest.
 */

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
}

function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.NEWSLETTER_SMTP_HOST || process.env.FEEDBACK_SMTP_HOST;
  const port = process.env.NEWSLETTER_SMTP_PORT || process.env.FEEDBACK_SMTP_PORT;
  const user = process.env.NEWSLETTER_SMTP_USER || process.env.FEEDBACK_SMTP_USER;
  const pass = process.env.NEWSLETTER_SMTP_PASS || process.env.FEEDBACK_SMTP_PASS;
  const from = process.env.NEWSLETTER_SMTP_FROM || process.env.AUTH_SMTP_FROM || user;

  if (!host || !port || !user || !pass || !from) return null;
  return { host, port: Number(port), user, pass, from };
}

function buildWelcomeMail(locale: NewsletterLocale, unsubscribeUrl: string) {
  if (locale === "en") {
    return {
      subject: "You are subscribed to StyleKit updates",
      text: [
        "Hi,",
        "",
        "Thanks for subscribing to StyleKit. When new styles, templates, or tools ship, I will send a short digest to this address. No daily mail, no tracking pixels.",
        "",
        `Unsubscribe at any time: ${unsubscribeUrl}`,
        "",
        "StyleKit",
        "https://www.stylekit.top",
      ].join("\n"),
    };
  }

  return {
    subject: "已订阅 StyleKit 更新",
    text: [
      "你好，",
      "",
      "谢谢你订阅 StyleKit。以后有新风格、模板或工具上线时，我会把简短的更新摘要发到这个邮箱，频率不高，也不会有追踪像素。",
      "",
      `随时可以退订：${unsubscribeUrl}`,
      "",
      "StyleKit",
      "https://www.stylekit.top",
    ].join("\n"),
  };
}

/** Returns true only when the SMTP server accepted the message. */
export async function sendNewsletterWelcome(
  email: string,
  locale: NewsletterLocale = "zh",
): Promise<boolean> {
  const smtp = getSmtpConfig();
  if (!smtp) return false;

  const unsubscribeUrl = buildUnsubscribeUrl(email, locale, getSiteBaseUrl());
  if (!unsubscribeUrl) return false;

  const mail = buildWelcomeMail(locale, unsubscribeUrl);

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transporter.sendMail({
      from: `"StyleKit" <${smtp.from}>`,
      to: email,
      subject: mail.subject,
      text: mail.text,
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    return true;
  } catch (error) {
    console.error(
      "[Newsletter] Welcome mail failed:",
      error instanceof Error ? error.message : String(error),
    );
    return false;
  }
}
