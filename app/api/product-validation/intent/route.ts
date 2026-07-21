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
  canCollectVerifiedPriceIntent,
  getExperimentLifecycle,
  insertValidationEvent,
  readValidationExposureTypes,
  readValidationParticipant,
  resolveValidationRequestContext,
  TERMS_VERSION,
  validationIntentRequestSchema,
} from "@/lib/product-validation/server";

export async function POST(request: NextRequest) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const rateLimit = checkRateLimit({
    namespace: "product-validation-intent",
    key: getRequestClientKey(request),
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });
  const headers = createRateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) return NextResponse.json({ success: false, error: "意向提交过于频繁。" }, { status: 429, headers });
  if (getExperimentLifecycle() !== "collecting") {
    return NextResponse.json({ success: false, error: "价格实验当前不在采集窗口。" }, { status: 409, headers });
  }
  if (!canCollectVerifiedPriceIntent()) {
    return NextResponse.json(
      { success: false, error: "商业许可与销售条款尚未完成最终审核，暂不采集已验证购买意向。" },
      { status: 409, headers },
    );
  }
  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: 8 * 1024,
    tooLargeMessage: "Validation payload too large",
    invalidJsonMessage: "Invalid validation payload",
  });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status, headers });
  const parsed = validationIntentRequestSchema.safeParse(body.data);
  if (!parsed.success || parsed.data.termsVersion !== TERMS_VERSION) {
    return NextResponse.json({ success: false, error: "必须接受当前准确价格和条款。" }, { status: 400, headers });
  }

  try {
    const context = await resolveValidationRequestContext(request);
    if (!context.user) {
      return NextResponse.json({ success: false, error: "请先登录并验证账户后再登记价格接受。" }, { status: 401, headers });
    }
    if (
      context.participant.environment !== "production" ||
      context.participant.isBot ||
      context.participant.isInternal ||
      context.participant.isTest
    ) {
      return NextResponse.json({ success: false, error: "当前访问不进入正式价格实验。" }, { status: 422, headers });
    }
    const supabase = getSupabaseAdmin();
    if (!supabase) return NextResponse.json({ success: false, error: "价格实验存储尚未配置。" }, { status: 503, headers });
    const participant = await readValidationParticipant(
      supabase,
      context.experiment.experimentId,
      context.identity.identityKey,
    );
    if (participant?.icp_status !== "qualified" || participant.withdrawn_at) {
      return NextResponse.json({ success: false, error: "请先完成并通过 ICP 资格问卷。" }, { status: 422, headers });
    }
    if (participant.variant_id !== context.publicContext.variantId) {
      return NextResponse.json({ success: false, error: "价格分组与冻结分配不一致。" }, { status: 409, headers });
    }
    const exposureTypes = await readValidationExposureTypes(
      supabase,
      context.experiment.experimentId,
      context.identity.identityKey,
    );
    if (!exposureTypes.has("pack_offer_view") || !exposureTypes.has("pack_price_view")) {
      return NextResponse.json({ success: false, error: "交付物与价格尚未达到完整曝光要求。" }, { status: 422, headers });
    }
    const status = await insertValidationEvent(supabase, {
      eventId: parsed.data.eventId,
      occurredAt: new Date().toISOString(),
      identityKey: context.identity.identityKey,
      experimentId: context.experiment.experimentId,
      offerVersion: context.experiment.offerVersion,
      variantId: context.publicContext.variantId,
      eventType: "pack_purchase_intent",
      trust: "server_verified",
      eventData: {
        amountMinor: context.publicContext.amountMinor,
        currency: context.publicContext.currency,
        termsVersion: TERMS_VERSION,
        verificationMethod: "authenticated_account",
      },
      createdBy: "authenticated_intent_api",
    });
    return NextResponse.json(
      {
        success: true,
        duplicate: status === "duplicate",
        message: "已记录对当前准确价格的接受；现在不会扣款，也不会生成订单。",
      },
      { headers: { ...headers, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } },
    );
  } catch {
    return NextResponse.json({ success: false, error: "价格接受记录失败。" }, { status: 503, headers });
  }
}
