import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { wizardFormSchema } from "@/lib/submit/validator";
import { convertToStyleTokens, convertToDesignStyle } from "@/lib/submit/converter";
import {
  isSupabaseConfigured,
  createSubmissionSupabase,
} from "@/lib/submit/reviewer-supabase";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;

export async function POST(request: Request) {
  const rateLimit = checkRateLimit({
    namespace: "api:submit",
    key: getRequestClientKey(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions from this client. Please try again later.",
      },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  try {
    const body = await request.json();

    const parsed = wizardFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const tokens = convertToStyleTokens(data);
    const designStyle = convertToDesignStyle(data);

    // Use Supabase when configured, otherwise fall back to file system
    if (isSupabaseConfigured()) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;
      const user = await getServerUser();
      const userId = user?.id ?? null;
      const authorName = user
        ? (user.user_metadata?.user_name ?? user.user_metadata?.full_name ?? null)
        : null;
      const result = await createSubmissionSupabase(
        data.slug,
        data as unknown as Record<string, unknown>,
        tokens as unknown as Record<string, unknown>,
        designStyle as unknown as Record<string, unknown>,
        ip,
        userId,
        authorName
      );
      return NextResponse.json({
        success: true,
        id: result.id,
        slug: result.slug,
      });
    }

    // File-based fallback
    const timestamp = Date.now();
    const id = `${timestamp}-${data.slug}`;

    const submission = {
      id,
      slug: data.slug,
      submittedAt: new Date(timestamp).toISOString(),
      status: "pending" as const,
      formData: data,
      tokens,
      designStyle,
    };

    if (!existsSync(SUBMISSIONS_DIR)) {
      await mkdir(SUBMISSIONS_DIR, { recursive: true });
    }

    const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
    await writeFile(filePath, JSON.stringify(submission, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      id,
      slug: data.slug,
    });
  } catch (error) {
    const message = error instanceof SyntaxError
      ? "Invalid JSON body"
      : "Internal server error";

    return NextResponse.json(
      { success: false, error: message },
      { status: error instanceof SyntaxError ? 400 : 500 }
    );
  }
}
