/**
 * Portfolio Template Definition
 */

import type { TemplateDefinition } from "../types";

export const portfolioTemplate: TemplateDefinition = {
  type: "portfolio",
  name: "作品集",
  nameEn: "Portfolio",
  description: "适合设计师、开发者、自由职业者展示个人作品的模板",
  sections: [
    {
      id: "hero",
      name: "个人介绍",
      nameEn: "Hero",
      description: "页面顶部的个人介绍区域",
      defaultEnabled: true,
      fields: [
        {
          id: "name",
          label: "姓名",
          labelEn: "Name",
          type: "text",
          defaultValue: "张三",
          placeholder: "输入你的名字",
        },
        {
          id: "title",
          label: "职业头衔",
          labelEn: "Title",
          type: "text",
          defaultValue: "全栈开发者 & UI 设计师",
          placeholder: "如：前端工程师、产品设计师",
        },
        {
          id: "bio",
          label: "简介",
          labelEn: "Bio",
          type: "textarea",
          defaultValue: "专注于创造美观、实用的数字产品。5年+ 设计与开发经验，热爱用代码和设计解决问题。",
          placeholder: "简短介绍自己",
        },
        {
          id: "ctaText",
          label: "按钮文字",
          labelEn: "CTA Button Text",
          type: "text",
          defaultValue: "查看作品",
          placeholder: "如：联系我、下载简历",
        },
      ],
    },
    {
      id: "projects",
      name: "作品展示",
      nameEn: "Projects",
      description: "展示你的代表作品",
      defaultEnabled: true,
      fields: [
        {
          id: "title",
          label: "区块标题",
          labelEn: "Section Title",
          type: "text",
          defaultValue: "精选作品",
          placeholder: "如：我的项目、作品集",
        },
        {
          id: "subtitle",
          label: "区块描述",
          labelEn: "Section Subtitle",
          type: "textarea",
          defaultValue: "这些是我近期完成的一些项目，涵盖网站设计、移动应用和品牌设计。",
          placeholder: "描述你的作品",
        },
        {
          id: "project1Title",
          label: "项目1标题",
          labelEn: "Project 1 Title",
          type: "text",
          defaultValue: "电商平台重设计",
          placeholder: "项目名称",
        },
        {
          id: "project1Desc",
          label: "项目1描述",
          labelEn: "Project 1 Description",
          type: "textarea",
          defaultValue: "为一家时尚电商平台进行全面的用户界面重设计，提升了30%的转化率。",
          placeholder: "项目详细描述",
        },
        {
          id: "project1Tag",
          label: "项目1标签",
          labelEn: "Project 1 Tag",
          type: "text",
          defaultValue: "UI/UX 设计",
          placeholder: "如：Web开发、品牌设计",
        },
        {
          id: "project2Title",
          label: "项目2标题",
          labelEn: "Project 2 Title",
          type: "text",
          defaultValue: "健身追踪 App",
          placeholder: "项目名称",
        },
        {
          id: "project2Desc",
          label: "项目2描述",
          labelEn: "Project 2 Description",
          type: "textarea",
          defaultValue: "从零开始设计和开发的健身追踪应用，支持运动记录、数据分析和社交功能。",
          placeholder: "项目详细描述",
        },
        {
          id: "project2Tag",
          label: "项目2标签",
          labelEn: "Project 2 Tag",
          type: "text",
          defaultValue: "移动应用",
          placeholder: "如：Web开发、品牌设计",
        },
        {
          id: "project3Title",
          label: "项目3标题",
          labelEn: "Project 3 Title",
          type: "text",
          defaultValue: "企业官网设计",
          placeholder: "项目名称",
        },
        {
          id: "project3Desc",
          label: "项目3描述",
          labelEn: "Project 3 Description",
          type: "textarea",
          defaultValue: "为科技创业公司设计的品牌官网，包含完整的视觉识别系统和响应式布局。",
          placeholder: "项目详细描述",
        },
        {
          id: "project3Tag",
          label: "项目3标签",
          labelEn: "Project 3 Tag",
          type: "text",
          defaultValue: "网站设计",
          placeholder: "如：Web开发、品牌设计",
        },
      ],
    },
    {
      id: "about",
      name: "关于我",
      nameEn: "About",
      description: "更详细的个人介绍",
      defaultEnabled: true,
      fields: [
        {
          id: "title",
          label: "区块标题",
          labelEn: "Section Title",
          type: "text",
          defaultValue: "关于我",
          placeholder: "如：个人简介",
        },
        {
          id: "description",
          label: "详细介绍",
          labelEn: "Description",
          type: "textarea",
          defaultValue: "我是一名热爱设计与技术的创作者。从2018年开始从事设计和开发工作，期间为多家初创公司和大型企业提供服务。我相信好的设计应该是美观与实用的完美结合。",
          placeholder: "详细介绍你的背景、经验和理念",
        },
        {
          id: "skill1",
          label: "技能1",
          labelEn: "Skill 1",
          type: "text",
          defaultValue: "UI/UX 设计",
          placeholder: "技能名称",
        },
        {
          id: "skill2",
          label: "技能2",
          labelEn: "Skill 2",
          type: "text",
          defaultValue: "前端开发",
          placeholder: "技能名称",
        },
        {
          id: "skill3",
          label: "技能3",
          labelEn: "Skill 3",
          type: "text",
          defaultValue: "品牌设计",
          placeholder: "技能名称",
        },
        {
          id: "skill4",
          label: "技能4",
          labelEn: "Skill 4",
          type: "text",
          defaultValue: "产品策略",
          placeholder: "技能名称",
        },
      ],
    },
    {
      id: "contact",
      name: "联系方式",
      nameEn: "Contact",
      description: "让访客可以联系你",
      defaultEnabled: true,
      fields: [
        {
          id: "title",
          label: "区块标题",
          labelEn: "Section Title",
          type: "text",
          defaultValue: "联系我",
          placeholder: "如：取得联系",
        },
        {
          id: "description",
          label: "描述",
          labelEn: "Description",
          type: "textarea",
          defaultValue: "有项目想要合作？或者只是想打个招呼？随时给我发邮件，我会尽快回复。",
          placeholder: "鼓励访客联系你",
        },
        {
          id: "email",
          label: "邮箱",
          labelEn: "Email",
          type: "text",
          defaultValue: "hello@example.com",
          placeholder: "你的邮箱地址",
        },
        {
          id: "buttonText",
          label: "按钮文字",
          labelEn: "Button Text",
          type: "text",
          defaultValue: "发送邮件",
          placeholder: "如：联系我、发消息",
        },
        {
          id: "socialLinks",
          label: "社交链接（逗号分隔）",
          labelEn: "Social Links (comma separated)",
          type: "text",
          defaultValue: "GitHub, Dribbble, LinkedIn, Twitter",
          placeholder: "如：GitHub, Twitter, LinkedIn",
        },
      ],
    },
  ],
};

