import { unstable_noStore as noStore } from "next/cache";
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

const EMPTY_COPY: SupportLocaleCopy = { en: "", zh: "" };

export async function getPublishedThankYouEntries(): Promise<ThankYouEntry[]> {
  noStore();

  const admin = getSupabaseAdmin();
  if (!admin) {
    return legacyThankYouEntries;
  }

  const { data, error } = await admin
    .from("support_acknowledgments")
    .select(
      "id, donated_on, donor_label, amount, receipt_path, receipt_alt, celebration_path, celebration_alt, published, created_at, updated_at"
    )
    .eq("published", true)
    .order("donated_on", { ascending: false })
    .order("created_at", { ascending: false });

  // Keep the public site available while a deployment is waiting for the
  // migration, or when Supabase is temporarily unavailable.
  if (error || !data) {
    return legacyThankYouEntries;
  }

  return (data as SupportAcknowledgmentRow[]).map(toThankYouEntry);
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
