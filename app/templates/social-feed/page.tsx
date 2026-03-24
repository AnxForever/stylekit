"use client";

export const dynamic = "force-static";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Bookmark,
  Calendar,
  Check,
  Edit3,
  Heart,
  Home,
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Repeat2,
  Search,
  Settings,
  Share,
  Smile,
  TrendingUp,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
type ViewType = "home" | "explore" | "notifications" | "bookmarks" | "profile";

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
  reposted: boolean;
}

interface Notification {
  id: number;
  type: "like" | "follow" | "repost" | "mention";
  user: string;
  avatar: string;
  content: string;
  time: string;
  read: boolean;
  postPreview?: string;
}

interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  following: number;
  followers: number;
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
    reposted: false,
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
    reposted: false,
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
    reposted: false,
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
    reposted: false,
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
    reposted: false,
  },
  {
    id: 6,
    author: "You",
    handle: "@yourhandle",
    avatar: "U",
    time: "1d",
    content:
      "Working on something exciting with the new React Server Components. The mental model shift is real but the DX improvements are worth it.",
    likes: 156,
    comments: 23,
    reposts: 31,
    liked: false,
    bookmarked: false,
    reposted: false,
  },
];

const trendingTopics = [
  { tag: "#DesignSystems", posts: "12.4K", category: "Technology" },
  { tag: "#TypeScript", posts: "8.9K", category: "Programming" },
  { tag: "#WebDev", posts: "45.2K", category: "Technology" },
  { tag: "#OpenSource", posts: "6.1K", category: "Community" },
  { tag: "#ReactConf", posts: "3.8K", category: "Events" },
  { tag: "#TailwindCSS", posts: "5.2K", category: "Programming" },
  { tag: "#Accessibility", posts: "2.1K", category: "Design" },
  { tag: "#DevOps", posts: "7.7K", category: "Engineering" },
];

const suggestedUsers = [
  { name: "Emma Wilson", handle: "@emmawilson", avatar: "EW", bio: "UX Designer at Figma" },
  { name: "James Lee", handle: "@jameslee", avatar: "JL", bio: "Full-stack developer" },
  { name: "Priya Sharma", handle: "@priyasharma", avatar: "PS", bio: "DevRel at Vercel" },
  { name: "Carlos Ruiz", handle: "@carlosruiz", avatar: "CR", bio: "Open source maintainer" },
  { name: "Nina Patel", handle: "@ninapatel", avatar: "NP", bio: "Frontend architect" },
];

const initialNotifications: Notification[] = [
  { id: 1, type: "like", user: "Sarah Chen", avatar: "SC", content: "liked your post", time: "2m", read: false, postPreview: "Working on something exciting with the new React Server Components..." },
  { id: 2, type: "follow", user: "Alex Rivera", avatar: "AR", content: "followed you", time: "15m", read: false },
  { id: 3, type: "repost", user: "Mika Tanaka", avatar: "MT", content: "reposted your post", time: "1h", read: false, postPreview: "Working on something exciting with the new React Server Components..." },
  { id: 4, type: "mention", user: "David Park", avatar: "DP", content: "mentioned you in a post", time: "3h", read: true, postPreview: "@yourhandle great thread on container queries, check this out..." },
  { id: 5, type: "like", user: "Lisa Wang", avatar: "LW", content: "liked your post", time: "5h", read: true, postPreview: "Working on something exciting with the new React Server Components..." },
  { id: 6, type: "follow", user: "Emma Wilson", avatar: "EW", content: "followed you", time: "8h", read: true },
  { id: 7, type: "like", user: "James Lee", avatar: "JL", content: "liked your post", time: "1d", read: true, postPreview: "Working on something exciting with the new React Server Components..." },
  { id: 8, type: "repost", user: "Priya Sharma", avatar: "PS", content: "reposted your post", time: "1d", read: true, postPreview: "Working on something exciting with the new React Server Components..." },
];

const initialProfile: UserProfile = {
  name: "You",
  handle: "@yourhandle",
  avatar: "U",
  bio: "Full-stack developer building beautiful interfaces. Open source enthusiast. Coffee addict.",
  location: "San Francisco, CA",
  website: "yoursite.dev",
  joinDate: "Joined March 2023",
  following: 342,
  followers: 1247,
};

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function getNotificationIcon(type: Notification["type"]) {
  switch (type) {
    case "like": return { icon: Heart, color: "text-pink-500", bg: "bg-pink-50" };
    case "follow": return { icon: UserPlus, color: "text-blue-500", bg: "bg-blue-50" };
    case "repost": return { icon: Repeat2, color: "text-green-500", bg: "bg-green-50" };
    case "mention": return { icon: MessageCircle, color: "text-blue-500", bg: "bg-blue-50" };
  }
}

