"use client";

import type { ReactNode } from "react"
import {
  childItems,
  defineItem,
  Graph,
  GraphBody,
  GraphProse,
  hasHost,
  itemText,
  listItems,
  paragraphsOf,
  splitDash,
  textOf,
  type GraphFrame,
} from "@/components/mdx/graph-frame/graph-frame"
import { cn } from "@/lib/utils"

type StepState = "done" | "now" | "next"

type StepProps = {
  /** One line. Drawn next to the number. */
  title?: string
  /** now uses the accent. next recedes. done (default) stays plain. */
  state?: StepState
  /** Markdown. The body of the step. */
  children?: ReactNode
}

type StepsProps = {
  title?: string
  children?: ReactNode
  corner?: string
  frame?: GraphFrame
  className?: string
}

/** `<Step title="Install">Run the CLI.</Step>` inside `<Steps>`. */
const Step = defineItem<StepProps>("Step")

/**
 * A numbered procedure. Markdown:
 *
 * ```mdx
 * <Steps title="INSTALL">
 *
 * 1. Copy the source
 *
 *    Run the CLI.
 *
 * 2. **Register it**
 *
 *    Export it from `mdx-components.tsx`.
 *
 * 3. *Write*
 *
 *    Use it between paragraphs.
 *
 * </Steps>
 * ```
 *
 * Bold is the current step, italic is next.
 */
function stepsOf(children: ReactNode): StepProps[] {
  const listed = listItems(children)
  if (listed.length === 0) {
    return childItems(children, Step)
  }

  return listed.map((item) => {
    const content = (item.props as { children?: ReactNode }).children
    const paras = paragraphsOf(content)
    const title =
      paras.length > 0
        ? textOf((paras[0]?.props as { children?: ReactNode }).children)
        : splitDash(itemText(item)).label
    const body =
      paras.length > 1
        ? paras.slice(1)
        : paras.length === 0
          ? splitDash(itemText(item)).rest || undefined
          : undefined
    const now = hasHost(content, ["strong", "b"])
    const next = !now && hasHost(content, ["em", "i"])
    return {
      title,
      children: body,
      state: (now ? "now" : next ? "next" : "done") as StepState,
    }
  })
}
function Steps({ title, children, corner, frame, className }: StepsProps) {
  const steps = stepsOf(children)
  const digits = String(steps.length).length

  return (
    <Graph className={className} corner={corner} frame={frame} title={title}>
      <GraphBody>
        <ol
          className="flex flex-col"
          role="list"
        >
          {steps.map((step, index) => {
            const state = step.state ?? "done"
            const last = index === steps.length - 1
            const live = state === "now"
            const next = state === "next"
            const number = String(index + 1).padStart(Math.max(2, digits), "0")

            return (
              <li
                className="flex flex-col"
                key={`${index}-${step.title ?? ""}`}
              >
                <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "tabular-nums select-none",
                      live && "text-graph-accent",
                      next && "text-graph-frame",
                      !live && !next && "text-graph-muted"
                    )}
                  >
                    {number}
                  </span>
                  <div className="flex min-w-0 flex-col gap-2">
                    {step.title ? (
                      <p
                        className={cn(
                          "text-pretty",
                          live && "text-graph-accent",
                          next && "text-graph-muted",
                          !live && !next && "text-foreground"
                        )}
                      >
                        {step.title}
                      </p>
                    ) : null}
                    {step.children ? (
                      <GraphProse
                        className={cn(
                          next ? "text-graph-muted" : "text-foreground/80"
                        )}
                      >
                        {step.children}
                      </GraphProse>
                    ) : null}
                  </div>
                </div>
                {last ? null : (
                  <div
                    aria-hidden="true"
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 py-2 select-none"
                  >
                    <span className="text-center text-graph-frame">│</span>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </GraphBody>
    </Graph>
  )
}

export { Step, Steps }
export type { StepProps, StepsProps, StepState }
