"use client";

import type { ReactNode } from "react"
import {
  childrenOf,
  elementsOf,
  Graph,
  GraphBody,
  GraphProse,
  isHost,
  listItems,
  textOf,
  type GraphFrame,
} from "@/components/mdx/graph-frame/graph-frame"

type FootnotesProps = {
  /** Defaults to the hidden GFM heading, lowercased: `footnotes`. */
  title?: string
  /** The GFM footnotes section: a hidden `h2` and an `ol`. */
  children?: ReactNode
  corner?: string
  frame?: GraphFrame
  className?: string
}

/**
 * The footnotes section `remark-gfm` writes at the end of a page, framed.
 * `withMdxcn` swaps it in for `<section data-footnotes>`. The hidden heading
 * and the `fn-*` ids stay, so `[^1]` links still jump here and back.
 */
function Footnotes({
  title,
  children,
  corner,
  frame,
  className,
}: FootnotesProps) {
  const heading = elementsOf(children).find((element) =>
    isHost(element, ["h2", "h3"])
  )
  const notes = listItems(
    elementsOf(children).filter((element) => isHost(element, ["ol", "ul"]))
  )
  const digits = Math.max(2, String(notes.length).length)

  return (
    <Graph
      className={className}
      corner={corner}
      frame={frame}
      title={title ?? (textOf(heading).trim().toLowerCase() || "footnotes")}
    >
      <GraphBody>
        {heading}
        <ol
          className="flex flex-col gap-3"
          role="list"
        >
          {notes.map((note, index) => {
            const props = note.props as { id?: string }

            return (
              <li
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3"
                id={props.id}
                key={props.id ?? index}
              >
                <span
                  aria-hidden="true"
                  className="text-graph-muted tabular-nums select-none"
                >
                  {String(index + 1).padStart(digits, "0")}
                </span>
                <GraphProse className="text-foreground/80">
                  {childrenOf(note)}
                </GraphProse>
              </li>
            )
          })}
        </ol>
      </GraphBody>
    </Graph>
  )
}

export { Footnotes }
export type { FootnotesProps }
