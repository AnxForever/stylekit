/**
 * Blog Template Definition
 */

import type { TemplateDefinition } from "../types";

export const blogTemplate: TemplateDefinition = {
  type: "blog",
  name: "博客",
  nameEn: "Blog",
  description: "适合个人博客、技术写作、内容创作者的博客模板",
  sections: [
    {
      id: "hero",
      name: "博客头部",
      nameEn: "Blog Header",
      description: "博客顶部的标题和作者介绍区域",
      defaultEnabled: true,
      fields: [
        {
          id: "blogName",
          label: "博客名称",
          labelEn: "Blog Name",
          type: "text",
          defaultValue: "我的博客",
          placeholder: "输入博客名称",
        },
        {
          id: "tagline",
          label: "标语",
          labelEn: "Tagline",
          type: "text",
          defaultValue: "分享技术与思考",
          placeholder: "输入博客标语",
        },
        {
          id: "authorName",
          label: "作者姓名",
          labelEn: "Author Name",
          type: "text",
          defaultValue: "作者",
          placeholder: "输入作者姓名",
        },
        {
          id: "authorBio",
          label: "作者简介",
          labelEn: "Author Bio",
          type: "textarea",
          defaultValue: "热爱技术与写作的开发者",
          placeholder: "简短介绍自己",
        },
      ],
    },
    {
      id: "posts",
      name: "文章列表",
      nameEn: "Posts",
      description: "展示最新的博客文章",
      defaultEnabled: true,
      fields: [
        {
          id: "sectionTitle",
          label: "区块标题",
          labelEn: "Section Title",
          type: "text",
          defaultValue: "最新文章",
          placeholder: "如：最新文章、近期更新",
        },
        {
          id: "post1Title",
          label: "文章1标题",
          labelEn: "Post 1 Title",
          type: "text",
          defaultValue: "开始使用 Next.js 构建现代 Web 应用",
          placeholder: "文章标题",
        },
        {
          id: "post1Excerpt",
          label: "文章1摘要",
          labelEn: "Post 1 Excerpt",
          type: "textarea",
          defaultValue: "Next.js 是一个强大的 React 框架，提供了服务端渲染、静态生成等特性，让构建现代 Web 应用变得更加简单高效。",
          placeholder: "文章摘要",
        },
        {
          id: "post1Date",
          label: "文章1日期",
          labelEn: "Post 1 Date",
          type: "text",
          defaultValue: "2024-01-15",
          placeholder: "如：2024-01-15",
        },
        {
          id: "post1Category",
          label: "文章1分类",
          labelEn: "Post 1 Category",
          type: "text",
          defaultValue: "前端开发",
          placeholder: "文章分类",
        },
        {
          id: "post2Title",
          label: "文章2标题",
          labelEn: "Post 2 Title",
          type: "text",
          defaultValue: "TypeScript 高级类型技巧",
          placeholder: "文章标题",
        },
        {
          id: "post2Excerpt",
          label: "文章2摘要",
          labelEn: "Post 2 Excerpt",
          type: "textarea",
          defaultValue: "深入探索 TypeScript 的高级类型系统，包括条件类型、映射类型和模板字面量类型的实际应用。",
          placeholder: "文章摘要",
        },
        {
          id: "post2Date",
          label: "文章2日期",
          labelEn: "Post 2 Date",
          type: "text",
          defaultValue: "2024-01-10",
          placeholder: "如：2024-01-10",
        },
        {
          id: "post2Category",
          label: "文章2分类",
          labelEn: "Post 2 Category",
          type: "text",
          defaultValue: "TypeScript",
          placeholder: "文章分类",
        },
        {
          id: "post3Title",
          label: "文章3标题",
          labelEn: "Post 3 Title",
          type: "text",
          defaultValue: "CSS Grid 布局完全指南",
          placeholder: "文章标题",
        },
        {
          id: "post3Excerpt",
          label: "文章3摘要",
          labelEn: "Post 3 Excerpt",
          type: "textarea",
          defaultValue: "CSS Grid 是现代 CSS 布局中最强大的工具之一，本文将带你从基础到高级全面掌握 Grid 布局。",
          placeholder: "文章摘要",
        },
        {
          id: "post3Date",
          label: "文章3日期",
          labelEn: "Post 3 Date",
          type: "text",
          defaultValue: "2024-01-05",
          placeholder: "如：2024-01-05",
        },
        {
          id: "post3Category",
          label: "文章3分类",
          labelEn: "Post 3 Category",
          type: "text",
          defaultValue: "CSS",
          placeholder: "文章分类",
        },
      ],
    },
    {
      id: "sidebar",
      name: "侧边栏",
      nameEn: "Sidebar",
      description: "博客侧边栏，包含关于、分类和标签",
      defaultEnabled: true,
      fields: [
        {
          id: "aboutTitle",
          label: "关于标题",
          labelEn: "About Title",
          type: "text",
          defaultValue: "关于",
          placeholder: "如：关于、简介",
        },
        {
          id: "aboutText",
          label: "关于内容",
          labelEn: "About Text",
          type: "textarea",
          defaultValue: "这是一个关于技术、设计和创造力的博客。在这里分享我的学习心得和实践经验。",
          placeholder: "简短介绍博客",
        },
        {
          id: "categories",
          label: "分类（逗号分隔）",
          labelEn: "Categories (comma separated)",
          type: "text",
          defaultValue: "前端开发, 后端技术, 设计思维, 工具推荐",
          placeholder: "如：前端, 后端, 设计",
        },
        {
          id: "tags",
          label: "标签（逗号分隔）",
          labelEn: "Tags (comma separated)",
          type: "text",
          defaultValue: "React, TypeScript, Next.js, CSS, Node.js, Design",
          placeholder: "如：React, Vue, CSS",
        },
      ],
    },
    {
      id: "footer",
      name: "页脚",
      nameEn: "Footer",
      description: "博客底部信息",
      defaultEnabled: true,
      fields: [
        {
          id: "copyright",
          label: "版权信息",
          labelEn: "Copyright",
          type: "text",
          defaultValue: "2024 My Blog. All rights reserved.",
          placeholder: "版权声明",
        },
        {
          id: "links",
          label: "链接（逗号分隔）",
          labelEn: "Links (comma separated)",
          type: "text",
          defaultValue: "首页, 归档, 关于, RSS",
          placeholder: "如：首页, 归档, 关于",
        },
      ],
    },
  ],
};

