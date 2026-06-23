"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { contentItems, contentTypeColor, statusColor } from "../_data";

export function ContentView() {
  const [contentSearch, setContentSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredContent = contentItems.filter((item) => {
    const matchesSearch =
      contentSearch.trim() === "" ||
      item.title.toLowerCase().includes(contentSearch.toLowerCase()) ||
      item.author.toLowerCase().includes(contentSearch.toLowerCase());
    const matchesType = typeFilter === "All" || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Content</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage articles, videos, and documents
          </p>
        </div>
        <button className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          + New Content
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            value={contentSearch}
            onChange={(e) => setContentSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-400 transition-colors"
        >
          <option value="All">All Types</option>
          <option value="Article">Article</option>
          <option value="Video">Video</option>
          <option value="Document">Document</option>
          <option value="Gallery">Gallery</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Title", "Type", "Author", "Status", "Date", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredContent.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-400">
                    No content matches your search.
                  </td>
                </tr>
              ) : (
                filteredContent.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {item.title}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${contentTypeColor(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.author}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${statusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
          Showing {filteredContent.length} of {contentItems.length} items
        </div>
      </div>
    </div>
  );
}