import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const projects = [
  {
    id: "01",
    title: "品牌视觉系统",
    category: "Brand Identity",
    year: "2025",
    color: "bg-[#ff3366]",
  },
  {
    id: "02",
    title: "电商平台重构",
    category: "Web Design",
    year: "2025",
    color: "bg-[#00d4aa]",
  },
  {
    id: "03",
    title: "移动端理财 App",
    category: "UI/UX Design",
    year: "2024",
    color: "bg-[#ffcc00]",
  },
  {
    id: "04",
    title: "数据可视化大屏",
    category: "Data Visualization",
    year: "2024",
    color: "bg-black",
  },
  {
    id: "05",
    title: "SaaS 管理后台",
    category: "Product Design",
    year: "2024",
    color: "bg-[#ff3366]",
  },
  {
    id: "06",
    title: "艺术展览网站",
    category: "Web Design",
    year: "2023",
    color: "bg-[#00d4aa]",
  },
];

const skills = [
  "UI Design",
  "UX Research",
  "Prototyping",
  "Design Systems",
  "Typography",
  "Motion Design",
  "Front-end Dev",
  "Figma",
];

export default function MinimalistPortfolioTemplate() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-5 flex items-center justify-between">
          <Link href="/templates/minimalist-portfolio" className="text-lg font-bold tracking-tight">
            PORTFOLIO
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#work" className="hover:text-[#ff3366] transition-colors duration-200">Work</a>
            <a href="#about" className="hover:text-[#ff3366] transition-colors duration-200">About</a>
            <a href="#contact" className="hover:text-[#ff3366] transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-gray-500 mb-6 tracking-widest uppercase">Digital Designer</p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            设计，<br />
            化繁<span className="text-[#ff3366]">为简</span>。
          </h1>
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="text-base md:text-lg text-gray-500 max-w-md leading-relaxed">
              专注于极简主义设计理念。用最少的元素传达最大的信息量。每个像素都有存在的理由。
            </p>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white border-2 border-black font-medium text-sm hover:bg-white hover:text-black transition-colors duration-200"
            >
              查看作品
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-medium text-gray-500 mb-10 tracking-widest uppercase">Selected Work</p>

          <div className="space-y-0">
            {projects.map((project) => (
              <a
                key={project.id}
                href="#"
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b-2 border-black hover:bg-black hover:text-white transition-colors duration-200 px-4 -mx-4"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-400 w-8">
                    {project.id}
                  </span>
                  <div className={`w-12 h-12 ${project.color} group-hover:scale-110 transition-transform duration-200`} />
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight">{project.title}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 mt-1">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 ml-14 md:ml-0">
                  <span className="text-sm text-gray-500 group-hover:text-gray-400">{project.year}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-black text-white border-y-2 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-6 tracking-widest uppercase">About</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                关于我
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  10 年设计经验，曾服务于多家知名科技公司。
                  专注于用户界面设计和设计系统构建，追求极致简约的设计哲学。
                </p>
                <p>
                  相信好的设计应该是隐形的——用户不需要思考如何使用，
                  一切都应该自然而然。去掉所有多余的装饰，留下纯粹的功能。
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-6 tracking-widest uppercase">Skills</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 border-2 border-white text-sm font-medium hover:bg-white hover:text-black transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">10+</div>
                  <div className="text-sm text-gray-500 mt-1">年经验</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">80+</div>
                  <div className="text-sm text-gray-500 mt-1">项目</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">30+</div>
                  <div className="text-sm text-gray-500 mt-1">客户</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-gray-500 mb-6 tracking-widest uppercase">Contact</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              一起创造<br />
              些什么？
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-2">姓名</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="你的名字"
                  className="w-full border-0 border-b-2 border-black bg-transparent py-3 text-base focus:outline-none focus:border-[#ff3366] transition-colors duration-200 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">邮箱</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full border-0 border-b-2 border-black bg-transparent py-3 text-base focus:outline-none focus:border-[#ff3366] transition-colors duration-200 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-2">项目描述</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="简要描述你的项目..."
                  className="w-full border-0 border-b-2 border-black bg-transparent py-3 text-base focus:outline-none focus:border-[#ff3366] transition-colors duration-200 placeholder:text-gray-400 resize-none"
                />
              </div>
              <button className="px-8 py-3 bg-black text-white border-2 border-black font-medium text-sm hover:bg-white hover:text-black transition-colors duration-200">
                发送消息
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black py-8 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Copyright 2025 Portfolio · Part of{" "}
            <Link href="/templates" className="text-black hover:text-[#ff3366] transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-black transition-colors">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">Dribbble</a>
            <a href="#" className="text-gray-500 hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton />
    </div>
  );
}
