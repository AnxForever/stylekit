# 设计科学（学术设计理论）科普系列调研

日期：2026-07-05
背景：为 /learn 前端百科规划"设计科学"学术科普章节组。用户点名三个主题：
Kano Model（狩野模型）、Russell's Circumplex Model（情感环形模型）、
Semantic Differential（语义差异法）。本文档是调研成果汇总，供后续写作使用。

## 一、赛道与差异化

竞品形式：

- lawsofux.com（30 条目）：一句话定义 + Takeaways + Origins + Further Reading。
  可扫读性强，但纯静态、浅、无演示。
- growth.design：47 个漫画式 case study + 106 条心理学原则库。叙事强但不成体系。
- NN/g / interaction-design.org：学术长文，权威但零交互。

核心结论：英文赛道"静态词条"与"叙事案例"均已被做绝，但**体系化交互式设计科学百科两边都空**；
中文侧 Semantic Differential 与 Circumplex（设计视角）近乎零优质科普，
Kano 已被写烂（woshipm 数十篇），必须靠交互化 + 收录学术批评做增量。
StyleKit 独有杠杆：把理论与 130+ 风格库互相索引，所有竞品都不具备。

中文覆盖度：

| 覆盖度 | 主题 |
|---|---|
| 写烂 | Kano、Norman 三层次、SUS、情感化设计泛谈 |
| 有译无原创 | Laws of UX 全系、MAYA、Aesthetic-Usability |
| 近乎空白（机会） | Semantic Differential、Russell Circumplex（设计向）、Processing Fluency、Berlyne 倒 U、Birkhoff、AttrakDiff/UEQ |

## 二、系列规划建议（8 章，三批）

教学主线："测量感受 → 定位情绪 → 解释审美 → 支撑决策"，
承接已有六章"怎么做"之后回答"为什么、如何验证"。

- 第一批（P0）：1. Semantic Differential（方法论地基，与风格库联动最强）
  2. Russell Circumplex（可视化潜力第一） 3. Kano Model（决策模型，证明系列广度）
- 第二批（P1）：4. Aesthetic-Usability Effect 5. Processing Fluency
  6. MAYA × Berlyne 倒 U（合章"新奇与熟悉"）
- 第三批（P2）：7. Fitts × Hick（趣味补全） 8. Birkhoff M=O/C 或 SUS 计算器
- Norman 三层次不独立成章（已写烂），折入 Circumplex 章引言。

## 三、Semantic Differential（语义差异法）笔记

起源：Osgood, Suci & Tannenbaum (1957)《The Measurement of Meaning》。
双极形容词 7 点量表测概念的内涵意义；因子分析反复浮现三大因子 EPA：
Evaluation（评价）、Potency（力量）、Activity（活动性），跨 23 文化稳定
（Atlas of Affective Meanings；Heise 2014 再确认，E/P 高度一致，A 稍弱）。

方法要点：词对须真双极且与概念相关，典型 8-15 对，每因子至少 3-4 对；
正反向随机翻转防直线作答，分析前重编码；经典呈现是 profile 折线
（多概念叠加对比），现代常用雷达图；数据严格说是 ordinal。

Kansei Engineering（感性工学）：Nagamachi（长町三生）1970s 创立，
流程 = 感性词汇收集 → SD 量表评产品样本 → 设计要素拆解 → 统计映射
（Quantification Theory Type I / 回归 / 神经网络）。已核实案例：
Mazda MX-5「人马一体 Jinba Ittai」零级概念树状拆解到物理规格。
Web 应用：Lokman & Nagamachi 2009 对 163 个电商网站用 40 词 + 5 点 SD + PCA。

网页美学量表（SD 的现代后裔）：

- Lavie & Tractinsky 2004：classical aesthetics（clean/clear/pleasant）vs
  expressive aesthetics（creative/original/fascinating）双因子。
- VisAWI（Moshagen & Thielsch 2010）：Simplicity / Diversity / Colorfulness /
  Craftsmanship 四因子 18 条目，有 4 条目短版 VisAWI-S。
- Lindgaard et al. 2006：网页截图闪现 50ms 即形成稳定美感判断。

