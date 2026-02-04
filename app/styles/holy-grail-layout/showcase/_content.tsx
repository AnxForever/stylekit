"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, FileText, Settings, Users, Bell, Search, Menu, ChevronRight, Mail, Calendar, BarChart } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Primary", hex: "#3b82f6", bg: "bg-[#3b82f6]" },
  { name: "Dark", hex: "#1e293b", bg: "bg-[#1e293b]" },
  { name: "Background", hex: "#f1f5f9", bg: "bg-[#f1f5f9]" },
  { name: "Surface", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Border", hex: "#e2e8f0", bg: "bg-[#e2e8f0]" },
];

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: FileText, label: "Documents", active: false },
  { icon: Users, label: "Team", active: false },
  { icon: Calendar, label: "Calendar", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const activities = [
  { title: "New comment", time: "2m ago" },
  { title: "File uploaded", time: "15m ago" },
  { title: "Meeting scheduled", time: "1h ago" },
  { title: "Task completed", time: "3h ago" },
];

export default function ShowcaseContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/styles/holy-grail-layout"
              className="flex items-center gap-2 text-[#64748b] hover:text-[#3b82f6] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-[#e2e8f0]" />
            <span className="font-bold text-lg text-[#1e293b]">Holy Grail Layout</span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#3b82f6] text-white font-medium text-sm rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Holy Grail Layout"
        description="The classic three-column layout pattern that has stood the test of time. Header, footer, main content, and two sidebars - all working in harmony."
        className="pt-12 pb-8 px-6 text-center"
        titleClassName="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4"
        descriptionClassName="text-lg text-[#64748b] max-w-2xl mx-auto"
      />

      {/* Holy Grail Demo */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-sm">
            {/* Demo Header */}
            <header className="px-4 py-3 bg-white border-b border-[#e2e8f0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-[#f1f5f9] rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-[#64748b]" />
                </button>
                <div className="w-8 h-8 bg-[#3b82f6] rounded-lg" />
                <span className="font-semibold text-[#1e293b]">App Name</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#f1f5f9] rounded-lg">
                  <Search className="w-4 h-4 text-[#64748b]" />
                  <span className="text-sm text-[#94a3b8]">Search...</span>
                </div>
                <button className="p-2 hover:bg-[#f1f5f9] rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5 text-[#64748b]" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full" />
                </button>
                <div className="w-8 h-8 bg-[#3b82f6] rounded-full" />
              </div>
            </header>

            {/* Three Column Layout */}
            <div className="flex min-h-[500px]">
              {/* Left Sidebar - Navigation */}
              {sidebarOpen && (
                <aside className="w-56 bg-white border-r border-[#e2e8f0] p-4 hidden md:block">
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          item.active
                            ? "bg-[#3b82f6]/10 text-[#3b82f6]"
                            : "text-[#64748b] hover:bg-[#f1f5f9]"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </aside>
              )}

              {/* Main Content */}
              <main className="flex-1 p-6 bg-[#f8fafc]">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-[#1e293b] mb-1">Main Content Area</h2>
                  <p className="text-[#64748b] text-sm">The central focus of your application</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg border border-[#e2e8f0]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-lg flex items-center justify-center">
                        <BarChart className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1e293b]">Analytics</p>
                        <p className="text-xs text-[#64748b]">View insights</p>
                      </div>
                    </div>
                    <div className="h-20 bg-[#f1f5f9] rounded" />
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-[#e2e8f0]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#10b981]/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#10b981]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1e293b]">Messages</p>
                        <p className="text-xs text-[#64748b]">12 unread</p>
                      </div>
                    </div>
                    <div className="h-20 bg-[#f1f5f9] rounded" />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-[#e2e8f0]">
                  <h3 className="font-semibold text-[#1e293b] mb-3">Recent Items</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#e2e8f0] rounded" />
                          <span className="text-sm text-[#1e293b]">Item {i}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#94a3b8]" />
                      </div>
                    ))}
                  </div>
                </div>
              </main>

              {/* Right Sidebar - Activity */}
              <aside className="w-64 bg-white border-l border-[#e2e8f0] p-4 hidden lg:block">
                <h3 className="font-semibold text-[#1e293b] mb-4">Activity</h3>
                <div className="space-y-3">
                  {activities.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#3b82f6] rounded-full mt-2" />
                      <div>
                        <p className="text-sm text-[#1e293b]">{item.title}</p>
                        <p className="text-xs text-[#94a3b8]">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            {/* Demo Footer */}
            <footer className="px-4 py-3 bg-white border-t border-[#e2e8f0] text-center">
              <p className="text-sm text-[#94a3b8]">Footer - Copyright 2024</p>
            </footer>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Professional, neutral palette"
        className="py-12 px-6 bg-white border-y border-[#e2e8f0]"
        titleClassName="text-2xl font-bold text-[#1e293b] mb-3 text-center"
        subtitleClassName="text-[#64748b] mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden border border-[#e2e8f0]"
            labelClassName="font-semibold text-sm text-[#1e293b]"
            hexClassName="text-xs text-[#64748b] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Layout Structure */}
      <ShowcaseSection
        title="Layout Structure"
        subtitle="The five essential regions"
        className="py-12 px-6"
        titleClassName="text-2xl font-bold text-[#1e293b] mb-3 text-center"
        subtitleClassName="text-[#64748b] mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { name: "Header", desc: "Navigation & branding", span: "col-span-5" },
              { name: "Nav", desc: "Primary navigation", span: "col-span-1" },
              { name: "Main", desc: "Primary content", span: "col-span-3" },
              { name: "Aside", desc: "Secondary info", span: "col-span-1" },
              { name: "Footer", desc: "Site info & links", span: "col-span-5" },
            ].map((item) => (
              <div key={item.name} className={`p-4 bg-white rounded-lg border border-[#e2e8f0] ${item.span}`}>
                <p className="font-semibold text-[#1e293b]">{item.name}</p>
                <p className="text-xs text-[#64748b]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#64748b] text-sm">
            Holy Grail Layout Showcase · Part of{" "}
            <Link href="/" className="text-[#3b82f6] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
