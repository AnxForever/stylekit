import * as React from "react"

/*
 * Markdown children, read as data. No "use client" here: these are pure
 * functions over React elements, so a server `mdx-components.tsx` can call
 * them too. `graph-frame.tsx` re-exports everything.
 */

type WithChildren<P> = P & { children?: React.ReactNode }

type GraphItemComponent<P extends object> = ((
  props: WithChildren<P>
) => null) & {
  graphItem: string
  displayName?: string
}

/**
 * A data-only child. `<Stat value="12" label="docs" />` renders nothing by
 * itself; the parent graph reads its props with `childItems`. Matching is by
 * the tag name (and the RSC client-reference id), not function identity.
 */
function defineItem<P extends object>(name: string): GraphItemComponent<P> {
  const Item = function Item() {
    return null
  } as unknown as GraphItemComponent<P>
  Item.displayName = name
  Item.graphItem = name
  return Item
}

/**
 * Function name, host tag, or the `#Export` of a React Server client ref.
 * `graphHost` is set by `withMdxcn` on an overridden tag (`li: ListItem`), so
 * the parent still sees an `li`.
 */
function typeName(type: unknown): string {
  if (typeof type === "string") {
    return type
  }

  if (typeof type === "function") {
    const fn = type as {
      graphItem?: string
      graphHost?: string
      displayName?: string
      name?: string
    }
    return fn.graphItem || fn.graphHost || fn.displayName || fn.name || ""
  }

  if (type && typeof type === "object") {
    const obj = type as {
      graphItem?: string
      graphHost?: string
      displayName?: string
      $$id?: string
      $$typeof?: unknown
      name?: string
    }
    // Under React Server Components an element crossing the boundary arrives
    // with its `type` wrapped in `React.lazy`. Resolve it before reading the
    // markers, or `<Row>` looks like an anonymous component.
    if (obj.$$typeof === LAZY) {
      return typeName(unlazy(obj as unknown as React.ReactNode))
    }
    if (obj.graphItem) {
      return obj.graphItem
    }
    if (obj.graphHost) {
      return obj.graphHost
    }
    if (obj.displayName) {
      return obj.displayName
    }
    if (typeof obj.$$id === "string") {
      const id = obj.$$id.split("#").pop() ?? ""
      return id.split("@")[0] ?? ""
    }
    if (obj.name) {
      return obj.name
    }
  }

  return ""
}

/**
 * The tag an element stands for. Under React Server Components a wrapped
 * override reaches the client already rendered, so `withMdxcn` also leaves a
 * `data-graph-host` prop on it.
 */
function hostOf(element: React.ReactElement): string {
  const marked = (element.props as { "data-graph-host"?: unknown })[
    "data-graph-host"
  ]
  return typeof marked === "string" ? marked : typeName(element.type)
}

function isHost(
  element: React.ReactElement,
  tags: string | readonly string[]
): boolean {
  const name = hostOf(element).toLowerCase()
  const list = typeof tags === "string" ? [tags] : tags
  return list.some((tag) => tag.toLowerCase() === name)
}

const LAZY = Symbol.for("react.lazy")

/**
 * React Server Components can hand a client component its children wrapped
 * in `React.lazy` — already resolved, but not an element yet. Unwrap so the
 * parsers see the `<pre>` or `<li>` underneath. A pending one reads as empty.
 */
function unlazy(node: React.ReactNode): React.ReactNode {
  let current: unknown = node
  for (let depth = 0; depth < 8; depth += 1) {
    const lazy = current as {
      $$typeof?: unknown
      _payload?: unknown
      _init?: (payload: unknown) => unknown
    } | null
    if (!lazy || typeof lazy !== "object" || lazy.$$typeof !== LAZY) {
      return current as React.ReactNode
    }
    try {
      current = lazy._init?.(lazy._payload)
    } catch {
      return null
    }
  }
  return current as React.ReactNode
}

/** `React.Children.toArray`, with lazy children unwrapped. */
function childNodes(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(unlazy(children)).map(unlazy)
}

function elementsOf(children: React.ReactNode): React.ReactElement[] {
  const out: React.ReactElement[] = []
  for (const child of childNodes(children)) {
    if (!React.isValidElement(child)) {
      continue
    }
    if (child.type === React.Fragment) {
      out.push(
        ...elementsOf((child.props as { children?: React.ReactNode }).children)
      )
      continue
    }
    out.push(child)
  }
  return out
}

