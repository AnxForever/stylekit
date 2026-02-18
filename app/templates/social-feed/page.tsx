"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  Heart,
  Home,
  Image as ImageIcon,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Repeat2,
  Search,
  Share,
  Smile,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

interface Post {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  image?: boolean;
  likes: number;
  comments: number;
  reposts: number;
  liked: boolean;
  bookmarked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Sarah Chen",
    handle: "@sarahchen",
    avatar: "SC",
    time: "2h",
    content:
      "Just shipped our new design system after 6 months of work. The component library now has 120+ components with full accessibility support. Super proud of the team!",
    likes: 284,
    comments: 42,
    reposts: 67,
    liked: false,
    bookmarked: false,
  },
  {
    id: 2,
    author: "Alex Rivera",
    handle: "@alexrivera",
    avatar: "AR",
    time: "4h",
    content:
      "Hot take: TypeScript strict mode should be the default for every project. The initial friction pays off tenfold in maintainability.",
    image: true,
    likes: 1203,
    comments: 187,
    reposts: 312,
    liked: true,
    bookmarked: false,
  },
  {
    id: 3,
    author: "Mika Tanaka",
    handle: "@mikatanaka",
    avatar: "MT",
    time: "5h",
    content:
      "Beautiful sunrise from my morning run today. Sometimes the best debugging happens away from the keyboard.",
    image: true,
    likes: 542,
    comments: 28,
    reposts: 15,
    liked: false,
    bookmarked: true,
  },
  {
    id: 4,
    author: "David Park",
    handle: "@davidpark",
    avatar: "DP",
    time: "8h",
    content:
      "TIL: You can use CSS container queries to create truly responsive components that adapt to their parent container, not just the viewport. Game changer for component libraries.",
    likes: 876,
    comments: 95,
    reposts: 203,
    liked: false,
    bookmarked: false,
  },
  {
    id: 5,
    author: "Lisa Wang",
    handle: "@lisawang",
    avatar: "LW",
    time: "12h",
    content:
      "Interviewing candidates this week. Reminder: your side projects matter more than your leetcode score. Show me what you built, not what you memorized.",
    likes: 3421,
    comments: 456,
    reposts: 891,
    liked: false,
    bookmarked: false,
  },
];

const trendingTopics = [
  { tag: "#DesignSystems", posts: "12.4K" },
  { tag: "#TypeScript", posts: "8.9K" },
  { tag: "#WebDev", posts: "45.2K" },
  { tag: "#OpenSource", posts: "6.1K" },
  { tag: "#ReactConf", posts: "3.8K" },
];

