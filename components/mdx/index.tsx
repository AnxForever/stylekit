import * as React from "react";

import { Callout, type CalloutType } from "@/components/mdx/callout/callout";
import { Col, GraphCompare } from "@/components/mdx/graph-compare/graph-compare";
import { GraphDiff, Line } from "@/components/mdx/graph-diff/graph-diff";
import { Cell, Foot, GraphTable, Head, Row } from "@/components/mdx/graph-table/graph-table";
import { Footnotes } from "@/components/mdx/mdx-footnotes/mdx-footnotes";
import { Quote } from "@/components/mdx/quote/quote";
import { Step, Steps } from "@/components/mdx/steps/steps";
import { Terminal } from "@/components/mdx/terminal/terminal";
import {
  childNodes,
  childrenOf,
  dropLead,
  GRAPH_HOST_TAGS,
  isHost,
  takeText,
  textOf,
} from "@/components/mdx/graph-frame/graph-markdown";

/*
 * Markdown figures for the blog, ported from mdxcn (MIT).
 *
 * The components are framed on purpose: dashed rules, corner marks, one
 * accent. That is already this site's visual language, so the figures read
 * as part of the article instead of as an embedded widget library.
 *
 * The frames are client components: they pass `frame` down through React
 * context, and React context does not exist in the server runtime. The
 * source's `motion` scroll-in fade was dropped when porting, so they ship
 * markup with no animation runtime behind them.
 *
 * Props must be literal strings or booleans. next-mdx-remote runs
 * `removeJavaScriptExpressions` in RSC mode, which deletes every `prop={...}`
 * before render, so `<GraphCompare rows={[...]}>` silently loses its rows.
 * Pass data as children instead — that form also still reads correctly on
 * GitHub, where nothing is upgraded:
 *
 *   <GraphCompare columns="A B">
 *     <Row label="corner">rounded-3xl rounded-none</Row>
 *   </GraphCompare>
 *
 * Plain Markdown is upgraded in `withMdxcn`:
 *
 *   > [!WARNING]            -> <Callout type="warning">
 *   > quote … — Name, Where -> <Quote by="Name" source="Where">
 *   ```console              -> <Terminal>
 *   [^1] footnotes          -> <Footnotes>
 *
 * Each one still reads right on GitHub, where nothing is upgraded.
 */

type MdxComponents = { [key: string]: unknown };

type MdxcnOptions = {
  /** `> [!NOTE]`, `> [!WARNING]` … become Callout. Default true. */
  alerts?: boolean;
  /** A blockquote whose last line starts with `—` becomes Quote. Default true. */
  quotes?: boolean;
  /** ```console, or a shell fence with `$ ` lines, becomes Terminal. Default true. */
  terminals?: boolean;
  /** The GFM footnotes section gets a frame. Default true. */
  footnotes?: boolean;
};

type AnyProps = { children?: React.ReactNode; [key: string]: unknown };
type AnyElement = React.ElementType<AnyProps>;
type GraphHost = ((props: AnyProps) => React.ReactElement | null) & {
  graphHost?: string;
  displayName?: string;
};

/** GitHub alerts, plus the Obsidian names people already type. */
const ALERTS: Record<string, { type: CalloutType; title?: string }> = {
  note: { type: "note" },
  info: { type: "note", title: "info" },
  abstract: { type: "note", title: "summary" },
  summary: { type: "note", title: "summary" },
  question: { type: "note", title: "question" },
  tip: { type: "tip" },
  hint: { type: "tip", title: "hint" },
  success: { type: "tip", title: "success" },
  important: { type: "warning", title: "important" },
  warning: { type: "warning" },
  attention: { type: "warning", title: "attention" },
  caution: { type: "danger", title: "caution" },
  danger: { type: "danger" },
  error: { type: "danger", title: "error" },
  bug: { type: "danger", title: "bug" },
};

const ALERT = /^\s*\[!([a-z]+)\][+-]?[ \t]*([^\n]*)\n?\s*/i;
const BYLINE = /(?:^|\n)[ \t]*(?:—|―|–|--)[ \t]*([^\n]+)$/;
const SHELLS = ["sh", "bash", "shell", "zsh", "fish"];
const SESSIONS = ["console", "shell-session", "terminal"];
const PROMPTS = ["$", "%", "❯", ">"];

function blocksOf(children: React.ReactNode) {
  return childNodes(children);
}

function isParagraph(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node) && isHost(node, "p");
}

function withChildren(element: React.ReactElement, children: React.ReactNode) {
  return React.cloneElement(
    element as React.ReactElement<{ children?: React.ReactNode }>,
    undefined,
    children
  );
}

/** `> [!WARNING] Optional title` -> Callout, marker removed from the body. */
function alertOf(children: React.ReactNode) {
  const blocks = blocksOf(children);
  const at = blocks.findIndex(isParagraph);
  const first = blocks[at];
  if (!isParagraph(first)) {
    return null;
  }

  const { match, rest } = dropLead(childrenOf(first), ALERT);
  if (!match) {
    return null;
  }

  const kind = (match[1] ?? "note").toLowerCase();
  const known = ALERTS[kind];
  const title = (match[2] ?? "").trim() || known?.title || (known ? "" : kind);
  const body = [...blocks];
  if (textOf(rest).trim() === "") {
    body.splice(at, 1);
  } else {
    body[at] = withChildren(first, rest);
  }

  return {
    type: known?.type ?? "note",
    title: title || undefined,
    children: body,
  };
}

