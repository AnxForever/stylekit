"use client";

import Link from "next/link";
import { ArrowLeft, Eye, Clock, MapPin, User } from "lucide-react";

function NoirCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative bg-neutral-900 p-8 overflow-hidden group hover:bg-neutral-800/80 transition-colors duration-500 ${className}`}>
      {/* Diagonal light shaft */}
      <div className="absolute -top-20 -right-20 w-40 h-80 bg-gradient-to-b from-white/5 to-transparent rotate-45 group-hover:from-white/10 transition-all duration-700" />
      <div className="relative">{children}</div>
    </div>
  );
}

export default function FilmNoirShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-800 px-8 md:px-12 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/styles/film-noir" className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors text-xs uppercase tracking-[0.2em]">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-neutral-500 font-serif italic text-sm">Film Noir</span>
          <Link href="/styles" className="text-neutral-500 hover:text-neutral-300 transition-colors text-xs uppercase tracking-[0.2em]">
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-8 md:px-12 pt-24 pb-20 overflow-hidden">
        {/* Dramatic spotlight */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-white/[0.03] to-transparent rotate-12 pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <p className="text-neutral-600 text-xs uppercase tracking-[0.3em] mb-6 font-serif">A Design System</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-neutral-100 mb-8 leading-[0.9]">
            Film<br />Noir
          </h1>
          <p className="text-neutral-500 max-w-lg leading-relaxed">
            Inspired by the dramatic chiaroscuro of 1940s cinema. Deep blacks, stark whites,
            diagonal light shafts, and an atmosphere thick with mystery.
          </p>
          <div className="mt-10 w-16 h-px bg-[#c41e3a]" />
        </div>
      </section>

      {/* Case Files Grid */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-neutral-600 text-xs uppercase tracking-[0.3em] font-serif mb-8">Case Files</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800">
            {[
              { number: "#001", title: "The Vanishing Point", desc: "She walked into my office at midnight. Nobody walks in at midnight unless they're desperate or dangerous. She was both.", date: "1947" },
              { number: "#002", title: "Shadows on 5th", desc: "The photograph told a story the witness wouldn't. Rain-slicked streets and a silhouette that didn't belong to any name in the phonebook.", date: "1948" },
              { number: "#003", title: "The Glass Key", desc: "Every lock has a key, and every key has a price. This one cost more than anyone was willing to pay.", date: "1949" },
              { number: "#004", title: "Double Indemnity", desc: "The insurance papers were clean. Too clean. In this city, nothing stays clean for long.", date: "1950" },
            ].map((c) => (
              <NoirCard key={c.number}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-neutral-600 text-[10px] uppercase tracking-[0.3em]">Case {c.number}</span>
                  <span className="text-neutral-600 text-[10px] uppercase tracking-[0.2em]">{c.date}</span>
                </div>
                <h3 className="text-neutral-100 text-xl font-serif italic mb-3">{c.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{c.desc}</p>
                <div className="mt-5 w-10 h-px bg-[#c41e3a]" />
              </NoirCard>
            ))}
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-neutral-600 text-xs uppercase tracking-[0.3em] font-serif mb-8">Components</p>

          <div className="space-y-px bg-neutral-800">
            {/* Buttons */}
            <NoirCard>
              <h3 className="text-neutral-400 text-xs uppercase tracking-[0.2em] mb-6">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-neutral-100 text-neutral-950 font-serif italic tracking-wide hover:bg-white transition-colors duration-300 text-sm">
                  Investigate
                </button>
                <button className="px-6 py-3 bg-transparent border border-neutral-500 text-neutral-300 font-serif italic tracking-wide hover:border-neutral-100 hover:text-neutral-100 transition-colors duration-300 text-sm">
                  Read More
                </button>
                <button className="px-6 py-3 bg-[#c41e3a] text-white font-serif italic tracking-wide hover:bg-[#a01830] transition-colors duration-300 text-sm">
                  Confess
                </button>
                <button className="px-6 py-3 bg-transparent text-neutral-500 font-serif italic tracking-wide hover:text-neutral-200 transition-colors duration-300 text-sm underline underline-offset-4">
                  Dismiss
                </button>
              </div>
            </NoirCard>

            {/* Inputs */}
            <NoirCard>
              <h3 className="text-neutral-400 text-xs uppercase tracking-[0.2em] mb-6">Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-neutral-500 text-xs uppercase tracking-[0.2em] font-serif">Subject Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-neutral-950 border-b border-neutral-700 text-neutral-100 font-serif placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors duration-300 text-sm"
                    placeholder="Enter name..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-neutral-500 text-xs uppercase tracking-[0.2em] font-serif">Case Number</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-neutral-950 border-b border-neutral-700 text-neutral-100 font-serif placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors duration-300 text-sm"
                    placeholder="#000"
                  />
                </div>
              </div>
            </NoirCard>

            {/* Detail Items */}
            <NoirCard>
              <h3 className="text-neutral-400 text-xs uppercase tracking-[0.2em] mb-6">Detail List</h3>
              <div className="space-y-4">
                {[
                  { icon: Clock, label: "Time", value: "11:47 PM" },
                  { icon: MapPin, label: "Location", value: "427 Sunset Boulevard" },
                  { icon: User, label: "Witness", value: "Name withheld" },
                  { icon: Eye, label: "Status", value: "Under surveillance" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center justify-between py-3 border-b border-neutral-800 last:border-0">
                    <div className="flex items-center gap-3">
                      <d.icon className="w-4 h-4 text-neutral-600" />
                      <span className="text-neutral-500 text-xs uppercase tracking-[0.15em]">{d.label}</span>
                    </div>
                    <span className="text-neutral-200 font-serif italic text-sm">{d.value}</span>
                  </div>
                ))}
              </div>
            </NoirCard>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-neutral-600 text-xs uppercase tracking-[0.3em] font-serif mb-8">Typography</p>
          <div className="bg-neutral-900 p-8 md:p-12 space-y-8">
            <div>
              <p className="text-neutral-600 text-[10px] uppercase tracking-[0.3em] mb-2">Heading / Serif Italic</p>
              <h2 className="text-neutral-100 text-4xl md:text-5xl font-serif italic leading-tight">
                Every shadow tells a story
              </h2>
            </div>
            <div className="w-full h-px bg-neutral-800" />
            <div>
              <p className="text-neutral-600 text-[10px] uppercase tracking-[0.3em] mb-2">Body / Sans-serif</p>
              <p className="text-neutral-400 leading-relaxed max-w-lg">
                The rain had not stopped for three days. In this city, rain meant trouble - it washed
                away evidence and brought out the kind of people who preferred the dark. The detective
                lit a cigarette and watched the street from behind venetian blinds.
              </p>
            </div>
            <div className="w-full h-px bg-neutral-800" />
            <div>
              <p className="text-neutral-600 text-[10px] uppercase tracking-[0.3em] mb-2">Label / Uppercase Tracking</p>
              <p className="text-neutral-500 text-xs uppercase tracking-[0.25em]">Case classified // Restricted access // Eyes only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-neutral-600 text-xs uppercase tracking-[0.3em] font-serif mb-8">Color Palette</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-neutral-800">
            {[
              { name: "Near Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]", text: "text-neutral-500" },
              { name: "Dark Grey", hex: "#171717", bg: "bg-neutral-900", text: "text-neutral-400" },
              { name: "Mid Grey", hex: "#262626", bg: "bg-neutral-800", text: "text-neutral-400" },
              { name: "Off White", hex: "#F5F5F0", bg: "bg-[#f5f5f0]", text: "text-neutral-700" },
              { name: "Pure White", hex: "#FAFAFA", bg: "bg-neutral-50", text: "text-neutral-700" },
              { name: "Crimson", hex: "#C41E3A", bg: "bg-[#c41e3a]", text: "text-white" },
              { name: "Old Gold", hex: "#D4AF37", bg: "bg-[#d4af37]", text: "text-black" },
              { name: "Smoke", hex: "#A3A3A3", bg: "bg-neutral-400", text: "text-black" },
              { name: "Shadow", hex: "#525252", bg: "bg-neutral-600", text: "text-white" },
              { name: "Ink", hex: "#1A1A1A", bg: "bg-[#1a1a1a]", text: "text-neutral-500" },
            ].map((c) => (
              <div key={c.name} className={`${c.bg} p-4`}>
                <p className={`${c.text} text-xs`}>{c.name}</p>
                <p className={`${c.text} text-[10px] opacity-60 mt-0.5`}>{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-8 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-8 h-px bg-[#c41e3a] mx-auto mb-8" />
          <blockquote className="text-neutral-300 text-2xl md:text-3xl font-serif italic leading-relaxed mb-6">
            &ldquo;It was a blonde. A blonde to make a bishop kick a hole in a stained-glass window.&rdquo;
          </blockquote>
          <p className="text-neutral-600 text-xs uppercase tracking-[0.25em]">Raymond Chandler, Farewell, My Lovely</p>
          <div className="w-8 h-px bg-[#c41e3a] mx-auto mt-8" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 px-8 md:px-12 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs font-serif italic">Film Noir Design System</p>
          <div className="flex gap-6">
            <Link href="/styles/film-noir" className="text-neutral-500 text-xs uppercase tracking-[0.15em] hover:text-neutral-300 transition-colors">
              Documentation
            </Link>
            <Link href="/styles" className="text-neutral-500 text-xs uppercase tracking-[0.15em] hover:text-neutral-300 transition-colors">
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
