import { describe, expect, it } from "vitest";

import { assertSafeUrl, hostResolverRules, isBlockedIp } from "@/lib/security/ssrf";

describe("isBlockedIp", () => {
  it("blocks loopback, private, link-local and metadata IPv4", () => {
    for (const ip of [
      "127.0.0.1",
      "10.0.0.5",
      "192.168.1.1",
      "172.16.0.1",
      "172.31.255.255",
      "169.254.169.254", // cloud metadata — the one that matters most
      "100.64.0.1", // CGNAT
      "0.0.0.0",
      "255.255.255.255",
      "224.0.0.1", // multicast
    ]) {
      expect(isBlockedIp(ip), ip).toBe(true);
    }
  });

  it("allows public unicast IPv4", () => {
    for (const ip of ["8.8.8.8", "1.1.1.1", "104.16.0.1", "172.32.0.1", "100.128.0.1"]) {
      expect(isBlockedIp(ip), ip).toBe(false);
    }
  });

  it("blocks loopback, link-local, ULA and mapped-internal IPv6", () => {
    for (const ip of ["::1", "::", "fe80::1", "fc00::1", "fd12::34", "ff02::1", "::ffff:127.0.0.1"]) {
      expect(isBlockedIp(ip), ip).toBe(true);
    }
  });

  it("allows public IPv6 and refuses non-IP strings", () => {
    expect(isBlockedIp("2606:4700:4700::1111")).toBe(false);
    expect(isBlockedIp("not-an-ip")).toBe(true);
    expect(isBlockedIp("")).toBe(true);
  });
});

describe("assertSafeUrl", () => {
  it("accepts a public IP-literal URL and returns it as the vetted address", async () => {
    const r = await assertSafeUrl("http://8.8.8.8/path");
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.addresses).toEqual(["8.8.8.8"]);
  });

  it("rejects the cloud metadata endpoint", async () => {
    const r = await assertSafeUrl("http://169.254.169.254/latest/meta-data/");
    expect(r).toEqual({ ok: false, reason: "blocked-address" });
  });

  it("rejects loopback (v4 and v6 literal)", async () => {
    expect((await assertSafeUrl("http://127.0.0.1:8080")).ok).toBe(false);
    expect((await assertSafeUrl("http://[::1]/")).ok).toBe(false);
  });

  it("rejects non-http(s) protocols", async () => {
    expect(await assertSafeUrl("ftp://example.com")).toEqual({ ok: false, reason: "protocol-not-allowed" });
    expect(await assertSafeUrl("file:///etc/passwd")).toEqual({ ok: false, reason: "protocol-not-allowed" });
  });

  it("rejects embedded credentials and malformed URLs", async () => {
    expect(await assertSafeUrl("http://user:pass@8.8.8.8")).toEqual({
      ok: false,
      reason: "credentials-not-allowed",
    });
    expect(await assertSafeUrl("not a url")).toEqual({ ok: false, reason: "invalid-url" });
  });
});

describe("hostResolverRules", () => {
  it("pins a hostname to its first vetted address", () => {
    expect(hostResolverRules("example.com", ["93.184.216.34"])).toBe("MAP example.com 93.184.216.34");
  });
  it("returns empty for IP-literal hosts or no addresses", () => {
    expect(hostResolverRules("8.8.8.8", ["8.8.8.8"])).toBe("");
    expect(hostResolverRules("example.com", [])).toBe("");
  });
});
