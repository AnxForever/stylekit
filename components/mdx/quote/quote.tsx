"use client";

import type { ReactNode } from "react"
import {
  Graph,
  GraphBody,
  GraphProse,
  GraphRule,
  type GraphFrame,
} from "@/components/mdx/graph-frame/graph-frame"

type QuoteProps = {
  /** Who said it. Drawn after an em dash. */
  by?: string
  /** Where. Book, talk, thread. Muted, after the name. */
  source?: string
  /** Optional frame title. Off by default so the quote is the frame. */
  title?: string
  /** Markdown. The quote itself. */
  children?: ReactNode
  corner?: string
  frame?: GraphFrame
  className?: string
}

/**
 * A pull quote.
 *
 * ```mdx
 * <Quote by="Paul Graham" source="Taste for Makers">
 *   A thousand barely audible voices all singing in tune.
 * </Quote>
 * ```
 */
function Quote({
  by,
  source,
  title,
  children,
  corner,
  frame,
  className,
}: QuoteProps) {
  const cite = by || source

  return (
    <Graph className={className} corner={corner} frame={frame} title={title}>
      <GraphBody>
        <blockquote
          className="m-0 flex flex-col gap-5 p-0"
        >
          <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-3">
            <span
              aria-hidden="true"
              className="text-center text-base leading-relaxed text-graph-accent select-none sm:text-lg"
            >
              “
            </span>
            <GraphProse className="text-base leading-relaxed text-foreground sm:text-lg">
              {children}
            </GraphProse>
          </div>
          {cite ? (
            <>
              <GraphRule />
              <footer className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3">
                <span aria-hidden="true" className="text-center select-none">
                  —
                </span>
                <span className="flex min-w-0 flex-wrap gap-x-2">
                  {by ? (
                    <cite className="text-foreground not-italic">{by}</cite>
                  ) : null}
                  {source ? (
                    <span className="text-graph-muted">{source}</span>
                  ) : null}
                </span>
              </footer>
            </>
          ) : null}
        </blockquote>
      </GraphBody>
    </Graph>
  )
}

export { Quote }
export type { QuoteProps }
