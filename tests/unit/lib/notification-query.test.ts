import { describe, expect, it } from "vitest";
import { notificationKey } from "@/lib/community/use-notifications";

describe("notification cache identity", () => {
  it("never loads an inbox without an authenticated account", () => {
    expect(notificationKey(undefined)).toBeNull();
  });
  it("partitions account caches without putting account IDs in the request URL", () => {
    const first = notificationKey("first-account");
    const second = notificationKey("second-account");
    expect(first?.[0]).toBe("/api/community/notifications?limit=20");
    expect(first?.[0]).toBe(second?.[0]);
    expect(first).not.toEqual(second);
    expect(notificationKey("first-account", "next cursor", 1)?.[0]).toBe("/api/community/notifications?limit=1&cursor=next+cursor");
  });
});
