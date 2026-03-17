"use client";

import { useRef, useState, useEffect } from "react";

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── RevealBlock ──────────────────────────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.4s ease-out ${delay}s, transform 0.4s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconChevronUp({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function IconMenu({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function IconX({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconArrowUp({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function IconArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const kpiData = [
  { label: "Revenue", value: "$142,389", change: "+12.5%", positive: true },
  { label: "Orders", value: "3,284", change: "-3.2%", positive: false },
  { label: "Active Users", value: "18,921", change: "+8.1%", positive: true },
  { label: "Error Rate", value: "0.42%", change: "-0.15%", positive: true },
];

type SortDirection = "asc" | "desc" | null;

interface TableRow {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Error";
  role: string;
  lastLogin: string;
  amount: string;
}

const tableData: TableRow[] = [
  { id: "#10421", name: "Alice Chen", email: "alice@acme.co", status: "Active", role: "Admin", lastLogin: "2 min ago", amount: "$4,200" },
  { id: "#10420", name: "Bob Martinez", email: "bob@acme.co", status: "Pending", role: "Editor", lastLogin: "1 hr ago", amount: "$1,890" },
  { id: "#10419", name: "Carol Singh", email: "carol@acme.co", status: "Active", role: "Viewer", lastLogin: "5 min ago", amount: "$3,100" },
  { id: "#10418", name: "David Kim", email: "david@acme.co", status: "Error", role: "Editor", lastLogin: "3 days ago", amount: "$720" },
  { id: "#10417", name: "Eve Wilson", email: "eve@acme.co", status: "Active", role: "Admin", lastLogin: "12 min ago", amount: "$5,640" },
  { id: "#10416", name: "Frank Lopez", email: "frank@acme.co", status: "Active", role: "Viewer", lastLogin: "1 hr ago", amount: "$980" },
  { id: "#10415", name: "Grace Tanaka", email: "grace@acme.co", status: "Pending", role: "Editor", lastLogin: "2 hr ago", amount: "$2,350" },
  { id: "#10414", name: "Henry Patel", email: "henry@acme.co", status: "Active", role: "Admin", lastLogin: "30 min ago", amount: "$6,100" },
];

const sidebarItems = [
  { label: "Dashboard", active: true },
  { label: "Users", active: false },
  { label: "Orders", active: false },
  { label: "Products", active: false },
  { label: "Analytics", active: false },
  { label: "Reports", active: false },
  { label: "Settings", active: false },
];

const tabs = ["Overview", "Users", "Revenue", "Logs"];

// ─── StatusBadge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "Active" | "Pending" | "Error" }) {
  const styles = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Error: "bg-red-50 text-red-700",
  };
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

// ─── Main Showcase ────────────────────────────────────────────────────────────

export default function DataDenseShowcaseContent() {
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc");
      if (sortDir === "desc") setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (!sortCol || !sortDir) return 0;
    const aVal = a[sortCol as keyof TableRow];
    const bVal = b[sortCol as keyof TableRow];
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <IconChevronDown className="w-3 h-3 opacity-30" />;
    if (sortDir === "asc") return <IconChevronUp className="w-3 h-3 text-[#3b82f6]" />;
    return <IconChevronDown className="w-3 h-3 text-[#3b82f6]" />;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* ─── Section 1: Top Bar ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-3 py-2 bg-white border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-[#f8fafc] transition-colors"
          >
            {sidebarOpen ? <IconX className="w-4 h-4 text-[#64748b]" /> : <IconMenu className="w-4 h-4 text-[#64748b]" />}
          </button>
          <span className="text-xs font-semibold tracking-wide text-[#1e293b]">ADMIN PANEL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#3b82f6] flex items-center justify-center text-[10px] text-white font-medium">A</div>
          <span className="text-xs text-[#64748b]">admin@acme.co</span>
        </div>
      </header>

      <div className="flex">
        {/* ─── Section 2: Compact Sidebar Nav ──────────────────────────── */}
        {sidebarOpen && (
          <RevealBlock>
            <nav className="w-44 min-h-[calc(100vh-41px)] bg-white border-r border-[#e2e8f0] py-3 text-xs flex-shrink-0">
              <div className="px-3 mb-3">
                <p className="text-[10px] uppercase tracking-wide text-[#94a3b8] mb-2">Navigation</p>
              </div>
              <div className="space-y-0.5 px-1.5">
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className={`px-2 py-1.5 rounded cursor-pointer transition-colors ${
                      item.active
                        ? "bg-[#3b82f6] text-white font-medium"
                        : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]"
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </nav>
          </RevealBlock>
        )}

        {/* ─── Main Content ────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 p-3 space-y-3">
          {/* ─── Section 3: Breadcrumbs ────────────────────────────────── */}
          <RevealBlock>
            <div className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
              <span className="hover:text-[#3b82f6] cursor-pointer transition-colors">Home</span>
              <span>/</span>
              <span className="hover:text-[#3b82f6] cursor-pointer transition-colors">Dashboard</span>
              <span>/</span>
              <span className="text-[#1e293b] font-medium">Overview</span>
            </div>
          </RevealBlock>

          {/* ─── Section 4: Tab Navigation ─────────────────────────────── */}
          <RevealBlock>
            <div className="flex items-center gap-0 border-b border-[#e2e8f0]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-xs font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-[#3b82f6] text-[#3b82f6]"
                      : "border-transparent text-[#64748b] hover:text-[#1e293b]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* ─── Section 5: KPI Cards Row ──────────────────────────────── */}
          <RevealBlock>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {kpiData.map((kpi, i) => (
                <div key={i} className="bg-white border border-[#e2e8f0] rounded px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-[#64748b] mb-0.5">{kpi.label}</p>
                  <p className="text-lg font-semibold text-[#1e293b] font-mono">{kpi.value}</p>
                  <p className={`text-[10px] font-mono ${kpi.positive ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                    {kpi.positive ? <IconArrowUp className="w-2.5 h-2.5 inline -mt-0.5 mr-0.5" /> : <IconArrowDown className="w-2.5 h-2.5 inline -mt-0.5 mr-0.5" />}
                    {kpi.change}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* ─── Section 6: Filter Toolbar ──────────────────────────────── */}
          <RevealBlock>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <IconSearch className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-7 pr-2.5 py-1.5 text-xs border border-[#e2e8f0] rounded bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-colors w-48"
                />
              </div>
              <select className="px-2.5 py-1.5 text-xs border border-[#e2e8f0] rounded bg-white text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Error</option>
              </select>
              <select className="px-2.5 py-1.5 text-xs border border-[#e2e8f0] rounded bg-white text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
              <div className="ml-auto flex items-center gap-1.5">
                <button className="px-2.5 py-1 text-xs font-medium bg-[#3b82f6] text-white rounded hover:bg-[#2563eb] transition-colors">
                  Export
                </button>
                <button className="px-2.5 py-1 text-xs font-medium border border-[#e2e8f0] text-[#64748b] rounded hover:bg-[#f8fafc] transition-colors">
                  Refresh
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* ─── Section 7: Dense Data Table ───────────────────────────── */}
          <RevealBlock>
            <div className="border border-[#e2e8f0] rounded overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                      {[
                        { key: "id", label: "ID", align: "left" as const },
                        { key: "name", label: "Name", align: "left" as const },
                        { key: "email", label: "Email", align: "left" as const },
                        { key: "status", label: "Status", align: "left" as const },
                        { key: "role", label: "Role", align: "left" as const },
                        { key: "lastLogin", label: "Last Login", align: "left" as const },
                        { key: "amount", label: "Amount", align: "right" as const },
                      ].map((col) => (
                        <th
                          key={col.key}
                          onClick={() => handleSort(col.key)}
                          className={`px-3 py-2 text-[10px] uppercase tracking-wide text-[#64748b] font-medium cursor-pointer hover:text-[#1e293b] transition-colors select-none ${
                            col.align === "right" ? "text-right" : "text-left"
                          }`}
                        >
                          <span className="inline-flex items-center gap-1">
                            {col.label}
                            <SortIcon col={col.key} />
                          </span>
                        </th>
                      ))}
                      <th className="px-3 py-2 text-[10px] uppercase tracking-wide text-[#64748b] font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {sortedData.map((row) => (
                      <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors">
                        <td className="px-3 py-2 font-mono text-[#64748b]">{row.id}</td>
                        <td className="px-3 py-2 text-[#1e293b] font-medium">{row.name}</td>
                        <td className="px-3 py-2 text-[#64748b]">{row.email}</td>
                        <td className="px-3 py-2"><StatusBadge status={row.status} /></td>
                        <td className="px-3 py-2 text-[#64748b]">{row.role}</td>
                        <td className="px-3 py-2 text-[#94a3b8]">{row.lastLogin}</td>
                        <td className="px-3 py-2 text-right font-mono text-[#1e293b]">{row.amount}</td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="px-2 py-0.5 text-[10px] font-medium text-[#3b82f6] hover:bg-blue-50 rounded transition-colors">
                              Edit
                            </button>
                            <button className="px-2 py-0.5 text-[10px] font-medium text-[#ef4444] hover:bg-red-50 rounded transition-colors">
                              Del
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </RevealBlock>

          {/* ─── Section 8: Pagination ──────────────────────────────────── */}
          <RevealBlock>
            <div className="flex items-center justify-between text-[10px] text-[#94a3b8]">
              <span>Showing 1-8 of 3,284 results</span>
              <div className="flex items-center gap-1">
                <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors text-[#64748b]">Prev</button>
                <button className="px-2 py-0.5 rounded bg-[#3b82f6] text-white">1</button>
                <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors text-[#64748b]">2</button>
                <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors text-[#64748b]">3</button>
                <span className="text-[#94a3b8]">...</span>
                <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors text-[#64748b]">66</button>
                <button className="px-2 py-0.5 rounded border border-[#e2e8f0] hover:bg-white transition-colors text-[#64748b]">Next</button>
              </div>
            </div>
          </RevealBlock>

          {/* ─── Section 9: Mini Chart Placeholder ─────────────────────── */}
          <RevealBlock>
            <div className="bg-white border border-[#e2e8f0] rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-wide text-[#64748b] font-medium">Revenue Trend (7d)</p>
                <span className="text-[10px] text-[#22c55e] font-mono">+12.5%</span>
              </div>
              <div className="flex items-end gap-1 h-16">
                {[40, 55, 35, 60, 75, 65, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 6 ? "#3b82f6" : "#e2e8f0",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="text-[8px] text-[#94a3b8] flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* ─── Section 10: Alert Variants ─────────────────────────────── */}
          <RevealBlock>
            <div className="space-y-1.5">
              {[
                { type: "info", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", msg: "System update scheduled for 2:00 AM UTC." },
                { type: "success", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", msg: "Backup completed successfully. 1,284 records processed." },
                { type: "warning", bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", msg: "API rate limit approaching 80% threshold." },
                { type: "error", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", msg: "Database connection timeout on replica-03." },
              ].map((alert) => (
                <div key={alert.type} className={`flex items-center gap-2 px-3 py-2 rounded border text-xs ${alert.bg} ${alert.text} ${alert.border}`}>
                  <span className="text-[10px] uppercase font-semibold tracking-wide min-w-[50px]">{alert.type}</span>
                  <span>{alert.msg}</span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* ─── Section 11: Compact Form ──────────────────────────────── */}
          <RevealBlock>
            <div className="bg-white border border-[#e2e8f0] rounded p-3">
              <p className="text-xs font-semibold text-[#1e293b] mb-2">Quick Add User</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-[#64748b] font-medium mb-1 block">Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-2.5 py-1.5 text-xs border border-[#e2e8f0] rounded bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-[#64748b] font-medium mb-1 block">Email</label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    className="w-full px-2.5 py-1.5 text-xs border border-[#e2e8f0] rounded bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-[#64748b] font-medium mb-1 block">Role</label>
                  <select className="w-full px-2.5 py-1.5 text-xs border border-[#e2e8f0] rounded bg-white text-[#64748b] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-colors">
                    <option>Select role...</option>
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <button className="px-2.5 py-1 text-xs font-medium bg-[#3b82f6] text-white rounded hover:bg-[#2563eb] transition-colors">
                  Add User
                </button>
                <button className="px-2.5 py-1 text-xs font-medium border border-[#e2e8f0] text-[#64748b] rounded hover:bg-[#f8fafc] transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* ─── Section 12: Keyboard Shortcuts ────────────────────────── */}
          <RevealBlock>
            <div className="bg-white border border-[#e2e8f0] rounded p-3">
              <p className="text-xs font-semibold text-[#1e293b] mb-2">Keyboard Shortcuts</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1.5">
                {[
                  { keys: "Ctrl+K", desc: "Search" },
                  { keys: "Ctrl+N", desc: "New record" },
                  { keys: "Ctrl+S", desc: "Save" },
                  { keys: "Ctrl+/", desc: "Help" },
                  { keys: "Esc", desc: "Close modal" },
                  { keys: "J / K", desc: "Navigate rows" },
                  { keys: "E", desc: "Edit selected" },
                  { keys: "Del", desc: "Delete selected" },
                ].map((shortcut) => (
                  <div key={shortcut.keys} className="flex items-center gap-2">
                    <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#f8fafc] border border-[#e2e8f0] rounded text-[#64748b]">
                      {shortcut.keys}
                    </kbd>
                    <span className="text-[10px] text-[#94a3b8]">{shortcut.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* ─── Section 13: Rules Summary ─────────────────────────────── */}
          <RevealBlock>
            <div className="bg-white border border-[#e2e8f0] rounded p-3">
              <p className="text-xs font-semibold text-[#1e293b] mb-2">Data Dense Design Rules</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#22c55e] font-medium mb-1">Do</p>
                  <ul className="space-y-0.5">
                    {[
                      "Use text-xs / text-sm for all data",
                      "Monospace for numbers and IDs",
                      "Color-coded status badges",
                      "Compact py-2 table rows",
                      "Inline action buttons",
                    ].map((rule) => (
                      <li key={rule} className="text-[10px] text-[#64748b] flex items-start gap-1">
                        <span className="text-[#22c55e] mt-0.5">+</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-[#ef4444] font-medium mb-1">Don&apos;t</p>
                  <ul className="space-y-0.5">
                    {[
                      "Large padding (p-6+)",
                      "Decorative gradients or shadows",
                      "Large rounded corners (rounded-xl+)",
                      "Large font sizes in data areas",
                      "Hidden frequent actions in menus",
                    ].map((rule) => (
                      <li key={rule} className="text-[10px] text-[#64748b] flex items-start gap-1">
                        <span className="text-[#ef4444] mt-0.5">-</span>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ─── Section 14: Status Bar Footer ─────────────────────────── */}
          <RevealBlock>
            <footer className="flex items-center justify-between px-3 py-2 bg-white border border-[#e2e8f0] rounded text-[10px] text-[#94a3b8]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  System OK
                </span>
                <span>API: 142ms</span>
                <span>DB: 28ms</span>
              </div>
              <div className="flex items-center gap-3">
                <span>v2.4.1</span>
                <span>Last deploy: 3h ago</span>
              </div>
            </footer>
          </RevealBlock>
        </main>
      </div>
    </div>
  );
}
