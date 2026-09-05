/**
 * Review-decision notifications for contributors.
 *
 * A submission used to end in silence: the contributor had to come back and
 * check their profile to learn whether their work was approved. That asks
 * someone who just gave you a style to keep chasing you for an answer.
 *
 * Delivery is best-effort by design — a mail failure must never roll back a
 * review the maintainer already made — so every function here resolves to a
 * boolean instead of throwing.
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";

type Decision = "approved" | "rejected";

interface MailContent {
  subject: string;
  text: string;
}

function buildMail(
  decision: Decision,
  styleName: string,
  slug: string,
  note: string | null,
  baseUrl: string,
): MailContent {
  if (decision === "approved") {
    return {
      subject: `Your style "${styleName}" is live on StyleKit`,
      text: [
        `Your submission "${styleName}" passed review and is now in the community catalog.`,
        ``,
        `View it: ${baseUrl}/community/${slug}`,
        ``,
        note ? `Note from the reviewer: ${note}` : null,
        `Styles that prove useful get promoted into the curated library, which also makes them visible to search engines.`,
        ``,
        `Thanks for contributing.`,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    };
  }

  return {
    subject: `Your style "${styleName}" needs changes`,
    text: [
      `Your submission "${styleName}" was not accepted in its current form.`,
      ``,
      note ? `Reason: ${note}` : `No specific reason was recorded.`,
      ``,
      `You can revise and submit again: ${baseUrl}/submit`,
    ].join("\n"),
  };
}

/** Look up the contributor's email. Returns null when the row has no account. */
async function findContributorEmail(userId: string): Promise<string | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  try {
    const { data, error } = await sb.auth.admin.getUserById(userId);
    if (error) return null;
    const email = data?.user?.email;
    return typeof email === "string" && email.includes("@") ? email : null;
  } catch {
    return null;
  }
}

export async function notifySubmissionDecision(input: {
  userId?: string | null;
  slug: string;
  styleName: string;
  decision: Decision;
  note?: string | null;
}): Promise<boolean> {
  const host = process.env.FEEDBACK_SMTP_HOST;
  const port = process.env.FEEDBACK_SMTP_PORT;
  const user = process.env.FEEDBACK_SMTP_USER;
  const pass = process.env.FEEDBACK_SMTP_PASS;
  if (!host || !port || !user || !pass || !input.userId) {
    return false;
  }

  const email = await findContributorEmail(input.userId);
  if (!email) return false;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.stylekit.top";
  const mail = buildMail(
    input.decision,
    input.styleName,
    input.slug,
    input.note?.trim() || null,
    baseUrl.replace(/\/$/, ""),
  );

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"StyleKit" <${user}>`,
      to: email,
      subject: mail.subject,
      text: mail.text,
    });
    return true;
  } catch {
    // Swallowed on purpose: the review already happened, and surfacing a mail
    // error would make the maintainer think it did not.
    return false;
  }
}
