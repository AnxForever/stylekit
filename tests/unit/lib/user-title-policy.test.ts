import { describe, expect, it } from "vitest";
import {
  EMPEROR_TITLE_TOKEN,
  EARLY_USER_TITLE_TOKEN,
  SITE_OWNER_TITLE_TOKEN,
  isEarlyUser,
  normalizeCustomTitleInput,
  resolveUserTitle,
} from "@/lib/auth/user-title-policy";

describe("user title policy", () => {
  it("prefers manual custom title", () => {
    const title = resolveUserTitle({
      userId: "11111111-1111-4111-8111-111111111111",
      seqId: 1,
      adminUserIds: new Set<string>(),
      rule: {
        userId: "11111111-1111-4111-8111-111111111111",
        customTitle: "VIP",
        isOwner: true,
        titleEnabled: true,
        updatedAt: null,
        updatedBy: null,
      },
    });

    expect(title).toBe("VIP");
  });

  it("returns site owner token when owner flag is true", () => {
    const title = resolveUserTitle({
      userId: "11111111-1111-4111-8111-111111111111",
      seqId: 42,
      adminUserIds: new Set<string>(),
      rule: {
        userId: "11111111-1111-4111-8111-111111111111",
        customTitle: null,
        isOwner: true,
        titleEnabled: true,
        updatedAt: null,
        updatedBy: null,
      },
    });

    expect(title).toBe(SITE_OWNER_TITLE_TOKEN);
  });

  it("returns emperor token for seq id 1 and 2", () => {
    expect(
      resolveUserTitle({
        userId: "11111111-1111-4111-8111-111111111111",
        seqId: 1,
        adminUserIds: new Set<string>(),
        rule: null,
      })
    ).toBe(EMPEROR_TITLE_TOKEN);

    expect(
      resolveUserTitle({
        userId: "22222222-2222-4222-8222-222222222222",
        seqId: 2,
        adminUserIds: new Set<string>(),
        rule: null,
      })
    ).toBe(EMPEROR_TITLE_TOKEN);
  });

  it("returns early user token by seq id", () => {
    const title = resolveUserTitle({
      userId: "11111111-1111-4111-8111-111111111111",
      seqId: 100,
      adminUserIds: new Set<string>(),
      rule: null,
    });

    expect(title).toBe(EARLY_USER_TITLE_TOKEN);
    expect(isEarlyUser(100)).toBe(true);
    expect(isEarlyUser(101)).toBe(false);
  });

  it("disables title when title_enabled is false", () => {
    const title = resolveUserTitle({
      userId: "11111111-1111-4111-8111-111111111111",
      seqId: 1,
      adminUserIds: new Set(["11111111-1111-4111-8111-111111111111"]),
      rule: {
        userId: "11111111-1111-4111-8111-111111111111",
        customTitle: null,
        isOwner: true,
        titleEnabled: false,
        updatedAt: null,
        updatedBy: null,
      },
    });

    expect(title).toBeNull();
  });

  it("validates custom title length", () => {
    expect(normalizeCustomTitleInput("   ").value).toBeNull();
    expect(normalizeCustomTitleInput("VIP")).toEqual({ ok: true, value: "VIP" });
    expect(normalizeCustomTitleInput("x".repeat(30)).ok).toBe(false);
  });
});
