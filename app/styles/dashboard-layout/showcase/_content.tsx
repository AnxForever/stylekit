"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, LayoutDashboard, Users, ShoppingCart, DollarSign,
  TrendingUp, TrendingDown, Bell, Search, Settings,
  BarChart3, PieChart, Activity, Calendar, MoreHorizontal
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Primary", hex: "#6366f1", bg: "bg-[#6366f1]" },
  { name: "Sidebar", hex: "#111827", bg: "bg-[#111827]" },
  { name: "Background", hex: "#f9fafb", bg: "bg-[#f9fafb]" },
  { name: "Success", hex: "#10b981", bg: "bg-[#10b981]" },
  { name: "Warning", hex: "#f59e0b", bg: "bg-[#f59e0b]" },
];

const kpis = [
  { label: "Revenue", value: "$48,352", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Users", value: "2,420", change: "+5.2%", up: true, icon: Users },
  { label: "Orders", value: "1,210", change: "-2.4%", up: false, icon: ShoppingCart },
  { label: "Conversion", value: "3.62%", change: "+0.3%", up: true, icon: TrendingUp },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Users, label: "Customers", active: false },
  { icon: ShoppingCart, label: "Orders", active: false },
  { icon: Calendar, label: "Calendar", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function ShowcaseContent() {
  const [period, setPeriod] = useState("7d");

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/styles/dashboard-layout"
              className="flex items-center gap-2 text-gray-500 hover:text-[#6366f1] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Back</span>
            </Link>
            <span className="font-bold text-lg text-gray-900">Dashboard Layout</span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#6366f1] text-white font-medium text-sm rounded-lg hover:bg-[#5558e3] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Dashboard Layout"
        description="A data-driven layout perfect for admin panels, analytics dashboards, and business intelligence interfaces."
        className="pt-12 pb-8 px-6 text-center"
        titleClassName="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        descriptionClassName="text-lg text-gray-600 max-w-2xl mx-auto"
      />

      {/* Dashboard Demo */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] rounded-xl p-4 hidden lg:block shrink-0">
              <div className="flex items-center gap-3 px-3 py-4 mb-4">
                <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white">Analytics</span>
              </div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      item.active
                        ? "bg-[#6366f1] text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-3 px-3">
                  <div className="w-8 h-8 bg-[#6366f1] rounded-full" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">John Doe</p>
                    <p className="text-xs text-gray-500 truncate">john@example.com</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Dashboard */}
            <div className="flex-1 space-y-6">
              {/* Top Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
                  <p className="text-sm text-gray-500">Welcome back, John!</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400 hidden sm:inline">Search...</span>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors relative">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </button>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#6366f1]"
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="p-4 bg-white rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">{kpi.label}</span>
                      <div className="w-8 h-8 bg-[#6366f1]/10 rounded-lg flex items-center justify-center">
                        <kpi.icon className="w-4 h-4 text-[#6366f1]" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                    <div className={`flex items-center gap-1 text-sm ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                      {kpi.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 p-6 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900">Revenue Trend</h3>
                      <p className="text-sm text-gray-500">Monthly revenue overview</p>
                    </div>
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  {/* Chart placeholder */}
                  <div className="h-64 bg-gradient-to-t from-[#6366f1]/5 to-transparent rounded-lg flex items-end justify-around p-4">
                    {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                      <div
                        key={i}
                        className="w-8 bg-[#6366f1] rounded-t transition-all hover:bg-[#5558e3]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="p-6 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Distribution</h3>
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                  {/* Pie chart placeholder */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-40 h-40 rounded-full border-8 border-[#6366f1] relative">
                      <div className="absolute inset-0 rounded-full border-8 border-[#10b981] border-t-transparent border-l-transparent rotate-45" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PieChart className="w-8 h-8 text-gray-300" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Desktop", value: "45%", color: "bg-[#6366f1]" },
                      { label: "Mobile", value: "35%", color: "bg-[#10b981]" },
                      { label: "Tablet", value: "20%", color: "bg-[#f59e0b]" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="p-6 bg-white rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                  <button className="text-sm text-[#6366f1] hover:underline">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                        <th className="pb-3 font-medium">Order ID</th>
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { id: "#3210", customer: "John Doe", status: "Completed", amount: "$125.00" },
                        { id: "#3211", customer: "Jane Smith", status: "Pending", amount: "$89.00" },
                        { id: "#3212", customer: "Bob Wilson", status: "Completed", amount: "$254.00" },
                      ].map((order) => (
                        <tr key={order.id} className="border-b border-gray-50">
                          <td className="py-3 font-medium text-gray-900">{order.id}</td>
                          <td className="py-3 text-gray-600">{order.customer}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-right font-medium text-gray-900">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Data-focused color palette"
        className="py-12 px-6 bg-white border-y border-gray-200"
        titleClassName="text-2xl font-bold text-gray-900 mb-3 text-center"
        subtitleClassName="text-gray-600 mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden border border-gray-200"
            labelClassName="font-semibold text-sm text-gray-900"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Dashboard Layout Showcase · Part of{" "}
            <Link href="/" className="text-[#6366f1] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
