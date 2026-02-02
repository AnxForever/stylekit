// Knowledge Base - UX Guidelines
// Data converted from ux-guidelines.csv

import type { UXGuideline, Severity, Platform } from "./types";
import { BM25 } from "./search";

export const uxGuidelines: UXGuideline[] = [
  // Navigation
  {
    category: "Navigation",
    issue: "Smooth Scroll",
    keywords: ["scroll", "smooth", "anchor", "navigation"],
    platform: "Web",
    description: "Anchor links should scroll smoothly to target section",
    do: "Use scroll-behavior: smooth on html element",
    dont: "Jump directly without transition",
    codeGood: "html { scroll-behavior: smooth; }",
    codeBad: "<a href='#section'> without CSS",
    severity: "High",
  },
  {
    category: "Navigation",
    issue: "Back Button Support",
    keywords: ["back", "history", "browser", "navigation"],
    platform: "Web",
    description: "SPA navigation should support browser back button",
    do: "Use proper history API or router with history support",
    dont: "Break browser navigation expectations",
    codeGood: "router.push('/page') with history support",
    codeBad: "window.location.href = '/page' for internal navigation",
    severity: "High",
  },
  {
    category: "Navigation",
    issue: "Breadcrumb Navigation",
    keywords: ["breadcrumb", "path", "hierarchy", "navigation"],
    platform: "All",
    description: "Show user's location in site hierarchy for deep pages",
    do: "Provide clickable breadcrumb trail for nested content",
    dont: "Leave users without context of their location",
    codeGood: "<nav aria-label='Breadcrumb'><ol>...</ol></nav>",
    codeBad: "No breadcrumbs on deep nested pages",
    severity: "Medium",
  },
  {
    category: "Navigation",
    issue: "Keyboard Navigation",
    keywords: ["keyboard", "tab", "focus", "accessibility"],
    platform: "Web",
    description: "All interactive elements must be keyboard accessible",
    do: "Ensure logical tab order and visible focus states",
    dont: "Make elements only clickable, not keyboard accessible",
    codeGood: "button { &:focus-visible { outline: 2px solid blue; } }",
    codeBad: "div onClick without tabIndex or role",
    severity: "Critical",
  },

  // Animation
  {
    category: "Animation",
    issue: "Reduce Motion",
    keywords: ["motion", "animation", "reduce", "accessibility", "vestibular"],
    platform: "All",
    description: "Respect user's reduced motion preference",
    do: "Use prefers-reduced-motion media query to disable/reduce animations",
    dont: "Force animations on users who prefer reduced motion",
    codeGood: "@media (prefers-reduced-motion: reduce) { * { animation: none; } }",
    codeBad: "Ignoring prefers-reduced-motion",
    severity: "Critical",
  },
  {
    category: "Animation",
    issue: "Loading States",
    keywords: ["loading", "spinner", "skeleton", "feedback"],
    platform: "All",
    description: "Provide visual feedback during loading operations",
    do: "Show skeleton screens or spinners for async operations",
    dont: "Leave users staring at blank screens",
    codeGood: "<Skeleton className='h-4 w-full' />",
    codeBad: "Empty div while loading",
    severity: "High",
  },
  {
    category: "Animation",
    issue: "Transition Duration",
    keywords: ["transition", "duration", "timing", "performance"],
    platform: "All",
    description: "Keep transitions short and purposeful",
    do: "Use 150-300ms for micro-interactions, 300-500ms for page transitions",
    dont: "Use slow animations that delay user interaction",
    codeGood: "transition-duration: 200ms;",
    codeBad: "transition-duration: 1000ms; for buttons",
    severity: "Medium",
  },
  {
    category: "Animation",
    issue: "Hover Feedback",
    keywords: ["hover", "feedback", "interactive", "cursor"],
    platform: "Web",
    description: "Interactive elements should respond to hover",
    do: "Add subtle hover effects to clickable elements",
    dont: "Have no visual change on hover for interactive items",
    codeGood: "button:hover { transform: translateY(-2px); }",
    codeBad: "No hover state on buttons",
    severity: "Medium",
  },

  // Layout
  {
    category: "Layout",
    issue: "Responsive Breakpoints",
    keywords: ["responsive", "mobile", "breakpoint", "viewport"],
    platform: "All",
    description: "Design should adapt to different screen sizes",
    do: "Use mobile-first approach with appropriate breakpoints",
    dont: "Design only for desktop or use fixed widths",
    codeGood: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    codeBad: "width: 1200px; without responsiveness",
    severity: "Critical",
  },
  {
    category: "Layout",
    issue: "Touch Target Size",
    keywords: ["touch", "target", "mobile", "button", "tap"],
    platform: "Mobile",
    description: "Touch targets must be large enough for finger taps",
    do: "Minimum 44x44px touch targets (48x48px recommended)",
    dont: "Use small touch targets that are hard to tap",
    codeGood: "min-h-[44px] min-w-[44px]",
    codeBad: "w-6 h-6 for mobile touch targets",
    severity: "High",
  },
  {
    category: "Layout",
    issue: "Content Width",
    keywords: ["width", "reading", "line-length", "typography"],
    platform: "All",
    description: "Text content should have optimal reading width",
    do: "Limit content width to 65-75 characters for readability",
    dont: "Allow text to span full viewport width",
    codeGood: "max-w-prose (65ch)",
    codeBad: "w-full for paragraphs of text",
    severity: "Medium",
  },
  {
    category: "Layout",
    issue: "Spacing Consistency",
    keywords: ["spacing", "padding", "margin", "consistency"],
    platform: "All",
    description: "Use consistent spacing throughout the interface",
    do: "Use a spacing scale (4px, 8px, 16px, 24px, 32px, 48px)",
    dont: "Use arbitrary spacing values",
    codeGood: "gap-4 p-6 mb-8",
    codeBad: "margin: 13px; padding: 7px;",
    severity: "Medium",
  },

  // Accessibility
  {
    category: "Accessibility",
    issue: "Color Contrast",
    keywords: ["contrast", "color", "wcag", "readability"],
    platform: "All",
    description: "Text must have sufficient contrast with background",
    do: "Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text",
    dont: "Use low contrast text that's hard to read",
    codeGood: "text-gray-900 on bg-white (21:1)",
    codeBad: "text-gray-400 on bg-gray-200 (1.8:1)",
    severity: "Critical",
  },
  {
    category: "Accessibility",
    issue: "Alt Text for Images",
    keywords: ["alt", "image", "screen-reader", "accessibility"],
    platform: "All",
    description: "Images must have descriptive alt text",
    do: "Provide meaningful alt text; use empty alt for decorative images",
    dont: "Leave alt empty for meaningful images or use 'image of...'",
    codeGood: "<img alt='Team meeting in modern office' />",
    codeBad: "<img alt='image' /> or <img /> without alt",
    severity: "Critical",
  },
  {
    category: "Accessibility",
    issue: "Form Labels",
    keywords: ["label", "form", "input", "accessibility"],
    platform: "All",
    description: "Form inputs must have associated labels",
    do: "Use <label htmlFor> or aria-label for all inputs",
    dont: "Use placeholder as the only label",
    codeGood: "<label htmlFor='email'>Email</label><input id='email' />",
    codeBad: "<input placeholder='Email' /> without label",
    severity: "Critical",
  },
  {
    category: "Accessibility",
    issue: "Focus Indicators",
    keywords: ["focus", "outline", "keyboard", "accessibility"],
    platform: "Web",
    description: "Focused elements must have visible indicators",
    do: "Maintain visible focus rings with sufficient contrast",
    dont: "Remove focus outlines without replacement",
    codeGood: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    codeBad: "outline: none; without alternative focus style",
    severity: "Critical",
  },
  {
    category: "Accessibility",
    issue: "Skip Links",
    keywords: ["skip", "link", "navigation", "accessibility"],
    platform: "Web",
    description: "Provide skip links for keyboard users",
    do: "Add 'Skip to main content' link at page start",
    dont: "Force keyboard users to tab through entire navigation",
    codeGood: "<a href='#main' className='sr-only focus:not-sr-only'>Skip to content</a>",
    codeBad: "No skip navigation link",
    severity: "High",
  },

  // Forms
  {
    category: "Forms",
    issue: "Error Messages",
    keywords: ["error", "validation", "form", "message"],
    platform: "All",
    description: "Display clear, helpful error messages",
    do: "Show specific error messages near the relevant field",
    dont: "Use generic errors or only show errors on submit",
    codeGood: "<p className='text-red-500'>Email must include @</p>",
    codeBad: "alert('Error!') or red border only",
    severity: "High",
  },
  {
    category: "Forms",
    issue: "Input Types",
    keywords: ["input", "type", "keyboard", "mobile"],
    platform: "All",
    description: "Use appropriate input types for better UX",
    do: "Use email, tel, number, date types for appropriate keyboards",
    dont: "Use text type for all inputs",
    codeGood: "<input type='email' /> <input type='tel' />",
    codeBad: "<input type='text' /> for email fields",
    severity: "Medium",
  },
  {
    category: "Forms",
    issue: "Autocomplete",
    keywords: ["autocomplete", "autofill", "form", "convenience"],
    platform: "Web",
    description: "Enable browser autocomplete for common fields",
    do: "Use autocomplete attribute for name, email, address, etc.",
    dont: "Disable autocomplete without good reason",
    codeGood: "<input autocomplete='email' />",
    codeBad: "autocomplete='off' for regular form fields",
    severity: "Medium",
  },
  {
    category: "Forms",
    issue: "Submit Button State",
    keywords: ["submit", "button", "disabled", "loading"],
    platform: "All",
    description: "Disable submit button during form submission",
    do: "Disable and show loading state while submitting",
    dont: "Allow multiple submissions or leave button unchanged",
    codeGood: "<button disabled={isSubmitting}>Submitting...</button>",
    codeBad: "<button>Submit</button> always enabled",
    severity: "High",
  },

  // Feedback
  {
    category: "Feedback",
    issue: "Toast Notifications",
    keywords: ["toast", "notification", "alert", "feedback"],
    platform: "All",
    description: "Show non-intrusive feedback for actions",
    do: "Use toasts for success/error feedback; auto-dismiss success",
    dont: "Use alerts that block interaction or no feedback at all",
    codeGood: "toast.success('Saved!') with 3s auto-dismiss",
    codeBad: "alert('Saved!') or window.confirm()",
    severity: "Medium",
  },
  {
    category: "Feedback",
    issue: "Empty States",
    keywords: ["empty", "state", "zero", "no-data"],
    platform: "All",
    description: "Design meaningful empty states",
    do: "Show helpful message and action when no data exists",
    dont: "Show blank screen or just 'No data'",
    codeGood: "<EmptyState icon={<Inbox />} title='No messages' action='Compose' />",
    codeBad: "<p>No data</p> or empty table",
    severity: "Medium",
  },
  {
    category: "Feedback",
    issue: "Progress Indicators",
    keywords: ["progress", "step", "multi-step", "wizard"],
    platform: "All",
    description: "Show progress in multi-step processes",
    do: "Display step indicator and progress for long forms/wizards",
    dont: "Hide how many steps remain or current position",
    codeGood: "<Stepper current={2} total={4} />",
    codeBad: "Multi-step form without step indicator",
    severity: "Medium",
  },
  {
    category: "Feedback",
    issue: "Confirmation Dialogs",
    keywords: ["confirm", "dialog", "modal", "destructive"],
    platform: "All",
    description: "Confirm destructive actions before executing",
    do: "Show confirmation dialog for delete/irreversible actions",
    dont: "Execute destructive actions without confirmation",
    codeGood: "<AlertDialog>Are you sure you want to delete?</AlertDialog>",
    codeBad: "onClick={deleteItem} without confirmation",
    severity: "High",
  },

  // Performance
  {
    category: "Performance",
    issue: "Image Optimization",
    keywords: ["image", "optimize", "lazy", "loading"],
    platform: "Web",
    description: "Optimize images for fast loading",
    do: "Use next/image, lazy loading, appropriate formats (WebP)",
    dont: "Load full-size images or all images at once",
    codeGood: "<Image src='...' loading='lazy' />",
    codeBad: "<img src='large-image.png' />",
    severity: "High",
  },
  {
    category: "Performance",
    issue: "Infinite Scroll",
    keywords: ["infinite", "scroll", "pagination", "loading"],
    platform: "All",
    description: "Implement efficient infinite scroll or pagination",
    do: "Use virtual scrolling for long lists; provide pagination option",
    dont: "Render thousands of items in DOM or load all at once",
    codeGood: "<VirtualList items={items} itemHeight={50} />",
    codeBad: "{items.map(item => <Item />)} for 10000 items",
    severity: "High",
  },

  // Content
  {
    category: "Content",
    issue: "Truncation with Tooltip",
    keywords: ["truncate", "ellipsis", "tooltip", "overflow"],
    platform: "All",
    description: "Show full content when truncated text is hovered",
    do: "Add tooltip or expand option for truncated content",
    dont: "Truncate text with no way to see full content",
    codeGood: "<Tooltip content={fullText}><span className='truncate'>{text}</span></Tooltip>",
    codeBad: "<span className='truncate'>{text}</span> without tooltip",
    severity: "Medium",
  },
  {
    category: "Content",
    issue: "Date Formatting",
    keywords: ["date", "time", "format", "localization"],
    platform: "All",
    description: "Format dates appropriately for users",
    do: "Use relative dates for recent ('2 hours ago'); absolute for older",
    dont: "Show raw timestamps or inconsistent formats",
    codeGood: "formatDistanceToNow(date) or format(date, 'PPP')",
    codeBad: "date.toISOString() displayed to users",
    severity: "Medium",
  },

  // Search
  {
    category: "Search",
    issue: "Search Debounce",
    keywords: ["search", "debounce", "input", "performance"],
    platform: "All",
    description: "Debounce search input to reduce API calls",
    do: "Debounce search input by 300-500ms",
    dont: "Make API call on every keystroke",
    codeGood: "useDebounce(searchTerm, 300)",
    codeBad: "useEffect(() => search(term), [term]) without debounce",
    severity: "High",
  },
  {
    category: "Search",
    issue: "Search Results Highlight",
    keywords: ["search", "highlight", "match", "results"],
    platform: "All",
    description: "Highlight matching terms in search results",
    do: "Highlight the searched term in results",
    dont: "Show results without indicating why they matched",
    codeGood: "<mark>{matchedTerm}</mark>",
    codeBad: "Plain text results without highlighting",
    severity: "Low",
  },

  // Mobile
  {
    category: "Mobile",
    issue: "Pull to Refresh",
    keywords: ["pull", "refresh", "mobile", "gesture"],
    platform: "Mobile",
    description: "Support pull-to-refresh on mobile for data refresh",
    do: "Implement pull-to-refresh for list/feed content",
    dont: "Require button tap to refresh content",
    codeGood: "<PullToRefresh onRefresh={handleRefresh}>",
    codeBad: "Only refresh button for mobile lists",
    severity: "Medium",
  },
  {
    category: "Mobile",
    issue: "Bottom Navigation",
    keywords: ["bottom", "navigation", "mobile", "tab"],
    platform: "Mobile",
    description: "Place primary navigation at bottom for thumb reach",
    do: "Use bottom navigation bar for main app sections",
    dont: "Put all navigation at top requiring stretch to reach",
    codeGood: "<BottomNav items={[Home, Search, Profile]} />",
    codeBad: "Top-only navigation on mobile apps",
    severity: "High",
  },
  {
    category: "Mobile",
    issue: "Safe Areas",
    keywords: ["safe", "area", "notch", "inset"],
    platform: "Mobile",
    description: "Respect device safe areas (notch, home indicator)",
    do: "Use env(safe-area-inset-*) for proper spacing",
    dont: "Let content overlap with device UI elements",
    codeGood: "padding-bottom: env(safe-area-inset-bottom);",
    codeBad: "Fixed bottom bar without safe area consideration",
    severity: "High",
  },
];

