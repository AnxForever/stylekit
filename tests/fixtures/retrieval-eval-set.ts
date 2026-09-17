/**
 * Labelled evaluation set for the style retrieval pipeline.
 *
 * Design doc `docs/RAG_SEMANTIC_RETRIEVAL.md` section 5.1: at least 60
 * `query -> expected style slug` pairs across four types, each labelled with one
 * primary answer plus two acceptable alternates, where an alternate scores
 * partial credit rather than full.
 *
 * This is data, not code. `tests/unit/retrieval-eval.test.ts` checks the things
 * a hand-written label set gets wrong: a slug that does not exist, a count that
 * drifted below the target, a duplicated query, an alternate that is really the
 * primary, and the language claim on the cross-lingual entries.
 *
 * Ground rules followed when writing the entries:
 *
 *   - Every slug exists in `lib/styles/registry.ts` (148 styles at the time of
 *     writing) and was checked against the registry, never typed from memory.
 *   - Queries are phrased the way someone types into a search box, not as
 *     keyword dumps. The `zh-intent` group especially: those are the queries
 *     the current matcher fails outright, so they have to carry real phrasing.
 *   - `note` says why the primary is the right answer, in one line, so a later
 *     reader can re-judge the label instead of trusting it.
 *
 * On the alternates: they are not filler. Each one is a style a reasonable
 * designer could also have meant, which is exactly what makes partial credit
 * meaningful - if the alternates were obviously wrong, NDCG would collapse back
 * into Recall@1.
 *
 * The cross-lingual entries carry a machine-checkable claim, because "this
 * query is cross-lingual" is otherwise an assertion nobody can check. Each one
 * names the term the query leans on (`queryTerm`), the equivalent term in the
 * copy that actually holds the signal (`targetTerm`), and which copy that is
 * (`inLocale`). The tests verify the two halves that matter: the target term is
 * present in that copy, and the query's own term is absent from the copy
 * written in the query's language, so no same-language lexical route exists.
 *
 * Finding worth knowing before reading that group's numbers: this corpus is
 * bilingual and thorough, so a genuinely one-sided term is rare. "Chinese
 * question, English document" only happens in two shapes here:
 *
 *   - `semantic-bridge` (6 entries): a natural Chinese word that the target
 *     style's Chinese copy never uses, while the English copy carries its
 *     translation. Nothing lexical can connect them - only a shared vector
 *     space can, which is precisely the claim section 2.3 makes.
 *   - `mixed-script` (2 entries): a Chinese sentence with an English term in
 *     it. Note that the legacy tokenizer handles these fine, because Latin runs
 *     are delimited by spaces and the defect is specific to Chinese text. The
 *     label is still right; it just does not discriminate.
 *
 * The remaining two (`english-to-chinese`) go the other way: an English
 * question about concepts whose terminology is Chinese-only. They are the
 * weakest of the ten - the English copy is complete enough that an English
 * query can often still be answered lexically - and are labelled as such.
 */

export type EvalQueryType = "zh-intent" | "zh-term" | "en" | "cross-lingual";

export type CrossLingualKind = "semantic-bridge" | "mixed-script" | "english-to-chinese";

export interface CrossLingualClaim {
  kind: CrossLingualKind;
  /** The term the query leans on. Present in the query for the two Chinese kinds. */
  queryTerm: string;
  /** Its equivalent in the copy that holds the signal. */
  targetTerm: string;
  /** Which copy holds `targetTerm`; the query is written in the other language. */
  inLocale: "zh-CN" | "en-US";
}

export interface RetrievalEvalCase {
  /** Stable id, `{type}-{index}`; used in failure listings. */
  id: string;
  query: string;
  type: EvalQueryType;
  /** The one style that must be retrieved. */
  primary: string;
  /** Two acceptable alternatives, graded 0.5 each. */
  alternates: readonly [string, string];
  /** Why the primary is the right answer. */
  note: string;
  crossLingual?: CrossLingualClaim;
}

/** How many entries of each type the design doc calls for. */
export const EVAL_TYPE_TARGETS: Readonly<Record<EvalQueryType, number>> = {
  "zh-intent": 20,
  "zh-term": 15,
  en: 15,
  "cross-lingual": 10,
};

/**
 * Chinese colloquial intent: a sentence describing a need, with no term the
 * corpus happens to use verbatim. The group the legacy splitter scores 0 on.
 */
