/**
 * Shared analytics event vocabulary.
 *
 * Keep this module free of browser and provider imports so API routes, payment
 * webhooks, and install verifiers can safely reuse the allowlists and types.
 */

type StyleViewProps = { slug: string; source: string };
type StyleExportProps = { slug: string; format: string };
type CodeCopyProps = {
  /** Null means that the copied block was not associated with a style. Never use sentinel slugs. */
  slug: string | null;
  language: string;
};
type AnimationViewProps = { slug: string; source: string };
type TemplateViewProps = { slug: string; source: string };
type NewsletterSubscribeProps = { source: string };
type CtaClickProps = { label: string; location: string };
type SearchProps = {
  query_present: true;
  query_length: number;
  results_count: number;
};
type GithubClickProps = { location: string };
type ShowcaseOpenProps = {
  slug: string;
  source: "hero" | "preview_card";
};
type ShadcnCommandCopyProps = {
  slug: string;
  source: "style_use_panel";
};
type ProjectBriefEventProps = {
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
};

type PackFunnelSource =
  | "style_detail"
  | "showcase"
  | "catalog"
  | "home"
  | "direct"
  | "campaign";
type CurrencyCode = "CNY" | "USD";
type PackExperimentProps = {
  experiment_id: string;
  offer_version: string;
  variant_id: string;
  pack_id: string;
  pack_version: string;
  offer_id: string;
  source: PackFunnelSource;
  /** Time the complete offer region met the experiment's visibility threshold. */
  visibility_ms: number;
  /** Visible proportion in basis points, where 10_000 means 100%. */
  visible_ratio_bps: number;
};
type PackOfferProps = PackExperimentProps;
type PackPriceProps = PackOfferProps & {
  price_id: string;
  currency: CurrencyCode;
  /** Displayed price in the currency's smallest unit, for example fen or cents. */
  amount_minor: number;
};
type PackPurchaseIntentProps = PackPriceProps & {
  intent: "buy_now" | "preorder" | "deposit" | "contact_sales";
  verification_method: "authenticated_account" | "verified_email" | "manual_interview";
};
type PackCheckoutStartProps = PackPriceProps & {
  checkout_session_id: string;
  checkout_provider:
    | "manual"
    | "stripe"
    | "lemonsqueezy"
    | "paddle"
    | "wechat_pay"
    | "alipay";
};
type CatalogImpressionProps = {
  slug: string;
  /** One-based position within the rendered result list. */
  rank: number;
  surface: "styles_catalog" | "home" | "collection" | "search" | "related_styles";
  page: number;
  sort: string | null;
  collection_slug: string | null;
  filter_count: number;
  /** Records search context without collecting the potentially sensitive raw query. */
  query_present: boolean;
};

interface ClientEventMap {
  style_view: StyleViewProps;
  style_export: StyleExportProps;
  code_copy: CodeCopyProps;
  animation_view: AnimationViewProps;
  template_view: TemplateViewProps;
  newsletter_subscribe: NewsletterSubscribeProps;
  cta_click: CtaClickProps;
  search: SearchProps;
  github_click: GithubClickProps;
  showcase_open: ShowcaseOpenProps;
  shadcn_command_copy: ShadcnCommandCopyProps;
  project_brief_generated: ProjectBriefEventProps;
  project_brief_copy: ProjectBriefEventProps;
  project_brief_download: ProjectBriefEventProps;
  pack_offer_view: PackOfferProps;
  pack_price_view: PackPriceProps;
  catalog_impression: CatalogImpressionProps;
}

type PackPurchaseProps = Omit<PackCheckoutStartProps, "source"> & {
  /** Opaque deduplication reference; never put customer data in this field. */
  purchase_id: string;
  purchase_kind: "full" | "preorder" | "deposit";
  payment_provider:
    | "manual"
    | "stripe"
    | "lemonsqueezy"
    | "paddle"
    | "wechat_pay"
    | "alipay";
  verification_level: "payment_provider" | "manual_reconciled";
};
type PackRefundProps = Pick<
  PackPurchaseProps,
  | "experiment_id"
  | "offer_version"
  | "variant_id"
  | "pack_id"
  | "pack_version"
  | "offer_id"
  | "price_id"
  | "currency"
  | "purchase_id"
  | "payment_provider"
> & {
  /** Opaque provider or reconciliation reference. */
  refund_id: string;
  amount_minor: number;
  refund_kind: "full" | "partial";
  verification_level: "payment_provider" | "manual_reconciled";
};
type PackInstallSuccessProps = {
  pack_id: string;
  pack_version: string;
  /** Opaque deduplication reference; never put customer or project names in this field. */
  install_id: string;
  delivery: "web" | "registry" | "cli" | "mcp" | "skill";
  install_context: "clean_project" | "existing_project";
  target_framework: "nextjs" | "react";
  package_manager: "pnpm" | "npm" | "yarn" | "bun";
  duration_ms: number;
  verification_level:
    | "automated_smoke_test"
    | "support_verified"
    | "customer_self_reported";
};

interface AuthoritativeEventMap {
  /** Must be emitted only after the server verifies identity, price, and accepted terms. */
  pack_purchase_intent: PackPurchaseIntentProps;
  /** Must be emitted only after a real checkout or deposit session is created. */
  pack_checkout_start: PackCheckoutStartProps;
  /** Must be emitted only after payment-provider or manual reconciliation. */
  pack_purchase: PackPurchaseProps;
  /** Must be emitted only after payment-provider or manual reconciliation. */
  pack_refund: PackRefundProps;
  /** Must be emitted by an install verifier or explicitly marked self-report, never inferred from a click. */
  pack_install_success: PackInstallSuccessProps;
}

export const CLIENT_EVENT_NAMES = [
  "style_view",
  "style_export",
  "code_copy",
  "animation_view",
  "template_view",
  "newsletter_subscribe",
  "cta_click",
  "search",
  "github_click",
  "showcase_open",
  "shadcn_command_copy",
  "project_brief_generated",
  "project_brief_copy",
  "project_brief_download",
  "pack_offer_view",
  "pack_price_view",
  "catalog_impression",
] as const satisfies readonly (keyof ClientEventMap)[];

export const AUTHORITATIVE_EVENT_NAMES = [
  "pack_purchase_intent",
  "pack_checkout_start",
  "pack_purchase",
  "pack_refund",
  "pack_install_success",
] as const satisfies readonly (keyof AuthoritativeEventMap)[];

export const ANALYTICS_EVENT_NAMES = [
  ...CLIENT_EVENT_NAMES,
  ...AUTHORITATIVE_EVENT_NAMES,
] as const;

export type ClientEventName = keyof ClientEventMap;
export type AuthoritativeEventName = keyof AuthoritativeEventMap;
export type AnalyticsEventName = ClientEventName | AuthoritativeEventName;
/** Backwards-compatible alias for events accepted by the browser tracker. */
export type EventName = ClientEventName;
export type EventProperties<T extends AnalyticsEventName> =
  T extends ClientEventName
    ? ClientEventMap[T]
    : T extends AuthoritativeEventName
      ? AuthoritativeEventMap[T]
      : never;

export interface PageViewPayload {
  path: string;
  hostname: string;
  referrerDomain: string | null;
  referrerType: "direct" | "search" | "social" | "external" | "internal";
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}
