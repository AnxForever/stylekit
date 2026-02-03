// Auth Layout Archetypes

import type { LayoutArchetype } from "./types";

export const authArchetypes: LayoutArchetype[] = [
  {
    id: "auth-split",
    name: "Split Auth",
    nameZh: "分屏登录",
    category: "auth",
    description: "Split-screen auth layout with branding on left and form on right.",
    descriptionZh: "左侧品牌展示 + 右侧表单，适合登录注册页",
    sections: [
      {
        id: "brand-panel",
        name: "Brand Panel",
        nameZh: "品牌面板",
        required: true,
        order: 1,
        layout: {
          type: "stack",
          minHeight: "100vh",
          padding: "xl",
          verticalAlign: "center",
          horizontalAlign: "center",
          background: "accent",
        },
        components: ["heading", "paragraph"],
        description: "Brand imagery, tagline, or testimonial",
        slots: [
          { id: "logo", name: "Logo", type: "image", required: true },
          { id: "tagline", name: "Tagline", type: "heading", required: false },
          { id: "testimonial", name: "Testimonial", type: "component", required: false },
          { id: "features", name: "Feature List", type: "list", required: false },
        ],
      },
      {
        id: "form-panel",
        name: "Form Panel",
        nameZh: "表单面板",
        required: true,
        order: 2,
        layout: {
          type: "stack",
          minHeight: "100vh",
          padding: "xl",
          verticalAlign: "center",
          horizontalAlign: "center",
        },
        components: ["heading", "input", "button", "paragraph"],
        description: "Login/signup form with social auth options",
        slots: [
          { id: "logo", name: "Logo (Mobile)", type: "image", required: false },
          { id: "title", name: "Form Title", type: "heading", required: true },
          { id: "subtitle", name: "Subtitle", type: "paragraph", required: false },
          { id: "socialAuth", name: "Social Auth Buttons", type: "component", required: false },
          { id: "divider", name: "Divider", type: "text", required: false },
          { id: "form", name: "Auth Form", type: "component", required: true },
          { id: "links", name: "Action Links", type: "component", required: true },
        ],
      },
      {
        id: "footer",
        name: "Footer Links",
        nameZh: "底部链接",
        required: false,
        order: 3,
        layout: {
          type: "contained",
          maxWidth: "md",
          padding: "sm",
          horizontalAlign: "center",
        },
        components: ["nav"],
        description: "Terms, privacy, and help links",
      },
    ],
    responsive: {
      mobile: "Single column. Brand panel hidden or minimal. Form only.",
      tablet: "Brand panel visible as slim column. Form takes majority.",
      desktop: "Full 50/50 split. Large brand imagery. Centered form.",
    },
    tags: ["login", "signup", "register", "authentication"],
  },
];
