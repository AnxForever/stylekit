import type { ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/translations";

// Ordered alternation, matched left-to-right with one global regex. Leftmost
// match wins; ties at the same index are broken by this order:
//  1 cmd  — an `npx …` command, captured to the end of its clause. Only `npx`
//           (not bare npm/pnpm/yarn) so prose like "npm SDK" / "npm 包" isn't
//           miscaptured. Eats any URL inside the command so the whole thing
//           renders as one non-clickable <code> block (its <style> placeholder
//           must never become a broken link).
//  2 url  — a bare http(s) URL. If it contains a <…> placeholder it renders as
//           code instead of a link.
//  3 path — a site-internal path like /developers (the lookbehind excludes
//           intra-word slashes such as light/dark).
//  4 pkg  — one of the three published stylekit-* npm packages (an explicit
//           allowlist, so non-packages like `stylekit-contributor` stay plain).
//
// Known limitation: a command is captured from `npx` to the clause boundary
// (double space, en/em dash, CJK punctuation, or end). This matches the author
// convention of placing commands last after an em-dash; current data is clean.
const TOKEN_RE = new RegExp(
  [
    "(?<cmd>npx\\s+\\S[^—–\\n]*?(?=\\s{2,}|\\s[—–]\\s|[，。；]|$))",
    "(?<url>https?:\\/\\/[^\\s)]+)",
    "(?<path>(?<![\\w\\/])\\/[a-z][\\w-]*(?:\\/[\\w-]+)*)",
    "(?<pkg>\\bstylekit-(?:mcp|cli|core)\\b)",
  ].join("|"),
  "g",
);

const LINK_CLASS =
  "text-accent underline underline-offset-2 hover:text-foreground transition-colors";
const CODE_CLASS =
  "font-mono text-[0.85em] rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground/90 break-all";

/**
 * Render a changelog description string into React nodes, turning URLs,
 * site-internal paths, and known npm package names into links, and shell
 * commands / placeholder URLs into non-clickable inline code.
 *
 * Pure and locale-aware. Pass the already locale-resolved string (the caller
 * picks description vs descriptionZh first), and the active locale for building
 * internal hrefs. React escapes the string content, so this is XSS-safe.
 */
export function linkify(text: string, locale: Locale): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  TOKEN_RE.lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = TOKEN_RE.exec(text)) !== null) {
    const matched = match[0];
    const start = match.index;
    if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

    const groups = match.groups ?? {};
    if (groups.cmd != null) {
      nodes.push(
        <code key={key++} className={CODE_CLASS}>
          {matched}
        </code>,
      );
    } else if (groups.url != null) {
      // Trim trailing sentence punctuation that isn't part of the URL.
      const url = matched.replace(/[.,;:!?]+$/, "");
      if (url.includes("<") || url.includes(">")) {
        nodes.push(
          <code key={key++} className={CODE_CLASS}>
            {url}
          </code>,
        );
      } else {
        nodes.push(
          <a
            key={key++}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            {url}
          </a>,
        );
      }
      if (url.length < matched.length) nodes.push(matched.slice(url.length));
    } else if (groups.path != null) {
      nodes.push(
        <Link key={key++} href={`/${locale}${matched}`} className={LINK_CLASS}>
          {matched}
        </Link>,
      );
    } else if (groups.pkg != null) {
      nodes.push(
        <a
          key={key++}
          href={`https://www.npmjs.com/package/${matched}`}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {matched}
        </a>,
      );
    }

    lastIndex = start + matched.length;
    if (matched.length === 0) TOKEN_RE.lastIndex++;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
