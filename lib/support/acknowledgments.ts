import { existsSync } from "node:fs";
import path from "node:path";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  thankYouEntries as legacyThankYouEntries,
  type SupportLocaleCopy,
  type ThankYouEntry,
} from "@/lib/site/support";

export interface SupportAcknowledgmentRow {
  id: string;
  donated_on: string;
  donor_label: string;
  amount: string | null;
  receipt_path: string;
  receipt_alt: string | null;
  celebration_path: string | null;
  celebration_alt: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupportAcknowledgmentAdminItem extends SupportAcknowledgmentRow {
  receiptImage: string;
}

export interface PublishedThankYouContent {
  entries: ThankYouEntry[];
  source: "published" | "legacy" | "fallback";
}

const EMPTY_COPY: SupportLocaleCopy = { en: "", zh: "" };

/**
 * Receipt screenshots are runtime content under `public/` and are deliberately
 * not tracked in git, so a legacy row can outlive its file. Drop those rows
 * instead of rendering a broken tile. Published Supabase Storage URLs are
 * trusted as-is.
 */
export function isRenderableReceipt(src: string): boolean {
  if (/^https?:\/\//i.test(src)) return true;
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\/+/, "")));
}

function withRenderableReceipts(entries: ThankYouEntry[]): ThankYouEntry[] {
  return entries.filter(
    (entry) => Boolean(entry.receiptImage) && isRenderableReceipt(entry.receiptImage!),
  );
}

// The home page calls this on every request; the data changes only when an
// admin publishes an acknowledgment, so a 60s data-cache window removes a
// Supabase round trip per home visit without making publications feel stale.
export const getPublishedThankYouContent = unstable_cache(
  async (): Promise<PublishedThankYouContent> => {
    const admin = getSupabaseAdmin();
    if (!admin) {
      return {
        entries: withRenderableReceipts(legacyThankYouEntries),
        // CI has public Supabase configuration but deliberately no service key.
        // Do not announce its prerendered legacy data as a new donation batch.
        source: process.env.NEXT_PUBLIC_SUPABASE_URL ? "fallback" : "legacy",
      };
    }

    const { data, error } = await admin
      .from("support_acknowledgments")
      .select(
        "id, donated_on, donor_label, amount, receipt_path, receipt_alt, celebration_path, celebration_alt, published, created_at, updated_at"
      )
      .eq("published", true)
      .order("donated_on", { ascending: false })
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });

    // Keep the public site available while a deployment is waiting for the
    // migration, or when Supabase is temporarily unavailable.
    if (error || !data) {
      return { entries: withRenderableReceipts(legacyThankYouEntries), source: "fallback" };
    }

    return {
      entries: withRenderableReceipts((data as SupportAcknowledgmentRow[]).map(toThankYouEntry)),
      source: "published",
    };
  },
  ["support-published-thank-you-content-v2"],
  { revalidate: 60 },
);

// Existing support/contact consumers continue to receive the same array shape.
export async function getPublishedThankYouEntries(): Promise<ThankYouEntry[]> {
  return (await getPublishedThankYouContent()).entries;
}

export function toThankYouEntry(row: SupportAcknowledgmentRow): ThankYouEntry {
  const label = row.donor_label.trim() || "匿名支持者";
  const copy: SupportLocaleCopy = { en: label, zh: label };
  const amount = row.amount?.trim() ? { en: row.amount, zh: row.amount } : undefined;
  const alt = row.receipt_alt?.trim() ? row.receipt_alt : undefined;
  const celebrationAlt = row.celebration_alt?.trim() ? row.celebration_alt : undefined;

  return {
    id: row.id,
    date: row.donated_on,
    donorLabel: copy,
    amount,
    receiptImage: row.receipt_path,
    receiptAlt: alt ? { en: alt, zh: alt } : EMPTY_COPY,
    celebrationImage: row.celebration_path ?? undefined,
    celebrationAlt: celebrationAlt
      ? { en: celebrationAlt, zh: celebrationAlt }
      : undefined,
  };
}

export function toAdminItem(row: SupportAcknowledgmentRow): SupportAcknowledgmentAdminItem {
  return { ...row, receiptImage: row.receipt_path };
}
