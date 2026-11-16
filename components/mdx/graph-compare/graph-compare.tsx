"use client";

import type { ReactNode } from "react"
import {
  childItems,
  defineItem,
  Graph,
  GraphBody,
  labeledTable,
  Row,
  textOf,
  words,
  type GraphFrame,
} from "@/components/mdx/graph-frame/graph-frame"
import {
  DIM_OPACITY,
  isMonoPalette,
  seriesClass,
  type GraphPalette,
} from "@/components/mdx/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type CompareCell = string | boolean

type CompareRow = {
  label: string
  values: CompareCell[]
}

/** `<Col>Studio</Col>` — an option across the top. */
const Col = defineItem("Col")

type GraphCompareProps = {
  title?: string
  /** Data form. Or write `<Col>` children / `"Solo Studio"`. */
  columns?: string[] | string
  /** Data form. Or write `<Row label="Registry">true true</Row>`. */
  rows?: CompareRow[]
  children?: ReactNode
  accent?: string
  palette?: GraphPalette
  corner?: string
  frame?: GraphFrame
  className?: string
}

function compareCell(token: string): CompareCell {
  const value = token.trim()
  const key = value.toLowerCase()
  if (key === "true" || key === "yes" || value === "✓" || key === "x") {
    return true
  }
  if (
    key === "false" ||
    key === "no" ||
    value === "–" ||
    value === "-" ||
    value === "—"
  ) {
    return false
  }
  return value
}

function compareValues(
  values?: CompareCell[] | string,
  children?: ReactNode
): CompareCell[] {
  if (Array.isArray(values)) {
    return values
  }

  return (values ?? textOf(children))
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(compareCell)
}

function cellText(value: CompareCell) {
  if (typeof value === "boolean") {
    return value ? "✓" : "–"
  }

  return value
}

function GraphCompare({
  title,
  columns: columnsProp,
  rows: rowsProp,
  children,
  accent,
  palette,
  corner,
  frame,
  className,
}: GraphCompareProps) {
  const markdown = labeledTable(children)
  const columns =
    columnsProp == null
      ? (() => {
          const cols = childItems(children, Col).map((col) =>
            textOf(col.children)
          )
          return cols.length > 0 ? cols : (markdown?.columns ?? [])
        })()
      : words(columnsProp)
  const taggedRows = childItems(children, Row).map((row) => ({
    label: row.label ?? "",
    values: compareValues(undefined, row.children),
  }))
  const rows = (
    rowsProp ??
    (taggedRows.length > 0
      ? taggedRows
      : (markdown?.rows.map((row) => ({
          label: row.label,
          values: row.values.map((value) => compareCell(value)),
        })) ?? []))
  ).map((row) => ({ ...row, label: row.label ?? "" }))
  const template = `minmax(7rem,1fr) repeat(${columns.length}, minmax(4rem, 7rem))`

  return (
    <Graph title={title} className={className} corner={corner} frame={frame}>
      <GraphBody className="overflow-x-auto overflow-y-hidden">
        <div className="flex flex-col gap-3">
          <div
            className="grid items-end gap-x-4"
            style={{ gridTemplateColumns: template }}
          >
            <span />
            {columns.map((column, index) => {
              const focused = Boolean(accent) && column === accent
              const mono = isMonoPalette(palette)

              return (
                <span
                  className={cn(
                    "whitespace-nowrap text-right",
                    mono
                      ? focused
                        ? "text-graph-accent"
                        : "text-graph-muted"
                      : seriesClass(palette, index)
                  )}
                  key={column}
                >
                  {column}
                </span>
              )
            })}
          </div>
          <ul
            className="flex flex-col gap-2"
            role="list"
          >
            {rows.map((row) => (
              <li
                className="grid items-baseline gap-x-4"
                key={row.label}
                style={{ gridTemplateColumns: template }}
              >
                <span className="min-w-0 wrap-break-word text-foreground">
                  {row.label}
                </span>
                {columns.map((column, index) => {
                  const value = row.values[index]
                  const focused = Boolean(accent) && column === accent
                  const dim = Boolean(accent) && !focused
                  const mark = typeof value === "boolean"
                  const on = value === true
                  const mono = isMonoPalette(palette)

                  return (
                    <span
                      className={cn(
                        "text-right",
                        !mark && "tabular-nums",
                        on &&
                          (mono
                            ? (focused || !accent) && "text-graph-accent"
                            : seriesClass(palette, index)),
                        on && mono && dim && "text-foreground",
                        mark && !on && "text-graph-frame",
                        !mark && focused && "text-foreground",
                        !mark && dim && "text-graph-muted"
                      )}
                      key={`${row.label}-${column}`}
                      style={
                        dim && !on && mono
                          ? { opacity: DIM_OPACITY }
                          : undefined
                      }
                    >
                      {value == null ? "" : cellText(value)}
                    </span>
                  )
                })}
              </li>
            ))}
          </ul>
        </div>
      </GraphBody>
    </Graph>
  )
}

export { Col, GraphCompare, Row }
export type { CompareCell, CompareRow, GraphCompareProps }
