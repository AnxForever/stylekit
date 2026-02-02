// Knowledge Base - Icon Recommendations
// Data converted from icons.csv (Lucide React focus)

import type { IconEntry } from "./types";
import { BM25 } from "./search";

export const iconEntries: IconEntry[] = [
  // Navigation
  { category: "Navigation", name: "menu", keywords: ["hamburger", "menu", "navigation", "toggle", "bars"], library: "Lucide", importCode: "import { Menu } from 'lucide-react'", usage: "<Menu />", bestFor: "Mobile navigation drawer toggle sidebar", style: "Outline" },
  { category: "Navigation", name: "arrow-left", keywords: ["back", "previous", "return", "navigate"], library: "Lucide", importCode: "import { ArrowLeft } from 'lucide-react'", usage: "<ArrowLeft />", bestFor: "Back button breadcrumb navigation", style: "Outline" },
  { category: "Navigation", name: "arrow-right", keywords: ["next", "forward", "continue", "navigate"], library: "Lucide", importCode: "import { ArrowRight } from 'lucide-react'", usage: "<ArrowRight />", bestFor: "Forward button next step CTA", style: "Outline" },
  { category: "Navigation", name: "chevron-down", keywords: ["expand", "dropdown", "more", "collapse"], library: "Lucide", importCode: "import { ChevronDown } from 'lucide-react'", usage: "<ChevronDown />", bestFor: "Dropdown menus accordion expand", style: "Outline" },
  { category: "Navigation", name: "chevron-up", keywords: ["collapse", "less", "minimize"], library: "Lucide", importCode: "import { ChevronUp } from 'lucide-react'", usage: "<ChevronUp />", bestFor: "Collapse accordion minimize", style: "Outline" },
  { category: "Navigation", name: "home", keywords: ["home", "house", "main", "start"], library: "Lucide", importCode: "import { Home } from 'lucide-react'", usage: "<Home />", bestFor: "Home page link navigation", style: "Outline" },
  { category: "Navigation", name: "external-link", keywords: ["external", "link", "new-tab", "outside"], library: "Lucide", importCode: "import { ExternalLink } from 'lucide-react'", usage: "<ExternalLink />", bestFor: "External links new tab indicator", style: "Outline" },

  // Actions
  { category: "Action", name: "plus", keywords: ["add", "create", "new", "plus"], library: "Lucide", importCode: "import { Plus } from 'lucide-react'", usage: "<Plus />", bestFor: "Add new item create button", style: "Outline" },
  { category: "Action", name: "minus", keywords: ["remove", "subtract", "minus", "less"], library: "Lucide", importCode: "import { Minus } from 'lucide-react'", usage: "<Minus />", bestFor: "Remove decrease quantity", style: "Outline" },
  { category: "Action", name: "x", keywords: ["close", "cancel", "delete", "remove", "clear"], library: "Lucide", importCode: "import { X } from 'lucide-react'", usage: "<X />", bestFor: "Close modal dismiss notification", style: "Outline" },
  { category: "Action", name: "check", keywords: ["success", "done", "complete", "approve", "confirm"], library: "Lucide", importCode: "import { Check } from 'lucide-react'", usage: "<Check />", bestFor: "Success state checkbox confirmed", style: "Outline" },
  { category: "Action", name: "edit", keywords: ["edit", "pencil", "modify", "change"], library: "Lucide", importCode: "import { Pencil } from 'lucide-react'", usage: "<Pencil />", bestFor: "Edit mode modify content", style: "Outline" },
  { category: "Action", name: "trash", keywords: ["delete", "remove", "trash", "bin"], library: "Lucide", importCode: "import { Trash2 } from 'lucide-react'", usage: "<Trash2 />", bestFor: "Delete action remove item", style: "Outline" },
  { category: "Action", name: "copy", keywords: ["copy", "duplicate", "clipboard"], library: "Lucide", importCode: "import { Copy } from 'lucide-react'", usage: "<Copy />", bestFor: "Copy to clipboard duplicate", style: "Outline" },
  { category: "Action", name: "download", keywords: ["download", "save", "export"], library: "Lucide", importCode: "import { Download } from 'lucide-react'", usage: "<Download />", bestFor: "Download file save export", style: "Outline" },
  { category: "Action", name: "upload", keywords: ["upload", "import", "add-file"], library: "Lucide", importCode: "import { Upload } from 'lucide-react'", usage: "<Upload />", bestFor: "Upload file import content", style: "Outline" },
  { category: "Action", name: "search", keywords: ["search", "find", "magnify", "look"], library: "Lucide", importCode: "import { Search } from 'lucide-react'", usage: "<Search />", bestFor: "Search input find content", style: "Outline" },
  { category: "Action", name: "filter", keywords: ["filter", "sort", "refine"], library: "Lucide", importCode: "import { Filter } from 'lucide-react'", usage: "<Filter />", bestFor: "Filter results refine list", style: "Outline" },
  { category: "Action", name: "settings", keywords: ["settings", "gear", "config", "preferences"], library: "Lucide", importCode: "import { Settings } from 'lucide-react'", usage: "<Settings />", bestFor: "Settings page configuration", style: "Outline" },
  { category: "Action", name: "refresh", keywords: ["refresh", "reload", "sync", "update"], library: "Lucide", importCode: "import { RefreshCw } from 'lucide-react'", usage: "<RefreshCw />", bestFor: "Refresh data reload page", style: "Outline" },
  { category: "Action", name: "share", keywords: ["share", "send", "social"], library: "Lucide", importCode: "import { Share2 } from 'lucide-react'", usage: "<Share2 />", bestFor: "Share content social sharing", style: "Outline" },

  // Status
  { category: "Status", name: "check-circle", keywords: ["success", "complete", "approved", "valid"], library: "Lucide", importCode: "import { CheckCircle } from 'lucide-react'", usage: "<CheckCircle />", bestFor: "Success state completed valid", style: "Outline" },
  { category: "Status", name: "x-circle", keywords: ["error", "failed", "invalid", "rejected"], library: "Lucide", importCode: "import { XCircle } from 'lucide-react'", usage: "<XCircle />", bestFor: "Error state failed invalid", style: "Outline" },
  { category: "Status", name: "alert-circle", keywords: ["warning", "alert", "caution", "attention"], library: "Lucide", importCode: "import { AlertCircle } from 'lucide-react'", usage: "<AlertCircle />", bestFor: "Warning alert attention needed", style: "Outline" },
  { category: "Status", name: "info", keywords: ["info", "information", "help", "details"], library: "Lucide", importCode: "import { Info } from 'lucide-react'", usage: "<Info />", bestFor: "Information tooltip help", style: "Outline" },
  { category: "Status", name: "loader", keywords: ["loading", "spinner", "processing", "wait"], library: "Lucide", importCode: "import { Loader2 } from 'lucide-react'", usage: "<Loader2 className=\"animate-spin\" />", bestFor: "Loading state processing", style: "Outline" },
  { category: "Status", name: "clock", keywords: ["time", "clock", "pending", "wait", "schedule"], library: "Lucide", importCode: "import { Clock } from 'lucide-react'", usage: "<Clock />", bestFor: "Time pending schedule", style: "Outline" },

  // Communication
  { category: "Communication", name: "mail", keywords: ["email", "mail", "message", "inbox"], library: "Lucide", importCode: "import { Mail } from 'lucide-react'", usage: "<Mail />", bestFor: "Email contact inbox", style: "Outline" },
  { category: "Communication", name: "message-circle", keywords: ["chat", "message", "comment", "talk"], library: "Lucide", importCode: "import { MessageCircle } from 'lucide-react'", usage: "<MessageCircle />", bestFor: "Chat messages comments", style: "Outline" },
  { category: "Communication", name: "bell", keywords: ["notification", "alert", "bell", "reminder"], library: "Lucide", importCode: "import { Bell } from 'lucide-react'", usage: "<Bell />", bestFor: "Notifications alerts", style: "Outline" },
  { category: "Communication", name: "phone", keywords: ["phone", "call", "contact", "mobile"], library: "Lucide", importCode: "import { Phone } from 'lucide-react'", usage: "<Phone />", bestFor: "Phone contact call", style: "Outline" },
  { category: "Communication", name: "send", keywords: ["send", "submit", "dispatch"], library: "Lucide", importCode: "import { Send } from 'lucide-react'", usage: "<Send />", bestFor: "Send message submit", style: "Outline" },

  // User
  { category: "User", name: "user", keywords: ["user", "person", "account", "profile"], library: "Lucide", importCode: "import { User } from 'lucide-react'", usage: "<User />", bestFor: "User profile account", style: "Outline" },
  { category: "User", name: "users", keywords: ["users", "team", "group", "people"], library: "Lucide", importCode: "import { Users } from 'lucide-react'", usage: "<Users />", bestFor: "Team group multiple users", style: "Outline" },
  { category: "User", name: "log-in", keywords: ["login", "signin", "enter", "authenticate"], library: "Lucide", importCode: "import { LogIn } from 'lucide-react'", usage: "<LogIn />", bestFor: "Login sign in authenticate", style: "Outline" },
  { category: "User", name: "log-out", keywords: ["logout", "signout", "exit", "leave"], library: "Lucide", importCode: "import { LogOut } from 'lucide-react'", usage: "<LogOut />", bestFor: "Logout sign out exit", style: "Outline" },
  { category: "User", name: "user-plus", keywords: ["add-user", "invite", "register", "signup"], library: "Lucide", importCode: "import { UserPlus } from 'lucide-react'", usage: "<UserPlus />", bestFor: "Add user invite register", style: "Outline" },

  // Media
  { category: "Media", name: "image", keywords: ["image", "photo", "picture", "gallery"], library: "Lucide", importCode: "import { Image } from 'lucide-react'", usage: "<Image />", bestFor: "Image gallery photos", style: "Outline" },
  { category: "Media", name: "video", keywords: ["video", "movie", "play", "media"], library: "Lucide", importCode: "import { Video } from 'lucide-react'", usage: "<Video />", bestFor: "Video player media", style: "Outline" },
  { category: "Media", name: "play", keywords: ["play", "start", "video", "audio"], library: "Lucide", importCode: "import { Play } from 'lucide-react'", usage: "<Play />", bestFor: "Play button start media", style: "Outline" },
  { category: "Media", name: "pause", keywords: ["pause", "stop", "hold"], library: "Lucide", importCode: "import { Pause } from 'lucide-react'", usage: "<Pause />", bestFor: "Pause media stop", style: "Outline" },
  { category: "Media", name: "volume", keywords: ["volume", "sound", "audio", "speaker"], library: "Lucide", importCode: "import { Volume2 } from 'lucide-react'", usage: "<Volume2 />", bestFor: "Volume control audio", style: "Outline" },

  // Commerce
  { category: "Commerce", name: "shopping-cart", keywords: ["cart", "shopping", "basket", "buy"], library: "Lucide", importCode: "import { ShoppingCart } from 'lucide-react'", usage: "<ShoppingCart />", bestFor: "Shopping cart e-commerce", style: "Outline" },
  { category: "Commerce", name: "credit-card", keywords: ["payment", "card", "credit", "checkout"], library: "Lucide", importCode: "import { CreditCard } from 'lucide-react'", usage: "<CreditCard />", bestFor: "Payment checkout credit card", style: "Outline" },
  { category: "Commerce", name: "dollar-sign", keywords: ["money", "price", "cost", "currency"], library: "Lucide", importCode: "import { DollarSign } from 'lucide-react'", usage: "<DollarSign />", bestFor: "Price money currency", style: "Outline" },
  { category: "Commerce", name: "tag", keywords: ["tag", "label", "price", "discount"], library: "Lucide", importCode: "import { Tag } from 'lucide-react'", usage: "<Tag />", bestFor: "Tag label discount", style: "Outline" },
  { category: "Commerce", name: "gift", keywords: ["gift", "present", "reward", "bonus"], library: "Lucide", importCode: "import { Gift } from 'lucide-react'", usage: "<Gift />", bestFor: "Gift rewards promotions", style: "Outline" },
  { category: "Commerce", name: "package", keywords: ["package", "box", "shipping", "delivery"], library: "Lucide", importCode: "import { Package } from 'lucide-react'", usage: "<Package />", bestFor: "Package shipping order", style: "Outline" },

  // Data
  { category: "Data", name: "bar-chart", keywords: ["chart", "analytics", "stats", "data"], library: "Lucide", importCode: "import { BarChart3 } from 'lucide-react'", usage: "<BarChart3 />", bestFor: "Analytics charts statistics", style: "Outline" },
  { category: "Data", name: "pie-chart", keywords: ["pie", "chart", "percentage", "distribution"], library: "Lucide", importCode: "import { PieChart } from 'lucide-react'", usage: "<PieChart />", bestFor: "Pie chart distribution", style: "Outline" },
  { category: "Data", name: "trending-up", keywords: ["trending", "growth", "increase", "up"], library: "Lucide", importCode: "import { TrendingUp } from 'lucide-react'", usage: "<TrendingUp />", bestFor: "Growth positive trend", style: "Outline" },
  { category: "Data", name: "trending-down", keywords: ["declining", "decrease", "down", "loss"], library: "Lucide", importCode: "import { TrendingDown } from 'lucide-react'", usage: "<TrendingDown />", bestFor: "Decline negative trend", style: "Outline" },
  { category: "Data", name: "database", keywords: ["database", "storage", "data", "records"], library: "Lucide", importCode: "import { Database } from 'lucide-react'", usage: "<Database />", bestFor: "Database storage backend", style: "Outline" },

  // Files
  { category: "Files", name: "file", keywords: ["file", "document", "page"], library: "Lucide", importCode: "import { File } from 'lucide-react'", usage: "<File />", bestFor: "File document generic", style: "Outline" },
  { category: "Files", name: "file-text", keywords: ["document", "text", "article", "content"], library: "Lucide", importCode: "import { FileText } from 'lucide-react'", usage: "<FileText />", bestFor: "Text document article", style: "Outline" },
  { category: "Files", name: "folder", keywords: ["folder", "directory", "organize"], library: "Lucide", importCode: "import { Folder } from 'lucide-react'", usage: "<Folder />", bestFor: "Folder organization", style: "Outline" },
  { category: "Files", name: "folder-open", keywords: ["folder", "open", "expanded"], library: "Lucide", importCode: "import { FolderOpen } from 'lucide-react'", usage: "<FolderOpen />", bestFor: "Open folder expanded", style: "Outline" },
  { category: "Files", name: "archive", keywords: ["archive", "zip", "compress"], library: "Lucide", importCode: "import { Archive } from 'lucide-react'", usage: "<Archive />", bestFor: "Archive compressed files", style: "Outline" },

  // Layout
  { category: "Layout", name: "layout-grid", keywords: ["grid", "layout", "cards", "tiles"], library: "Lucide", importCode: "import { LayoutGrid } from 'lucide-react'", usage: "<LayoutGrid />", bestFor: "Grid view card layout", style: "Outline" },
  { category: "Layout", name: "layout-list", keywords: ["list", "layout", "rows", "table"], library: "Lucide", importCode: "import { LayoutList } from 'lucide-react'", usage: "<LayoutList />", bestFor: "List view row layout", style: "Outline" },
  { category: "Layout", name: "columns", keywords: ["columns", "split", "divide"], library: "Lucide", importCode: "import { Columns } from 'lucide-react'", usage: "<Columns />", bestFor: "Column layout split view", style: "Outline" },
  { category: "Layout", name: "sidebar", keywords: ["sidebar", "panel", "drawer"], library: "Lucide", importCode: "import { PanelLeft } from 'lucide-react'", usage: "<PanelLeft />", bestFor: "Sidebar panel toggle", style: "Outline" },
  { category: "Layout", name: "maximize", keywords: ["maximize", "fullscreen", "expand"], library: "Lucide", importCode: "import { Maximize2 } from 'lucide-react'", usage: "<Maximize2 />", bestFor: "Fullscreen maximize expand", style: "Outline" },
  { category: "Layout", name: "minimize", keywords: ["minimize", "shrink", "reduce"], library: "Lucide", importCode: "import { Minimize2 } from 'lucide-react'", usage: "<Minimize2 />", bestFor: "Minimize shrink reduce", style: "Outline" },

  // Social
  { category: "Social", name: "heart", keywords: ["heart", "like", "favorite", "love"], library: "Lucide", importCode: "import { Heart } from 'lucide-react'", usage: "<Heart />", bestFor: "Like favorite love", style: "Outline" },
  { category: "Social", name: "star", keywords: ["star", "rating", "favorite", "bookmark"], library: "Lucide", importCode: "import { Star } from 'lucide-react'", usage: "<Star />", bestFor: "Rating favorite bookmark", style: "Outline" },
  { category: "Social", name: "thumbs-up", keywords: ["like", "approve", "positive", "good"], library: "Lucide", importCode: "import { ThumbsUp } from 'lucide-react'", usage: "<ThumbsUp />", bestFor: "Like approve upvote", style: "Outline" },
  { category: "Social", name: "thumbs-down", keywords: ["dislike", "reject", "negative", "bad"], library: "Lucide", importCode: "import { ThumbsDown } from 'lucide-react'", usage: "<ThumbsDown />", bestFor: "Dislike reject downvote", style: "Outline" },
  { category: "Social", name: "bookmark", keywords: ["bookmark", "save", "later", "mark"], library: "Lucide", importCode: "import { Bookmark } from 'lucide-react'", usage: "<Bookmark />", bestFor: "Save bookmark later", style: "Outline" },

  // Security
  { category: "Security", name: "lock", keywords: ["lock", "secure", "private", "protected"], library: "Lucide", importCode: "import { Lock } from 'lucide-react'", usage: "<Lock />", bestFor: "Locked secure private", style: "Outline" },
  { category: "Security", name: "unlock", keywords: ["unlock", "open", "public", "accessible"], library: "Lucide", importCode: "import { Unlock } from 'lucide-react'", usage: "<Unlock />", bestFor: "Unlocked open public", style: "Outline" },
  { category: "Security", name: "shield", keywords: ["shield", "security", "protection", "safe"], library: "Lucide", importCode: "import { Shield } from 'lucide-react'", usage: "<Shield />", bestFor: "Security protection safe", style: "Outline" },
  { category: "Security", name: "key", keywords: ["key", "password", "access", "credential"], library: "Lucide", importCode: "import { Key } from 'lucide-react'", usage: "<Key />", bestFor: "Password access API key", style: "Outline" },
  { category: "Security", name: "eye", keywords: ["eye", "view", "visible", "show"], library: "Lucide", importCode: "import { Eye } from 'lucide-react'", usage: "<Eye />", bestFor: "Show password visible view", style: "Outline" },
  { category: "Security", name: "eye-off", keywords: ["eye-off", "hide", "hidden", "invisible"], library: "Lucide", importCode: "import { EyeOff } from 'lucide-react'", usage: "<EyeOff />", bestFor: "Hide password hidden", style: "Outline" },

  // Development
  { category: "Development", name: "code", keywords: ["code", "programming", "developer", "syntax"], library: "Lucide", importCode: "import { Code } from 'lucide-react'", usage: "<Code />", bestFor: "Code programming syntax", style: "Outline" },
  { category: "Development", name: "terminal", keywords: ["terminal", "console", "command", "cli"], library: "Lucide", importCode: "import { Terminal } from 'lucide-react'", usage: "<Terminal />", bestFor: "Terminal console CLI", style: "Outline" },
  { category: "Development", name: "git-branch", keywords: ["git", "branch", "version", "control"], library: "Lucide", importCode: "import { GitBranch } from 'lucide-react'", usage: "<GitBranch />", bestFor: "Git branch version control", style: "Outline" },
  { category: "Development", name: "bug", keywords: ["bug", "error", "issue", "debug"], library: "Lucide", importCode: "import { Bug } from 'lucide-react'", usage: "<Bug />", bestFor: "Bug report debug issue", style: "Outline" },
  { category: "Development", name: "zap", keywords: ["zap", "lightning", "fast", "instant", "action"], library: "Lucide", importCode: "import { Zap } from 'lucide-react'", usage: "<Zap />", bestFor: "Quick action fast instant", style: "Outline" },
  { category: "Development", name: "sparkles", keywords: ["sparkles", "ai", "magic", "new", "feature"], library: "Lucide", importCode: "import { Sparkles } from 'lucide-react'", usage: "<Sparkles />", bestFor: "AI feature magic new", style: "Outline" },
  { category: "Development", name: "rocket", keywords: ["rocket", "launch", "deploy", "fast"], library: "Lucide", importCode: "import { Rocket } from 'lucide-react'", usage: "<Rocket />", bestFor: "Launch deploy ship", style: "Outline" },

  // Misc
  { category: "Misc", name: "sun", keywords: ["sun", "light", "day", "bright"], library: "Lucide", importCode: "import { Sun } from 'lucide-react'", usage: "<Sun />", bestFor: "Light mode theme toggle", style: "Outline" },
  { category: "Misc", name: "moon", keywords: ["moon", "dark", "night", "theme"], library: "Lucide", importCode: "import { Moon } from 'lucide-react'", usage: "<Moon />", bestFor: "Dark mode theme toggle", style: "Outline" },
  { category: "Misc", name: "globe", keywords: ["globe", "world", "international", "language"], library: "Lucide", importCode: "import { Globe } from 'lucide-react'", usage: "<Globe />", bestFor: "Language globe international", style: "Outline" },
  { category: "Misc", name: "map-pin", keywords: ["location", "pin", "map", "place"], library: "Lucide", importCode: "import { MapPin } from 'lucide-react'", usage: "<MapPin />", bestFor: "Location pin map", style: "Outline" },
  { category: "Misc", name: "calendar", keywords: ["calendar", "date", "schedule", "event"], library: "Lucide", importCode: "import { Calendar } from 'lucide-react'", usage: "<Calendar />", bestFor: "Date picker calendar", style: "Outline" },
  { category: "Misc", name: "link", keywords: ["link", "url", "chain", "connect"], library: "Lucide", importCode: "import { Link } from 'lucide-react'", usage: "<Link />", bestFor: "Link URL connection", style: "Outline" },
  { category: "Misc", name: "help-circle", keywords: ["help", "question", "faq", "support"], library: "Lucide", importCode: "import { HelpCircle } from 'lucide-react'", usage: "<HelpCircle />", bestFor: "Help FAQ support", style: "Outline" },
  { category: "Misc", name: "more-horizontal", keywords: ["more", "menu", "options", "ellipsis"], library: "Lucide", importCode: "import { MoreHorizontal } from 'lucide-react'", usage: "<MoreHorizontal />", bestFor: "More options menu kebab", style: "Outline" },
  { category: "Misc", name: "more-vertical", keywords: ["more", "menu", "options", "dots"], library: "Lucide", importCode: "import { MoreVertical } from 'lucide-react'", usage: "<MoreVertical />", bestFor: "More options vertical menu", style: "Outline" },
];

