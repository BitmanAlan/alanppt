---
name: alanppt
description: Alan 的专业咨询风 PPT skill — 单一视觉身份（McKinsey/BCG 调色板 + 无衬线 + 结论先行 + 网格至上），三种输出格式：① 单文件 HTML 横向翻页 deck（template-consulting.html + 10 个 layout 骨架，适合内部分享/发链接预览/Demo Day）；② 可编辑 pptx（image-first 工作流，资源在 references/mckinsey-pptx.md + assets/mckinsey-pptx/，适合客户咨询交付/高管展示/对方要继续改）；③ 多平台封面（公众号 21:9 / 1:1 / 小红书 3:4 / 视频号 16:9 / 短视频 9:16，复用同一视觉系统但独立构图）。触发词：做 PPT / 生成 PPT / 做幻灯片 / 做一份分享 / 麦肯锡 PPT / BCG 风 / 咨询风 / 可编辑 pptx / 客户汇报 / 高管展示 / 网页 deck / horizontal swipe deck / 做封面 / 头图 / 分享卡 / 小红书封面 / 视频号封面。
---

# Alan PPT Skill

> **重要**：本 skill 只走"专业咨询风"一种视觉身份，三种输出格式共用同一套视觉系统。任何"杂志风 / 瑞士风 / WebGL 流体 / 装饰性视觉"的请求都属于过去版本被否定的方向，**不要在生成物里复活它们**。生成的 PPT / HTML / 封面 / 配图里也**不要写入** "alanppt" 或任何品牌名。

## 设计身份（决定一切的根原则）

**专业咨询风** · McKinsey / BCG / Bain 客户汇报材料的视觉语言

| 维度 | 规则 |
|---|---|
| 视觉锚点 | 结论先行 · 网格至上 · 配色克制 · 信息密度高 · 无装饰 |
| 字体 | **无衬线 only**：Inter / Helvetica / 苹方 / 雅黑 / Noto Sans SC；**任何衬线字体出现都是错的** |
| 配色 | navy #17365D（主蓝）+ ink #17212B（文字）+ muted #5C6773（次要）+ line #D9DEE5（hairline）+ red #C62828（accent，**整份 deck ≤ 3 次**）+ green #3A7D5A / amber #D79B35（状态色，不做装饰） |
| 装饰 | 1px hairline + 红色 vertical 标题钉 + 顶部色条 + 浅灰背景块 |
| 禁用 | WebGL 流体 / 点阵 / 渐变 / 阴影 / 圆角 > 4px / Stock photo / 营销 hero scene / 商务握手图 |
| 入场动效 | 极简：opacity 0→1 + 微 translateY + 数字 scaleIn + bar grow-in；**禁用** 流体 / 视差 / sequence |
| 标题 | **必须是结论句**："动作可释放 18-24% EBITDA" 而不是 "EBITDA 分析" |
| 信息密度 | **呼吸优先**：3-4 个论点是**上限不是目标**；能用 2 个讲清就用 2，宁可拆成两页也不要挤满。每页留 ≥30% 负空间 |

---

## 三种输出格式（决定走哪条路径）

由"最终落位 + 后续编辑需求"决定走哪条：

| 路径 | 输出格式 | 何时用 | 资源位置 |
|---|---|---|---|
| **HTML · 网页 deck** | 单文件 HTML（横向翻页） | 内部分享 / 发链接给客户预览 / Demo Day / 演讲 | `assets/template-consulting.html` + `references/layouts-consulting.md` |
| **PPTX · 可编辑** | .pptx | 客户咨询交付 / 高管展示 / 对方要在 PowerPoint 里继续改 | `assets/mckinsey-pptx/` + `references/mckinsey-pptx.md` + `references/checklist-mckinsey.md` |
| **COVER · 多平台封面** | 单张图片（21:9 / 1:1 / 3:4 / 16:9 / 9:16） | 公众号头图 / 朋友圈分享卡 / 小红书封面 / 视频号封面 / 短视频竖封 | `references/cover-specs.md` |

### 选路径快问快答

| 用户的说法 | 走哪条 |
|---|---|
| "做个分享 PPT" / "做个 demo deck" / "做个演讲" | **HTML**（默认）|
| "要 .pptx 文件" / "客户要 PowerPoint 改" / "高管汇报 deck" | **PPTX** |
| "发链接就能看" / "网页版" / "一打开就能用" | **HTML** |
| "做个封面" / "做张头图" / "公众号头图" / "21:9 封面" | **COVER** |
| "分享卡" / "朋友圈缩略图" / "1:1 封面" | **COVER** |
| "小红书封面" / "3:4 封面" / "笔记封面" | **COVER** |
| "视频号封面" / "B 站封面" / "YouTube 缩略图" | **COVER** |
| "抖音封面" / "短视频封面" / "9:16 竖封" | **COVER** |
| 没说清楚 | **先问输出形式**：网页 HTML / 可编辑 pptx / 单张封面图？ |

