"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArrowLeft,
  Edit,
  Forward,
  Inbox,
  Mail,
  Menu,
  MoreHorizontal,
  Paperclip,
  Reply,
  Search,
  Send,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

interface Email {
  id: number;
  from: string;
  fromEmail: string;
  avatar: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  date: string;
  read: boolean;
  starred: boolean;
  labels: string[];
  hasAttachment: boolean;
}

const emails: Email[] = [
  {
    id: 1,
    from: "GitHub",
    fromEmail: "noreply@github.com",
    avatar: "GH",
    subject: "[stylekit] Pull Request #142: Add calendar template",
    preview: "mergify[bot] approved this pull request. Changes look good, merging automatically...",
    body: "mergify[bot] approved this pull request.\n\nChanges look good, merging automatically.\n\nAll CI checks have passed:\n- Build: passed\n- Lint: passed\n- Type Check: passed\n- Unit Tests: 48/48 passed\n\nThis PR will be merged in approximately 2 minutes.",
    time: "10:24 AM",
    date: "Feb 18, 2026",
    read: false,
    starred: false,
    labels: ["dev"],
    hasAttachment: false,
  },
  {
    id: 2,
    from: "Sarah Chen",
    fromEmail: "sarah.chen@company.com",
    avatar: "SC",
    subject: "Re: Q1 Design System Roadmap",
    preview: "I have updated the timeline based on our discussion. The component library milestone...",
    body: "Hi team,\n\nI have updated the timeline based on our discussion. The component library milestone has been moved to March 15.\n\nKey changes:\n- Icon system: Feb 28 (on track)\n- Component library v2: Mar 15 (pushed back 1 week)\n- Documentation site: Mar 30\n- Design tokens migration: Apr 15\n\nPlease review and let me know if there are any concerns.\n\nBest,\nSarah",
    time: "9:45 AM",
    date: "Feb 18, 2026",
    read: false,
    starred: true,
    labels: ["work"],
    hasAttachment: true,
  },
  {
    id: 3,
    from: "Vercel",
    fromEmail: "notifications@vercel.com",
    avatar: "VC",
    subject: "Deployment successful: stylekit-main-abc123",
    preview: "Your project stylekit has been deployed successfully to production...",
    body: "Your project stylekit has been deployed successfully to production.\n\nDeployment URL: https://stylekit.vercel.app\nBranch: main\nCommit: abc123f - feat: add calendar template\nBuild Time: 42s\nRegion: iad1",
    time: "9:12 AM",
    date: "Feb 18, 2026",
    read: true,
    starred: false,
    labels: ["dev"],
    hasAttachment: false,
  },
  {
    id: 4,
    from: "Alex Rivera",
    fromEmail: "alex@rivera.dev",
    avatar: "AR",
    subject: "Conference talk proposal feedback",
    preview: "Hey! I reviewed your talk proposal for ReactConf. The outline is solid but I think...",
    body: "Hey!\n\nI reviewed your talk proposal for ReactConf. The outline is solid but I think you should expand on the performance section.\n\nSpecifically:\n1. Add concrete benchmarks comparing the old vs new approach\n2. Include a live demo if possible\n3. The section about Server Components could use a real-world example\n\nOtherwise, the narrative flow is great. You should definitely submit it.\n\nCheers,\nAlex",
    time: "Yesterday",
    date: "Feb 17, 2026",
    read: true,
    starred: false,
    labels: [],
    hasAttachment: false,
  },
  {
    id: 5,
    from: "Linear",
    fromEmail: "notifications@linear.app",
    avatar: "LN",
    subject: "[STYLE-284] Bug: Dark mode toggle not persisting",
    preview: "Issue STYLE-284 has been assigned to you. Priority: High. Reporter: Mika Tanaka...",
    body: "Issue STYLE-284 has been assigned to you.\n\nPriority: High\nReporter: Mika Tanaka\nLabel: Bug\n\nDescription:\nThe dark mode toggle on the settings page does not persist across page reloads. The theme resets to light mode every time.\n\nSteps to reproduce:\n1. Go to Settings > Appearance\n2. Toggle dark mode on\n3. Refresh the page\n4. Theme reverts to light mode\n\nExpected: Theme should persist via localStorage.",
    time: "Yesterday",
    date: "Feb 17, 2026",
    read: true,
    starred: true,
    labels: ["dev"],
    hasAttachment: false,
  },
  {
    id: 6,
    from: "Newsletter",
    fromEmail: "weekly@bytes.dev",
    avatar: "NL",
    subject: "This Week in Web Dev: CSS @starting-style, Bun 1.5",
    preview: "CSS @starting-style is now supported in all major browsers. Plus: Bun 1.5 drops with...",
    body: "CSS @starting-style is now supported in all major browsers.\n\nPlus: Bun 1.5 drops with native S3 support, the state of JavaScript 2025 survey results are out, and React 20 is on the horizon.\n\nRead the full newsletter at bytes.dev",
    time: "Feb 16",
    date: "Feb 16, 2026",
    read: true,
    starred: false,
    labels: [],
    hasAttachment: false,
  },
];

