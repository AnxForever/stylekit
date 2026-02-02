// Knowledge Base - React Performance Guidelines
// Data converted from react-performance.csv

import type { ReactGuideline, Severity } from "./types";
import { BM25 } from "./search";

export const reactGuidelines: ReactGuideline[] = [
  // Async Patterns
  {
    category: "Async",
    issue: "Defer Await",
    keywords: ["async", "await", "defer", "branch", "waterfall"],
    platform: "Web",
    description: "Move await into branches where actually used to avoid blocking unused code paths",
    do: "Move await operations into branches where they're needed",
    dont: "Await at top of function blocking all branches",
    codeGood: "if (skip) return { skipped: true }; const data = await fetch();",
    codeBad: "const data = await fetch(); if (skip) return { skipped: true };",
    severity: "Critical",
  },
  {
    category: "Async",
    issue: "Parallel Fetches",
    keywords: ["parallel", "fetch", "promise", "all", "concurrent"],
    platform: "Web",
    description: "Run independent fetches in parallel with Promise.all",
    do: "Use Promise.all for independent async operations",
    dont: "Await sequential fetches that don't depend on each other",
    codeGood: "const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);",
    codeBad: "const users = await fetchUsers(); const posts = await fetchPosts();",
    severity: "High",
  },
  {
    category: "Async",
    issue: "Suspense Boundaries",
    keywords: ["suspense", "boundary", "loading", "fallback"],
    platform: "Web",
    description: "Use Suspense for async data loading UI",
    do: "Wrap async components with Suspense and fallback",
    dont: "Manual loading state management for data fetching",
    codeGood: "<Suspense fallback={<Skeleton />}><AsyncComponent /></Suspense>",
    codeBad: "{isLoading ? <Skeleton /> : <Component />}",
    severity: "Medium",
  },

  // Bundle Size
  {
    category: "Bundle",
    issue: "Barrel File Imports",
    keywords: ["barrel", "import", "index", "tree-shaking"],
    platform: "Web",
    description: "Avoid barrel file imports that prevent tree-shaking",
    do: "Import directly from source file",
    dont: "Import from index/barrel files",
    codeGood: "import { Button } from '@/components/ui/button';",
    codeBad: "import { Button } from '@/components/ui';",
    severity: "High",
  },
  {
    category: "Bundle",
    issue: "Dynamic Imports",
    keywords: ["dynamic", "import", "lazy", "code-splitting"],
    platform: "Web",
    description: "Code-split heavy components with dynamic imports",
    do: "Use dynamic import for large/rarely-used components",
    dont: "Import everything statically",
    codeGood: "const Chart = dynamic(() => import('@/components/Chart'));",
    codeBad: "import Chart from '@/components/Chart'; // 200kb",
    severity: "High",
  },
  {
    category: "Bundle",
    issue: "Icon Tree Shaking",
    keywords: ["icon", "tree-shake", "lucide", "import"],
    platform: "Web",
    description: "Import icons individually for tree-shaking",
    do: "Import individual icons",
    dont: "Import from icon package root",
    codeGood: "import { Menu } from 'lucide-react';",
    codeBad: "import * as Icons from 'lucide-react';",
    severity: "High",
  },
  {
    category: "Bundle",
    issue: "Lodash Imports",
    keywords: ["lodash", "import", "bundle", "modular"],
    platform: "Web",
    description: "Import lodash functions individually",
    do: "Import from lodash-es or individual modules",
    dont: "Import entire lodash library",
    codeGood: "import debounce from 'lodash-es/debounce';",
    codeBad: "import { debounce } from 'lodash';",
    severity: "High",
  },

  // Server Components
  {
    category: "Server",
    issue: "Server vs Client",
    keywords: ["server", "client", "component", "rsc", "use client"],
    platform: "Web",
    description: "Keep components as Server Components when possible",
    do: "Only add 'use client' when needed (hooks, events, browser APIs)",
    dont: "Add 'use client' to every component",
    codeGood: "// No 'use client' for static components",
    codeBad: "'use client' // Only uses props, no hooks",
    severity: "High",
  },
  {
    category: "Server",
    issue: "Data Fetching Location",
    keywords: ["fetch", "server", "client", "data", "ssr"],
    platform: "Web",
    description: "Fetch data in Server Components when possible",
    do: "Fetch in Server Components, pass to Client Components",
    dont: "Fetch in Client Components with useEffect",
    codeGood: "async function Page() { const data = await fetch(...); return <Client data={data} />; }",
    codeBad: "useEffect(() => { fetch(...).then(setData) }, []);",
    severity: "High",
  },
  {
    category: "Server",
    issue: "Server Actions",
    keywords: ["server", "action", "form", "mutation"],
    platform: "Web",
    description: "Use Server Actions for form submissions and mutations",
    do: "Use Server Actions for data mutations",
    dont: "Create API routes for simple mutations",
    codeGood: "async function createTodo(data) { 'use server'; ... }",
    codeBad: "POST /api/todos route for simple create",
    severity: "Medium",
  },

  // Client-Side Performance
  {
    category: "Client",
    issue: "Memo Heavy Components",
    keywords: ["memo", "memoize", "rerender", "performance"],
    platform: "Web",
    description: "Memoize expensive components that rerender often",
    do: "Use React.memo for pure components with frequent parent rerenders",
    dont: "Memo everything or nothing",
    codeGood: "const ExpensiveList = memo(({ items }) => ...);",
    codeBad: "function ExpensiveList({ items }) { ... } // rerenders on every parent change",
    severity: "Medium",
  },
  {
    category: "Client",
    issue: "useCallback for Props",
    keywords: ["useCallback", "callback", "props", "rerender"],
    platform: "Web",
    description: "Memoize callbacks passed to memoized children",
    do: "useCallback for handlers passed to memo'd components",
    dont: "useCallback for every function",
    codeGood: "const handleClick = useCallback(() => {}, [deps]); <MemoChild onClick={handleClick} />",
    codeBad: "const handleClick = () => {}; <MemoChild onClick={handleClick} />",
    severity: "Medium",
  },
  {
    category: "Client",
    issue: "useMemo for Expensive Calcs",
    keywords: ["useMemo", "expensive", "calculation", "derived"],
    platform: "Web",
    description: "Memoize expensive calculations",
    do: "useMemo for expensive computations with stable dependencies",
    dont: "useMemo for simple operations",
    codeGood: "const sorted = useMemo(() => items.sort(...), [items]);",
    codeBad: "const doubled = useMemo(() => count * 2, [count]);",
    severity: "Medium",
  },
  {
    category: "Client",
    issue: "State Colocation",
    keywords: ["state", "local", "colocation", "lift"],
    platform: "Web",
    description: "Keep state as local as possible",
    do: "Colocate state with the component that uses it",
    dont: "Lift all state to top-level or global store",
    codeGood: "function SearchInput() { const [query, setQuery] = useState(''); ... }",
    codeBad: "Global state for search input that only one component uses",
    severity: "High",
  },
  {
    category: "Client",
    issue: "Avoid Prop Drilling",
    keywords: ["prop", "drilling", "context", "composition"],
    platform: "Web",
    description: "Use composition or context to avoid deep prop drilling",
    do: "Use Context for widely-used values, composition for UI",
    dont: "Pass props through 5+ levels",
    codeGood: "<Layout sidebar={<Sidebar />}>{children}</Layout>",
    codeBad: "<A user={user}><B user={user}><C user={user}>...</C></B></A>",
    severity: "Medium",
  },

  // Rendering
  {
    category: "Rendering",
    issue: "Key Prop",
    keywords: ["key", "list", "map", "rerender"],
    platform: "Web",
    description: "Use stable, unique keys for list items",
    do: "Use unique IDs as keys",
    dont: "Use array index as key for dynamic lists",
    codeGood: "{items.map(item => <Item key={item.id} />)}",
    codeBad: "{items.map((item, index) => <Item key={index} />)}",
    severity: "High",
  },
  {
    category: "Rendering",
    issue: "Conditional Rendering",
    keywords: ["conditional", "render", "ternary", "short-circuit"],
    platform: "Web",
    description: "Use appropriate conditional rendering patterns",
    do: "Use && for presence, ternary for either/or",
    dont: "Render falsy values like 0",
    codeGood: "{items.length > 0 && <List items={items} />}",
    codeBad: "{items.length && <List items={items} />} // renders 0",
    severity: "Medium",
  },
  {
    category: "Rendering",
    issue: "Fragment Usage",
    keywords: ["fragment", "wrapper", "div", "dom"],
    platform: "Web",
    description: "Use Fragments to avoid unnecessary wrapper divs",
    do: "Use <> or <Fragment> when no wrapper element needed",
    dont: "Add wrapper divs just for JSX syntax",
    codeGood: "<>{items.map(...)}</>",
    codeBad: "<div>{items.map(...)}</div> // unnecessary wrapper",
    severity: "Low",
  },
  {
    category: "Rendering",
    issue: "Virtualize Long Lists",
    keywords: ["virtual", "list", "window", "scroll", "performance"],
    platform: "Web",
    description: "Virtualize long lists to improve performance",
    do: "Use virtualization library for 100+ items",
    dont: "Render thousands of DOM nodes",
    codeGood: "<VirtualList items={items} itemHeight={50} />",
    codeBad: "{items.map(item => <Item />)} // 1000+ items",
    severity: "High",
  },

  // Hooks
  {
    category: "Hooks",
    issue: "useEffect Dependencies",
    keywords: ["useEffect", "dependencies", "array", "infinite"],
    platform: "Web",
    description: "Include all used values in useEffect dependencies",
    do: "Include all referenced values, use ESLint plugin",
    dont: "Omit dependencies or disable eslint rule",
    codeGood: "useEffect(() => { console.log(value); }, [value]);",
    codeBad: "useEffect(() => { console.log(value); }, []); // missing dep",
    severity: "Critical",
  },
  {
    category: "Hooks",
    issue: "useEffect Cleanup",
    keywords: ["useEffect", "cleanup", "memory", "leak"],
    platform: "Web",
    description: "Clean up side effects in useEffect",
    do: "Return cleanup function for subscriptions, timers, etc.",
    dont: "Leave subscriptions without cleanup",
    codeGood: "useEffect(() => { const sub = subscribe(); return () => sub.unsubscribe(); }, []);",
    codeBad: "useEffect(() => { subscribe(); }, []); // no cleanup",
    severity: "High",
  },
  {
    category: "Hooks",
    issue: "Custom Hook Extraction",
    keywords: ["custom", "hook", "extract", "reuse"],
    platform: "Web",
    description: "Extract reusable logic into custom hooks",
    do: "Create custom hooks for shared stateful logic",
    dont: "Duplicate hook logic across components",
    codeGood: "const { data, isLoading } = useFetch('/api/users');",
    codeBad: "Copy-paste useState + useEffect for fetching in every component",
    severity: "Medium",
  },
  {
    category: "Hooks",
    issue: "useRef for Mutables",
    keywords: ["useRef", "mutable", "render", "persist"],
    platform: "Web",
    description: "Use useRef for mutable values that shouldn't trigger renders",
    do: "useRef for values that persist but don't need rerenders",
    dont: "useState for values that don't affect UI",
    codeGood: "const timerRef = useRef(null); // no rerender on change",
    codeBad: "const [timer, setTimer] = useState(null); // rerenders unnecessarily",
    severity: "Medium",
  },

  // State Management
  {
    category: "State",
    issue: "Derived State",
    keywords: ["derived", "state", "computed", "calculate"],
    platform: "Web",
    description: "Calculate derived values during render, don't store in state",
    do: "Calculate derived values in render or useMemo",
    dont: "Store derived values in separate state",
    codeGood: "const fullName = `${firstName} ${lastName}`;",
    codeBad: "const [fullName, setFullName] = useState(); useEffect(() => setFullName(...), [first, last]);",
    severity: "High",
  },
  {
    category: "State",
    issue: "Batching Updates",
    keywords: ["batch", "state", "update", "rerender"],
    platform: "Web",
    description: "React 18+ automatically batches state updates",
    do: "Multiple setState calls are batched automatically",
    dont: "Manually batch with unstable_batchedUpdates (not needed in React 18+)",
    codeGood: "setCount(1); setFlag(true); // one rerender",
    codeBad: "Using flushSync unnecessarily",
    severity: "Low",
  },
  {
    category: "State",
    issue: "useReducer for Complex State",
    keywords: ["reducer", "complex", "state", "action"],
    platform: "Web",
    description: "Use useReducer for complex state logic",
    do: "useReducer when state has multiple sub-values or complex updates",
    dont: "Multiple useState with interdependent updates",
    codeGood: "const [state, dispatch] = useReducer(reducer, initialState);",
    codeBad: "const [a, setA] = useState(); const [b, setB] = useState(); // with complex interdependencies",
    severity: "Medium",
  },

  // Forms
  {
    category: "Forms",
    issue: "Controlled vs Uncontrolled",
    keywords: ["controlled", "uncontrolled", "form", "input"],
    platform: "Web",
    description: "Choose controlled or uncontrolled inputs consistently",
    do: "Use controlled for validation, uncontrolled for simple forms",
    dont: "Mix controlled and uncontrolled for same input",
    codeGood: "const [value, setValue] = useState(''); <input value={value} onChange={e => setValue(e.target.value)} />",
    codeBad: "<input value={value} defaultValue='...' />",
    severity: "Medium",
  },
  {
    category: "Forms",
    issue: "Form Libraries",
    keywords: ["form", "library", "validation", "react-hook-form"],
    platform: "Web",
    description: "Use form libraries for complex forms",
    do: "Use react-hook-form or Formik for complex forms",
    dont: "Manual state management for 10+ field forms",
    codeGood: "const { register, handleSubmit } = useForm();",
    codeBad: "10 useState hooks for form fields",
    severity: "Medium",
  },

  // Error Handling
  {
    category: "Errors",
    issue: "Error Boundaries",
    keywords: ["error", "boundary", "catch", "fallback"],
    platform: "Web",
    description: "Use Error Boundaries to catch rendering errors",
    do: "Wrap sections with Error Boundaries",
    dont: "Let errors crash entire app",
    codeGood: "<ErrorBoundary fallback={<Error />}><Component /></ErrorBoundary>",
    codeBad: "No error boundaries in app",
    severity: "High",
  },
  {
    category: "Errors",
    issue: "Async Error Handling",
    keywords: ["async", "error", "try", "catch"],
    platform: "Web",
    description: "Handle errors in async operations properly",
    do: "Try-catch async operations, show error state",
    dont: "Ignore errors or let them propagate unhandled",
    codeGood: "try { await fetch(...); } catch (e) { setError(e.message); }",
    codeBad: "await fetch(...); // no error handling",
    severity: "High",
  },

  // Testing
  {
    category: "Testing",
    issue: "Testing Library Queries",
    keywords: ["testing", "query", "getby", "findby"],
    platform: "Web",
    description: "Use appropriate Testing Library queries",
    do: "Prefer getByRole, getByLabelText for accessible queries",
    dont: "Query by test ID when better options exist",
    codeGood: "screen.getByRole('button', { name: 'Submit' })",
    codeBad: "screen.getByTestId('submit-button')",
    severity: "Medium",
  },
  {
    category: "Testing",
    issue: "Async Testing",
    keywords: ["async", "test", "waitFor", "findBy"],
    platform: "Web",
    description: "Handle async operations properly in tests",
    do: "Use waitFor or findBy for async assertions",
    dont: "Use arbitrary delays or getBy for async content",
    codeGood: "await screen.findByText('Loaded'); or await waitFor(() => expect(...));",
    codeBad: "await new Promise(r => setTimeout(r, 1000)); expect(...);",
    severity: "Medium",
  },
];

