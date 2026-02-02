// Prompt Builder - Page type templates

import type { PageType, InteractionLevel } from "./types";

export interface PageTemplate {
  sections: string[];
  components: string[];
  interactionHints: Record<InteractionLevel, string>;
}

export const pageTemplates: Record<PageType, PageTemplate> = {
  landing: {
    sections: [
      "Hero Section — headline, subheadline, CTA button, optional hero image/illustration",
      "Features Section — 3-4 feature cards with icons, title, description",
      "Social Proof — testimonials or logo carousel",
      "CTA Section — conversion-focused call to action with form or button",
      "Footer — navigation links, copyright, social links",
    ],
    components: ["Button", "Card", "Input", "Badge", "Navigation"],
    interactionHints: {
      minimal: "Static layout, no animations. Focus on content hierarchy.",
      standard: "Subtle hover effects on buttons and cards. Smooth scroll navigation.",
      rich: "Scroll-triggered animations, parallax effects, animated counters, micro-interactions on hover.",
    },
  },
  dashboard: {
    sections: [
      "Sidebar Navigation — collapsible sidebar with navigation links and user avatar",
      "Header Bar — page title, search, notifications, user menu",
      "Stats Overview — 4 KPI cards with numbers and trend indicators",
      "Main Content Area — data table or chart with filters",
      "Activity Feed — recent activity list with timestamps",
    ],
    components: ["Button", "Card", "Input", "Table", "Badge", "Select", "Modal"],
    interactionHints: {
      minimal: "Clean data display. Basic hover states on interactive elements.",
      standard: "Animated chart transitions. Dropdown menus. Toast notifications.",
      rich: "Real-time data updates, drag-and-drop layouts, resizable panels, animated transitions between views.",
    },
  },
  blog: {
    sections: [
      "Header — logo, navigation, search, theme toggle",
      "Featured Post — large hero card with cover image, title, excerpt",
      "Post Grid — 6-9 post cards in responsive grid layout",
      "Sidebar — categories, tags, archive, newsletter signup",
      "Footer — about, social links, copyright",
    ],
    components: ["Card", "Button", "Input", "Badge", "Navigation", "Pagination"],
    interactionHints: {
      minimal: "Clean typography-focused layout. Minimal hover effects.",
      standard: "Hover effects on cards. Smooth page transitions. Reading progress bar.",
      rich: "Infinite scroll, animated card reveals, image lazy loading with blur-up, comment system with real-time updates.",
    },
  },
  form: {
    sections: [
      "Form Header — title, description, step indicator (if multi-step)",
      "Form Body — grouped input fields with labels and validation",
      "Form Actions — submit, cancel, save draft buttons",
      "Success/Error State — confirmation message or error summary",
    ],
    components: ["Input", "Select", "Checkbox", "Radio", "Button", "Alert", "Progress"],
    interactionHints: {
      minimal: "Basic form validation. Required field indicators.",
      standard: "Inline validation, focus transitions, field grouping with collapsible sections.",
      rich: "Multi-step wizard with progress bar, conditional fields, auto-save, real-time validation with suggestions.",
    },
  },
  list: {
    sections: [
      "Header — page title, view toggle (grid/list), sort controls",
      "Filter Bar — search, category filters, status filters",
      "Content List — items displayed in selected view mode",
      "Pagination — page navigation or load more button",
      "Empty State — illustration and CTA when no results",
    ],
    components: ["Card", "Button", "Input", "Badge", "Select", "Pagination"],
    interactionHints: {
      minimal: "Static list with basic filtering. Click to view details.",
      standard: "Animated view transitions. Hover cards with quick actions. Debounced search.",
      rich: "Virtual scrolling, drag-to-reorder, batch actions, animated filter transitions, skeleton loading states.",
    },
  },
};