const ZH_INTENT: readonly RetrievalEvalCase[] = [
  {
    id: "zh-intent-01",
    query: "我要做金融后台，想要克制冷静一点",
    type: "zh-intent",
    primary: "swiss-style",
    // `stripe-style` replaces `data-dense` here. It is a fintech design language,
    // so "金融后台" reads to it at least as strongly as "克制冷静" reads to Swiss;
    // leaving it out scored a defensible top-ranked answer as a miss.
    alternates: ["stripe-style", "corporate-clean"],
    note: "瑞士国际主义的核心就是网格、无衬线、客观克制，金融后台这类信息密集场景是它的经典应用。备选取 stripe-style（金融科技设计语言，对「金融后台」指向同样强）与 corporate-clean；原先的 data-dense 描述的是信息密度而非行业，相关性弱一档。",
  },
  {
    id: "zh-intent-02",
    query: "深色夜景里的毛玻璃质感，安静高级那种",
    type: "zh-intent",
    primary: "glassmorphism",
    alternates: ["macos-vibrancy", "liquid-glass"],
    note: "glassmorphism 自述是「夜航质感的高级毛玻璃」，深墨夜景加高斯模糊正好对上。",
  },
  {
    id: "zh-intent-03",
    query: "想做个高端奢侈品的官网，要贵气",
    type: "zh-intent",
    primary: "luxury-retail",
    alternates: ["marble-luxury", "luxe-lookbook"],
    note: "luxury-retail 就是奢侈品牌零售场景：大留白、衬线字、金色与大理石质感。",
  },
  {
    id: "zh-intent-04",
    query: "数据特别密集的表格后台，一屏能看很多行",
    type: "zh-intent",
    primary: "data-dense",
    alternates: ["dashboard-layout", "corporate-clean"],
    note: "data-dense 的定义就是高密度后台，紧凑间距与小尺寸组件，优先展示数据表格。",
  },
  {
    id: "zh-intent-05",
    query: "像苹果官网那种感觉的产品落地页",
    type: "zh-intent",
    primary: "apple-style",
    alternates: ["launch-keynote", "liquid-glass"],
    note: "apple-style 的表述即「大量留白加精致圆角加 SF Pro 字感」，是苹果产品页的直译。",
  },
  {
    id: "zh-intent-06",
    query: "看起来很安静的日式极简，不要花哨",
    type: "zh-intent",
    primary: "wabi-sabi",
    alternates: ["japanese-fresh", "zen-garden"],
    note: "「安静加日式加极简」指向侘寂的极致留白与禅意；japanese-fresh 同样是日式极简，但更偏清新呼吸感，故列备选。",
  },
  {
    id: "zh-intent-07",
    query: "复古像素游戏那种界面",
    type: "zh-intent",
    primary: "pixel-art",
    alternates: ["pixel-anime", "arcade-crt"],
    note: "pixel-art 就是 8-bit 像素游戏风格，硬边阴影与像素化边框是它的本体。",
  },
  {
    id: "zh-intent-08",
    query: "像杂志排版那样有质感的版式",
    type: "zh-intent",
    primary: "editorial",
    alternates: ["magazine-grid", "parallax-editorial"],
    note: "editorial 是衬线标题加网格加留白的杂志排版本体；magazine-grid 更偏多栏内容布局。",
  },
  {
    id: "zh-intent-09",
    query: "水彩那种晕染开的柔和感觉",
    type: "zh-intent",
    primary: "watercolor-style",
    alternates: ["watercolor-art", "hand-drawn-doodle"],
    note: "晕染、柔和边缘、纸张质感三个特征都指向水彩；watercolor-art 是同族但更强调颜料池化。",
  },
  {
    id: "zh-intent-10",
    query: "像在笔记本上随手画出来的涂鸦感",
    type: "zh-intent",
    primary: "hand-drawn-doodle",
    alternates: ["sketch-style", "paper-craft"],
    note: "「笔记本加随手画加涂鸦」正是 hand-drawn-doodle 的定义：虚线、标记笔、胶带。",
  },
  {
    id: "zh-intent-11",
    query: "开发者工具那种很冷静的深色界面",
    type: "zh-intent",
    primary: "linear-style",
    alternates: ["dark-mode", "developer-terminal"],
    note: "Linear 风格即极简暗色加开发者审美；dark-mode 太泛，作备选。",
  },
  {
    id: "zh-intent-12",
    query: "想要日本庭园那种特别静的禅意",
    type: "zh-intent",
    primary: "zen-garden",
    alternates: ["wabi-sabi", "japanese-fresh"],
    note: "枯山水即砂纹、石组、苔藓的庭园美学，追求极致静谧与冥想感。",
  },
  {
    id: "zh-intent-13",
    query: "做给小朋友用的，要圆滚滚软软的",
    type: "zh-intent",
    primary: "claymorphism",
    alternates: ["kawaii-minimal", "soft-ui"],
    note: "超大圆角加内外阴影的粘土质感，描述里明确写了儿童应用与趣味产品。",
  },
  {
    id: "zh-intent-14",
    query: "像杂志封面一样，字特别大的大胆排版",
    type: "zh-intent",
    primary: "oversized-typography",
    alternates: ["swiss-poster", "kinetic-typography"],
    note: "视口级巨字充当 hero 和视觉主体，正是 oversized-typography 的定义。",
  },
  {
    id: "zh-intent-15",
    query: "80 年代霓虹灯和日落跑车的感觉",
    type: "zh-intent",
    primary: "outrun",
    alternates: ["synthwave", "vaporwave"],
    note: "outrun 的关键词就是日落、跑车、棕榈树、网格地平线；synthwave 是近亲但没有跑车这一层。",
  },
  {
    id: "zh-intent-16",
    query: "老式录像带的画质，有雪花噪点那种",
    type: "zh-intent",
    primary: "vhs-aesthetic",
    alternates: ["broadcast-glitch", "glitch-art"],
    note: "VHS 美学即色彩失真、扫描线噪点与信号故障；broadcast-glitch 更偏电视信号包装。",
  },
  {
    id: "zh-intent-17",
    query: "想做个摄影作品集，暗背景让照片说话",
    type: "zh-intent",
    primary: "gallery-dark",
    alternates: ["immersive-photo", "monochrome"],
    note: "近黑背景加全出血图片加排版退后，是 gallery-dark 的原话。",
  },
  {
    id: "zh-intent-18",
    query: "生鲜电商，看着要新鲜、让人放心",
    type: "zh-intent",
    primary: "fresh-market",
    alternates: ["shopify-clean", "natural-organic"],
    note: "fresh-market 就是食品生鲜与有机品牌的电商风格，暖色圆润卡片加自然纹理。",
  },
  {
    id: "zh-intent-19",
    query: "北欧家居品牌那种温暖简约的感觉",
    type: "zh-intent",
    primary: "scandinavian",
    alternates: ["warm-organic", "natural-organic"],
    note: "北欧极简加 Hygge 加木质色调，home 与家居品牌是它的目标场景。",
  },
  {
    id: "zh-intent-20",
    query: "像学术论文一样严谨工整的排版",
    type: "zh-intent",
    primary: "latex-paper",
    alternates: ["distill-style", "blueprint"],
    note: "LaTeX 论文排版：Computer Modern 字感、编号小节、定理环境，正是这份「严谨工整」。",
  },
];

