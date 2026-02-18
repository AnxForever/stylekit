"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  Menu,
  Search,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const sidebarSections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", active: true },
      { label: "Installation", active: false },
      { label: "Quick Start", active: false },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { label: "Configuration", active: false },
      { label: "Routing", active: false },
      { label: "Data Fetching", active: false },
      { label: "Rendering", active: false },
    ],
  },
  {
    title: "API Reference",
    items: [
      { label: "Components", active: false },
      { label: "Hooks", active: false },
      { label: "Utilities", active: false },
    ],
  },
];

const tocItems = [
  "Overview",
  "Features",
  "Requirements",
  "Getting Help",
];

export default function DocsSiteTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/templates/docs-site" className="flex items-center gap-2 font-semibold">
              <Book className="w-5 h-5 text-blue-600" />
              <span>DocKit</span>
              <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full">v3.0</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search docs... (Ctrl+K)"
                className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-300"
              />
            </div>
            <a href="#" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-14 max-w-[90rem] mx-auto flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-14 h-[calc(100vh-3.5rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto z-30 transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <nav className="p-5">
            {sidebarSections.map((section) => (
              <div key={section.title} className="mb-6">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {section.title}
                </h4>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href="#"
                        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                          item.active
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <button
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-10 lg:py-12">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
              <span>Docs</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Getting Started</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-900">Introduction</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Introduction</h1>
            <p className="text-lg text-gray-500 mb-10 leading-relaxed">
              Welcome to DocKit - a modern framework for building fast, scalable web applications.
              This guide will help you get started quickly.
            </p>

            {/* Overview */}
            <section className="mb-12" id="overview">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                DocKit is designed with developer experience in mind. It provides a set of conventions and tools
                that let you focus on building your application, rather than configuring infrastructure.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                <strong>Note:</strong> This is a template demo. In a real docs site, content would be sourced from
                MDX files or a CMS.
              </div>
            </section>

            {/* Features */}
            <section className="mb-12" id="features">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Features</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span><strong>File-based Routing</strong> - Automatic route generation from your file structure</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span><strong>Server-side Rendering</strong> - Built-in SSR with streaming support</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span><strong>TypeScript Native</strong> - First-class TypeScript support with zero config</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span><strong>Edge Ready</strong> - Deploy to the edge with minimal configuration</span>
                </li>
              </ul>
            </section>

            {/* Code Block */}
            <section className="mb-12" id="requirements">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Requirements</h2>
              <p className="text-gray-600 mb-4">
                To get started, make sure you have Node.js 18+ installed. Then run:
              </p>
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Code2 className="w-3.5 h-3.5" />
                    Terminal
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                    aria-label="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                  <code>npx create-dockit@latest my-app{"\n"}cd my-app{"\n"}npm run dev</code>
                </pre>
              </div>
            </section>

            {/* Help */}
            <section className="mb-12" id="getting-help">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Getting Help</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <a href="#" className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all group">
                  <h3 className="font-medium mb-1 group-hover:text-blue-700">GitHub Discussions</h3>
                  <p className="text-sm text-gray-500">Ask questions and get answers from the community</p>
                </a>
                <a href="#" className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all group">
                  <h3 className="font-medium mb-1 group-hover:text-blue-700">Discord Server</h3>
                  <p className="text-sm text-gray-500">Chat with other developers in real-time</p>
                </a>
              </div>
            </section>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-100">
              <div />
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                Next: Installation
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </main>

        {/* Table of Contents */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-14 pt-12 pr-6">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              On this page
            </h4>
            <ul className="space-y-2 text-sm border-l border-gray-100">
              {tocItems.map((item, i) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`block pl-4 py-0.5 transition-colors ${
                      i === 0
                        ? "border-l-2 border-blue-500 text-blue-700 font-medium -ml-px"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-4 md:px-8">
        <div className="max-w-[90rem] mx-auto text-center">
          <p className="text-sm text-gray-400">
            Copyright 2025 DocKit. Part of{" "}
            <Link href="/templates" className="text-gray-500 hover:text-blue-600 transition-colors">
              StyleKit Templates
            </Link>
          </p>
        </div>
      </footer>
      <TemplateBackButton variant="modern" />
    </div>
  );
}
