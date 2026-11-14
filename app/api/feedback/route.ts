import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

// nodemailer needs Node APIs (net/tls), so this route must run on the Node
// runtime, not the edge.
export const runtime = "nodejs";

const feedbackSchema = z.object({
  message: z.string().trim().min(1).max(5000),
  // Optional reply-to address. Either a valid email or an empty string.
  email: z.string().email().optional().or(z.literal("")),
  // Free-form contact a supporter leaves behind so they can be answered
  // somewhere other than the site. It may be an email address or a WeChat
  // handle, so it is not validated as an address; an email is also used as the
  // reply-to header below.
  contact: z.string().trim().max(200).optional(),
  // Honeypot — real users never see or fill this.
  website: z.string().optional(),
  topic: z.enum(["feedback", "supporter"]).optional(),
});

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit({
      namespace: "feedback",
      key: getRequestClientKey(request),
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429, headers: createRateLimitHeaders(rateLimit) }
      );
    }

    const body = await request.json();
    const parsed = feedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid feedback" },
        { status: 400, headers: createRateLimitHeaders(rateLimit) }
      );
    }

    const { message, email, contact, website, topic } = parsed.data;

    // Honeypot hit → almost certainly a bot. Pretend success, send nothing.
    if (website) {
      return NextResponse.json(
        { success: true },
        { headers: createRateLimitHeaders(rateLimit) }
      );
    }

    const supporterContact = contact?.trim() ?? "";
    // A supporter may leave only a WeChat handle, so the reply-to header is set
    // only when what they left is actually an address.
    const replyTo =
      email ||
      (supporterContact && z.string().email().safeParse(supporterContact).success
        ? supporterContact
        : undefined);

    const host = process.env.FEEDBACK_SMTP_HOST;
    const port = process.env.FEEDBACK_SMTP_PORT;
    const user = process.env.FEEDBACK_SMTP_USER;
    const pass = process.env.FEEDBACK_SMTP_PASS;
    const to = process.env.FEEDBACK_TO;

    if (!host || !port || !user || !pass || !to) {
      return NextResponse.json(
        { success: false, error: "Feedback service not configured" },
        { status: 503, headers: createRateLimitHeaders(rateLimit) }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: port === "465",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"StyleKit Feedback" <${user}>`,
      to,
      replyTo,
      subject:
        topic === "supporter"
          ? "StyleKit 支持者留言 / Supporter note"
          : "StyleKit 反馈 / Feedback",
      text: `${message}\n\n---\nFrom: ${supporterContact || email || "anonymous"}`,
    });

    return NextResponse.json(
      { success: true },
      { headers: createRateLimitHeaders(rateLimit) }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send feedback" },
      { status: 500 }
    );
  }
}