const suggestedUsers = [
  { name: "Emma Wilson", handle: "@emmawilson", avatar: "EW", bio: "UX Designer at Figma" },
  { name: "James Lee", handle: "@jameslee", avatar: "JL", bio: "Full-stack developer" },
  { name: "Priya Sharma", handle: "@priyasharma", avatar: "PS", bio: "DevRel at Vercel" },
];

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function SocialFeedTemplate() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, bookmarked: !p.bookmarked } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-lg font-bold text-blue-500">SocialKit</span>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              {[
                { icon: Home, label: "Home", active: true },
                { icon: Search, label: "Explore", active: false },
                { icon: Bell, label: "Notifications", active: false },
                { icon: MessageCircle, label: "Messages", active: false },
                { icon: Bookmark, label: "Bookmarks", active: false },
                { icon: Users, label: "Communities", active: false },
                { icon: User, label: "Profile", active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-left transition-colors ${
                    item.active
                      ? "font-bold text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 sticky top-0 h-screen border-r border-gray-200 bg-white p-4">
          <div className="mb-6 px-3">
            <span className="text-xl font-bold text-blue-500">SocialKit</span>
          </div>
          <nav className="flex-1 space-y-1">
            {[
              { icon: Home, label: "Home", active: true },
              { icon: Search, label: "Explore", active: false },
              { icon: Bell, label: "Notifications", active: false, badge: 3 },
              { icon: MessageCircle, label: "Messages", active: false },
              { icon: Bookmark, label: "Bookmarks", active: false },
              { icon: Users, label: "Communities", active: false },
              { icon: User, label: "Profile", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-left transition-colors ${
                  item.active
                    ? "font-bold text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  {"badge" in item && item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[15px]">{item.label}</span>
              </button>
            ))}
          </nav>
          <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors mt-4">
            New Post
          </button>
          <div className="mt-4 px-3 py-3 flex items-center gap-3 hover:bg-gray-100 rounded-full cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">You</div>
              <div className="text-xs text-gray-500 truncate">@yourhandle</div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 min-w-0 border-r border-gray-200 bg-white">
          {/* Compose */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                U
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What is happening?"
                  className="w-full resize-none border-none outline-none text-lg placeholder:text-gray-400 min-h-[60px] bg-transparent"
                  rows={2}
                />
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-1">
                    {[ImageIcon, Smile].map((Icon, i) => (
                      <button
                        key={i}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!newPost.trim()}
                    className="px-5 py-2 bg-blue-500 text-white font-bold text-sm rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div>
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-200 p-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="font-bold text-[15px] truncate">
                        {post.author}
                      </span>
                      <span className="text-gray-500 text-sm truncate">
                        {post.handle}
                      </span>
                      <span className="text-gray-400 text-sm shrink-0">
                        &middot; {post.time}
                      </span>
                      <button className="ml-auto p-1 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[15px] text-gray-900 leading-relaxed mb-3 whitespace-pre-wrap">
                      {post.content}
                    </p>
                    {post.image && (
                      <div className="mb-3 rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 h-48 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                    <div className="flex items-center justify-between max-w-md text-gray-500">
                      <button className="flex items-center gap-1.5 group">
                        <span className="p-2 rounded-full group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </span>
                        <span className="text-xs group-hover:text-blue-500">
                          {formatCount(post.comments)}
                        </span>
                      </button>
                      <button className="flex items-center gap-1.5 group">
                        <span className="p-2 rounded-full group-hover:bg-green-50 group-hover:text-green-500 transition-colors">
                          <Repeat2 className="w-4 h-4" />
                        </span>
                        <span className="text-xs group-hover:text-green-500">
                          {formatCount(post.reposts)}
                        </span>
                      </button>
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1.5 group"
                      >
                        <span
                          className={`p-2 rounded-full transition-colors ${
                            post.liked
                              ? "text-pink-500"
                              : "group-hover:bg-pink-50 group-hover:text-pink-500"
                          }`}
                        >
                          <Heart
                            className="w-4 h-4"
                            fill={post.liked ? "currentColor" : "none"}
                          />
                        </span>
                        <span
                          className={`text-xs ${
                            post.liked ? "text-pink-500" : "group-hover:text-pink-500"
                          }`}
                        >
                          {formatCount(post.likes)}
                        </span>
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleBookmark(post.id)}
                          className={`p-2 rounded-full transition-colors ${
                            post.bookmarked
                              ? "text-blue-500"
                              : "hover:bg-blue-50 hover:text-blue-500"
                          }`}
                        >
                          <Bookmark
                            className="w-4 h-4"
                            fill={post.bookmarked ? "currentColor" : "none"}
                          />
                        </button>
                        <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
                          <Share className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 shrink-0 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Trending */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <h2 className="text-xl font-bold px-4 pt-4 pb-2">Trending</h2>
            {trendingTopics.map((topic) => (
              <button
                key={topic.tag}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
                <div className="font-bold text-[15px]">{topic.tag}</div>
                <div className="text-xs text-gray-500">{topic.posts} posts</div>
              </button>
            ))}
          </div>

          {/* Suggested */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <h2 className="text-xl font-bold px-4 pt-4 pb-2">Who to follow</h2>
            {suggestedUsers.map((user) => (
              <div
                key={user.handle}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{user.name}</div>
                  <div className="text-xs text-gray-500 truncate">{user.bio}</div>
                </div>
                <button className="px-4 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full hover:bg-gray-700 transition-colors shrink-0">
                  Follow
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 text-xs text-gray-400 space-x-2">
            <span>Part of</span>
            <Link
              href="/templates"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              StyleKit Templates
            </Link>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 z-40">
        {[
          { icon: Home, label: "Home", active: true },
          { icon: Search, label: "Search", active: false },
          { icon: Bell, label: "Alerts", active: false },
          { icon: MessageCircle, label: "DMs", active: false },
        ].map((item) => (
          <button
            key={item.label}
            className={`p-3 rounded-full ${
              item.active ? "text-blue-500" : "text-gray-500"
            }`}
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </nav>

      {/* Mobile FAB */}
      <button
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-40"
        aria-label="New post"
      >
        <Plus className="w-6 h-6" />
      </button>
      <TemplateBackButton variant="social" />
    </div>
  );
}
