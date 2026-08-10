import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createOtpChallenge, normalizeEmail, setOtpCookie } from "@/lib/auth/email-otp";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

export const runtime = "nodejs";

const emailSchema = z.object({
  email: z.string().trim().email().max(320),
});

function getSmtpConfig() {
  const host = process.env.AUTH_SMTP_HOST || process.env.FEEDBACK_SMTP_HOST;
  const port = process.env.AUTH_SMTP_PORT || process.env.FEEDBACK_SMTP_PORT;
  const user = process.env.AUTH_SMTP_USER || process.env.FEEDBACK_SMTP_USER;
  const pass = process.env.AUTH_SMTP_PASS || process.env.FEEDBACK_SMTP_PASS;
  const from = process.env.AUTH_SMTP_FROM || user;

  if (!host || !port || !user || !pass || !from) return null;
  return { host, port: Number(port), user, pass, from };
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit({
    namespace: "email-otp-send",
    key: getRequestClientKey(request),
    limit: 3,
    windowMs: 15 * 60 * 1000,
  });
  const headers = createRateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Try again later." },
      { status: 429, headers },
    );
  }

  try {
    const parsed = emailSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400, headers },
      );
    }

    const email = normalizeEmail(parsed.data.email);
    const emailRateLimit = checkRateLimit({
      namespace: "email-otp-send-email",
      key: email,
      limit: 3,
      windowMs: 15 * 60 * 1000,
    });
    if (!emailRateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429, headers: createRateLimitHeaders(emailRateLimit) },
      );
    }

    const smtp = getSmtpConfig();
    if (!smtp) {
      return NextResponse.json(
        { success: false, error: "Email sign-in is not configured" },
        { status: 503, headers },
      );
    }

    const { code, cookieValue } = createOtpChallenge(email);
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transporter.sendMail({
      from: `"StyleKit" <${smtp.from}>`,
      to: email,
      subject: "StyleKit verification code",
      text: `Your StyleKit verification code is ${code}. It expires in 10 minutes. If you did not request this code, you can ignore this email.`,
    });

    const response = NextResponse.json({ success: true }, { headers });
    setOtpCookie(response, cookieValue);
    return response;
  } catch (error) {
    console.error(
      "[Email OTP] Send failed:",
      error instanceof Error ? error.message : String(error),
    );
    return NextResponse.json(
      { success: false, error: "Failed to send verification code" },
      { status: 500, headers },
    );
  }
}
