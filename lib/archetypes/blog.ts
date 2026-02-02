// Blog Layout Archetypes

import type { LayoutArchetype } from "./types";

export const blogArchetypes: LayoutArchetype[] = [
  {
    id: "blog-classic",
    name: "Classic Blog",
    nameZh: "经典博客",
    category: "blog",
    description: "Traditional blog layout with featured post and post grid.",
    descriptionZh: "经典博客布局，精选文章 + 文章网格",
    sections: [
      {
        id: "header",
        name: "Header",
        nameZh: "顶栏",
        required: true,
        order: 1,
        layout: {
          type: "contained",
          maxWidth: "6xl",
          padding: "sm",
        },
        components: ["nav", "button"],
      },
      {
        id: "featured",
        name: "Featured Post",
        nameZh: "精选文章",
        required: false,
        order: 2,
        layout: {
          type: "contained",
          maxWidth: "6xl",
          padding: "lg",
        },
        components: ["card", "heading", "badge"],
      },
      {
        id: "posts",
        name: "Post Grid",
        nameZh: "文章列表",
        required: true,
        order: 3,
        layout: {
          type: "grid",
          maxWidth: "6xl",
          columns: { mobile: 1, tablet: 2, desktop: 3 },
          padding: "lg",
          gap: "md",
        },
        components: ["card"],
      },
      {
        id: "pagination",
        name: "Pagination",
        nameZh: "分页",
        required: true,
        order: 4,
        layout: {
          type: "contained",
          maxWidth: "6xl",
          padding: "md",
          horizontalAlign: "center",
        },
        components: ["button"],
      },
      {
        id: "footer",
        name: "Footer",
        nameZh: "页脚",
        required: true,
        order: 5,
        layout: { type: "contained", maxWidth: "6xl", padding: "md" },
        components: ["nav"],
      },
    ],
    responsive: {
      mobile: "Single column posts. Featured post card simplified.",
      tablet: "2-column post grid.",
      desktop: "3-column post grid. Large featured post.",
    },
    tags: ["content", "articles", "news"],
  },

  {
    id: "blog-magazine",
    name: "Magazine Style",
    nameZh: "杂志风格",
    category: "blog",
    description: "Magazine-style layout with varied card sizes and sidebar.",
    descriptionZh: "杂志风格布局，卡片大小不一 + 侧边栏",
    sections: [
      {
        id: "header",
        name: "Header",
        nameZh: "顶栏",
        required: true,
        order: 1,
        layout: {
          type: "contained",
          maxWidth: "7xl",
          padding: "sm",
        },
        components: ["nav", "input"],
      },
      {
        id: "main-with-sidebar",
        name: "Main Content",
        nameZh: "主内容",
        required: true,
        order: 2,
        layout: {
          type: "sidebar",
          maxWidth: "7xl",
          padding: "lg",
          gap: "lg",
        },
        components: ["card", "heading"],
      },
      {
        id: "footer",
        name: "Footer",
        nameZh: "页脚",
        required: true,
        order: 3,
        layout: { type: "contained", maxWidth: "7xl", padding: "md" },
        components: ["nav"],
      },
    ],
    responsive: {
      mobile: "Sidebar moves below main content. Single column.",
      tablet: "2-column main grid. Sidebar below.",
      desktop: "Main content + sidebar layout. Magazine grid.",
    },
    tags: ["editorial", "magazine", "news"],
  },
];
