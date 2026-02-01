import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <p className="masthead text-lg mb-4">StyleKit</p>
            <p className="text-sm text-muted leading-relaxed">
              精选 Web 设计风格集合，<br />
              让 AI 生成的网站更加美观。
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              导航
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/styles"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                风格目录
              </Link>
              <Link
                href="/about"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                关于项目
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              资源
            </p>
            <nav className="flex flex-col gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                GitHub 仓库
              </a>
              <a
                href="#"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                提交风格
              </a>
            </nav>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>© 2025 StyleKit. 开源项目。</p>
          <p>
            用{" "}
            <span className="font-serif italic">杂志排版</span>{" "}
            风格构建
          </p>
        </div>
      </div>
    </footer>
  );
}
