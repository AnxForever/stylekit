"use client";

import type { ReactNode } from "react"
import {
  Graph,
  GraphBody,
  textOf,
  type GraphFrame,
} from "@/components/mdx/graph-frame/graph-frame"
import { cn } from "@/lib/utils"

type TerminalProps = {
  title?: string
  /** The prompt glyph that marks a command line. Default `$`. */
  prompt?: string
  /** Plain lines, or a fenced code block. `$ cmd` is a command, `# …` a comment. */
  children?: ReactNode
  corner?: string
  frame?: GraphFrame
  className?: string
}

type Line =
  | { kind: "command"; text: string }
  | { kind: "comment"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "output"; text: string }

function parse(source: string, prompt: string): Line[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n")

  while (lines.length > 0 && lines[0]?.trim() === "") {
    lines.shift()
  }

  while (lines.length > 0 && lines[lines.length - 1]?.trim() === "") {
    lines.pop()
  }

  return lines.map((raw) => {
    const text = raw.replace(/\s+$/, "")

    if (text.startsWith(`${prompt} `) || text === prompt) {
      return { kind: "command", text: text.slice(prompt.length).trimStart() }
    }

    if (text.startsWith("#")) {
      return { kind: "comment", text }
    }

    // A success line starts with a check mark. The glyph is written as an
    // escape so this file stays ASCII, matching the project's no-emoji rule
    // (the repo writes check marks that way everywhere else too).
    if (/^[\u2713\u2714]/.test(text)) {
      return { kind: "ok", text }
    }

    return { kind: "output", text }
  })
}

/**
 * A shell session.
 *
 * ````mdx
 * <Terminal title="SHELL">
 * ```
 * $ pnpm dlx shadcn@latest add @mdxcn/all
 * ```
 * </Terminal>
 * ````
 *
 * A line starting with a check mark is treated as a success line and drawn in
 * the accent colour.
 */
function Terminal({
  title = "shell",
  prompt = "$",
  children,
  corner,
  frame,
  className,
}: TerminalProps) {
  const lines = parse(textOf(children), prompt)

  return (
    <Graph className={className} corner={corner} frame={frame} title={title}>
      <GraphBody className="overflow-x-auto overflow-y-hidden">
        <pre
          className="m-0 flex min-w-max flex-col gap-0.5 leading-relaxed whitespace-pre"
        >
          {lines.map((line, index) => (
            <code
              className={cn(
                "grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2",
                line.kind === "command" && "text-foreground",
                line.kind === "comment" && "text-graph-muted",
                line.kind === "ok" && "text-graph-accent",
                line.kind === "output" && "text-graph-muted"
              )}
              key={`${index}-${line.text}`}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "text-center select-none",
                  line.kind === "command"
                    ? "text-graph-accent"
                    : "text-transparent"
                )}
              >
                {line.kind === "command" ? prompt : " "}
              </span>
              <span>{line.text || " "}</span>
            </code>
          ))}
        </pre>
      </GraphBody>
    </Graph>
  )
}

export { Terminal }
export type { TerminalProps }
