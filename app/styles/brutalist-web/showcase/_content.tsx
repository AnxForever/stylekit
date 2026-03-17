"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const GUESTBOOK_ENTRIES = [
  {
    name: "CoolDude1994",
    date: "March 14, 1996",
    message:
      "Great page! I found you through Yahoo! Keep up the good work. I bookmarked this site.",
    location: "Denver, CO",
  },
  {
    name: "WebSurfer99",
    date: "July 22, 1997",
    message:
      "This page rules!! Added to my favorites. Your site loads fast even on my 14.4k modem.",
    location: "Portland, OR",
  },
  {
    name: "HTMLMaster",
    date: "January 3, 1998",
    message:
      "Very informative. I learned a lot about web design from reading this. Two thumbs up!",
    location: "Austin, TX",
  },
  {
    name: "NetscapeUser",
    date: "September 9, 1998",
    message:
      "Works great in Netscape Navigator 4.0. Nice use of horizontal rules. Very professional.",
    location: "Seattle, WA",
  },
];

export default function BrutalistWebShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [guestSubmitted, setGuestSubmitted] = useState(false);
  const [counterValue] = useState(42);

  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: linkColorsRef, inView: linkColorsInView } = useInView();
  const { ref: fontSpecRef, inView: fontSpecInView } = useInView();
  const { ref: ninetyRef, inView: ninetyInView } = useInView();
  const { ref: dosDontsRef, inView: dosDontsInView } = useInView();
  const { ref: guestbookRef, inView: guestbookInView } = useInView();
  const { ref: footerRef, inView: footerInView } = useInView();

  const tabLabels = ["Buttons", "Cards", "Inputs"];

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestSubmitted(true);
    setGuestName("");
    setGuestEmail("");
    setGuestMessage("");
  };

  const counterDisplay = String(counterValue).padStart(6, "0");

  return (
    <div className="min-h-screen bg-white text-black font-mono">

      {/* ================================================================
          SECTION 1: NAVIGATION
          ================================================================ */}
      <nav
        style={{ borderBottom: "1px solid #000000" }}
        className="bg-white px-4 py-2"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/brutalist-web"
            className="font-mono text-sm text-[#0000ff] underline hover:text-[#ff0000] transition-none"
          >
            &larr; Back to Docs
          </Link>
          <div className="flex items-center gap-0 font-mono text-sm">
            <a
              href="#"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              Home
            </a>
            <span className="text-black mx-1">|</span>
            <a
              href="#"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              About
            </a>
            <span className="text-black mx-1">|</span>
            <a
              href="#"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              Archive
            </a>
            <span className="text-black mx-1">|</span>
            <a
              href="#"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              Links
            </a>
            <span className="text-black mx-2">|</span>
            <Link
              href="/styles"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              StyleKit &rarr;
            </Link>
          </div>
        </div>
      </nav>

      {/* ================================================================
          SECTION 2: HERO
          ================================================================ */}
      <section
        ref={heroRef}
        style={{
          borderBottom: "1px solid #000000",
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
        }}
        className="bg-white py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h1
            className="font-serif font-bold text-black"
            style={{ fontSize: "2.5rem", lineHeight: 1.1, marginBottom: "0.5rem" }}
          >
            Welcome to the Web (circa 1994)
          </h1>
          <hr style={{ borderTop: "1px solid #000000", margin: "0.75rem 0" }} />
          <p className="font-mono text-sm text-black" style={{ marginBottom: "0.75rem", maxWidth: "640px" }}>
            You have reached the personal home page of Brutalist Web. This site
            is best viewed in Netscape Navigator 2.0 at 800x600 resolution with
            16-bit color. All content is original and written in plain HTML.
            No frames, no Java applets, no cookies. Just good old-fashioned
            hypertext. Please sign the guestbook before you leave.
          </p>
          <p className="font-mono text-sm text-black" style={{ marginBottom: "0.75rem" }}>
            <a
              href="#guestbook"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              Learn more
            </a>
            {" "}about this site and its philosophy.
          </p>
          <hr style={{ borderTop: "1px solid #000000", margin: "0.75rem 0" }} />
          <div className="flex flex-wrap items-start gap-6">
            {/* Visitor counter */}
            <div>
              <p className="font-mono text-xs text-black" style={{ marginBottom: "0.25rem" }}>
                You are visitor number:
              </p>
              <div
                className="font-mono font-bold text-black bg-black"
                style={{
                  display: "inline-block",
                  padding: "4px 8px",
                  letterSpacing: "0.15em",
                  fontSize: "1.25rem",
                  color: "#00ff00",
                }}
              >
                {counterDisplay}
              </div>
              <p className="font-mono text-xs text-black" style={{ marginTop: "0.25rem" }}>
                Visitor #{counterDisplay} since Jan 1, 1994
              </p>
            </div>
            {/* Hit counter image placeholder */}
            <div>
              <p className="font-mono text-xs text-black" style={{ marginBottom: "0.25rem" }}>
                Hit counter:
              </p>
              <div
                style={{
                  border: "1px solid #000000",
                  width: "120px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#dfdfdf",
                }}
              >
                <span className="font-mono text-xs text-black">HIT COUNTER</span>
              </div>
              <p className="font-mono text-xs text-black" style={{ marginTop: "0.25rem" }}>
                [Image: hitcounter.gif]
              </p>
            </div>
          </div>
          <hr style={{ borderTop: "1px solid #000000", margin: "0.75rem 0" }} />
          <p className="font-mono text-xs text-black">
            Last Updated: February 20, 2026 |{" "}
            <a
              href="mailto:webmaster@brutalist.example.com"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              webmaster@brutalist.example.com
            </a>
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 3: COMPONENTS DEMO (Tabs: Buttons / Cards / Inputs)
          ================================================================ */}
      <section
        ref={componentsRef}
        style={{
          borderBottom: "1px solid #000000",
          opacity: componentsInView ? 1 : 0,
          transform: componentsInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
        className="bg-white py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-serif font-bold text-black"
            style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}
          >
            Component Reference
          </h2>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "1rem" }}>
            Standard HTML form controls and content elements
          </p>

          {/* Document tabs */}
          <div
            style={{ borderLeft: "1px solid #000000", borderRight: "1px solid #000000", borderTop: "1px solid #000000" }}
          >
            {/* Tab strip */}
            <div className="flex" style={{ borderBottom: "1px solid #000000" }}>
              {tabLabels.map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(idx)}
                  className="transition-none"
                  style={{
                    padding: "4px 16px",
                    fontFamily: "monospace",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    background: activeTab === idx ? "#ffffff" : "#dfdfdf",
                    color: "#000000",
                    border: "1px solid #000000",
                    borderBottom: activeTab === idx ? "1px solid #ffffff" : "1px solid #000000",
                    marginBottom: activeTab === idx ? "-1px" : "0",
                    position: "relative",
                    zIndex: activeTab === idx ? 1 : 0,
                    fontWeight: activeTab === idx ? "bold" : "normal",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ padding: "1.25rem", background: "#ffffff", minHeight: "220px" }}>

              {/* Tab 0: Buttons */}
              {activeTab === 0 && (
                <div>
                  <p className="font-mono text-xs text-black" style={{ marginBottom: "1rem" }}>
                    Windows 95-style bevel buttons. Silver background, inset/outset border on press.
                  </p>
                  <div className="flex flex-wrap gap-3 items-center" style={{ marginBottom: "1.25rem" }}>
                    {/* Primary bevel button */}
                    <button
                      className="transition-none active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
                      style={{
                        padding: "4px 16px",
                        background: "#dfdfdf",
                        color: "#000000",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        cursor: "pointer",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#ffffff",
                        borderLeftColor: "#ffffff",
                        borderRightColor: "#808080",
                        borderBottomColor: "#808080",
                        outline: "none",
                      }}
                    >
                      OK
                    </button>
                    <button
                      className="transition-none active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
                      style={{
                        padding: "4px 16px",
                        background: "#dfdfdf",
                        color: "#000000",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        cursor: "pointer",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#ffffff",
                        borderLeftColor: "#ffffff",
                        borderRightColor: "#808080",
                        borderBottomColor: "#808080",
                        outline: "none",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="transition-none active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
                      style={{
                        padding: "4px 16px",
                        background: "#dfdfdf",
                        color: "#000000",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        cursor: "pointer",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#ffffff",
                        borderLeftColor: "#ffffff",
                        borderRightColor: "#808080",
                        borderBottomColor: "#808080",
                        outline: "none",
                      }}
                    >
                      Apply
                    </button>
                    <button
                      className="transition-none"
                      style={{
                        padding: "4px 16px",
                        background: "#dfdfdf",
                        color: "#808080",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        cursor: "not-allowed",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#ffffff",
                        borderLeftColor: "#ffffff",
                        borderRightColor: "#808080",
                        borderBottomColor: "#808080",
                        outline: "none",
                      }}
                      disabled
                    >
                      Help
                    </button>
                  </div>
                  <p className="font-mono text-xs text-black" style={{ marginBottom: "0.5rem" }}>
                    Plain text links (the original hypertext):
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#" className="text-[#0000ff] underline hover:text-[#ff0000] font-mono text-sm transition-none">
                      Unvisited link
                    </a>
                    <a href="#" className="underline font-mono text-sm transition-none" style={{ color: "#551a8b" }}>
                      Visited link
                    </a>
                    <a href="#" className="underline font-mono text-sm transition-none" style={{ color: "#ff0000" }}>
                      Active link
                    </a>
                  </div>
                </div>
              )}

              {/* Tab 1: Cards */}
              {activeTab === 1 && (
                <div className="space-y-3">
                  {[
                    {
                      title: "Plain HTML Documents",
                      body: "Every page is a document. Content lives in paragraphs, lists, and tables. No div soup. No component abstraction. Just semantic markup that any browser can render.",
                      link: "Read more about documents",
                    },
                    {
                      title: "Hyperlinks Are Enough",
                      body: "Navigation requires nothing more than anchor tags. Blue, underlined, and descriptive. Users know exactly where they are going. No hamburger menus needed.",
                      link: "See the links page",
                    },
                    {
                      title: "Tables For Data",
                      body: "HTML tables exist for tabular data. Rows and columns with 1px black borders. No zebra striping required. No hover states. Just information, organized.",
                      link: "View data tables",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      style={{ border: "1px solid #000000", padding: "0.75rem", background: "#ffffff" }}
                    >
                      <h3 className="font-serif font-bold text-black" style={{ fontSize: "1.0625rem", marginBottom: "0.25rem" }}>
                        {card.title}
                      </h3>
                      <p className="font-mono text-sm text-black" style={{ marginBottom: "0.5rem" }}>
                        {card.body}
                      </p>
                      <a
                        href="#"
                        className="text-[#0000ff] underline hover:text-[#ff0000] font-mono text-sm transition-none"
                      >
                        {card.link}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 2: Inputs */}
              {activeTab === 2 && (
                <div className="space-y-3" style={{ maxWidth: "380px" }}>
                  <p className="font-mono text-xs text-black" style={{ marginBottom: "0.75rem" }}>
                    Inset bevel inputs. Focus turns background to #ffffcc (pale yellow), dotted outline.
                  </p>
                  <div>
                    <label className="font-mono text-xs text-black font-bold" style={{ display: "block", marginBottom: "2px" }}>
                      Name:
                    </label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      className="transition-none focus:bg-[#ffffcc] focus:outline-dotted focus:outline-1 focus:outline-black"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        color: "#000000",
                        background: "#ffffff",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#808080",
                        borderLeftColor: "#808080",
                        borderRightColor: "#ffffff",
                        borderBottomColor: "#ffffff",
                      }}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-black font-bold" style={{ display: "block", marginBottom: "2px" }}>
                      Email:
                    </label>
                    <input
                      type="email"
                      placeholder="user@geocities.com"
                      className="transition-none focus:bg-[#ffffcc] focus:outline-dotted focus:outline-1 focus:outline-black"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        color: "#000000",
                        background: "#ffffff",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#808080",
                        borderLeftColor: "#808080",
                        borderRightColor: "#ffffff",
                        borderBottomColor: "#ffffff",
                      }}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-black font-bold" style={{ display: "block", marginBottom: "2px" }}>
                      Favorite color:
                    </label>
                    <select
                      className="transition-none focus:outline-dotted focus:outline-1 focus:outline-black"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        color: "#000000",
                        background: "#dfdfdf",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#ffffff",
                        borderLeftColor: "#ffffff",
                        borderRightColor: "#808080",
                        borderBottomColor: "#808080",
                      }}
                    >
                      <option>Blue</option>
                      <option>Red</option>
                      <option>Green</option>
                      <option>Black</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-xs text-black font-bold" style={{ display: "block", marginBottom: "2px" }}>
                      Comments:
                    </label>
                    <textarea
                      placeholder="Your message here..."
                      rows={3}
                      className="transition-none focus:bg-[#ffffcc] focus:outline-dotted focus:outline-1 focus:outline-black"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        color: "#000000",
                        background: "#ffffff",
                        resize: "none",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#808080",
                        borderLeftColor: "#808080",
                        borderRightColor: "#ffffff",
                        borderBottomColor: "#ffffff",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="subscribe"
                      className="transition-none"
                    />
                    <label htmlFor="subscribe" className="font-mono text-xs text-black">
                      Subscribe to mailing list
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="browser"
                      id="netscape"
                      className="transition-none"
                    />
                    <label htmlFor="netscape" className="font-mono text-xs text-black">
                      Netscape Navigator
                    </label>
                    <input
                      type="radio"
                      name="browser"
                      id="ie"
                      className="transition-none"
                    />
                    <label htmlFor="ie" className="font-mono text-xs text-black">
                      Internet Explorer
                    </label>
                  </div>
                  <button
                    className="transition-none active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
                    style={{
                      padding: "4px 16px",
                      background: "#dfdfdf",
                      color: "#000000",
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      cursor: "pointer",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderTopColor: "#ffffff",
                      borderLeftColor: "#ffffff",
                      borderRightColor: "#808080",
                      borderBottomColor: "#808080",
                    }}
                  >
                    Submit Form
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4: LINK COLOR REFERENCE
          ================================================================ */}
      <section
        ref={linkColorsRef}
        style={{
          borderBottom: "1px solid #000000",
          opacity: linkColorsInView ? 1 : 0,
          transform: linkColorsInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s",
        }}
        className="bg-white py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-serif font-bold text-black"
            style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}
          >
            Link Color Reference
          </h2>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "1rem" }}>
            Classic browser default link states. As defined by the HTML 3.2 specification.
          </p>

          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontFamily: "monospace",
              fontSize: "0.8125rem",
            }}
          >
            <thead>
              <tr style={{ background: "#dfdfdf" }}>
                <th style={{ border: "1px solid #000000", padding: "4px 8px", textAlign: "left", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                  State
                </th>
                <th style={{ border: "1px solid #000000", padding: "4px 8px", textAlign: "left", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                  Color Hex
                </th>
                <th style={{ border: "1px solid #000000", padding: "4px 8px", textAlign: "left", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                  CSS Property
                </th>
                <th style={{ border: "1px solid #000000", padding: "4px 8px", textAlign: "left", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                  Example
                </th>
                <th style={{ border: "1px solid #000000", padding: "4px 8px", textAlign: "left", fontFamily: "Georgia, serif", fontWeight: "bold" }}>
                  Swatch
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>Unvisited</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>#0000ff</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>:link</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <a href="#" className="underline transition-none" style={{ color: "#0000ff" }}>
                    Click here
                  </a>
                </td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <div style={{ width: "40px", height: "16px", background: "#0000ff", border: "1px solid #000000" }} />
                </td>
              </tr>
              <tr style={{ background: "#f8f8f8" }}>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>Visited</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>#551a8b</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>:visited</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <a href="#" className="underline transition-none" style={{ color: "#551a8b" }}>
                    Previously visited
                  </a>
                </td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <div style={{ width: "40px", height: "16px", background: "#551a8b", border: "1px solid #000000" }} />
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>Active</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>#ff0000</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>:active</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <a href="#" className="underline transition-none" style={{ color: "#ff0000" }}>
                    Currently clicking
                  </a>
                </td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <div style={{ width: "40px", height: "16px", background: "#ff0000", border: "1px solid #000000" }} />
                </td>
              </tr>
              <tr style={{ background: "#f8f8f8" }}>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>Hover</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>#ff0000</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>:hover</td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <a href="#" className="underline transition-none" style={{ color: "#ff0000" }}>
                    Mouse is over this
                  </a>
                </td>
                <td style={{ border: "1px solid #000000", padding: "4px 8px" }}>
                  <div style={{ width: "40px", height: "16px", background: "#ff0000", border: "1px solid #000000" }} />
                </td>
              </tr>
            </tbody>
          </table>

          <p className="font-mono text-xs text-black" style={{ marginTop: "0.5rem" }}>
            Source: HTML 3.2 Reference Specification, W3C, January 14, 1997
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 5: FONT SPECIMEN
          ================================================================ */}
      <section
        ref={fontSpecRef}
        style={{
          borderBottom: "1px solid #000000",
          opacity: fontSpecInView ? 1 : 0,
          transform: fontSpecInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s",
        }}
        className="bg-white py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-serif font-bold text-black"
            style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}
          >
            Typography Specimen
          </h2>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "1rem" }}>
            System fonts only. Times New Roman for headings, Courier/monospace for body. No web fonts.
          </p>

          <div style={{ border: "1px solid #000000", padding: "1.5rem", background: "#ffffff" }}>
            {/* Headings */}
            <div style={{ borderBottom: "1px solid #000000", marginBottom: "1rem", paddingBottom: "1rem" }}>
              <p className="font-mono text-xs text-black" style={{ marginBottom: "0.5rem" }}>
                Heading scale — font-serif (Times New Roman, Georgia):
              </p>
              <h1
                className="font-serif font-bold text-black"
                style={{ fontSize: "2.25rem", lineHeight: 1.1, marginBottom: "0.25rem" }}
              >
                H1 — Page Title (36px)
              </h1>
              <h2
                className="font-serif font-bold text-black"
                style={{ fontSize: "1.75rem", lineHeight: 1.15, marginBottom: "0.25rem" }}
              >
                H2 — Section Heading (28px)
              </h2>
              <h3
                className="font-serif font-bold text-black"
                style={{ fontSize: "1.375rem", lineHeight: 1.2, marginBottom: "0.25rem" }}
              >
                H3 — Subsection (22px)
              </h3>
              <h4
                className="font-serif font-bold text-black"
                style={{ fontSize: "1.0625rem", lineHeight: 1.3, marginBottom: "0" }}
              >
                H4 — Minor Heading (17px)
              </h4>
            </div>

            {/* Body text */}
            <div style={{ borderBottom: "1px solid #000000", marginBottom: "1rem", paddingBottom: "1rem" }}>
              <p className="font-mono text-xs text-black" style={{ marginBottom: "0.5rem" }}>
                Body text — font-mono (Courier New, monospace):
              </p>
              <p className="font-mono text-sm text-black" style={{ marginBottom: "0.5rem" }}>
                Regular body text at 13px. The quick brown fox jumps over the lazy dog.
                Pack my box with five dozen liquor jugs. Monospace characters all share
                identical width, lending a typewriter quality to all prose.
              </p>
              <p className="font-mono text-xs text-black" style={{ marginBottom: "0" }}>
                Small text at 12px. Copyright notices, timestamps, metadata, and fine print
                all use this size. Still monospace, still legible.
              </p>
            </div>

            {/* System sans-serif labels */}
            <div style={{ marginBottom: "1rem" }}>
              <p className="font-mono text-xs text-black" style={{ marginBottom: "0.5rem" }}>
                System sans-serif — font-sans (Arial, Helvetica):
              </p>
              <p className="font-sans text-sm text-black" style={{ marginBottom: "0.25rem" }}>
                System sans-serif for UI labels and navigation. Minimal use only.
              </p>
              <p className="font-sans text-xs text-black">
                Small label text — browser chrome matches this weight
              </p>
            </div>

            {/* Inline elements */}
            <div>
              <p className="font-mono text-xs text-black" style={{ marginBottom: "0.5rem" }}>
                Inline text elements:
              </p>
              <p className="font-mono text-sm text-black">
                <strong>Bold text is for emphasis.</strong>{" "}
                <em>Italic text is for citations.</em>{" "}
                <code style={{ background: "#f0f0f0", border: "1px solid #808080", padding: "0 2px" }}>
                  inline code
                </code>{" "}
                for technical terms.{" "}
                <a href="#" className="text-[#0000ff] underline hover:text-[#ff0000] transition-none">
                  hyperlink text
                </a>{" "}
                in signature blue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6: 90s WEB ELEMENTS
          ================================================================ */}
      <section
        ref={ninetyRef}
        style={{
          borderBottom: "1px solid #000000",
          opacity: ninetyInView ? 1 : 0,
          transform: ninetyInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
        className="bg-white py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-serif font-bold text-black"
            style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}
          >
            Authentic 90s Web Elements
          </h2>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "1.25rem" }}>
            Hallmarks of the early web, faithfully reproduced without irony.
          </p>

          <div className="space-y-4">

            {/* Under Construction banner */}
            <RevealBlock delay={0}>
              <div>
                <p className="font-mono text-xs text-black font-bold" style={{ marginBottom: "0.25rem" }}>
                  1. Under Construction Bar
                </p>
                <div
                  style={{
                    background: "#ffff00",
                    border: "1px solid #000000",
                    padding: "6px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span className="font-serif font-bold text-black text-sm">
                    *** UNDER CONSTRUCTION ***
                  </span>
                  <span className="font-mono text-black text-xs">
                    This page is not yet complete. Please check back later. Thank you for your patience.
                  </span>
                  <span className="font-serif font-bold text-black text-sm">
                    *** UNDER CONSTRUCTION ***
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Netscape badge */}
            <RevealBlock delay={0.05}>
              <div>
                <p className="font-mono text-xs text-black font-bold" style={{ marginBottom: "0.25rem" }}>
                  2. Browser Badge
                </p>
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      border: "2px solid #000000",
                      width: "88px",
                      height: "31px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ffffff",
                    }}
                  >
                    <span className="font-serif font-bold text-black" style={{ fontSize: "0.75rem" }}>
                      Netscape N
                    </span>
                  </div>
                  <div
                    style={{
                      border: "2px solid #000000",
                      width: "88px",
                      height: "31px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#dfdfdf",
                    }}
                  >
                    <span className="font-mono text-black" style={{ fontSize: "0.625rem", textAlign: "center" }}>
                      W3C HTML 3.2
                    </span>
                  </div>
                  <div
                    style={{
                      border: "2px solid #000000",
                      width: "88px",
                      height: "31px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#ffffff",
                    }}
                  >
                    <span className="font-mono text-black" style={{ fontSize: "0.625rem", textAlign: "center" }}>
                      MADE WITH<br />NOTEPAD
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Best viewed notice */}
            <RevealBlock delay={0.08}>
              <div
                style={{
                  border: "1px solid #000000",
                  padding: "8px 12px",
                  background: "#ffffc0",
                  display: "inline-block",
                }}
              >
                <p className="font-mono text-sm text-black font-bold">
                  Best Viewed in 800x600 Resolution with 16-bit Color
                </p>
                <p className="font-mono text-xs text-black">
                  Optimized for Netscape Navigator 3.0 or Internet Explorer 4.0
                </p>
              </div>
            </RevealBlock>

            {/* Email mailto link */}
            <RevealBlock delay={0.1}>
              <div>
                <p className="font-mono text-xs text-black font-bold" style={{ marginBottom: "0.25rem" }}>
                  4. Email Contact
                </p>
                <p className="font-mono text-sm text-black">
                  Send mail to the{" "}
                  <a
                    href="mailto:webmaster@brutalist.example.com"
                    className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
                  >
                    &#9993; webmaster@brutalist.example.com
                  </a>
                  {" "}with questions or comments about this web site.
                </p>
              </div>
            </RevealBlock>

            {/* Guestbook link */}
            <RevealBlock delay={0.12}>
              <div>
                <p className="font-mono text-xs text-black font-bold" style={{ marginBottom: "0.25rem" }}>
                  5. Guestbook Link
                </p>
                <p className="font-mono text-sm text-black">
                  Please{" "}
                  <a
                    href="#guestbook"
                    className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
                  >
                    sign my guestbook
                  </a>
                  {" "}and{" "}
                  <a
                    href="#guestbook"
                    className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
                  >
                    view the guestbook
                  </a>
                  {" "}to see what other visitors have written.
                </p>
              </div>
            </RevealBlock>

            {/* Last updated timestamp */}
            <RevealBlock delay={0.14}>
              <div style={{ border: "1px solid #000000", padding: "6px 10px", background: "#f0f0f0" }}>
                <p className="font-mono text-xs text-black">
                  This page last updated: Thursday, February 20, 2026 at 12:00:00 PM EST
                </p>
                <p className="font-mono text-xs text-black">
                  Page views since January 1, 1994:{" "}
                  <strong>52,301</strong>
                </p>
                <p className="font-mono text-xs text-black">
                  <a
                    href="#"
                    className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
                  >
                    [View page statistics]
                  </a>
                </p>
              </div>
            </RevealBlock>

          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7: DO / DON'T TABLE
          ================================================================ */}
      <section
        ref={dosDontsRef}
        style={{
          borderBottom: "1px solid #000000",
          opacity: dosDontsInView ? 1 : 0,
          transform: dosDontsInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
        className="bg-white py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-serif font-bold text-black"
            style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}
          >
            Brutalist Web Design Guidelines
          </h2>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "1rem" }}>
            Reference table — abide by these rules at all times
          </p>

          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr style={{ background: "#dfdfdf" }}>
                <th
                  style={{
                    border: "1px solid #000000",
                    padding: "6px 10px",
                    textAlign: "left",
                    fontFamily: "Georgia, serif",
                    fontWeight: "bold",
                    fontSize: "0.9375rem",
                    color: "#008000",
                  }}
                >
                  DO
                </th>
                <th
                  style={{
                    border: "1px solid #000000",
                    padding: "6px 10px",
                    textAlign: "left",
                    fontFamily: "Georgia, serif",
                    fontWeight: "bold",
                    fontSize: "0.9375rem",
                    color: "#ff0000",
                  }}
                >
                  DON&apos;T
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Use system fonts (Times New Roman, Courier New)", "Import web fonts from Google Fonts or CDN"],
                ["Style links as blue and underlined (#0000ff)", "Remove underlines or change link color to non-blue"],
                ["Use 1px black borders for all containers", "Use border-radius (rounded corners)"],
                ["Use white (#ffffff) for all backgrounds", "Use dark backgrounds or gradients"],
                ["Use semantic HTML: h1, p, ul, table, form", "Use divs for everything with ARIA roles"],
                ["Use monospace for all body text", "Use Helvetica or other sans-serif body fonts"],
                ["Use Windows 95 bevel for buttons", "Use CSS box-shadow or border-radius on buttons"],
                ["Keep pages below 50KB total size", "Load megabytes of JavaScript frameworks"],
                ["Write plain text content first", "Design in Figma before writing content"],
                ["Use tables for tabular data only", "Use table for page layout"],
                ["Show focus state as dotted outline", "Remove focus indicators for aesthetics"],
                ["Use horizontal rules (hr) as dividers", "Use decorative separators or icon lines"],
                ["Validate HTML with W3C validator", "Ship invalid markup and call it done"],
                ["Test in text-only browser (Lynx)", "Design for Chrome only"],
              ].map(([doItem, dontItem], idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? "#ffffff" : "#f8f8f8" }}>
                  <td
                    style={{
                      border: "1px solid #000000",
                      padding: "4px 10px",
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      color: "#000000",
                      verticalAlign: "top",
                    }}
                  >
                    {doItem}
                  </td>
                  <td
                    style={{
                      border: "1px solid #000000",
                      padding: "4px 10px",
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      color: "#000000",
                      verticalAlign: "top",
                    }}
                  >
                    {dontItem}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-mono text-xs text-black" style={{ marginTop: "0.5rem" }}>
            Version 1.0 | Approved by the Committee on Web Purity | Est. 1994
          </p>
        </div>
      </section>

      {/* ================================================================
          SECTION 8: GUESTBOOK
          ================================================================ */}
      <section
        id="guestbook"
        ref={guestbookRef}
        style={{
          borderBottom: "1px solid #000000",
          opacity: guestbookInView ? 1 : 0,
          transform: guestbookInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
        className="bg-white py-8 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-serif font-bold text-black"
            style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}
          >
            Guestbook
          </h2>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "0.75rem" }}>
            Sign the guestbook below. All entries are moderated.
            <span className="mx-2">|</span>
            <a href="#" className="text-[#0000ff] underline hover:text-[#ff0000] transition-none">
              View all entries
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="text-[#0000ff] underline hover:text-[#ff0000] transition-none">
              Search entries
            </a>
          </p>

          <hr style={{ borderTop: "1px solid #000000", marginBottom: "1rem" }} />

          {/* Existing entries */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p className="font-serif font-bold text-black" style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              Recent Entries ({GUESTBOOK_ENTRIES.length} of 847 total)
            </p>
            {GUESTBOOK_ENTRIES.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  borderTop: idx === 0 ? "1px solid #000000" : "none",
                  borderLeft: "1px solid #000000",
                  borderRight: "1px solid #000000",
                  borderBottom: "1px solid #000000",
                  padding: "8px 10px",
                  background: idx % 2 === 0 ? "#ffffff" : "#f8f8f8",
                }}
              >
                <div className="flex items-baseline gap-3" style={{ marginBottom: "4px" }}>
                  <span className="font-serif font-bold text-black" style={{ fontSize: "0.9375rem" }}>
                    {entry.name}
                  </span>
                  <span className="font-mono text-xs text-black">
                    from {entry.location}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "#808080" }}>
                    {entry.date}
                  </span>
                </div>
                <p className="font-mono text-sm text-black" style={{ marginBottom: "4px" }}>
                  {entry.message}
                </p>
                <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">
                  [Reply]
                </a>
                <span className="mx-2 text-black font-mono text-xs">|</span>
                <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">
                  [Flag]
                </a>
              </div>
            ))}
            <div style={{ border: "1px solid #000000", borderTop: "none", padding: "6px 10px", background: "#dfdfdf" }}>
              <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">
                [View all 847 entries]
              </a>
              <span className="mx-2 text-black font-mono text-xs">|</span>
              <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">
                [Previous page]
              </a>
              <span className="mx-2 text-black font-mono text-xs">|</span>
              <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">
                [Next page]
              </a>
            </div>
          </div>

          <hr style={{ borderTop: "1px solid #000000", marginBottom: "1rem" }} />

          {/* Submit new entry */}
          <div>
            <p className="font-serif font-bold text-black" style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
              Add Your Entry
            </p>
            {guestSubmitted ? (
              <div style={{ border: "1px solid #000000", padding: "12px", background: "#ffffcc" }}>
                <p className="font-mono text-sm text-black font-bold">
                  [OK] Thank you for signing the guestbook!
                </p>
                <p className="font-mono text-xs text-black" style={{ marginTop: "4px" }}>
                  Your entry will appear after review by the webmaster.
                </p>
                <button
                  onClick={() => setGuestSubmitted(false)}
                  className="transition-none active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
                  style={{
                    marginTop: "8px",
                    padding: "3px 12px",
                    background: "#dfdfdf",
                    color: "#000000",
                    fontFamily: "monospace",
                    fontSize: "0.8125rem",
                    cursor: "pointer",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderTopColor: "#ffffff",
                    borderLeftColor: "#ffffff",
                    borderRightColor: "#808080",
                    borderBottomColor: "#808080",
                  }}
                >
                  Sign again
                </button>
              </div>
            ) : (
              <form onSubmit={handleGuestSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div>
                    <label
                      className="font-mono text-xs text-black font-bold"
                      htmlFor="guest-name"
                      style={{ display: "block", marginBottom: "2px" }}
                    >
                      Name: *
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Your name"
                      className="transition-none focus:bg-[#ffffcc] focus:outline-dotted focus:outline-1 focus:outline-black"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        color: "#000000",
                        background: "#ffffff",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#808080",
                        borderLeftColor: "#808080",
                        borderRightColor: "#ffffff",
                        borderBottomColor: "#ffffff",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="font-mono text-xs text-black font-bold"
                      htmlFor="guest-email"
                      style={{ display: "block", marginBottom: "2px" }}
                    >
                      Email:
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="user@geocities.com"
                      className="transition-none focus:bg-[#ffffcc] focus:outline-dotted focus:outline-1 focus:outline-black"
                      style={{
                        width: "100%",
                        padding: "2px 4px",
                        fontFamily: "monospace",
                        fontSize: "0.8125rem",
                        color: "#000000",
                        background: "#ffffff",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderTopColor: "#808080",
                        borderLeftColor: "#808080",
                        borderRightColor: "#ffffff",
                        borderBottomColor: "#ffffff",
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label
                    className="font-mono text-xs text-black font-bold"
                    htmlFor="guest-location"
                    style={{ display: "block", marginBottom: "2px" }}
                  >
                    Your city/location:
                  </label>
                  <input
                    id="guest-location"
                    type="text"
                    placeholder="City, State"
                    className="transition-none focus:bg-[#ffffcc] focus:outline-dotted focus:outline-1 focus:outline-black"
                    style={{
                      width: "300px",
                      padding: "2px 4px",
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      color: "#000000",
                      background: "#ffffff",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderTopColor: "#808080",
                      borderLeftColor: "#808080",
                      borderRightColor: "#ffffff",
                      borderBottomColor: "#ffffff",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label
                    className="font-mono text-xs text-black font-bold"
                    htmlFor="guest-message"
                    style={{ display: "block", marginBottom: "2px" }}
                  >
                    Message: *
                  </label>
                  <textarea
                    id="guest-message"
                    required
                    rows={4}
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="transition-none focus:bg-[#ffffcc] focus:outline-dotted focus:outline-1 focus:outline-black"
                    style={{
                      width: "100%",
                      padding: "2px 4px",
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      color: "#000000",
                      background: "#ffffff",
                      resize: "vertical",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderTopColor: "#808080",
                      borderLeftColor: "#808080",
                      borderRightColor: "#ffffff",
                      borderBottomColor: "#ffffff",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label className="font-mono text-xs text-black font-bold" style={{ display: "block", marginBottom: "4px" }}>
                    How did you find this site?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Yahoo!", "AltaVista", "Word of mouth", "Random surfing", "Other"].map((option) => (
                      <label key={option} className="flex items-center gap-1">
                        <input type="radio" name="referral" value={option} className="transition-none" />
                        <span className="font-mono text-xs text-black">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="transition-none active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
                    style={{
                      padding: "4px 16px",
                      background: "#dfdfdf",
                      color: "#000000",
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      cursor: "pointer",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderTopColor: "#ffffff",
                      borderLeftColor: "#ffffff",
                      borderRightColor: "#808080",
                      borderBottomColor: "#808080",
                    }}
                  >
                    Sign Guestbook
                  </button>
                  <button
                    type="reset"
                    className="transition-none active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
                    style={{
                      padding: "4px 16px",
                      background: "#dfdfdf",
                      color: "#000000",
                      fontFamily: "monospace",
                      fontSize: "0.8125rem",
                      cursor: "pointer",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      borderTopColor: "#ffffff",
                      borderLeftColor: "#ffffff",
                      borderRightColor: "#808080",
                      borderBottomColor: "#808080",
                    }}
                  >
                    Reset Form
                  </button>
                  <span className="font-mono text-xs" style={{ color: "#808080" }}>
                    * Required fields
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 9: FOOTER
          ================================================================ */}
      <footer
        ref={footerRef}
        style={{
          borderTop: "1px solid #000000",
          opacity: footerInView ? 1 : 0,
          transform: footerInView ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
        className="bg-white py-6 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <hr style={{ borderTop: "1px solid #000000", marginBottom: "0.75rem" }} />
          <p className="font-mono text-xs text-black" style={{ marginBottom: "0.25rem" }}>
            Last Updated: MCMXCIV&nbsp;&nbsp;|&nbsp;&nbsp;Netscape 2.0 Compatible&nbsp;&nbsp;|&nbsp;&nbsp;Copyright 1994-2026 Brutalist Web
          </p>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "0.25rem" }}>
            No cookies. No tracking. No JavaScript required to read this page.
          </p>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "0.25rem" }}>
            Questions? Write to the webmaster:{" "}
            <a
              href="mailto:webmaster@brutalist.example.com"
              className="text-[#0000ff] underline hover:text-[#ff0000] transition-none"
            >
              webmaster@brutalist.example.com
            </a>
          </p>
          <p className="font-mono text-xs text-black" style={{ marginBottom: "0.5rem" }}>
            Part of the{" "}
            <Link href="/" className="text-[#0000ff] underline hover:text-[#ff0000] transition-none">
              StyleKit
            </Link>
            {" "}design system collection.
          </p>
          <hr style={{ borderTop: "1px solid #000000", marginBottom: "0.5rem" }} />
          <div className="flex flex-wrap gap-3">
            <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">Home</a>
            <span className="font-mono text-xs text-black">|</span>
            <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">About</a>
            <span className="font-mono text-xs text-black">|</span>
            <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">Archive</a>
            <span className="font-mono text-xs text-black">|</span>
            <a href="#guestbook" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">Guestbook</a>
            <span className="font-mono text-xs text-black">|</span>
            <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">Links</a>
            <span className="font-mono text-xs text-black">|</span>
            <a href="#" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">Sitemap</a>
            <span className="font-mono text-xs text-black">|</span>
            <Link href="/styles" className="font-mono text-xs text-[#0000ff] underline hover:text-[#ff0000] transition-none">
              StyleKit &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