/** Chinese style terminology: the short form a practitioner types. */
const ZH_TERM: readonly RetrievalEvalCase[] = [
  {
    id: "zh-term-01",
    query: "毛玻璃",
    type: "zh-term",
    primary: "glassmorphism",
    alternates: ["macos-vibrancy", "frutiger-aero"],
    note: "毛玻璃是 Glassmorphism 的中文通名；macos-vibrancy 的中文关键词里也直接写了毛玻璃，故为第一备选。",
  },
  {
    id: "zh-term-02",
    query: "液态玻璃",
    type: "zh-term",
    primary: "liquid-glass",
    alternates: ["glassmorphism", "macos-vibrancy"],
    note: "Apple Liquid Glass 的中文译名；该风格中文名写作「流动玻璃」，查询与文档用词不同但同指一物，这条也顺带测同义。",
  },
  {
    id: "zh-term-03",
    query: "瑞士国际主义",
    type: "zh-term",
    primary: "swiss-style",
    alternates: ["swiss-poster", "bauhaus"],
    note: "风格中文名即「瑞士国际风格」，是同一设计运动的网页版；swiss-poster 是它的海报分支。",
  },
  {
    id: "zh-term-04",
    query: "新粗野主义",
    type: "zh-term",
    primary: "neo-brutalist",
    alternates: ["brutalist-web", "anti-design"],
    note: "新粗野主义对应 Neo-Brutalist；brutalist-web 是 90 年代原始 HTML 那一支，不是同一个东西但常被混用。",
  },
  {
    id: "zh-term-05",
    query: "赛博朋克霓虹",
    type: "zh-term",
    primary: "cyberpunk-neon",
    alternates: ["neon-tokyo", "cyber-anime"],
    note: "风格中文名即「赛博朋克霓虹」；neon-tokyo 是真实都市夜景那一支，科幻感更弱。",
  },
  {
    id: "zh-term-06",
    query: "粘土拟态",
    type: "zh-term",
    primary: "claymorphism",
    alternates: ["neumorphism", "soft-ui"],
    note: "粘土拟态即 Claymorphism；neumorphism 同属拟态家族但走的是内凹外凸的浅色路线。",
  },
  {
    id: "zh-term-07",
    query: "包豪斯",
    type: "zh-term",
    primary: "bauhaus",
    alternates: ["constructivism", "swiss-style"],
    note: "包豪斯是风格名本体；构成主义与瑞士国际主义都从它派生，故作备选。",
  },
  {
    id: "zh-term-08",
    query: "孟菲斯风格",
    type: "zh-term",
    primary: "memphis",
    alternates: ["geometric-bold", "op-art"],
    note: "孟菲斯即 Memphis：80 年代意大利设计运动，撞色几何与不规则形状。",
  },
  {
    id: "zh-term-09",
    query: "蒸汽波",
    type: "zh-term",
    primary: "vaporwave",
    alternates: ["synthwave", "outrun"],
    note: "蒸汽波即 Vaporwave；风格描述里写明包含蒸汽波、合成波、赛博朋克三种变体，synthwave 是同族。",
  },
  {
    id: "zh-term-10",
    query: "新拟物",
    type: "zh-term",
    primary: "neumorphism",
    alternates: ["claymorphism", "soft-ui"],
    note: "新拟物即 Neumorphism：柔和双重阴影模拟光源，浅色背景同色系元素。",
  },
  {
    id: "zh-term-11",
    query: "侘寂",
    type: "zh-term",
    primary: "wabi-sabi",
    alternates: ["japanese-fresh", "zen-garden"],
    note: "侘寂即 Wabi-Sabi，风格名与关键词都含此词；另外两个是它影响下的日式分支。",
  },
  {
    id: "zh-term-12",
    query: "浮世绘",
    type: "zh-term",
    primary: "ukiyo-e-digital",
    alternates: ["cyber-wafuu", "neon-samurai"],
    note: "浮世绘木版画的数字化风格；后两个是传统纹样与科幻融合的日式分支。",
  },
  {
    id: "zh-term-13",
    query: "故障艺术",
    type: "zh-term",
    primary: "glitch-art",
    alternates: ["broadcast-glitch", "vhs-aesthetic"],
    note: "故障艺术即 Glitch Art：RGB 通道分离、扫描线、数据损坏块。",
  },
  {
    id: "zh-term-14",
    query: "欧普艺术",
    type: "zh-term",
    primary: "op-art",
    alternates: ["geometric-bold", "acid-graphics"],
    note: "欧普艺术即 Op Art：几何图案制造视觉幻象与运动感。",
  },
  {
    id: "zh-term-15",
    query: "蒸汽朋克",
    type: "zh-term",
    primary: "steampunk",
    alternates: ["mecha", "gothic"],
    note: "蒸汽朋克即 Steampunk：黄铜、齿轮、维多利亚工业机械；mecha 是机械美学的另一支。",
  },
];

