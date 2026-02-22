"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const featuredWorks = [
  { id: "01", title: "The Modernist", category: "Art Direction", image: "https://picsum.photos/seed/edit1/800/1000?grayscale" },
  { id: "02", title: "Silent Space", category: "Photography", image: "https://picsum.photos/seed/edit2/800/1000?grayscale" },
  { id: "03", title: "Lumina", category: "Brand Identity", image: "https://picsum.photos/seed/edit3/800/1000?grayscale" },
];

const projects = [
  { id: 1, title: "Aesthetic", category: "Editorial", image: "https://picsum.photos/seed/p1/800/1200?grayscale", aspect: "aspect-[3/4]" },
  { id: 2, title: "Form & Function", category: "Product", image: "https://picsum.photos/seed/p2/1200/800?grayscale", aspect: "aspect-[4/3]" },
  { id: 3, title: "Monochrome", category: "Photography", image: "https://picsum.photos/seed/p3/800/800?grayscale", aspect: "aspect-square" },
  { id: 4, title: "The Grid", category: "Web Design", image: "https://picsum.photos/seed/p4/800/1000?grayscale", aspect: "aspect-[4/5]" },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1C1C]">
      <style>{`
        .hover-underline { position: relative; }
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: currentColor;
          transform-origin: bottom right;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .clip-reveal {
          clip-path: inset(100% 0 0 0);
          transition: clip-path 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .clip-reveal.revealed {
          clip-path: inset(0% 0 0 0);
        }
        @keyframes editorial-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20 border-b border-[#1C1C1C]/10">
            <Link href="/styles/editorial/showcase" className="font-serif text-lg tracking-[0.3em] uppercase">
              Editorial
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link href="/styles/editorial" className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/60 hover-underline pb-1">
                Docs
              </Link>
              <Link href="/styles" className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/60 hover-underline pb-1">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== HOME: Hero ===== */}
      <section className="pt-32 md:pt-48 pb-16 px-6 md:px-12 max-w-7xl mx-auto relative">
        {/* Rotating Asterisk */}
        <svg
          width="60" height="60" viewBox="0 0 100 100"
          className="absolute top-24 right-12 md:right-24 text-[#1C1C1C]/15 hidden md:block pointer-events-none"
          style={{ animation: "editorial-spin 25s linear infinite" }}
        >
          <path d="M48 0 L52 0 L52 48 L100 48 L100 52 L52 52 L52 100 L48 100 L48 52 L0 52 L0 48 L48 48 Z" fill="currentColor" />
          <path d="M14 14 L17 11 L50 44 L83 11 L86 14 L53 47 L86 80 L83 83 L50 50 L17 83 L14 80 L47 47 Z" fill="currentColor" />
        </svg>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 gap-12">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tighter">
            <span
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                display: "inline-block",
              }}
            >
              Digital
            </span>
            <br />
            <span
              className="italic text-[#1C1C1C]/60"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                display: "inline-block",
              }}
            >
              Craftsmanship.
            </span>
          </h1>
          <p
            className="max-w-xs font-sans text-xs leading-relaxed uppercase tracking-[0.2em] text-[#1C1C1C]/60"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            Elevating brands through refined typography, minimalist layouts, and purposeful interactions.
          </p>
        </div>

        {/* Hero Image */}
        <div className={`clip-reveal ${heroRevealed ? "revealed" : ""} w-full aspect-[4/5] md:aspect-[21/9] bg-gray-200 overflow-hidden mb-32`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/editorial_hero/1920/1080?grayscale"
            alt="Editorial Hero"
            className="w-full h-full object-cover"
            style={{
              transform: heroRevealed ? "scale(1)" : "scale(1.2)",
              transition: "transform 1.5s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          />
        </div>

        {/* Featured Work List */}
        <div className="mb-32">
          <div className="flex justify-between items-end border-b border-[#1C1C1C]/10 pb-6 mb-8">
            <h2 className="font-sans text-xs font-medium tracking-[0.2em] uppercase">Selected Works</h2>
            <span className="font-sans text-xs tracking-[0.2em] uppercase hover-underline pb-1 cursor-pointer">View All</span>
          </div>

          <div className="flex flex-col">
            {featuredWorks.map((work) => (
              <div
                key={work.id}
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-16 border-b border-[#1C1C1C]/10 hover:bg-[#1C1C1C]/[0.02] transition-colors px-4 -mx-4 cursor-pointer"
              >
                <div className="flex items-center gap-8 md:gap-16 z-10">
                  <span className="font-sans text-xs tracking-widest text-[#1C1C1C]/40">{work.id}</span>
                  <h3 className="font-serif text-4xl md:text-6xl group-hover:italic transition-all duration-500">{work.title}</h3>
                </div>
                <span className="font-sans text-xs tracking-[0.2em] uppercase mt-6 md:mt-0 z-10 text-[#1C1C1C]/60">{work.category}</span>

                {/* Hover Image Reveal */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] aspect-[3/4] pointer-events-none opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-500 ease-out hidden md:block z-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={work.image} alt={work.title} width={300} height={400} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <div className="w-full overflow-hidden border-y border-[#1C1C1C]/10 py-6 bg-[#F9F8F6]">
        <div className="flex w-[200%]" style={{ animation: "marquee 25s linear infinite" }}>
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 flex justify-around items-center font-sans text-xs tracking-[0.3em] uppercase text-[#1C1C1C]/60">
              <span>Art Direction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]/20" />
              <span>Digital Design</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]/20" />
              <span>Brand Identity</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]/20" />
              <span>Interaction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C]/20" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== WORK: Archive Grid ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-24">
          <h2 className="font-serif text-5xl md:text-7xl mb-6">
            Selected <span className="italic text-[#1C1C1C]/60">Archive.</span>
          </h2>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/60 max-w-md">
            A curated collection of digital experiences, brand identities, and editorial designs.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {projects.map((project, i) => (
            <RevealBlock key={project.id} className={`group cursor-pointer ${i % 2 !== 0 ? "md:mt-32" : ""}`} delay={i % 2 === 0 ? 0 : 0.2}>
              <div className={`w-full ${project.aspect} overflow-hidden mb-6 bg-gray-200 relative`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-2xl md:text-3xl group-hover:italic transition-all">{project.title}</h3>
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40">{project.category}</span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="border-t border-[#1C1C1C]/10 py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div className="w-full aspect-[3/4] bg-gray-200 overflow-hidden lg:sticky lg:top-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/portrait/800/1000?grayscale"
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 pt-4 lg:pt-24">
            <RevealBlock>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-16">
                I believe in design <br />
                <span className="italic text-[#1C1C1C]/60">that whispers,</span> <br />
                rather than shouts.
              </h2>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="space-y-8 font-sans text-sm md:text-base leading-relaxed text-[#1C1C1C]/80 max-w-xl">
                <p>
                  With over a decade of experience in digital design and art direction, I help brands articulate their vision through refined aesthetics and purposeful interactions. My approach is rooted in traditional editorial design principles, adapted for the modern web.
                </p>
                <p>
                  I focus on typography, negative space, and subtle motion to create experiences that feel crafted rather than assembled. Currently based in Paris, working with clients worldwide.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.3} className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#1C1C1C]/10 pt-12">
              <div>
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase mb-6 text-[#1C1C1C]/40">Services</h3>
                <ul className="space-y-3 font-serif text-xl">
                  <li>Art Direction</li>
                  <li>Digital Design</li>
                  <li>Brand Identity</li>
                  <li>Interaction Design</li>
                </ul>
              </div>
              <div>
                <h3 className="font-sans text-xs tracking-[0.2em] uppercase mb-6 text-[#1C1C1C]/40">Selected Clients</h3>
                <ul className="space-y-3 font-serif text-xl italic text-[#1C1C1C]/80">
                  <li>Vogue</li>
                  <li>Kinfolk</li>
                  <li>Acne Studios</li>
                  <li>A24 Films</li>
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="border-t border-[#1C1C1C]/10 py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <RevealBlock>
            <h2 className="font-serif text-6xl md:text-8xl mb-8">
              Say <span className="italic text-[#1C1C1C]/60">Hello.</span>
            </h2>
            <p className="font-sans text-sm leading-relaxed text-[#1C1C1C]/60 max-w-md mb-16">
              Whether you have a project in mind or just want to say hi, I am always open to discussing new opportunities and collaborations.
            </p>

            <div className="space-y-8 font-sans text-xs tracking-[0.2em] uppercase">
              <div>
                <span className="block text-[#1C1C1C]/40 mb-2">Email</span>
                <span className="hover-underline pb-1 text-base normal-case">hello@studio.com</span>
              </div>
              <div>
                <span className="block text-[#1C1C1C]/40 mb-2">Based In</span>
                <span className="text-base normal-case">Paris, France</span>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2} className="space-y-12 lg:pt-8">
            <div className="relative">
              <input
                type="text"
                id="ed-name"
                className="w-full bg-transparent border-b border-[#1C1C1C]/20 py-4 font-serif text-xl focus:outline-none focus:border-[#1C1C1C] transition-colors peer placeholder-transparent"
                placeholder="Name"
              />
              <label htmlFor="ed-name" className="absolute left-0 top-4 font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#1C1C1C] peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="ed-email"
                className="w-full bg-transparent border-b border-[#1C1C1C]/20 py-4 font-serif text-xl focus:outline-none focus:border-[#1C1C1C] transition-colors peer placeholder-transparent"
                placeholder="Email"
              />
              <label htmlFor="ed-email" className="absolute left-0 top-4 font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#1C1C1C] peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs">
                Email Address
              </label>
            </div>

            <div className="relative">
              <textarea
                id="ed-message"
                rows={4}
                className="w-full bg-transparent border-b border-[#1C1C1C]/20 py-4 font-serif text-xl focus:outline-none focus:border-[#1C1C1C] transition-colors peer placeholder-transparent resize-none"
                placeholder="Message"
              />
              <label htmlFor="ed-message" className="absolute left-0 top-4 font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#1C1C1C] peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs">
                Project Details
              </label>
            </div>

            <button type="button" className="font-sans text-xs tracking-[0.2em] uppercase hover-underline pb-1 flex items-center gap-4 group">
              Submit Inquiry
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-2 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1C1C1C]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40">
              StyleKit &middot; Editorial Showcase
            </p>
            <Link href="/styles/editorial" className="font-sans text-xs tracking-[0.2em] uppercase hover-underline pb-1">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