/**
 * Generate HTML for portfolio hero section
 */
export function generatePortfolioHeroHtml(content: Record<string, string>): string {
  const name = content.name || "张三";
  const title = content.title || "全栈开发者";
  const bio = content.bio || "专注于创造美观、实用的数字产品。";
  const ctaText = content.ctaText || "查看作品";

  return `
  <section class="portfolio-hero">
    <div class="container">
      <div class="portfolio-hero-content">
        <div class="portfolio-avatar">
          <div class="avatar-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
        <p class="portfolio-greeting">你好，我是</p>
        <h1 class="portfolio-name">${name}</h1>
        <p class="portfolio-title">${title}</p>
        <p class="portfolio-bio">${bio}</p>
        <a href="#projects" class="btn btn-primary">${ctaText}</a>
      </div>
    </div>
  </section>
`;
}

/**
 * Generate HTML for portfolio projects section
 */
export function generatePortfolioProjectsHtml(content: Record<string, string>): string {
  const title = content.title || "精选作品";
  const subtitle = content.subtitle || "这些是我近期完成的一些项目。";

  const projects = [
    {
      title: content.project1Title || "项目一",
      desc: content.project1Desc || "项目描述",
      tag: content.project1Tag || "设计",
    },
    {
      title: content.project2Title || "项目二",
      desc: content.project2Desc || "项目描述",
      tag: content.project2Tag || "开发",
    },
    {
      title: content.project3Title || "项目三",
      desc: content.project3Desc || "项目描述",
      tag: content.project3Tag || "品牌",
    },
  ];

  const projectCards = projects
    .map(
      (p, i) => `
      <div class="project-card card">
        <div class="project-image" style="background: linear-gradient(135deg, var(--color-accent-${(i % 3) + 1}) 0%, var(--color-primary) 100%);">
          <span class="project-number">0${i + 1}</span>
        </div>
        <div class="project-info">
          <span class="project-tag">${p.tag}</span>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <a href="#" class="project-link">
            查看详情
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `
    )
    .join("\n");

  return `
  <section class="projects" id="projects">
    <div class="container">
      <div class="section-header text-center">
        <h2>${title}</h2>
        <p class="text-muted">${subtitle}</p>
      </div>
      <div class="projects-grid">
        ${projectCards}
      </div>
    </div>
  </section>
`;
}

