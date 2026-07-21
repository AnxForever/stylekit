import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import {
  ensureValidationParticipant,
  getExperimentLifecycle,
  isQualifiedIcp,
  readValidationParticipant,
  resolveValidationRequestContext,
  updateValidationQualification,
  validationQualificationRequestSchema,
} from "@/lib/product-validation/server";

export async function POST(request: NextRequest) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) {
    return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  }
  const rateLimit = checkRateLimit({
    namespace: "product-validation-qualify",
    key: getRequestClientKey(request),
    limit: 12,
    windowMs: 60 * 60 * 1000,
  });
  const headers = createRateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return NextResponse.json({ success: false, error: "请求过于频繁。" }, { status: 429, headers });
  }
  if (getExperimentLifecycle() !== "collecting") {
    return NextResponse.json(
      { success: false, error: "价格实验当前不在采集窗口。" },
      { status: 409, headers },
    );
  }
  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: 8 * 1024,
    tooLargeMessage: "Validation payload too large",
    invalidJsonMessage: "Invalid validation payload",
  });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status, headers });
  const parsed = validationQualificationRequestSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "资格问卷不完整。" }, { status: 400, headers });
  }

  try {
    const context = await resolveValidationRequestContext(request);
    const supabase = getSupabaseAdmin();
    if (!supabase) return NextResponse.json({ success: false, error: "价格实验存储尚未配置。" }, { status: 503, headers });
    await ensureValidationParticipant(supabase, { ...context.participant, firstTouch: {} });
    const participant = await readValidationParticipant(
      supabase,
      context.experiment.experimentId,
      context.identity.identityKey,
    );
    if (participant?.withdrawn_at) {
      return NextResponse.json(
        { success: false, error: "本设备已退出本轮研究，不会重新加入样本。" },
        { status: 409, headers },
      );
    }
    const qualified = isQualifiedIcp(parsed.data);
    await updateValidationQualification(supabase, {
      experimentId: context.experiment.experimentId,
      identityKey: context.identity.identityKey,
      icpStatus: qualified ? "qualified" : "not_qualified",
      answers: parsed.data,
      qualifiedAt: qualified ? new Date().toISOString() : null,
    });
    return NextResponse.json(
      { success: true, qualified, context: context.publicContext },
      { headers: { ...headers, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } },
    );
  } catch {
    return NextResponse.json({ success: false, error: "资格记录失败。" }, { status: 503, headers });
  }
}
