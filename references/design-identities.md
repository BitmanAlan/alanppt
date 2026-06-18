# 四种视觉身份 · 配方手册

> alanppt 覆盖四种顶级视觉身份，按客户场景选一种（选法见 `SKILL.md` 的 Design Read 前门）。
> 每种是**自洽、互不污染**的设计系统。本文件是每种身份的"宪法"——配色、字体、装饰、布局、动效、反 slop 禁令、对应模板。
> 跨身份恒定：结论先行 · 呼吸优先（留白 ≥30%）· 反默认审美 · 交付前换眼 QA（`visual-qa.md`）。

---

## A · 咨询风（Consulting）

**场景**：客户咨询汇报 / 尽调 / 董事会 / IPO 路演材料。**气质**：克制、无装饰、结论先行、网格至上。
**模板**：`assets/template-consulting.html` ＋ `references/layouts-consulting.md` ＋ `references/checklist-mckinsey.md`（pptx）。

| 维度 | 规则 |
|---|---|
| 字体 | **无衬线 only**：Inter / Helvetica / 苹方 / 雅黑。任何衬线都是错的 |
| 配色 | navy #17365D + ink #17212B + muted #5C6773 + line #D9DEE5 + red #C62828（accent ≤3 次）+ green/amber 状态色 |
| 装饰 | 1px hairline + 红色标题钉 + 顶部色条 + 浅灰背景块。**仅此** |
| 布局 | 12 列网格、左对齐、非对称留白 |
| 动效 | 极简 opacity + 微 translateY；禁流体/视差 |
| 旋钮 | VARIANCE 3 · MOTION 2 · DENSITY 4 |
| **禁用** | 渐变 / 阴影 / 玻璃 / 圆角>4px / 衬线 / WebGL / stock photo |

> A 的全部克制规则见 `SKILL.md` 末尾「核心设计原则」。**B/C/D 的玻璃渐变柔光绝不能进 A。**

---

## B · Keynote 发布会风（Soft Structuralism）

**场景**：产品发布 / Demo Day / 路演 / 大会主题演讲。**气质**：深色为主、超大字、macro 留白、柔光、一页一个重锤。
**灵感**：Apple Keynote · high-end「Soft Structuralism」。**模板**：`assets/template-keynote.html`。

| 维度 | 规则 |
|---|---|
| 字体 | 宽几何 Grotesk：Geist / Plus Jakarta Sans / 苹方（大字 weight 600-800 拉满）。大标题可上 8-14vw |
| 配色 | 深色主场：near-black #0A0A0B 背景 + 高亮白 #F5F5F7 文字 + 单一品牌强调色（一份只用一个，如电光蓝/翡翠/品牌色）。亮色页用 #FAFAFA |
| 装饰/质感 | 极柔环境光（巨大、低透明度的径向光晕，不是硬阴影）；hairline white/10；**禁硬阴影、禁 1px 灰边** |
| 布局 | 一页一个核心信息；超大数字/超大短句居中或左下定位；大量天地留白 |
| 动效 | 重质感淡入上浮 + blur 渐清（translate-y-16 blur-md → 0），弹簧缓动 cubic-bezier(0.32,0.72,0,1)；数字 scaleIn |
| 旋钮 | VARIANCE 7 · MOTION 6 · DENSITY 2（**最稀疏**） |
| **禁用** | 咨询风的密集 KPI 墙 / 红色标题钉 / 顶部色条；廉价渐变文字；居中 hero over mesh 这种 AI 默认 |

---

## C · Editorial 杂志风（Editorial Luxury）

**场景**：品牌故事 / 观点内容 / 行业报告 / 内容营销。**气质**：衬线大标、暖调、颗粒质感、编辑式跨页排版。
**灵感**：high-end「Editorial Luxury」· 杂志跨页 · gpt-taste 编辑排版。**模板**：`assets/template-editorial.html`。