/** English natural language, the control group the current matcher handles. */
const EN: readonly RetrievalEvalCase[] = [
  {
    id: "en-01",
    query: "clean apple-like landing page",
    type: "en",
    primary: "apple-style",
    alternates: ["launch-keynote", "minimalist-flat"],
    note: "apple-style 是苹果产品页语言本身；launch-keynote 是发布会揭幕那一支。",
  },
  {
    id: "en-02",
    query: "minimal dark ui for a developer tool",
    type: "en",
    primary: "linear-style",
    alternates: ["dark-mode", "developer-terminal"],
    note: "Linear 风格即极简暗色加开发者审美；developer-terminal 更强调终端隐喻，方向不同。",
  },
  {
    id: "en-03",
    query: "frosted glass panels over a dark night scene",
    type: "en",
    primary: "glassmorphism",
    alternates: ["macos-vibrancy", "frutiger-aero"],
    note: "frosted glass 加深夜底色是 glassmorphism 的自述场景；macos-vibrancy 是系统原生的同类。",
  },
  {
    id: "en-04",
    query: "swiss style grid poster with helvetica type",
    type: "en",
    primary: "swiss-style",
    alternates: ["swiss-poster", "bauhaus"],
    note: "helvetica 加网格加瑞士，指向瑞士国际主义；swiss-poster 是它的实验排印分支。",
  },
  {
    id: "en-05",
    query: "soft clay 3d shapes for a children app",
    type: "en",
    primary: "claymorphism",
    alternates: ["kawaii-minimal", "soft-ui"],
    note: "粘土质感加儿童应用正是 claymorphism 的定义。",
  },
  {
    id: "en-06",
    query: "retro 8-bit pixel game interface",
    type: "en",
    primary: "pixel-art",
    alternates: ["pixel-anime", "arcade-crt"],
    note: "8-bit 像素游戏界面即 pixel-art；arcade-crt 是街机显示器那一层质感。",
  },
  {
    id: "en-07",
    query: "magazine layout with serif headlines",
    type: "en",
    primary: "editorial",
    alternates: ["magazine-grid", "parallax-editorial"],
    note: "衬线标题加杂志排版即 editorial；magazine-grid 只借用了多栏网格。",
  },
  {
    id: "en-08",
    query: "dark gallery for a photography portfolio",
    type: "en",
    primary: "gallery-dark",
    alternates: ["immersive-photo", "monochrome"],
    note: "暗色画廊即 gallery-dark：近黑背景让全出血图片成为主角。",
  },
  {
    id: "en-09",
    query: "neon 80s sunset with palm trees",
    type: "en",
    primary: "outrun",
    alternates: ["synthwave", "vaporwave"],
    note: "日落、棕榈树、霓虹是 outrun 的关键词组合。",
  },
  {
    id: "en-10",
    query: "academic paper typography with numbered equations",
    type: "en",
    primary: "latex-paper",
    alternates: ["distill-style", "blueprint"],
    note: "LaTeX 论文排版：编号公式与定理环境是它区别于 distill-style 的特征。",
  },
  {
    id: "en-11",
    query: "raw 90s style website with system fonts",
    type: "en",
    primary: "brutalist-web",
    alternates: ["anti-design", "neo-brutalist"],
    note: "原始 HTML、系统字体、90 年代，是 brutalist-web 的定义；anti-design 是刻意的反规范实验。",
  },
  {
    id: "en-12",
    query: "earthy organic tones inspired by nature",
    type: "en",
    primary: "natural-organic",
    alternates: ["warm-organic", "terracotta"],
    note: "大地色系加自然纹理加手工感即 natural-organic；warm-organic 面向作品集场景。",
  },
  {
    id: "en-13",
    query: "high end fashion lookbook for a luxury house",
    type: "en",
    primary: "luxe-lookbook",
    alternates: ["luxury-retail", "marble-luxury"],
    note: "时装屋画册即 luxe-lookbook；luxury-retail 更偏零售卖场而不是画册。",
  },
  {
    id: "en-14",
    query: "admin panel with really dense data tables",
    type: "en",
    primary: "data-dense",
    alternates: ["dashboard-layout", "corporate-clean"],
    note: "高密度表格后台即 data-dense；dashboard-layout 是仪表盘骨架，信息密度更低。",
  },
  {
    id: "en-15",
    query: "drawn by hand with a pencil, notebook feel",
    type: "en",
    primary: "sketch-style",
    alternates: ["hand-drawn-doodle", "paper-craft"],
    note: "铅笔素描加纸张质感即 sketch-style；hand-drawn-doodle 更偏涂鸦与胶带装饰。",
  },
];

