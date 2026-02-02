// Dashboard Layout Archetypes

import type { LayoutArchetype } from "./types";

export const dashboardArchetypes: LayoutArchetype[] = [
  {
    id: "dashboard-sidebar-left",
    name: "Left Sidebar",
    nameZh: "左侧边栏",
    category: "dashboard",
    description: "Classic dashboard with left sidebar navigation and main content area.",
    descriptionZh: "经典仪表盘布局，左侧导航栏 + 主内容区",
    sections: [
      {
        id: "sidebar",
        name: "Sidebar",
        nameZh: "侧边栏",
        required: true,
        order: 1,
        layout: {
          type: "stack",
          padding: "sm",
          gap: "sm",
          background: "secondary",
        },
        components: ["nav", "button"],
      },
      {
        id: "header",
        name: "Header",
        nameZh: "顶栏",
        required: true,
        order: 2,
        layout: {
          type: "full-width",
          padding: "sm",
        },
        components: ["input", "button", "badge"],
      },
      {
        id: "stats",
        name: "Stats",
        nameZh: "统计卡片",
        required: false,
        order: 3,
        layout: {
          type: "grid",
          columns: { mobile: 2, tablet: 2, desktop: 4 },
          padding: "md",
          gap: "md",
        },
        components: ["card"],
      },
      {
        id: "main-content",
        name: "Main Content",
        nameZh: "主内容",
        required: true,
        order: 4,
        layout: {
          type: "stack",
          padding: "md",
          gap: "md",
        },
        components: ["card", "heading"],
      },
    ],
    responsive: {
      mobile: "Sidebar collapses to hamburger menu. Stats 2-column.",
      tablet: "Sidebar visible, narrower. Stats 2-column.",
      desktop: "Full sidebar 280px. Stats 4-column. Spacious layout.",
    },
    tags: ["admin", "analytics", "management"],
  },

  {
    id: "dashboard-topnav",
    name: "Top Navigation",
    nameZh: "顶部导航",
    category: "dashboard",
    description: "Dashboard with horizontal top navigation. More content space.",
    descriptionZh: "顶部导航仪表盘，内容区域更宽",
    sections: [
      {
        id: "topnav",
        name: "Top Navigation",
        nameZh: "顶部导航",
        required: true,
        order: 1,
        layout: {
          type: "full-width",
          padding: "sm",
        },
        components: ["nav", "button", "input"],
      },
      {
        id: "page-header",
        name: "Page Header",
        nameZh: "页面标题",
        required: true,
        order: 2,
        layout: {
          type: "contained",
          maxWidth: "7xl",
          padding: "md",
        },
        components: ["heading", "button"],
      },
      {
        id: "content",
        name: "Content",
        nameZh: "内容",
        required: true,
        order: 3,
        layout: {
          type: "contained",
          maxWidth: "7xl",
          padding: "md",
          gap: "md",
        },
        components: ["card"],
      },
    ],
    responsive: {
      mobile: "Hamburger menu. Single column content.",
      tablet: "Full top nav. 2-column content grid.",
      desktop: "Full width top nav. Max-width content container.",
    },
    tags: ["app", "tool", "minimal"],
  },
];
