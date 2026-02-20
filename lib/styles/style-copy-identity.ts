interface StyleCopyIdentityInput {
  styleName: string;
  styleSlug: string;
}

export function buildStyleCopyIdentity({
  styleName,
  styleSlug,
}: StyleCopyIdentityInput): string {
  return [
    "STYLEKIT_STYLE_REFERENCE",
    `style_name: ${styleName}`,
    `style_slug: ${styleSlug}`,
    `style_source: /styles/${styleSlug}`,
  ].join("\n");
}
