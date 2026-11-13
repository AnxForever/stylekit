import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { getUmamiTrackerConfig } from "@/lib/analytics/umami-tracker-config";

const SERVER_VARS = ["UMAMI_SCRIPT_URL", "UMAMI_WEBSITE_ID"] as const;
const PUBLIC_VARS = [
  "NEXT_PUBLIC_UMAMI_SCRIPT_URL",
  "NEXT_PUBLIC_UMAMI_WEBSITE_ID",
] as const;

afterEach(() => {
  vi.unstubAllEnvs();
});

function stubAll(values: Record<string, string>) {
  for (const name of [...SERVER_VARS, ...PUBLIC_VARS]) {
    vi.stubEnv(name, values[name] ?? "");
  }
}

describe("Umami tracker config", () => {
  it("reads the server-runtime variables", () => {
    stubAll({
      UMAMI_SCRIPT_URL: "https://www.stylekit.top/umami/script.js",
      UMAMI_WEBSITE_ID: "9f5c4c1e-0000-4000-8000-000000000000",
    });

    expect(getUmamiTrackerConfig()).toEqual({
      scriptUrl: "https://www.stylekit.top/umami/script.js",
      websiteId: "9f5c4c1e-0000-4000-8000-000000000000",
    });
  });

  it("prefers the server-runtime variables over the build-inlined ones", () => {
    stubAll({
      UMAMI_SCRIPT_URL: "https://runtime.example.test/umami/script.js",
      UMAMI_WEBSITE_ID: "runtime-website",
      NEXT_PUBLIC_UMAMI_SCRIPT_URL: "https://build.example.test/umami/script.js",
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: "build-website",
    });

    expect(getUmamiTrackerConfig()).toEqual({
      scriptUrl: "https://runtime.example.test/umami/script.js",
      websiteId: "runtime-website",
    });
  });

  it("falls back to the public variables so existing deployments keep tracking", () => {
    stubAll({
      NEXT_PUBLIC_UMAMI_SCRIPT_URL: "https://www.stylekit.top/umami/script.js",
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: "9f5c4c1e-0000-4000-8000-000000000000",
    });

    expect(getUmamiTrackerConfig()).toEqual({
      scriptUrl: "https://www.stylekit.top/umami/script.js",
      websiteId: "9f5c4c1e-0000-4000-8000-000000000000",
    });
  });

  it("returns null when either value is missing, disabling the tag", () => {
    stubAll({ UMAMI_SCRIPT_URL: "https://www.stylekit.top/umami/script.js" });
    expect(getUmamiTrackerConfig()).toBeNull();

    stubAll({ UMAMI_WEBSITE_ID: "9f5c4c1e-0000-4000-8000-000000000000" });
    expect(getUmamiTrackerConfig()).toBeNull();

    stubAll({});
    expect(getUmamiTrackerConfig()).toBeNull();
  });

  it("ignores whitespace-only values instead of emitting a broken tag", () => {
    stubAll({ UMAMI_SCRIPT_URL: "   ", UMAMI_WEBSITE_ID: "  \t " });

    expect(getUmamiTrackerConfig()).toBeNull();
  });
});
