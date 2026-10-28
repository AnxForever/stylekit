import { describe, expect, it } from "vitest";
import {
  COMMUNITY_GROUP,
  resolveCommunityGroupDestination,
  type CommunityGroupConfig,
} from "@/lib/community/join";

const NOW = new Date("2026-10-22T00:00:00.000Z");

function config(overrides: Partial<CommunityGroupConfig>): CommunityGroupConfig {
  return { status: "live", platform: "wechat", ...overrides };
}

describe("community group destination", () => {
  it("ships a live QQ invite that resolves to an external link", () => {
    expect(COMMUNITY_GROUP.status).toBe("live");
    expect(COMMUNITY_GROUP.platform).toBe("qq");

    const destination = resolveCommunityGroupDestination(COMMUNITY_GROUP, NOW);
    expect(destination.kind).toBe("invite");
    if (destination.kind !== "invite") return;

    const url = new URL(destination.href);
    expect(url.protocol).toBe("https:");
    expect(url.hostname).toBe("qun.qq.com");
  });

  it("uses a public invite URL when the group is live", () => {
    expect(
      resolveCommunityGroupDestination(
        config({ inviteUrl: "https://discord.gg/stylekit" }),
        NOW
      )
    ).toEqual({ kind: "invite", href: "https://discord.gg/stylekit" });
  });

  it("rejects invite URLs that are not http or https", () => {
    expect(
      resolveCommunityGroupDestination(
        config({ inviteUrl: "javascript:alert(1)" }),
        NOW
      )
    ).toEqual({ kind: "pending" });
  });

  it("falls back to a root-relative QR code when there is no invite URL", () => {
    expect(
      resolveCommunityGroupDestination(
        config({
          platform: "qq",
          qrImageSrc: "/community/qq-group.png",
          qrExpiresAt: "2026-11-01T00:00:00.000Z",
        }),
        NOW
      )
    ).toEqual({ kind: "qr", src: "/community/qq-group.png" });
  });

  it("hides an expired or unreadable QR code", () => {
    expect(
      resolveCommunityGroupDestination(
        config({
          qrImageSrc: "/community/qq-group.png",
          qrExpiresAt: "2026-10-01T00:00:00.000Z",
        }),
        NOW
      )
    ).toEqual({ kind: "pending" });

    expect(
      resolveCommunityGroupDestination(
        config({
          qrImageSrc: "/community/qq-group.png",
          qrExpiresAt: "not-a-date",
        }),
        NOW
      )
    ).toEqual({ kind: "pending" });
  });

  it("rejects QR paths that are not root-relative", () => {
    expect(
      resolveCommunityGroupDestination(
        config({ qrImageSrc: "https://cdn.example.com/group.png" }),
        NOW
      )
    ).toEqual({ kind: "pending" });

    expect(
      resolveCommunityGroupDestination(
        config({ qrImageSrc: "//cdn.example.com/group.png" }),
        NOW
      )
    ).toEqual({ kind: "pending" });
  });
});