/** Direct `ul`/`ol` items, or `li` children if the parent already is a list. */
function listItems(children: React.ReactNode): React.ReactElement[] {
  const elements = elementsOf(children)
  const lists = elements.filter((element) => isHost(element, ["ul", "ol"]))
  const items =
    lists.length > 0
      ? lists.flatMap((list) =>
          elementsOf((list.props as { children?: React.ReactNode }).children)
        )
      : elements
  return items.filter((element) => isHost(element, "li"))
}

function nestedList(item: React.ReactElement): React.ReactElement[] {
  return listItems((item.props as { children?: React.ReactNode }).children)
}

/** Visible text of a list item, ignoring nested lists. */
function itemText(item: React.ReactElement): string {
  const parts: React.ReactNode[] = []
  for (const child of childNodes(
    (item.props as { children?: React.ReactNode }).children
  )) {
    if (React.isValidElement(child) && isHost(child, ["ul", "ol"])) {
      continue
    }
    parts.push(child)
  }
  return textOf(parts).replace(/\s+/g, " ").trim()
}

function hasHost(node: React.ReactNode, tags: string | readonly string[]) {
  for (const child of childNodes(node)) {
    if (!React.isValidElement(child)) {
      continue
    }
    if (isHost(child, tags)) {
      return true
    }
    if (
      hasHost((child.props as { children?: React.ReactNode }).children, tags)
    ) {
      return true
    }
  }
  return false
}

function paragraphsOf(children: React.ReactNode): React.ReactElement[] {
  return elementsOf(children).filter((element) => isHost(element, "p"))
}

function childrenOf(element: React.ReactElement): React.ReactNode {
  return (element.props as { children?: React.ReactNode }).children
}

/**
 * A list item split the way the grammar reads it. Tight item: the text is the
 * head. Loose item (blank lines between): the first paragraph is the head and
 * every block after it is the body. Nested lists are kept apart.
 */
function itemParts(item: React.ReactElement): {
  head: React.ReactNode
  body: React.ReactElement[]
  lists: React.ReactElement[]
} {
  const content = childrenOf(item)
  const nodes = childNodes(content)
  const isList = (node: React.ReactNode) =>
    React.isValidElement(node) && isHost(node, ["ul", "ol"])
  const lists = nodes.filter(isList) as React.ReactElement[]
  const first = nodes.findIndex(
    (node) => React.isValidElement(node) && isHost(node, "p")
  )

  if (first === -1) {
    return { head: nodes.filter((node) => !isList(node)), body: [], lists }
  }

  return {
    head: childrenOf(nodes[first] as React.ReactElement),
    body: nodes
      .slice(first + 1)
      .filter(
        (node): node is React.ReactElement =>
          React.isValidElement(node) && !isList(node)
      ),
    lists,
  }
}

/**
 * Drop the first `count` characters of visible text, keeping the inline
 * markup after them. `**user:** hi \`there\`` minus `user:` keeps the code.
 * An element emptied by the cut is removed. Leading space after the cut goes.
 */
function dropText(node: React.ReactNode, count: number): React.ReactNode {
  let left = count
  let trimming = count > 0

  function walk(input: React.ReactNode): React.ReactNode {
    const current = unlazy(input)
    if (current == null || typeof current === "boolean") {
      return current
    }

    if (typeof current === "string" || typeof current === "number") {
      let text = String(current)
      if (left > 0) {
        const cut = Math.min(left, text.length)
        left -= cut
        text = text.slice(cut)
      }
      if (left === 0 && trimming) {
        const trimmed = text.replace(/^\s+/, "")
        if (trimmed) {
          trimming = false
        }
        text = trimmed
      }
      return text === "" ? null : text
    }

    if (Array.isArray(current)) {
      return childNodes(current).map(walk)
    }

    if (React.isValidElement(current)) {
      if (left === 0 && !trimming) {
        return current
      }
      const before = textOf(childrenOf(current))
      const inner = walk(childrenOf(current))
      if (before !== "" && textOf(inner) === "") {
        return null
      }
      return React.cloneElement(
        current as React.ReactElement<{ children?: React.ReactNode }>,
        undefined,
        inner
      )
    }

    return current
  }

  return walk(node)
}

