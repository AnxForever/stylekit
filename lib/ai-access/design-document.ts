import { createHash } from "node:crypto";
import { renderDesignMd } from "@/lib/design-spec";
import { getDesignSpec } from "@/lib/design-spec/registry";
import type { SpecLocale } from "@/lib/design-spec/types";
import { getSiteBaseUrl } from "@/lib/site-url";

export interface StyleDesignDocument {
  schemaVersion: "stylekit-design-document-v1";
  fileName: "design.md";
  locale: SpecLocale;
  contentType: "text/markdown";
  url: string;
  contentHash: string;
  content: string;
}

/** Returns the canonical complete document, or no extension when the style has no spec. */
export function getStyleDesignDocument(
  slug: string,
  locale: SpecLocale = "en",
): StyleDesignDocument | null {
  const spec = getDesignSpec(slug);
  if (!spec) return null;

  const encodedSlug = encodeURIComponent(slug);
  const url = new URL(
    `/api/design/${encodedSlug}/design.md?locale=${locale}`,
    getSiteBaseUrl(),
  ).toString();
  const content = renderDesignMd(spec, { locale });

  return {
    schemaVersion: "stylekit-design-document-v1",
    fileName: "design.md",
    locale,
    contentType: "text/markdown",
    url,
    contentHash: createHash("sha256").update(content, "utf8").digest("hex"),
    content,
  };
}
