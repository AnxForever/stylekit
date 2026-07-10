import { describe, expect, expectTypeOf, it } from "vitest";
import {
  ANALYTICS_EVENT_NAMES,
  AUTHORITATIVE_EVENT_NAMES,
  CLIENT_EVENT_NAMES,
  type AnalyticsEventName,
  type AuthoritativeEventName,
  type ClientEventName,
  type EventProperties,
} from "@/lib/analytics/event-contract";
import { trackEvent } from "@/lib/analytics/events";

describe("analytics event contract", () => {
  it("publishes separate client and authoritative allowlists", () => {
    expect(CLIENT_EVENT_NAMES).toEqual(expect.arrayContaining([
      "showcase_open",
      "shadcn_command_copy",
      "pack_offer_view",
      "pack_price_view",
      "catalog_impression",
    ]));
    expect(AUTHORITATIVE_EVENT_NAMES).toEqual([
      "pack_purchase_intent",
      "pack_checkout_start",
      "pack_purchase",
      "pack_refund",
      "pack_install_success",
    ]);
    expect(ANALYTICS_EVENT_NAMES).toHaveLength(
      CLIENT_EVENT_NAMES.length + AUTHORITATIVE_EVENT_NAMES.length
    );

    expectTypeOf<(typeof CLIENT_EVENT_NAMES)[number]>().toEqualTypeOf<ClientEventName>();
    expectTypeOf<(typeof AUTHORITATIVE_EVENT_NAMES)[number]>().toEqualTypeOf<AuthoritativeEventName>();
    expectTypeOf<(typeof ANALYTICS_EVENT_NAMES)[number]>().toEqualTypeOf<AnalyticsEventName>();
  });

  it("requires style identity and bounded source context for discovery events", () => {
    expectTypeOf<EventProperties<"showcase_open">>().toEqualTypeOf<{
      slug: string;
      source: "hero" | "preview_card";
    }>();
    expectTypeOf<EventProperties<"shadcn_command_copy">>().toEqualTypeOf<{
      slug: string;
      source: "style_use_panel";
    }>();
    expectTypeOf<EventProperties<"code_copy">>().toEqualTypeOf<{
      slug: string | null;
      language: string;
    }>();
    expectTypeOf<EventProperties<"search">>().toEqualTypeOf<{
      query_present: true;
      query_length: number;
      results_count: number;
    }>();
  });

  it("captures catalog rank and non-PII list context", () => {
    expectTypeOf<EventProperties<"catalog_impression">>().toEqualTypeOf<{
      slug: string;
      rank: number;
      surface: "styles_catalog" | "home" | "collection" | "search" | "related_styles";
      page: number;
      sort: string | null;
      collection_slug: string | null;
      filter_count: number;
      query_present: boolean;
    }>();
  });

  it("keeps verified outcomes out of the browser tracking API", () => {
    if (false) {
      // @ts-expect-error verified intent must be recorded after server-side identity and terms checks
      trackEvent("pack_purchase_intent", {
        pack_id: "corporate-clean-saas",
      });

      // @ts-expect-error checkout start must follow server-side session creation
      trackEvent("pack_checkout_start", {
        pack_id: "corporate-clean-saas",
      });

      // @ts-expect-error verified purchases must be recorded by a trusted server path
      trackEvent("pack_purchase", {
        pack_id: "corporate-clean-saas",
      });

      // @ts-expect-error refunds must be reconciled against a trusted payment record
      trackEvent("pack_refund", {
        pack_id: "corporate-clean-saas",
      });

      // @ts-expect-error install success must come from a verifier or an explicit self-report path
      trackEvent("pack_install_success", {
        pack_id: "corporate-clean-saas",
      });
    }

    expectTypeOf<EventProperties<"pack_purchase">["verification_level"]>()
      .toEqualTypeOf<"payment_provider" | "manual_reconciled">();
    expectTypeOf<EventProperties<"pack_purchase_intent">["verification_method"]>()
      .toEqualTypeOf<"authenticated_account" | "verified_email" | "manual_interview">();
    expectTypeOf<EventProperties<"pack_install_success">["verification_level"]>()
      .toEqualTypeOf<
        "automated_smoke_test" | "support_verified" | "customer_self_reported"
      >();
  });
});