### Alan 偏好（默认值）

- **默认中文**。所有口播、文案、caption 都用简体中文，除非用户明确要英文 deck。
- **避免互联网营销腔**。"震撼 / 颠覆 / 赋能 / 重新定义"这类词直接砍掉；改用具体动词和数字。
- **文件路径默认放 `~/Desktop/<项目名>/<格式>/`**：
  - HTML：`~/Desktop/<项目名>/deck/index.html`，`images/` 同级
  - PPTX：`~/Desktop/<项目名>/pptx/`，含 `png_assets/` / `page_visual_previews/`
  - COVER：`~/Desktop/<项目名>/covers/`，命名 `cover-{平台}-{比例}.jpg`（例如 `cover-gzh-21x9.jpg`）
- **生成前先写一份大纲 markdown**（叙事弧：结论 → 论据 → 拆解 → 路径 → 收束），保存为 `项目记录.md` 或 `大纲-v1.md`，便于后续迭代。
- **三种格式不混用**。一份 deck 只走一条；如果客户既要网页版又要 pptx，**分别做两份**。封面（COVER）可以和任意 deck 配套生成，但**不要直接截 deck 的某一页当封面**——必须按 `cover-specs.md` 重新构图。

---

## HTML 路径 · 工作流（网页 deck）

### Step 1 · 需求澄清

**如果用户已经给了完整大纲 + 图片要求**，可以跳过直接进 Step 2。

**如果用户只给了主题或模糊想法**，用下面 6 个问题逐项对齐：

| # | 问题 | 为什么要问 |
|---|------|-----------|
| 1 | **受众是谁？汇报场景？**（内部分享 / 客户汇报 / Demo Day / 高管展示） | 决定语言风格和深度 |
| 2 | **分享时长？** | 15 分钟 ≈ 10 页，30 分钟 ≈ 15 页，45 分钟 ≈ 20-25 页 |
| 3 | **有没有原始素材？**（数据 / 旧 deck / 文章 / 调研结果） | 有素材就基于素材，没有就帮他搭 |
| 4 | **核心结论是什么？**（一句话能说清吗？） | 整份 deck 的第 1 页标题就是这一句 |
| 5 | **有没有图片或截图？怎么处理？** | 决定图文版式和落位比例 |
| 6 | **有没有硬约束？**（必须包含 XX 数据 / 不能出现 YY） | 避免返工 |

### Step 2 · 拷贝模板

```bash
mkdir -p "项目/XXX/deck/images"
cp "<SKILL_ROOT>/assets/template-consulting.html" "项目/XXX/deck/index.html"
```

模板是**完整可运行**的——CSS、字体、翻页 JS、ESC 索引、低功耗模式、动效全已预设好。

#### 2.1 · 必改占位符（**容易漏**）

| 位置 | 原始 | 需改为 |
|------|------|--------|
| `<title>` | `[必填] 替换为 Deck 标题` | 实际 deck 标题 |
| 封面 `.deck-meta` | `[替换：客户名 / 项目名]` | 客户名或项目名 |
| 封面汇报对象 | `[替换：CEO / 董事会]` | 实际汇报对象 |
| 封面汇报人 | `[替换：Alan Lee]` | 实际汇报人 |

每次拷贝完第一件事：grep 一下"[替换" 和 "[必填"确认全部替换完。

### Step 3 · 填充内容

#### 3.0 · 预检：类名必须在模板里有定义

写 slide 前先 Read `assets/template-consulting.html` 的 `<style>` 块，确认你要用的每个 class 都在。layouts-consulting.md 顶部有 Pre-flight 类名清单，对照着检查。

#### 3.0.5 · 规划主题节奏

**在挑布局之前**，必须先列出每一页的 light / dark：

- 7 页以下：1 个 dark hero 即可
- 8-15 页：≥ 1 个 dark hero + ≥ 1 个 dark 章节幕封
- 15+ 页：每 4-5 页插入 1 个 dark 页换气
- 连续 3 页以上同 light/dark = 视觉疲劳，不允许

#### 3.1 · 挑布局

打开 `references/layouts-consulting.md`，里面有 **10 种现成 layout 骨架**：

| Layout | 用途 |
|---|---|
| 1. Cover | 开场封面（结论先行大标题） |
| 2. Section Divider | 章节幕封（dark 页） |
| 3. Executive Summary | 3 KPI tiles + 决策含义 + 诊断链路 |
| 4. 2x2 Matrix | 市场象限 / 战略矩阵 + benchmark bars |
| 5. Roadmap Swimlanes | 3 工作流 × 4 时间段 + scorecard |
| 6. Value Waterfall | 价值瀑布 / EBITDA 桥 |
| 7. Process / Diagnostic | 横向 N 节点流程 |
| 8. Option Comparison | 3 套方案对比 |
| 9. Big Statement | 大引述 / manifesto（dark 页 + h-statement） |
| 10. Closing / Next Steps | 收尾页 + 3 条 next + 时间窗 |