局限：concept-scale interaction（同一词对在不同概念上含义漂移）、
bipolarity 假设可疑、中点多义、量表间不可比、跨语言需等值检验。

给 130+ 风格建"性格画像"的可行性：学术先例充分（产品语义学、
Aaker 1997 品牌人格五维）。正确姿势：统一 8-12 词对全库通用、
统一截图刺激物、多人评分取均值报告离散度；130+ 全量评分用
balanced incomplete block design 防疲劳；作者自评须标注区别于社区聚合。
重要发现可产品化：设计师与用户的 SD 感知显著不一致（IJIE 2000 电话造型研究）。

交互组件点子：拖 SD 滑杆生成画像折线做最近邻猜风格；两风格 profile 叠加对比；
社区打分聚合 vs 官方画像；50ms 闪测小游戏。

关键来源：
- 原书: https://archive.org/details/measurementofmea00osgo
- Wikipedia: https://en.wikipedia.org/wiki/Semantic_differential
- Kansei: https://en.wikipedia.org/wiki/Kansei_engineering ;
  MX-5 开发者亲述 SAE 2003-01-0125: https://doi.org/10.4271/2003-01-0125
- Lavie & Tractinsky: https://www.ise.bgu.ac.il/faculty/noam/papers/04_tl_nt_ijhcs.pdf
- VisAWI: http://www.thielsch.org/download/VisAWI/VisAWI_English.pdf
- Lindgaard 50ms: https://www.tandfonline.com/doi/abs/10.1080/01449290500330448
- Aaker 品牌人格: https://journals.sagepub.com/doi/10.1177/002224379703400304

## 四、Russell Circumplex Model（情感环形模型）笔记

起源：Russell (1980) "A Circumplex Model of Affect", JPSP 39(6), 1161-1178。
情绪不是离散类别，而在 valence（愉悦度）× arousal（唤醒度）二维空间呈环形分布。
28 个情绪形容词，八锚点按 45 度间隔：pleasure(0) / excitement(45) / arousal(90) /
distress(135) / displeasure(180) / depression(225) / sleepiness(270) / relaxation(315)。
方法：circular ordering + MDS（stress 值二维处现肘点）+ PCA 四法收敛。

理论谱系：PAD（Mehrabian & Russell 1974，多 dominance 维）；
core affect（Russell 2003）；与 Ekman basic emotions 的 dimensional vs
categorical 论战（Russell 1994 批评 forced-choice 方法，1995 退守
minimal universality；Russell & Barrett 1999 承认环形只刻画 core affect，
性质不同的情绪可占同一坐标）。

设计应用实证：

- Valdez & Mehrabian (1994)：Pleasure = .69B + .22S；Arousal = -.31B + .60S
  （B=brightness, S=saturation）。明度主导愉悦、饱和度主导唤醒，
  hue 效应远小于两者。最愉悦色相 blue/blue-green/green/purple。
- Tuch et al. 2009：网页视觉复杂度与唤醒 r=.74、与 valence r=-.61。
- SAM 图形量表（Bradley & Lang 1994）与 DEAP 数据集是 affective computing
  标注惯例；Affective Slider（2016）为开源数字化替代。
- 文化：环形结构泛文化（Russell 1989 四语言复现），但 Tsai 的
  Affect Valuation Theory 表明欧美偏好 high-arousal positive（excitement）、
  东亚偏好 low-arousal positive（calm）——对不同市场设计基调有直接含义。

风格→VA 平面映射的先例：未见命名视觉风格直接标定 VA 的经典研究（不确定），
但 Russell & Pratt (1980) 已把物理环境情绪品质映射到同一环形空间，
音乐情绪计算常规使用连续 VA 空间——"风格情绪地图"可定位为该范式在界面风格上的延伸。

交互组件点子：拖拽 28 词拼回情绪圆环后与原始角度对比；HSB 滑杆按
Valdez-Mehrabian 回归实时驱动 UI 卡片并显示 VA 坐标游走；
Affective Slider 双滑杆给风格截图评分聚合成全站风格 VA 地图。

