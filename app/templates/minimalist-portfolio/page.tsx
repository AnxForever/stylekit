"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, BookOpen, Twitter, Dribbble, Linkedin, Menu, X } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  color: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  caseStudyUrl: string;
  tags: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "p01",
    num: "01",
    title: "Voya Brand Identity",
    category: "Brand Identity",
    year: "2025",
    color: "bg-[#ff3366]",
    description:
      "A full visual identity system for Voya, a sustainable travel startup redefining how people explore the world. The brand needed to feel adventurous yet responsible, bold yet approachable. I developed a modular logo system, a warm-earthy color palette, and a complete print and digital style guide spanning over 80 touchpoints.",
    techStack: ["Figma", "Illustrator", "After Effects", "Notion"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["Branding", "Identity", "Sustainability"],
  },
  {
    id: "p02",
    num: "02",
    title: "Luma E-Commerce Redesign",
    category: "Web Design",
    year: "2025",
    color: "bg-[#00d4aa]",
    description:
      "End-to-end redesign of Luma's e-commerce platform, a luxury home-goods retailer with over 200k monthly visitors. The goal was to reduce cart abandonment by 30% and improve product discoverability. Through extensive user research, journey mapping, and iterative prototyping I delivered a new information architecture and a React-based component library.",
    techStack: ["Figma", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["E-Commerce", "Conversion", "React"],
  },
  {
    id: "p03",
    num: "03",
    title: "Finch Mobile Banking",
    category: "UI/UX Design",
    year: "2024",
    color: "bg-[#ffcc00]",
    description:
      "Product design for Finch, a neobank targeting Gen-Z first-time savers. I conducted 18 user interviews, built 3 research-backed personas, and designed a complete mobile app across iOS and Android guidelines. The resulting design cut onboarding time from 9 minutes to under 3 minutes in usability testing, and achieved a SUS score of 87.",
    techStack: ["Figma", "Maze", "Lottie", "Principle"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["Fintech", "Mobile", "UX Research"],
  },
  {
    id: "p04",
    num: "04",
    title: "Pulse Data Dashboard",
    category: "UI/UX Design",
    year: "2024",
    color: "bg-black",
    description:
      "A real-time analytics dashboard for Pulse, a SaaS company serving enterprise marketing teams. The challenge was presenting over 40 KPI metrics without overwhelming operators who check the board every 30 seconds. I designed a dark-mode-first layout with progressive disclosure, customizable widget grids, and data-ink ratio principles drawn from Tufte's work.",
    techStack: ["Figma", "React", "Recharts", "TypeScript"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["Data Viz", "Dashboard", "SaaS"],
  },
  {
    id: "p05",
    num: "05",
    title: "Neue Type Specimen",
    category: "Typography",
    year: "2024",
    color: "bg-[#6366f1]",
    description:
      "A typographic microsite showcasing Neue Display, an open-source variable font I co-developed with a type foundry in Berlin. The site doubles as an interactive specimen allowing users to manipulate weight, width, and optical size axes in real time. Built entirely with vanilla CSS variable fonts and a minimal JavaScript layer.",
    techStack: ["HTML", "CSS Variable Fonts", "Vanilla JS", "GSAP"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["Typography", "Variable Fonts", "Open Source"],
  },
  {
    id: "p06",
    num: "06",
    title: "Orbit Design System",
    category: "UI/UX Design",
    year: "2023",
    color: "bg-[#ff3366]",
    description:
      "Led the creation of Orbit, a multi-brand design system adopted across 4 product teams at a Series-B startup. I defined the token architecture, component API contracts, and documentation standards. The system ships as an npm package with Storybook documentation and achieves WCAG 2.1 AA compliance across all 120+ components.",
    techStack: ["Figma", "Storybook", "React", "Styled Components", "Chromatic"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["Design System", "Accessibility", "Component Library"],
  },
  {
    id: "p07",
    num: "07",
    title: "Solstice Motion Branding",
    category: "Motion Design",
    year: "2023",
    color: "bg-[#00d4aa]",
    description:
      "Motion identity package for Solstice, an independent music label releasing experimental electronic albums. The brief called for kinetic logos, animated album art, and a set of social media motion templates. Each animation is driven by audio-reactive rigs built in After Effects with the MIDI-to-keyframe workflow I documented and published openly.",
    techStack: ["After Effects", "Cinema 4D", "Audition", "Illustrator"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["Motion", "Music", "Audio-Reactive"],
  },
  {
    id: "p08",
    num: "08",
    title: "Zero-State Developer Portfolio",
    category: "Web Design",
    year: "2023",
    color: "bg-[#ffcc00]",
    description:
      "A self-initiated open-source portfolio template for developers who hate designing. The project explores how typographic hierarchy and whitespace alone can communicate craft and taste without illustration or photography. Released under MIT license, it has been forked over 2,000 times on GitHub and featured in CSS-Tricks and Smashing Magazine.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    liveUrl: "#",
    caseStudyUrl: "#",
    tags: ["Open Source", "Template", "Typography"],
  },
];

const skills = [
  "UI Design",
  "UX Research",
  "Prototyping",
  "Design Systems",
  "Typography",
  "Motion Design",
  "Front-end Dev",
  "Figma",
  "React",
  "Next.js",
  "Accessibility",
  "Brand Identity",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function MinimalistPortfolioTemplate() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  // ── Accordion toggle ────────────────────────────────────────────────────────
  function toggleProject(id: string) {
    setExpandedProject((prev) => (prev === id ? null : id));
  }

  // ── Form helpers ────────────────────────────────────────────────────────────
  function handleFormChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateForm(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "Name must be at least 2 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.subject) {
      next.subject = "Please select a subject.";
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      next.message = "Message must be at least 20 characters.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitState("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitState("success");
  }

  function handleReset() {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSubmitState("idle");
  }

  // ── Nav scroll helper ───────────────────────────────────────────────────────
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* ── Navigation ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
          <span className="text-base font-bold tracking-widest uppercase select-none">
            Mira Chen
          </span>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => scrollTo("work")}
              className="hover:text-[#ff3366] transition-colors duration-150"
            >
              Work
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="hover:text-[#ff3366] transition-colors duration-150"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-[#ff3366] transition-colors duration-150"
            >
              Contact
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-white">
            {["work", "about", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left px-6 py-4 text-sm font-medium uppercase tracking-widest border-b border-black last:border-b-0 hover:bg-black hover:text-white transition-colors duration-150"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="border-b-2 border-black px-4 md:px-8 lg:px-16 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-4 mb-6">
            {/* Accent square */}
            <span className="inline-block w-4 h-4 bg-[#ff3366] mt-1 shrink-0" />
            <p className="text-sm font-medium tracking-widest uppercase text-gray-500">
              Digital Designer
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[96px] font-black tracking-tighter leading-[0.93] mb-8 md:mb-12">
            Design that speaks
            <br />
            <span className="relative inline-block">
              before
              {/* Accent underline */}
              <span className="absolute -bottom-2 left-0 w-full h-[6px] bg-[#ff3366]" />
            </span>{" "}
            you do.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-base md:text-lg text-gray-500 max-w-lg leading-relaxed">
              I&apos;m Mira Chen — UI/UX designer and front-end developer with 10 years of
              experience translating complex problems into elegant, purposeful interfaces.
              Good design is invisible; my work makes sure users never have to think twice.
            </p>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => scrollTo("work")}
                className="px-6 py-3 bg-black text-white border-2 border-black text-sm font-semibold hover:bg-[#ff3366] hover:border-[#ff3366] transition-colors duration-200"
              >
                View Work
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 bg-white text-black border-2 border-black text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────────────────────────── */}
      <section id="work" className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 border-b-2 border-black pb-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500">
              Selected Work
            </p>
            <p className="text-xs text-gray-400">{projects.length} projects</p>
          </div>

          <div className="divide-y-2 divide-black border-b-2 border-black">
            {projects.map((project) => {
              const isOpen = expandedProject === project.id;
              return (
                <div key={project.id}>
                  {/* Row button */}
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="group w-full text-left flex items-center gap-4 md:gap-6 py-5 md:py-6 hover:bg-black hover:text-white transition-colors duration-200 px-2 -mx-2"
                    aria-expanded={isOpen}
                  >
                    {/* Number */}
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-500 w-7 shrink-0">
                      {project.num}
                    </span>

                    {/* Color swatch */}
                    <span
                      className={`shrink-0 w-6 h-6 border-2 border-black group-hover:border-white ${project.color} transition-all duration-200`}
                    />

                    {/* Title + category */}
                    <div className="flex-1 min-w-0">
                      <span className="block text-lg md:text-2xl font-bold tracking-tight leading-tight truncate">
                        {project.title}
                      </span>
                      <span className="block text-xs text-gray-500 group-hover:text-gray-400 mt-0.5">
                        {project.category}
                      </span>
                    </div>

                    {/* Year */}
                    <span className="hidden sm:block text-sm text-gray-500 group-hover:text-gray-400 shrink-0">
                      {project.year}
                    </span>

                    {/* Chevron */}
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Expandable panel */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-in-out ${
                      isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                    style={{ transitionProperty: "max-height, opacity" }}
                  >
                    <div className="py-8 px-2 border-t border-black/10">
                      <div className="grid md:grid-cols-3 gap-8">
                        {/* Description */}
                        <div className="md:col-span-2">
                          <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
                            About the project
                          </p>
                          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs font-semibold border-2 border-black uppercase tracking-wide"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right column */}
                        <div className="flex flex-col gap-6">
                          {/* Tech stack */}
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">
                              Tools & Tech
                            </p>
                            <div className="flex flex-col gap-1.5">
                              {project.techStack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-sm text-gray-700 flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:bg-[#ff3366] before:inline-block before:shrink-0"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* CTA links */}
                          <div className="flex flex-col gap-3 mt-auto">
                            <a
                              href={project.liveUrl}
                              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white border-2 border-black text-sm font-semibold hover:bg-[#ff3366] hover:border-[#ff3366] transition-colors duration-200"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Site
                            </a>
                            <a
                              href={project.caseStudyUrl}
                              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black border-2 border-black text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200"
                            >
                              <BookOpen className="w-4 h-4" />
                              Case Study
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <section id="about" className="bg-black text-white border-y-2 border-black px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-12">
            About Me
          </p>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: photo + bio */}
            <div>
              {/* Photo placeholder */}
              <div className="w-full aspect-[4/3] bg-white/5 border-2 border-white/20 flex items-center justify-center mb-8">
                <span className="text-6xl font-black text-[#ff3366] select-none tracking-tight">
                  MC
                </span>
              </div>

              <div className="space-y-5 text-gray-300 text-sm md:text-base leading-relaxed">
                <p>
                  I&apos;ve spent the past 10 years at the intersection of design and technology,
                  helping startups and established brands bring their most ambitious ideas to life.
                  My work spans product design, visual identity, and front-end engineering — I
                  believe the best designers can build what they design.
                </p>
                <p>
                  My design philosophy is rooted in restraint. Every element on screen should earn
                  its place. I draw inspiration from Swiss International Style, Bauhaus principles,
                  and the quiet confidence of well-made physical objects. If something feels
                  unnecessary, it is.
                </p>
                <p>
                  My core toolset includes Figma (for everything), React and Next.js for
                  implementation, and After Effects for motion work. I&apos;m also the co-author of
                  an open-source variable type specimen that&apos;s been used by designers across
                  42 countries.
                </p>
              </div>
            </div>

            {/* Right: skills + stats */}
            <div>
              <div className="mb-10">
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-5">
                  Skills
                </p>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 border-2 border-white/30 text-sm font-medium text-white hover:border-[#ff3366] hover:text-[#ff3366] transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="border-t-2 border-white/20 pt-8">
                <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-6">
                  By the numbers
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: "10+", label: "Years experience" },
                    { value: "80+", label: "Projects shipped" },
                    { value: "30+", label: "Clients served" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-4xl md:text-5xl font-black text-[#ff3366] leading-none mb-2">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available badge */}
              <div className="mt-10 flex items-center gap-3 border-2 border-[#00d4aa] px-4 py-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00d4aa] animate-pulse shrink-0" />
                <span className="text-sm font-medium text-[#00d4aa]">
                  Available for new projects — Q2 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section id="contact" className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: heading */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-6">
                Contact
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-8">
                Let&apos;s work
                <br />
                <span className="text-[#ff3366]">together.</span>
              </h2>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm">
                Have a project in mind? I&apos;d love to hear about it. Fill in the form and I&apos;ll
                get back to you within 24 hours.
              </p>

              <div className="mt-10 space-y-3">
                <a
                  href="mailto:mira@miachen.design"
                  className="block text-sm font-medium hover:text-[#ff3366] transition-colors duration-150"
                >
                  mira@miachen.design
                </a>
                <a
                  href="tel:+14155550197"
                  className="block text-sm font-medium hover:text-[#ff3366] transition-colors duration-150"
                >
                  +1 (415) 555-0197
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div>
              {submitState === "success" ? (
                <div className="border-2 border-black p-8 text-center">
                  <div className="w-10 h-10 bg-[#ff3366] mx-auto mb-5 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <p className="text-base font-semibold mb-2">Message sent!</p>
                  <p className="text-sm text-gray-500 mb-6">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 border-2 border-black text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  {/* Name */}
                  <div>
                    <label htmlFor="cf-name" className="block text-xs font-semibold uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="Your full name"
                      className={`w-full border-0 border-b-2 ${
                        errors.name ? "border-red-500" : "border-black"
                      } bg-transparent py-3 text-base focus:outline-none focus:border-[#ff3366] transition-colors duration-200 placeholder:text-gray-300`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="cf-email" className="block text-xs font-semibold uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                      placeholder="hello@example.com"
                      className={`w-full border-0 border-b-2 ${
                        errors.email ? "border-red-500" : "border-black"
                      } bg-transparent py-3 text-base focus:outline-none focus:border-[#ff3366] transition-colors duration-200 placeholder:text-gray-300`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="cf-subject" className="block text-xs font-semibold uppercase tracking-widest mb-2">
                      Subject
                    </label>
                    <select
                      id="cf-subject"
                      value={form.subject}
                      onChange={(e) => handleFormChange("subject", e.target.value)}
                      className={`w-full border-0 border-b-2 ${
                        errors.subject ? "border-red-500" : "border-black"
                      } bg-transparent py-3 text-base focus:outline-none focus:border-[#ff3366] transition-colors duration-200 text-gray-700 appearance-none cursor-pointer`}
                    >
                      <option value="">Select a subject…</option>
                      <option value="New Project">New Project</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="cf-message" className="block text-xs font-semibold uppercase tracking-widest mb-2">
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => handleFormChange("message", e.target.value)}
                      placeholder="Tell me about your project, timeline, and budget…"
                      className={`w-full border-0 border-b-2 ${
                        errors.message ? "border-red-500" : "border-black"
                      } bg-transparent py-3 text-base focus:outline-none focus:border-[#ff3366] transition-colors duration-200 placeholder:text-gray-300 resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitState === "loading"}
                    className="w-full py-4 bg-black text-white border-2 border-black text-sm font-semibold hover:bg-[#ff3366] hover:border-[#ff3366] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitState === "loading" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t-2 border-black px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 tracking-wide">
            MIRA CHEN &copy; 2026 &mdash; UI/UX Designer &amp; Front-end Developer
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-black transition-colors duration-150"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Dribbble"
              className="text-gray-400 hover:text-black transition-colors duration-150"
            >
              <Dribbble className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-black transition-colors duration-150"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-gray-400">
            Part of{" "}
            <Link href="/templates" className="underline hover:text-black transition-colors duration-150">
              StyleKit Templates
            </Link>
          </p>
        </div>
      </footer>

      <TemplateBackButton variant="minimalist" />
    </div>
  );
}
