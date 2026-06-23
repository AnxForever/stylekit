// Static seed data + small style helpers shared by the admin-panel
// template views. Kept in its own file so the per-view files can stay
// focused on rendering and this data can be swapped or extended
// independently (e.g. wired to a real backend later) without touching
// the view components.

export const users = [
  {
    name: "Zhang Ming",
    email: "zhang@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "5 min ago",
  },
  {
    name: "Li Fang",
    email: "li@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "1 hour ago",
  },
  {
    name: "Wang Wei",
    email: "wang@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "3 days ago",
  },
  {
    name: "Zhao Jing",
    email: "zhao@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    name: "Liu Yang",
    email: "liu@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "30 min ago",
  },
  {
    name: "Chen Lin",
    email: "chen@example.com",
    role: "Viewer",
    status: "Suspended",
    lastLogin: "1 week ago",
  },
];

export const contentItems = [
  {
    id: "c1",
    title: "Getting Started Guide",
    type: "Article",
    author: "Zhang Ming",
    status: "Published",
    date: "2024-01-15",
  },
  {
    id: "c2",
    title: "Q4 Report Video",
    type: "Video",
    author: "Li Fang",
    status: "Draft",
    date: "2024-01-18",
  },
  {
    id: "c3",
    title: "Product Roadmap",
    type: "Document",
    author: "Liu Yang",
    status: "Published",
    date: "2024-01-10",
  },
  {
    id: "c4",
    title: "Team Photo Gallery",
    type: "Gallery",
    author: "Zhao Jing",
    status: "Review",
    date: "2024-01-20",
  },
  {
    id: "c5",
    title: "API Documentation",
    type: "Document",
    author: "Zhang Ming",
    status: "Published",
    date: "2024-01-08",
  },
  {
    id: "c6",
    title: "Onboarding Video Series",
    type: "Video",
    author: "Li Fang",
    status: "Draft",
    date: "2024-01-22",
  },
];

export const notifications = [
  {
    id: "n1",
    icon: "alert" as const,
    title: "New user registration",
    body: "Chen Lin created a new account and is pending approval.",
    time: "2 min ago",
  },
  {
    id: "n2",
    icon: "info" as const,
    title: "Content published",
    body: "\"Getting Started Guide\" was published by Zhang Ming.",
    time: "1 hour ago",
  },
  {
    id: "n3",
    icon: "check" as const,
    title: "Backup completed",
    body: "Nightly database backup finished successfully.",
    time: "6 hours ago",
  },
];

export const roles = [
  {
    name: "Admin",
    description: "Full system access and user management.",
    count: 2,
    color: "bg-indigo-100 text-indigo-700",
    permissions: [
      "Manage users",
      "Edit content",
      "View reports",
      "System settings",
      "Manage roles",
    ],
  },
  {
    name: "Editor",
    description: "Can create and edit content, cannot manage users.",
    count: 2,
    color: "bg-emerald-100 text-emerald-700",
    permissions: ["Edit content", "Publish content", "View reports"],
  },
  {
    name: "Viewer",
    description: "Read-only access to published content.",
    count: 2,
    color: "bg-gray-100 text-gray-600",
    permissions: ["View content", "View reports"],
  },
];

export const barChartData = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 80 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 72 },
  { label: "Sat", value: 38 },
  { label: "Sun", value: 48 },
];

export const recentActivity = [
  {
    user: "Zhang Ming",
    action: "edited",
    target: "API Documentation",
    time: "3 min ago",
  },
  {
    user: "Li Fang",
    action: "published",
    target: "Getting Started Guide",
    time: "1 hour ago",
  },
  {
    user: "Liu Yang",
    action: "created user",
    target: "Chen Lin",
    time: "2 hours ago",
  },
  {
    user: "Zhao Jing",
    action: "uploaded",
    target: "Team Photo Gallery",
    time: "4 hours ago",
  },
  {
    user: "Wang Wei",
    action: "viewed",
    target: "Q4 Report Video",
    time: "Yesterday",
  },
];

export function statusColor(status: string): string {
  switch (status) {
    case "Active":
    case "Published":
      return "bg-emerald-50 text-emerald-700";
    case "Inactive":
    case "Draft":
      return "bg-gray-100 text-gray-600";
    case "Suspended":
      return "bg-red-50 text-red-600";
    case "Review":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function contentTypeColor(type: string): string {
  switch (type) {
    case "Article":
      return "bg-blue-50 text-blue-600";
    case "Video":
      return "bg-purple-50 text-purple-600";
    case "Document":
      return "bg-indigo-50 text-indigo-600";
    case "Gallery":
      return "bg-pink-50 text-pink-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}