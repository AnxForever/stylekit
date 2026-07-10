import { describe, expect, it } from "vitest";
import {
  parseClientAnalyticsPayload,
  readEventStyleSlug,
} from "@/lib/analytics/client-event-schema";

describe("client analytics runtime schema", () => {
  it("accepts a bounded client event and derives its style slug", () => {
    const parsed = parseClientAnalyticsPayload({
      eventType: "catalog_impression",
      eventData: {
        slug: "corporate-clean",
        rank: 1,
        surface: "styles_catalog",
        page: 1,
        sort: "recommended",
        collection_slug: null,
        filter_count: 0,
        query_present: false,
      },
      sessionId: "123e4567-e89b-42d3-a456-426614174000",
    });

    expect(parsed.success).toBe(true);
    if (!parsed.success) return;
    expect(readEventStyleSlug(parsed.data.eventType, parsed.data.eventData)).toBe(
      "corporate-clean",
    );
  });

  it.each([
    "pack_purchase_intent",
    "pack_checkout_start",
    "pack_purchase",
    "pack_refund",
    "pack_install_success",
    "admin_submission_approve",
  ])("rejects non-client event %s", (eventType) => {
    expect(
      parseClientAnalyticsPayload({
        eventType,
        eventData: {},
        sessionId: null,
      }).success,
    ).toBe(false);
  });

  it("rejects unknown fields and invalid numeric bounds", () => {
    expect(
      parseClientAnalyticsPayload({
        eventType: "catalog_impression",
        eventData: {
          slug: "corporate-clean",
          rank: 0,
          surface: "styles_catalog",
          page: 1,
          sort: "recommended",
          collection_slug: null,
          filter_count: 0,
          query_present: false,
          raw_query: "private customer name",
        },
        sessionId: null,
      }).success,
    ).toBe(false);
  });

  it("stores search shape without the raw query", () => {
    const parsed = parseClientAnalyticsPayload({
      eventType: "search",
      eventData: {
        query_present: true,
        query_length: 12,
        results_count: 4,
      },
      sessionId: null,
    });

    expect(parsed.success).toBe(true);
    expect(JSON.stringify(parsed)).not.toContain("query\"");
  });

  it("accepts a complete price exposure and rejects invalid money", () => {
    const payload = {
      eventType: "pack_price_view",
      eventData: {
        experiment_id: "cc-price-2026-01",
        offer_version: "cc-offer-v1",
        variant_id: "pack-199",
        pack_id: "corporate-clean-saas",
        pack_version: "0.1.0",
        offer_id: "founding-solo",
        source: "direct",
        visibility_ms: 2_000,
        visible_ratio_bps: 5_000,
        price_id: "founding-solo-cny-199",
        currency: "CNY",
        amount_minor: 19_900,
      },
      sessionId: null,
    };

    expect(parseClientAnalyticsPayload(payload).success).toBe(true);
    expect(
      parseClientAnalyticsPayload({
        ...payload,
        eventData: { ...payload.eventData, amount_minor: -1 },
      }).success,
    ).toBe(false);
  });

  it("rejects the removed client-supplied styleSlug envelope field", () => {
    expect(
      parseClientAnalyticsPayload({
        eventType: "showcase_open",
        styleSlug: "neo-brutalist",
        eventData: { slug: "corporate-clean", source: "hero" },
        sessionId: null,
      }).success,
    ).toBe(false);
  });

  it("does not misclassify animation or template identifiers as style slugs", () => {
    expect(
      readEventStyleSlug("animation_view", {
        slug: "fade-in-up",
        source: "page",
      }),
    ).toBeNull();
    expect(
      readEventStyleSlug("template_view", {
        slug: "saas-landing",
        source: "page",
      }),
    ).toBeNull();
  });
});
