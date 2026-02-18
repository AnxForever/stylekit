"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Award,
  Dumbbell,
  Flame,
  Footprints,
  Heart,
  Moon,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const stats = [
  { label: "Steps", value: "8,432", target: "10,000", icon: Footprints, color: "text-blue-500", bg: "bg-blue-50", progress: 84 },
  { label: "Calories", value: "1,847", target: "2,200", icon: Flame, color: "text-orange-500", bg: "bg-orange-50", progress: 84 },
  { label: "Heart Rate", value: "72", target: "bpm", icon: Heart, color: "text-red-500", bg: "bg-red-50", progress: 72 },
  { label: "Sleep", value: "7.2", target: "8h goal", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50", progress: 90 },
];

const workouts = [
  { name: "Morning Run", type: "Cardio", duration: "32 min", calories: 320, date: "Today", intensity: "Medium" },
  { name: "Upper Body Strength", type: "Strength", duration: "45 min", calories: 280, date: "Today", intensity: "High" },
  { name: "Yoga Flow", type: "Flexibility", duration: "30 min", calories: 150, date: "Yesterday", intensity: "Low" },
  { name: "HIIT Circuit", type: "Cardio", duration: "25 min", calories: 380, date: "Yesterday", intensity: "High" },
  { name: "Leg Day", type: "Strength", duration: "50 min", calories: 310, date: "2 days ago", intensity: "High" },
  { name: "Swimming", type: "Cardio", duration: "40 min", calories: 400, date: "3 days ago", intensity: "Medium" },
];

const weeklyData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 40 },
];

const goals = [
  { name: "Run 5K under 25 min", progress: 78, deadline: "Mar 15" },
  { name: "Bench press 100kg", progress: 65, deadline: "Apr 1" },
  { name: "30-day yoga streak", progress: 43, deadline: "Feb 28" },
  { name: "Lose 3kg body fat", progress: 55, deadline: "Mar 30" },
];

const achievements = [
  { name: "Early Bird", description: "5 workouts before 7 AM", icon: Zap, earned: true },
  { name: "Iron Will", description: "30-day streak", icon: Award, earned: true },
  { name: "Cardio King", description: "100km total running", icon: Activity, earned: false },
  { name: "Powerlifter", description: "Bench press 1.5x body weight", icon: Dumbbell, earned: false },
];

export default function FitnessHealthTemplate() {
  const [activeTab, setActiveTab] = useState<"overview" | "workouts" | "goals">("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  const maxWeekly = Math.max(...weeklyData.map((d) => d.value));

  const intensityColor = (i: string) => {
    if (i === "Low") return "text-green-600 bg-green-50";
    if (i === "Medium") return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">FitPulse</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1">
            {(["overview", "workouts", "goals"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  activeTab === tab ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 text-sm font-bold">A</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-gray-500">{stat.target}</span>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-3">{stat.label}</p>
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    stat.color.replace("text-", "bg-")
                  }`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Activity Rings */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Progress Circles */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-6">Daily Progress</h3>
              <div className="flex items-center justify-center gap-8">
                {[
                  { label: "Move", pct: 84, color: "#ef4444", size: 100 },
                  { label: "Exercise", pct: 65, color: "#22c55e", size: 80 },
                  { label: "Stand", pct: 92, color: "#3b82f6", size: 60 },
                ].map((ring) => {
                  const r = ring.size / 2 - 6;
                  const circ = 2 * Math.PI * r;
                  const offset = circ - (ring.pct / 100) * circ;
                  return (
                    <div key={ring.label} className="relative flex flex-col items-center">
                      <svg width={ring.size} height={ring.size} className="-rotate-90">
                        <circle cx={ring.size / 2} cy={ring.size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={8} />
                        <circle
                          cx={ring.size / 2}
                          cy={ring.size / 2}
                          r={r}
                          fill="none"
                          stroke={ring.color}
                          strokeWidth={8}
                          strokeLinecap="round"
                          strokeDasharray={circ}
                          strokeDashoffset={offset}
                        />
                      </svg>
                      <span className="text-xs text-gray-400 mt-2">{ring.label}</span>
                      <span className="text-xs font-bold">{ring.pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Weekly Activity</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-800 text-sm text-gray-300 rounded-lg px-3 py-1.5 border-none"
                >
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="flex items-end justify-between gap-3 h-40">
                {weeklyData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-400">{d.value}%</span>
                    <div className="w-full bg-gray-800 rounded-t-lg relative" style={{ height: "100%" }}>
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all"
                        style={{ height: `${(d.value / maxWeekly) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Workout History */}
        {(activeTab === "overview" || activeTab === "workouts") && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Workout History</h3>
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+12% this week</span>
              </div>
            </div>
            <div className="space-y-3">
              {workouts.map((w, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{w.name}</p>
                      <p className="text-xs text-gray-500">{w.type} / {w.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${intensityColor(w.intensity)}`}>
                      {w.intensity}
                    </span>
                    <span className="text-gray-400">{w.duration}</span>
                    <span className="text-orange-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      {w.calories} cal
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals */}
        {(activeTab === "overview" || activeTab === "goals") && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  Goals
                </h3>
              </div>
              <div className="space-y-5">
                {goals.map((g) => (
                  <div key={g.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{g.name}</span>
                      <span className="text-xs text-gray-500">by {g.deadline}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${g.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-emerald-400 w-10 text-right">
                        {g.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((a) => (
                  <div
                    key={a.name}
                    className={`p-4 rounded-xl border text-center ${
                      a.earned
                        ? "bg-gray-800 border-amber-500/30"
                        : "bg-gray-800/30 border-gray-800 opacity-50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      a.earned ? "bg-amber-500/20" : "bg-gray-800"
                    }`}>
                      <a.icon className={`w-6 h-6 ${a.earned ? "text-amber-400" : "text-gray-600"}`} />
                    </div>
                    <p className="text-sm font-semibold mb-1">{a.name}</p>
                    <p className="text-xs text-gray-500">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-4 md:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Copyright 2025 FitPulse. Part of{" "}
            <Link href="/templates" className="text-gray-400 hover:text-white transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacy</a>
            <a href="#" className="hover:text-gray-300">Terms</a>
            <a href="#" className="hover:text-gray-300">Support</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton />
    </div>
  );
}
