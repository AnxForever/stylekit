"use client";

import { isValidElement, type ReactElement, type ReactNode } from "react"
import {
  childItems,
  defineItem,
  Graph,
  GraphBody,
  GraphRule,
  hasHost,
  isHost,
  itemParts,
  itemText,
  listItems,
  childNodes,
  splitLabel,
  textOf,
  type GraphFrame,
} from "@/components/mdx/graph-frame/graph-frame"
import {
  toneClass,
  type GraphPalette,
} from "@/components/mdx/graph-frame/graph-motion"
import { cn } from "@/lib/utils"

type DiffSign = "add" | "remove" | "keep"

type DiffRow = {
  /** Falls back to the child text: `<Line sign="add" value="31 kb">app</Line>`. */
  label?: string
  value: string
  sign?: DiffSign
}

type DiffLineProps = DiffRow & {
  /** Draw this row under a rule as the total. */
  total?: boolean
}

type GraphDiffProps = {
  title?: string
  /** Data form. Or write `<Line />` children. */
  rows?: DiffRow[]
  footer?: DiffRow
  children?: ReactNode
  palette?: GraphPalette
  corner?: string
  frame?: GraphFrame
  className?: string
}

/** `<Line sign="add" value="31 kb">app</Line>`. `total` puts it under the rule. */
const Line = defineItem<DiffLineProps>("Line")

function signOf(value: string): DiffSign | undefined {
  const text = value.trim()
  if (/^\+/.test(text)) {
    return "add"
  }
  if (/^[−\-]/.test(text)) {
    return "remove"
  }
  return undefined
}

/**
 * `- config: ~~next.config.js~~ next.config.ts` → the old line, removed, and
 * the new line, added. Text before the strike stays on both.
 */
function rewriteOf(item: ReactElement): DiffLineProps[] | null {
  let before = ""
  let struck = ""
  let after = ""
  let seen = false

  for (const node of childNodes(itemParts(item).head)) {
    const text = textOf(node)
    if (isValidElement(node) && isHost(node, ["del", "s"])) {
      struck += text
      seen = true
    } else if (seen) {
      after += text
    } else {
      before += text
    }
  }

  if (!seen) {
    return null
  }

  const clean = (text: string) => text.replace(/\s+/g, " ").trim()
  const lines: DiffLineProps[] = []
  if (clean(struck)) {
    lines.push({ label: clean(before + struck), value: "", sign: "remove" })
  }
  if (clean(after)) {
    lines.push({ label: clean(before + after), value: "", sign: "add" })
  }
  return lines
}

function diffFromList(children: ReactNode): DiffLineProps[] {
  return listItems(children).flatMap((item): DiffLineProps[] => {
    const rewrite = rewriteOf(item)
    if (rewrite) {
      return rewrite
    }
    const { label, rest } = splitLabel(itemText(item))
    const content = (item.props as { children?: ReactNode }).children
    return [
      {
        label,
        value: rest.replace(/^[+\-−]\s*/, "") || rest,
        sign: signOf(rest),
        total: hasHost(content, ["strong", "b"]),
      },
    ]
  })
}

const signGlyph: Record<DiffSign, string> = {
  add: "+",
  remove: "-",
  keep: " ",
}

function DiffLine({
  row,
  palette,
}: {
  row: DiffRow
  palette?: GraphPalette
}) {
  const sign = row.sign ?? "keep"
  const tone =
    sign === "add"
      ? toneClass(palette, "primary")
      : sign === "remove"
        ? toneClass(palette, "secondary")
        : sign === "keep"
          ? "text-foreground"
          : toneClass(palette, "empty")
  const mark = sign === "keep" ? toneClass(palette, "empty") : tone

  return (
    <div
      className="grid grid-cols-[1.25rem_minmax(0,1fr)_8ch] items-baseline gap-x-3"
    >
      <span aria-hidden="true" className={cn("text-center select-none", mark)}>
        {signGlyph[sign]}
      </span>
      <span className={tone}>{row.label}</span>
      <span className={cn("text-right tabular-nums", tone)}>{row.value}</span>
    </div>
  )
}

function GraphDiff({
  title,
  rows: rowsProp,
  footer: footerProp,
  children,
  palette,
  corner,
  frame,
  className,
}: GraphDiffProps) {
  const listed = diffFromList(children)
  const tagged = childItems(children, Line).map((entry) => ({
    ...entry,
    label: entry.label ?? textOf(entry.children),
  }))
  const lines = listed.length > 0 ? listed : tagged
  const rows = (rowsProp ?? lines.filter((entry) => !entry.total)).map(
    (entry) => ({ ...entry, label: entry.label ?? "" })
  )
  const footerLine = footerProp ?? lines.find((entry) => entry.total)
  const footer = footerLine
    ? { ...footerLine, label: footerLine.label ?? "" }
    : undefined

  return (
    <Graph title={title} className={className} corner={corner} frame={frame}>
      <GraphBody className="flex flex-col gap-3">
        <ul
          role="list"
          className="flex flex-col gap-2"
        >
          {rows.map((row) => (
            <li key={row.label}>
              <DiffLine palette={palette} row={row} />
            </li>
          ))}
        </ul>
        {footer ? (
          <>
            <GraphRule />
            <div
            >
              <DiffLine palette={palette} row={footer} />
            </div>
          </>
        ) : null}
      </GraphBody>
    </Graph>
  )
}

export { GraphDiff, Line }
export type { DiffLineProps, DiffRow, DiffSign, GraphDiffProps }
