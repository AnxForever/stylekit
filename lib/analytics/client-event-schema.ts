import { z } from "zod";
import {
  CLIENT_EVENT_NAMES,
  type ClientEventName,
} from "@/lib/analytics/event-contract";

const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(96)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const shortStringSchema = z.string().trim().min(1).max(160);
const opaqueIdSchema = z
  .string()
  .trim()
  .min(1)
  .max(160)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._:-]*$/);
const nonNegativeIntegerSchema = z.number().int().nonnegative().max(1_000_000_000_000);
const utmShape = {
  utm_source: z.string().max(160).optional(),
  utm_medium: z.string().max(160).optional(),
  utm_campaign: z.string().max(160).optional(),
  utm_content: z.string().max(160).optional(),
  utm_term: z.string().max(160).optional(),
};

function eventDataSchema<T extends z.ZodRawShape>(shape: T) {
  return z.object({ ...shape, ...utmShape }).strict();
}

const packFunnelSourceSchema = z.enum([
  "style_detail",
  "showcase",
  "catalog",
  "home",
  "direct",
  "campaign",
]);
const packExperimentShape = {
  experiment_id: opaqueIdSchema,
  offer_version: opaqueIdSchema,
  variant_id: opaqueIdSchema,
  pack_id: slugSchema,
  pack_version: shortStringSchema,
  offer_id: opaqueIdSchema,
  source: packFunnelSourceSchema,
  visibility_ms: z.number().int().positive().max(60 * 60 * 1000),
  visible_ratio_bps: z.number().int().min(1).max(10_000),
};
const packPriceShape = {
  ...packExperimentShape,
  price_id: opaqueIdSchema,
  currency: z.enum(["CNY", "USD"]),
  amount_minor: nonNegativeIntegerSchema,
};

const clientEventDataSchemas = {
  style_view: eventDataSchema({ slug: slugSchema, source: shortStringSchema }),
  style_export: eventDataSchema({ slug: slugSchema, format: shortStringSchema }),
  code_copy: eventDataSchema({
    slug: slugSchema.nullable(),
    language: shortStringSchema,
  }),
  animation_view: eventDataSchema({ slug: slugSchema, source: shortStringSchema }),
  template_view: eventDataSchema({ slug: slugSchema, source: shortStringSchema }),
  newsletter_subscribe: eventDataSchema({ source: shortStringSchema }),
  cta_click: eventDataSchema({
    label: shortStringSchema,
    location: shortStringSchema,
  }),
  search: eventDataSchema({
    query_present: z.literal(true),
    query_length: z.number().int().min(1).max(10_000),
    results_count: z.number().int().nonnegative().max(100_000),
  }),
  github_click: eventDataSchema({ location: shortStringSchema }),
  showcase_open: eventDataSchema({
    slug: slugSchema,
    source: z.enum(["hero", "preview_card"]),
  }),
  shadcn_command_copy: eventDataSchema({
    slug: slugSchema,
    source: z.literal("style_use_panel"),
  }),
  pack_offer_view: eventDataSchema(packExperimentShape),
  pack_price_view: eventDataSchema(packPriceShape),
  catalog_impression: eventDataSchema({
    slug: slugSchema,
    rank: z.number().int().positive().max(10_000),
    surface: z.enum([
      "styles_catalog",
      "home",
      "collection",
      "search",
      "related_styles",
    ]),
    page: z.number().int().positive().max(10_000),
    sort: z.string().trim().min(1).max(80).nullable(),
    collection_slug: slugSchema.nullable(),
    filter_count: z.number().int().nonnegative().max(100),
    query_present: z.boolean(),
  }),
} satisfies Record<ClientEventName, z.ZodType>;

const pageViewDataSchema = z
  .object({
    path: z.string().min(1).max(2_048).startsWith("/"),
    hostname: z.string().trim().min(1).max(253),
    referrerDomain: z.string().trim().min(1).max(253).nullable(),
    referrerType: z.enum(["direct", "search", "social", "external", "internal"]),
    ...utmShape,
  })
  .strict();

const sessionIdSchema = z
  .string()
  .max(128)
  .regex(
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|sess_[a-z0-9]{10,80})$/i,
  )
  .nullable();

const envelopeSchema = z
  .object({
    eventType: z.string().min(1).max(80),
    eventData: z.unknown(),
    sessionId: sessionIdSchema.optional().default(null),
  })
  .strict();

export type PublicAnalyticsEventName = ClientEventName | "page_view";

export type ParsedClientAnalyticsPayload = {
  eventType: PublicAnalyticsEventName;
  eventData: Record<string, string | number | boolean | null>;
  sessionId: string | null;
};

const publicEventNames = new Set<string>([...CLIENT_EVENT_NAMES, "page_view"]);

export function parseClientAnalyticsPayload(
  input: unknown,
): { success: true; data: ParsedClientAnalyticsPayload } | { success: false } {
  const envelope = envelopeSchema.safeParse(input);
  if (!envelope.success || !publicEventNames.has(envelope.data.eventType)) {
    return { success: false };
  }

  const eventType = envelope.data.eventType as PublicAnalyticsEventName;
  const schema =
    eventType === "page_view"
      ? pageViewDataSchema
      : clientEventDataSchemas[eventType];
  const eventData = schema.safeParse(envelope.data.eventData);
  if (!eventData.success) {
    return { success: false };
  }

  return {
    success: true,
    data: {
      eventType,
      eventData: eventData.data as Record<string, string | number | boolean | null>,
      sessionId: envelope.data.sessionId,
    },
  };
}

export function readEventStyleSlug(
  eventType: PublicAnalyticsEventName,
  eventData: Record<string, unknown>,
): string | null {
  if (
    eventType === "style_view" ||
    eventType === "style_export" ||
    eventType === "code_copy" ||
    eventType === "showcase_open" ||
    eventType === "shadcn_command_copy" ||
    eventType === "catalog_impression"
  ) {
    const slug = eventData.slug;
    return typeof slug === "string" ? slug : null;
  }

  return null;
}
