/**
 * Landing Page Template Definition
 */

import type { TemplateDefinition } from "../types";

export const landingTemplate: TemplateDefinition = {
  type: "landing",
  name: "着陆页",
  nameEn: "Landing Page",
  description: "适合产品展示、SaaS、创业公司的单页着陆页模板",
  sections: [
    {
      id: "hero",
      name: "英雄区",
      nameEn: "Hero",
      description: "页面顶部的主要展示区域",
      defaultEnabled: true,
      fields: [
        {
          id: "headline",
          label: "主标题",
          labelEn: "Headline",
          type: "text",
          defaultValue: "构建更好的产品",
          placeholder: "输入吸引眼球的主标题",
        },
        {
          id: "subheadline",
          label: "副标题",
          labelEn: "Subheadline",
          type: "textarea",
          defaultValue: "我们帮助团队更快地将想法变为现实，用更少的资源创造更大的价值。",
          placeholder: "简短描述你的产品价值",
        },
        {
          id: "ctaText",
          label: "主按钮文字",
          labelEn: "CTA Button Text",
          type: "text",
          defaultValue: "立即开始",
          placeholder: "如：免费试用、了解更多",
        },
        {
          id: "ctaSecondaryText",
          label: "次按钮文字",
          labelEn: "Secondary Button Text",
          type: "text",
          defaultValue: "观看演示",
          placeholder: "如：了解更多、联系我们",
        },
      ],
    },
    {
      id: "features",
      name: "功能特性",
      nameEn: "Features",
      description: "展示产品的核心功能",
      defaultEnabled: true,
      fields: [
        {
          id: "title",
          label: "区块标题",
          labelEn: "Section Title",
          type: "text",
          defaultValue: "核心功能",
          placeholder: "如：为什么选择我们",
        },
        {
          id: "subtitle",
          label: "区块描述",
          labelEn: "Section Subtitle",
          type: "textarea",
          defaultValue: "我们提供全面的解决方案，帮助你的业务更上一层楼。",
          placeholder: "简短描述这个区块",
        },
        {
          id: "feature1Title",
          label: "功能1标题",
          labelEn: "Feature 1 Title",
          type: "text",
          defaultValue: "快速部署",
          placeholder: "功能名称",
        },
        {
          id: "feature1Desc",
          label: "功能1描述",
          labelEn: "Feature 1 Description",
          type: "textarea",
          defaultValue: "一键部署到云端，无需复杂配置，几分钟内即可上线。",
          placeholder: "功能详细描述",
        },
        {
          id: "feature2Title",
          label: "功能2标题",
          labelEn: "Feature 2 Title",
          type: "text",
          defaultValue: "安全可靠",
          placeholder: "功能名称",
        },
        {
          id: "feature2Desc",
          label: "功能2描述",
          labelEn: "Feature 2 Description",
          type: "textarea",
          defaultValue: "企业级安全标准，数据加密存储，7x24小时监控保护。",
          placeholder: "功能详细描述",
        },
        {
          id: "feature3Title",
          label: "功能3标题",
          labelEn: "Feature 3 Title",
          type: "text",
          defaultValue: "灵活扩展",
          placeholder: "功能名称",
        },
        {
          id: "feature3Desc",
          label: "功能3描述",
          labelEn: "Feature 3 Description",
          type: "textarea",
          defaultValue: "根据业务需求弹性扩容，按需付费，不浪费任何资源。",
          placeholder: "功能详细描述",
        },
      ],
    },
    {
      id: "cta",
      name: "行动召唤",
      nameEn: "Call to Action",
      description: "促进用户转化的区域",
      defaultEnabled: true,
      fields: [
        {
          id: "title",
          label: "标题",
          labelEn: "Title",
          type: "text",
          defaultValue: "准备好开始了吗？",
          placeholder: "吸引用户行动的标题",
        },
        {
          id: "description",
          label: "描述",
          labelEn: "Description",
          type: "textarea",
          defaultValue: "加入数千家已经在使用我们产品的企业，开启你的成功之旅。",
          placeholder: "鼓励用户采取行动",
        },
        {
          id: "buttonText",
          label: "按钮文字",
          labelEn: "Button Text",
          type: "text",
          defaultValue: "免费注册",
          placeholder: "如：开始使用、联系销售",
        },
      ],
    },
    {
      id: "footer",
      name: "页脚",
      nameEn: "Footer",
      description: "页面底部信息",
      defaultEnabled: true,
      fields: [
        {
          id: "copyright",
          label: "版权信息",
          labelEn: "Copyright",
          type: "text",
          defaultValue: "2024 Your Company. All rights reserved.",
          placeholder: "版权声明",
        },
        {
          id: "links",
          label: "链接（逗号分隔）",
          labelEn: "Links (comma separated)",
          type: "text",
          defaultValue: "关于我们, 服务条款, 隐私政策, 联系我们",
          placeholder: "如：关于, 博客, 联系",
        },
      ],
    },
  ],
};

