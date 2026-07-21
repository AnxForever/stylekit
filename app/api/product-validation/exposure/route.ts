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
  getExperimentLifecycle,
  insertValidationEvent,
  readValidationParticipant,
  resolveValidationRequestContext,
  validationExposureRequestSchema,
} from "@/lib/product-validation/server";

export async function POST(request: NextRequest) {
  const origin = verifyTrustedOrigin(request);
  if (!origin.ok) return NextResponse.json({ success: false, error: origin.error }, { status: origin.status ?? 403 });
  const rateLimit = checkRateLimit({
    namespace: "product-validation-exposure",
    key: getRequestClientKey(request),
    limit: 60,
    windowMs: 10 * 60 * 1000,
  });
  const headers = createRateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) return NextResponse.json({ success: false, error: "曝光事件过于频繁。" }, { status: 429, headers });
  if (getExperimentLifecycle() !== "collecting") {
    return NextResponse.json({ success: false, error: "价格实验当前不在采集窗口。" }, { status: 409, headers });
  }
  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: 8 * 1024,
    tooLargeMessage: "Validation payload too large",
    invalidJsonMessage: "Invalid validation payload",
  });
  if (!body.ok) return NextResponse.json({ success: false, error: body.error }, { status: body.status, headers });
  const parsed = validationExposureRequestSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ success: false, error: "曝光事件无效。" }, { status: 400, headers });

  try {
    const context = await resolveValidationRequestContext(request);
    const threshold = context.experiment.thresholds;
    if (
      parsed.data.visibilityMs < threshold.minimumVisibilityMs ||
      parsed.data.visibleRatioBps < threshold.minimumVisibleRatioBps
    ) {
      return NextResponse.json({ success: false, error: "曝光未达到冻结阈值。" }, { status: 422, headers });
    }
    const supabase = getSupabaseAdmin();
    if (!supabase) return NextResponse.json({ success: false, error: "价格实验存储尚未配置。" }, { status: 503, headers });
    const participant = await readValidationParticipant(
      supabase,
      context.experiment.experimentId,
      context.identity.identityKey,
    );
    if (participant?.icp_status !== "qualified" || participant.withdrawn_at) {
      return NextResponse.json(
        { success: false, error: "请先同意研究并通过 ICP 资格问卷。" },
        { status: 422, headers },
      );
    }
    const status = await insertValidationEvent(supabase, {
      eventId: parsed.data.eventId,
      occurredAt: new Date().toISOString(),
      identityKey: context.identity.identityKey,
      experimentId: context.experiment.experimentId,
      offerVersion: context.experiment.offerVersion,
      variantId: context.publicContext.variantId,
      eventType: parsed.data.type,
      trust: "client_validated",
      eventData: {
        visibilityMs: parsed.data.visibilityMs,
        visibleRatioBps: parsed.data.visibleRatioBps,
      },
      createdBy: "client_exposure_api",
    });
    return NextResponse.json(
      { success: true, duplicate: status === "duplicate" },
      { headers: { ...headers, "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } },
    );
  } catch {
    return NextResponse.json({ success: false, error: "曝光记录失败。" }, { status: 503, headers });
  }
}
