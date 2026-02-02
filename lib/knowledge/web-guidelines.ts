// Knowledge Base - Web Interface Guidelines
// Data converted from web-interface.csv

import type { WebGuideline, Severity } from "./types";
import { BM25 } from "./search";

export const webGuidelines: WebGuideline[] = [
  // Accessibility
  {
    category: "Accessibility",
    issue: "Icon Button Labels",
    keywords: ["icon", "button", "aria-label", "accessibility"],
    platform: "Web",
    description: "Icon-only buttons must have accessible names",
    do: "Add aria-label to icon buttons",
    dont: "Icon button without label",
    codeGood: "<button aria-label='Close'><XIcon /></button>",
    codeBad: "<button><XIcon /></button>",
    severity: "Critical",
  },
  {
    category: "Accessibility",
    issue: "Link Purpose",
    keywords: ["link", "text", "descriptive", "accessibility"],
    platform: "Web",
    description: "Link text should describe the destination",
    do: "Use descriptive link text",
    dont: "Use 'click here' or 'read more' alone",
    codeGood: "<a href='/docs'>Read the documentation</a>",
    codeBad: "<a href='/docs'>Click here</a>",
    severity: "High",
  },
  {
    category: "Accessibility",
    issue: "Heading Hierarchy",
    keywords: ["heading", "h1", "h2", "hierarchy", "semantic"],
    platform: "Web",
    description: "Use proper heading hierarchy (h1 > h2 > h3)",
    do: "Maintain logical heading order without skipping levels",
    dont: "Skip heading levels or use for styling",
    codeGood: "<h1>Title</h1><h2>Section</h2><h3>Subsection</h3>",
    codeBad: "<h1>Title</h1><h4>Subsection</h4>",
    severity: "High",
  },
  {
    category: "Accessibility",
    issue: "Interactive Elements",
    keywords: ["button", "div", "interactive", "semantic"],
    platform: "Web",
    description: "Use semantic elements for interactive items",
    do: "Use button for actions, a for navigation",
    dont: "Use div with onClick for buttons",
    codeGood: "<button onClick={handleClick}>Submit</button>",
    codeBad: "<div onClick={handleClick}>Submit</div>",
    severity: "Critical",
  },
  {
    category: "Accessibility",
    issue: "Error Announcements",
    keywords: ["error", "aria-live", "announce", "screen-reader"],
    platform: "Web",
    description: "Announce errors to screen readers",
    do: "Use aria-live regions for dynamic error messages",
    dont: "Only visually display errors",
    codeGood: "<div role='alert' aria-live='polite'>{error}</div>",
    codeBad: "<div className='text-red-500'>{error}</div>",
    severity: "High",
  },
  {
    category: "Accessibility",
    issue: "Table Accessibility",
    keywords: ["table", "header", "th", "scope", "accessibility"],
    platform: "Web",
    description: "Data tables need proper headers and structure",
    do: "Use th with scope for headers, caption for table description",
    dont: "Use div grid for tabular data",
    codeGood: "<table><caption>Sales Data</caption><thead><tr><th scope='col'>Name</th></tr></thead>",
    codeBad: "<div className='grid'>...</div> for tabular data",
    severity: "High",
  },

  // Focus Management
  {
    category: "Focus",
    issue: "Modal Focus Trap",
    keywords: ["modal", "focus", "trap", "dialog"],
    platform: "Web",
    description: "Trap focus inside modals when open",
    do: "Trap focus and return focus on close",
    dont: "Allow focus to escape modal",
    codeGood: "<Dialog><FocusTrap>...</FocusTrap></Dialog>",
    codeBad: "<div className='modal'>...</div> without focus management",
    severity: "Critical",
  },
  {
    category: "Focus",
    issue: "Focus Visible",
    keywords: ["focus", "visible", "outline", "keyboard"],
    platform: "Web",
    description: "Show focus only for keyboard navigation",
    do: "Use :focus-visible for keyboard-only focus styles",
    dont: "Show focus ring on mouse click",
    codeGood: "button:focus-visible { outline: 2px solid blue; }",
    codeBad: "button:focus { outline: 2px solid blue; }",
    severity: "Medium",
  },
  {
    category: "Focus",
    issue: "Skip to Content",
    keywords: ["skip", "content", "navigation", "accessibility"],
    platform: "Web",
    description: "Provide skip link for keyboard users",
    do: "Add skip link as first focusable element",
    dont: "Force tabbing through entire header",
    codeGood: "<a href='#main' className='sr-only focus:not-sr-only'>Skip to content</a>",
    codeBad: "No skip link on pages with complex headers",
    severity: "High",
  },

  // Forms
  {
    category: "Forms",
    issue: "Required Fields",
    keywords: ["required", "asterisk", "form", "validation"],
    platform: "Web",
    description: "Clearly indicate required fields",
    do: "Mark required fields with asterisk and aria-required",
    dont: "Only show required on error",
    codeGood: "<label>Email *<input aria-required='true' /></label>",
    codeBad: "<input required /> without visual indicator",
    severity: "High",
  },
  {
    category: "Forms",
    issue: "Input Descriptions",
    keywords: ["input", "description", "help", "aria-describedby"],
    platform: "Web",
    description: "Provide help text for complex inputs",
    do: "Use aria-describedby to link help text",
    dont: "Put help text without association",
    codeGood: "<input aria-describedby='help' /><p id='help'>Format: MM/DD/YYYY</p>",
    codeBad: "<input /><p>Format: MM/DD/YYYY</p> without association",
    severity: "Medium",
  },
  {
    category: "Forms",
    issue: "Inline Validation",
    keywords: ["validation", "inline", "error", "realtime"],
    platform: "Web",
    description: "Validate on blur or after typing stops",
    do: "Validate on blur or after 500ms debounce",
    dont: "Validate on every keystroke or only on submit",
    codeGood: "onBlur={validate} or debounced onChange",
    codeBad: "onChange={validate} on every character",
    severity: "Medium",
  },
  {
    category: "Forms",
    issue: "Password Visibility Toggle",
    keywords: ["password", "visibility", "toggle", "show"],
    platform: "Web",
    description: "Allow users to view password while typing",
    do: "Provide show/hide password button",
    dont: "Force blind password entry",
    codeGood: "<input type={show ? 'text' : 'password'} /><button onClick={toggle}>Show</button>",
    codeBad: "<input type='password' /> without visibility toggle",
    severity: "Medium",
  },

  // Performance
  {
    category: "Performance",
    issue: "Preconnect Origins",
    keywords: ["preconnect", "dns", "prefetch", "performance"],
    platform: "Web",
    description: "Preconnect to required third-party origins",
    do: "Add preconnect for fonts, APIs, CDNs",
    dont: "Let browser discover origins at runtime",
    codeGood: "<link rel='preconnect' href='https://fonts.googleapis.com' />",
    codeBad: "No preconnect hints",
    severity: "Medium",
  },
  {
    category: "Performance",
    issue: "Font Display",
    keywords: ["font", "display", "swap", "fout", "foit"],
    platform: "Web",
    description: "Prevent invisible text during font loading",
    do: "Use font-display: swap for custom fonts",
    dont: "Let fonts block text rendering",
    codeGood: "@font-face { font-display: swap; }",
    codeBad: "@font-face { } without font-display",
    severity: "Medium",
  },
  {
    category: "Performance",
    issue: "Lazy Loading",
    keywords: ["lazy", "loading", "image", "iframe"],
    platform: "Web",
    description: "Lazy load offscreen images and iframes",
    do: "Use loading='lazy' for below-fold content",
    dont: "Load all images immediately",
    codeGood: "<img loading='lazy' src='...' />",
    codeBad: "<img src='...' /> for all images",
    severity: "High",
  },

  // State Management
  {
    category: "State",
    issue: "Disabled State Clarity",
    keywords: ["disabled", "state", "cursor", "visual"],
    platform: "Web",
    description: "Make disabled state visually clear",
    do: "Use opacity, cursor, and aria-disabled",
    dont: "Only change color slightly",
    codeGood: "className='opacity-50 cursor-not-allowed' aria-disabled='true'",
    codeBad: "className='text-gray-400' without cursor or aria",
    severity: "Medium",
  },
  {
    category: "State",
    issue: "Loading State Buttons",
    keywords: ["loading", "button", "spinner", "disabled"],
    platform: "Web",
    description: "Show loading state on buttons during async actions",
    do: "Disable button, show spinner, update text",
    dont: "Keep button unchanged during loading",
    codeGood: "<button disabled><Spinner /> Saving...</button>",
    codeBad: "<button>Save</button> during save operation",
    severity: "High",
  },
  {
    category: "State",
    issue: "Optimistic Updates",
    keywords: ["optimistic", "update", "instant", "feedback"],
    platform: "Web",
    description: "Update UI immediately before server confirms",
    do: "Show optimistic update, rollback on error",
    dont: "Wait for server response for every action",
    codeGood: "setItems([...items, newItem]); await api.create(newItem);",
    codeBad: "const result = await api.create(newItem); setItems([...items, result]);",
    severity: "Medium",
  },
  {
    category: "State",
    issue: "Persisted State",
    keywords: ["persist", "state", "localStorage", "session"],
    platform: "Web",
    description: "Persist appropriate state across sessions",
    do: "Persist user preferences, form drafts to localStorage",
    dont: "Lose user work on page refresh",
    codeGood: "localStorage.setItem('theme', theme)",
    codeBad: "Theme resets to default on every visit",
    severity: "Medium",
  },

  // Typography
  {
    category: "Typography",
    issue: "Line Height",
    keywords: ["line-height", "leading", "readability", "typography"],
    platform: "Web",
    description: "Use appropriate line height for readability",
    do: "Use 1.5-1.75 line-height for body text",
    dont: "Use tight line-height for paragraphs",
    codeGood: "leading-relaxed (1.625)",
    codeBad: "leading-none (1) for body text",
    severity: "Medium",
  },
  {
    category: "Typography",
    issue: "Font Size Minimum",
    keywords: ["font-size", "small", "readable", "accessibility"],
    platform: "Web",
    description: "Maintain minimum readable font size",
    do: "Use minimum 16px for body text, 14px for secondary",
    dont: "Use font sizes below 12px",
    codeGood: "text-base (16px) for body",
    codeBad: "text-xs (12px) for important content",
    severity: "High",
  },

  // Anti-Patterns
  {
    category: "Anti-Pattern",
    issue: "Autoplaying Video",
    keywords: ["autoplay", "video", "audio", "annoying"],
    platform: "Web",
    description: "Avoid autoplaying video with sound",
    do: "Autoplay muted only, provide controls",
    dont: "Autoplay with sound without user consent",
    codeGood: "<video autoplay muted controls />",
    codeBad: "<video autoplay /> with sound",
    severity: "High",
  },
  {
    category: "Anti-Pattern",
    issue: "Popup Timing",
    keywords: ["popup", "modal", "newsletter", "timing"],
    platform: "Web",
    description: "Avoid immediate popups on page load",
    do: "Wait for engagement (scroll, time) before showing popup",
    dont: "Show newsletter popup on immediate load",
    codeGood: "Show popup after 30s or 50% scroll",
    codeBad: "Show modal immediately on page load",
    severity: "Medium",
  },
  {
    category: "Anti-Pattern",
    issue: "Infinite Carousels",
    keywords: ["carousel", "slider", "auto", "rotate"],
    platform: "Web",
    description: "Avoid auto-rotating carousels",
    do: "User-controlled carousels with pause on hover",
    dont: "Auto-rotate content without control",
    codeGood: "<Carousel autoPlay={false} pauseOnHover />",
    codeBad: "<Carousel autoPlay interval={3000} />",
    severity: "Medium",
  },
  {
    category: "Anti-Pattern",
    issue: "Dark Patterns",
    keywords: ["dark", "pattern", "deceptive", "ux"],
    platform: "Web",
    description: "Avoid deceptive UI patterns",
    do: "Make opt-outs as easy as opt-ins; clear pricing",
    dont: "Use confusing language, hidden fees, trick questions",
    codeGood: "Clear 'Unsubscribe' button same size as Subscribe",
    codeBad: "Tiny 'No thanks' text vs large Subscribe button",
    severity: "Critical",
  },
];

