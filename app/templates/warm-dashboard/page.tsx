"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  BarChart3,
  Bell,
  ChevronRight,
  FileText,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  ArrowUpRight,
  Activity,
  PieChart,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// --- Data ---

const sidebarItems = [
  { icon: Home, label: "概览", id: "overview" },
  { icon: BarChart3, label: "数据分析", id: "analytics" },
  { icon: Users, label: "用户管理", id: "users" },
  { icon: FileText, label: "报告", id: "reports" },
  { icon: Settings, label: "设置", id: "settings" },
];

const stats = [
  { label: "总用户", value: "12,847", change: "+12.5%", positive: true, color: "bg-[#4a9d9a]", icon: Users },
  { label: "月活跃", value: "8,234", change: "+8.2%", positive: true, color: "bg-[#e8b86d]", icon: Activity },
  { label: "转化率", value: "3.24%", change: "-0.4%", positive: false, color: "bg-[#c17767]", icon: PieChart },
  { label: "总收入", value: "¥284K", change: "+22.1%", positive: true, color: "bg-[#6b8e8e]", icon: TrendingUp },
];

const chartDataByRange: Record<string, number[]> = {
  "7d":  [42, 58, 51, 67, 72, 63, 78],
  "30d": [35, 58, 42, 68, 54, 78, 62, 85, 72, 90, 68, 95, 88, 74, 92, 80, 65, 77, 83, 91, 69, 75, 88, 95, 82, 70, 86, 93, 78, 99],
  "90d": [35, 58, 42, 68, 54, 78, 62, 85, 72, 90, 68, 95],
};

const chartLabelsByRange: Record<string, string[]> = {
  "7d":  ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  "30d": Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
  "90d": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
};

const recentActivity = [
  { user: "李明", action: "创建了新项目", time: "2 分钟前", avatar: "李", color: "bg-[#4a9d9a]" },
  { user: "王芳", action: "更新了用户权限", time: "15 分钟前", avatar: "王", color: "bg-[#e8b86d]" },
  { user: "张伟", action: "导出了月度报告", time: "1 小时前", avatar: "张", color: "bg-[#c17767]" },
  { user: "刘洋", action: "添加了新团队成员", time: "2 小时前", avatar: "刘", color: "bg-[#6b8e8e]" },
  { user: "陈静", action: "完成了系统升级", time: "3 小时前", avatar: "陈", color: "bg-[#4a9d9a]" },
];

const projects = [
  { name: "品牌重塑", owner: "李明", status: "进行中", progress: 72, statusColor: "bg-[#4a9d9a]", textColor: "text-[#4a9d9a]" },
  { name: "移动端适配", owner: "王芳", status: "审核中", progress: 90, statusColor: "bg-[#e8b86d]", textColor: "text-[#e8b86d]" },
  { name: "数据迁移", owner: "张伟", status: "已完成", progress: 100, statusColor: "bg-[#6b8e8e]", textColor: "text-[#6b8e8e]" },
  { name: "用户调研", owner: "刘洋", status: "计划中", progress: 15, statusColor: "bg-[#c17767]", textColor: "text-[#c17767]" },
];

const notifications = [
  { id: 1, icon: CheckCircle2, color: "text-[#4a9d9a]", bg: "bg-[#4a9d9a]/10", title: "报告生成完成", desc: "2026年1月月度报告已就绪", time: "5 分钟前" },
  { id: 2, icon: AlertCircle, color: "text-[#c17767]", bg: "bg-[#c17767]/10", title: "系统警告", desc: "磁盘使用率超过 80%，请注意", time: "22 分钟前" },
  { id: 3, icon: Info, color: "text-[#e8b86d]", bg: "bg-[#e8b86d]/10", title: "新成员加入", desc: "陈静已加入设计团队", time: "1 小时前" },
  { id: 4, icon: Clock, color: "text-[#6b8e8e]", bg: "bg-[#6b8e8e]/10", title: "任务截止提醒", desc: "品牌重塑项目将于 3 天后截止", time: "2 小时前" },
];