const labelColors: Record<string, string> = {
  dev: "bg-blue-100 text-blue-700",
  work: "bg-green-100 text-green-700",
  personal: "bg-purple-100 text-purple-700",
};

const folders = [
  { icon: Inbox, label: "Inbox", count: 2 },
  { icon: Star, label: "Starred", count: 2 },
  { icon: Send, label: "Sent", count: 0 },
  { icon: Edit, label: "Drafts", count: 1 },
  { icon: Archive, label: "Archive", count: 0 },
  { icon: Trash2, label: "Trash", count: 0 },
];

export default function EmailInboxTemplate() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [emailList, setEmailList] = useState(emails);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedEmail = emailList.find((e) => e.id === selectedId);

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmailList((prev) =>
      prev.map((em) => (em.id === id ? { ...em, starred: !em.starred } : em))
    );
  };

  const markRead = (id: number) => {
    setEmailList((prev) =>
      prev.map((em) => (em.id === id ? { ...em, read: true } : em))
    );
  };

  const filtered = emailList.filter(
    (e) =>
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold">Mail</span>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <FolderList />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 lg:w-64 shrink-0 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">MailKit</span>
          </div>
        </div>
        <button className="mx-4 mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Edit className="w-4 h-4" />
          Compose
        </button>
        <FolderList />
      </aside>

      {/* Email List */}
      <div
        className={`${
          selectedEmail ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 shrink-0 h-screen`}
      >
        <div className="p-3 border-b border-gray-200 space-y-2">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open folders"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-gray-900">Inbox</h2>
            <span className="text-xs text-gray-400 ml-auto">
              {emailList.filter((e) => !e.read).length} unread
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search mail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((email) => (
            <button
              key={email.id}
              onClick={() => {
                setSelectedId(email.id);
                markRead(email.id);
              }}
              className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                email.id === selectedId ? "bg-blue-50" : ""
              } ${!email.read ? "bg-blue-50/50" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                  {email.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm truncate ${!email.read ? "font-bold text-gray-900" : "text-gray-700"}`}>
                      {email.from}
                    </span>
                    <span className="text-[11px] text-gray-400 shrink-0">{email.time}</span>
                  </div>
                  <p className={`text-sm truncate mt-0.5 ${!email.read ? "font-semibold text-gray-900" : "text-gray-600"}`}>
                    {email.subject}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{email.preview}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {email.labels.map((label) => (
                      <span
                        key={label}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${labelColors[label] || "bg-gray-100 text-gray-600"}`}
                      >
                        {label}
                      </span>
                    ))}
                    {email.hasAttachment && (
                      <Paperclip className="w-3 h-3 text-gray-400" />
                    )}
                    <button
                      onClick={(e) => toggleStar(email.id, e)}
                      className="ml-auto"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${email.starred ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Email Detail */}
      <main className={`${selectedEmail ? "flex" : "hidden md:flex"} flex-col flex-1 min-w-0 bg-white h-screen`}>
        {selectedEmail ? (
          <>
            <div className="px-4 md:px-6 py-3 border-b border-gray-200 flex items-center gap-2">
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setSelectedId(null)}
                aria-label="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex-1" />
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                <Archive className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
              <h1 className="text-xl font-bold text-gray-900 mb-4">{selectedEmail.subject}</h1>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {selectedEmail.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{selectedEmail.from}</span>
                    <span className="text-xs text-gray-400">&lt;{selectedEmail.fromEmail}&gt;</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{selectedEmail.date}</div>
                </div>
                <button
                  onClick={(e) => toggleStar(selectedEmail.id, e)}
                  className="p-1"
                >
                  <Star
                    className={`w-4 h-4 ${selectedEmail.starred ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                </button>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selectedEmail.body}
              </div>
            </div>
            <div className="px-4 md:px-6 py-3 border-t border-gray-200 flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Reply className="w-4 h-4" />
                Reply
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Forward className="w-4 h-4" />
                Forward
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Select an email to read</p>
            </div>
          </div>
        )}
      </main>
      <TemplateBackButton />
    </div>
  );
}

function FolderList() {
  return (
    <nav className="flex-1 p-3 space-y-0.5">
      {folders.map((folder, i) => (
        <button
          key={folder.label}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            i === 0 ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <folder.icon className="w-4 h-4" />
          <span className="flex-1 text-left">{folder.label}</span>
          {folder.count > 0 && (
            <span className={`text-xs ${i === 0 ? "text-blue-600 font-semibold" : "text-gray-400"}`}>
              {folder.count}
            </span>
          )}
        </button>
      ))}
      <div className="pt-3 mt-3 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">Labels</p>
        {[
          { name: "dev", color: "bg-blue-500" },
          { name: "work", color: "bg-green-500" },
          { name: "personal", color: "bg-purple-500" },
        ].map((label) => (
          <button
            key={label.name}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${label.color}`} />
            {label.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
