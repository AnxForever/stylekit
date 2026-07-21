import { NextRequest, NextResponse } from "next/server";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import {
  getExperimentLifecycle,
  resolveValidationRequestContext,
  VALIDATION_COOKIE_MAX_AGE_SECONDS,
  VALIDATION_COOKIE_NAME,
  validationSessionRequestSchema,
} from "@/lib/product-validation/server";

const MAX_BODY_BYTES = 8 * 1024;

export async function POST(request: NextRequest) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) {
    return NextResponse.json(
      { success: false, error: origin.error },
      { status: origin.status ?? 403 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "product-validation-session",
    key: getRequestClientKey(request),
    limit: 30,
    windowMs: 10 * 60 * 1000,
  });
  const headers = createRateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "请求过于频繁，请稍后再试。" },
      { status: 429, headers },
    );
  }

  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Validation payload too large",
    invalidJsonMessage: "Invalid validation payload",
  });
  if (!body.ok) {
    return NextResponse.json(
      { success: false, error: body.error },
      { status: body.status, headers },
    );
  }

  const parsed = validationSessionRequestSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "实验会话参数无效。" },
      { status: 400, headers },
    );
  }

  try {
    const context = await resolveValidationRequestContext(
      request,
      parsed.data.sourceChannel,
    );
    const lifecycle = getExperimentLifecycle();

    const response = NextResponse.json(
      {
        success: true,
        lifecycle,
        authenticated: Boolean(context.user),
        context: context.publicContext,
      },
      { headers },
    );
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    if (context.shouldSetCookie) {
      response.cookies.set(VALIDATION_COOKIE_NAME, context.cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: VALIDATION_COOKIE_MAX_AGE_SECONDS,
      });
    }
    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "价格实验会话暂不可用。" },
      { status: 503, headers },
    );
  }
}