const analyticsMetrics = [
  { label: "页面访问量", value: "284,921", change: "+18.3%", positive: true },
  { label: "平均会话时长", value: "4m 32s", change: "+6.1%", positive: true },
  { label: "跳出率", value: "34.2%", change: "-2.8%", positive: true },
  { label: "新用户占比", value: "42.7%", change: "+5.4%", positive: true },
  { label: "付费转化", value: "1.87%", change: "-0.3%", positive: false },
  { label: "客单价", value: "¥1,248", change: "+9.2%", positive: true },
];

const analyticsChartData = [62, 48, 75, 55, 83, 67, 91, 73, 86, 60, 94, 78];
const analyticsChartLabels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

const usersData = [
  { name: "李明", email: "liming@example.com", role: "管理员", status: "活跃", avatar: "李", joined: "2024-03-12", lastActive: "刚刚" },
  { name: "王芳", email: "wangfang@example.com", role: "编辑", status: "活跃", avatar: "王", joined: "2024-05-08", lastActive: "10分钟前" },
  { name: "张伟", email: "zhangwei@example.com", role: "分析师", status: "离线", avatar: "张", joined: "2024-01-20", lastActive: "1天前" },
  { name: "刘洋", email: "liuyang@example.com", role: "开发者", status: "活跃", avatar: "刘", joined: "2024-06-14", lastActive: "30分钟前" },
  { name: "陈静", email: "chenjing@example.com", role: "设计师", status: "忙碌", avatar: "陈", joined: "2024-08-02", lastActive: "2小时前" },
  { name: "赵磊", email: "zhaolei@example.com", role: "编辑", status: "离线", avatar: "赵", joined: "2023-11-30", lastActive: "3天前" },
  { name: "孙敏", email: "sunmin@example.com", role: "开发者", status: "活跃", avatar: "孙", joined: "2024-04-17", lastActive: "5分钟前" },
];

const avatarColors = ["bg-[#4a9d9a]", "bg-[#e8b86d]", "bg-[#c17767]", "bg-[#6b8e8e]", "bg-[#4a9d9a]", "bg-[#e8b86d]", "bg-[#c17767]"];

function statusBadge(status: string) {
  if (status === "活跃") return "bg-[#4a9d9a]/10 text-[#4a9d9a]";
  if (status === "忙碌") return "bg-[#e8b86d]/10 text-[#c17767]";
  return "bg-gray-100 text-gray-400";
}

// --- Sub-views ---

