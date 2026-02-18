"use client";

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
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: false },
  { icon: Users, label: "Users", active: true },
  { icon: FileText, label: "Content", active: false },
  { icon: Shield, label: "Roles", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const users = [
  {
    name: "张明",
    email: "zhang@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "5 min ago",
  },
  {
    name: "李芳",
    email: "li@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "1 hour ago",
  },
  {
    name: "王伟",
    email: "wang@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "3 days ago",
  },
  {
    name: "赵静",
    email: "zhao@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    name: "刘洋",
    email: "liu@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "30 min ago",
  },
  {
    name: "陈琳",
    email: "chen@example.com",
    role: "Viewer",
    status: "Suspended",
    lastLogin: "1 week ago",
  },
];

function statusColor(status: string) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700";
    case "Inactive":
      return "bg-gray-100 text-gray-600";
    case "Suspended":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function AdminPanelTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUser = (email: string) => {
    setSelectedUsers((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  const toggleAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u.email));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 transition-all duration-200 ${
          sidebarOpen ? "w-56" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Admin</span>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10">
          <button className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
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
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl font-semibold">User Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage users, roles, and permissions
              </p>
            </div>
            <button className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              + Add User
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
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
                        checked={selectedUsers.length === users.length}
                        onChange={toggleAll}
                        className="rounded"
                        aria-label="Select all users"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
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
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                            {user.name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.role}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
              <span>
                Showing 1-{users.length} of {users.length}
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <TemplateBackButton />
    </div>
  );
}
