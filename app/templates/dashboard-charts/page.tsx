"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  ChevronDown,
  DollarSign,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const stats = [
  { label: "Total Revenue", value: "$48,250", change: "+12.5%", positive: true, icon: DollarSign, color: "text-emerald-500 bg-emerald-50" },
  { label: "Active Users", value: "2,847", change: "+8.1%", positive: true, icon: Users, color: "text-blue-500 bg-blue-50" },
  { label: "Orders", value: "1,234", change: "-2.3%", positive: false, icon: ShoppingCart, color: "text-violet-500 bg-violet-50" },
  { label: "Conversion", value: "3.24%", change: "+0.8%", positive: true, icon: TrendingUp, color: "text-amber-500 bg-amber-50" },
];

const revenueData = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 52 },
  { month: "May", value: 48 },
  { month: "Jun", value: 62 },
  { month: "Jul", value: 55 },
  { month: "Aug", value: 71 },
  { month: "Sep", value: 68 },
  { month: "Oct", value: 82 },
  { month: "Nov", value: 75 },
  { month: "Dec", value: 90 },
];

const trafficSources = [
  { source: "Direct", value: 42, color: "bg-blue-500" },
  { source: "Organic", value: 28, color: "bg-emerald-500" },
  { source: "Referral", value: 18, color: "bg-violet-500" },
  { source: "Social", value: 12, color: "bg-amber-500" },
];

const recentOrders = [
  { id: "#ORD-001", customer: "Alex Chen", amount: "$342.00", status: "Completed", date: "2025-01-20" },
  { id: "#ORD-002", customer: "Lisa Wang", amount: "$198.50", status: "Processing", date: "2025-01-20" },
  { id: "#ORD-003", customer: "Mark Kim", amount: "$562.00", status: "Completed", date: "2025-01-19" },
  { id: "#ORD-004", customer: "Sarah Liu", amount: "$89.00", status: "Cancelled", date: "2025-01-19" },
  { id: "#ORD-005", customer: "David Zhang", amount: "$425.00", status: "Processing", date: "2025-01-18" },
];

function orderStatusColor(status: string) {
  switch (status) {
    case "Completed": return "bg-emerald-50 text-emerald-700";
    case "Processing": return "bg-blue-50 text-blue-700";
    case "Cancelled": return "bg-red-50 text-red-600";
    default: return "bg-gray-100 text-gray-600";
  }
}

const sidebarItems = [
  { icon: Home, label: "Overview", active: true },
  { icon: ShoppingCart, label: "Orders", active: false },
  { icon: Users, label: "Customers", active: false },
  { icon: TrendingUp, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export default function DashboardChartsTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-200 ${sidebarOpen ? "w-56" : "w-0 overflow-hidden"}`}>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Analytics</span>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.active
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className={`transition-all duration-200 ${sidebarOpen ? "ml-56" : "ml-0"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Toggle sidebar">
                <LayoutDashboard className="w-5 h-5 text-gray-500" />
              </button>
              <h1 className="text-lg font-semibold hidden sm:block">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-56 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-300"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">A</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Date filter */}
          <div className="flex items-center gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Calendar className="w-4 h-4 text-gray-400" />
              Last 30 days
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-semibold mb-1">{stat.value}</div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.positive ? "text-emerald-600" : "text-red-500"}`}>
                  {stat.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change} vs last month
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold">Revenue Trend</h2>
                  <p className="text-xs text-gray-400 mt-1">Monthly revenue overview</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100">
                  This Year
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-end gap-2 h-48">
                {revenueData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full relative" style={{ height: "100%" }}>
                      <div
                        className="absolute bottom-0 w-full rounded-t-md bg-blue-500 hover:bg-blue-600 transition-colors"
                        style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold mb-1">Traffic Sources</h2>
              <p className="text-xs text-gray-400 mb-6">Where your visitors come from</p>
              <div className="space-y-4">
                {trafficSources.map((item) => (
                  <div key={item.source}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-gray-600">{item.source}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 text-sm font-medium">{order.id}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{order.customer}</td>
                      <td className="py-3 px-6 text-sm font-medium">{order.amount}</td>
                      <td className="py-3 px-6">
                        <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${orderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-400">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <TemplateBackButton variant="dark" />
    </div>
  );
}
