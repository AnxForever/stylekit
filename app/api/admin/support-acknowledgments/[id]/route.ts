import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Supabase 未配置。" }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const update: Record<string, string | boolean | null> = {};

  if (typeof body?.published === "boolean") update.published = body.published;
  if (typeof body?.donorLabel === "string") {
    update.donor_label = body.donorLabel.trim().slice(0, 80) || "匿名支持者";
  }
  if (typeof body?.amount === "string") update.amount = body.amount.trim().slice(0, 40) || null;
  if (typeof body?.receiptAlt === "string") update.receipt_alt = body.receiptAlt.trim().slice(0, 160) || null;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "没有可更新的字段。" }, { status: 400 });
  }

  update.updated_at = new Date().toISOString();
  const { id } = await params;
  const { data, error } = await admin
    .from("support_acknowledgments")
    .update(update)
    .eq("id", id)
    .select(
      "id, donated_on, donor_label, amount, receipt_path, receipt_alt, celebration_path, celebration_alt, published, created_at, updated_at"
    )
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "找不到这条赞助公告。" }, { status: 404 });
  }

  await recordAdminAuditEvent(request, {
    action: "support_acknowledgment.update",
    targetType: "support_acknowledgment",
    targetId: id,
    actor: access.actor,
    metadata: {
      fields: Object.keys(update).filter((field) => field !== "updated_at"),
      published: typeof update.published === "boolean" ? update.published : undefined,
    },
  });

  return NextResponse.json({ acknowledgment: data });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Supabase 未配置。" }, { status: 503 });
  }

  const { id } = await params;
  const { data: row, error: loadError } = await admin
    .from("support_acknowledgments")
    .select("id, receipt_path")
    .eq("id", id)
    .single();

  if (loadError || !row) {
    return NextResponse.json({ error: "找不到这条赞助公告。" }, { status: 404 });
  }

  const { error: deleteError } = await admin
    .from("support_acknowledgments")
    .delete()
    .eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: "删除赞助公告失败。" }, { status: 502 });
  }

  const receiptPath = String(row.receipt_path ?? "");
  const marker = "/storage/v1/object/public/support-acknowledgments/";
  const storagePath = receiptPath.includes(marker)
    ? receiptPath.split(marker)[1]?.split("?")[0]
    : null;
  let storageCleanupFailed = false;
  if (storagePath) {
    const { error: storageError } = await admin.storage
      .from("support-acknowledgments")
      .remove([storagePath]);
    storageCleanupFailed = Boolean(storageError);
  }

  await recordAdminAuditEvent(request, {
    action: "support_acknowledgment.delete",
    targetType: "support_acknowledgment",
    targetId: id,
    actor: access.actor,
    metadata: {
      storageRemoved: Boolean(storagePath) && !storageCleanupFailed,
      storageCleanupFailed,
    },
  });

  return NextResponse.json({
    ok: true,
    storageRemoved: Boolean(storagePath) && !storageCleanupFailed,
    warning: storageCleanupFailed
      ? "记录已删除，但图片清理失败，请稍后在 Storage 中手动处理。"
      : undefined,
  });
}
