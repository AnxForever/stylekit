"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal, FileText, Globe, Hash,
  Users, TrendingUp, Eye, Heart,
  Code, Database, Cpu,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "White", hex: "#ffffff", bg: "bg-[#ffffff]", border: true },
  { name: "Black", hex: "#000000", bg: "bg-[#000000]" },
  { name: "Link Blue", hex: "#0000ff", bg: "bg-[#0000ff]" },
  { name: "Visited", hex: "#551a8b", bg: "bg-[#551a8b]" },
  { name: "Red", hex: "#ff0000", bg: "bg-[#ff0000]" },
  { name: "Green", hex: "#008000", bg: "bg-[#008000]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Source", icon: Code },
    { label: "Data", icon: Database },
    { label: "System", icon: Cpu },
  ];

  const accordionItems = [
    { title: "What is Brutalist Web?", content: "Brutalist Web design embraces the raw aesthetics of the early 1990s internet. Content is king. Decoration is irrelevant. Pages look like they were made in Notepad and uploaded via FTP. System fonts, blue underlined links, pure white backgrounds, and zero embellishment." },
    { title: "Design Principles", content: "No rounded corners. No shadows. No gradients. No animations. No custom fonts. The HTML document structure IS the visual hierarchy. Headings are big and bold in Times New Roman. Body text is monospace. Links are blue and underlined. That is all." },
    { title: "Why This Matters", content: "In a web saturated with over-designed interfaces, brutalist design is a deliberate rejection of decoration. It prioritizes content, accessibility, and loading speed. Every byte serves a purpose. The medium disappears, and the message remains." },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Navigation */}
      <nav className="px-4 py-2 border-b border-black">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/brutalist-web"
            className="text-[#0000ff] underline text-sm font-mono"
          >
            &lt; Back
          </Link>
          <div className="flex items-center gap-1">
            <Terminal className="w-4 h-4 text-black" />
            <span className="font-serif font-bold text-lg text-black">
              Brutalist Web
            </span>
          </div>
          <Link
            href="/styles"
            className="text-[#0000ff] underline text-sm font-mono"
          >
            [All Styles]
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-8 px-4 border-b border-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-2">
            Welcome to My Website
          </h1>
          <p className="text-sm font-mono text-black mb-4">
            This is a website. It contains information. No more, no less.
          </p>
          <hr className="border-black" />
          <p className="text-xs font-mono text-black mt-2">
            Last updated: 2026-02-18 | <a href="#" className="text-[#0000ff] underline">Webmaster</a>
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Site statistics"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto">
          <table className="w-full border-collapse border border-black text-sm font-mono">
            <thead>
              <tr>
                {[
                  { icon: Users, label: "Visitors" },
                  { icon: TrendingUp, label: "Growth" },
                  { icon: Eye, label: "Hits" },
                  { icon: Heart, label: "Bookmarks" },
                ].map((stat, index) => (
                  <th key={index} className="border border-black px-3 py-2 text-left font-bold">
                    {stat.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-3 py-2">1,847</td>
                <td className="border border-black px-3 py-2">+9%</td>
                <td className="border border-black px-3 py-2">52,301</td>
                <td className="border border-black px-3 py-2">834</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Browser default colors only"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-none overflow-hidden border border-black bg-white"
            labelClassName="text-sm font-mono font-bold text-black"
            hexClassName="text-xs text-black font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="System fonts only"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-4 bg-white border border-black">
            <p className="text-4xl font-serif font-bold text-black mb-2">Heading (Times New Roman)</p>
            <p className="text-2xl font-serif font-bold text-black mb-2">Subheading (serif, bold)</p>
            <p className="text-sm font-mono text-black mb-2">
              Body text in monospace. Fixed-width characters line up neatly. No kerning tricks.
            </p>
            <p className="text-xs font-mono text-black">
              CAPTION: Small monospace text for metadata and timestamps.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Plain HTML form elements"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-4 bg-white border border-black">
            <div className="flex flex-wrap gap-3 items-center">
              <button className="px-3 py-1 bg-white text-black font-mono text-sm border border-black rounded-none cursor-pointer hover:underline">
                [Submit]
              </button>
              <button className="px-3 py-1 bg-white text-black font-mono text-sm border border-black rounded-none cursor-pointer hover:underline">
                [Reset]
              </button>
              <a href="#" className="text-[#0000ff] underline font-mono text-sm">
                Click here
              </a>
              <a href="#" className="text-[#0000ff] underline font-mono text-sm">
                Download (2.3KB)
              </a>
              <button className="px-3 py-1 bg-white text-black font-mono text-sm border border-black rounded-none opacity-50 cursor-not-allowed">
                [Disabled]
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Content blocks"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {[
            { icon: FileText, title: "Documents", desc: "Plain text files served over HTTP. No JavaScript required. Content is accessible to any browser made after 1993." },
            { icon: Globe, title: "Hyperlinks", desc: "The web was built on links. Blue, underlined, and honest. They tell you exactly where they go. No mystery meat navigation." },
            { icon: Hash, title: "Structure", desc: "HTML heading elements provide all the hierarchy you need. H1 through H6. Paragraphs. Lists. Tables. That is the entire toolkit." },
          ].map((card, index) => (
            <div key={index} className="p-4 bg-white border border-black rounded-none">
              <h3 className="font-serif text-lg font-bold text-black mb-1">{card.title}</h3>
              <p className="font-mono text-sm text-black mb-2">{card.desc}</p>
              <a href="#" className="text-[#0000ff] underline text-sm font-mono">Read more</a>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content sections"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-black rounded-none">
            <div className="flex border-b border-black">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-2 text-sm font-mono border-r border-black last:border-r-0 ${
                    activeTab === index
                      ? "bg-black text-white font-bold"
                      : "bg-white text-[#0000ff] underline"
                  }`}
                >
                  [{tab.label}]
                </button>
              ))}
            </div>
            <div className="p-4 min-h-[100px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="font-serif font-bold text-black mb-1">Source Code</h4>
                  <p className="font-mono text-sm text-black">View source is the original developer tool. Right-click, View Page Source. Every website is an open book if you know how to read HTML.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="font-serif font-bold text-black mb-1">Data Tables</h4>
                  <p className="font-mono text-sm text-black">Tables are for tabular data. Rows and columns with 1px borders. No zebra striping, no hover highlights. Just clean, structured information.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="font-serif font-bold text-black mb-1">System Info</h4>
                  <p className="font-mono text-sm text-black">Server: Apache/1.3.27 | OS: FreeBSD | Uptime: 412 days | Pages served: 2,847,103 | Avg response: 23ms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="FAQ"
        subtitle="Frequently asked questions"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto space-y-0">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white border border-black border-t-0 first:border-t rounded-none">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-4 py-2 flex items-center justify-between text-left font-mono text-sm"
              >
                <span className="font-bold text-black">{openAccordion === index ? "[-]" : "[+]"} {item.title}</span>
              </button>
              {openAccordion === index && (
                <div className="px-4 pb-3 border-t border-black">
                  <p className="font-mono text-sm text-black pt-2">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Notices"
        subtitle="System messages"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="p-3 bg-white border border-black rounded-none">
            <p className="font-mono text-sm text-[#008000]">
              <span className="font-bold">[OK]</span> File saved successfully. 2,048 bytes written.
            </p>
          </div>
          <div className="p-3 bg-white border border-black rounded-none">
            <p className="font-mono text-sm text-black">
              <span className="font-bold">[WARN]</span> Disk usage at 78%. Consider archiving old files.
            </p>
          </div>
          <div className="p-3 bg-white border border-black rounded-none">
            <p className="font-mono text-sm text-[#ff0000]">
              <span className="font-bold">[ERR]</span> 404 Not Found: /cgi-bin/guestbook.pl
            </p>
          </div>
          <div className="p-3 bg-white border border-black rounded-none">
            <p className="font-mono text-sm text-[#0000ff]">
              <span className="font-bold">[INFO]</span> Server running Apache/1.3.27. All systems nominal.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Settings"
        subtitle="Server configuration"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-black p-4 rounded-none space-y-3">
            {[
              { label: "Enable directory listing", desc: "Show file index for directories without index.html" },
              { label: "Gzip compression", desc: "Compress text responses to save bandwidth" },
              { label: "Access logging", desc: "Write all requests to access.log" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-mono font-bold text-black">{item.label}</p>
                  <p className="text-xs font-mono text-black">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className="font-mono text-sm border border-black px-2 py-0.5 bg-white rounded-none"
                >
                  {toggleStates[index] ? "[ON]" : "[OFF]"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Transfer status"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-black p-4 rounded-none space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-mono font-bold text-black">Download progress</p>
                <p className="text-xs text-black font-mono">{progress}%</p>
              </div>
              <div className="h-4 border border-black bg-white rounded-none">
                <div
                  className="h-full bg-black rounded-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs font-mono text-black mt-1">
                {"[" + "#".repeat(Math.floor(progress / 5)) + ".".repeat(20 - Math.floor(progress / 5)) + "]"} {progress}%
              </p>
            </div>
            <div>
              <p className="text-sm font-mono font-bold text-black mb-1">File transfers</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-3 border border-black bg-white rounded-none">
                      <div
                        className="h-full bg-black rounded-none"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs font-mono text-black mt-0.5 text-center">file{index + 1}.txt</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-black">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-3 py-1 text-sm font-mono border border-black bg-white text-black rounded-none hover:underline"
              >
                [Pause]
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-3 py-1 text-sm font-mono border border-black bg-white text-black rounded-none hover:underline"
              >
                [Resume]
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Guestbook"
        subtitle="Sign the guestbook"
        className="py-6 px-4 border-b border-black"
        titleClassName="text-xl font-serif font-bold text-black mb-1"
        subtitleClassName="text-xs font-mono text-black mb-4"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-black p-4 rounded-none">
            <h3 className="font-serif font-bold text-black mb-3">Leave a Message</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono font-bold text-black mb-1">Name:</label>
                <input
                  type="text"
                  placeholder="Anonymous"
                  className="w-full px-2 py-1 bg-white border border-black rounded-none text-black font-mono text-sm focus:outline-dotted focus:outline-1 focus:outline-black"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-black mb-1">Email:</label>
                <input
                  type="email"
                  placeholder="user@geocities.com"
                  className="w-full px-2 py-1 bg-white border border-black rounded-none text-black font-mono text-sm focus:outline-dotted focus:outline-1 focus:outline-black"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-black mb-1">Message:</label>
                <textarea
                  placeholder="Great website!"
                  rows={3}
                  className="w-full px-2 py-1 bg-white border border-black rounded-none text-black font-mono text-sm focus:outline-dotted focus:outline-1 focus:outline-black resize-none"
                />
              </div>
              <button className="px-3 py-1 bg-white text-black font-mono text-sm border border-black rounded-none cursor-pointer hover:underline">
                [Submit]
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-4 px-4 border-t border-black">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono text-black">
            Brutalist Web Showcase | Part of{" "}
            <Link href="/" className="text-[#0000ff] underline">
              StyleKit
            </Link>{" "}
            | Best viewed in Netscape Navigator 3.0
          </p>
          <p className="text-xs font-mono text-black mt-1">
            No JavaScript was harmed in the making of this page.
          </p>
        </div>
      </footer>
    </div>
  );
}
