"use client";

import { useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const sidebarItems = [
  { icon: Home, label: "概览", active: true },
  { icon: BarChart3, label: "数据分析", active: false },
  { icon: Users, label: "用户管理", active: false },
  { icon: FileText, label: "报告", active: false },
  { icon: Settings, label: "设置", active: false },
];

const stats = [
  { label: "总用户", value: "12,847", change: "+12.5%", positive: true, color: "bg-[#4a9d9a]" },
  { label: "月活跃", value: "8,234", change: "+8.2%", positive: true, color: "bg-[#e8b86d]" },
  { label: "转化率", value: "3.24%", change: "-0.4%", positive: false, color: "bg-[#c17767]" },
  { label: "总收入", value: "¥284K", change: "+22.1%", positive: true, color: "bg-[#6b8e8e]" },
];

const recentActivity = [
  { user: "李明", action: "创建了新项目", time: "2 分钟前", avatar: "李" },
  { user: "王芳", action: "更新了用户权限", time: "15 分钟前", avatar: "王" },
  { user: "张伟", action: "导出了月度报告", time: "1 小时前", avatar: "张" },
  { user: "刘洋", action: "添加了新团队成员", time: "2 小时前", avatar: "刘" },
  { user: "陈静", action: "完成了系统升级", time: "3 小时前", avatar: "陈" },
];

const chartData = [35, 58, 42, 68, 54, 78, 62, 85, 72, 90, 68, 95];
const chartLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export default function WarmDashboardTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const maxValue = Math.max(...chartData);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#faf8f5] border-r border-gray-200/50 z-40 transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-0 -translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-[#4a9d9a] flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-gray-800">WarmPanel</span>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                  item.active
                    ? "bg-[#4a9d9a] text-white shadow-lg shadow-[#4a9d9a]/25"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#faf8f5]/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <LayoutDashboard className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">仪表盘概览</h1>
                <p className="text-xs text-gray-400">欢迎回来，查看最新数据</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索..."
                  aria-label="搜索"
                  className="w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all duration-200"
                />
              </div>
              <button className="relative p-2.5 rounded-xl bg-white shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-200" aria-label="通知">
                <Bell className="w-[18px] h-[18px] text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c17767] rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-xl bg-[#e8b86d] flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">{stat.label}</span>
                  <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-semibold text-gray-800 mb-1">{stat.value}</div>
                <span
                  className={`text-xs font-medium ${
                    stat.positive ? "text-[#4a9d9a]" : "text-[#c17767]"
                  }`}
                >
                  {stat.change} 较上月
                </span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">月度趋势</h2>
                  <p className="text-xs text-gray-400 mt-1">用户增长数据</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  本年度
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end gap-3 h-52">
                {chartData.map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative" style={{ height: "100%" }}>
                      <div
                        className="absolute bottom-0 w-full rounded-t-lg bg-[#4a9d9a] hover:bg-[#3d8685] transition-colors duration-200"
                        style={{ height: `${(value / maxValue) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">{chartLabels[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">最近动态</h2>
              <p className="text-xs text-gray-400 mb-5">团队活动记录</p>

              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#faf8f5] border border-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">
                      {item.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{item.user}</span>{" "}
                        <span className="text-gray-500">{item.action}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-6 bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">项目列表</h2>
                <p className="text-xs text-gray-400 mt-1">所有活跃项目</p>
              </div>
              <button className="px-5 py-2.5 bg-[#4a9d9a] text-white text-sm font-medium rounded-xl shadow-lg shadow-[#4a9d9a]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                新建项目
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">项目名称</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">负责人</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">进度</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "品牌重塑", owner: "李明", status: "进行中", progress: 72, statusColor: "bg-[#4a9d9a]" },
                    { name: "移动端适配", owner: "王芳", status: "审核中", progress: 90, statusColor: "bg-[#e8b86d]" },
                    { name: "数据迁移", owner: "张伟", status: "已完成", progress: 100, statusColor: "bg-[#6b8e8e]" },
                    { name: "用户调研", owner: "刘洋", status: "计划中", progress: 15, statusColor: "bg-[#c17767]" },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-gray-50 hover:bg-[#faf8f5] transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-gray-800">{row.name}</td>
                      <td className="py-4 px-4 text-sm text-gray-500">{row.owner}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium text-white ${row.statusColor} rounded-lg`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${row.statusColor} rounded-full transition-all duration-500`}
                              style={{ width: `${row.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-8">{row.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <TemplateBackButton />
    </div>
  );
}
