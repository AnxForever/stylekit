"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Shield,
  Users,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  Activity,
  Edit2,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ─── Data ──────────────────────────────────────────────────────────────────

const users = [
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

const contentItems = [
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

const notifications = [
  {
    id: "n1",
    icon: "alert",
    title: "New user registration",
    body: "Chen Lin created a new account and is pending approval.",
    time: "2 min ago",
  },
  {
    id: "n2",
    icon: "info",
    title: "Content published",
    body: "\"Getting Started Guide\" was published by Zhang Ming.",
    time: "1 hour ago",
  },
  {
    id: "n3",
    icon: "check",
    title: "Backup completed",
    body: "Nightly database backup finished successfully.",
    time: "6 hours ago",
  },
];

const roles = [
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

const barChartData = [
  { label: "Mon", value: 65 },
  { label: "Tue", value: 80 },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 90 },
  { label: "Fri", value: 72 },
  { label: "Sat", value: 38 },
  { label: "Sun", value: 48 },
];

const recentActivity = [
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

// ─── Helpers ───────────────────────────────────────────────────────────────

function statusColor(status: string) {
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

function contentTypeColor(type: string) {
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

// ─── Sub-views ─────────────────────────────────────────────────────────────

function DashboardView() {
  const maxValue = Math.max(...barChartData.map((d) => d.value));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back. Here is what is happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "2,847", delta: "+12%", up: true },
          { label: "Active Sessions", value: "184", delta: "+5%", up: true },
          { label: "Content Items", value: "631", delta: "+8%", up: true },
          { label: "Suspended", value: "3", delta: "-1", up: false },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-xl border border-gray-200"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold mt-1 text-gray-900">
              {stat.value}
            </p>
            <p
              className={`text-xs mt-1 font-medium ${
                stat.up ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {stat.delta} vs last week
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Active Users This Week
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Daily active sessions</p>
          </div>
          <TrendingUp className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="flex items-end gap-2 h-36">
          {barChartData.map((bar) => (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-indigo-500 rounded-t-sm transition-all hover:bg-indigo-600"
                style={{ height: `${(bar.value / maxValue) * 100}%` }}
                title={`${bar.label}: ${bar.value}`}
              />
              <span className="text-xs text-gray-400">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
          <Activity className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {recentActivity.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-medium text-indigo-600 shrink-0">
                  {item.user[0]}
                </div>
                <span className="text-sm text-gray-700">
                  <span className="font-medium">{item.user}</span>{" "}
                  <span className="text-gray-500">{item.action}</span>{" "}
                  <span className="font-medium">{item.target}</span>
                </span>
              </div>
              <span className="text-xs text-gray-400 shrink-0 ml-4">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface UsersViewProps {
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  onAddUser: () => void;
}

function UsersView({
  selectedUsers,
  setSelectedUsers,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onAddUser,
}: UsersViewProps) {
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleUser = (email: string) => {
    setSelectedUsers((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.email));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <button
          onClick={onAddUser}
          className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "2,847" },
          { label: "Active", value: "2,156" },
          { label: "Admins", value: "12" },
          { label: "Suspended", value: "3" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-xl border border-gray-200"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
        {selectedUsers.length > 0 && (
          <span className="self-center text-sm text-indigo-600 font-medium">
            {selectedUsers.length} selected
          </span>
        )}
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUsers.length === filteredUsers.length
                    }
                    onChange={toggleAll}
                    className="rounded"
                    aria-label="Select all users"
                  />
                </th>
                {["User", "Role", "Status", "Last Login", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                    No users match your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.email}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.email)}
                        onChange={() => toggleUser(user.email)}
                        className="rounded"
                        aria-label={`Select ${user.name}`}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{user.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${statusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
          <span>
            Showing {filteredUsers.length} of {users.length} users
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors text-xs">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors text-xs">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentView() {
  const [contentSearch, setContentSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      contentSearch.trim() === "" ||
      item.title.toLowerCase().includes(contentSearch.toLowerCase()) ||
      item.author.toLowerCase().includes(contentSearch.toLowerCase());
    const matchesType = typeFilter === "All" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Content</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage articles, videos, and documents
          </p>
        </div>
        <button className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          + New Content
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={contentSearch}
            onChange={(e) => setContentSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
        >
          <option value="All">All Types</option>
          <option value="Article">Article</option>
          <option value="Video">Video</option>
          <option value="Document">Document</option>
          <option value="Gallery">Gallery</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Title", "Type", "Author", "Status", "Date", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredContent.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                    No content matches your search.
                  </td>
                </tr>
              ) : (
                filteredContent.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${contentTypeColor(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.author}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${statusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
          Showing {filteredContent.length} of {contentItems.length} items
        </div>
      </div>
    </div>
  );
}

function RolesView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Roles</h1>
          <p className="text-sm text-gray-500 mt-1">
            Define access levels and permissions for your team
          </p>
        </div>
        <button className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          + Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {roles.map((role) => (
          <div
            key={role.name}
            className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${role.color}`}
                >
                  {role.name}
                </span>
                <p className="text-sm text-gray-500 mt-2 leading-snug">
                  {role.description}
                </p>
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors ml-2">
                <Edit2 className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
              Permissions
            </div>
            <ul className="space-y-1.5">
              {role.permissions.map((perm) => (
                <li key={perm} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0" />
                  {perm}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-3 border-t border-gray-100 text-xs text-gray-400">
              {role.count} user{role.count !== 1 ? "s" : ""} assigned
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  const [form, setForm] = useState({
    siteName: "StyleKit Admin",
    timezone: "UTC+8",
    language: "en",
    emailNotifications: true,
    twoFactor: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure system preferences and defaults
        </p>
      </div>

      {/* General */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
        <h2 className="text-sm font-semibold text-gray-900">General</h2>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Site Name
          </label>
          <input
            type="text"
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Timezone
          </label>
          <select
            value={form.timezone}
            onChange={(e) => setForm({ ...form, timezone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
          >
            <option value="UTC">UTC</option>
            <option value="UTC+8">UTC+8 (CST)</option>
            <option value="UTC-5">UTC-5 (EST)</option>
            <option value="UTC-8">UTC-8 (PST)</option>
            <option value="UTC+1">UTC+1 (CET)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
          >
            <option value="en">English</option>
            <option value="zh">Chinese (Simplified)</option>
            <option value="ja">Japanese</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Preferences</h2>
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Email Notifications
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Receive alerts for important events
            </p>
          </div>
          <div
            onClick={() =>
              setForm({ ...form, emailNotifications: !form.emailNotifications })
            }
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
              form.emailNotifications ? "bg-indigo-500" : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                form.emailNotifications ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Add an extra layer of security
            </p>
          </div>
          <div
            onClick={() => setForm({ ...form, twoFactor: !form.twoFactor })}
            className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
              form.twoFactor ? "bg-indigo-500" : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                form.twoFactor ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Changes
        </button>
        {saved && (
          <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
            <CheckCircle className="w-4 h-4" />
            Saved successfully
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function AdminPanelTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Users");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [addUserForm, setAddUserForm] = useState({
    name: "",
    email: "",
    role: "Viewer",
  });
  const [addUserErrors, setAddUserErrors] = useState({ name: "", email: "" });
  const [addUserSuccess, setAddUserSuccess] = useState(false);

  const sidebarNav = [
    { icon: Home, label: "Dashboard" },
    { icon: Users, label: "Users" },
    { icon: FileText, label: "Content" },
    { icon: Shield, label: "Roles" },
    { icon: Settings, label: "Settings" },
  ];

  const validateAddUser = () => {
    const errors = { name: "", email: "" };
    if (!addUserForm.name.trim()) errors.name = "Name is required.";
    if (!addUserForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addUserForm.email)) {
      errors.email = "Enter a valid email address.";
    }
    setAddUserErrors(errors);
    return !errors.name && !errors.email;
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAddUser()) return;
    setAddUserSuccess(true);
    setTimeout(() => {
      setAddUserSuccess(false);
      setShowAddUserModal(false);
      setAddUserForm({ name: "", email: "", role: "Viewer" });
      setAddUserErrors({ name: "", email: "" });
    }, 1500);
  };

  const closeAddUserModal = () => {
    setShowAddUserModal(false);
    setAddUserForm({ name: "", email: "", role: "Viewer" });
    setAddUserErrors({ name: "", email: "" });
    setAddUserSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 flex flex-col transition-all duration-200 ${
          sidebarOpen ? "w-56" : "w-0 overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="p-5 shrink-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white whitespace-nowrap">
              Admin
            </span>
          </div>

          <nav className="space-y-1">
            {sidebarNav.map((item) => {
              const active = activePage === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActivePage(item.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sign Out */}
        <div className="mt-auto p-5 border-t border-white/10 shrink-0">
          <button className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap">
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-200 ${
          sidebarOpen ? "ml-56" : "ml-0"
        }`}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <LayoutDashboard className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-500 hidden sm:block">
                {activePage}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Bell + Notification Panel */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-900">
                        Notifications
                      </span>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Close notifications"
                      >
                        <X className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    </div>
                    <ul className="divide-y divide-gray-50">
                      {notifications.map((n) => (
                        <li key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 shrink-0">
                              {n.icon === "alert" && (
                                <AlertCircle className="w-4 h-4 text-amber-500" />
                              )}
                              {n.icon === "info" && (
                                <Info className="w-4 h-4 text-indigo-500" />
                              )}
                              {n.icon === "check" && (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {n.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                                {n.body}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-2.5 border-t border-gray-100">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-medium text-indigo-600">
                  A
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {activePage === "Dashboard" && <DashboardView />}
          {activePage === "Users" && (
            <UsersView
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onAddUser={() => setShowAddUserModal(true)}
            />
          )}
          {activePage === "Content" && <ContentView />}
          {activePage === "Roles" && <RolesView />}
          {activePage === "Settings" && <SettingsView />}
        </main>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeAddUserModal();
          }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">
                Add New User
              </h2>
              <button
                onClick={closeAddUserModal}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {addUserSuccess ? (
              <div className="py-8 flex flex-col items-center gap-3 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
                <p className="text-sm font-medium text-gray-900">
                  User added successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddUserSubmit} noValidate className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={addUserForm.name}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, name: e.target.value })
                    }
                    placeholder="Jane Smith"
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors ${
                      addUserErrors.name
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-indigo-400"
                    }`}
                  />
                  {addUserErrors.name && (
                    <p className="text-xs text-red-500">{addUserErrors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={addUserForm.email}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, email: e.target.value })
                    }
                    placeholder="jane@example.com"
                    className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition-colors ${
                      addUserErrors.email
                        ? "border-red-400 focus:border-red-400"
                        : "border-gray-200 focus:border-indigo-400"
                    }`}
                  />
                  {addUserErrors.email && (
                    <p className="text-xs text-red-500">{addUserErrors.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    value={addUserForm.role}
                    onChange={(e) =>
                      setAddUserForm({ ...addUserForm, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeAddUserModal}
                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add User
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <TemplateBackButton variant="dark" />
    </div>
  );
}
