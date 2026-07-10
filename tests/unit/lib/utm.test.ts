// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from "vitest";
import { getUtmParams, parseUtmParams } from "@/lib/analytics/utm";

describe("UTM analytics privacy bounds", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("keeps only known UTM keys and bounds their values", () => {
    sessionStorage.setItem(
      "stylekit_utm",
      JSON.stringify({
        utm_source: "a".repeat(200),
        arbitrary_customer_field: "must-not-leave-browser",
      }),
    );

    expect(getUtmParams()).toEqual({ utm_source: "a".repeat(160) });
  });

  it("bounds UTM values parsed from a URL", () => {
    expect(parseUtmParams(`?utm_campaign=${"b".repeat(200)}`)).toEqual({
      utm_campaign: "b".repeat(160),
    });
  });
});
