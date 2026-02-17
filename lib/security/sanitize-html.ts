const DANGEROUS_TAG_RE =
  /<(script|iframe|object|embed|link|meta|base)\b[^>]*>[\s\S]*?<\/\1\s*>|<(script|iframe|object|embed|link|meta|base)\b[^>]*\/?>/gi;
const EVENT_HANDLER_ATTR_RE = /\son[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi;
const URL_ATTR_RE = /\s(href|src|xlink:href)\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi;

export function sanitizePreviewHtml(html: string): string {
  if (!html) return "";

  const withoutDangerousTags = html.replace(DANGEROUS_TAG_RE, "");
  const withoutEventHandlers = withoutDangerousTags.replace(EVENT_HANDLER_ATTR_RE, "");

  return withoutEventHandlers.replace(
    URL_ATTR_RE,
    (fullMatch, attrName: string, rawValue: string) => {
      const normalized = stripWrappingQuotes(rawValue).trim().toLowerCase();
      if (normalized.startsWith("javascript:")) {
        return ` ${attrName}="#"`;
      }
      return fullMatch;
    }
  );
}

function stripWrappingQuotes(value: string): string {
  if (value.length < 2) return value;
  const first = value[0];
  const last = value[value.length - 1];
  if ((first === "'" || first === "\"") && first === last) {
    return value.slice(1, -1);
  }
  return value;
}
