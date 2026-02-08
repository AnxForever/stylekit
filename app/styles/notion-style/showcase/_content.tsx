"use client";

import Link from "next/link";
import { ArrowLeft, FileText, CheckSquare, Users, Search } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Notion 閰嶈壊
const colors: ColorItem[] = [
  { name: "Text", hex: "#37352f", bg: "bg-[#37352f]" },
  { name: "Background", hex: "#f7f6f3", bg: "bg-[#f7f6f3]" },
  { name: "Blue", hex: "#2eaadc", bg: "bg-[#2eaadc]" },
  { name: "Red", hex: "#eb5757", bg: "bg-[#eb5757]" },
  { name: "Green", hex: "#0f7b6c", bg: "bg-[#0f7b6c]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-3 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/notion-style"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <span className="font-semibold text-lg text-[#37352f]">Notion Style</span>
          <Link
            href="/styles"
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Notion Style"
        description="鏋佺畝娓呯埥鐨勬枃妗ｅ伐鍏烽鏍硷紝寰杈规涓庢煍鍜屾偓鍋滄晥鏋滐紝涓撴敞鍐呭鏈韩"
        className="pt-20 pb-16 px-6 text-center bg-[#f7f6f3]"
        titleClassName="text-4xl md:text-6xl font-semibold text-[#37352f] mb-6"
        descriptionClassName="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-2.5 bg-[#2eaadc] rounded-md text-white font-medium hover:bg-[#2997c9] transition-colors">
            寮€濮嬩娇鐢?
          </button>
          <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors">
            鏌ョ湅鏂囨。
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="鏋佺畝閰嶈壊锛屽井濡欑偣缂€"
        className="py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#37352f] mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            labelClassName="font-medium text-sm text-gray-700"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="绠€娲佸疄鐢ㄧ殑鎸夐挳鏍峰紡"
        className="py-16 px-6 bg-[#f7f6f3]"
        titleClassName="text-3xl font-semibold text-[#37352f] mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-6">鍙樹綋</p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-[#2eaadc] rounded-md text-white text-sm font-medium hover:bg-[#2997c9] transition-colors">
                涓昏
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                娆¤
              </button>
              <button className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-md transition-colors">
                骞界伒
              </button>
              <button className="px-4 py-2 bg-[#eb5757] rounded-md text-white text-sm font-medium hover:bg-[#e04545] transition-colors">
                鍗遍櫓
              </button>
            </div>

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-6 mt-10">灏哄</p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-3 py-1.5 bg-[#2eaadc] rounded-md text-white text-xs font-medium hover:bg-[#2997c9] transition-colors">
                灏?
              </button>
              <button className="px-4 py-2 bg-[#2eaadc] rounded-md text-white text-sm font-medium hover:bg-[#2997c9] transition-colors">
                涓?
              </button>
              <button className="px-5 py-2.5 bg-[#2eaadc] rounded-md text-white text-base font-medium hover:bg-[#2997c9] transition-colors">
                澶?
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="绠€娲佺殑鍐呭瀹瑰櫒"
        className="py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#37352f] mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-[#2eaadc]" />
            </div>
            <h3 className="text-lg font-semibold text-[#37352f] mb-2">鏂囨。</h3>
            <p className="text-gray-600 text-sm">Create and organize notes with ease.</p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6 text-[#0f7b6c]" />
            </div>
            <h3 className="text-lg font-semibold text-[#37352f] mb-2">浠诲姟</h3>
            <p className="text-gray-600 text-sm">Manage tasks and projects efficiently.</p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#37352f] mb-2">鍗忎綔</h3>
            <p className="text-gray-600 text-sm">Collaborate with your team in one place.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="琛ㄥ崟鍏冪礌"
        subtitle="绠€娲佺殑杈撳叆妗嗕笌鑱氱劍鐘舵€?"
        className="py-16 px-6 bg-[#f7f6f3]"
        titleClassName="text-3xl font-semibold text-[#37352f] mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-[#37352f] mb-6">鍒涘缓椤甸潰</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">椤甸潰鏍囬</label>
                <input
                  type="text"
                  placeholder="鏃犳爣棰?"
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#37352f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2eaadc] focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">鎻忚堪</label>
                <textarea
                  placeholder="Add a description..."
                  rows={4}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[#37352f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2eaadc] focus:border-transparent transition-all resize-none"
                />
              </div>
              <button className="w-full py-2 bg-[#2eaadc] text-white rounded-md font-medium hover:bg-[#2997c9] transition-colors">
                Create
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Sidebar Layout */}
      <ShowcaseSection
        title="Sidebar Layout"
        subtitle="Classic Notion-style navigation"
        className="py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#37352f] mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden shadow-sm" style={{ height: '400px' }}>
            {/* Sidebar */}
            <aside className="w-60 bg-[#f7f6f3] border-r border-gray-200 p-3">
              <div className="mb-4">
                <button className="w-full px-2 py-1.5 text-left text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
              <div className="space-y-1">
                <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                  Getting Started
                </a>
                <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 bg-gray-200 rounded-md">
                  Quick Note
                </a>
                <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                  Personal Home
                </a>
                <a href="#" className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
                  Team Wiki
                </a>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-white overflow-auto">
              <h1 className="text-3xl font-bold text-[#37352f] mb-4">Quick Note</h1>
              <p className="text-gray-600 mb-6">A simple page to capture your thoughts</p>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-[#2eaadc] rounded">
                  <p className="text-sm text-gray-700">This is a callout block for important information</p>
                </div>
                <p className="text-gray-700">Regular paragraph text goes here. Notion-style pages are clean and focused on content.</p>
              </div>
            </main>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tags */}
      <ShowcaseSection
        title="Tags & Labels"
        subtitle="Colorful tags for organization"
        className="py-16 px-6 bg-[#f7f6f3]"
        titleClassName="text-3xl font-semibold text-[#37352f] mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-[#2eaadc] text-sm rounded-md">Design</span>
              <span className="px-3 py-1 bg-green-50 text-[#0f7b6c] text-sm rounded-md">Development</span>
              <span className="px-3 py-1 bg-red-50 text-[#eb5757] text-sm rounded-md">Urgent</span>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-md">In Progress</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-md">Review</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md">Archive</span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Notion Style Showcase 路 Part of{" "}
            <Link href="/" className="text-[#2eaadc] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

