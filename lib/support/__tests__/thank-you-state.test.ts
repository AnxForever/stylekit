import { describe, expect, it } from "vitest";
import { thankYouModalConfig, type ThankYouEntry } from "@/lib/site/support";
import { getThankYouContentVersion, withoutThankYouRequest } from "@/lib/support/thank-you-state";

const receipt: ThankYouEntry = {
  id: "row-a",
  date: "2026-11-09",
  donorLabel: { en: "Supporter", zh: "支持者" },
  receiptImage: "/support/receipt.png",
};

describe("thank-you content identity", () => {
  it("ignores database identity and metadata not displayed in the modal", () => {
    const changed = { ...receipt, id: "new-row", amount: { en: "10", zh: "10" } };
    expect(getThankYouContentVersion([changed], thankYouModalConfig, undefined)).toBe(
      getThankYouContentVersion([receipt], thankYouModalConfig, undefined),
    );
  });

  it("detects visible copy, receipt and celebration updates", () => {
    const original = getThankYouContentVersion([receipt], thankYouModalConfig, undefined);
    const editedCopy = {
      ...thankYouModalConfig,
      description: { ...thankYouModalConfig.description, en: "An updated thank-you." },
    };
    expect(getThankYouContentVersion([receipt], editedCopy, undefined)).not.toBe(original);
    expect(getThankYouContentVersion([{ ...receipt, receiptImage: "/support/new.png" }], thankYouModalConfig, undefined)).not.toBe(original);
    expect(getThankYouContentVersion([receipt], thankYouModalConfig, {
      ...receipt,
      celebrationImage: "/support/celebration.png",
    })).not.toBe(original);
  });

  it("does not consume unrelated support parameters", () => {
    expect(withoutThankYouRequest("https://www.stylekit.top/en?support=help&utm_source=test#receipts")).toBeNull();
    expect(withoutThankYouRequest("https://www.stylekit.top/en?preview&support=help&utm_source=test#receipts"))
      .toBe("/en?support=help&utm_source=test#receipts");
  });
});