/** Last line `— Name, Where` -> Quote. The line can be its own paragraph. */
function quoteOf(children: React.ReactNode) {
  const blocks = blocksOf(children);
  const at = blocks.findLastIndex(isParagraph);
  const last = blocks[at];
  if (!isParagraph(last)) {
    return null;
  }

  const text = textOf(childrenOf(last));
  const match = text.match(BYLINE);
  if (!match || match.index == null) {
    return null;
  }

  const line = (match[1] ?? "").trim();
  const comma = line.indexOf(", ");
  const by = comma === -1 ? line : line.slice(0, comma);
  const source = comma === -1 ? undefined : line.slice(comma + 2);
  const body = blocks.slice(0, at);
  if (match.index > 0) {
    body.push(withChildren(last, takeText(childrenOf(last), match.index)));
  }

  if (!body.some((node) => textOf(node).trim() !== "")) {
    return null;
  }

  return { by, source, children: body };
}

function languageOf(pre: AnyProps): string {
  const marked = pre["data-language"];
  if (typeof marked === "string") {
    return marked.toLowerCase();
  }

  const code = blocksOf(pre.children).find(
    (node): node is React.ReactElement =>
      React.isValidElement(node) && isHost(node, "code")
  );
  const className = (code?.props as { className?: unknown } | undefined)
    ?.className;
  const match =
    typeof className === "string" ? className.match(/language-(\S+)/) : null;
  return (match?.[1] ?? "").toLowerCase();
}

/** A session fence -> Terminal. Plain shell scripts stay code. */
function sessionOf(pre: AnyProps) {
  const language = languageOf(pre);
  const text = textOf(pre.children).replace(/\n$/, "");
  const lines = text.split("\n");
  const prompt =
    PROMPTS.map((mark) => ({
      mark,
      count: lines.filter((line) => line.startsWith(`${mark} `)).length,
    })).sort((a, b) => b.count - a.count)[0] ?? null;

  if (SESSIONS.includes(language)) {
    return { prompt: prompt?.count ? prompt.mark : "$", text };
  }

  if (SHELLS.includes(language) && prompt?.count && prompt.mark === "$") {
    return { prompt: "$", text };
  }

  return null;
}

/** `li: ListItem` still reads as an `li` to the parent graph. */
function markHost(tag: string, Component: AnyElement): GraphHost {
  const Host = ((props: AnyProps) =>
    React.createElement(Component, {
      ...props,
      "data-graph-host": tag,
    })) as GraphHost;
  Host.graphHost = tag;
  Host.displayName = `Host(${tag})`;
  return Host;
}

function isMarked(value: unknown) {
  return (
    typeof value === "function" &&
    typeof (value as { graphHost?: unknown }).graphHost === "string"
  );
}

/**
 * Wrap your MDX components. Marks any tag you override so the graphs can
 * still read it, and upgrades plain Markdown into frames.
 *
 * ```tsx
 * const components = withMdxcn({ ...mdxcnComponents, Callout });
 * <MDXRemote source={post.content} components={components} />
 * ```
 */
function withMdxcn<T extends MdxComponents>(
  components: T = {} as T,
  {
    alerts = true,
    quotes = true,
    terminals = true,
    footnotes = true,
  }: MdxcnOptions = {}
): T {
  const out: MdxComponents = { ...components };

  for (const tag of GRAPH_HOST_TAGS) {
    const value = components[tag];
    if (value != null && !isMarked(value)) {
      out[tag] = markHost(tag, value as AnyElement);
    }
  }

  const Blockquote = (out.blockquote ?? "blockquote") as AnyElement;
  const Pre = (out.pre ?? "pre") as AnyElement;
  const Section = (out.section ?? "section") as AnyElement;

  if (alerts || quotes) {
    const MdxBlockquote = ((props: AnyProps) => {
      const alert = alerts ? alertOf(props.children) : null;
      if (alert) {
        return <Callout {...alert} />;
      }
      const quote = quotes ? quoteOf(props.children) : null;
      if (quote) {
        return <Quote {...quote} />;
      }
      return <Blockquote {...props} />;
    }) as GraphHost;
    MdxBlockquote.graphHost = "blockquote";
    out.blockquote = MdxBlockquote;
  }

  if (terminals) {
    const MdxPre = ((props: AnyProps) => {
      const session = sessionOf(props);
      if (session) {
        return <Terminal prompt={session.prompt}>{session.text}</Terminal>;
      }
      return <Pre {...props} />;
    }) as GraphHost;
    MdxPre.graphHost = "pre";
    out.pre = MdxPre;
  }

  if (footnotes) {
    const MdxSection = ((props: AnyProps) => {
      if (props["data-footnotes"] != null) {
        return <Footnotes>{props.children}</Footnotes>;
      }
      return <Section {...props} />;
    }) as GraphHost;
    out.section = MdxSection;
  }

  return out as T;
}

/**
 * The figures an author can write directly in MDX. `Row`, `Cell`, `Head` and
 * `Foot` are data-only markers: the table and compare parents read their
 * props, so one registration serves both.
 */
const mdxcnComponents = {
  Callout,
  Cell,
  Col,
  Foot,
  GraphCompare,
  GraphDiff,
  GraphTable,
  Head,
  Line,
  Quote,
  Row,
  Step,
  Steps,
  Terminal,
};

export { mdxcnComponents, withMdxcn };
export type { MdxcnOptions };
