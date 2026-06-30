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
  // Honeypot — real users never see or fill this.
  website: z.string().optional(),
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

    const { message, email, website } = parsed.data;

    // Honeypot hit → almost certainly a bot. Pretend success, send nothing.
    if (website) {
      return NextResponse.json(
        { success: true },
        { headers: createRateLimitHeaders(rateLimit) }
      );
    }

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
      replyTo: email || undefined,
      subject: "StyleKit 反馈 / Feedback",
      text: `${message}\n\n---\nFrom: ${email || "anonymous"}`,
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