/** Keep the first `count` characters of visible text and the markup on them. */
function takeText(node: React.ReactNode, count: number): React.ReactNode {
  let left = count

  function walk(input: React.ReactNode): React.ReactNode {
    const current = unlazy(input)
    if (current == null || typeof current === "boolean") {
      return current
    }

    if (typeof current === "string" || typeof current === "number") {
      const text = String(current)
      const kept = text.slice(0, Math.max(0, left))
      left -= kept.length
      return kept === "" ? null : kept
    }

    if (Array.isArray(current)) {
      return childNodes(current).map(walk)
    }

    if (React.isValidElement(current)) {
      if (left <= 0) {
        return null
      }
      const before = textOf(childrenOf(current))
      const inner = walk(childrenOf(current))
      if (before !== "" && textOf(inner) === "") {
        return null
      }
      return React.cloneElement(
        current as React.ReactElement<{ children?: React.ReactNode }>,
        undefined,
        inner
      )
    }

    return current
  }

  return walk(node)
}

/**
 * Strip a leading pattern from rich text. Returns the match (or null) and the
 * rest with its inline markup intact.
 */
function dropLead(
  node: React.ReactNode,
  pattern: RegExp
): { match: RegExpMatchArray | null; rest: React.ReactNode } {
  const match = textOf(node).match(pattern)
  if (!match || match.index !== 0) {
    return { match: null, rest: node }
  }
  return { match, rest: dropText(node, match[0].length) }
}

/**
 * Text with the Markdown marks put back. `ok*5 down*2` parses as
 * `ok<em>5 down</em>2`; this returns `ok*5 down*2` so runs survive.
 */
function sourceText(input: React.ReactNode): string {
  const node = unlazy(input)
  if (node == null || typeof node === "boolean") {
    return ""
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(sourceText).join("")
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    const inner = sourceText(node.props.children)
    if (isHost(node, ["em", "i"])) {
      return `*${inner}*`
    }
    if (isHost(node, ["strong", "b"])) {
      return `**${inner}**`
    }
    if (isHost(node, ["del", "s"])) {
      return `~~${inner}~~`
    }
    if (isHost(node, ["p", "li", "br"])) {
      return `${inner}\n`
    }
    return inner
  }

  return ""
}

/** `ok*40` → forty `ok`s. Any token list in the grammar can use a run. */
function runs(value: readonly string[] | string | undefined): string[] {
  const tokens =
    value == null
      ? []
      : typeof value === "string"
        ? value.split(/[\s,]+/).filter(Boolean)
        : [...value]
  const out: string[] = []

  for (const token of tokens) {
    const match = token.match(/^(.+?)[*×](\d{1,4})$/)
    if (!match) {
      out.push(token)
      continue
    }
    const count = Math.min(5000, Number(match[2]))
    for (let index = 0; index < count; index += 1) {
      out.push(match[1] ?? token)
    }
  }

  return out
}

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const

/** `### Scope` followed by a table or list — used by Sheet. */
function headingSections(children: React.ReactNode): {
  title: string
  children: React.ReactNode
}[] {
  const sections: { title: string; children: React.ReactNode[] }[] = []
  let current: { title: string; children: React.ReactNode[] } | null = null

  for (const element of elementsOf(children)) {
    if (isHost(element, HEADING_TAGS)) {
      current = {
        title: textOf(
          (element.props as { children?: React.ReactNode }).children
        ).trim(),
        children: [],
      }
      sections.push(current)
      continue
    }

    current?.children.push(element)
  }

  return sections
}

type MdAlign = "left" | "right"

type MdTable = {
  headers: string[]
  rows: string[][]
  footer?: string[]
  align?: MdAlign[]
}

function cellAlign(cell: React.ReactElement): MdAlign | undefined {
  const props = cell.props as {
    align?: string
    style?: { textAlign?: string }
  }
  const value = props.align || props.style?.textAlign
  if (value === "right") {
    return "right"
  }
  if (value === "left") {
    return "left"
  }
  return undefined
}

function rowCells(row: React.ReactElement): {
  values: string[]
  align: (MdAlign | undefined)[]
} {
  const cells = elementsOf(
    (row.props as { children?: React.ReactNode }).children
  ).filter((cell) => isHost(cell, ["th", "td"]))
  return {
    values: cells.map((cell) =>
      textOf((cell.props as { children?: React.ReactNode }).children).trim()
    ),
    align: cells.map(cellAlign),
  }
}

function rowsIn(section: React.ReactElement | undefined) {
  if (!section) {
    return []
  }
  return elementsOf(
    (section.props as { children?: React.ReactNode }).children
  ).filter((row) => isHost(row, "tr"))
}