interface BlogPostEntry {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readMinutes: number;
}

function splitCommaList(value: string, fallback: string[]): string[] {
  const source = value.trim() ? value : fallback.join(", ");
  return source
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function estimateReadMinutes(text: string): number {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(wordCount / 95));
}

function formatDisplayDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value || "2026-01-01";
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function categoryVolumeForIndex(index: number): number {
  return Math.max(6, 24 - index * 4);
}

/**
 * Generate HTML for blog hero section
 */
export function generateBlogHeroHtml(content: Record<string, string>): string {
  const blogName = content.blogName || "我的博客";
  const tagline = content.tagline || "分享技术与思考";
  const authorName = content.authorName || "作者";
  const authorBio = content.authorBio || "热爱技术与写作的开发者";

  return `
  <section class="blog-hero">
    <div class="container">
      <div class="blog-hero-content">
        <h1 class="blog-name">${blogName}</h1>
        <p class="blog-tagline">${tagline}</p>
        <div class="blog-author">
          <div class="blog-author-avatar">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="blog-author-info">
            <span class="blog-author-name">${authorName}</span>
            <span class="blog-author-bio">${authorBio}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
`;
}

/**
 * Generate HTML for blog posts section
 */
export function generateBlogPostsHtml(content: Record<string, string>): string {
  const sectionTitle = content.sectionTitle || "Latest Posts";

  const posts: BlogPostEntry[] = [
    {
      title: content.post1Title || "Getting Started with Next.js for Modern Web Apps",
      excerpt: content.post1Excerpt || "Next.js gives teams a fast path to production with streaming, routing, and server rendering built in.",
      date: content.post1Date || "2026-03-15",
      category: content.post1Category || "Frontend",
      readMinutes: estimateReadMinutes(content.post1Excerpt || ""),
    },
    {
      title: content.post2Title || "TypeScript Patterns for Safer Product Code",
      excerpt: content.post2Excerpt || "Explore conditional types, utility helpers, and practical patterns to keep larger codebases maintainable.",
      date: content.post2Date || "2026-03-10",
      category: content.post2Category || "TypeScript",
      readMinutes: estimateReadMinutes(content.post2Excerpt || ""),
    },
    {
      title: content.post3Title || "CSS Grid Layouts That Scale",
      excerpt: content.post3Excerpt || "A practical guide for building editorial and dashboard layouts that stay resilient on any viewport.",
      date: content.post3Date || "2026-03-05",
      category: content.post3Category || "CSS",
      readMinutes: estimateReadMinutes(content.post3Excerpt || ""),
    },
  ].filter((post) => post.title.trim().length > 0);

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  const featuredPostHtml = featuredPost
    ? `
      <article class="blog-featured-post">
        <div class="blog-featured-head">
          <span class="blog-featured-label">Featured</span>
          <span class="blog-featured-date">${formatDisplayDate(featuredPost.date)}</span>
        </div>
        <h3 class="blog-featured-title"><a href="#">${featuredPost.title}</a></h3>
        <p class="blog-featured-excerpt">${featuredPost.excerpt}</p>
        <div class="blog-featured-foot">
          <span class="post-category">${featuredPost.category}</span>
          <span class="post-read-time">${featuredPost.readMinutes} min read</span>
        </div>
      </article>
    `
    : "";

  const postCards = regularPosts
    .map(
      (post) => `
      <article class="post-card">
        <div class="post-meta">
          <time class="post-date">${formatDisplayDate(post.date)}</time>
          <span class="post-category">${post.category}</span>
          <span class="post-read-time">${post.readMinutes} min read</span>
        </div>
        <h3 class="post-title"><a href="#">${post.title}</a></h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <a href="#" class="post-read-more">
          Read article
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </article>
    `
    )
    .join("\n");

  return `
  <div class="blog-posts">
    <div class="blog-section-head">
      <h2 class="blog-section-title">${sectionTitle}</h2>
      <span class="blog-section-pill">${posts.length} posts</span>
    </div>
    ${featuredPostHtml}
    <div class="blog-post-list">
      ${postCards}
    </div>
  </div>
`;
}

