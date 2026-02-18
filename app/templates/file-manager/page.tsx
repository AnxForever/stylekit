"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Cloud,
  Download,
  File,
  FileImage,
  FileText,
  Film,
  Folder,
  Grid3X3,
  HardDrive,
  LayoutList,
  Menu,
  MoreVertical,
  Music,
  Plus,
  Search,
  Share2,
  Star,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

type ViewMode = "grid" | "list";

interface FileItem {
  id: number;
  name: string;
  type: "folder" | "image" | "document" | "video" | "audio" | "file";
  size?: string;
  modified: string;
  shared?: boolean;
  starred: boolean;
}

const files: FileItem[] = [
  { id: 1, name: "Design Assets", type: "folder", modified: "Feb 15, 2026", starred: true },
  { id: 2, name: "Project Documents", type: "folder", modified: "Feb 12, 2026", starred: false },
  { id: 3, name: "Photos 2026", type: "folder", modified: "Feb 10, 2026", starred: false },
  { id: 4, name: "hero-banner.png", type: "image", size: "2.4 MB", modified: "Feb 14, 2026", shared: true, starred: false },
  { id: 5, name: "Q4-Report.pdf", type: "document", size: "1.8 MB", modified: "Feb 13, 2026", starred: true },
  { id: 6, name: "product-demo.mp4", type: "video", size: "128 MB", modified: "Feb 11, 2026", shared: true, starred: false },
  { id: 7, name: "podcast-ep12.mp3", type: "audio", size: "45 MB", modified: "Feb 9, 2026", starred: false },
  { id: 8, name: "brand-guidelines.pdf", type: "document", size: "5.2 MB", modified: "Feb 8, 2026", starred: false },
  { id: 9, name: "screenshot-app.png", type: "image", size: "890 KB", modified: "Feb 7, 2026", shared: true, starred: false },
  { id: 10, name: "meeting-notes.docx", type: "document", size: "124 KB", modified: "Feb 6, 2026", starred: false },
  { id: 11, name: "archive-2025.zip", type: "file", size: "2.1 GB", modified: "Jan 30, 2026", starred: false },
];

const iconForType = (type: FileItem["type"]) => {
  switch (type) {
    case "folder": return Folder;
    case "image": return FileImage;
    case "document": return FileText;
    case "video": return Film;
    case "audio": return Music;
    default: return File;
  }
};

const colorForType = (type: FileItem["type"]) => {
  switch (type) {
    case "folder": return "text-blue-500 bg-blue-50";
    case "image": return "text-pink-500 bg-pink-50";
    case "document": return "text-orange-500 bg-orange-50";
    case "video": return "text-purple-500 bg-purple-50";
    case "audio": return "text-green-500 bg-green-50";
    default: return "text-gray-500 bg-gray-100";
  }
};

const storageUsed = 42.8;
const storageTotal = 100;

export default function FileManagerTemplate() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fileList, setFileList] = useState<FileItem[]>(files);

  const toggleStar = (id: number) => {
    setFileList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, starred: !f.starred } : f))
    );
  };

  const filtered = fileList.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-lg">CloudDrive</span>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-gray-100">
          <span className="text-xl font-bold text-gray-900">
            <Cloud className="inline w-5 h-5 text-blue-500 mr-2" />
            CloudDrive
          </span>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1 text-sm text-gray-500">
            <span className="hover:text-gray-700 cursor-pointer">My Drive</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">All Files</span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-blue-300 focus:outline-none transition-all"
            />
          </div>

          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
              aria-label="List view"
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </header>

        {/* Quick Actions */}
        <div className="px-4 md:px-6 py-4 flex gap-3 overflow-x-auto">
          {[
            { icon: Plus, label: "New Folder", color: "text-blue-600 bg-blue-50 border-blue-200" },
            { icon: Upload, label: "Upload File", color: "text-green-600 bg-green-50 border-green-200" },
            { icon: Share2, label: "Share", color: "text-purple-600 bg-purple-50 border-purple-200" },
          ].map((action) => (
            <button
              key={action.label}
              className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg shrink-0 hover:shadow-sm transition-all ${action.color}`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>

        {/* File List */}
        <div className="flex-1 px-4 md:px-6 pb-8">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filtered.map((file) => {
                const Icon = iconForType(file.type);
                const colors = colorForType(file.type);
                return (
                  <div
                    key={file.id}
                    className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${colors} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleStar(file.id); }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Star className={`w-3.5 h-3.5 ${file.starred ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate mb-1">{file.name}</p>
                    <p className="text-xs text-gray-400">{file.size || "--"}</p>
                    {file.shared && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-blue-500">
                        <Users className="w-3 h-3" />
                        Shared
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Size</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Modified</th>
                    <th className="px-4 py-3 font-medium w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((file) => {
                    const Icon = iconForType(file.type);
                    const colors = colorForType(file.type);
                    return (
                      <tr
                        key={file.id}
                        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer group transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${colors} flex items-center justify-center shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <span className="text-sm font-medium text-gray-900 truncate block">{file.name}</span>
                              {file.shared && (
                                <span className="text-xs text-blue-500 flex items-center gap-1 mt-0.5">
                                  <Users className="w-3 h-3" />
                                  Shared
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{file.size || "--"}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{file.modified}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleStar(file.id); }}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Star className={`w-3.5 h-3.5 ${file.starred ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <Download className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <TemplateBackButton />
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto">
      <nav className="space-y-1 mb-6">
        {[
          { icon: HardDrive, label: "My Drive", active: true },
          { icon: Users, label: "Shared with me", active: false },
          { icon: Star, label: "Starred", active: false },
          { icon: Trash2, label: "Trash", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Storage */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Storage</span>
          <span>{storageUsed} GB / {storageTotal} GB</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
          />
        </div>
        <button className="mt-3 w-full py-2 text-xs text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
          Upgrade Storage
        </button>
      </div>
    </div>
  );
}
