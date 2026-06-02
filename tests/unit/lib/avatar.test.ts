import { describe, expect, it } from "vitest";
import {
  getAvatarImageSrc,
  isAllowedAvatarHostname,
  shouldProxyAvatarHostname,
} from "@/lib/avatar";

describe("avatar helpers", () => {
  it("recognizes supported avatar hosts", () => {
    expect(isAllowedAvatarHostname("avatars.githubusercontent.com")).toBe(true);
    expect(isAllowedAvatarHostname("linux.do")).toBe(true);
    expect(isAllowedAvatarHostname("cdn.linux.do")).toBe(true);
    expect(isAllowedAvatarHostname("example.com")).toBe(false);
  });

  it("only proxies hosts the server can fetch reliably", () => {
    expect(shouldProxyAvatarHostname("avatars.githubusercontent.com")).toBe(true);
    expect(shouldProxyAvatarHostname("secure.gravatar.com")).toBe(true);
    expect(shouldProxyAvatarHostname("linux.do")).toBe(false);
  });

  it("proxies supported external avatar urls", () => {
    expect(
      getAvatarImageSrc("https://avatars.githubusercontent.com/u/1?v=4")
    ).toBe(
      "/api/avatar?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F1%3Fv%3D4"
    );
  });

  it("leaves local avatar urls untouched", () => {
    expect(getAvatarImageSrc("/avatar.png")).toBe("/avatar.png");
  });

  it("keeps linuxdo avatars direct", () => {
    expect(
      getAvatarImageSrc("https://linux.do/user_avatar/linux.do/example/288/1_2.png")
    ).toBe("https://linux.do/user_avatar/linux.do/example/288/1_2.png");
  });

  it("leaves unknown external urls untouched", () => {
    expect(getAvatarImageSrc("https://example.com/avatar.png")).toBe(
      "https://example.com/avatar.png"
    );
  });
});
