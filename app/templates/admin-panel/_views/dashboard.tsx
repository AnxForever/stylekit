"use client";

import { Activity, TrendingUp } from "lucide-react";
import { barChartData, recentActivity } from "../_data";

export function DashboardView() {
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