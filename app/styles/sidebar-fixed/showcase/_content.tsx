"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  BarChart3,
  Users,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  FileText,
  Folder,
  HelpCircle,
  LogOut,
  TrendingUp,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Fixed Sidebar color palette
const colors: ColorItem[] = [
  { name: "Slate", hex: "#1e293b", bg: "bg-slate-800" },
  { name: "Background", hex: "#f8fafc", bg: "bg-slate-50", border: true },
  { name: "Blue", hex: "#3b82f6", bg: "bg-blue-500" },
  { name: "Emerald", hex: "#10b981", bg: "bg-emerald-500" },
  { name: "Amber", hex: "#f59e0b", bg: "bg-amber-500" },
];

// Design rules
const designRules = [
  { title: "Fixed Position", desc: "fixed top-0 left-0 w-64 h-screen" },
  { title: "Content Offset", desc: "Main content uses ml-64 to match sidebar" },
  { title: "Mobile Drawer", desc: "Hidden by default, slides in on trigger" },
  { title: "Active State", desc: "Highlight current page in navigation" },
  { title: "Overflow Scroll", desc: "Navigation area scrollable if needed" },
  { title: "Collapsible Option", desc: "Support for icon-only collapsed mode" },
];

// Navigation items
const mainNav = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Users", badge: 12 },
  { icon: FileText, label: "Documents" },
  { icon: Folder, label: "Projects" },
];

const secondaryNav = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help Center" },
];

// Stats for demo
const stats = [
  { label: "Total Users", value: "12,345", change: "+12%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Revenue", value: "$45,678", change: "+8%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Orders", value: "1,234", change: "+23%", icon: ShoppingCart, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Growth", value: "15.3%", change: "+5%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
];

export default function ShowcaseContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-6 h-6 text-slate-600" />
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0
        w-64 h-screen
        bg-white
        border-r border-slate-200
        flex flex-col
        z-50
        transition-transform duration-300
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">Dashboard</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-slate-100 rounded"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-0 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-2">
            Main
          </div>
          {mainNav.map((item, i) => (
            <a
              key={i}
              href="#"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${item.active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-2 mt-6">
            Support
          </div>
          {secondaryNav.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-900 text-sm truncate">John Doe</div>
              <div className="text-slate-500 text-xs truncate">john@example.com</div>
            </div>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden w-10" />
            <h1 className="text-xl font-bold text-slate-900 lg:block hidden">Dashboard Overview</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link
                href="/styles/sidebar-fixed"
                className="flex items-center gap-2 text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Back to Docs</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change} from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Content Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-slate-200 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">User action {i + 1}</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {["Create Report", "Add User", "View Analytics", "Export Data"].map((action, i) => (
                  <button key={i} className="w-full p-3 text-left text-sm text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Design Info Section */}
        <div className="px-6 pb-6">
          <ShowcaseSection
            title="Color System"
            subtitle="Professional dashboard colors"
            className="py-12 px-6 bg-white rounded-xl border border-slate-200"
            titleClassName="text-2xl font-bold text-slate-900 mb-3 text-center"
            subtitleClassName="text-slate-600 mb-8 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <ColorPaletteGrid
                colors={colors}
                cardClassName="rounded-lg overflow-hidden shadow-sm"
                labelClassName="font-semibold text-sm text-slate-900"
                hexClassName="text-xs text-slate-500 font-mono"
              />
            </div>
          </ShowcaseSection>
        </div>

        <div className="px-6 pb-6">
          <ShowcaseSection
            title="Design Rules"
            subtitle="Key principles for Fixed Sidebar layouts"
            className="py-12 px-6 bg-white rounded-xl border border-slate-200"
            titleClassName="text-2xl font-bold text-slate-900 mb-3 text-center"
            subtitleClassName="text-slate-600 mb-8 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {designRules.map((rule, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-900 mb-2">{rule.title}</h4>
                    <p className="text-sm text-slate-600">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ShowcaseSection>
        </div>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-slate-200 bg-white">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              Fixed Sidebar Showcase{" "}
              <Link href="/" className="text-slate-900 hover:underline">
                StyleKit
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
