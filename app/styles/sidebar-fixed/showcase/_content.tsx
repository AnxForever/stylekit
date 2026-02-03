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
  FileText,
  Folder,
  HelpCircle,
  LogOut,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Calendar,
  ChevronRight,
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Corporate Clean color palette
const colors: ColorItem[] = [
  { name: "Navy", hex: "#1e3a5f", bg: "bg-[#1e3a5f]" },
  { name: "White", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Primary Blue", hex: "#2563eb", bg: "bg-blue-600" },
  { name: "Success", hex: "#059669", bg: "bg-emerald-600" },
  { name: "Light Gray", hex: "#f1f5f9", bg: "bg-slate-100", border: true },
];

// Design rules
const designRules = [
  { title: "Fixed Position", desc: "fixed top-0 left-0 w-64 h-screen" },
  { title: "Content Offset", desc: "Main content uses ml-64 to match sidebar" },
  { title: "Mobile Drawer", desc: "Hidden by default, slides in on trigger" },
  { title: "Active State", desc: "Blue highlight for current page" },
  { title: "Clean Borders", desc: "Subtle borders for section separation" },
  { title: "Professional Icons", desc: "Consistent icon sizing and spacing" },
];

// Navigation items
const mainNav = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Team", badge: 3 },
  { icon: FileText, label: "Reports" },
  { icon: Folder, label: "Projects" },
  { icon: Calendar, label: "Schedule" },
];

const secondaryNav = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help & Support" },
];

// Stats for demo
const stats = [
  { label: "Total Revenue", value: "$124,500", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Active Users", value: "8,420", change: "+8.2%", trend: "up", icon: Users },
  { label: "Orders", value: "1,234", change: "-2.4%", trend: "down", icon: ShoppingCart },
  { label: "Growth Rate", value: "23.5%", change: "+4.1%", trend: "up", icon: TrendingUp },
];

// Recent activity
const recentActivity = [
  { user: "Sarah Chen", action: "completed project review", time: "2 min ago" },
  { user: "Mike Johnson", action: "uploaded new documents", time: "15 min ago" },
  { user: "Emily Davis", action: "joined the team", time: "1 hour ago" },
  { user: "Alex Thompson", action: "submitted quarterly report", time: "3 hours ago" },
];

export default function ShowcaseContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-md border border-slate-200"
      >
        <Menu className="w-5 h-5 text-slate-600" />
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0
        w-64 h-screen
        bg-[#1e3a5f]
        flex flex-col
        z-50
        transition-transform duration-300
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <span className="text-lg font-semibold text-white">Acme Corp</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/10 rounded text-white/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/10 border-0 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="text-xs font-medium text-white/40 uppercase tracking-wider px-3 py-2">
            Main Menu
          </div>
          {mainNav.map((item, i) => (
            <a
              key={i}
              href="#"
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${item.active
                  ? "bg-blue-600 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}

          <div className="text-xs font-medium text-white/40 uppercase tracking-wider px-3 py-2 mt-6">
            Support
          </div>
          {secondaryNav.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white text-sm truncate">John Doe</div>
              <div className="text-white/50 text-xs truncate">Administrator</div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden w-10" />
            <div className="hidden lg:block">
              {/* 视觉风格标注 */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                  <Palette className="w-3 h-3" />
                  视觉风格: Corporate Clean
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                  Sidebar Fixed Layout
                </span>
              </div>
              <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">Welcome back, John</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full" />
              </button>
              <Link
                href="/styles/sidebar-fixed"
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Back to Docs</span>
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
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                  }`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Content Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Recent Activity</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-medium text-sm">
                      {activity.user.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-slate-500">{activity.action}</span>
                      </p>
                      <p className="text-xs text-slate-400">{activity.time}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                {["Create Report", "Add Team Member", "View Analytics", "Export Data"].map((action, i) => (
                  <button key={i} className="w-full p-3 text-left text-sm font-medium text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
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
            subtitle="Professional corporate palette"
            className="py-12 px-6 bg-white rounded-xl border border-slate-200"
            titleClassName="text-2xl font-bold text-slate-900 mb-3 text-center"
            subtitleClassName="text-slate-500 mb-8 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <ColorPaletteGrid
                colors={colors}
                cardClassName="rounded-lg overflow-hidden border border-slate-200"
                labelClassName="font-semibold text-sm text-slate-900"
                hexClassName="text-xs text-slate-400 font-mono"
              />
            </div>
          </ShowcaseSection>
        </div>

        <div className="px-6 pb-6">
          <ShowcaseSection
            title="Design Principles"
            subtitle="Key patterns for Fixed Sidebar layouts"
            className="py-12 px-6 bg-white rounded-xl border border-slate-200"
            titleClassName="text-2xl font-bold text-slate-900 mb-3 text-center"
            subtitleClassName="text-slate-500 mb-8 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {designRules.map((rule, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-lg border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">{rule.title}</h4>
                    <p className="text-sm text-slate-500">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ShowcaseSection>
        </div>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-slate-200 bg-white">
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Fixed Sidebar Showcase{" "}
              <Link href="/" className="text-slate-600 hover:underline">
                StyleKit
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
