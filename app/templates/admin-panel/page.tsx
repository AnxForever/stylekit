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
  Settings,
  Shield,
  Users,
  X,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
import { notifications } from "./_data";
import { DashboardView } from "./_views/dashboard";
import { UsersView } from "./_views/users";
import { ContentView } from "./_views/content";
import { RolesView } from "./_views/roles";
import { SettingsView } from "./_views/settings";
import { AddUserModal } from "./_components/add-user-modal";

type ActivePage = "Dashboard" | "Users" | "Content" | "Roles" | "Settings";

export default function AdminPanelTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>("Users");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const sidebarNav: { icon: typeof Home; label: ActivePage }[] = [
    { icon: Home, label: "Dashboard" },
    { icon: Users, label: "Users" },
    { icon: FileText, label: "Content" },
    { icon: Shield, label: "Roles" },
    { icon: Settings, label: "Settings" },
  ];

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

      {showAddUserModal && (
        <AddUserModal onClose={() => setShowAddUserModal(false)} />
      )}

      <TemplateBackButton variant="dark" />
    </div>
  );
}