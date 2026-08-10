import { afterEach, describe, expect, it, vi } from "vitest";
import { fetcher } from "@/lib/swr/fetcher";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("SWR fetcher", () => {
  it("preserves structured API error metadata for admin recovery states", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            error: "产品验证数据表尚未接入",
            code: "product_validation_migration_required",
            migration: "lib/supabase/migrations/015_product_validation.sql",
          }),
          { status: 503, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );

    await expect(fetcher("/api/admin/product-validation")).rejects.toMatchObject({
      message: "产品验证数据表尚未接入",
      status: 503,
      code: "product_validation_migration_required",
      migration: "lib/supabase/migrations/015_product_validation.sql",
    });
  });
});