export function generateBlogSidebarHtml(content: Record<string, string>): string {
  const aboutTitle = content.aboutTitle || "About";
  const aboutText = content.aboutText || "Thoughtful writing on product engineering, design systems, and execution habits.";
  const categories = splitCommaList(content.categories || "", ["Frontend", "Backend", "Product", "Tooling"]);
  const tags = splitCommaList(content.tags || "", ["React", "TypeScript", "Next.js", "CSS", "Node.js", "Design"]);

  const categoryItems = categories
    .map(
      (category, index) => `
          <li class="sidebar-category-item">
            <a href="#">${category}</a>
            <span class="sidebar-category-count">${categoryVolumeForIndex(index)}</span>
          </li>
        `
    )
    .join("\n");

  const tagItems = tags
    .map((tag) => `<a href="#" class="sidebar-tag">${tag}</a>`)
    .join("\n            ");

  const pulseItems = tags
    .slice(0, 3)
    .map(
      (tag, index) => `
        <li class="sidebar-pulse-item">
          <span>${tag}</span>
          <span class="sidebar-pulse-score">${92 - index * 7}%</span>
        </li>
      `
    )
    .join("\n");

  return `
  <aside class="blog-sidebar">
    <div class="sidebar-section">
      <h3 class="sidebar-title">${aboutTitle}</h3>
      <p class="sidebar-about-text">${aboutText}</p>
    </div>
    <div class="sidebar-section">
      <h3 class="sidebar-title">Categories</h3>
      <ul class="sidebar-categories">
        ${categoryItems}
      </ul>
    </div>
    <div class="sidebar-section">
      <h3 class="sidebar-title">Tags</h3>
      <div class="sidebar-tags">
            ${tagItems}
      </div>
    </div>
    <div class="sidebar-section sidebar-pulse">
      <h3 class="sidebar-title">Topic pulse</h3>
      <ul class="sidebar-pulse-list">
        ${pulseItems}
      </ul>
    </div>
    <div class="sidebar-section sidebar-newsletter">
      <h3 class="sidebar-title">Weekly Brief</h3>
      <p class="sidebar-about-text">A concise weekly breakdown of what changed and what matters next.</p>
      <a href="#" class="sidebar-newsletter-link">Subscribe update</a>
    </div>
  </aside>
`;
}


/**
 * Generate HTML for blog footer section
 */
export function generateBlogFooterHtml(content: Record<string, string>): string {
  const copyright = content.copyright || "2024 My Blog. All rights reserved.";
  const linksStr = content.links || "首页, 归档, 关于, RSS";
  const links = splitCommaList(linksStr, ["Home", "Archive", "About", "RSS"]);

  const linkElements = links
    .map((link) => `<a href="#" class="footer-link">${link}</a>`)
    .join("\n          ");

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-links">
          ${linkElements}
        </div>
        <p class="footer-copyright text-muted">${copyright}</p>
      </div>
    </div>
  </footer>
`;
}

/**
 * Generate section-specific CSS for blog
 */
export function generateBlogCss(): string {
  return `
/* Blog Hero */
.blog-hero {
  padding: 4rem 0 3rem;
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background) 100%);
}

