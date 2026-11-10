import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { getAdmin } = vi.hoisted(() => ({ getAdmin: vi.fn() }));

vi.mock("node:fs", () => ({ existsSync: () => true }));
vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: getAdmin }));

import {
  getPublishedThankYouContent,
  getPublishedThankYouEntries,
  type SupportAcknowledgmentRow,
} from "@/lib/support/acknowledgments";

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://configured.test");
  getAdmin.mockReturnValue(null);
});

afterEach(() => vi.unstubAllEnvs());

function setQueryResult(data: SupportAcknowledgmentRow[] | null, error: unknown) {
  const query = { select: vi.fn(), eq: vi.fn(), order: vi.fn() };
  query.select.mockReturnValue(query);
  query.eq.mockReturnValue(query);
  query.order.mockReturnValueOnce(query).mockReturnValueOnce(query).mockResolvedValueOnce({ data, error });
  getAdmin.mockReturnValue({ from: vi.fn().mockReturnValue(query) });
  return query;
}

describe("published thank-you content source", () => {
  it("marks public-config-only CI data as fallback rather than a new publication", async () => {
    const result = await getPublishedThankYouContent();
    expect(result.source).toBe("fallback");
    expect(result.entries.length).toBeGreaterThan(0);
  });

  it("preserves intentional static mode and the existing support/contact array API", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    const content = await getPublishedThankYouContent();
    expect(content.source).toBe("legacy");
    expect(await getPublishedThankYouEntries()).toEqual(content.entries);
  });

  it("keeps receipts available on a database error without calling them published updates", async () => {
    setQueryResult(null, { message: "temporarily unavailable" });
    const result = await getPublishedThankYouContent();
    expect(result.source).toBe("fallback");
    expect(result.entries.length).toBeGreaterThan(0);
  });

  it("adds an ID tie-breaker to published date/creation ordering", async () => {
    const row: SupportAcknowledgmentRow = {
      id: "receipt-a",
      donated_on: "2026-11-09",
      donor_label: "Supporter",
      amount: null,
      receipt_path: "https://assets.test/receipt.png",
      receipt_alt: null,
      celebration_path: null,
      celebration_alt: null,
      published: true,
      created_at: "2026-11-09T00:00:00Z",
      updated_at: "2026-11-09T00:00:00Z",
    };
    const query = setQueryResult([row], null);
    const result = await getPublishedThankYouContent();
    expect(result.source).toBe("published");
    expect(result.entries[0].id).toBe(row.id);
    expect(query.order.mock.calls).toEqual([
      ["donated_on", { ascending: false }],
      ["created_at", { ascending: false }],
      ["id", { ascending: false }],
    ]);
  });
});