// Pre-built BM25 index for UX guideline search
let uxSearchIndex: BM25<UXGuideline> | null = null;

function getUXSearchIndex(): BM25<UXGuideline> {
  if (!uxSearchIndex) {
    uxSearchIndex = new BM25(
      uxGuidelines,
      (g) =>
        `${g.category} ${g.issue} ${g.keywords.join(" ")} ${g.description}`
    );
  }
  return uxSearchIndex;
}

/**
 * Search UX guidelines by query
 */
export function searchUXGuidelines(
  query: string,
  maxResults = 5
): UXGuideline[] {
  return getUXSearchIndex().search(query, maxResults);
}

/**
 * Get UX guidelines by category
 */
export function getUXGuidelinesByCategory(category: string): UXGuideline[] {
  const categoryLower = category.toLowerCase();
  return uxGuidelines.filter(
    (g) => g.category.toLowerCase() === categoryLower
  );
}

/**
 * Get UX guidelines by severity
 */
export function getUXGuidelinesBySeverity(severity: Severity): UXGuideline[] {
  return uxGuidelines.filter((g) => g.severity === severity);
}

/**
 * Get UX guidelines by platform
 */
export function getUXGuidelinesByPlatform(platform: Platform): UXGuideline[] {
  return uxGuidelines.filter(
    (g) => g.platform === platform || g.platform === "All"
  );
}

/**
 * Get all UX guidelines
 */
export function getAllUXGuidelines(): UXGuideline[] {
  return uxGuidelines;
}

/**
 * Get all UX guideline categories
 */
export function getUXCategories(): string[] {
  return [...new Set(uxGuidelines.map((g) => g.category))];
}