export default function SocialFeedTemplate() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [exploreSearch, setExploreSearch] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(initialProfile);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const bookmarkedPosts = useMemo(
    () => posts.filter((p) => p.bookmarked),
    [posts]
  );

  const userPosts = useMemo(
    () => posts.filter((p) => p.handle === "@yourhandle"),
    [posts]
  );

  const filteredTrending = useMemo(() => {
    if (!exploreSearch.trim()) return trendingTopics;
    const q = exploreSearch.toLowerCase();
    return trendingTopics.filter(
      (t) => t.tag.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [exploreSearch]);

  const filteredSuggestedUsers = useMemo(() => {
    if (!exploreSearch.trim()) return suggestedUsers;
    const q = exploreSearch.toLowerCase();
    return suggestedUsers.filter(
      (u) => u.name.toLowerCase().includes(q) || u.bio.toLowerCase().includes(q)
    );
  }, [exploreSearch]);

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
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  const toggleRepost = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, reposted: !p.reposted, reposts: p.reposted ? p.reposts - 1 : p.reposts + 1 }
          : p
      )
    );
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now(),
      author: profile.name,
      handle: profile.handle,
      avatar: profile.avatar,
      time: "now",
      content: newPost.trim(),
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
      bookmarked: false,
      reposted: false,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost("");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleFollow = (handle: string) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) {
        next.delete(handle);
        setProfile((p) => ({ ...p, following: p.following - 1 }));
      } else {
        next.add(handle);
        setProfile((p) => ({ ...p, following: p.following + 1 }));
      }
      return next;
    });
  };

  const saveProfile = () => {
    setProfile(editForm);
    setEditProfileOpen(false);
  };

  const navigateTo = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  const navItems: Array<{
    icon: typeof Home;
    label: string;
    view: ViewType;
    badge?: number;
  }> = [
    { icon: Home, label: "Home", view: "home" },
    { icon: Search, label: "Explore", view: "explore" },
    { icon: Bell, label: "Notifications", view: "notifications", badge: unreadCount || undefined },
    { icon: Bookmark, label: "Bookmarks", view: "bookmarks" },
    { icon: User, label: "Profile", view: "profile" },
  ];

  const mobileNavItems: Array<{
    icon: typeof Home;
    label: string;
    view: ViewType;
  }> = [
    { icon: Home, label: "Home", view: "home" },
    { icon: Search, label: "Explore", view: "explore" },
    { icon: Bell, label: "Alerts", view: "notifications" },
    { icon: Bookmark, label: "Saved", view: "bookmarks" },
    { icon: User, label: "Me", view: "profile" },
  ];

  const renderPostCard = (post: Post) => (
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
            <span className="font-bold text-[15px] truncate">{post.author}</span>
            <span className="text-gray-500 text-sm truncate">{post.handle}</span>
            <span className="text-gray-400 text-sm shrink-0">&middot; {post.time}</span>
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
            <button
              onClick={() => toggleRepost(post.id)}
              className="flex items-center gap-1.5 group"
            >
              <span
                className={`p-2 rounded-full transition-colors ${
                  post.reposted
                    ? "text-green-500"
                    : "group-hover:bg-green-50 group-hover:text-green-500"
                }`}
              >
                <Repeat2 className="w-4 h-4" />
              </span>
              <span
                className={`text-xs ${
                  post.reposted ? "text-green-500" : "group-hover:text-green-500"
                }`}
              >
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
                <Heart className="w-4 h-4" fill={post.liked ? "currentColor" : "none"} />
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
                <Bookmark className="w-4 h-4" fill={post.bookmarked ? "currentColor" : "none"} />
              </button>
              <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  const renderHomeView = () => (
    <>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      <div className="border-b border-gray-200 p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {profile.avatar}
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
                onClick={handleNewPost}
                disabled={!newPost.trim()}
                className="px-5 py-2 bg-blue-500 text-white font-bold text-sm rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>{posts.map(renderPostCard)}</div>
    </>
  );

  const renderExploreView = () => (
    <>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-bold mb-3">Explore</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={exploreSearch}
            onChange={(e) => setExploreSearch(e.target.value)}
            placeholder="Search topics, people, and more"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {exploreSearch && (
            <button
              onClick={() => setExploreSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-gray-200">
        <h2 className="text-lg font-bold px-4 pt-4 pb-2">Trending topics</h2>
        {filteredTrending.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            No trending topics match your search.
          </div>
        ) : (
          filteredTrending.map((topic) => (
            <button
              key={topic.tag}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                <TrendingUp className="w-3 h-3" />
                {topic.category}
              </div>
              <div className="font-bold text-[15px]">{topic.tag}</div>
              <div className="text-xs text-gray-500">{topic.posts} posts</div>
            </button>
          ))
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold px-4 pt-4 pb-2">Suggested for you</h2>
        {filteredSuggestedUsers.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            No users match your search.
          </div>
        ) : (
          filteredSuggestedUsers.map((user) => (
            <div
              key={user.handle}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{user.name}</div>
                <div className="text-xs text-gray-500 truncate">{user.handle}</div>
                <div className="text-xs text-gray-600 mt-0.5">{user.bio}</div>
              </div>
              <button
                onClick={() => toggleFollow(user.handle)}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors shrink-0 ${
                  followedUsers.has(user.handle)
                    ? "bg-white text-gray-900 border border-gray-300 hover:border-red-300 hover:text-red-600"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                {followedUsers.has(user.handle) ? "Following" : "Follow"}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );

  const renderNotificationsView = () => (
    <>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Notifications</h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
          >
            <Check className="w-4 h-4" />
            Mark all read
          </button>
        )}
      </div>
      {notifications.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No notifications yet</p>
          <p className="text-gray-400 text-sm mt-1">
            When someone interacts with your posts, you will see it here.
          </p>
        </div>
      ) : (
        <div>
          {notifications.map((notification) => {
            const iconInfo = getNotificationIcon(notification.type);
            const IconComponent = iconInfo.icon;
            return (
              <button
                key={notification.id}
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n))
                  )
                }
                className={`w-full text-left flex gap-3 px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  !notification.read ? "bg-blue-50/30" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full ${iconInfo.bg} ${iconInfo.color} flex items-center justify-center shrink-0`}
                >
                  <IconComponent className="w-4 h-4" fill={notification.type === "like" ? "currentColor" : "none"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {notification.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px]">
                        <span className="font-bold">{notification.user}</span>{" "}
                        <span className="text-gray-600">{notification.content}</span>
                      </p>
                      {notification.postPreview && (
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {notification.postPreview}
                        </p>
                      )}
                      <span className="text-xs text-gray-400 mt-1 block">
                        {notification.time} ago
                      </span>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </>
  );

  const renderBookmarksView = () => (
    <>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <h1 className="text-xl font-bold">Bookmarks</h1>
        <p className="text-sm text-gray-500">{profile.handle}</p>
      </div>
      {bookmarkedPosts.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium text-lg">Save posts for later</p>
          <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
            Bookmark posts to easily find them again. Only you can see your bookmarks.
          </p>
        </div>
      ) : (
        <div>{bookmarkedPosts.map(renderPostCard)}</div>
      )}
    </>
  );

  const renderProfileView = () => (
    <>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => setActiveView("home")}
          className="p-1.5 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-xs text-gray-500">{userPosts.length} posts</p>
        </div>
      </div>

      {/* Banner */}
      <div className="h-36 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500" />

      {/* Avatar and edit button */}
      <div className="px-4 relative">
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-white -mt-10 relative z-10">
          {profile.avatar}
        </div>
        <button
          onClick={() => {
            setEditForm(profile);
            setEditProfileOpen(true);
          }}
          className="absolute top-3 right-4 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors"
        >
          Edit profile
        </button>
      </div>

      {/* Profile info */}
      <div className="px-4 pt-3 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-gray-500 text-sm">{profile.handle}</p>
        <p className="text-[15px] mt-2">{profile.bio}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
          {profile.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {profile.location}
            </span>
          )}
          {profile.website && (
            <span className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <span className="text-blue-500">{profile.website}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {profile.joinDate}
          </span>
        </div>
        <div className="flex gap-4 mt-3 text-sm">
          <span>
            <span className="font-bold">{formatCount(profile.following)}</span>{" "}
            <span className="text-gray-500">Following</span>
          </span>
          <span>
            <span className="font-bold">{formatCount(profile.followers)}</span>{" "}
            <span className="text-gray-500">Followers</span>
          </span>
        </div>
      </div>

      {/* User posts */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button className="flex-1 py-3 text-center text-sm font-bold border-b-2 border-blue-500 text-blue-500">
            Posts
          </button>
          <button className="flex-1 py-3 text-center text-sm text-gray-500 hover:bg-gray-50">
            Replies
          </button>
          <button className="flex-1 py-3 text-center text-sm text-gray-500 hover:bg-gray-50">
            Media
          </button>
          <button className="flex-1 py-3 text-center text-sm text-gray-500 hover:bg-gray-50">
            Likes
          </button>
        </div>
      </div>
      {userPosts.length === 0 ? (
        <div className="px-4 py-16 text-center">
          <Edit3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No posts yet</p>
          <p className="text-gray-400 text-sm mt-1">
            When you post, it will show up here.
          </p>
        </div>
      ) : (
        <div>{userPosts.map(renderPostCard)}</div>
      )}
    </>
  );

  const renderMainContent = () => {
    switch (activeView) {
      case "home": return renderHomeView();
      case "explore": return renderExploreView();
      case "notifications": return renderNotificationsView();
      case "bookmarks": return renderBookmarksView();
      case "profile": return renderProfileView();
    }
  };

  const showRightSidebar = activeView === "home" || activeView === "explore";

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
        <button
          onClick={() => navigateTo("profile")}
          className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold"
        >
          {profile.avatar}
        </button>
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
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.view)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-left transition-colors ${
                    activeView === item.view
                      ? "font-bold text-gray-900"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="relative">
                    <item.icon className="w-5 h-5" />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setEditProfileOpen(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-200 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setEditProfileOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold">Edit profile</h2>
              </div>
              <button
                onClick={saveProfile}
                className="px-4 py-1.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-700 transition-colors"
              >
                Save
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Website</label>
                <input
                  type="text"
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 sticky top-0 h-screen border-r border-gray-200 bg-white p-4">
          <div className="mb-6 px-3">
            <span className="text-xl font-bold text-blue-500">SocialKit</span>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.view)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-left transition-colors ${
                  activeView === item.view
                    ? "font-bold text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[15px]">{item.label}</span>
              </button>
            ))}
          </nav>
          <button
            onClick={() => {
              navigateTo("home");
              setTimeout(() => {
                const textarea = document.querySelector("textarea");
                textarea?.focus();
              }, 100);
            }}
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-colors mt-4"
          >
            New Post
          </button>
          <button
            onClick={() => navigateTo("profile")}
            className="mt-4 px-3 py-3 flex items-center gap-3 hover:bg-gray-100 rounded-full cursor-pointer w-full text-left"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {profile.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{profile.name}</div>
              <div className="text-xs text-gray-500 truncate">{profile.handle}</div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 border-r border-gray-200 bg-white min-h-screen">
          {renderMainContent()}
        </main>

        {/* Right Sidebar */}
        {showRightSidebar && (
          <aside className="hidden xl:block w-80 shrink-0 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
            {activeView !== "explore" && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            )}

            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <h2 className="text-xl font-bold px-4 pt-4 pb-2">Trending</h2>
              {trendingTopics.slice(0, 5).map((topic) => (
                <button
                  key={topic.tag}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {topic.category}
                  </div>
                  <div className="font-bold text-[15px]">{topic.tag}</div>
                  <div className="text-xs text-gray-500">{topic.posts} posts</div>
                </button>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <h2 className="text-xl font-bold px-4 pt-4 pb-2">Who to follow</h2>
              {suggestedUsers.slice(0, 3).map((user) => (
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
                  <button
                    onClick={() => toggleFollow(user.handle)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors shrink-0 ${
                      followedUsers.has(user.handle)
                        ? "bg-white text-gray-900 border border-gray-300 hover:border-red-300 hover:text-red-600"
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    }`}
                  >
                    {followedUsers.has(user.handle) ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>

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
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 z-40">
        {mobileNavItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigateTo(item.view)}
            className={`p-3 rounded-full relative ${
              activeView === item.view ? "text-blue-500" : "text-gray-500"
            }`}
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6" />
            {item.view === "notifications" && unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Mobile FAB */}
      {activeView === "home" && (
        <button
          className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-40"
          aria-label="New post"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
      <TemplateBackButton variant="social" />
    </div>
  );
}
