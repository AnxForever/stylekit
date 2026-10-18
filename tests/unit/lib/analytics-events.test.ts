import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import {
  ANALYTICS_EVENT_NAMES,
  AUTHORITATIVE_EVENT_NAMES,
  CLIENT_EVENT_NAMES,
  type AnalyticsEventName,
  type AuthoritativeEventName,
  type ClientEventName,
  type EventProperties,
} from "@/lib/analytics/event-contract";
import { trackEvent, trackPageView } from "@/lib/analytics/events";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("analytics event contract", () => {
  it("suppresses Umami and internal events when analytics are disabled", () => {
    const umamiTrack = vi.fn();
    const sendBeacon = vi.fn();
    const fetchMock = vi.fn();
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DISABLED", "true");
    vi.stubGlobal("window", { umami: { track: umamiTrack } });
    vi.stubGlobal("navigator", { sendBeacon });
    vi.stubGlobal("fetch", fetchMock);

    trackEvent("showcase_open", { slug: "corporate-clean", source: "hero" });
    trackPageView({
      path: "/styles",
      hostname: "localhost",
      referrerDomain: null,
      referrerType: "direct",
    });

    expect(umamiTrack).not.toHaveBeenCalled();
    expect(sendBeacon).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("drops queued events on hosts the tracker is not allowed to record", async () => {
    const umamiTrack = vi.fn();
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DISABLED", "false");
    // localhost is outside `data-domains`, so the real tracker never defines
    // window.umami; the queue must give up instead of polling for 5 seconds.
    vi.stubGlobal("window", {
      location: { hostname: "localhost" },
      umami: { track: umamiTrack },
    });

    trackEvent("showcase_open", { slug: "corporate-clean", source: "hero" });
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(umamiTrack).not.toHaveBeenCalled();
  });

  it("forwards events once the tracker global is available", () => {
    const umamiTrack = vi.fn();
    vi.stubEnv("NEXT_PUBLIC_ANALYTICS_DISABLED", "false");
    vi.stubGlobal("window", {
      location: { hostname: "stylekit.top" },
      umami: { track: umamiTrack },
    });

    trackEvent("showcase_open", { slug: "corporate-clean", source: "hero" });

    expect(umamiTrack).toHaveBeenCalledWith("showcase_open", {
      slug: "corporate-clean",
      source: "hero",
    });
  });

  it("publishes separate client and authoritative allowlists", () => {
    expect(CLIENT_EVENT_NAMES).toEqual(expect.arrayContaining([
      "showcase_open",
      "shadcn_command_copy",
      "project_brief_generated",
      "project_brief_copy",
      "project_brief_download",
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

  it("limits project brief events to enums and aggregate counts", () => {
    expectTypeOf<EventProperties<"project_brief_generated">>().toEqualTypeOf<{
      slug: string;
      locale: "zh" | "en";
      project_type:
        | "landing"
        | "dashboard"
        | "app"
        | "portfolio"
        | "blog"
        | "commerce"
        | "other";
      stack_count: number;
      required_item_count: number;
      state_count: number;
      optional_field_count: number;
      completion_tier: "core" | "guided" | "complete";
      source: "style_detail";
    }>();
    expectTypeOf<EventProperties<"project_brief_copy">>()
      .toEqualTypeOf<EventProperties<"project_brief_generated">>();
    expectTypeOf<EventProperties<"project_brief_download">>()
      .toEqualTypeOf<EventProperties<"project_brief_generated">>();
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
