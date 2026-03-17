import { NextResponse } from "next/server";
import { emailSchema } from "@/lib/newsletter";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(
  process.cwd(),
  "lib/newsletter/subscribers.json"
);

async function readSubscribers(): Promise<string[]> {
  try {
    const data = await fs.readFile(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubscribers(emails: string[]): Promise<void> {
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(emails, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { data: existing } = await supabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("email", normalizedEmail)
        .single();

      if (existing) {
        return NextResponse.json(
          { success: false, error: "Already subscribed" },
          { status: 409 }
        );
      }

      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: normalizedEmail, subscribed_at: new Date().toISOString() });

      if (error) {
        return NextResponse.json(
          { success: false, error: "Failed to subscribe" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: "Subscribed" });
    }

    // Fallback: JSON file storage
    const subscribers = await readSubscribers();

    if (subscribers.includes(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: "Already subscribed" },
        { status: 409 }
      );
    }

    subscribers.push(normalizedEmail);
    await writeSubscribers(subscribers);

    return NextResponse.json({ success: true, message: "Subscribed" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