/**
 * Generate HTML for hero section
 */
export function generateHeroHtml(content: Record<string, string>): string {
  const headline = content.headline || "构建更好的产品";
  const subheadline = content.subheadline || "我们帮助团队更快地将想法变为现实。";
  const ctaText = content.ctaText || "立即开始";
  const ctaSecondaryText = content.ctaSecondaryText || "了解更多";

  return `
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">${headline}</h1>
        <p class="hero-subtitle">${subheadline}</p>
        <div class="hero-buttons">
          <a href="#" class="btn btn-primary">${ctaText}</a>
          <a href="#" class="btn btn-outline">${ctaSecondaryText}</a>
        </div>
      </div>
    </div>
  </section>
`;
}

/**
 * Generate HTML for features section
 */
export function generateFeaturesHtml(content: Record<string, string>): string {
  const title = content.title || "核心功能";
  const subtitle = content.subtitle || "我们提供全面的解决方案。";

  const features = [
    { title: content.feature1Title || "快速部署", desc: content.feature1Desc || "一键部署到云端。" },
    { title: content.feature2Title || "安全可靠", desc: content.feature2Desc || "企业级安全标准。" },
    { title: content.feature3Title || "灵活扩展", desc: content.feature3Desc || "按需弹性扩容。" },
  ];

  const featureCards = features
    .map(
      (f) => `
      <div class="feature-card card">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 class="feature-title">${f.title}</h3>
        <p class="feature-desc">${f.desc}</p>
      </div>
    `
    )
    .join("\n");

  return `
  <section class="features">
    <div class="container">
      <div class="section-header text-center">
        <h2>${title}</h2>
        <p class="text-muted">${subtitle}</p>
      </div>
      <div class="features-grid">
        ${featureCards}
      </div>
    </div>
  </section>
`;
}

/**
 * Generate HTML for CTA section
 */
export function generateCtaHtml(content: Record<string, string>): string {
  const title = content.title || "准备好开始了吗？";
  const description = content.description || "加入数千家企业，开启你的成功之旅。";
  const buttonText = content.buttonText || "免费注册";

  return `
  <section class="cta">
    <div class="container">
      <div class="cta-content text-center">
        <h2>${title}</h2>
        <p class="text-muted">${description}</p>
        <a href="#" class="btn btn-primary">${buttonText}</a>
      </div>
    </div>
  </section>
`;
}

/**
 * Generate HTML for footer section
 */
export function generateFooterHtml(content: Record<string, string>): string {
  const copyright = content.copyright || "2024 Your Company. All rights reserved.";
  const linksStr = content.links || "关于我们, 服务条款, 隐私政策";
  const links = linksStr.split(",").map((l) => l.trim());

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
 * Generate section-specific CSS for landing page
 */
export function generateLandingCss(): string {
  return `
/* Hero Section */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background) 100%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1.5rem;
  color: var(--color-foreground);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Features Section */
.features {
  background-color: var(--color-background);
}

.section-header {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.section-header h2 {
  margin-bottom: 1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-background);
  border-radius: 50%;
}

.feature-title {
  font-size: var(--font-size-xl);
  margin-bottom: 0.5rem;
}

.feature-desc {
  color: var(--color-muted);
  line-height: 1.6;
}

/* CTA Section */
.cta {
  background-color: var(--color-secondary);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  margin-bottom: 1rem;
}

.cta-content p {
  margin-bottom: 2rem;
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

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}
`;
}