.blog-hero-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.blog-name {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0.5rem;
  color: var(--color-foreground);
}

.blog-tagline {
  font-size: var(--font-size-xl);
  color: var(--color-muted);
  margin-bottom: 2rem;
}

.blog-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.blog-author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  border: 2px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
}

.blog-author-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.blog-author-name {
  font-weight: 600;
  color: var(--color-foreground);
}

.blog-author-bio {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

/* Blog Layout */
.blog-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

@media (min-width: 768px) {
  .blog-layout {
    grid-template-columns: 1fr 300px;
  }
}

/* Blog Section Title */
.blog-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.blog-section-title {
  font-size: var(--font-size-2xl);
  margin: 0;
  color: var(--color-foreground);
}

.blog-section-pill {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-muted);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.65rem;
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.blog-featured-post {
  border: var(--border-width) solid var(--color-muted);
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
  padding: 1.25rem 1.25rem 1rem;
  margin-bottom: 2rem;
}

.blog-featured-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
}

.blog-featured-label {
  display: inline-flex;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-background);
  border-radius: var(--border-radius);
  padding: 0.2rem 0.55rem;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.blog-featured-date {
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.blog-featured-title {
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  line-height: 1.35;
  margin-bottom: 0.7rem;
}

.blog-featured-title a {
  text-decoration: none;
  color: var(--color-foreground);
}

.blog-featured-title a:hover {
  color: var(--color-primary);
}

.blog-featured-excerpt {
  color: var(--color-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.blog-featured-foot {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.blog-post-list {
  display: grid;
  gap: 1.4rem;
}

/* Post Cards */
.post-card {
  padding-bottom: 1.4rem;
  margin-bottom: 0;
  border-bottom: var(--border-width) solid var(--color-muted);
}

.post-card:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 0.75rem;
}

.post-date {
  font-size: var(--font-size-sm);
  color: var(--color-muted);
}

.post-category {
  display: inline-block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-primary);
  background-color: var(--color-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: var(--border-radius);
}

.post-read-time {
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.post-title {
  font-size: var(--font-size-xl);
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.post-title a {
  color: var(--color-foreground);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--color-primary);
}

.post-excerpt {
  color: var(--color-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.post-read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-primary);
}

.post-read-more:hover {
  text-decoration: none;
  gap: 0.75rem;
}

/* Blog Sidebar */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  padding: 1.5rem;
  background-color: var(--color-secondary);
  border-radius: var(--border-radius);
}

.sidebar-title {
  font-size: var(--font-size-lg);
  margin-bottom: 1rem;
  color: var(--color-foreground);
}

.sidebar-about-text {
  color: var(--color-muted);
  font-size: var(--font-size-sm);
  line-height: 1.7;
}

/* Sidebar Categories */
.sidebar-categories {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-category-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-muted);
}

.sidebar-category-item:last-child {
  border-bottom: none;
}

.sidebar-category-item a {
  color: var(--color-foreground);
  font-size: var(--font-size-sm);
  text-decoration: none;
}

.sidebar-category-item a:hover {
  color: var(--color-primary);
}

.sidebar-category-count {
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

/* Sidebar Tags */
.sidebar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.sidebar-tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  color: var(--color-foreground);
  background-color: var(--color-background);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: all 0.2s ease;
}

.sidebar-tag:hover {
  background-color: var(--color-primary);
  color: var(--color-background);
}

.sidebar-pulse-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.sidebar-pulse-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: var(--font-size-sm);
  color: var(--color-foreground);
}

.sidebar-pulse-score {
  font-size: var(--font-size-xs);
  color: var(--color-muted);
}

.sidebar-newsletter-link {
  display: inline-flex;
  margin-top: 0.9rem;
  text-decoration: none;
  color: var(--color-background);
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  padding: 0.45rem 0.8rem;
  font-size: var(--font-size-sm);
  transition: opacity 0.2s ease;
}

.sidebar-newsletter-link:hover {
  opacity: 0.9;
}

/* Footer */
.footer {
  padding: 2rem 0;
  border-top: var(--border-width) solid var(--color-muted);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-link {
  color: var(--color-muted);
  font-size: var(--font-size-sm);
}

.footer-link:hover {
  color: var(--color-foreground);
}

.footer-copyright {
  font-size: var(--font-size-sm);
}

@media (max-width: 640px) {
  .blog-section-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .blog-featured-post {
    padding: 1rem;
  }
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}
`;
}