选对应 layout，粘过去，改文案。**务必先完成 3.0 预检**。

#### 3.2 · 图片处理

如果 deck 里要插图，图片放 `项目/XXX/deck/images/`，命名 `{页号}-{语义}.{ext}`（如 `03-matrix.png`）。

- 单张 ≥ 1600px 宽
- JPG 用于照片 / 截图，PNG 用于透明 UI
- 总大小 ≤ 10MB
- **绝对禁用** stock photo（商务握手 / 团队会议）

### Step 4 · 对照检查清单自检

按下面 5 项过一遍：

1. ✅ **结论先行**：每页大标题都是结论，不是"XX 分析"这种描述
2. ✅ **配色克制**：红色 ≤ 3 次；没有渐变 / 阴影 / 圆角 > 4px
3. ✅ **字体只用无衬线**：grep `serif` 应该为空
4. ✅ **节奏合理**：light / dark 交替，没有连续 3 页同主题
5. ✅ **底部不压 nav**：内容收尾 ≤ 93vh，nav 在 ~97vh
6. ✅ **呼吸充足**：每页负空间 ≥ 30%，正文不顶版边，卡片间距宽松统一；宁可拆页不挤满

### Step 5 · 本地预览

```bash
open "项目/XXX/deck/index.html"
```

不需要本地服务器。键盘 ← → 翻页 / ESC 索引 / B 低功耗 / F 全屏 / 1-9 直跳。

### Step 5.5 · 换眼视觉 QA（**必跑，不可跳过**）

自查（Step 4）是同一个 agent 看自己，有预期盲区，**发现不了"挤"**。交付前必须按 `references/visual-qa.md` 跑一遍：渲染每页成图 → 派一个全新子agent用挑刺视角找问题（**重点查呼吸/留白：疏密不均、贴边、顶到页脚、负空间不足**）→ 修 → 重验。没跑完至少一轮"修复+重验"，不算完成。

### Step 6 · 迭代

90% 的调整是改 inline style（字号 `font-size:Xvw` / 高度 `height:Yvh` / 间距 `gap:Zvh`）。

---

## PPTX 路径 · 工作流（可编辑 pptx）

**入口文档**：`references/mckinsey-pptx.md`（走 PPTX 前必读）

简要流程：

1. **生成 16:9 整页视觉**：用 GPT-Image-2 / Nano Banana / Imagen，按 `assets/mckinsey-pptx/image2-prompt-template.md` 的 Shared Visual System + 单页 Prompt 模板生成
2. **拆分透明 PNG**（可选，标准图表可跳过）：按 `assets/mckinsey-pptx/decompose-prompt.md` 的 Prompt 把每页拆成透明 PNG 素材
3. **重建可编辑 pptx**：把 `assets/mckinsey-pptx/` 整个目录拷到项目根，改 `make-deck.js` 顶部的 PROJECT 常量和 `addSlideN` 函数，跑 `npm install && node make-deck.js`
4. **自检**：按 `references/checklist-mckinsey.md` 的 P0/P1/P2/P3 清单逐项核对，在 PowerPoint 里打开验证文字可编辑
5. **换眼视觉 QA（必跑）**：按 `references/visual-qa.md` 把 pptx 渲染成图（soffice→pdf→pdftoppm）→ 派全新子agent挑刺（重点查呼吸/留白、溢出、重叠）→ 修 → 重验，零新问题才交付

**与 HTML 路径的差异**：
- HTML：纯网页 / 浏览器翻页 / CSS class
- PPTX：.pptx / PowerPoint 翻页 / pptxgenjs SVG+PNG+文本框

**视觉系统完全一致**：同样 McKinsey 调色板、同样 Inter 字体（pptx 用 Arial 兼容性更好但视觉等价）、同样结论先行原则。

---

## COVER 路径 · 工作流（多平台封面）

**入口文档**：`references/cover-specs.md`（走 COVER 前必读）

COVER 路径**不生成 deck**，只生成单张封面图。覆盖五种平台尺寸：

| 平台 | 比例 | 安全区注意 |
|---|---|---|
| 公众号头图 | 21:9 | 避开右下水印 |
| 公众号分享卡 / 朋友圈缩略 | 1:1 | 中央 60% |
| 小红书封面 / 轮播 | 3:4 | 避开底部用户名 + 标签条 |
| 视频号 / B 站 / YouTube | 16:9 | 避开右下时长水印 |
| 抖音 / 小红书视频竖封 | 9:16 | 避开底部进度条 |

