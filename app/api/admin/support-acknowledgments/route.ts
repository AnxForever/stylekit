import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { toAdminItem, type SupportAcknowledgmentRow } from "@/lib/support/acknowledgments";

export const runtime = "nodejs";

const BUCKET = "support-acknowledgments";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase 未配置，无法读取赞助公告。" },
      { status: 503 }
    );
  }

  const { data, error } = await admin
    .from("support_acknowledgments")
    .select(
      "id, donated_on, donor_label, amount, receipt_path, receipt_alt, celebration_path, celebration_alt, published, created_at, updated_at"
    )
    .order("donated_on", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "赞助公告数据表还不可用，请先执行 Supabase migration。" },
      { status: 503 }
    );
  }

  return NextResponse.json({ acknowledgments: (data as SupportAcknowledgmentRow[]).map(toAdminItem) });
}

export async function POST(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json({ error: access.error }, { status: access.status ?? 403 });
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Supabase 未配置，无法上传赞助截图。" }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_FILE_SIZE + 64 * 1024) {
    return NextResponse.json({ error: "图片大小不能超过 10MB。" }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "上传数据格式无效，请重新选择图片后再试。" }, { status: 400 });
  }
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "请先选择一张收款截图。" }, { status: 400 });
  }

  const extension = MIME_TO_EXTENSION[file.type];
  if (!extension) {
    return NextResponse.json({ error: "仅支持 JPG、PNG 或 WebP 图片。" }, { status: 415 });
  }
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "图片大小不能超过 10MB。" }, { status: 413 });
  }
  if (!(await hasExpectedImageSignature(file))) {
    return NextResponse.json({ error: "图片内容与文件类型不匹配。" }, { status: 415 });
  }

  const donatedOn = readDate(formData.get("donatedOn"));
  if (!donatedOn) {
    return NextResponse.json({ error: "请填写有效的赞助日期。" }, { status: 400 });
  }

  const donorLabel = readText(formData.get("donorLabel"), 80) || "匿名支持者";
  const amount = readText(formData.get("amount"), 40);
  const published = readBoolean(formData.get("published"));
  if (published === null) {
    return NextResponse.json({ error: "发布状态无效。" }, { status: 400 });
  }
  const receiptAlt = readText(formData.get("receiptAlt"), 160) || `${donorLabel} 的赞助截图`;
  const path = `acknowledgments/${crypto.randomUUID()}.${extension}`;
  const storage = admin.storage.from(BUCKET);

  const { error: uploadError } = await storage.upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) {
    return NextResponse.json(
      { error: "截图上传失败，请确认 Storage bucket 已按 migration 创建。" },
      { status: 502 }
    );
  }

  const { data: publicUrl } = storage.getPublicUrl(path);
  const { data, error } = await admin
    .from("support_acknowledgments")
    .insert({
      donated_on: donatedOn,
      donor_label: donorLabel,
      amount: amount || null,
      receipt_path: publicUrl.publicUrl,
      receipt_alt: receiptAlt,
      published,
    })
    .select(
      "id, donated_on, donor_label, amount, receipt_path, receipt_alt, celebration_path, celebration_alt, published, created_at, updated_at"
    )
    .single();

  if (error || !data) {
    await storage.remove([path]);
    return NextResponse.json(
      { error: "截图已上传，但赞助公告记录保存失败。请检查 migration 是否已执行。" },
      { status: 503 }
    );
  }

  await recordAdminAuditEvent(request, {
    action: "support_acknowledgment.create",
    targetType: "support_acknowledgment",
      targetId: data.id,
      actor: access.actor,
      metadata: {
      published,
      hasAmount: Boolean(amount),
    },
  });

  return NextResponse.json({ acknowledgment: toAdminItem(data as SupportAcknowledgmentRow) }, { status: 201 });
}

function readText(value: FormDataEntryValue | null, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function readDate(value: FormDataEntryValue | null): string | null {
  const valueText = readText(value, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valueText)) return null;
  const date = new Date(`${valueText}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== valueText
    ? null
    : valueText;
}

function readBoolean(value: FormDataEntryValue | null): boolean | null {
  if (value === null) return true;
  if (value === "true") return true;
  if (value === "false") return false;
  return null;
}

async function hasExpectedImageSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());

  if (file.type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (file.type === "image/png") {
    return bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a;
  }
  return bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50;
}
