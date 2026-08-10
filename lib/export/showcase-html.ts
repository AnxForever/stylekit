const DOWNLOAD_REVEAL_STYLE =
  "[style*=\"translateY(32px)\"]{opacity:1!important;transform:translateY(0)!important;transition:none!important}";

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Turns a live Showcase document into a portable, non-hydrating HTML snapshot.
 * Reveal blocks start hidden until IntersectionObserver runs, so downloaded
 * files need a small CSS override after their scripts are removed.
 */
export function prepareShowcaseSnapshot(html: string, baseHref: string): string {
  const downloadHead =
    `<base href="${escapeAttribute(baseHref)}">` +
    `<style data-stylekit-showcase-download>${DOWNLOAD_REVEAL_STYLE}</style>`;
  const withHead = html.replace(/<head>/i, `<head>${downloadHead}`);

  return withHead
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\s+rel=["']modulepreload["'][^>]*>/gi, "");
}
