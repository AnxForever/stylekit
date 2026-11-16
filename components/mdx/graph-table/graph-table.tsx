"use client";

import type { ReactNode } from "react"

import {
  alignsOf,
  Cell,
  cellsOf,
  childItems,
  Foot,
  Graph,
  GraphBody,
  GraphRule,
  Head,
  Row,
  tableOf,
  words,
  type GraphFrame,
} from "@/components/mdx/graph-frame/graph-frame"
import { cn } from "@/lib/utils"

type GraphAlign = "left" | "right"

function RuleY() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 graph-rule-y"
    />
  )
}

type GraphTableProps = {
  title?: string
  /** Data form. Or write `<Head>Name | Value</Head>`. */
  headers?: string[] | string
  /** Data form. Or write `<Row>docs | 12,400</Row>`. */
  rows?: ReactNode[][]
  footer?: ReactNode[]
  align?: GraphAlign[] | string
  children?: ReactNode
  corner?: string
  frame?: GraphFrame
  className?: string
}

function GraphTable({
  title,
  headers: headersProp,
  rows: rowsProp,
  footer: footerProp,
  align: alignProp,
  children,
  corner,
  frame,
  className,
}: GraphTableProps) {
  const markdown = tableOf(children)
  const head = childItems(children, Head)[0]
  const headers = (
    headersProp == null
      ? head
        ? cellsOf(undefined, head?.children)
        : (markdown?.headers ?? [])
      : cellsOf(headersProp)
  ).map((cell) => String(cell ?? ""))
  const taggedRows = childItems(children, Row).map((row) =>
    cellsOf(row.cells, row.children)
  )
  const rows =
    rowsProp ?? (taggedRows.length > 0 ? taggedRows : markdown?.rows) ?? []
  const foot = childItems(children, Foot)[0]
  const footer =
    footerProp ?? (foot ? cellsOf(foot.cells, foot.children) : markdown?.footer)
  const align =
    (typeof alignProp === "string"
      ? (words(alignProp) as GraphAlign[])
      : alignProp) ??
    alignsOf(head?.children) ??
    markdown?.align

  return (
    <Graph title={title} className={className} corner={corner} frame={frame}>
      <GraphBody className="px-3 py-6 sm:px-6 sm:py-8">
        <div className="@container overflow-x-auto overflow-y-hidden">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={header}
                    className={cn(
                      "relative px-3 pb-3 font-normal whitespace-nowrap text-foreground",
                      (align?.[index] ?? (index === 0 ? "left" : "right")) ===
                        "right"
                        ? "text-right"
                        : "text-left"
                    )}
                  >
                    {index > 0 ? <RuleY /> : null}
                    {header}
                  </th>
                ))}
              </tr>
              <tr>
                <th colSpan={headers.length} className="p-0">
                  <GraphRule />
                </th>
              </tr>
            </thead>
            <tbody
            >
              {rows?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "relative px-3 py-2.5 whitespace-nowrap",
                        (align?.[cellIndex] ??
                          (cellIndex === 0 ? "left" : "right")) === "right"
                          ? "text-right tabular-nums"
                          : "text-left"
                      )}
                    >
                      {cellIndex > 0 ? <RuleY /> : null}
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {footer ? (
              <tfoot>
                <tr>
                  <td colSpan={headers.length} className="pt-2 pb-3">
                    <GraphRule />
                  </td>
                </tr>
                <tr>
                  {footer.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={cn(
                        "relative px-3 pt-1 whitespace-nowrap",
                        (align?.[cellIndex] ??
                          (cellIndex === 0 ? "left" : "right")) === "right"
                          ? "text-right tabular-nums"
                          : "text-left"
                      )}
                    >
                      {cellIndex > 0 ? <RuleY /> : null}
                      {cell}
                    </td>
                  ))}
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
      </GraphBody>
    </Graph>
  )
}

export { Cell, Foot, GraphTable, Head, Row }
export type { GraphTableProps }
