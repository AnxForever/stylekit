import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { checkRateLimit, createRateLimitHeaders, getRequestClientKey } from "@/lib/security/rate-limit";
import {
  resolveValidationRequestContext,
  validationWithdrawRequestSchema,
  withdrawValidationParticipant,
  VALIDATION_COOKIE_NAME,
} from "@/lib/product-validation/server";

export async function POST(request: NextRequest) {
  if (!request.headers.get("origin") || request.headers.get("x-stylekit-validation-request") !== "withdraw-v1") {
    return NextResponse.json({ success: false, error: "退出请求缺少同源确认。" }, { status: 403 });
  }
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const rateLimit = checkRateLimit({
    namespace: "product-validation-withdraw",
    key: getRequestClientKey(request),
    limit: 4,
    windowMs: 60 * 60 * 1000,
  });
  const headers = createRateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) return NextResponse.json({ success: false, error: "退出请求过于频繁。" }, { status: 429, headers });
  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: 1024,
    tooLargeMessage: "Withdrawal payload too large",
    invalidJsonMessage: "Invalid withdrawal payload",
  });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status, headers });
  if (!validationWithdrawRequestSchema.safeParse(body.data).success) {
    return NextResponse.json({ success: false, error: "请明确确认退出并删除本设备的研究证据。" }, { status: 400, headers });
  }

  try {
    const context = await resolveValidationRequestContext(request);
    const supabase = getSupabaseAdmin();
    if (!supabase) return NextResponse.json({ success: false, error: "价格实验存储尚未配置。" }, { status: 503, headers });
    const withdrawn = await withdrawValidationParticipant(supabase, {
      experimentId: context.experiment.experimentId,
      identityKey: context.identity.identityKey,
    });
    const response = NextResponse.json(
      {
        success: true,
        withdrawn,
        message: withdrawn
          ? "已删除本设备的在线研究事件，并将参与记录标记为退出。"
          : "本设备没有可删除的研究记录。",
      },
      { headers: { ...headers, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } },
    );
    response.cookies.delete(VALIDATION_COOKIE_NAME);
    return response;
  } catch {
    return NextResponse.json({ success: false, error: "退出研究暂时失败，请稍后重试。" }, { status: 503, headers });
  }
}