// Pre-built BM25 index for icon search
let iconSearchIndex: BM25<IconEntry> | null = null;

function getIconSearchIndex(): BM25<IconEntry> {
  if (!iconSearchIndex) {
    iconSearchIndex = new BM25(
      iconEntries,
      (i) => `${i.category} ${i.name} ${i.keywords.join(" ")} ${i.bestFor}`
    );
  }
  return iconSearchIndex;
}

/**
 * Search icons by query
 */
export function searchIcons(query: string, maxResults = 10): IconEntry[] {
  return getIconSearchIndex().search(query, maxResults);
}

/**
 * Get icon by name
 */
export function getIconByName(name: string): IconEntry | undefined {
  const nameLower = name.toLowerCase();
  return iconEntries.find((i) => i.name.toLowerCase() === nameLower);
}

/**
 * Get icons by category
 */
export function getIconsByCategory(category: string): IconEntry[] {
  const categoryLower = category.toLowerCase();
  return iconEntries.filter(
    (i) => i.category.toLowerCase() === categoryLower
  );
}

/**
 * Get all icons
 */
export function getAllIcons(): IconEntry[] {
  return iconEntries;
}

/**
 * Get all icon categories
 */
export function getIconCategories(): string[] {
  return [...new Set(iconEntries.map((i) => i.category))];
}
