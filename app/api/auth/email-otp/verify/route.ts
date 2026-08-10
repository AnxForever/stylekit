import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  clearOtpCookie,
  EMAIL_OTP_COOKIE,
  normalizeEmail,
  setOtpCookie,
  verifyOtpChallenge,
} from "@/lib/auth/email-otp";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

export const runtime = "nodejs";

const verifySchema = z.object({
  email: z.string().trim().email().max(320),
  code: z.string().regex(/^\d{6}$/),
});

const EXTERNAL_AUTH_PROVIDERS = new Set(["google", "github", "linuxdo", "nodeloc"]);

export async function POST(request: Request) {
  const rateLimit = checkRateLimit({
    namespace: "email-otp-verify",
    key: getRequestClientKey(request),
    limit: 10,
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
    const parsed = verifySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid verification code" },
        { status: 400, headers },
      );
    }

    const email = normalizeEmail(parsed.data.email);
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(EMAIL_OTP_COOKIE)?.value;
    const verification = verifyOtpChallenge(cookieValue, email, parsed.data.code);

    if (!verification.valid) {
      const response = NextResponse.json(
        {
          success: false,
          error:
            verification.reason === "expired" || verification.reason === "attempts"
              ? "Verification code expired. Request a new code."
              : "Invalid verification code",
        },
        { status: 400, headers },
      );
      if (verification.retryCookieValue) {
        setOtpCookie(response, verification.retryCookieValue);
      }
      return response;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      return NextResponse.json(
        { success: false, error: "Auth service is not configured" },
        { status: 503, headers },
      );
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const userMetadata = { provider: "email", email_verified: true };
    const { data: createData, error: createError } =
      await adminClient.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: userMetadata,
      });

    let userId = createData?.user?.id;
    let metadata: Record<string, unknown> = { ...userMetadata };
    if (createError) {
      const { data: listData, error: listError } =
        await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = listData?.users?.find(
        (user) => typeof user.email === "string" && normalizeEmail(user.email) === email,
      );
      if (listError || !existing) {
        throw new Error(listError?.message ?? createError.message);
      }
      userId = existing.id;
      const existingProvider =
        typeof existing.user_metadata?.provider === "string"
          ? existing.user_metadata.provider
          : typeof existing.app_metadata?.provider === "string"
            ? existing.app_metadata.provider
            : null;
      metadata = {
        ...(existing.user_metadata ?? {}),
        ...userMetadata,
        provider:
          existingProvider && EXTERNAL_AUTH_PROVIDERS.has(existingProvider)
            ? existingProvider
            : userMetadata.provider,
      };
      const { error: updateError } = await adminClient.auth.admin.updateUserById(
        existing.id,
        { user_metadata: metadata },
      );
      if (updateError) throw updateError;
    }

    if (userId && metadata.seq_id === undefined) {
      try {
        const seqId = await getOrAssignSeqId(userId);
        metadata = { ...metadata, seq_id: seqId };
        await adminClient.auth.admin.updateUserById(userId, {
          user_metadata: metadata,
        });
      } catch {
        // A missing sequence ID must not prevent a valid email login.
      }
    }

    const { data: linkData, error: linkError } =
      await adminClient.auth.admin.generateLink({
        type: "magiclink",
        email,
      });
    if (linkError || !linkData.properties?.hashed_token) {
      throw new Error(linkError?.message ?? "Failed to create auth session");
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    });
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type: "magiclink",
      token_hash: linkData.properties.hashed_token,
    });
    if (verifyError) throw verifyError;

    const response = NextResponse.json({ success: true }, { headers });
    clearOtpCookie(response);
    return response;
  } catch (error) {
    console.error(
      "[Email OTP] Verify failed:",
      error instanceof Error ? error.message : String(error),
    );
    return NextResponse.json(
      { success: false, error: "Could not verify email code" },
      { status: 500, headers },
    );
  }
}
