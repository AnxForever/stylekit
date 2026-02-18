"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, GitBranch, GitPullRequest, Code,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Star, BookOpen, Terminal,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "White", hex: "#ffffff", bg: "bg-[#ffffff]", border: true },
  { name: "Subtle Gray", hex: "#f6f8fa", bg: "bg-[#f6f8fa]", border: true },
  { name: "Border", hex: "#d0d7de", bg: "bg-[#d0d7de]" },
  { name: "Foreground", hex: "#1f2328", bg: "bg-[#1f2328]" },
  { name: "Muted", hex: "#656d76", bg: "bg-[#656d76]" },
  { name: "Blue", hex: "#0969da", bg: "bg-[#0969da]" },
  { name: "Green", hex: "#1f883d", bg: "bg-[#1f883d]" },
  { name: "Red", hex: "#cf222e", bg: "bg-[#cf222e]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Code", icon: Code },
    { label: "Pull Requests", icon: GitPullRequest },
    { label: "Docs", icon: BookOpen },
  ];

  const accordionItems = [
    { title: "What is GitHub Style design?", content: "GitHub Style is a design language born from the world's largest developer platform. It prioritises content over chrome, using a refined grayscale system, semantic functional colours, and minimal decoration to create interfaces where code and documentation are the star." },
    { title: "Key Principles", content: "Content-first hierarchy. A precise gray-scale ladder from #1f2328 to #f6f8fa. Blue (#0969da) as the sole interaction colour. Green for success, yellow for warning, red for danger -- each colour carries strict semantic meaning." },
    { title: "Developer Experience", content: "Every design decision serves efficiency. Compact spacing, monospace code blocks, subtle borders, and near-zero shadows create an environment where developers can focus entirely on their work without visual distraction." },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1f2328]">
      {/* Navigation */}
      <nav className="px-6 py-3 bg-[#24292f] text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/github-style"
            className="flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-white" />
            <span className="font-semibold text-sm text-white">
              GitHub Style
            </span>
          </div>
          <Link
            href="/styles"
            className="px-3 py-1.5 text-sm font-semibold text-white border border-[#57606a] rounded-md hover:border-[#8b949e] transition-colors duration-150"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-6 border-b border-[#d0d7de]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#656d76] text-sm">stylekit</span>
            <span className="text-[#656d76]">/</span>
            <span className="text-[#0969da] text-xl font-semibold">github-style</span>
            <span className="ml-2 px-2 py-0.5 text-xs font-medium text-[#656d76] border border-[#d0d7de] rounded-full">
              Public
            </span>
          </div>
          <p className="text-sm text-[#656d76] mb-6">
            A clean, developer-focused design system built on grayscale hierarchy, semantic colours, and content-first principles.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 text-sm text-[#656d76]">
              <Star className="w-4 h-4" />
              <span className="font-semibold text-[#1f2328]">4,207</span>
              <span>stars</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-[#656d76]">
              <GitBranch className="w-4 h-4" />
              <span className="font-semibold text-[#1f2328]">891</span>
              <span>forks</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-[#656d76]">
              <Eye className="w-4 h-4" />
              <span className="font-semibold text-[#1f2328]">142</span>
              <span>watching</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Repository metrics"
        className="py-8 px-6"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Contributors", value: "2,841" },
            { icon: TrendingUp, label: "Growth", value: "+18%" },
            { icon: Eye, label: "Views", value: "142K" },
            { icon: Heart, label: "Sponsors", value: "3,209" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-md border border-[#d0d7de] hover:bg-[#f6f8fa] transition-colors duration-150"
            >
              <stat.icon className="w-4 h-4 text-[#656d76] mb-3" />
              <p className="text-2xl font-semibold text-[#1f2328] mb-1">{stat.value}</p>
              <p className="text-xs text-[#656d76]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Grayscale system with semantic accents"
        className="py-8 px-6 bg-[#f6f8fa]"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-md overflow-hidden border border-[#d0d7de] bg-white"
            labelClassName="text-sm font-semibold text-[#1f2328]"
            hexClassName="text-xs text-[#656d76] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="System fonts and monospace"
        className="py-8 px-6"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="p-6 bg-white rounded-md border border-[#d0d7de]">
            <p className="text-3xl font-semibold text-[#1f2328] mb-3">Heading</p>
            <p className="text-xl font-semibold text-[#1f2328] mb-3">Subheading</p>
            <p className="text-sm text-[#1f2328] mb-3 leading-relaxed">
              Body text is set at 14px with a 1.5 line-height. Clear, functional, and optimised for long reading sessions of code and documentation.
            </p>
            <p className="text-xs text-[#656d76] mb-4">
              Muted caption text for secondary information
            </p>
            <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
              <code className="text-sm font-mono text-[#1f2328]">
                const style = &quot;github&quot;; // monospace code
              </code>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Functional and semantic"
        className="py-8 px-6 bg-[#f6f8fa]"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-6 bg-white rounded-md border border-[#d0d7de]">
            <div className="flex flex-wrap gap-3 items-center">
              <button className="px-4 py-1.5 bg-[#1f883d] text-white text-sm font-semibold rounded-md border border-[#1b7f37] shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#1a7f37] transition-colors duration-150">
                Merge
              </button>
              <button className="px-4 py-1.5 bg-[#f6f8fa] text-[#1f2328] text-sm font-semibold rounded-md border border-[#d0d7de] shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#f3f4f6] transition-colors duration-150">
                Default
              </button>
              <button className="px-4 py-1.5 bg-[#0969da] text-white text-sm font-semibold rounded-md border border-[#0860ca] shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#0860ca] transition-colors duration-150">
                Primary
              </button>
              <button className="px-4 py-1.5 bg-[#cf222e] text-white text-sm font-semibold rounded-md border border-[#c11e2a] shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#c11e2a] transition-colors duration-150">
                Danger
              </button>
              <button className="text-sm font-semibold text-[#0969da] hover:underline transition-colors duration-150">
                Link
              </button>
              <button className="px-4 py-1.5 bg-[#f6f8fa] text-[#8b949e] text-sm font-semibold rounded-md border border-[#d0d7de] cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Repository list items"
        className="py-8 px-6"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-5xl mx-auto space-y-3">
          {[
            { name: "design-system", desc: "A comprehensive design token system for building consistent UIs", lang: "TypeScript", langColor: "#3178c6", stars: "1.2k", updated: "2 hours ago" },
            { name: "react-components", desc: "Accessible React component library following GitHub design principles", lang: "TypeScript", langColor: "#3178c6", stars: "892", updated: "5 hours ago" },
            { name: "css-utilities", desc: "Utility-first CSS classes inspired by GitHub Primer", lang: "CSS", langColor: "#563d7c", stars: "547", updated: "1 day ago" },
          ].map((repo, index) => (
            <div key={index} className="p-4 bg-white rounded-md border border-[#d0d7de] hover:bg-[#f6f8fa] transition-colors duration-150">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#0969da] text-sm font-semibold hover:underline cursor-pointer">
                  stylekit/{repo.name}
                </span>
                <span className="px-1.5 py-0.5 text-xs font-medium text-[#656d76] border border-[#d0d7de] rounded-full">
                  Public
                </span>
              </div>
              <p className="text-[#656d76] text-sm mb-3">{repo.desc}</p>
              <div className="flex items-center gap-4 text-xs text-[#656d76]">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.langColor }} />
                  {repo.lang}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {repo.stars}
                </span>
                <span>Updated {repo.updated}</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-8 px-6 bg-[#f6f8fa]"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-md border border-[#d0d7de] overflow-hidden">
            <div className="flex border-b border-[#d0d7de]">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-150 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#1f2328] border-[#fd8c73]"
                      : "text-[#656d76] border-transparent hover:text-[#1f2328] hover:border-[#d0d7de]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {index === 1 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#e8e8e8] text-[#656d76] rounded-full">3</span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#1f2328] mb-2">Source Code</h4>
                  <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                    <code className="text-sm font-mono text-[#1f2328]">
                      src/ lib/ components/ package.json
                    </code>
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#1f2328] mb-2">Open Pull Requests</h4>
                  <p className="text-sm text-[#656d76] leading-relaxed">3 open pull requests awaiting review. All checks passing.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-sm font-semibold text-[#1f2328] mb-2">Documentation</h4>
                  <p className="text-sm text-[#656d76] leading-relaxed">Getting started guide, API reference, and contribution guidelines.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expandable sections"
        className="py-8 px-6"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white rounded-md border border-[#d0d7de] overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#f6f8fa] transition-colors duration-150"
              >
                <span className="text-sm font-semibold text-[#1f2328]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#656d76] transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-4 pb-4 border-t border-[#d0d7de]">
                  <p className="text-sm text-[#656d76] leading-relaxed pt-3">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Semantic notifications"
        className="py-8 px-6 bg-[#f6f8fa]"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-start gap-3 p-3 bg-[#dafbe1] rounded-md border border-[#1f883d]/20">
            <Check className="w-4 h-4 text-[#1f883d] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#1f2328]">All checks passed</p>
              <p className="text-xs text-[#656d76] mt-0.5">3 successful checks. Ready to merge.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#fff8c5] rounded-md border border-[#9a6700]/20">
            <AlertTriangle className="w-4 h-4 text-[#9a6700] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#1f2328]">Review required</p>
              <p className="text-xs text-[#656d76] mt-0.5">At least 1 approving review is required.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#ffebe9] rounded-md border border-[#cf222e]/20">
            <X className="w-4 h-4 text-[#cf222e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#1f2328]">CI failed</p>
              <p className="text-xs text-[#656d76] mt-0.5">2 failing checks. Review the build logs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-[#ddf4ff] rounded-md border border-[#0969da]/20">
            <Info className="w-4 h-4 text-[#0969da] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#1f2328]">Tip</p>
              <p className="text-xs text-[#656d76] mt-0.5">Use <code className="px-1 py-0.5 bg-[#f6f8fa] rounded text-xs font-mono">gh pr status</code> to check from the CLI.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Settings"
        className="py-8 px-6"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-md border border-[#d0d7de] p-4 space-y-4">
            {[
              { label: "Branch protection", desc: "Require pull request reviews before merging" },
              { label: "Auto-merge", desc: "Automatically merge when requirements are met" },
              { label: "Delete head branch", desc: "Delete branch after pull request is merged" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-semibold text-[#1f2328]">{item.label}</p>
                  <p className="text-xs text-[#656d76] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-150 ${
                    toggleStates[index] ? "bg-[#0969da]" : "bg-[#d0d7de]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-150 ${
                      toggleStates[index] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Build and deploy status"
        className="py-8 px-6 bg-[#f6f8fa]"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-md border border-[#d0d7de] p-4 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[#1f2328]">Build progress</p>
                <p className="text-xs text-[#656d76] font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                <div
                  className="h-full bg-[#1f883d] rounded-md transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1f2328] mb-2">Pipeline stages</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <div
                        className={`h-full rounded-md transition-all ${value === 100 ? "bg-[#1f883d]" : value > 0 ? "bg-[#0969da]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#656d76] mt-1 text-center">{["Lint", "Test", "Build", "Deploy"][index]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#d0d7de]">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-3 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#f3f4f6] transition-colors duration-150"
              >
                Re-run
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-3 py-1.5 text-sm font-semibold text-white bg-[#1f883d] border border-[#1b7f37] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#1a7f37] transition-colors duration-150"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Issue submission"
        className="py-8 px-6"
        titleClassName="text-xl font-semibold text-[#1f2328] mb-1"
        subtitleClassName="text-sm text-[#656d76] mb-8"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-md border border-[#d0d7de] p-6">
            <h3 className="text-lg font-semibold text-[#1f2328] mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#656d76]" />
              New Issue
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1f2328] mb-1.5">Title</label>
                <input
                  type="text"
                  placeholder="Bug report or feature request"
                  className="w-full px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#1f2328] placeholder-[#656d76] focus:bg-white focus:border-[#0969da] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] focus:outline-none transition-all duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1f2328] mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#1f2328] placeholder-[#656d76] focus:bg-white focus:border-[#0969da] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] focus:outline-none transition-all duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1f2328] mb-1.5">Description</label>
                <textarea
                  placeholder="Describe the issue or feature..."
                  rows={3}
                  className="w-full px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#1f2328] placeholder-[#656d76] focus:bg-white focus:border-[#0969da] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] focus:outline-none transition-all duration-150 resize-none"
                />
              </div>
              <button className="w-full py-1.5 bg-[#1f883d] text-white text-sm font-semibold rounded-md border border-[#1b7f37] shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#1a7f37] transition-colors duration-150 mt-2">
                Submit New Issue
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#d0d7de]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#656d76]">
            GitHub Style Showcase &middot; Part of{" "}
            <Link href="/" className="text-[#0969da] hover:underline transition-colors duration-150">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