/**
 * Cross-lingual: the query and the copy holding the signal are in different
 * languages. Six Chinese queries whose decisive word never appears in the
 * target's Chinese copy, two Chinese sentences built around an English term,
 * and two English queries about Chinese-native concepts.
 */
const CROSS_LINGUAL: readonly RetrievalEvalCase[] = [
  {
    id: "cross-lingual-01",
    query: "电影里那种强对比的打光，光影特别戏剧化",
    type: "cross-lingual",
    primary: "film-noir",
    alternates: ["monochrome", "gallery-dark"],
    note: "「强对比」不出现在该风格的中文副本里，英文副本写的是 contrast；明暗对比加戏剧化光影是黑色电影的核心手法。",
    crossLingual: {
      kind: "semantic-bridge",
      queryTerm: "强对比",
      targetTerm: "contrast",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-02",
    query: "老式游戏屏幕那种余晖和发光感",
    type: "cross-lingual",
    primary: "arcade-crt",
    alternates: ["vhs-aesthetic", "broadcast-glitch"],
    note: "「余晖」不在中文副本里，英文副本写的是 glow；街机显示器的霓虹辉光正是这个意思。",
    crossLingual: {
      kind: "semantic-bridge",
      queryTerm: "余晖",
      targetTerm: "glow",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-03",
    query: "命令行那种提示符的调调",
    type: "cross-lingual",
    primary: "developer-terminal",
    alternates: ["github-style", "linear-style"],
    note: "「提示符」不在中文副本里，英文副本写的是 prompt；把网站做成一场终端会话是该风格的定义。",
    crossLingual: {
      kind: "semantic-bridge",
      queryTerm: "提示符",
      targetTerm: "prompt",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-04",
    query: "粗野一点，不要修饰的那种力量感",
    type: "cross-lingual",
    primary: "neo-brutalist",
    alternates: ["brutalist-web", "anti-design"],
    note: "「粗野」不在该风格的中文副本里（中文用的是「野兽派」），英文副本写的是 brutalist。",
    crossLingual: {
      kind: "semantic-bridge",
      queryTerm: "粗野",
      targetTerm: "brutalist",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-05",
    query: "代码高亮那种开发者文档的清爽感",
    type: "cross-lingual",
    primary: "github-style",
    alternates: ["developer-terminal", "notion-style"],
    note: "「高亮」不在该风格的中文副本里，英文副本写的是 highlighting；这指向 GitHub 的代码高亮与 Primer 体系。",
    crossLingual: {
      kind: "semantic-bridge",
      queryTerm: "高亮",
      targetTerm: "highlighting",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-06",
    query: "气泡和玻璃那种清新通透的年代感",
    type: "cross-lingual",
    primary: "frutiger-aero",
    alternates: ["y2k", "glassmorphism"],
    note: "「气泡」不在该风格的中文副本里，英文副本写的是 bubble；天空蓝加毛玻璃加自然元素是 Frutiger Aero 的配方。",
    crossLingual: {
      kind: "semantic-bridge",
      queryTerm: "气泡",
      targetTerm: "bubble",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-07",
    query: "fintech 那种精致专业的支付产品感",
    type: "cross-lingual",
    primary: "stripe-style",
    alternates: ["corporate-clean", "swiss-style"],
    note: "fintech 只出现在英文副本文里，中文副本没有这个词；Stripe 是金融科技风格的样板。",
    crossLingual: {
      kind: "mixed-script",
      queryTerm: "fintech",
      targetTerm: "fintech",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-08",
    query: "plasticine 那种软软圆圆的手感",
    type: "cross-lingual",
    primary: "claymorphism",
    alternates: ["kawaii-minimal", "soft-ui"],
    note: "plasticine 只在英文副本出现，中文侧写的是粘土；软、圆、可爱三个线索都指向粘土拟态。",
    crossLingual: {
      kind: "mixed-script",
      queryTerm: "plasticine",
      targetTerm: "plasticine",
      inLocale: "en-US",
    },
  },
  {
    id: "cross-lingual-09",
    query: "chinese ink brush painting with lots of empty space",
    type: "cross-lingual",
    primary: "ink-wash",
    alternates: ["wabi-sabi", "monochrome"],
    note: "水墨是中文副本的原生术语，英文副本不含这两个字；国画的水与墨即 ink-wash。",
    crossLingual: {
      kind: "english-to-chinese",
      queryTerm: "水墨",
      targetTerm: "水墨",
      inLocale: "zh-CN",
    },
  },
  {
    id: "cross-lingual-10",
    query: "quiet garden with raked patterns, stones and moss",
    type: "cross-lingual",
    primary: "zen-garden",
    alternates: ["wabi-sabi", "japanese-fresh"],
    note: "苔藓只出现在中文副本；砂纹加石组加苔藓正是枯山水的三件套。",
    crossLingual: {
      kind: "english-to-chinese",
      queryTerm: "苔藓",
      targetTerm: "苔藓",
      inLocale: "zh-CN",
    },
  },
];

export const RETRIEVAL_EVAL_SET: readonly RetrievalEvalCase[] = [
  ...ZH_INTENT,
  ...ZH_TERM,
  ...EN,
  ...CROSS_LINGUAL,
];

/** The four types in report order. */
export const EVAL_QUERY_TYPES: readonly EvalQueryType[] = [
  "zh-intent",
  "zh-term",
  "en",
  "cross-lingual",
];