// Pre-built BM25 index for react guideline search
let reactSearchIndex: BM25<ReactGuideline> | null = null;

function getReactSearchIndex(): BM25<ReactGuideline> {
  if (!reactSearchIndex) {
    reactSearchIndex = new BM25(
      reactGuidelines,
      (g) =>
        `${g.category} ${g.issue} ${g.keywords.join(" ")} ${g.description}`
    );
  }
  return reactSearchIndex;
}

/**
 * Search React guidelines by query
 */
export function searchReactGuidelines(
  query: string,
  maxResults = 5
): ReactGuideline[] {
  return getReactSearchIndex().search(query, maxResults);
}

/**
 * Get React guidelines by category
 */
export function getReactGuidelinesByCategory(category: string): ReactGuideline[] {
  const categoryLower = category.toLowerCase();
  return reactGuidelines.filter(
    (g) => g.category.toLowerCase() === categoryLower
  );
}

/**
 * Get React guidelines by severity
 */
export function getReactGuidelinesBySeverity(severity: Severity): ReactGuideline[] {
  return reactGuidelines.filter((g) => g.severity === severity);
}

/**
 * Get all React guidelines
 */
export function getAllReactGuidelines(): ReactGuideline[] {
  return reactGuidelines;
}

/**
 * Get all React guideline categories
 */
export function getReactCategories(): string[] {
  return [...new Set(reactGuidelines.map((g) => g.category))];
}