关键来源：
- 原文 PDF: http://pdodds.w3.uvm.edu/research/papers/others/1980/russell1980a.pdf
- Core affect 2003: https://cs.uwaterloo.ca/~jhoey/teaching/cs886-affect/papers/Russell-CoreAffect-PsychRev03.pdf
- Valdez & Mehrabian: https://pubmed.ncbi.nlm.nih.gov/7996122/
- Tuch 2009: https://www.sciencedirect.com/science/article/abs/pii/S107158190900055X
- Affective Slider: https://github.com/albertobeta/AffectiveSlider
- Russell & Pratt 环境映射: https://doi.org/10.1037/0022-3514.38.2.311
- Tsai AVT: https://pubmed.ncbi.nlm.nih.gov/16536652/

## 五、Kano Model（狩野模型）笔记

起源：Kano, Seraku, Takahashi & Tsuji (1984)「魅力的品質と当り前品質」，
《品質》14(2)，DOI: 10.20684/quality.14.2_147。受 Herzberg 双因素理论启发，
挑战一维满意度假设，提出二维认知：横轴功能具备程度 × 纵轴满意度。

五分类：Must-be（当然品质，凹线，做好也只到中性）/ One-dimensional（一元，
45 度直线）/ Attractive（魅力，凸线，惊喜）/ Indifferent（无差异，水平线）/
Reverse（逆品质，负斜率）。

测量：functional/dysfunctional 双问 × 5 级选项 → 评价对照表映射分类
（Like+Dislike=O，Like+Neutral=A，Expect+Dislike=M；矛盾组合=Questionable），
取众数定类，平票 M > O > A > I。Better-Worse 系数（Berger et al. 1993）：
Better = (A+O)/(A+O+M+I)；Worse = -(O+M)/(A+O+M+I)，画四象限散点。

时间衰变（Kano 2001 实证）：电视遥控器 1983 Attractive → 1989 One-dimensional →
1998 Must-be。生命周期 Indifferent → A → O → M；O→M 平均 5-7 年。
现代直觉案例：iPhone 触摸屏 2007 惊喜、如今理所当然。分类是时点快照。

批评（内容差异化弹药）：Chapman & Callegaro 2022——5 选项互不排斥不构成量表、
含反事实偏差、N<200 不可靠、"Kano 更像一族实践而非一个方法"；
Song 2016——措辞变化改变分类结果；Witell 2013 综述——147 篇文献多数只取众数
不做统计检验。实证警示：健康 App 研究九项质量原则全落 Must-be（成熟领域天花板效应）。

Worked example（SaaS 仪表盘，虚构自洽）：加载 <1s = Must-be(Worse -0.83)、
CSV 导出 = One-dimensional、Dark mode = Attractive、AI 补全 = Indifferent
（分层后新手段 Attractive）、confetti 撒花 = Indifferent 且 37% Reverse 警示。

交互组件点子：拖年份滑块看 Attractive 曲线连续形变为 Must-be（标注遥控器真实节点）；
内嵌双问小测验实时高亮评价表命中格并自动落点 Better-Worse 散点；
曲线实验台拖"具备程度"看三条曲线满意度读数差异。

关键来源：
- 原始论文: https://doi.org/10.20684/quality.14.2_147
- Better-Worse 出处: https://www.walden-family.com/public/cqm-journal/2-4-Whole-Issue.pdf
- Witell 2013 综述: https://liu.diva-portal.org/smash/get/diva2:666390/FULLTEXT02.pdf
- Folding Burritos 指南: https://foldingburritos.com/blog/kano-model/
- Chapman 批评: https://quantuxblog.com/critical-assessment-of-the-kano-model-part-1
- NN/g 优先级方法: https://www.nngroup.com/articles/prioritization-methods/

## 六、落地形态（待确认后实施）

/learn 的 CHAPTERS 注册表（components/learn/learn-content.tsx）追加章节即可自动
获得目录/锚点/observer；导航在 lib/nav-config.ts 的 Resources dropdown 加组或加项；
i18n 走内联 tx(zh, en) pattern；纯逻辑放 lib/<章节>/index.ts 配单测。
注意：CHAPTERS 目前是扁平数组，若要区分"设计科学"组需加 group 字段并调整左侧目录渲染；
章节增多后建议引入 next/dynamic 懒加载（现状全部静态 import）。
