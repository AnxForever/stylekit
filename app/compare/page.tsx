import { CompareContent, type StyleDisplayData } from "@/components/compare/compare-content";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { styles } from "@/lib/styles";

// 在服务端预加载所有风格的展示数据
function getStylesDisplayData(): Record<string, StyleDisplayData> {
  const data: Record<string, StyleDisplayData> = {};

  for (const style of styles) {
    data[style.slug] = {
      slug: style.slug,
      name: style.name,
      colors: style.colors,
      doList: style.doList,
      dontList: style.dontList,
      philosophy: style.philosophy,
    };
  }

  return data;
}

export default function ComparePage() {
  // Server-side: 获取元数据和展示数据
  const stylesMeta = getAllStylesMeta();
  const stylesData = getStylesDisplayData();

  return <CompareContent stylesMeta={stylesMeta} stylesData={stylesData} />;
}
