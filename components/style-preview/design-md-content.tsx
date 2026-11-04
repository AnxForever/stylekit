import { Fragment, type ReactNode } from "react";
import {
  parseDesignMarkdown,
  parseInline,
  type MdBlock,
  type MdInline,
} from "@/lib/design-spec/parse-markdown";

function Inline({ tokens }: { tokens: MdInline[] }): ReactNode {
  return tokens.map((token, index) => {
    if (token.type === "code") {
      return (
        <code
          key={index}
          className="bg-foreground/[0.06] px-1 py-0.5 font-mono text-[0.92em] text-foreground"
        >
          {token.value}
        </code>
      );
    }

    if (token.type === "strong") {
      return (
        <strong key={index} className="font-semibold text-foreground">
          <Inline tokens={token.children} />
        </strong>
      );
    }

    return <Fragment key={index}>{token.value}</Fragment>;
  });
}

function Heading({ level, text }: { level: number; text: string }) {
  const content = <Inline tokens={parseInline(text)} />;

  // The section above this document already owns an h2, so the document's own
  // outline starts at h3. Keeping the nesting honest matters to screen readers.
  if (level === 1) {
    return <h3 className="text-lg md:text-xl">{content}</h3>;
  }
  if (level === 2) {
    return (
      <h4 className="border-b border-border pb-1.5 text-base md:text-lg">{content}</h4>
    );
  }
  if (level === 3) {
    return <h5 className="text-sm font-medium tracking-wide">{content}</h5>;
  }
  return (
    <h6 className="text-xs uppercase tracking-widest text-muted">{content}</h6>
  );
}

function Block({ block }: { block: MdBlock }) {
  switch (block.type) {
    case "heading":
      return <Heading level={block.level} text={block.text} />;

    case "paragraph":
      return (
        <p className="text-sm leading-6 text-foreground/85">
          <Inline tokens={parseInline(block.text)} />
        </p>
      );

    case "blockquote":
      return (
        <blockquote className="border-l-2 border-foreground/25 pl-4 text-sm leading-6 text-muted">
          <Inline tokens={parseInline(block.text)} />
        </blockquote>
      );

    case "list":
      if (block.ordered) {
        return (
          <ol className="list-decimal space-y-1 pl-5 text-sm leading-6 text-foreground/85">
            {block.items.map((item, index) => (
              <li key={index}>
                <Inline tokens={parseInline(item)} />
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-foreground/85">
          {block.items.map((item, index) => (
            <li key={index}>
              <Inline tokens={parseInline(item)} />
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <pre
          tabIndex={0}
          className="overflow-auto border border-border bg-foreground/[0.025] p-4 font-mono text-[12.5px] leading-6 text-foreground/90"
        >
          <code>{block.code}</code>
        </pre>
      );

    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-xs leading-5">
            <thead>
              <tr>
                {block.headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="border-b border-border py-2 pr-4 font-medium whitespace-nowrap text-foreground"
                  >
                    <Inline tokens={parseInline(header)} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border-b border-border/60 py-2 pr-4 align-top text-foreground/85"
                    >
                      <Inline tokens={parseInline(cell)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "rule":
      return <hr className="border-border" />;
  }
}

export function DesignMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseDesignMarkdown(markdown);
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