// Pre-built BM25 index for web guideline search
let webSearchIndex: BM25<WebGuideline> | null = null;

function getWebSearchIndex(): BM25<WebGuideline> {
  if (!webSearchIndex) {
    webSearchIndex = new BM25(
      webGuidelines,
      (g) =>
        `${g.category} ${g.issue} ${g.keywords.join(" ")} ${g.description}`
    );
  }
  return webSearchIndex;
}

/**
 * Search web guidelines by query
 */
export function searchWebGuidelines(
  query: string,
  maxResults = 5
): WebGuideline[] {
  return getWebSearchIndex().search(query, maxResults);
}

/**
 * Get web guidelines by category
 */
export function getWebGuidelinesByCategory(category: string): WebGuideline[] {
  const categoryLower = category.toLowerCase();
  return webGuidelines.filter(
    (g) => g.category.toLowerCase() === categoryLower
  );
}

/**
 * Get web guidelines by severity
 */
export function getWebGuidelinesBySeverity(severity: Severity): WebGuideline[] {
  return webGuidelines.filter((g) => g.severity === severity);
}

/**
 * Get all web guidelines
 */
export function getAllWebGuidelines(): WebGuideline[] {
  return webGuidelines;
}

/**
 * Get all web guideline categories
 */
export function getWebCategories(): string[] {
  return [...new Set(webGuidelines.map((g) => g.category))];
}