| 维度 | 规则 |
|---|---|
| 字体 | **高对比变量衬线**做大标：PP Editorial New / Source Han Serif / Noto Serif SC（大、细节锐利）；正文配干净无衬线（苹方/Inter）。衬线↔无衬线对比是灵魂 |
| 配色 | 暖底：cream #FDFBF7 / 米白 + 深espresso #2B2420 文字 + 一个雅致点缀（赭石/墨绿/酒红）。**不要纯白冷灰** |
| 装饰/质感 | 细 CSS noise/film-grain 叠加（opacity ~0.03）做纸感；细 hairline 分栏；首字下沉/引文大字 |
| 布局 | 杂志跨页感：非对称双栏、大图配窄栏文字、eyebrow 微标签起头、宽松基线节奏 |
| 动效 | 克制：文字淡入、图片轻缩放；不喧宾夺主 |
| 旋钮 | VARIANCE 8 · MOTION 4 · DENSITY 3 |
| **禁用** | 科技玻璃/霓虹；大标用无衬线（浪费这个身份）；满版冷色 |

---

## D · Dark-tech 玻璃风（Ethereal Glass）

**场景**：AI / 科技产品介绍 / 技术发布。**气质**：OLED 黑、网格/径向渐变、玻璃质感、几何 Grotesk、精密。
**灵感**：high-end「Ethereal Glass」· Linear · Vercel。**模板**：`assets/template-darktech.html`。

| 维度 | 规则 |
|---|---|
| 字体 | 几何 Grotesk：Geist / Clash Display / Plus Jakarta；等宽 mono 做数据/代码（JetBrains Mono） |
| 配色 | 最深 OLED 黑 #050505 + 背景低透明度径向 mesh 光晕（如幽蓝/翡翠 orb）+ 纯白/10 hairline + 高亮白文字 |
| 装饰/质感 | **双层嵌套卡（Doppelrand）**：外壳 bg-white/5 + ring-white/10 + 大圆角，内核自带 inset 高光；backdrop-blur 玻璃卡（仅固定元素）；细网格背景 |
| 布局 | 不对称 Bento 网格（大小卡错落）；eyebrow pill 标签；macro section 间距 |
| 动效 | 弹簧物理；磁吸按钮；错峰揭示；scroll blur-up。GPU 安全（只动 transform/opacity） |
| 旋钮 | VARIANCE 7 · MOTION 7 · DENSITY 3 |
| **禁用** | 暖色纸感（那是 C）；硬黑投影；blur 加在滚动大区域（性能崩） |

---

## 反默认审美清单（四身份共用 · 借 high-end「Absolute Zero」）

生成物命中任一条即不合格：
- **禁字体**：Inter/Roboto/Arial/Helvetica 当主视觉（A 的正文可用无衬线，但 B/C/D 大标必须用各自身份的高级字体）
- **禁配色**：AI 紫渐变、千篇一律 slate-900
- **禁布局**：居中 hero over dark mesh、无留白的三等分卡、edge-to-edge 粘顶导航
- **禁阴影/边框**：生硬 1px 灰边（A 的 hairline 例外）、harsh dark drop shadow
- **禁动效**：linear/ease-in-out 生硬过渡、无插值的瞬变

## 选身份决策（Design Read 速查）

| 客户信号 | 选 | 
|---|---|
| 咨询/尽调/董事会/财报/审计/严肃 B2B | **A** |
| 发布会/路演/Demo Day/keynote/"要高级要震撼" | **B** |
| 品牌/观点/报告/内容/"杂志感/编辑感/温度" | **C** |
| AI/科技/SaaS 产品/"科技感/未来感/极客" | **D** |
| 没有明显信号 | **A**（默认最稳） |

> 选定后：套对应模板 → 按本身份配方填内容 → 守呼吸（≥30% 留白）→ 渲染 + 换眼 QA（`visual-qa.md`）。