function isTotal(row: React.ReactElement) {
  const first = elementsOf(childrenOf(row)).find((cell) =>
    isHost(cell, ["th", "td"])
  )
  if (!first) {
    return false
  }
  const content = childrenOf(first)
  const nodes = childNodes(content).filter((node) => textOf(node).trim() !== "")
  const bold =
    nodes.length === 1 &&
    React.isValidElement(nodes[0]) &&
    isHost(nodes[0], ["strong", "b"])
  return bold || /^total$/i.test(textOf(content).trim())
}

/** A Markdown / HTML table written as children of a graph. */
function tableOf(children: React.ReactNode): MdTable | null {
  const table = elementsOf(children).find((element) => isHost(element, "table"))
  if (!table) {
    return null
  }

  const sections = elementsOf(
    (table.props as { children?: React.ReactNode }).children
  )
  const thead = sections.find((element) => isHost(element, "thead"))
  const tbody = sections.find((element) => isHost(element, "tbody"))
  const tfoot = sections.find((element) => isHost(element, "tfoot"))
  const body = tbody ?? table
  const heads = rowsIn(thead)
  const bodies = rowsIn(body).filter((row) => !heads.includes(row))
  const foots = rowsIn(tfoot)
  const headRow = heads[0] ?? bodies[0]
  if (!headRow) {
    return null
  }

  const head = rowCells(headRow)
  const rest = heads[0] ? bodies : bodies.slice(1)
  const last = rest.at(-1)
  // Markdown has no <tfoot>. A last row led by **bold** or "Total" is it.
  const written =
    !foots[0] && last && rest.length > 1 && isTotal(last) ? last : undefined
  const dataRows = (written ? rest.slice(0, -1) : rest).map(
    (row) => rowCells(row).values
  )
  const footRow = foots[0] ?? written
  const foot = footRow ? rowCells(footRow).values : undefined
  const align = head.align.some(Boolean)
    ? head.align.map(
        (value, index) => value ?? (index === 0 ? "left" : "right")
      )
    : undefined

  return {
    headers: head.values,
    rows: dataRows,
    footer: foot,
    align,
  }
}

/** First column is the row label. Used by compare / matrix / heatmap. */
function labeledTable(children: React.ReactNode): {
  columns: string[]
  rows: { label: string; values: string[] }[]
  align?: MdAlign[]
} | null {
  const table = tableOf(children)
  if (!table || table.headers.length < 2) {
    return null
  }

  const labeled =
    table.headers[0] === "" ||
    table.headers[0] === "—" ||
    table.headers[0] === "-"

  if (!labeled) {
    return {
      columns: table.headers,
      rows: table.rows.map((row) => ({
        label: row[0] ?? "",
        values: row.slice(1),
      })),
      align: table.align,
    }
  }

  return {
    columns: table.headers.slice(1),
    rows: table.rows.map((row) => ({
      label: row[0] ?? "",
      values: row.slice(1),
    })),
    align: table.align?.slice(1),
  }
}

/** Split `Mar 18: Docs, live` / `14:02: p95 crossed` on `: `. */
function splitLabel(text: string): { label: string; rest: string } {
  const match = text.match(/^(.+?):\s+(.+)$/)
  if (!match) {
    return { label: text, rest: "" }
  }
  return {
    label: (match[1] ?? text).trim(),
    rest: (match[2] ?? "").trim(),
  }
}

/** Split `graph-tree.tsx — ui` / `Copy the source — Run the CLI` on em dash. */
function splitDash(text: string): { label: string; rest: string } {
  const parts = text.split(/\s+[—–]\s+/)
  if (parts.length < 2) {
    return { label: text, rest: "" }
  }
  return {
    label: (parts[0] ?? text).trim(),
    rest: parts.slice(1).join(" — ").trim(),
  }
}

/** First word and the rest: `12,400 docs`, `100% frame`. */
function firstToken(text: string): { token: string; rest: string } {
  const match = text.match(/^(\S+)\s*(.*)$/)
  if (!match) {
    return { token: text, rest: "" }
  }
  return { token: match[1] ?? text, rest: match[2] ?? "" }
}

/** Plain text of a React tree. Strings, numbers, and element children. */
function textOf(input: React.ReactNode): string {
  const node = unlazy(input)
  if (node == null || typeof node === "boolean") {
    return ""
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(textOf).join("")
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textOf(node.props.children)
  }

  return ""
}

