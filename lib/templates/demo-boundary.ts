import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";
import { templateCatalog, type TemplateCatalogEntry } from "@/lib/templates/catalog";

export const TEMPLATE_DEMO_BOUNDARY = {
  en: {
    titleSuffix: "Template Demo",
    label: "Template demo",
    notice:
      "This page previews a page template. Names, plans, prices, trials, payment and refund terms, metrics, testimonials, and contact details shown here are sample content, not StyleKit services, prices, or guarantees.",
    metadata:
      "Template preview. Example business, pricing, billing, and service details are not StyleKit offers.",
    machineReadable:
      "StyleKit page templates are downloadable examples. Business names, plans, prices, trials, payment and refund terms, metrics, testimonials, and contact details shown inside a template are illustrative sample content; they do not describe StyleKit's own services, prices, guarantees, or payment capabilities.",
  },
  zh: {
    titleSuffix: "模板演示",
    label: "模板演示",
    notice:
      "本页用于预览页面模板。页面中的产品名称、套餐、价格、试用、付款与退款规则、指标、客户评价和联系信息均为示例内容，不代表 StyleKit 的真实服务、价格或承诺。",
    metadata:
      "页面模板预览：业务名称、套餐、价格、试用和支付信息均为示例，不代表 StyleKit 的真实服务或定价。",
    machineReadable:
      "StyleKit 页面模板可作为示例项目下载。模板中的业务名称、套餐、价格、试用、付款与退款规则、指标、客户评价和联系信息均为示例内容，不代表 StyleKit 的真实服务、价格、承诺或支付能力。",
  },
} as const;

export function findTemplateEntryForPath(
  contentPath: string
): TemplateCatalogEntry | undefined {
  return templateCatalog
    .filter(
      (template) =>
        !template.external &&
        (contentPath === template.href || contentPath.startsWith(`${template.href}/`))
    )
    .sort((left, right) => right.href.length - left.href.length)[0];
}

export function addTemplateDemoBoundary(
  metadata: Metadata,
  locale: Locale
): Metadata {
  const boundary = TEMPLATE_DEMO_BOUNDARY[locale];
  const titleSuffix = boundary.titleSuffix;
  const title = addMetadataTitleSuffix(metadata.title, titleSuffix);
  const description = typeof metadata.description === "string"
    ? metadata.description
    : "";
  const openGraphTitle = typeof metadata.openGraph?.title === "string"
    ? `${metadata.openGraph.title} — ${titleSuffix}`
    : metadata.openGraph?.title;
  const twitterTitle = typeof metadata.twitter?.title === "string"
    ? `${metadata.twitter.title} — ${titleSuffix}`
    : metadata.twitter?.title;
  const openGraphDescription =
    typeof metadata.openGraph?.description === "string"
      ? metadata.openGraph.description
      : description;
  const twitterDescription =
    typeof metadata.twitter?.description === "string"
      ? metadata.twitter.description
      : description;

  return {
    ...metadata,
    ...(title !== undefined ? { title } : {}),
    description: `${boundary.metadata} ${description}`.trim(),
    openGraph: {
      ...metadata.openGraph,
      ...(openGraphTitle !== undefined ? { title: openGraphTitle } : {}),
      description: `${boundary.metadata} ${openGraphDescription}`.trim(),
    },
    twitter: {
      ...metadata.twitter,
      ...(twitterTitle !== undefined ? { title: twitterTitle } : {}),
      description: `${boundary.metadata} ${twitterDescription}`.trim(),
    },
  };
}

function addMetadataTitleSuffix(
  title: Metadata["title"],
  suffix: string
): Metadata["title"] {
  if (typeof title === "string") return `${title} — ${suffix}`;
  if (!title || typeof title !== "object") return title;

  return {
    ...title,
    ...("default" in title && typeof title.default === "string"
      ? { default: `${title.default} — ${suffix}` }
      : {}),
    ...("absolute" in title && typeof title.absolute === "string"
      ? { absolute: `${title.absolute} — ${suffix}` }
      : {}),
  } as Metadata["title"];
}

export function templateDemoBoundaryMarkdown(locale: Locale = "en"): string {
  return `## Product Boundaries\n\n- ${TEMPLATE_DEMO_BOUNDARY[locale].machineReadable}\n`;
}