工作流：

1. **问清平台**：哪个尺寸？要不要一起做多平台（一次最多 4 个）？
2. **抽标题**：≤ 12 个中文字符，必须是**结论句**或**强反差**
3. **按 `cover-specs.md` 的 Prompt 模板**生成
4. **保存到** `~/Desktop/<项目名>/covers/`，命名 `cover-{平台}-{比例}.jpg`

**绝不要直接截 deck 的某一页当封面**——deck 横向版式信息密度低，缩到 1:1 或 3:4 会留白过多、字号失衡。封面必须按 `cover-specs.md` 重新构图。

---

## 资源文件导览

```
alanppt/
├── SKILL.md                  ← 你正在读
├── README.md / README.en.md  ← 速查
├── LICENSE                   ← MIT
├── CONTRIBUTING.md           ← 维护说明
├── assets/
│   ├── template-consulting.html  ← ★ HTML 路径模板（10 layout）
│   └── mckinsey-pptx/            ← ★ PPTX 路径 self-contained 工作目录
│       ├── image2-prompt-template.md  ← Image-2 整页视觉 Prompt 模板
│       ├── decompose-prompt.md        ← 拆透明 PNG 的 Prompt
│       ├── rebuild-prompt.md          ← 兜底：让模型直出 pptx 的 Prompt
│       ├── make-deck.js               ← pptxgenjs 脚本（含咨询图表原语库）
│       └── package.json               ← pptxgenjs + sharp 依赖声明
└── references/
    ├── layouts-consulting.md     ← ★ HTML · 10 种 layout 骨架（可粘贴）
    ├── mckinsey-pptx.md          ← ★ PPTX · 完整工作流主文档
    ├── cover-specs.md            ← ★ COVER · 多平台封面规格 + Prompt 模板
    ├── checklist-mckinsey.md     ← ★ PPTX · 自检清单（P0/P1/P2/P3 + 呼吸 P2-5）
    └── visual-qa.md              ← ★ 通用 · 渲染+换眼子agent视觉QA回环（HTML/PPTX 交付前必跑）
```

**加载顺序建议**：

1. 先读完 `SKILL.md`（这个文件）了解整体
2. Step 1 需求澄清**第一问**：先确定产出形式（HTML / PPTX / COVER）
3. 走 **HTML** 时：读 `layouts-consulting.md`（顶部有 Pre-flight 类名清单），动手前先 Read `assets/template-consulting.html` 的 `<style>` 块
4. 走 **PPTX** 时：读 `mckinsey-pptx.md`，按需读 `assets/mckinsey-pptx/` 里的对应 prompt 模板 / 脚本，交付前过 `checklist-mckinsey.md`
5. 走 **COVER** 时：直接读 `cover-specs.md` → 按 Prompt 模板生成

---

## 核心设计原则（哲学）

> 违反其中任何一条，画面瞬间从咨询风掉到 PowerPoint。

1. **单一锚点色** — 一份 deck 只用一个 accent（红色），不允许多色高亮拼贴
2. **极致字号对比** — 主标题（48px）与正文（16px）比例 ≥ 3:1；KPI 大数字（72px）与 label（24px）比例 3:1
3. **无衬线只此一家** — Inter / Helvetica / 苹方；任何衬线都是错的
4. **直角纯色** — 不允许渐变 / 阴影 / 圆角 > 4px
5. **网格至上** — 所有元素吸附到 12-col grid，左对齐；留白是设计元素不是浪费：页边距 ≥ 画布 6%，相邻区块间距取"宽松档"且全 deck 统一，文本块宽度 ≤ 62 字符（中文 ≤ 34 字），不要让正文顶到边
6. **Hairline 是手术刀** — 1px 的极细分割线就够，不要加粗、不要加阴影
7. **结论先行** — 每页大标题都是结论，副标补论据，不要写"关于 XX 的分析"
8. **红色克制** — 红色一份 deck ≤ 3 次，每次都对应"最该看的那一项"
9. **配图不用 stock** — 真实素材或自己生成，stock photo 一秒掉档次
10. **入场动效极简** — opacity + 微 translateY + 数字 scaleIn；不用流体 / 视差 / sequence
11. **呼吸优先于密度** — 宁可一页少讲一点、多拆一页，也不把版面填满；每页保留 ≥30% 负空间；上下内容收在画布纵向 ~10%–90% 之间，给天地留气口。密度是上限，留白是默认
12. **换眼验证再交付** — 自己写的版面有"预期盲区"，看不出自己挤了。交付前**必须**渲染成图、派一个全新子agent用挑刺视角找问题（见 `references/visual-qa.md`），修完重验，零新问题才算完成
