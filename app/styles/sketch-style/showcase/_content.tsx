"use client";

import Link from "next/link";
import { ArrowLeft, Users, Clock, Shield, TrendingUp } from "lucide-react";

// Hand-drawn border component using SVG filter
function SketchBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <filter id="sketch-filter">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2"
          rx="4"
          style={{ filter: "url(#sketch-filter)" }}
        />
      </svg>
      {children}
    </div>
  );
}

// Organic hand-drawn circle for stats
function SketchCircle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="circle-sketch">
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
          </filter>
        </defs>
        <ellipse
          cx="50" cy="50" rx="48" ry="48"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          style={{ filter: "url(#circle-sketch)" }}
        />
      </svg>
      {children}
    </div>
  );
}

// Hand-drawn arrow
function SketchArrow() {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" className="text-[#1a1a1a]">
      <defs>
        <filter id="arrow-sketch">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="1.5" />
        </filter>
      </defs>
      <path
        d="M5 20 Q20 10 35 18 Q45 22 50 25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        style={{ filter: "url(#arrow-sketch)" }}
      />
      <path
        d="M45 20 L52 26 L48 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ filter: "url(#arrow-sketch)" }}
      />
    </svg>
  );
}

export default function ShowcaseContent() {
  const stats = [
    { value: "500k+", label: "Active Users", icon: Users },
    { value: "99.99%", label: "Uptime SLA", icon: Shield },
    { value: "24/7", label: "Support Access", icon: Clock },
    { value: "$10M+", label: "Customer Savings", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Navigation */}
      <nav className="px-6 py-4 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/sketch-style"
            className="flex items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <span className="text-xl font-semibold text-[#1a1a1a]">Sketch Style</span>
          <Link
            href="/styles"
            className="px-4 py-2 text-[#1a1a1a] font-medium hover:bg-[#1a1a1a]/5 rounded transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section - SaaS Landing Page Layout */}
      <section className="px-6 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <p className="text-[#1a1a1a]/60 mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
                Welcome to Acme
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                Build something{" "}
                <span style={{ fontFamily: "'Caveat', cursive" }} className="text-[#1a1a1a]">
                  amazing
                </span>
              </h1>
              <p className="text-lg text-[#1a1a1a]/70 mb-8 leading-relaxed">
                powerful tools designed to streamline workflows,
                boost productivity, and drive results.
              </p>

              {/* CTA with hand-drawn border */}
              <div className="flex items-center gap-4 mb-8">
                <SketchBorder className="inline-block">
                  <button className="px-6 py-3 text-[#1a1a1a] font-semibold bg-white hover:bg-[#faf8f5] transition-colors">
                    Start free trial
                  </button>
                </SketchBorder>
                <SketchArrow />
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-[#e0d5c7] to-[#c4b5a0]"
                    />
                  ))}
                </div>
                <p className="text-sm text-[#1a1a1a]/70">
                  Join <span className="font-semibold">50,000+</span> teams already using Acme
                </p>
              </div>
            </div>

            {/* Right: Product Screenshot Mockup */}
            <div className="relative">
              {/* Red accent dot */}
              <div className="absolute -right-4 top-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#ff4444]" />

              {/* Sketch-style mockup frame */}
              <div className="relative bg-[#f0ebe3] p-4 transform rotate-1">
                {/* Corner fold effect */}
                <div className="absolute top-0 right-0 w-12 h-12">
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[48px] border-l-transparent border-t-[48px] border-t-[#faf8f5]" />
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[#e0d8cc] transform origin-top-right" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                </div>

                <div className="bg-white border border-[#1a1a1a]/10 rounded p-6 min-h-[200px] flex items-center justify-center">
                  <p className="text-[#1a1a1a]/30 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                    Product Screenshot Sketch
                  </p>
                </div>

                {/* Dashed border around mockup */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <rect
                    x="2" y="2"
                    width="calc(100% - 4px)" height="calc(100% - 4px)"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="1"
                    strokeDasharray="6 4"
                    rx="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Hand-drawn circles */}
      <section className="px-6 py-16 md:py-24 bg-white/50 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <SketchCircle className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
                  <div className="text-center">
                    <span
                      className="text-3xl md:text-4xl font-bold text-[#1a1a1a] block"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      {stat.value}
                    </span>
                  </div>
                </SketchCircle>
                <p className="text-sm text-[#1a1a1a]/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-4"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Why teams love us
          </h2>
          <p className="text-[#1a1a1a]/60 text-center mb-12 max-w-2xl mx-auto">
            Simple, intuitive tools that just work
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Easy Setup", desc: "Get started in minutes, not days" },
              { title: "Powerful API", desc: "Build anything with our robust API" },
              { title: "24/7 Support", desc: "We are here when you need us" },
            ].map((feature) => (
              <SketchBorder key={feature.title} className="bg-white p-6">
                <h3
                  className="text-xl font-semibold text-[#1a1a1a] mb-2"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {feature.title}
                </h3>
                <p className="text-[#1a1a1a]/60 text-sm">{feature.desc}</p>
              </SketchBorder>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
            Ready to get started?
          </h2>
          <p className="text-[#1a1a1a]/60 mb-8">
            Join thousands of teams building with Acme
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SketchBorder>
              <button className="px-8 py-4 bg-[#1a1a1a] text-white font-semibold hover:bg-[#1a1a1a]/90 transition-colors">
                Start free trial
              </button>
            </SketchBorder>
            <button className="px-8 py-4 text-[#1a1a1a] font-medium hover:bg-[#1a1a1a]/5 transition-colors underline underline-offset-4 decoration-dashed">
              Schedule a demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#1a1a1a]/10 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#1a1a1a]/50 text-sm">
            Sketch Style Showcase · Part of{" "}
            <Link href="/" className="text-[#1a1a1a] hover:underline underline-offset-4">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>

      {/* Google Fonts for hand-written style */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