/**
 * Generate HTML for portfolio about section
 */
export function generatePortfolioAboutHtml(content: Record<string, string>): string {
  const title = content.title || "关于我";
  const description = content.description || "我是一名热爱设计与技术的创作者。";

  const skills = [
    content.skill1 || "UI/UX 设计",
    content.skill2 || "前端开发",
    content.skill3 || "品牌设计",
    content.skill4 || "产品策略",
  ];

  const skillItems = skills
    .map(
      (skill) => `
      <div class="skill-item">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${skill}</span>
      </div>
    `
    )
    .join("\n");

  return `
  <section class="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-content">
          <h2>${title}</h2>
          <p class="about-description">${description}</p>
        </div>
        <div class="about-skills">
          <h3 class="skills-title">技能专长</h3>
          <div class="skills-list">
            ${skillItems}
          </div>
        </div>
      </div>
    </div>
  </section>
`;
}

/**
 * Generate HTML for portfolio contact section
 */
export function generatePortfolioContactHtml(content: Record<string, string>): string {
  const title = content.title || "联系我";
  const description = content.description || "有项目想要合作？随时给我发邮件。";
  const email = content.email || "hello@example.com";
  const buttonText = content.buttonText || "发送邮件";
  const socialLinksStr = content.socialLinks || "GitHub, Twitter, LinkedIn";
  const socialLinks = socialLinksStr.split(",").map((l) => l.trim());

  const socialIcons: Record<string, string> = {
    GitHub: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
    Dribbble: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32M8.56 2.75c4.37 6 6.56 12.3 7.13 19.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    LinkedIn: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
    Twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  };

  const socialButtons = socialLinks
    .map((link) => {
      const icon = socialIcons[link] || `<span>${link[0]}</span>`;
      return `<a href="#" class="social-link" title="${link}">${icon}</a>`;
    })
    .join("\n          ");

  return `
  <section class="contact">
    <div class="container">
      <div class="contact-content text-center">
        <h2>${title}</h2>
        <p class="text-muted">${description}</p>
        <a href="mailto:${email}" class="btn btn-primary">${buttonText}</a>
        <div class="social-links">
          ${socialButtons}
        </div>
      </div>
    </div>
  </section>
`;
}

/**
 * Generate CSS for portfolio template
 */
export function generatePortfolioCss(): string {
  return `
/* Portfolio Hero */
.portfolio-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, var(--color-secondary) 0%, var(--color-background) 100%);
}

.portfolio-hero-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.portfolio-avatar {
  margin-bottom: 2rem;
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: var(--color-secondary);
  border: 3px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.portfolio-greeting {
  font-size: var(--font-size-lg);
  color: var(--color-muted);
  margin-bottom: 0.5rem;
}

.portfolio-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 0.5rem;
  color: var(--color-foreground);
}

.portfolio-title {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.portfolio-bio {
  font-size: var(--font-size-lg);
  color: var(--color-muted);
  margin-bottom: 2rem;
  line-height: 1.7;
}

/* Projects Section */
.projects {
  background-color: var(--color-background);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-image {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.project-number {
  font-size: 4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
}

.project-info {
  padding: 1.5rem;
}

.project-tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  background-color: var(--color-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: var(--font-size-xl);
  margin-bottom: 0.5rem;
}

.project-desc {
  color: var(--color-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-primary);
}

.project-link:hover {
  text-decoration: none;
  gap: 0.75rem;
}

/* About Section */
.about {
  background-color: var(--color-secondary);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.about-content h2 {
  margin-bottom: 1.5rem;
}

.about-description {
  color: var(--color-muted);
  line-height: 1.8;
  font-size: var(--font-size-lg);
}

.skills-title {
  font-size: var(--font-size-lg);
  margin-bottom: 1.5rem;
}

.skills-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-foreground);
}

.skill-item svg {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* Contact Section */
.contact {
  background-color: var(--color-background);
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
}

.contact-content h2 {
  margin-bottom: 1rem;
}

.contact-content p {
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-secondary);
  color: var(--color-foreground);
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: var(--color-primary);
  color: var(--color-background);
  transform: translateY(-2px);
}
`;
}