/** Props of each direct child rendered with the given item component. */
function childItems<P extends object>(
  children: React.ReactNode,
  Item: GraphItemComponent<P>
): WithChildren<P>[] {
  const tag = Item.graphItem
  return elementsOf(children)
    .filter((element) => typeName(element.type) === tag)
    .map((element) => element.props as WithChildren<P>)
}

/** Every direct child element, in order, with its item tag if it has one. */
function childElements(children: React.ReactNode) {
  return elementsOf(children).map((element) => ({
    element,
    tag: typeName(element.type) || undefined,
  }))
}

/** `[2, 3, 4]`, `"2 3 4"`, `"2, 3, 4"`, or `"0*2 4"` → `[0, 0, 4]`. */
function numbers(value: readonly number[] | string | undefined): number[] {
  if (value == null) {
    return []
  }

  if (typeof value === "string") {
    return runs(value)
      .map(Number)
      .filter((entry) => Number.isFinite(entry))
  }

  return [...value]
}

/** `["ok", "down"]` or `"ok down"` → `["ok", "down"]`. */
function words<T extends string>(
  value: readonly T[] | string | undefined
): T[] {
  if (value == null) {
    return []
  }

  if (typeof value === "string") {
    return value.split(/[\s,]+/).filter(Boolean) as T[]
  }

  return [...value]
}

/** `0.67`, `"0.67"`, or `"67%"` → `0.67`. */
function fraction(value: number | string | undefined, fallback = 0): number {
  if (value == null) {
    return fallback
  }

  if (typeof value === "number") {
    return value
  }

  const text = value.trim()
  const percent = text.endsWith("%")
  const parsed = Number.parseFloat(text)

  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return percent ? parsed / 100 : parsed
}

/** `42` or `"12,400"` or `"100%"` → `42`. */
function numberOf(value: number | string | undefined, fallback = 0): number {
  if (value == null) {
    return fallback
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback
  }

  const parsed = Number.parseFloat(value.replace(/,/g, ""))
  return Number.isFinite(parsed) ? parsed : fallback
}

/**
 * Numbers written as children. `2 3 5 8 — caption`, or a list of
 * `- Mon: 4` rows (labels kept). Spark, plot, and KPI read this.
 */
function seriesOf(children: React.ReactNode): {
  data: number[]
  labels: string[]
  caption?: string
} {
  const listed = listItems(children)
  if (listed.length > 0) {
    const rows = listed.map((item) => {
      const { label, rest } = splitLabel(itemText(item))
      return rest
        ? { label, value: numberOf(rest, Number.NaN) }
        : { label: "", value: numberOf(label, Number.NaN) }
    })
    const kept = rows.filter((row) => Number.isFinite(row.value))
    return {
      data: kept.map((row) => row.value),
      labels: kept.some((row) => row.label) ? kept.map((row) => row.label) : [],
    }
  }

  const { label, rest } = splitDash(
    sourceText(children).replace(/\s+/g, " ").trim()
  )
  return { data: numbers(label), labels: [], caption: rest || undefined }
}

/** Text of a node, one trimmed line per newline. Paragraphs break lines. */
function linesOf(node: React.ReactNode): string[] {
  const paragraphs = paragraphsOf(node)
  if (paragraphs.length > 0) {
    return paragraphs.flatMap((paragraph) => linesOf(childrenOf(paragraph)))
  }
  return textOf(node)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

/**
 * Tags the parents read from Markdown. If `mdx-components.tsx` swaps one for
 * its own component, `withMdxcn` marks the swap so parsing still finds it.
 */
const GRAPH_HOST_TAGS = [
  "p",
  "ul",
  "ol",
  "li",
  "strong",
  "b",
  "em",
  "i",
  "del",
  "s",
  "code",
  "pre",
  "input",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
] as const

export {
  childElements,
  childItems,
  childrenOf,
  defineItem,
  dropLead,
  dropText,
  elementsOf,
  firstToken,
  fraction,
  GRAPH_HOST_TAGS,
  hasHost,
  headingSections,
  hostOf,
  isHost,
  itemParts,
  itemText,
  labeledTable,
  linesOf,
  listItems,
  nestedList,
  childNodes,
  numberOf,
  numbers,
  paragraphsOf,
  runs,
  seriesOf,
  sourceText,
  splitDash,
  splitLabel,
  tableOf,
  takeText,
  textOf,
  typeName,
  unlazy,
  words,
}
export type { GraphItemComponent, MdAlign, MdTable, WithChildren }