function OverviewView({
  dateRange,
  setDateRange,
  hoveredBar,
  setHoveredBar,
}: {
  dateRange: "7d" | "30d" | "90d";
  setDateRange: (r: "7d" | "30d" | "90d") => void;
  hoveredBar: number | null;
  setHoveredBar: (i: number | null) => void;
}) {
  const chartData = chartDataByRange[dateRange];
  const chartLabels = chartLabelsByRange[dateRange];
  const maxValue = Math.max(...chartData);

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">{stat.label}</span>
              <div className={`w-9 h-9 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{stat.value}</div>
            <div className="flex items-center gap-1">
              {stat.positive ? (
                <TrendingUp className="w-3.5 h-3.5 text-[#4a9d9a]" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-[#c17767]" />
              )}
              <span className={`text-xs font-medium ${stat.positive ? "text-[#4a9d9a]" : "text-[#c17767]"}`}>
                {stat.change} 较上月
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">月度趋势</h2>
              <p className="text-xs text-gray-400 mt-0.5">用户增长数据</p>
            </div>
            <div className="flex items-center gap-1 bg-[#faf8f5] rounded-xl p-1">
              {(["7d", "30d", "90d"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    dateRange === r
                      ? "bg-[#4a9d9a] text-white shadow-md shadow-[#4a9d9a]/20"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {r === "7d" ? "近7天" : r === "30d" ? "近30天" : "近90天"}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <div className="flex items-end gap-1.5 h-52">
              {chartData.map((value, i) => {
                const isHovered = hoveredBar === i;
                const heightPct = (value / maxValue) * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <div className="w-full relative flex-1">
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 bg-gray-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none">
                          {value}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                        </div>
                      )}
                      <div className="absolute bottom-0 w-full" style={{ height: `${heightPct}%` }}>
                        <div
                          className={`w-full h-full rounded-t-md transition-all duration-200 ${
                            isHovered ? "bg-[#e8b86d]" : "bg-[#4a9d9a]/70 group-hover:bg-[#4a9d9a]"
                          }`}
                        />
                      </div>
                    </div>
                    {dateRange !== "30d" && (
                      <span className="text-[10px] text-gray-400 shrink-0">{chartLabels[i]}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-0.5">最近动态</h2>
          <p className="text-xs text-gray-400 mb-5">团队活动记录</p>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center text-sm font-semibold text-white shrink-0`}
                >
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

      {/* Projects table */}
      <div className="mt-6 bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">项目列表</h2>
            <p className="text-xs text-gray-400 mt-0.5">所有活跃项目</p>
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
              {projects.map((row) => (
                <tr key={row.name} className="border-b border-gray-50 hover:bg-[#faf8f5] transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-800">{row.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{row.owner}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-lg ${row.statusColor} bg-opacity-10 ${row.textColor}`}>
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
                      <span className="text-xs text-gray-400 w-8 shrink-0">{row.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AnalyticsView({
  hoveredBar,
  setHoveredBar,
}: {
  hoveredBar: number | null;
  setHoveredBar: (i: number | null) => void;
}) {
  const maxValue = Math.max(...analyticsChartData);

  return (
    <>
      {/* Metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {analyticsMetrics.map((m, i) => (
          <div
            key={m.label}
            className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-xs text-gray-400 mb-2">{m.label}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">{m.value}</div>
            <div className="flex items-center gap-1">
              {m.positive ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-[#4a9d9a]" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-[#c17767]" />
              )}
              <span className={`text-xs font-medium ${m.positive ? "text-[#4a9d9a]" : "text-[#c17767]"}`}>
                {m.change}
              </span>
              <span className="text-xs text-gray-400 ml-1">vs 上月</span>
            </div>
            {/* Mini sparkline bar */}
            <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${40 + (i * 13) % 55}%`,
                  backgroundColor: ["#4a9d9a", "#e8b86d", "#c17767", "#6b8e8e", "#4a9d9a", "#e8b86d"][i % 6],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + breakdown */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-0.5">流量趋势</h2>
          <p className="text-xs text-gray-400 mb-6">全年页面访问量分布</p>
          <div className="flex items-end gap-3 h-52">
            {analyticsChartData.map((value, i) => {
              const isHovered = hoveredBar === i;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2 cursor-pointer"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="w-full relative flex-1">
                    {isHovered && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 bg-gray-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl pointer-events-none">
                        {value}K
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                      </div>
                    )}
                    <div
                      className="absolute bottom-0 w-full rounded-t-md transition-all duration-200"
                      style={{
                        height: `${(value / maxValue) * 100}%`,
                        backgroundColor: isHovered ? "#c17767" : "#e8b86d",
                        opacity: isHovered ? 1 : 0.75,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400">{analyticsChartLabels[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-0.5">流量来源</h2>
          <p className="text-xs text-gray-400 mb-5">渠道分布占比</p>
          <div className="space-y-4">
            {[
              { label: "搜索引擎", pct: 42, color: "#4a9d9a" },
              { label: "直接访问", pct: 28, color: "#e8b86d" },
              { label: "社交媒体", pct: 18, color: "#c17767" },
              { label: "邮件营销", pct: 8, color: "#6b8e8e" },
              { label: "其他", pct: 4, color: "#9ca3af" },
            ].map((src) => (
              <div key={src.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{src.label}</span>
                  <span className="font-medium text-gray-800">{src.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${src.pct}%`, backgroundColor: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function UsersView() {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">用户管理</h2>
          <p className="text-xs text-gray-400 mt-0.5">共 {usersData.length} 位成员</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索用户..."
              aria-label="搜索用户"
              className="pl-9 pr-4 py-2 bg-[#faf8f5] border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-[#4a9d9a] text-white text-sm font-medium rounded-xl shadow-lg shadow-[#4a9d9a]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
            邀请成员
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">用户</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">角色</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">状态</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">加入时间</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">最后活跃</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, i) => (
              <tr key={user.name} className="border-b border-gray-50 hover:bg-[#faf8f5] transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${avatarColors[i]} flex items-center justify-center text-sm font-semibold text-white shrink-0`}>
                      {user.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-500 hidden md:table-cell">{user.role}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg ${statusBadge(user.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      user.status === "活跃" ? "bg-[#4a9d9a]" :
                      user.status === "忙碌" ? "bg-[#e8b86d]" : "bg-gray-300"
                    }`} />
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-400 hidden lg:table-cell">{user.joined}</td>
                <td className="py-4 px-4 text-sm text-gray-400 hidden lg:table-cell">{user.lastActive}</td>
                <td className="py-4 px-4">
                  <button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-[#4a9d9a] font-medium transition-opacity">
                    详情 <ChevronRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">报告中心</h2>
        <p className="text-xs text-gray-400 mb-5">生成与管理所有业务报告</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "月度用户报告", desc: "2026年1月", badge: "已生成", badgeColor: "bg-[#4a9d9a]/10 text-[#4a9d9a]", icon: Users },
            { title: "收入分析报告", desc: "Q4 2025", badge: "已生成", badgeColor: "bg-[#4a9d9a]/10 text-[#4a9d9a]", icon: TrendingUp },
            { title: "流量来源报告", desc: "近30天", badge: "处理中", badgeColor: "bg-[#e8b86d]/10 text-[#e8b86d]", icon: BarChart3 },
            { title: "转化漏斗报告", desc: "本季度", badge: "计划中", badgeColor: "bg-gray-100 text-gray-500", icon: Activity },
            { title: "安全审计报告", desc: "2025年度", badge: "已生成", badgeColor: "bg-[#4a9d9a]/10 text-[#4a9d9a]", icon: Shield },
            { title: "团队绩效报告", desc: "2026年1月", badge: "计划中", badgeColor: "bg-gray-100 text-gray-500", icon: FileText },
          ].map((r) => (
            <div key={r.title} className="p-5 border border-gray-100 rounded-2xl hover:border-[#4a9d9a]/30 hover:shadow-lg transition-all duration-200 group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf8f5] flex items-center justify-center group-hover:bg-[#4a9d9a]/10 transition-colors">
                  <r.icon className="w-5 h-5 text-gray-400 group-hover:text-[#4a9d9a] transition-colors" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${r.badgeColor}`}>{r.badge}</span>
              </div>
              <div className="text-sm font-semibold text-gray-800 mb-0.5">{r.title}</div>
              <div className="text-xs text-gray-400">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">个人设置</h2>
        <p className="text-xs text-gray-400 mb-5">管理您的账户与偏好</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">显示名称</label>
            <input
              type="text"
              defaultValue="Admin User"
              className="w-full px-4 py-2.5 bg-[#faf8f5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">邮箱地址</label>
            <input
              type="email"
              defaultValue="admin@example.com"
              className="w-full px-4 py-2.5 bg-[#faf8f5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">语言</label>
            <select className="w-full px-4 py-2.5 bg-[#faf8f5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all appearance-none">
              <option>简体中文</option>
              <option>English</option>
            </select>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-gray-100">
          <button className="px-5 py-2.5 bg-[#4a9d9a] text-white text-sm font-medium rounded-xl shadow-lg shadow-[#4a9d9a]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
            保存更改
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-black/[0.04] p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">通知设置</h2>
        <p className="text-xs text-gray-400 mb-5">控制您接收通知的方式</p>
        <div className="space-y-4">
          {[
            { label: "邮件通知", desc: "接收重要事件的邮件提醒", on: true },
            { label: "系统警告", desc: "接收系统资源异常警告", on: true },
            { label: "团队动态", desc: "成员操作实时通知", on: false },
            { label: "报告生成", desc: "报告完成后通知我", on: true },
          ].map((setting) => (
            <div key={setting.label} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-gray-700">{setting.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{setting.desc}</div>
              </div>
              <div
                className={`w-10 h-6 rounded-full transition-colors duration-200 relative cursor-pointer ${
                  setting.on ? "bg-[#4a9d9a]" : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                    setting.on ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Page titles ---

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  overview:  { title: "仪表盘概览", subtitle: "欢迎回来，查看最新数据" },
  analytics: { title: "数据分析", subtitle: "深入了解您的业务指标" },
  users:     { title: "用户管理", subtitle: "管理团队成员与权限" },
  reports:   { title: "报告中心", subtitle: "查看与生成业务报告" },
  settings:  { title: "系统设置", subtitle: "个性化您的使用体验" },
};

// --- Main component ---

export default function WarmDashboardTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("overview");
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("90d");
  const [showNotifications, setShowNotifications] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const meta = pageMeta[activePage] ?? pageMeta["overview"];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#faf8f5] border-r border-gray-200/60 z-40 transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "w-60" : "w-0"
        }`}
      >
        <div className="w-60 p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-[#4a9d9a] flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-gray-800 whitespace-nowrap">WarmPanel</span>
          </div>

          {/* Nav */}
          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#4a9d9a] text-white shadow-lg shadow-[#4a9d9a]/25"
                      : "text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px] shrink-0" />
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
                </button>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-xl bg-[#e8b86d] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                A
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-700 truncate">Admin User</div>
                <div className="text-xs text-gray-400 truncate">admin@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#faf8f5]/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="flex items-center justify-between px-6 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                aria-label="Toggle sidebar"
              >
                <LayoutDashboard className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{meta.title}</h1>
                <p className="text-xs text-gray-400">{meta.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索..."
                  aria-label="搜索"
                  className="w-52 lg:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all duration-200"
                />
              </div>

              {/* Notification bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="relative p-2.5 rounded-xl bg-white shadow-lg shadow-black/5 hover:shadow-xl transition-all duration-200"
                  aria-label="通知"
                >
                  <Bell className="w-[18px] h-[18px] text-gray-600" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c17767] rounded-full" />
                </button>

                {/* Notification dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-800">通知</span>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="关闭通知"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {notifications.map((n) => (
                        <div key={n.id} className="flex items-start gap-3 px-5 py-4 hover:bg-[#faf8f5] transition-colors cursor-pointer">
                          <div className={`w-9 h-9 rounded-xl ${n.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                            <n.icon className={`w-4 h-4 ${n.color}`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-800">{n.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{n.desc}</div>
                            <div className="text-xs text-gray-300 mt-1">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-gray-100">
                      <button className="w-full text-center text-xs font-medium text-[#4a9d9a] hover:underline">
                        查看全部通知
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-9 h-9 rounded-xl bg-[#e8b86d] flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Click-outside overlay for notifications */}
        {showNotifications && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowNotifications(false)}
          />
        )}

        {/* Page Content */}
        <main className="p-6 md:p-8">
          {activePage === "overview" && (
            <OverviewView
              dateRange={dateRange}
              setDateRange={setDateRange}
              hoveredBar={hoveredBar}
              setHoveredBar={setHoveredBar}
            />
          )}
          {activePage === "analytics" && (
            <AnalyticsView
              hoveredBar={hoveredBar}
              setHoveredBar={setHoveredBar}
            />
          )}
          {activePage === "users" && <UsersView />}
          {activePage === "reports" && <ReportsView />}
          {activePage === "settings" && <SettingsView />}
        </main>
      </div>

      <TemplateBackButton variant="warm" />
    </div>
  );
}
